
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MovieCard from './components/MovieCard';
import { Movie } from './types';
import { movieData } from './data/movies';

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

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('drive.google.com')) {
      const match = url.match(/(?:id=|\/d\/|file\/d\/)([^/&?]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    }
    return url;
  };

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
    <div className="min-h-screen w-full flex justify-center bg-transparent overflow-hidden relative">
      {/* Background Neon Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-cyan-500/10 blur-[100px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-magenta-500/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* ANDROID DEVICE WRAPPER */}
      <div className="w-full max-w-md bg-black/80 backdrop-blur-2xl min-h-screen flex flex-col shadow-[0_0_100px_rgba(0,0,0,1)] relative border-x border-white/10">
        
        {/* --- STICKY TOP SECTION --- */}
        <div className="sticky top-0 z-[100] bg-black/60 backdrop-blur-3xl border-b border-white/10">
          {/* Status Bar Spacer */}
          <div className="h-6" />
          
          <header className="px-6 pb-4 space-y-4">
            {/* Header Top Row */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ boxShadow: ["0 0 10px #22c55e", "0 0 20px #22c55e", "0 0 10px #22c55e"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-0.5 bg-green-500 rounded-lg"
                >
                  <img 
                    src="https://josanvin.github.io/josanvin/img/bioskop21.jpg" 
                    alt="Logo" 
                    className="w-8 h-8 rounded-md border border-black"
                  />
                </motion.div>
                <h1 className="text-xl font-black font-orbitron tracking-tighter text-white italic uppercase">
                  BIOSKOP<span className="text-cyan-400">21</span>
                </h1>
              </div>
              <div className="flex gap-2 items-center bg-black/40 px-3 py-1 rounded-full border border-white/10">
                 <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#06b6d4]" />
                 <span className="text-[7px] font-orbitron text-cyan-400 tracking-widest uppercase">Active</span>
              </div>
            </div>

            {/* Search Bar Row */}
            <div className="relative group">
              <input
                type="text"
                placeholder="CARI_DATA_FILM..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border-2 border-white/5 rounded-2xl py-3 px-12 text-[10px] font-orbitron text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder-gray-700 uppercase tracking-widest"
              />
              <svg className="absolute left-4 top-3.5 h-4 w-4 text-gray-700 group-focus-within:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {/* Input Accent */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-0.5">
                {[...Array(3)].map((_, i) => <div key={i} className="w-1 h-3 bg-cyan-500/20" />)}
              </div>
            </div>
          </header>

          {/* --- PERMANENT TOP CATEGORY NAV --- */}
          <nav className="flex border-t border-white/10 bg-black/20 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveCategory('ALL')}
              className={`px-6 py-4 text-[9px] font-black font-orbitron transition-all whitespace-nowrap border-r border-white/10 shrink-0 uppercase tracking-widest flex-1 relative overflow-hidden ${
                activeCategory === 'ALL' ? 'text-cyan-400' : 'text-gray-600'
              }`}
            >
              {activeCategory === 'ALL' && <motion.div layoutId="nav-active" className="absolute inset-0 bg-cyan-500/10 border-b-2 border-cyan-500" />}
              <span className="relative z-10">ALL_DATA</span>
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-4 text-[9px] font-black font-orbitron transition-all whitespace-nowrap border-r border-white/10 last:border-0 shrink-0 uppercase tracking-widest flex-1 relative overflow-hidden ${
                  activeCategory === cat ? 'text-magenta-400' : 'text-gray-600'
                }`}
              >
                {activeCategory === cat && <motion.div layoutId="nav-active" className="absolute inset-0 bg-magenta-500/10 border-b-2 border-magenta-500" />}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* SCROLLABLE FEED */}
        <main className="flex-grow overflow-y-auto no-scrollbar p-4 pt-8 space-y-12 pb-16 relative">
          {/* Decorative Background Grid */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

          <AnimatePresence mode="popLayout">
            {filteredMovies.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
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
              <div className="flex flex-col items-center justify-center py-32 col-span-2">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-2 border-dashed border-cyan-500/30 rounded-full mb-6 flex items-center justify-center"
                >
                  <div className="w-8 h-8 border-2 border-magenta-500/30 rounded-full animate-ping" />
                </motion.div>
                <p className="font-orbitron text-[10px] uppercase tracking-[0.6em] text-cyan-500/40">Searching_Database...</p>
              </div>
            )}
          </AnimatePresence>

          {/* Request Button */}
          <section className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-black/40 backdrop-blur-xl border-2 border-white/10 p-8 rounded-[2.5rem] text-center space-y-6 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              <div className="space-y-2">
                <h4 className="text-[12px] font-black font-orbitron text-cyan-400 uppercase tracking-[0.4em]">Uplink_Request</h4>
                <p className="text-[11px] font-share-tech text-gray-500 leading-tight uppercase tracking-widest">Data tidak ditemukan? Hubungi Pusat Komando.</p>
              </div>
              <a 
                href="https://wa.me/6281341300100" 
                target="_blank" 
                className="flex items-center justify-center gap-4 bg-white text-black py-4 rounded-2xl font-black font-orbitron text-[12px] active:scale-95 transition-all uppercase tracking-[0.3em] shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                WHATSAPP_LINK
              </a>
            </div>
          </section>

          {/* Donation Display */}
          <section className="bg-black/40 backdrop-blur-xl border-2 border-white/10 p-8 rounded-[2.5rem] space-y-8 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-magenta-500/5 rounded-tl-full" />
            <div className="text-center space-y-3">
              <h4 className="text-[12px] font-black font-orbitron text-magenta-400 uppercase tracking-[0.4em]">Support_Protocol</h4>
              <p className="text-[11px] font-share-tech text-gray-500 italic leading-tight uppercase tracking-widest">"Inisiasi donasi via e-wallet untuk menjaga server tetap aktif"</p>
              <div className="py-2 px-4 bg-magenta-500/10 rounded-xl inline-block border border-magenta-500/20">
                <p className="text-lg font-black text-white font-orbitron tracking-tighter">JOHAN_081341300100</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {DONATION_LOGOS.map(logo => (
                <div key={logo.name} className="flex flex-col items-center">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-full aspect-square rounded-2xl ${logo.color} flex items-center justify-center border-2 border-white/10 shadow-lg relative overflow-hidden group`}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-white font-black text-[10px] font-orbitron relative z-10">{logo.label}</span>
                  </motion.div>
                </div>
              ))}
            </div>
          </section>

          {/* Copyright Footer */}
          <footer className="text-center py-12 space-y-4">
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 bg-white/10" />
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
              <div className="h-[1px] w-12 bg-white/10" />
            </div>
            <p className="text-[10px] font-orbitron text-gray-600 uppercase tracking-[0.5em]">
              System_Registry_2026_JOHAN
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
              className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-2xl"
            >
              <motion.div
                initial={{ y: "100%", scale: 0.9 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: "100%", scale: 0.9 }}
                transition={{ type: "spring", damping: 25, stiffness: 150 }}
                className="relative w-full max-w-md h-full bg-[#050505] flex flex-col border-x border-white/10 shadow-[0_0_100px_rgba(0,242,255,0.1)]"
              >
                {/* Back Button */}
                <button 
                  onClick={() => setSelectedMovie(null)}
                  className="absolute top-10 left-8 z-[10] w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-3xl flex items-center justify-center border-2 border-white/10 shadow-2xl active:scale-90 transition-all group"
                >
                  <svg className="w-7 h-7 text-white group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex-grow overflow-y-auto no-scrollbar pt-32 pb-16">
                  <div className="aspect-video bg-black border-y-2 border-white/10 flex items-center justify-center relative shadow-[0_0_80px_rgba(0,0,0,1)] group overflow-hidden">
                    <iframe
                      key={selectedMovie.id}
                      src={getEmbedUrl(selectedMovie.driveUrl)}
                      className="absolute inset-0 w-full h-full border-0"
                      allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                    <div className="absolute top-4 right-6 px-4 py-1.5 bg-cyan-500 text-black text-[11px] font-black rounded-full uppercase font-orbitron shadow-[0_0_20px_#06b6d4] animate-pulse pointer-events-none">DATA_STREAM_LIVE</div>
                  </div>

                  <div className="p-10 space-y-16">
                    <div className="space-y-6">
                      <div className="flex gap-3 items-center">
                         <span className="bg-magenta-500 text-white font-black text-[11px] px-4 py-1.5 rounded-full uppercase font-orbitron tracking-widest shadow-[0_0_15px_rgba(217,70,239,0.4)]">SECURE_LINK</span>
                         <span className="text-cyan-400 font-black text-sm uppercase font-orbitron tracking-[0.4em]">{selectedMovie.genre}</span>
                      </div>
                      <h2 className="text-4xl font-black font-orbitron text-white leading-tight uppercase tracking-tighter italic">
                        {selectedMovie.title}
                      </h2>
                      <div className="flex items-center gap-10 text-[13px] font-orbitron text-gray-500 uppercase tracking-[0.3em]">
                         <span className="flex items-center gap-3"><span className="text-white/20">YEAR:</span> {selectedMovie.year}</span>
                         <span className="flex items-center gap-3"><span className="text-white/20">SCORE:</span> <span className="text-yellow-400 font-black">★ {selectedMovie.rating}</span></span>
                      </div>
                    </div>

                    <div className="space-y-12">
                      <div className="space-y-6">
                        <h4 className="text-[12px] font-black font-orbitron text-white/10 uppercase tracking-[0.6em] border-b border-white/5 pb-2">Personnel_Registry</h4>
                        <div className="bg-cyan-500/[0.02] p-8 rounded-[3rem] border-2 border-cyan-500/10 relative overflow-hidden">
                           <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/40" />
                           <p className="text-cyan-400 font-share-tech text-xl leading-relaxed tracking-wide italic">
                             {selectedMovie.actors}
                           </p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-[12px] font-black font-orbitron text-white/10 uppercase tracking-[0.6em] border-b border-white/5 pb-2">Mission_Briefing</h4>
                        <p className="text-gray-400 font-share-tech text-2xl leading-relaxed italic border-l-4 border-magenta-500/20 pl-10">
                          "{selectedMovie.synopsis}"
                        </p>
                      </div>
                    </div>

                    <div className="pt-12">
                       <a 
                        href={selectedMovie.driveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black font-orbitron text-[16px] rounded-[2.5rem] flex items-center justify-center gap-6 shadow-[0_0_50px_rgba(6,182,212,0.4)] active:scale-95 transition-all uppercase tracking-[0.4em] group"
                      >
                        NONTON LANGSUNG ▶
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />
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
