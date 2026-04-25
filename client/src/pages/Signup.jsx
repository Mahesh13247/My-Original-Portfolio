import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData.name, formData.email, formData.password);
      toast.success('Account created successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="glass-panel max-w-md w-full p-6 sm:p-10 rounded-3xl space-y-6 sm:space-y-8 border border-slate-800 shadow-[0_0_40px_rgba(57,255,20,0.05)]">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-manrope">Join the Platform</h2>
          <p className="text-on-surface-variant mt-2">Unlock your potential with premium projects.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl pl-12 pr-4 py-3 focus:border-primary outline-none transition-all duration-300 text-slate-50 placeholder:text-slate-600 focus:shadow-[0_0_10px_rgba(57,255,20,0.15)]"
                placeholder="Please Enter Your Name ❤️"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl pl-12 pr-4 py-3 focus:border-primary outline-none transition-all duration-300 text-slate-50 placeholder:text-slate-600 focus:shadow-[0_0_10px_rgba(57,255,20,0.15)]"
                placeholder="Please Enter Your Email Address 😁"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl pl-12 pr-4 py-3 focus:border-primary outline-none transition-all duration-300 text-slate-50 placeholder:text-slate-600 focus:shadow-[0_0_10px_rgba(57,255,20,0.15)]"
                placeholder="Please Enter Your Password 🫣"
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full py-4 flex items-center justify-center gap-2 group">
            Create Account <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">Sign In ☠️</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
