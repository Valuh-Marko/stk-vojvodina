import { useLenis } from "lenis/react";
import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { useLocation, useNavigationType } from "react-router";

const STORAGE_KEY = "scroll-positions";
const DISSOLVE = { duration: 360, easing: "cubic-bezier(0.16, 1, 0.3, 1)" };

const getId = (pathname: string, key: string) => `${pathname} ${key}`;

const loadPositions = () => {
  let saved = new Map<string, number>();
  try {
    saved = new Map(JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]"));
  } catch {
    // Blocked or unreadable storage means nothing to return to.
  }

  // A new visit shares its key ("default") with earlier ones, but not its place.
  const [entry] = performance.getEntriesByType(
    "navigation"
  ) as PerformanceNavigationTiming[];
  if (entry?.type === "navigate") {
    saved.delete(getId(window.location.pathname, "default"));
  }
  return saved;
};

const savePositions = () => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...positions]));
  } catch {
    // Storage can be blocked or full. Only a reload loses its place.
  }
};

const positions = loadPositions();

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Starts every new page from the top and dissolves it in. Back and forward
// return to where the visitor left off.
export const usePageScroll = (mainRef: RefObject<HTMLElement | null>) => {
  const { key, pathname } = useLocation();
  const navigationType = useNavigationType();
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  const lastPathname = useRef<string>(undefined);

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  useEffect(() => {
    history.scrollRestoration = "manual";
    window.addEventListener("pagehide", savePositions);
    return () => {
      history.scrollRestoration = "auto";
      window.removeEventListener("pagehide", savePositions);
    };
  }, []);

  // Before paint, so the new page is never seen at the old page's position.
  useLayoutEffect(() => {
    const main = mainRef.current;
    const id = getId(pathname, key);
    const isFirst = lastPathname.current === undefined;
    const isSamePage = lastPathname.current === pathname;
    const isReturn = navigationType === "POP";
    lastPathname.current = pathname;

    const track = () => positions.set(id, window.scrollY);
    const startTracking = () => {
      window.addEventListener("scroll", track, { passive: true });
    };
    const stopTracking = () => window.removeEventListener("scroll", track);

    // Stopping Lenis drops whatever is left of a wheel scroll, and resizing it
    // lets go of the old page's height.
    const jump = (top: number) => {
      lenisRef.current?.stop();
      window.scrollTo({ top, behavior: "instant" });
      lenisRef.current?.resize();
      lenisRef.current?.start();
    };

    // A link to the page the visitor is already on.
    if (isSamePage && !isReturn) {
      if (lenisRef.current && !prefersReducedMotion()) {
        lenisRef.current.scrollTo(0);
      } else {
        jump(0);
      }
      startTracking();
      return stopTracking;
    }

    if (!isFirst && !isSamePage && !prefersReducedMotion()) {
      main?.animate({ opacity: [0, 1] }, DISSOLVE);
    }

    const target = isReturn ? (positions.get(id) ?? 0) : 0;
    const isReachable = () =>
      document.documentElement.scrollHeight - window.innerHeight >= target - 1;

    if (!main || isReachable()) {
      jump(target);
      startTracking();
      return stopTracking;
    }

    // The page is still loading, so its place waits for it to grow. Scrolling in
    // the meantime means the visitor has moved on.
    const inputs = ["wheel", "touchstart", "pointerdown", "keydown"];
    const settle = () => {
      observer.disconnect();
      for (const input of inputs) window.removeEventListener(input, settle);
      startTracking();
    };
    const observer = new ResizeObserver(() => {
      if (!isReachable()) return;
      jump(target);
      settle();
    });

    jump(0);
    observer.observe(main);
    for (const input of inputs) {
      window.addEventListener(input, settle, { passive: true });
    }

    return () => {
      settle();
      stopTracking();
    };
  }, [key, pathname, navigationType, mainRef]);
};
