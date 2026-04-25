import { motion } from 'framer-motion';

const SkeletonCard = () => {
  return (
    <div className="bg-surface rounded-2xl border border-outline overflow-hidden flex flex-col shadow-lg animate-pulse">
      {/* Thumbnail Skeleton */}
      <div className="relative h-48 bg-surface-variant/50" />
      
      {/* Body Skeleton */}
      <div className="p-5 flex-grow flex flex-col gap-4">
        {/* Tech pills skeleton */}
        <div className="flex gap-1.5 flex-wrap">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-12 h-4 bg-surface-variant/40 rounded-md" />
          ))}
        </div>

        {/* Title skeleton */}
        <div className="w-3/4 h-6 bg-surface-variant/60 rounded-lg" />

        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="w-full h-3 bg-surface-variant/30 rounded-md" />
          <div className="w-5/6 h-3 bg-surface-variant/30 rounded-md" />
        </div>

        {/* Button skeleton */}
        <div className="mt-auto space-y-2">
          <div className="w-full h-10 bg-surface-variant/50 rounded-xl" />
          <div className="w-full h-10 bg-surface-variant/40 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
