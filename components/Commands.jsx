export const COMMANDS = {
    // ── Greet ──────────────────────────────────────────────────────────────
    iam: (args) => {
        if (!args.length) return "Usage: iam <name>";
        return `Hello, ${args.join(" ")}. Welcome to Ritinder's Portfolio Terminal!`;
    },

    // ── Core Portfolio ─────────────────────────────────────────────────────
    whoami: () => `Ritinder Singh
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Backend Developer · Flutter Engineer · API Architect
📍 India  |  Open to opportunities`,

    about: () => `About Me
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Backend Developer specializing in scalable APIs and cross-platform
solutions. I work with Python (FastAPI), Flutter, and JavaScript to
build real-time systems and CRM integrations.

Passionate about clean architecture, developer tooling, and
solving hard problems with elegant solutions.

Type 'experience', 'projects', or 'skills' to learn more.`,

    skills: (args) => {
        const categories = {
            languages:  `Languages
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Dart · JavaScript · Python · C++ · SQL · Bash`,

            backend:    `Backend & APIs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Python (FastAPI) · Node.js · Express.js
  RESTful APIs · WebSocket · n8n
  Event-driven Architecture`,

            frontend:   `Frontend
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Flutter · React.js · HTML5 · CSS3`,

            databases:  `Databases
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  PostgreSQL · MySQL · Redis`,

            devops:     `DevOps
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

    experience: () => `Work Experience
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Junior Software Developer
Genius365.ai (Remote) · May 2025 – Jan 2026

  • Built API microservices with Dart & JavaScript
  • Integrated CRM platforms: HubSpot, Monday.com,
    Pylon, JobAdder, GoHighLevel
  • Optimized LLM-based transcript analysis workflows
    for candidate qualification & call disposition
  • Implemented CI/CD pipelines & automated testing
    frameworks, reducing manual testing effort`,

    education: () => `Education
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
B.Tech — Computer Science & Engineering
Chitkara University, Rajpura, Punjab
Graduated: August 2025`,

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
        window.open("/resume.pdf", "_blank");
        return `Opening resume... 📄
If it didn't open, download it from:
/resume.pdf`;
    },

    // ── Utility ────────────────────────────────────────────────────────────
    availability: () => `Availability
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✅  Open to full-time roles, freelance & collaborations
  📍  Remote-first · India-based
  📬  Reach out: for.ritindersingh@gmail.com`,

    now: () => `Currently
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🔨 Building: Portfolio terminal (meta, right?)
  📖 Learning: System design & distributed systems
  🎯 Exploring: Open-source contributions`,

    achievements: () => `Achievements
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🥉  HackersPrey CTF Competition — 3rd Place
      Cybersecurity challenge · March 2024`,

    // ── Fun / Easter Eggs ──────────────────────────────────────────────────
    "sudo hire me": () => `[sudo] password for recruiter: ••••••••
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅  Access granted.
    Best decision you'll make today.
    → for.ritindersingh@gmail.com`,

    joke: () => {
        const jokes = [
            "Why do programmers prefer dark mode?\nBecause light attracts bugs. 🐛",
            "A SQL query walks into a bar, walks up to two tables and asks...\n'Can I JOIN you?' 🍺",
            "Why did the developer go broke?\nBecause he used up all his cache. 💸",
            "How many programmers does it take to change a light bulb?\nNone — that's a hardware problem. 💡",
            "I would tell you a UDP joke...\nbut you might not get it. 📦",
            "There are 10 types of people in the world:\nThose who understand binary and those who don't. 🤓",
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

    // ── Navigation ─────────────────────────────────────────────────────────
    ls: (args) => {
        const section = args[0]?.toLowerCase();
        if (section === "projects") {
            return `projects/
  ├── whiteboard/   Real-Time Collaborative Whiteboard
  └── music/        Cross-Platform Music Player`;
        }
        return `portfolio/
  ├── about/
  ├── skills/
  ├── experience/
  ├── projects/
  ├── education/
  ├── achievements/
  ├── contact/
  └── resume.pdf`;
    },

    // ── Help & Meta ────────────────────────────────────────────────────────
    help: () => `Available Commands
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Portfolio
    whoami          who is this person?
    about           background & intro
    skills          tech stack (optional: skills <category>)
    experience      work history
    projects        project list (optional: projects <name>)
    education       academic background
    achievements    awards & milestones
    contact         get in touch
    resume          open resume PDF
    availability    open to work status
    now             what I'm currently up to

  Utility
    ls              list portfolio sections
    ls projects     list projects
    history         command history
    clear           clear the terminal
    banner          show the ASCII banner

  Fun
    joke            random dev joke
    quote           random programming quote
    coffee          ☕
    ascii           ASCII name art
    hack            hack the planet
    iam <name>      greet yourself
    sudo hire me    make the right call`,

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

export function processInput(input, commandHistory = []) {
    const trimmed = input.trim();
    if (!trimmed) return null;

    // handle 'history' dynamically via caller — return sentinel
    if (trimmed.toLowerCase() === "history") return "__HISTORY__";

    // support multi-word commands like "sudo hire me"
    const lower = trimmed.toLowerCase();
    if (COMMANDS[lower]) return COMMANDS[lower]([]);

    const [cmd, ...args] = trimmed.split(/\s+/);
    const handler = COMMANDS[cmd.toLowerCase()];
    if (!handler)
        return `Command not found: '${cmd}'. Type 'help' for available commands.`;
    return handler(args);
}
