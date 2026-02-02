'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import BrandLogo from './BrandLogo';

export default function Footer() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const isRTL = language === 'ar';

  return (
    <footer className="bg-foreground text-white py-24 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">
          {/* Company Info */}
          <div className="md:col-span-12 lg:col-span-5">
            <div className="mb-6">
              <BrandLogo withText={language === 'en'} color="white" className="h-12" />
              {language === 'ar' && (
                <span className="font-extrabold text-3xl tracking-tight mr-3 text-white">
                  سكان<span className="text-primary">إكسباتس</span>
                </span>
              )}
            </div>
            <p className="text-white/60 mb-10 max-w-md text-lg leading-relaxed font-medium">
              {t.footer.companyDesc}
            </p>
            <div className="flex space-x-6">
              <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 group border border-white/10">
                <svg className="w-6 h-6 text-white/60 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 group border border-white/10">
                <svg className="w-6 h-6 text-white/60 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 group border border-white/10">
                <svg className="w-6 h-6 text-white/60 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-6 lg:col-span-3">
            <h4 className="text-xl font-bold mb-8 text-white">{t.footer.quickLinks}</h4>
            <ul className="space-y-4">
              <li><a href="#home" className="text-white/60 hover:text-primary font-bold transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-4 h-0.5 bg-primary mr-0 group-hover:mr-3 transition-all duration-300"></span>{t.header.home}</a></li>
              <li><a href="#properties" className="text-white/60 hover:text-primary font-bold transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-4 h-0.5 bg-primary mr-0 group-hover:mr-3 transition-all duration-300"></span>{t.header.properties}</a></li>
              <li><a href="#finance" className="text-white/60 hover:text-primary font-bold transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-4 h-0.5 bg-primary mr-0 group-hover:mr-3 transition-all duration-300"></span>{t.header.finance}</a></li>
              <li><a href="#insurance" className="text-white/60 hover:text-primary font-bold transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-4 h-0.5 bg-primary mr-0 group-hover:mr-3 transition-all duration-300"></span>{t.header.insurance}</a></li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="md:col-span-6 lg:col-span-4">
            <h4 className="text-xl font-bold mb-8 text-white">{t.footer.legalSupport}</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/60 hover:text-primary font-bold transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-4 h-0.5 bg-primary mr-0 group-hover:mr-3 transition-all duration-300"></span>{t.footer.terms}</a></li>
              <li><a href="#" className="text-white/60 hover:text-primary font-bold transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-4 h-0.5 bg-primary mr-0 group-hover:mr-3 transition-all duration-300"></span>{t.footer.privacy}</a></li>
              <li><a href="#" className="text-white/60 hover:text-primary font-bold transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-4 h-0.5 bg-primary mr-0 group-hover:mr-3 transition-all duration-300"></span>{t.footer.expatGuide}</a></li>
              <li><a href="#" className="text-white/60 hover:text-primary font-bold transition-all duration-300 flex items-center group"><span className="w-0 group-hover:w-4 h-0.5 bg-primary mr-0 group-hover:mr-3 transition-all duration-300"></span>{t.footer.contactSupport}</a></li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-10 border-t border-white/5">
          <div className="flex items-center group cursor-pointer">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-5 group-hover:bg-primary transition-all duration-300">
              <svg className="w-6 h-6 text-primary group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <div className="text-white font-bold">+966 50 123 4567</div>
              <div className="text-white/40 text-xs font-bold uppercase tracking-widest">Call US</div>
            </div>
          </div>

          <div className="flex items-center group cursor-pointer">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-5 group-hover:bg-primary transition-all duration-300">
              <svg className="w-6 h-6 text-primary group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <div className="text-white font-bold">info@sakanexpats.com</div>
              <div className="text-white/40 text-xs font-bold uppercase tracking-widest">Email US</div>
            </div>
          </div>

          <div className="flex items-center group cursor-pointer">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-5 group-hover:bg-primary transition-all duration-300">
              <svg className="w-6 h-6 text-primary group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <div className="text-white font-bold">{t.footer.riyadh}</div>
              <div className="text-white/40 text-xs font-bold uppercase tracking-widest">Visit US</div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-white/40 text-sm font-medium">
          <p>© 2024 {t.header.logo}. {t.footer.rights}</p>
          <div className="mt-4 md:mt-0 flex items-center space-x-6">
            <p className="flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              {t.footer.vision}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}