import type { TeamNavigationConfig } from "../../../../models/models";
import "./teamNavigation.css";

type TeamNavigationProps = {
  className?: string;
  selectedTab: TeamNavigationConfig;
  setSelectedTab: (tab: TeamNavigationConfig) => void;
};

const TeamNavigation = ({
  className,
  selectedTab,
  setSelectedTab,
}: TeamNavigationProps) => {
  const teamNavigationArr: TeamNavigationConfig[] = [
    "seniors",
    "coaching-staff",
    "delegation",
  ];

  return (
    <div className={`c-team-navigation ${className ? className : ""}`}>
      <h2 className="c-team-navigation__title">Our Team</h2>
      <div className="c-team-navigation__cta">
        {teamNavigationArr.map((tab) => (
          <button
            key={tab}
            className={`c-team-navigation__link ${
              selectedTab === tab ? "active" : ""
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TeamNavigation;
