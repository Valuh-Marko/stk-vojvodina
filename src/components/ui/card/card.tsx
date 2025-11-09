import { PiPlaceholderDuotone } from "react-icons/pi";
import "./card.css";

type TitlePosition = "default" | "bottom-right";

type CardProps = {
  title?: string;
  titlePosition?: TitlePosition;
  imageUrl?: string;
  highlighted?: boolean;
  excerpt?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

const Card = ({
  title,
  imageUrl,
  className,
  titlePosition = "default",
  highlighted = false,
  children,
  onClick,
}: CardProps) => {
  const handleOnClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`c-card ${className ? className : ""}`}
      onClick={() => handleOnClick}
    >
      <div className="c-card__image-wrapper">
        {imageUrl ? (
          <img src={imageUrl} alt={`{title}-image`} className="c-card__image" />
        ) : (
          <PiPlaceholderDuotone />
        )}
      </div>
      {title && (
        <h3
          className={`c-card__title ${titlePosition} ${
            highlighted ? "highlighted" : ""
          }`}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default Card;
