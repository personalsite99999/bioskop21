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
  { name: 'GOPAY', color: 'bg-blue-500', label: 'GOPAY' },
  { name: 'DANA', color: 'bg-sky-600', label: 'DANA' }
];

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Movie['genre'] | 'All'>('All');

  const Player = ReactPlayer as any;

  const filteredMovies = useMemo(() => {
    return movieData.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) || movie.year.includes(searchQuery);
      const matchesCategory = activeCategory === 'All' || movie.genre === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen w-full flex justify-center py-0 md:py-8">
      {/* ANDROID DEVICE CONTAINER */}
      <div className="w-full max-w-md bg-black/80 min-h-screen md:min-h-[800px] md:rounded-[2.5rem] md:border-4 md:border-white/10 overflow-hidden flex flex-col shadow-2xl relative backdrop-blur-md">
        
        {/* Android Status Bar */}
        <div className="h-6 flex justify-between items-center px-8 pt-3 pb-1">
          <span className="text-[10px] font-bold text-white/60">12:00</span>
          <div className="flex gap-1.5 items-center">
            <div className="w-3 h-2 bg-white/40 rounded-sm" />
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
          </div>
        </div>

        {/* App Header */}
        <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/5 p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-black font-orbitron tracking-tighter text-white">
              BIOSKOP<span className="text-green-500">21</span>
            </h1>
            <div className="text-[8px] font-share-tech text-green-500 border border-green-500/20 px-2 py-0.5 rounded">
              v2.0_MOBILE
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Cari film, aktor, atau tahun..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 px-10 text-xs font-share-tech text-white focus:outline-none focus:border-green-500/50 transition-all"
            />
            <svg className="absolute left-4 top-2.5 h-3.5 w-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Category Chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-4 py-1.5 rounded-full text-[9px] font-black font-orbitron transition-all whitespace-nowrap border ${
                activeCategory === 'All' ? 'bg-white text-black border-white' : 'bg-white/5 text-gray-500 border-white/5'
              }`}
            >
              SEMUA
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-[9px] font-black font-orbitron transition-all whitespace-nowrap border ${
                  activeCategory === cat ? 'bg-green-500 text-black border-green-500' : 'bg-white/5 text-gray-500 border-white/5'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow overflow-y-auto no-scrollbar p-4 space-y-6">
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
              <div className="flex flex-col items-center justify-center py-20 opacity-30">
                <span className="text-4xl">🛸</span>
                <p className="mt-4 text-[10px] font-orbitron uppercase tracking-widest">Sektor Kosong</p>
              </div>
            )}
          </AnimatePresence>

          {/* WhatsApp Request Section */}
          <section className="bg-green-500/5 border border-green-500/10 p-5 rounded-2xl space-y-3 text-center">
            <h4 className="text-[10px] font-black font-orbitron text-green-500 uppercase tracking-widest">Butuh Film Lain?</h4>
            <p className="text-[11px] font-share-tech text-gray-400">Request film favoritmu langsung ke admin kami via WhatsApp:</p>
            <a 
              href="https://wa.me/6281341300100" 
              target="_blank" 
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-black font-orbitron text-[10px] shadow-lg shadow-green-500/10 active:scale-95 transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              REQUEST DI WHATSAPP
            </a>
          </section>

          {/* Donation Section */}
          <section className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-6">
            <div className="text-center space-y-1">
              <h4 className="text-[10px] font-black font-orbitron text-emerald-400 uppercase tracking-widest">Dukungan Server</h4>
              <p className="text-sm font-bold text-white">Johan — 0813 4130 0100</p>
              <p className="text-[9px] font-share-tech text-gray-500">Menerima donasi via e-wallet</p>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {DONATION_LOGOS.map(logo => (
                <div key={logo.name} className="flex flex-col items-center gap-1.5">
                  <div className={`w-full aspect-square rounded-xl ${logo.color} flex items-center justify-center border border-white/20 shadow-lg active:scale-90 transition-all cursor-default`}>
                    <span className="text-white font-black text-[9px] font-orbitron">{logo.label}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-[7px] text-center text-gray-700 font-share-tech leading-tight uppercase">Donasi anda sangat membantu kelangsungan terminal BIOSKOP21. Terimakasih bosku!</p>
          </section>

          {/* Simple Footer */}
          <footer className="text-center py-8 space-y-2 opacity-20">
            <p className="text-[8px] font-share-tech uppercase tracking-[0.6em]">Bioskop21 // Node_Mobile // 2025</p>
            <p className="text-[6px] text-gray-500">Distributed Encryption System Active</p>
          </footer>
        </main>

        {/* Streaming Modal Overlay */}
        <AnimatePresence>
          {selectedMovie && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/98"
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 250 }}
                className="relative w-full max-w-md h-full bg-black flex flex-col"
              >
                {/* Back Button */}
                <button 
                  onClick={() => setSelectedMovie(null)}
                  className="absolute top-6 left-6 z-[10] w-9 h-9 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10"
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex-grow overflow-y-auto no-scrollbar pt-16">
                  {/* Player Frame */}
                  <div className="aspect-video bg-[#050505] border-y border-white/5 flex items-center justify-center shadow-2xl">
                    <Player
                      url={selectedMovie.driveUrl}
                      width="100%"
                      height="100%"
                      controls
                      playing
                    />
                  </div>

                  {/* Info Details */}
                  <div className="p-8 space-y-8">
                    <div className="space-y-3">
                      <div className="flex gap-2 items-center">
                         <span className="bg-green-500 text-black font-black text-[8px] px-2 py-0.5 rounded uppercase font-orbitron tracking-tighter">HD_SIGNAL</span>
                         <span className="text-emerald-500 font-bold text-[10px] uppercase font-share-tech">{selectedMovie.genre}</span>
                      </div>
                      <h2 className="text-2xl font-black font-orbitron text-white leading-tight uppercase">
                        {selectedMovie.title}
                      </h2>
                      <div className="flex items-center gap-4 text-[10px] font-share-tech text-gray-500 uppercase">
                         <span>Tahun: {selectedMovie.year}</span>
                         <span className="text-green-500 font-bold">Skor: ★ {selectedMovie.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="space-y-1.5">
                        <h4 className="text-[9px] font-black font-orbitron text-white/40 uppercase tracking-widest">Log_Sinopsis</h4>
                        <p className="text-gray-300 font-share-tech text-sm leading-relaxed italic border-l border-white/10 pl-3">
                          "{selectedMovie.synopsis}"
                        </p>
                      </div>
                      
                      <div className="space-y-1.5">
                        <h4 className="text-[9px] font-black font-orbitron text-white/40 uppercase tracking-widest">Agen_Pemeran</h4>
                        <p className="text-emerald-500 font-share-tech text-xs">
                          {selectedMovie.actors}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 pb-10">
                       <a 
                        href={selectedMovie.driveUrl}
                        target="_blank"
                        className="w-full py-4 bg-green-500 text-black font-black font-orbitron text-[11px] rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-green-500/10 active:scale-95 transition-all uppercase"
                      >
                        Buka Uplink Stream ▶
                      </a>
                      <p className="text-[8px] text-center text-gray-600 mt-5 font-share-tech uppercase tracking-widest leading-relaxed px-4">
                        Akses via terminal enkripsi SafelinkU. Harap bersabar menunggu redirect selesai untuk memutar film.
                      </p>
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
      ` }} />
    </div>
  );
}