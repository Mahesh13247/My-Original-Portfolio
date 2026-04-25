import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const FloatingScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[100] p-4 rounded-2xl bg-primary text-background shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_35px_rgba(57,255,20,0.7)] transition-all group overflow-hidden"
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
          <ArrowUp size={24} className="relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingScrollToTop;
