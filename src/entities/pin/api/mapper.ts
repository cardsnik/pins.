import type { Pin } from "../model/types";
import type { UnsplashPhoto } from "./unsplashTypes";

// в lib ложи
export function mapUnsplashPhoto(photo: UnsplashPhoto): Pin {
  return {
    id: photo.id,
    imageUrl: photo.urls.regular,
    thumbUrl: photo.urls.small,
    description: photo.description ?? photo.alt_description ?? "",
    authorName: photo.user.name,
    authorUrl: photo.user.links.html,
    width: photo.width,
    height: photo.height,
  };
}
