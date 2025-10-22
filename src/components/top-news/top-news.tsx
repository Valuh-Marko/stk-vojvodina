import { useEffect, useState } from "react";
import { useContentful } from "../../hooks/useContentful";
import "./top-news.css";
import type { BlogPage } from "../../models/models";
import { Button } from "../button/button";

export const TopNews = () => {
  const { data: posts, loading, error } = useContentful<BlogPage>("blogPage");
  const [currentPost, setCurrentPost] = useState(0);

  useEffect(() => {
    if (posts.length > 0) {
      console.log("Fetched posts:", posts);
    }
  }, [posts]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const post = posts[currentPost];

  return (
    <>
      <div className="c-top-news-wrapper">
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

        <div
          className="c-top-news"
          key={post.id}
          style={{
            backgroundImage: ` linear-gradient(oklch(0% 0 0 / 0.65), oklch(0% 0 0 / 0.65)), url(${post.image.fields.file.url})`,
          }}
        >
          <div className="c-top-news__category">
            {post.category[0]?.fields.title}
          </div>
          <h1 className="c-top-news__title">{post.title}</h1>
          <div className="c-top-news__excerpt">{post.excerpt}</div>
          <Button variant="primary">Read More</Button>
        </div>
      </div>
    </>
  );
};
