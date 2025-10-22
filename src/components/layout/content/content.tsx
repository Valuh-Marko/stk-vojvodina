import type { JSX } from "react";
import { Events } from "../../events/events";
import { Scoreboard } from "../../scoreboard/scoreboard";
import { TopNews } from "../../top-news/top-news";
import "./content.css";
import type { Category } from "../../../models/models";

type ContentProps = {
  className?: string;
  selectedCategory?: Category;
};

export const Content = ({ className, selectedCategory }: ContentProps) => {
  const content: Record<Category, JSX.Element> = {
    topNews: <TopNews />,
    scoreboard: <Scoreboard />,
    events: <Events />,
  };

  return (
    <div className={`c-content ${className ? className : ""}`}>
      {selectedCategory && content[selectedCategory]}
    </div>
  );
};
