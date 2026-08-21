import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import demoVideo from '../../../assets/GitAnlayzer.mp4';

const Hero = ({ onGetStarted }) => {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  const handleWatchDemo = () => {
    setShowVideo(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        videoRef.current.play().catch(e => console.warn("Autoplay prevented:", e));
      }
    }, 550); // wait for animation to complete
  };

  return (
    <div className="w-full max-w-4xl mx-auto text-center mt-12 mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-zinc-900/50 text-zinc-300 text-sm font-medium mb-8 backdrop-blur-sm"
      >
        <span className="flex h-2 w-2 rounded-full bg-zinc-400"></span>
        AI-Powered Tech Recruiting
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400 mb-6"
      >
        Evaluate Engineering Talent at Scale, <span className="text-white">Instantly</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
      >
        Stop guessing with manual code reviews. Our AI semantic engine analyzes GitHub profiles to surface true engineering capability, saving your recruiters hundreds of hours.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <button onClick={onGetStarted} className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-zinc-200 text-black font-medium rounded-lg transition-all duration-200 shadow-sm">
          Get Started for Free
        </button>
        <button 
          onClick={handleWatchDemo}
          className="w-full sm:w-auto px-8 py-3.5 bg-zinc-900/50 text-zinc-300 border border-zinc-800 hover:bg-zinc-800 font-medium rounded-lg transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Watch Demo
        </button>
      </motion.div>

      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-16 w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black/40"
          >
            <video 
              ref={videoRef}
              src={demoVideo} 
              controls 
              className="w-full h-auto"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
