'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import BrandLogo from './BrandLogo';

export default function Header() {
  const { language, setLanguage, isRTL } = useLanguage();
  const { t } = useTranslation(language);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="sticky top-0 z-50 glass-morphism border-b border-white/20 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <BrandLogo withText={language === 'en'} />
            {language === 'ar' && (
              <span className="font-extrabold text-2xl tracking-tight mr-3">
                سكان<span className="text-primary">إكسباتس</span>
              </span>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <a href="#home" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all duration-300">
              {t.header.home}
            </a>
            <a href="#properties" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all duration-300">
              {t.header.properties}
            </a>
            <a href="#finance" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all duration-300">
              {t.header.finance}
            </a>
            <a href="#insurance" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all duration-300">
              {t.header.insurance}
            </a>
            <a href="#dashboard" className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all duration-300">
              {t.header.dashboard}
            </a>
          </div>

          {/* Language Toggle & Login */}
          <div className="flex items-center space-x-5">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-4 py-2 hover:bg-black/5 rounded-full transition-all duration-300 group"
              aria-label="Toggle language"
            >
              <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                {language === 'en' ? 'AR' : 'EN'}
              </span>
            </button>
            <button className="hidden md:block px-6 py-2.5 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:bg-primary-hover active:scale-95 transition-all duration-300">
              {t.header.login}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <a href="#home" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-primary transition-colors">
                {t.header.home}
              </a>
              <a href="#properties" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-primary transition-colors">
                {t.header.properties}
              </a>
              <a href="#finance" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-primary transition-colors">
                {t.header.finance}
              </a>
              <a href="#insurance" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-primary transition-colors">
                {t.header.insurance}
              </a>
              <a href="#dashboard" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-primary transition-colors">
                {t.header.dashboard}
              </a>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors text-left"
              >
                {t.header.login}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}