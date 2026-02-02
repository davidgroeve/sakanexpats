'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';

interface WidgetCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (code: string) => void;
  initialCode?: string;
}

export default function WidgetCodeModal({ isOpen, onClose, onSave, initialCode = '' }: WidgetCodeModalProps) {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [code, setCode] = useState(initialCode);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleSave = () => {
    if (!code.trim()) {
      alert('Please enter widget code before saving.');
      return;
    }

    // Basic validation - check for script tags
    if (!code.includes('<script') && !code.includes('RommaanaHomeWidget')) {
      alert('Please enter valid Rommaana widget code with script tags.');
      return;
    }

    onSave(code);
  };

  const handleCancel = () => {
    setCode(initialCode);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-foreground/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-white/20 animate-in zoom-in-95 duration-300">
        <div className="p-10 border-b border-border bg-muted/30">
          <h3 className="text-3xl font-extrabold text-foreground tracking-tight">{t.widgetModal.title}</h3>
          <p className="text-muted-foreground font-medium mt-2">{t.widgetModal.description}</p>
        </div>

        <div className="p-10">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={t.widgetModal.codePlaceholder}
            className="w-full h-80 font-mono text-sm p-6 bg-muted/30 border-2 border-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-inner"
            spellCheck={false}
          />
          <div className="mt-4 flex items-center text-xs font-bold text-muted-foreground uppercase tracking-widest px-2">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Paste the integration script provided by Rommaana support
          </div>
        </div>

        <div className="p-10 bg-muted/30 border-t border-border flex justify-end space-x-4">
          <button
            onClick={handleCancel}
            className="px-8 py-4 border-2 border-border text-muted-foreground rounded-xl font-bold hover:bg-white hover:text-foreground transition-all active:scale-95"
          >
            {t.widgetModal.cancelButton}
          </button>
          <button
            onClick={handleSave}
            className="px-10 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover shadow-xl shadow-primary/20 transition-all active:scale-95"
          >
            {t.widgetModal.saveButton}
          </button>
        </div>
      </div>
    </div>
  );
}