import { apiRequest } from "../../../shared/api/fetchClient";
import type { UnsplashPhoto, UnsplashSearchResponse } from "./unsplashTypes";

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY as string;
const BASE_URL = "https://api.unsplash.com";
const authHeaders = { Authorization: `Client-ID ${ACCESS_KEY}` };

export const unsplashApi = {
  getPhotos: (page: number = 1) =>
    apiRequest<UnsplashPhoto[]>(
      `${BASE_URL}/photos`,
      { page: String(page), per_page: "20" },
      authHeaders
    ),
  searchPhotos: (query: string, page: number = 1) =>
    apiRequest<UnsplashSearchResponse>(
      `${BASE_URL}/search/photos`,
      { query, page: String(page), per_page: "20" },
      authHeaders
    ),
  getPhotoById: (id: string) =>
    apiRequest<UnsplashPhoto>(`${BASE_URL}/photos/${id}`, {}, authHeaders),
};
