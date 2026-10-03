import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, theme } = usePortfolio();
  const isDark = theme === 'dark';

  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`border-t py-16 transition-colors duration-500 ${
        isDark ? 'border-[#222227] bg-[#0A0A0B]' : 'border-[#E7E5E4] bg-[#F5F4F0]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 border-b border-[#27272A]/40">
          <div>
            <span className="font-serif-luxury text-3xl font-medium tracking-wide block uppercase">
              {data.personal.name}
            </span>
            <span
              className={`text-xs font-sans-luxury uppercase tracking-[0.2em] mt-1 block ${
                isDark ? 'text-[#A1A1AA]' : 'text-[#71717A]'
              }`}
            >
              {data.personal.role}
            </span>
          </div>

          {/* Social links & contact */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-sans-luxury tracking-widest uppercase">
            {data.personal.email && (
              <a
                href={`mailto:${data.personal.email}`}
                className={`transition-colors ${
                  isDark ? 'text-[#A1A1AA] hover:text-[#FAF9F6]' : 'text-[#71717A] hover:text-[#18181B]'
                }`}
              >
                Email
              </a>
            )}
            {data.personal.github && (
              <a
                href={data.personal.github}
                target="_blank"
                rel="noreferrer"
                className={`transition-colors ${
                  isDark ? 'text-[#A1A1AA] hover:text-[#FAF9F6]' : 'text-[#71717A] hover:text-[#18181B]'
                }`}
              >
                GitHub
              </a>
            )}
            {data.personal.linkedin && (
              <a
                href={data.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className={`transition-colors ${
                  isDark ? 'text-[#A1A1AA] hover:text-[#FAF9F6]' : 'text-[#71717A] hover:text-[#18181B]'
                }`}
              >
                LinkedIn
              </a>
            )}
            <button
              onClick={scrollToTop}
              className={`flex items-center gap-1.5 transition-colors ${
                isDark ? 'text-[#E2D4BA] hover:text-[#FAF9F6]' : 'text-[#9A7B38] hover:text-[#18181B]'
              }`}
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-sans-luxury text-[#A1A1AA]/70">
          <div>
            <span>© {new Date().getFullYear()} {data.personal.name}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            {currentTime && <span>System Time: {currentTime}</span>}
            <span aria-hidden="true" className="opacity-40">·</span>
            <span>Minimalist Editorial Portfolio</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
