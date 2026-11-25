import type { Asset } from "contentful";
import { useTranslation } from "react-i18next";
import { useContentfulAssets } from "../../../hooks/useContentfulAssets";
import Loader from "../../ui/loader/loader";
import PhotoGrid from "../../ui/photo-grid/photo-grid";
import { toPhotos } from "../../ui/photo-grid/photos";
import "./gallery.css";

const TAGS = ["gallery"];

const Gallery = () => {
  const { t, i18n } = useTranslation(undefined, { keyPrefix: "gallery" });
  const { data, loading, error } = useContentfulAssets<Asset<undefined>>(TAGS, {
    locale: i18n.language,
  });
  const photos = toPhotos(data);

  if (loading)
    return (
      <div className="l-gallery">
        <Loader />
      </div>
    );

  return (
    <section className="l-gallery">
      <h2 className="c-gallery__title">{t("heading")}</h2>
      {photos.length > 0 ? (
        <PhotoGrid photos={photos} />
      ) : (
        <p className="c-gallery__message" role={error ? "alert" : undefined}>
          {t(error ? "error" : "empty")}
        </p>
      )}
    </section>
  );
};

export default Gallery;
