import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="w-full border-t border-outline bg-background/50 backdrop-blur-xl mt-12 md:mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 md:py-16 flex flex-col gap-10">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-black text-on-background mb-2 uppercase tracking-tighter neon-text-blue">
              K Mahesh Kumar Achary
            </h3>
            <p className="text-on-surface-variant max-w-xs mx-auto md:mx-0 text-sm">
              Pushing the boundaries of web development with high-performance SaaS solutions and creative designs.
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-6">
            <a href="https://github.com/Mahesh13247" target="_blank" rel="noreferrer" className="text-on-surface-variant hover:text-primary transition-all hover-lift">
              <span className="text-xs font-black uppercase tracking-widest">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/k-mahesh-kumar-achary-4a438b286/" target="_blank" rel="noreferrer" className="text-on-surface-variant hover:text-primary transition-all hover-lift">
              <span className="text-xs font-black uppercase tracking-widest">LinkedIn</span>
            </a>
            <a href="mailto:kmaheshachary34@gmail.com" className="text-on-surface-variant hover:text-neon-red transition-all hover-lift">
              <span className="text-xs font-black uppercase tracking-widest">Email</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-outline/50 pt-8">
          <span className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-[0.2em] text-center sm:text-left">
            © {new Date().getFullYear()} K Mahesh Kumar Achary • Crafted with Precision ❤️
          </span>

          <div className="flex gap-6">
            <Link to="/privacy" className="text-[10px] font-bold text-on-surface-variant/90 border border-[#39FF14]/40  rounded-full px-4 py-2 hover:text-primary uppercase tracking-widest transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-[10px] font-bold text-on-surface-variant/90 border border-[#39FF14]/40  rounded-full px-4 py-2 hover:text-primary uppercase tracking-widest transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
