export const ROUTES = {
  login: "/login",
  feed: "/",
  favorites: "/favorites",
  pin: (id: string) => `/pin/${id}`,
  pinTemplate: "/pin/:id",
} as const;
