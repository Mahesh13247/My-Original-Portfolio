import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Database, Layout, Globe, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import myPhoto from '../assets/IMG_20250524_235515_332.webp';

const Home = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
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
    { name: 'React JS',      icon: <Layout size={22} />,   level: 'Experienced'  },
    { name: 'Node JS',       icon: <Database size={22} />, level: 'Intermediate' },
    { name: 'JavaScript',    icon: <Code2 size={22} />,    level: 'Experienced'  },
    { name: 'Express JS',    icon: <Database size={22} />, level: 'Intermediate' },
    { name: 'PostgreSQL',    icon: <Database size={22} />, level: 'Advanced'     },
    { name: 'Tailwind CSS',  icon: <Layout size={22} />,   level: 'Experienced'  },
    { name: 'Git',           icon: <Code2 size={22} />,    level: 'Advanced'     },
    { name: 'TypeScript',    icon: <Code2 size={22} />,    level: 'Basic'        },
  ];

  return (
    <div className="space-y-12 md:space-y-20 pb-12">

      {/* ── Hero Section ── */}
      <section className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:pt-16 md:pb-20">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(57,255,20,0.07),transparent)] pointer-events-none -z-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-inter text-[11px] text-primary tracking-[0.2em] mb-4 inline-block px-4 py-2 rounded-full border border-primary/20 bg-primary/5 uppercase neon-text-blue"
            >
              Capable Frontend Engineer
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-on-background mb-5 leading-tight"
            >
              Crafting digital experiences with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-neon-pink">
                precision
              </span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-on-surface-variant max-w-lg mb-7 leading-relaxed"
            >
              I am Mahesh, a developer dedicated to building fast, accessible, and beautiful web applications.
              Specializing in user-centric design and high-performance SaaS solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <Link to="/projects" className="btn-primary flex items-center gap-2 group !px-6 !py-3">
                Explore Projects <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#contact" className="btn-secondary !px-6 !py-3">Get In Touch</a>
            </motion.div>
          </div>

          {/* Hero image — hidden on small phones, visible md+ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative hidden md:block"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl -z-10 rounded-full" />
            <div className="aspect-square rounded-2xl border border-outline bg-surface p-2 overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform duration-500 group">
              <img
                src="/Gemini_Generated_Image_db2ykdb2ykdb2ykd.png"
                alt="Hacker Style Interface"
                className="w-full h-full object-cover rounded-xl opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
              />
            </div>
          </motion.div>
        </div>

        {/* Mobile hero image — shown only on small phones below text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="block md:hidden mt-8"
        >
          <div className="w-full max-w-sm mx-auto aspect-square rounded-2xl border border-outline bg-surface p-2 overflow-hidden shadow-2xl">
            <img
              src="/Gemini_Generated_Image_db2ykdb2ykdb2ykd.png"
              alt="Hacker Style Interface"
              className="w-full h-full object-cover rounded-xl opacity-90"
            />
          </div>
        </motion.div>
      </section>

      {/* ── About Section ── */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16" id="about">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-manrope text-2xl sm:text-3xl md:text-4xl font-black text-on-background mb-4">
              Engineering seamless user journeys.
            </h2>
            <p className="text-on-surface-variant mb-6 leading-relaxed text-sm sm:text-base">
              With 1+ years of experience in Frontend Development and a background in Computer Science Engineering,
              I focus on creating scalable architectures and intuitive user interfaces.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-5 rounded-2xl text-center border border-outline">
                <span className="block text-2xl sm:text-3xl font-black text-primary mb-1 neon-text-blue">1+</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-on-surface-variant">Year Exp</span>
              </div>
              <div className="glass-panel p-5 rounded-2xl text-center border border-outline">
                <span className="block text-2xl sm:text-3xl font-black text-primary mb-1 neon-text-blue">10+</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-on-surface-variant">Projects</span>
              </div>
            </div>
          </motion.div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="w-full max-w-sm mx-auto aspect-square rounded-3xl overflow-hidden glass-panel p-2 border border-slate-800">
              <img
                src={myPhoto}
                alt="Mahesh"
                className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-4 right-0 sm:-bottom-5 sm:right-2 glass-panel px-4 py-2 rounded-xl shadow-2xl border border-primary/20">
              <span className="text-primary font-black text-sm neon-text-blue">B.Tech (CSE)</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Skills Section ── */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-manrope text-2xl sm:text-3xl md:text-4xl font-black text-on-background">
            Technical Arsenal ⚡
          </h2>
          <p className="text-on-surface-variant mt-3 text-sm sm:text-base">Tools I use to bring ideas to life.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
              viewport={{ once: true }}
              className="glass-panel p-4 sm:p-6 rounded-2xl flex flex-col items-center text-center hover:border-primary/40 transition-all duration-300 group border border-slate-800"
            >
              <div className="text-primary mb-3 group-hover:scale-110 transition-transform neon-text-blue">
                {skill.icon}
              </div>
              <h3 className="font-black text-on-background text-sm mb-1">{skill.name}</h3>
              <span className="text-[9px] sm:text-[10px] text-on-surface-variant uppercase tracking-widest">{skill.level}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16" id="contact">
        <div className="glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 border border-slate-800">
          <div className="flex flex-col md:flex-row gap-10 md:gap-16">
            {/* Contact info */}
            <div className="flex-1">
              <h2 className="font-manrope text-2xl sm:text-3xl md:text-4xl font-black mb-4">
                Let's build something{' '}
                <span className="gradient-text">amazing</span>.
              </h2>
              <p className="text-on-surface-variant mb-6 text-sm sm:text-base leading-relaxed">
                Available for freelance projects and full-time opportunities.
                Let's connect and discuss your vision.
              </p>
              <div className="space-y-4">
                <a
                  href="mailto:kmaheshachary34@gmail.com"
                  className="flex items-center gap-3 text-on-background hover:text-primary transition-colors text-sm sm:text-base"
                >
                  <Mail size={18} className="text-primary neon-text-blue flex-shrink-0" />
                  kmaheshachary34@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/k-mahesh-kumar-achary-4a438b286/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-on-background hover:text-primary transition-colors text-sm sm:text-base"
                >
                  <Globe size={18} className="text-primary neon-text-blue flex-shrink-0" />
                  LinkedIn Profile
                </a>
              </div>
            </div>

            {/* Contact form */}
            <form onSubmit={handleSubmit} className="flex-1 w-full space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-surface border-2 border-outline rounded-xl px-4 py-3 focus:border-primary outline-none transition-all duration-300 text-on-background placeholder:text-on-surface-variant/40 focus:shadow-[0_0_10px_rgba(57,255,20,0.15)] text-sm"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-surface border-2 border-outline rounded-xl px-4 py-3 focus:border-primary outline-none transition-all duration-300 text-on-background placeholder:text-on-surface-variant/40 focus:shadow-[0_0_10px_rgba(57,255,20,0.15)] text-sm"
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-surface border-2 border-outline rounded-xl px-4 py-3 focus:border-primary outline-none transition-all duration-300 text-on-background placeholder:text-on-surface-variant/40 focus:shadow-[0_0_10px_rgba(57,255,20,0.15)] resize-none text-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed !py-3"
              >
                {loading ? 'Sending...' : 'Send Message ⚡'}
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
