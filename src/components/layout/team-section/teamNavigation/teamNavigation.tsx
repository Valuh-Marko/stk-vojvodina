import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation(undefined, { keyPrefix: "homepage.our-team" });
  const teamNavigationArr: TeamNavigationConfig[] = [
    "seniors",
    // "coaching-staff",
    // "delegation",
  ];

  return (
    <div className={`c-team-navigation ${className ? className : ""}`}>
      <h2 className="c-team-navigation__title">{t("heading")}</h2>
      <div className="c-team-navigation__cta">
        {teamNavigationArr.map((tab) => (
          <button
            key={tab}
            className={`c-team-navigation__link ${
              selectedTab === tab ? "active" : ""
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {t(`navigation.${tab}`)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TeamNavigation;
