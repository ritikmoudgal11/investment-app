// ==============================================================================
// FILE: frontend/app/components/MyAccountButton.tsx
// WHAT IT IS: Modular "My Account" navbar button with Profile & Settings Expansion
// ==============================================================================

'use client';

import React, { useState, useEffect } from 'react';

// Simulated database of taken usernames to check availability in real-time
const TAKEN_USERNAMES = ['admin', 'trader', 'laminar', 'system', 'boss'];

interface UserAccount {
  name: string;
  contact: string;
  authMethod: 'email' | 'phone';
  clientId: string;
  registeredAt: string;
  username?: string;
  avatar?: string;
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
  const [inputUsername, setInputUsername] = useState('');
  
  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [otpSent, setOtpSent] = useState(false);
  const [inputOtp, setInputOtp] = useState('');

  // Active view inside modal when logged in ('profile' | 'settings' | 'main')
  const [activeTab, setActiveTab] = useState<'main' | 'profile' | 'settings'>('main');

  // Edit profile states
  const [editName, setEditName] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [editAvatar, setEditAvatar] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [checkingUsername, setCheckingUsername] = useState(false);

  // Settings states
  const [themePreference, setThemePreference] = useState('dark');
  const [emailNotifications, setEmailNotifications] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('laminar_user_session');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        setEditName(parsed.name || '');
        setEditUsername(parsed.username || 'trader_' + parsed.clientId);
        setEditAvatar(parsed.avatar || '');
      } catch (e) {
        console.error('Failed to load user session', e);
      }
    }
  }, []);

  // Real-time unique username availability check with debouncing
  useEffect(() => {
    const targetUsername = user ? editUsername : inputUsername;
    if (!targetUsername) return;

    setCheckingUsername(true);
    const timer = setTimeout(() => {
      const lower = targetUsername.toLowerCase().trim();
      const isTaken = TAKEN_USERNAMES.includes(lower);
      setIsUsernameValid(!isTaken);
      setCheckingUsername(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [editUsername, inputUsername, user]);

  const generateClientId = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `LAM-${randomNum}`;
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvt) => {
        if (uploadEvt.target?.result) {
          setEditAvatar(uploadEvt.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
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

    const assignedId = generateClientId();
    const newUser: UserAccount = {
      name: inputName.trim() || 'Trader',
      contact: contactInfo,
      authMethod,
      clientId: assignedId,
      registeredAt: new Date().toLocaleDateString(),
      username: inputUsername.trim() || 'trader_' + assignedId,
      avatar: ''
    };

    localStorage.setItem('laminar_user_session', JSON.stringify(newUser));
    setUser(newUser);
    setEditName(newUser.name);
    setEditUsername(newUser.username || '');
    setEditAvatar('');
    
    setInputPassword('');
    setInputOtp('');
    setStep('input');
    setOtpSent(false);
    setIsOpen(false);
  };

  const handleSaveProfile = () => {
    if (!isUsernameValid || !user) return;
    const updatedUser: UserAccount = {
      ...user,
      name: editName.trim(),
      username: editUsername.trim(),
      avatar: editAvatar
    };
    localStorage.setItem('laminar_user_session', JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert('Profile updated successfully!');
    setActiveTab('main');
  };

  const handleLogout = () => {
    localStorage.removeItem('laminar_user_session');
    setUser(null);
    setActiveTab('main');
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left font-sans">
      
      {/* TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-white/10 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all shadow-md focus:outline-none cursor-pointer"
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
        {user ? (
          <span className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center overflow-hidden font-bold text-[10px]">
              {user.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                user.name.charAt(0)
              )}
            </div>
            <span>{user.name}</span>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono font-bold">
              #{user.clientId}
            </span>
          </span>
        ) : (
          <span>My Account</span>
        )}
      </button>

      {/* DROPDOWN CONTAINER */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 rounded-2xl bg-slate-950 border border-white/10 shadow-2xl p-5 z-50 text-white space-y-4">
          
          {user ? (
            /* AUTHENTICATED STATE */
            <div className="space-y-4">
              
              {/* TAB NAVIGATION FOR LOGGED-IN USERS */}
              <div className="flex bg-slate-900 p-1 rounded-xl border border-white/5 text-[11px] font-semibold">
                <button
                  onClick={() => setActiveTab('main')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${activeTab === 'main' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${activeTab === 'profile' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${activeTab === 'settings' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  Settings
                </button>
              </div>

              {activeTab === 'main' && (
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-3 flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center font-bold text-sm overflow-hidden">
                        {user.avatar ? (
                          <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          user.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white">{user.name}</h4>
                        <p className="text-[11px] text-slate-400 font-mono">@{user.username || 'trader'}</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-full font-bold">
                      Verified
                    </span>
                  </div>

                  {/* UNIQUE CLIENT ID BADGE */}
                  <div className="bg-slate-900 border border-cyan-500/30 p-3 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                      Unique Operational ID
                    </span>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-black text-cyan-400 font-mono tracking-wide">
                        #{user.clientId}
                      </span>
                      <span className="text-[10px] text-slate-500">Active Access</span>
                    </div>
                  </div>

                  {/* ACCOUNT OPTIONS */}
                  <div className="space-y-1 pt-1 text-xs">
                    <button
                      onClick={() => setActiveTab('profile')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-900 text-slate-300 hover:text-white transition-all flex items-center justify-between"
                    >
                      <span>Edit Profile & Avatar</span>
                      <span className="text-slate-500">➔</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('settings')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-900 text-slate-300 hover:text-white transition-all flex items-center justify-between"
                    >
                      <span>System Settings</span>
                      <span className="text-slate-500">➔</span>
                    </button>
                  </div>

                  {/* SIGN OUT */}
                  <button
                    onClick={handleLogout}
                    className="w-full py-2 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 rounded-xl text-xs font-bold transition-all"
                  >
                    Sign Out
                  </button>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-slate-900 p-3 rounded-xl border border-white/5">
                    <div className="w-12 h-12 rounded-full bg-cyan-500 text-slate-950 font-bold flex items-center justify-center overflow-hidden">
                      {editAvatar ? (
                        <img src={editAvatar} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        editName.charAt(0)
                      )}
                    </div>
                    <div>
                      <label className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg text-[11px] font-semibold cursor-pointer transition-all inline-block border border-white/10">
                        Upload Picture
                        <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                      </label>
                      <p className="text-[10px] text-slate-500 mt-1">PNG/JPG max 2MB</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Display Name</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 p-2 rounded-xl text-xs text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Unique Handle</label>
                    <input
                      type="text"
                      value={editUsername}
                      onChange={(e) => setEditUsername(e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 p-2 rounded-xl text-xs text-white focus:border-cyan-500 focus:outline-none"
                    />
                    {checkingUsername && <p className="text-[10px] text-amber-400">Checking availability...</p>}
                    {!checkingUsername && isUsernameValid && <p className="text-[10px] text-emerald-400">✓ Handle available</p>}
                    {!checkingUsername && !isUsernameValid && <p className="text-[10px] text-red-400">✕ Handle taken already</p>}
                  </div>

                  <button
                    onClick={handleSaveProfile}
                    disabled={!isUsernameValid}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${isUsernameValid ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                  >
                    Save Changes
                  </button>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-3">
                  <div className="bg-slate-900 p-3 rounded-xl border border-white/5 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Theme Preference</span>
                      <select 
                        value={themePreference} 
                        onChange={(e) => setThemePreference(e.target.value)}
                        className="bg-slate-950 border border-white/10 rounded-lg px-2 py-1 text-white text-[11px]"
                      >
                        <option value="dark">Dark Mode</option>
                        <option value="light">Light Mode</option>
                      </select>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-slate-300">Live Alerts</span>
                      <input 
                        type="checkbox" 
                        checked={emailNotifications} 
                        onChange={(e) => setEmailNotifications(e.target.checked)}
                        className="accent-cyan-500 w-3.5 h-3.5"
                      />
                    </div>
                  </div>

                  <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-[10px] text-cyan-300">
                    💡 <strong>Extensible Slot:</strong> Additional configuration options, API integrations, and risk thresholds will be added here.
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* REGISTRATION & LOGIN STATE */
            <div className="space-y-3">
              <div className="border-b border-white/10 pb-2 flex justify-between items-center">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300">
                  {isRegistering ? 'Create Client Account' : 'Client Access'}
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    setIsRegistering(!isRegistering);
                    setStep('input');
                  }}
                  className="text-[11px] text-cyan-400 hover:underline"
                >
                  {isRegistering ? 'Sign In' : 'Register'}
                </button>
              </div>

              {/* METHOD SWITCHER: EMAIL VS PHONE */}
              {step === 'input' && (
                <div className="grid grid-cols-2 gap-2 bg-slate-900 p-1 rounded-xl border border-white/5">
                  <button
                    type="button"
                    onClick={() => setAuthMethod('email')}
                    className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${authMethod === 'email' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMethod('phone')}
                    className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${authMethod === 'phone' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                  >
                    Phone (OTP)
                  </button>
                </div>
              )}

              {/* FORM FIELDS */}
              {step === 'input' ? (
                <form onSubmit={authMethod === 'email' ? handleCompleteAuth : handleSendOtp} className="space-y-3">
                  {isRegistering && (
                    <>
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-400">Full Name / Alias</label>
                        <input
                          type="text"
                          required
                          placeholder="Ritik Moudgal"
                          value={inputName}
                          onChange={(e) => setInputName(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 p-2 rounded-xl text-xs text-white focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-400">Choose Unique Handle</label>
                        <input
                          type="text"
                          required
                          placeholder="ritik_trader"
                          value={inputUsername}
                          onChange={(e) => setInputUsername(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 p-2 rounded-xl text-xs text-white focus:border-cyan-500 focus:outline-none"
                        />
                        {checkingUsername && <p className="text-[10px] text-amber-400">Checking availability...</p>}
                        {!checkingUsername && inputUsername && isUsernameValid && <p className="text-[10px] text-emerald-400">✓ Handle available</p>}
                        {!checkingUsername && !isUsernameValid && <p className="text-[10px] text-red-400">✕ Handle taken already</p>}
                      </div>
                    </>
                  )}

                  {authMethod === 'email' ? (
                    <>
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-400">Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="client@laminarsystems.com"
                          value={inputEmail}
                          onChange={(e) => setInputEmail(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-xl text-xs text-white focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-400">Password</label>
                        <input
                          type="password"
                          required
                          placeholder="••••••••"
                          value={inputPassword}
                          onChange={(e) => setInputPassword(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-xl text-xs text-white focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Mobile Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={inputPhone}
                        onChange={(e) => setInputPhone(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 p-2.5 rounded-xl text-xs text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isRegistering && !isUsernameValid}
                    className={`w-full py-2.5 font-black rounded-xl text-xs transition-all shadow-lg mt-2 ${!isRegistering || isUsernameValid ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 hover:scale-[1.01] shadow-cyan-500/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                  >
                    {authMethod === 'email'
                      ? (isRegistering ? 'Register & Get Client ID' : 'Sign In')
                      : 'Send OTP Verification Code ➔'}
                  </button>
                </form>
              ) : (
                /* OTP ENTER VERIFICATION STEP */
                <form onSubmit={handleCompleteAuth} className="space-y-3">
                  <div className="bg-slate-900 border border-cyan-500/30 p-3 rounded-xl text-center space-y-1">
                    <span className="text-[11px] text-slate-400">OTP Code Sent To</span>
                    <p className="text-xs font-mono font-bold text-cyan-400">{inputPhone}</p>
                    <span className="text-[10px] text-slate-500">(Demo Mode: Enter 1234)</span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Enter 4-Digit OTP</label>
                    <input
                      type="text"
                      maxLength={4}
                      required
                      placeholder="1234"
                      value={inputOtp}
                      onChange={(e) => setInputOtp(e.target.value)}
                      className="w-full bg-slate-900 border border-cyan-500/50 p-2.5 rounded-xl text-xs text-white text-center font-mono tracking-widest focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-black rounded-xl text-xs hover:scale-[1.01] transition-all shadow-lg shadow-cyan-500/20"
                  >
                    Verify OTP & Complete Setup ➔
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep('input')}
                    className="w-full text-center text-[11px] text-slate-500 hover:text-slate-300 pt-1"
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