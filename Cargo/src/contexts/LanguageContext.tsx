
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { translations, Language, type TranslationKeys } from '../i18n/translations';

type NestedKeyOf<ObjectType> = ObjectType extends object
  ? {
      [Key in keyof ObjectType & string]: ObjectType[Key] extends object 
        ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
        : Key;
    }[keyof ObjectType & string]
  : never;

type DeepNestedType<T, P extends string> = P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? DeepNestedType<T[Key], Rest>
    : never
  : P extends keyof T
  ? T[P]
  : never;

export type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: <T extends NestedKeyOf<TranslationKeys>>(key: T) => DeepNestedType<TranslationKeys, T>;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const validateLanguage = (lang: string | null): lang is Language => {
  return !!lang && Object.keys(translations).includes(lang);
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return validateLanguage(saved) ? saved : 'ru';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback(
    <T extends NestedKeyOf<TranslationKeys>>(path: T): DeepNestedType<TranslationKeys, T> => {
      const keys = path.split('.') as Array<keyof TranslationKeys>;
      let current: unknown = translations[language];

      for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
          current = (current as Record<string, unknown>)[key as string];
        } else {
          console.warn(`Translation missing for key: ${path}`);
          return path as unknown as DeepNestedType<TranslationKeys, T>;
        }
      }

      if (typeof current !== 'string' && !Array.isArray(current)) {
        console.warn(`Invalid translation type for key: ${path}`);
        return path as unknown as DeepNestedType<TranslationKeys, T>;
      }

      return current as DeepNestedType<TranslationKeys, T>;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};