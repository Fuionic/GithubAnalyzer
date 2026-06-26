import React from 'react';
import { motion } from 'framer-motion';

const Header = ({ onSignIn, onGetStarted }) => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#09090b]/80 backdrop-blur-md"
    >
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto px-6 h-16">
        {/* Far Left: Git-Analyzer Logo and Wordmark */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center border border-white/10 shadow-sm">
            <svg className="w-5 h-5 text-zinc-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a6 6 0 0 1 6 6c0 3.5-3 5.5-3 8h3a1 1 0 0 1 0 2H6a1 1 0 0 1 0-2h3c0-2.5-3-4.5-3-8a6 6 0 0 1 6-6z" />
            </svg>
          </div>
          <span className="font-bold text-white text-xl tracking-tight font-mono">Git-Analyzer</span>
        </div>
        
        {/* Remaining Nav Link */}
        <nav className="hidden md:flex items-center">
          <a href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Features</a>
        </nav>
        
        {/* Far Right: Action Grouping */}
        <div className="flex items-center">
          <a 
            onClick={onSignIn} 
            className="text-sm text-zinc-400 hover:text-white transition-colors mr-6 cursor-pointer"
          >
            Sign In
          </a>
          <button 
            onClick={onGetStarted} 
            className="bg-white text-black text-sm font-medium px-4 py-2 rounded-lg hover:bg-zinc-200 transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
