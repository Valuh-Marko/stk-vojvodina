import { useRef, useState } from "react";
import type { Asset } from "contentful";
import { useInView, usePageInView, useReducedMotion } from "motion/react";
import { useTranslation } from "react-i18next";
import { MdDoubleArrow } from "react-icons/md";
import { useNavigate } from "react-router";
import type { TypeBlogPage } from "../../../models/models";
import { useContentful } from "../../../hooks/useContentful";
import { filterPostsByTag } from "../../../utils";
import { Button } from "../button/button";
import Loader from "../loader/loader";
import "./top-news.css";

const STORY_COUNT = 2;

const getStory = (post: TypeBlogPage) => {
  const fields = post.fields as unknown as {
    title?: string;
    excerpt?: string;
    image?: Asset<undefined>;
  };

  return {
    id: post.sys.id,
    category: post.metadata.tags?.[0]?.sys.id,
    title: fields.title,
    excerpt: fields.excerpt,
    photoUrl: fields.image?.fields?.file?.url,
  };
};

type Story = ReturnType<typeof getStory>;

type NewsStageProps = {
  stories: Story[];
  highlighted?: Story;
};

const NewsStage = ({ stories, highlighted }: NewsStageProps) => {
  const { t } = useTranslation(undefined, { keyPrefix: "homepage.top-news" });
  const navigate = useNavigate();

  const stageRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useInView(stageRef, { amount: 0.5 });
  const isPageVisible = usePageInView();
  const reduceMotion = useReducedMotion();

  const [selected, setSelected] = useState(0);
  const [announcement, setAnnouncement] = useState("");

  const current = Math.min(selected, stories.length - 1);

  const getPosition = (index: number) =>
    index === current ? "current" : index < current ? "before" : "after";

  const getLabel = (index: number) =>
    `${t("story", { number: index + 1 })}: ${stories[index].title ?? ""}`;

  const wrap = (index: number) => (index + stories.length) % stories.length;

  // Only a story the visitor asked for is announced, not one that rotated in.
  const show = (index: number) => {
    setSelected(index);
    setAnnouncement(getLabel(index));
  };

  const rotate = () => {
    setSelected(wrap(current + 1));
    setAnnouncement("");
  };

  return (
    <section className="c-top-news-wrapper" aria-label={t("heading")}>
      {stories.length > 1 && (
        <div
          className="c-top-news-indicator"
          role="group"
          aria-label={t("controls")}
        >
          <button
            type="button"
            className="c-indicator-arrow c-indicator-arrow--previous"
            aria-label={t("previous")}
            onClick={() => show(wrap(current - 1))}
          >
            <MdDoubleArrow aria-hidden="true" />
          </button>

          <div className="c-top-news-indicator__stories">
            {stories.map((story, index) => (
              <button
                key={story.id}
                type="button"
                className={`c-indicator ${index === current ? "active" : ""}`}
                aria-label={getLabel(index)}
                aria-current={index === current}
                onClick={() => show(index)}
              >
                <span className="c-indicator__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="c-indicator__line">
                  {/* The fill is the timer: when it lands, the next story plays. */}
                  {!reduceMotion && index === current && (
                    <span
                      className="c-indicator__fill"
                      data-held={!isOnScreen || !isPageVisible}
                      onAnimationEnd={rotate}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            className="c-indicator-arrow c-indicator-arrow--next"
            aria-label={t("next")}
            onClick={() => show(wrap(current + 1))}
          >
            <MdDoubleArrow aria-hidden="true" />
          </button>
        </div>
      )}

      <p className="u-visually-hidden" role="status">
        {announcement}
      </p>

      {/* Main Display */}
      <div className="c-top-news" ref={stageRef}>
        {stories.map(({ id, photoUrl }, index) => (
          <div
            key={id}
            className="c-top-news__photo"
            data-position={getPosition(index)}
            style={{
              backgroundImage: `linear-gradient(var(--overlay), var(--overlay))${
                photoUrl ? `, url(${photoUrl})` : ""
              }`,
            }}
          />
        ))}

        <div className="c-top-news__stories c-content__drift">
          {stories.map(({ id, category, title, excerpt }, index) => (
            <article
              key={id}
              className="c-top-news__body"
              data-position={getPosition(index)}
              inert={index !== current}
            >
              <div className="c-top-news__category">{category}</div>
              <h1 className="c-top-news__title">{title}</h1>
              {excerpt && <div className="c-top-news__excerpt">{excerpt}</div>}
              <Button
                onClick={() => navigate(`/events/${id}`)}
                variant="primary"
              >
                {t("read-more-btn")}
              </Button>
            </article>
          ))}
        </div>
      </div>

      {/* Highlighted Post */}
      <div className="c-top-news-highlighted">
        <div className="c-highlighted-post">
          <div className="c-highlighted-post__content">
            <div className="c-highlighted-post__category">
              {highlighted?.category}
            </div>
            <h2 className="c-highlighted-post__title">{highlighted?.title}</h2>
            <Button
              onClick={() => navigate(`/events/${highlighted?.id}`)}
              variant="secondary"
              size="small"
            >
              {t("find-out-more-btn")}
            </Button>
          </div>
          <div
            className="c-highlighted-post__image"
            style={{
              backgroundImage: `url(${highlighted?.photoUrl ?? ""})`,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export const TopNews = () => {
  const {
    data: posts,
    loading,
    error,
  } = useContentful<TypeBlogPage>("blogPage");

  if (loading)
    return (
      <div className="c-top-news-wrapper">
        <Loader />
      </div>
    );
  if (error) return <div>Error</div>;

  const [highlighted] = filterPostsByTag(posts, "highlighted").map(getStory);

  return (
    <NewsStage
      stories={filterPostsByTag(posts, "topNews")
        .slice(0, STORY_COUNT)
        .map(getStory)}
      highlighted={highlighted}
    />
  );
};
