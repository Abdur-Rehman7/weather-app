import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
        AsyncStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(fav => fav !== action.payload);
      AsyncStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;

export const loadFavorites = () => async (dispatch) => {
  try {
    const stored = await AsyncStorage.getItem("favorites");
    if (stored) {
      dispatch(setFavorites(JSON.parse(stored)));
    }
  } catch (error) {
    console.error("Failed to load favorites", error);
  }
};

export default favoritesSlice.reducer;
