// ==============================================================================
// FILE: frontend/app/page.tsx
// WHAT IT IS: Institutional 3D-Effect Cashflow Game & Diagnostic Suite
//             for Laminar Capitals (By Laminar Systems).
// ==============================================================================

'use client';

import React, { useState } from 'react';

export default function Home() {
  // ----------------------------------------------------------------------------
  // NAVIGATION & TAB STATES
  // ----------------------------------------------------------------------------
  const [activeTab, setActiveTab] = useState('home');
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState('250000');

  // ----------------------------------------------------------------------------
  // CASHFLOW GAME STATES (SEPARATED MONEY TRAP & LAMINAR FLOWS)
  // ----------------------------------------------------------------------------
  const [gameMode, setGameMode] = useState<'trap' | 'laminar'>('trap');
  const [gameStep, setGameStep] = useState<number>(1);

  // Money Trap Flow States
  const [trapProfession, setTrapProfession] = useState<string>('Active Salary Employee');
  const [trapSalary, setTrapSalary] = useState<string>('85000');
  const [trapLiabilities, setTrapLiabilities] = useState([
    { id: 'rent', name: 'Apartment Rent & Utilities', active: true, cost: 25000 },
    { id: 'car', name: 'Car Loan EMI & Fuel', active: true, cost: 18000 },
    { id: 'phone', name: 'Smartphone & Gadget EMIs', active: false, cost: 5000 },
    { id: 'retail', name: 'Retail Trading Slippage / Losses', active: false, cost: 12000 },
    { id: 'credit', name: 'Credit Card Outstanding Dues', active: false, cost: 10000 },
    { id: 'home_loan', name: 'Primary Mortgage / Home Loan EMI', active: false, cost: 35000 },
    { id: 'personal_loan', name: 'Unsecured Personal / Consumer Loan', active: false, cost: 15000 },
    { id: 'education_loan', name: 'Higher Education / Skill Loan', active: false, cost: 8000 },
  ]);
  const [trapOtherName, setTrapOtherName] = useState('Lifestyle & Subscriptions');
  const [trapOtherCost, setTrapOtherCost] = useState('7000');

  // Laminar Systems Flow States
  const [lamProfession, setLamProfession] = useState<string>('Active Salary Employee');
  const [lamSalary, setLamSalary] = useState<string>('85000');
  const [lamLiabilities, setLamLiabilities] = useState([
    { id: 'rent', name: 'Apartment Rent & Utilities', active: true, cost: 25000 },
    { id: 'car', name: 'Car Loan EMI & Fuel', active: true, cost: 18000 },
    { id: 'phone', name: 'Smartphone & Gadget EMIs', active: false, cost: 5000 },
    { id: 'retail', name: 'Retail Trading Slippage / Losses', active: false, cost: 12000 },
    { id: 'credit', name: 'Credit Card Outstanding Dues', active: false, cost: 10000 },
    { id: 'home_loan', name: 'Primary Mortgage / Home Loan EMI', active: false, cost: 35000 },
    { id: 'personal_loan', name: 'Unsecured Personal / Consumer Loan', active: false, cost: 15000 },
    { id: 'education_loan', name: 'Higher Education / Skill Loan', active: false, cost: 8000 },
  ]);
  const [lamOtherName, setLamOtherName] = useState('Lifestyle & Subscriptions');
  const [lamOtherCost, setLamOtherCost] = useState('7000');

  // Laminar Asset Allocation (Only in Laminar Flow)
  const [lamAssets, setLamAssets] = useState([
    { id: 'laminar_capitals', name: 'Laminar Capitals Flagship Wealth Pool', active: true, amount: 25000, yieldLabel: '18% Compounding' },
    { id: 'laminar_systems', name: 'Laminar Systems Automated Tech Vault', active: true, amount: 15000, yieldLabel: '15% Compounding' },
    { id: 'dividend_equities', name: 'Blue-Chip Dividend Equities', active: false, amount: 10000, yieldLabel: '8% Yield' },
    { id: 'real_estate_trust', name: 'Commercial Real Estate REIT', active: false, amount: 20000, yieldLabel: '10% Yield' },
  ]);

  // ----------------------------------------------------------------------------
  // AUTHENTICATION & DASHBOARD STATES
  // ----------------------------------------------------------------------------
  const [authMode, setAuthMode] = useState<'login' | 'create'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [registeredDatabases, setRegisteredDatabases] = useState<string[]>([
    'client@laminarsystems.io',
    'boss@laminarcapital.com'
  ]);

  const [userProfile, setUserProfile] = useState({
    name: 'Private Client',
    email: 'client@laminarsystems.io',
    accountId: 'LAM-88421-IN',
    tier: 'Verified Wealth Tier',
    status: 'Active Fund Participant',
  });

  const [userInvestment, setUserInvestment] = useState({
    segment: 'Balanced Growth Pool',
    initialDeposit: 500000,
    currentValue: 582000,
    lockInDaysRemaining: 180,
    totalLockInDays: 180,
    maturityStatus: 'Locked',
  });

  // ----------------------------------------------------------------------------
  // EVENT HANDLERS
  // ----------------------------------------------------------------------------
  const handleToggleTrapLiability = (id: string) => {
    setTrapLiabilities(prev => prev.map(item => item.id === id ? { ...item, active: !item.active } : item));
  };
  const handleUpdateTrapLiabilityCost = (id: string, val: string) => {
    const numericVal = parseFloat(val) || 0;
    setTrapLiabilities(prev => prev.map(item => item.id === id ? { ...item, cost: numericVal } : item));
  };

  const handleToggleLamLiability = (id: string) => {
    setLamLiabilities(prev => prev.map(item => item.id === id ? { ...item, active: !item.active } : item));
  };
  const handleUpdateLamLiabilityCost = (id: string, val: string) => {
    const numericVal = parseFloat(val) || 0;
    setLamLiabilities(prev => prev.map(item => item.id === id ? { ...item, cost: numericVal } : item));
  };

  const handleToggleLamAsset = (id: string) => {
    setLamAssets(prev => prev.map(item => item.id === id ? { ...item, active: !item.active } : item));
  };
  const handleUpdateLamAssetAmount = (id: string, val: string) => {
    const numericVal = parseFloat(val) || 0;
    setLamAssets(prev => prev.map(item => item.id === id ? { ...item, amount: numericVal } : item));
  };

  const calculateTrapOutflow = () => {
    const activeSum = trapLiabilities.reduce((sum, item) => sum + (item.active ? item.cost : 0), 0);
    const otherSum = parseFloat(trapOtherCost) || 0;
    return activeSum + otherSum;
  };

  const calculateLamOutflow = () => {
    const activeSum = lamLiabilities.reduce((sum, item) => sum + (item.active ? item.cost : 0), 0);
    const otherSum = parseFloat(lamOtherCost) || 0;
    return activeSum + otherSum;
  };

  const calculateLamTotalAssets = () => {
    return lamAssets.reduce((sum, item) => sum + (item.active ? item.amount : 0), 0);
  };

  const calculateLamPassiveIncome = () => {
    return calculateLamTotalAssets();
  };

  const handleSwitchToLaminarFlow = () => {
    setGameMode('laminar');
    setGameStep(1); 
  };

  const handleResetGame = () => {
    setGameMode('trap');
    setGameStep(1);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail.trim() || !authPassword.trim()) {
      setIsError(true);
      setAuthMessage('Please fill in all required credentials.');
      return;
    }

    const emailTrimmed = authEmail.trim().toLowerCase();

    if (authMode === 'login') {
      if (registeredDatabases.includes(emailTrimmed)) {
        setIsError(false);
        setAuthMessage('');
        setIsLoggedIn(true);
        setUserProfile(prev => ({ ...prev, email: emailTrimmed }));
        setActiveTab('dashboard');
      } else {
        setIsError(true);
        setAuthMessage('ID not recognized. Automatically redirected to Create Account.');
        setAuthMode('create');
      }
    } else {
      if (!registeredDatabases.includes(emailTrimmed)) {
        setRegisteredDatabases(prev => [...prev, emailTrimmed]);
      }
      setIsError(false);
      setAuthMessage('');
      setIsLoggedIn(true);
      setUserProfile({
        name: 'Private Client',
        email: emailTrimmed,
        accountId: 'LAM-' + Math.floor(10000 + Math.random() * 90000) + '-X',
        tier: 'Verified Wealth Tier',
        status: 'Active Fund Participant',
      });
      setActiveTab('dashboard');
    }
  };

  const handleConfirmInvestment = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount) || 0;

    setUserInvestment({
      segment: selectedSegment || 'Custom Wealth Pool',
      initialDeposit: amount,
      currentValue: amount,
      lockInDaysRemaining: 180,
      totalLockInDays: 180,
      maturityStatus: 'Locked',
    });

    setSelectedSegment(null);
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950 relative overflow-hidden">
      
      {/* SOPHISTICATED AMBIENT LIGHTING */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[500px] bg-gradient-to-br from-cyan-600/10 via-blue-600/5 to-transparent blur-[160px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[700px] h-[500px] bg-gradient-to-tl from-indigo-600/10 via-blue-900/5 to-transparent blur-[160px] rounded-full pointer-events-none"></div>

      {/* ========================================================================
          TOP NAVIGATION BAR (INSTITUTIONAL HEADER)
          ======================================================================== */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#0b0f19]/90 backdrop-blur-xl w-full">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* TOP-LEFT: Brand & Navigation Links */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('home')}>
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center font-black text-white text-base shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
                L
              </div>
              <div>
                <span className="font-extrabold tracking-wider text-white text-sm block">LAMINAR CAPITALS</span>
                <span className="text-cyan-400 font-mono text-[9px] uppercase font-bold tracking-widest block -mt-0.5">Asset & Capital Engine</span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800 text-xs font-semibold shadow-inner">
              <button onClick={() => setActiveTab('home')} className={`px-4 py-2 rounded-md transition-all duration-200 ${activeTab === 'home' ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold shadow-sm" : "text-slate-400 hover:text-slate-200"}`}>
                Home
              </button>
              <button onClick={() => setActiveTab('about')} className={`px-4 py-2 rounded-md transition-all duration-200 ${activeTab === 'about' ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold shadow-sm" : "text-slate-400 hover:text-slate-200"}`}>
                About Us
              </button>
              <button onClick={() => setActiveTab('segments')} className={`px-4 py-2 rounded-md transition-all duration-200 ${activeTab === 'segments' ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold shadow-sm" : "text-slate-400 hover:text-slate-200"}`}>
                Investment Pools
              </button>
              <button onClick={() => setActiveTab('products')} className={`px-4 py-2 rounded-md transition-all duration-200 ${activeTab === 'products' ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold shadow-sm" : "text-slate-400 hover:text-slate-200"}`}>
                Products
              </button>
              <button onClick={() => setActiveTab('why-we-exist')} className={`px-4 py-2 rounded-md transition-all duration-200 ${activeTab === 'why-we-exist' ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold shadow-sm" : "text-slate-400 hover:text-slate-200"}`}>
                Why We Exist
              </button>
            </nav>
          </div>

          {/* TOP-RIGHT: Login & Sign Up Options */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { 
                if (isLoggedIn) {
                  setActiveTab('dashboard');
                } else {
                  setAuthMode('login'); 
                  setAuthMessage('');
                  setActiveTab('auth'); 
                }
              }} 
              className={`text-xs font-mono font-semibold px-3 py-2 transition-colors hover:text-cyan-400 ${activeTab === 'auth' || activeTab === 'dashboard' ? 'text-cyan-400 font-bold' : 'text-slate-300'}`}
            >
              {isLoggedIn ? 'Client Portal' : 'Login'}
            </button>
            <button 
              onClick={() => { 
                setAuthMode('create'); 
                setAuthMessage('');
                setActiveTab('auth'); 
              }} 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs px-5 py-2.5 rounded-lg transition-all duration-200 shadow-md shadow-cyan-500/20"
            >
              Sign Up
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================================
          MAIN VIEW ROUTING
          ======================================================================== */}
      <main className="flex-grow z-10">
        
        {/* VIEW 1: HOME (3D CASHFLOW GAME & DUAL FLOW SIMULATOR) */}
        {activeTab === 'home' && (
          <div className="flex flex-col space-y-24 pb-24">
            
            {/* HERO SECTION */}
            <section className="relative px-6 pt-24 pb-8 max-w-5xl mx-auto text-center flex flex-col items-center">
              <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-slate-800 text-cyan-400 text-xs font-mono font-semibold px-4 py-1.5 rounded-full mb-6 shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                INSTITUTIONAL CASHFLOW DIAGNOSTIC SUITE
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                Navigate the Cash Flow Trap <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Build True Asset-Backed Momentum
                </span>
              </h1>

              <p className="text-slate-400 text-base md:text-lg max-w-2xl mb-10 leading-relaxed font-light">
                Analyze your personal balance sheet structure. Identify active liabilities draining your income, then transition to audited compounding asset allocations.
              </p>
            </section>

            {/* INTERACTIVE GAME CONTAINER (3D ELEVATED GLASS PANEL) */}
            <section className="px-6 max-w-5xl mx-auto w-full">
              <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-800 p-8 md:p-10 rounded-3xl shadow-2xl space-y-8 relative overflow-hidden transition-all duration-300">
                
                {/* FLOW MODE TABS HEADER */}
                <div className="flex flex-col sm:flex-row justify-between items-center border-b border-slate-800 pb-6 gap-4">
                  
                  {/* Dynamic Bold Header with High-End 3D Icon */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl blur-md"></div>
                      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700/80 flex items-center justify-center shadow-[0_8px_16px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)]">
                        {gameMode === 'trap' ? (
                          /* 3D Modern Lightning Icon */
                          <svg className="w-6 h-6 text-amber-400 drop-shadow-[0_2px_4px_rgba(245,158,11,0.4)] fill-current" viewBox="0 0 24 24">
                            <path d="M13 2L3 14h7v8l10-12h-7z" />
                          </svg>
                        ) : (
                          /* 3D Modern Flow Wave Icon */
                          <svg className="w-6 h-6 text-cyan-400 drop-shadow-[0_2px_4px_rgba(6,182,212,0.4)] fill-current" viewBox="0 0 24 24">
                            <path d="M2 12c2.5 0 4-2.5 6.5-2.5s4 2.5 6.5 2.5 4-2.5 6.5-2.5v2.5c-2.5 0-4 2.5-6.5 2.5s-4-2.5-6.5-2.5-4 2.5-6.5 2.5V12z" />
                            <path d="M2 6c2.5 0 4-2.5 6.5-2.5s4 2.5 6.5 2.5 4-2.5 6.5-2.5v2.5c-2.5 0-4 2.5-6.5 2.5s-4-2.5-6.5-2.5-4 2.5-6.5 2.5V6z" opacity="0.5" />
                          </svg>
                        )}
                      </div>
                    </div>

                    <div>
                      {/* Introductory line */}
                      <p className="text-slate-400 text-xs font-mono tracking-wide uppercase font-semibold">
                        Understanding your cash flow
                      </p>
                      {/* Colored, bold header title */}
                      <h3 className={`font-black text-2xl md:text-3xl tracking-tight bg-clip-text text-transparent drop-shadow-sm bg-gradient-to-r ${
                        gameMode === 'trap' ? 'from-rose-400 via-amber-400 to-orange-400' : 'from-cyan-400 via-blue-400 to-indigo-400'
                      }`}>
                        {gameMode === 'trap' ? 'The Money Trap' : 'Laminar Flow'}
                      </h3>
                    </div>
                  </div>

                  {/* Mode Controls */}
                  <div className="flex items-center gap-2.5">
                    <button 
                      onClick={() => { setGameMode('trap'); setGameStep(1); }} 
                      className={`px-4.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all duration-200 flex items-center gap-2 ${
                        gameMode === 'trap' 
                          ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 shadow-md shadow-rose-950/50 scale-105' 
                          : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M13 2L3 14h7v8l10-12h-7z"/></svg>
                      <span>The Money Trap</span>
                    </button>

                    <button 
                      onClick={() => { setGameMode('laminar'); setGameStep(1); }} 
                      className={`px-4.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all duration-200 flex items-center gap-2 ${
                        gameMode === 'laminar' 
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-950/50 scale-105' 
                          : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M2 12c2.5 0 4-2.5 6.5-2.5s4 2.5 6.5 2.5 4-2.5 6.5-2.5v2.5c-2.5 0-4 2.5-6.5 2.5s-4-2.5-6.5-2.5-4 2.5-6.5 2.5V12z"/></svg>
                      <span>Laminar Flow</span>
                    </button>

                    <button onClick={handleResetGame} className="text-xs font-mono text-slate-400 bg-slate-950 hover:bg-slate-800 px-3 py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 9a9 9 0 0114.82-3.36L20 7M4 17l1.18 1.36A9 9 0 0020 15"/></svg>
                      <span>Reset</span>
                    </button>
                  </div>

                </div>

                {/* PART A: MONEY TRAP FLOW WIZARD */}
                {gameMode === 'trap' && (
                  <div className="space-y-6">
                    {gameStep === 1 && (
                      <div className="space-y-6">
                        <div className="text-center space-y-2">
                          <span className="text-xs font-mono uppercase bg-gradient-to-r from-rose-500/20 to-amber-500/20 text-amber-300 px-4 py-1 rounded-full border border-rose-500/30 font-bold inline-block shadow-sm">Inflow Profile</span>
                          <h4 className="text-3xl font-black text-white tracking-tight">Select Profession</h4>
                          <p className="text-slate-400 text-sm font-light">Choose the profile matching your primary income generation stream:</p>
                        </div>

                        {/* REFINED TACTILE BUTTON CARDS WITH RICH 3D ICONS & ACCENTS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pt-3">
                          {[
                            { title: 'Active Salary Employee', desc: 'Corporate / IT / Government job', icon: '💼' },
                            { title: 'Entrepreneur', desc: 'Venture, startup, & business builder', icon: '🚀' },
                            { title: 'Small Business Handler', desc: 'Regional shop & commerce owner', icon: '🏬' },
                            { title: 'Independent Proprietor', desc: 'Freelancer, agency head, or consultant', icon: '💻' },
                            { title: 'Financial / Crypto Trader', desc: 'Active market specifier & investor', icon: '📈' },
                            { title: 'Medical / Legal Professional', desc: 'Doctor, lawyer, or specialized expert', icon: '⚖️' },
                          ].map((item) => (
                            <div
                              key={item.title}
                              onClick={() => { setTrapProfession(item.title); setGameStep(2); }}
                              className={`group p-6 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden ${
                                trapProfession === item.title 
                                  ? 'bg-gradient-to-br from-rose-950/60 via-slate-900 to-slate-950 border-rose-500 text-white shadow-[0_0_25px_rgba(244,63,94,0.35)] scale-[1.02]' 
                                  : 'bg-slate-950/80 hover:bg-slate-900/90 border-slate-800/80 hover:border-cyan-500/60 text-slate-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:-translate-y-1'
                              }`}
                            >
                              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-full blur-xl pointer-events-none"></div>
                              <div className="text-2xl mb-3">{item.icon}</div>
                              <h5 className="font-bold text-base mb-1.5 text-white group-hover:text-cyan-300 transition-colors">{item.title}</h5>
                              <p className="text-xs font-mono text-slate-400 group-hover:text-slate-300 transition-colors">{item.desc}</p>
                              
                              <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800/60">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-semibold">Select Profile</span>
                                <span className="text-xs text-slate-500 group-hover:text-cyan-400 transition-colors">➔</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {gameStep === 2 && (
                      <div className="space-y-6 text-center max-w-md mx-auto py-4">
                        <span className="text-xs font-mono uppercase bg-cyan-950/60 text-cyan-300 px-4 py-1 rounded-full border border-cyan-800/60 font-bold inline-block shadow-sm">Monthly Inflow</span>
                        <h4 className="text-3xl font-black text-white tracking-tight">Monthly Take-Home Inflow</h4>
                        <p className="text-slate-400 text-sm font-light">Enter your baseline net monthly earnings in <strong className="text-cyan-400 font-bold">INR (₹)</strong>:</p>

                        <div className="relative">
                          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-400 font-bold font-mono text-2xl">₹</span>
                          <input 
                            type="number" 
                            value={trapSalary} 
                            onChange={(e) => setTrapSalary(e.target.value)}
                            className="w-full bg-slate-950 border-2 border-slate-800 text-white font-mono text-3xl p-5 pl-12 rounded-2xl focus:outline-none focus:border-cyan-500 transition-all shadow-inner"
                            placeholder="85000"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-3 font-mono text-xs">
                          {[60000, 120000, 250000].map((amt) => (
                            <button
                              key={amt}
                              onClick={() => setTrapSalary(amt.toString())}
                              className="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:border-cyan-500/50 transition-all shadow-md font-bold"
                            >
                              ₹{(amt/1000).toFixed(0)}k / mo
                            </button>
                          ))}
                        </div>

                        <div className="pt-4 flex gap-4">
                          <button onClick={() => setGameStep(1)} className="w-1/2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3.5 rounded-xl border border-slate-700 transition-all">Back</button>
                          <button onClick={() => setGameStep(3)} className="w-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black py-3.5 rounded-xl shadow-lg shadow-cyan-500/20 transition-all">Next: Liabilities ➔</button>
                        </div>
                      </div>
                    )}

                    {gameStep === 3 && (
                      <div className="space-y-6">
                        <div className="text-center space-y-2">
                          <span className="text-xs font-mono uppercase bg-rose-950/60 text-rose-300 px-4 py-1 rounded-full border border-rose-800/60 font-bold inline-block shadow-sm">Obligations Audit</span>
                          <h4 className="text-3xl font-black text-white tracking-tight">Configure Monthly Liabilities</h4>
                          <p className="text-slate-400 text-sm font-light">Select active obligations extracting your monthly cash flow:</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {trapLiabilities.map((item) => (
                            <div 
                              key={item.id}
                              className={`p-4.5 rounded-2xl border transition-all space-y-3 shadow-md ${
                                item.active 
                                  ? 'bg-rose-950/25 border-rose-500/70 text-white shadow-rose-950/40' 
                                  : 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:border-slate-700'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleToggleTrapLiability(item.id)}>
                                  <input type="checkbox" checked={item.active} onChange={() => {}} className="w-4.5 h-4.5 accent-rose-500 cursor-pointer rounded" />
                                  <span className="font-bold text-xs sm:text-sm text-white">{item.name}</span>
                                </div>
                                <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full ${item.active ? 'bg-rose-500/25 text-rose-300 border border-rose-500/50 shadow-sm' : 'bg-slate-900 text-slate-500'}`}>
                                  {item.active ? 'Active' : 'Off'}
                                </span>
                              </div>

                              {item.active && (
                                <div className="flex items-center gap-2 pt-1">
                                  <span className="text-xs font-mono text-slate-400">₹</span>
                                  <input 
                                    type="number" 
                                    value={item.cost} 
                                    onChange={(e) => handleUpdateTrapLiabilityCost(item.id, e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-800 text-white font-mono text-xs p-2.5 rounded-xl focus:outline-none focus:border-rose-500"
                                  />
                                  <span className="text-[10px] font-mono text-slate-500">/mo</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-inner">
                          <div className="flex items-center gap-2">
                            <span className="text-cyan-400 font-bold text-xs">◆</span>
                            <h5 className="text-white font-bold text-xs uppercase tracking-wider">Other Custom Monthly Expenses</h5>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input 
                              type="text" 
                              value={trapOtherName} 
                              onChange={(e) => setTrapOtherName(e.target.value)} 
                              className="bg-slate-900 border border-slate-800 text-white font-mono text-xs p-3 rounded-xl focus:outline-none focus:border-cyan-500" 
                              placeholder="Expense Name"
                            />
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono text-slate-400">₹</span>
                              <input 
                                type="number" 
                                value={trapOtherCost} 
                                onChange={(e) => setTrapOtherCost(e.target.value)} 
                                className="w-full bg-slate-900 border border-slate-800 text-white font-mono text-xs p-3 rounded-xl focus:outline-none focus:border-cyan-500" 
                              />
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 text-center">
                          <button 
                            onClick={() => setGameStep(4)}
                            className="bg-gradient-to-r from-rose-500 via-amber-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-slate-950 font-black px-10 py-4 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-rose-950/50 transition-all hover:scale-105"
                          >
                            Generate Diagnostic Statement ➔
                          </button>
                        </div>
                      </div>
                    )}

                    {gameStep === 4 && (
                      <div className="space-y-6">
                        <div className="text-center space-y-2">
                          <span className="text-xs font-mono uppercase bg-rose-950/60 text-rose-300 px-4 py-1 rounded-full border border-rose-800/60 font-bold inline-block shadow-sm">Audit Result</span>
                          <h4 className="text-3xl font-black text-white tracking-tight">Zero Asset Accumulation</h4>
                        </div>

                        <div className="bg-slate-950/90 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-2xl">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-inner">
                              <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Inflow Source Profile</span>
                              <p className="text-white font-bold text-base">{trapProfession}</p>
                            </div>
                            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex justify-between items-center shadow-inner">
                              <div>
                                <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Gross Monthly Inflow</span>
                                <p className="text-emerald-400 font-mono font-black text-xl">₹{parseFloat(trapSalary || '0').toLocaleString()}</p>
                              </div>
                              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/50 px-3 py-1 rounded-full border border-cyan-950 font-bold">Active Stream</span>
                            </div>
                          </div>

                          <div className="text-center pt-2">
                            <button
                              onClick={handleSwitchToLaminarFlow}
                              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black px-10 py-4 rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-cyan-950/50 transition-all hover:scale-105"
                            >
                              Transition to Laminar Flow 🌊
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* PART B: LAMINAR FLOW WIZARD */}
                {gameMode === 'laminar' && (
                  <div className="space-y-6 text-center py-6">
                    <span className="text-xs font-mono uppercase bg-cyan-950/60 text-cyan-400 px-4 py-1 rounded-full border border-cyan-800/60 font-bold inline-block shadow-sm">Laminar Engine</span>
                    <h4 className="text-3xl font-black text-white tracking-tight">Asset Compounding Module Enabled</h4>
                    <p className="text-slate-400 text-sm max-w-md mx-auto font-light">Access your portal or inspect investment pool metrics to route capital into verified asset streams.</p>
                  </div>
                )}

              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: ABOUT US */}
        {activeTab === 'about' && (
          <div className="max-w-4xl mx-auto px-6 py-20 space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">About Us</h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed font-light">
              Laminar Capitals engineers institutional financial clarity through proprietary cashflow diagnostic suites. We bridge private capital with audited, high-yield business credit pools in the real economy.
            </p>
          </div>
        )}

        {/* VIEW 3: INVESTMENT POOLS */}
        {activeTab === 'segments' && (
          <div className="max-w-5xl mx-auto px-6 py-20 space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Investment Pools</h2>
            <p className="text-slate-300 text-base font-light">Explore our audited short-cycle and monthly compounding credit allocation segments.</p>
          </div>
        )}

        {/* VIEW 4: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="max-w-5xl mx-auto px-6 py-20 space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Products & Systems</h2>
            <p className="text-slate-300 text-base font-light">Discover our professional cashflow modeling tools and automated wealth vaults.</p>
          </div>
        )}

        {/* VIEW 5: WHY WE EXIST */}
        {activeTab === 'why-we-exist' && (
          <div className="max-w-5xl mx-auto px-6 py-20 space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Why We Exist</h2>
            <p className="text-slate-300 text-base font-light">We exist to transition individuals and institutions away from unmanaged debt traps and toward transparent, asset-backed financial freedom.</p>
          </div>
        )}

        {/* VIEW 6: AUTH */}
        {activeTab === 'auth' && (
          <div className="max-w-md mx-auto px-6 py-20">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6">
              <h2 className="text-xl font-bold text-white text-center">
                {authMode === 'login' ? 'Client Portal Authentication' : 'Register Private Account'}
              </h2>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    value={authEmail} 
                    onChange={(e) => setAuthEmail(e.target.value)} 
                    required 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:outline-none text-sm transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Password</label>
                  <input 
                    type="password" 
                    value={authPassword} 
                    onChange={(e) => setAuthPassword(e.target.value)} 
                    required 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:outline-none text-sm transition-all" 
                  />
                </div>

                <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm rounded-xl shadow-md transition-all">
                  {authMode === 'login' ? 'Authenticate' : 'Create Profile'}
                </button>
              </form>

              {authMessage && (
                <div className={`p-3 rounded-xl text-xs text-center font-semibold ${isError ? 'bg-rose-950/40 text-rose-300 border border-rose-800/60' : 'bg-cyan-950/40 text-cyan-300 border border-cyan-800/60'}`}>
                  {authMessage}
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-[#0b0f19] py-8 text-xs text-slate-500 text-center">
        <p>© 2026 Laminar Capitals. Institutional Financial Architecture.</p>
      </footer>

    </div>
  );
}