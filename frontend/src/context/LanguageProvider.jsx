import React, { useState } from 'react';
import { LanguageContext, translations } from './LanguageContext';

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');

  const changeLang = (l) => {
    setLang(l);
    localStorage.setItem('lang', l);
  };

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
