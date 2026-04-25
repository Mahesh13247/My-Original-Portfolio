import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Database, Layout, Globe, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import heroPhoto from '../assets/Gemini_Generated_Image_db2ykdb2ykdb2ykd.png';
import profilePhoto from '../assets/IMG_20250524_235515_332.webp';

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
    { name: 'React JS', icon: <Layout size={22} />, level: 'Experienced' },
    { name: 'Node JS', icon: <Database size={22} />, level: 'Intermediate' },
    { name: 'JavaScript', icon: <Code2 size={22} />, level: 'Experienced' },
    { name: 'Express JS', icon: <Database size={22} />, level: 'Intermediate' },
    { name: 'PostgreSQL', icon: <Database size={22} />, level: 'Advanced' },
    { name: 'Tailwind CSS', icon: <Layout size={22} />, level: 'Experienced' },
    { name: 'Git', icon: <Code2 size={22} />, level: 'Advanced' },
    { name: 'TypeScript', icon: <Code2 size={22} />, level: 'Basic' },
  ];

  const testimonials = [
    { name: 'Alex Rivera', role: 'CTO @ TechFlow', content: 'Mahesh is an exceptional developer. The SaaS platform he built for us is incredibly fast and intuitive. Highly recommended!', avatar: 'AR' },
    { name: 'Sarah Chen', role: 'Product Manager', content: 'Attention to detail and performance optimization is top-notch. Our conversion rate increased by 40% after the redesign.', avatar: 'SC' },
    { name: 'David Smith', role: 'Founder, StartupX', content: 'The premium features and clean code structure made our project a huge success. Great communication throughout the process.', avatar: 'DS' },
    { name: 'Elena Petrova', role: 'UI/UX Lead', content: 'A rare talent who understands both the design aesthetics and the underlying technical architecture perfectly.', avatar: 'EP' },
  ];

  return (
    <div className="relative space-y-16 md:space-y-32 pb-20 overflow-hidden">
      {/* Floating Background Blobs */}
      <div className="absolute top-[10%] -left-20 w-72 h-72 bg-primary/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute top-[40%] -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[140px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[10%] left-[20%] w-80 h-80 bg-neon-pink/5 rounded-full blur-[100px] animate-pulse pointer-events-none" />

      {/* ── Hero Section ── */}
      <section className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:pt-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center text-center md:text-left">
          {/* Text content */}
          <div className="order-2 md:order-1 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--color-primary)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Open for collaboration</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-on-background mb-6 leading-[0.9]"
            >
              Frontend { }
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-neon-blue to-secondary">
                Innovator
              </span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-lg sm:text-xl text-on-surface-variant max-w-lg mx-auto md:mx-0 mb-10 leading-relaxed font-medium"
            >
              I am Mahesh, architecting high-performance SaaS platforms with
              <span className="text-on-background font-bold px-1 underline decoration-primary/40">cutting-edge</span> React technology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start"
            >
              <Link to="/projects" className="btn-primary flex items-center justify-center gap-3 !px-10 !py-5 text-base">
                View Work <ArrowRight size={20} />
              </Link>
              <a href="#contact" className="btn-secondary flex items-center justify-center !px-10 !py-5 text-base">Let's Talk</a>
            </motion.div>
          </div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="order-1 md:order-2 relative"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[450px] lg:h-[450px] mx-auto group">
              {/* Spinning borders */}
              <div className="absolute inset-[-10px] rounded-full border border-dashed border-primary/20 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-[-20px] rounded-full border border-dotted border-secondary/20 animate-[spin_30s_linear_infinite_reverse]" />

              <div className="w-full h-full rounded-full border-[8px] border-surface p-2 bg-surface overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:rotate-3">
                <img
                  src={heroPhoto}
                  alt="Mahesh Hero"
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Skills Ticker (Improved) ── */}
      <section className="py-12 border-y border-outline bg-surface-variant/10 relative">
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex overflow-hidden group">
          <div className="flex animate-scroll whitespace-nowrap py-4">
            {[...skills, ...skills].map((skill, i) => (
              <div key={i} className="flex items-center gap-4 px-12 group/skill">
                <div className="p-3 rounded-xl bg-surface border border-outline group-hover/skill:border-primary transition-colors text-primary shadow-sm">
                  {skill.icon}
                </div>
                <span className="text-2xl font-black text-on-surface-variant/40 group-hover/skill:text-on-background transition-colors uppercase tracking-tighter">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services / Expertise ── */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-on-background tracking-tighter">
            Digital <span className="neon-text-blue">Solutions</span>.
          </h2>
          <p className="text-on-surface-variant mt-4 font-medium">Turning your vision into high-performance reality.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'SaaS Development', desc: 'Building scalable, secure, and multi-tenant platforms using MERN stack.', icon: <Layout className="text-primary" size={32} /> },
            { title: 'UI/UX Engineering', desc: 'Crafting pixel-perfect, interactive, and user-centric interfaces with Framer Motion.', icon: <Globe className="text-secondary" size={32} /> },
            { title: 'Backend Architecture', desc: 'Designing robust APIs and database structures with Node.js and PostgreSQL.', icon: <Database className="text-neon-purple" size={32} /> },
            { title: 'Cloud Integration', desc: 'Deploying and managing applications with Docker, AWS, and modern CI/CD.', icon: <Globe className="text-primary" size={32} /> },
            { title: 'Performance Optimization', desc: 'Ensuring ultra-fast load times and top-tier SEO scores for your products.', icon: <Layout className="text-secondary" size={32} /> },
            { title: 'API Development', desc: 'Building clean, documented, and secure RESTful APIs for your services.', icon: <Code2 className="text-neon-purple" size={32} /> },
          ].map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-[2.5rem] border border-outline hover:border-primary/40 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                {service.icon}
              </div>
              <div className="mb-6 p-4 w-16 h-16 rounded-2xl bg-surface border border-outline group-hover:border-primary/30 transition-colors flex items-center justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-black text-on-background mb-4">{service.title}</h3>
              <p className="text-sm text-on-surface-variant font-medium leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Statistics / Numbers ── */}
      <section className="py-20 bg-primary/5 border-y border-primary/10 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
            {[
              { val: '12+', label: 'Projects Completed' },
              { val: '150k+', label: 'Lines of Code' },
              { val: '99%', label: 'Client Happiness' },
              { val: '24/7', label: 'Availability' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <span className="block text-4xl sm:text-5xl font-black text-primary mb-2 neon-text-blue">{stat.val}</span>
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Section ── */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32" id="about">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="w-full max-w-md mx-auto aspect-[4/5] rounded-[3rem] overflow-hidden glass-panel p-3 border border-outline shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-700 group">
              <img
                src={profilePhoto}
                alt="Mahesh Profile"
                className="w-full h-full object-cover rounded-[2.2rem] group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            {/* Experience badge */}
            <div className="absolute -bottom-8 -right-4 glass-panel p-6 rounded-[2rem] border border-primary/20 shadow-2xl text-center">
              <p className="text-4xl font-black text-primary leading-none mb-1">1+</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Years Exp</p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-black text-on-background mb-8 tracking-tighter leading-none">
              Transforming <br /> complexity into <br />
              <span className="text-primary italic">simplicity</span>.
            </h2>
            <p className="text-lg text-on-surface-variant mb-10 leading-relaxed font-medium">
              As a Computer Science Engineer, I don't just write code. I build
              systems that are as scalable as they are beautiful. My approach
              combines mathematical logic with creative user-centric design.
            </p>

            <div className="space-y-6">
              {[
                { label: 'Pixel Perfect UI', desc: 'Meticulous attention to every layout detail.' },
                { label: 'High Performance', desc: 'Optimized for speed and SEO rankings.' },
                { label: 'SaaS Architecture', desc: 'Secure and scalable full-stack foundations.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
                    <ArrowRight size={14} />
                  </div>
                  <div>
                    <h4 className="font-bold text-on-background">{item.label}</h4>
                    <p className="text-sm text-on-surface-variant font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials Section ── */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-4xl font-black text-on-background mb-4">What Clients <span className="neon-text-blue">Say</span></h2>
          <p className="text-on-surface-variant max-w-lg mx-auto text-sm sm:text-base">Trusted by founders and product managers worldwide.</p>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-8 no-scrollbar snap-x">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[300px] sm:min-w-[350px] glass-panel p-8 rounded-3xl border border-outline snap-center hover:neon-border-blue transition-all duration-500"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black border border-primary/20">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-on-background">{t.name}</h4>
                  <p className="text-xs text-on-surface-variant uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
              <p className="text-on-surface-variant italic leading-relaxed">"{t.content}"</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Newsletter Section ── */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="glass-panel rounded-[3rem] p-8 md:p-16 border border-outline relative overflow-hidden bg-gradient-to-br from-surface to-background shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -z-10" />
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-black text-on-background mb-6 tracking-tighter">
              Stay in the <span className="text-primary italic">loop</span>.
            </h2>
            <p className="text-on-surface-variant mb-10 text-lg font-medium">
              Subscribe to my newsletter for the latest tech insights,
              project updates, and SaaS engineering tips.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Thanks for subscribing!'); }} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address..."
                required
                className="flex-1 bg-surface border-2 border-outline/50 rounded-2xl px-6 py-4 focus:border-primary focus:bg-surface/90 outline-none transition-all text-on-background font-bold placeholder:text-on-surface-variant/60 shadow-inner"
              />
              <button type="submit" className="btn-primary !py-4 !px-12 whitespace-nowrap hover:scale-105 hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] transition-all">
                JOIN NOW ⚡
              </button>
            </form>
            <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-on-surface-variant font-bold opacity-70 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              No spam. High-value insights only. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20" id="contact">
        <div className="glass-panel rounded-[2rem] p-6 sm:p-12 md:p-16 border border-outline relative overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row gap-12 md:gap-20">
            {/* Contact info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl sm:text-5xl font-black mb-6 tracking-tight">
                Let's build something <span className="neon-text-blue">amazing</span>.
              </h2>
              <p className="text-on-surface-variant mb-6 text-sm sm:text-base leading-relaxed">
                Available for freelance projects and full-time opportunities.
                Let's connect and discuss your vision.
              </p>
              <div className="flex flex-col gap-5 items-center md:items-start mt-8">
                <a
                  href="mailto:kmaheshachary34@gmail.com"
                  className="flex items-center gap-4 text-on-background hover:text-primary transition-all p-3 rounded-2xl bg-surface/50 border border-outline w-full sm:w-auto"
                >
                  <Mail size={20} className="text-primary neon-text-blue" />
                  <span className="font-bold text-sm">kmaheshachary34@gmail.com</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/k-mahesh-kumar-achary-4a438b286/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 text-on-background hover:text-primary transition-all p-3 rounded-2xl bg-surface/50 border border-outline w-full sm:w-auto"
                >
                  <Globe size={20} className="text-primary neon-text-blue" />
                  <span className="font-bold text-sm">LinkedIn Profile</span>
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
