'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';

export default function Header() {
  const { language, setLanguage, isRTL } = useLanguage();
  const { t } = useTranslation(language);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">
              {t.header.logo}
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-primary transition-colors">
              {t.header.home}
            </a>
            <a href="#properties" className="text-gray-700 hover:text-primary transition-colors">
              {t.header.properties}
            </a>
            <a href="#finance" className="text-gray-700 hover:text-primary transition-colors">
              {t.header.finance}
            </a>
            <a href="#insurance" className="text-gray-700 hover:text-primary transition-colors">
              {t.header.insurance}
            </a>
            <a href="#dashboard" className="text-gray-700 hover:text-primary transition-colors">
              {t.header.dashboard}
            </a>
          </div>

          {/* Language Toggle & Login */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition-colors"
              aria-label="Toggle language"
            >
              <span className="text-sm font-medium">
                {language === 'en' ? 'العربية' : 'English'}
              </span>
            </button>
            <button className="hidden md:block px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors">
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
              <a href="#home" className="text-gray-700 hover:text-primary transition-colors">
                {t.header.home}
              </a>
              <a href="#properties" className="text-gray-700 hover:text-primary transition-colors">
                {t.header.properties}
              </a>
              <a href="#finance" className="text-gray-700 hover:text-primary transition-colors">
                {t.header.finance}
              </a>
              <a href="#insurance" className="text-gray-700 hover:text-primary transition-colors">
                {t.header.insurance}
              </a>
              <a href="#dashboard" className="text-gray-700 hover:text-primary transition-colors">
                {t.header.dashboard}
              </a>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors text-left">
                {t.header.login}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}