import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice";
import forecastReducer from "./forecastSlice";
import favoritesReducer from "./favoritesSlice";
import themeReducer from "./themeSlice";
import languageReducer from "./languageSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    forecast: forecastReducer,
    favorites: favoritesReducer,
    theme: themeReducer,
    language: languageReducer,
  },
});
