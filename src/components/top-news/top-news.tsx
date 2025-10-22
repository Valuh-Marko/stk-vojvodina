import { useState } from "react";
import { useContentful } from "../../hooks/useContentful";
import type { BlogPage } from "../../models/models";
import { Button } from "../button/button";
import "./top-news.css";
import { filterPostsByTag } from "../../utils";

export const TopNews = () => {
  const { data: posts, loading, error } = useContentful<BlogPage>("blogPage");
  const [currentPost, setCurrentPost] = useState(0);

  if (loading) return <div>Loading...</div>;
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
          key={topNewsPosts.id}
          style={{
            backgroundImage: ` linear-gradient(oklch(0% 0 0 / 0.65), oklch(0% 0 0 / 0.65)), url(${topNewsPosts.image.fields.file.url})`,
          }}
        >
          <div className="c-top-news__category">
            {topNewsPosts?.tags?.[0]?.title}
          </div>
          <h1 className="c-top-news__title">{topNewsPosts.title}</h1>
          <div className="c-top-news__excerpt">{topNewsPosts.excerpt}</div>
          <Button variant="primary">Read More</Button>
        </div>

        {/* Highlighted Post */}
        <div className="c-top-news-highlighted">
          <div className="c-highlighted-post">
            <div className="c-highlighted-post__content">
              <div className="c-highlighted-post__category">
                {highlightedPost?.tags?.[0]?.title}
              </div>
              <h2 className="c-highlighted-post__title">
                {highlightedPost.title}
              </h2>
              <Button variant="secondary" size="small">
                Find Out More
              </Button>
            </div>
            <div
              className="c-highlighted-post__image"
              style={{
                backgroundImage: `url(${highlightedPost.image.fields.file.url})`,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
