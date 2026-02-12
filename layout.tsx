
import React, { ReactNode, useEffect } from 'react';

interface RootLayoutProps {
  children?: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  useEffect(() => {
    const configScript = document.createElement('script');
    configScript.innerHTML = `
      var safelink_cfg = {
        "api_key": "bc017cabcda8ab583f4af6f680333e933f7aee83",
        "include_domains": ["drive.google.com"],
        "animation": true
      };
    `;
    document.head.appendChild(configScript);

    const sdkScript = document.createElement('script');
    sdkScript.src = 'https://cdn.safelinku.com/js/sdk.js';
    sdkScript.async = true;
    document.head.appendChild(sdkScript);

    return () => {
      document.head.removeChild(configScript);
      document.head.removeChild(sdkScript);
    };
  }, []);

  return (
    <>
      {/* Techno Dynamic Rainbow Background */}
      <div className="fixed inset-0 z-[-10] bg-[#020202] overflow-hidden">
        
        {/* Animated Rainbow Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-red-600/10 blur-[150px] rounded-full animate-[float_12s_ease-in-out_infinite]" />
        <div className="absolute top-[20%] right-[-5%] w-[50%] h-[50%] bg-yellow-500/10 blur-[130px] rounded-full animate-[float_18s_ease-in-out_infinite_1s]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[60%] h-[60%] bg-green-500/10 blur-[140px] rounded-full animate-[float_20s_ease-in-out_infinite_reverse]" />
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-[float_15s_ease-in-out_infinite_2s]" />
        <div className="absolute top-[40%] left-[30%] w-[35%] h-[35%] bg-purple-600/10 blur-[110px] rounded-full animate-[float_22s_ease-in-out_infinite_3s]" />
        <div className="absolute top-[-5%] left-[40%] w-[45%] h-[45%] bg-cyan-400/10 blur-[130px] rounded-full animate-[float_14s_ease-in-out_infinite_4s]" />

        {/* Techno Grid Mesh */}
        <div 
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Moving Prismatic Scan Lines */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[30%] w-full animate-[sweep_10s_linear_infinite]" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -30px) scale(1.1); }
          66% { transform: translate(-40px, 40px) scale(0.9); }
        }
        @keyframes sweep {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
      `}} />

      <main className="min-h-screen relative flex flex-col items-center w-full">
        {children}
      </main>
    </>
  );
}
