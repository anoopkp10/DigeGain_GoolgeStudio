import React, { useState } from 'react';
import { ArrowUpRight, TrendingUp, ExternalLink } from 'lucide-react';
import { PortfolioProject } from '../../types';
import { ProjectDetailModal } from './ProjectDetailModal';

interface PortfolioSectionProps {
  projects: PortfolioProject[];
  onStartProject: () => void;
  standalone?: boolean;
}

export function PortfolioSection({ projects, onStartProject, standalone = false }: PortfolioSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  const categories = [
    'All',
    'Booking Systems',
    'Service Business Websites',
    'Business Dashboards',
    'Order Systems',
    'Creative & Architecture'
  ];

  const publishedProjects = projects.filter((p) => p.status === 'published');

  const filteredProjects = selectedCategory === 'All'
    ? publishedProjects
    : publishedProjects.filter((p) => {
        if (selectedCategory === 'Booking Systems') return p.category.includes('Booking') || p.category.includes('Hospitality');
        if (selectedCategory === 'Service Business Websites') return p.category.includes('Service') || p.category.includes('Healthcare');
        if (selectedCategory === 'Business Dashboards') return p.category.includes('Dashboard') || p.category.includes('Operations');
        if (selectedCategory === 'Order Systems') return p.category.includes('Order') || p.category.includes('E-commerce');
        if (selectedCategory === 'Creative & Architecture') return p.category.includes('Architecture') || p.category.includes('Portfolio');
        return p.category === selectedCategory;
      });

  return (
    <section id="portfolio" className={`py-24 ${standalone ? 'pt-32 bg-[#F8FAFC]' : 'bg-white'}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1E89C1]">
              <span className="h-2 w-2 rounded-full bg-[#F37B20]" />
              <span className="tracking-widest uppercase">Proven Case Studies</span>
            </div>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-[#102A43] sm:text-4xl">
              Engineered For Results. Proven In Production.
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-2xl">
              Explore how DIGEGAIN builds bespoke digital systems that streamline business operations, eliminate manual booking headaches, and drive measurable revenue growth.
            </p>
          </div>

          <button
            onClick={onStartProject}
            data-cursor="start"
            className="self-start md:self-auto flex items-center gap-2 rounded-xl bg-[#F37B20] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#D9630E] transition-all shadow-md active:scale-95"
          >
            <span>Commission A System</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#1E89C1] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              data-cursor="view"
              onClick={() => setActiveProject(project)}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#1E89C1]/50 hover:shadow-xl cursor-pointer"
            >
              <div>
                {/* Visual Cover */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 rounded-lg bg-slate-900/80 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-xs">
                    {project.category}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Metric Tag */}
                  {project.metric && (
                    <div className="inline-flex items-center gap-1.5 rounded-lg bg-[#F0FDF4] px-2.5 py-1 text-[11px] font-bold text-[#2E872A]">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>{project.metric.label}: {project.metric.value}</span>
                    </div>
                  )}

                  <h3 className="mt-3 font-display text-xl font-bold text-[#102A43] group-hover:text-[#1E89C1] transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500 font-medium">
                    Client: {project.client}
                  </p>

                  <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-600">
                    {project.summary}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags?.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action strip */}
              <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between text-xs font-bold text-[#1E89C1]">
                <span>View Full Case Study</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <ProjectDetailModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onStartSimilarProject={onStartProject}
        />
      </div>
    </section>
  );
}
