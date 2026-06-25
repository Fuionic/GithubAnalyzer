import React from 'react';
import { 
  Github, 
  Database, 
  Star, 
  Sparkles, 
  Cpu, 
  Code2, 
  Lock, 
  GitBranch, 
  TrendingUp 
} from 'lucide-react';

// A lightweight, secure helper to render basic markdown patterns (headers, list items, bold text, paragraphs)
const renderMarkdown = (text) => {
  if (!text) return null;
  
  const lines = text.split('\n');
  return lines.map((line, index) => {
    // Headings: ### Title or ## Title
    if (line.startsWith('### ')) {
      return <h4 key={index} className="text-sm font-bold text-white mt-4 mb-2 tracking-wide uppercase">{line.slice(4)}</h4>;
    }
    if (line.startsWith('## ')) {
      return <h3 key={index} className="text-base font-extrabold text-white mt-5 mb-3 tracking-wide">{line.slice(3)}</h3>;
    }
    if (line.startsWith('# ')) {
      return <h2 key={index} className="text-lg font-black text-white mt-6 mb-4 tracking-tight border-b border-white/10 pb-1">{line.slice(2)}</h2>;
    }
    
    // Unordered lists: - item or * item
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const content = line.trim().slice(2);
      return (
        <li key={index} className="ml-5 list-disc text-zinc-300 my-1 font-normal tracking-wide">
          {parseBold(content)}
        </li>
      );
    }

    // Empty lines
    if (!line.trim()) {
      return <div key={index} className="h-2" />;
    }

    // Default paragraphs
    return <p key={index} className="text-zinc-300 my-2 leading-relaxed tracking-wide font-normal">{parseBold(line)}</p>;
  });
};

// Parse **bold text**
const parseBold = (text) => {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return <strong key={i} className="font-semibold text-white">{part}</strong>;
    }
    return part;
  });
};

const ProfileResultsContainer = ({ data }) => {
  // Safe fallbacks for data
  const {
    username = 'unknown',
    totalRepos = 0,
    totalStars = 0,
    aiSummary = 'Provide a highly professional markdown summary...',
    primaryLanguages = []
  } = data || {};

  const publicRepos = totalRepos;
  const stars = totalStars;
  const languages = primaryLanguages;

  return (
    <div className="w-full space-y-6 text-white font-sans animate-fade-in">
      
      {/* Metric Row Layout (The Raw Counter Widgets) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Widget 1 (Username) */}
        <div className="p-5 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md flex flex-col justify-between space-y-2">
          <div className="flex items-center gap-2 text-zinc-500">
            <Github className="w-4 h-4" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Developer Identity</span>
          </div>
          <div>
            <div className="text-xs text-zinc-400 font-medium">GitHub Account</div>
            <div className="text-lg font-bold text-zinc-100 italic truncate tracking-tight">@{username}</div>
          </div>
        </div>

        {/* Widget 2 (Repositories) */}
        <div className="p-5 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md flex flex-col justify-between space-y-2">
          <div className="flex items-center gap-2 text-zinc-500">
            <Database className="w-4 h-4" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Parsed Code Bases</span>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white tracking-tight font-mono">{publicRepos}</div>
            <div className="text-[10px] text-zinc-400 font-medium tracking-wide uppercase mt-0.5">Total Public Repositories</div>
          </div>
        </div>

        {/* Widget 3 (Star Traction) */}
        <div className="p-5 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md flex flex-col justify-between space-y-2">
          <div className="flex items-center gap-2 text-zinc-500">
            <Star className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Total Repository Stars</span>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-amber-400 tracking-tight font-mono drop-shadow-[0_0_8px_rgba(251,191,36,0.15)]">
              {stars}
            </div>
            <div className="text-[10px] text-zinc-400 font-medium tracking-wide uppercase mt-0.5">Open Source Traction</div>
          </div>
        </div>

      </div>

      {/* TECH STACK SUMMARY (directly beneath metrics, above dossier) */}
      <div className="p-5 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md space-y-3">
        <div className="flex items-center gap-2">
          <Code2 className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">
            Tech Stack Summary
          </span>
        </div>
        {languages && languages.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {languages.map((lang, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium tracking-wide rounded-md bg-white/[0.03] text-zinc-300 border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-200 cursor-pointer"
              >
                {lang}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-zinc-500 italic">No programming languages detected.</p>
        )}
      </div>

      {/* The Core AI Automated Summary Markdown Panel */}
      <div className="p-6 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">
              AI Automated Candidate Dossier
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-500 bg-white/[0.02] border border-white/[0.05] px-2 py-0.5 rounded">
            <Cpu className="w-2.5 h-2.5" /> Engine Stable
          </div>
        </div>

        {/* Sleek full-width validation banner (Target Suitability & Match Score) */}
        <div className="w-full p-3.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-between gap-3 shadow-inner">
          <div className="text-xs font-semibold text-zinc-300">
            Target Suitability: <span className="text-white font-bold ml-1">Backend Engineer</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider font-mono">
            92% Match Score
          </div>
        </div>

        {/* Rendered Markdown Loop Area */}
        <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar space-y-1">
          {renderMarkdown(aiSummary)}
        </div>
      </div>

      {/* Integrated "Coming Soon" Metrics */}
      <div className="space-y-3">
        <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase block px-1">
          Extended Candidate Analytics
        </span>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Panel 1: Commit Velocity Trend Map */}
          <div className="relative overflow-hidden rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 opacity-40 select-none cursor-not-allowed min-h-[100px] flex flex-col justify-between">
            <div className="flex items-center gap-2 text-zinc-500">
              <GitBranch className="w-4 h-4 text-zinc-600" />
              <span className="text-[10px] font-bold tracking-wider uppercase">Commit Velocity Trend Map</span>
            </div>
            
            {/* Mock chart placeholder layout */}
            <div className="h-6 flex items-end gap-1 px-1">
              <div className="w-full h-[40%] bg-zinc-800 rounded-sm" />
              <div className="w-full h-[60%] bg-zinc-800 rounded-sm" />
              <div className="w-full h-[30%] bg-zinc-800 rounded-sm" />
              <div className="w-full h-[80%] bg-zinc-800 rounded-sm" />
              <div className="w-full h-[50%] bg-zinc-800 rounded-sm" />
            </div>

            {/* Central Badge Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
              <span className="inline-flex items-center gap-1 bg-zinc-800/90 text-zinc-400 text-[9px] tracking-widest font-extrabold uppercase px-2 py-1 rounded border border-zinc-700/80 shadow-md">
                <Lock className="w-2.5 h-2.5" /> PREVIEW
              </span>
            </div>
          </div>

          {/* Panel 2: Architecture Complexity Rank */}
          <div className="relative overflow-hidden rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 opacity-40 select-none cursor-not-allowed min-h-[100px] flex flex-col justify-between">
            <div className="flex items-center gap-2 text-zinc-500">
              <TrendingUp className="w-4 h-4 text-zinc-600" />
              <span className="text-[10px] font-bold tracking-wider uppercase">Architecture Complexity Rank</span>
            </div>
            
            {/* Mock layout */}
            <div className="text-lg font-bold text-zinc-700 font-mono">RANKING --/--</div>

            {/* Central Badge Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
              <span className="inline-flex items-center gap-1 bg-zinc-800/90 text-zinc-400 text-[9px] tracking-widest font-extrabold uppercase px-2 py-1 rounded border border-zinc-700/80 shadow-md">
                <Lock className="w-2.5 h-2.5" /> PREVIEW
              </span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ProfileResultsContainer;

