import React, { useState } from 'react';
import AIDossierSnapshot from './AIDossierSnapshot';
import { Github, Zap } from 'lucide-react';
import LoginModal from './LoginModal';
// Simple Google icon SVG component
const GoogleIcon = () => (
  <svg viewBox="0 0 533.5 544.3" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4285F4" d="M533.5 278.4c0-18.9-1.5-37-4.4-54.7H272v103.5h147.2c-6.4 35-25.9 64.7-55.2 84.6v70.2h89.3c52.4-48.3 82.2-119.5 82.2-203.6z" />
    <path fill="#34A853" d="M272 544.3c73.5 0 135.2-24.3 180.3-66.2l-89.3-70.2c-24.9 16.7-56.7 26.5-91 26.5-70 0-129.4-47.3-150.5-110.7H30.5v69.6c45.2 90 138.5 151.1 241.5 151.1z" />
    <path fill="#FBBC05" d="M121.5 323.7c-10.1-30.3-10.1-62.9 0-93.2V161h-91c-39.5 78.5-39.5 170.4 0 248.9l91-86.2z" />
    <path fill="#EA4335" d="M272 107.4c39.8-.6 78.1 14.9 107 42.4l80-80C424.5 15.2 350.9-3.5 272 0 169 0 75.7 61.2 30.5 151.1l91 69.5C142.6 154.7 202 107.4 272 107.4z" />
  </svg>
);

const AuthPage = ({ onBackToHome, onLogin, onOpenLegal, initialShowLogin = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(initialShowLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: email.split('@')[0],
          email,
          password
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const msg = errorData.message || '';
        if (msg.includes("already exists") || response.status === 409) {
          throw new Error("This email is already registered. Please click 'Sign In' below.");
        }
        throw new Error(msg || 'Registration failed');
      }

      const data = await response.json().catch(() => ({}));
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
      }
      if (onLogin) onLogin();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left visual pane */}
      <div className="relative flex-1 bg-[#000000] flex items-center justify-center overflow-hidden border-r border-[rgba(255,255,255,0.08)] p-8">
        {/* Soft, ambient emerald/zinc radial glow pulsing subtly in the background */}
        <div className="emerald-zinc-glow pointer-events-none" aria-hidden="true" />
        
        {/* Preview component */}
        <div className="relative z-10 w-full max-w-xl">
          <AIDossierSnapshot />
        </div>
      </div>

      {/* Right auth pane */}
      <div className="flex-1 bg-[#000000] flex items-center justify-center p-8 border-l border-[rgba(255,255,255,0.08)]">
        <div className="w-full max-w-md space-y-8">
          {/* Branding + header */}
          <div className="text-center">
            <button 
              type="button" 
              onClick={onBackToHome}
              className="inline-flex items-center justify-center hover:opacity-80 transition-opacity focus:outline-none"
            >
              <Zap className="h-12 w-12 text-white" />
            </button>
            <h2 className="mt-4 text-3xl font-bold text-white">Welcome back</h2>
            <p className="mt-2 text-base text-zinc-400">Sign in to monitor developer talent benchmarks.</p>
          </div>

          {/* OAuth buttons */}
          <div className="space-y-4">
            <button 
              type="button" 
              onClick={() => {
                window.location.href = 'http://localhost:8080/oauth2/authorization/github';
              }}
              className="w-full flex items-center justify-center gap-3 rounded-md border border-[rgba(255,255,255,0.12)] bg-white/5 text-white hover:bg-zinc-900 transition-all duration-200 py-2.5 font-medium"
            >
              <Github className="w-5 h-5" />
              <span>Continue with GitHub</span>
            </button>
            <button 
              type="button" 
              onClick={() => {
                window.location.href = 'http://localhost:8080/oauth2/authorization/google';
              }}
              className="w-full flex items-center justify-center gap-3 rounded-md border border-[rgba(255,255,255,0.12)] bg-white/5 text-white hover:bg-zinc-900 transition-all duration-200 py-2.5 font-medium"
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[rgba(255,255,255,0.06)]" />
            </div>
            <div className="relative text-center">
              <span className="px-2 text-sm text-zinc-600 bg-[#000000]">or continue with email</span>
            </div>
          </div>

          {/* Email / Password form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded-md border border-red-900/50 bg-red-950/20 text-red-200 text-xs text-center font-medium animate-pulse">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="relative block w-full appearance-none rounded-md border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400" 
                placeholder="Email address" 
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="relative block w-full appearance-none rounded-md border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400" 
                placeholder="Password" 
              />
            </div>
             <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex justify-center rounded-md bg-white text-black font-medium py-2.5 hover:bg-zinc-200 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up with Email'}
            </button>
          </form>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsLoginPopupOpen(true)}
              className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer underline underline-offset-4 bg-transparent border-0"
            >
              Already registered? Sign In
            </button>
          </div>

          {/* Compliance */}
          <p className="text-center text-sm text-zinc-500">
            By continuing, you agree to our{' '}
            <button
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('terms')}
              className="underline hover:text-zinc-400 cursor-pointer bg-transparent border-none p-0 inline font-normal text-zinc-500"
            >
              Terms of Conditions
            </button>{' '}
            and{' '}
            <button
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('privacy')}
              className="underline hover:text-zinc-400 cursor-pointer bg-transparent border-none p-0 inline font-normal text-zinc-500"
            >
              Privacy Policy
            </button>
            .
          </p>
        </div>
      </div>
      <LoginModal
        isOpen={isLoginPopupOpen}
        onClose={() => setIsLoginPopupOpen(false)}
        onLoginSuccess={() => {
          setIsLoginPopupOpen(false);
          if (onLogin) onLogin();
        }}
      />
    </div>
  );
};

export default AuthPage;
