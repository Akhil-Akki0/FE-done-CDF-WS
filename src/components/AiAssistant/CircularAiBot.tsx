import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Shield,
  Loader2,
  Trash2,
  ExternalLink,
  Info,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { apiClient } from '../../utils/api';
import { sound } from '../../utils/soundEffects';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    role: 'assistant',
    text: `### 👋 Welcome to the CFD Platform AI Assistant!
I am **AeroBot**, your aerodynamic and platform co-pilot.

* **Website Owner**: **RIM** is the proud Owner of this platform.
* **Lead Engineer & Developer**: **Akhil.A** (Email: [akkedu01@gmail.com](mailto:akkedu01@gmail.com)) — every credit for software development, OpenFOAM v2606 integration, aerodynamic math algorithms, and 3D visualizers belongs to Akhil.A!

How can I help you today? Ask me about the platform creators, OpenFOAM setup, turbulence models, or aerodynamic theory!`,
    timestamp: 'Just now',
  },
];

const SUGGESTED_QUESTIONS = [
  'Who developed and owns this website?',
  'How does the OpenFOAM solver work?',
  'Explain k-omega SST vs Spalart-Allmaras',
  'What is y+ and why does it matter?',
];

export const CircularAiBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('cfd_aerobot_chat_history');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_MESSAGES;
  });
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem('cfd_aerobot_chat_history', JSON.stringify(messages.slice(-20)));
    } catch {}
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, messages]);

  const handleToggle = () => {
    sound.playClick();
    setIsOpen((prev) => !prev);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    sound.playClick();
    setInputValue('');

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await apiClient<{ reply: string }>('/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: query,
          history: messages.slice(-6).map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      sound.playSuccess();
      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        role: 'assistant',
        text: response.reply || 'Aerodynamic solver processed query.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      const fallbackReply = query.toLowerCase().includes('who') || query.toLowerCase().includes('developer') || query.toLowerCase().includes('owner') || query.toLowerCase().includes('akhil') || query.toLowerCase().includes('rim')
        ? `### 🚀 Website Ownership & Engineering Credits
* **Website Owner**: **RIM** is the Owner of this CFD Platform website.
* **Lead Developer & Software Engineer**: **Akhil.A** (Email: [akkedu01@gmail.com](mailto:akkedu01@gmail.com))
* **Attribution**: Every single credit for developing, coding, and engineering this application belongs completely to **Akhil.A**!`
        : `### 🌪️ AeroBot Aerodynamics Response
This platform incorporates an OpenFOAM v2606 execution engine with steady-state \`simpleFoam\`, SST $k$-$\\omega$ turbulence modeling, and 3D pressure coefficient ($C_p$) contouring.

Developed by **Akhil.A** (Owner: **RIM**).`;

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        role: 'assistant',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    sound.playClick();
    setMessages(INITIAL_MESSAGES);
    try {
      localStorage.removeItem('cfd_aerobot_chat_history');
    } catch {}
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end select-none">
      {/* Expanded Chat Drawer / Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="mb-3 w-[calc(100vw-2rem)] sm:w-96 max-w-sm h-[520px] max-h-[75vh] glass-surface rounded-3xl shadow-2xl border border-white/70 dark:border-slate-800 flex flex-col overflow-hidden bg-white/95 dark:bg-slate-900/95"
          >
            {/* Header */}
            <div className="p-3.5 sm:p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-indigo-500/10 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-sky-600 to-cyan-500 text-white flex items-center justify-center shadow-md">
                  <Bot className="w-5 h-5" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>AeroBot AI</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-mono font-bold">
                      CO-PILOT
                    </span>
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[190px]">
                    Owner: RIM · Developer: Akhil.A
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleClear}
                  title="Clear conversation"
                  aria-label="Clear conversation"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleToggle}
                  aria-label="Close AeroBot assistant"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Suggestions Chips */}
            <div className="p-2 border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/40 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(q)}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-semibold text-slate-700 dark:text-slate-300 hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Messages Scrollable List */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs">
              {messages.map((m) => {
                const isUser = m.role === 'user';
                return (
                  <div
                    key={m.id}
                    className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold ${
                        isUser
                          ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900'
                          : 'bg-sky-600 text-white'
                      }`}
                    >
                      {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>

                    <div
                      className={`max-w-[82%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                        isUser
                          ? 'bg-sky-600 text-white rounded-tr-xs font-medium'
                          : 'bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 rounded-tl-xs border border-slate-200/80 dark:border-slate-700'
                      }`}
                    >
                      <div className="whitespace-pre-wrap select-text">
                        {m.text}
                      </div>
                      <div
                        className={`text-[9px] mt-1 text-right ${
                          isUser ? 'text-sky-100/80' : 'text-slate-400'
                        }`}
                      >
                        {m.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-sky-600 text-white shrink-0 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="p-2.5 rounded-2xl rounded-tl-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-600 dark:text-sky-400" />
                    <span className="text-[11px] text-slate-500 font-medium">AeroBot analyzing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-2.5 border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 flex items-center gap-1.5 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about owner, developer, or CFD..."
                disabled={isLoading}
                className="flex-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send message"
                className="p-2 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white transition-all cursor-pointer shrink-0 shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Circular Floating Trigger Button (Requirement 11: "make ai chat bot circel shape") */}
      <div className="relative group">
        {/* Aerodynamic Pulsing Ring */}
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 opacity-60 blur-xs group-hover:opacity-100 animate-pulse pointer-events-none" />

        <button
          onClick={handleToggle}
          aria-label={isOpen ? 'Close AI Assistant' : 'Open AeroBot AI Assistant'}
          title="AeroBot AI — Owner: RIM · Developer: Akhil.A"
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-sky-600 via-cyan-500 to-blue-600 text-white shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-white/80 dark:border-slate-900 z-10"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-7 h-7 sm:w-8 sm:h-8" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center"
              >
                <Bot className="w-7 h-7 sm:w-8 sm:h-8" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unread indicator */}
          {!isOpen && (
            <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white dark:border-slate-900 rounded-full animate-bounce" />
          )}
        </button>
      </div>
    </div>
  );
};
