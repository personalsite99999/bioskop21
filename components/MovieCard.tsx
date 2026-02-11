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
      transition={{ duration: 0.3, delay: index * 0.01 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="group relative w-full h-full cursor-pointer"
      onClick={() => onClick(movie)}
    >
      {/* Background Shell - Lebar & Tinggi Fleksibel */}
      <div className="flex flex-col h-full bg-[#080808] border border-cyan-500/20 rounded-md overflow-hidden group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300">
        
        {/* Animated Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_2px]" />
        
        {/* Top Header Label */}
        <div className="px-2 py-1 border-b border-cyan-500/10 flex justify-between items-center bg-cyan-950/20">
          <span className="text-[8px] font-share-tech text-cyan-600 tracking-tighter uppercase">Sector_{movie.id.padStart(3, '0')}</span>
          <div className="flex gap-0.5">
            <div className="w-1 h-1 rounded-full bg-pink-500/50" />
            <div className="w-1 h-1 rounded-full bg-cyan-500/50" />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-3 flex flex-col h-full gap-2">
          <div className="space-y-1">
            <h3 className="text-xs md:text-sm font-black font-orbitron text-white leading-tight group-hover:text-cyan-400 transition-colors uppercase line-clamp-2">
              {movie.title}
            </h3>
            
            <div className="flex items-center gap-2">
              <span className="text-pink-500 font-black font-share-tech text-[10px]">★ {movie.rating}</span>
              <div className="h-[1px] flex-1 bg-cyan-900/30" />
            </div>
          </div>

          <p className="text-[10px] text-gray-500 font-share-tech line-clamp-3 leading-snug italic opacity-70 group-hover:opacity-100 transition-opacity">
            {movie.synopsis}
          </p>

          <div className="mt-auto pt-2 flex items-center justify-between border-t border-cyan-500/5">
            <span className="text-[9px] font-share-tech text-cyan-900 uppercase">Year: {movie.year}</span>
            <div className="px-2 py-0.5 border border-cyan-500/20 text-cyan-500 font-orbitron text-[8px] font-black group-hover:bg-cyan-500 group-hover:text-black transition-all">
              EXECUTE
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-pink-500/20 group-hover:border-pink-500 transition-colors" />
      </div>

      {/* Subtle Glitch on Hover */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-[0.05] bg-cyan-400 transition-opacity" />
    </motion.div>
  );
};

export default MovieCard;
