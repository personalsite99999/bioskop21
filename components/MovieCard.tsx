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
    case 'Action': return { border: 'border-red-500/30', text: 'text-red-400', bg: 'bg-red-500/5', glow: 'shadow-[0_0_10px_rgba(239,68,68,0.2)]' };
    case 'Horor': return { border: 'border-purple-500/30', text: 'text-purple-400', bg: 'bg-purple-500/5', glow: 'shadow-[0_0_10px_rgba(168,85,247,0.2)]' };
    case 'Komedi': return { border: 'border-yellow-500/30', text: 'text-yellow-400', bg: 'bg-yellow-500/5', glow: 'shadow-[0_0_10px_rgba(234,179,8,0.2)]' };
    case 'Drama': return { border: 'border-blue-500/30', text: 'text-blue-400', bg: 'bg-blue-500/5', glow: 'shadow-[0_0_10px_rgba(59,130,246,0.2)]' };
    case 'Sci-Fi': return { border: 'border-cyan-500/30', text: 'text-cyan-400', bg: 'bg-cyan-500/5', glow: 'shadow-[0_0_10px_rgba(6,182,212,0.2)]' };
    case 'Thriller': return { border: 'border-orange-500/30', text: 'text-orange-400', bg: 'bg-orange-500/5', glow: 'shadow-[0_0_10px_rgba(249,115,22,0.2)]' };
    default: return { border: 'border-green-500/30', text: 'text-green-400', bg: 'bg-green-500/5', glow: 'shadow-[0_0_10px_rgba(34,197,94,0.2)]' };
  }
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, index }) => {
  const style = getGenreStyle(movie.genre);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.005, 0.4) }}
      whileTap={{ scale: 0.96 }}
      className="group relative w-full cursor-pointer h-full"
      onClick={() => onClick(movie)}
    >
      {/* Techno Frame */}
      <div className={`flex flex-col h-full ${style.bg} border ${style.border} rounded-lg overflow-hidden transition-all duration-300 backdrop-blur-sm group-hover:border-white/40 ${style.glow}`}>
        
        {/* Animated Scanning Line (Only on Hover) */}
        <div className="absolute inset-0 w-full h-[1px] bg-white/20 -translate-y-full group-hover:animate-[scan_1.5s_linear_infinite] pointer-events-none z-20" />
        
        {/* Header Label */}
        <div className="px-2 py-1 border-b border-white/5 flex justify-between items-center bg-black/40">
          <span className={`text-[7px] font-orbitron font-bold tracking-widest uppercase ${style.text}`}>{movie.genre}</span>
          <span className="text-yellow-400 font-bold font-share-tech text-[9px]">★ {movie.rating}</span>
        </div>

        {/* Content Body */}
        <div className="p-3 flex flex-col gap-1.5 flex-grow">
          <h3 className="text-[12px] font-black font-orbitron text-white leading-tight uppercase group-hover:text-white transition-colors">
            {movie.title} <span className="text-gray-500 font-share-tech font-normal text-[10px]">({movie.year})</span>
          </h3>
          
          <div className="space-y-1">
            <p className="text-[9px] font-share-tech text-gray-400 line-clamp-2 leading-relaxed group-hover:text-gray-300">
              {movie.synopsis}
            </p>
            <p className="text-[8px] font-share-tech text-gray-600 truncate uppercase tracking-tighter">
              {movie.actors}
            </p>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-auto px-2 py-1 bg-black/20 flex items-center justify-between border-t border-white/5">
          <div className="flex items-center gap-1">
             <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
             <span className="text-[7px] font-share-tech text-green-700 uppercase">ONLINE</span>
          </div>
          <span className="text-[6px] text-gray-700 font-share-tech">NODE_{movie.id}</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      ` }} />
    </motion.div>
  );
};

export default MovieCard;