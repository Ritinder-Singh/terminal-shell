"use client";

import { useEffect, useRef } from "react";

const CELL = 20;
const COLS = 20;
const ROWS = 20;
const TICK = 150;

const KEY_DIRS = {
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
};

function randomFood(snake) {
  let pos;
  do {
    pos = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS),
    };
  } while (snake.some((s) => s.x === pos.x && s.y === pos.y));
  return pos;
}

export default function SnakeGame({ theme, onExit }) {
  const canvasRef = useRef(null);
  // Use a ref for mutable game state to avoid stale closures in setInterval
  const stateRef = useRef({
    snake: [{ x: 10, y: 10 }],
    dir: [1, 0],
    nextDir: [1, 0],
    food: { x: 5, y: 5 },
    score: 0,
    alive: true,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const s = stateRef.current;

    // Reset state
    s.snake = [{ x: 10, y: 10 }];
    s.dir = [1, 0];
    s.nextDir = [1, 0];
    s.food = randomFood(s.snake);
    s.score = 0;
    s.alive = true;

    const primary = theme?.primary || "rgba(0,200,0,0.95)";
    const secondary = theme?.secondary || "rgba(0,200,0,0.4)";
    const bg = theme?.bg || "#0f0f0f";

    const draw = () => {
      // Background
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle grid
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= COLS; x++) {
        ctx.beginPath();
        ctx.moveTo(x * CELL, 0);
        ctx.lineTo(x * CELL, ROWS * CELL);
        ctx.stroke();
      }
      for (let y = 0; y <= ROWS; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * CELL);
        ctx.lineTo(COLS * CELL, y * CELL);
        ctx.stroke();
      }

      // Food
      ctx.fillStyle = "#ff5555";
      ctx.fillRect(
        s.food.x * CELL + 3,
        s.food.y * CELL + 3,
        CELL - 6,
        CELL - 6
      );

      // Snake
      s.snake.forEach((seg, i) => {
        ctx.fillStyle = i === 0 ? primary : secondary;
        ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
      });

      // Score bar
      ctx.fillStyle = bg;
      ctx.fillRect(0, ROWS * CELL, canvas.width, 30);
      ctx.fillStyle = primary;
      ctx.font = "13px monospace";
      ctx.textAlign = "left";
      ctx.fillText(`Score: ${s.score}`, 6, ROWS * CELL + 20);
      ctx.textAlign = "right";
      ctx.fillText("ESC / Q to quit", COLS * CELL - 6, ROWS * CELL + 20);
      ctx.textAlign = "left";

      // Game over overlay
      if (!s.alive) {
        ctx.fillStyle = "rgba(0,0,0,0.75)";
        ctx.fillRect(0, 0, canvas.width, ROWS * CELL);
        ctx.fillStyle = primary;
        ctx.font = "bold 22px monospace";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", (COLS * CELL) / 2, (ROWS * CELL) / 2 - 16);
        ctx.font = "14px monospace";
        ctx.fillText(
          `Score: ${s.score}`,
          (COLS * CELL) / 2,
          (ROWS * CELL) / 2 + 12
        );
        ctx.fillStyle = secondary;
        ctx.fillText(
          "Press any key to exit",
          (COLS * CELL) / 2,
          (ROWS * CELL) / 2 + 36
        );
        ctx.textAlign = "left";
      }
    };

    const tick = () => {
      if (!s.alive) return;

      s.dir = s.nextDir;
      const head = {
        x: s.snake[0].x + s.dir[0],
        y: s.snake[0].y + s.dir[1],
      };

      // Wall or self collision
      if (
        head.x < 0 ||
        head.x >= COLS ||
        head.y < 0 ||
        head.y >= ROWS ||
        s.snake.some((seg) => seg.x === head.x && seg.y === head.y)
      ) {
        s.alive = false;
        draw();
        return;
      }

      s.snake.unshift(head);

      if (head.x === s.food.x && head.y === s.food.y) {
        s.score++;
        s.food = randomFood(s.snake);
      } else {
        s.snake.pop();
      }

      draw();
    };

    const interval = setInterval(tick, TICK);
    draw();

    const handleKey = (e) => {
      if (!s.alive) {
        onExit(s.score);
        return;
      }
      if (e.key === "Escape" || e.key === "q" || e.key === "Q") {
        onExit(s.score);
        return;
      }
      const d = KEY_DIRS[e.key];
      if (d) {
        // Prevent 180° reversal
        if (d[0] !== -s.dir[0] || d[1] !== -s.dir[1]) {
          s.nextDir = d;
        }
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKey);
    };
  }, [onExit, theme]);

  const primary = theme?.primary || "rgba(0,200,0,0.95)";
  const secondary = theme?.secondary || "rgba(0,200,0,0.4)";

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.88)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          color: secondary,
          fontFamily: "monospace",
          fontSize: "12px",
          marginBottom: "8px",
          letterSpacing: "0.05em",
        }}
      >
        Arrow keys to move · ESC / Q to quit
      </div>
      <canvas
        ref={canvasRef}
        width={COLS * CELL}
        height={ROWS * CELL + 30}
        style={{
          display: "block",
          border: `1px solid ${secondary}`,
        }}
      />
    </div>
  );
}
