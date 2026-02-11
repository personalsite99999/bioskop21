import React from 'react';
import { motion } from 'framer-motion';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  index: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative w-full aspect-[2/3] bg-black border border-white/10 hover:border-cyan-500 rounded-lg overflow-hidden cursor-pointer flex flex-col shadow-lg shadow-black/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300"
      onClick={() => onClick(movie)}
    >
      {/* --- BACKGROUND EFFECTS --- */}
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[length:20px_20px]" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/90" />

      {/* Animated Scanline (CSS) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(6,182,212,0.1)_50%)] bg-[length:100%_4px] transition-opacity duration-300" />

      {/* --- CONTENT --- */}
      <div className="relative z-10 flex flex-col h-full p-5 justify-between">
        
        {/* Top: Metadata */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-[10px] font-share-tech text-cyan-500 tracking-widest uppercase">
              ID-{movie.id.padStart(3, '0')}
            </span>
            <span className="text-xs font-bold text-gray-400 font-mono mt-1">
              {movie.year}
            </span>
          </div>
          <div className="bg-cyan-950/50 border border-cyan-500/30 px-2 py-1 rounded text-cyan-300 text-xs font-bold font-mono shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            ★ {movie.rating}
          </div>
        </div>

        {/* Center: Title */}
        <div className="flex-1 flex items-center justify-center my-2">
           <h3 className="text-xl md:text-2xl font-black text-center font-orbitron text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 group-hover:from-cyan-300 group-hover:to-white transition-all duration-300 leading-tight uppercase drop-shadow-sm">
             {movie.title}
           </h3>
        </div>

        {/* Bottom: Synopsis & Action */}
        <div className="flex flex-col gap-3">
          <p className="text-[10px] md:text-xs text-gray-400 font-share-tech line-clamp-3 leading-relaxed border-l-2 border-cyan-800 pl-2 opacity-80 group-hover:opacity-100 transition-opacity">
            {movie.synopsis}
          </p>
          
          <div className="w-full py-2 mt-1 bg-cyan-500/10 border border-cyan-500/50 hover:bg-cyan-500 hover:text-black text-cyan-400 text-xs font-bold tracking-widest uppercase rounded flex items-center justify-center gap-2 transition-all duration-300 font-orbitron">
            <span>STREAM</span>
            <span className="animate-pulse">▶</span>
          </div>
        </div>
      </div>

      {/* --- DECORATION --- */}
      {/* Corner Brackets */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity" />

    </motion.div>
  );
};

export default MovieCard;