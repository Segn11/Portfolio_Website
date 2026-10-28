import React from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  BrainCircuit, 
  Cpu, 
  Award, 
  ExternalLink, 
  Sparkles, 
  Star,
  CheckCircle,
  GitBranch
} from 'lucide-react';
import { ACHIEVEMENTS, PERSONAL_INFO } from '../data/portfolioData';

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-[#08090d]">
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-emerald-500/10 to-violet-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-3">
            <Trophy size={14} />
            <span>Honors & Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            Competitive & Applied <span className="text-gradient">Recognition</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Demonstrated excellence in competitive machine learning, open source engineering, and research implementations.
          </p>
        </div>

        {/* Achievements Cards List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {ACHIEVEMENTS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group"
            >
              <div className="flex items-start sm:items-center gap-5">
                <div className="p-4 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform">
                  {idx === 0 ? <Trophy size={26} /> : idx === 1 ? <Cpu size={26} /> : <BrainCircuit size={26} />}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
                      {item.badge}
                    </span>
                    <span className="text-zinc-500 text-xs font-mono">• {item.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white font-display group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono text-cyan-400 mb-2">
                    {item.organization}
                  </div>
                  <p className="text-zinc-400 text-xs sm:text-sm max-w-xl leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Metric Callout Pill */}
              {item.metrics && (
                <div className="shrink-0 w-full md:w-auto p-4 rounded-2xl bg-zinc-900/90 border border-white/10 text-center">
                  <div className="text-sm font-bold text-gradient font-display">
                    {item.metrics}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase mt-0.5">
                    Verified Outcome
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* GitHub / Open Source Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/5 to-zinc-900/40 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/10 text-emerald-400">
              <GitBranch size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white font-display">
                Continuous Open Source Engineering
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400">
                Explore Segni's public repositories, commit activity, and algorithm explorations.
              </p>
            </div>
          </div>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all flex items-center gap-2 shrink-0 border border-white/15"
          >
            <span>Visit GitHub Profile</span>
            <ExternalLink size={14} />
          </a>
        </motion.div>

      </div>
    </section>
  );
};
