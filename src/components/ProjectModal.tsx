import React, { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, ExternalLink, Github, CheckCircle2, ArrowRight } from 'lucide-react';

export const ProjectModal: React.FC = () => {
  const { activeProject, setActiveProject, theme } = usePortfolio();
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProject(null);
      }
    };
    if (activeProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeProject, setActiveProject]);

  if (!activeProject) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setActiveProject(null)}
      />

      {/* Modal Dialog Card */}
      <div
        className={`relative w-full max-w-3xl my-8 p-6 sm:p-10 rounded-sm border shadow-2xl z-10 transition-all ${
          isDark
            ? 'bg-[#121214] border-[#2A2A32] text-[#FAF9F6]'
            : 'bg-[#FAF9F6] border-[#E2E0D8] text-[#18181B]'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setActiveProject(null)}
          className={`absolute top-6 right-6 p-2 rounded-xs transition-colors border ${
            isDark
              ? 'border-[#2D2D33] text-[#A1A1AA] hover:text-[#FAF9F6] hover:border-[#3F3F46]'
              : 'border-[#E2E0D8] text-[#71717A] hover:text-[#18181B] hover:border-[#D4D4D8]'
          }`}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pr-12 mb-6">
          <div className="flex items-center gap-2 text-xs font-sans-luxury text-[#A1A1AA] mb-2 uppercase tracking-wider">
            <span>{activeProject.category}</span>
            <span aria-hidden="true">·</span>
            <span>{activeProject.year}</span>
            <span aria-hidden="true">·</span>
            <span className={isDark ? 'text-[#E2D4BA]' : 'text-[#9A7B38]'}>
              {activeProject.role}
            </span>
          </div>

          <h3
            id="modal-project-title"
            className="font-serif-luxury text-3xl sm:text-4xl font-normal tracking-tight"
          >
            {activeProject.title}
          </h3>
          <p
            className={`text-xs font-sans-luxury uppercase tracking-[0.16em] mt-1 ${
              isDark ? 'text-[#A1A1AA]' : 'text-[#71717A]'
            }`}
          >
            {activeProject.subtitle}
          </p>
        </div>

        {/* Full Narrative */}
        <div className="space-y-6 pt-6 border-t border-[#27272A]/40 mb-8">
          <div>
            <h4 className="text-xs font-sans-luxury uppercase tracking-[0.2em] opacity-60 mb-2 font-medium">
              Project Overview
            </h4>
            <p
              className={`text-sm sm:text-base font-sans-luxury font-light leading-relaxed ${
                isDark ? 'text-[#D4D4D8]' : 'text-[#3F3F46]'
              }`}
            >
              {activeProject.description}
            </p>
          </div>

          {/* Key Architectural Highlights */}
          {activeProject.highlights && activeProject.highlights.length > 0 && (
            <div>
              <h4 className="text-xs font-sans-luxury uppercase tracking-[0.2em] opacity-60 mb-3 font-medium">
                Key Deliverables & Implementation Highlights
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm font-sans-luxury font-light">
                {activeProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                        isDark ? 'bg-[#E2D4BA]' : 'bg-[#9A7B38]'
                      }`}
                    />
                    <span className={isDark ? 'text-[#D4D4D8]' : 'text-[#3F3F46]'}>
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies Stack */}
          <div>
            <h4 className="text-xs font-sans-luxury uppercase tracking-[0.2em] opacity-60 mb-3 font-medium">
              Technologies & Methodologies
            </h4>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-sans-luxury">
              {activeProject.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 border rounded-xs ${
                    isDark
                      ? 'border-[#27272A] bg-[#18181B] text-[#E4E4E7]'
                      : 'border-[#E5E5E5] bg-white text-[#27272A]'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="pt-6 border-t border-[#27272A]/40 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {activeProject.githubUrl && (
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xs text-xs font-sans-luxury tracking-[0.14em] uppercase transition-all border ${
                  isDark
                    ? 'border-[#2D2D33] text-[#FAF9F6] hover:border-[#E2D4BA] hover:text-[#E2D4BA]'
                    : 'border-[#D4D4D8] text-[#18181B] hover:border-[#9A7B38] hover:text-[#9A7B38]'
                }`}
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Repository</span>
              </a>
            )}

            {activeProject.liveUrl && (
              <a
                href={activeProject.liveUrl}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xs text-xs font-sans-luxury tracking-[0.14em] uppercase font-medium transition-all ${
                  isDark
                    ? 'bg-[#FAF9F6] text-[#0D0D0E] hover:bg-[#E2D4BA]'
                    : 'bg-[#18181B] text-[#FAF9F6] hover:bg-[#27272A]'
                }`}
              >
                <span>Live Demonstration</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <button
            onClick={() => setActiveProject(null)}
            className="text-xs font-sans-luxury tracking-[0.14em] uppercase opacity-60 hover:opacity-100 transition-opacity"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
