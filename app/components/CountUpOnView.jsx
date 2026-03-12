"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function CountUpOnView({
  value,
  duration = 1200,
  start = 0,
  suffix = "+",
  prefix = "",
}) {
  const ref = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [display, setDisplay] = useState(start);

  const target = useMemo(() => {
    const n = typeof value === "number" ? value : parseFloat(String(value));
    return Number.isFinite(n) ? n : 0;
  }, [value]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - startTime) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(start + (target - start) * eased);
      setDisplay(next);
      if (t < 1) requestAnimationFrame(tick);
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hasStarted, duration, start, target]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
