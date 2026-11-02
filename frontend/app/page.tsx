'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  AlertTriangle, 
  BookOpen, 
  HeartHandshake, 
  Store, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Mail, 
  Phone, 
  MapPin, 
  Scale, 
  PieChart, 
  Wallet,
  Zap,
  Info
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'create'>('login');
  const [authMessage, setAuthMessage] = useState('');

  // Diagnostic Cash Flow Simulator State
  const [monthlyIncome, setMonthlyIncome] = useState(75000);
  const [emiExpenses, setEmiExpenses] = useState(25000);
  const [lifestyleExpenses, setLifestyleExpenses] = useState(30000);
  const [investmentAllocation, setInvestmentAllocation] = useState(5000);

  // Calculations
  const totalOutflow = emiExpenses + lifestyleExpenses + investmentAllocation;
  const netCashFlow = monthlyIncome - totalOutflow;
  const emiRatio = Math.round((emiExpenses / monthlyIncome) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* HEADER NAVIGATION */}
      <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => setActiveTab('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              L
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                Laminar Capitals
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-cyan-400 -mt-1">
                Asset & Freedom Engine
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'home'
                  ? 'bg-slate-800/90 text-cyan-400 border border-slate-700/60 shadow-inner'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              Diagnostic Home
            </button>
            <button
              onClick={() => setActiveTab('pools')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'pools'
                  ? 'bg-slate-800/90 text-cyan-400 border border-slate-700/60 shadow-inner'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              Real Asset Pools
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'about'
                  ? 'bg-slate-800/90 text-cyan-400 border border-slate-700/60 shadow-inner'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              Why We Educate (About Us)
            </button>
          </nav>

          {/* User Portal Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                if (isLoggedIn) {
                  setActiveTab('home');
                } else {
                  setAuthMode('login');
                  setAuthMessage('');
                  setActiveTab('auth');
                }
              }}
              className="px-3.5 py-1.5 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
            >
              {isLoggedIn ? 'Investor Portal' : 'Login'}
            </button>
            {!isLoggedIn && (
              <button
                onClick={() => {
                  setAuthMode('create');
                  setAuthMessage('');
                  setActiveTab('auth');
                }}
                className="px-4 py-1.5 text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-lg shadow-md shadow-cyan-500/20 transition-all hover:shadow-cyan-500/30"
              >
                Join Community
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN BODY ROUTING */}
      <main className="flex-grow">

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: DIAGNOSTIC HOME & HERO ENGINE */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'home' && (
          <div className="space-y-16 py-12">
            
            {/* Hero Banner */}
            <section className="px-4 max-w-5xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-bold uppercase tracking-wider shadow-sm">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Financial Freedom begins with Truth</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-white">
                You Are Not Broke. <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Your Money Is Just Flowing The Wrong Way.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Most people don't fail due to low income—they fail because they are caught in EMI traps and invisible cash flow leaks. We diagnose your financial flow, educate you, and connect educated capital to real, authenticated working-class businesses.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                <button
                  onClick={() => {
                    const el = document.getElementById('diagnostic-calculator');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl shadow-xl shadow-cyan-500/20 transition-all w-full sm:w-auto"
                >
                  Diagnose My Cash Flow Now
                </button>
                <button
                  onClick={() => setActiveTab('about')}
                  className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold rounded-xl transition-all w-full sm:w-auto"
                >
                  Read Our Mission & Truth
                </button>
              </div>
            </section>

            {/* Diagnostic Interactive Engine */}
            <section id="diagnostic-calculator" className="max-w-6xl mx-auto px-4 scroll-mt-24">
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl space-y-8">
                
                <div className="border-b border-slate-800 pb-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
                      <PieChart className="w-7 h-7 text-cyan-400" />
                      Personal Cash Flow Diagnostic Engine
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">Adjust your figures below to mirror your real-world monthly outflow.</p>
                  </div>
                  <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-xs text-slate-400 font-mono">
                    Status: <span className={netCashFlow >= 0 ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>{netCashFlow >= 0 ? "SURPLUS" : "DEFICIT BLEEDING"}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  
                  {/* Left Column: Interactive Controls */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm font-semibold text-slate-300 mb-2">
                        <span>Total Monthly Income (Take-home)</span>
                        <span className="text-cyan-400 font-bold font-mono">₹{monthlyIncome.toLocaleString()}</span>
                      </div>
                      <input 
                        type="range" min="15000" max="300000" step="5000"
                        value={monthlyIncome}
                        onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                        className="w-full accent-cyan-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm font-semibold text-slate-300 mb-2">
                        <span>EMI & Debt Obligations (Home, Car, Cards)</span>
                        <span className="text-amber-400 font-bold font-mono">₹{emiExpenses.toLocaleString()}</span>
                      </div>
                      <input 
                        type="range" min="0" max="150000" step="2500"
                        value={emiExpenses}
                        onChange={(e) => setEmiExpenses(Number(e.target.value))}
                        className="w-full accent-amber-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm font-semibold text-slate-300 mb-2">
                        <span>Living, Subscriptions & Personal Spend</span>
                        <span className="text-slate-300 font-bold font-mono">₹{lifestyleExpenses.toLocaleString()}</span>
                      </div>
                      <input 
                        type="range" min="5000" max="150000" step="2500"
                        value={lifestyleExpenses}
                        onChange={(e) => setLifestyleExpenses(Number(e.target.value))}
                        className="w-full accent-slate-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm font-semibold text-slate-300 mb-2">
                        <span>Direct Capital Allocation to Assets</span>
                        <span className="text-emerald-400 font-bold font-mono">₹{investmentAllocation.toLocaleString()}</span>
                      </div>
                      <input 
                        type="range" min="0" max="50000" step="1000"
                        value={investmentAllocation}
                        onChange={(e) => setInvestmentAllocation(Number(e.target.value))}
                        className="w-full accent-emerald-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Right Column: Diagnostic Feedback Card */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Diagnostic Output</span>
                      
                      <div className="flex justify-between items-baseline">
                        <span className="text-slate-300 text-sm font-medium">Net Monthly Cash Flow:</span>
                        <span className={`text-3xl font-black font-mono ${netCashFlow >= 0 ? "text-emerald-400" : "text-rose-500"}`}>
                          {netCashFlow >= 0 ? `+₹${netCashFlow.toLocaleString()}` : `-₹${Math.abs(netCashFlow).toLocaleString()}`}
                        </span>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-900 space-y-3">
                        <div className="flex justify-between text-xs text-slate-400">
                          <span>Debt / EMI Load Ratio:</span>
                          <span className={`font-bold font-mono ${emiRatio > 40 ? "text-amber-400" : "text-emerald-400"}`}>{emiRatio}% of income</span>
                        </div>
                        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${emiRatio > 40 ? "bg-amber-500" : "bg-emerald-500"}`}
                            style={{ width: `${Math.min(emiRatio, 100)}%` }}
                          />
                        </div>
                      </div>

                      {/* Educational Verdict Box */}
                      <div className={`mt-6 p-4 rounded-xl border text-xs leading-relaxed ${
                        netCashFlow < 0 
                          ? "bg-rose-950/40 border-rose-800/60 text-rose-300"
                          : emiRatio > 40 
                            ? "bg-amber-950/40 border-amber-800/60 text-amber-300"
                            : "bg-emerald-950/40 border-emerald-800/60 text-emerald-300"
                      }`}>
                        <div className="font-bold mb-1 flex items-center gap-1.5 text-sm">
                          <Info className="w-4 h-4" />
                          <span>Laminar Diagnostic Analysis</span>
                        </div>
                        {netCashFlow < 0 ? (
                          <p><strong>Warning:</strong> You are in a negative cash flow spiral. Even if you earn well, money is leaving faster than it arrives. Your priority must be stopping the bleed before committing to investment assets.</p>
                        ) : emiRatio > 40 ? (
                          <p><strong>EMI Trap Detected:</strong> Over {emiRatio}% of your hard work goes directly into funding liability debts. You are working for banks rather than building your own independent freedom.</p>
                        ) : (
                          <p><strong>Positive Flow:</strong> You have a healthy baseline cash surplus! Redirect this excess flow into real, business-backed yield pools instead of leaving it idle in low-interest accounts.</p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('pools')}
                      className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl transition-all text-sm flex items-center justify-center space-x-2"
                    >
                      <span>Redirect Cash Surplus Into Real Assets</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>
            </section>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: REAL ASSET & MICRO-LENDING POOLS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'pools' && (
          <div className="max-w-7xl mx-auto px-4 py-16 space-y-12">
            
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-bold uppercase tracking-wider border border-cyan-800/60">
                <Store className="w-4 h-4" />
                <span>Tangible Economy Micro-Lending</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white">Authenticated Business Capital Pools</h2>
              <p className="text-slate-300 text-base md:text-lg">
                Your money directly fuels real working-class entrepreneurs and verified business inventory cycles. No stock market gambling—just pure, risk-managed business yield.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Pool 1: Micro-Vendor Working Capital */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-xl hover:border-slate-700 transition-all">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 bg-cyan-950 text-cyan-400 text-xs font-bold rounded-full border border-cyan-800/50">
                      Short Cycle (3 - 7 Days)
                    </span>
                    <span className="text-xs text-slate-500 font-mono">Segment A-1</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Store className="w-5 h-5 text-cyan-400" />
                    Micro-Vendor Inventory Fund
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Provides micro-capital (e.g., ₹10,000) for daily food vendors, cart owners, and local shops to purchase raw materials upfront.
                  </p>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Borrower Service Fee:</span>
                      <span className="font-bold text-emerald-400 font-mono">₹1,500 - ₹2,000 / cycle</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Verification Level:</span>
                      <span className="font-bold text-slate-200">100% On-site Checked</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Withdrawal Terms:</span>
                      <span className="font-bold text-slate-200">Weekly Cycle Liquidity</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => { setAuthMode('login'); setActiveTab('auth'); }}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-all"
                >
                  Allocate Capital To Segment
                </button>
              </div>

              {/* Pool 2: Featured Small Enterprise Growth */}
              <div className="bg-slate-900 border-2 border-cyan-500/80 rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-2xl relative shadow-cyan-950/40">
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-cyan-500 text-slate-950 text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider">
                  Most Popular Segment
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 bg-blue-950 text-blue-400 text-xs font-bold rounded-full border border-blue-800/50">
                      Monthly Recurring (30 Days)
                    </span>
                    <span className="text-xs text-slate-500 font-mono">Segment B-2</span>
                  </div>

                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-cyan-400" />
                    Verified SME Trade Credit Pool
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Funds audited local retail stores and small manufacturing units needing stock replenishment prior to high-volume seasonal sales.
                  </p>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Projected Annualized Yield:</span>
                      <span className="font-bold text-cyan-400 font-mono">14% - 18% p.a.</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Laminar Authentication:</span>
                      <span className="font-bold text-slate-200">Balance Sheet Audited</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Withdrawal Terms:</span>
                      <span className="font-bold text-slate-200">30-Day Lock / Monthly Return</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => { setAuthMode('login'); setActiveTab('auth'); }}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all"
                >
                  Allocate Capital To Segment
                </button>
              </div>

              {/* Pool 3: Quarterly Equipment Loan Pool */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-xl hover:border-slate-700 transition-all">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 bg-purple-950 text-purple-400 text-xs font-bold rounded-full border border-purple-800/50">
                      Quarterly (90 Days)
                    </span>
                    <span className="text-xs text-slate-500 font-mono">Segment C-3</span>
                  </div>

                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Scale className="w-5 h-5 text-purple-400" />
                    Commercial Equipment & Machinery
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Secured equipment purchase loans for established local workshops and service providers backed by physical asset collateral.
                  </p>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Collateral Security:</span>
                      <span className="font-bold text-purple-400 font-mono">Physical Machinery Lien</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Risk Assessment:</span>
                      <span className="font-bold text-slate-200">Strict Credit Check</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Withdrawal Terms:</span>
                      <span className="font-bold text-slate-200">Quarterly Dividend Payout</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => { setAuthMode('login'); setActiveTab('auth'); }}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-all"
                >
                  Allocate Capital To Segment
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: RICH EDUCATIONAL ABOUT US & MISSION PAGE */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'about' && (
          <div className="max-w-5xl mx-auto px-4 py-16 space-y-20">
            
            {/* Section 1: Core Manifesto Header */}
            <section className="text-center space-y-6">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950 text-cyan-400 text-xs font-bold uppercase tracking-wider border border-cyan-800/60">
                <BookOpen className="w-4 h-4" />
                <span>Our Philosophy & Truth</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Why Laminar Capitals Exists: <br />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  We Are Selling Freedom, Not Generic Products.
                </span>
              </h2>
              <p className="text-slate-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                Most people don't struggle because they lack effort—they struggle because they were never taught how money actually flows. We built Laminar Capitals to bridge the gap between educated investors and real, working-class business opportunities.
              </p>
            </section>

            {/* Section 2: Why We Educate (Deep Educational Segment) */}
            <section className="bg-slate-900/90 rounded-3xl p-8 md:p-12 border border-slate-800 space-y-8 shadow-2xl">
              <div className="border-b border-slate-800 pb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Educational Pillar 01</span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
                  The EMI Trap & Hidden Cash Flow Bleed
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-300 leading-relaxed">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                    The Unconscious Trap
                  </h4>
                  <p>
                    Modern society is built to push immediate gratification through easy credit, deferred payment schemes, and lifestyle inflation. People earn money, but before it touches their bank account, it is already committed to monthly EMIs and liabilities.
                  </p>
                  <p>
                    This creates an invisible bleed: you are not broke, but your money flows outwards to financial institutions rather than inwards into self-sustaining assets.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <HeartHandshake className="w-5 h-5 text-cyan-400" />
                    Educating The Customer First
                  </h4>
                  <p>
                    We do not want customers who view money as a gamble or expect magic overnight returns. Through our diagnostic engines and content, we segregate and filter our community.
                  </p>
                  <p>
                    We build relationships exclusively with educated individuals who understand that true financial independence comes from managing cash flow and deploying surplus capital into real-world utility.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: Pure Investing vs. Stock Market Speculation */}
            <section className="bg-slate-900/90 rounded-3xl p-8 md:p-12 border border-slate-800 space-y-8 shadow-2xl">
              <div className="border-b border-slate-800 pb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Educational Pillar 02</span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
                  Pure Business Investing Is Not Speculation
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80 space-y-3">
                  <Zap className="w-8 h-8 text-cyan-400" />
                  <h4 className="text-base font-bold text-white">Real-World Utility</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    When a local business vendor needs ₹10,000 for raw materials to run their store for the week, that capital creates direct economic value.
                  </p>
                </div>

                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80 space-y-3">
                  <ShieldCheck className="w-8 h-8 text-cyan-400" />
                  <h4 className="text-base font-bold text-white">Our Due Diligence</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Laminar handles the hard part. We personally verify business owners, audit physical stores, inspect cash flow history, and manage repayment terms.
                  </p>
                </div>

                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80 space-y-3">
                  <Wallet className="w-8 h-8 text-cyan-400" />
                  <h4 className="text-base font-bold text-white">Transparent Returns</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Lenders receive structured, pre-agreed yield percentages backed by verified commercial sales rather than erratic stock market mood swings.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: Integrated Direct Contact Section */}
            <section className="bg-gradient-to-tr from-slate-900 via-slate-900 to-slate-950 rounded-3xl p-8 md:p-12 border border-slate-800 space-y-8 shadow-2xl">
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-extrabold text-white">Connect With Our Team</h3>
                <p className="text-slate-400 text-sm">Have questions about our educational diagnostic or how our micro-lending pools operate? Contact us directly.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="flex items-center space-x-4 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                  <Mail className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Direct Email</span>
                    <span className="text-sm font-semibold text-slate-200">contact@laminarcapitals.com</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                  <Phone className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Inquiry Line</span>
                    <span className="text-sm font-semibold text-slate-200">+91 (800) 555-0199</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                  <MapPin className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Workspace Base</span>
                    <span className="text-sm font-semibold text-slate-200">Kullu Valley, HP, India</span>
                  </div>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: INVESTOR & BORROWER AUTH PORTAL */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'auth' && (
          <div className="max-w-md mx-auto px-4 py-20">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6">
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-black text-white">
                  {authMode === 'login' ? 'Investor Portal Access' : 'Create Educated Account'}
                </h2>
                <p className="text-xs text-slate-400">
                  {authMode === 'login' ? 'Sign in to review your asset segment performance' : 'Join a community built on financial independence'}
                </p>
              </div>

              <form 
                onSubmit={(e) => { 
                  e.preventDefault(); 
                  setAuthMessage(authMode === 'login' ? 'Logged in successfully.' : 'Registration complete.'); 
                  setIsLoggedIn(true); 
                }} 
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address</label>
                  <input 
                    type="email" required 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:border-cyan-500 focus:outline-none text-sm font-medium" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Password</label>
                  <input 
                    type="password" required 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:border-cyan-500 focus:outline-none text-sm font-medium" 
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm rounded-xl transition-all shadow-lg mt-2"
                >
                  {authMode === 'login' ? 'Enter Portal' : 'Register Profile'}
                </button>
              </form>

              {authMessage && (
                <div className="p-3 bg-cyan-950/80 border border-cyan-800/60 rounded-xl text-cyan-400 text-xs text-center font-semibold">
                  {authMessage}
                </div>
              )}

              <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-800/80">
                {authMode === 'login' ? (
                  <span>New to Laminar? <button onClick={() => setAuthMode('create')} className="text-cyan-400 font-bold hover:underline">Create account</button></span>
                ) : (
                  <span>Already registered? <button onClick={() => setAuthMode('login')} className="text-cyan-400 font-bold hover:underline">Log in</button></span>
                )}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded bg-cyan-500 flex items-center justify-center font-bold text-slate-950 text-xs">L</div>
            <span className="font-semibold text-slate-400">© {new Date().getFullYear()} Laminar Capitals. Freedom Through Financial Literacy.</span>
          </div>
          <div className="flex space-x-6 text-slate-400 font-medium">
            <button onClick={() => setActiveTab('home')} className="hover:text-cyan-400">Diagnostic</button>
            <button onClick={() => setActiveTab('pools')} className="hover:text-cyan-400">Asset Pools</button>
            <button onClick={() => setActiveTab('about')} className="hover:text-cyan-400">About & Mission</button>
          </div>
        </div>
      </footer>

    </div>
  );
}