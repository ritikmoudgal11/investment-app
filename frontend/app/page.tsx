// ==============================================================================
// FILE: frontend/app/page.tsx
// WHAT IT IS: Updated Controller with Auth & Settings Ready Ecosystem
// ==============================================================================

'use client';

import React, { useState } from 'react';
import MyAccountButton from './components/MyAccountButton';
import CashFlowEngine from './components/CashFlowEngine';
import RiskCalculatorEngine from './components/RiskCalculatorEngine';
import CommunityEngine from './components/CommunityEngine';
import NewsEngine from './components/NewsEngine';

const PRODUCTS_REGISTRY = [
  {
    id: 'simulator',
    title: 'Flow (Asset Builder)',
    badge: 'Flagship Product',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description: 'Our flagship interactive cash flow map. Pinpoint structural expense leaks instantly and redirect cash toward assets.',
    status: 'live',
    buttonText: 'Launch Flagship Flow ➔',
    buttonStyle: 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-500/20'
  },
  {
    id: 'risk-calc',
    title: 'Risk Calculator',
    badge: 'Trading Tool',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    description: 'Calculate precise position sizing, monetary risk limits, and market entry verdicts instantly.',
    status: 'live',
    buttonText: 'Launch Risk Calculator ➔',
    buttonStyle: 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm'
  },
  {
    id: 'community',
    title: 'Laminar Pulse',
    badge: 'Community App',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    description: 'Noise-free financial and trading streams where members share content, charts, and milestones.',
    status: 'live',
    buttonText: 'Open Pulse App ➔',
    buttonStyle: 'bg-purple-600 text-white hover:bg-purple-700 shadow-sm'
  },
  {
    id: 'wealth-vaults',
    title: 'Wealth Vaults',
    badge: 'Coming Soon',
    badgeColor: 'bg-slate-100 text-slate-600 border-slate-200',
    description: 'Smart automated savings protocols and compounding portfolio strategies currently in development.',
    status: 'coming_soon',
    buttonText: 'In Development',
    buttonStyle: 'bg-slate-100 text-slate-400 cursor-not-allowed'
  }
];

export default function Page() {
  const [activeTab, setActiveTab] = useState<string>('home');

  const handleProtectedTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between selection:bg-emerald-200 selection:text-slate-900 relative">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-emerald-100/70 via-teal-50/50 to-transparent blur-3xl pointer-events-none rounded-full"></div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-black text-white text-xl shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-all">
              L
            </div>
            <span className="font-bold tracking-tight text-slate-900 text-lg">
              Laminar Systems
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-2 bg-slate-100/80 p-1.5 rounded-full text-sm font-medium">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 rounded-full transition-all ${activeTab === 'home' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`px-4 py-2 rounded-full transition-all flex items-center gap-1.5 ${activeTab === 'news' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              News Wire
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-full transition-all ${activeTab === 'products' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              All Products
            </button>
            <button
              onClick={() => handleProtectedTabClick('simulator')}
              className={`px-4 py-2 rounded-full transition-all ${activeTab === 'simulator' ? 'bg-emerald-500 text-white font-semibold shadow-sm' : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'}`}
            >
              Flow (Flagship)
            </button>
          </nav>

          <div className="flex items-center gap-3 text-sm font-medium">
            <button
              onClick={() => handleProtectedTabClick('community')}
              className="px-4 py-2.5 rounded-full bg-purple-50 text-purple-700 hover:bg-purple-100 transition-all font-semibold border border-purple-200"
            >
              Pulse App
            </button>
            
            {/* Dynamic Auth / My Account System */}
            <MyAccountButton />
          </div>

        </div>
      </header>

      <main className="flex-grow max-w-6xl mx-auto px-6 py-10 w-full z-10 space-y-16">
        
        {/* ================= HOME TAB ================= */}
        {activeTab === 'home' && (
          <div className="space-y-16">
            
            <div className="text-center space-y-6 pt-8">
              <div className="inline-flex items-center gap-2 bg-emerald-100/80 border border-emerald-200 px-4 py-1.5 rounded-full text-xs font-semibold text-emerald-800 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Flagship Platform — Flow Engine & Ecosystem
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
                Build real wealth with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">complete flow control</span>.
              </h1>
              
              <p className="text-slate-600 text-lg font-normal leading-relaxed max-w-2xl mx-auto">
                Stop wondering where your money goes. Laminar Systems combines professional quantitative tools, real-time news wire updates, and our noise-free community app.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 text-sm font-semibold">
                <button
                  onClick={() => handleProtectedTabClick('simulator')}
                  className="px-8 py-4 rounded-2xl bg-emerald-500 text-white shadow-xl shadow-emerald-500/25 hover:bg-emerald-600 hover:scale-105 transition-all text-base"
                >
                  Launch Flagship Flow ➔
                </button>
                <button
                  onClick={() => setActiveTab('news')}
                  className="px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all text-base shadow-sm"
                >
                  Read News Wire 📰
                </button>
              </div>
            </div>

            {/* ECOSYSTEM OVERVIEW */}
            <div className="space-y-8 text-center pt-4 bg-white border border-slate-200/80 p-8 md:p-12 rounded-3xl shadow-sm">
              <div className="space-y-2 max-w-xl mx-auto">
                <span className="text-xs font-semibold uppercase bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">Overview</span>
                <h2 className="text-3xl font-bold text-slate-900">Laminar Systems, Products, and Ecosystem</h2>
                <p className="text-slate-500 text-sm">A complete breakdown of our quantitative applications, community streams, and free market reporting.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left pt-4">
                {PRODUCTS_REGISTRY.map((product) => (
                  <div key={product.id} className="bg-slate-50 border border-slate-200/70 p-6 rounded-2xl space-y-4">
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border inline-block ${product.badgeColor}`}>
                      {product.badge}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">{product.title}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed">{product.description}</p>
                  </div>
                ))}
                
                <div className="bg-slate-50 border border-slate-200/70 p-6 rounded-2xl space-y-4">
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border bg-amber-50 text-amber-700 border-amber-200 inline-block">
                    Free Wire
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">News Wire</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Automated, real-time market reporting aggregated directly from Reuters, Bloomberg, and top institutional sources with complete attribution.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setActiveTab('products')}
                  className="px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all shadow-sm"
                >
                  Explore All Products & Launch Apps ➔
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ================= PRODUCTS TAB ================= */}
        {activeTab === 'products' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-semibold tracking-wide uppercase bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full inline-block">Product Catalog</span>
              <h2 className="text-3xl font-bold text-slate-900">All Products</h2>
              <p className="text-slate-500 text-sm">Explore and launch our flagship app, trading tools, and community apps.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {PRODUCTS_REGISTRY.map(product => (
                <div key={product.id} className={`bg-white border p-8 rounded-3xl space-y-6 shadow-sm ${product.id === 'simulator' ? 'border-emerald-200 ring-2 ring-emerald-500/20' : 'border-slate-200'}`}>
                  <div className="space-y-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${product.badgeColor}`}>{product.badge}</span>
                    <h3 className="text-2xl font-bold text-slate-900">{product.title}</h3>
                    <p className="text-slate-600 text-sm">{product.description}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (product.status === 'live') {
                        handleProtectedTabClick(product.id);
                      }
                    }}
                    disabled={product.status === 'coming_soon'}
                    className={`w-full py-3 rounded-xl font-semibold text-xs transition-all ${product.buttonStyle}`}
                  >
                    {product.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= ACTIVE APP VIEWS ================= */}
        {activeTab === 'simulator' && <CashFlowEngine />}
        {activeTab === 'risk-calc' && <RiskCalculatorEngine />}
        {activeTab === 'news' && <NewsEngine />}
        {activeTab === 'community' && <CommunityEngine />}

      </main>

      <footer className="border-t border-slate-200 bg-white py-8 text-xs text-slate-500 text-center">
        <p>© 2026 Laminar Systems. Smart financial clarity and trading tools for everyone.</p>
      </footer>

    </div>
  );
}