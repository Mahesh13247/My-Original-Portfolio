import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import ProjectCard from '../components/ProjectCard';
import { LayoutDashboard, Download, History, CreditCard } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [unlockedProjects, setUnlockedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnlocked = async () => {
      try {
        const { data } = await api.get('/projects');
        const filtered = user.role === 'admin' ? data : data.filter(p => user.unlockedProjects.includes(p.id));
        setUnlockedProjects(filtered);
      } catch (error) {
        console.error('Error fetching dashboard data');
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchUnlocked();
  }, [user]);

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-slate-900 w-full max-w-[1200px] mx-auto">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-700/50 h-full hidden md:block bg-slate-900 p-6 space-y-6 flex-shrink-0">
        <div className="text-center pb-6 border-b border-slate-700/50">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full mx-auto mb-4 flex items-center justify-center text-blue-400 text-2xl font-bold">
            {user?.name?.charAt(0)}
          </div>
          <h2 className="font-bold text-slate-50">{user?.name}</h2>
          <p className="text-xs text-slate-400 truncate">{user?.email}</p>
        </div>
        
        <nav className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-500/10 text-blue-400 text-sm font-medium transition-all">
            <LayoutDashboard size={18} /> My Library
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-slate-50 text-sm font-medium transition-all">
            <History size={18} /> Purchase History
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-slate-50 text-sm font-medium transition-all">
            <CreditCard size={18} /> Billing
          </button>
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto w-full">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">My Library</h1>
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-primary/20">
              {unlockedProjects.length} Projects Unlocked
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map(i => <div key={i} className="glass-panel h-[300px] animate-pulse rounded-2xl"></div>)}
            </div>
          ) : unlockedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {unlockedProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="glass-panel rounded-3xl p-16 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-900 rounded-full mx-auto flex items-center justify-center text-slate-600">
                <Download size={32} />
              </div>
              <h3 className="text-xl font-bold">Your library is empty</h3>
              <p className="text-on-surface-variant max-w-sm mx-auto">
                Start exploring premium projects and unlock high-quality source code and resources.
              </p>
              <button className="btn-primary">Browse Projects</button>
            </div>
          )}
      </div>
    </div>
  );
};

export default Dashboard;
