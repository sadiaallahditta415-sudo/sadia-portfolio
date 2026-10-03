import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight, Compass, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const { data, theme } = usePortfolio();
  const isDark = theme === 'dark';

  return (
    <section className="relative min-h-[94vh] flex flex-col justify-between pt-32 pb-12 overflow-hidden">
      {/* Cinematic subtle background glow & ambient elements */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(226, 212, 186, 0.09), transparent 70%)'
            : 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(197, 160, 89, 0.12), transparent 70%)',
        }}
      />

      {/* Very subtle secondary ambient light bloom */}
      <div
        className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-30 transition-all duration-1000"
        style={{
          background: isDark ? '#E2D4BA' : '#C5A059',
        }}
      />

      {/* Main Hero Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex-1 flex flex-col justify-center relative z-10">
        <div className="max-w-4xl">
          {/* Small professional label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-6"
          >
            <span
              className={`inline-block w-8 h-[1px] ${
                isDark ? 'bg-[#E2D4BA]/60' : 'bg-[#9A7B38]/60'
              }`}
            />
            <span
              className={`text-xs md:text-sm tracking-[0.25em] uppercase font-sans-luxury font-medium ${
                isDark ? 'text-[#E2D4BA]' : 'text-[#9A7B38]'
              }`}
            >
              {data.personal.label || 'PORTFOLIO / PROFESSIONAL PROFILE'}
            </span>
          </motion.div>

          {/* Large Name */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif-luxury text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight leading-[0.92] mb-6"
          >
            <span
              className={
                isDark
                  ? 'text-[#FAF9F6] drop-shadow-sm'
                  : 'text-[#141416]'
              }
            >
              {data.personal.name}
            </span>
          </motion.h1>

          {/* Professional Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-serif-luxury italic font-light tracking-wide ${
                isDark ? 'text-[#D4D4D8]' : 'text-[#3F3F46]'
              }`}
            >
              {data.personal.role}
            </h2>
          </motion.div>

          {/* Short introduction */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={`text-base sm:text-lg md:text-xl font-sans-luxury font-light leading-relaxed max-w-2xl mb-12 ${
              isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'
            }`}
          >
            {data.personal.shortIntro || data.personal.headline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 sm:gap-6"
          >
            <a
              href="#projects"
              className={`group inline-flex items-center gap-3 px-7 py-3.5 rounded-sm text-xs md:text-sm font-sans-luxury tracking-[0.14em] uppercase font-medium transition-all duration-300 shadow-sm ${
                isDark
                  ? 'bg-[#FAF9F6] text-[#0D0D0E] hover:bg-[#E2D4BA] hover:shadow-[0_4px_24px_rgba(226,212,186,0.25)]'
                  : 'bg-[#18181B] text-[#FAF9F6] hover:bg-[#27272A] hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)]'
              }`}
            >
              <span>View My Work</span>
              <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>

            <a
              href="#contact"
              className={`group inline-flex items-center gap-3 px-7 py-3.5 rounded-sm text-xs md:text-sm font-sans-luxury tracking-[0.14em] uppercase font-medium transition-all duration-300 border ${
                isDark
                  ? 'border-[#2D2D33] text-[#FAF9F6] hover:border-[#E2D4BA]/70 hover:text-[#E2D4BA] bg-[#141416]/40'
                  : 'border-[#D4D4D8] text-[#18181B] hover:border-[#9A7B38]/70 hover:text-[#9A7B38] bg-white/60'
              }`}
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Hero Bottom Bar / Unboxed Metadata & Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-[#27272A]/30"
      >
        {/* Unboxed Metadata (Zero-pill discipline) */}
        <div className="flex flex-wrap items-center gap-3 md:gap-6 text-xs font-sans-luxury text-[#A1A1AA]/80">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className={isDark ? 'text-[#D4D4D8]' : 'text-[#3F3F46]'}>
              {data.personal.availability}
            </span>
          </div>
          <span aria-hidden="true" className="opacity-30">·</span>
          <span>{data.personal.location}</span>
          <span aria-hidden="true" className="opacity-30">·</span>
          <span>Semantic & Accessible Web Standards</span>
        </div>

        {/* Scroll indicator with gentle looping animation */}
        <a
          href="#about"
          className={`group inline-flex items-center gap-2.5 text-xs font-sans-luxury tracking-[0.18em] uppercase transition-colors ${
            isDark ? 'text-[#A1A1AA] hover:text-[#FAF9F6]' : 'text-[#71717A] hover:text-[#18181B]'
          }`}
          aria-label="Scroll to explore section"
        >
          <span>Scroll to explore</span>
          <div className="w-4 h-7 rounded-full border border-current p-1 flex justify-center opacity-60 group-hover:opacity-100">
            <div className="w-1 h-1.5 rounded-full bg-current animate-bounce" />
          </div>
        </a>
      </motion.div>
    </section>
  );
};
