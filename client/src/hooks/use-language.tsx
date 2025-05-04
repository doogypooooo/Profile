import React, { createContext, useContext } from "react";
import { getTranslation, type Language, type TranslationKey } from "@/lib/i18n";

interface LanguageContextType {
  language: Language;
  t: (key: TranslationKey, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const language: Language = "ko";

  const t = (key: TranslationKey, params?: Record<string, string>) => {
    return getTranslation(key, language, params);
  };

  return (
    <LanguageContext.Provider value={{ language, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
