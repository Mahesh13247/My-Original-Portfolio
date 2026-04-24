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

  const downloadInvoices = () => {
    const completedPayments = payments.filter(p => p.status === 'completed');
    if (completedPayments.length === 0) {
      alert('No successful invoices found to download.');
      return;
    }

    const headers = ['Project Name', 'Date', 'Amount (INR)', 'Order ID', 'Payment ID'];
    const rows = completedPayments.map(p => [
      `"${p.Project?.title || 'Unknown'}"`,
      new Date(p.createdAt).toLocaleDateString(),
      p.amount,
      p.orderId,
      p.paymentId || 'N/A'
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `invoices_${user.name.replace(/\s+/g, '_')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
                  {payments.filter(p => p.status === 'completed').length > 0 ? (
                    payments
                      .filter(p => p.status === 'completed')
                      .map(payment => (
                      <tr key={payment.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-50">{payment.Project?.title || 'Unknown Project'}</div>
                          <div className="text-xs text-slate-500 font-mono">{payment.paymentId || payment.orderId}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-400">
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-50">
                          ₹{payment.amount}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-400">
                            <CheckCircle2 size={12} />
                            SUCCESSFUL
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-slate-500 italic">
                        No successful transactions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {payments.filter(p => p.status === 'pending').length > 0 && (
              <div className="space-y-4 pt-8">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Incomplete Attempts</h3>
                <div className="grid grid-cols-1 gap-3 opacity-60">
                  {payments.filter(p => p.status === 'pending').slice(0, 3).map(payment => (
                    <div key={payment.id} className="flex justify-between items-center p-4 rounded-xl border border-dashed border-slate-700">
                      <div className="text-sm text-slate-300">{payment.Project?.title}</div>
                      <div className="text-xs text-slate-500">{new Date(payment.createdAt).toLocaleDateString()}</div>
                    </div>
                  ))}
                  {payments.filter(p => p.status === 'pending').length > 3 && (
                    <p className="text-xs text-slate-600 text-center italic">... and {payments.filter(p => p.status === 'pending').length - 3} other attempts</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Billing & Subscription</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Wallet Card */}
              <div className="relative overflow-hidden group p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-2xl shadow-blue-500/20">
                <div className="relative z-10 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                      <CreditCard className="text-white" size={24} />
                    </div>
                    <span className="text-xs font-bold text-white/60 tracking-widest uppercase">Premium Card</span>
                  </div>
                  <div>
                    <p className="text-xs text-white/60 uppercase tracking-wider mb-1">Total Lifetime Investment</p>
                    <h2 className="text-5xl font-black text-white tracking-tighter">₹{totalSpent}</h2>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[10px] text-white/40 uppercase font-bold">Card Holder</p>
                      <p className="text-sm font-bold text-white uppercase tracking-widest">{user.name}</p>
                    </div>
                    <div className="flex -space-x-2">
                       <div className="w-8 h-8 rounded-full bg-red-500/80 border border-white/20"></div>
                       <div className="w-8 h-8 rounded-full bg-yellow-500/80 border border-white/20"></div>
                    </div>
                  </div>
                </div>
                {/* Decorative circles */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
              </div>

              {/* Stats Card */}
              <div className="glass-panel p-8 rounded-3xl border border-slate-700/50 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-50">Membership Overview</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Account Type</span>
                      <span className="text-blue-400 font-bold uppercase tracking-tighter">Premium</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Join Date</span>
                      <span className="text-slate-50 font-medium">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Active Member'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Total Unlocks</span>
                      <span className="text-slate-50 font-medium">{unlockedProjects.length} Projects</span>
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-700/50 mt-6">
                   <button 
                    onClick={downloadInvoices}
                    className="w-full py-3 bg-slate-50 text-slate-950 font-bold rounded-xl text-sm hover:bg-slate-200 transition-all"
                   >
                      Download All Invoices
                   </button>
                </div>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-slate-700/50 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-50 text-lg">Billing Confidence</h3>
                  <p className="text-sm text-slate-400 italic">Your security is our priority.</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                All transactions are processed through encrypted gateways. If you notice any discrepancy 
                in your billing or if a project fails to unlock after payment, our dedicated 
                billing team is available 24/7.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                   <p className="text-xs font-bold text-slate-500 uppercase mb-1">Email Support</p>
                   <p className="text-sm text-slate-300">support@kmahesh.com</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                   <p className="text-xs font-bold text-slate-500 uppercase mb-1">Response Time</p>
                   <p className="text-sm text-slate-300">Typically under 2 hours</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
