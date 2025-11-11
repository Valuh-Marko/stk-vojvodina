import { useContentful } from "../../../hooks/useContentful";
import type { TypeBlogPage } from "../../../models/models";
import EventCard from "../../ui/event-card/event-card";
import Loader from "../../ui/loader/loader";
import "./events.css";

const Events = () => {
  const { data: posts, loading } = useContentful<TypeBlogPage>("blogPage");

  if (loading) return <Loader />;

  return (
    <div className="l-events-page">
      {posts.map((post) => (
        <EventCard data={post} />
      ))}
    </div>
  );
};

export default Events;
