import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, MessageCircle } from 'lucide-react';
import { sendChatMessage } from '../../lib/api';
import { AiSettings } from '../../types';

interface AiChatWidgetProps {
  settings: AiSettings;
}

export function AiChatWidget({ settings }: AiChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: settings?.welcomeMessage || 'Hello! Welcome to DIGEGAIN. How can we help you with modern web development or booking systems today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!settings?.enabled) {
    return null;
  }

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const newMessages: Array<{ role: 'user' | 'assistant'; content: string }> = [
      ...messages,
      { role: 'user', content: text.trim() }
    ];

    setMessages(newMessages);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const reply = await sendChatMessage(newMessages);
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'I apologize, I am temporarily having trouble reaching our assistant. Please message us on WhatsApp or submit your inquiry on our Contact page!'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle DIGEGAIN AI Assistant"
        className="fixed bottom-24 left-6 z-40 flex items-center gap-2 rounded-full border border-[rgba(30,137,193,0.3)] bg-white px-4 py-3 text-[#102A43] shadow-xl transition-all duration-300 hover:scale-105 hover:border-[#1E89C1] hover:shadow-2xl md:bottom-8 md:left-8"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1E89C1] text-white">
          <Bot className="h-3.5 w-3.5" />
        </div>
        <span className="hidden text-sm font-semibold tracking-tight text-[#102A43] sm:inline">
          AI Assistant
        </span>
      </button>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-36 left-4 right-4 z-50 flex max-h-[540px] flex-col overflow-hidden rounded-2xl border border-[rgba(30,137,193,0.2)] bg-white shadow-2xl sm:bottom-24 sm:left-8 sm:right-auto sm:w-[380px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-[#F1F8FC] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <img src="/logo-mark.svg" alt="DIGEGAIN" className="h-6 w-6" />
              <div>
                <h4 className="text-xs font-bold text-[#102A43]">DIGEGAIN Assistant</h4>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#42A83D]" />
                  <span>Online · Business Inquiries</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
              aria-label="Close Assistant"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#1E89C1] text-white'
                      : 'border border-slate-100 bg-[#F8FAFC] text-slate-800'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl border border-slate-100 bg-[#F8FAFC] px-3.5 py-2 text-slate-400">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#1E89C1]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#1E89C1] [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#1E89C1] [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length <= 2 && settings?.suggestedPrompts && (
            <div className="flex flex-wrap gap-1.5 border-t border-slate-100 bg-slate-50 p-2.5">
              {settings.suggestedPrompts.slice(0, 3).map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-600 transition-colors hover:border-[#1E89C1] hover:text-[#1E89C1]"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 border-t border-slate-100 p-2.5"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about website design or bookings..."
              className="flex-1 rounded-xl bg-slate-100 px-3 py-2 text-xs text-slate-800 outline-none transition-colors focus:bg-white focus:ring-1 focus:ring-[#1E89C1]"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#1E89C1] text-white transition-opacity disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
