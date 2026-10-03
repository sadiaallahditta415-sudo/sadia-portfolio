import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'motion/react';
import { Mail, Copy, Check, ArrowUpRight, Send, Github, Linkedin, Globe } from 'lucide-react';

export const Contact: React.FC = () => {
  const { data, theme, showToast } = usePortfolio();
  const isDark = theme === 'dark';

  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const emailAddress = data.personal.email || 'sadiawebdeveloper98@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    showToast(`Copied ${emailAddress} to clipboard`);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Generate mailto fallback link as well
    const mailtoUri = `mailto:${emailAddress}?subject=${encodeURIComponent(
      formState.subject || 'Inquiry from Portfolio'
    )}&body=${encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    )}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      showToast('Message inquiry composed successfully');
      // Open client email client
      window.location.href = mailtoUri;
    }, 700);
  };

  return (
    <section id="contact" className="py-28 md:py-36 border-t border-[#27272A]/40 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <span
            className={`text-xs font-sans-luxury tracking-[0.25em] uppercase font-semibold ${
              isDark ? 'text-[#E2D4BA]' : 'text-[#9A7B38]'
            }`}
          >
            07 / INITIATE CONVERSATION
          </span>
          <h2
            className={`font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-normal mt-3 tracking-tight max-w-3xl leading-[1.05] ${
              isDark ? 'text-[#FAF9F6]' : 'text-[#18181B]'
            }`}
          >
            Let's create something meaningful.
          </h2>
          <p
            className={`text-base sm:text-lg font-sans-luxury font-light mt-4 max-w-xl ${
              isDark ? 'text-[#A1A1AA]' : 'text-[#71717A]'
            }`}
          >
            Available for select engineering engagements, high-fidelity frontend builds, and thoughtful web projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Direct Contact & Social Links */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
            <div>
              <span className="block text-xs font-sans-luxury uppercase tracking-[0.2em] opacity-50 mb-3">
                Direct Electronic Mail
              </span>

              {/* Email Card with Copy Action */}
              <div
                className={`p-6 sm:p-8 rounded-sm border transition-all duration-300 ${
                  isDark
                    ? 'border-[#222227] bg-[#141416]/60 hover:border-[#383842]'
                    : 'border-[#E7E5E4] bg-white/80 hover:border-[#D6D3D1]'
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3 text-xs font-sans-luxury uppercase tracking-wider text-[#A1A1AA]">
                    <Mail className="w-4 h-4 opacity-70" />
                    <span>Primary Contact</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>

                <a
                  href={`mailto:${emailAddress}`}
                  className={`block font-serif-luxury text-2xl sm:text-3xl font-normal tracking-wide hover:underline underline-offset-4 mb-6 break-all ${
                    isDark ? 'text-[#FAF9F6] hover:text-[#E2D4BA]' : 'text-[#18181B] hover:text-[#9A7B38]'
                  }`}
                >
                  {emailAddress}
                </a>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCopyEmail}
                    className={`flex items-center gap-2 px-4 py-2 text-xs font-sans-luxury tracking-[0.14em] uppercase border rounded-xs transition-all duration-300 ${
                      copied
                        ? 'border-emerald-500/60 text-emerald-400 bg-emerald-500/10'
                        : isDark
                          ? 'border-[#2D2D33] text-[#D4D4D8] hover:border-[#E2D4BA] hover:text-[#FAF9F6]'
                          : 'border-[#D4D4D8] text-[#52525B] hover:border-[#9A7B38] hover:text-[#18181B]'
                    }`}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 opacity-70" />}
                    <span>{copied ? 'Copied' : 'Copy Address'}</span>
                  </button>

                  <a
                    href={`mailto:${emailAddress}`}
                    className={`flex items-center gap-1.5 px-4 py-2 text-xs font-sans-luxury tracking-[0.14em] uppercase transition-colors ${
                      isDark ? 'text-[#A1A1AA] hover:text-[#FAF9F6]' : 'text-[#71717A] hover:text-[#18181B]'
                    }`}
                  >
                    <span>Send Mail</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Social & Verification Links */}
            <div>
              <span className="block text-xs font-sans-luxury uppercase tracking-[0.2em] opacity-50 mb-4">
                Networks & Profiles
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.personal.github && (
                  <a
                    href={data.personal.github}
                    target="_blank"
                    rel="noreferrer"
                    className={`group p-4 border rounded-sm flex items-center justify-between transition-all duration-300 ${
                      isDark
                        ? 'border-[#222227] bg-[#141416]/40 hover:border-[#33333C]'
                        : 'border-[#E7E5E4] bg-white/60 hover:border-[#D6D3D1]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Github className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                      <span className="text-xs font-sans-luxury uppercase tracking-wider font-medium">
                        GitHub
                      </span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                )}

                {data.personal.linkedin && (
                  <a
                    href={data.personal.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className={`group p-4 border rounded-sm flex items-center justify-between transition-all duration-300 ${
                      isDark
                        ? 'border-[#222227] bg-[#141416]/40 hover:border-[#33333C]'
                        : 'border-[#E7E5E4] bg-white/60 hover:border-[#D6D3D1]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Linkedin className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                      <span className="text-xs font-sans-luxury uppercase tracking-wider font-medium">
                        LinkedIn
                      </span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                )}
              </div>

              {data.personal.phone && (
                <div className="mt-4 pt-4 border-t border-[#27272A]/40 text-xs font-sans-luxury text-[#A1A1AA]">
                  <span className="opacity-50 uppercase tracking-widest block mb-1">Telephone</span>
                  <a href={`tel:${data.personal.phone}`} className="hover:underline">
                    {data.personal.phone}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div
              className={`p-8 sm:p-10 rounded-sm border ${
                isDark
                  ? 'border-[#222227] bg-[#141416]/60 shadow-[0_4px_30px_rgba(0,0,0,0.25)]'
                  : 'border-[#E7E5E4] bg-white shadow-[0_4px_30px_rgba(0,0,0,0.04)]'
              }`}
            >
              <h3
                className={`font-serif-luxury text-2xl sm:text-3xl font-medium tracking-wide mb-2 ${
                  isDark ? 'text-[#FAF9F6]' : 'text-[#18181B]'
                }`}
              >
                Send a Message
              </h3>
              <p
                className={`text-xs sm:text-sm font-sans-luxury font-light mb-8 ${
                  isDark ? 'text-[#A1A1AA]' : 'text-[#71717A]'
                }`}
              >
                Inquire about project availability, technical consulting, or general web engineering.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-[11px] font-sans-luxury uppercase tracking-[0.16em] opacity-60 mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Jane Doe"
                      className={`w-full px-4 py-3 text-sm rounded-xs border transition-colors focus:outline-none focus:ring-1 ${
                        isDark
                          ? 'border-[#27272A] bg-[#0D0D0E]/80 text-[#FAF9F6] focus:border-[#E2D4BA] focus:ring-[#E2D4BA]/40'
                          : 'border-[#E2E0D8] bg-[#FAF9F6] text-[#18181B] focus:border-[#9A7B38] focus:ring-[#9A7B38]/40'
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-[11px] font-sans-luxury uppercase tracking-[0.16em] opacity-60 mb-2"
                    >
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="jane@example.com"
                      className={`w-full px-4 py-3 text-sm rounded-xs border transition-colors focus:outline-none focus:ring-1 ${
                        isDark
                          ? 'border-[#27272A] bg-[#0D0D0E]/80 text-[#FAF9F6] focus:border-[#E2D4BA] focus:ring-[#E2D4BA]/40'
                          : 'border-[#E2E0D8] bg-[#FAF9F6] text-[#18181B] focus:border-[#9A7B38] focus:ring-[#9A7B38]/40'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-[11px] font-sans-luxury uppercase tracking-[0.16em] opacity-60 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="Project Inquiry / Frontend Development"
                    className={`w-full px-4 py-3 text-sm rounded-xs border transition-colors focus:outline-none focus:ring-1 ${
                      isDark
                        ? 'border-[#27272A] bg-[#0D0D0E]/80 text-[#FAF9F6] focus:border-[#E2D4BA] focus:ring-[#E2D4BA]/40'
                        : 'border-[#E2E0D8] bg-[#FAF9F6] text-[#18181B] focus:border-[#9A7B38] focus:ring-[#9A7B38]/40'
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-[11px] font-sans-luxury uppercase tracking-[0.16em] opacity-60 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your project, timeline, and goals..."
                    className={`w-full px-4 py-3 text-sm rounded-xs border transition-colors focus:outline-none focus:ring-1 resize-y ${
                      isDark
                        ? 'border-[#27272A] bg-[#0D0D0E]/80 text-[#FAF9F6] focus:border-[#E2D4BA] focus:ring-[#E2D4BA]/40'
                        : 'border-[#E2E0D8] bg-[#FAF9F6] text-[#18181B] focus:border-[#9A7B38] focus:ring-[#9A7B38]/40'
                    }`}
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-sans-luxury text-[#A1A1AA]/60">
                    Direct reply guaranteed within 24 hours
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-xs text-xs font-sans-luxury tracking-[0.16em] uppercase font-medium transition-all duration-300 ${
                      isDark
                        ? 'bg-[#FAF9F6] text-[#0D0D0E] hover:bg-[#E2D4BA]'
                        : 'bg-[#18181B] text-[#FAF9F6] hover:bg-[#27272A]'
                    }`}
                  >
                    {isSubmitting ? (
                      <span>Composing...</span>
                    ) : (
                      <>
                        <span>Submit Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
