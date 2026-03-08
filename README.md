# terminal-shell

An interactive terminal-style portfolio for **Ritinder Singh** — Backend Developer, Flutter Engineer, API Architect. Built with Next.js 16 and React 19, deployed as a standalone Docker container.

## Development

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run start    # Run production build locally
npm run lint     # ESLint
```

## Docker

```bash
docker build -t terminal-shell .
docker run -p 3000:3000 terminal-shell
```

## Commands

Type `help` in the terminal to see the full list. Highlights:

| Command | Description |
|---|---|
| `whoami [-v]` | Identity (add `-v` for full profile) |
| `skills [category]` | Tech stack, optionally filtered |
| `projects [name]` | Project list or detailed view |
| `blog [slug]` | Read blog posts |
| `contact` / `open <shortcut>` | Get in touch or open links |
| `resume` | Opens resume PDF |
| `weather [city]` | Live weather via wttr.in |
| `theme <name>` | Switch color theme |
| `cd <section>` / `pwd` | Filesystem-style navigation |
| `cat <section>` | Read a section like a file |
| `man <cmd>` | Manual for any command |
| `matrix` | Matrix rain animation |
| `snake` | Playable Snake game |
| `sudo hire me` | 😄 |

**URL routing:** Append `?cmd=<command>` to auto-execute a command on load (e.g. `/?cmd=projects`).

## Themes

Switch with `theme <name>`. Persisted across sessions via `localStorage`.

| Name | Style |
|---|---|
| `dracula` | Purple on dark *(default)* |
| `tokyo` | Blue on navy |
| `catppuccin` | Mauve on dark |
| `nord` | Icy blue on slate |
| `green` | Classic terminal green |
| `amber` | Phosphor amber |

## Tech Stack

- **Framework:** Next.js 16 (App Router, standalone output)
- **UI:** React 19, inline styles, Tailwind CSS v4
- **Deployment:** Docker (multi-stage, Alpine runner)
- **CI:** GitHub Actions → GitLab sync
