import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'motion/react';
import { GraduationCap, Award, CheckCircle, Calendar } from 'lucide-react';

export const Education: React.FC = () => {
  const { data, theme } = usePortfolio();
  const isDark = theme === 'dark';

  return (
    <section id="education" className="py-28 md:py-36 border-t border-[#27272A]/40 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Education Column */}
          <div className="lg:col-span-7">
            <span
              className={`text-xs font-sans-luxury tracking-[0.25em] uppercase font-semibold ${
                isDark ? 'text-[#E2D4BA]' : 'text-[#9A7B38]'
              }`}
            >
              05 / ACADEMIC BACKGROUND
            </span>
            <h2
              className={`font-serif-luxury text-4xl sm:text-5xl font-normal mt-3 mb-10 tracking-tight ${
                isDark ? 'text-[#FAF9F6]' : 'text-[#18181B]'
              }`}
            >
              Education
            </h2>

            <div className="space-y-8">
              {data.education.map((edu, idx) => (
                <motion.div
                  key={edu.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`p-8 rounded-sm border transition-all duration-300 ${
                    isDark
                      ? 'border-[#222227] bg-[#141416]/50 hover:border-[#383842]'
                      : 'border-[#E7E5E4] bg-white/70 hover:border-[#D6D3D1]'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-sans-luxury mb-4">
                    <span
                      className={`font-semibold tracking-widest uppercase ${
                        isDark ? 'text-[#E2D4BA]' : 'text-[#9A7B38]'
                      }`}
                    >
                      {edu.period}
                    </span>
                    {edu.location && (
                      <span className="text-[#A1A1AA]/80">{edu.location}</span>
                    )}
                  </div>

                  <h3
                    className={`font-serif-luxury text-2xl sm:text-3xl font-medium tracking-wide mb-2 ${
                      isDark ? 'text-[#FAF9F6]' : 'text-[#18181B]'
                    }`}
                  >
                    {edu.degree}
                  </h3>

                  <h4
                    className={`text-sm font-sans-luxury font-medium uppercase tracking-[0.14em] mb-4 ${
                      isDark ? 'text-[#D4D4D8]/80' : 'text-[#52525B]'
                    }`}
                  >
                    {edu.institution}
                  </h4>

                  {edu.details && (
                    <p
                      className={`text-sm font-sans-luxury font-light leading-relaxed ${
                        isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'
                      }`}
                    >
                      {edu.details}
                    </p>
                  )}

                  {edu.honors && (
                    <div className="mt-4 pt-4 border-t border-[#27272A]/40 text-xs font-sans-luxury text-[#E2D4BA]">
                      {edu.honors}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications & Continuous Learning Column */}
          <div className="lg:col-span-5">
            <span
              className={`text-xs font-sans-luxury tracking-[0.25em] uppercase font-semibold ${
                isDark ? 'text-[#E2D4BA]' : 'text-[#9A7B38]'
              }`}
            >
              06 / CERTIFICATIONS & CREDENTIALS
            </span>
            <h2
              className={`font-serif-luxury text-4xl sm:text-5xl font-normal mt-3 mb-10 tracking-tight ${
                isDark ? 'text-[#FAF9F6]' : 'text-[#18181B]'
              }`}
            >
              Qualifications
            </h2>

            {data.certifications && data.certifications.length > 0 ? (
              <div className="space-y-4">
                {data.certifications.map((cert, cIdx) => (
                  <motion.div
                    key={cert.id || cIdx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: cIdx * 0.1 }}
                    className={`p-6 rounded-sm border transition-all duration-300 ${
                      isDark
                        ? 'border-[#222227] bg-[#141416]/40 hover:border-[#383842]'
                        : 'border-[#E7E5E4] bg-white/70 hover:border-[#D6D3D1]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4
                          className={`font-serif-luxury text-xl font-normal tracking-wide mb-1 ${
                            isDark ? 'text-[#FAF9F6]' : 'text-[#18181B]'
                          }`}
                        >
                          {cert.title}
                        </h4>
                        <p
                          className={`text-xs font-sans-luxury uppercase tracking-[0.14em] ${
                            isDark ? 'text-[#A1A1AA]' : 'text-[#71717A]'
                          }`}
                        >
                          {cert.issuer}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-sans-luxury tracking-widest uppercase font-medium shrink-0 ${
                          isDark ? 'text-[#E2D4BA]' : 'text-[#9A7B38]'
                        }`}
                      >
                        {cert.year}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-sm font-sans-luxury text-[#A1A1AA]">
                Credentials and verified achievements available upon request.
              </p>
            )}

            {/* Guiding Principles Note */}
            <div
              className={`mt-8 p-6 border rounded-sm ${
                isDark
                  ? 'border-[#222227] bg-[#141416]/20 text-[#A1A1AA]'
                  : 'border-[#E7E5E4] bg-white/40 text-[#71717A]'
              }`}
            >
              <span className="block text-[11px] font-sans-luxury uppercase tracking-[0.2em] mb-2 opacity-60">
                Philosophy on Continuous Growth
              </span>
              <p className="text-xs font-sans-luxury font-light leading-relaxed">
                Active study of emerging web specifications, TypeScript strictness patterns, accessibility standards, and modern component ergonomics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
