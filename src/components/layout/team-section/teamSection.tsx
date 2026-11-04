import { Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import { useContentful } from "../../../hooks/useContentful";
import {
  type PlayerEntry,
  type TeamNavigationConfig,
} from "../../../models/models";
import { Button } from "../../ui/button/button";
import TeamNavigation from "./teamNavigation/teamNavigation";
import TeamRoster, { TeamRosterPlaceholder } from "./teamRoster/teamRoster";
import "./teamSection.css";

const TeamSection = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "homepage.our-team" });
  const {
    data: players,
    loading,
    error,
    refetch,
  } = useContentful<PlayerEntry>("player");
  const [selectedTab, setSelectedTab] =
    useState<TeamNavigationConfig>("seniors");

  return (
    <Suspense>
      <div className="l-team-section">
        <TeamNavigation
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        {players.length > 0 ? (
          <TeamRoster players={players} />
        ) : loading ? (
          <div role="status">
            <span className="u-visually-hidden">{t("loading")}</span>
            <TeamRosterPlaceholder />
          </div>
        ) : error ? (
          <div className="l-team-section__state" role="alert">
            <p className="l-team-section__message">{t("error")}</p>
            <Button type="button" className="" onClick={refetch}>
              {t("retry")}
            </Button>
          </div>
        ) : (
          <div className="l-team-section__state">
            <p className="l-team-section__message">{t("empty")}</p>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default TeamSection;
