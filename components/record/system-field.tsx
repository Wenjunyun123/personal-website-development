"use client";

import { useEffect, useRef } from "react";
import styles from "./record.module.css";

type Node = {
  label: string;
  x: number;
  y: number;
  phase: number;
  speed: number;
  emphasis: boolean;
};

/**
 * A drifting constellation of the tools used on delivery. The labels are
 * repeated in a visually-hidden list by the parent for assistive technology.
 */
export function SystemField({ labels }: { labels: readonly string[] }) {
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
    let nodes: Node[] = [];
    let frame = 0;
    let previous = 0;
    let time = 0;
    let running = false;

    const layout = () => {
      const count = labels.length;
      const radiusX = width * 0.37;
      const radiusY = height * 0.35;
      nodes = labels.map((label, index) => {
        const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
        const jitter = 0.78 + (Math.sin(index * 12.9898) * 0.5 + 0.5) * 0.3;
        return {
          label,
          x: width / 2 + Math.cos(angle) * radiusX * jitter,
          y: height / 2 + Math.sin(angle) * radiusY * jitter,
          phase: index * 0.73,
          speed: 0.00018 + (index % 4) * 0.00005,
          emphasis: index % 5 === 0
        };
      });
    };

    const draw = () => {
      if (!width || !height || !nodes.length) return;
      context.clearRect(0, 0, width, height);

      const positions = nodes.map((node) => {
        const driftX = reduced.matches ? 0 : Math.sin(time * node.speed + node.phase) * 7;
        const driftY = reduced.matches ? 0 : Math.cos(time * node.speed * 1.3 + node.phase) * 6;
        let x = node.x + driftX;
        let y = node.y + driftY;

        if (pointer.active) {
          const dx = pointer.x * width - x;
          const dy = pointer.y * height - y;
          const distance = Math.hypot(dx, dy);
          const pull = Math.max(0, 1 - distance / 260) * 10;
          x += (dx / Math.max(distance, 1)) * pull;
          y += (dy / Math.max(distance, 1)) * pull;
        }

        return { ...node, x, y };
      });

      context.lineWidth = 0.7;
      for (let i = 0; i < positions.length; i += 1) {
        for (let j = i + 1; j < positions.length; j += 1) {
          const a = positions[i];
          const b = positions[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance > 190) continue;
          const alpha = (1 - distance / 190) * 0.22;
          context.strokeStyle = `rgba(247, 246, 242, ${alpha.toFixed(3)})`;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }

      const centerX = width / 2;
      const centerY = height / 2;
      context.strokeStyle = "rgba(124, 144, 255, 0.24)";
      context.lineWidth = 1;
      context.setLineDash([2, 7]);
      context.beginPath();
      context.ellipse(centerX, centerY, width * 0.23, height * 0.22, 0, 0, Math.PI * 2);
      context.stroke();
      context.setLineDash([]);

      for (const node of positions) {
        context.beginPath();
        context.fillStyle = node.emphasis ? "#7c90ff" : "rgba(247, 246, 242, 0.76)";
        context.arc(node.x, node.y, node.emphasis ? 3 : 1.8, 0, Math.PI * 2);
        context.fill();

        if (node.emphasis) {
          context.strokeStyle = "rgba(124, 144, 255, 0.38)";
          context.beginPath();
          context.arc(node.x, node.y, 9, 0, Math.PI * 2);
          context.stroke();
        }

        if (width > 640 || node.emphasis) {
          context.fillStyle = "rgba(247, 246, 242, 0.66)";
          context.font = '9px "Geist Mono", ui-monospace, monospace';
          context.fillText(node.label, node.x + 10, node.y + 3);
        }
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
      layout();
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
            { rootMargin: "160px" }
          )
        : null;
    visibility?.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    if (!reduced.matches) start();

    return () => {
      stop();
      observer?.disconnect();
      visibility?.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [labels]);

  return <canvas ref={ref} className={styles.systemFieldCanvas} aria-hidden="true" />;
}
