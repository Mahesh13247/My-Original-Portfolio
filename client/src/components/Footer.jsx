const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-900 bg-slate-950 mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center py-12 px-8 max-w-7xl mx-auto w-full gap-8">
        <span className="text-sm font-bold text-slate-400 font-manrope uppercase tracking-widest">
          © {new Date().getFullYear()} K Mahesh Achary. All rights reserved.
        </span>
        <nav className="flex gap-6">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-primary transition-colors uppercase tracking-widest text-xs">LinkedIn</a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-primary transition-colors uppercase tracking-widest text-xs">GitHub</a>
          <a href="mailto:kmaheshachary34@gmail.com" className="text-slate-500 hover:text-primary transition-colors uppercase tracking-widest text-xs">Contact</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
