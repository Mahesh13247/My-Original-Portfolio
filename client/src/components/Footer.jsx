import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-900 bg-slate-950 mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center py-12 px-8 max-w-7xl mx-auto w-full gap-8">
        <span className="text-sm font-bold text-slate-400 font-manrope uppercase tracking-widest">
          © {new Date().getFullYear()} K Mahesh Achary. All rights reserved.
        </span>
        <nav className="flex flex-wrap justify-center gap-6">
          <Link to="/privacy" className="text-slate-500 hover:text-[#7DF9FF] transition-colors uppercase tracking-widest text-[10px] font-bold">Privacy Policy</Link>
          <Link to="/terms" className="text-slate-500 hover:text-[#7DF9FF] transition-colors uppercase tracking-widest text-[10px] font-bold">Terms & Conditions</Link>
          <a href="https://www.linkedin.com/in/k-mahesh-kumar-achary-4a438b286/" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-[#00FF00] transition-colors uppercase tracking-widest text-[10px] font-bold">LinkedIn</a>
          <a href="https://github.com/Mahesh13247" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-[#00FF00] transition-colors uppercase tracking-widest text-[10px] font-bold">GitHub</a>
          <a href="mailto:kmaheshachary34@gmail.com" className="text-slate-500 hover:text-[#e60000] transition-colors uppercase tracking-widest text-[10px] font-bold">Contact</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
