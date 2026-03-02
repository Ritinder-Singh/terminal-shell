"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { GREETING, processInput } from "./Commands";

const MOBILE_GREETING = `RITINDER SINGH
━━━━━━━━━━━━━━━━━━━━━━━
Backend Developer · Flutter · Python
Type 'help' for commands.`;

export default function Terminal() {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setLines([{ type: "output", text: isMobile ? MOBILE_GREETING : GREETING }]);
  }, [isMobile]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    // Only auto-focus on non-touch devices to avoid keyboard popping up on mobile
    if (!("ontouchstart" in window)) {
      inputRef.current?.focus();
    }
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

  const fontSize = isMobile ? "0.78rem" : "0.95rem";
  const padding = isMobile ? "0.6rem 0.8rem" : "1rem 1.5rem";
  const border = isMobile ? "4px solid #87ceeb" : "1rem solid #87ceeb";

  return (
    <div
      style={{
        height: "100dvh",
        width: "100dvw",
        background: "#0f0f0f",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Courier New', Courier, monospace",
        boxSizing: "border-box",
        border,
        overflow: "hidden",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div
        style={{
          background: "#111",
          borderBottom: "1px solid #1a1a1a",
          padding: isMobile ? "0.3rem 0.8rem" : "0.4rem 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <span style={{ color: "#87ceeb", fontSize: isMobile ? "0.65rem" : "0.75rem", letterSpacing: "0.15em", opacity: 0.6 }}>
          TERMINAL v1.0
        </span>
        {isMobile && (
          <span style={{ color: "rgba(0,200,0,0.4)", fontSize: "0.6rem", letterSpacing: "0.1em" }}>
            TAP INPUT TO TYPE
          </span>
        )}
      </div>

      {/* Output area */}
      <div
        style={{
          flex: 1,
          padding,
          overflowY: "auto",
          overflowX: "hidden",
          color: "rgba(0,200,0,0.95)",
          fontSize,
          lineHeight: "1.6",
          wordBreak: "break-word",
        }}
      >
        {lines.map((line, i) => (
          <div key={i} style={{ display: "flex", gap: "0.4rem", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {line.type === "input" && (
              <span style={{ color: "rgba(0,200,0,0.5)", userSelect: "none", flexShrink: 0 }}>{">"}</span>
            )}
            <span style={{ color: line.type === "input" ? "rgba(0,200,0,0.75)" : "rgba(0,200,0,0.95)", minWidth: 0 }}>
              {line.text}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div
        style={{
          borderTop: "1px solid #1a1a1a",
          padding: isMobile ? "0.6rem 0.8rem" : "0.75rem 1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "#0c0c0c",
          flexShrink: 0,
        }}
      >
        <span style={{ color: "rgba(0,200,0,0.55)", userSelect: "none", fontSize, flexShrink: 0 }}>{">"}</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          inputMode="text"
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "rgba(0,200,0,0.95)",
            fontSize,
            fontFamily: "inherit",
            caretColor: "rgba(0,200,0,0.9)",
            minWidth: 0,
          }}
        />
        {/* Send button — only on mobile */}
        {isMobile && (
          <button
            onClick={submit}
            style={{
              background: "transparent",
              border: "1px solid rgba(0,200,0,0.3)",
              color: "rgba(0,200,0,0.8)",
              fontSize: "0.7rem",
              padding: "0.25rem 0.5rem",
              cursor: "pointer",
              fontFamily: "inherit",
              flexShrink: 0,
              letterSpacing: "0.05em",
            }}
          >
            RUN
          </button>
        )}
        <span
          style={{
            width: "7px",
            height: "1em",
            background: "rgba(0,200,0,0.7)",
            display: "inline-block",
            animation: "blink 1s step-end infinite",
            flexShrink: 0,
          }}
        />
      </div>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body {
          height: 100%;
          overflow: hidden;
          -webkit-text-size-adjust: 100%;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: rgba(0,200,0,0.3); border-radius: 2px; }
        input { -webkit-appearance: none; border-radius: 0; }
      `}</style>
    </div>
  );
}