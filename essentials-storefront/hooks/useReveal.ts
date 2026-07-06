"use client";
import { useEffect, useRef, useCallback } from "react";

/**
 * Intersection Observer hook that adds `.revealed` class to elements
 * when they enter the viewport. Supports staggered children reveals.
 */
export function useReveal(options?: { threshold?: number; rootMargin?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? "0px 0px -40px 0px",
      }
    );

    // Observe the container itself
    const revealElements = node.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    );
    revealElements.forEach((el) => observer.observe(el));

    // Also observe the node itself if it has a reveal class
    if (
      node.classList.contains("reveal") ||
      node.classList.contains("reveal-left") ||
      node.classList.contains("reveal-right") ||
      node.classList.contains("reveal-scale")
    ) {
      observer.observe(node);
    }

    return () => observer.disconnect();
  }, [options?.threshold, options?.rootMargin]);

  return ref;
}

/**
 * Hook to observe a single element and trigger a callback when visible.
 * Useful for counter animations.
 */
export function useOnVisible(callback: () => void, options?: { threshold?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const hasFired = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasFired.current) {
          hasFired.current = true;
          callback();
          observer.disconnect();
        }
      },
      { threshold: options?.threshold ?? 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [callback, options?.threshold]);

  return ref;
}
