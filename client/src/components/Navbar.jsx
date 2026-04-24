import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Grid, LogOut, User, LayoutDashboard, Settings } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
      <div className="flex justify-between items-center px-6 py-4 max-w-[1200px] mx-auto w-full">
        <Link to="/" className="flex items-center gap-3 group">
          <Grid className="text-blue-500 group-hover:rotate-90 transition-transform duration-500" size={24} />
          <span className="text-lg font-bold tracking-tighter text-slate-50 uppercase font-manrope">PORTFOLIO</span>
        </Link>

        <nav className="hidden md:flex gap-8 items-center">
          <Link to="/" className="text-slate-400 hover:text-blue-400 transition-colors font-medium">Home</Link>
          <Link to="/projects" className="text-slate-400 hover:text-blue-400 transition-colors font-medium">Projects</Link>
          
          {user ? (
            <div className="flex items-center gap-6">
              <Link to="/dashboard" className="text-slate-400 hover:text-blue-400 transition-colors font-medium flex items-center gap-2">
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-slate-400 hover:text-blue-400 transition-colors font-medium flex items-center gap-2">
                  <Settings size={18} /> Admin
                </Link>
              )}
              <button 
                onClick={handleLogout}
                className="text-slate-400 hover:text-error transition-colors flex items-center gap-2"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-slate-400 hover:text-slate-50 transition-colors">Login</Link>
              <Link to="/signup" className="btn-primary py-2 px-6">Get Started</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
