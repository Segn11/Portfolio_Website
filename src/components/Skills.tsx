import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Cpu, 
  Database, 
  BrainCircuit, 
  Terminal, 
  Search, 
  Sparkles, 
  Check, 
  Layers,
  Flame
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryIcons: Record<string, React.ReactNode> = {
    'Frontend Engineering': <Code2 className="text-emerald-400" size={20} />,
    'Backend & Systems': <Database className="text-cyan-400" size={20} />,
    'AI, ML & Data Science': <BrainCircuit className="text-violet-400" size={20} />,
    'DevOps & Developer Tools': <Terminal className="text-amber-400" size={20} />
  };

  const filteredCategories = useMemo(() => {
    return SKILL_CATEGORIES.map(cat => {
      // Filter by category selection
      if (selectedCategory !== 'all' && cat.title !== selectedCategory) {
        return null;
      }

      // Filter by search term
      const matchedSkills = cat.skills.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (searchQuery && matchedSkills.length === 0) {
        return null;
      }

      return {
        ...cat,
        skills: matchedSkills
      };
    }).filter(Boolean) as typeof SKILL_CATEGORIES;
  }, [selectedCategory, searchQuery]);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#08090d]">
      {/* Background glow orbs */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
            <Cpu size={14} />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            Mastered Tech Stack & <span className="text-gradient">Tooling</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            A comprehensive overview of my programming languages, frameworks, AI libraries, and developer tools.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              All Skills
            </button>
            {SKILL_CATEGORIES.map(cat => (
              <button
                key={cat.title}
                onClick={() => setSelectedCategory(cat.title)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.title
                    ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.title.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Interactive Search Bar */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Filter skill (e.g. React, PyTorch)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900/90 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredCategories.map((category, idx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="glass-card p-7 sm:p-8 rounded-3xl border border-white/10 hover:border-emerald-500/30 flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 rounded-xl bg-zinc-800/90 border border-white/10">
                      {categoryIcons[category.title] || <Layers size={20} />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white font-display">
                        {category.title}
                      </h3>
                      <p className="text-xs text-zinc-400">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills List with Proficiency Meters */}
                  <div className="space-y-4 mt-6">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="group">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-semibold text-zinc-200 group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                            {skill.name}
                            {skill.featured && (
                              <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
                                Core
                              </span>
                            )}
                          </span>
                          <span className="font-mono text-zinc-400 text-[11px]">
                            {skill.level}%
                          </span>
                        </div>
                        {/* Progress Bar Track */}
                        <div className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category summary tags */}
                <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap gap-1.5">
                  {category.skills.map(s => (
                    <span 
                      key={s.name}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.03] text-zinc-400 text-[11px] font-mono border border-white/5"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-16 text-zinc-500">
            No technical skills found matching "{searchQuery}". Try searching for React, Python, or Docker.
          </div>
        )}

      </div>
    </section>
  );
};
