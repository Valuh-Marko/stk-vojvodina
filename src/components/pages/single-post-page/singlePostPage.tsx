import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { useContentful } from "../../../hooks/useContentful";
import type { TypeBlogPage } from "../../../models/models";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import "./singlePost.css";
import Loader from "../../ui/loader/loader";
import { useTranslation } from "react-i18next";
import EventCard from "../../ui/event-card/event-card";
import { MdDoubleArrow } from "react-icons/md";
import { getPostView, richTextRenderOptions } from "./utils";

const MORE_COUNT = 3;

const SinglePostPage = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "single-event" });
  const { t: tNav } = useTranslation(undefined, { keyPrefix: "navigation" });
  const { slug } = useParams();
  const { data, loading } = useContentful<TypeBlogPage>("blogPage", {
    id: slug,
  });

  const { data: latest } = useContentful<TypeBlogPage>("blogPage");

  // Moving on to another post starts it from the top.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  const {
    title,
    excerpt,
    body,
    date,
    photoUrl,
    photoAlt,
    ratio,
    orientation,
    recommended,
  } = getPostView(data);

  // Most posts have no hand-picked recommendations, so the newest ones stand in.
  const picks: unknown[] = recommended.length
    ? recommended
    : (latest ?? []).filter((post) => post.sys.id !== slug);
  const more = picks
    .map((post) => getPostView(post))
    .filter((post) => post.title)
    .slice(0, MORE_COUNT);
  const moreTitle = recommended.length ? t("recommendedTitle") : tNav("topNews");

  if (loading)
    return (
      <div className="l-single-post-loading">
        <Loader />
      </div>
    );

  return (
    <div
      className="l-single-post"
      data-photo={orientation}
      style={{ "--ratio": ratio } as React.CSSProperties}
    >
      <div className="c-single-post">
        <div className="c-single-post__track">
          <div className="c-single-post__photo">
            {photoUrl && <img src={photoUrl} alt={photoAlt} />}
          </div>
        </div>
        <header className="c-single-post__head">
          <h1 className="c-single-post__title">{title}</h1>
          {excerpt && <p className="c-single-post__lead">{excerpt}</p>}
        </header>
        <div className="c-single-post__article">
          <div className="c-single-post__meta">
            <Link to="/events" className="c-single-post__back">
              <MdDoubleArrow aria-hidden="true" /> {tNav("events")}
            </Link>
            <span>
              {t("released")} {date}
            </span>
          </div>
          <div className="c-single-post__body">
            {documentToReactComponents(body, richTextRenderOptions)}
          </div>
        </div>
      </div>
      {more.length > 0 && (
        <section className="c-single-post__more">
          <h2 className="c-single-post__more-title">{moreTitle}</h2>
          <div className="c-single-post__cards">
            {more.map((item) => (
              <EventCard key={item.id} data={item.entry} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default SinglePostPage;
