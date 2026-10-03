import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

export const Experience: React.FC = () => {
  const { data, theme } = usePortfolio();
  const isDark = theme === 'dark';

  return (
    <section id="experience" className="py-28 md:py-36 border-t border-[#27272A]/40 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-20">
          <span
            className={`text-xs font-sans-luxury tracking-[0.25em] uppercase font-semibold ${
              isDark ? 'text-[#E2D4BA]' : 'text-[#9A7B38]'
            }`}
          >
            02 / CAREER
          </span>
          <h2
            className={`font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-normal mt-3 tracking-tight ${
              isDark ? 'text-[#FAF9F6]' : 'text-[#18181B]'
            }`}
          >
            Experience & Journey
          </h2>
          <p
            className={`text-sm md:text-base font-sans-luxury font-light mt-3 max-w-xl ${
              isDark ? 'text-[#A1A1AA]' : 'text-[#71717A]'
            }`}
          >
            A track record of engineering clean web solutions, translating designs, and building modern digital experiences.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative pl-6 md:pl-10 border-l border-[#27272A]/70 space-y-16 max-w-4xl">
          {data.experiences.map((exp, index) => (
            <motion.div
              key={exp.id || index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Timeline Indicator Dot */}
              <div
                className={`absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                  isDark
                    ? 'border-[#E2D4BA] bg-[#0D0D0E] group-hover:bg-[#E2D4BA] group-hover:scale-125'
                    : 'border-[#9A7B38] bg-[#FAF9F6] group-hover:bg-[#9A7B38] group-hover:scale-125'
                }`}
              />

              <div
                className={`p-6 sm:p-8 rounded-sm border transition-all duration-300 ${
                  isDark
                    ? 'border-[#222227] bg-[#141416]/40 hover:border-[#33333C] hover:bg-[#141416]/70'
                    : 'border-[#E7E5E4] bg-white/70 hover:border-[#D6D3D1] hover:bg-white'
                }`}
              >
                {/* Header row: Period & Location */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-sans-luxury tracking-wider mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 opacity-60" />
                    <span
                      className={`font-semibold tracking-widest uppercase ${
                        isDark ? 'text-[#E2D4BA]' : 'text-[#9A7B38]'
                      }`}
                    >
                      {exp.period}
                    </span>
                  </div>

                  {exp.location && (
                    <div className="flex items-center gap-1.5 text-[#A1A1AA]/80">
                      <MapPin className="w-3 h-3 opacity-60" />
                      <span>{exp.location}</span>
                    </div>
                  )}
                </div>

                {/* Job Title & Company */}
                <h3
                  className={`font-serif-luxury text-2xl sm:text-3xl font-medium tracking-wide mb-1 ${
                    isDark ? 'text-[#FAF9F6]' : 'text-[#18181B]'
                  }`}
                >
                  {exp.role}
                </h3>
                <h4
                  className={`text-sm font-sans-luxury font-medium uppercase tracking-[0.15em] mb-4 ${
                    isDark ? 'text-[#D4D4D8]/80' : 'text-[#52525B]'
                  }`}
                >
                  {exp.company}
                </h4>

                {/* Description */}
                <p
                  className={`text-sm sm:text-base font-sans-luxury font-light leading-relaxed mb-6 ${
                    isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'
                  }`}
                >
                  {exp.description}
                </p>

                {/* Responsibilities / Highlights */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-2.5 mb-6 text-xs sm:text-sm font-sans-luxury font-light">
                    {exp.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-3">
                        <span
                          className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                            isDark ? 'bg-[#E2D4BA]/70' : 'bg-[#9A7B38]/70'
                          }`}
                        />
                        <span className={isDark ? 'text-[#D4D4D8]' : 'text-[#3F3F46]'}>
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Technologies (Zero-pill metadata) */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="pt-4 border-t border-[#27272A]/40 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-sans-luxury text-[#A1A1AA]/80">
                    <span className="uppercase tracking-widest text-[10px] opacity-60">
                      Tech:
                    </span>
                    {exp.technologies.map((tech, tIdx) => (
                      <React.Fragment key={tIdx}>
                        <span className={isDark ? 'text-[#E4E4E7]' : 'text-[#27272A]'}>
                          {tech}
                        </span>
                        {tIdx < exp.technologies!.length - 1 && (
                          <span aria-hidden="true" className="opacity-40">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
