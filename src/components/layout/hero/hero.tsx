import "./hero.css";
import { Sidebar } from "../../sidebar/sidebar";
import { Header } from "../../header/header";
import { Content } from "../content/content";
import { useState } from "react";
import type { Category } from "../../../models/models";

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
      <Header />
      <Content selectedCategory={selectedCategory} />
    </div>
  );
};

export default Hero;
