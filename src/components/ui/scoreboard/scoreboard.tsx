import { useTranslation } from "react-i18next";
import { useContentful } from "../../../hooks/useContentful";
import type { ScoreboardEntry } from "../../../models/models";
import "./scoreboard.css";

export const Scoreboard = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "homepage.scoreboard" });
  const { data } = useContentful<ScoreboardEntry>("scoreboard");

  const tableHead = ["position", "team", "played", "wins", "losses", "points"];
  const tableRows: (number | string)[][] =
    data?.[0]?.fields?.scoreboard?.rows ?? [];

  const title = data?.[0]?.fields?.title as string | undefined;
  const formatter = new Intl.DateTimeFormat("de-DE");
  const timestampStr = data?.[0]?.fields?.scoreboard?.timestamp;
  const timestamp = new Date(timestampStr ?? "1970-01-01T00:00:00Z");
  const lastUpdate = formatter.format(timestamp);

  return (
    <div
      className="l-scoreboard"
      style={{
        width: window.innerWidth <= 768 ? window.innerWidth : "100%",
      }}
    >
      <div className="c-scoreboard">
        <h2 className="c-scoreboard__title">{title}</h2>
        <p className="c-scoreboard__timestamp">
          <span>{`${t("updated-at")}:`}</span>
          <span>{lastUpdate}</span>
        </p>
        <div className="c-scoreboard-table">
          <div className="c-table__row c-table__row--head">
            {tableHead.map((cell) => (
              <div className="c-scoreboard__cell">{t(cell)}</div>
            ))}
          </div>
          {tableRows.map((row) => (
            <div className="c-table__row">
              {row.map((cell) => (
                <div className="c-scoreboard__cell">{cell}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
