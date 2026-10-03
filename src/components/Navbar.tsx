import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Menu, X, Sun, Moon, FileText, Settings2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { data, theme, toggleTheme, setIsCvModalOpen, setCvModalTab } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['about', 'experience', 'skills', 'projects', 'education', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const isDark = theme === 'dark';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? isDark
              ? 'bg-[#0D0D0E]/85 backdrop-blur-md border-b border-[#222227]/80 py-3.5 shadow-sm'
              : 'bg-[#FAF9F6]/85 backdrop-blur-md border-b border-[#E7E5E4]/80 py-3.5 shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Text-based Minimal Logo */}
          <a
            href="#"
            className="group flex items-baseline gap-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E2D4BA]"
          >
            <span
              className={`font-serif-luxury text-2xl tracking-[0.2em] font-medium uppercase transition-colors duration-300 ${
                isDark ? 'text-[#FAF9F6] group-hover:text-[#E2D4BA]' : 'text-[#18181B] group-hover:text-[#9A7B38]'
              }`}
            >
              {data.personal.name || 'Sadia'}
            </span>
            <span
              className={`text-[9px] tracking-[0.25em] uppercase font-sans-luxury opacity-40 transition-opacity group-hover:opacity-80 ${
                isDark ? 'text-[#A1A1AA]' : 'text-[#71717A]'
              }`}
            >
              / DEV
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-[0.14em] uppercase font-sans-luxury font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative py-1 transition-colors duration-300 ${
                    isActive
                      ? isDark ? 'text-[#E2D4BA]' : 'text-[#9A7B38]'
                      : isDark ? 'text-[#A1A1AA] hover:text-[#FAF9F6]' : 'text-[#71717A] hover:text-[#18181B]'
                  }`}
                >
                  {link.label}
                  {/* Subtle animated underline */}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] transition-all duration-300 ${
                      isActive
                        ? isDark ? 'w-full bg-[#E2D4BA]' : 'w-full bg-[#9A7B38]'
                        : isDark ? 'w-0 bg-[#E2D4BA]/60 group-hover:w-full' : 'w-0 bg-[#9A7B38]/60 group-hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* View / Download CV Button */}
            <button
              onClick={() => {
                setCvModalTab('preview');
                setIsCvModalOpen(true);
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-sm text-xs font-sans-luxury tracking-[0.12em] uppercase transition-all duration-300 border ${
                isDark
                  ? 'border-[#2D2D33] text-[#D4D4D8] hover:border-[#E2D4BA]/60 hover:text-[#FAF9F6] bg-[#141416]/60'
                  : 'border-[#E2E0D8] text-[#52525B] hover:border-[#9A7B38]/60 hover:text-[#18181B] bg-white/70'
              }`}
              title="View & Download Curriculum Vitae"
            >
              <FileText className="w-3.5 h-3.5 opacity-70" />
              <span>Curriculum Vitae</span>
            </button>

            {/* Quick CV Data Customizer */}
            <button
              onClick={() => {
                setCvModalTab('edit');
                setIsCvModalOpen(true);
              }}
              className={`p-2 rounded-sm transition-colors border ${
                isDark
                  ? 'border-[#2D2D33] text-[#A1A1AA] hover:text-[#FAF9F6] hover:border-[#3F3F46]'
                  : 'border-[#E2E0D8] text-[#71717A] hover:text-[#18181B] hover:border-[#D4D4D8]'
              }`}
              title="Edit / Import Resume Information"
              aria-label="Edit Resume Information"
            >
              <Settings2 className="w-4 h-4" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-sm transition-colors border ${
                isDark
                  ? 'border-[#2D2D33] text-[#A1A1AA] hover:text-[#E2D4BA] hover:border-[#3F3F46]'
                  : 'border-[#E2E0D8] text-[#71717A] hover:text-[#9A7B38] hover:border-[#D4D4D8]'
              }`}
              title={`Switch to ${isDark ? 'Ivory Light' : 'Obsidian Dark'} mode`}
              aria-label="Toggle visual theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-sm border ${
                isDark ? 'border-[#2D2D33] text-[#A1A1AA]' : 'border-[#E2E0D8] text-[#71717A]'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-sm border ${
                isDark ? 'border-[#2D2D33] text-[#FAF9F6]' : 'border-[#E2E0D8] text-[#18181B]'
              }`}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`fixed inset-0 z-50 lg:hidden flex flex-col transition-all duration-300 ${
            isDark ? 'bg-[#0D0D0E]' : 'bg-[#FAF9F6]'
          }`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#27272A]/40">
            <span className="font-serif-luxury text-2xl tracking-[0.2em] uppercase font-medium">
              {data.personal.name}
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-current"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 px-8 py-10 flex flex-col justify-between">
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, idx) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-serif-luxury text-3xl tracking-wide transition-colors ${
                    isDark ? 'text-[#FAF9F6] hover:text-[#E2D4BA]' : 'text-[#18181B] hover:text-[#9A7B38]'
                  }`}
                >
                  <span className="text-xs font-sans-luxury tracking-widest text-[#A1A1AA] mr-4 opacity-50">
                    0{idx + 1}
                  </span>
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-8 border-t border-[#27272A]/40 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCvModalTab('preview');
                  setIsCvModalOpen(true);
                }}
                className={`w-full py-3 text-center text-xs tracking-[0.16em] uppercase font-sans-luxury border rounded-sm ${
                  isDark
                    ? 'border-[#E2D4BA] text-[#E2D4BA] bg-[#E2D4BA]/5'
                    : 'border-[#9A7B38] text-[#9A7B38] bg-[#9A7B38]/5'
                }`}
              >
                View Full Curriculum Vitae
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCvModalTab('edit');
                  setIsCvModalOpen(true);
                }}
                className="w-full py-2.5 text-center text-xs tracking-[0.16em] uppercase font-sans-luxury opacity-70 hover:opacity-100"
              >
                Edit / Import CV Data
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
