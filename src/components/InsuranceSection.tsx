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

  const mockQuotes = [
    { company: 'Tawuniya', premium: '2,450 SAR', coverage: 'Full Comprehensive' },
    { company: 'Bupa Arabia', premium: '2,680 SAR', coverage: 'Premium Plus' },
    { company: 'MedGulf', premium: '2,390 SAR', coverage: 'Standard' },
    { company: 'AXA Cooperative', premium: '2,720 SAR', coverage: 'Gold Package' }
  ];

  return (
    <section id="insurance" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.insurance.title}
          </h2>
          <p className="text-xl text-muted-foreground mb-2">
            {t.insurance.subtitle}
          </p>
          <p className="text-lg text-gray-600">
            {t.insurance.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Rommaana Widget Container */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">Rommaana Insurance</h3>
                  <p className="text-blue-100">Instant Home Insurance Quotes</p>
                </div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">R</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              {!isLoaded ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div>
                  {/* Actual Rommaana Widget Integration Point */}
                  <div id="rommaana-insurance-root" className="mb-6">
                    {widgetCode ? (
                      <div>
                        <div
                          ref={widgetContainerRef}
                          id="rommaana-widget-container"
                          dangerouslySetInnerHTML={{ __html: widgetCode }}
                        />
                        <div className="flex justify-end space-x-2 mt-4">
                          <button
                            onClick={handleClearCode}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            {t.widgetModal.clearButton}
                          </button>
                          <button
                            onClick={handleOpenModal}
                            className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                          >
                            {t.widgetModal.editButton}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <p className="text-gray-600 mb-4">Rommaana Widget Container</p>
                        <p className="text-sm text-gray-500 mb-4">Production API will load here</p>
                        <button
                          onClick={handleOpenModal}
                          className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors"
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
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Why Choose Rommaana?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Instant Quotes</h4>
                    <p className="text-gray-600">Get real-time quotes from multiple KSA insurance providers</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Full Coverage Options</h4>
                    <p className="text-gray-600">Comprehensive home and fire insurance policies</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Expat Friendly</h4>
                    <p className="text-gray-600">Policies designed for foreign residents in Saudi Arabia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sample Insurance Quotes */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Sample Quotes (2M SAR Property)</h3>
              <div className="space-y-3">
                {mockQuotes.map((quote, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{quote.company}</h4>
                        <p className="text-sm text-gray-600">{quote.coverage}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">{quote.premium}</div>
                        <div className="text-sm text-gray-600">per year</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Insurance Tips */}
            <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
              <h4 className="text-lg font-semibold text-yellow-900 mb-2">
                Important Insurance Information
              </h4>
              <ul className="space-y-2 text-sm text-yellow-800">
                <li>• Home insurance is mandatory for property financing in KSA</li>
                <li>• Coverage should include fire, natural disasters, and theft</li>
                <li>• Consider additional coverage for valuable items</li>
                <li>• Review policy exclusions carefully before purchase</li>
                <li>• Keep all documentation and receipts for claims</li>
              </ul>
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