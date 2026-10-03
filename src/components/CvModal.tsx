import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { PortfolioData } from '../types/portfolio';
import { X, Printer, Download, Save, RefreshCw, Upload, Check, FileText, Edit3, Code2, AlertCircle } from 'lucide-react';

export const CvModal: React.FC = () => {
  const {
    data,
    updateData,
    resetToDefault,
    isCvModalOpen,
    setIsCvModalOpen,
    cvModalTab,
    setCvModalTab,
    theme,
    showToast,
  } = usePortfolio();

  const isDark = theme === 'dark';

  // Form edit state initialized from data
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [rawText, setRawText] = useState('');
  const [jsonText, setJsonText] = useState(JSON.stringify(data, null, 2));
  const [jsonError, setJsonError] = useState<string | null>(null);

  // Sync formData whenever modal opens or tab changes
  React.useEffect(() => {
    if (isCvModalOpen) {
      setFormData(data);
      setJsonText(JSON.stringify(data, null, 2));
    }
  }, [isCvModalOpen, data]);

  if (!isCvModalOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${data.personal.name.toLowerCase()}_cv.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Downloaded portfolio JSON');
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    updateData(formData);
    setIsCvModalOpen(false);
  };

  const handleApplyJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      if (!parsed.personal || !parsed.personal.name) {
        throw new Error("Invalid structure: missing 'personal.name'");
      }
      updateData(parsed);
      setJsonError(null);
      setIsCvModalOpen(false);
    } catch (err: any) {
      setJsonError(err.message || 'Invalid JSON format');
    }
  };

  const handleParseRawText = () => {
    if (!rawText.trim()) return;

    // Intelligent heuristic parser for pasted CV text
    const lines = rawText.split('\n').map((l) => l.trim()).filter(Boolean);
    const updated = { ...data };

    // Find email if present
    const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) {
      updated.personal.email = emailMatch[0];
    }

    // First line typically name if short
    if (lines.length > 0 && lines[0].length < 40 && !lines[0].includes('@')) {
      updated.personal.name = lines[0];
    }

    // Second line role if short
    if (lines.length > 1 && lines[1].length < 60 && !lines[1].includes('@')) {
      updated.personal.role = lines[1];
    }

    // Look for github or linkedin
    const ghMatch = rawText.match(/github\.com\/([a-zA-Z0-9_-]+)/i);
    if (ghMatch) updated.personal.github = `https://${ghMatch[0]}`;

    const liMatch = rawText.match(/linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i);
    if (liMatch) updated.personal.linkedin = `https://${liMatch[0]}`;

    updateData(updated);
    showToast('Applied recognized details from CV text');
    setCvModalTab('preview');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-cv-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto no-print"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={() => setIsCvModalOpen(false)}
      />

      {/* Modal Dialog Body */}
      <div
        className={`relative w-full max-w-4xl max-h-[92vh] flex flex-col my-auto rounded-sm border shadow-2xl z-10 overflow-hidden ${
          isDark
            ? 'bg-[#121214] border-[#2A2A32] text-[#FAF9F6]'
            : 'bg-[#FAF9F6] border-[#E2E0D8] text-[#18181B]'
        }`}
      >
        {/* Top Header & Tab Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 sm:px-8 py-5 border-b border-[#27272A]/50 bg-black/10">
          <div>
            <h2
              id="modal-cv-title"
              className="font-serif-luxury text-2xl font-normal tracking-wide flex items-center gap-3"
            >
              <span>Curriculum Vitae</span>
              <span className="text-[10px] font-sans-luxury tracking-[0.2em] uppercase opacity-50">
                / {data.personal.name}
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-sm border border-[#27272A]/60 bg-[#161619]/60 text-xs font-sans-luxury">
              <button
                onClick={() => setCvModalTab('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs transition-colors ${
                  cvModalTab === 'preview'
                    ? isDark ? 'bg-[#FAF9F6] text-[#0D0D0E] font-medium' : 'bg-[#18181B] text-[#FAF9F6] font-medium'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Executive CV</span>
              </button>

              <button
                onClick={() => setCvModalTab('edit')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs transition-colors ${
                  cvModalTab === 'edit'
                    ? isDark ? 'bg-[#FAF9F6] text-[#0D0D0E] font-medium' : 'bg-[#18181B] text-[#FAF9F6] font-medium'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Fields</span>
              </button>

              <button
                onClick={() => setCvModalTab('import')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs transition-colors ${
                  cvModalTab === 'import'
                    ? isDark ? 'bg-[#FAF9F6] text-[#0D0D0E] font-medium' : 'bg-[#18181B] text-[#FAF9F6] font-medium'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Paste / JSON</span>
              </button>
            </div>

            <button
              onClick={() => setIsCvModalOpen(false)}
              className="p-2 opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Close CV modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab 1: Printable / Executive Resume Layout */}
        {cvModalTab === 'preview' && (
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-10">
            {/* Top action bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#27272A]/40">
              <span className="text-xs font-sans-luxury tracking-wider text-[#A1A1AA]">
                Official curriculum vitae formatted for print and digital review.
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrint}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xs text-xs font-sans-luxury tracking-[0.14em] uppercase font-medium transition-all ${
                    isDark
                      ? 'bg-[#FAF9F6] text-[#0D0D0E] hover:bg-[#E2D4BA]'
                      : 'bg-[#18181B] text-[#FAF9F6] hover:bg-[#27272A]'
                  }`}
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>

                <button
                  onClick={handleDownloadJson}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xs text-xs font-sans-luxury tracking-[0.14em] uppercase transition-all border ${
                    isDark
                      ? 'border-[#2D2D33] text-[#FAF9F6] hover:border-[#E2D4BA]'
                      : 'border-[#D4D4D8] text-[#18181B] hover:border-[#9A7B38]'
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>JSON</span>
                </button>
              </div>
            </div>

            {/* Document Body (Print-ready layout) */}
            <div className="space-y-8 font-sans-luxury text-sm">
              {/* Header */}
              <div className="border-b border-[#27272A]/50 pb-6">
                <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal tracking-tight">
                  {data.personal.name}
                </h1>
                <h2 className="text-base font-serif-luxury italic tracking-wide mt-1 text-[#E2D4BA]">
                  {data.personal.role}
                </h2>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-[#A1A1AA]">
                  <span>{data.personal.email}</span>
                  <span aria-hidden="true">·</span>
                  <span>{data.personal.location}</span>
                  {data.personal.github && (
                    <>
                      <span aria-hidden="true">·</span>
                      <a href={data.personal.github} target="_blank" rel="noreferrer" className="hover:underline">
                        GitHub Profile
                      </a>
                    </>
                  )}
                  {data.personal.linkedin && (
                    <>
                      <span aria-hidden="true">·</span>
                      <a href={data.personal.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                        LinkedIn Profile
                      </a>
                    </>
                  )}
                </div>
              </div>

              {/* Summary */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A1A1AA] mb-2">
                  Executive Summary
                </h3>
                <p className="text-sm font-light leading-relaxed opacity-90">
                  {data.personal.aboutSummary}
                </p>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A1A1AA] mb-4">
                  Professional Experience
                </h3>
                <div className="space-y-6">
                  {data.experiences.map((exp, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between">
                        <div>
                          <span className="font-medium text-base font-serif-luxury tracking-wide">
                            {exp.role}
                          </span>
                          <span className="text-xs opacity-70 ml-2">/ {exp.company}</span>
                        </div>
                        <span className="text-xs tracking-wider opacity-60 uppercase">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-xs font-light opacity-80">{exp.description}</p>
                      <ul className="list-disc list-inside text-xs space-y-1 opacity-80">
                        {exp.highlights.map((h, hIdx) => (
                          <li key={hIdx}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A1A1AA] mb-3">
                  Technical & Professional Competencies
                </h3>
                <div className="space-y-2 text-xs">
                  {data.skills.map((cat, idx) => (
                    <div key={idx}>
                      <span className="font-semibold uppercase tracking-wider text-[11px] opacity-70 mr-2">
                        {cat.category}:
                      </span>
                      <span className="opacity-90">{cat.items.join(' · ')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A1A1AA] mb-3">
                  Education & Credentials
                </h3>
                <div className="space-y-3">
                  {data.education.map((edu, idx) => (
                    <div key={idx} className="flex flex-wrap items-center justify-between text-xs">
                      <div>
                        <span className="font-medium">{edu.degree}</span>
                        <span className="opacity-70 ml-2">— {edu.institution}</span>
                      </div>
                      <span className="opacity-60">{edu.period}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Form Field Editor */}
        {cvModalTab === 'edit' && (
          <form onSubmit={handleSaveForm} className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 text-xs font-sans-luxury">
            <div>
              <span className="text-xs font-sans-luxury tracking-wider text-[#A1A1AA] block mb-4">
                Update personal details, headline, and contact coordinates. All changes persist in your browser.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block opacity-60 uppercase tracking-widest mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={formData.personal.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personal: { ...formData.personal, name: e.target.value },
                    })
                  }
                  className={`w-full px-3 py-2 border rounded-xs ${
                    isDark ? 'bg-[#18181B] border-[#2A2A32]' : 'bg-white border-[#E2E0D8]'
                  }`}
                />
              </div>

              <div>
                <label className="block opacity-60 uppercase tracking-widest mb-1.5">Professional Role</label>
                <input
                  type="text"
                  value={formData.personal.role}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personal: { ...formData.personal, role: e.target.value },
                    })
                  }
                  className={`w-full px-3 py-2 border rounded-xs ${
                    isDark ? 'bg-[#18181B] border-[#2A2A32]' : 'bg-white border-[#E2E0D8]'
                  }`}
                />
              </div>

              <div>
                <label className="block opacity-60 uppercase tracking-widest mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={formData.personal.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personal: { ...formData.personal, email: e.target.value },
                    })
                  }
                  className={`w-full px-3 py-2 border rounded-xs ${
                    isDark ? 'bg-[#18181B] border-[#2A2A32]' : 'bg-white border-[#E2E0D8]'
                  }`}
                />
              </div>

              <div>
                <label className="block opacity-60 uppercase tracking-widest mb-1.5">Location / Availability</label>
                <input
                  type="text"
                  value={formData.personal.location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personal: { ...formData.personal, location: e.target.value },
                    })
                  }
                  className={`w-full px-3 py-2 border rounded-xs ${
                    isDark ? 'bg-[#18181B] border-[#2A2A32]' : 'bg-white border-[#E2E0D8]'
                  }`}
                />
              </div>

              <div>
                <label className="block opacity-60 uppercase tracking-widest mb-1.5">GitHub URL</label>
                <input
                  type="text"
                  value={formData.personal.github || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personal: { ...formData.personal, github: e.target.value },
                    })
                  }
                  className={`w-full px-3 py-2 border rounded-xs ${
                    isDark ? 'bg-[#18181B] border-[#2A2A32]' : 'bg-white border-[#E2E0D8]'
                  }`}
                />
              </div>

              <div>
                <label className="block opacity-60 uppercase tracking-widest mb-1.5">LinkedIn URL</label>
                <input
                  type="text"
                  value={formData.personal.linkedin || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personal: { ...formData.personal, linkedin: e.target.value },
                    })
                  }
                  className={`w-full px-3 py-2 border rounded-xs ${
                    isDark ? 'bg-[#18181B] border-[#2A2A32]' : 'bg-white border-[#E2E0D8]'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block opacity-60 uppercase tracking-widest mb-1.5">Headline</label>
              <textarea
                rows={2}
                value={formData.personal.headline}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    personal: { ...formData.personal, headline: e.target.value },
                  })
                }
                className={`w-full px-3 py-2 border rounded-xs ${
                  isDark ? 'bg-[#18181B] border-[#2A2A32]' : 'bg-white border-[#E2E0D8]'
                }`}
              />
            </div>

            <div>
              <label className="block opacity-60 uppercase tracking-widest mb-1.5">Short Intro</label>
              <textarea
                rows={2}
                value={formData.personal.shortIntro}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    personal: { ...formData.personal, shortIntro: e.target.value },
                  })
                }
                className={`w-full px-3 py-2 border rounded-xs ${
                  isDark ? 'bg-[#18181B] border-[#2A2A32]' : 'bg-white border-[#E2E0D8]'
                }`}
              />
            </div>

            <div>
              <label className="block opacity-60 uppercase tracking-widest mb-1.5">About Summary</label>
              <textarea
                rows={3}
                value={formData.personal.aboutSummary}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    personal: { ...formData.personal, aboutSummary: e.target.value },
                  })
                }
                className={`w-full px-3 py-2 border rounded-xs ${
                  isDark ? 'bg-[#18181B] border-[#2A2A32]' : 'bg-white border-[#E2E0D8]'
                }`}
              />
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-[#27272A]/40">
              <button
                type="button"
                onClick={resetToDefault}
                className="flex items-center gap-1.5 opacity-60 hover:opacity-100 uppercase tracking-wider text-[11px]"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset to Default CV</span>
              </button>

              <button
                type="submit"
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xs uppercase tracking-[0.16em] font-medium transition-all ${
                  isDark
                    ? 'bg-[#FAF9F6] text-[#0D0D0E] hover:bg-[#E2D4BA]'
                    : 'bg-[#18181B] text-[#FAF9F6] hover:bg-[#27272A]'
                }`}
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 3: Paste CV / JSON Import */}
        {cvModalTab === 'import' && (
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 text-xs font-sans-luxury">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest mb-2">
                Paste Raw CV Text
              </h3>
              <p className="opacity-70 mb-3 text-[11px]">
                Paste your resume text here. The parser will recognize your name, email, roles, and profiles.
              </p>
              <textarea
                rows={4}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Paste your CV text or summary here..."
                className={`w-full px-3 py-2 border rounded-xs font-mono text-xs ${
                  isDark ? 'bg-[#18181B] border-[#2A2A32]' : 'bg-white border-[#E2E0D8]'
                }`}
              />
              <button
                onClick={handleParseRawText}
                className={`mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xs uppercase tracking-wider font-medium border ${
                  isDark ? 'border-[#3F3F46] hover:border-[#E2D4BA]' : 'border-[#D4D4D8] hover:border-[#9A7B38]'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Intelligently Parse & Apply</span>
              </button>
            </div>

            <div className="pt-6 border-t border-[#27272A]/40">
              <h3 className="text-sm font-semibold uppercase tracking-widest mb-2 flex items-center justify-between">
                <span>Direct JSON Configuration</span>
                <button
                  onClick={handleDownloadJson}
                  className="text-[11px] underline opacity-70 hover:opacity-100"
                >
                  Export Current JSON
                </button>
              </h3>
              <p className="opacity-70 mb-3 text-[11px]">
                View or replace the entire portfolio data model with valid JSON.
              </p>
              {jsonError && (
                <div className="mb-3 p-3 bg-red-950/40 border border-red-800 text-red-300 rounded-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{jsonError}</span>
                </div>
              )}
              <textarea
                rows={8}
                value={jsonText}
                onChange={(e) => {
                  setJsonText(e.target.value);
                  setJsonError(null);
                }}
                className={`w-full px-3 py-2 border rounded-xs font-mono text-[11px] ${
                  isDark ? 'bg-[#18181B] border-[#2A2A32]' : 'bg-white border-[#E2E0D8]'
                }`}
              />
              <button
                onClick={handleApplyJson}
                className={`mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xs uppercase tracking-wider font-medium ${
                  isDark ? 'bg-[#FAF9F6] text-[#0D0D0E]' : 'bg-[#18181B] text-[#FAF9F6]'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>Apply JSON Configuration</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
