import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ExternalLink, 
  Github, 
  Code2, 
  Layers, 
  Sparkles, 
  ArrowUpRight, 
  Eye, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { PROJECTS, Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filters = ['All', 'Full Stack', 'Machine Learning', 'NLP & Vision'];

  const filteredProjects = selectedFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedFilter || (selectedFilter === 'Machine Learning' && p.category === 'Data Science'));

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#090a10]">
      {/* Dynamic ambient lights */}
      <div className="absolute top-1/4 -right-10 w-[500px] h-[500px] bg-emerald-500/10 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/3 -left-10 w-[500px] h-[500px] bg-cyan-500/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
            <Layers size={14} />
            <span>Featured Portfolio Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            Engineering & <span className="text-gradient">AI In Action</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            A curated showcase of production web applications, machine learning dashboards, and neural network pipelines.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-950 font-bold shadow-lg shadow-emerald-500/25 scale-105'
                  : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              {filter}
              <span className="ml-1.5 opacity-60 text-xs font-mono">
                ({filter === 'All' 
                  ? PROJECTS.length 
                  : PROJECTS.filter(p => p.category === filter || (filter === 'Machine Learning' && p.category === 'Data Science')).length})
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-emerald-500/40 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  {/* Image container with hover zoom */}
                  <div 
                    onClick={() => setActiveProject(project)}
                    className="relative h-56 w-full overflow-hidden cursor-pointer bg-zinc-950"
                  >
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e15] via-transparent to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />
                    
                    {/* Category pill */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-emerald-400 text-xs font-mono font-medium border border-emerald-500/30">
                        {project.category}
                      </span>
                    </div>

                    {/* Highlight Badge */}
                    {project.highlight && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 text-zinc-950 text-[10px] font-bold uppercase tracking-wider shadow-md">
                          {project.highlight}
                        </span>
                      </div>
                    )}

                    {/* Hover quick preview button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[2px]">
                      <span className="px-4 py-2 rounded-xl bg-white/15 text-white text-xs font-medium border border-white/20 flex items-center gap-1.5 backdrop-blur-md">
                        <Eye size={14} /> Quick View Architecture
                      </span>
                    </div>
                  </div>

                  {/* Text details */}
                  <div className="p-6">
                    <h3 
                      onClick={() => setActiveProject(project)}
                      className="text-xl font-bold text-white font-display mb-2 group-hover:text-emerald-300 transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>
                    
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.8 rounded-md bg-zinc-800/80 text-zinc-300 text-[11px] font-mono border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-6 pb-6 pt-3 border-t border-white/5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-emerald-400 transition-colors"
                      >
                        <ExternalLink size={14} className="text-emerald-400" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                    >
                      <Github size={14} />
                      <span>Code</span>
                    </a>
                  </div>

                  <button
                    onClick={() => setActiveProject(project)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-emerald-400 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    title="Read Technical Case Study"
                  >
                    <span>Details</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Interactive Detail Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
