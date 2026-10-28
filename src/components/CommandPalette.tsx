import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  X, 
  FileText, 
  Download, 
  Mail, 
  Github, 
  Linkedin, 
  Layers, 
  Cpu, 
  Trophy, 
  User, 
  Bot, 
  Copy, 
  Check, 
  ArrowRight 
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import cvFile from '../PHOTO/CV (2).pdf';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onOpenChat: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onOpenChat
}) => {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1200);
  };

  const commands = [
    {
      id: 'projects',
      label: 'Explore Projects',
      category: 'Navigation',
      icon: <Layers size={16} className="text-emerald-400" />,
      action: () => {
        window.location.hash = 'projects';
        onClose();
      }
    },
    {
      id: 'skills',
      label: 'View Technical Skills',
      category: 'Navigation',
      icon: <Cpu size={16} className="text-cyan-400" />,
      action: () => {
        window.location.hash = 'skills';
        onClose();
      }
    },
    {
      id: 'about',
      label: 'Read Background & About Me',
      category: 'Navigation',
      icon: <User size={16} className="text-violet-400" />,
      action: () => {
        window.location.hash = 'about';
        onClose();
      }
    },
    {
      id: 'achievements',
      label: 'View Competitive Achievements',
      category: 'Navigation',
      icon: <Trophy size={16} className="text-amber-400" />,
      action: () => {
        window.location.hash = 'achievements';
        onClose();
      }
    },
    {
      id: 'contact',
      label: 'Send a Message / Contact',
      category: 'Navigation',
      icon: <Mail size={16} className="text-emerald-400" />,
      action: () => {
        window.location.hash = 'contact';
        onClose();
      }
    },
    {
      id: 'copy-email',
      label: copied ? 'Email Copied to Clipboard!' : `Copy Email (${PERSONAL_INFO.email})`,
      category: 'Actions',
      icon: copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} className="text-cyan-400" />,
      action: handleCopyEmail
    },
    {
      id: 'preview-resume',
      label: 'Preview Resume (CV) in Browser',
      category: 'Actions',
      icon: <FileText size={16} className="text-emerald-400" />,
      action: () => {
        onClose();
        onOpenResume();
      }
    },
    {
      id: 'download-resume',
      label: 'Download Resume PDF',
      category: 'Actions',
      icon: <Download size={16} className="text-cyan-400" />,
      action: () => {
        const a = document.createElement('a');
        a.href = cvFile;
        a.download = 'Segni_Nadew_CV.pdf';
        a.click();
        onClose();
      }
    },
    {
      id: 'ai-assistant',
      label: 'Ask SegniBot AI Assistant',
      category: 'AI Assistant',
      icon: <Bot size={16} className="text-violet-400" />,
      action: () => {
        onClose();
        onOpenChat();
      }
    },
    {
      id: 'github',
      label: 'Open GitHub Profile',
      category: 'Socials',
      icon: <Github size={16} className="text-zinc-300" />,
      action: () => {
        window.open(PERSONAL_INFO.github, '_blank');
        onClose();
      }
    },
    {
      id: 'linkedin',
      label: 'Open LinkedIn Profile',
      category: 'Socials',
      icon: <Linkedin size={16} className="text-cyan-400" />,
      action: () => {
        window.open(PERSONAL_INFO.linkedin, '_blank');
        onClose();
      }
    }
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Palette Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          className="relative w-full max-w-xl bg-[#0e1017] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* Search bar input */}
          <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
            <Search size={18} className="text-emerald-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search sections, actions, resume, email..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-zinc-500 hover:text-white text-xs">
                Clear
              </button>
            )}
            <kbd className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-400 border border-white/10 shrink-0">
              ESC
            </kbd>
          </div>

          {/* Results list */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {filteredCommands.length > 0 ? (
              filteredCommands.map((cmd) => (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  className="w-full px-3.5 py-2.5 rounded-xl text-left hover:bg-white/[0.06] flex items-center justify-between group transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-zinc-900 border border-white/5">
                      {cmd.icon}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-zinc-200 group-hover:text-white">
                        {cmd.label}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500">
                        {cmd.category}
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </button>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-zinc-500">
                No matching results found for "{query}".
              </div>
            )}
          </div>

          {/* Bottom instructions bar */}
          <div className="px-4 py-2 bg-zinc-950/60 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>Use ↑ ↓ to navigate</span>
            <span>Segni Nadew • Portfolio</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
