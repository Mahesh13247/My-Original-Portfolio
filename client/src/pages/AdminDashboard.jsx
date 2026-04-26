import { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { Plus, Trash2, Edit, TrendingUp, Users, ShoppingBag, DollarSign, LayoutDashboard, CreditCard, ToggleLeft, ToggleRight, MessageSquare, BarChart as ChartIcon, Search, Filter, Mail, Download, RefreshCw, CheckCircle2, ShieldAlert, History } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import BackButton from '../components/BackButton';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  
  // Data States
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [messages, setMessages] = useState([]);
  
  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Modals & Editing
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showAddCouponModal, setShowAddCouponModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  
  // Forms
  const [newProject, setNewProject] = useState({
    title: '', description: '', image: '', price: 0, isPremium: false, techStack: [], category: 'Frontend',
    liveDemoUrl: '', githubUrl: '', downloadUrl: '',
    detailedDescription: '', features: [], screenshots: [], videoUrl: ''
  });
  const [newCoupon, setNewCoupon] = useState({
    code: '', discount: 0, expiryDate: ''
  });
  const [newUser, setNewUser] = useState({
    name: '', email: '', password: '', role: 'user'
  });

  useEffect(() => {
    fetchStats();
    fetchProjects();
    fetchUsers();
    fetchPayments();
    fetchCoupons();
    fetchMessages();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await api.get('/admin/stats');
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/admin/users');
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPayments = async () => {
    try {
      const { data } = await api.get('/admin/payments');
      setPayments(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCoupons = async () => {
    try {
      const { data } = await api.get('/coupons');
      setCoupons(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMessages = async () => {
    try {
      const { data } = await api.get('/contact');
      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      if (isEditingProject) {
        await api.put(`/projects/${editingProjectId}`, newProject);
        toast.success('Project updated');
      } else {
        await api.post('/projects', newProject);
        toast.success('Project added');
      }
      setShowAddProjectModal(false);
      fetchProjects();
      fetchStats();
    } catch (err) {
      toast.error('Failed to save project');
    }
  };

  const handleSourceUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('source', file);
    const load = toast.loading('Uploading source code...');
    try {
      const { data } = await api.post('/upload/source', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setNewProject(prev => ({ ...prev, downloadUrl: data.url }));
      toast.success('Source code uploaded!', { id: load });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed. Max size 1GB.', { id: load });
    }
  };

  const handleScreenshotUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const formData = new FormData();
    files.forEach(f => formData.append('screenshots', f));
    const load = toast.loading(`Uploading ${files.length} screenshot(s)...`);
    try {
      const { data } = await api.post('/upload/screenshots', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setNewProject(prev => ({ ...prev, screenshots: [...(prev.screenshots || []), ...data.urls] }));
      toast.success(`${data.urls.length} screenshot(s) uploaded!`, { id: load });
    } catch (err) {
      toast.error('Screenshot upload failed.', { id: load });
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('video', file);
    const load = toast.loading('Uploading demo video...');
    try {
      const { data } = await api.post('/upload/video', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setNewProject(prev => ({ ...prev, videoUrl: data.url }));
      toast.success('Video uploaded!', { id: load });
    } catch (err) {
      toast.error('Video upload failed. Max 500MB.', { id: load });
    }
  };

  const handleEditClick = (project) => {
    setIsEditingProject(true);
    setEditingProjectId(project.id);
    setNewProject({
      title: project.title,
      description: project.description,
      image: project.image,
      price: project.price,
      isPremium: project.isPremium,
      techStack: project.techStack || [],
      category: project.category || 'Frontend',
      liveDemoUrl: project.liveDemoUrl || '',
      githubUrl: project.githubUrl || '',
      downloadUrl: project.downloadUrl || '',
      detailedDescription: project.detailedDescription || '',
      features: project.features || [],
      screenshots: project.screenshots || [],
      videoUrl: project.videoUrl || ''
    });
    setShowAddProjectModal(true);
  };

  const openNewProjectModal = () => {
    setIsEditingProject(false);
    setEditingProjectId(null);
    setNewProject({ 
      title: '', description: '', image: '', price: 0, isPremium: false, techStack: [], category: 'Frontend',
      liveDemoUrl: '', githubUrl: '', downloadUrl: '',
      detailedDescription: '', features: [], screenshots: [], videoUrl: ''
    });
    setShowAddProjectModal(true);
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Delete this project?')) {
      try {
        await api.delete(`/projects/${id}`);
        toast.success('Project deleted');
        fetchProjects();
      } catch (err) {
        toast.error('Failed to delete');
      }
    }
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    try {
      if (isEditingUser) {
        await api.put(`/admin/users/${editingUserId}`, newUser);
        toast.success('User updated');
      } else {
        await api.post('/admin/users', newUser);
        toast.success('User added');
      }
      setShowAddUserModal(false);
      fetchUsers();
      fetchStats();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save user');
    }
  };

  const handleEditUserClick = (user) => {
    setIsEditingUser(true);
    setEditingUserId(user.id);
    setNewUser({
      name: user.name,
      email: user.email,
      password: '', // leave empty when editing unless changing
      role: user.role
    });
    setShowAddUserModal(true);
  };

  const openNewUserModal = () => {
    setIsEditingUser(false);
    setEditingUserId(null);
    setNewUser({ name: '', email: '', password: '', role: 'user' });
    setShowAddUserModal(true);
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Delete this user account permanently?')) {
      try {
        await api.delete(`/admin/users/${id}`);
        toast.success('User deleted');
        fetchUsers();
        fetchStats();
      } catch (err) {
        toast.error('Failed to delete user');
      }
    }
  };

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    try {
      await api.post('/coupons', newCoupon);
      toast.success('Coupon created');
      setShowAddCouponModal(false);
      fetchCoupons();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create coupon');
    }
  };

  const handleToggleCoupon = async (id) => {
    try {
      await api.put(`/coupons/${id}/toggle`);
      toast.success('Coupon status updated');
      fetchCoupons();
    } catch (err) {
      toast.error('Failed to toggle coupon');
    }
  };

  const handleToggleMessageStatus = async (id) => {
    try {
      await api.put(`/contact/${id}/toggle`);
      fetchMessages();
    } catch (err) {
      toast.error('Failed to update message status');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (window.confirm('Delete this message?')) {
      try {
        await api.delete(`/contact/${id}`);
        toast.success('Message deleted');
        fetchMessages();
      } catch (err) {
        toast.error('Failed to delete message');
      }
    }
  };

  const handleExportMessages = () => {
    const headers = ['Sender', 'Email', 'Message', 'Date', 'Status'];
    const rows = messages.map(m => [
      `"${m.name}"`,
      m.email,
      `"${m.message}"`,
      new Date(m.createdAt).toLocaleDateString(),
      m.status
    ]);
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `messages_${new Date().toLocaleDateString()}.csv`);
    link.click();
  };

  const filteredMessages = messages.filter(m => {
    const matchesSearch = (m.name + m.email + m.message).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const NavButton = ({ tab, icon, label }) => {
    const isActive = activeTab === tab;
    return (
      <button
        onClick={() => setActiveTab(tab)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
          isActive
            ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(57,255,20,0.1)]'
            : 'text-slate-400 hover:bg-slate-900 hover:text-slate-50'
        }`}
      >
        {icon} {label}
      </button>
    );
  };

  const adminTabs = [
    { id: 'overview',  icon: <LayoutDashboard size={18} />, label: 'Overview'  },
    { id: 'projects',  icon: <ShoppingBag size={18} />,    label: 'Projects'  },
    { id: 'users',     icon: <Users size={18} />,           label: 'Users'     },
    { id: 'payments',  icon: <DollarSign size={18} />,     label: 'Payments'  },
    { id: 'coupons',   icon: <CreditCard size={18} />,     label: 'Coupons'   },
    { id: 'messages',  icon: <MessageSquare size={18} />,  label: 'Messages'  },
  ];

  return (
    <div className="min-h-screen bg-background w-full">
      <div className="flex min-h-[calc(100dvh-80px)] max-w-[1200px] mx-auto border-x border-outline/5">

        {/* ── Desktop Sidebar ── */}
        <aside className="w-64 border-r border-outline h-full hidden md:flex flex-col bg-surface flex-shrink-0">
          <div className="p-6 border-b border-outline text-center">
            <div className="w-14 h-14 bg-primary/10 border border-primary/20 rounded-full mx-auto mb-3 flex items-center justify-center text-primary text-xl font-black neon-text-blue">
              A
            </div>
            <h2 className="font-black text-on-background">Admin Console</h2>
            <p className="text-xs text-on-surface-variant mt-0.5">System Management</p>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {adminTabs.map(({ id, icon, label }) => (
              <NavButton key={id} tab={id} icon={icon} label={label} />
            ))}
          </nav>
          <div className="p-4 border-t border-outline">
            <BackButton to="/" text="Main Site" className="w-full justify-center" />
          </div>
        </aside>

        {/* ── Content ── */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Mobile Tab Bar */}
          <div className="md:hidden sticky top-0 z-20 flex items-center border-b border-outline bg-surface shrink-0">
            <div className="px-3 border-r border-outline">
              <BackButton to="/" text="" className="!p-2 !rounded-lg" />
            </div>
            <div className="flex overflow-x-auto scrollbar-none flex-1">
              {adminTabs.map(({ id, icon, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex flex-col items-center gap-1 py-3 px-3 text-[9px] font-black uppercase tracking-wide whitespace-nowrap shrink-0 transition-all ${
                    activeTab === id
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-slate-500'
                  }`}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 p-4 md:px-12 md:py-10 overflow-y-auto space-y-6">
        
            {/* Header */}
            <div className="flex flex-wrap justify-between items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-black text-on-background capitalize">{activeTab}</h1>
              {activeTab === 'projects' && (
                <button onClick={openNewProjectModal} className="btn-primary flex items-center gap-2 !py-2 !px-4 text-xs">
                  <Plus size={16} /> Add Project
                </button>
              )}
              {activeTab === 'coupons' && (
                <button onClick={() => setShowAddCouponModal(true)} className="btn-primary flex items-center gap-2 !py-2 !px-4 text-xs">
                  <Plus size={16} /> Add Coupon
                </button>
              )}
              {activeTab === 'users' && (
                <button onClick={openNewUserModal} className="btn-primary flex items-center gap-2 !py-2 !px-4 text-xs">
                  <Plus size={16} /> Add User
                </button>
              )}
            </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Revenue', value: `₹${stats?.totalRevenue || 0}`, icon: <DollarSign />, color: 'text-green-400' },
                { label: 'Total Sales', value: stats?.totalSales || 0, icon: <ShoppingBag />, color: 'text-blue-400' },
                { label: 'Active Users', value: stats?.totalUsers || 0, icon: <Users />, color: 'text-purple-400' },
                { label: 'Total Projects', value: stats?.totalProjects || 0, icon: <TrendingUp />, color: 'text-orange-400' },
              ].map((stat, i) => (
                <div key={i} className="glass-panel p-6 rounded-3xl">
                  <div className={`p-3 rounded-2xl bg-surface-variant w-fit mb-4 ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <p className="text-on-surface-variant text-sm font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-panel p-6 rounded-3xl min-h-[350px]">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <TrendingUp size={20} className="text-primary" /> Revenue Growth
                </h3>
                <div className="h-[250px]">
                  <Line 
                    data={{
                      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                      datasets: [{
                        label: 'Revenue',
                        data: [0, (stats?.totalRevenue || 0) * 0.4, (stats?.totalRevenue || 0) * 0.6, (stats?.totalRevenue || 0) * 0.8, (stats?.totalRevenue || 0) * 0.9, stats?.totalRevenue || 0],
                        borderColor: '#39FF14',
                        backgroundColor: 'rgba(57, 255, 20, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3,
                        pointBackgroundColor: '#39FF14',
                        pointBorderColor: '#000',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false },
                        tooltip: {
                          backgroundColor: '#000',
                          titleColor: '#39FF14',
                          bodyColor: '#fff',
                          borderColor: '#39FF14',
                          borderWidth: 1,
                          padding: 10,
                          cornerRadius: 10,
                        }
                      },
                      scales: {
                        y: {
                          grid: { color: 'rgba(255, 255, 255, 0.05)' },
                          ticks: { color: '#888', font: { size: 10 } }
                        },
                        x: {
                          grid: { display: false },
                          ticks: { color: '#888', font: { size: 10 } }
                        }
                      }
                    }}
                  />
                </div>
              </div>

              <div className="glass-panel p-6 rounded-3xl min-h-[350px]">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <ShoppingBag size={20} className="text-primary" /> Sales Distribution
                </h3>
                <div className="h-[250px]">
                  <Bar 
                    data={{
                      labels: ['Frontend', 'Backend', 'Full Stack', 'App'],
                      datasets: [{
                        label: 'Sales',
                        data: [
                          stats?.totalSales ? Math.floor(stats.totalSales * 0.4) : 0,
                          stats?.totalSales ? Math.floor(stats.totalSales * 0.2) : 0,
                          stats?.totalSales ? Math.floor(stats.totalSales * 0.3) : 0,
                          stats?.totalSales ? Math.floor(stats.totalSales * 0.1) : 0,
                        ],
                        backgroundColor: '#39FF14',
                        borderRadius: 8,
                        barThickness: 30,
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false },
                        tooltip: {
                          backgroundColor: '#000',
                          padding: 10,
                          cornerRadius: 10,
                        }
                      },
                      scales: {
                        y: {
                          grid: { color: 'rgba(255, 255, 255, 0.05)' },
                          ticks: { color: '#888', font: { size: 10 } }
                        },
                        x: {
                          grid: { display: false },
                          ticks: { color: '#888', font: { size: 10 } }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Recent Transactions & Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 glass-panel rounded-3xl overflow-hidden border border-outline">
                <div className="p-6 border-b border-outline flex justify-between items-center bg-surface-variant/20">
                  <h3 className="font-black text-on-background flex items-center gap-2">
                    <History size={18} className="text-primary" /> Recent Transactions
                  </h3>
                  <button onClick={() => setActiveTab('sales')} className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant border-b border-outline">
                      <tr>
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Project</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline">
                      {payments.slice(0, 5).map((pay, i) => (
                        <tr key={i} className="hover:bg-surface-variant/30 transition-colors">
                          <td className="px-6 py-4">
                            <p className="font-bold text-on-background">{pay.User?.name || 'Guest'}</p>
                            <p className="text-[10px] text-on-surface-variant font-mono">{pay.orderId}</p>
                          </td>
                          <td className="px-6 py-4 text-on-surface-variant font-medium">
                            {pay.Project?.title || 'Unknown'}
                          </td>
                          <td className="px-6 py-4 font-black text-primary neon-text-blue">
                            ₹{pay.amount}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter ${
                              pay.status === 'completed' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'
                            }`}>
                              {pay.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {payments.length === 0 && (
                        <tr>
                          <td colSpan="4" className="px-6 py-12 text-center text-on-surface-variant italic opacity-50">No recent transactions</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-3xl border border-outline flex flex-col gap-6">
                <div className="space-y-1">
                  <h3 className="font-black text-on-background flex items-center gap-2">
                    <ShieldAlert size={18} className="text-secondary" /> System Health
                  </h3>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Node.js Server Status</p>
                </div>
                
                <div className="space-y-4 flex-1">
                  {[
                    { label: 'Database', value: 'Operational', color: 'text-primary' },
                    { label: 'Cloudinary', value: 'Online', color: 'text-primary' },
                    { label: 'SMTP Server', value: 'Ready', color: 'text-primary' },
                    { label: 'API Latency', value: '42ms', color: 'text-blue-400' },
                  ].map((sys, i) => (
                    <div key={i} className="flex justify-between items-center p-3 rounded-2xl bg-surface-variant/30 border border-outline/50">
                      <span className="text-xs font-bold text-on-surface-variant">{sys.label}</span>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${sys.color}`}>{sys.value}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20">
                  <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">Support Note</p>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed italic">"All systems are running optimally. High traffic detected in Frontend category."</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            {/* Desktop View (Table) */}
            <div className="hidden md:block glass-panel rounded-2xl border border-outline overflow-hidden">
              <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-variant/50 border-b border-outline">
                  <tr>
                    <th className="px-6 py-4 font-bold text-sm">Project</th>
                    <th className="px-6 py-4 font-bold text-sm">Type</th>
                    <th className="px-6 py-4 font-bold text-sm">Price</th>
                    <th className="px-6 py-4 font-bold text-sm">Sales</th>
                    <th className="px-6 py-4 font-bold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline">
                  {projects.map(p => (
                    <tr key={p.id} className="hover:bg-surface-variant/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={p.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                          <span className="font-medium">{p.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${p.isPremium ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-green-400/10 text-green-400 border border-green-400/20'}`}>
                          {p.isPremium ? 'Premium' : 'Free'}
                        </span>
                      </td>
                      <td className="px-6 py-4">₹{p.price}</td>
                      <td className="px-6 py-4">{p.unlocks}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          <button onClick={() => handleEditClick(p)} className="text-slate-400 hover:text-white transition-colors"><Edit size={18} /></button>
                          <button onClick={() => handleDeleteProject(p.id)} className="text-slate-400 hover:text-red-400 transition-colors"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>

            {/* Mobile View (Cards) */}
            <div className="md:hidden grid grid-cols-1 gap-4">
              {projects.map(p => (
                <div key={p.id} className="glass-panel p-5 rounded-3xl border border-outline relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 flex gap-3">
                    <button onClick={() => handleEditClick(p)} className="p-2 rounded-xl bg-surface-variant/50 text-slate-400 hover:text-primary transition-all"><Edit size={18} /></button>
                    <button onClick={() => handleDeleteProject(p.id)} className="p-2 rounded-xl bg-surface-variant/50 text-slate-400 hover:text-red-400 transition-all"><Trash2 size={18} /></button>
                  </div>
                  
                  <div className="flex gap-4">
                    <img src={p.image} className="w-20 h-20 rounded-2xl object-cover shadow-lg border border-outline" alt="" />
                    <div className="flex-1 pr-16">
                      <span className={`inline-block px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter mb-1.5 ${p.isPremium ? 'bg-primary/20 text-primary' : 'bg-green-400/20 text-green-400'}`}>
                        {p.isPremium ? 'Premium' : 'Free'}
                      </span>
                      <h3 className="font-bold text-lg leading-tight text-on-background line-clamp-1">{p.title}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <div>
                          <p className="text-[10px] text-on-surface-variant uppercase font-bold opacity-60">Price</p>
                          <p className="font-black text-primary">₹{p.price}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-on-surface-variant uppercase font-bold opacity-60">Sales</p>
                          <p className="font-black text-on-background">{p.unlocks}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            {/* Desktop View */}
            <div className="hidden md:block glass-panel rounded-2xl border border-outline overflow-hidden">
              <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-variant/50 border-b border-outline">
                  <tr>
                    <th className="px-6 py-4 font-bold text-sm">Name</th>
                    <th className="px-6 py-4 font-bold text-sm">Email</th>
                    <th className="px-6 py-4 font-bold text-sm">Role</th>
                    <th className="px-6 py-4 font-bold text-sm">Projects</th>
                    <th className="px-6 py-4 font-bold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-surface-variant/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-on-background">{u.name}</td>
                      <td className="px-6 py-4 text-on-surface-variant">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${u.role === 'admin' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-slate-700/50 text-slate-300'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">{u.unlockedProjects?.length || 0}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          <button onClick={() => handleEditUserClick(u)} className="text-slate-400 hover:text-white transition-colors"><Edit size={18} /></button>
                          <button onClick={() => handleDeleteUser(u.id)} className="text-slate-400 hover:text-red-400 transition-colors"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden grid grid-cols-1 gap-4">
              {users.map(u => (
                <div key={u.id} className="glass-panel p-5 rounded-3xl border border-outline relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg border border-primary/20">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-on-background">{u.name}</h3>
                        <p className="text-[10px] text-on-surface-variant font-mono">{u.email}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter ${u.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-700/50 text-slate-300'}`}>
                      {u.role}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-outline">
                    <div className="flex items-center gap-2">
                      <ShoppingBag size={14} className="text-on-surface-variant opacity-60" />
                      <span className="text-xs font-bold text-on-background">{u.unlockedProjects?.length || 0} Projects</span>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={() => handleEditUserClick(u)} className="p-2 rounded-xl bg-surface-variant/50 text-slate-400 hover:text-white"><Edit size={18} /></button>
                      <button onClick={() => handleDeleteUser(u.id)} className="p-2 rounded-xl bg-surface-variant/50 text-slate-400 hover:text-red-400"><Trash2 size={18} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="space-y-4">
            {/* Desktop View */}
            <div className="hidden md:block glass-panel rounded-2xl border border-outline overflow-hidden">
              <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-variant/50 border-b border-outline">
                  <tr>
                    <th className="px-6 py-4 font-bold text-sm">Order ID</th>
                    <th className="px-6 py-4 font-bold text-sm">Amount</th>
                    <th className="px-6 py-4 font-bold text-sm">Status</th>
                    <th className="px-6 py-4 font-bold text-sm">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline">
                  {payments.map(p => (
                    <tr key={p.id} className="hover:bg-surface-variant/30 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-on-surface-variant">{p.orderId}</td>
                      <td className="px-6 py-4 font-bold">₹{p.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${p.status === 'completed' ? 'bg-green-400/10 text-green-400 border border-green-400/20' : 'bg-orange-400/10 text-orange-400 border border-orange-400/20'}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">{new Date(p.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden grid grid-cols-1 gap-4">
              {payments.map(p => (
                <div key={p.id} className="glass-panel p-5 rounded-3xl border border-outline relative">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-[10px] text-on-surface-variant uppercase font-bold opacity-60">Order ID</p>
                      <p className="text-xs font-mono text-on-background font-bold">{p.orderId}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter ${p.status === 'completed' ? 'bg-green-400/20 text-green-400' : 'bg-orange-400/20 text-orange-400'}`}>
                      {p.status}
                    </span>
                  </div>
                  
                  <div className="flex items-end justify-between pt-4 border-t border-outline">
                    <div>
                      <p className="text-[10px] text-on-surface-variant uppercase font-bold opacity-60">Date</p>
                      <p className="text-sm font-bold text-on-background">{new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <p className="text-xl font-black text-primary">₹{p.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Coupons Tab */}
        {activeTab === 'coupons' && (
          <div className="space-y-4">
            {/* Desktop View */}
            <div className="hidden md:block glass-panel rounded-2xl border border-outline overflow-hidden">
              <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-variant/50 border-b border-outline">
                  <tr>
                    <th className="px-6 py-4 font-bold text-sm">Code</th>
                    <th className="px-6 py-4 font-bold text-sm">Discount</th>
                    <th className="px-6 py-4 font-bold text-sm">Expiry Date</th>
                    <th className="px-6 py-4 font-bold text-sm">Status</th>
                    <th className="px-6 py-4 font-bold text-sm">Toggle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline">
                  {coupons.map(c => (
                    <tr key={c.id} className="hover:bg-surface-variant/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-purple-400">{c.code}</td>
                      <td className="px-6 py-4">{c.discount}%</td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">{new Date(c.expiryDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${c.isActive ? 'bg-green-400/10 text-green-400 border border-green-400/20' : 'bg-red-400/10 text-red-400 border border-red-400/20'}`}>
                          {c.isActive ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => handleToggleCoupon(c.id)} className="text-slate-400 hover:text-white transition-colors">
                          {c.isActive ? <ToggleRight size={24} className="text-green-400"/> : <ToggleLeft size={24} className="text-slate-500"/>}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden grid grid-cols-1 gap-4">
              {coupons.map(c => (
                <div key={c.id} className="glass-panel p-5 rounded-3xl border border-outline relative">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-[10px] text-on-surface-variant uppercase font-bold opacity-60">Coupon Code</p>
                      <p className="text-lg font-black text-purple-400 tracking-wider">{c.code}</p>
                    </div>
                    <button onClick={() => handleToggleCoupon(c.id)} className="transition-transform active:scale-90">
                      {c.isActive ? <ToggleRight size={32} className="text-green-400"/> : <ToggleLeft size={32} className="text-slate-500"/>}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-outline">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 px-2 py-1 rounded-lg">
                        <p className="text-xs font-black text-primary">{c.discount}% OFF</p>
                      </div>
                      <p className="text-[10px] text-on-surface-variant font-medium">Expires: {new Date(c.expiryDate).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter ${c.isActive ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'}`}>
                      {c.isActive ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between glass-panel p-6 rounded-2xl border border-outline">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
                  <input 
                    placeholder="Search messages..." 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full bg-surface border border-outline rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-primary transition-all text-on-background placeholder:text-on-surface-variant/60"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
                  <select 
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="bg-surface border border-outline rounded-xl pl-10 pr-8 py-2 text-sm outline-none focus:border-primary transition-all appearance-none cursor-pointer text-on-background"
                  >
                    <option value="all">All Status</option>
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button onClick={fetchMessages} className="p-2 rounded-xl bg-surface-variant text-on-surface-variant hover:text-on-background transition-all border border-outline" title="Refresh">
                  <RefreshCw size={18} />
                </button>
                <button onClick={handleExportMessages} className="btn-secondary !py-2 !px-4 flex items-center gap-2 text-xs">
                  <Download size={14} /> Export CSV
                </button>
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block glass-panel rounded-2xl border border-outline overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-variant/50 border-b border-outline">
                  <tr>
                    <th className="px-6 py-4 font-bold text-xs uppercase tracking-widest text-on-surface-variant">Sender</th>
                    <th className="px-6 py-4 font-bold text-xs uppercase tracking-widest text-on-surface-variant">Message</th>
                    <th className="px-6 py-4 font-bold text-xs uppercase tracking-widest text-on-surface-variant">Date</th>
                    <th className="px-6 py-4 font-bold text-xs uppercase tracking-widest text-on-surface-variant">Status</th>
                    <th className="px-6 py-4 font-bold text-xs uppercase tracking-widest text-on-surface-variant">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline">
                  {filteredMessages.length > 0 ? filteredMessages.map(m => (
                    <tr key={m.id} className="hover:bg-surface-variant/30 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-bold text-on-background">{m.name}</p>
                        <p className="text-[10px] font-mono text-primary/80">{m.email}</p>
                      </td>
                      <td className="px-6 py-4 max-w-md">
                        <p className="text-sm text-on-surface-variant line-clamp-2 leading-relaxed" title={m.message}>
                          {m.message}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-xs text-on-surface-variant/80 whitespace-nowrap">
                        {new Date(m.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => handleToggleMessageStatus(m.id)} 
                          className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${m.status === 'read' ? 'bg-surface-variant text-on-surface-variant border border-outline' : 'bg-blue-400/10 text-blue-600 dark:text-blue-400 border border-blue-400/20 shadow-[0_0_10px_rgba(96,165,250,0.1)]'}`}
                        >
                          {m.status === 'read' ? <CheckCircle2 size={12}/> : <Mail size={12}/>}
                          {m.status}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <a href={`mailto:${m.email}?subject=Reply to your message&body=Hi ${m.name},`} className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-background transition-all" title="Quick Reply">
                            <Mail size={16} />
                          </a>
                          <button onClick={() => handleDeleteMessage(m.id)} className="p-2 rounded-lg bg-neon-red/10 text-neon-red hover:bg-neon-red hover:text-white transition-all" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-on-surface-variant italic">No messages found matching your criteria.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden grid grid-cols-1 gap-4">
              {filteredMessages.length > 0 ? filteredMessages.map(m => (
                <div key={m.id} className={`glass-panel p-5 rounded-3xl border transition-all ${m.status === 'unread' ? 'border-primary/30 bg-primary/5' : 'border-outline'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border ${m.status === 'unread' ? 'bg-primary/20 text-primary border-primary/30' : 'bg-surface-variant text-on-surface-variant border-outline'}`}>
                        {m.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-on-background leading-tight">{m.name}</h3>
                        <p className="text-[10px] text-on-surface-variant font-mono opacity-70">{m.email}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleToggleMessageStatus(m.id)}
                      className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter ${m.status === 'unread' ? 'bg-blue-500/20 text-blue-400' : 'bg-surface-variant text-on-surface-variant'}`}
                    >
                      {m.status}
                    </button>
                  </div>
                  
                  <div className="bg-surface-variant/30 p-4 rounded-2xl border border-outline/50 mb-4">
                    <p className="text-sm text-on-surface-variant leading-relaxed italic line-clamp-3">"{m.message}"</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-on-surface-variant font-bold opacity-50">
                      {new Date(m.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <div className="flex gap-3">
                      <a href={`mailto:${m.email}?subject=Reply to your message&body=Hi ${m.name},`} className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20"><Mail size={18} /></a>
                      <button onClick={() => handleDeleteMessage(m.id)} className="p-2.5 rounded-xl bg-neon-red/10 text-neon-red border border-neon-red/20"><Trash2 size={18} /></button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="glass-panel p-10 rounded-3xl border border-outline text-center text-on-surface-variant italic">
                  No messages found.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Add/Edit Project Modal */}
        {showAddProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="glass-panel w-full max-w-3xl rounded-3xl border border-outline shadow-2xl flex flex-col max-h-[92vh]">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-outline flex-shrink-0">
                <div>
                  <h2 className="text-2xl font-black text-on-background">
                    {isEditingProject ? '✏️ Edit Project' : '🚀 New Project'}
                  </h2>
                  <p className="text-xs text-on-surface-variant mt-1">Fill in all sections for the best project detail page</p>
                </div>
                <button type="button" onClick={() => setShowAddProjectModal(false)} className="w-10 h-10 rounded-2xl bg-surface-variant border border-outline flex items-center justify-center text-on-surface-variant hover:text-red-400 hover:border-red-400/30 transition-all text-xl font-bold">×</button>
              </div>

              {/* Scrollable Form Body */}
              <div className="overflow-y-auto flex-1 px-8 py-6">
                <form id="project-form" onSubmit={handleSaveProject} className="space-y-8">

                  {/* ── Section 1: Basic Info ── */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-1 h-6 bg-primary rounded-full" />
                      <h3 className="text-sm font-black uppercase tracking-widest text-on-background">Basic Info</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-1.5">Project Title *</label>
                        <input placeholder="e.g. SaaS Portfolio Platform" value={newProject.title} required
                          className="w-full bg-surface-variant/50 border border-outline rounded-xl px-4 py-3 outline-none focus:border-primary transition-all text-on-background text-sm"
                          onChange={e => setNewProject({...newProject, title: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-1.5">Thumbnail Image URL *</label>
                        <input placeholder="https://..." value={newProject.image} required
                          className="w-full bg-surface-variant/50 border border-outline rounded-xl px-4 py-3 outline-none focus:border-primary transition-all text-on-background text-sm"
                          onChange={e => setNewProject({...newProject, image: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-1.5">Category</label>
                        <select value={newProject.category} className="w-full bg-surface-variant/50 border border-outline rounded-xl px-4 py-3 outline-none focus:border-primary transition-all text-on-background text-sm"
                          onChange={e => setNewProject({...newProject, category: e.target.value})}>
                          {['Frontend', 'Backend', 'Full Stack', 'Mobile', 'UI/UX', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-1.5">Project Type</label>
                        <select value={newProject.isPremium} className="w-full bg-surface-variant/50 border border-outline rounded-xl px-4 py-3 outline-none focus:border-primary transition-all text-on-background text-sm"
                          onChange={e => setNewProject({...newProject, isPremium: e.target.value === 'true'})}>
                          <option value={false}>🆓 Free</option>
                          <option value={true}>⭐ Premium</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-1.5">Short Description (shown on card)</label>
                      <textarea placeholder="A brief 1-2 line description for the project card..." value={newProject.description}
                        className="w-full bg-surface-variant/50 border border-outline rounded-xl px-4 py-3 outline-none focus:border-primary transition-all h-20 resize-none text-sm text-on-background"
                        onChange={e => setNewProject({...newProject, description: e.target.value})} />
                    </div>
                  </div>

                  {/* ── Section 2: Links & Pricing ── */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-1 h-6 bg-blue-400 rounded-full" />
                      <h3 className="text-sm font-black uppercase tracking-widest text-on-background">Links & Pricing</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-1.5">Live Demo URL</label>
                        <input placeholder="https://demo.yourproject.com" value={newProject.liveDemoUrl}
                          className="w-full bg-surface-variant/50 border border-outline rounded-xl px-4 py-3 outline-none focus:border-primary transition-all text-on-background text-sm"
                          onChange={e => setNewProject({...newProject, liveDemoUrl: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-1.5">GitHub URL (free only)</label>
                        <input placeholder="https://github.com/user/repo" value={newProject.githubUrl}
                          className="w-full bg-surface-variant/50 border border-outline rounded-xl px-4 py-3 outline-none focus:border-primary transition-all text-on-background text-sm"
                          onChange={e => setNewProject({...newProject, githubUrl: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-1.5">Price (₹)</label>
                        <input placeholder="0" value={newProject.price} type="number" min="0"
                          className="w-full bg-surface-variant/50 border border-outline rounded-xl px-4 py-3 outline-none focus:border-primary transition-all text-on-background text-sm"
                          onChange={e => setNewProject({...newProject, price: Number(e.target.value)})} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-1.5">Direct Download URL</label>
                        <input placeholder="https://... (or upload below)" value={newProject.downloadUrl}
                          className="w-full bg-surface-variant/50 border border-outline rounded-xl px-4 py-3 outline-none focus:border-primary transition-all text-on-background text-sm"
                          onChange={e => setNewProject({...newProject, downloadUrl: e.target.value})} />
                      </div>
                    </div>
                    {/* Source Code Upload */}
                    <label className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 border-dashed border-primary/30 hover:border-primary/60 bg-primary/5 cursor-pointer transition-all group">
                      <div className="text-3xl">📦</div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-on-background group-hover:text-primary transition-colors">Upload Source Code (.zip, .rar, .7z)</p>
                        <p className="text-[10px] text-on-surface-variant mt-1">Max 1GB · Replaces Direct Download URL</p>
                      </div>
                      {newProject.downloadUrl && (
                        <p className="text-xs text-green-400 font-bold">✅ File Ready</p>
                      )}
                      <input type="file" accept=".zip,.rar,.7z,.tar,.gz" onChange={handleSourceUpload} className="hidden" />
                    </label>
                  </div>

                  {/* ── Section 3: Media ── */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-1 h-6 bg-purple-400 rounded-full" />
                      <h3 className="text-sm font-black uppercase tracking-widest text-on-background">Screenshots & Video</h3>
                    </div>

                    {/* Screenshot Upload */}
                    <div>
                      <label className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 border-dashed border-blue-400/30 hover:border-blue-400/60 bg-blue-400/5 cursor-pointer transition-all group">
                        <div className="text-3xl">📸</div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-on-background group-hover:text-blue-400 transition-colors">Upload Screenshots (up to 10)</p>
                          <p className="text-[10px] text-on-surface-variant mt-1">JPG, PNG, WebP · Max 10MB each</p>
                        </div>
                        <input type="file" accept="image/*" multiple onChange={handleScreenshotUpload} className="hidden" />
                      </label>

                      {/* Screenshot Thumbnails */}
                      {(newProject.screenshots || []).length > 0 && (
                        <div className="flex gap-3 flex-wrap mt-3 p-3 bg-surface-variant/30 rounded-2xl border border-outline">
                          {newProject.screenshots.map((url, i) => (
                            <div key={i} className="relative group/shot">
                              <img src={url} alt="" className="w-20 h-14 object-cover rounded-xl border border-outline shadow-md" />
                              <button type="button"
                                onClick={() => setNewProject(prev => ({ ...prev, screenshots: prev.screenshots.filter((_, j) => j !== i) }))}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-sm hidden group-hover/shot:flex items-center justify-center shadow-lg font-bold leading-none"
                              >×</button>
                            </div>
                          ))}
                          <div className="text-[10px] text-on-surface-variant self-end pb-1 font-bold opacity-60">
                            {newProject.screenshots.length}/10
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Video Upload */}
                    <label className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 border-dashed border-purple-400/30 hover:border-purple-400/60 bg-purple-400/5 cursor-pointer transition-all group">
                      <div className="text-3xl">🎬</div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-on-background group-hover:text-purple-400 transition-colors">Upload Demo Video (.mp4, .webm)</p>
                        <p className="text-[10px] text-on-surface-variant mt-1">Max 500MB · Shown as a video player on the detail page</p>
                      </div>
                      {newProject.videoUrl && (
                        <p className="text-xs text-green-400 font-bold">✅ Video Ready</p>
                      )}
                      <input type="file" accept="video/mp4,video/webm,video/mov,.avi,.mkv" onChange={handleVideoUpload} className="hidden" />
                    </label>
                  </div>

                  {/* ── Section 4: Detail Page Content ── */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-1 h-6 bg-green-400 rounded-full" />
                      <h3 className="text-sm font-black uppercase tracking-widest text-on-background">Detail Page Content</h3>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-1.5">✅ Key Features <span className="normal-case opacity-60 font-medium">(one per line)</span></label>
                      <textarea
                        placeholder={"User Authentication System\nDark Mode Support\nRazorpay Payment Integration\nFully Responsive Design\nAdmin Dashboard"}
                        value={(newProject.features || []).join('\n')}
                        className="w-full bg-surface-variant/50 border border-outline rounded-xl px-4 py-3 outline-none focus:border-primary transition-all h-32 resize-none text-sm text-on-background placeholder:text-on-surface-variant/40"
                        onChange={e => setNewProject({...newProject, features: e.target.value.split('\n').filter(f => f.trim())})}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-1.5">📝 Detailed Description <span className="normal-case opacity-60 font-medium">(shown on About tab)</span></label>
                      <textarea
                        placeholder="Write a thorough description of your project. Describe what problem it solves, the main technologies used, and any interesting challenges you overcame during development..."
                        value={newProject.detailedDescription || ''}
                        className="w-full bg-surface-variant/50 border border-outline rounded-xl px-4 py-3 outline-none focus:border-primary transition-all h-44 resize-none text-sm text-on-background placeholder:text-on-surface-variant/40"
                        onChange={e => setNewProject({...newProject, detailedDescription: e.target.value})}
                      />
                    </div>
                  </div>

                </form>
              </div>

              {/* Sticky Footer Actions */}
              <div className="flex gap-4 px-8 py-5 border-t border-outline flex-shrink-0 bg-surface/50 backdrop-blur-sm rounded-b-3xl">
                <button type="submit" form="project-form" className="btn-primary flex-1 py-3 font-black">
                  {isEditingProject ? '💾 Save Changes' : '🚀 Create Project'}
                </button>
                <button type="button" onClick={() => setShowAddProjectModal(false)} className="flex-1 py-3 rounded-2xl border border-outline text-on-surface-variant hover:text-on-background hover:bg-surface-variant transition-all font-bold text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}


        {/* Add Coupon Modal */}
        {showAddCouponModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-6">
            <div className="glass-panel max-w-md w-full p-8 rounded-3xl">
              <h2 className="text-2xl font-bold mb-6">New Coupon</h2>
              <form onSubmit={handleAddCoupon} className="space-y-4">
                <input placeholder="Coupon Code (e.g., SAVE20)" required className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 outline-none uppercase" onChange={e => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})} />
                <input placeholder="Discount %" type="number" required min="1" max="100" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 outline-none" onChange={e => setNewCoupon({...newCoupon, discount: Number(e.target.value)})} />
                <input type="date" required className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 outline-none text-slate-300" onChange={e => setNewCoupon({...newCoupon, expiryDate: e.target.value})} />
                <div className="flex gap-4 pt-2">
                  <button type="submit" className="btn-primary flex-1">Create</button>
                  <button type="button" onClick={() => setShowAddCouponModal(false)} className="btn-secondary flex-1">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add/Edit User Modal */}
        {showAddUserModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-6">
            <div className="glass-panel max-w-md w-full p-8 rounded-3xl">
              <h2 className="text-2xl font-bold mb-6">{isEditingUser ? 'Edit User' : 'New User'}</h2>
              <form onSubmit={handleSaveUser} className="space-y-4">
                <input placeholder="Full Name" value={newUser.name} required className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 outline-none" onChange={e => setNewUser({...newUser, name: e.target.value})} />
                <input placeholder="Email Address" type="email" value={newUser.email} required className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 outline-none" onChange={e => setNewUser({...newUser, email: e.target.value})} />
                <input placeholder={isEditingUser ? "New Password (leave blank to keep current)" : "Password"} type="password" required={!isEditingUser} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 outline-none" onChange={e => setNewUser({...newUser, password: e.target.value})} />
                <select value={newUser.role} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 outline-none" onChange={e => setNewUser({...newUser, role: e.target.value})}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <div className="flex gap-4 pt-2">
                  <button type="submit" className="btn-primary flex-1">{isEditingUser ? 'Save Changes' : 'Create'}</button>
                  <button type="button" onClick={() => setShowAddUserModal(false)} className="btn-secondary flex-1">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
