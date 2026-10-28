import React from 'react';
import { motion } from 'motion/react';
import { 
  Code2, 
  BrainCircuit, 
  Database, 
  Terminal, 
  GraduationCap, 
  CheckCircle2, 
  Sparkles, 
  Compass, 
  Layers,
  Cpu
} from 'lucide-react';
import { EDUCATION } from '../data/portfolioData';

export const About: React.FC = () => {
  const pillars = [
    {
      icon: <Layers className="text-emerald-400" size={24} />,
      title: 'Full-Stack Architecture',
      description: 'Building modern responsive web applications with React 19, TypeScript, Django REST, Node.js, and relational/NoSQL databases.',
      accent: 'border-emerald-500/20 hover:border-emerald-500/40'
    },
    {
      icon: <BrainCircuit className="text-cyan-400" size={24} />,
      title: 'Deep Learning & NLP',
      description: 'Engineering PyTorch and HuggingFace pipelines with BERT for contextual text classification and CNNs for character recognition.',
      accent: 'border-cyan-500/20 hover:border-cyan-500/40'
    },
    {
      icon: <Database className="text-violet-400" size={24} />,
      title: 'Predictive Data Science',
      description: 'Developing time-series models, feature engineering pipelines, and competing on international leaderboards like Zindi.',
      accent: 'border-violet-500/20 hover:border-violet-500/40'
    },
    {
      icon: <Cpu className="text-amber-400" size={24} />,
      title: 'Performance & Reliability',
      description: 'Writing type-safe, maintainable, and modular code with optimized bundling, Docker containerization, and modern CI/CD standards.',
      accent: 'border-amber-500/20 hover:border-amber-500/40'
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#090a10]">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-cyan-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
            <Compass size={14} />
            <span>Background & Engineering Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            Bridging Scalable Code & <span className="text-gradient">Intelligent Systems</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            I specialize in architecting full-stack web applications and training domain-specific machine learning models that deliver tangible real-world impact.
          </p>
        </div>

        {/* Narrative & Education Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Main Story Box */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl relative"
          >
            <h3 className="text-2xl font-bold text-white font-display mb-6 flex items-center gap-2">
              <span className="w-2.5 h-6 rounded-full bg-emerald-400" />
              The Journey So Far
            </h3>
            
            <div className="space-y-4 text-zinc-300 text-base leading-relaxed">
              <p>
                My passion for technology began with a deep curiosity for how distributed web systems scale and how predictive models can unlock insights from raw unstructured data. As a <strong className="text-white">Computer Science and Engineering</strong> scholar, I dedicated myself to mastering both core computer science theory and modern product delivery.
              </p>
              <p>
                In the software realm, I have engineered end-to-end fullstack platforms—from <span className="text-emerald-300 font-medium">civic aid systems with 3-tier municipal verification (WeDonate)</span> to <span className="text-cyan-300 font-medium">high-performance 60 FPS 3D WebGL game engines (Super Star Hopper)</span>. In the AI sphere, I actively train and benchmark deep learning architectures, such as fine-tuning <span className="text-violet-300 font-medium">BERT for social media NLP</span> and crafting <span className="text-emerald-300 font-medium">CNNs for indigenous Amharic OCR</span>.
              </p>
              <p className="text-zinc-400">
                Whether working solo on tight deadlines or collaborating across multidisciplinary teams, I prioritize readability, type safety, modular architecture, and unforgettable user experiences.
              </p>
            </div>

            {/* Quick Core Strengths Checklist */}
            <div className="mt-8 pt-6 border-t border-white/10 grid sm:grid-cols-2 gap-3">
              {[
                "TypeScript & Type-Safe Architecture",
                "Applied Deep Learning (PyTorch, BERT)",
                "Full-Lifecycle REST API Design",
                "Zindi Competitive ML Experience",
                "Responsive Modern Glass UI/UX",
                "Continuous Deployment & Cloud Hosting"
              ].map((strength) => (
                <div key={strength} className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>{strength}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education & Academic Box */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {EDUCATION.map((edu) => (
              <div 
                key={edu.degree}
                className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden"
              >
                <div className="p-3 w-fit rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-5">
                  <GraduationCap size={28} />
                </div>
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                  Academic Foundation
                </div>
                <h4 className="text-xl font-bold text-white font-display mb-1">
                  {edu.degree}
                </h4>
                <div className="text-sm font-semibold text-zinc-300 mb-2">
                  {edu.institution}
                </div>
                <div className="text-xs font-mono text-zinc-500 mb-4">
                  {edu.period}
                </div>
                
                <div className="space-y-2.5 text-xs sm:text-sm text-zinc-400">
                  {edu.highlights.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Quick Contact Prompt Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500/15 via-cyan-500/10 to-transparent border border-emerald-500/30">
              <h4 className="text-lg font-bold text-white mb-2 font-display">
                Looking for a dedicated engineer?
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 mb-4 leading-relaxed">
                I am actively considering full-time software engineering and AI/ML opportunities. Let's build something exceptional together.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20"
              >
                <span>Initiate Contact</span>
                <span className="font-mono">→</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`glass-card p-6 rounded-2xl border ${pillar.accent} transition-all group`}
            >
              <div className="p-3 w-fit rounded-xl bg-zinc-800/80 mb-5 group-hover:scale-110 transition-transform">
                {pillar.icon}
              </div>
              <h4 className="text-lg font-bold text-white font-display mb-2">
                {pillar.title}
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
