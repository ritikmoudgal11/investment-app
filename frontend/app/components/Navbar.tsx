// ==============================================================================
// FILE: frontend/app/components/Navbar.tsx
// WHAT IT IS: Main Navigation Bar with Integrated My Account Button
// ==============================================================================

'use client';

import React from 'react';
import MyAccountButton from './MyAccountButton';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userEmail: string | null;
  onOpenGate: (tabId: string) => void;
}

export default function Navbar({ activeTab, setActiveTab, userEmail, onOpenGate }: NavbarProps) {
  
  const handleNavClick = (tabId: string) => {
    if (tabId === 'news' || tabId === 'home' || tabId === 'about' || tabId === 'products') {
      setActiveTab(tabId);
    } else {
      onOpenGate(tabId);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
      
      {/* LEFT SIDE: BRAND LOGO */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400"></div>
        <div className="flex flex-col">
          <span className="font-extrabold tracking-tight text-white text-base">
            Laminar Systems
          </span>
          <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
            Precision Tech
          </span>
        </div>
      </div>

      {/* CENTER: DYNAMIC 3D PILL NAVIGATION */}
      <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 border border-white/10 p-1 rounded-full">
        <button
          onClick={() => handleNavClick('home')}
          className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
            activeTab === 'home'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => handleNavClick('news')}
          className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
            activeTab === 'news'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          News Engine
        </button>
      </nav>

      {/* RIGHT SIDE ACTIONS */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleNavClick('community')}
          className="hidden sm:inline-flex px-4 py-2.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500/20 transition-all font-semibold text-xs"
        >
          Pulse App
        </button>

        {/* MY ACCOUNT BUTTON */}
        <MyAccountButton />
      </div>

    </header>
  );
}