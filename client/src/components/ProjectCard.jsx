import { Lock, Unlock, ExternalLink, Code2, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, onUnlock }) => {
  const { user } = useAuth();
  const isUnlocked = user?.role === 'admin' || user?.unlockedProjects?.includes(project.id) || !project.isPremium;

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group relative bg-surface rounded-2xl border border-outline overflow-hidden transition-all duration-500 flex flex-col shadow-2xl hover:neon-border-blue hover-lift card-shine"
    >
      <div className="relative h-44 sm:h-52 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
        
        {project.isPremium && !isUnlocked && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-300">
            <div className="bg-surface/80 p-4 rounded-2xl border border-primary/20 flex flex-col items-center gap-2 shadow-2xl">
              <Lock className="text-primary neon-text-blue" size={24} />
              <span className="text-xs font-bold uppercase tracking-widest text-primary neon-text-blue">Premium</span>
            </div>
          </div>
        )}

        <div className="absolute top-4 right-4 flex gap-2">
          <div className="bg-surface-variant/80 px-3 py-1 rounded-full border border-outline text-xs flex items-center gap-1">
            <Eye size={12} /> {project.views}
          </div>
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <div className="flex gap-2 mb-4 flex-wrap">
          {project.techStack.map(tech => (
            <span key={tech} className="bg-primary/5 text-primary text-[9px] sm:text-[10px] uppercase tracking-widest font-black px-2 py-1 rounded-md border border-primary/10">
              {tech}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-bold text-on-background mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-on-surface-variant mb-6 flex-grow line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-col gap-4 mt-auto">
          {project.liveDemoUrl && !isUnlocked && (
            <a 
              href={project.liveDemoUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center justify-center gap-2 text-sm font-medium text-on-surface-variant hover:text-primary transition-all group/demo"
            >
              <Eye size={16} className="group-hover/demo:scale-110 transition-transform" />
              View Live Demo
            </a>
          )}
          
          <div className="flex items-center justify-between">
            {isUnlocked ? (
              <div className="flex gap-4 items-center w-full">
                {project.liveDemoUrl && (
                  <a href={project.liveDemoUrl} target="_blank" rel="noreferrer" className="text-on-background hover:text-primary transition-colors flex items-center gap-2 text-sm">
                    <ExternalLink size={18} /> Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-on-background hover:text-primary transition-colors flex items-center gap-2 text-sm">
                    <Code2 size={18} /> Code
                  </a>
                )}
                {project.downloadUrl && (
                  <a href={project.downloadUrl} className="btn-primary py-1 px-4 text-xs ml-auto">Download</a>
                )}
              </div>
            ) : (
              <button 
                onClick={() => onUnlock(project)}
                className="btn-primary w-full flex items-center justify-center gap-2 group/unlock"
              >
                <Unlock size={18} className="group-hover/unlock:rotate-12 transition-transform" />
                Unlock for ₹{project.price}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
