import { Suspense, useState } from "react";
import { useContentful } from "../../../hooks/useContentful";
import {
  type PlayerEntry,
  type TeamNavigationConfig,
} from "../../../models/models";
import Card from "../../ui/card/card";
import TeamNavigation from "./teamNavigation/teamNavigation";
import "./teamSection.css";

const TeamSection = () => {
  const { data: players } = useContentful<PlayerEntry>("player");
  const [selectedTab, setSelectedTab] =
    useState<TeamNavigationConfig>("seniors");

  return (
    <Suspense>
      <div className="l-team-section">
        <TeamNavigation
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <div className="c-team__cards">
          {players &&
            players.map((player) => (
              <Card
                key={player.sys.id}
                title={player.fields.playerName as unknown as string}
              />
            ))}
        </div>
      </div>
    </Suspense>
  );
};

export default TeamSection;
