import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { en } from "./locales/en";
import { ru } from "./locales/ru";

const resources = {
  en: { translation: en },
  ru: { translation: ru },
} as const;

export function initI18n() {
  return i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      debug: true,
      resources,
      fallbackLng: "en",

      interpolation: {
        escapeValue: false,
      },

      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
      },

      react: {
        useSuspense: true,
      },

      defaultNS: "translation",
    });
}
