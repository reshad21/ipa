import React, { createContext, useContext } from 'react';

export type Language = 'en';

interface LanguageContextValue {
  isBn: boolean;
  t: (english: string, bangla: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const value: LanguageContextValue = {
    isBn: false,
    t: (english) => english,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
