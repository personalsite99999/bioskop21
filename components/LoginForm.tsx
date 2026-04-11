
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserDatabase } from '../data/Login';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError('');

    setTimeout(() => {
      const user = UserDatabase.find(u => u.UserName === username && u.Password === password);
      if (user) {
        onLoginSuccess();
      } else {
        setError('SYSTEM_ERROR: INVALID_ACCESS_KEY');
        setIsLoggingIn(false);
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-[#050505] overflow-hidden">
      {/* Neon Techno Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Neon Grids */}
        <div className="absolute inset-0 opacity-20" 
             style={{ 
               backgroundImage: `linear-gradient(to right, #00f2ff 1px, transparent 1px), linear-gradient(to bottom, #00f2ff 1px, transparent 1px)`,
               backgroundSize: '40px 40px',
               perspective: '1000px',
               transform: 'rotateX(60deg) translateY(-200px)'
             }} />
        
        {/* Pulsing Neon Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-magenta-500/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Moving Digital Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: Math.random() * 100 + '%', y: -20, opacity: 0 }}
            animate={{ y: '110vh', opacity: [0, 1, 0] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute w-[1px] h-12 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-md p-8 relative z-10"
      >
        {/* Neon Frame Container */}
        <div className="relative bg-black/80 backdrop-blur-2xl p-10 rounded-3xl border border-cyan-500/30 shadow-[0_0_50px_rgba(0,242,255,0.2)] overflow-hidden">
          
          {/* Animated Border Line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[shimmer_3s_infinite]" />
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-magenta-400 to-transparent animate-[shimmer_3s_infinite_reverse]" />

          {/* Header Section */}
          <div className="text-center space-y-6 relative">
            <motion.div
              animate={{ 
                boxShadow: ["0 0 20px #00f2ff", "0 0 40px #00f2ff", "0 0 20px #00f2ff"],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block p-1 bg-cyan-500 rounded-2xl"
            >
              <img 
                src="https://josanvin.github.io/josanvin/img/bioskop21.jpg" 
                alt="Logo" 
                className="w-20 h-20 rounded-xl border-2 border-black"
              />
            </motion.div>
            
            <div className="space-y-1">
              <h1 className="text-4xl font-black font-orbitron tracking-tighter text-white italic uppercase">
                BIOSKOP<span className="text-cyan-400">21</span>
              </h1>
              <div className="flex items-center justify-center gap-3">
                <span className="h-[1px] w-12 bg-cyan-500/50" />
                <p className="text-[10px] font-orbitron text-cyan-400 tracking-[0.4em] uppercase">Uplink_Established</p>
                <span className="h-[1px] w-12 bg-cyan-500/50" />
              </div>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="mt-12 space-y-8">
            <div className="space-y-6">
              <div className="group relative">
                <label className="text-[10px] font-orbitron text-cyan-400/70 uppercase tracking-widest mb-2 block ml-2">User_Registry</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-cyan-950/20 border border-cyan-500/30 rounded-xl py-4 px-6 text-sm font-share-tech text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all placeholder-cyan-900"
                  placeholder="ID_IDENTIFIER"
                />
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-cyan-400 transition-all duration-300 group-focus-within:w-full" />
              </div>

              <div className="group relative">
                <label className="text-[10px] font-orbitron text-magenta-400/70 uppercase tracking-widest mb-2 block ml-2">Access_Code</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-magenta-950/20 border border-magenta-500/30 rounded-xl py-4 px-6 text-sm font-share-tech text-white focus:outline-none focus:border-magenta-400 focus:ring-1 focus:ring-magenta-400/50 transition-all placeholder-magenta-900"
                  placeholder="••••••••••"
                />
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-magenta-400 transition-all duration-300 group-focus-within:w-full" />
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-500/10 border border-red-500/50 p-3 rounded-lg"
                >
                  <p className="text-[10px] font-orbitron text-red-400 text-center uppercase tracking-widest animate-pulse">
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full relative group h-16 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,242,255,0.3)] hover:shadow-[0_0_40px_rgba(0,242,255,0.5)] transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-magenta-500 animate-[gradient_3s_linear_infinite] bg-[length:200%_100%]" />
              <div className="absolute inset-[2px] bg-black rounded-[10px] flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                {isLoggingIn ? (
                  <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span className="text-cyan-400 font-black font-orbitron text-sm uppercase tracking-[0.4em] group-hover:text-white transition-colors">LOGIN</span>
                )}
              </div>
            </button>
          </form>

          {/* WhatsApp Contact Section */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center space-y-4">
            <p className="text-[10px] font-orbitron text-cyan-400/60 uppercase tracking-[0.2em]">Mau Nonton Gratis?</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-[10px] font-share-tech text-gray-500 uppercase tracking-widest">Hubungi :</span>
              <motion.a
                href="https://wa.me/6281341300100"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-xl group transition-all hover:bg-green-500/20 hover:border-green-500/50"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-green-500"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </motion.div>
                <span className="text-xs font-black font-orbitron text-green-500 uppercase tracking-widest">Johan</span>
              </motion.a>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="mt-8 flex justify-between items-center opacity-30">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <div key={i} className="w-1 h-4 bg-cyan-500" />)}
            </div>
            <p className="text-[8px] font-mono text-cyan-500 uppercase">Secure_Link_Active</p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <div key={i} className="w-1 h-4 bg-magenta-500" />)}
            </div>
          </div>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .perspective-1000 { perspective: 1000px; }
      ` }} />
    </div>
  );
};

export default LoginForm;
