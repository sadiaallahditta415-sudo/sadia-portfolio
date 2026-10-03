import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'motion/react';
import { ArrowUpRight, Code, Eye, ExternalLink, Sparkles } from 'lucide-react';

export const Projects: React.FC = () => {
  const { data, theme, setActiveProject } = usePortfolio();
  const isDark = theme === 'dark';

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!data.projects || data.projects.length === 0) {
    return null;
  }

  const categories = ['All', ...Array.from(new Set(data.projects.map((p) => p.category)))];

  const filteredProjects = selectedCategory === 'All'
    ? data.projects
    : data.projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-28 md:py-36 border-t border-[#27272A]/40 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <span
              className={`text-xs font-sans-luxury tracking-[0.25em] uppercase font-semibold ${
                isDark ? 'text-[#E2D4BA]' : 'text-[#9A7B38]'
              }`}
            >
              04 / SELECTED WORKS
            </span>
            <h2
              className={`font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-normal mt-3 tracking-tight ${
                isDark ? 'text-[#FAF9F6]' : 'text-[#18181B]'
              }`}
            >
              Featured Projects
            </h2>
            <p
              className={`text-sm md:text-base font-sans-luxury font-light mt-3 max-w-xl ${
                isDark ? 'text-[#A1A1AA]' : 'text-[#71717A]'
              }`}
            >
              A selection of web platforms, design systems, and frontend applications engineered for high performance.
            </p>
          </div>

          {/* Category Filter Tabs (Interactive controls as permitted by design constitution) */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-sm border border-[#27272A]/50 bg-[#141416]/40">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-sans-luxury tracking-wider uppercase transition-all duration-300 rounded-xs ${
                  selectedCategory === cat
                    ? isDark
                      ? 'bg-[#FAF9F6] text-[#0D0D0E] font-medium shadow-sm'
                      : 'bg-[#18181B] text-[#FAF9F6] font-medium shadow-sm'
                    : isDark
                      ? 'text-[#A1A1AA] hover:text-[#FAF9F6]'
                      : 'text-[#71717A] hover:text-[#18181B]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid: Large Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {filteredProjects.map((project, idx) => (
            <motion.article
              key={project.id || idx}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (idx % 2) * 0.15 }}
              onClick={() => setActiveProject(project)}
              className={`group cursor-pointer rounded-sm border p-8 sm:p-10 flex flex-col justify-between transition-all duration-500 relative overflow-hidden ${
                isDark
                  ? 'border-[#222227] bg-[#141416]/50 hover:border-[#3E3E4A] hover:bg-[#18181C]/80 shadow-[0_4px_20px_rgba(0,0,0,0.2)]'
                  : 'border-[#E7E5E4] bg-white/70 hover:border-[#D6D3D1] hover:bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
              }`}
            >
              {/* Subtle luxury ambient highlight on hover */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#E2D4BA]/5 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div>
                {/* Meta Header: Category, Role, Year (Zero-pill metadata) */}
                <div className="flex items-center justify-between gap-4 text-xs font-sans-luxury text-[#A1A1AA]/80 mb-6 pb-4 border-b border-[#27272A]/40">
                  <div className="flex items-center gap-2">
                    <span className="uppercase tracking-[0.2em] font-medium text-[11px]">
                      {project.category}
                    </span>
                    <span aria-hidden="true" className="opacity-40">·</span>
                    <span>{project.role}</span>
                  </div>
                  <span className="font-serif-luxury italic text-sm">{project.year}</span>
                </div>

                {/* Title & Subtitle */}
                <div className="mb-4">
                  <h3
                    className={`font-serif-luxury text-3xl sm:text-4xl font-normal tracking-tight group-hover:text-[#E2D4BA] transition-colors duration-300 flex items-center justify-between gap-4 ${
                      isDark ? 'text-[#FAF9F6]' : 'text-[#18181B]'
                    }`}
                  >
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-5 h-5 shrink-0 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-current" />
                  </h3>
                  <p
                    className={`text-xs font-sans-luxury uppercase tracking-[0.16em] mt-1.5 ${
                      isDark ? 'text-[#A1A1AA]' : 'text-[#71717A]'
                    }`}
                  >
                    {project.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p
                  className={`text-sm sm:text-base font-sans-luxury font-light leading-relaxed mb-6 line-clamp-3 ${
                    isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'
                  }`}
                >
                  {project.description}
                </p>

                {/* Project Highlights preview */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="mb-6 space-y-2">
                    {project.highlights.slice(0, 2).map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-xs font-sans-luxury text-[#A1A1AA]/90">
                        <span className={`w-1 h-1 rounded-full mt-1.5 shrink-0 ${isDark ? 'bg-[#E2D4BA]' : 'bg-[#9A7B38]'}`} />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Technologies & Action Footer */}
              <div className="pt-6 border-t border-[#27272A]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-sans-luxury text-[#A1A1AA]/80">
                  {project.technologies.slice(0, 4).map((tech, tIdx) => (
                    <React.Fragment key={tIdx}>
                      <span className={isDark ? 'text-[#D4D4D8]' : 'text-[#27272A]'}>
                        {tech}
                      </span>
                      {tIdx < Math.min(project.technologies.length, 4) - 1 && (
                        <span aria-hidden="true" className="opacity-30">·</span>
                      )}
                    </React.Fragment>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="opacity-50 text-[11px]">+{project.technologies.length - 4} more</span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-sans-luxury tracking-[0.14em] uppercase font-medium group-hover:underline underline-offset-4 ${
                      isDark ? 'text-[#E2D4BA]' : 'text-[#9A7B38]'
                    }`}
                  >
                    View Details
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
