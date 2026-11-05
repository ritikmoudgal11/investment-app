// ==============================================================================
// FILE: frontend/app/components/CashFlowEngine.tsx
// WHAT IT IS: Rich Dad Interactive Stream Engine (Updated Titles & Clean Header)
// ==============================================================================

'use client';

import React, { useState } from 'react';

export default function CashFlowEngine() {
  const [profession, setProfession] = useState<string>('Active Salary Employee');
  const [customProfession, setCustomProfession] = useState<string>('');
  const [salary, setSalary] = useState<string>('');
  
  const [liabilities, setLiabilities] = useState([
    { id: 'housing', name: '(1) Housing / Rent', active: true, cost: 0 },
    { id: 'car', name: '(2) Car Loan', active: true, cost: 0 },
    { id: 'living', name: '(3) Living Expenses', active: true, cost: 0 },
    { id: 'taxes', name: '(4) Income Taxes', active: true, cost: 0 },
  ]);

  const [newLiabilityName, setNewLiabilityName] = useState('');
  const [newLiabilityCost, setNewLiabilityCost] = useState('');

  const handleToggleLiability = (id: string) => {
    setLiabilities(prev => prev.map(item => item.id === id ? { ...item, active: !item.active } : item));
  };

  const handleUpdateLiabilityCost = (id: string, val: string) => {
    const num = parseFloat(val) || 0;
    setLiabilities(prev => prev.map(item => item.id === id ? { ...item, cost: num } : item));
  };

  const handleAddCustomLiability = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLiabilityName.trim()) return;
    const costNum = parseFloat(newLiabilityCost) || 0;
    const newItem = {
      id: `custom_${Date.now()}`,
      name: `(${liabilities.length + 1}) ${newLiabilityName.trim()}`,
      active: true,
      cost: costNum
    };
    setLiabilities(prev => [...prev, newItem]);
    setNewLiabilityName('');
    setNewLiabilityCost('');
  };

  const handleDeleteLiability = (id: string) => {
    setLiabilities(prev => prev.filter(item => item.id !== id));
  };

  const activeProfessionDisplay = profession === 'Other' ? (customProfession || 'Custom Profession') : profession;
  const totalInflow = parseFloat(salary) || 0;
  const totalOutflow = liabilities.filter(l => l.active).reduce((sum, item) => sum + item.cost, 0);
  const netCash = totalInflow - totalOutflow;

  return (
    <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-8 max-w-4xl mx-auto">
      
      {/* UPDATED CLEAN HEADER (REMOVED RICH DAD BLUEPRINT BADGE) */}
      <div className="text-center space-y-2 border-b border-slate-800 pb-6">
        <h3 className="font-black text-3xl text-white tracking-tight">Money Trap Visualizer</h3>
        <p className="text-slate-400 text-xs">Start filling your values below to build out your live cash flow stream.</p>
      </div>

      {/* PROFESSION SELECTOR */}
      <div className="space-y-3 bg-slate-950 p-5 rounded-2xl border border-slate-800">
        <label className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider block">1. Select Profession</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            'Active Salary Employee', 
            'Entrepreneur / Business', 
            'Professional Trader', 
            'Freelancer / Consultant',
            'Real Estate Investor',
            'Doctor / Healthcare',
            'Other'
          ].map(prof => (
            <button
              key={prof}
              onClick={() => setProfession(prof)}
              className={`p-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${profession === prof ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-md' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'}`}
            >
              {prof}
            </button>
          ))}
        </div>

        {profession === 'Other' && (
          <div className="pt-2">
            <input
              type="text"
              placeholder="Specify Custom Profession Title..."
              value={customProfession}
              onChange={(e) => setCustomProfession(e.target.value)}
              className="w-full bg-slate-900 border border-cyan-500/50 text-white font-mono text-xs p-3 rounded-xl focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* INFLOW SOURCE (TOP BOX) */}
      <div className="flex flex-col items-center">
        <div className="w-full max-w-md bg-slate-950 border-2 border-cyan-500/60 p-6 rounded-2xl text-center space-y-3 shadow-xl">
          <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-widest block">Inflow Source ({activeProfessionDisplay})</span>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 font-mono font-bold text-xl">₹</span>
            <input 
              type="number" 
              value={salary} 
              onChange={(e) => setSalary(e.target.value)} 
              className="w-full bg-slate-900 border border-slate-800 text-emerald-400 font-mono text-2xl font-black text-center p-3 pl-8 rounded-xl focus:border-cyan-500 focus:outline-none"
              placeholder="0"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">/mo</span>
          </div>
        </div>

        {/* SEGMENT 1: STREAM SPLIT */}
        <div className="w-full flex flex-col items-center py-2">
          <svg className="w-full max-w-md h-24 overflow-visible" viewBox="0 0 400 90">
            <path d="M 200 0 L 200 25" stroke="#06b6d4" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 200 25 C 200 60, 100 35, 60 90" stroke="#10b981" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 200 25 C 200 60, 300 35, 340 90" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round" fill="none" />
          </svg>
          <div className="w-full max-w-xl flex justify-between px-6 font-mono text-[11px] font-bold -mt-2">
            <span className="text-emerald-400">↙ Stream to Asset Column (Wealth Allocation)</span>
            <span className="text-rose-400">Stream to Liability Column (Money Trap Drain) ↘</span>
          </div>
        </div>
      </div>

      {/* ASSETS & LIABILITIES COLUMNS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        
        {/* ASSETS COLUMN */}
        <div className="bg-slate-950 border border-emerald-500/50 p-6 rounded-2xl space-y-4 bg-emerald-950/10">
          <div className="border-b border-emerald-500/30 pb-2">
            <h5 className="font-mono text-xs uppercase text-emerald-400 font-bold tracking-wider">Asset Column</h5>
          </div>
          <div className="p-4 bg-slate-900/80 rounded-xl border border-emerald-500/30 text-center space-y-2">
            <p className="text-xs font-mono text-emerald-400 font-semibold">Stream continues (₹0 Accumulation in Rat Race)</p>
            <div className="w-full h-1 bg-emerald-500 rounded-full"></div>
          </div>
        </div>

        {/* LIABILITIES COLUMN */}
        <div className="bg-slate-950 border border-rose-500/50 p-6 rounded-2xl space-y-4 bg-rose-950/10">
          <div className="border-b border-rose-500/30 pb-2 flex justify-between items-center">
            <h5 className="font-mono text-xs uppercase text-rose-400 font-bold tracking-wider">Liabilities (Outflows)</h5>
            <span className="text-xs font-mono text-rose-300 font-bold">₹{totalOutflow.toLocaleString()}</span>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {liabilities.map(item => (
              <div key={item.id} className="bg-slate-900 border border-rose-900/50 p-3 rounded-xl flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={item.active} 
                    onChange={() => handleToggleLiability(item.id)} 
                    className="w-4 h-4 accent-rose-500 cursor-pointer"
                  />
                  <span className="text-xs font-mono text-white font-semibold">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={item.cost === 0 ? '' : item.cost} 
                    onChange={(e) => handleUpdateLiabilityCost(item.id, e.target.value)} 
                    className="w-20 bg-slate-950 border border-slate-800 text-rose-400 font-mono text-xs p-1.5 rounded text-right focus:border-rose-500 focus:outline-none"
                    placeholder="0"
                  />
                  <span className="text-[10px] font-mono bg-rose-500/20 text-rose-300 px-2 py-1 rounded border border-rose-500/40">➔ Leak</span>
                  {item.id.startsWith('custom_') && (
                    <button onClick={() => handleDeleteLiability(item.id)} className="text-xs text-rose-500 hover:text-rose-400 font-bold px-1">✕</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddCustomLiability} className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Add custom expense..."
              value={newLiabilityName}
              onChange={(e) => setNewLiabilityName(e.target.value)}
              className="flex-grow bg-slate-900 border border-slate-800 text-white font-mono text-xs p-2.5 rounded-xl focus:border-rose-500 focus:outline-none"
            />
            <input
              type="number"
              placeholder="0"
              value={newLiabilityCost}
              onChange={(e) => setNewLiabilityCost(e.target.value)}
              className="w-24 bg-slate-900 border border-slate-800 text-rose-400 font-mono text-xs p-2.5 rounded-xl focus:border-rose-500 focus:outline-none"
            />
            <button type="submit" className="bg-rose-500/20 border border-rose-500/60 text-rose-300 font-mono font-bold text-xs px-3 py-2.5 rounded-xl hover:bg-rose-500/30 transition-all">
              + Add
            </button>
          </form>
        </div>

      </div>

      {/* SEGMENT 2: CONVERGING STREAM INTO INCOME STATEMENT */}
      <div className="w-full flex flex-col items-center py-2">
        <div className="w-full max-w-xl flex justify-between px-8 font-mono text-[11px] font-bold">
          <span className="text-emerald-400">↘ Residual Asset Stream Feeds Inflow</span>
          <span className="text-rose-400">Liability Stream Outflows to Expenses ↙</span>
        </div>
        <svg className="w-full max-w-lg h-20 overflow-visible" viewBox="0 0 500 70">
          <path d="M 120 0 C 120 45, 250 15, 250 70" stroke="#10b981" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M 380 0 C 380 45, 250 15, 250 70" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round" fill="none" />
        </svg>
      </div>

      {/* 3. INCOME STATEMENT SECTION */}
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
        <div className="border-b border-slate-800 pb-2">
          <h5 className="font-mono text-xs uppercase text-amber-400 font-bold tracking-wider">Income Statement</h5>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="bg-slate-900 p-4 rounded-xl border border-emerald-500/30 flex justify-between items-center">
            <span className="text-slate-400">Income:</span>
            <span className="text-emerald-400 font-bold text-sm">₹{totalInflow.toLocaleString()}</span>
          </div>
          <div className="bg-slate-900 p-4 rounded-xl border border-rose-500/30 flex justify-between items-center">
            <span className="text-slate-400">Expenses:</span>
            <span className="text-rose-400 font-bold text-sm">₹{totalOutflow.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* SEGMENT 3: EXPENSES SPLIT TO TOTAL OUTFLOW & NET CASH */}
      <div className="w-full flex flex-col items-center py-2">
        <svg className="w-full max-w-xl h-24 overflow-visible" viewBox="0 0 600 90">
          <path d="M 450 0 L 450 20" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M 450 20 C 450 60, 300 40, 300 85" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M 450 20 C 450 60, 500 40, 500 85" stroke="#10b981" strokeWidth="5" strokeLinecap="round" fill="none" />
        </svg>
        <div className="w-full max-w-2xl flex justify-between px-12 font-mono text-[11px] font-bold">
          <span className="text-rose-400 ml-36">➔ Outflow Stream (Expenses Drained to Total Outflow)</span>
          <span className="text-emerald-400">Remaining Stream to Net Cash ➔</span>
        </div>
      </div>

      {/* 4. BOTTOM MAPPED BOXES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center font-mono">
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-1">
          <span className="text-[10px] uppercase text-slate-400 block font-bold">Starting Inflow</span>
          <span className="text-emerald-400 font-bold text-xl">₹{totalInflow.toLocaleString()}</span>
        </div>
        <div className="bg-slate-950 border border-rose-500 p-5 rounded-2xl shadow-xl space-y-1 relative bg-rose-950/20">
          <span className="text-[10px] uppercase text-rose-300 block font-bold">Total Outflow</span>
          <span className="text-rose-400 font-bold text-xl">₹{totalOutflow.toLocaleString()}</span>
          <span className="text-[9px] text-rose-300 block italic">Connected & flowing out</span>
        </div>
        <div className="bg-slate-950 border border-emerald-500 p-5 rounded-2xl shadow-xl space-y-1 bg-emerald-950/20">
          <span className="text-[10px] uppercase text-emerald-300 block font-bold">Net Cash</span>
          <span className={`font-bold text-xl ${netCash >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            ₹{netCash.toLocaleString()}
          </span>
        </div>
      </div>

    </div>
  );
}