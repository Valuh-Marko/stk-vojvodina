import {
  motion,
  useIsPresent,
  useMotionValue,
  useReducedMotion,
  type PanInfo,
} from "motion/react";
import { useLenis } from "lenis/react";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { MdClose, MdDoubleArrow } from "react-icons/md";
import { getFullSrc, type Photo } from "../photo-grid/photos";
import "./lightbox.css";

export type LightboxView = {
  index: number;
  // Already on screen in the grid, so it stands in until the full photo loads.
  thumb: string;
  // Set when the photo was reached from another one, not from its tile.
  step?: 1 | -1;
  leaving?: { photo: Photo; x: number };
};

type LightboxProps = {
  photos: Photo[];
  view: LightboxView;
  radius: number;
  onNavigate: (step: 1 | -1, fromX: number) => void;
  onClose: () => void;
};

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const OPEN = { duration: 0.48, ease: EASE_OUT } as const;
const DISSOLVE = { duration: 0.36, ease: EASE_OUT } as const;
const INSTANT = { duration: 0 } as const;
const DRIFT = 16;
const SWIPE_DISTANCE = 64;
const SWIPE_VELOCITY = 400;

const getPhotoStyle = (photo: Photo) =>
  ({
    "--ratio": photo.ratio,
    "--natural": `${photo.width}px`,
  }) as CSSProperties;

const Lightbox = ({
  photos,
  view,
  radius,
  onNavigate,
  onClose,
}: LightboxProps) => {
  const { t } = useTranslation(undefined, { keyPrefix: "gallery" });
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isPresent = useIsPresent();
  const reduceMotion = useReducedMotion();
  const lenis = useLenis();
  const panX = useMotionValue(0);

  const { index, thumb, step, leaving } = view;
  const photo = photos[index];
  const hasMore = photos.length > 1;
  const layoutTransition = { layout: step ? INSTANT : OPEN };

  // A second Escape closes the dialog for good, so a lightbox reopened on its way
  // out has to be shown again.
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (isPresent && dialog && !dialog.open) dialog.showModal();
  }, [isPresent]);

  useEffect(() => {
    if (!isPresent) return;
    lenis?.stop();
    return () => lenis?.start();
  }, [lenis, isPresent]);

  useEffect(() => {
    for (const offset of [1, -1]) {
      const neighbour = photos[(index + offset + photos.length) % photos.length];
      new Image().src = getFullSrc(neighbour);
    }
  }, [photos, index]);

  const go = (direction: 1 | -1) => {
    if (!hasMore || !isPresent) return;
    const fromX = panX.get();
    panX.set(0);
    onNavigate(direction, fromX);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") go(1);
    if (event.key === "ArrowLeft") go(-1);
  };

  const handleClick = (event: MouseEvent) => {
    const target = event.target as Element;
    if (!target.closest(".c-lightbox__photo, button")) onClose();
  };

  // Touch only: a mouse has the arrows.
  const handlePan = (event: PointerEvent, { offset }: PanInfo) => {
    if (event.pointerType === "mouse" || !hasMore) return;
    panX.set(Math.abs(offset.x) > Math.abs(offset.y) ? offset.x : 0);
  };

  const handlePanEnd = (event: PointerEvent, info: PanInfo) => {
    if (event.pointerType === "mouse") return;
    const { offset, velocity } = info;

    if (Math.abs(offset.y) > Math.abs(offset.x)) {
      panX.set(0);
      if (offset.y > SWIPE_DISTANCE) onClose();
    } else if (
      hasMore &&
      (Math.abs(offset.x) > SWIPE_DISTANCE ||
        Math.abs(velocity.x) > SWIPE_VELOCITY)
    ) {
      go(offset.x < 0 ? 1 : -1);
    } else {
      panX.set(0);
    }
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      className="c-lightbox"
      aria-label={t("viewer")}
      data-leaving={!isPresent}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
    >
      <motion.div
        className="c-lightbox__dark"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        transition={DISSOLVE}
      />
      <motion.div
        className="c-lightbox__stage"
        initial={reduceMotion ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        exit={reduceMotion ? { opacity: 0 } : undefined}
        transition={{ duration: 0.2 }}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
      >
        <motion.div className="c-lightbox__track" style={{ x: panX }}>
          {leaving && (
            <motion.img
              key={`${leaving.photo.id}-leaving-${index}`}
              className="c-lightbox__photo c-lightbox__photo--leaving"
              style={{ ...getPhotoStyle(leaving.photo), borderRadius: radius }}
              src={getFullSrc(leaving.photo)}
              alt=""
              initial={{ opacity: 1, x: leaving.x }}
              animate={{ opacity: 0, x: leaving.x - DRIFT * (step ?? 1) }}
              transition={DISSOLVE}
            />
          )}
          <motion.div
            key={photo.id}
            className="c-lightbox__slide"
            initial={step ? { opacity: 0, x: DRIFT * step } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={DISSOLVE}
          >
            <motion.div
              className="c-lightbox__photo"
              layoutId={photo.id}
              layoutCrossfade={false}
              style={{ ...getPhotoStyle(photo), borderRadius: radius }}
              transition={layoutTransition}
            >
              <motion.img
                className="c-lightbox__image"
                layoutId={`${photo.id}-image`}
                layoutCrossfade={false}
                style={
                  thumb ? { backgroundImage: `url("${thumb}")` } : undefined
                }
                transition={layoutTransition}
                src={getFullSrc(photo)}
                width={photo.width}
                height={photo.height}
                alt={photo.caption ?? ""}
                draggable={false}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        className="c-lightbox__controls"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.12 } }}
        transition={{ duration: 0.24, delay: 0.12 }}
      >
        <button
          type="button"
          className="c-lightbox__button c-lightbox__button--close"
          aria-label={t("close")}
          onClick={onClose}
        >
          <MdClose aria-hidden="true" />
        </button>
        {hasMore && (
          <button
            type="button"
            className="c-lightbox__button c-lightbox__button--previous"
            aria-label={t("previous")}
            onClick={() => go(-1)}
          >
            <MdDoubleArrow aria-hidden="true" />
          </button>
        )}
        {hasMore && (
          <button
            type="button"
            className="c-lightbox__button c-lightbox__button--next"
            aria-label={t("next")}
            onClick={() => go(1)}
          >
            <MdDoubleArrow aria-hidden="true" />
          </button>
        )}
        <div className="c-lightbox__bar" aria-live="polite">
          {photo.caption && (
            <p className="c-lightbox__caption">{photo.caption}</p>
          )}
          <p className="c-lightbox__count">
            <span aria-hidden="true">
              {index + 1} / {photos.length}
            </span>
            <span className="u-visually-hidden">
              {t("photo", { number: index + 1, total: photos.length })}
            </span>
          </p>
        </div>
      </motion.div>
    </dialog>,
    document.body
  );
};

export default Lightbox;
