import { useLenis } from "lenis/react";
import { useState } from "react";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import type { Category } from "../../../models/models";
import { MOBILE_QUERY } from "../../../utils/constants";
import { jumpTo } from "../../../utils/scroll";
import { Sidebar } from "../../ui/sidebar/sidebar";
import { Content } from "./content/content";
import "./hero.css";

const Hero = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >("topNews");
  const [scrolled, setScrolled] = useState(0);
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const lenis = useLenis();

  // The tabs stay in reach all the way down the stage on phones, so a switch from
  // there opens the next screen at its top. The one leaving dissolves where it is.
  const handleCategoryChange = (category: Category) => {
    if (category === selectedCategory) return;
    if (isMobile) {
      setScrolled(window.scrollY);
      jumpTo(0, lenis);
    }
    setSelectedCategory(category);
  };

  return (
    <div className="l-hero">
      <Sidebar
        onCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
      />
      <Content selectedCategory={selectedCategory} scrolled={scrolled} />
    </div>
  );
};

export default Hero;
