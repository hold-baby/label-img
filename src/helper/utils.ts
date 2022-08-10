// @ts-ignore
import { nanoid } from "nanoid/index.browser";

export const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((c, e) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      c(img);
    };
    img.onerror = (err) => {
      e(err);
    };
  });

export const createID = () => {
  return nanoid(10);
};
