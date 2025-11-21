import GalleryPreview from "../../layout/gallery-preview/galleryPreview";
import Hero from "../../layout/hero/hero";
import TeamSection from "../../layout/team-section/teamSection";
import UpcomingMatches from "../../layout/upcoming-matches/upcomingMatches";

const Homepage = () => {
  return (
    <>
      <Hero />
      <TeamSection />
      {/* <UpcomingMatches /> */}
      <GalleryPreview />
      <img
        src="/assets/pre-footer.png"
        alt="Decorative Top"
        className="c-pre-image"
        style={{
          objectFit: "cover",
          objectPosition: "center",
          maxHeight: "25rem",
        }}
      />
    </>
  );
};

export default Homepage;
