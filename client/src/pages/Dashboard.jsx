import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import ProjectCard from '../components/ProjectCard';
import { LayoutDashboard, Download, History, CreditCard, CheckCircle2, User as UserIcon, Save, Copy, Bell, ShieldAlert, Gift, Check, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('library');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    const load = toast.loading('Uploading photo...');
    try {
      const { data } = await api.post('/upload/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProfileForm({ ...profileForm, avatar: data.url });
      // Update global user state immediately
      setUser(prev => ({ ...prev, avatar: data.url }));
      toast.success('Photo uploaded!', { id: load });
    } catch (err) {
      toast.error('Upload failed. Try a smaller image.', { id: load });
    }
  };
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
    { id: 'profile', label: 'Profile', icon: UserIcon },
  ];

  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
    password: ''
  });

  const [preferences, setPreferences] = useState({
    updates: true,
    marketing: false
  });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const load = toast.loading('Updating profile...');
    try {
      const { data } = await api.put('/auth/profile', profileForm);
      // Synchronize global state
      setUser(data);
      toast.success('Profile synchronized successfully!', { id: load });
    } catch (err) {
      toast.error('Sync failed. Please try again.', { id: load });
    }
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm("🚨 CRITICAL ACTION: Are you sure you want to permanently delete your account? This action cannot be undone and all purchased projects will be lost.");
    if (confirmed) {
      toast.error("Account deletion is a restricted action. Please contact support.");
    }
  };

  return (
    <div className="min-h-screen bg-background w-full">
      <div className="flex min-h-[calc(100dvh-80px)] max-w-[1400px] mx-auto">

        {/* ── Desktop Sidebar ── */}
        <aside className="w-64 border-r border-outline h-full hidden md:flex flex-col bg-surface flex-shrink-0">
          {/* User info */}
          <div className="p-6 border-b border-outline text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-3 flex items-center justify-center text-primary text-2xl font-black neon-text-blue overflow-hidden border border-outline/50 shadow-lg">
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                user?.name?.charAt(0)?.toUpperCase()
              )}
            </div>
            <h2 className="font-black text-on-background truncate">{user?.name}</h2>
            <p className="text-xs text-on-surface-variant truncate mt-1">{user?.email}</p>
          </div>

          {/* Nav links */}
          <nav className="flex-1 p-4 space-y-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold relative group ${
                  activeTab === id
                    ? 'bg-primary/10 text-primary shadow-[0_0_12px_rgba(57,255,20,0.15)] border border-primary/20'
                    : 'text-on-surface-variant hover:bg-surface-variant hover:text-on-background'
                }`}
              >
                <Icon size={18} className={`${activeTab === id ? 'neon-text-blue' : ''}`} /> 
                {label}
                {activeTab === id && (
                  <motion.div layoutId="sidebar-pill" className="absolute left-0 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_8px_var(--neon-glow)]" />
                )}
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
          <div className="md:hidden sticky top-0 z-20 flex border-b border-outline bg-surface shrink-0">
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
          <div className="flex-1 p-4 md:p-10 overflow-y-auto pb-20">

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
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl sm:text-4xl font-black mb-6 sm:mb-10 neon-text-blue">Account <span className="text-on-background">Settings</span></h2>
            <div className="glass-panel p-5 sm:p-10 rounded-3xl max-w-2xl border border-outline shadow-2xl">
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 text-center sm:text-left">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(57,255,20,0.1)]">
                    {profileForm.avatar ? (
                      <img src={profileForm.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl sm:text-6xl font-black text-primary drop-shadow-sm">{user?.name?.charAt(0)?.toUpperCase() || '?'}</span>
                    )}
                  </div>
                  <div className="flex-1 w-full space-y-2">
                    <h3 className="font-black text-xl text-on-background tracking-tight">Profile Picture</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">Customize your digital identity with an image URL.</p>
                    <div className="flex gap-2">
                      <input 
                        placeholder="Avatar URL (https://...)" 
                        value={profileForm.avatar}
                        onChange={e => setProfileForm({...profileForm, avatar: e.target.value})}
                        className="bg-surface border-2 border-outline rounded-xl px-4 py-3 outline-none flex-1 text-sm focus:border-primary transition-all shadow-inner"
                      />
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        className="hidden" 
                        accept="image/*"
                      />
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-background transition-all"
                        title="Upload from device"
                      >
                        <Upload size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Full Name</label>
                    <input 
                      value={profileForm.name}
                      onChange={e => setProfileForm({...profileForm, name: e.target.value})}
                      className="bg-surface border-2 border-outline rounded-xl px-4 py-3 outline-none w-full focus:border-primary transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Email Address</label>
                    <input 
                      type="email"
                      value={profileForm.email}
                      onChange={e => setProfileForm({...profileForm, email: e.target.value})}
                      className="bg-surface border-2 border-outline rounded-xl px-4 py-3 outline-none w-full focus:border-primary transition-all"
                    />
                  </div>
                  <div className="space-y-2 col-span-full">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">New Password</label>
                    <input 
                      type="password"
                      placeholder="Leave blank to keep current"
                      value={profileForm.password}
                      onChange={e => setProfileForm({...profileForm, password: e.target.value})}
                      className="bg-surface border-2 border-outline rounded-xl px-4 py-3 outline-none w-full focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn-primary w-full py-4 flex items-center justify-center gap-3 group/save mt-4"
                >
                  <Save size={20} className="group-hover/save:scale-125 transition-transform" />
                  <span className="tracking-widest font-black uppercase">Save Changes</span>
                </button>
              </form>
            </div>

            {/* ── Unique Features Grid ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-2xl">
              
              {/* Referral Section */}
              <div className="glass-panel p-6 rounded-3xl border border-outline hover:border-primary/30 transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Gift size={20} />
                  </div>
                  <h3 className="font-black text-on-background">Invite & Earn</h3>
                </div>
                <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                  Share your unique code and get 20% commission on every premium project unlocked.
                </p>
                <div className="flex gap-2">
                  <code className="flex-1 bg-surface border border-outline rounded-xl px-3 py-2 text-[10px] font-mono text-primary flex items-center">
                    PORTFOLIO-{user?.id?.substring(0,6).toUpperCase() || 'REFER'}
                  </code>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(`PORTFOLIO-${user?.id?.substring(0,6).toUpperCase()}`);
                      toast.success('Referral code copied!');
                    }}
                    className="p-2 rounded-xl bg-primary text-background hover:scale-110 transition-transform"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>

              {/* Notification Toggles */}
              <div className="glass-panel p-6 rounded-3xl border border-outline hover:border-primary/30 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Bell size={20} />
                  </div>
                  <h3 className="font-black text-on-background">Preferences</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-on-surface-variant">Project Updates</span>
                    <button 
                      onClick={() => setPreferences({...preferences, updates: !preferences.updates})}
                      className={`w-10 h-5 rounded-full relative transition-all duration-300 ${preferences.updates ? 'bg-primary/40' : 'bg-outline'}`}
                    >
                      <motion.div 
                        animate={{ x: preferences.updates ? 20 : 4 }}
                        className={`absolute top-1 w-3 h-3 rounded-full shadow-lg ${preferences.updates ? 'bg-primary shadow-[0_0_8px_var(--neon-glow)]' : 'bg-on-surface-variant'}`} 
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-on-surface-variant">Marketing Emails</span>
                    <button 
                      onClick={() => setPreferences({...preferences, marketing: !preferences.marketing})}
                      className={`w-10 h-5 rounded-full relative transition-all duration-300 ${preferences.marketing ? 'bg-primary/40' : 'bg-outline'}`}
                    >
                      <motion.div 
                        animate={{ x: preferences.marketing ? 20 : 4 }}
                        className={`absolute top-1 w-3 h-3 rounded-full shadow-lg ${preferences.marketing ? 'bg-primary shadow-[0_0_8px_var(--neon-glow)]' : 'bg-on-surface-variant'}`} 
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="glass-panel p-6 rounded-3xl border border-neon-red/20 hover:border-neon-red/40 transition-all col-span-full group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neon-red/10 flex items-center justify-center text-neon-red">
                      <ShieldAlert size={20} />
                    </div>
                    <div>
                      <h3 className="font-black text-on-background">Account Safety</h3>
                      <p className="text-[10px] text-on-surface-variant">Permanently delete your account and data.</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleDeleteAccount}
                    className="px-4 py-2 rounded-xl border border-neon-red/30 text-neon-red text-[10px] font-black uppercase tracking-widest hover:bg-neon-red hover:text-white transition-all"
                  >
                    Delete
                  </button>
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
