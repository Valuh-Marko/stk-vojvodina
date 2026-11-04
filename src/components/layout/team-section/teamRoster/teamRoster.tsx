import type { Block, Document, Inline, Text } from "@contentful/rich-text-types";
import type { Asset } from "contentful";
import { PiPlaceholderDuotone } from "react-icons/pi";
import type { PlayerEntry } from "../../../../models/models";
import Tooltip from "../../../ui/tooltip/tooltip";
import "./teamRoster.css";

type TeamRosterProps = {
  players: PlayerEntry[];
};

// The crop is a share of the photo rather than a pixel size, so the framing
// holds if a higher-resolution photo is uploaded later.
const CROP_WIDTH_SHARE = 0.4667;
const FRAME_RATIO = 5 / 4;

// Long enough that sweeping along the row doesn't set off every panel on the way.
const TOOLTIP_DELAY = 200;

// Thunder has no Ș: it sets an S with a loose comma beside it. Its Ş reads as
// the same letter, so names display that. Contentful keeps the real spelling.
const getName = (player: PlayerEntry) =>
  (player.fields.playerName as unknown as string)
    .replaceAll("ș", "ş")
    .replaceAll("Ș", "Ş");

const getPhotoUrl = (player: PlayerEntry) => {
  const image = player.fields.image as unknown as Asset<undefined> | undefined;
  const file = image?.fields.file;
  if (!file?.url) return undefined;

  const width = Math.round((file.details.image?.width ?? 1200) * CROP_WIDTH_SHARE);
  const height = Math.round(width * FRAME_RATIO);

  return `${file.url}?w=${width}&h=${height}&fit=crop&f=face&fm=webp&q=80`;
};

const getText = (node: Block | Inline | Text): string =>
  "value" in node ? node.value : node.content.map(getText).join("");

// Attributes are authored as "Label: value" lines in rich text.
const getAttributes = (document?: Document) =>
  (document?.content ?? [])
    .flatMap((block) => getText(block).split("\n"))
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const separator = line.indexOf(":");
      return separator === -1
        ? { label: "", value: line }
        : {
            label: line.slice(0, separator).trim(),
            value: line.slice(separator + 1).trim(),
          };
    });

const PlayerTooltipContent = ({ player }: { player: PlayerEntry }) => {
  const attributes = getAttributes(
    player.fields.playerAtributes as unknown as Document | undefined
  );

  return (
    <div className="c-player-tt">
      <p className="c-player-tt__name">{getName(player)}</p>
      {attributes.length > 0 && (
        <dl className="c-player-tt__attributes">
          {attributes.map(({ label, value }) => (
            <div key={`${label}-${value}`} className="c-player-tt__row">
              {label && <dt className="c-player-tt__label">{label}</dt>}
              <dd className="c-player-tt__value">{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
};

const TeamRoster = ({ players }: TeamRosterProps) => (
  <div className="c-roster">
    <ul className="c-roster__list">
      {players.map((player) => {
        const photoUrl = getPhotoUrl(player);
        const tooltipId = `player-${player.sys.id}`;

        return (
          <li key={player.sys.id} className="c-roster__item">
            <Tooltip
              id={tooltipId}
              content={<PlayerTooltipContent player={player} />}
              showDelay={TOOLTIP_DELAY}
            >
              <button
                type="button"
                className="c-roster__player"
                aria-describedby={tooltipId}
              >
                <span className="c-roster__frame">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="c-roster__photo"
                    />
                  ) : (
                    <PiPlaceholderDuotone aria-hidden="true" />
                  )}
                </span>
                <span className="c-roster__name">{getName(player)}</span>
              </button>
            </Tooltip>
          </li>
        );
      })}
    </ul>
  </div>
);

// Same structure as the roster, with blank names, so the page holds its height
// and doesn't jump when the players arrive.
export const TeamRosterPlaceholder = () => (
  <div className="c-roster" aria-hidden="true">
    <ul className="c-roster__list">
      {Array.from({ length: 7 }, (_, index) => (
        <li key={index} className="c-roster__item">
          <span className="c-roster__frame" />
          <span className="c-roster__name">&nbsp;</span>
        </li>
      ))}
    </ul>
  </div>
);

export default TeamRoster;
