import { useState, useEffect } from 'react';
import api from '../services/api';
import ProjectCard from '../components/ProjectCard';
import SkeletonCard from '../components/SkeletonCard';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { Search, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Full Stack', 'Mobile', 'UI/UX', 'Other'];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/projects');
        setProjects(data);
      } catch (error) {
        toast.error('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleUnlock = async (project) => {
    if (!user) { toast.error('Please login to unlock projects'); return; }
    try {
      const { data: order } = await api.post('/payments/create-order', { projectId: project.id, amount: project.price });
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Portfolio Premium',
        description: `Unlock ${project.title}`,
        order_id: order.id,
        handler: async (response) => {
          try {
            await api.post('/payments/verify', response);
            toast.success('Project unlocked successfully!');
            window.location.reload();
          } catch {
            toast.error('Payment verification failed');
          }
        },
        prefill: { name: user.name, email: user.email },
        theme: { color: '#39FF14' },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      toast.error('Error initiating payment');
    }
  };

  const filteredProjects = projects.filter(p => {
    const matchesFilter = filter === 'All' || p.category === filter;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 md:py-16">

      {/* ── Page Header ── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full text-primary text-xs font-black uppercase tracking-widest mb-5">
          <Layers size={13} /> Project Gallery
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-on-background tracking-tight mb-4">
          Premium <span className="neon-text-blue">Solutions</span>
        </h1>
        <p className="text-on-surface-variant max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Explore high-performance web applications. Click any card to see full details before purchasing.
        </p>
      </motion.div>

      {/* ── Search + Filter Bar ── */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-4 mb-10">
        {/* Search */}
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-surface border border-outline text-on-background placeholder:text-on-surface-variant/40 rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:border-primary transition-all text-sm font-medium shadow-sm"
          />
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border transition-all duration-200 ${
                filter === cat
                  ? 'bg-primary text-background border-primary shadow-[0_0_15px_rgba(57,255,20,0.3)]'
                  : 'bg-surface border-outline text-on-surface-variant hover:border-primary/40 hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
          {/* Live count badge */}
          {!loading && (
            <span className="ml-2 px-3 py-1.5 rounded-full bg-surface-variant border border-outline text-[10px] font-black text-on-surface-variant uppercase tracking-widest">
              {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
            </span>
          )}
        </div>
      </motion.div>

      {/* ── Grid ── */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <ProjectCard project={project} onUnlock={handleUnlock} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* ── Empty State ── */}
      {!loading && filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          className="text-center py-24 glass-panel rounded-3xl border border-outline space-y-5 mt-4"
        >
          <div className="text-6xl">🔍</div>
          <div>
            <h3 className="text-2xl font-black text-on-background mb-2">No projects found</h3>
            <p className="text-on-surface-variant text-sm">Try a different keyword or category.</p>
          </div>
          <button onClick={() => { setSearch(''); setFilter('All'); }} className="btn-primary mx-auto">
            Clear Filters
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Projects;


