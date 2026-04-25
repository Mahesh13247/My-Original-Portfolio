import { useState, useEffect } from 'react';
import api from '../services/api';
import ProjectCard from '../components/ProjectCard';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { Search, Filter } from 'lucide-react';

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
    if (!user) {
      toast.error('Please login to unlock projects');
      return;
    }

    try {
      const { data: order } = await api.post('/payments/create-order', {
        projectId: project.id,
        amount: project.price
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Portfolio Premium",
        description: `Unlock ${project.title}`,
        order_id: order.id,
        handler: async (response) => {
          try {
            await api.post('/payments/verify', response);
            toast.success('Project unlocked successfully!');
            window.location.reload();
          } catch (err) {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#39FF14",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error('Error initiating payment');
    }
  };

  const filteredProjects = projects.filter(p => {
    const matchesFilter = filter === 'All' || p.category === filter;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-12 gap-5">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-on-background mb-1">
            Projects <span className="neon-text-blue">⚡</span>
          </h1>
          <p className="text-on-surface-variant text-sm">Explore my recent work and premium solutions.</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60" size={16} />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-surface border-2 border-outline text-on-background placeholder:text-on-surface-variant/40 rounded-xl pl-9 pr-4 py-2.5 focus:border-primary outline-none transition-all duration-300 focus:shadow-[0_0_10px_rgba(57,255,20,0.15)] w-full sm:w-56 text-sm"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-surface border-2 border-outline text-on-surface-variant rounded-xl px-4 py-2.5 focus:border-primary outline-none transition-all duration-300 text-sm cursor-pointer w-full sm:w-auto"
          >
            <option value="All">All Categories</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Full Stack">Full Stack</option>
            <option value="App">App</option>
          </select>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-surface border border-outline h-[420px] rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} onUnlock={handleUnlock} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredProjects.length === 0 && (
        <div className="text-center py-24 glass-panel rounded-3xl border border-outline space-y-4">
          <div className="text-5xl">🔍</div>
          <h3 className="text-xl font-black text-on-background">No projects found</h3>
          <p className="text-on-surface-variant text-sm">Try adjusting your search or filter.</p>
          <button
            onClick={() => { setSearch(''); setFilter('All'); }}
            className="btn-primary mx-auto"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Projects;
