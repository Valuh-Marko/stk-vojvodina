// A cell is √2 times as wide as it is tall, so two stacked cells keep the same
// proportions turned upright. Landscape photos take one cell and portraits two
// stacked ones, and the usual 4:3 and 3:4 photos lose only a sliver.
export type BentoShape = { cols: 1 | 2; rows: 1 | 2 };
export type BentoSlot = BentoShape & {
  index: number;
  col: number;
  row: number;
};

type Kind = "landscape" | "portrait" | "panorama";

const KINDS: Kind[] = ["landscape", "portrait", "panorama"];
const SHAPES: Record<Kind, BentoShape> = {
  landscape: { cols: 1, rows: 1 },
  portrait: { cols: 1, rows: 2 },
  panorama: { cols: 2, rows: 1 },
};
const FEATURE: BentoShape = { cols: 2, rows: 2 };
const PHOTOS_PER_FEATURE = 6;
// Settling for a worse spot once a feature is this many photos late.
const FEATURE_PATIENCE = 4;
const MAX_STEPS = 4000;

const getKind = (ratio: number): Kind =>
  ratio < 1 ? "portrait" : ratio < 2 ? "landscape" : "panorama";

// Fills the grid cell by cell, left to right and top to bottom, so it never
// leaves a hole. When the last row would not end flush, it backs up and retries.
const pack = (
  ratios: number[],
  columns: number,
  features: number,
  mustEndFlush: boolean
): BentoSlot[] | undefined => {
  const queues: Record<Kind, number[]> = {
    landscape: [],
    portrait: [],
    panorama: [],
  };
  ratios.forEach((ratio, index) => queues[getKind(ratio)].push(index));

  const taken: Record<Kind, number> = { landscape: 0, portrait: 0, panorama: 0 };
  const grid = new Set<number>();
  const slots: BentoSlot[] = [];
  const featureCols: number[] = [];
  let steps = 0;

  const cellsOf = ({ row, col, cols, rows }: Omit<BentoSlot, "index">) =>
    Array.from(
      { length: cols * rows },
      (_, i) => (row + Math.floor(i / cols)) * columns + col + (i % cols)
    );

  const isFlush = () =>
    grid.size % columns === 0 && Math.max(...grid) === grid.size - 1;

  const fill = (): boolean => {
    if (slots.length === ratios.length) return !mustEndFlush || isFlush();
    if (++steps > MAX_STEPS) return false;

    let cell = 0;
    while (grid.has(cell)) cell++;
    const row = Math.floor(cell / columns);
    const col = cell % columns;

    // The kind furthest behind goes first, so portraits stay spread out.
    const options = KINDS.filter((kind) => taken[kind] < queues[kind].length)
      .sort((a, b) => taken[a] / queues[a].length - taken[b] / queues[b].length)
      .map((kind) => ({ kind, shape: SHAPES[kind] }));

    if (
      featureCols.length < features &&
      taken.landscape < queues.landscape.length
    ) {
      const lateBy =
        slots.length - (featureCols.length * ratios.length) / features;
      const switchesSide =
        columns === 2 ||
        col !== featureCols.at(-1) ||
        lateBy > FEATURE_PATIENCE;

      if (lateBy >= 0) {
        // Landscapes level the ground until there is room for it.
        options.sort(
          (a, b) =>
            Number(b.kind === "landscape") - Number(a.kind === "landscape")
        );
      }
      options.splice(lateBy >= 0 && switchesSide ? 0 : options.length, 0, {
        kind: "landscape",
        shape: FEATURE,
      });
    }

    for (const { kind, shape } of options) {
      const slot = { index: queues[kind][taken[kind]], row, col, ...shape };
      const cells = cellsOf(slot);
      if (col + shape.cols > columns || cells.some((c) => grid.has(c))) continue;

      cells.forEach((c) => grid.add(c));
      slots.push(slot);
      taken[kind]++;
      if (shape === FEATURE) featureCols.push(col);

      if (fill()) return true;

      if (shape === FEATURE) featureCols.pop();
      taken[kind]--;
      slots.pop();
      cells.forEach((c) => grid.delete(c));
    }
    return false;
  };

  return fill() ? slots : undefined;
};

export const getBentoLayout = (
  ratios: number[],
  columns: number
): BentoSlot[] => {
  const ideal = Math.max(1, Math.round(ratios.length / PHOTOS_PER_FEATURE));
  const featureCounts = Array.from({ length: ideal * 2 + 4 }, (_, i) => i).sort(
    (a, b) => Math.abs(a - ideal) - Math.abs(b - ideal)
  );
  const cells = ratios.reduce((sum, ratio) => {
    const { cols, rows } = SHAPES[getKind(ratio)];
    return sum + cols * rows;
  }, 0);

  for (const features of featureCounts) {
    if ((cells + features * 3) % columns !== 0) continue;
    const slots = pack(ratios, columns, features, true);
    if (slots) return slots;
  }
  return pack(ratios, columns, 0, false) ?? [];
};
