import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Cpu, Database, Star, Layers } from 'lucide-react';

const AIDossierSnapshot = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-lg mx-auto"
    >
      {/* Outer border & glass frame */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6 sm:p-8 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)]">
        
        {/* Subtle decorative grid/mesh background inside the card */}
        <div className="absolute inset-0 bg-grid-mesh opacity-[0.03] pointer-events-none" />
        
        {/* Card corner accent light */}
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />

        {/* Content Stack */}
        <div className="space-y-6 relative z-10">
          
          {/* Header section: Candidate Info */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.25em] text-emerald-400 uppercase">AI Verified Candidate</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans">
              Alex Rivera
              <span className="text-zinc-500 font-normal text-base sm:text-lg block sm:inline sm:ml-2">
                — San Francisco, CA
              </span>
            </h3>
          </div>

          {/* Validation Banner: Target Role Fitment */}
          <div className="p-3.5 rounded-xl border border-white/[0.05] bg-white/[0.01] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
            <div className="space-y-0.5">
              <span className="text-[10px] font-semibold tracking-wider text-zinc-500 uppercase block">Role Targeting</span>
              <div className="text-sm font-semibold text-zinc-200 tracking-wide">
                Target Fit: <span className="text-white font-medium">Senior Backend Engineer</span>
              </div>
            </div>
            {/* Illuminated Emerald Metric Pill */}
            <div className="self-start sm:self-center flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-semibold shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              92% Match Score
            </div>
          </div>

          {/* The AI Summary Component (The Hero Element) */}
          <div className="relative p-5 rounded-xl border border-white/[0.06] bg-gradient-to-br from-white/[0.01] to-transparent space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">
                  AI Automated Summary
                </span>
              </div>
              <Sparkles className="w-3.5 h-3.5 text-zinc-600 animate-pulse" />
            </div>
            
            <p className="text-sm text-zinc-300 leading-relaxed tracking-wide font-normal">
              "Demonstrates exceptional mastery in building scalable distributed systems. Code footprints show advanced architecture habits across high-concurrency environments, utilizing strict design patterns. Highly proficient in optimizing database throughput and structured caching mechanics."
            </p>

            <div className="pt-2 flex items-center gap-4 text-[10px] font-mono text-zinc-500 border-t border-white/[0.04]">
              <span className="flex items-center gap-1">
                <Cpu className="w-3 h-3" /> Core Engine v4.2
              </span>
              <span className="flex items-center gap-1">
                <Layers className="w-3 h-3" /> Architecture Depth: High
              </span>
            </div>
          </div>

          {/* The Proof Metric Row */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            
            {/* Left Metric: Total Records */}
            <div className="p-4 rounded-xl border border-white/[0.05] bg-white/[0.01] space-y-1">
              <div className="flex items-center gap-1.5 text-zinc-500">
                <Database className="w-3.5 h-3.5" />
                <span className="text-[10px] font-semibold tracking-wider uppercase">Parsed Data</span>
              </div>
              <div className="space-y-0.5">
                <div className="text-3xl font-extrabold text-white tracking-tight font-mono">180</div>
                <div className="text-[10px] text-zinc-400 tracking-wide font-medium">Total Records Analyzed</div>
              </div>
            </div>

            {/* Right Metric: Star Counts */}
            <div className="p-4 rounded-xl border border-white/[0.05] bg-white/[0.01] space-y-1">
              <div className="flex items-center gap-1.5 text-zinc-500">
                <Star className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[10px] font-semibold tracking-wider uppercase">Reputation</span>
              </div>
              <div className="space-y-0.5">
                <div className="text-3xl font-extrabold text-white tracking-tight font-mono">94</div>
                <div className="text-[10px] text-zinc-400 tracking-wide font-medium">Total Repository Stars</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default AIDossierSnapshot;
