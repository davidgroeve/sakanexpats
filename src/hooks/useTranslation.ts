import { translations } from '@/lib/translations';

export function useTranslation(language: 'en' | 'ar') {
  const t = translations[language];
  
  return {
    t,
    language
  };
}