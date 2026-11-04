import type { Asset } from "contentful";
import { useContentfulAssets } from "../../../hooks/useContentfulAssets";
import Card from "../../ui/card/card";
import "./gallery-preview.css";

const GalleryPreview = () => {
  const { data, loading, error } = useContentfulAssets<Asset<undefined>>(
    ["highlightedGalery"],
    {},
    4
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <section className="l-gallery-preview">
        <h2 className="c-gallery-preview__title">Gallery</h2>
        <div className="c-gallery-preview__images">
          {data?.map((image) => (
            <Card
              className="c-gallery-preview__image"
              key={image.sys.id}
              imageUrl={image.fields.file?.url}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default GalleryPreview;
