import { useTranslation } from "react-i18next";
import { useContentful } from "../../../hooks/useContentful";
import type { TypeBlogPage } from "../../../models/models";
import EventCard from "../../ui/event-card/event-card";
import Loader from "../../ui/loader/loader";
import "./events.css";

const Events = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "events" });
  const { data: posts, loading } = useContentful<TypeBlogPage>("blogPage");

  if (loading)
    return (
      <div className="l-events-page">
        <Loader />
      </div>
    );

  return (
    <div className="l-events-page">
      <h2 className="c-events-page__title">{t("title")}</h2>
      <div className="c-events">
        {posts.map((post) => (
          <EventCard data={post} />
        ))}
      </div>
    </div>
  );
};

export default Events;
