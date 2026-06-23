
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import { sanitizeInput } from '../utils/security';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  options?: ChatOption[];
}

interface ChatOption {
  label: string;
  value: string;
  action: 'navigate' | 'reply' | 'link';
  payload?: string;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState('');
  
  const { services } = useData();
  const navigate = useNavigate();
  const bottomRef = useRef<HTMLDivElement>(null);

  const addBotMessage = (text: string, options?: ChatOption[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text,
        sender: 'bot',
        options
      }]);
    }, 1200); // Simulate thinking time
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text,
      sender: 'user'
    }]);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Initial Welcome
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const timer = setTimeout(() => {
        addBotMessage("Hi there! 👋 I'm the Optimantix Assistant. How can I help you grow your business today?", [
          { label: "Explore Services", value: "services", action: 'reply' },
          { label: "Request a Quote", value: "quote", action: 'navigate', payload: '/contact' },
          { label: "Contact Support", value: "support", action: 'reply' }
        ]);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length]);

  const handleOptionClick = (option: ChatOption) => {
    addUserMessage(option.label);

    if (option.action === 'navigate' && option.payload) {
        setIsOpen(false);
        navigate(option.payload);
        return;
    }

    if (option.action === 'reply') {
        processResponse(option.value);
    }
  };

  const handleSend = (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputText.trim()) return;
      
      const cleanText = sanitizeInput(inputText);
      addUserMessage(cleanText);
      setInputText('');
      
      // Simple Keyword Matching
      processKeyword(cleanText.toLowerCase());
  };

  const processResponse = (key: string) => {
      if (key === 'services') {
          addBotMessage("We offer comprehensive digital solutions. Which area interests you?", 
             services.map(s => ({
                 label: s.title,
                 value: `service_${s.id}`,
                 action: 'reply'
             }))
          );
      } else if (key.startsWith('service_')) {
          const serviceId = key.split('_')[1];
          const service = services.find(s => s.id === serviceId);
          if (service) {
              addBotMessage(`${service.shortDescription} Would you like to see details?`, [
                  { label: "View Details", value: "view", action: 'navigate', payload: `/services/${service.slug}` },
                  { label: "Back to Menu", value: "menu", action: 'reply' }
              ]);
          }
      } else if (key === 'support') {
          addBotMessage("You can reach our support team directly.", [
              { label: "Call +91 9910343016", value: "call_in", action: 'link', payload: 'tel:+919910343016' },
              { label: "Call +1 802 995 2844", value: "call_us", action: 'link', payload: 'tel:+18029952844' },
              { label: "Email Info", value: "email", action: 'link', payload: 'mailto:info@optimantix.com' },
              { label: "Back to Menu", value: "menu", action: 'reply' }
          ]);
      } else if (key === 'menu') {
           addBotMessage("What else can I do for you?", [
            { label: "Explore Services", value: "services", action: 'reply' },
            { label: "Request a Quote", value: "quote", action: 'navigate', payload: '/contact' }
          ]);
      }
  };

  const processKeyword = (text: string) => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        // Basic NLP-ish logic
        if (text.includes('seo') || text.includes('marketing')) {
             const s = services.find(x => x.slug === 'digital-marketing');
             addBotMessage("We are experts in Digital Marketing & SEO.", [
                 { label: "View Marketing Services", value: "view", action: 'navigate', payload: `/services/${s?.slug}` }
             ]);
        } else if (text.includes('web') || text.includes('app') || text.includes('design')) {
             addBotMessage("We build high-performance websites and apps.", [
                { label: "View Development", value: "view", action: 'navigate', payload: '/services/development' }
             ]);
        } else if (text.includes('price') || text.includes('cost') || text.includes('quote')) {
            addBotMessage("Our pricing is tailored to your project needs. Shall we set up a call?", [
                { label: "Get a Free Quote", value: "quote", action: 'navigate', payload: '/contact' }
            ]);
        } else {
            addBotMessage("I'm not sure about that, but I can connect you with a human expert.", [
                 { label: "Contact Us", value: "quote", action: 'navigate', payload: '/contact' },
                 { label: "Back to Menu", value: "menu", action: 'reply' }
            ]);
        }
      }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-4 md:right-8 w-[90vw] md:w-96 h-[500px] max-h-[70vh] bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex justify-between items-center text-white">
               <div className="flex items-center gap-3">
                   <div className="bg-white/20 p-2 rounded-full">
                       <Sparkles size={18} />
                   </div>
                   <div>
                       <h3 className="font-bold text-sm">Optimantix Assistant</h3>
                       <p className="text-[10px] opacity-80 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Online</p>
                   </div>
               </div>
               <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition"><X size={18} /></button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#111] custom-scrollbar">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                            msg.sender === 'user' 
                            ? 'bg-primary text-white rounded-br-none' 
                            : 'bg-white dark:bg-[#222] text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-bl-none shadow-sm'
                        }`}>
                            {msg.text}
                        </div>
                        
                        {/* Options */}
                        {msg.options && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {msg.options.map((opt, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => opt.action === 'link' ? window.open(opt.payload, '_blank') : handleOptionClick(opt)}
                                        className="text-xs bg-white dark:bg-[#2a2a2a] border border-primary/20 hover:bg-primary hover:text-white text-primary px-3 py-1.5 rounded-full transition-colors shadow-sm"
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                
                {isTyping && (
                     <div className="flex items-center gap-1 p-2">
                         <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                         <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s'}}></span>
                         <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s'}}></span>
                     </div>
                )}
                <div ref={bottomRef}></div>
            </div>

            {/* Footer */}
            <form onSubmit={handleSend} className="p-3 bg-white dark:bg-[#1a1a1a] border-t border-gray-100 dark:border-gray-800 flex gap-2">
                <input 
                    className="flex-1 bg-gray-100 dark:bg-[#222] rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary dark:text-white"
                    placeholder="Type a message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <button type="submit" className="bg-primary text-white p-2 rounded-full hover:bg-secondary transition disabled:opacity-50" disabled={!inputText.trim()}>
                    <Send size={16} />
                </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger */}
      {!isOpen && (
        <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-40 bg-primary text-white p-4 rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center group"
        >
            <MessageCircle size={28} />
            <span className="absolute right-0 top-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
        </motion.button>
      )}
    </>
  );
};
