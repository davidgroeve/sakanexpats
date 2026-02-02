'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import WidgetCodeModal from '@/components/WidgetCodeModal';

export default function InsuranceSection() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [widgetCode, setWidgetCode] = useState('');
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Define the auth token function globally for the Rommaana widget
    // In production, this should return the actual user's auth token from your session
    (window as typeof window & { getYourUserAuthToken: () => string }).getYourUserAuthToken = () => {
      // Demo/test token - replace with your actual auth logic in production
      return 'demo-partner-token-12345';
    };

    // Simulate loading of Rommaana widget script
    setTimeout(() => setIsLoaded(true), 1000);
  }, []);

  // Widget code is no longer auto-loaded from localStorage on startup
  // Users must configure the widget each session via the modal

  useEffect(() => {
    // Execute scripts when widget code changes
    if (widgetCode) {
      // Wait longer to ensure DOM is fully updated
      setTimeout(() => {
        executeWidgetScripts(widgetCode, 'rommaana-widget-container');
      }, 500);
    }
  }, [widgetCode]);



  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSaveCode = (code: string) => {
    setWidgetCode(code);
    localStorage.setItem('rommaana-widget-code', code);

    // Execute scripts after a short delay to ensure DOM is updated
    setTimeout(() => {
      executeWidgetScripts(code, 'rommaana-widget-container');
    }, 500);

    setIsModalOpen(false);
  };
  const handleClearCode = () => {
    setWidgetCode('');
    localStorage.removeItem('rommaana-widget-code');
  };

  const executeWidgetScripts = async (htmlCode: string, containerId?: string) => {
    // Clear any previously injected scripts from head to prevent duplicates
    const existingScripts = document.querySelectorAll('script[src*="rommaana"]');
    existingScripts.forEach(script => script.remove());

    interface ScriptInfo {
      type: 'external' | 'inline';
      src: string | null;
      content: string | null;
    }

    // Extract HTML content (non-script parts)
    const htmlWithoutScripts = htmlCode.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');

    // Find all script tags in the HTML code
    const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
    const scripts: ScriptInfo[] = [];
    let match;

    while ((match = scriptRegex.exec(htmlCode)) !== null) {
      const fullScript = match[0];
      const scriptContent = match[1];

      // Check if it's an external script
      const srcMatch = fullScript.match(/src\s*=\s*["']([^"']+)["']/i);
      if (srcMatch) {
        const src = srcMatch[1];
        scripts.push({ type: 'external', src, content: null });
      } else if (scriptContent.trim()) {
        scripts.push({ type: 'inline', src: null, content: scriptContent });
      }
    }

    // Execute all scripts in order
    for (const script of scripts) {
      if (script.type === 'external' && script.src) {
        // Create external script element
        const scriptElement = document.createElement('script');
        scriptElement.src = script.src;
        scriptElement.async = false; // Load in order

        // Wait for external scripts to load
        await new Promise((resolve) => {
          scriptElement.onload = resolve;
          scriptElement.onerror = resolve; // Continue even if error
          document.head.appendChild(scriptElement);
        });
      } else if (script.type === 'inline' && script.content) {
        // Create inline script element wrapped in IIFE to avoid redeclaration errors
        const scriptElement = document.createElement('script');
        scriptElement.textContent = `(function() { ${script.content} })();`;
        document.head.appendChild(scriptElement);
      }
    }
  };


  return (
    <section id="insurance" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            {t.insurance.title}
          </h2>
          <p className="text-xl text-primary font-bold mb-2">
            {t.insurance.subtitle}
          </p>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
            {t.insurance.description}
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Rommaana Widget Container */}
          <div className="card-luxury overflow-hidden bg-white border-primary/10">
            <div className="pomegranate-gradient text-white p-8">
              <div className="flex flex-col-reverse sm:flex-row items-center sm:items-center justify-between gap-6 sm:gap-0">
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl font-bold mb-1">Premium Insurance Portal</h3>
                  <p className="text-white/80 font-medium">Digital Property Coverage</p>
                </div>
                <div className="h-16 px-4 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-xl overflow-hidden">
                  <img
                    src="https://static.wixstatic.com/media/2dc74f_9ffb3f627ced42538647f70532f450f5~mv2.png/v1/fill/w_378,h_109,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/RommaanaAsset%201.png"
                    alt="Rommaana Logo"
                    className="h-8 w-auto brightness-0 invert"
                  />
                </div>
              </div>
            </div>

            <div className="p-10">
              {!isLoaded ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin mb-4"></div>
                  <p className="text-muted-foreground font-bold animate-pulse">Initializing Portal...</p>
                </div>
              ) : (
                <div className="animate-in fade-in duration-700">
                  {/* Actual Rommaana Widget Integration Point */}
                  <div id="rommaana-insurance-root" className="mb-6">
                    {widgetCode ? (
                      <div>
                        <div
                          ref={widgetContainerRef}
                          id="rommaana-widget-container"
                          className="rounded-2xl overflow-hidden shadow-inner bg-muted/20 min-h-[400px]"
                          dangerouslySetInnerHTML={{ __html: widgetCode }}
                        />
                        <div className="flex justify-end space-x-3 mt-8">
                          <button
                            onClick={handleClearCode}
                            className="px-6 py-3 border-2 border-border text-muted-foreground rounded-xl font-bold hover:bg-muted transition-all active:scale-95"
                          >
                            {t.widgetModal.clearButton}
                          </button>
                          <button
                            onClick={handleOpenModal}
                            className="px-6 py-3 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-all active:scale-95"
                          >
                            {t.widgetModal.editButton}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-primary/20 rounded-3xl p-16 text-center bg-primary/5 hover:bg-primary/10 transition-colors group cursor-pointer" onClick={handleOpenModal}>
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary/5 group-hover:scale-110 transition-transform">
                          <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-bold mb-3">{t.widgetModal.configureButton}</h4>
                        <p className="text-muted-foreground font-medium mb-8">Production Portal will initialize here</p>
                        <button
                          className="px-10 py-4 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/30 hover:bg-primary-hover transition-all active:scale-95"
                        >
                          {t.widgetModal.configureButton}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Insurance Information & Sample Quotes */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center">
                <span className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                {t.insurance.whyChoose}
              </h3>
              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 mr-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">{t.insurance.instantQuotes}</h4>
                    <p className="text-muted-foreground font-medium leading-relaxed">{t.insurance.instantQuotesDesc}</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 mr-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">{t.insurance.fullCoverage}</h4>
                    <p className="text-muted-foreground font-medium leading-relaxed">{t.insurance.fullCoverageDesc}</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 mr-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">{t.properties.expatFriendly}</h4>
                    <p className="text-muted-foreground font-medium leading-relaxed">{t.insurance.expatFriendlyDesc}</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 mr-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">{t.insurance.verifiedProviders}</h4>
                    <p className="text-muted-foreground font-medium leading-relaxed">{t.insurance.verifiedProvidersDesc}</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 mr-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">{t.insurance.digitalIssuance}</h4>
                    <p className="text-muted-foreground font-medium leading-relaxed">{t.insurance.digitalIssuanceDesc}</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 mr-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">{t.insurance.dedicatedSupport}</h4>
                    <p className="text-muted-foreground font-medium leading-relaxed">{t.insurance.dedicatedSupportDesc}</p>
                  </div>
                </div>

                {/* Insurance Tips - Repositioned after Dedicated Support */}
                <div className="mt-8 p-8 bg-amber-50 rounded-3xl border border-amber-100 flex items-start">
                  <div className="w-12 h-12 bg-amber-200 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0 animate-pulse">
                    <svg className="w-6 h-6 text-amber-700 font-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-amber-900">
                      {t.insurance.importantInfo}
                    </h4>
                    <ul className="space-y-2">
                      <li className="text-amber-800 text-sm font-medium flex items-center">
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></span>
                        {t.insurance.tip1}
                      </li>
                      <li className="text-amber-800 text-sm font-medium flex items-center">
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></span>
                        {t.insurance.tip2}
                      </li>
                      <li className="text-amber-800 text-sm font-medium flex items-center">
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></span>
                        {t.insurance.tip3}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

      {isModalOpen && (
        <WidgetCodeModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveCode}
          initialCode={widgetCode}
        />
      )}
    </section>
  );
}