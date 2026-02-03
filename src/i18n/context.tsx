import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translations, translations } from './translations';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

function detectBrowserLanguage(): Language {
  // Map browser language codes to our supported languages
  const languageMap: Record<string, Language> = {
    'en': 'en',
    'en-US': 'en',
    'en-GB': 'en',
    'pt': 'pt-BR',
    'pt-BR': 'pt-BR',
    'pt-PT': 'pt-BR', // Default Portuguese to Brazilian
    'es': 'es',
    'es-ES': 'es',
    'es-MX': 'es',
    'es-AR': 'es',
    'es-CO': 'es',
    'es-CL': 'es',
    'es-PE': 'es',
    'fr': 'fr',
    'fr-FR': 'fr',
    'fr-CA': 'fr',
    'fr-BE': 'fr',
  };

  if (typeof window !== 'undefined' && window.navigator) {
    // Try to get language from navigator
    const browserLang = window.navigator.language || window.navigator.languages?.[0];
    if (browserLang) {
      // Check exact match first
      if (languageMap[browserLang]) {
        return languageMap[browserLang];
      }
      // Check language code only (e.g., 'pt' from 'pt-BR')
      const langCode = browserLang.split('-')[0].toLowerCase();
      if (languageMap[langCode]) {
        return languageMap[langCode];
      }
      // Check if any of the navigator languages match
      if (window.navigator.languages) {
        for (const lang of window.navigator.languages) {
          if (languageMap[lang]) {
            return languageMap[lang];
          }
          const code = lang.split('-')[0].toLowerCase();
          if (languageMap[code]) {
            return languageMap[code];
          }
        }
      }
    }
  }
  return 'en'; // Default fallback
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get language from localStorage first
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem('app-language') as Language;
      if (saved && (saved === 'en' || saved === 'pt-BR' || saved === 'es' || saved === 'fr')) {
        return saved;
      }
    }
    // If no saved preference, detect from browser
    return detectBrowserLanguage();
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // Save to localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('app-language', lang);
    }
  };

  const t = translations[language];

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
