import React, { useState, useEffect } from 'react';
import { Terminal, Code, Database, Cloud, BrainCircuit, ExternalLink, Mail, Globe, UserCircle, MonitorPlay, MapPin, Lightbulb, Zap, Workflow, Target, TrendingUp, Shield, Users, Milestone, Calendar, BarChart, MessageSquare, LineChart, BookOpen, Layers } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import ParticlesBackground from './ParticlesBackground';
import CustomCursor from './components/CustomCursor';
import TerminalWidget from './components/TerminalWidget';
import BrainModel from './components/BrainModel';
import ChatWidget from './components/ChatWidget';
import ThemeToggle from './components/ThemeToggle';
import ProjectsSection from './components/ProjectsSection';
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const Typewriter = ({ texts, typingSpeed = 100, deletingSpeed = 50, pauseDelay = 2000 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = texts[currentIndex];
      
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), pauseDelay);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentIndex, texts, typingSpeed, deletingSpeed, pauseDelay]);

  return <span className="typing-cursor">{currentText}</span>;
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40, rotateX: -15, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0, 
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const Navbar = () => (
  <nav>
    <div className="container flex justify-between items-center">
      <div className="font-mono font-bold text-lg text-white">
        ~/Darshan<span className="text-gradient">/portfolio</span>
      </div>
      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#values">Values</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  </nav>
);

const SkillCard = ({ title, icon: Icon, skills }) => (
  <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={true} glareMaxOpacity={0.1} scale={1.05} transitionSpeed={2000} className="skill-card">
    <div className="skill-icon-wrapper">
      <Icon size={24} className="skill-icon" />
    </div>
    <h3>{title}</h3>
    <ul className="skill-list">
      {skills.map((skill, index) => (
        <li key={index}>{skill}</li>
      ))}
    </ul>
  </Tilt>
);

const LearningCard = ({ title, category, description, icon: Icon, progress }) => (
  <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={true} glareMaxOpacity={0.15} scale={1.03} transitionSpeed={2000} className="learning-card">
    <div className="flex justify-between items-start" style={{ marginBottom: '1rem' }}>
      <div>
        <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>{category}</div>
        <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{title}</h3>
      </div>
      <Icon size={24} className="text-secondary" />
    </div>
    <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', minHeight: '3rem' }}>{description}</p>
    <div className="progress-bar-container">
      <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
    </div>
  </Tilt>
);

const ValueCard = ({ title, description, icon: Icon }) => (
  <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} glareEnable={true} glareMaxOpacity={0.1} scale={1.05} transitionSpeed={2000} className="value-card">
    <Icon size={32} className="text-gradient" style={{ marginBottom: '1rem' }} />
    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{title}</h3>
    <p style={{ margin: 0 }}>{description}</p>
  </Tilt>
);

const Hero = ({ theme }) => (
  <section className="section" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', position: 'relative' }}>
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeUpVariant}
      className="container hero-layout"
    >
      <div className="hero-card">
        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={true} glareMaxOpacity={0.1} scale={1.02}>
          <div className="profile-card" style={{ padding: '1.5rem', width: '320px' }}>
            <div className="profile-avatar-container" style={{ width: '150px', height: '150px', marginBottom: '1rem', background: 'transparent' }}>
              <BrainModel theme={theme} />
            </div>
            
            <div className="profile-info" style={{ padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Student</div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', lineHeight: '1.4' }}>Computer Science and Engineering</h3>
              <p style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                <a href="https://www.linkedin.com/school/sapthagiri-nps-university/posts/?feedView=all" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>
                  Sapthagiri NPS University, Bangalore
                </a>
              </p>
              <div className="flex justify-between" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>2024 - 2028</span>
              </div>
            </div>

            <div className="profile-socials" style={{ padding: '0.75rem', gap: '1rem' }}>
              <a href="https://github.com/alaghattadarshan-glitch" target="_blank" rel="noreferrer" className="social-icon"><FaGithub size={18} /></a>
              <a href="https://www.linkedin.com/in/darshan-prabhu-k-63275231b/" target="_blank" rel="noreferrer" className="social-icon"><FaLinkedin size={18} /></a>
              <a href="https://x.com/AradhyaKdarshan" target="_blank" rel="noreferrer" className="social-icon"><FaTwitter size={18} /></a>
              <a href="https://www.instagram.com/aradhya.__.16/" target="_blank" rel="noreferrer" className="social-icon"><FaInstagram size={18} /></a>
            </div>
          </div>
        </Tilt>
      </div>

      <div className="hero-content">
        <h1 style={{ marginBottom: '1rem', fontSize: '3rem', lineHeight: '1.2' }}>
          Hey there! 👋<br/>I'm <span className="text-gradient">Darshan Prabhu K</span>
        </h1>
        <div style={{ fontSize: '1.5rem', marginBottom: '2rem', height: '40px' }} className="font-mono text-secondary">
          <Typewriter texts={[
            "Data Scientist & Analyst",
            "Artificial Intelligence Specialist",
            "Prompt Engineering Expert",
            "Transforming Data into Intelligence"
          ]} />
        </div>
        <div className="flex gap-4 flex-wrap justify-center md:justify-start">
          <a href="#skills" className="btn btn-primary">My Expertise</a>
          <a href="https://www.linkedin.com/in/darshan-prabhu-k-63275231b/details/certifications/" target="_blank" rel="noreferrer" className="btn btn-outline flex items-center gap-2">
            Certifications <ExternalLink size={16} />
          </a>
          <a href="#contact" className="btn btn-outline">Let's Connect</a>
        </div>
        <div style={{ marginTop: '2rem', width: '100%' }}>
          <TerminalWidget />
        </div>
      </div>
    </motion.div>
  </section>
);

const About = () => (
  <section id="about" className="section container">
    <motion.h2 
      initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}
    >
      Who am I?
    </motion.h2>
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
        <p style={{ fontSize: '1.1rem' }}>
          I am a <b>Data Scientist and AI Specialist</b> dedicated to transforming raw, complex data into highly actionable intelligence. 
        </p>
        <p style={{ fontSize: '1.1rem' }}>
          My expertise lies at the intersection of <b>Data Analytics, Machine Learning, and Prompt Engineering</b>. I don't just build models; I design robust data pipelines and leverage Large Language Models (LLMs) to solve high-stakes problems with precision.
        </p>
        <p style={{ fontSize: '1.1rem', color: 'var(--accent-cyan)' }}>
          <b>My Mission:</b> To architect intelligent, data-driven systems that empower decision-making and drive massive innovation across the technology industry.
        </p>
      </motion.div>
      
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
        <Tilt glareEnable={true} glareMaxOpacity={0.2} glareColor="#00F0FF" glarePosition="all" scale={1.02} tiltMaxAngleX={5} tiltMaxAngleY={5}>
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dot dot-red"></div>
              <div className="terminal-dot dot-yellow"></div>
              <div className="terminal-dot dot-green"></div>
              <span style={{ marginLeft: '10px', fontSize: '0.8rem', color: '#8B949E' }}>intelligence.ts</span>
            </div>
            <div className="terminal-body">
              <span className="comment">/** System Initialize: Identity & Capabilities */</span><br />
              <span className="keyword">const</span> <span className="property">darshan</span> = {'{'} <br />
              &nbsp;&nbsp;role: <span className="string">'Data Scientist & Analyst'</span>,<br />
              &nbsp;&nbsp;education: <span className="string">'Computer Science Engineering'</span>,<br />
              &nbsp;&nbsp;coreFocus: [<span className="string">'Data Science'</span>, <span className="string">'Machine Learning'</span>, <span className="string">'Prompt Engineering'</span>],<br />
              &nbsp;&nbsp;philosophy: <span className="string">'Consistency, discipline, and curiosity.'</span>,<br />
              &nbsp;&nbsp;objective: <span className="string">'Extract patterns from chaos to build data-driven AI solutions.'</span><br />
              {'};'}
            </div>
          </div>
        </Tilt>
      </motion.div>
    </div>
  </section>
);

const Skills = () => {
  const pillars = [
    {
      title: "Data Science & Analytics",
      icon: LineChart,
      skills: ["Data Analysis", "Predictive Modeling", "Pandas & NumPy", "SQL", "Exploratory Data Analysis (EDA)", "Data Visualization"]
    },
    {
      title: "Artificial Intelligence",
      icon: BrainCircuit,
      skills: ["Machine Learning", "Generative AI Integration", "Neural Networks", "Algorithm Optimization"]
    },
    {
      title: "Prompt Engineering",
      icon: MessageSquare,
      skills: ["Advanced Prompt Structuring", "Chain-of-Thought Reasoning", "LLM Context Optimization", "AI Agent Development"]
    }
  ];

  return (
    <section id="skills" className="section container">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
        <h2>Technical Capabilities</h2>
        <p style={{ marginBottom: '3rem', fontSize: '1.1rem' }}>My specialized skill set is intensely focused on extracting meaning from data and harnessing the power of modern Artificial Intelligence.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {pillars.map((pillar, idx) => (
          <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} transition={{ delay: idx * 0.2 }}>
            <SkillCard {...pillar} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const CurrentLearnings = () => {
  const learnings = [
    { title: "Data Structures & Algorithms", category: "Fundamentals", description: "Strengthening core computer science fundamentals for complex problem solving.", icon: Code, progress: 75 },
    { title: "GenAI & Prompt Engineering", category: "AI", description: "Mastering how to optimize LLM context windows and build intelligent AI agents.", icon: MessageSquare, progress: 90 },
    { title: "Cloud Computing Infrastructure", category: "Cloud", description: "Learning to deploy scalable data pipelines and distributed systems in the cloud.", icon: Cloud, progress: 60 },
    { title: "Data Analytics Foundations", category: "Data", description: "Transitioning to deep statistical analysis and predictive modeling.", icon: LineChart, progress: 85 }
  ];

  return (
    <section id="learnings" className="section container">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
        <h2 className="section-title">Currently Learning</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
          My active curriculum and areas of deep technical focus.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {learnings.map((l, idx) => (
          <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} transition={{ delay: idx * 0.1 }}>
            <LearningCard {...l} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const CoreValues = () => {
  const values = [
    { title: "Discipline", description: "Showing up every day and staying fiercely committed to my goals.", icon: Target },
    { title: "Consistency", description: "Small daily improvements create massive, compounding long-term success.", icon: TrendingUp },
    { title: "Curiosity", description: "Always exploring data anomalies and emerging AI architectures.", icon: Lightbulb },
    { title: "Growth Mindset", description: "Viewing all complex challenges as unparalleled opportunities to learn.", icon: Users }
  ];

  return (
    <section id="values" className="section container">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Beyond Technology</h2>
        <p style={{ marginBottom: '3rem', fontSize: '1.1rem', maxWidth: '800px' }}>
          Data and code are just tools. The real engineering happens in the mindset. These are the core professional pillars that drive my success and analytical rigor every single day.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((v, idx) => (
          <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} transition={{ delay: idx * 0.1 }}>
            <ValueCard {...v} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ submitting: false, success: false, error: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        setStatus({ submitting: false, success: true, error: null });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
      } else {
        setStatus({ submitting: false, success: false, error: data.error || 'Failed to send message.' });
      }
    } catch (error) {
      console.error(error);
      setStatus({ submitting: false, success: false, error: 'Cannot connect to backend server.' });
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section id="contact" className="section container">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
        <div style={{ marginBottom: '2rem' }}>
          <span className="comment">/**</span><br />
          <span className="comment">&nbsp;* Data Transmission Protocol</span><br />
          <span className="comment">&nbsp;* @returns {'{JSX.Element}'}</span><br />
          <span className="comment">&nbsp;*/</span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Editor Window */}
          <div className="editor-window md:col-span-2">
            <div className="editor-tab">
              contact.jsx <div className="editor-tab-dot"></div>
            </div>
            <div className="editor-content">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">const name =</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input" placeholder="'Your Name'" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">const email =</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" placeholder="'your@email.com'" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">const subject =</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="form-input" placeholder="'Project Inquiry'" />
                </div>

                <div className="form-group">
                  <label className="form-label">const message =</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required className="form-input" placeholder="'Your message here...'"></textarea>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
                    {status.error && <span style={{ color: '#FF5F56' }}>// Error: {status.error}</span>}
                    {status.success && <span style={{ color: '#27C93F' }}>// Return: 200 OK (Message Sent!)</span>}
                  </div>
                  <button type="submit" disabled={status.submitting} className="btn-blue">
                    {status.submitting ? 'Sending...' : 'Send Message \u2192'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar Cards */}
          <div className="flex flex-col gap-4">
            <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} glareEnable={true} glareMaxOpacity={0.2} scale={1.05}>
              <div className="contact-sidebar-card">
                <div className="flex items-center gap-2" style={{ color: '#A5D6FF', fontSize: '0.9rem' }}>
                  <Mail size={16} /> Email
                </div>
                <div style={{ fontSize: '0.85rem', color: '#A1A1AA' }}>alaghattadarshan@gmail.com</div>
              </div>
            </Tilt>

            <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} glareEnable={true} glareMaxOpacity={0.2} scale={1.05}>
              <div className="contact-sidebar-card">
                <div className="flex items-center gap-2" style={{ color: '#27C93F', fontSize: '0.9rem' }}>
                  <MapPin size={16} /> Location
                </div>
                <div style={{ fontSize: '0.85rem', color: '#A1A1AA' }}>
                  Bangalore,<br />Karnataka, India
                </div>
              </div>
            </Tilt>

            <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} glareEnable={true} glareMaxOpacity={0.2} scale={1.05}>
              <div className="contact-sidebar-card">
                <div className="flex items-center gap-2" style={{ color: '#C9D1D9', fontSize: '0.9rem' }}>
                  <Globe size={16} /> GitHub
                </div>
                <a href="https://github.com/alaghattadarshan-glitch" target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: '#A1A1AA', textDecoration: 'none' }}>
                  github.com/alaghattadarshan-glitch
                </a>
              </div>
            </Tilt>

            <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} glareEnable={true} glareMaxOpacity={0.2} scale={1.05}>
              <div className="contact-sidebar-card">
                <div className="flex items-center gap-2" style={{ color: '#FFBD2E', fontSize: '0.9rem' }}>
                  <Lightbulb size={16} /> Insight
                </div>
                <div style={{ fontSize: '0.85rem', color: '#A1A1AA' }}>
                  "Build. Learn. Improve. Repeat." 🚀
                </div>
              </div>
            </Tilt>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    if (newTheme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <CustomCursor />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <ChatWidget />
      <ParticlesBackground theme={theme} />
      <Navbar />
      <Hero theme={theme} />
      <About />
      <Skills />
      <ProjectsSection />
      <CurrentLearnings />
      <CoreValues />
      <Contact />
    </div>
  );
}

export default App;
