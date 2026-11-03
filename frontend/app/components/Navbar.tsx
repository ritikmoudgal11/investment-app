// ==============================================================================
// FILE: frontend/app/components/Navbar.tsx
// WHAT IT IS: Dynamic 3D-Effect Glass Navigation Bar
// ==============================================================================

'use client';

import React from 'react';

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
    <header className="sticky top-0 z-50 bg-slate-950/60 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-slate-950/20">
      
      {/* Subtle top gradient accent line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>

      <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
        
        {/* LOGO WITH 3D EFFECT */}
        <div 
          className="flex items-center gap-3 cursor-pointer group perspective-1000"
          onClick={() => setActiveTab('home')}
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-emerald-500/30 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 border border-emerald-400/30">
            L
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight text-white text-base group-hover:text-emerald-400 transition-colors drop-shadow-sm">
              Laminar Systems
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
              precision tech
            </span>
          </div>
        </div>

        {/* CENTER DYNAMIC 3D PILL NAVIGATION */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 border border-white/10 p-1.5 rounded-full shadow-inner backdrop-blur-md">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
              activeTab === 'home' 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/25 scale-105' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Home
          </button>
          
          <button
            onClick={() => handleNavClick('news')}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'news' 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/25 scale-105' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${activeTab === 'news' ? 'bg-white animate-pulse' : 'bg-amber-400'}`}></span>
            News Wire
          </button>

          <button
            onClick={() => handleNavClick('products')}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
              activeTab === 'products' 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/25 scale-105' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            All Products
          </button>

          <button
            onClick={() => handleNavClick('simulator')}
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
              activeTab === 'simulator' 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/25 scale-105' 
                : 'text-emerald-400 hover:text-white hover:bg-emerald-500/10'
            }`}
          >
            Flow (Flagship)
          </button>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3 text-xs font-semibold">
          <button
            onClick={() => handleNavClick('community')}
            className="hidden sm:inline-flex px-4 py-2.5 rounded-full bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 transition-all border border-purple-500/30 shadow-sm"
          >
            Pulse App
          </button>
          
          <button
            onClick={() => {
              if (!userEmail) onOpenGate('simulator');
              else alert(`Signed in as ${userEmail}`);
            }}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-slate-100 to-slate-300 text-slate-950 font-bold hover:from-white hover:to-slate-200 transition-all shadow-lg shadow-white/10 hover:scale-105"
          >
            {userEmail ? 'My Account' : 'Get ID / Login'}
          </button>
        </div>

      </div>
    </header>
  );
}