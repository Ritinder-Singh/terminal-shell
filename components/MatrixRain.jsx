"use client";

import { useEffect, useRef } from "react";

const CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF";

export default function MatrixRain({ theme, onExit }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const COL_W = 16;
    let cols = Math.floor(canvas.width / COL_W);
    let drops = Array(cols).fill(1);

    const primary = theme?.primary || "rgba(0,200,0,0.95)";
    // Parse primary color to get a brighter head color
    const headColor = primary.replace(/[\d.]+\)$/, "1)");

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `15px monospace`;

      drops.forEach((y, i) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        // Head of column is brighter
        ctx.fillStyle = y === 1 ? headColor : primary;
        ctx.fillText(char, i * COL_W, y * 16);

        if (y * 16 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });

      // Hint text
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press any key or click to exit",
        canvas.width / 2,
        canvas.height - 20
      );
      ctx.textAlign = "left";
    };

    const interval = setInterval(draw, 50);

    const handleKey = () => onExit();
    const handleClick = () => onExit();

    window.addEventListener("keydown", handleKey);
    canvas.addEventListener("click", handleClick);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKey);
      canvas.removeEventListener("click", handleClick);
    };
  }, [onExit, theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1000,
        cursor: "pointer",
      }}
    />
  );
}
