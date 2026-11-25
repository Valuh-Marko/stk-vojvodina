import type { Asset } from "contentful";
import { useTranslation } from "react-i18next";
import { useContentfulAssets } from "../../../hooks/useContentfulAssets";
import Loader from "../../ui/loader/loader";
import PhotoGrid from "../../ui/photo-grid/photo-grid";
import { toPhotos } from "../../ui/photo-grid/photos";
import "./gallery-preview.css";

const TAGS = ["highlightedGalery"];
const LIMIT = 4;

const GalleryPreview = () => {
  const { t, i18n } = useTranslation(undefined, {
    keyPrefix: "homepage.gallery",
  });
  const { data, loading } = useContentfulAssets<Asset<undefined>>(
    TAGS,
    { locale: i18n.language },
    LIMIT
  );
  const photos = toPhotos(data);

  // Nothing to preview, so the home page closes up around it.
  if (!loading && photos.length === 0) return null;

  return (
    <section className="l-gallery-preview">
      <h2 className="c-gallery-preview__title">{t("heading")}</h2>
      {loading ? <Loader /> : <PhotoGrid photos={photos} />}
    </section>
  );
};

export default GalleryPreview;
