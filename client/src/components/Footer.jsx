import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-900 bg-slate-950 mt-12 md:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 md:py-12 flex flex-col gap-6">
        {/* Brand */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-sm font-black text-slate-400 font-manrope uppercase tracking-widest text-center sm:text-left">
            © {new Date().getFullYear()} K Mahesh Kumar Achary. <br /> All rights reserved.
          </span>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/k-mahesh-kumar-achary-4a438b286/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest"
            >
              LinkedIn
            </a>
            <span className="text-slate-800">|</span>
            <a
              href="https://github.com/Mahesh13247"
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest"
            >
              GitHub
            </a>
            <span className="text-slate-800">|</span>
            <a
              href="mailto:kmaheshachary34@gmail.com"
              className="text-slate-500 hover:text-neon-red transition-colors text-xs font-bold uppercase tracking-widest"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Legal links */}
        <div className="flex flex-wrap justify-center sm:justify-end gap-4 border-t border-slate-900 pt-6">
          <Link
            to="/privacy"
            className="text-slate-600 hover:text-primary transition-colors text-[10px] uppercase tracking-widest font-bold"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="text-slate-600 hover:text-primary transition-colors text-[10px] uppercase tracking-widest font-bold"
          >
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
