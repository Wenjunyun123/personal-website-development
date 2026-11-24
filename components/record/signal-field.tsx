"use client";

import { useEffect, useRef } from "react";
import styles from "./record.module.css";

/**
 * Decorative contour field for the hero. Drawn in canvas so it can react to the
 * pointer without touching React state. Content stays fully readable without it.
 */
export function SignalField() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0.5, y: 0.5, active: false };
    let width = 0;
    let height = 0;
    let frame = 0;
    let previous = 0;
    let time = 0;
    let running = false;

    const draw = () => {
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);

      const rows = 30;
      for (let row = 0; row < rows; row += 1) {
        const baseY = ((row + 0.5) / rows) * height;
        const phase = row * 0.58;
        const amplitude = 9 + (row % 4) * 3;

        context.beginPath();
        for (let x = 0; x <= width + 8; x += 8) {
          const wave =
            Math.sin(x * 0.006 + time * 0.00032 + phase) * amplitude +
            Math.sin(x * 0.0021 - time * 0.00021 + row * 0.9) * 18;

          let y = baseY + wave;

          if (pointer.active) {
            const dx = x - pointer.x * width;
            const dy = baseY - pointer.y * height;
            const distance = Math.hypot(dx, dy);
            const influence = Math.max(0, 1 - distance / 280);
            y -= influence * influence * 54 * (dy < 0 ? -1 : 1);
          }

          if (x === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }

        const accent = row % 9 === 4;
        context.strokeStyle = accent
          ? "rgba(31, 75, 255, 0.24)"
          : `rgba(11, 11, 11, ${0.045 + (row % 3) * 0.012})`;
        context.lineWidth = accent ? 1.15 : 0.72;
        context.stroke();
      }

      // A few measurement ticks keep the field reading as a technical drawing.
      context.strokeStyle = "rgba(11, 11, 11, 0.14)";
      context.lineWidth = 1;
      for (let i = 1; i < 6; i += 1) {
        const x = (width / 6) * i;
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, 10);
        context.stroke();
      }
    };

    const animate = (now: number) => {
      if (!running) return;
      if (!reduced.matches) {
        time = now;
        if (now - previous > 32) {
          draw();
          previous = now;
        }
        frame = requestAnimationFrame(animate);
      }
    };

    const start = () => {
      if (running || reduced.matches) return;
      running = true;
      frame = requestAnimationFrame(animate);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      pointer.active = inside;
      if (!inside) return;
      pointer.x = (event.clientX - rect.left) / Math.max(rect.width, 1);
      pointer.y = (event.clientY - rect.top) / Math.max(rect.height, 1);
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    resize();
    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    observer?.observe(canvas);
    const visibility =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              if (entries.some((entry) => entry.isIntersecting)) start();
              else stop();
            },
            { rootMargin: "120px" }
          )
        : null;
    visibility?.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    if (reduced.matches) draw();
    else start();

    return () => {
      stop();
      observer?.disconnect();
      visibility?.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={ref} className={styles.signalField} aria-hidden="true" />;
}
