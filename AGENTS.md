# AGENTS.md — idle-counter

## Project Overview
`idle-counter` is a simple idle browser game, currently in initial setup. No source files exist yet — only the project scaffold.

## Tech Stack (as configured)
- **IDE**: IntelliJ IDEA Ultimate (`idle-counter.iml`, module type `JAVA_MODULE`)
- **Language**: Kotlin is configured (`kotlin-language-version-configured: true` in `.idea/workspace.xml`); Java is also available via the inherited JDK
- **Platform**: Browser-targeted (game is described as an "idle browser game")
- **Build output**: `.idea/misc.xml` points to `$PROJECT_DIR$/out` as the compiler output directory — no build tool (Gradle/Maven/npm) has been added yet

## Repository Structure
```
idle-counter/
├── README.md          # Minimal — just title and one-line description
└── .idea/             # IntelliJ project files (committed; workspace.xml is gitignored)
```

## Development Status
This project has a single "Initial commit." There are **no source directories, no build scripts, and no dependencies** defined yet. The first meaningful task for any agent is likely to scaffold the project structure.

## Key Decisions Still Open
- **Build tool**: Gradle (Kotlin DSL preferred for Kotlin projects) vs. Maven vs. plain npm/Vite if going pure frontend
- **Kotlin target**: Kotlin/JS (browser) vs. a JS/TS frontend with a JVM backend
- **Game loop approach**: `requestAnimationFrame`-based loop, interval ticks, or a reactive/state-machine model

## Conventions to Follow When Adding Code
- Match the chosen language's idiomatic style (e.g., Kotlin data classes for game state, extension functions over utility classes)
- Keep game state serializable (JSON-compatible) to support save/load from `localStorage`
- Prefix source roots as `src/main` (JVM convention) or `src/` (JS convention) — align with whatever build tool is introduced first

## Suggested First Steps for Agents
1. Add a `build.gradle.kts` (or `package.json`) to establish the build system before writing any source
2. Create a `src/` directory with an entry point appropriate to the chosen target
3. Update `README.md` with setup and run instructions once a build tool is chosen

