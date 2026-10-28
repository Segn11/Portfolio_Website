import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import cvFile from '../PHOTO/CV (2).pdf';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-5xl bg-[#0c0d14] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col h-[90vh] my-auto"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-zinc-900/90 border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  Segni Nadew — Curriculum Vitae
                </h3>
                <p className="text-xs text-zinc-400 font-mono">
                  Full Stack Engineer & AI/ML Specialist
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={cvFile}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs transition-colors hidden sm:flex items-center gap-1.5"
                title="Open in new browser tab"
              >
                <ExternalLink size={15} />
                <span>New Tab</span>
              </a>

              <a
                href={cvFile}
                download="Segni_Nadew_CV.pdf"
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
              >
                <Download size={14} />
                <span>Download PDF</span>
              </a>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* PDF Viewer Body */}
          <div className="flex-1 bg-zinc-950 p-2 sm:p-4 overflow-hidden relative">
            <iframe
              src={`${cvFile}#toolbar=0`}
              title="Segni Nadew Resume"
              className="w-full h-full rounded-2xl border border-white/5 bg-zinc-900"
            />
          </div>

          {/* Quick Footer */}
          <div className="px-6 py-3 bg-zinc-900/60 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 shrink-0">
            <span>Direct Email: <strong className="text-white">{PERSONAL_INFO.email}</strong></span>
            <span className="hidden sm:inline">Addis Ababa, Ethiopia • Open to Remote Worldwide</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
