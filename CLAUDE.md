# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive terminal-style portfolio for **Ritinder Singh** (Backend Developer · Flutter · Python). Built with Next.js 16 / React 19, no backend — everything runs client-side. Deployed via Docker.

## Commands

```bash
npm run dev      # Dev server at localhost:3000
npm run build    # Production build (standalone output)
npm run start    # Run production build locally
npm run lint     # ESLint
```

No test suite. Docker: `docker build -t terminal-shell . && docker run -p 3000:3000 terminal-shell`

## File Structure

```
app/
  layout.tsx          # Metadata, viewport (prevents iOS zoom), global CSS import
  page.tsx            # Renders <Terminal /> full-screen
  globals.css         # Reset, overflow:hidden, background #0a0a0a
components/
  Terminal.jsx        # All UI, state, theme, input handling ("use client")
  Commands.jsx        # Pure command registry + processInput()
  MatrixRain.jsx      # Canvas matrix rain overlay ("use client")
  SnakeGame.jsx       # Canvas snake game overlay ("use client")
next.config.ts        # output: "standalone"
Dockerfile            # 3-stage: deps → builder → alpine runner (port 3000)
.github/workflows/
  sync-to-gitlab.yml  # Mirrors repo to GitLab on every push
```

## Architecture

### Data flow

```
app/page.tsx
  └── Terminal.jsx          ← all state lives here
        ├── Commands.jsx    ← called by runCommand(), returns strings/sentinels/Promises
        ├── MatrixRain.jsx  ← rendered when matrixActive=true
        └── SnakeGame.jsx   ← rendered when snakeActive=true
```

### Terminal.jsx — State

| State | Type | Purpose |
|---|---|---|
| `lines` | `{type, text}[]` | Output history rendered on screen |
| `history` / `histIdx` | `string[]` / `number` | Command history, ArrowUp/Down nav |
| `theme` | `string` | Active theme name, default `"dracula"` |
| `currentDir` | `string` | Simulated cwd, default `"~"` |
| `isMobile` | `boolean` | `window.innerWidth < 640` |
| `typewriterText` | `string` | Greeting being typed out on mount |
| `typewriterDone` | `boolean` | Triggers pending URL cmd execution |
| `matrixActive` | `boolean` | Shows MatrixRain overlay |
| `snakeActive` | `boolean` | Shows SnakeGame overlay |
| `pendingCmd` | `string\|null` | Command from `?cmd=` URL param |

**localStorage keys:** `terminal-history` (JSON array, max 100), `terminal-theme` (string)

### Terminal.jsx — Key functions

- **`runCommand(trimmed, currentHistory)`** — core dispatcher. Handles `history`, `cd`, `pwd` directly before calling `processInput()`. Checks return value for sentinels, Promises, or plain strings.
- **`submit()`** — calls `runCommand(input, history)`, clears input field.
- **`handleKey()`** — Enter → submit, Tab → completion, ArrowUp/Down → history nav.
- **`renderWithLinks(text, color)`** — converts `github.com/...` and `linkedin.com/...` URLs in output text into clickable `<a>` tags.

### Terminal.jsx — Sentinel values

Commands in `Commands.jsx` return these strings to trigger Terminal-level behavior:

| Sentinel | Effect |
|---|---|
| `"__CLEAR__"` | Resets `lines` to `[]` |
| `"__HISTORY__"` | Handled before `processInput` is called |
| `"__MATRIX__"` | Sets `matrixActive = true` |
| `"__SNAKE__"` | Sets `snakeActive = true` |
| `"__THEME:name__"` | Sets `theme`, saves to localStorage |

### Terminal.jsx — Themes

Defined in the `THEMES` object at the top of the file. Each theme has: `primary`, `secondary`, `dim`, `bg`, `bgDark`, `bgBar`, `border`, `caret`, `cursor`.

| Theme | Style |
|---|---|
| `dracula` | Purple on dark *(default)* |
| `tokyo` | Blue on navy |
| `catppuccin` | Mauve on dark |
| `nord` | Icy blue on slate |
| `green` | Classic terminal green |
| `amber` | Phosphor amber |

All hardcoded colors in JSX must use `t.primary`, `t.bg`, etc. where `t = THEMES[theme]`.

### Commands.jsx — Exports

- **`COMMANDS`** — object of `(args: string[]) => string | Promise<string>`. Multi-word commands (e.g. `"sudo hire me"`) are valid keys. Async commands (e.g. `weather`) return a `Promise` — `runCommand` handles it with a loading indicator.
- **`GREETING`** — ASCII art + tagline shown on load via typewriter effect.
- **`processInput(input)`** — trims input, matches multi-word then single-word commands, returns result.

### Commands.jsx — All commands

**Portfolio:** `whoami [-v]`, `about`, `skills [category]`, `projects [name]`, `achievements`, `contact`, `resume`, `availability`, `now`, `blog [slug]`, `testimonials`

**Filesystem:** `ls [section]`, `cat <section>`, `cd <section>`, `pwd` *(cd/pwd handled in Terminal.jsx)*

**Utility:** `date`, `time`, `echo`, `open <shortcut>`, `ping [host]`, `weather [city]` *(async)*, `history`, `man <cmd>`, `theme <name>`, `clear`

**Fun:** `joke`, `quote`, `fortune`, `coffee`, `ascii`, `banner`, `hack`, `matrix`, `snake`, `iam <name>`, `sudo hire me`, `sudo rm -rf /`

### Adding a new command

1. Add a key + handler to `COMMANDS` in `Commands.jsx`
2. Add it to the `help` command's output string in `Commands.jsx`
3. If it needs Terminal-level side effects (overlay, theme change), return a sentinel string and handle it in `runCommand` in `Terminal.jsx`
4. If it's async, return a `Promise<string>` — no other changes needed

### MatrixRain.jsx

Canvas fills `100vw × 100vh`, fixed z-index 1000. Katakana + hex characters in `theme.primary` color. Exits on any keydown or canvas click. Props: `theme` (object), `onExit` (callback).

### SnakeGame.jsx

20×20 grid, `CELL=20px`, `TICK=150ms`. Game state stored in `useRef` to avoid stale closures in `setInterval`. Snake color: `theme.primary`/`theme.secondary`. Food: `#ff5555`. ESC or Q quits. Props: `theme` (object), `onExit(score)` (callback).

## URL Routing

Append `?cmd=<command>` to auto-execute on load, e.g. `/?cmd=projects`. The command runs 400ms after the typewriter greeting finishes.
