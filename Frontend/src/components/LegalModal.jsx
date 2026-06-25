import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, FileText } from 'lucide-react';

const LegalModal = ({ isOpen, initialTab = 'privacy', onClose }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  // Sync active tab with initialTab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialTab]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-[#1e1e21]/80 backdrop-blur-xl shadow-2xl z-10"
        >
          {/* Header & Tabs */}
          <div className="border-b border-white/10 bg-[#141416]/50 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Tabs */}
            <div className="flex gap-1 bg-black/25 p-1 rounded-lg border border-white/5 self-start">
              <button
                type="button"
                onClick={() => setActiveTab('privacy')}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all duration-200 ${
                  activeTab === 'privacy'
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('terms')}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all duration-200 ${
                  activeTab === 'terms'
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Terms of Service
              </button>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 sm:static p-1.5 rounded-lg border border-white/5 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Content Area */}
          <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            <div className="text-zinc-300 space-y-6 text-sm leading-relaxed">
              {activeTab === 'privacy' ? (
                // Privacy Policy Content
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white tracking-wide">1. Information We Collect</h3>
                  <p>
                    We collect repository metadata, public profile configurations, and authentication details via 
                    GitHub and Google OAuth. This includes parsed repository sizes, code structure footprints, 
                    and commit logs necessary to perform our automated profile analysis. We do not store private key files or read personal codebase repositories without explicit permission.
                  </p>

                  <h3 className="text-base font-bold text-white tracking-wide">2. How We Use Information</h3>
                  <p>
                    The data parsed is processed to generate AI summary assessments, matching ratios, 
                    and suitability metrics. We use caching mechanisms to prevent redundant API queries. We do not sell, rent, or distribute candidate records to third-party marketing companies.
                  </p>

                  <h3 className="text-base font-bold text-white tracking-wide">3. Third Party Services</h3>
                  <p>
                    Authentication is securely outsourced through GitHub and Google OAuth. The communication is guarded with TLS encryption. For advanced metrics, we utilize secure sandboxed execution steps that never persist user code on the core servers.
                  </p>

                  <h3 className="text-base font-bold text-white tracking-wide">4. Data Retention</h3>
                  <p>
                    Profiles can be completely purged at the candidate's demand. We maintain metadata backups for system integrity for a period not exceeding 30 days.
                  </p>
                </div>
              ) : (
                // Terms of Service Content
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white tracking-wide">1. Agreement to Terms</h3>
                  <p>
                    By logging in and connecting your GitHub or Google account, you agree to bound by these terms. 
                    If you disagree with any portion of the terms, access to the platform will be terminated.
                  </p>

                  <h3 className="text-base font-bold text-white tracking-wide">2. Service Usage Rules</h3>
                  <p>
                    The platform is constructed for engineering dossier summaries. Users must not attempt to scrape 
                    mass quantities of candidate metrics or utilize structural reports for automated discriminative recruitment processes. 
                  </p>

                  <h3 className="text-base font-bold text-white tracking-wide">3. Limitations of Liability</h3>
                  <p>
                    We provide profiles based on publicly accessible data footprints and synthetic models. We cannot 
                    guarantee the accuracy of candidate performance ratings or resume representations. The analysis and benchmarks are for informational purposes only.
                  </p>

                  <h3 className="text-base font-bold text-white tracking-wide">4. Platform Updates</h3>
                  <p>
                    We reserves the right to modify or close any subset of features at our sole discretion. We are not responsible for any direct or indirect loss resulting from service interruptions or API rate limit restrictions.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="border-t border-white/5 bg-[#141416]/30 px-6 py-4 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-semibold tracking-wider uppercase transition-colors duration-200"
            >
              Acknowledge
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LegalModal;
