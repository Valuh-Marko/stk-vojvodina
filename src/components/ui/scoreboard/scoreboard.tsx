import { useId, type WheelEvent } from "react";
import { useTranslation } from "react-i18next";
import { useContentful } from "../../../hooks/useContentful";
import type { ScoreboardEntry } from "../../../models/models";
import { Button } from "../button/button";
import Loader from "../loader/loader";
import "./scoreboard.css";

const COLUMNS = ["position", "team", "played", "wins", "losses", "points"];
const TEAM_COLUMN = COLUMNS.indexOf("team");
const OWN_TEAM = /војводина|vojvodina/i;

const CYRILLIC_LOOKALIKES: Record<string, string> = {
  A: "А",
  B: "В",
  C: "С",
  E: "Е",
  H: "Н",
  J: "Ј",
  K: "К",
  M: "М",
  O: "О",
  P: "Р",
  T: "Т",
  X: "Х",
  Y: "У",
  a: "а",
  c: "с",
  e: "е",
  j: "ј",
  o: "о",
  p: "р",
  x: "х",
  y: "у",
};

// The source data sometimes types Latin letters inside Cyrillic team names
// ("Koпер"). Only words holding both scripts change.
const fixMixedScript = (text: string) =>
  text.replace(/\S+/g, (word) =>
    /\p{Script=Cyrillic}/u.test(word) && /[A-Za-z]/.test(word)
      ? word.replace(/[A-Za-z]/g, (ch) => CYRILLIC_LOOKALIKES[ch] ?? ch)
      : word
  );

// Lenis turns shift+wheel into a vertical page scroll, so it must not see the
// event while the table is the thing being scrolled sideways.
const keepShiftWheelNative = (event: WheelEvent) => {
  if (event.shiftKey) event.stopPropagation();
};

export const Scoreboard = () => {
  const { t, i18n } = useTranslation(undefined, {
    keyPrefix: "homepage.scoreboard",
  });
  const { data, loading, error, refetch } =
    useContentful<ScoreboardEntry>("scoreboard");
  const titleId = useId();

  const fields = data?.[0]?.fields;
  const rows: (number | string)[][] = fields?.scoreboard?.rows ?? [];
  const leagueTitle = fields?.title;
  const title = leagueTitle
    ? t(`league.${leagueTitle}`, { defaultValue: leagueTitle })
    : t("heading");

  const timestamp = new Date(fields?.scoreboard?.timestamp ?? NaN);
  const hasTimestamp = !Number.isNaN(timestamp.getTime());

  return (
    <div className="l-scoreboard">
      <div className="c-scoreboard c-content__drift">
        <h1 className="c-scoreboard__title" id={titleId}>
          {title}
        </h1>

        {rows.length > 0 && hasTimestamp && (
          <p className="c-scoreboard__timestamp">
            <span>{`${t("updated-at")}:`}</span>
            <time dateTime={timestamp.toISOString()}>
              {new Intl.DateTimeFormat(i18n.language).format(timestamp)}
            </time>
          </p>
        )}

        {rows.length > 0 ? (
          <div
            className="c-scoreboard__card"
            role="region"
            aria-labelledby={titleId}
            tabIndex={0}
            onWheel={keepShiftWheelNative}
          >
            <table className="c-scoreboard__table" aria-labelledby={titleId}>
              <thead>
                <tr className="c-scoreboard__row c-scoreboard__row--head">
                  {COLUMNS.map((column) => (
                    <th
                      key={column}
                      scope="col"
                      className="c-scoreboard__cell"
                      aria-label={t(column)}
                    >
                      <span className="c-scoreboard__label">{t(column)}</span>
                      <abbr
                        className="c-scoreboard__label c-scoreboard__label--short"
                        title={t(column)}
                      >
                        {t(`short.${column}`)}
                      </abbr>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const team = fixMixedScript(String(row[TEAM_COLUMN]));

                  return (
                    <tr
                      key={team}
                      className={`c-scoreboard__row ${
                        OWN_TEAM.test(team) ? "c-scoreboard__row--own" : ""
                      }`}
                    >
                      {row.map((cell, index) =>
                        index === TEAM_COLUMN ? (
                          <th
                            key={COLUMNS[index]}
                            scope="row"
                            className="c-scoreboard__cell"
                          >
                            {team}
                          </th>
                        ) : (
                          <td
                            key={COLUMNS[index]}
                            className="c-scoreboard__cell"
                          >
                            {cell}
                          </td>
                        )
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="c-scoreboard__card c-scoreboard__card--state">
            {loading ? (
              <div role="status">
                <Loader />
                <span className="u-visually-hidden">{t("loading")}</span>
              </div>
            ) : error ? (
              <div role="alert">
                <p className="c-scoreboard__message">{t("error")}</p>
                <Button type="button" className="" onClick={refetch}>
                  {t("retry")}
                </Button>
              </div>
            ) : (
              <p className="c-scoreboard__message" role="status">
                {t("empty")}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
