"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "de" | "pl";

interface Translations {
  [key: string]: string | Translations;
}

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>("en");
  const [translations, setTranslations] = useState<Translations>({});

  useEffect(() => {
    // Load saved language from localStorage or default to 'en'
    const savedLanguage = (localStorage.getItem("language") || "en") as Language;
    setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    // Load translations for current language
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locales/${language}.json`);
        const data: Translations = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error("Error loading translations:", error);
        // Fallback to English if language file not found
        if (language !== "en") {
          const enResponse = await fetch("/locales/en.json");
          const enData: Translations = await enResponse.json();
          setTranslations(enData);
        }
      }
    };

    loadTranslations();
  }, [language]);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: string | Translations | undefined = translations;

    for (const k of keys) {
      if (typeof value === "object" && value !== null) {
        value = value[k];
      } else {
        return key; // Return the key if translation not found
      }
      if (value === undefined) return key;
    }

    return typeof value === "string" ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
