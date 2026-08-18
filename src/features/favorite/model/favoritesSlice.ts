import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Pin } from "../../../entities/pin";

export const FAVORITES_STORAGE_KEY = "thesis_favorites";

function loadFromStorage(): Pin[] {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Pin[]) : [];
  } catch {
    return [];
  }
}

interface FavoritesState {
  items: Pin[];
}

const initialState: FavoritesState = {
  items: loadFromStorage(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<Pin>) {
      const exists = state.items.some((pin) => pin.id === action.payload.id);
      state.items = exists
        ? state.items.filter((pin) => pin.id !== action.payload.id)
        : [...state.items, action.payload];
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
