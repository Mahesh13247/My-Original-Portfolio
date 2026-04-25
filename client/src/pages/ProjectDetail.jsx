import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  ArrowLeft, Lock, Unlock, Download, ExternalLink, CheckCircle2,
  Eye, Code2, ChevronLeft, ChevronRight, Play, X, Tag, Layers,
  Star, Zap, Shield, Package
} from 'lucide-react';
import BackButton from '../components/BackButton';

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;

const ProjectDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [paying, setPaying] = useState(false);

  const isUnlocked = user?.role === 'admin' || user?.unlockedProjects?.includes(id) || !project?.isPremium;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await api.get(`/projects/${id}`);
        setProject(data);
      } catch {
        toast.error('Project not found');
        navigate('/projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const allMedia = project ? [project.image, ...(project.screenshots || [])].filter(Boolean) : [];

  const handlePay = async () => {
    if (!user) { navigate('/login'); return; }
    setPaying(true);
    try {
      const { data: order } = await api.post('/payments/create-order', { projectId: project.id, couponCode });
      const options = {
        key: RAZORPAY_KEY,
        amount: order.amount,
        currency: 'INR',
        name: 'Mahesh Portfolio',
        description: project.title,
        order_id: order.id,
        handler: async (response) => {
          try {
            await api.post('/payments/verify', response);
            toast.success('🎉 Project Unlocked!');
            window.location.reload();
          } catch {
            toast.error('Verification failed');
          }
        },
        theme: { color: '#39FF14' },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Payment failed');
    } finally {
      setPaying(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!project) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all" onClick={() => setLightboxOpen(false)}>
              <X size={20} />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => (i - 1 + allMedia.length) % allMedia.length); }}
            >
              <ChevronLeft size={24} />
            </button>
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              src={allMedia[lightboxIndex]} alt=""
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
              onClick={e => e.stopPropagation()}
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => (i + 1) % allMedia.length); }}
            >
              <ChevronRight size={24} />
            </button>
            <div className="absolute bottom-6 flex items-center gap-2">
              {allMedia.map((_, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setLightboxIndex(i); }}
                  className={`w-2 h-2 rounded-full transition-all ${i === lightboxIndex ? 'bg-white scale-125' : 'bg-white/30'}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero Banner ── */}
      <div className="relative w-full bg-surface border-b border-outline overflow-hidden">
        {/* Blurred background */}
        <div className="absolute inset-0">
          <img src={project.image} alt="" className="w-full h-full object-cover blur-2xl scale-110 opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/60" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 py-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <BackButton to="/projects" text="Projects" className="h-10 px-3" />
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60 mb-1">Projects / Detail</p>
              <h1 className="text-xl sm:text-2xl font-black text-on-background leading-tight line-clamp-1">{project.title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
              project.isPremium ? 'bg-primary/10 text-primary border-primary/30' : 'bg-green-400/10 text-green-400 border-green-400/30'
            }`}>
              {project.isPremium ? '⭐ Premium' : '✅ Free'}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* ── LEFT COLUMN (Media + Details) ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="relative rounded-3xl overflow-hidden aspect-video shadow-2xl border border-outline group cursor-pointer"
              onClick={() => { setLightboxIndex(activeImage); setLightboxOpen(true); }}
            >
              <img
                src={allMedia[activeImage] || project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs flex items-center gap-2">
                <Eye size={12} /> Click to expand
              </div>
              {project.isPremium && !isUnlocked && (
                <div className="absolute inset-0 backdrop-blur-[1px] bg-black/20 flex items-end justify-center pb-8">
                  <div className="flex items-center gap-2 bg-black/80 border border-primary/30 text-primary px-6 py-3 rounded-2xl text-sm font-bold">
                    <Lock size={16} /> Unlock to see full details
                  </div>
                </div>
              )}
            </motion.div>

            {/* Thumbnail Strip */}
            {allMedia.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {allMedia.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === i ? 'border-primary shadow-[0_0_15px_rgba(57,255,20,0.4)]' : 'border-outline/50 hover:border-outline'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Video Player */}
            {project.videoUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="glass-panel p-6 rounded-3xl border border-outline"
              >
                <h3 className="text-lg font-black text-on-background mb-4 flex items-center gap-2">
                  <Play size={20} className="text-primary" /> Project Demo
                </h3>
                <video
                  src={project.videoUrl}
                  controls
                  className="w-full rounded-2xl border border-outline/50 shadow-lg max-h-[400px] bg-black"
                  poster={project.image}
                >
                  Your browser does not support video playback.
                </video>
              </motion.div>
            )}

            {/* Tabs: About / Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="glass-panel rounded-3xl border border-outline overflow-hidden"
            >
              <div className="flex border-b border-outline">
                {['about', 'features'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-sm font-black uppercase tracking-widest transition-all ${
                      activeTab === tab
                        ? 'text-primary border-b-2 border-primary bg-primary/5'
                        : 'text-on-surface-variant hover:text-on-background'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6 sm:p-8 min-h-[200px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'about' && (
                    <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="text-on-surface-variant leading-relaxed whitespace-pre-wrap">
                        {project.detailedDescription || project.description}
                      </p>
                    </motion.div>
                  )}
                  {activeTab === 'features' && (
                    <motion.div key="features" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {(project.features || []).length > 0 ? (
                        <ul className="space-y-3">
                          {(project.features || []).map((f, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="flex items-start gap-3"
                            >
                              <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                                <CheckCircle2 size={12} className="text-primary" />
                              </div>
                              <span className="text-on-surface-variant text-sm leading-relaxed">{f}</span>
                            </motion.li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-on-surface-variant italic text-sm">No features listed yet.</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN (Sticky Purchase Panel) ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">

              {/* Project Info Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="glass-panel p-6 rounded-3xl border border-outline"
              >
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    project.isPremium
                      ? 'bg-primary/10 text-primary border-primary/20'
                      : 'bg-green-400/10 text-green-400 border-green-400/20'
                  }`}>
                    {project.isPremium ? '⭐ Premium' : '✅ Free'}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border bg-surface-variant text-on-surface-variant border-outline">
                    {project.category}
                  </span>
                </div>

                <h1 className="text-2xl font-black text-on-background mb-3 leading-tight">
                  {project.title}
                </h1>

                <p className="text-sm text-on-surface-variant leading-relaxed mb-5 line-clamp-3">
                  {project.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-6 py-4 border-t border-b border-outline/50 mb-5">
                  <div className="text-center">
                    <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest opacity-60">Views</p>
                    <p className="font-black text-on-background">{project.views}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest opacity-60">Purchases</p>
                    <p className="font-black text-on-background">{project.unlocks}</p>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60 mb-2">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {(project.techStack || []).map(tech => (
                      <span key={tech} className="bg-primary/5 text-primary text-[10px] font-black px-2 py-1 rounded-lg border border-primary/10 uppercase tracking-widest">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Purchase / Action Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                className="glass-panel p-6 rounded-3xl border border-outline"
              >
                {isUnlocked ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-green-400/10 border border-green-400/20 rounded-2xl mb-4">
                      <CheckCircle2 size={18} className="text-green-400 flex-shrink-0" />
                      <p className="text-green-400 text-sm font-bold">You have access to this project!</p>
                    </div>
                    {project.downloadUrl && user?.role !== 'admin' && (
                      <a
                        href={project.downloadUrl}
                        className="btn-primary w-full flex items-center justify-center gap-2 py-4"
                      >
                        <Download size={18} /> Download Source Code
                      </a>
                    )}
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank" rel="noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-outline text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all text-sm font-bold"
                      >
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank" rel="noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-outline text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all text-sm font-bold"
                      >
                        <Code2 size={16} /> View on GitHub
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center mb-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60 mb-2">One-time price</p>
                      <div className="relative inline-block">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                        <p className="relative text-5xl font-black text-primary" style={{ textShadow: '0 0 30px rgba(57,255,20,0.5)' }}>₹{project.price}</p>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-2 flex items-center justify-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                        Lifetime access · Source included
                      </p>
                    </div>

                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank" rel="noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-outline text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all text-sm font-bold"
                      >
                        <ExternalLink size={16} /> Try Live Demo First
                      </a>
                    )}

                    {/* Coupon Input */}
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                        <input
                          placeholder="Coupon code"
                          value={couponCode}
                          onChange={e => setCouponCode(e.target.value.toUpperCase())}
                          className="w-full pl-9 pr-4 py-3 bg-surface-variant/50 border border-outline rounded-xl text-sm outline-none focus:border-primary transition-all text-on-background placeholder:text-on-surface-variant/50 uppercase font-mono tracking-widest"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handlePay}
                      disabled={paying}
                      className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base font-black disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {paying ? (
                        <span className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Unlock size={18} /> Unlock for ₹{project.price}
                        </>
                      )}
                    </button>

                    {/* Trust Badges */}
                    <div className="pt-3 grid grid-cols-2 gap-3 border-t border-outline/50">
                      {[
                        { icon: <Shield size={14} />, text: 'Secure Payment' },
                        { icon: <Zap size={14} />, text: 'Instant Access' },
                        { icon: <Package size={14} />, text: 'Source Code' },
                        { icon: <Star size={14} />, text: 'Lifetime License' },
                      ].map((b, i) => (
                        <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-on-surface-variant">
                          <span className="text-primary">{b.icon}</span>
                          {b.text}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
