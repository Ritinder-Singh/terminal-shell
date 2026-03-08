"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { COMMANDS, GREETING, processInput } from "./Commands";
import MatrixRain from "./MatrixRain";
import SnakeGame from "./SnakeGame";

const MOBILE_GREETING = `RITINDER SINGH
━━━━━━━━━━━━━━━━━━━━━━━
Backend Developer · Flutter · Python
Type 'help' for commands.`;

// ── Themes ─────────────────────────────────────────────────────────────────
const THEMES = {
  dracula: {
    name: "dracula",
    primary: "rgba(189,147,249,0.95)",
    secondary: "rgba(189,147,249,0.45)",
    dim: "rgba(189,147,249,0.70)",
    bg: "#282a36",
    bgDark: "#21222c",
    bgBar: "#1e1f29",
    border: "#6272a4",
    caret: "rgba(189,147,249,0.9)",
    cursor: "rgba(189,147,249,0.75)",
  },
  tokyo: {
    name: "tokyo",
    primary: "rgba(122,162,247,0.95)",
    secondary: "rgba(122,162,247,0.45)",
    dim: "rgba(122,162,247,0.70)",
    bg: "#1a1b26",
    bgDark: "#16161e",
    bgBar: "#13131a",
    border: "#3d59a1",
    caret: "rgba(122,162,247,0.9)",
    cursor: "rgba(122,162,247,0.75)",
  },
  catppuccin: {
    name: "catppuccin",
    primary: "rgba(203,166,247,0.95)",
    secondary: "rgba(203,166,247,0.45)",
    dim: "rgba(203,166,247,0.70)",
    bg: "#1e1e2e",
    bgDark: "#181825",
    bgBar: "#11111b",
    border: "#585b70",
    caret: "rgba(203,166,247,0.9)",
    cursor: "rgba(203,166,247,0.75)",
  },
  nord: {
    name: "nord",
    primary: "rgba(136,192,208,0.95)",
    secondary: "rgba(136,192,208,0.45)",
    dim: "rgba(136,192,208,0.70)",
    bg: "#2e3440",
    bgDark: "#272c36",
    bgBar: "#222730",
    border: "#4c566a",
    caret: "rgba(136,192,208,0.9)",
    cursor: "rgba(136,192,208,0.75)",
  },
  green: {
    name: "green",
    primary: "rgba(0,200,0,0.95)",
    secondary: "rgba(0,200,0,0.45)",
    dim: "rgba(0,200,0,0.75)",
    bg: "#0f0f0f",
    bgDark: "#0c0c0c",
    bgBar: "#111",
    border: "#87ceeb",
    caret: "rgba(0,200,0,0.9)",
    cursor: "rgba(0,200,0,0.7)",
  },
  amber: {
    name: "amber",
    primary: "rgba(255,176,0,0.95)",
    secondary: "rgba(255,176,0,0.45)",
    dim: "rgba(255,176,0,0.75)",
    bg: "#0f0d00",
    bgDark: "#0c0a00",
    bgBar: "#111000",
    border: "#ffb000",
    caret: "rgba(255,176,0,0.9)",
    cursor: "rgba(255,176,0,0.7)",
  },
};

// ── Link renderer ───────────────────────────────────────────────────────────
const URL_RE =
  /(https?:\/\/[^\s]+|(?:linkedin\.com|github\.com)[^\s]*)/g;

function renderWithLinks(text, linkColor) {
  const parts = [];
  let last = 0;
  let match;
  const re = new RegExp(URL_RE.source, "g");
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const raw = match[0];
    const href = raw.startsWith("http") ? raw : `https://${raw}`;
    parts.push(
      <a
        key={match.index}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        style={{
          color: linkColor,
          textDecoration: "underline",
          textUnderlineOffset: "2px",
          opacity: 0.85,
        }}
      >
        {raw}
      </a>
    );
    last = match.index + raw.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length > 1 ? parts : text;
}

// ── All tab-completable commands ────────────────────────────────────────────
const COMPLETABLE = [
  ...Object.keys(COMMANDS).filter((k) => !k.includes(" ")),
  "history",
  "cd",
  "pwd",
];

export default function Terminal() {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState("dracula");
  const [currentDir, setCurrentDir] = useState("~");
  const [matrixActive, setMatrixActive] = useState(false);
  const [snakeActive, setSnakeActive] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [typewriterDone, setTypewriterDone] = useState(false);
  const [pendingCmd, setPendingCmd] = useState(null);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const currentDirRef = useRef(currentDir);

  useEffect(() => {
    currentDirRef.current = currentDir;
  }, [currentDir]);

  // ── Mobile detection ──────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Load persisted state from localStorage ────────────────────────────────
  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("terminal-history") || "[]"
      );
      if (Array.isArray(saved)) setHistory(saved);
    } catch {}
    const savedTheme = localStorage.getItem("terminal-theme");
    if (savedTheme && THEMES[savedTheme]) setTheme(savedTheme);
  }, []);

  // ── URL routing — read ?cmd= param ───────────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cmd = params.get("cmd");
    if (cmd) setPendingCmd(decodeURIComponent(cmd));
  }, []);

  // ── Typewriter greeting (runs once on mount) ──────────────────────────────
  useEffect(() => {
    const mobile = window.innerWidth < 640;
    const fullText = mobile ? MOBILE_GREETING : GREETING;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypewriterText(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(interval);
        setTypewriterText("");
        setLines([{ type: "output", text: fullText }]);
        setTypewriterDone(true);
      }
    }, 3);
    return () => clearInterval(interval);
  }, []);

  // ── Auto-scroll ───────────────────────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, typewriterText]);

  // ── Auto-focus (desktop only) ─────────────────────────────────────────────
  useEffect(() => {
    if (!("ontouchstart" in window)) inputRef.current?.focus();
  }, []);

  // ── Execute pending URL command after typewriter finishes ─────────────────
  useEffect(() => {
    if (typewriterDone && pendingCmd) {
      const cmd = pendingCmd;
      setPendingCmd(null);
      setTimeout(() => runCommand(cmd, []), 400);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typewriterDone]);

  // ── Core command runner ───────────────────────────────────────────────────
  const runCommand = useCallback(
    async (trimmed, currentHistory) => {
      const lower = trimmed.toLowerCase();
      const [cmd, ...args] = trimmed.split(/\s+/);

      // Persist to history
      const newHistory = [trimmed, ...currentHistory];
      setHistory(newHistory);
      localStorage.setItem(
        "terminal-history",
        JSON.stringify(newHistory.slice(0, 100))
      );
      setHistIdx(-1);

      const push = (newLines) =>
        setLines((prev) => [...prev, ...newLines]);

      // ── Special terminal-level commands ──────────────────────────────────
      if (lower === "history") {
        const histText =
          currentHistory.length === 0
            ? "(no history yet)"
            : currentHistory
                .slice()
                .reverse()
                .map((c, i) => `  ${i + 1}  ${c}`)
                .join("\n");
        push([
          { type: "input", text: trimmed },
          {
            type: "output",
            text: `Command History\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${histText}`,
          },
        ]);
        return;
      }

      if (cmd.toLowerCase() === "cd") {
        const target = args[0] || "~";
        const validDirs = [
          "~",
          "about",
          "skills",
          "projects",
          "contact",
          "blog",
          "achievements",
        ];
        if (target === "..") {
          setCurrentDir("~");
          push([{ type: "input", text: trimmed }]);
        } else if (validDirs.includes(target)) {
          setCurrentDir(target);
          // Show section content on cd
          const content =
            target !== "~" ? processInput(target) : null;
          push([
            { type: "input", text: trimmed },
            ...(content && typeof content === "string"
              ? [{ type: "output", text: content }]
              : []),
          ]);
        } else {
          push([
            { type: "input", text: trimmed },
            { type: "output", text: `cd: ${target}: No such directory` },
          ]);
        }
        return;
      }

      if (lower === "pwd") {
        push([
          { type: "input", text: trimmed },
          {
            type: "output",
            text: `/portfolio/${
              currentDirRef.current === "~" ? "" : currentDirRef.current
            }`,
          },
        ]);
        return;
      }

      // ── processInput routing ─────────────────────────────────────────────
      const result = processInput(trimmed);

      if (result === "__CLEAR__") {
        setLines([]);
        return;
      }

      if (result === "__MATRIX__") {
        push([{ type: "input", text: trimmed }]);
        setMatrixActive(true);
        return;
      }

      if (result === "__SNAKE__") {
        push([{ type: "input", text: trimmed }]);
        setSnakeActive(true);
        return;
      }

      if (typeof result === "string" && result.startsWith("__THEME:")) {
        const name = result.replace("__THEME:", "").replace("__", "");
        if (THEMES[name]) {
          setTheme(name);
          localStorage.setItem("terminal-theme", name);
          push([
            { type: "input", text: trimmed },
            { type: "output", text: `Theme switched to: ${name}` },
          ]);
        }
        return;
      }

      // Async command (e.g. weather)
      if (result instanceof Promise) {
        push([
          { type: "input", text: trimmed },
          { type: "output", text: "⟳ Loading..." },
        ]);
        try {
          const resolved = await result;
          setLines((prev) => [
            ...prev.slice(0, -1),
            { type: "output", text: resolved },
          ]);
        } catch {
          setLines((prev) => [
            ...prev.slice(0, -1),
            { type: "output", text: "Error: command failed." },
          ]);
        }
        return;
      }

      push([
        { type: "input", text: trimmed },
        ...(result ? [{ type: "output", text: result }] : []),
      ]);
    },
    []
  );

  // ── Submit ────────────────────────────────────────────────────────────────
  const submit = useCallback(() => {
    if (!input.trim()) return;
    runCommand(input.trim(), history);
    setInput("");
  }, [input, history, runCommand]);

  // ── Key handler ───────────────────────────────────────────────────────────
  const handleKey = (e) => {
    if (e.key === "Enter") {
      submit();
    } else if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.split(/\s+/)[0].toLowerCase();
      if (!partial) return;
      const matches = COMPLETABLE.filter((c) => c.startsWith(partial));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        setLines((prev) => [
          ...prev,
          { type: "output", text: matches.join("   ") },
        ]);
      }
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

  // ── Responsive sizing ─────────────────────────────────────────────────────
  const fontSize = isMobile ? "0.78rem" : "0.95rem";
  const padding = isMobile ? "0.6rem 0.8rem" : "1rem 1.5rem";
  const borderSize = isMobile ? "4px" : "1rem";
  const t = THEMES[theme] || THEMES.dracula;

  const prompt = isMobile ? ">" : `[${currentDir}] >`;

  return (
    <>
      {/* Matrix overlay */}
      {matrixActive && (
        <MatrixRain
          theme={t}
          onExit={() => {
            setMatrixActive(false);
            setLines((prev) => [
              ...prev,
              { type: "output", text: "Exited matrix." },
            ]);
          }}
        />
      )}

      {/* Snake overlay */}
      {snakeActive && (
        <SnakeGame
          theme={t}
          onExit={(score) => {
            setSnakeActive(false);
            setLines((prev) => [
              ...prev,
              {
                type: "output",
                text: `Snake ended. Final score: ${score ?? 0}`,
              },
            ]);
          }}
        />
      )}

      <div
        style={{
          height: "100dvh",
          width: "100dvw",
          background: t.bg,
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Courier New', Courier, monospace",
          boxSizing: "border-box",
          border: `${borderSize} solid ${t.border}`,
          overflow: "hidden",
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Title bar */}
        <div
          style={{
            background: t.bgBar,
            borderBottom: `1px solid ${t.border}22`,
            padding: isMobile ? "0.3rem 0.8rem" : "0.4rem 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              color: t.secondary,
              fontSize: isMobile ? "0.65rem" : "0.75rem",
              letterSpacing: "0.15em",
            }}
          >
            TERMINAL v2.0 · {t.name}
          </span>
          {isMobile && (
            <span
              style={{
                color: t.secondary,
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
              }}
            >
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
            color: t.primary,
            fontSize,
            lineHeight: "1.6",
            wordBreak: "break-word",
          }}
        >
          {/* Typewriter greeting */}
          {typewriterText && (
            <div
              style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
            >
              <span style={{ color: t.primary }}>{typewriterText}</span>
              <span
                style={{
                  display: "inline-block",
                  width: "7px",
                  height: "1em",
                  background: t.cursor,
                  verticalAlign: "text-bottom",
                  marginLeft: "1px",
                }}
              />
            </div>
          )}

          {/* Lines */}
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "0.4rem",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {line.type === "input" && (
                <span
                  style={{
                    color: t.secondary,
                    userSelect: "none",
                    flexShrink: 0,
                  }}
                >
                  {prompt}
                </span>
              )}
              <span
                style={{
                  color:
                    line.type === "input" ? t.dim : t.primary,
                  minWidth: 0,
                }}
              >
                {line.type === "output"
                  ? renderWithLinks(line.text, t.primary)
                  : line.text}
              </span>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div
          style={{
            borderTop: `1px solid ${t.border}22`,
            padding: isMobile ? "0.6rem 0.8rem" : "0.75rem 1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: t.bgDark,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              color: t.secondary,
              userSelect: "none",
              fontSize,
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            {prompt}
          </span>
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
              color: t.primary,
              fontSize,
              fontFamily: "inherit",
              caretColor: t.caret,
              minWidth: 0,
            }}
          />
          {/* Send button — mobile only */}
          {isMobile && (
            <button
              onClick={submit}
              style={{
                background: "transparent",
                border: `1px solid ${t.secondary}`,
                color: t.dim,
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
          {/* Blinking cursor block */}
          <span
            style={{
              width: "7px",
              height: "1em",
              background: t.cursor,
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
            50%       { opacity: 0; }
          }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: ${t.secondary}; border-radius: 2px; }
          input { -webkit-appearance: none; border-radius: 0; }
        `}</style>
      </div>
    </>
  );
}
