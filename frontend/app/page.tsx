// ==============================================================================
// FILE: frontend/app/page.tsx
// WHAT IT IS: Immersive 3D-Effect Cashflow Game ("How Money Traps You vs. Laminar Flow")
//             for Laminar Capital (By Laminar Systems).
// WHY WE USE IT: Corrects asset passive income calculation to match total asset allocation
//               and restructures the final balance sheets and P&L statements.
// WHY IT'S IMPORTANT HERE: Primary root entry point (http://localhost:3000) for Next.js.
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
    // Fixed: Direct accumulation of active asset allocations to correctly match Total Asset Pool
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
    <div className="min-h-screen bg-[#07050E] text-gray-100 font-sans flex flex-col justify-between selection:bg-pink-500 selection:text-white relative overflow-hidden">
      
      {/* 3D ATMOSPHERIC NEON DIGITAL GRAPHIC EFFECTS */}
      <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-gradient-to-br from-purple-600/20 via-fuchsia-600/10 to-transparent blur-[190px] rounded-full pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[900px] h-[900px] bg-gradient-to-tl from-pink-600/20 via-purple-900/10 to-transparent blur-[190px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[160px] rounded-full pointer-events-none"></div>

      {/* ========================================================================
          TOP NAVIGATION BAR
          ======================================================================== */}
      <header className="border-b border-purple-500/25 bg-[#100A20]/90 backdrop-blur-2xl sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-2xl">
        <div 
          className="flex items-center gap-3.5 cursor-pointer group" 
          onClick={() => setActiveTab('home')}
        >
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 flex items-center justify-center font-black text-white text-2xl shadow-xl shadow-purple-500/30 group-hover:scale-105 transition-all duration-300">
            ▲
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-wider text-white group-hover:text-pink-400 transition-colors">
              LAMINAR CAPITAL
            </span>
            <span className="text-[10px] tracking-widest text-pink-400 font-mono font-bold uppercase -mt-0.5">
              BY LAMINAR SYSTEMS
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1.5 bg-[#170E2E]/90 p-1.5 rounded-full border border-purple-500/25 text-sm font-medium shadow-inner">
          <button onClick={() => setActiveTab('home')} className={`px-6 py-2 rounded-full transition-all duration-300 ${activeTab === 'home' ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black shadow-lg shadow-purple-500/30 scale-105" : "text-gray-300 hover:text-white"}`}>
            Home
          </button>
          <button onClick={() => setActiveTab('about')} className={`px-6 py-2 rounded-full transition-all duration-300 ${activeTab === 'about' ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black shadow-lg shadow-purple-500/30 scale-105" : "text-gray-300 hover:text-white"}`}>
            About Us
          </button>
          <button onClick={() => setActiveTab('segments')} className={`px-6 py-2 rounded-full transition-all duration-300 ${activeTab === 'segments' ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black shadow-lg shadow-purple-500/30 scale-105" : "text-gray-300 hover:text-white"}`}>
            Investment Pools
          </button>
          
          {isLoggedIn && (
            <button onClick={() => setActiveTab('dashboard')} className={`px-6 py-2 rounded-full transition-all duration-300 ${activeTab === 'dashboard' ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black shadow-lg shadow-purple-500/30 scale-105" : "text-gray-300 hover:text-white"}`}>
              Dashboard
            </button>
          )}
        </nav>

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
            className={`text-sm font-medium px-3 py-2 transition-colors font-mono ${activeTab === 'auth' || activeTab === 'dashboard' ? 'text-pink-400 font-bold' : 'text-gray-300 hover:text-white'}`}
          >
            {isLoggedIn ? 'Client Portal' : 'Login'}
          </button>
          <button 
            onClick={() => { 
              setAuthMode('create'); 
              setAuthMessage('');
              setActiveTab('auth'); 
            }} 
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white text-sm font-black px-6 py-2.5 rounded-xl transition-all shadow-xl shadow-purple-500/25 hover:scale-105"
          >
            Create Account
          </button>
        </div>
      </header>


      {/* ========================================================================
          MAIN VIEW ROUTING
          ======================================================================== */}
      <main className="flex-grow z-10">
        
        {/* ----------------------------------------------------------------------
            VIEW 1: HOME (3D CASHFLOW GAME & DUAL FLOW SIMULATOR)
            ---------------------------------------------------------------------- */}
        {activeTab === 'home' && (
          <div className="flex flex-col space-y-28 pb-20">
            
            {/* HERO SECTION */}
            <section className="relative px-6 pt-24 pb-12 max-w-6xl mx-auto text-center flex flex-col items-center">
              <div className="inline-flex items-center gap-2 bg-[#170E2E] border border-pink-500/40 text-pink-300 text-xs font-mono font-bold px-4 py-2 rounded-full mb-8 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping"></span>
                3D DIGITAL CASHFLOW SIMULATOR • BY LAMINAR SYSTEMS
              </div>

              <h1 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tight mb-8 drop-shadow-[0_10px_20px_rgba(168,85,247,0.3)]">
                How Money Traps You <br />
                <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                  The Cash Flow Trap & Laminar Engine
                </span>
              </h1>

              <p className="text-gray-300 text-base md:text-xl max-w-3xl mb-12 leading-relaxed font-light">
                Experience the Money Trap where your asset column sits at zero. Then cross over into the Laminar Systems flow to watch your savings diversify into powerful compounding asset columns.
              </p>
            </section>

            {/* INTERACTIVE GAME CONTAINER */}
            <section className="px-6 max-w-5xl mx-auto w-full">
              <div className="bg-gradient-to-b from-[#140C28]/95 to-[#0D071A]/95 backdrop-blur-2xl border-2 border-purple-500/60 p-8 md:p-12 rounded-3xl shadow-[0_0_60px_rgba(168,85,247,0.25)] space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600/15 blur-[150px] rounded-full pointer-events-none"></div>

                {/* FLOW MODE TABS HEADER */}
                <div className="flex flex-col sm:flex-row justify-between items-center border-b border-purple-500/20 pb-4 gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl animate-spin">🌀</span>
                    <div>
                      <h3 className="text-white font-black text-lg">
                        {gameMode === 'trap' ? 'Phase 1: The Money Trap Flow' : 'Phase 2: Laminar Systems Flow'}
                      </h3>
                      <p className="text-gray-400 text-xs font-mono">
                        {gameMode === 'trap' ? `Step ${gameStep} of 3 • No Assets Allowed` : `Step ${gameStep} of 4 • Asset Building Enabled`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => { setGameMode('trap'); setGameStep(1); }} 
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${gameMode === 'trap' ? 'bg-red-950 text-red-300 border border-red-500/50 shadow-md' : 'bg-[#1A1033] text-gray-400 hover:text-white'}`}
                    >
                      ⚡ Money Trap Flow
                    </button>
                    <button 
                      onClick={() => { setGameMode('laminar'); setGameStep(1); }} 
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${gameMode === 'laminar' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' : 'bg-[#1A1033] text-gray-400 hover:text-white'}`}
                    >
                      🌊 Laminar Flow
                    </button>
                    <button onClick={handleResetGame} className="text-xs font-mono text-pink-400 bg-[#1A1033] px-3 py-2 rounded-xl border border-purple-500/40 hover:bg-purple-900/40 transition-all">
                      ↺ Reset
                    </button>
                  </div>
                </div>

                {/* ==========================================================
                    PART A: MONEY TRAP FLOW WIZARD (STEPS 1 TO 3)
                    ========================================================== */}
                {gameMode === 'trap' && (
                  <>
                    {/* TRAP STEP 1: PROFESSION */}
                    {gameStep === 1 && (
                      <div className="space-y-6">
                        <div className="text-center space-y-2">
                          <span className="text-xs font-mono uppercase bg-red-950 text-red-300 px-3 py-1 rounded-full border border-red-500/40 font-bold">Money Trap Flow</span>
                          <h4 className="text-2xl font-bold text-white">Step 1: Choose Your Profession / Inflow Source</h4>
                          <p className="text-gray-300 text-sm font-light">Select how you earn your primary living:</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {[
                            { title: 'Active Salary Employee', desc: 'Corporate / IT / Government job' },
                            { title: 'Entrepreneur', desc: 'Venture, startup, & business builder' },
                            { title: 'Small Business Handler', desc: 'Regional shop & commerce owner' },
                            { title: 'Independent Proprietor', desc: 'Freelancer, agency head, or consultant' },
                            { title: 'Financial / Crypto Trader', desc: 'Active market specifier & investor' },
                            { title: 'Medical / Legal Professional', desc: 'Doctor, lawyer, or specialized expert' },
                          ].map((item) => (
                            <div
                              key={item.title}
                              onClick={() => { setTrapProfession(item.title); setGameStep(2); }}
                              className={`p-5 rounded-2xl border cursor-pointer transition-all hover:scale-105 shadow-xl ${trapProfession === item.title ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white border-pink-400 shadow-[0_0_25px_rgba(236,72,153,0.4)]' : 'bg-[#0A0614] border-purple-500/30 text-gray-300 hover:border-pink-500'}`}
                            >
                              <h5 className="font-bold text-sm">{item.title}</h5>
                              <p className={`text-[11px] mt-1 font-mono ${trapProfession === item.title ? 'text-white/90' : 'text-gray-400'}`}>{item.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TRAP STEP 2: SALARY IN RUPEES */}
                    {gameStep === 2 && (
                      <div className="space-y-6 text-center max-w-lg mx-auto">
                        <span className="text-xs font-mono uppercase bg-red-950 text-red-300 px-3 py-1 rounded-full border border-red-500/40 font-bold">Money Trap Flow</span>
                        <h4 className="text-2xl font-bold text-white">Step 2: Enter Your Monthly Salary / Inflow</h4>
                        <p className="text-gray-300 text-sm font-light">Enter your monthly earnings in <strong className="text-pink-400">Indian Rupees (₹)</strong>:</p>

                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 font-bold font-mono text-xl">₹</span>
                          <input 
                            type="number" 
                            value={trapSalary} 
                            onChange={(e) => setTrapSalary(e.target.value)}
                            className="w-full bg-[#0A0614] border border-purple-500/40 text-white font-mono text-2xl p-4 pl-10 rounded-2xl focus:outline-none focus:border-pink-500 shadow-inner"
                            placeholder="85000"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-3 font-mono text-xs pt-2">
                          {[60000, 120000, 250000].map((amt) => (
                            <button
                              key={amt}
                              onClick={() => setTrapSalary(amt.toString())}
                              className="p-3 rounded-xl bg-[#0A0614] border border-purple-500/30 text-gray-300 hover:border-pink-500 transition-all"
                            >
                              ₹{(amt/1000).toFixed(0)}k / mo
                            </button>
                          ))}
                        </div>

                        <div className="pt-4 flex gap-4">
                          <button onClick={() => setGameStep(1)} className="w-1/2 bg-[#1A1033] text-gray-300 py-3 rounded-xl border border-purple-500/25">Back</button>
                          <button onClick={() => setGameStep(3)} className="w-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg">Next: Liabilities ➔</button>
                        </div>
                      </div>
                    )}

                    {/* TRAP STEP 3: LIABILITIES & EXPENSES */}
                    {gameStep === 3 && (
                      <div className="space-y-6">
                        <div className="text-center space-y-2">
                          <span className="text-xs font-mono uppercase bg-red-950 text-red-300 px-3 py-1 rounded-full border border-red-500/40 font-bold">Money Trap Flow</span>
                          <h4 className="text-2xl font-bold text-white">Step 3: Select Liabilities & Custom Outflows (₹)</h4>
                          <p className="text-gray-300 text-sm font-light">
                            Select what sucks your money out. <strong className="text-red-400">Note: No asset building options are available in this mode.</strong>
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {trapLiabilities.map((item) => (
                            <div 
                              key={item.id}
                              className={`p-4 rounded-2xl border transition-all space-y-3 ${item.active ? 'bg-red-950/40 border-red-500 text-white shadow-md' : 'bg-[#0A0614] border-purple-500/30 text-gray-400 hover:border-pink-500'}`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleToggleTrapLiability(item.id)}>
                                  <input type="checkbox" checked={item.active} onChange={() => {}} className="w-4 h-4 accent-pink-500 cursor-pointer" />
                                  <span className="font-bold text-xs sm:text-sm">{item.name}</span>
                                </div>
                                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${item.active ? 'bg-red-500 text-white' : 'bg-[#170E2E] text-gray-400'}`}>
                                  {item.active ? 'Active Trap' : 'Inactive'}
                                </span>
                              </div>

                              {item.active && (
                                <div className="flex items-center gap-2 pt-1">
                                  <span className="text-xs font-mono text-pink-400">₹</span>
                                  <input 
                                    type="number" 
                                    value={item.cost} 
                                    onChange={(e) => handleUpdateTrapLiabilityCost(item.id, e.target.value)}
                                    className="w-full bg-[#07050E] border border-red-500/40 text-white font-mono text-xs p-2 rounded-xl focus:outline-none focus:border-pink-500"
                                  />
                                  <span className="text-[10px] font-mono text-gray-400">/mo</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* SEPARATE BOX FOR OTHER EXPENSES */}
                        <div className="bg-[#0A0614] border border-purple-500/40 p-5 rounded-2xl space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="text-pink-400 font-bold">📦</span>
                            <h5 className="text-white font-bold text-sm">Other Custom Expenses / Liabilities Box</h5>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input 
                              type="text" 
                              value={trapOtherName} 
                              onChange={(e) => setTrapOtherName(e.target.value)} 
                              className="bg-[#07050E] border border-purple-500/30 text-white font-mono text-xs p-3 rounded-xl focus:outline-none" 
                              placeholder="Expense Name"
                            />
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono text-pink-400">₹</span>
                              <input 
                                type="number" 
                                value={trapOtherCost} 
                                onChange={(e) => setTrapOtherCost(e.target.value)} 
                                className="w-full bg-[#07050E] border border-purple-500/30 text-white font-mono text-xs p-3 rounded-xl focus:outline-none" 
                              />
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 text-center">
                          <button 
                            onClick={() => setGameStep(4)}
                            className="bg-gradient-to-r from-red-600 to-pink-600 text-white font-black px-10 py-4 rounded-xl text-xs font-mono shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:scale-105 transition-all"
                          >
                            View Money Trap Statement (Zero Assets) ➔
                          </button>
                        </div>
                      </div>
                    )}

                    {/* TRAP STEP 4: FINAL MONEY TRAP STATEMENT */}
                    {gameStep === 4 && (
                      <div className="space-y-8">
                        <div className="text-center space-y-2">
                          <span className="text-xs font-mono uppercase bg-red-950 text-red-300 px-3.5 py-1.5 rounded-full border border-red-500/40 font-bold">Phase 1 Result</span>
                          <h4 className="text-2xl font-bold text-white">The Rat Race Trap: Your Asset Column is Empty</h4>
                          <p className="text-gray-300 text-sm font-light">Structure: Inflow Source $\rightarrow$ Balance Sheet $\rightarrow$ Income Statement</p>
                        </div>

                        <div className="bg-[#0A0614] border-2 border-red-500/50 p-6 md:p-8 rounded-3xl space-y-8 shadow-[0_0_40px_rgba(239,68,68,0.3)] relative">
                          
                          {/* 1. INFLOW SOURCE & MONTHLY ACTIVE INCOME */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            <div className="bg-[#120922] border border-pink-500/50 p-4 rounded-2xl space-y-1">
                              <span className="text-[10px] font-mono text-pink-400 uppercase font-bold">Inflow Source</span>
                              <p className="text-white font-bold text-sm">👤 {trapProfession}</p>
                            </div>
                            <div className="bg-[#120922] border border-purple-500/50 p-4 rounded-2xl flex justify-between items-center">
                              <div>
                                <span className="text-[10px] font-mono text-gray-400 uppercase font-bold">Monthly Income Active Stream</span>
                                <p className="text-emerald-400 font-mono font-black text-lg">₹{parseFloat(trapSalary || '0').toLocaleString()}</p>
                              </div>
                              <span className="text-xs font-mono text-pink-400 bg-pink-950/60 px-3 py-1 rounded-full border border-pink-500/30">Active Stream</span>
                            </div>
                          </div>

                          {/* 2. BALANCE SHEET (ASSETS VS LIABILITIES COLUMNS) */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* ASSETS (LOCKED AT ZERO) */}
                            <div className="border-2 border-red-500/40 bg-red-950/20 p-6 rounded-2xl space-y-4 text-center py-12 flex flex-col justify-center items-center">
                              <span className="text-xs font-mono uppercase text-red-400 font-bold">Assets Column (Left)</span>
                              <p className="text-red-400 text-3xl font-black">₹0 (ZERO)</p>
                              <p className="text-xs text-gray-300 px-4">
                                No asset column built. Zero passive income generated!
                              </p>
                            </div>

                            {/* LIABILITIES */}
                            <div className="border-2 border-red-500 bg-red-950/40 p-6 rounded-2xl space-y-4">
                              <div className="border-b border-purple-500/20 pb-2 flex justify-between items-center">
                                <span className="text-xs font-mono uppercase text-red-400 font-bold">Liabilities Column (Right)</span>
                                <span className="text-[10px] font-mono text-red-300">Sucks Money Out</span>
                              </div>
                              <div className="space-y-2 font-mono text-xs max-h-40 overflow-y-auto pr-1">
                                {trapLiabilities.filter(l => l.active).map(item => (
                                  <div key={item.id} className="flex justify-between items-center text-gray-200 py-1 border-b border-red-500/10">
                                    <span>🔴 {item.name}</span>
                                    <span className="text-red-400 font-bold">-₹{item.cost.toLocaleString()}</span>
                                  </div>
                                ))}
                                <div className="flex justify-between items-center text-gray-200 py-1">
                                  <span>📦 {trapOtherName}</span>
                                  <span className="text-red-400 font-bold">-₹{parseFloat(trapOtherCost).toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center font-bold text-sm bg-red-950/80 p-3 rounded-xl border border-red-500/30">
                                <span className="text-white">TOTAL LIABILITIES OUTFLOW:</span>
                                <span className="text-red-400">-₹{calculateTrapOutflow().toLocaleString()}</span>
                              </div>
                            </div>

                          </div>

                          {/* 3. INCOME STATEMENT AT THE BOTTOM */}
                          <div className="border border-purple-500/40 rounded-2xl p-6 bg-[#120922] space-y-4 shadow-xl">
                            <div className="border-b border-purple-500/20 pb-2 flex justify-between items-center">
                              <span className="text-xs font-mono uppercase text-pink-400 font-bold">Income Statement (Profit & Loss Summary)</span>
                              <span className="text-xs font-mono text-gray-300">Active + Zero Assets</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                              <div className="bg-[#0A0614] p-3.5 rounded-xl border border-purple-500/20">
                                <span className="text-gray-400 block">Monthly Active Salary:</span>
                                <span className="text-emerald-400 font-bold text-sm">+₹{parseFloat(trapSalary || '0').toLocaleString()}</span>
                              </div>
                              <div className="bg-[#0A0614] p-3.5 rounded-xl border border-purple-500/20">
                                <span className="text-gray-400 block">Asset Passive Income:</span>
                                <span className="text-red-400 font-bold text-sm">+₹0 (None)</span>
                              </div>
                              <div className="bg-[#0A0614] p-3.5 rounded-xl border border-purple-500/20">
                                <span className="text-gray-400 block">Total Expenses:</span>
                                <span className="text-red-400 font-bold text-sm">-₹{calculateTrapOutflow().toLocaleString()}</span>
                              </div>
                            </div>
                            <div className="bg-red-950/60 p-4 rounded-xl border border-red-500/40 flex justify-between items-center font-mono">
                              <span className="text-white text-xs font-bold">NET MONTHLY CASHFLOW:</span>
                              <span className="text-amber-400 font-black text-base">₹{(parseFloat(trapSalary || '0') - calculateTrapOutflow()).toLocaleString()} / mo</span>
                            </div>
                          </div>

                        </div>

                        {/* PROMPT TO SWITCH TO LAMINAR FLOW */}
                        <div className="bg-gradient-to-r from-purple-900/60 to-pink-900/60 border-2 border-pink-500 p-8 rounded-3xl text-center space-y-4 shadow-2xl">
                          <h5 className="text-2xl font-black text-white">Now, Let's See What Laminar Systems Flow Does!</h5>
                          <p className="text-gray-200 text-sm max-w-2xl mx-auto font-light">
                            By joining and signing in with Laminar Capital & Laminar Systems, we diversify your savings and income into numerous high-yield assets which fulfill your empty asset column.
                          </p>
                          <button 
                            onClick={handleSwitchToLaminarFlow}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black px-10 py-4 rounded-2xl shadow-xl hover:scale-105 transition-all text-sm font-mono"
                          >
                            Switch to Laminar Systems Flow 🌊
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* ==========================================================
                    PART B: LAMINAR SYSTEMS FLOW WIZARD (STEPS 1 TO 5)
                    ========================================================== */}
                {gameMode === 'laminar' && (
                  <>
                    {/* LAMINAR STEP 1: PROFESSION */}
                    {gameStep === 1 && (
                      <div className="space-y-6">
                        <div className="text-center space-y-2">
                          <span className="text-xs font-mono uppercase bg-emerald-950 text-emerald-300 px-3.5 py-1.5 rounded-full border border-emerald-500/40 font-bold">Laminar Systems Flow</span>
                          <h4 className="text-2xl font-bold text-white">Step 1: Choose Your Profession / Inflow Source</h4>
                          <p className="text-gray-300 text-sm font-light">Select your primary role in the Laminar model:</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {[
                            { title: 'Active Salary Employee', desc: 'Corporate / IT / Government job' },
                            { title: 'Entrepreneur', desc: 'Venture, startup, & business builder' },
                            { title: 'Small Business Handler', desc: 'Regional shop & commerce owner' },
                            { title: 'Independent Proprietor', desc: 'Freelancer, agency head, or consultant' },
                            { title: 'Financial / Crypto Trader', desc: 'Active market specifier & investor' },
                            { title: 'Medical / Legal Professional', desc: 'Doctor, lawyer, or specialized expert' },
                          ].map((item) => (
                            <div
                              key={item.title}
                              onClick={() => { setLamProfession(item.title); setGameStep(2); }}
                              className={`p-5 rounded-2xl border cursor-pointer transition-all hover:scale-105 shadow-xl ${lamProfession === item.title ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.4)]' : 'bg-[#0A0614] border-purple-500/30 text-gray-300 hover:border-emerald-500'}`}
                            >
                              <h5 className="font-bold text-sm">{item.title}</h5>
                              <p className={`text-[11px] mt-1 font-mono ${lamProfession === item.title ? 'text-white/90' : 'text-gray-400'}`}>{item.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* LAMINAR STEP 2: SALARY IN RUPEES */}
                    {gameStep === 2 && (
                      <div className="space-y-6 text-center max-w-lg mx-auto">
                        <span className="text-xs font-mono uppercase bg-emerald-950 text-emerald-300 px-3.5 py-1.5 rounded-full border border-emerald-500/40 font-bold">Laminar Systems Flow</span>
                        <h4 className="text-2xl font-bold text-white">Step 2: Enter Your Monthly Salary / Inflow</h4>
                        <p className="text-gray-300 text-sm font-light">Enter your monthly earnings in <strong className="text-emerald-400">Indian Rupees (₹)</strong>:</p>

                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 font-bold font-mono text-xl">₹</span>
                          <input 
                            type="number" 
                            value={lamSalary} 
                            onChange={(e) => setLamSalary(e.target.value)}
                            className="w-full bg-[#0A0614] border border-emerald-500/40 text-white font-mono text-2xl p-4 pl-10 rounded-2xl focus:outline-none focus:border-emerald-500 shadow-inner"
                            placeholder="85000"
                          />
                        </div>

                        <div className="pt-4 flex gap-4">
                          <button onClick={() => setGameStep(1)} className="w-1/2 bg-[#1A1033] text-gray-300 py-3 rounded-xl border border-purple-500/25">Back</button>
                          <button onClick={() => setGameStep(3)} className="w-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-3 rounded-xl shadow-lg">Next: Liabilities ➔</button>
                        </div>
                      </div>
                    )}

                    {/* LAMINAR STEP 3: LIABILITIES & EXPENSES */}
                    {gameStep === 3 && (
                      <div className="space-y-6">
                        <div className="text-center space-y-2">
                          <span className="text-xs font-mono uppercase bg-emerald-950 text-emerald-300 px-3.5 py-1.5 rounded-full border border-emerald-500/40 font-bold">Laminar Systems Flow</span>
                          <h4 className="text-2xl font-bold text-white">Step 3: Select Your Liabilities & Outflows (₹)</h4>
                          <p className="text-gray-300 text-sm font-light">Select your living expenses before Laminar structures your asset diversification:</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {lamLiabilities.map((item) => (
                            <div 
                              key={item.id}
                              className={`p-4 rounded-2xl border transition-all space-y-3 ${item.active ? 'bg-red-950/40 border-red-500 text-white shadow-md' : 'bg-[#0A0614] border-purple-500/30 text-gray-400 hover:border-emerald-500'}`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleToggleLamLiability(item.id)}>
                                  <input type="checkbox" checked={item.active} onChange={() => {}} className="w-4 h-4 accent-emerald-500 cursor-pointer" />
                                  <span className="font-bold text-xs sm:text-sm">{item.name}</span>
                                </div>
                                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${item.active ? 'bg-red-500 text-white' : 'bg-[#170E2E] text-gray-400'}`}>
                                  {item.active ? 'Active' : 'Inactive'}
                                </span>
                              </div>

                              {item.active && (
                                <div className="flex items-center gap-2 pt-1">
                                  <span className="text-xs font-mono text-emerald-400">₹</span>
                                  <input 
                                    type="number" 
                                    value={item.cost} 
                                    onChange={(e) => handleUpdateLamLiabilityCost(item.id, e.target.value)}
                                    className="w-full bg-[#07050E] border border-emerald-500/40 text-white font-mono text-xs p-2 rounded-xl focus:outline-none focus:border-emerald-500"
                                  />
                                  <span className="text-[10px] font-mono text-gray-400">/mo</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="pt-4 text-center">
                          <button 
                            onClick={() => setGameStep(4)}
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black px-10 py-4 rounded-xl text-xs font-mono shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-105 transition-all"
                          >
                            Next: Choose Assets & Laminar Capital Pools ➔
                          </button>
                        </div>
                      </div>
                    )}

                    {/* LAMINAR STEP 4: SELECT ASSETS & INVEST IN LAMINAR CAPITALS / SYSTEMS */}
                    {gameStep === 4 && (
                      <div className="space-y-6">
                        <div className="text-center space-y-2">
                          <span className="text-xs font-mono uppercase bg-emerald-950 text-emerald-300 px-3.5 py-1.5 rounded-full border border-emerald-500/40 font-bold">Laminar Systems Flow</span>
                          <h4 className="text-2xl font-bold text-white">Step 4: Build Your Asset Column with Laminar Capital & Systems</h4>
                          <p className="text-gray-300 text-sm font-light">
                            Choose where to diversify your savings. Invest in <strong className="text-emerald-400">Laminar Capitals</strong> to build passive income and balance your financial life:
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {lamAssets.map((item) => (
                            <div 
                              key={item.id}
                              className={`p-4 rounded-2xl border transition-all space-y-3 ${item.active ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-md' : 'bg-[#0A0614] border-purple-500/30 text-gray-400 hover:border-emerald-500'}`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleToggleLamAsset(item.id)}>
                                  <input type="checkbox" checked={item.active} onChange={() => {}} className="w-4 h-4 accent-emerald-500 cursor-pointer" />
                                  <div>
                                    <span className="font-bold text-xs sm:text-sm">{item.name}</span>
                                    <span className="text-[10px] font-mono text-emerald-400 block font-semibold">Yield: {item.yieldLabel}</span>
                                  </div>
                                </div>
                                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${item.active ? 'bg-emerald-500 text-white' : 'bg-[#170E2E] text-gray-400'}`}>
                                  {item.active ? 'Active Asset' : 'Select'}
                                </span>
                              </div>

                              {item.active && (
                                <div className="flex items-center gap-2 pt-1">
                                  <span className="text-xs font-mono text-emerald-400">₹</span>
                                  <input 
                                    type="number" 
                                    value={item.amount} 
                                    onChange={(e) => handleUpdateLamAssetAmount(item.id, e.target.value)}
                                    className="w-full bg-[#07050E] border border-emerald-500/40 text-white font-mono text-xs p-2 rounded-xl focus:outline-none focus:border-emerald-500"
                                  />
                                  <span className="text-[10px] font-mono text-gray-400">/mo allocation</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="pt-4 text-center">
                          <button 
                            onClick={() => setGameStep(5)}
                            className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-black px-10 py-4 rounded-xl text-xs font-mono shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-105 transition-all"
                          >
                            Launch Laminar Dual Balance Sheet (Active Assets) ➔
                          </button>
                        </div>
                      </div>
                    )}

                    {/* LAMINAR STEP 5: FINAL LAMINAR STATEMENT */}
                    {gameStep === 5 && (
                      <div className="space-y-8">
                        <div className="text-center space-y-2">
                          <span className="text-xs font-mono uppercase bg-emerald-950 text-emerald-300 px-3.5 py-1.5 rounded-full border border-emerald-500/40 font-bold">Phase 2 Result</span>
                          <h4 className="text-2xl font-bold text-white">Laminar Systems Flow: Your Asset Column is Filled!</h4>
                          <p className="text-gray-300 text-sm font-light">Structure: Inflow Source $\rightarrow$ Balance Sheet $\rightarrow$ Income Statement (Active + Passive Yield)</p>
                        </div>

                        <div className="bg-[#0A0614] border-2 border-emerald-500/50 p-6 md:p-8 rounded-3xl space-y-8 shadow-[0_0_40px_rgba(16,185,129,0.3)] relative">
                          
                          {/* 1. INFLOW SOURCE & MONTHLY ACTIVE INCOME */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            <div className="bg-[#120922] border border-emerald-500/50 p-4 rounded-2xl space-y-1">
                              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Inflow Source</span>
                              <p className="text-white font-bold text-sm">👤 {lamProfession}</p>
                            </div>
                            <div className="bg-[#120922] border border-emerald-500/50 p-4 rounded-2xl flex justify-between items-center">
                              <div>
                                <span className="text-[10px] font-mono text-gray-400 uppercase font-bold">Monthly Income Active Stream</span>
                                <p className="text-emerald-400 font-mono font-black text-lg">₹{parseFloat(lamSalary || '0').toLocaleString()}</p>
                              </div>
                              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">Active Stream</span>
                            </div>
                          </div>

                          {/* 2. BALANCE SHEET (ASSETS VS LIABILITIES COLUMNS) */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* ASSETS (POPULATED VIA LAMINAR) */}
                            <div className="border-2 border-emerald-500 bg-emerald-950/40 p-6 rounded-2xl space-y-4">
                              <div className="border-b border-purple-500/20 pb-2 flex justify-between items-center">
                                <span className="text-xs font-mono uppercase text-emerald-400 font-bold">Assets Column (Left)</span>
                                <span className="text-[10px] font-mono text-emerald-300">Puts Money In Pocket</span>
                              </div>
                              <div className="space-y-2 font-mono text-xs max-h-40 overflow-y-auto pr-1">
                                {lamAssets.filter(a => a.active).map(item => (
                                  <div key={item.id} className="flex justify-between items-center text-gray-200 py-1 border-b border-emerald-500/10">
                                    <span>🟢 {item.name}</span>
                                    <span className="text-emerald-400 font-bold">+₹{item.amount.toLocaleString()}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="flex justify-between items-center font-bold text-sm bg-emerald-950/80 p-3 rounded-xl border border-emerald-500/30">
                                <span className="text-white">TOTAL ASSET POOL:</span>
                                <span className="text-emerald-400">₹{calculateLamTotalAssets().toLocaleString()} / mo</span>
                              </div>
                            </div>

                            {/* LIABILITIES */}
                            <div className="border-2 border-purple-500/30 bg-[#120922]/40 p-6 rounded-2xl space-y-4">
                              <div className="border-b border-purple-500/20 pb-2 flex justify-between items-center">
                                <span className="text-xs font-mono uppercase text-red-400 font-bold">Liabilities Column (Right)</span>
                                <span className="text-[10px] font-mono text-gray-400">Balanced by Passive Assets</span>
                              </div>
                              <div className="space-y-2 font-mono text-xs max-h-40 overflow-y-auto pr-1">
                                {lamLiabilities.filter(l => l.active).map(item => (
                                  <div key={item.id} className="flex justify-between items-center text-gray-200 py-1 border-b border-red-500/10">
                                    <span>🔴 {item.name}</span>
                                    <span className="text-red-400 font-bold">-₹{item.cost.toLocaleString()}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="flex justify-between items-center font-bold text-sm bg-purple-950/60 p-3 rounded-xl border border-purple-500/30">
                                <span className="text-white">TOTAL OUTFLOW:</span>
                                <span className="text-red-400">-₹{calculateLamOutflow().toLocaleString()}</span>
                              </div>
                            </div>

                          </div>

                          {/* 3. INCOME STATEMENT AT THE BOTTOM (CORRECTED PASSIVE YIELD = TOTAL ASSET POOL) */}
                          <div className="border border-emerald-500/40 rounded-2xl p-6 bg-[#120922] space-y-4 shadow-xl">
                            <div className="border-b border-purple-500/20 pb-2 flex justify-between items-center">
                              <span className="text-xs font-mono uppercase text-emerald-400 font-bold">Income Statement (Profit & Loss Summary)</span>
                              <span className="text-xs font-mono text-emerald-300">Active Salary + Asset Passive Income</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                              <div className="bg-[#0A0614] p-3.5 rounded-xl border border-emerald-500/20">
                                <span className="text-gray-400 block">Monthly Active Salary:</span>
                                <span className="text-emerald-400 font-bold text-sm">+₹{parseFloat(lamSalary || '0').toLocaleString()}</span>
                              </div>
                              <div className="bg-[#0A0614] p-3.5 rounded-xl border border-emerald-500/20">
                                <span className="text-gray-400 block">Asset Passive Income:</span>
                                <span className="text-emerald-400 font-bold text-sm">+₹{calculateLamPassiveIncome().toLocaleString()}</span>
                              </div>
                              <div className="bg-[#0A0614] p-3.5 rounded-xl border border-emerald-500/20">
                                <span className="text-gray-400 block">Total Expenses:</span>
                                <span className="text-red-400 font-bold text-sm">-₹{calculateLamOutflow().toLocaleString()}</span>
                              </div>
                            </div>
                            <div className="bg-emerald-950/60 p-4 rounded-xl border border-emerald-500/40 flex justify-between items-center font-mono">
                              <span className="text-white text-xs font-bold">TOTAL COMPREHENSIVE CASHFLOW:</span>
                              <span className="text-emerald-400 font-black text-base">₹{(parseFloat(lamSalary || '0') + calculateLamPassiveIncome() - calculateLamOutflow()).toLocaleString()} / mo</span>
                            </div>
                          </div>

                        </div>

                        <div className="text-center pt-2">
                          <button 
                            onClick={() => setActiveTab('segments')}
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black px-10 py-4 rounded-xl text-xs font-mono shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-105 transition-all"
                          >
                            Explore Real Investment Pools Now ➔
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}

              </div>
            </section>

          </div>
        )}

        {/* ----------------------------------------------------------------------
            VIEW 2: ABOUT US (CLASSY CHOICE MISSION & 4 SEGMENTS)
            ---------------------------------------------------------------------- */}
        {activeTab === 'about' && (
          <section className="px-6 py-20 max-w-6xl mx-auto space-y-20">
            
            {/* MISSION HEADER */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-pink-400 text-xs font-mono tracking-widest uppercase font-bold">Our Philosophy & Goal</span>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                Empowering True Financial Independence & Literacy.
              </h2>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light">
                Most people spend their entire lives working hard for money, yet never achieve true freedom because traditional schooling never taught them how money works. Our goal is to make you financially literate, visually aware of your cashflow statement, and completely independent of market stress.
              </p>
            </div>

            {/* THREE PILLARS OF OUR MISSION */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="bg-gradient-to-b from-[#140C28] to-[#0D071A] border border-purple-500/30 p-8 rounded-3xl space-y-4 shadow-2xl">
                <div className="h-12 w-12 rounded-2xl bg-[#1A1033] border border-purple-500/40 text-pink-400 flex items-center justify-center font-mono font-bold text-xl">📖</div>
                <h3 className="text-xl font-bold text-white">1. Financial Education First</h3>
                <p className="text-gray-300 text-sm font-light leading-relaxed">
                  It’s not how much money you make, but how much money you keep. We educate visitors on the fundamental difference between true income-generating assets and disguised lifestyle liabilities.
                </p>
              </div>

              <div className="bg-gradient-to-b from-[#140C28] to-[#0D071A] border border-purple-500/30 p-8 rounded-3xl space-y-4 shadow-2xl">
                <div className="h-12 w-12 rounded-2xl bg-[#1A1033] border border-purple-500/40 text-pink-400 flex items-center justify-center font-mono font-bold text-xl">🌊</div>
                <h3 className="text-xl font-bold text-white">2. Laminar Dynamics</h3>
                <p className="text-gray-300 text-sm font-light leading-relaxed">
                  Inspired by fluid dynamics where laminar flow represents smooth, parallel motion without friction, we eliminate execution drag, emotional mistakes, and market turbulence from your wealth creation path.
                </p>
              </div>

              <div className="bg-gradient-to-b from-[#140C28] to-[#0D071A] border border-purple-500/30 p-8 rounded-3xl space-y-4 shadow-2xl">
                <div className="h-12 w-12 rounded-2xl bg-[#1A1033] border border-purple-500/40 text-pink-400 flex items-center justify-center font-mono font-bold text-xl">💎</div>
                <h3 className="text-xl font-bold text-white">3. 100% Hands-Off Freedom</h3>
                <p className="text-gray-300 text-sm font-light leading-relaxed">
                  True freedom means not needing to sit in front of trading charts all day. We watch and manage everything on our end, letting your capital compound silently and securely in the background.
                </p>
              </div>

            </div>

            {/* SEGMENT 4: DUAL ECOSYSTEM BREAKDOWN */}
            <div className="space-y-6 pt-4">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-pink-400 text-xs font-mono uppercase font-bold tracking-widest">4. Dual Entity Structure</span>
                <h3 className="text-3xl font-bold text-white">Two Specialized Entities Working Together</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-b from-[#140C28] to-[#0D071A] border border-purple-500/25 p-8 md:p-10 rounded-3xl space-y-6 shadow-2xl">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-pink-400 bg-[#1A1033] px-3.5 py-1.5 rounded-full border border-pink-500/40 font-bold">
                    TECH & SOFTWARE ENTITY
                  </div>
                  <h4 className="text-3xl font-black text-white">Laminar Systems</h4>
                  <p className="text-gray-300 text-base leading-relaxed font-light">
                    Laminar Systems is our dedicated technology hub that engineers specialized software solutions and digital applications to make financial analysis, balance sheet tracking, and investment management frictionless.
                  </p>
                  <div className="border-t border-purple-500/20 pt-4 text-xs font-mono text-gray-400 space-y-2">
                    <div className="flex justify-between"><span>Core Focus:</span><span className="text-pink-400">Software Solutions</span></div>
                    <div className="flex justify-between"><span>Development:</span><span className="text-white">Continuous Advanced Tool Releases</span></div>
                  </div>
                </div>

                <div className="bg-gradient-to-b from-[#140C28] to-[#0D071A] border-2 border-pink-500 p-8 md:p-10 rounded-3xl space-y-6 shadow-2xl shadow-pink-500/15">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-pink-400 bg-[#1A1033] px-3.5 py-1.5 rounded-full border border-pink-500/40 font-bold">
                    FLAGSHIP INVESTMENT BYPRODUCT
                  </div>
                  <h4 className="text-3xl font-black text-white">Laminar Capital</h4>
                  <p className="text-gray-300 text-base leading-relaxed font-light">
                    Laminar Capital is our flagship private wealth platform created so everyday individuals can invest their funds into managed pools without ever needing to endure market stress or chart fatigue.
                  </p>
                  <div className="border-t border-purple-500/20 pt-4 text-xs font-mono text-gray-400 space-y-2">
                    <div className="flex justify-between"><span>Core Mandate:</span><span className="text-pink-400">Hands-Off Asset Growth</span></div>
                    <div className="flex justify-between"><span>Transparency:</span><span className="text-emerald-400 font-semibold">100% Fully Managed On Our End</span></div>
                  </div>
                </div>
              </div>
            </div>

          </section>
        )}

        {/* ----------------------------------------------------------------------
            VIEW 3: INVESTMENT POOLS
            ---------------------------------------------------------------------- */}
        {activeTab === 'segments' && (
          <section className="px-6 py-20 max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-pink-400 text-xs font-mono tracking-widest uppercase font-bold">Capital Allocation Pools</span>
              <h2 className="text-3xl md:text-5xl font-black text-white mt-2 mb-4">Investment Tiers</h2>
              <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base font-light">
                Select your preferred wealth growth pool. Each tier is managed with strict institutional risk parameters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-b from-[#140C28] to-[#0D071A] border border-purple-500/25 p-8 rounded-3xl flex flex-col justify-between shadow-2xl">
                <div>
                  <div className="text-xs font-mono font-bold text-pink-400 bg-[#1A1033] border border-purple-500/30 w-max px-3.5 py-1 rounded-full mb-6">CONSERVATIVE POOL</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Defensive Wealth Pool</h3>
                  <p className="text-gray-300 text-sm mb-6 font-light">Capital preservation strategy focused on low-volatility asset allocations.</p>
                </div>
                <button onClick={() => setSelectedSegment('Defensive Wealth Pool')} className="w-full bg-[#1A1033] hover:bg-pink-500 text-white font-bold py-3.5 rounded-2xl transition-all shadow-xl">
                  Select Defensive Pool
                </button>
              </div>

              <div className="bg-gradient-to-b from-[#140C28] to-[#0D071A] border-2 border-pink-500 p-8 rounded-3xl flex flex-col justify-between relative shadow-2xl shadow-pink-500/20">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  Recommended Tier
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-pink-400 bg-[#1A1033] border border-purple-500/30 w-max px-3.5 py-1 rounded-full mb-6">BALANCED POOL</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Balanced Growth Pool</h3>
                  <p className="text-gray-300 text-sm mb-6 font-light">Optimized balance between steady capital appreciation and strict risk control.</p>
                </div>
                <button onClick={() => setSelectedSegment('Balanced Growth Pool')} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black py-3.5 rounded-2xl transition-all shadow-xl shadow-purple-500/30">
                  Select Balanced Pool
                </button>
              </div>

              <div className="bg-gradient-to-b from-[#140C28] to-[#0D071A] border border-purple-500/25 p-8 rounded-3xl flex flex-col justify-between shadow-2xl">
                <div>
                  <div className="text-xs font-mono font-bold text-fuchsia-400 bg-[#1A1033] border border-fuchsia-500/30 w-max px-3.5 py-1 rounded-full mb-6">AGGRESSIVE POOL</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Tactical Growth Pool</h3>
                  <p className="text-gray-300 text-sm mb-6 font-light">High-growth asset allocation aimed at maximum compounding potential.</p>
                </div>
                <button onClick={() => setSelectedSegment('Tactical Growth Pool')} className="w-full bg-[#1A1033] hover:bg-fuchsia-500 text-white font-bold py-3.5 rounded-2xl transition-all shadow-xl">
                  Select Tactical Pool
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ----------------------------------------------------------------------
            VIEW 4: AUTHENTICATION
            ---------------------------------------------------------------------- */}
        {activeTab === 'auth' && (
          <section className="px-6 py-20 max-w-md mx-auto flex flex-col items-center">
            <div className="w-full bg-[#100A20] border border-purple-500/40 p-8 md:p-10 rounded-3xl shadow-2xl relative">
              
              <div className="flex bg-[#0A0614] p-1.5 rounded-2xl border border-purple-500/25 mb-8">
                <button 
                  onClick={() => { setAuthMode('login'); setAuthMessage(''); }} 
                  className={`w-1/2 py-2.5 rounded-xl text-xs font-bold font-mono transition-all ${authMode === 'login' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                >
                  Login
                </button>
                <button 
                  onClick={() => { setAuthMode('create'); setAuthMessage(''); }} 
                  className={`w-1/2 py-2.5 rounded-xl text-xs font-bold font-mono transition-all ${authMode === 'create' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                >
                  Create Account
                </button>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-black text-white">{authMode === 'login' ? 'Client Login' : 'Create Client Account'}</h2>
                <p className="text-gray-400 text-xs mt-1 font-mono">
                  {authMode === 'login' ? 'Enter your registered ID & password.' : 'Register a new account to access your dashboard.'}
                </p>
              </div>

              {authMessage && (
                <div className={`mb-6 p-4 rounded-2xl text-xs font-mono ${isError ? 'bg-amber-950/60 border border-amber-500/50 text-amber-300' : 'bg-red-950/60 border border-red-500/50 text-red-300'}`}>
                  {authMessage}
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs uppercase text-gray-300 font-semibold mb-2 font-mono">Email / Account ID</label>
                  <input 
                    type="email" 
                    value={authEmail} 
                    onChange={(e) => setAuthEmail(e.target.value)} 
                    className="w-full bg-[#0A0614] border border-purple-500/30 text-white font-mono text-sm p-3.5 rounded-2xl focus:outline-none focus:border-pink-500" 
                    placeholder="client@laminarsystems.io" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-300 font-semibold mb-2 font-mono">Password</label>
                  <input 
                    type="password" 
                    value={authPassword} 
                    onChange={(e) => setAuthPassword(e.target.value)} 
                    className="w-full bg-[#0A0614] border border-purple-500/30 text-white font-mono text-xl p-3.5 rounded-2xl focus:outline-none focus:border-pink-500" 
                    placeholder="••••••••" 
                    required 
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-purple-500/30 hover:scale-[1.02] transition-all"
                >
                  {authMode === 'login' ? 'Login to Dashboard' : 'Register Account'}
                </button>
              </form>
            </div>
          </section>
        )}

        {/* ----------------------------------------------------------------------
            VIEW 5: GATED CLIENT DASHBOARD
            ---------------------------------------------------------------------- */}
        {activeTab === 'dashboard' && isLoggedIn && (
          <section className="px-6 py-12 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-purple-500/25 pb-6">
              <div>
                <span className="text-pink-400 text-xs font-mono uppercase tracking-widest font-bold">Client Portal</span>
                <h2 className="text-3xl font-black text-white mt-1">Portfolio & Account Dashboard</h2>
              </div>
              <div className="bg-[#100A20] border border-purple-500/25 px-4 py-2 rounded-2xl text-xs text-gray-300 flex items-center gap-2 font-mono shadow-lg">
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
                Status: <span className="text-pink-400 font-bold">ONLINE</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-b from-[#140C28] to-[#0D071A] border border-purple-500/25 p-6 rounded-3xl shadow-xl">
                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 font-mono">Principal Allocation</p>
                    <p className="text-3xl font-black text-white font-mono">₹{userInvestment.initialDeposit.toLocaleString()}</p>
                  </div>
                  <div className="bg-gradient-to-b from-[#140C28] to-[#0D071A] border border-purple-500/25 p-6 rounded-3xl shadow-xl">
                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 font-mono">Estimated Current Value</p>
                    <p className="text-3xl font-black text-pink-400 font-mono">₹{userInvestment.currentValue.toLocaleString()}</p>
                  </div>
                  <div className="bg-gradient-to-b from-[#140C28] to-[#0D071A] border border-purple-500/25 p-6 rounded-3xl shadow-xl">
                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 font-mono">Active Pool</p>
                    <p className="text-xl font-bold text-white mt-1">{userInvestment.segment}</p>
                  </div>
                </div>
              </div>

              {/* PROFILE SIDEBAR */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-gradient-to-b from-[#140C28] to-[#0D071A] border border-purple-500/30 p-6 rounded-3xl shadow-2xl sticky top-24 space-y-6">
                  <div className="flex items-center gap-4 border-b border-purple-500/20 pb-5">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-black text-white text-xl shadow-lg">
                      {userProfile.email.charAt(0).toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-white font-bold text-sm truncate">Client User</h4>
                      <p className="text-gray-400 text-xs truncate font-mono">{userProfile.email}</p>
                    </div>
                  </div>
                  <button onClick={() => { setIsLoggedIn(false); setActiveTab('home'); }} className="w-full bg-[#100A20] hover:bg-red-950/80 text-red-400 border border-red-500/30 font-bold py-3 rounded-xl transition-all text-xs font-mono">
                    Disconnect Portal
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* DEPOSIT MODAL */}
      {selectedSegment && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="bg-[#140E26] border border-purple-500/40 w-full max-w-lg p-8 rounded-3xl shadow-2xl relative">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-pink-400 text-xs font-mono uppercase font-bold">Allocation Gateway</span>
                <h3 className="text-2xl font-bold text-white">{selectedSegment}</h3>
              </div>
              <button onClick={() => setSelectedSegment(null)} className="text-gray-300 hover:text-white text-xl font-bold h-8 w-8 rounded-full bg-[#0A0614] flex items-center justify-center border border-purple-500/30">✕</button>
            </div>
            <form onSubmit={handleConfirmInvestment} className="space-y-6">
              <div>
                <label className="block text-xs uppercase text-gray-300 font-semibold mb-2 font-mono">Investment Capital (₹ INR)</label>
                <input type="number" min="10000" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} className="w-full bg-[#0A0614] border border-purple-500/30 text-white font-mono text-2xl p-4 rounded-2xl focus:outline-none focus:border-pink-500" required />
              </div>
              <div className="flex gap-4 pt-2">
                <button type="button" onClick={() => setSelectedSegment(null)} className="w-1/2 bg-[#170E2E] text-gray-300 font-semibold py-3.5 rounded-2xl border border-purple-500/25">Cancel</button>
                <button type="submit" className="w-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black py-3.5 rounded-2xl shadow-xl shadow-purple-500/30">Confirm Allocation</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-purple-500/25 bg-[#100A20]/90 backdrop-blur-xl px-6 py-8 text-center text-xs text-gray-400 z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">LAMINAR CAPITAL</span>
            <span className="text-pink-400 font-mono text-[10px] uppercase font-bold">BY LAMINAR SYSTEMS</span>
            <span>© 2026. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-gray-300 font-medium">
            <span className="hover:text-pink-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-pink-400 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>

    </div>
  );
}