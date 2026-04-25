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
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 md:py-12">
      {/* Header */}
      <div className="flex flex-col gap-6 mb-10 md:mb-16">
        <div className="text-center md:text-left">
          <h1 className="text-3xl sm:text-5xl font-black text-on-background mb-3 tracking-tight">
            Premium <span className="neon-text-blue">Solutions</span>
          </h1>
          <p className="text-on-surface-variant max-w-xl mx-auto md:mx-0 text-sm sm:text-base leading-relaxed">
            Discover high-performance web applications and creative experiments.
          </p>
        </div>

        {/* Search & Filter - Responsive Grouping */}
        <div className="flex flex-col sm:flex-row gap-3 bg-surface/50 p-2 rounded-2xl border border-outline/50 backdrop-blur-sm">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
            <input
              type="text"
              placeholder="Search by title or tech..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-on-background placeholder:text-on-surface-variant/40 rounded-xl pl-12 pr-4 py-3 focus:bg-surface outline-none transition-all duration-300 w-full text-sm font-medium"
            />
          </div>
          <div className="h-px sm:h-auto sm:w-px bg-outline/50 mx-2 sm:my-2" />
          <div className="flex items-center px-2">
            <Filter className="text-primary mr-3 hidden sm:block" size={18} />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-surface/50 text-on-background font-bold text-sm outline-none cursor-pointer w-full sm:w-auto py-2 px-4 rounded-xl border border-outline/30 focus:border-primary/50 transition-all"
            >
              <option value="All">All Categories</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Full Stack">Full Stack</option>
              <option value="App">Mobile App</option>
            </select>
          </div>
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
