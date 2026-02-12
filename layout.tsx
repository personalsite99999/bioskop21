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
      {/* Techno Dynamic Background */}
      <div className="fixed inset-0 z-[-10] bg-black overflow-hidden">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full animate-[float_15s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-green-900/20 blur-[120px] rounded-full animate-[float_20s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-blue-900/10 blur-[100px] rounded-full animate-[float_18s_ease-in-out_infinite_2s]" />

        {/* Techno Grid Mesh */}
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(34, 197, 94, 0.2) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(34, 197, 94, 0.2) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
        />

        {/* Vertical Scanning Light */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent h-[20%] w-full animate-[sweep_8s_linear_infinite]" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(100px, 50px) scale(1.1); }
        }
        @keyframes sweep {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }
      `}} />

      <main className="min-h-screen relative flex flex-col items-center w-full">
        {children}
      </main>
    </>
  );
}