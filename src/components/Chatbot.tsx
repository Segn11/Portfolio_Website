import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';

const SYSTEM_INSTRUCTION = `You are a helpful AI assistant for Segni Nadew's personal portfolio. Your goal is to answer questions about Segni's skills, projects, and achievements.
Segni is a Full Stack Web Developer and AI/Data Science enthusiast.

Skills:
- Frontend: React, Tailwind, HTML, CSS, JavaScript
- Backend: Node.js, Express.js, MongoDB, PostgreSQL
- AI/ML: Python, CNN, BERT, Scikit-learn, TensorFlow
- Tools: Git, VS Code, Streamlit, Flask, Docker

Projects:
- E-Commerce MERN App: Full-featured online store with payment integration (Stripe), user auth, and admin dashboard.
- Food Delivery Website: Real-time ordering system with live tracking.
- GamaListing App: Property listing platform for real estate agents and buyers.
- Amharic Character Classifier: Deep learning model using CNN to recognize handwritten Amharic characters.
- Zindi Competition Projects: Various data science solutions for environmental and economic forecasting.

Achievements:
- Ranked 51/358 in AgriBORA Commodity Price Forecasting Challenge.
- Zindi Competition Participant: Actively solving real-world African problems.
- Deployed multiple end-to-end machine learning solutions.

Be professional, concise, and friendly. If you don't know something, say you're not sure and suggest contacting Segni directly via the contact form at the bottom of the page.`;

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! I'm Segni's AI assistant. How can I help you today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
        history: messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }))
      });

      const response = await chat.sendMessage({ message: userMessage });
      const text = response.text || "I'm sorry, I couldn't process that.";
      
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] glass-card flex flex-col shadow-2xl overflow-hidden border-emerald-500/20"
          >
            {/* Header */}
            <div className="p-4 bg-emerald-500 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-zinc-950/20 rounded-lg">
                  <Bot size={20} className="text-zinc-950" />
                </div>
                <div>
                  <h3 className="text-zinc-950 font-bold text-sm">Segni's Assistant</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-zinc-950/40 rounded-full animate-pulse" />
                    <span className="text-zinc-950/60 text-[10px] font-medium uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-zinc-950/60 hover:text-zinc-950 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((msg, idx) => (
                <div 
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${msg.role === 'user' ? 'bg-emerald-500 text-zinc-950' : 'bg-zinc-800 text-emerald-400'}`}>
                      {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-emerald-500 text-zinc-950 rounded-tr-none' : 'bg-zinc-800 text-zinc-200 rounded-tl-none'}`}>
                      <div className="markdown-body">
                        <Markdown>{msg.text}</Markdown>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-zinc-800 text-emerald-400 flex items-center justify-center">
                      <Bot size={16} />
                    </div>
                    <div className="p-3 rounded-2xl bg-zinc-800 text-zinc-400 rounded-tl-none flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      <span className="text-xs">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5 bg-zinc-900/50">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about Segni..."
                  className="flex-1 bg-zinc-800 border border-white/5 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="p-2 bg-emerald-500 text-zinc-950 rounded-xl hover:bg-emerald-600 disabled:opacity-50 disabled:hover:bg-emerald-500 transition-colors"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-colors ${isOpen ? 'bg-zinc-800 text-white' : 'bg-emerald-500 text-zinc-950'}`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
};
