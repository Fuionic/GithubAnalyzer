import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, Star, Code2, Target, CheckCircle2 } from 'lucide-react';

const FeaturesGrid = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="w-full max-w-6xl mx-auto mb-32 scroll-mt-20" id="features">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">Production MVP Feature Matrix</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm">Empowering enterprise technical sourcing with deep, verifiable developer profile intelligence.</p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Card 1: AI Summary (col-span-2) */}
        <motion.div variants={item} className="col-span-1 md:col-span-2 bg-white/[0.02] backdrop-blur-md border border-white/8 rounded-2xl p-8 hover:bg-white/[0.04] transition-colors relative overflow-hidden group shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center border border-white/8 mb-6 text-zinc-300">
              <Sparkles size={18} />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight mb-2">AI Developer Summary</h3>
            <p className="text-zinc-400 text-xs mb-6">Generates qualitative summaries reflecting genuine engineering character, team habits, and code patterns.</p>
          </div>
          
          {/* Output block representing real developer strings */}
          <div className="bg-black/40 border border-white/5 rounded-xl p-5 font-mono text-[11px] leading-relaxed text-zinc-300">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-3 text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>SYNTHESIZED PROFILE SUMMARY</span>
            </div>
            <p className="mb-2">
              <span className="text-zinc-500">&gt;</span> Exhibits strong adherence to clean architectural separation of concerns (SOLID principles).
            </p>
            <p className="mb-2">
              <span className="text-zinc-500">&gt;</span> High performance focus: Frequently optimizes hot paths in async TypeScript handlers.
            </p>
            <p>
              <span className="text-zinc-500">&gt;</span> Collaborative signal: Provides detailed, constructive PR reviews across 4 active repositories.
            </p>
          </div>
        </motion.div>

        {/* Card 2: Sourcing Volume (col-span-1) */}
        <motion.div variants={item} className="col-span-1 bg-white/[0.02] backdrop-blur-md border border-white/8 rounded-2xl p-8 hover:bg-white/[0.04] transition-colors shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center border border-white/8 mb-6 text-zinc-300">
              <Users size={18} />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight mb-2">Sourcing Volume</h3>
            <p className="text-zinc-400 text-xs mb-6">Unrivaled access to scanned and indexable profiles globally.</p>
          </div>
          <div className="pt-4 border-t border-white/5">
            <div className="text-3xl font-extrabold text-white tracking-tight font-mono mb-1">
              1,240,500+
            </div>
            <div className="text-[10px] text-zinc-500 uppercase font-semibold tracking-wider">Profiles Scanned & Indexed</div>
          </div>
        </motion.div>

        {/* Card 3: Open-Source Traction (col-span-1) */}
        <motion.div variants={item} className="col-span-1 bg-white/[0.02] backdrop-blur-md border border-white/8 rounded-2xl p-8 hover:bg-white/[0.04] transition-colors shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center border border-white/8 mb-6 text-amber-500">
              <Star size={18} fill="currentColor" className="stroke-none" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight mb-2">OS Traction</h3>
            <p className="text-zinc-400 text-xs mb-6">Synthesizes aggregate repository engagement metrics dynamically.</p>
          </div>
          <div className="bg-black/40 border border-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-zinc-400">Total Stars Received</span>
              <span className="font-mono text-white font-bold">14,280</span>
            </div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-zinc-400">Total Fork Count</span>
              <span className="font-mono text-white font-bold">1,894</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">Active Contributors</span>
              <span className="font-mono text-white font-bold">42</span>
            </div>
          </div>
        </motion.div>

        {/* Card 4: Core Stack (col-span-1) */}
        <motion.div variants={item} className="col-span-1 bg-white/[0.02] backdrop-blur-md border border-white/8 rounded-2xl p-8 hover:bg-white/[0.04] transition-colors shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center border border-white/8 mb-6 text-zinc-300">
              <Code2 size={18} />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight mb-2">Core Stack Volume</h3>
            <p className="text-zinc-400 text-xs mb-6">Direct structural mapping of core languages by volume of commits.</p>
          </div>
          <div className="space-y-2.5">
            {[
              { lang: 'TypeScript', pct: 85 },
              { lang: 'Java', pct: 60 },
              { lang: 'Python', pct: 45 },
              { lang: 'Go', pct: 30 }
            ].map((item) => (
              <div key={item.lang} className="text-xs">
                <div className="flex justify-between text-zinc-300 mb-1 font-mono text-[10px]">
                  <span>{item.lang}</span>
                  <span>{item.pct}%</span>
                </div>
                <div className="w-full bg-zinc-800/40 h-1 rounded-full overflow-hidden">
                  <div className="bg-zinc-400 h-full rounded-full" style={{ width: `${item.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Card 5: Role Suitability Engine (col-span-1 md:col-span-1) */}
        <motion.div variants={item} className="col-span-1 bg-white/[0.02] backdrop-blur-md border border-white/8 rounded-2xl p-8 hover:bg-white/[0.04] transition-colors shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center border border-white/8 mb-6 text-zinc-300">
              <Target size={18} />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight mb-2">Role Suitability</h3>
            <p className="text-zinc-400 text-xs mb-6">Contextual match metrics evaluating developers against exact role targets.</p>
          </div>
          <div className="bg-black/30 border border-white/5 rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-zinc-500 font-mono">ROLE TARGET</span>
              <span className="text-white font-medium">Backend Engineer</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-zinc-500 font-mono">MATCH SCORE</span>
              <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">92%</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 mt-2 border-t border-white/5 pt-2">
              <CheckCircle2 size={12} className="text-zinc-500" />
              <span>Verifiable skill validation passed</span>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default FeaturesGrid;
