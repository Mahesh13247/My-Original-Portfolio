import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Grid, LogOut, User, LayoutDashboard, Settings, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

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
    { name: 'About', path: '/#about' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-outline">
      <div className="flex justify-between items-center px-4 sm:px-6 py-4 max-w-[1200px] mx-auto w-full">
        <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsMenuOpen(false)}>
          <Grid className="text-primary group-hover:rotate-90 transition-transform duration-500 neon-text-blue" size={24} />
          <span className="text-lg font-bold tracking-tighter text-on-background uppercase font-manrope neon-text-blue">PORTFOLIO</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map(link => (
            <Link key={link.name} to={link.path} className="text-on-surface-variant hover:text-primary transition-colors font-medium text-sm">
              {link.name}
            </Link>
          ))}

          {user ? (
            <div className="flex items-center gap-6">
              <ThemeToggle />
              <Link to="/dashboard" className="text-on-surface-variant hover:text-primary transition-colors font-medium flex items-center gap-2 text-sm">
                <LayoutDashboard size={18} className="text-primary" /> Dashboard
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-on-surface-variant hover:text-primary transition-colors font-medium flex items-center gap-2 text-sm">
                  <Settings size={18} className="text-primary" /> Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-on-surface-variant hover:text-red-400 transition-colors flex items-center gap-2"
              >
                <LogOut size={18} />
              </button>
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
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden sticky top-0 z-20 flex flex-col gap-5 bg-background border-b border-outline p-6 shadow-xl">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-xl font-black text-on-background hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <div className="flex flex-col gap-6 pt-6 border-t border-outline">
              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 text-xl font-black text-on-background hover:text-primary transition-colors"
              >
                <LayoutDashboard size={24} className="text-primary" /> Dashboard
              </Link>
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 text-xl font-black text-on-background hover:text-primary transition-colors"
                >
                  <Settings size={24} className="text-primary" /> Admin
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
            <div className="flex flex-col gap-4 pt-6 border-t border-outline">
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-center py-3 text-on-background font-bold border border-outline rounded-xl">Login</Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="btn-primary text-center py-3">Get Started</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
