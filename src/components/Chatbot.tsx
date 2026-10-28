import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Sparkles, 
  ChevronDown, 
  CornerDownLeft, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import Markdown from 'react-markdown';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, ACHIEVEMENTS, EDUCATION } from '../data/portfolioData';

interface Message {
  role: 'user' | 'model';
  text: string;
  time?: string;
}

const QUICK_PROMPTS = [
  "What is Segni's core tech stack?",
  "Tell me about his AI & Machine Learning projects",
  "How can I hire or contact Segni?",
  "What competitive achievements does he have?",
  "Tell me about his educational background"
];

export const Chatbot: React.FC<{ isOpenExternal?: boolean; onCloseExternal?: () => void }> = ({
  isOpenExternal,
  onCloseExternal
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: "👋 Hi there! I'm **Segni's AI Assistant**. Ask me anything about his full-stack applications, machine learning models, tech stack, or availability!",
      time: 'Just now'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpenExternal !== undefined) {
      setIsOpen(isOpenExternal);
    }
  }, [isOpenExternal]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Smart local conversational knowledge base
  const generateLocalResponse = (prompt: string): string => {
    const p = prompt.toLowerCase();

    if (p.includes('skill') || p.includes('stack') || p.includes('technolog') || p.includes('frontend') || p.includes('backend')) {
      return `### 🛠️ Segni Nadew's Technical Stack:
- **Frontend:** React 19, TypeScript, JavaScript (ES6+), Tailwind CSS, Next.js, HTML5/CSS3.
- **Backend & Cloud:** Node.js, Express.js, Django REST Framework, Python, PostgreSQL, MongoDB, SQLite, RESTful API design.
- **AI & Machine Learning:** PyTorch, TensorFlow, Scikit-Learn, BERT / Transformers, CNNs, LightGBM, Pandas, NumPy, OpenCV.
- **Dev Tools:** Git, Docker, Linux, Streamlit Cloud, Vercel, Postman.

Segni emphasizes type safety, clean code, modular architecture, and modern glassmorphic UI design!`;
    }

    if (p.includes('project') || p.includes('ml') || p.includes('machine learning') || p.includes('work') || p.includes('wedonate') || p.includes('game') || p.includes('crypto')) {
      return `### 🚀 Featured Engineering & AI Projects:
1. **WeDonate Civic Charity Portal:** Official municipal aid distribution platform with 3-tier government verification (Kebele → Woreda → Direct Delivery), PostgreSQL, Prisma ORM, and Gemini AI multilingual assistance.
2. **Super Star Hopper: 3D Platformer Adventure:** Zero-dependency 3D low-poly platformer engine running at 60 FPS in browser & Windows desktop (.exe), built with Three.js, procedural shaders, and Web Audio API.
3. **Cryptocurrency Closing Price Predictor:** Time-series ML model forecasting crypto closing prices using technical indicators (EMA, RSI, MACD) via Streamlit.
4. **COVID-19 Tweet Classification NLP:** Fine-tuned BERT transformer & LightGBM pipeline classifying social sentiment and health misinformation.
5. **AgriBORA Commodity Forecaster:** Geospatial agricultural ML model (Ranked 51/358 on Zindi).
6. **Amharic Character Classifier:** Deep CNN recognizing handwritten Ge'ez script.

You can explore live demos and source code links directly in the **Projects** section above!`;
    }

    if (p.includes('contact') || p.includes('hire') || p.includes('email') || p.includes('job') || p.includes('reach') || p.includes('call')) {
      return `### 📬 How to Contact & Hire Segni:
- **Direct Email:** [segninadew1@gmail.com](mailto:${PERSONAL_INFO.email})
- **Location:** Addis Ababa, Ethiopia (Open to Remote & Global Relocation)
- **LinkedIn:** [Segni Nadew on LinkedIn](${PERSONAL_INFO.linkedin})
- **GitHub:** [github.com/Segn11](${PERSONAL_INFO.github})
- **Status:** **Available immediately** for full-time engineering positions and high-impact contract collaborations!`;
    }

    if (p.includes('achievement') || p.includes('zindi') || p.includes('competition') || p.includes('rank') || p.includes('honor')) {
      return `### 🏆 Key Achievements & Milestones:
- **Zindi Data Science Platform:** Achieved **Rank 51 out of 358** international participants in the AgriBORA Commodity Price Challenge.
- **Production Delivery:** Successfully deployed multiple production web applications including the Luxury Hotel System and University ERP.
- **AI Research:** Developed indigenous character recognition models (CNNs) for Amharic / Ge'ez script digitization.`;
    }

    if (p.includes('education') || p.includes('degree') || p.includes('university') || p.includes('school') || p.includes('background')) {
      return `### 🎓 Education & Background:
- **Degree:** B.Sc. in Computer Science & Engineering
- **Focus:** Algorithms, Distributed Systems, Deep Learning, Database Design, and Software Engineering.
- **Mindset:** Continuous learner passionate about bridging cutting-edge ML models with resilient web products.`;
    }

    if (p.includes('resume') || p.includes('cv')) {
      return `### 📄 Segni's Resume (CV):
You can preview his complete resume directly on this page by clicking the **"Resume"** button in the top navigation bar, or download the PDF directly using the **"Download CV"** button in the hero section!`;
    }

    // Default friendly response
    return `Segni Nadew is a **Full-Stack Software Engineer & AI/ML Developer** skilled in React, TypeScript, Python, Deep Learning (BERT, CNNs), and scalable backend systems.

Would you like to know more about:
- His **Featured Projects**?
- His **Technical Skills Matrix**?
- How to **Hire or Contact** him directly?`;
  };

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { 
      role: 'user', 
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setInput('');
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Check if live Gemini API key is configured
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey.length > 5) {
      try {
        const { GoogleGenAI } = await import("@google/genai");
        const ai = new GoogleGenAI({ apiKey });
        const chat = ai.chats.create({
          model: "gemini-2.5-flash",
          config: {
            systemInstruction: `You are Segni Nadew's AI portfolio assistant. Segni is a Full Stack Developer & AI/ML engineer. Email: ${PERSONAL_INFO.email}. Location: ${PERSONAL_INFO.location}. Projects: WeDonate Civic Charity Portal, Super Star Hopper 3D Platformer Adventure, Crypto Price Predictor, COVID-19 Tweet Classifier, AgriBORA (Rank 51/358 on Zindi), Amharic Character Classifier. Skills: React, TypeScript, Three.js, Node, PostgreSQL, Prisma, Python, PyTorch, BERT, CNN, Tailwind. Be professional, friendly, concise, and helpful.`,
          },
          history: messages.slice(1).map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
          }))
        });

        const response = await chat.sendMessage({ message: textToSend });
        const replyText = response.text || generateLocalResponse(textToSend);
        
        setMessages(prev => [
          ...prev, 
          { 
            role: 'model', 
            text: replyText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setIsLoading(false);
        return;
      } catch (err) {
        console.warn("Live Gemini API fallback to local intelligence engine", err);
      }
    }

    // High quality local response simulation
    setTimeout(() => {
      const response = generateLocalResponse(textToSend);
      setMessages(prev => [
        ...prev, 
        { 
          role: 'model', 
          text: response,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsLoading(false);
    }, 450);
  };

  const toggleChat = () => {
    if (isOpen && onCloseExternal) {
      onCloseExternal();
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-16 right-0 w-[92vw] sm:w-[420px] h-[550px] bg-[#0c0d15] border border-emerald-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 flex items-center justify-between text-zinc-950 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-zinc-950/20 rounded-xl">
                  <Bot size={22} className="text-zinc-950" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold font-display text-sm tracking-tight text-zinc-950">
                    SegniBot Assistant
                    <span className="w-2 h-2 rounded-full bg-zinc-950 animate-pulse" />
                  </div>
                  <div className="text-[11px] font-mono text-zinc-900/80">
                    Interactive Portfolio AI
                  </div>
                </div>
              </div>

              <button
                onClick={toggleChat}
                className="p-1.5 rounded-full hover:bg-black/15 text-zinc-950 transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-grid-pattern text-xs sm:text-sm">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'model' && (
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={15} />
                    </div>
                  )}

                  <div className={`max-w-[85%] rounded-2xl p-3.5 ${
                    m.role === 'user'
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-950 font-medium ml-auto'
                      : 'bg-zinc-900/90 border border-white/10 text-zinc-200'
                  }`}>
                    {m.role === 'model' ? (
                      <div className="markdown-body leading-relaxed">
                        <Markdown>{m.text}</Markdown>
                      </div>
                    ) : (
                      <p>{m.text}</p>
                    )}
                    {m.time && (
                      <div className={`text-[10px] mt-1 font-mono ${
                        m.role === 'user' ? 'text-zinc-900/70 text-right' : 'text-zinc-500'
                      }`}>
                        {m.time}
                      </div>
                    )}
                  </div>

                  {m.role === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <User size={15} />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 p-2">
                  <Loader2 size={16} className="animate-spin" />
                  <span>SegniBot is thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions Carousel */}
            <div className="px-3 py-2 bg-zinc-950/80 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              {QUICK_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-emerald-500/20 hover:text-emerald-300 border border-white/10 text-[11px] text-zinc-400 whitespace-nowrap transition-colors cursor-pointer shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input field bar */}
            <div className="p-3 bg-zinc-950 border-t border-white/10 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask a question about Segni..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-zinc-950 transition-colors cursor-pointer"
                  aria-label="Send message"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Floating Chat Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="relative p-3.5 sm:p-4 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 text-zinc-950 shadow-xl shadow-emerald-500/30 flex items-center justify-center group cursor-pointer"
        aria-label="Open AI Assistant"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <Bot size={24} className="group-hover:rotate-12 transition-transform duration-300" />
      </motion.button>
    </div>
  );
};
