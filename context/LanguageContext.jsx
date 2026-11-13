import { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext(null);

const readInitialLang = () => {
  try {
    const saved = localStorage.getItem('tl_lang_v1');
    return saved === 'en' ? 'en' : 'ka';
  } catch {
    return 'ka';
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(readInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('tl_lang_v1', lang);
    } catch {
      // ignore storage errors
    }
  }, [lang]);

  const t = translations[lang] || translations.ka;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return ctx;
};
