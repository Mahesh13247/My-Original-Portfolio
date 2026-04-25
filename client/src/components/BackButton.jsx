import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const BackButton = ({ className = '', to = -1, text = 'Back' }) => {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => (to === -1 ? navigate(-1) : navigate(to))}
      className={`group flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-variant/80 border border-outline hover:border-primary/40 text-on-surface-variant hover:text-primary transition-all duration-300 backdrop-blur-md shadow-lg ${className}`}
    >
      <div className="p-1 rounded-lg bg-background group-hover:bg-primary/10 transition-colors">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
      </div>
      <span className="text-sm font-bold tracking-tight">{text}</span>
    </motion.button>
  );
};

export default BackButton;
