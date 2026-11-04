import type { Variants } from "motion/react";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_IN = [0.7, 0, 0.84, 0] as const;

export type CellCustom = {
  delay: number;
  offset: string;
};

// Pixel-strip reveal: each cell flies in and out from its own random offset,
// staggered by a shuffled rank so the strips assemble out of order.
const cellVariants: Variants = {
  hidden: ({ offset, delay }: CellCustom) => ({
    opacity: 0,
    scaleX: 0.8,
    x: offset,
    transition: { duration: 0.22, delay: delay * 0.6, ease: EASE_IN },
  }),
  show: ({ delay }: CellCustom) => ({
    opacity: 1,
    scaleX: 1,
    x: 0,
    transition: { duration: 0.28, delay, ease: EASE_OUT },
  }),
};

// The surface fades as one unit, independent of the per-cell wipe, so the shadow
// reads as a single card rather than one per strip.
const surfaceVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: { duration: 0.25, delay: 0.1, ease: EASE_IN },
  },
  show: { opacity: 1, transition: { duration: 0.3, ease: EASE_OUT } },
};

const contentVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2, delay: 0.35 } },
};

const fadeVariants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.12 } },
  show: { opacity: 1, transition: { duration: 0.12 } },
};

export const pixelStripVariants = {
  cell: cellVariants,
  surface: surfaceVariants,
  content: contentVariants,
};

// With reduced motion nothing travels or staggers: the panel just fades.
export const reducedVariants = {
  cell: fadeVariants,
  surface: fadeVariants,
  content: fadeVariants,
};
