import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

const responses = {
  default: "I'm Darshan's AI Agent! I can answer questions about his skills, experience, and education.",
  skills: "Darshan specializes in Data Science, Machine Learning, Python, React, and Prompt Engineering.",
  experience: "He builds intelligent data pipelines, agentic workflows, and modern web applications.",
  education: "He's currently studying Computer Science at Sapthagiri NPS University (2024-2028).",
  contact: "You can reach him via the contact form at the bottom, or connect on LinkedIn!"
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: responses.default, isBot: true }]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { text: userText, isBot: false }]);
    setInput('');

    setTimeout(() => {
      const lower = userText.toLowerCase();
      let botResponse = responses.default;
      
      if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack') || lower.includes('tool')) {
        botResponse = responses.skills;
      } else if (lower.includes('experience') || lower.includes('work') || lower.includes('project') || lower.includes('build')) {
        botResponse = responses.experience;
      } else if (lower.includes('education') || lower.includes('university') || lower.includes('degree') || lower.includes('college')) {
        botResponse = responses.education;
      } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('reach')) {
        botResponse = responses.contact;
      }

      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 600);
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            style={{
              position: 'absolute',
              bottom: '4rem',
              right: 0,
              width: '320px',
              height: '400px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              overflow: 'hidden'
            }}
          >
            <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '8px', height: '8px', background: 'var(--accent-cyan)', borderRadius: '50%', boxShadow: '0 0 10px var(--accent-cyan)' }}></div>
                <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>Darshan AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)' }}>
                <X size={18} />
              </button>
            </div>
            
            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {messages.map((m, i) => (
                <div key={i} style={{ alignSelf: m.isBot ? 'flex-start' : 'flex-end', maxWidth: '85%' }}>
                  <div style={{
                    background: m.isBot ? 'var(--bg-tertiary)' : 'var(--accent-cyan)',
                    color: m.isBot ? 'var(--text-primary)' : '#fff',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    borderBottomLeftRadius: m.isBot ? '2px' : '12px',
                    borderBottomRightRadius: !m.isBot ? '2px' : '12px',
                    fontSize: '0.9rem',
                    lineHeight: '1.4'
                  }}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} style={{ padding: '0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem', background: 'var(--bg-secondary)' }}>
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about Darshan..."
                style={{ flex: 1, background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '0.5rem 1rem', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem' }}
              />
              <button type="submit" style={{ background: 'var(--accent-cyan)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--accent-cyan)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          boxShadow: '0 5px 20px rgba(0, 240, 255, 0.4)'
        }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </div>
  );
};

export default ChatWidget;
