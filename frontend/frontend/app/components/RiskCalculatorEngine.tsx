// ==============================================================================
// FILE: frontend/app/components/RiskCalculatorEngine.tsx
// WHAT IT IS: High-Speed Single-Entry Per-Trade Risk Solver
// ==============================================================================

'use client';

import React, { useState } from 'react';

export default function RiskCalculatorEngine() {
  // Fast Single-Entry Inputs
  const [balance, setBalance] = useState<number>(10000);
  const [riskPercent, setRiskPercent] = useState<number>(1);
  const [entry, setEntry] = useState<number>(2650.00);
  const [stopLoss, setStopLoss] = useState<number>(2640.00);
  const [asset, setAsset] = useState<string>('XAU/USD');

  // Instant Calculation
  const distance = Math.abs(entry - stopLoss);
  const maxLossDollar = balance * (riskPercent / 100);
  
  // Lot size computation
  let lotSize = 0.01;
  if (distance > 0) {
    if (asset === 'XAU/USD') {
      lotSize = Number((maxLossDollar / (distance * 10)).toFixed(2));
    } else {
      lotSize = Number((maxLossDollar / distance).toFixed(4));
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-6">
      
      {/* HEADER */}
      <div className="text-center space-y-2">
        <span className="text-xs font-semibold uppercase bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/20">
          Live Execution Tool
        </span>
        <h2 className="text-2xl font-bold text-white">Instant Per-Trade Risk Solver</h2>
        <p className="text-slate-400 text-xs">
          Zero math delay. Calculate exact dollar risk and lot size in fractions of a second before entry.
        </p>
      </div>

      {/* INSTANT CALCULATOR BOX */}
      <div className="bg-slate-900 border border-white/10 p-6 md:p-8 rounded-3xl space-y-6 shadow-2xl">
        
        {/* TOP CONTROLS */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">Account Balance ($)</label>
            <input
              type="number"
              value={balance}
              onChange={(e) => setBalance(Number(e.target.value))}
              className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white text-sm font-mono focus:border-cyan-500 focus:outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">Risk per Trade (%)</label>
            <input
              type="number"
              step="0.1"
              value={riskPercent}
              onChange={(e) => setRiskPercent(Number(e.target.value))}
              className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white text-sm font-mono focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>

        {/* ASSET SELECTOR */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-400">Trading Asset</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => { setAsset('XAU/USD'); setEntry(2650.00); setStopLoss(2640.00); }}
              className={`py-3 rounded-xl text-xs font-bold transition-all border ${asset === 'XAU/USD' ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20' : 'bg-slate-950 text-slate-400 border-white/10 hover:border-white/20'}`}
            >
              Gold (XAU/USD)
            </button>
            <button
              type="button"
              onClick={() => { setAsset('BTC/USD'); setEntry(92500.00); setStopLoss(91500.00); }}
              className={`py-3 rounded-xl text-xs font-bold transition-all border ${asset === 'BTC/USD' ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20' : 'bg-slate-950 text-slate-400 border-white/10 hover:border-white/20'}`}
            >
              Bitcoin (BTC/USD)
            </button>
          </div>
        </div>

        {/* PRICE ENTRY & STOP LOSS */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">Entry Price</label>
            <input
              type="number"
              step="0.1"
              value={entry}
              onChange={(e) => setEntry(Number(e.target.value))}
              className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white text-sm font-mono focus:border-cyan-500 focus:outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">Stop Loss Price</label>
            <input
              type="number"
              step="0.1"
              value={stopLoss}
              onChange={(e) => setStopLoss(Number(e.target.value))}
              className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white text-sm font-mono focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>

        {/* LIVE INSTANT OUTPUT PANEL */}
        <div className="bg-slate-950 border border-cyan-500/30 p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center text-xs text-slate-400 border-b border-white/5 pb-2">
            <span>Instant Execution Verdict</span>
            <span className="text-cyan-400 font-mono font-bold">{asset}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[11px] text-slate-500 uppercase font-semibold">Exact Dollar Risk</span>
              <p className="text-3xl font-black text-white font-mono mt-0.5">${maxLossDollar.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 uppercase font-semibold">Recommended Lot Size</span>
              <p className="text-3xl font-black text-cyan-400 font-mono mt-0.5">{lotSize > 0 ? lotSize : 0.01}</p>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 flex justify-between pt-1">
            <span>Stop Distance: <strong className="text-slate-300">{distance.toFixed(2)} pts</strong></span>
            <span>Status: <strong className="text-emerald-400">Ready for execution</strong></span>
          </div>
        </div>

      </div>

    </div>
  );
}