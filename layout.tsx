
import React, { ReactNode, useEffect } from 'react';

interface RootLayoutProps {
  children?: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  useEffect(() => {
    // 1. Inisialisasi Config SafelinkU
    const configScript = document.createElement('script');
    configScript.type = 'text/javascript';
    configScript.innerHTML = `
      var safelink_cfg = {
        "api_key": "bc017cabcda8ab583f4af6f680333e933f7aee83",
        "include_domains": ["drive.google.com"],
        "exclude_domains": ["whatsapp.com", "vercel.app"],
        "animation": true
      };
    `;
    document.head.appendChild(configScript);

    // 2. Load SafelinkU SDK
    const sdkScript = document.createElement('script');
    sdkScript.src = 'https://cdn.safelinku.com/js/sdk.js';
    sdkScript.async = true;
    document.head.appendChild(sdkScript);

    return () => {
      if (document.head.contains(configScript)) document.head.removeChild(configScript);
      if (document.head.contains(sdkScript)) document.head.removeChild(sdkScript);
    };
  }, []);

  return (
    <>
      {/* Techno Dynamic Navy & Green Gradient Background */}
      <div className="fixed inset-0 z-[-10] bg-[#020617] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a192f] via-[#064e3b]/30 to-[#020617]" />
        
        {/* Animated Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-blue-900/20 blur-[150px] rounded-full animate-[float_15s_ease-in-out_infinite]" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-emerald-600/10 blur-[130px] rounded-full animate-[float_18s_ease-in-out_infinite_2s]" />
        <div className="absolute bottom-[-15%] left-[5%] w-[70%] h-[70%] bg-green-900/20 blur-[160px] rounded-full animate-[float_22s_ease-in-out_infinite_reverse]" />
        
        {/* Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(34, 197, 94, 0.2) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(34, 197, 94, 0.2) 1px, transparent 1px)`,
            backgroundSize: '35px 35px'
          }}
        />

        {/* Scan Line */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-400/5 to-transparent h-[40%] w-full animate-[sweep_12s_linear_infinite]" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, -40px) scale(1.15); }
          66% { transform: translate(-50px, 50px) scale(0.9); }
        }
        @keyframes sweep {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}} />

      <main className="min-h-screen relative flex flex-col items-center w-full">
        {children}
      </main>
    </>
  );
}
