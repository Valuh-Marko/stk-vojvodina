import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
} from "motion/react";
import { useId, useRef, useState, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import Lightbox, { type LightboxView } from "../lightbox/lightbox";
import { getBentoLayout, type BentoSlot } from "./bento";
import { getThumbSrc, getThumbSrcSet, type Photo } from "./photos";
import "./photo-grid.css";

const PHOTO_RADIUS = 8;
const RETURN = { duration: 0.36, ease: [0.16, 1, 0.3, 1] } as const;
const INSTANT = { duration: 0 } as const;

const toArea = ({ row, col, rows, cols }: BentoSlot) =>
  `${row + 1} / ${col + 1} / span ${rows} / span ${cols}`;

// Reading order follows the wide grid. The narrow one is packed from that same
// order, so tabbing never jumps far in either.
const arrange = (photos: Photo[]) => {
  const wide = getBentoLayout(
    photos.map((photo) => photo.ratio),
    4
  );
  const ordered = wide.map((slot) => photos[slot.index]);
  const narrow: BentoSlot[] = [];
  for (const slot of getBentoLayout(
    ordered.map((photo) => photo.ratio),
    2
  )) {
    narrow[slot.index] = slot;
  }

  return ordered.map((photo, index) => ({
    photo,
    style: {
      "--area-wide": toArea(wide[index]),
      "--area-narrow": toArea(narrow[index]),
      "--ratio": photo.ratio,
    } as CSSProperties,
    sizes: `(min-width: 800px) ${wide[index].cols * 25}vw, ${
      narrow[index].cols * 50
    }vw`,
  }));
};

type PhotoGridProps = {
  photos: Photo[];
};

// A bento grid that gives every photo a tile of its own orientation. A tile
// opens by flying its photo into the lightbox, and back when it closes.
const PhotoGrid = ({ photos }: PhotoGridProps) => {
  const { t } = useTranslation(undefined, { keyPrefix: "gallery" });
  const groupId = useId();
  const tileRefs = useRef(new Map<string, HTMLButtonElement>());
  const [isOpen, setIsOpen] = useState(false);
  // Outlives the lightbox, so the returning tile can stay above its neighbours.
  const [view, setView] = useState<LightboxView | null>(null);

  const tiles = arrange(photos);
  const ordered = tiles.map((tile) => tile.photo);

  const getThumb = (photo: Photo) =>
    tileRefs.current.get(photo.id)?.querySelector("img")?.currentSrc ?? "";

  const open = (index: number) => {
    setView({ index, thumb: getThumb(ordered[index]) });
    setIsOpen(true);
  };

  const navigate = (step: 1 | -1, fromX: number) => {
    if (!view) return;
    const index = (view.index + step + ordered.length) % ordered.length;

    // Keeps the tile in view behind the lightbox, so closing has somewhere to go.
    tileRefs.current
      .get(ordered[index].id)
      ?.scrollIntoView({ block: "nearest", behavior: "instant" });
    setView({
      index,
      thumb: getThumb(ordered[index]),
      step,
      leaving: { photo: ordered[view.index], x: fromX },
    });
  };

  const returnFocus = () => {
    if (!view) return;
    tileRefs.current
      .get(ordered[view.index].id)
      ?.focus({ preventScroll: true });
  };

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup id={groupId}>
        <div className="c-photo-grid">
          <ul className="c-photo-grid__tiles">
            {tiles.map(({ photo, style, sizes }, index) => (
              <li
                key={photo.id}
                className="c-photo-grid__tile"
                style={style}
                data-active={view?.index === index}
              >
                <button
                  type="button"
                  className="c-photo-grid__button"
                  aria-haspopup="dialog"
                  ref={(node) => {
                    if (node) tileRefs.current.set(photo.id, node);
                    else tileRefs.current.delete(photo.id);
                  }}
                  onClick={() => open(index)}
                >
                  <motion.span
                    className="c-photo-grid__frame"
                    layoutId={photo.id}
                    style={{ borderRadius: PHOTO_RADIUS }}
                    transition={{ layout: isOpen ? INSTANT : RETURN }}
                  >
                    <motion.img
                      className="c-photo-grid__image"
                      layoutId={`${photo.id}-image`}
                      transition={{ layout: isOpen ? INSTANT : RETURN }}
                      src={getThumbSrc(photo)}
                      srcSet={getThumbSrcSet(photo)}
                      sizes={sizes}
                      width={photo.width}
                      height={photo.height}
                      alt={
                        photo.caption ??
                        t("photo", { number: index + 1, total: tiles.length })
                      }
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                  </motion.span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <AnimatePresence onExitComplete={returnFocus}>
          {isOpen && view && (
            <Lightbox
              key="lightbox"
              photos={ordered}
              view={view}
              radius={PHOTO_RADIUS}
              onNavigate={navigate}
              onClose={() => setIsOpen(false)}
            />
          )}
        </AnimatePresence>
      </LayoutGroup>
    </MotionConfig>
  );
};

export default PhotoGrid;
