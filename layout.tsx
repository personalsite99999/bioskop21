import React, { ReactNode } from 'react';
import './globals.css';

interface RootLayoutProps {
  children?: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#050505] to-black opacity-80" />
      
      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-[50] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />

      <main className="min-h-screen relative flex flex-col items-center">
        {children}
      </main>
    </>
  );
}