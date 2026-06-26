import React from 'react';

const Footer = ({ onOpenLegal }) => {
  return (
    <footer className="bg-[#09090b] border-t border-white/6">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-zinc-400">
        {/* Left Brand Column */}
        <div>
          <h1 className="text-2xl font-bold text-white">AI Profile Analyzer</h1>
          <p className="text-xs text-zinc-500 mt-2">© 2026 AI Profile Analyzer. All rights reserved.</p>
        </div>

        {/* Middle Columns */}
        <div>
          <h2 className="text-sm font-semibold text-zinc-500 mb-2">Legal</h2>
          <ul className="flex flex-col gap-1 items-start">
            <li>
              <button
                type="button"
                onClick={() => onOpenLegal && onOpenLegal('privacy')}
                className="hover:text-white transition-colors duration-200 text-left bg-transparent border-none cursor-pointer p-0 font-normal text-zinc-400"
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenLegal && onOpenLegal('terms')}
                className="hover:text-white transition-colors duration-200 text-left bg-transparent border-none cursor-pointer p-0 font-normal text-zinc-400"
              >
                Terms of Conditions
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-zinc-500 mb-2">Support</h2>
          <ul className="flex flex-col gap-1">
            <li>
              <a href="mailto:accclens@gmail.com" className="text-zinc-400 hover:text-white transition-colors">
                Help Desk & Support
              </a>
            </li>
            <li className="flex items-center">
              <span className="text-zinc-400">System Status</span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/5 text-emerald-400 border border-emerald-500/10 text-[10px] px-2 py-0.5 rounded-full font-mono ml-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Operational
              </span>
            </li>
          </ul>
        </div>

        {/* Compliance Column */}
        <div className="flex items-start md:justify-end text-left md:text-right mt-4 md:mt-0">
          <p className="text-[11px] text-zinc-500 max-w-[240px] leading-relaxed">
            Data Ecosystem & Privacy Compliant. All profile queries process through secure temporary memory lanes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
