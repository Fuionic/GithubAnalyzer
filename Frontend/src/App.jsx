import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import DashboardPreview from './components/DashboardPreview';
import FeaturesGrid from './components/FeaturesGrid';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';
import DashboardShell from './components/DashboardShell';
import LegalModal from './components/LegalModal';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'auth' | 'dashboard'
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState('privacy');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('auth_token', token);
      window.history.replaceState({}, document.title, window.location.pathname);
      setCurrentView('dashboard');
    } else {
      const storedToken = localStorage.getItem('auth_token');
      if (storedToken) {
        setCurrentView('dashboard');
      }
    }
  }, []);

  const handleOpenLegal = (tab) => {
    setLegalModalTab(tab);
    setLegalModalOpen(true);
  };

  const handleLogin = () => {
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setCurrentView('home');
  };

  if (currentView === 'auth') {
    return (
      <div className="bg-[#000000] min-h-screen">
        <AuthPage 
          onBackToHome={() => setCurrentView('home')} 
          onLogin={handleLogin} 
          onOpenLegal={handleOpenLegal}
        />
        <LegalModal 
          isOpen={legalModalOpen} 
          initialTab={legalModalTab} 
          onClose={() => setLegalModalOpen(false)}
        />
      </div>
    );
  }

  if (currentView === 'dashboard') {
    return (
      <DashboardShell onLogout={handleLogout} />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#09090b] text-white overflow-x-hidden font-sans">
      {/* Background Glow */}
      <div className="glow-bg" />
      
      {/* Header Navigation */}
      <Header onGetStarted={() => setCurrentView('auth')} />
      
      {/* Main Content Layout */}
      <main className="pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center">
        <Hero onGetStarted={() => setCurrentView('auth')} />
        <DashboardPreview />
        <FeaturesGrid />
      </main>
      
      {/* Footer Navigation */}
      <Footer onOpenLegal={handleOpenLegal} />
      
      {/* Legal terms & conditions / privacy popups */}
      <LegalModal 
        isOpen={legalModalOpen} 
        initialTab={legalModalTab} 
        onClose={() => setLegalModalOpen(false)}
      />
    </div>
  );
}
