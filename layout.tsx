import React, { ReactNode, useEffect } from 'react';

interface RootLayoutProps {
  children?: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  useEffect(() => {
    // Inject SafelinkU Configuration
    const configScript = document.createElement('script');
    configScript.innerHTML = `
      var safelink_cfg = {
        "api_key": "bc017cabcda8ab583f4af6f680333e933f7aee83",
        "include_domains": ["drive.google.com"],
        "animation": true
      };
    `;
    document.head.appendChild(configScript);

    // Inject SafelinkU SDK
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
      {/* === TECHNO GREEN BACKGROUND LAYERS === */}
      
      {/* 1. Deep Matrix Base (Hitam Kehijauan) */}
      <div className="fixed inset-0 pointer-events-none z-[-10] bg-[#010a01]" />

      {/* 2. Ambient Toxic Green Glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-green-600/10 blur-[120px] pointer-events-none z-[-9]" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none z-[-9]" />

      {/* 3. Cyber Grid (Green Perspective) */}
      <div 
        className="fixed inset-0 pointer-events-none z-[-8] opacity-[0.25]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(circle at 50% 50%, black 40%, transparent 90%)'
        }}
      />

      {/* 4. Digital Circuit Lines */}
      <div className="fixed inset-0 pointer-events-none z-[-7] opacity-[0.1] bg-[repeating-linear-gradient(45deg,transparent,transparent_40px,rgba(34,197,94,0.15)_40px,rgba(34,197,94,0.15)_41px)]" />

      {/* 5. Binary/Data Dots */}
      <div className="fixed inset-0 pointer-events-none z-[-6] opacity-[0.2]"
         style={{
           backgroundImage: `radial-gradient(circle at center, #22c55e 1.5px, transparent 1.5px)`,
           backgroundSize: '24px 24px',
           maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
         }}
      />

      {/* 6. Vertical Data Streams (Matrix Rain Hint) */}
      <div 
        className="fixed inset-0 pointer-events-none z-[-6] opacity-[0.05]"
        style={{
            backgroundImage: 'linear-gradient(0deg, transparent 50%, rgba(34, 197, 94, .5) 50%)',
            backgroundSize: '4px 6px'
        }}
      />

      {/* 7. CRT Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.05] bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />
      
      {/* 8. Vignette */}
      <div className="fixed inset-0 pointer-events-none z-[-5] bg-[radial-gradient(circle_at_center,transparent_0%,#000000_130%)]" />

      <main className="min-h-screen relative flex flex-col items-center w-full">
        {children}
      </main>
    </>
  );
}