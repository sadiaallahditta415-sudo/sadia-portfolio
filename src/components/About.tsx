import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'motion/react';
import { Check, Code2, Layers, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  const { data, theme } = usePortfolio();
  const isDark = theme === 'dark';

  const strengths = [
    {
      title: 'Component Architecture',
      description: 'Engineering modular, scalable, and reusable frontend systems that grow effortlessly with product needs.',
    },
    {
      title: 'Precision UI/UX Implementation',
      description: 'Bridging the design-to-code gap with meticulous typography, responsive rhythm, and accessible markup.',
    },
    {
      title: 'Performance & Optimization',
      description: 'Writing lean, modern JavaScript and CSS that loads quickly, avoids layout shifts, and feels instantaneous.',
    },
  ];

  return (
    <section id="about" className="py-28 md:py-36 border-t border-[#27272A]/40 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column (Split layout: Section number & title) */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <span
                className={`text-xs font-sans-luxury tracking-[0.25em] uppercase font-semibold ${
                  isDark ? 'text-[#E2D4BA]' : 'text-[#9A7B38]'
                }`}
              >
                01 / OVERVIEW
              </span>
              <h2
                className={`font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-normal mt-3 tracking-tight ${
                  isDark ? 'text-[#FAF9F6]' : 'text-[#18181B]'
                }`}
              >
                About Me
              </h2>

              <div
                className={`mt-8 pt-8 border-t space-y-4 text-xs font-sans-luxury tracking-wide ${
                  isDark ? 'border-[#27272A]/60 text-[#A1A1AA]' : 'border-[#E7E5E4] text-[#71717A]'
                }`}
              >
                <div>
                  <span className="block opacity-50 uppercase tracking-[0.2em] mb-1">Focus</span>
                  <span className={`font-medium text-sm ${isDark ? 'text-[#E4E4E7]' : 'text-[#18181B]'}`}>
                    Frontend & Web Engineering
                  </span>
                </div>
                <div>
                  <span className="block opacity-50 uppercase tracking-[0.2em] mb-1">Specialization</span>
                  <span className={`font-medium text-sm ${isDark ? 'text-[#E4E4E7]' : 'text-[#18181B]'}`}>
                    React, TypeScript, Responsive Systems
                  </span>
                </div>
                <div>
                  <span className="block opacity-50 uppercase tracking-[0.2em] mb-1">Location</span>
                  <span className={`font-medium text-sm ${isDark ? 'text-[#E4E4E7]' : 'text-[#18181B]'}`}>
                    {data.personal.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Professional intro, background, key strengths) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              {/* Professional Introduction */}
              <p
                className={`font-serif-luxury text-2xl sm:text-3xl md:text-3xl leading-snug font-normal ${
                  isDark ? 'text-[#F4F4F5]' : 'text-[#27272A]'
                }`}
              >
                "{data.personal.headline}"
              </p>

              {/* Relevant Background */}
              <div
                className={`space-y-6 text-base sm:text-lg font-sans-luxury font-light leading-relaxed ${
                  isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'
                }`}
              >
                <p>{data.personal.aboutSummary}</p>
                <p>{data.personal.aboutPhilosophy}</p>
              </div>

              {/* Key Strengths */}
              <div className="pt-10 border-t border-[#27272A]/40">
                <span
                  className={`text-xs font-sans-luxury tracking-[0.2em] uppercase font-medium block mb-6 ${
                    isDark ? 'text-[#E2D4BA]' : 'text-[#9A7B38]'
                  }`}
                >
                  Core Pillars of Practice
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {strengths.map((s, idx) => (
                    <div
                      key={idx}
                      className={`p-6 border rounded-sm transition-all duration-300 ${
                        isDark
                          ? 'border-[#222227] bg-[#141416]/50 hover:border-[#383842]'
                          : 'border-[#E7E5E4] bg-white/70 hover:border-[#D6D3D1]'
                      }`}
                    >
                      <span className="text-xs font-serif-luxury italic text-[#A1A1AA] block mb-2">
                        0{idx + 1}
                      </span>
                      <h4
                        className={`text-sm font-sans-luxury font-semibold uppercase tracking-wider mb-2 ${
                          isDark ? 'text-[#FAF9F6]' : 'text-[#18181B]'
                        }`}
                      >
                        {s.title}
                      </h4>
                      <p
                        className={`text-xs font-sans-luxury leading-relaxed ${
                          isDark ? 'text-[#A1A1AA]' : 'text-[#71717A]'
                        }`}
                      >
                        {s.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
