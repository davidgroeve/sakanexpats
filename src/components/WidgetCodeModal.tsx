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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-foreground">{t.widgetModal.title}</h3>
          <p className="text-gray-600 mt-1">{t.widgetModal.description}</p>
        </div>
        
        <div className="p-6">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={t.widgetModal.codePlaceholder}
            className="w-full h-64 font-mono text-sm p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            spellCheck={false}
          />
        </div>
        
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
          <button
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t.widgetModal.cancelButton}
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            {t.widgetModal.saveButton}
          </button>
        </div>
      </div>
    </div>
  );
}