import { GoogleGenAI } from '@google/genai';
import { getRepository } from '../repositories';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIProvider {
  generateReply(messages: ChatMessage[], systemInstruction?: string): Promise<string>;
}

export class GeminiProvider implements AIProvider {
  private client: GoogleGenAI | null = null;
  private model: string;

  constructor(model: string = 'gemini-2.5-flash') {
    this.model = model;
    const apiKey = process.env.AI_API_KEY || process.env.GEMINI_API_KEY;
    if (apiKey) {
      this.client = new GoogleGenAI({ apiKey });
    }
  }

  async generateReply(messages: ChatMessage[], systemInstruction?: string): Promise<string> {
    if (!this.client) {
      throw new Error('Gemini API key is not configured');
    }

    const conversationText = messages
      .map((m) => `${m.role === 'user' ? 'Visitor' : 'Assistant'}: ${m.content}`)
      .join('\n\n');

    const prompt = `${systemInstruction ? `[SYSTEM INSTRUCTIONS]\n${systemInstruction}\n\n` : ''}[CONVERSATION]\n${conversationText}\n\nAssistant:`;

    const response = await this.client.models.generateContent({
      model: this.model,
      contents: prompt,
    });

    return response.text || 'I would be happy to help. For custom inquiries, please contact our team on WhatsApp or submit our project form.';
  }
}

export class OpenAIProvider implements AIProvider {
  private model: string;

  constructor(model: string = 'gpt-4o-mini') {
    this.model = model;
  }

  async generateReply(messages: ChatMessage[], systemInstruction?: string): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          ...(systemInstruction ? [{ role: 'system', content: systemInstruction }] : []),
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API request failed: ${response.statusText}`);
    }

    const json = (await response.json()) as any;
    return json.choices?.[0]?.message?.content || '';
  }
}

export class AIService {
  private static instance: AIService;

  private constructor() {}

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async handleChat(messages: ChatMessage[]): Promise<string> {
    const repo = getRepository();
    const aiSettings = await repo.getAiSettings();
    const contact = await repo.getContact();

    if (!aiSettings.enabled) {
      return 'The AI Assistant is currently offline. Please reach out to us directly on WhatsApp at ' + contact.phone;
    }

    const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || '';

    // Smart fallback if API key is not present or if user asks quick common questions
    const hasApiKey = Boolean(process.env.AI_API_KEY || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY);

    if (!hasApiKey) {
      if (lastMessage.includes('service') || lastMessage.includes('what do you build') || lastMessage.includes('website')) {
        return "DIGEGAIN specializes in building high-performance service business websites, automated booking & appointment systems, product/order catalog platforms, custom business dashboards, and AI-enabled web experiences. Would you like to discuss a specific system for your business?";
      }
      if (lastMessage.includes('booking') || lastMessage.includes('appointment')) {
        return "Yes, we build custom booking and appointment systems with real-time calendar availability, automated WhatsApp and email reminders, and staff scheduling. It is perfect for clinics, salons, hotels, and consultants!";
      }
      if (lastMessage.includes('contact') || lastMessage.includes('whatsapp') || lastMessage.includes('call') || lastMessage.includes('phone')) {
        return `You can reach DIGEGAIN immediately on WhatsApp or phone at ${contact.phone}, or email us at ${contact.email}. You can also fill out the inquiry form on our Contact page!`;
      }
      if (lastMessage.includes('portfolio') || lastMessage.includes('work') || lastMessage.includes('case study')) {
        return "You can check out our featured projects in our Portfolio section, including restaurant reservation portals, clinic appointment systems, luxury resort booking engines, and logistics dashboards!";
      }
      return "Thank you for reaching out! DIGEGAIN designs modern, fast websites and booking systems that help businesses grow. How can we assist your business today?";
    }

    try {
      let provider: AIProvider;
      if (aiSettings.provider === 'openai') {
        provider = new OpenAIProvider(aiSettings.model || 'gpt-4o-mini');
      } else {
        provider = new GeminiProvider(aiSettings.model || 'gemini-2.5-flash');
      }

      return await provider.generateReply(messages, aiSettings.systemInstructions);
    } catch (err: any) {
      console.warn('AI Provider fallback invoked:', err.message);
      return "DIGEGAIN specializes in AI-enabled website design, booking systems, and business automation. For immediate project inquiries or quotes, feel free to WhatsApp us at " + contact.phone + "!";
    }
  }
}
