
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MovieCard from './components/MovieCard';
import { Movie } from './types';
import { movieData } from './data/movies';
import ReactPlayer from 'react-player';

const CATEGORIES: Movie['genre'][] = ['Action', 'Horor', 'Komedi', 'Drama', 'Sci-Fi', 'Thriller'];

const DONATION_LOGOS = [
  { name: 'SHOPEEPAY', color: 'bg-orange-600', label: 'SPAY' },
  { name: 'OVO', color: 'bg-purple-700', label: 'OVO' },
  { name: 'GOPAY', color: 'bg-blue-600', label: 'GOPAY' },
  { name: 'DANA', color: 'bg-sky-600', label: 'DANA' }
];

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Movie['genre'] | 'ALL'>('ALL');

  const Player = ReactPlayer as any;

  const filteredMovies = useMemo(() => {
    return movieData.filter(movie => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = movie.title.toLowerCase().includes(query) || 
                           movie.actors.toLowerCase().includes(query) ||
                           movie.year.includes(query);
      const matchesCategory = activeCategory === 'ALL' || movie.genre === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen w-full flex justify-center bg-transparent">
      {/* ANDROID DEVICE WRAPPER */}
      <div className="w-full max-w-md bg-black/90 backdrop-blur-md min-h-screen flex flex-col shadow-[0_0_100px_rgba(0,0,0,1)] relative border-x border-white/5">
        
        {/* --- STICKY TOP SECTION --- */}
        <div className="sticky top-0 z-[100] bg-black/80 backdrop-blur-xl border-b border-white/10">
          {/* Status Bar Spacer */}
          <div className="h-6" />
          
          <header className="px-6 pb-4 space-y-4">
            {/* Header Top Row */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img 
                  src="https://josanvin.github.io/josanvin/img/bioskop21.jpg" 
                  alt="Logo" 
                  className="w-8 h-8 rounded-lg border border-white/10 shadow-lg shadow-green-500/20"
                />
                <h1 className="text-xl font-black font-orbitron tracking-tighter text-white italic uppercase">
                  BIOSKOP<span className="text-green-500 inline-block transform -rotate-12 ml-1">21</span>
                </h1>
              </div>
              <div className="flex gap-1 items-center">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                 <span className="text-[7px] font-orbitron text-gray-500 tracking-widest uppercase">Live</span>
              </div>
            </div>

            {/* Search Bar Row */}
            <div className="relative group">
              <input
                type="text"
                placeholder="Cari Judul atau Pemeran..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0c0c0c] border border-white/10 rounded-xl py-2.5 px-10 text-[10px] font-share-tech text-white focus:outline-none focus:border-green-500 transition-all placeholder-gray-800"
              />
              <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-800 group-focus-within:text-green-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </header>

          {/* --- PERMANENT TOP CATEGORY NAV (NO SPACE) --- */}
          <nav className="flex border-t border-white/5 bg-black/40 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveCategory('ALL')}
              className={`px-4 py-3 text-[8px] font-black font-orbitron transition-all whitespace-nowrap border-r border-white/5 shrink-0 uppercase tracking-tighter flex-1 ${
                activeCategory === 'ALL' ? 'bg-white text-black' : 'bg-transparent text-gray-600'
              }`}
            >
              ALL
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-3 text-[8px] font-black font-orbitron transition-all whitespace-nowrap border-r border-white/5 last:border-0 shrink-0 uppercase tracking-tighter flex-1 ${
                  activeCategory === cat ? 'bg-green-500 text-black' : 'bg-transparent text-gray-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>

        {/* SCROLLABLE FEED - Split 2-Column Grid */}
        <main className="flex-grow overflow-y-auto no-scrollbar p-3 pt-6 space-y-10 pb-12">
          <AnimatePresence mode="popLayout">
            {filteredMovies.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {filteredMovies.map((movie, index) => (
                  <MovieCard 
                    key={movie.id} 
                    movie={movie} 
                    index={index} 
                    onClick={setSelectedMovie} 
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 opacity-20 col-span-2">
                <div className="w-12 h-12 border border-dashed border-white rounded-full animate-spin-slow mb-4" />
                <p className="font-orbitron text-[8px] uppercase tracking-[0.5em] text-white">Null_Data</p>
              </div>
            )}
          </AnimatePresence>

          {/* Request Button */}
          <section className="bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 p-6 rounded-[2rem] text-center space-y-4 shadow-xl">
            <div className="space-y-1">
              <h4 className="text-[10px] font-black font-orbitron text-green-500 uppercase tracking-widest">Request Terminal</h4>
              <p className="text-[11px] font-share-tech text-gray-500 leading-tight">Film tidak ditemukan? Hubungi admin.</p>
            </div>
            <a 
              href="https://wa.me/6281341300100" 
              target="_blank" 
              className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-3 rounded-xl font-black font-orbitron text-[11px] active:scale-95 transition-all uppercase tracking-widest shadow-lg"
            >
              WHATSAPP
            </a>
          </section>

          {/* Donation Display */}
          <section className="bg-white/[0.02] border border-white/10 p-6 rounded-[2rem] space-y-6">
            <div className="text-center space-y-2">
              <h4 className="text-[11px] font-black font-orbitron text-emerald-400 uppercase tracking-widest">Donasi</h4>
              <p className="text-[11px] font-share-tech text-gray-400 italic leading-tight">"Jika menarik boleh donasi via ewallet di bawah ini"</p>
              <p className="text-lg font-black text-white font-orbitron tracking-tighter">Johan (0813-41-300-100)</p>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {DONATION_LOGOS.map(logo => (
                <div key={logo.name} className="flex flex-col items-center">
                  <div className={`w-full aspect-square rounded-xl ${logo.color} flex items-center justify-center border border-white/5 shadow-lg active:scale-90 transition-all`}>
                    <span className="text-white font-black text-[9px] font-orbitron">{logo.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Copyright Footer */}
          <footer className="text-center py-8 space-y-3">
            <div className="w-8 h-[1px] bg-white/10 mx-auto" />
            <p className="text-[10px] font-share-tech text-gray-500 uppercase tracking-wider">
              Copyright©2026 - Johan [081341300100]
            </p>
          </footer>
        </main>

        {/* --- FULL SCREEN STREAMING OVERLAY --- */}
        <AnimatePresence>
          {selectedMovie && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/98 backdrop-blur-lg"
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                className="relative w-full max-w-md h-full bg-black flex flex-col"
              >
                {/* Back Button */}
                <button 
                  onClick={() => setSelectedMovie(null)}
                  className="absolute top-10 left-8 z-[10] w-12 h-12 rounded-full bg-white/5 backdrop-blur-3xl flex items-center justify-center border border-white/10 shadow-2xl active:scale-90 transition-all"
                >
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex-grow overflow-y-auto no-scrollbar pt-28 pb-12">
                  <div className="aspect-video bg-[#020202] border-y border-white/5 flex items-center justify-center relative shadow-[0_0_60px_rgba(0,0,0,1)]">
                    <Player
                      url={selectedMovie.driveUrl}
                      width="100%"
                      height="100%"
                      controls
                      playing
                    />
                    <div className="absolute top-4 right-6 px-3 py-1 bg-green-500 text-black text-[10px] font-black rounded-lg uppercase font-orbitron shadow-[0_0_15px_#22c55e]">SIGNAL_LIVE</div>
                  </div>

                  <div className="p-10 space-y-12">
                    <div className="space-y-4">
                      <div className="flex gap-2 items-center">
                         <span className="bg-green-500 text-black font-black text-[10px] px-3 py-1 rounded-lg uppercase font-orbitron tracking-tighter shadow-lg shadow-green-500/20">HD_UPLINK</span>
                         <span className="text-emerald-500 font-bold text-xs uppercase font-share-tech tracking-[0.5em]">{selectedMovie.genre}</span>
                      </div>
                      <h2 className="text-3xl font-black font-orbitron text-white leading-tight uppercase tracking-tighter">
                        {selectedMovie.title}
                      </h2>
                      <div className="flex items-center gap-8 text-[12px] font-share-tech text-gray-500 uppercase tracking-widest">
                         <span className="flex items-center gap-2"><span className="text-gray-800">YEAR:</span> {selectedMovie.year}</span>
                         <span className="flex items-center gap-2"><span className="text-gray-800">SCORE:</span> <span className="text-yellow-500 font-bold">★ {selectedMovie.rating}</span></span>
                      </div>
                    </div>

                    <div className="space-y-10">
                      <div className="space-y-4">
                        <h4 className="text-[11px] font-black font-orbitron text-white/20 uppercase tracking-[0.5em]">Cast_Registry</h4>
                        <div className="bg-emerald-500/[0.03] p-6 rounded-[2rem] border border-emerald-500/10">
                           <p className="text-emerald-400 font-share-tech text-lg leading-relaxed tracking-wide italic">
                             {selectedMovie.actors}
                           </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-[11px] font-black font-orbitron text-white/20 uppercase tracking-[0.5em]">Mission_Log</h4>
                        <p className="text-gray-400 font-share-tech text-xl leading-relaxed italic border-l-4 border-white/5 pl-8">
                          "{selectedMovie.synopsis}"
                        </p>
                      </div>
                    </div>

                    <div className="pt-10">
                       <a 
                        href={selectedMovie.driveUrl}
                        target="_blank"
                        className="w-full py-6 bg-green-500 text-black font-black font-orbitron text-[14px] rounded-3xl flex items-center justify-center gap-4 shadow-[0_0_40px_rgba(34,197,94,0.4)] active:scale-95 transition-all uppercase tracking-[0.3em]"
                      >
                        INISIASI STREAMING ▶
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
      ` }} />
    </div>
  );
}
