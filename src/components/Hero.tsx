import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Download, 
  Eye, 
  Copy, 
  Check, 
  Github, 
  Linkedin, 
  Mail, 
  ArrowDown, 
  Sparkles, 
  Code2, 
  Cpu, 
  BrainCircuit, 
  Layers, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import photo from '../PHOTO/photo.jpg';
import cvFile from '../PHOTO/CV (2).pdf';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [copied, setCopied] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  const roles = [
    "Full-Stack Web Engineer",
    "AI & Deep Learning Developer",
    "Data Science & Analytics Explorer",
    "Applied Machine Learning Practitioner"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [roles.length]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="home" className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-grid-pattern">
      {/* Dynamic Ambient Glow Backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-500/15 to-cyan-500/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-violet-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-emerald-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* Left Text & CTA Column */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium mb-6 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Full-Time Roles & High-Impact Projects</span>
            </div>

            {/* Main Greeting & Name */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-white font-display">
              Hi, I'm <span className="text-gradient">Segni Nadew</span>
            </h1>

            {/* Dynamic Animated Role */}
            <div className="h-10 sm:h-12 mb-5 flex items-center justify-center lg:justify-start">
              <span className="text-xl sm:text-2xl lg:text-3xl font-semibold text-zinc-300 font-display">
                I build{' '}
                <span className="text-cyan-400 border-b-2 border-cyan-400/50 pb-0.5">
                  {roles[currentRoleIndex]}
                </span>
              </span>
            </div>

            {/* High-impact description */}
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mb-6 leading-relaxed">
              Transforming complex algorithmic challenges into high-performance web applications and 
              applied machine learning solutions. Specialized in <span className="text-zinc-200 font-medium">React, TypeScript, Python, Deep Learning (BERT, CNNs)</span> and scalable cloud backends.
            </p>

            {/* Interactive Email Quick Copy Ribbon */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/80 border border-white/10 text-xs font-mono text-zinc-300 shadow-sm backdrop-blur-md">
                <Mail size={14} className="text-emerald-400" />
                <span>{PERSONAL_INFO.email}</span>
                <button
                  onClick={handleCopyEmail}
                  className="ml-2 px-2 py-1 rounded-md bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-all flex items-center gap-1 text-[11px] cursor-pointer"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-xs font-mono text-zinc-500 hidden sm:block">
                📍 {PERSONAL_INFO.location}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 mb-10">
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-950 font-bold text-sm shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <span>Explore Featured Work</span>
                <ArrowDown size={16} />
              </a>

              <button
                onClick={onOpenResume}
                className="px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-zinc-200 hover:text-white font-medium text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Eye size={16} className="text-cyan-400" />
                <span>Preview Resume</span>
              </button>

              <a
                href={cvFile}
                download="Segni_Nadew_CV.pdf"
                className="px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white font-medium text-sm transition-all flex items-center gap-2"
                title="Download CV PDF directly"
              >
                <Download size={16} className="text-emerald-400" />
                <span className="hidden sm:inline">Download CV</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Connect:</span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-zinc-400 hover:text-white hover:scale-110 transition-all"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-zinc-400 hover:text-cyan-400 hover:scale-110 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-zinc-400 hover:text-emerald-400 hover:scale-110 transition-all"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </motion.div>

          {/* Right Avatar & Interactive Badges Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative flex items-center justify-center"
          >
            {/* Outer Glowing Concentric Rings */}
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 lg:w-96 lg:h-96">
              
              {/* Animated gradient spinning border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500 via-cyan-500 to-violet-500 p-[3px] animate-spin-slow blur-[1px]">
                <div className="w-full h-full bg-[#08090d] rounded-full" />
              </div>

              {/* Main Photo Container */}
              <div className="absolute inset-3 rounded-full overflow-hidden border-2 border-white/20 p-1.5 bg-zinc-900/80 shadow-2xl backdrop-blur-xl">
                <img 
                  src={photo} 
                  alt="Segni Nadew" 
                  className="w-full h-full object-cover rounded-full hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Tech Badges around avatar */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-2 -left-4 sm:top-2 sm:-left-6 px-3.5 py-1.5 rounded-xl bg-[#0e111a]/90 border border-emerald-500/30 shadow-xl backdrop-blur-md flex items-center gap-2"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono font-medium text-zinc-200">React 19 & TS</span>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute top-1/2 -right-6 sm:-right-8 -translate-y-1/2 px-3.5 py-1.5 rounded-xl bg-[#0e111a]/90 border border-cyan-500/30 shadow-xl backdrop-blur-md flex items-center gap-2"
              >
                <BrainCircuit size={15} className="text-cyan-400" />
                <span className="text-xs font-mono font-medium text-zinc-200">BERT & CNNs</span>
              </motion.div>

              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute -bottom-3 left-8 px-3.5 py-1.5 rounded-xl bg-[#0e111a]/90 border border-violet-500/30 shadow-xl backdrop-blur-md flex items-center gap-2"
              >
                <Layers size={15} className="text-violet-400" />
                <span className="text-xs font-mono font-medium text-zinc-200">Node & Django</span>
              </motion.div>

              {/* Subtle pulsing background spots */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />
            </div>
          </motion.div>
        </div>

        {/* Bottom Key Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl glass-panel shadow-xl"
        >
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div 
              key={stat.label}
              className={`p-4 rounded-xl transition-all ${
                idx !== PERSONAL_INFO.stats.length - 1 ? 'lg:border-r lg:border-white/10' : ''
              }`}
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-1 flex items-baseline gap-1">
                <span className="text-gradient">{stat.value}</span>
              </div>
              <div className="text-sm font-semibold text-zinc-300">{stat.label}</div>
              <div className="text-xs text-zinc-500 font-mono mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
