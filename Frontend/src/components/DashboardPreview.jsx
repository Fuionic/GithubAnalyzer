import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, FileCode2, GitPullRequest, ArrowUpRight, Github, Award, CheckCircle2, Network } from 'lucide-react';

const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = [
    { id: 'Overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'Code Quality', icon: FileCode2, label: 'Code Quality' },
    { id: 'Contributions', icon: GitPullRequest, label: 'Contributions' },
    { id: 'AST Parsing', icon: Network, label: 'Deep AST Parsing' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5 }}
      className="w-full max-w-5xl mx-auto mb-32 relative"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-zinc-500/10 to-zinc-800/10 rounded-2xl blur-xl opacity-30"></div>
      <div className="absolute inset-0 bg-grid-mesh rounded-2xl opacity-15"></div>
      
      {/* Mockup Outer Container */}
      <div className="relative rounded-xl overflow-hidden border border-white/8 bg-white/[0.02] backdrop-blur-md shadow-2xl">
        
        {/* Address Bar / Window Header */}
        <div className="h-12 border-b border-white/8 flex items-center px-4 bg-black/40 justify-between">
          <div className="flex gap-1.5 w-16">
            <div className="w-3 h-3 rounded-full bg-white/10"></div>
            <div className="w-3 h-3 rounded-full bg-white/10"></div>
            <div className="w-3 h-3 rounded-full bg-white/10"></div>
          </div>
          <div className="px-4 py-1 rounded-md bg-white/[0.03] text-[11px] text-zinc-400 font-mono w-80 text-center border border-white/5 truncate">
            ai-profile-analyzer.com/candidate/alex-rivera
          </div>
          <div className="w-16"></div>
        </div>
        
        {/* Dashboard Work Area */}
        <div className="grid grid-cols-1 md:grid-cols-4 min-h-[420px]">
          
          {/* Vertical Sidebar */}
          <div className="col-span-1 border-r border-white/8 p-4 flex flex-col space-y-4 bg-black/20">
            <div className="px-3 py-2 mb-4 flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center">
                <Github size={12} className="text-zinc-300" />
              </div>
              <span className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">Developer Profile</span>
            </div>

            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-white/[0.06] text-white border border-white/10 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={14} className={isActive ? 'text-white' : 'text-zinc-400'} />
                    <span>{tab.label}</span>
                  </div>
                </button>
              );
            })}

            <div className="mt-auto p-3 bg-white/[0.01] border border-white/5 rounded-lg">
              <div className="text-[10px] text-zinc-500 uppercase font-semibold mb-1">Status</div>
              <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Analysis Synced
              </div>
            </div>
          </div>
          
          {/* Active Tab Panel Content */}
          <div className="col-span-1 md:col-span-3 p-6 flex flex-col gap-6">
            
            {/* Candidate Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight flex flex-col gap-1">
  <span className="flex items-center gap-2">Alex Rivera</span>
  <a href="https://github.com/arivera" className="text-xs text-zinc-400 underline hover:text-zinc-300">github.com/arivera</a>
</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Senior Fullstack Engineer • San Francisco, CA</p>
              </div>
              
              {/* Match Score Badge */}
              <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-zinc-200 text-xs font-semibold shadow-sm">
                <Award size={13} className="text-zinc-300" />
                <span>92 Match Score</span>
              </div>
            </div>

            {activeTab === 'Overview' && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="flex-1 flex flex-col gap-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-white/5 bg-white/[0.01] rounded-lg p-4">
                    <div className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider mb-1">Top Language</div>
                    <div className="text-sm font-semibold text-zinc-200">TypeScript (64%)</div>
                    <div className="w-full bg-zinc-800/50 h-1.5 rounded-full mt-2.5 overflow-hidden">
                      <div className="bg-zinc-400 h-full rounded-full" style={{ width: '64%' }}></div>
                    </div>
                  </div>
                  <div className="border border-white/5 bg-white/[0.01] rounded-lg p-4">
                    <div className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider mb-1">Code Quality Rank</div>
                    <div className="text-sm font-semibold text-zinc-200">Top 3.5% (High Reliability)</div>
                    <div className="flex gap-1 mt-2.5">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`h-1.5 flex-1 rounded-full ${i < 4 ? 'bg-zinc-400' : 'bg-zinc-800'}`}></span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border border-white/5 bg-white/[0.01] rounded-lg p-4 flex-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                       <div className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Weekly Activity (12 Weeks)</div>
                     </div>
                    <span className="text-[10px] text-zinc-400 flex items-center gap-0.5">342 commits <ArrowUpRight size={10} /></span>
                  </div>
                  
                  {/* Fine Line Profile Analysis Graphic */}
                  <div className="flex-1 min-h-[90px] flex items-end gap-1.5 pt-2">
                    {[35, 55, 40, 75, 60, 45, 90, 80, 50, 70, 85, 95].map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col justify-end h-full group">
                        <div 
                          className="w-full bg-white/[0.08] hover:bg-white/20 rounded-t-sm transition-all duration-200" 
                          style={{ height: `${val}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Code Quality' && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="flex-1 flex flex-col gap-3"
              >
                <div className="border border-white/5 bg-white/[0.01] rounded-lg p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                    <span className="text-zinc-400">Architecture & Patterns</span>
                    <span className="font-semibold text-zinc-200">Excellent</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                    <span className="text-zinc-400">Test Coverage</span>
                    <span className="font-semibold text-zinc-200">89%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">Code Reusability Ratio</span>
                    <span className="font-semibold text-zinc-200">0.74</span>
                  </div>
                </div>

                <div className="border border-white/5 bg-white/[0.01] rounded-lg p-4 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Automated Semantic Code Insights</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex gap-2 items-start text-xs text-zinc-300">
                      <CheckCircle2 size={13} className="text-zinc-400 mt-0.5 flex-shrink-0" />
                      <span>Clean separation of concerns with modern React hooks patterns.</span>
                    </div>
                    <div className="flex gap-2 items-start text-xs text-zinc-300">
                      <CheckCircle2 size={13} className="text-zinc-400 mt-0.5 flex-shrink-0" />
                      <span>Consistent implementation of automated unit/integration test suites.</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Contributions' && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="flex-1 flex flex-col gap-3"
              >
                <div className="grid grid-cols-3 gap-3">
                  <div className="border border-white/5 bg-white/[0.01] rounded-lg p-3 text-center">
                    <div className="text-[9px] text-zinc-500 uppercase font-semibold">PRs Merged</div>
                    <div className="text-base font-bold text-zinc-200 mt-1">142</div>
                  </div>
                  <div className="border border-white/5 bg-white/[0.01] rounded-lg p-3 text-center">
                    <div className="text-[9px] text-zinc-500 uppercase font-semibold">Reviews Given</div>
                    <div className="text-base font-bold text-zinc-200 mt-1">289</div>
                  </div>
                  <div className="border border-white/5 bg-white/[0.01] rounded-lg p-3 text-center">
                    <div className="text-[9px] text-zinc-500 uppercase font-semibold">Merged Ratio</div>
                    <div className="text-base font-bold text-zinc-200 mt-1">94.6%</div>
                  </div>
                </div>

                <div className="border border-white/5 bg-white/[0.01] rounded-lg p-4 flex-1 flex flex-col justify-center items-center text-center">
                  <div className="text-xs text-zinc-400 max-w-sm">
                    "Highly collaborative team member. Represents strong technical leadership through proactive code review activities and repository design."
                  </div>
                  <span className="text-[10px] text-zinc-500 mt-3">— AI Recruiter Summary</span>
                </div>
              </motion.div>
            )}

          </div>

        </div>
        
      </div>
    </motion.div>
  );
};

export default DashboardPreview;
