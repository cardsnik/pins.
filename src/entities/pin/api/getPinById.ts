import { unsplashApi } from "./unsplashApi";
import { mapUnsplashPhoto } from "./mapper";
import type { Pin } from "../model/types";

export async function getPinById(id: string): Promise<Pin> {
  const photo = await unsplashApi.getPhotoById(id);
  return mapUnsplashPhoto(photo);
}
