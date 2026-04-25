import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Grid, LogOut, User, LayoutDashboard, Settings, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
      <div className="flex justify-between items-center px-6 py-4 max-w-[1200px] mx-auto w-full">
        <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsMenuOpen(false)}>
          <Grid className="text-primary group-hover:rotate-90 transition-transform duration-500 neon-text-blue" size={24} />
          <span className="text-lg font-bold tracking-tighter text-slate-50 uppercase font-manrope neon-text-blue">PORTFOLIO</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map(link => (
            <Link key={link.name} to={link.path} className="text-slate-400 hover:text-[#e60000] transition-colors font-medium text-sm">
              {link.name}
            </Link>
          ))}

          {user ? (
            <div className="flex items-center gap-6">
              <Link to="/dashboard" className="text-slate-400 hover:text-[#7DF9FF] transition-colors font-medium flex items-center gap-2 text-sm">
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-slate-400 hover:text-[#7DF9FF] transition-colors font-medium flex items-center gap-2 text-sm">
                  <Settings size={18} /> Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-red-400 transition-colors flex items-center gap-2"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-slate-400 hover:text-slate-50 transition-colors text-sm">Login</Link>
              <Link to="/signup" className="btn-primary py-2 px-6 text-sm">Get Started</Link>
            </div>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-white transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-[73px] left-0 w-full bg-slate-900 border-b border-slate-700/50 p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-xl font-bold text-slate-300 hover:text-blue-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <div className="flex flex-col gap-6 pt-6 border-t border-slate-800">
              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 text-xl font-bold text-slate-300"
              >
                <LayoutDashboard size={24} className="text-blue-500" /> Dashboard
              </Link>
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 text-xl font-bold text-slate-300"
                >
                  <Settings size={24} className="text-blue-500" /> Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 text-xl font-bold text-red-400"
              >
                <LogOut size={24} /> Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 pt-6 border-t border-slate-800">
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-center py-3 text-slate-300 font-bold border border-slate-700 rounded-xl">Login</Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="btn-primary text-center py-3">Get Started</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
