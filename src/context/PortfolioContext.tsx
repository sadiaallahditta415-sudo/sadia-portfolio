import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData, ProjectItem } from '../types/portfolio';
import { defaultPortfolioData } from '../data/defaultPortfolioData';

interface PortfolioContextType {
  data: PortfolioData;
  updateData: (newData: PortfolioData) => void;
  resetToDefault: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isCvModalOpen: boolean;
  setIsCvModalOpen: (open: boolean) => void;
  cvModalTab: 'preview' | 'edit' | 'import';
  setCvModalTab: (tab: 'preview' | 'edit' | 'import') => void;
  activeProject: ProjectItem | null;
  setActiveProject: (proj: ProjectItem | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const STORAGE_KEY = 'sadia_portfolio_data_v1';
const THEME_KEY = 'sadia_portfolio_theme_v1';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return defaultPortfolioData;
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // Fallback
    }
    return 'dark';
  });

  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [cvModalTab, setCvModalTab] = useState<'preview' | 'edit' | 'import'>('preview');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
  }, [data]);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore
    }
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
      document.body.style.backgroundColor = '#FAF9F6';
      document.body.style.color = '#18181B';
    } else {
      document.documentElement.classList.remove('light-theme');
      document.body.style.backgroundColor = '#0D0D0E';
      document.body.style.color = '#E4E4E7';
    }
  }, [theme]);

  const updateData = (newData: PortfolioData) => {
    setData(newData);
    showToast('Portfolio information updated');
  };

  const resetToDefault = () => {
    setData(defaultPortfolioData);
    localStorage.removeItem(STORAGE_KEY);
    showToast('Reset to original portfolio data');
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3200);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateData,
        resetToDefault,
        theme,
        toggleTheme,
        isCvModalOpen,
        setIsCvModalOpen,
        cvModalTab,
        setCvModalTab,
        activeProject,
        setActiveProject,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
