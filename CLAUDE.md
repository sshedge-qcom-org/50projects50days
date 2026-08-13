# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running Projects

No build system, no npm, no compilation. Every project runs directly in the browser:

- Open `<project-folder>/index.html` directly in a browser, or
- Use VS Code Live Server (right-click `index.html` → "Open with Live Server")

There are no dependencies to install.

## Repository Structure

51 standalone vanilla HTML/CSS/JS mini-projects from the Traversy Media "50 Projects in 50 Days" course. Each project is completely self-contained:

```
<project-folder>/
├── index.html   # all markup
├── style.css    # all styles and animations
└── script.js    # all DOM logic
```

No files are shared across projects. `_project_starter_/` is the blank template to copy when adding a new project.

## Technology Stack

- Pure HTML5, CSS3, ES6+ JavaScript — no frameworks, no TypeScript, no preprocessors
- External fonts via CSS `@import` from Google Fonts (per-project, not shared)
- Remote images via Unsplash CDN URLs
- Projects that fetch data use the native `fetch` API with `async/await`: `dad-jokes`, `github-profiles`, `movie-app`, `pokedex`, `live-user-filter`
- `notes-app` and `todo-list` use `localStorage` for persistence
- `drawing-app` uses the Canvas 2D API

## GOAL.md

`GOAL.md` is an AI system prompt — a template used to generate learning-focused per-project README files. It defines a 17-section README format, teaching philosophy, and anti-hallucination rules for an AI authoring assistant. It is not a project goal document.

To generate a README for a project, fill in the PROJECT VARIABLES block at the top of `GOAL.md` and pass the whole file as a prompt to an AI assistant.

## Project README Guides

Learning-focused build guides live at `<project-folder>/README.md`. One guide has been written so far (`expanding-cards`); the remaining 50 are pending.

**Process for generating a guide:**
1. Read the project's `index.html`, `style.css`, and `script.js`
2. Follow `GOAL.md` — fill its PROJECT VARIABLES block, then generate the 17-section README
3. Write the output to `<project-folder>/README.md`
4. Add a bullet under `## Project Guides` in the root `README.md`
5. Update the `Guide` column in the root README table with a relative link

**Key GOAL.md mandates (enforce these in every guide):**
- Three-layer HTML/CSS/JS Mental Model table (Section 3)
- Collapsible `<details>` prerequisites with HTML/CSS/JS sub-sections and tiny code examples
- Name JS paradigms explicitly: event-driven programming, the DOM, `querySelector` vs `querySelectorAll` comparison table
- "Why This Approach?" blocks comparing concrete alternatives (e.g. `classList.add` vs `className =`)
- Minimum 5 debugging mistakes in a collapsible `<details>` block
- Next-projects table with a "New Concepts Introduced" column (4–5 projects)

## Repository Remote

`https://github.com/sshedge-qcom-org/50projects50days.git`

All GitHub links in `README.md` use `sshedge-qcom-org/50projects50days` (not the upstream bradtraversy fork).
