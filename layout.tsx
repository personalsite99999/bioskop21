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
      {/* Visual background layers */}
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-[#050505]" />
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-[radial-gradient(circle_at_50%_50%,rgba(0,243,255,0.05),transparent_70%)]" />
      
      {/* Grid Pattern overlay */}
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[length:40px_40px]" />

      {/* CRT Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      <main className="min-h-screen relative flex flex-col items-center w-full">
        {children}
      </main>
    </>
  );
}
