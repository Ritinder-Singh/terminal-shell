"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { GREETING, processInput } from "./Commands.jsx";

export default function Terminal() {
  const [lines, setLines] = useState([{ type: "output", text: GREETING }]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = useCallback(() => {
    if (!input.trim()) return;
    const result = processInput(input, history);
    const newHistory = [input, ...history];
    setHistory(newHistory);
    setHistIdx(-1);

    if (result === "__CLEAR__") {
      setLines([]);
    } else if (result === "__HISTORY__") {
      const historyText =
        history.length === 0
          ? "(no history yet)"
          : history
              .slice()
              .reverse()
              .map((cmd, i) => `  ${i + 1}  ${cmd}`)
              .join("\n");
      setLines((prev) => [
        ...prev,
        { type: "input", text: input },
        {
          type: "output",
          text: `Command History\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${historyText}`,
        },
      ]);
    } else {
      setLines((prev) => [
        ...prev,
        { type: "input", text: input },
        ...(result ? [{ type: "output", text: result }] : []),
      ]);
    }
    setInput("");
  }, [input, history]);

  const handleKey = (e) => {
    if (e.key === "Enter") {
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : history[next]);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "#0f0f0f",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Courier New', Courier, monospace",
        boxSizing: "border-box",
        border: "1rem solid #87ceeb",
        overflow: "hidden",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div
        style={{
          background: "#111",
          borderBottom: "1px solid #1a1a1a",
          padding: "0.4rem 1rem",
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <span style={{ color: "#87ceeb", fontSize: "0.75rem", letterSpacing: "0.15em", opacity: 0.6 }}>
          TERMINAL v1.0
        </span>
      </div>

      {/* Output area — grows to fill all available space */}
      <div
        style={{
          flex: 1,
          padding: "1rem 1.5rem",
          overflowY: "auto",
          color: "rgba(0,200,0,0.95)",
          fontSize: "0.95rem",
          lineHeight: "1.6",
        }}
      >
        {lines.map((line, i) => (
          <div key={i} style={{ display: "flex", gap: "0.5rem", whiteSpace: "pre-wrap" }}>
            {line.type === "input" && (
              <span style={{ color: "rgba(0,200,0,0.5)", userSelect: "none" }}>{">"}</span>
            )}
            <span style={{ color: line.type === "input" ? "rgba(0,200,0,0.75)" : "rgba(0,200,0,0.95)" }}>
              {line.text}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input area — pinned to bottom */}
      <div
        style={{
          borderTop: "1px solid #1a1a1a",
          padding: "0.75rem 1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          background: "#0c0c0c",
          flexShrink: 0,
        }}
      >
        <span style={{ color: "rgba(0,200,0,0.55)", userSelect: "none", fontSize: "0.95rem" }}>{">"}</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          autoComplete="off"
          spellCheck={false}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "rgba(0,200,0,0.95)",
            fontSize: "0.95rem",
            fontFamily: "inherit",
            caretColor: "rgba(0,200,0,0.9)",
          }}
        />
        <span
          style={{
            width: "8px",
            height: "1em",
            background: "rgba(0,200,0,0.7)",
            display: "inline-block",
            animation: "blink 1s step-end infinite",
          }}
        />
      </div>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body, html { height: 100%; overflow: hidden; }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: rgba(0,200,0,0.3); border-radius: 2px; }
      `}</style>
    </div>
  );
}