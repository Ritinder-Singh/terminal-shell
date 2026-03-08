export const COMMANDS = {
  // ── Greet ──────────────────────────────────────────────────────────────
  iam: (args) => {
    if (!args.length) return "Usage: iam <name>";
    return `Hello, ${args.join(" ")}. Welcome to Ritinder's Portfolio Terminal!`;
  },

  // ── Core Portfolio ─────────────────────────────────────────────────────
  whoami: (args) => {
    const verbose = args.includes("--verbose") || args.includes("-v");
    if (verbose) {
      return `Ritinder Singh — Full Profile
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Role       : Backend Developer · Flutter Engineer · API Architect
Location   : India (Remote-first)
Status     : Open to full-time roles & freelance
Core Stack : Python (FastAPI) · Dart · JavaScript
Databases  : PostgreSQL · MySQL · Redis
Infra      : Docker · CI/CD · Linux
Contact    : for.ritindersingh@gmail.com
GitHub     : github.com/Ritinder-Singh
LinkedIn   : linkedin.com/in/ritindersingh`;
    }
    return `Ritinder Singh
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Backend Developer · Flutter Engineer · API Architect
📍 India  |  Open to opportunities`;
  },

  about: () => `About Me
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Backend Developer specializing in scalable APIs and cross-platform
solutions. I work with Python (FastAPI), Flutter, and JavaScript to
build real-time systems and CRM integrations.

Passionate about clean architecture, developer tooling, and
solving hard problems with elegant solutions.

Type 'projects', 'skills', or 'contact' to learn more.`,

  skills: (args) => {
    const categories = {
      languages: `Languages
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Dart · JavaScript · Python · C++ · SQL · Bash`,

      backend: `Backend & APIs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Python (FastAPI) · Node.js · Express.js
  RESTful APIs · WebSocket · n8n
  Event-driven Architecture`,

      frontend: `Frontend
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Flutter · React.js · HTML5 · CSS3`,

      databases: `Databases
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  PostgreSQL · MySQL · Redis`,

      devops: `DevOps
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Docker · CI/CD Pipelines · Git · Linux
  Unit / Integration Testing`,
    };

    const key = args[0]?.toLowerCase();
    if (key && categories[key]) return categories[key];

    return `Technical Skills
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Languages  : Dart · JavaScript · Python · C++ · SQL · Bash
  Backend    : FastAPI · Node.js · Express.js · WebSocket · n8n
  Frontend   : Flutter · React.js · HTML5 · CSS3
  Databases  : PostgreSQL · MySQL · Redis
  DevOps     : Docker · CI/CD · Git · Linux

Usage: skills <category>
Categories : languages · backend · frontend · databases · devops`;
  },

  projects: (args) => {
    const list = {
      whiteboard: `Real-Time Collaborative Whiteboard
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Stack  : Flutter · Python · FastAPI · Socket.io · Redis · PostgreSQL

  • Cross-platform (iOS, Android, Web) with real-time
    WebSocket sync via Socket.io
  • Redis caching + PostgreSQL persistence + offline sync
  • Deployed FastAPI backend on Raspberry Pi cluster
    with Docker containerization
  • Apple Pencil pressure sensitivity & drawing tools

  GitHub: github.com/Ritinder-Singh/collaborative-whiteboard`,

      music: `Cross-Platform Music Player
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Stack  : Flutter · Dart · Python (FastAPI)

  • Supports 6 platforms: Android, iOS, Windows,
    macOS, Linux, Web
  • FastAPI backend for audio streaming on Raspberry Pi
  • Platform-adaptive UI with playlist management,
    search, and audio visualization

  GitHub: github.com/Ritinder-Singh/flutter-music`,
    };

    const key = args[0]?.toLowerCase();
    if (key && list[key]) return list[key];

    return `Projects
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  1. whiteboard  — Real-Time Collaborative Whiteboard
  2. music       — Cross-Platform Music Player

Usage: projects <name>
Example: projects whiteboard`;
  },

  contact: () => `Contact
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Email    : for.ritindersingh@gmail.com
  Phone    : +91 94170 90163
  LinkedIn : linkedin.com/in/ritindersingh
  GitHub   : github.com/Ritinder-Singh`,

  resume: () => {
    if (typeof window !== "undefined") window.open("/resume.pdf", "_blank");
    return `Opening resume... 📄
If it didn't open, download it from: /resume.pdf`;
  },

  availability: () => `Availability
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✅  Open to full-time roles, freelance & collaborations
  📍  Remote-first · India-based
  📬  Reach out: for.ritindersingh@gmail.com`,

  now: () => `Currently
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🔨 Building: Open-source tools & side projects
  📖 Learning: System design & distributed systems
  🎯 Exploring: Open-source contributions`,

  achievements: () => `Achievements
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🥉  HackersPrey CTF Competition — 3rd Place
      Cybersecurity challenge · March 2024`,

  blog: (args) => {
    const posts = {
      "fastapi-websockets": {
        date: "2025-03-15",
        title: "Building Real-Time Apps with FastAPI & WebSockets",
        body: `
FastAPI makes it surprisingly easy to add WebSocket support.
Combined with Redis pub/sub, you can build scalable real-time
systems without reaching for a separate message broker.

Key takeaways:
  • Use connection managers to track active WebSocket clients
  • Redis pub/sub decouples senders from receivers
  • FastAPI's async support means no blocking the event loop
  • Test WebSocket endpoints with pytest-asyncio`,
      },
      "flutter-architecture": {
        date: "2025-02-10",
        title: "Clean Architecture in Flutter — What Actually Works",
        body: `
After shipping two Flutter apps, here's what I've learned
about architecture patterns that actually scale.

  • BLoC for complex state, Riverpod for simpler cases
  • Feature-first folder structure beats layer-first
  • Repository pattern keeps data sources swappable
  • Don't over-engineer — start simple, refactor when needed
  • Platform channels are less scary than they look`,
      },
      "docker-raspberry-pi": {
        date: "2025-01-05",
        title: "Self-Hosting on Raspberry Pi with Docker",
        body: `
Running a FastAPI backend on a Raspberry Pi cluster with
Docker Compose is more capable than you'd think.

  • ARM64 images are first-class in most registries now
  • Use Nginx as a reverse proxy with SSL termination
  • Docker volumes for persistent storage
  • Watchtower for automatic container updates
  • Tailscale makes remote access effortless`,
      },
    };

    const key = args[0]?.toLowerCase();
    if (key && posts[key]) {
      const p = posts[key];
      return `${p.title}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Published: ${p.date}
${p.body}`;
    }

    const list = Object.entries(posts)
      .map(([slug, p]) => `  ${slug.padEnd(28)} ${p.date}\n  → ${p.title}`)
      .join("\n\n");

    return `Blog
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${list}

Usage: blog <slug>`;
  },

  testimonials: () => `Testimonials
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  "Ritinder delivered clean, well-documented API work and was
   proactive about edge cases. Solid engineer."
                                      — Colleague, Genius365.ai

  "His Flutter UI was pixel-perfect across platforms and he
   picked up new integrations faster than anyone on the team."
                                      — Team Lead, Genius365.ai`,

  // ── Filesystem navigation ───────────────────────────────────────────────
  ls: (args) => {
    const section = args[0]?.toLowerCase();
    if (section === "projects") {
      return `projects/
  ├── whiteboard/   Real-Time Collaborative Whiteboard
  └── music/        Cross-Platform Music Player`;
    }
    if (section === "blog") {
      return `blog/
  ├── fastapi-websockets/
  ├── flutter-architecture/
  └── docker-raspberry-pi/`;
    }
    return `portfolio/
  ├── about/
  ├── skills/
  ├── projects/
  ├── achievements/
  ├── blog/
  ├── contact/
  └── resume.pdf`;
  },

  cat: (args) => {
    const section = args[0]?.toLowerCase();
    const aliases = {
      about: "about",
      skills: "skills",
      projects: "projects",
      contact: "contact",
      achievements: "achievements",
      now: "now",
      availability: "availability",
      testimonials: "testimonials",
    };
    if (!section) return "Usage: cat <section>\nExample: cat about";
    if (aliases[section]) return COMMANDS[aliases[section]]([]);
    return `cat: ${section}: No such file or directory`;
  },

  // ── Utility ────────────────────────────────────────────────────────────
  date: () => {
    const now = new Date();
    return `Date & Time
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ${now.toDateString()}
  ${now.toLocaleTimeString()}
  UTC: ${now.toUTCString()}`;
  },

  time: () => new Date().toLocaleTimeString(),

  echo: (args) => args.join(" ") || "",

  open: (args) => {
    const shortcuts = {
      linkedin: "https://linkedin.com/in/ritindersingh",
      github: "https://github.com/Ritinder-Singh",
      email: "mailto:for.ritindersingh@gmail.com",
      resume: "/resume.pdf",
    };
    const key = args[0]?.toLowerCase();
    if (!key) {
      return `Usage: open <shortcut>\nAvailable: ${Object.keys(shortcuts).join(" · ")}`;
    }
    const url = shortcuts[key];
    if (!url) return `open: '${key}' not found. Try: ${Object.keys(shortcuts).join(", ")}`;
    if (typeof window !== "undefined") window.open(url, "_blank");
    return `Opening ${key}...`;
  },

  ping: (args) => {
    const target = args[0] || "localhost";
    const known = {
      localhost:
        "PING localhost: min 0.001ms avg 0.001ms\n(You can always reach yourself.)",
      google: "PING google.com (142.250.80.46): 4/4 packets, time 11ms",
      github: "PING github.com (140.82.121.4): 4/4 packets, time 14ms",
      recruiter:
        "PING recruiter: 4/4 packets — 4 opportunities detected!\nRun: contact",
      life: "PING life: Request timeout.\n(Have you tried turning it off and on again?)",
      backend: "PING backend: 200 OK — All systems healthy.",
    };
    const lower = target.toLowerCase();
    if (known[lower]) return known[lower];
    return `PING ${target}: 4/4 packets, time ${Math.floor(Math.random() * 100) + 5}ms`;
  },

  fortune: () => {
    const fortunes = [
      "The best time to plant a tree was 20 years ago.\nThe second best time is now. Ship it.",
      "Your next commit will be your best commit.\n(Unless it breaks prod. Then the one after that.)",
      "There is no try. Only git push.\n(Please don't force-push to main.)",
      "A wise developer once said: 'It works on my machine.'\nAnd so Docker was born.",
      "The code you wrote 6 months ago was written by a worse version of you.\nThe code you write today will be judged by a better one.",
      "Keep it simple. You can always add complexity later.\n(You will regret it.)",
      "The most dangerous phrase in software: 'I'll add tests later.'",
      "Every senior developer is just a junior developer who never quit.",
    ];
    return `Fortune
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${fortunes[Math.floor(Math.random() * fortunes.length)]}`;
  },

  theme: (args) => {
    const available = ["dracula", "tokyo", "catppuccin", "nord", "green", "amber"];
    const name = args[0]?.toLowerCase();
    if (!name || !available.includes(name)) {
      return `Usage: theme <name>\nAvailable: ${available.join(" · ")}\n\nTheme styles:\n  dracula    — purple on dark (default)\n  tokyo      — blue on navy\n  catppuccin — mauve on dark\n  nord       — icy blue on slate\n  green      — classic terminal green\n  amber      — phosphor amber`;
    }
    return `__THEME:${name}__`;
  },

  weather: async (args) => {
    const city = args.join("+") || "";
    try {
      const res = await fetch(`https://wttr.in/${city}?format=3`);
      if (!res.ok) throw new Error("fetch failed");
      const text = await res.text();
      return `Weather
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ${text.trim()}

Powered by wttr.in  |  Usage: weather <city>`;
    } catch {
      return "Failed to fetch weather. Check your connection.\nUsage: weather <city>   Example: weather London";
    }
  },

  man: (args) => {
    const cmd = args[0]?.toLowerCase();
    const docs = {
      whoami:
        "whoami [--verbose | -v]\n  Display identity. --verbose shows the full profile.",
      skills:
        "skills [category]\n  List tech skills. Categories: languages, backend, frontend, databases, devops",
      projects:
        "projects [name]\n  List or detail a project. Names: whiteboard, music",
      blog:
        "blog [slug]\n  Read a blog post.\n  Slugs: fastapi-websockets, flutter-architecture, docker-raspberry-pi",
      theme:
        "theme <name>\n  Switch color theme.\n  Themes: dracula, tokyo, catppuccin, nord, green, amber",
      weather:
        "weather [city]\n  Fetch current weather. Auto-detects location if no city given.",
      open:
        "open <shortcut>\n  Open a link in a new tab.\n  Shortcuts: linkedin, github, email, resume",
      ping:
        "ping [host]\n  Ping a host. Try: recruiter, life, backend, github",
      cat:
        "cat <section>\n  Read a portfolio section as a file.\n  Sections: about, skills, projects, contact, achievements",
      ls:
        "ls [section]\n  List portfolio contents. Try: ls projects, ls blog",
      echo: "echo <text>\n  Print text back to the terminal.",
      history: "history\n  Show command history.",
      clear: "clear\n  Clear the terminal screen.",
      snake: "snake\n  Play Snake. Use arrow keys. ESC or Q to quit.",
      matrix: "matrix\n  Enter the Matrix. Press any key or click to exit.",
      cd:
        "cd <section>\n  Navigate to a portfolio section. Use 'cd ..' to go back.\n  Sections: about, skills, projects, contact, blog, achievements",
      pwd: "pwd\n  Show your current location in the portfolio.",
    };
    if (!cmd) return "Usage: man <command>\nExample: man theme";
    if (docs[cmd])
      return `Manual: ${cmd}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${docs[cmd]}`;
    return `No manual entry for '${cmd}'.`;
  },

  // ── Fun / Easter Eggs ──────────────────────────────────────────────────
  "sudo hire me": () => `[sudo] password for recruiter: ••••••••
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅  Access granted.
    Best decision you'll make today.
    → for.ritindersingh@gmail.com`,

  "sudo rm -rf /": () => `Removing /boot...             [DONE]
Removing /etc...              [DONE]
Removing /home/ritinder...    [DONE]
Removing /home/ritinder/skills/dart...
Removing /home/ritinder/skills/python...
Removing /home/ritinder/soul...  [ACCESS DENIED]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Just kidding. Nothing was harmed. 😄
My soul is write-protected.`,

  joke: () => {
    const jokes = [
      "Why do programmers prefer dark mode?\nBecause light attracts bugs. 🐛",
      "A SQL query walks into a bar, walks up to two tables and asks...\n'Can I JOIN you?' 🍺",
      "Why did the developer go broke?\nBecause he used up all his cache. 💸",
      "How many programmers does it take to change a light bulb?\nNone — that's a hardware problem. 💡",
      "I would tell you a UDP joke...\nbut you might not get it. 📦",
      "There are 10 types of people in the world:\nThose who understand binary and those who don't. 🤓",
      "Why do Java developers wear glasses?\nBecause they don't C#. 👓",
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  },

  quote: () => {
    const quotes = [
      '"First, solve the problem. Then, write the code."\n  — John Johnson',
      '"Any fool can write code that a computer can understand.\n  Good programmers write code that humans can understand."\n  — Martin Fowler',
      '"Make it work, make it right, make it fast."\n  — Kent Beck',
      '"Simplicity is the soul of efficiency."\n  — Austin Freeman',
      '"The best code is no code at all."\n  — Jeff Atwood',
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  },

  coffee: () => `
        ( (
         ) )
      ........
      |      |]
      \\      /
       \`----'

  Brewing ideas, one cup at a time. ☕`,

  ascii: () => `
  ██████╗ ██╗████████╗██╗███╗   ██╗██████╗ ███████╗██████╗
  ██╔══██╗██║╚══██╔══╝██║████╗  ██║██╔══██╗██╔════╝██╔══██╗
  ██████╔╝██║   ██║   ██║██╔██╗ ██║██║  ██║█████╗  ██████╔╝
  ██╔══██╗██║   ██║   ██║██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗
  ██║  ██║██║   ██║   ██║██║ ╚████║██████╔╝███████╗██║  ██║
  ╚═╝  ╚═╝╚═╝   ╚═╝   ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝`,

  banner: () => `
  ██████╗ ██╗████████╗██╗███╗   ██╗██████╗ ███████╗██████╗
  ██╔══██╗██║╚══██╔══╝██║████╗  ██║██╔══██╗██╔════╝██╔══██╗
  ██████╔╝██║   ██║   ██║██╔██╗ ██║██║  ██║█████╗  ██████╔╝
  ██╔══██╗██║   ██║   ██║██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗
  ██║  ██║██║   ██║   ██║██║ ╚████║██████╔╝███████╗██║  ██║
  ╚═╝  ╚═╝╚═╝   ╚═╝   ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝

  Backend Developer · Flutter · Python · APIs
  Type 'help' to see all available commands.`,

  hack: () => `Initializing hack sequence...
[████████████████████] 100%
Access granted to: everything
Just kidding. I'm a backend dev, not a hacker. 😄
(although I did place 3rd in a CTF... 👀)`,

  matrix: () => "__MATRIX__",
  snake: () => "__SNAKE__",

  // ── Help & Meta ────────────────────────────────────────────────────────
  help: () => `Available Commands
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Portfolio
    whoami [-v]         who is this person?
    about               background & intro
    skills [cat]        tech stack by category
    projects [name]     project list or details
    achievements        awards & milestones
    contact             get in touch
    resume              open resume PDF
    availability        open to work status
    now                 what I'm up to
    blog [slug]         read blog posts
    testimonials        what colleagues say

  Filesystem
    ls [section]        list portfolio sections
    cat <section>       read a section like a file
    cd <section>        navigate to a section
    pwd                 show current location

  Utility
    date                current date & time
    time                current time
    echo <text>         print text
    open <shortcut>     open linkedin/github/email/resume
    ping [host]         ping something
    weather [city]      fetch current weather
    history             command history
    man <cmd>           read command manual
    theme <name>        switch color theme (dracula/tokyo/catppuccin/nord/green/amber)
    clear               clear terminal

  Fun
    joke                random dev joke
    quote               programming wisdom
    fortune             fortune cookie
    coffee              ☕
    ascii               ASCII name art
    hack                hack the planet
    matrix              enter the Matrix
    snake               play Snake
    iam <name>          greet yourself
    sudo hire me        make the right call
    sudo rm -rf /       don't`,

  clear: () => "__CLEAR__",
};

export const GREETING = `
  ██████╗ ██╗████████╗██╗███╗   ██╗██████╗ ███████╗██████╗
  ██╔══██╗██║╚══██╔══╝██║████╗  ██║██╔══██╗██╔════╝██╔══██╗
  ██████╔╝██║   ██║   ██║██╔██╗ ██║██║  ██║█████╗  ██████╔╝
  ██╔══██╗██║   ██║   ██║██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗
  ██║  ██║██║   ██║   ██║██║ ╚████║██████╔╝███████╗██║  ██║
  ╚═╝  ╚═╝╚═╝   ╚═╝   ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝

  Backend Developer · Flutter · Python · APIs
  Type 'help' to see all available commands.`;

export function processInput(input) {
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (trimmed.toLowerCase() === "history") return "__HISTORY__";

  const lower = trimmed.toLowerCase();
  if (COMMANDS[lower]) return COMMANDS[lower]([]);

  const [cmd, ...args] = trimmed.split(/\s+/);
  const handler = COMMANDS[cmd.toLowerCase()];
  if (!handler)
    return `Command not found: '${cmd}'. Type 'help' for available commands.`;
  return handler(args);
}
