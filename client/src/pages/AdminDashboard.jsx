import { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { Plus, Trash2, Edit, TrendingUp, Users, ShoppingBag, DollarSign, LayoutDashboard, CreditCard, ToggleLeft, ToggleRight, MessageSquare, BarChart as ChartIcon } from 'lucide-react';
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
    liveDemoUrl: '', githubUrl: ''
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
      githubUrl: project.githubUrl || ''
    });
    setShowAddProjectModal(true);
  };

  const openNewProjectModal = () => {
    setIsEditingProject(false);
    setEditingProjectId(null);
    setNewProject({ 
      title: '', description: '', image: '', price: 0, isPremium: false, techStack: [], category: 'Frontend',
      liveDemoUrl: '', githubUrl: '' 
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
      <div className="flex min-h-[calc(100dvh-80px)] max-w-[1400px] mx-auto">

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
        </aside>

        {/* ── Content ── */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Mobile Tab Bar */}
          <div className="md:hidden sticky top-0 z-20 flex overflow-x-auto border-b border-outline bg-surface shrink-0 scrollbar-none">
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

          {/* Scrollable content */}
          <div className="flex-1 p-4 md:p-8 overflow-y-auto space-y-6">
        
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
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="glass-panel rounded-2xl border border-outline overflow-hidden">
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
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-900/50 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-4 font-bold text-sm">Name</th>
                  <th className="px-6 py-4 font-bold text-sm">Email</th>
                  <th className="px-6 py-4 font-bold text-sm">Role</th>
                  <th className="px-6 py-4 font-bold text-sm">Unlocked Projects</th>
                  <th className="px-6 py-4 font-bold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium">{u.name}</td>
                    <td className="px-6 py-4 text-slate-300">{u.email}</td>
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
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-900/50 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-4 font-bold text-sm">Order ID</th>
                  <th className="px-6 py-4 font-bold text-sm">Amount</th>
                  <th className="px-6 py-4 font-bold text-sm">Status</th>
                  <th className="px-6 py-4 font-bold text-sm">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {payments.map(p => (
                  <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
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
        )}

        {/* Coupons Tab */}
        {activeTab === 'coupons' && (
          <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-900/50 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-4 font-bold text-sm">Code</th>
                  <th className="px-6 py-4 font-bold text-sm">Discount</th>
                  <th className="px-6 py-4 font-bold text-sm">Expiry Date</th>
                  <th className="px-6 py-4 font-bold text-sm">Status</th>
                  <th className="px-6 py-4 font-bold text-sm">Toggle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {coupons.map(c => (
                  <tr key={c.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-purple-400">{c.code}</td>
                    <td className="px-6 py-4">{c.discount}%</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{new Date(c.expiryDate).toLocaleDateString()}</td>
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
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-900/50 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-4 font-bold text-sm">Sender</th>
                  <th className="px-6 py-4 font-bold text-sm">Message</th>
                  <th className="px-6 py-4 font-bold text-sm">Date</th>
                  <th className="px-6 py-4 font-bold text-sm">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {messages.map(m => (
                  <tr key={m.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold">{m.name}</p>
                      <p className="text-xs text-slate-400">{m.email}</p>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate text-slate-300" title={m.message}>
                      {m.message}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">{new Date(m.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleToggleMessageStatus(m.id)} className="text-slate-400 hover:text-white transition-colors" title="Toggle Status">
                        {m.status === 'read' ? <ToggleRight size={24} className="text-slate-500"/> : <ToggleLeft size={24} className="text-blue-400"/>}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        )}

        {/* Add/Edit Project Modal */}
        {showAddProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-6">
            <div className="glass-panel max-w-2xl w-full p-8 rounded-3xl">
              <h2 className="text-2xl font-bold mb-6">{isEditingProject ? 'Edit Project' : 'New Project'}</h2>
              <form onSubmit={handleSaveProject} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input placeholder="Title" value={newProject.title} required className="bg-surface-variant/50 border border-outline rounded-xl px-4 py-3 outline-none" onChange={e => setNewProject({...newProject, title: e.target.value})} />
                <input placeholder="Image URL" value={newProject.image} required className="bg-surface-variant/50 border border-outline rounded-xl px-4 py-3 outline-none" onChange={e => setNewProject({...newProject, image: e.target.value})} />
                <input placeholder="Live Demo Link (e.g. https://demo.com)" value={newProject.liveDemoUrl} className="bg-surface-variant/50 border border-outline rounded-xl px-4 py-3 outline-none" onChange={e => setNewProject({...newProject, liveDemoUrl: e.target.value})} />
                <input placeholder="Project Code Link (e.g. https://github.com/...)" value={newProject.githubUrl} className="bg-surface-variant/50 border border-outline rounded-xl px-4 py-3 outline-none" onChange={e => setNewProject({...newProject, githubUrl: e.target.value})} />
                <input placeholder="Price" value={newProject.price} type="number" className="bg-surface-variant/50 border border-outline rounded-xl px-4 py-3 outline-none" onChange={e => setNewProject({...newProject, price: Number(e.target.value)})} />
                <select value={newProject.isPremium} className="bg-surface-variant/50 border border-outline rounded-xl px-4 py-3 outline-none" onChange={e => setNewProject({...newProject, isPremium: e.target.value === 'true'})}>
                  <option value={false}>Free</option>
                  <option value={true}>Premium</option>
                </select>
                <textarea placeholder="Description" value={newProject.description} className="col-span-full bg-surface-variant/50 border border-outline rounded-xl px-4 py-3 outline-none h-32" onChange={e => setNewProject({...newProject, description: e.target.value})}></textarea>
                <div className="flex gap-4 col-span-full">
                  <button type="submit" className="btn-primary flex-1">{isEditingProject ? 'Save Changes' : 'Create'}</button>
                  <button type="button" onClick={() => setShowAddProjectModal(false)} className="btn-secondary flex-1">Cancel</button>
                </div>
              </form>
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
