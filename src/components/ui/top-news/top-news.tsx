import { useState } from "react";
import type { TypeBlogPage } from "../../../models/models";
import { Button } from "../button/button";
import { useTranslation } from "react-i18next";
import { useContentful } from "../../../hooks/useContentful";
import { filterPostsByTag } from "../../../utils";
import Loader from "../loader/loader";
import "./top-news.css";

export const TopNews = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "homepage.top-news" });

  const {
    data: posts,
    loading,
    error,
  } = useContentful<TypeBlogPage>("blogPage");
  const [currentPost, setCurrentPost] = useState(0);

  if (loading) return <Loader />;
  if (error) return <div>Error</div>;

  const topNewsPosts = filterPostsByTag(posts, "topNews")[currentPost];
  const highlightedPost = filterPostsByTag(posts, "highlighted")[0];

  return (
    <>
      <div className="c-top-news-wrapper">
        {/* Left Indicator */}
        <div className="c-top-news-indicator">
          <div
            className={`c-indicator ${currentPost === 0 ? "active" : ""}`}
            onClick={() => setCurrentPost(0)}
          >
            <div className="c-indicator__number">01</div>
            <div className="c-indicator__line" />
          </div>
          <div
            className={`c-indicator ${currentPost === 1 ? "active" : ""}`}
            onClick={() => setCurrentPost(1)}
          >
            <div className="c-indicator__line" />
            <div className="c-indicator__number">02</div>
          </div>
        </div>

        {/* Main Display */}
        <div
          className="c-top-news"
          key={topNewsPosts?.sys?.id}
          style={{
            backgroundImage: `linear-gradient(oklch(0% 0 0 / 0.65), oklch(0% 0 0 / 0.65)), url(${
              topNewsPosts?.fields?.image?.fields?.file?.url ?? ""
            })`,
          }}
        >
          <div className="c-top-news__category">
            {topNewsPosts?.metadata?.tags?.[0]?.sys.id}
          </div>
          <h1 className="c-top-news__title">{topNewsPosts?.fields?.title}</h1>
          <div className="c-top-news__excerpt">
            {topNewsPosts?.fields?.excerpt}
          </div>
          <Button variant="primary">{t("read-more-btn")}</Button>
        </div>

        {/* Highlighted Post */}
        <div className="c-top-news-highlighted">
          <div className="c-highlighted-post">
            <div className="c-highlighted-post__content">
              <div className="c-highlighted-post__category">
                {highlightedPost?.metadata?.tags?.[0]?.sys?.id}
              </div>
              <h2 className="c-highlighted-post__title">
                {highlightedPost?.fields?.title}
              </h2>
              <Button variant="secondary" size="small">
                {t("find-out-more-btn")}
              </Button>
            </div>
            <div
              className="c-highlighted-post__image"
              style={{
                backgroundImage: `url(${
                  highlightedPost?.fields?.image?.fields?.file?.url ?? ""
                })`,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
