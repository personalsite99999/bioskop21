
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
    case 'Action': return { border: 'border-red-500/20', text: 'text-red-400', bg: 'bg-red-500/5', glow: 'shadow-[0_0_15px_rgba(239,68,68,0.1)]' };
    case 'Horor': return { border: 'border-purple-500/20', text: 'text-purple-400', bg: 'bg-purple-500/5', glow: 'shadow-[0_0_15px_rgba(168,85,247,0.1)]' };
    case 'Komedi': return { border: 'border-yellow-500/20', text: 'text-yellow-400', bg: 'bg-yellow-500/5', glow: 'shadow-[0_0_15px_rgba(234,179,8,0.1)]' };
    case 'Drama': return { border: 'border-blue-500/20', text: 'text-blue-400', bg: 'bg-blue-500/5', glow: 'shadow-[0_0_15px_rgba(59,130,246,0.1)]' };
    case 'Sci-Fi': return { border: 'border-cyan-500/20', text: 'text-cyan-400', bg: 'bg-cyan-500/5', glow: 'shadow-[0_0_15px_rgba(6,182,212,0.1)]' };
    case 'Thriller': return { border: 'border-orange-500/20', text: 'text-orange-400', bg: 'bg-orange-500/5', glow: 'shadow-[0_0_15_rgba(249,115,22,0.1)]' };
    default: return { border: 'border-emerald-500/20', text: 'text-emerald-400', bg: 'bg-emerald-500/5', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.1)]' };
  }
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, index }) => {
  const style = getGenreStyle(movie.genre);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.005, 0.4) }}
      whileTap={{ scale: 0.96 }}
      className="group relative w-full cursor-pointer h-full"
      onClick={() => onClick(movie)}
    >
      <div className={`flex flex-col h-full ${style.bg} border ${style.border} rounded-xl overflow-hidden transition-all duration-300 backdrop-blur-md group-hover:border-white/20 ${style.glow}`}>
        
        {/* Header */}
        <div className="px-2 py-1 flex justify-between items-center bg-black/40 border-b border-white/5">
          <span className={`text-[7px] font-black font-orbitron tracking-tighter uppercase ${style.text}`}>
            {movie.genre}
          </span>
          <span className="text-yellow-400 font-bold font-share-tech text-[9px]">★{movie.rating}</span>
        </div>

        {/* Content */}
        <div className="p-2.5 space-y-1.5 flex-grow">
          <div>
            <h3 className="text-[10px] font-black font-orbitron text-white leading-tight uppercase group-hover:text-emerald-400 transition-colors line-clamp-2">
              {movie.title}
            </h3>
            <span className="text-[8px] font-share-tech text-emerald-900 uppercase tracking-tighter">{movie.year}</span>
          </div>
          
          <div className="space-y-1">
            <p className="text-[8px] font-share-tech text-emerald-600 leading-tight italic line-clamp-1">
              {movie.actors}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto px-2 py-1 bg-black/40 flex items-center justify-between border-t border-white/5">
          <div className="flex items-center gap-1">
             <div className="w-1 h-1 rounded-full bg-emerald-500/50 animate-pulse" />
             <span className="text-[7px] font-share-tech text-emerald-900 uppercase">READY</span>
          </div>
          <span className="text-[8px] text-emerald-900 font-orbitron">{ " >> " }</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
