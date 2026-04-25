import { Lock, Unlock, ExternalLink, Code2, Eye, ArrowRight, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project, onUnlock }) => {
  const { user } = useAuth();
  const isUnlocked =
    user?.role === 'admin' ||
    user?.unlockedProjects?.includes(project.id) ||
    !project.isPremium;

  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="group relative bg-surface rounded-2xl border border-outline overflow-hidden flex flex-col shadow-lg hover:shadow-2xl hover:border-primary/30 transition-shadow duration-300"
    >
      {/* ── Thumbnail ── */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        {/* Top-left: Category */}
        <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white/80 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/10">
          {project.category || 'Project'}
        </span>

        {/* Top-right: Premium / Free */}
        <div className="absolute top-3 right-3">
          {project.isPremium ? (
            <span className="flex items-center gap-1 bg-primary text-background text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg">
              <Star size={9} fill="currentColor" /> Premium
            </span>
          ) : (
            <span className="bg-green-500 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg">
              Free
            </span>
          )}
        </div>

        {/* Bottom-left: Price tag */}
        {project.isPremium && (
          <span className="absolute bottom-3 left-3 text-xl font-black text-white drop-shadow-lg" style={{ textShadow: '0 0 20px rgba(57,255,20,0.7)' }}>
            ₹{project.price}
          </span>
        )}

        {/* Lock overlay */}
        {project.isPremium && !isUnlocked && (
          <div className="absolute inset-0 backdrop-blur-[2px] bg-black/25 flex items-center justify-center">
            <div className="bg-black/70 border border-primary/40 rounded-2xl px-4 py-3 flex flex-col items-center gap-1.5 shadow-2xl">
              <Lock size={20} className="text-primary" />
              <span className="text-[9px] font-black uppercase tracking-widest text-primary">Locked</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="p-5 flex-grow flex flex-col">

        {/* Tech pills */}
        <div className="flex gap-1.5 mb-3 flex-wrap">
          {(project.techStack || []).slice(0, 4).map(tech => (
            <span key={tech} className="bg-surface-variant text-on-surface-variant text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md border border-outline">
              {tech}
            </span>
          ))}
          {(project.techStack || []).length > 4 && (
            <span className="text-[9px] text-on-surface-variant/60 font-bold self-center">
              +{project.techStack.length - 4} more
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-black text-on-background mb-1.5 leading-snug group-hover:text-primary transition-colors line-clamp-1">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2 flex-grow mb-4">
          {project.description}
        </p>

        {/* ── Action Buttons ── */}
        <div className="space-y-2 mt-auto">

          {/* View Details — always visible */}
          <Link
            to={`/projects/${project.id}`}
            className="flex items-center justify-between w-full bg-surface-variant/60 hover:bg-primary/10 border border-outline hover:border-primary/50 text-on-surface-variant hover:text-primary text-xs font-black px-4 py-2.5 rounded-xl transition-all duration-200 group/link"
          >
            <span className="flex items-center gap-2">
              <Eye size={13} />
              View Full Details
            </span>
            <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
          </Link>

          {/* Unlock or action links */}
          {isUnlocked ? (
            <div className="flex gap-2">
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-outline text-on-surface-variant hover:text-primary hover:border-primary/40 text-xs font-bold transition-all"
                >
                  <ExternalLink size={11} /> Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-outline text-on-surface-variant hover:text-primary hover:border-primary/40 text-xs font-bold transition-all"
                >
                  <Code2 size={11} /> Code
                </a>
              )}
              {project.downloadUrl && user?.role !== 'admin' && (
                <a
                  href={project.downloadUrl}
                  className="flex-1 btn-primary py-2 text-xs text-center"
                >
                  Download
                </a>
              )}
            </div>
          ) : (
            <button
              onClick={() => onUnlock(project)}
              className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 text-sm font-black group/unlock"
            >
              <Unlock size={14} className="group-hover/unlock:rotate-12 transition-transform" />
              Unlock — ₹{project.price}
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
