import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Locale, type Dictionary } from "./translations";

const STORAGE_KEY = "thesis_locale";

interface LanguageContextValue {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLocale(): Locale {
  if (typeof window === "undefined") {
    return "ru";
  }
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "en" || saved === "ru" ? saved : "ru";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.setAttribute("lang", locale);
  }, [locale]);

  const setLocale = (next: Locale) => setLocaleState(next);
  const toggleLocale = () => setLocaleState((prev) => (prev === "ru" ? "en" : "ru"));

  return (
    <LanguageContext.Provider value={{ locale, t: translations[locale], setLocale, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return ctx;
}
