import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import sr from "./locales/sr.json";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng: "sr",
    fallbackLng: "sr",
    resources: {
      "en-US": {
        translation: en,
      },
      sr: {
        translation: sr,
      },
    },
  });
