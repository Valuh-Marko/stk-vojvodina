import { useParams } from "react-router";
import { useContentful } from "../../../hooks/useContentful";
import type { TypeBlogPage } from "../../../models/models";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import "./singlePost.css";
import Loader from "../../ui/loader/loader";
import { useTranslation } from "react-i18next";
import EventCard from "../../ui/event-card/event-card";
import { MdDoubleArrow } from "react-icons/md";
import { richTextRenderOptions } from "./utils";

const SinglePostPage = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "single-event" });
  const { slug } = useParams();
  const { data, loading } = useContentful<TypeBlogPage>("blogPage", {
    id: slug,
  });

  const date = new Date(data?.sys?.updatedAt)
    .toLocaleDateString("sr-RS")
    .replace(/\s/g, "");
  const title = data?.fields?.title;
  const imageUrl = data?.fields?.image?.fields?.file.url;
  const tags = data?.metadata?.tags;
  const options = richTextRenderOptions;

  if (loading)
    return (
      <div className="l-single-post">
        <Loader />
      </div>
    );

  return (
    <div className="l-single-post">
      <div className="c-single-post">
        <img
          src={imageUrl}
          alt="single-images"
          className="c-single-post__image"
        />
        <h2 className="c-single-post__title">{title}</h2>
        <div className="c-single-post__metadata">
          <span>
            {t("released")} {date}
          </span>{" "}
          | <span>{tags.length && tags[0].sys.id}</span>
        </div>
        <hr />
        <div className="c-single-post__body">
          {documentToReactComponents(data?.fields?.body, options)}
        </div>
        {data.fields.recommendedPosts ? (
          <div className="c-single-post__recommended">
            <h3 className="c-single-post__recommended-title">
              {t("recommendedTitle")} <MdDoubleArrow className="button__icon" />
            </h3>
            <div className="c-single-post__recommended-container">
              {data.fields.recommendedPosts.map((post) => (
                <EventCard data={post} />
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SinglePostPage;
