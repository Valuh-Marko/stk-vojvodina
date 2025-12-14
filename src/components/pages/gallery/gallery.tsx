import { useContentfulAssets } from "../../../hooks/useContentfulAssets";
import Card from "../../ui/card/card";
import Loader from "../../ui/loader/loader";
import "./gallery.css";

const Gallery = () => {
  const { data, loading, error } = useContentfulAssets(["gallery"], {});

  if (loading)
    return (
      <div className="l-gallery">
        <Loader />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <section className="l-gallery">
        <h2 className="c-gallery__title">Gallery</h2>
        <div className="c-gallery__images">
          {data?.map((image: any) => (
            <Card
              className="c-gallery__image"
              key={image.sys.id}
              imageUrl={image.fields.file.url}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Gallery;
