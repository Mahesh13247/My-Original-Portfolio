import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Database, Layout, Smartphone, Globe, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import myPhoto from '../assets/IMG_20250524_235515_332.webp';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/contact', formData);
      toast.success('Message sent! I will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const skills = [
    { name: 'React JS', icon: <Layout size={24} />, level: 'Experienced' },
    { name: 'Node JS', icon: <Database size={24} />, level: 'Intermediate' },
    { name: 'JavaScript', icon: <Code2 size={24} />, level: 'Experienced' },
    { name: 'Express JS', icon: <Database size={24} />, level: 'Intermediate' },
    { name: 'PostgreSQL', icon: <Database size={24} />, level: 'Advanced' },
    { name: 'Tailwind CSS', icon: <Layout size={24} />, level: 'Experienced' },
    { name: 'Git', icon: <Code2 size={24} />, level: 'Advanced' },
    { name: 'TypeScript', icon: <Code2 size={24} />, level: 'Basic' },
  ];

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10 pointer-events-none"></div>
        
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-inter text-xs text-primary tracking-[0.2em] mb-6 inline-block px-4 py-2 rounded-full border border-primary/20 bg-primary/5 uppercase neon-text-blue"
          >
            Senior Frontend Engineer
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-slate-50 mb-8"
          >
            Crafting digital experiences with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-neon-pink drop-shadow-[0_0_15px_rgba(57,255,20,0.4)]">precision</span>.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-lg mb-10"
          >
            I am Mahesh, a developer dedicated to building fast, accessible, and beautiful web applications. 
            Specializing in user-centric design and high-performance SaaS solutions.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/projects" className="btn-primary flex items-center gap-2 group">
              Explore Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#contact" className="btn-secondary">Get In Touch</a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative hidden lg:block"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl -z-10 rounded-full"></div>
          <div className="aspect-square rounded-2xl border border-slate-700/50 bg-slate-800 p-2 overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform duration-300 group">
            <img 
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000" 
              alt="Code and Design" 
              className="w-full h-full object-cover rounded-xl opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="max-w-[1200px] mx-auto px-6 py-20" id="about">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-manrope text-4xl font-bold text-on-background mb-6">Engineering seamless user journeys.</h2>
            <p className="text-on-surface-variant mb-6 leading-relaxed">
              With 1+ years of experience in Frontend Development and a background in Computer Science Engineering, 
              I focus on creating scalable architectures and intuitive user interfaces.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-6 rounded-2xl text-center">
                <span className="block text-3xl font-bold text-primary mb-1 neon-text-blue">1+</span>
                <span className="text-xs uppercase tracking-widest text-on-surface-variant">Year Exp</span>
              </div>
              <div className="glass-panel p-6 rounded-2xl text-center">
                <span className="block text-3xl font-bold text-primary mb-1 neon-text-blue">10+</span>
                <span className="text-xs uppercase tracking-widest text-on-surface-variant">Projects</span>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden glass-panel p-2">
              <img 
                src={myPhoto} 
                alt="Mahesh" 
                className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass-panel p-4 rounded-2xl shadow-2xl">
              <span className="text-primary font-bold neon-text-blue">B.Tech (CSE)</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="font-manrope text-4xl font-bold text-on-background">Technical Arsenal</h2>
          <p className="text-on-surface-variant mt-4">Tools I use to bring ideas to life.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center hover:border-primary/50 transition-colors group"
            >
              <div className="text-primary mb-4 group-hover:scale-110 transition-transform neon-text-blue">
                {skill.icon}
              </div>
              <h3 className="font-bold text-on-background mb-1">{skill.name}</h3>
              <span className="text-xs text-on-surface-variant uppercase tracking-widest">{skill.level}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-[1200px] mx-auto px-6 py-20" id="contact">
        <div className="glass-panel rounded-3xl p-12 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="font-manrope text-4xl font-bold mb-6">Let's build something <span className="gradient-text">amazing</span>.</h2>
            <p className="text-on-surface-variant mb-8">
              Available for freelance projects and full-time opportunities. 
              Let's connect and discuss your vision.
            </p>
            <div className="space-y-4">
              <a href="mailto:kmaheshachary34@gmail.com" className="flex items-center gap-4 text-on-background hover:text-primary transition-colors">
                <Mail size={20} className="text-primary neon-text-blue" /> kmaheshachary34@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/k-mahesh-kumar-achary-4a438b286/" className="flex items-center gap-4 text-on-background hover:text-primary transition-colors">
                <Globe size={20} className="text-primary neon-text-blue" /> LinkedIn Profile
              </a>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex-1 w-full space-y-4">
            <input 
              type="text" 
              placeholder="Name" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors" 
            />
            <input 
              type="email" 
              placeholder="Email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors" 
            />
            <textarea 
              placeholder="Message" 
              rows="4" 
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors resize-none"
            ></textarea>
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
