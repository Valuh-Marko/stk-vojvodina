import { useState } from "react";
import type { Category } from "../../../models/models";
import { Sidebar } from "../../ui/sidebar/sidebar";
import { Content } from "./content/content";
import "./hero.css";

const Hero = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >("topNews");

  return (
    <div className="l-hero">
      <Sidebar
        onCategoryChange={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <Content selectedCategory={selectedCategory} />
    </div>
  );
};

export default Hero;
