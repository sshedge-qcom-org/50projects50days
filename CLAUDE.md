# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A local clone of the Traversy Media "50 Projects in 50 Days" course: 51 independent, vanilla HTML/CSS/JS front-end mini-projects, numbered 01–51 in the table in the root `README.md` alongside a link to each project's folder and its hosted live demo at 50projects50days.com.

## Running a project

There is no build system, package manager, or install step anywhere in this repo (no `package.json` at the root or in any project folder).

- Open `<project-folder>/index.html` directly in a browser, **or**
- Use the VS Code "Live Server" extension (right-click `index.html` → "Open with Live Server") for auto-reload on save.

No test runner or linter is configured. Don't assume npm scripts, test files, or lint configs exist — check before referencing them.

## Repository structure

Every project lives in its own top-level folder and is fully self-contained:

```
<project-folder>/
├── index.html   # markup
├── style.css    # styling/animation
└── script.js    # DOM logic
```

Nothing is shared across project folders — no shared components, utilities, or asset directories at the repo root. When adding a new project, copy `_project_starter_/` (a bare `index.html` wired to an empty `style.css`/`script.js`) rather than copying another project, then add a row to the table in the root `README.md`.

A handful of projects deviate from the standard 3-file layout — check before assuming all three files exist:
- `kinetic-loader/` has no `script.js` (pure CSS animation)
- `event-keycodes/` ships an extra `dark-style.css`
- `split-landing-page/` bundles local `.jpg` assets alongside its three files
- `custom-range-slider/` has a leftover `.vscode/settings.json`

## Technology stack

Vanilla HTML5, CSS3, and ES6+ JavaScript by default — no frameworks, no TypeScript, no preprocessors, no bundlers. Three projects are exceptions that pull in one library via a CDN `<script>` tag (not npm):
- `github-profiles` — axios, for the GitHub API
- `notes-app` — marked.js, to render markdown
- `simple-timer` — Tailwind CDN, for styling

Browser-API usage worth knowing before touching these projects:
- `fetch` + `async`/`await`: `dad-jokes`, `movie-app`, `pokedex`, `live-user-filter`
- `localStorage` persistence: `notes-app`, `todo-list`
- Canvas 2D API: `drawing-app`

## Root README.md

`README.md` is the course index: a table mapping each project number to its folder link and live demo, plus a "Project Guides" section for optional deeper per-project write-ups. Keep new rows consistent with the existing column format if you add a project.

The project/demo links in `README.md` point to `github.com/sshedge-qcom-org/50projects50days`, which differs from the configured git `origin` remote (`github.com/surajnetflix/50projects50days`) — confirm which is intended before treating them as interchangeable, e.g. when opening a PR.

The README also notes that only bug-fix PRs are accepted for the course code; stylistic or feature PRs are not being merged upstream.
