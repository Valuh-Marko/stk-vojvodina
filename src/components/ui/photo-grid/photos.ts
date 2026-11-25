import type { Asset } from "contentful";

export type Photo = {
  id: string;
  url: string;
  width: number;
  height: number;
  ratio: number;
  caption?: string;
};

const THUMB_WIDTHS = [240, 360, 480, 720, 960, 1280];
const FULL_WIDTH = 2000;

// Most uploads keep their file name as the title, which is no caption.
const isFileName = (title: string) =>
  !title.includes(" ") || /viber image|[\\/]/i.test(title);

export const toPhotos = (assets: Asset<undefined>[]): Photo[] =>
  assets.flatMap(({ sys, fields }) => {
    const file = fields.file;
    if (!file?.url || !file.contentType?.startsWith("image/")) return [];

    const { width = 1600, height = 1200 } = file.details?.image ?? {};
    const title = fields.title?.trim();
    const description = fields.description?.trim();

    return {
      id: sys.id,
      url: file.url,
      width,
      height,
      ratio: width / height,
      caption:
        description || (title && !isFileName(title) ? title : undefined),
    };
  });

const getUrl = (photo: Photo, width: number) =>
  `${photo.url}?w=${width}&fm=webp&q=80`;

export const getThumbSrc = (photo: Photo) => getUrl(photo, 720);

export const getThumbSrcSet = (photo: Photo) =>
  THUMB_WIDTHS.map((width) => `${getUrl(photo, width)} ${width}w`).join(", ");

export const getFullSrc = (photo: Photo) => getUrl(photo, FULL_WIDTH);
