"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState('th'); // Default to Thai
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem('cake_theme');
    const savedLang = localStorage.getItem('cake_lang');
    
    if (savedTheme === 'dark') setIsDark(true);
    if (savedLang) setLang(savedLang);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('cake_theme', isDark ? 'dark' : 'light');
      localStorage.setItem('cake_lang', lang);
      
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isDark, lang, isMounted]);

  // Translation helper
  const t = (en, th) => (lang === 'th' ? th : en);

  return (
    <SettingsContext.Provider value={{ isDark, setIsDark, lang, setLang, t }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
