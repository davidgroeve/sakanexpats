'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';

export default function HeroSection() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <section id="home" className="relative overflow-hidden bg-background pt-24 pb-32">
      {/* Background patterns/blob */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-extrabold text-foreground mb-8 tracking-tight leading-tight">
            {t.home.title}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground/80 font-medium max-w-2xl mx-auto">
            {t.home.subtitle}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-0 p-2 glass-morphism rounded-full shadow-2xl shadow-primary/5 border border-primary/10 transition-all duration-300 focus-within:ring-4 focus-within:ring-primary/10">
            <div className="flex-1 flex items-center px-6">
              <svg className="w-5 h-5 text-muted-foreground mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.home.searchPlaceholder}
                className="w-full py-4 text-lg bg-transparent border-none focus:outline-none placeholder:text-muted-foreground/50 font-medium"
                aria-label="Search properties"
              />
            </div>
            <button
              type="submit"
              className="px-10 py-4 bg-primary text-white text-lg font-bold rounded-full hover:bg-primary-hover transition-all duration-300 shadow-xl shadow-primary/30 active:scale-95"
            >
              {t.home.searchButton}
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="card-luxury p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 rotate-3 group-hover:rotate-0 transition-transform duration-300">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">{t.home.residentialProperties}</h3>
            <p className="text-muted-foreground leading-relaxed">{t.home.residentialSubtitle}</p>
          </div>

          <div className="card-luxury p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 -rotate-3 group-hover:rotate-0 transition-transform duration-300">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">{t.home.investmentOpportunities}</h3>
            <p className="text-muted-foreground leading-relaxed">{t.home.investmentSubtitle}</p>
          </div>

          <div className="card-luxury p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 rotate-6 group-hover:rotate-0 transition-transform duration-300">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">{t.home.legalGuidance}</h3>
            <p className="text-muted-foreground leading-relaxed">{t.home.legalSubtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}