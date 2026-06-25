import React from 'react';
import { motion } from 'framer-motion';

const Header = ({ onGetStarted }) => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#09090b]/80 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center border border-white/10 shadow-sm">
            <svg className="w-5 h-5 text-zinc-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-bold text-white text-xl tracking-tight">AI Profile Analyzer</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Pricing</a>
          <a href="#docs" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Docs</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <button onClick={onGetStarted} className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block">
            Sign in
          </button>
          <button onClick={onGetStarted} className="text-sm font-medium bg-white text-black px-4 py-2 rounded-lg hover:bg-zinc-200 transition-all duration-200">
            Get Started
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
