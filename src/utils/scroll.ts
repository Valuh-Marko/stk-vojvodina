import type Lenis from "lenis";

// Stopping Lenis drops whatever is left of a wheel scroll, and resizing it lets
// go of the page's previous height.
export const jumpTo = (top: number, lenis?: Lenis) => {
  lenis?.stop();
  window.scrollTo({ top, behavior: "instant" });
  lenis?.resize();
  lenis?.start();
};
