import React, { useEffect } from 'react';
import { X, ExternalLink, Check, Calendar, TrendingUp, Cpu, ArrowUpRight } from 'lucide-react';
import { PortfolioProject } from '../../types';

interface ProjectDetailModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onStartSimilarProject: () => void;
}

export function ProjectDetailModal({ project, onClose, onStartSimilarProject }: ProjectDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E89C1]">
              Case Study
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-semibold text-slate-600">
              {project.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Main Visual */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-auto object-cover max-h-[420px]"
            />
          </div>

          {/* Title & Client Headline */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#102A43]">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Client: {project.client} · {project.category}
                </p>
              </div>

              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:border-[#1E89C1] hover:text-[#1E89C1] transition-colors"
                >
                  <span>Visit System</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>

            {/* Impact Metric Banner */}
            {project.metric && (
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-[rgba(66,168,61,0.3)] bg-[#F0FDF4] p-3 text-xs">
                <TrendingUp className="h-5 w-5 text-[#42A83D] shrink-0" />
                <div>
                  <span className="font-bold text-[#2E872A]">{project.metric.label}:</span>{' '}
                  <span className="font-extrabold text-slate-900">{project.metric.value}</span> —{' '}
                  <span className="text-slate-600">{project.metric.context}</span>
                </div>
              </div>
            )}
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-red-100 bg-red-50/40 p-5">
              <h4 className="text-xs font-bold tracking-wider text-red-600 uppercase">
                The Operational Bottleneck
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-slate-700">
                {project.challenge}
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5">
              <h4 className="text-xs font-bold tracking-wider text-emerald-700 uppercase">
                The DIGEGAIN Engineering Solution
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-slate-700">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Features List */}
          <div>
            <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              Engineered Capabilities &amp; Automations
            </h4>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features?.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 rounded-xl bg-slate-50 p-2.5 text-xs text-slate-800">
                  <Check className="h-4 w-4 text-[#1E89C1] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used */}
          <div>
            <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              Technology Stack
            </h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="rounded-lg bg-slate-100 px-3 py-1 font-mono text-xs text-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-100 bg-slate-50 p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Need a similar system customized for your business?
          </div>
          <button
            onClick={() => {
              onClose();
              onStartSimilarProject();
            }}
            className="flex items-center gap-2 rounded-xl bg-[#F37B20] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#D9630E] transition-colors shadow-md"
          >
            <span>Start Similar Project</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
