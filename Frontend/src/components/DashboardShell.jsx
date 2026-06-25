import React, { useState, useEffect } from 'react';
import {
  Search,
  LayoutDashboard,
  User,
  BarChart3,
  Code,
  TrendingUp,
  GitPullRequest,
  Sparkles,
  LogOut,
  ChevronRight,
  ChevronDown,
  RefreshCw
} from 'lucide-react';
import ProfileResultsContainer from './ProfileResultsContainer';

const DashboardShell = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [usernameInput, setUsernameInput] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isForceRefreshed, setIsForceRefreshed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState(null);
  const [profileState, setProfileState] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) return;
      try {
        const response = await fetch('/api/v1/auth/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data);
        }
      } catch (err) {
        console.error('Failed to fetch user session:', err);
      }
    };
    fetchSession();
  }, []);

  const handleAnalyze = async (e, forceRefresh = false) => {
    if (e && e.preventDefault) e.preventDefault();
    const trimmedInput = usernameInput.trim();
    if (!trimmedInput) return;

    setIsForceRefreshed(forceRefresh);
    setIsLoading(true);
    setErrorAlert(null);
    setProfileState(null);
    setSearchedUser(null);

    // Format input to satisfy backend expectation (must contain github.com/)
    let githubUrl = trimmedInput;
    if (!githubUrl.includes("github.com/")) {
      const username = githubUrl.replace(/^\/|\/$/g, "");
      githubUrl = `https://github.com/${username}`;
    }

    try {
      const token = localStorage.getItem('auth_token');
      const headers = {
        'Content-Type': 'application/json'
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch('/api/v1/analyzer/analyze', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          githubUrl: githubUrl,
          username: trimmedInput,
          forceRefresh: forceRefresh
        })
      });

      if (!response.ok) {
        throw new Error('Failed response');
      }

      const data = await response.json();
      setProfileState(data);
      setSearchedUser(data.username || trimmedInput);
    } catch (err) {
      console.error(err);
      setErrorAlert("Failed to compile profile data. Verify the GitHub username configuration or try again shortly.");
    } finally {
      setIsLoading(false);
    }
  };


  const navItems = [
    { id: 'Overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'History', label: 'History', icon: User, isPreview: true }
  ];

  const comingSoonItems = [
    {
      label: 'Deep AST Code Reviews',
      icon: Code,
      badgeText: 'PREVIEW',
      badgeClass: 'bg-zinc-900 text-zinc-400 border border-zinc-800 text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded'
    },
    {
      label: 'Team Velocity Analytics',
      icon: TrendingUp,
      badgeText: 'PREVIEW',
      badgeClass: 'bg-blue-500/5 text-blue-400 border border-blue-500/10 text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded'
    },
    {
      label: 'Automated PR Reviewer',
      icon: GitPullRequest,
      badgeText: 'PREVIEW',
      badgeClass: 'bg-zinc-900 text-zinc-400 border border-zinc-800 text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded'
    }
  ];



  return (
    <div className="flex h-screen bg-[#09090b] text-white overflow-hidden font-sans">
      {/* The Left Nav Sidebar Shell */}
      <aside className="w-64 border-r border-zinc-800 bg-[#09090b]/50 h-screen p-4 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="flex items-center gap-2.5 px-2 py-1.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white text-black font-bold text-lg">
              Ω
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-sm text-white">ANTIGRAVITY</span>
              <span className="text-[10px] text-zinc-500 tracking-wider font-semibold uppercase">Profile Engine</span>
            </div>
          </div>

          {/* Navigation stack */}
          <div className="space-y-1">
            <span className="px-2 text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase block mb-2">
              Workspace
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              if (item.isPreview) {
                return (
                  <div
                    key={item.id}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg text-zinc-500 border border-transparent select-none pointer-events-none opacity-60"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-zinc-600" />
                      <span>{item.label}</span>
                    </div>
                    <span className="shrink-0 bg-zinc-900 text-zinc-400 border border-zinc-800 text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded">
                      PREVIEW
                    </span>
                  </div>
                );
              }
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${isActive
                      ? 'bg-white/10 text-white border border-white/10 shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.02] border border-transparent'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Coming Soon Navigation Rows */}
          <div className="space-y-1 pt-2">
            <span className="px-2 text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase block mb-2">
              Premium Add-ons
            </span>
            {comingSoonItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center justify-between px-3 py-2 text-xs font-medium text-zinc-500 border border-transparent select-none pointer-events-none opacity-60"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-zinc-600" />
                    <span className="truncate max-w-[110px]">{item.label}</span>
                  </div>
                  <span className={`shrink-0 ${item.badgeClass}`}>
                    {item.badgeText}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info & Logout */}
        <div className="space-y-3 border-t border-zinc-800/60 pt-4">
          {!currentUser ? (
            <div className="flex items-center gap-3 px-2 animate-pulse">
              <div className="w-8 h-8 rounded bg-zinc-800" />
              <div className="flex flex-col flex-1 space-y-1.5">
                <div className="h-3 bg-zinc-800 rounded w-20" />
                <div className="h-2 bg-zinc-800 rounded w-28" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center font-bold text-xs text-white">
                {currentUser.name ? currentUser.name.slice(0, 2).toUpperCase() : '??'}
              </div>
              <div className="flex flex-col truncate">
                <span className="text-xs font-semibold text-white">{currentUser.name || 'Anonymous'}</span>
                <span className="text-[10px] text-zinc-500 truncate">{currentUser.email || 'no-email'}</span>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/[0.02] rounded-lg transition-colors duration-200"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* The Right Workspace Area */}
      <main className="flex-1 h-screen overflow-y-auto no-scrollbar bg-[#000000] p-8 flex flex-col">

        {/* The Core Profile Query Input Bar */}
        <form onSubmit={(e) => handleAnalyze(e, false)} className="w-full flex items-center gap-3 bg-zinc-900/40 border border-zinc-800 rounded-xl p-2.5 shadow-lg backdrop-blur-md mb-8">
          <div className="flex-1 flex items-center gap-3 px-3">
            <Search className="w-5 h-5 text-zinc-500 shrink-0" />
            <input
              type="text"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              placeholder="Enter public GitHub username to generate AI profile dossier..."
              className="w-full bg-transparent border-0 text-white placeholder-zinc-500 focus:outline-none focus:ring-0 text-sm py-1"
            />
          </div>

          {/* Unified Button Group with Dropdown */}
          <div className="relative flex items-center shrink-0">
            <div className="relative flex items-stretch rounded-lg bg-white shadow-md">
              <button
                type="button"
                onClick={(e) => handleAnalyze(e, false)}
                className="px-5 py-2 bg-white hover:bg-zinc-200 text-black text-xs font-bold tracking-wider uppercase rounded-l-lg transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Analyze Profile</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              {/* Razor-thin vertical divider line */}
              <div className="w-[1px] bg-zinc-300 self-stretch my-2" />

              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="px-3 bg-white hover:bg-zinc-200 text-black rounded-r-lg transition-all duration-200 flex items-center justify-center cursor-pointer"
                aria-label="Toggle refresh options"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Popover Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-[#18181b] border border-zinc-800 rounded-lg p-1 shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <button
                  type="button"
                  onClick={(e) => {
                    handleAnalyze(e, true);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-2 rounded-md hover:bg-zinc-800/80 transition-colors duration-150 flex flex-col gap-0.5 text-white cursor-pointer"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Force Refresh Analysis</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-normal ml-5.5">
                    Bypasses cache to fetch live data.
                  </span>
                </button>
              </div>
            )}
          </div>
        </form>

        {/* Workspace Content Canvas */}
        <div className="flex-1 flex flex-col items-center justify-start border border-dashed border-zinc-800 rounded-2xl bg-[#09090b]/10 relative p-8 overflow-y-auto no-scrollbar w-full">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-grid-mesh opacity-[0.03] rounded-2xl pointer-events-none" />

          {errorAlert && (
            <div className="w-full max-w-4xl p-4 rounded-xl border border-red-950 bg-red-950/20 text-red-200 text-xs flex items-center justify-between shadow-inner mb-6 z-20">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-left font-medium">{errorAlert}</span>
              </div>
              <button 
                type="button" 
                onClick={() => setErrorAlert(null)}
                className="text-red-400 hover:text-red-200 font-semibold cursor-pointer text-xs ml-3 bg-transparent border-0"
              >
                Dismiss
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4 z-10 w-full max-w-md mx-auto my-auto">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-2 border-zinc-800"></div>
                <div className="absolute inset-0 rounded-full border-2 border-t-white animate-spin"></div>
              </div>
              <p className="text-xs text-zinc-400 font-medium tracking-wide uppercase animate-pulse">
                Parsing repository structures & compiling AI metrics...
              </p>
            </div>
          ) : searchedUser && profileState ? (
            <div className="w-full max-w-4xl space-y-6 z-10">
              <div className="text-center space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] tracking-wide font-semibold uppercase animate-pulse">
                  <Sparkles className="w-3 h-3" /> {isForceRefreshed ? 'Live analysis generated (Cache Bypassed)' : 'Live analysis generated'}
                </div>
                <h2 className="text-xl font-bold tracking-tight text-white">Dossier for: {searchedUser}</h2>
              </div>
              <ProfileResultsContainer data={profileState} />
            </div>
          ) : (
            <div className="text-center max-w-md space-y-4 relative z-10 my-auto">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-400 shadow-inner">
                <Search className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white tracking-wide">Awaiting Analysis</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Submit a public GitHub profile username above to build your high-fidelity, verified candidate dossier.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardShell;
