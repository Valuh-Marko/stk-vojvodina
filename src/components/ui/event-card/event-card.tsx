import { PiPlaceholderDuotone } from "react-icons/pi";
import "./event-card.css";
import type { Entry } from "contentful";
import { NavLink } from "react-router";

type CardProps = {
  data: Entry;
  className?: string;
  onClick?: () => void;
};

const EventCard = ({ data, className, onClick }: CardProps) => {
  const date = new Date(data?.sys?.updatedAt)
    .toLocaleDateString("sr-RS")
    .replace(/\s/g, "");
  const title = data?.fields?.title;
  const imageUrl = data?.fields?.image?.fields?.file.url;
  const excerpt = data?.fields?.excerpt;
  const postId = data?.sys?.id;

  const handleOnClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <NavLink
      to={`/events/${postId}`}
      className={`c-event-card ${className ? className : ""}`}
      onClick={() => handleOnClick}
    >
      <div className="c-event-card__image-wrapper">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`{title}-image`}
            className="c-event-card__image"
          />
        ) : (
          <PiPlaceholderDuotone />
        )}
      </div>
      <h3 className="c-event-card__title">{title}</h3>
      <p className="c-event-card__subtitle">{excerpt}</p>
      <p className="c-event-card__metadata">{date}</p>
    </NavLink>
  );
};

export default EventCard;
