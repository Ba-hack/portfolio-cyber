"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fait apparaître son contenu en fondu au moment où il entre dans le
 * viewport, via IntersectionObserver — pas de dépendance d'animation
 * ajoutée. Respecte `prefers-reduced-motion` (voir globals.css).
 */
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          // Une fois apparu, plus besoin de continuer à observer.
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
