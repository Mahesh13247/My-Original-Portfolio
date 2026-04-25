import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import ProjectCard from '../components/ProjectCard';
import { LayoutDashboard, Download, History, CreditCard, CheckCircle2 } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('library');
  const [unlockedProjects, setUnlockedProjects] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: projectsData } = await api.get('/projects');
        const filtered = user.role === 'admin'
          ? projectsData
          : projectsData.filter(p => user.unlockedProjects?.includes(p.id));
        setUnlockedProjects(filtered);

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

  const tabs = [
    { id: 'library', label: 'My Library', icon: LayoutDashboard },
    { id: 'history', label: 'History', icon: History },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-background w-full">
      <div className="flex min-h-[calc(100dvh-80px)] max-w-[1400px] mx-auto">

        {/* ── Desktop Sidebar ── */}
        <aside className="w-64 border-r border-slate-800 h-full hidden md:flex flex-col bg-slate-950 flex-shrink-0">
          {/* User info */}
          <div className="p-6 border-b border-slate-800">
            <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-3 flex items-center justify-center text-primary text-2xl font-black neon-text-blue">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <h2 className="font-black text-slate-50 text-center truncate">{user?.name}</h2>
            <p className="text-xs text-slate-500 text-center truncate mt-1">{user?.email}</p>
          </div>

          {/* Nav links */}
          <nav className="flex-1 p-4 space-y-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold ${
                  activeTab === id
                    ? 'bg-primary/10 text-primary shadow-[0_0_12px_rgba(57,255,20,0.15)] border border-primary/20'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-50'
                }`}
              >
                <Icon size={18} /> {label}
              </button>
            ))}
          </nav>

          {/* Bottom hint */}
          <div className="p-4 border-t border-slate-800">
            <p className="text-[10px] text-slate-600 text-center uppercase tracking-widest">
              Premium Member
            </p>
          </div>
        </aside>

        {/* ── Content ── */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Mobile Tab Bar */}
          <div className="md:hidden sticky top-0 z-20 flex border-b border-slate-800 bg-slate-950 shrink-0">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-all ${
                  activeTab === id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 p-4 md:p-8 overflow-y-auto">

            {/* ── Library Tab ── */}
            {activeTab === 'library' && (
              <div className="space-y-8">
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <h1 className="text-2xl md:text-3xl font-black text-on-background">My Library</h1>
                  <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-primary/20 neon-text-blue">
                    {unlockedProjects.length} Unlocked
                  </span>
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2].map(i => <div key={i} className="glass-panel h-[300px] animate-pulse rounded-2xl" />)}
                  </div>
                ) : unlockedProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {unlockedProjects.map(project => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                ) : (
                  <div className="glass-panel rounded-3xl p-12 md:p-16 text-center space-y-6 border border-slate-800">
                    <div className="w-20 h-20 bg-primary/5 border border-primary/20 rounded-full mx-auto flex items-center justify-center">
                      <Download size={36} className="text-primary neon-text-blue" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-on-background mb-2">Your library is empty</h3>
                      <p className="text-on-surface-variant max-w-sm mx-auto text-sm">
                        Browse premium projects and unlock high-quality source code and resources.
                      </p>
                    </div>
                    <button
                      onClick={() => navigate('/projects')}
                      className="btn-primary mx-auto"
                    >
                      Browse Projects ⚡
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ── History Tab ── */}
            {activeTab === 'history' && (
              <div className="space-y-8">
                <h1 className="text-2xl md:text-3xl font-black text-on-background">Purchase History</h1>

                <div className="glass-panel overflow-hidden rounded-2xl border border-slate-800">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-900">
                        <tr>
                          {['Project', 'Date', 'Amount', 'Status'].map(h => (
                            <th key={h} className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-500">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {payments.filter(p => p.status === 'completed').length > 0 ? (
                          payments
                            .filter(p => p.status === 'completed')
                            .map(payment => (
                              <tr key={payment.id} className="hover:bg-slate-900/50 transition-colors">
                                <td className="px-6 py-4">
                                  <div className="font-bold text-slate-50">{payment.Project?.title || 'Unknown Project'}</div>
                                  <div className="text-xs text-slate-600 font-mono mt-0.5">{payment.paymentId || payment.orderId}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-400 whitespace-nowrap">
                                  {new Date(payment.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-sm font-black text-primary neon-text-blue whitespace-nowrap">
                                  ₹{payment.amount}
                                </td>
                                <td className="px-6 py-4">
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-primary/10 text-primary border border-primary/20 neon-text-blue whitespace-nowrap">
                                    <CheckCircle2 size={12} /> SUCCESS
                                  </span>
                                </td>
                              </tr>
                            ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="px-6 py-16 text-center text-slate-600 italic">
                              No successful transactions yet
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {payments.filter(p => p.status === 'pending').length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Incomplete Attempts</h3>
                    <div className="space-y-2 opacity-50">
                      {payments.filter(p => p.status === 'pending').slice(0, 3).map(payment => (
                        <div key={payment.id} className="flex justify-between items-center p-4 rounded-xl border border-dashed border-slate-800 bg-slate-950">
                          <span className="text-sm text-slate-400">{payment.Project?.title || 'Unknown'}</span>
                          <span className="text-xs text-slate-600">{new Date(payment.createdAt).toLocaleDateString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Billing Tab ── */}
            {activeTab === 'billing' && (
              <div className="space-y-8">
                <h1 className="text-2xl md:text-3xl font-black text-on-background">Billing</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Neon Green Investment Card */}
                  <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-primary/20 via-slate-950 to-secondary/20 border border-primary/30 shadow-[0_0_30px_rgba(57,255,20,0.1)]">
                    <div className="relative z-10 space-y-6">
                      <div className="flex justify-between items-start">
                        <div className="bg-primary/10 border border-primary/20 p-2.5 rounded-xl">
                          <CreditCard className="text-primary neon-text-blue" size={22} />
                        </div>
                        <span className="text-xs font-black text-primary/60 tracking-widest uppercase neon-text-blue">Premium Card</span>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-bold">Total Lifetime Investment</p>
                        <h2 className="text-5xl font-black text-primary neon-text-blue tracking-tighter">₹{totalSpent}</h2>
                      </div>
                      <div className="flex justify-between items-end pt-2 border-t border-primary/10">
                        <div>
                          <p className="text-[10px] text-slate-600 uppercase font-black tracking-widest mb-0.5">Card Holder</p>
                          <p className="text-sm font-black text-slate-200 uppercase tracking-wider">{user?.name}</p>
                        </div>
                        <div className="flex -space-x-2">
                          <div className="w-8 h-8 rounded-full bg-primary/40 border-2 border-slate-950 shadow-[0_0_8px_rgba(57,255,20,0.5)]" />
                          <div className="w-8 h-8 rounded-full bg-secondary/40 border-2 border-slate-950 shadow-[0_0_8px_rgba(191,0,255,0.5)]" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-secondary/5 rounded-full blur-3xl" />
                  </div>

                  {/* Stats Card */}
                  <div className="glass-panel p-8 rounded-3xl border border-slate-800 flex flex-col justify-between">
                    <div className="space-y-5">
                      <h3 className="font-black text-slate-50">Membership Overview</h3>
                      <div className="space-y-4">
                        {[
                          { label: 'Account Type', value: 'Premium', className: 'text-primary font-black neon-text-blue' },
                          { label: 'Join Date', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Active Member', className: 'text-slate-50 font-bold' },
                          { label: 'Total Unlocks', value: `${unlockedProjects.length} Projects`, className: 'text-slate-50 font-bold' },
                        ].map(({ label, value, className }) => (
                          <div key={label} className="flex justify-between items-center text-sm border-b border-slate-800 pb-3 last:border-0 last:pb-0">
                            <span className="text-slate-500 font-medium">{label}</span>
                            <span className={className}>{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={downloadInvoices}
                      className="btn-primary w-full mt-6 text-center"
                    >
                      Download All Invoices ↓
                    </button>
                  </div>
                </div>

                {/* Security assurance */}
                <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center">
                      <CheckCircle2 size={22} className="text-primary neon-text-blue" />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-50 text-lg">Billing Confidence</h3>
                      <p className="text-sm text-slate-500">Your security is our priority.</p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    All transactions are processed through Razorpay's encrypted gateways. If you notice any
                    discrepancy or a project fails to unlock after payment, contact our support immediately.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                      <p className="text-xs font-black text-slate-500 uppercase mb-1 tracking-widest">Email Support</p>
                      <p className="text-sm text-slate-300">kmaheshachary34@gmail.com</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                      <p className="text-xs font-black text-slate-500 uppercase mb-1 tracking-widest">Response Time</p>
                      <p className="text-sm text-slate-300">Typically under 2 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
