import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { unsplashApi } from "../api/unsplashApi";
import { mapUnsplashPhoto } from "../api/mapper";
import type { Pin } from "./types";

type Status = "idle" | "loading" | "succeeded" | "failed";

interface PinsState {
  items: Pin[];
  status: Status;
  error: string | null;
  searchQuery: string;
}

const initialState: PinsState = {
  items: [],
  status: "idle",
  error: null,
  searchQuery: "",
};

export const fetchFeed = createAsyncThunk("pins/fetchFeed", async (page: number = 1) => {
  const photos = await unsplashApi.getPhotos(page);
  return photos.map(mapUnsplashPhoto);
});

export const searchPins = createAsyncThunk("pins/search", async (query: string) => {
  const result = await unsplashApi.searchPhotos(query);
  return result.results.map(mapUnsplashPhoto);
});

const pinsSlice = createSlice({
  name: "pins",
  initialState,
  reducers: {
    setSearchQuery(state, action: { payload: string }) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Не удалось загрузить ленту";
      })
      .addCase(searchPins.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(searchPins.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(searchPins.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Не удалось выполнить поиск";
      });
  },
});

export const { setSearchQuery } = pinsSlice.actions;
export default pinsSlice.reducer;
