import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import ProjectCard from '../components/ProjectCard';
import { LayoutDashboard, Download, History, CreditCard, ExternalLink, CheckCircle2, Clock } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('library');
  const [unlockedProjects, setUnlockedProjects] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch projects
        const { data: projectsData } = await api.get('/projects');
        const filtered = user.role === 'admin' ? projectsData : projectsData.filter(p => user.unlockedProjects.includes(p.id));
        setUnlockedProjects(filtered);

        // Fetch payments
        const { data: paymentsData } = await api.get('/payments/user-history');
        setPayments(paymentsData);
      } catch (error) {
        console.error('Error fetching dashboard data');
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchData();
  }, [user]);

  const totalSpent = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

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
          <button 
            onClick={() => setActiveTab('library')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
              activeTab === 'library' ? 'bg-blue-500/10 text-blue-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-50'
            }`}
          >
            <LayoutDashboard size={18} /> My Library
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
              activeTab === 'history' ? 'bg-blue-500/10 text-blue-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-50'
            }`}
          >
            <History size={18} /> Purchase History
          </button>
          <button 
            onClick={() => setActiveTab('billing')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
              activeTab === 'billing' ? 'bg-blue-500/10 text-blue-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-50'
            }`}
          >
            <CreditCard size={18} /> Billing
          </button>
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto w-full">
        {activeTab === 'library' && (
          <div className="space-y-8">
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
        )}

        {activeTab === 'history' && (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Purchase History</h1>
            
            <div className="glass-panel overflow-hidden rounded-2xl border border-slate-700/50">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-800/50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Project</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Date</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Amount</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {payments.length > 0 ? (
                    payments.map(payment => (
                      <tr key={payment.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-50">{payment.Project?.title || 'Unknown Project'}</div>
                          <div className="text-xs text-slate-500 font-mono">{payment.orderId}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-400">
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-50">
                          ₹{payment.amount}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            payment.status === 'completed' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                          }`}>
                            {payment.status === 'completed' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                            {payment.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-slate-500 italic">
                        No transactions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Billing Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-panel p-6 rounded-2xl border border-slate-700/50 space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Invested</p>
                <h2 className="text-4xl font-bold text-slate-50">₹{totalSpent}</h2>
                <p className="text-xs text-green-400 flex items-center gap-1 italic">
                  <CheckCircle2 size={12} /> Lifetime access secured
                </p>
              </div>
              
              <div className="glass-panel p-6 rounded-2xl border border-slate-700/50 space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Plan Status</p>
                <h2 className="text-2xl font-bold text-slate-50">Premium Member</h2>
                <p className="text-xs text-slate-400 italic">Active since {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-slate-700/50 space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Next Steps</p>
                <button className="w-full btn-primary text-xs py-2 mt-2">Manage Account</button>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-slate-700/50 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400">
                  <CreditCard size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-50 text-lg">Billing Support</h3>
                  <p className="text-sm text-slate-400 italic">Need help with an invoice or refund?</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                If you have any issues with your premium project purchases, please contact our support team. 
                All premium projects come with lifetime updates and full source code access as per our service agreement.
              </p>
              <div className="flex gap-4">
                <button className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-50 rounded-xl text-sm font-bold transition-all border border-slate-700">
                  Email Support
                </button>
                <button className="flex items-center gap-2 px-6 py-2 text-blue-400 hover:text-blue-300 text-sm font-bold transition-all underline decoration-blue-500/30 underline-offset-4">
                  Terms of Service <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
