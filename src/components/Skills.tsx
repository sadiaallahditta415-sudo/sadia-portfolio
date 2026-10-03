import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'motion/react';
import { Terminal, Cpu, PenTool, CheckCircle2 } from 'lucide-react';

export const Skills: React.FC = () => {
  const { data, theme } = usePortfolio();
  const isDark = theme === 'dark';

  const categoryIcons: Record<string, React.ReactNode> = {
    'TECHNICAL DEVELOPMENT': <Terminal className="w-4 h-4 opacity-70" />,
    'PROFESSIONAL & ARCHITECTURE': <Cpu className="w-4 h-4 opacity-70" />,
    'TOOLS & ECOSYSTEM': <PenTool className="w-4 h-4 opacity-70" />,
  };

  return (
    <section id="skills" className="py-28 md:py-36 border-t border-[#27272A]/40 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-20">
          <span
            className={`text-xs font-sans-luxury tracking-[0.25em] uppercase font-semibold ${
              isDark ? 'text-[#E2D4BA]' : 'text-[#9A7B38]'
            }`}
          >
            03 / CAPABILITIES
          </span>
          <h2
            className={`font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-normal mt-3 tracking-tight ${
              isDark ? 'text-[#FAF9F6]' : 'text-[#18181B]'
            }`}
          >
            Skills & Expertise
          </h2>
          <p
            className={`text-sm md:text-base font-sans-luxury font-light mt-3 max-w-xl ${
              isDark ? 'text-[#A1A1AA]' : 'text-[#71717A]'
            }`}
          >
            Disciplined competencies spanning core web development, component architecture, and modern developer tooling.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.skills.map((category, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: catIdx * 0.15 }}
              className={`p-8 rounded-sm border transition-all duration-300 flex flex-col justify-between ${
                isDark
                  ? 'border-[#222227] bg-[#141416]/50 hover:border-[#383842]'
                  : 'border-[#E7E5E4] bg-white/70 hover:border-[#D6D3D1]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span
                    className={`text-xs font-sans-luxury font-semibold uppercase tracking-[0.2em] ${
                      isDark ? 'text-[#E2D4BA]' : 'text-[#9A7B38]'
                    }`}
                  >
                    {category.category}
                  </span>
                  <span className={isDark ? 'text-[#A1A1AA]' : 'text-[#71717A]'}>
                    {categoryIcons[category.category] || <Terminal className="w-4 h-4 opacity-70" />}
                  </span>
                </div>

                {category.description && (
                  <p
                    className={`text-xs font-sans-luxury leading-relaxed mb-6 ${
                      isDark ? 'text-[#A1A1AA]' : 'text-[#71717A]'
                    }`}
                  >
                    {category.description}
                  </p>
                )}

                {/* Items list with refined zero-pill styling */}
                <div className="space-y-3 pt-4 border-t border-[#27272A]/40">
                  {category.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className={`group/skill flex items-center justify-between py-2 border-b transition-colors duration-200 ${
                        isDark
                          ? 'border-[#1E1E24] hover:border-[#33333E]'
                          : 'border-[#F0EDE8] hover:border-[#E2DFD9]'
                      }`}
                    >
                      <span
                        className={`text-xs sm:text-sm font-sans-luxury font-normal transition-transform duration-200 group-hover/skill:translate-x-1 ${
                          isDark
                            ? 'text-[#D4D4D8] group-hover/skill:text-[#FAF9F6]'
                            : 'text-[#3F3F46] group-hover/skill:text-[#18181B]'
                        }`}
                      >
                        {item}
                      </span>
                      <span
                        className={`text-[10px] tracking-wider uppercase opacity-30 group-hover/skill:opacity-80 transition-opacity ${
                          isDark ? 'text-[#E2D4BA]' : 'text-[#9A7B38]'
                        }`}
                      >
                        verified
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 flex items-center justify-between text-[11px] font-sans-luxury opacity-40 uppercase tracking-widest">
                <span>{category.items.length} competencies</span>
                <span>0{catIdx + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
