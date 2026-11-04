import { motion, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  pixelStripVariants,
  reducedVariants,
  type CellCustom,
} from "./tooltip-variants";
import "./tooltip.css";

type TooltipProps = {
  children: ReactNode;
  content: ReactNode;
  // Point the trigger's aria-describedby at this.
  id?: string;
  rows?: number;
  cols?: number;
  showDelay?: number;
};

const SHOW_DELAY = 40;
const HIDE_DELAY = 40;
const STAGGER_EACH = 0.02;
const EDGE_GAP = 8;

// Shuffles a rank per cell, plus a random slide-in offset, so the strips
// assemble in a random order instead of sweeping left to right.
const generateCellCustom = (count: number): CellCustom[] => {
  const ranks = Array.from({ length: count }, (_, index) => index);

  for (let i = ranks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ranks[i], ranks[j]] = [ranks[j], ranks[i]];
  }

  return ranks.map((rank) => ({
    delay: rank * STAGGER_EACH,
    offset: `${Math.round(Math.random() * 400 - 200)}%`,
  }));
};

// A pixel-strip panel that assembles at the cursor and tracks it while hovering.
// Keyboard and touch have no cursor, so focus and tap open it beside the trigger
// instead. The trigger is wrapped in a display:contents span, so it attaches
// without affecting layout, and its first element is what the panel anchors to.
const Tooltip = ({
  children,
  content,
  id,
  rows = 1,
  cols = 14,
  showDelay = SHOW_DELAY,
}: TooltipProps) => {
  const cellCount = rows * cols;
  const [isOpen, setIsOpen] = useState(false);
  const [cellCustom, setCellCustom] = useState(() =>
    generateCellCustom(cellCount)
  );
  const reduceMotion = useReducedMotion();
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const showTimeout = useRef<number>(undefined);
  const hideTimeout = useRef<number>(undefined);
  const isAnchored = useRef(false);
  const lastPointerType = useRef("");

  const variants = reduceMotion ? reducedVariants : pixelStripVariants;
  const state = isOpen ? "show" : "hidden";

  const placeAt = useCallback((x: number, y: number) => {
    const tooltip = tooltipRef.current;
    if (!tooltip) return;

    const maxX = window.innerWidth - tooltip.offsetWidth - EDGE_GAP;
    const maxY = window.innerHeight - tooltip.offsetHeight - EDGE_GAP;
    tooltip.style.left = `${Math.max(Math.min(x, maxX), EDGE_GAP)}px`;
    tooltip.style.top = `${Math.max(Math.min(y, maxY), EDGE_GAP)}px`;
  }, []);

  const placeBesideTrigger = useCallback(() => {
    const trigger = triggerRef.current?.firstElementChild;
    const tooltip = tooltipRef.current;
    if (!trigger || !tooltip) return;

    const rect = trigger.getBoundingClientRect();
    const below = rect.bottom + EDGE_GAP;
    const above = rect.top - EDGE_GAP - tooltip.offsetHeight;
    const fitsBelow =
      below + tooltip.offsetHeight <= window.innerHeight - EDGE_GAP;

    placeAt(rect.left, fitsBelow || above < EDGE_GAP ? below : above);
  }, [placeAt]);

  const open = useCallback(() => {
    setCellCustom(generateCellCustom(cellCount));
    setIsOpen(true);
  }, [cellCount]);

  const close = useCallback(() => {
    clearTimeout(showTimeout.current);
    clearTimeout(hideTimeout.current);
    isAnchored.current = false;
    setCellCustom(generateCellCustom(cellCount));
    setIsOpen(false);
  }, [cellCount]);

  const openBesideTrigger = useCallback(() => {
    clearTimeout(showTimeout.current);
    clearTimeout(hideTimeout.current);
    isAnchored.current = true;
    placeBesideTrigger();
    open();
  }, [open, placeBesideTrigger]);

  useEffect(
    () => () => {
      clearTimeout(showTimeout.current);
      clearTimeout(hideTimeout.current);
    },
    []
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const handleOutsidePress = (event: globalThis.PointerEvent) => {
      if (!isAnchored.current) return;
      if (!triggerRef.current?.contains(event.target as Node)) close();
    };

    // Capture, because the roster scrolls inside its own track.
    const handleScroll = () => {
      if (!isAnchored.current) return;

      const rect =
        triggerRef.current?.firstElementChild?.getBoundingClientRect();
      const isGone =
        !rect ||
        rect.bottom < 0 ||
        rect.top > window.innerHeight ||
        rect.right < 0 ||
        rect.left > window.innerWidth;

      if (isGone) close();
      else placeBesideTrigger();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handleOutsidePress);
    window.addEventListener("scroll", handleScroll, {
      capture: true,
      passive: true,
    });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handleOutsidePress);
      window.removeEventListener("scroll", handleScroll, { capture: true });
    };
  }, [isOpen, close, placeBesideTrigger]);

  // Pointer events, not mouse events: a tap sends compatibility mouse events
  // that would otherwise open the panel at the finger.
  const handlePointerEnter = (event: PointerEvent) => {
    if (event.pointerType !== "mouse" || isAnchored.current) return;

    placeAt(event.clientX, event.clientY);
    clearTimeout(hideTimeout.current);
    showTimeout.current = window.setTimeout(open, showDelay);
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse" || isAnchored.current) return;
    placeAt(event.clientX, event.clientY);
  };

  const handlePointerLeave = (event: PointerEvent) => {
    if (event.pointerType !== "mouse" || isAnchored.current) return;

    clearTimeout(showTimeout.current);
    hideTimeout.current = window.setTimeout(close, HIDE_DELAY);
  };

  const handlePointerDown = (event: PointerEvent) => {
    lastPointerType.current = event.pointerType;
  };

  // A mouse click is already covered by hover. Taps and Enter or Space toggle.
  const handleClick = (event: MouseEvent) => {
    if (event.detail > 0 && lastPointerType.current === "mouse") return;

    if (isOpen) close();
    else openBesideTrigger();
  };

  const handleFocus = (event: FocusEvent) => {
    if (event.target.matches(":focus-visible")) openBesideTrigger();
  };

  const handleBlur = () => {
    if (isAnchored.current) close();
  };

  return (
    <>
      <span
        ref={triggerRef}
        className="c-tooltip__trigger"
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {children}
      </span>
      {createPortal(
        <div
          ref={tooltipRef}
          id={id}
          role="tooltip"
          className={`c-tooltip ${isOpen ? "is-open" : ""}`}
          style={{ "--tt-cols": cols, "--tt-rows": rows } as CSSProperties}
        >
          <motion.div
            className="c-tooltip__bg"
            initial="hidden"
            animate={state}
            variants={variants.surface}
          >
            <div className="c-tooltip__grid">
              {cellCustom.map((custom, index) => (
                <motion.span
                  key={index}
                  className="c-tooltip__cell"
                  custom={custom}
                  initial="hidden"
                  animate={state}
                  variants={variants.cell}
                />
              ))}
            </div>
          </motion.div>
          <motion.div
            className="c-tooltip__content"
            initial="hidden"
            animate={state}
            variants={variants.content}
          >
            {content}
          </motion.div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Tooltip;
