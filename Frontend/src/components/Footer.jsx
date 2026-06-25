import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

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
            <li><a href="#compliance" className="hover:text-white transition-colors duration-200">Compliance Data</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-zinc-500 mb-2">Support</h2>
          <ul className="flex flex-col gap-1">
            <li><a href="#docs" className="hover:text-white transition-colors duration-200">Documentation</a></li>
            <li><a href="#help" className="hover:text-white transition-colors duration-200">Help Desk Support</a></li>
            <li><a href="#status" className="hover:text-white transition-colors duration-200">System Status</a></li>
          </ul>
        </div>
        {/* Right Social Column */}
        <div className="flex items-center md:justify-end space-x-4 mt-4 md:mt-0">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors duration-200">
            <Github size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors duration-200">
            <Twitter size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors duration-200">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
