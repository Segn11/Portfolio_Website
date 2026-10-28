import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, Code2, Sparkles } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl bg-[#0d0e15] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header image & close button */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden shrink-0 bg-zinc-950">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e15] via-transparent to-black/60" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black text-white/80 hover:text-white border border-white/20 transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Title overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono border border-emerald-500/30 mb-2 inline-block">
                {project.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                {project.title}
              </h2>
              <p className="text-zinc-300 text-sm mt-1">
                {project.subtitle}
              </p>
            </div>
          </div>

          {/* Modal Body Content (Scrollable) */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            
            {/* Long Description / Overview */}
            <div>
              <h3 className="text-sm font-mono text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Code2 size={16} />
                Architecture Overview & Engineering Rationale
              </h3>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Key Technical Features */}
            <div>
              <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Cpu size={16} />
                Key Capabilities & Technical Implementations
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {project.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Chips */}
            <div>
              <h3 className="text-sm font-mono text-zinc-400 uppercase tracking-wider mb-2.5">
                Technologies & Tools Applied
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono font-medium text-emerald-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all"
                  >
                    <ExternalLink size={16} />
                    <span>Launch Live Demo</span>
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-200 hover:text-white font-medium text-xs sm:text-sm flex items-center gap-2 transition-all"
                >
                  <Github size={16} />
                  <span>View Source Code</span>
                </a>
              </div>

              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-mono text-zinc-400 hover:text-white"
              >
                Close Details
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
