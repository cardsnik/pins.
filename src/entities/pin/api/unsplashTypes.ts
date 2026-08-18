export interface UnsplashUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface UnsplashUser {
  name: string;
  links: {
    html: string;
  };
}

export interface UnsplashPhoto {
  id: string;
  description: string | null;
  alt_description: string | null;
  urls: UnsplashUrls;
  user: UnsplashUser;
  width: number;
  height: number;
}

export interface UnsplashSearchResponse {
  results: UnsplashPhoto[];
  total: number;
  total_pages: number;
}
