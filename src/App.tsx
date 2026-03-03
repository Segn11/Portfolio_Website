/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  ExternalLink, 
  Code2, 
  Database, 
  BrainCircuit, 
  Trophy, 
  Menu,
  X,
  ChevronRight,
  Terminal,
  Cpu,
  Layers
} from 'lucide-react';

import photo from './PHOTO/photo.jpg';
import cvFile from './PHOTO/CV (2).pdf';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-lg border-bottom border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold font-mono text-emerald-400"
          >
            &lt;Segni /&gt;
          </motion.div>
          
          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-zinc-400 hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-400 hover:text-white p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-900 border-b border-white/5 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-400 hover:text-emerald-400 block px-3 py-2 rounded-md text-base font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 text-center lg:text-left"
          >
            <h2 className="text-emerald-400 font-mono mb-4 text-lg">Hi, I am</h2>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight">
              Segni Nadew
            </h1>
            <p className="text-xl lg:text-2xl text-zinc-400 mb-8 max-w-2xl">
              <span className="text-white font-semibold">Full Stack Web Developer</span> | AI & Data Science Enthusiast
            </p>
            <p className="text-zinc-500 mb-10 max-w-xl leading-relaxed">
              Crafting high-performance web applications and exploring the frontiers of Machine Learning. 
              Passionate about building intelligent systems that solve real-world problems.
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={cvFile}
                download="Segni_Nadew_CV.pdf"
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 px-8 py-3 rounded-full font-semibold transition-colors"
              >
                <Download size={20} />
                Download CV
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-3 rounded-full font-semibold transition-colors"
              >
                Contact Me
              </motion.a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-emerald-500/20 p-2">
              <img 
                src={photo} 
                alt="Segni Nadew" 
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-cyan-500/20 rounded-full blur-xl animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const experiences = [
    { icon: <Layers className="text-emerald-400" />, title: 'MERN Stack', desc: 'Building scalable web apps with React, Node, and MongoDB.' },
    { icon: <BrainCircuit className="text-cyan-400" />, title: 'Machine Learning', desc: 'Developing predictive models and neural networks.' },
    { icon: <Database className="text-purple-400" />, title: 'Data Science', desc: 'Analyzing complex datasets to extract meaningful insights.' },
    { icon: <Terminal className="text-orange-400" />, title: 'Competitive Programming', desc: 'Solving algorithmic challenges with efficiency.' },
  ];

  return (
    <section id="about" className="py-20 bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-zinc-400 text-lg leading-relaxed mb-6">
              I am a dedicated Computer Science and Engineering student with a deep passion for technology and its potential to transform lives. My journey in tech is driven by a curiosity for how things work and a desire to build tools that are both functional and elegant.
            </p>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Whether it's architecting a full-stack application or fine-tuning a machine learning model, I thrive on the challenges that come with complex problem-solving. I am constantly learning and evolving, staying at the forefront of the ever-changing tech landscape.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 hover:border-emerald-500/30 transition-all group"
              >
                <div className="mb-4 p-3 bg-zinc-800 rounded-xl w-fit group-hover:scale-110 transition-transform">
                  {exp.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{exp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: ['React', 'Tailwind', 'HTML', 'CSS', 'JavaScript'],
      icon: <Cpu className="text-emerald-400" />
    },
    {
      title: 'Backend',
      skills: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL'],
      icon: <Database className="text-cyan-400" />
    },
    {
      title: 'AI/ML',
      skills: ['Python', 'CNN', 'BERT', 'Scikit-learn', 'TensorFlow', 'PyTorch'],
      icon: <BrainCircuit className="text-purple-400" />
    },
    {
      title: 'Tools',
      skills: ['Git', 'VS Code', 'Streamlit', 'Flask', 'Docker'],
      icon: <Terminal className="text-orange-400" />
    }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Technical Skills</h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-8 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3 mb-6">
                {category.icon}
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map(skill => (
                  <span 
                    key={skill}
                    className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-xs font-medium border border-white/5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: 'Hotel Web App',
      desc: 'A full-featured hotel booking system with admin dashboard.',
      tech: ['React', 'Django'],
      image: 'https://picsum.photos/seed/shop/600/400',
      github: 'https://github.com/Segn11/luxury-hotel-fullstack',
      demo: 'https://luxury-hotel-fullstack-fv8e.vercel.app/'
    },
    {
      title: 'Cryptocurrency Closing Price Predictor',
      desc: 'A machine learning model that predicts the closing price of cryptocurrencies based on historical data.',
      tech: [ 'Streamlit', 'Python'],
      image: 'https://picsum.photos/seed/food/600/400',
      github: 'https://github.com/Segn11/crypto-price-ml-dashboard',
      demo: 'https://crypto-price-ml-dashboard-esvsawgjtfappe8tms4pguw.streamlit.app/'
    },
    {
      title: 'University Management System',
      desc: 'A comprehensive web application for managing university operations, including student enrollment, course management, and faculty administration.',
      tech: ['React', 'TypeScript'],
      image: 'https://picsum.photos/seed/estate/600/400',
      github: 'https://github.com/Segn11/university-portal-system',
      demo: 'https://university-portal-system-rho.vercel.app/'
    },
    {
      title: 'COVID-19 Tweet Classification',
      desc: 'A machine learning model that classifies COVID-19 related tweets into categories such as misinformation, news, and personal experiences.',
      tech: ['Python', 'Scikit-learn', 'BERT', 'LIGHTGBM'],
      image: 'https://picsum.photos/seed/ai/600/400',
      github: 'https://github.com/Segn11/COVID-19_Tweet_Classification_Challenge_updated',
      
    },
    
  ];

  return (
    <section id="projects" className="py-20 bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-zinc-500 text-sm mb-4 line-clamp-2">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map(t => (
                    <span key={t} className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href={project.demo} className="flex items-center gap-1 text-sm font-semibold text-white hover:text-emerald-400 transition-colors">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                  <a href={project.github} className="flex items-center gap-1 text-sm font-semibold text-zinc-400 hover:text-white transition-colors">
                    <Github size={16} /> Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Achievements = () => {
  const achievements = [
   
    {
      title: 'Zindi Competition Participant',
      org: 'Zindi Data Science',
      desc: 'Actively participated in multiple challenges, solving real-world African problems.',
      icon: <BrainCircuit className="text-emerald-400" />
    },
    {
      title: 'Deployed ML Models',
      org: 'Personal & Academic Projects',
      desc: 'Successfully built and deployed end-to-end machine learning solutions.',
      icon: <Cpu className="text-cyan-400" />
    }
  ];

  return (
    <section id="achievements" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Achievements</h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full" />
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {achievements.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-6 flex flex-col md:flex-row items-start md:items-center gap-6 hover:bg-white/10 transition-colors"
            >
              <div className="p-4 bg-zinc-800 rounded-2xl shrink-0">
                {item.icon}
              </div>
              <div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <span className="hidden md:block text-zinc-600">•</span>
                  <span className="text-emerald-400 font-medium">{item.org}</span>
                </div>
                <p className="text-zinc-500">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const emailAddress = 'segninadew1@gmail.com';
  return (
    <section id="contact" className="py-20 bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">Let's talk about your project</h3>
            <p className="text-zinc-400 leading-relaxed">
              I'm currently exploring new opportunities and collaborations. If you have a question, a project idea, or just want to connect, please drop me a line. See the right card for the easiest ways to reach me.
            </p>
            <div className="rounded-3xl border border-white/5 bg-zinc-900/60 p-6 space-y-3">
              <p className="text-sm uppercase tracking-wider text-zinc-500">Quick email</p>
              <a
                href={`mailto:${emailAddress}`}
                className="text-left text-white font-semibold text-lg hover:text-emerald-400 transition-colors"
              >
                {emailAddress}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-card p-8 space-y-4">
              <h3 className="text-xl font-bold">More ways to connect</h3>
              <div className="space-y-3">
                <a
                  href="https://github.com/Segn11/"
                  className="flex items-center gap-4 text-zinc-400 hover:text-emerald-400 transition-colors"
                >
                  <div className="p-3 bg-zinc-800 rounded-lg">
                    <Github size={20} />
                  </div>
                  github.com/Segn11
                </a>
                <a
                  href="https://linkedin.com/in/segninadew"
                  className="flex items-center gap-4 text-zinc-400 hover:text-emerald-400 transition-colors"
                >
                  <div className="p-3 bg-zinc-800 rounded-lg">
                    <Linkedin size={20} />
                  </div>
                  https://www.linkedin.com/in/segni-nadew-65a874384?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-zinc-500 text-sm">
          © {new Date().getFullYear()} Segni Nadew. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Github size={20} /></a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Mail size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-emerald-500/30 selection:text-emerald-400">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
