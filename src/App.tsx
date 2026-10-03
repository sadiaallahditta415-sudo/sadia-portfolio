import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { CvModal } from './components/CvModal';
import { FileText, CheckCircle2 } from 'lucide-react';

const PortfolioContent: React.FC = () => {
  const { theme, toastMessage, setIsCvModalOpen, setCvModalTab } = usePortfolio();
  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen relative font-sans-luxury selection:bg-[#E2D4BA]/30 selection:text-white transition-colors duration-500 ${
        isDark ? 'bg-[#0D0D0E] text-[#E4E4E7]' : 'bg-[#FAF9F6] text-[#18181B]'
      }`}
    >
      {/* Subtle Noise / Radial glow background */}
      <div className="fixed inset-0 pointer-events-none bg-grain opacity-40 z-0" />

      {/* Main navigation */}
      <Navbar />

      {/* Page Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <ProjectModal />
      <CvModal />

      {/* Floating Discrete Quick CV Button */}
      <aside aria-label="Quick Actions" className="fixed bottom-6 right-6 z-30 no-print">
        <button
          onClick={() => {
            setCvModalTab('preview');
            setIsCvModalOpen(true);
          }}
          className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-lg border transition-all duration-300 hover:scale-105 ${
            isDark
              ? 'bg-[#18181B]/90 backdrop-blur-md border-[#2E2E38] text-[#FAF9F6] hover:border-[#E2D4BA]/70 hover:shadow-[0_4px_24px_rgba(226,212,186,0.15)]'
              : 'bg-white/90 backdrop-blur-md border-[#E2E0D8] text-[#18181B] hover:border-[#9A7B38]/70 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]'
          }`}
          title="Open Curriculum Vitae / Resume"
        >
          <FileText className="w-4 h-4 opacity-75 group-hover:text-[#E2D4BA]" />
          <span className="text-xs font-sans-luxury tracking-[0.14em] uppercase font-medium">
            CV / Resume
          </span>
        </button>
      </aside>

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-sm border shadow-xl flex items-center gap-2.5 text-xs font-sans-luxury tracking-wide animate-fade-in transition-all bg-[#18181B] border-[#2E2E38] text-[#FAF9F6]"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}
