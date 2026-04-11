
import React from 'react';
import { motion } from 'framer-motion';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  index: number;
}

const getGenreStyle = (genre: Movie['genre']) => {
  switch (genre) {
    case 'Action': return { border: 'border-red-500/40', text: 'text-red-400', bg: 'bg-red-500/10', glow: 'shadow-[0_0_20px_rgba(239,68,68,0.2)]', accent: 'bg-red-500' };
    case 'Horor': return { border: 'border-purple-500/40', text: 'text-purple-400', bg: 'bg-purple-500/10', glow: 'shadow-[0_0_20px_rgba(168,85,247,0.2)]', accent: 'bg-purple-500' };
    case 'Komedi': return { border: 'border-yellow-500/40', text: 'text-yellow-400', bg: 'bg-yellow-500/10', glow: 'shadow-[0_0_20px_rgba(234,179,8,0.2)]', accent: 'bg-yellow-500' };
    case 'Drama': return { border: 'border-blue-500/40', text: 'text-blue-400', bg: 'bg-blue-500/10', glow: 'shadow-[0_0_20px_rgba(59,130,246,0.2)]', accent: 'bg-blue-500' };
    case 'Sci-Fi': return { border: 'border-cyan-500/40', text: 'text-cyan-400', bg: 'bg-cyan-500/10', glow: 'shadow-[0_0_20px_rgba(6,182,212,0.2)]', accent: 'bg-cyan-500' };
    case 'Thriller': return { border: 'border-orange-500/40', text: 'text-orange-400', bg: 'bg-orange-500/10', glow: 'shadow-[0_0_20px_rgba(249,115,22,0.2)]', accent: 'bg-orange-500' };
    default: return { border: 'border-emerald-500/40', text: 'text-emerald-400', bg: 'bg-emerald-500/10', glow: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]', accent: 'bg-emerald-500' };
  }
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, index }) => {
  const style = getGenreStyle(movie.genre);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.005, 0.5) }}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="group relative w-full cursor-pointer h-full"
      onClick={() => onClick(movie)}
    >
      <div className={`flex flex-col h-full ${style.bg} border-2 ${style.border} rounded-2xl overflow-hidden transition-all duration-500 backdrop-blur-xl group-hover:border-white/40 ${style.glow}`}>
        
        {/* Neon Header */}
        <div className="px-3 py-1.5 flex justify-between items-center bg-black/60 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${style.accent} shadow-[0_0_8px_currentColor]`} />
            <span className={`text-[8px] font-black font-orbitron tracking-widest uppercase ${style.text}`}>
              {movie.genre}
            </span>
          </div>
          <span className="text-yellow-400 font-black font-orbitron text-[10px] shadow-[0_0_10px_rgba(250,204,21,0.3)]">★{movie.rating}</span>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2 flex-grow relative">
          {/* Decorative Corner */}
          <div className={`absolute top-0 right-0 w-8 h-8 ${style.accent}/10 rounded-bl-full pointer-events-none`} />
          
          <div>
            <h3 className="text-[11px] font-black font-orbitron text-white leading-tight uppercase group-hover:text-cyan-400 transition-colors line-clamp-2 tracking-tighter">
              {movie.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[9px] font-share-tech text-white/40 uppercase tracking-widest">{movie.year}</span>
              <div className="h-[1px] flex-grow bg-white/5" />
            </div>
          </div>
          
          <p className="text-[9px] font-share-tech text-gray-500 leading-tight italic line-clamp-1 group-hover:text-gray-300 transition-colors">
            {movie.actors}
          </p>
        </div>

        {/* Techno Footer */}
        <div className="mt-auto px-3 py-2 bg-black/60 flex items-center justify-between border-t border-white/10">
          <div className="flex items-center gap-2">
             <div className="flex gap-0.5">
               {[...Array(3)].map((_, i) => (
                 <div key={i} className={`w-1 h-2 ${style.accent} opacity-40`} />
               ))}
             </div>
             <span className="text-[8px] font-orbitron text-white/30 uppercase tracking-widest">Uplink_Ready</span>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href={movie.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`text-[8px] font-black font-orbitron px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors ${style.text} border border-white/5`}
            >
              NONTON_LANGSUNG
            </a>
            <motion.span 
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={`text-[10px] ${style.text} font-black font-orbitron`}
            >
              { ">>" }
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
