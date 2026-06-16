import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TerminalWidget = () => {
  const [text, setText] = useState('');
  const fullText = `> import darshan
> model = darshan.train(epochs=100)
[====================] 100%
> model.predict("success")
Output: "Data Intelligence Achieved."`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="terminal-widget"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        background: 'var(--bg-secondary)',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        overflow: 'hidden',
        marginTop: '2rem',
        maxWidth: '400px',
        boxShadow: '0 10px 30px -10px rgba(0, 240, 255, 0.2)',
        textAlign: 'left'
      }}
    >
      <div style={{ background: 'var(--bg-tertiary)', padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem' }}>
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></span>
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></span>
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></span>
      </div>
      <div style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--accent-cyan)', whiteSpace: 'pre-wrap', minHeight: '120px' }}>
        {text}
        <span className="typing-cursor" style={{ display: 'inline-block', width: '8px', height: '15px', background: 'var(--accent-cyan)', marginLeft: '4px', verticalAlign: 'middle', animation: 'blink 1s step-end infinite' }}></span>
      </div>
    </motion.div>
  );
};

export default TerminalWidget;
