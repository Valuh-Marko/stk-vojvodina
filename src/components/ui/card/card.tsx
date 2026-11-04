import { PiPlaceholderDuotone } from "react-icons/pi";
import "./card.css";
import { useEffect } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";

type TitlePosition = "default" | "bottom-right";

type CardProps = {
  title?: string;
  titlePosition?: TitlePosition;
  imageUrl?: string;
  highlighted?: boolean;
  excerpt?: Document;
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
  excerpt,
  children,
  onClick,
}: CardProps) => {
  const handleOnClick = () => {
    if (onClick) {
      onClick();
    }
  };

  useEffect(() => {
    console.log(excerpt);
  });

  return (
    <div className={`c-card-wrapper ${className ? className : ""}`}>
      <div className={`c-card `} onClick={() => handleOnClick}>
        <div className="c-card__image-wrapper">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`{title}-image`}
              className="c-card__image"
            />
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
      {excerpt ? (
        <div className="c-card-attributes">
          {documentToReactComponents(excerpt)}
        </div>
      ) : null}
    </div>
  );
};

export default Card;
