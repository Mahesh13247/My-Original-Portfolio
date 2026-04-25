import { motion } from 'framer-motion';
import { Grid } from 'lucide-react';

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center"
    >
      <div className="relative">
        {/* Outer rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-24 h-24 rounded-full border-2 border-primary/20 border-t-primary shadow-[0_0_20px_rgba(57,255,20,0.2)]"
        />
        
        {/* Middle pulsing ring */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 w-24 h-24 rounded-full bg-primary/5 blur-xl"
        />

        {/* Center Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Grid className="text-primary neon-text-blue" size={32} />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex flex-col items-center gap-2"
      >
        <span className="text-sm font-black uppercase tracking-[0.3em] text-primary neon-text-blue">
          Loading Experience
        </span>
        <div className="w-48 h-[1px] bg-outline relative overflow-hidden">
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-primary shadow-[0_0_10px_var(--neon-glow)]"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
