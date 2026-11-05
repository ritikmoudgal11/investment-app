// ==============================================================================
// FILE: frontend/app/components/MyAccountButton.tsx
// WHAT IT IS: Light-themed "My Account" button & modal matching Laminar UI
// ==============================================================================

'use client';

import React, { useState, useEffect } from 'react';

interface UserAccount {
  name: string;
  contact: string;
  authMethod: 'email' | 'phone';
  clientId: string;
  registeredAt: string;
}

export default function MyAccountButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserAccount | null>(null);

  const [isRegistering, setIsRegistering] = useState(false);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  
  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [otpSent, setOtpSent] = useState(false);
  const [inputOtp, setInputOtp] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('laminar_user_session');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to load user session', e);
      }
    }
  }, []);

  const generateClientId = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `LAM-${randomNum}`;
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPhone) return;
    setOtpSent(true);
    setStep('otp');
  };

  const handleCompleteAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    const contactInfo = authMethod === 'email' ? inputEmail.trim() : inputPhone.trim();
    if (!contactInfo) return;

    if (authMethod === 'phone' && inputOtp !== '1234') {
      alert('Invalid OTP. (Demo OTP is 1234)');
      return;
    }

    const newUser: UserAccount = {
      name: inputName.trim() || 'Trader',
      contact: contactInfo,
      authMethod,
      clientId: user?.clientId || generateClientId(),
      registeredAt: new Date().toLocaleDateString(),
    };

    localStorage.setItem('laminar_user_session', JSON.stringify(newUser));
    setUser(newUser);
    
    setInputPassword('');
    setInputOtp('');
    setStep('input');
    setOtpSent(false);
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('laminar_user_session');
    setUser(null);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left font-sans">
      
      {/* TRIGGER BUTTON (MATCHING SITE LIGHT THEME) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-full text-xs font-semibold transition-all shadow-sm focus:outline-none cursor-pointer"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        {user ? (
          <span className="flex items-center gap-2">
            <span>{user.name}</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono font-bold">
              #{user.clientId}
            </span>
          </span>
        ) : (
          <span>My Account</span>
        )}
      </button>

      {/* DROPDOWN CONTAINER (LIGHT THEME) */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 z-50 text-slate-800 space-y-4">
          
          {user ? (
            /* AUTHENTICATED STATE */
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3 flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{user.name}</h4>
                  <p className="text-xs text-slate-500 font-mono">{user.contact}</p>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                  Verified
                </span>
              </div>

              {/* UNIQUE CLIENT ID BADGE */}
              <div className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  Unique Operational ID
                </span>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-black text-emerald-600 font-mono tracking-wide">
                    #{user.clientId}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">Active Access</span>
                </div>
              </div>

              {/* ACCOUNT OPTIONS */}
              <div className="space-y-1 pt-1 text-xs">
                <button
                  onClick={() => alert(`Client ID #${user.clientId} Profile Settings`)}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-all flex items-center justify-between font-medium"
                >
                  <span>Account Settings</span>
                  <span className="text-slate-400">➔</span>
                </button>
                <button
                  onClick={() => alert(`Showing active products for Client #${user.clientId}`)}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-all flex items-center justify-between font-medium"
                >
                  <span>Active Products & Access</span>
                  <span className="text-slate-400">➔</span>
                </button>
              </div>

              {/* SIGN OUT */}
              <button
                onClick={handleLogout}
                className="w-full py-2.5 bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-bold transition-all"
              >
                Sign Out
              </button>
            </div>
          ) : (
            /* REGISTRATION & LOGIN STATE */
            <div className="space-y-3">
              <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                  {isRegistering ? 'Create Client Account' : 'Client Access'}
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    setIsRegistering(!isRegistering);
                    setStep('input');
                  }}
                  className="text-[11px] text-emerald-600 font-semibold hover:underline"
                >
                  {isRegistering ? 'Sign In' : 'Register'}
                </button>
              </div>

              {/* METHOD SWITCHER: EMAIL VS PHONE */}
              {step === 'input' && (
                <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setAuthMethod('email')}
                    className={`py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      authMethod === 'email' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMethod('phone')}
                    className={`py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      authMethod === 'phone' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Phone (OTP)
                  </button>
                </div>
              )}

              {/* FORM FIELDS */}
              {step === 'input' ? (
                <form onSubmit={authMethod === 'email' ? handleCompleteAuth : handleSendOtp} className="space-y-3">
                  {isRegistering && (
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-500 font-medium">Full Name / Alias</label>
                      <input
                        type="text"
                        required
                        placeholder="Ritik Moudgal"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none transition-all"
                      />
                    </div>
                  )}

                  {authMethod === 'email' ? (
                    <>
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-500 font-medium">Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="client@laminarsystems.com"
                          value={inputEmail}
                          onChange={(e) => setInputEmail(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-500 font-medium">Password</label>
                        <input
                          type="password"
                          required
                          placeholder="••••••••"
                          value={inputPassword}
                          onChange={(e) => setInputPassword(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none transition-all"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-500 font-medium">Mobile Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={inputPhone}
                        onChange={(e) => setInputPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none transition-all"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-500 text-white font-semibold rounded-xl text-xs hover:bg-emerald-600 transition-all shadow-md shadow-emerald-500/20 mt-2"
                  >
                    {authMethod === 'email'
                      ? (isRegistering ? 'Register & Get Client ID' : 'Sign In')
                      : 'Send OTP Verification Code ➔'}
                  </button>
                </form>
              ) : (
                /* OTP ENTER VERIFICATION STEP */
                <form onSubmit={handleCompleteAuth} className="space-y-3">
                  <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-2xl text-center space-y-1">
                    <span className="text-[11px] text-slate-500">OTP Code Sent To</span>
                    <p className="text-xs font-mono font-bold text-emerald-600">{inputPhone}</p>
                    <span className="text-[10px] text-slate-400">(Demo Mode: Enter 1234)</span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-500 font-medium">Enter 4-Digit OTP</label>
                    <input
                      type="text"
                      maxLength={4}
                      required
                      placeholder="1234"
                      value={inputOtp}
                      onChange={(e) => setInputOtp(e.target.value)}
                      className="w-full bg-slate-50 border border-emerald-500 p-2.5 rounded-xl text-xs text-slate-900 text-center font-mono tracking-widest focus:bg-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-500 text-white font-semibold rounded-xl text-xs hover:bg-emerald-600 transition-all shadow-md shadow-emerald-500/20"
                  >
                    Verify OTP & Complete Setup ➔
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep('input')}
                    className="w-full text-center text-[11px] text-slate-400 hover:text-slate-600 pt-1 font-medium"
                  >
                    ← Change Phone Number
                  </button>
                </form>
              )}

            </div>
          )}

        </div>
      )}

    </div>
  );
}