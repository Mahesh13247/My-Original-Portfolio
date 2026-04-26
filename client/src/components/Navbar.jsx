import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Grid, LogOut, LayoutDashboard, Settings, Menu, X, Mail } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/#about' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline">
      <div className="flex justify-between items-center px-4 sm:px-6 py-4 max-w-[1200px] mx-auto w-full">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsMenuOpen(false)}>
            <Grid className="text-primary group-hover:rotate-90 transition-transform duration-500 neon-text-blue" size={24} />
            <span className="text-lg font-bold tracking-tighter text-on-background uppercase font-manrope neon-text-blue">PORTFOLIO</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Available for hire</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`relative text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.path ? 'text-primary' : 'text-on-surface-variant'}`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div layoutId="nav-glow" className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-primary shadow-[0_0_10px_var(--neon-glow)]" />
              )}
            </Link>
          ))}

          {user ? (
            <div className="flex items-center gap-6">
              <ThemeToggle />
              
              {/* Premium Profile Widget with Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 group focus:outline-none"
                >
                  <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-primary/50 to-secondary/50 group-hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all duration-500">
                    <div className="w-9 h-9 rounded-full bg-background flex items-center justify-center overflow-hidden border border-background">
                      {user.avatar ? (
                        <img src={user.avatar} alt="Profile" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      ) : (
                        <span className="text-xs font-black text-primary uppercase">{user.name?.charAt(0)}</span>
                      )}
                    </div>
                    {user.role === 'admin' && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-background flex items-center justify-center shadow-lg">
                        <span className="text-[6px] font-black text-background">AD</span>
                      </div>
                    )}
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-[9px] font-black uppercase tracking-widest text-primary leading-none mb-1 opacity-70">Member</p>
                    <p className="text-xs font-black text-on-background group-hover:text-primary transition-colors flex items-center gap-1">
                      {user.name?.split(' ')[0]}
                      <motion.span animate={{ rotate: isProfileOpen ? 180 : 0 }}>
                        <Grid size={10} className="opacity-40" />
                      </motion.span>
                    </p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <>
                      <div className="fixed inset-0 z-0" onClick={() => setIsProfileOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-4 w-64 glass-panel border border-outline rounded-3xl p-3 shadow-2xl z-10 backdrop-blur-2xl"
                      >
                        <div className="p-4 border-b border-outline/50 mb-2">
                          <p className="text-xs font-black text-on-background truncate">{user.name}</p>
                          <p className="text-[10px] text-on-surface-variant truncate font-medium">{user.email}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <Link 
                            to="/dashboard" 
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-primary/10 text-on-surface-variant hover:text-primary transition-all group/item"
                          >
                            <LayoutDashboard size={18} className="group-hover/item:scale-110 transition-transform" />
                            <span className="text-sm font-bold">My Dashboard</span>
                          </Link>

                          {user.role === 'admin' && (
                            <Link 
                              to="/admin" 
                              onClick={() => setIsProfileOpen(false)}
                              className="flex items-center gap-3 p-3 rounded-2xl hover:bg-primary/10 text-on-surface-variant hover:text-primary transition-all group/item"
                            >
                              <Settings size={18} className="group-hover/item:scale-110 transition-transform" />
                              <span className="text-sm font-bold">Admin Panel</span>
                            </Link>
                          )}

                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-red-500/10 text-on-surface-variant hover:text-red-500 transition-all group/item"
                          >
                            <LogOut size={18} className="group-hover/item:translate-x-1 transition-transform" />
                            <span className="text-sm font-bold">Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link to="/login" className="text-on-surface-variant hover:text-on-background transition-colors text-sm">Login</Link>
              <Link to="/signup" className="btn-primary py-2 px-6 text-sm">Get Started</Link>
            </div>
          )}
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            className="text-primary hover:text-white transition-colors p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

    </header>
    <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] md:hidden bg-background w-screen h-screen flex flex-col"
          >
            {/* Menu Header (Logo & Close) */}
            <div className="flex justify-between items-center px-6 py-6 border-b border-outline bg-background/80 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <Grid className="text-primary neon-text-blue" size={24} />
                <span className="text-lg font-black tracking-tighter text-on-background uppercase neon-text-blue">PORTFOLIO</span>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center text-on-background border border-outline shadow-xl"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col bg-background space-y-12">
              {/* Navigation Links */}
              <nav className="flex flex-col space-y-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="group flex items-center gap-6"
                    >
                      <span className="text-primary font-black text-lg opacity-40 group-hover:opacity-100 transition-opacity">
                        0{i + 1}
                      </span>
                      <span className="text-4xl sm:text-5xl font-black text-on-background tracking-tight group-hover:text-primary transition-all">
                        {link.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Action Section */}
              <div className="space-y-8 pb-10">
                <div className="h-px bg-outline opacity-30" />
                
                {user ? (
                  <div className="grid grid-cols-1 gap-4">
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between p-6 rounded-[2rem] bg-surface-variant border border-outline hover:border-primary/30 transition-all group"
                    >
                      <div className="flex items-center gap-5">
                        <div className="p-4 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background transition-all">
                          <LayoutDashboard size={26} />
                        </div>
                        <div>
                          <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mb-1">Account</p>
                          <p className="text-xl font-black text-on-background">My Dashboard</p>
                        </div>
                      </div>
                    </Link>

                    <div className="flex gap-4">
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex-1 flex flex-col items-center justify-center p-6 rounded-[2rem] bg-surface-variant border border-outline hover:border-primary/30 transition-all group"
                        >
                          <Settings size={30} className="text-primary mb-2" />
                          <span className="font-black text-xs uppercase tracking-widest">Admin</span>
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex-1 flex flex-col items-center justify-center p-6 rounded-[2rem] bg-red-500/5 border border-red-500/20 text-red-500 group hover:bg-red-500 hover:text-white transition-all"
                      >
                        <LogOut size={30} className="mb-2" />
                        <span className="font-black text-xs uppercase tracking-widest">Logout</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="btn-primary text-center py-6 rounded-[2rem] text-lg font-black tracking-widest">GET STARTED</Link>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-center py-6 text-on-background font-black border border-outline rounded-[2rem] bg-surface-variant hover:bg-outline/10 transition-all">LOGIN</Link>
                  </div>
                )}

                {/* Footer Info */}
                <div className="pt-8 border-t border-outline flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">Connect</p>
                    <p className="text-base font-bold text-on-background select-all">kmaheshachary34@gmail.com</p>
                  </div>
                  <div className="flex gap-4">
                    <a href="mailto:kmaheshachary34@gmail.com" className="w-12 h-12 rounded-full bg-surface-variant border border-outline flex items-center justify-center text-on-background hover:bg-primary hover:text-background transition-all shadow-lg">
                      <Mail size={22} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
