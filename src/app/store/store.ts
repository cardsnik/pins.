import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../../entities/user";
import { pinsReducer } from "../../entities/pin";
import { favoriteReducer, FAVORITES_STORAGE_KEY } from "../../features/favorite";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    pins: pinsReducer,
    favorites: favoriteReducer,
  },
});

store.subscribe(() => {
  const { favorites } = store.getState();
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites.items));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
