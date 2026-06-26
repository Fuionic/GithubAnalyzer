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
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('antigravity_session') === 'true');
  const [currentView, setCurrentView] = useState(() => 
    localStorage.getItem('antigravity_session') === 'true' ? 'dashboard' : 'home'
  );
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState('privacy');
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('antigravity_session', 'true');
      setIsLoggedIn(true);
      window.history.replaceState({}, document.title, window.location.pathname);
      setCurrentView('dashboard');
    } else {
      const storedToken = localStorage.getItem('auth_token');
      if (storedToken) {
        localStorage.setItem('antigravity_session', 'true');
        setIsLoggedIn(true);
        setCurrentView('dashboard');
      } else {
        localStorage.removeItem('antigravity_session');
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleOpenLegal = (tab) => {
    setLegalModalTab(tab);
    setLegalModalOpen(true);
  };

  const handleLogin = () => {
    localStorage.setItem('antigravity_session', 'true');
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('antigravity_session');
    setIsLoggedIn(false);
    setCurrentView('home');
  };

  if (currentView === 'auth') {
    return (
      <div className="bg-[#000000] min-h-screen">
        <AuthPage 
          onBackToHome={() => {
            setIsLoginPopupOpen(false);
            setCurrentView('home');
          }} 
          onLogin={handleLogin} 
          onOpenLegal={handleOpenLegal}
          initialShowLogin={isLoginPopupOpen}
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
      <Header 
        onSignIn={() => {
          setIsLoginPopupOpen(true);
          setCurrentView('auth');
        }}
        onGetStarted={() => {
          setIsLoginPopupOpen(false);
          setCurrentView('auth');
        }}
      />
      
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
