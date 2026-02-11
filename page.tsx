import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MovieCard from './components/MovieCard';
import { Movie } from './types';
import { movieData } from './data/movies';
import ReactPlayer from 'react-player';

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const Player = ReactPlayer as any;

  const filteredMovies = useMemo(() => {
    return movieData.filter(movie => 
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      movie.year.includes(searchQuery)
    );
  }, [searchQuery]);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="w-full max-w-[1600px] px-4 py-8 md:px-8 flex flex-col items-center">
      
      {/* --- HEADER --- */}
      <header className="w-full mb-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <h1 className="text-4xl md:text-7xl font-black font-orbitron tracking-tighter text-white drop-shadow-[0_0_15px_rgba(0,243,255,0.4)] animate-glitch">
            BIOSKOP<span className="text-pink-500">21</span>
          </h1>
          <div className="absolute -top-2 -right-10 px-2 py-0.5 bg-pink-600 text-white text-[8px] font-black font-share-tech -rotate-12 shadow-[0_0_10px_#ec4899]">
            MF_STATION
          </div>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-cyan-500 font-share-tech tracking-[0.3em] text-[10px] md:text-xs uppercase bg-black/40 px-3 py-1.5 border border-cyan-500/10 rounded"
        >
          [ STATUS: UPLINK_STABLE ] // {movieData.length} NODES_ACTIVE
        </motion.p>
      </header>

      {/* --- SEARCH --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl mb-12 relative group"
      >
        <div className="absolute inset-0 bg-cyan-500/5 rounded-md blur group-focus-within:bg-cyan-500/20 transition-all duration-300" />
        <div className="relative flex items-center bg-black/90 border border-cyan-500/30 rounded-md overflow-hidden backdrop-blur-md">
          <div className="pl-4 text-cyan-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="SCAN_DATA_BY_TITLE_OR_YEAR..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-cyan-400 placeholder-cyan-950 py-4 px-4 focus:outline-none font-share-tech text-base md:text-lg uppercase tracking-widest"
          />
        </div>
      </motion.div>

      {/* --- COMPACT GRID --- */}
      <AnimatePresence mode="popLayout">
        {filteredMovies.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 w-full"
          >
            {filteredMovies.map((movie, index) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                index={index} 
                onClick={handleMovieClick} 
              />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 flex flex-col items-center gap-4"
          >
            <div className="text-pink-700 text-6xl animate-pulse font-orbitron">VOID</div>
            <h3 className="text-xl font-orbitron text-white">FILE_NOT_FOUND</h3>
            <p className="text-cyan-900 font-share-tech uppercase text-xs tracking-widest">Mainframe database null. Coba keyword lain bre.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- STREAMING MODAL --- */}
      <AnimatePresence>
        {selectedMovie && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-xl p-3 md:p-10"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-6xl h-full max-h-[90vh] bg-[#050505] border border-cyan-500/30 rounded-xl overflow-hidden shadow-[0_0_80px_rgba(0,243,255,0.15)] flex flex-col"
            >
              {/* Header */}
              <div className="flex justify-between items-center px-4 py-3 border-b border-cyan-500/10 bg-cyan-950/10">
                <div className="flex flex-col">
                  <h2 className="text-lg md:text-2xl font-black font-orbitron text-white truncate max-w-[200px] md:max-w-xl uppercase">
                    {selectedMovie.title}
                  </h2>
                  <span className="text-[10px] font-share-tech text-cyan-600">STATION_UPLINK_001 // VERIFIED_SOURCE</span>
                </div>
                <button 
                  onClick={() => setSelectedMovie(null)}
                  className="px-3 py-1 border border-pink-500/50 text-pink-500 hover:bg-pink-500 hover:text-white rounded transition-all font-mono text-xs"
                >
                  [ CLOSE_STATION ]
                </button>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {/* Player Section */}
                <div className="relative aspect-video bg-black">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                     <div className="text-cyan-500 animate-pulse font-share-tech">ESTABLISHING_ENCRYPTED_STREAM...</div>
                  </div>
                  <Player
                    url={selectedMovie.driveUrl}
                    width="100%"
                    height="100%"
                    controls
                    playing
                    style={{ position: 'relative', zIndex: 1 }}
                  />
                </div>

                {/* Details Section */}
                <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-6">
                    <div className="space-y-2">
                      <h4 className="text-cyan-500 font-orbitron text-[10px] tracking-widest uppercase opacity-50 border-b border-cyan-500/10 pb-1 w-fit">Synopsis_Data</h4>
                      <p className="text-gray-300 font-share-tech text-lg leading-relaxed border-l-2 border-cyan-500/20 pl-4">
                        {selectedMovie.synopsis}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-pink-500 font-orbitron text-[10px] tracking-widest uppercase opacity-50 border-b border-pink-500/10 pb-1 w-fit">Actor_Registry</h4>
                      <p className="text-cyan-100 font-share-tech text-base italic">
                        {selectedMovie.actors}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-cyan-950/10 border border-cyan-500/10 p-4 rounded text-xs space-y-2">
                       <div className="flex justify-between items-center"><span className="text-cyan-900">YEAR</span><span className="text-white font-bold">{selectedMovie.year}</span></div>
                       <div className="flex justify-between items-center"><span className="text-cyan-900">RATING</span><span className="text-pink-500 font-bold">★ {selectedMovie.rating}</span></div>
                       <div className="flex justify-between items-center"><span className="text-cyan-900">ENCRYPTION</span><span className="text-green-500 font-mono">X-SECURED</span></div>
                    </div>

                    <a 
                      href={selectedMovie.driveUrl}
                      target="_blank"
                      className="w-full py-4 bg-gradient-to-r from-cyan-600 to-cyan-400 text-black font-black font-orbitron text-xs rounded hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all text-center flex items-center justify-center gap-2"
                    >
                      DIRECT_UPLINK <span>▶</span>
                    </a>
                    <p className="text-[8px] text-center text-gray-600 font-share-tech uppercase">Ad-Layer enabled via SafelinkU. Please wait for redirect.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-20 py-10 w-full border-t border-cyan-500/5 flex flex-col items-center gap-4">
        <p className="text-cyan-950 font-share-tech text-[10px] uppercase tracking-[0.5em]">
          BIOSKOP21 // TERMINAL_ID_AX-209 // SECURE_ACCESS_ONLY
        </p>
      </footer>

      {/* Fix: Using standard React style tag with dangerouslySetInnerHTML instead of non-standard 'jsx' and 'global' attributes */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #0891b2; border-radius: 2px; }
      ` }} />
    </div>
  );
}
