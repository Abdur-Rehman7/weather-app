// src/i18n/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      weatherApp: "Weather App",
      getWeather: "Get Weather",
      saveFavorite: "Save as Favorite",
      favorites: "Favorite Cities",
      clearAll: "Clear All",
      noFavorites: "No favorites yet",
    },
  },
  ur: {
    translation: {
      weatherApp: "موسم کی ایپ",
      getWeather: "موسم حاصل کریں",
      saveFavorite: "پسندیدہ میں شامل کریں",
      favorites: "پسندیدہ شہر",
      clearAll: "تمام صاف کریں",
      noFavorites: "ابھی کوئی پسندیدہ نہیں",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
