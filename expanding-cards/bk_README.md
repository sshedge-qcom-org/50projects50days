# Expanding Cards

<!--
=======================================================================
  PROJECT VARIABLES — fill this block when creating a new project README
=======================================================================
  Project name & number  : Expanding Cards — 01
  Difficulty             : Beginner
  Estimated time         : 45–60 minutes
  CORE concepts          : Flexbox, CSS transitions, DOM events, classList API
  Secondary concepts     : Semantic HTML, media queries, CSS class-based state,
                           separation of concerns, position: absolute
  Web APIs / browser     : None
  Async involved?        : No
  Real-world use cases   : Travel destination galleries, e-commerce product
                           spotlights, portfolio showcases, marketing hero
                           sections, film / music feature cards
  Recommended next       : Progress Steps (02), FAQ Collapse (12),
                           Image Carousel (35), Drag N Drop (21),
                           Animated Navigation (14)
  Known a11y gaps        : div panels not keyboard-focusable; no ARIA roles;
                           no visible focus styles
=======================================================================
-->

<!-- TEMPLATE NOTES
     PROJECT-SPECIFIC: Title, metadata table (Section 1), overview (2), build
     guide stages (8), code walkthrough (9), challenges (12), self-check
     questions (13), key takeaways (15), next projects (16), appendix (17).
     REUSABLE BOILERPLATE STRUCTURE (swap values per project): Mental Model (3),
     Learning Objectives (4), Prerequisites (5), Project Structure (6),
     How to Run (7), Accessibility Notes (10), Common Mistakes (11),
     Further Reading (14). -->

## 1. Project Information

<!-- REUSABLE table structure; PROJECT-SPECIFIC values -->

| Item | Value |
|------|-------|
| Project | Expanding Cards — 01 |
| Difficulty | Beginner |
| Estimated Time | 45–60 minutes |
| Technologies | HTML, CSS, JavaScript |
| Core Concepts | Flexbox, CSS Transitions, DOM Events, classList API |
| Secondary Concepts | Semantic HTML, media queries, CSS class-based state, position: absolute |
| Browser APIs | None |
| Async | No |
| Accessibility Level | Basic |
| Mobile Friendly | Yes |

---

## 2. Project Overview

<!-- PROJECT-SPECIFIC -->

Expanding Cards is an interactive UI panel row. Five image panels sit side-by-side; clicking any panel causes it to smoothly grow wide and reveal a caption, while every other panel shrinks back. Click a different panel and the effect transfers to it.

![Five landscape image panels in a row; the leftmost panel is wide and shows a caption reading "Explore The World", the other four panels are narrow strips](./assets/screenshot.png)

> **Image note:** Store your screenshot as `assets/screenshot.png`. Write alt text that describes what is *visible* — a screen reader user should understand what is shown without seeing the image.

**What problem does this pattern solve?**
Designers often need to show multiple items in a fixed horizontal space without hiding any of them. Expanding cards let users explore each item while keeping all options visible — no scroll, no modal, no extra page.

**Real-world applications:**
- Travel destination galleries
- E-commerce product spotlights
- Portfolio piece showcases
- Marketing hero sections
- Film or music feature cards

---

## 3. Mental Model

<!-- REUSABLE — update project-specific column values -->

Every web page is built from three layers:

| Layer | Technology | Job in this project |
|-------|-----------|---------------------|
| **Structure** | HTML | Defines the panels and captions |
| **Appearance** | CSS | Sizes, positions, colours, and animates the panels |
| **Behaviour** | JavaScript | Listens for clicks and swaps CSS classes |

Think of it like a theatre production: HTML is the **stage and props** (what exists), CSS is the **lighting and costumes** (how it looks), JavaScript is the **stage manager** (responds to cues and changes the scene).

In this project JavaScript does almost nothing visual by itself. It adds and removes a single CSS class. CSS handles every frame of the animation. This separation of concerns is a core principle of front-end development: each layer does what it is best at.

---

## 4. Learning Objectives

<!-- REUSABLE structure (Core / Secondary split); PROJECT-SPECIFIC concept list -->

### Core concepts

These are the ideas this project is *built around*. You will not just encounter them — you will depend on them to make the project work.

- **Flexbox** — distributing proportional space between elements in a row
- **CSS transitions** — animating property changes smoothly without any JavaScript
- **DOM events** — detecting user actions (clicks) and running code in response
- **`classList` API** — adding, removing, and checking CSS classes from JavaScript

### Secondary concepts

You will use these throughout the build, but they are not the main focus. They support the core mechanics above.

- **Semantic HTML** — using tags that describe meaning, not just appearance
- **`position: absolute`** — pinning the caption precisely inside the panel
- **CSS class-based state** — a CSS class as a flag that represents "which panel is active"
- **Media queries** — adjusting the layout for small screens
- **Separation of concerns** — HTML owns structure, CSS owns appearance, JS owns behaviour

---

## 5. Prerequisites

<!-- REUSABLE structure; PROJECT-SPECIFIC concept list -->

You do not need to be an expert, but you should have seen these concepts before.

<details>
<summary>Click to expand — Prerequisites with definitions and examples</summary>

### HTML

| Concept | Definition | Why it is needed here |
|---------|-----------|----------------------|
| Document structure | `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>` | Every HTML file needs this skeleton |
| `<div>` | A generic container element | Wraps the panel row and each individual panel |
| `<h3>` | A third-level heading | The caption text inside each panel |
| `class` attribute | A label on an element used by CSS and JS | `class="panel"` targets all panels; `class="panel active"` marks the expanded one |
| Inline `style` | A style attribute directly on a tag | Each panel sets its own `background-image` this way |

### CSS

| Concept | Definition | Why it is needed here |
|---------|-----------|----------------------|
| Selectors | `.panel`, `.panel.active` — choose which elements a rule applies to | Style all panels with `.panel`; override the active one with `.panel.active` |
| `display: flex` | Activates Flexbox on a container | Makes the panels line up in a row |
| `flex` property | Sets how much space a flex item claims | Controls how wide each panel is |
| `transition` | Smoothly animates a property change over time | Creates the expanding slide animation |
| `opacity` | 0 = invisible, 1 = fully visible | Hides and reveals the caption |
| `position: absolute` | Places an element at exact coordinates, outside normal flow | Pins the caption to the panel's bottom-left corner |

#### Tiny Flexbox example
```css
.container {
  display: flex; /* children line up in a row */
}
.item {
  flex: 1; /* each child claims equal space */
}
.item.wide {
  flex: 3; /* this child claims 3× more space than the others */
}
```

### JavaScript

| Concept | Definition | Why it is needed here |
|---------|-----------|----------------------|
| `const` | Declares a variable that cannot be reassigned | Store the panels NodeList |
| `querySelectorAll` | Returns all elements matching a CSS selector | Gets every `.panel` at once |
| `forEach` | Runs a function once per item in a list | Attaches a click listener to each panel |
| Arrow function `() => {}` | A short way to write a function | Used inside `forEach` and `addEventListener` |
| `addEventListener` | Runs code when an event fires | Detects panel clicks |
| `classList.add` / `.remove` | Adds or removes a CSS class on an element | Toggles the `active` state |

#### Tiny event listener example
```js
const btn = document.querySelector('#myButton')
btn.addEventListener('click', () => {
  console.log('Button clicked!')
})
```

</details>

---

## 6. Project Structure

<!-- REUSABLE structure; PROJECT-SPECIFIC file list -->

```text
expanding-cards/
├── index.html    ← HTML: the panels, captions, and file links
├── style.css     ← CSS: all visual styling and the expansion animation
├── script.js     ← JS: click handler that swaps the active class
├── assets/       ← README screenshots and any local images
└── README.md     ← This file
```

Each file has exactly **one responsibility**. This keeps debugging straightforward: if it looks wrong, open `style.css`; if it does not respond to clicks, open `script.js`.

---

## 7. How to Run

<!-- REUSABLE -->

This project runs entirely in a browser — no server, no database, no build step.

**Option 1 — Open directly**
1. Navigate to `expanding-cards/` in your file explorer
2. Double-click `index.html`

**Option 2 — VS Code Live Server (recommended)**
1. Open the `expanding-cards/` folder in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. The browser auto-refreshes whenever you save a file

> **Why no backend?** HTML, CSS, and JavaScript all execute inside the browser. Nothing needs to be compiled, and there is no server to start. The browser is both the runtime and the renderer.

---

## 8. Step-by-Step Build Guide

<!-- PROJECT-SPECIFIC -->

> **Before you start:** Create three empty files — `index.html`, `style.css`, `script.js` — inside a new folder called `expanding-cards`.

Work through each stage in order. Only add code for the current stage — do not jump ahead.

---

### Stage 1 — HTML Skeleton

**Goal:** Build the page structure with one working panel before adding any others.

#### What is semantic HTML?

Semantic HTML means choosing tags that describe the *meaning* of content. A `<div>` is a generic container — useful when no more specific tag fits. An `<h3>` tells the browser and screen readers "this is a third-level heading." Using meaningful tags makes your code readable and accessible.

#### Why structure first?

CSS and JavaScript can only operate on elements that exist in the HTML. Structure is the foundation — build it first, style it second, wire up behaviour last.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <!-- Tells mobile browsers to use the device's real width, not a zoomed-out desktop view -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Expanding Cards</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <div class="container">

    <!-- One panel to start — add more once this one works -->
    <div class="panel active"
         style="background-image: url('https://images.unsplash.com/photo-1558979158-65a1eaa08691')">
      <h3>Explore The World</h3>
    </div>

  </div>

  <!-- Script at the bottom: the HTML panels must exist before JS tries to find them -->
  <script src="script.js"></script>
</body>
</html>
```

**What each part does:**
- `lang="en"` — tells screen readers which language to expect
- `class="container"` — the CSS hook for the Flexbox row
- `class="panel active"` — `panel` applies common styles; `active` marks the expanded state
- `style="background-image:..."` — each panel sets its own image directly in HTML
- `<script>` at the bottom — the DOM (JavaScript's map of the page) must be fully built before JS runs

#### ✅ What You Should See
A plain page with a heading. No image, no layout. That is correct — styling comes in the next stage.

#### ❓ Pause and Think
Why is the `<script>` tag placed at the *bottom* of `<body>` rather than inside `<head>`?

#### 🧪 Try It Yourself
Add four more `.panel` divs below the first. Give each its own `background-image` URL and a unique `<h3>` caption. Do not add the `active` class to any of the new ones.

---

### Stage 2 — Flexbox Layout

**Goal:** Make the panels sit in a horizontal row and fill the screen.

#### What is Flexbox?

Flexbox is a CSS layout system. Think of it as **a row of adjustable-width seats on a bus**. The `.container` is the bus. Each `.panel` is a seat. Flexbox decides how wide each seat is.

You activate it by adding `display: flex` to the *parent* container. Its direct children become **flex items** automatically — no extra code needed on the children.

```css
/* style.css */

* {
  box-sizing: border-box; /* padding and border are counted inside an element's width */
}

body {
  display: flex;
  justify-content: center; /* centres the container left-to-right */
  align-items: center;     /* centres the container top-to-bottom */
  height: 100vh;           /* vh = viewport height — fills the full visible screen */
  margin: 0;
  overflow: hidden;        /* prevents scrollbars appearing during the animation */
}

.container {
  display: flex;  /* panels line up side-by-side in a row */
  width: 90vw;    /* vw = viewport width — 90% of the screen width */
}

.panel {
  background-size: cover;      /* image scales to fill the panel without distortion */
  background-position: center; /* focuses on the centre of the image */
  height: 80vh;
  border-radius: 50px;
  cursor: pointer;  /* shows a hand cursor — signals the element is clickable */
  flex: 0.5;        /* each panel claims a small, equal share of the row */
  margin: 10px;
}
```

#### Why `flex: 0.5` and not `flex: 1`?

`flex` is a *proportion*, not a pixel value. Five panels at `flex: 0.5` each take an equal fifth of the available space — identical to `flex: 1`. The value is kept small because the active panel will later use `flex: 5`, creating a **10:1 ratio** between expanded and collapsed. Starting at 0.5 just makes the collapsed panels narrower and more dramatic.

#### ✅ What You Should See
Five panels in a row, all equal width, each showing its background image. No animation yet.

#### ❓ Pause and Think
What would happen to the layout if you removed `display: flex` from `.container`?

#### 🧪 Try It Yourself
Change `border-radius` to `0`, then to `10px`. Notice how the shape changes the feel of the component. Revert to `50px` when done.

---

### Stage 3 — Expansion Effect

**Goal:** Make the active panel visibly wider than the others, and animate the change.

#### What is a CSS transition?

A transition tells the browser: when a property changes value, animate the change over time instead of snapping instantly. Without it, `flex: 0.5` → `flex: 5` would be a jarring jump. With it, the browser smoothly interpolates every frame between the two values.

```css
/* Add to .panel in style.css */
.panel {
  /* ...existing rules... */
  position: relative;        /* needed so the caption can be positioned inside it */
  transition: all 700ms ease-in; /* animate every changing property over 0.7 seconds */
}

/* The expanded panel */
.panel.active {
  flex: 5; /* 10× wider than a collapsed panel: 5 ÷ 0.5 = 10 */
}
```

Now add the caption. It should be invisible by default and fade in *after* the panel has finished expanding.

```css
.panel h3 {
  position: absolute; /* lifts the caption out of normal document flow */
  bottom: 20px;       /* pins it 20px from the bottom of the panel */
  left: 20px;
  color: white;
  font-size: 24px;
  margin: 0;
  opacity: 0;         /* hidden by default */
  /* fade in over 0.3s, but wait 0.4s before starting */
  transition: opacity 0.3s ease-in 0.4s;
}

.panel.active h3 {
  opacity: 1; /* fully visible when panel is active */
}
```

#### Why This Approach?

**Why not animate with JavaScript?**
JavaScript can animate things, but CSS transitions run on the GPU and are smoother. Let the browser do what it is optimised for.

**Why `position: absolute` on the caption?**
We want the caption to sit *over* the image at a fixed position, not push the image around. `position: absolute` removes the element from normal document flow and lets us pin it precisely using `bottom` and `left`.

**Why the 0.4 s delay on the caption?**
The panel expansion takes 700 ms. If the caption faded in immediately, it would appear while the panel is still narrow and the text would be clipped. The delay ensures the caption only becomes visible once there is enough space to show it comfortably.

#### ✅ What You Should See
The first panel (the one with `active` in your HTML) is visibly wider than the others. Its `<h3>` caption is visible. Clicking other panels does nothing yet — JavaScript comes next.

#### ❓ Pause and Think
If you move the `transition` rule from `.panel` to `.panel.active`, the animation only plays in one direction. Which direction — expanding or collapsing? Why?

#### 🧪 Try It Yourself
Change the transition duration from `700ms` to `200ms`, then to `2000ms`. Notice how the speed changes the feel. What value feels most natural?

---

### Stage 4 — JavaScript Behaviour

**Goal:** Make clicking any panel expand it and collapse all others.

#### What is event-driven programming?

Traditional code runs top-to-bottom: step A, then B, then C. Event-driven code is different — you write **handlers** that sit idle and run only when something happens (a click, a keypress, a timer). Most UI code is event-driven because users can do anything at any time.

#### What is the DOM?

The DOM (Document Object Model) is **JavaScript's live map of the page**. When the browser parses your HTML, it builds a tree of objects — one per element. JavaScript reads and modifies this tree. When the tree changes, the browser updates the visible page.

```js
// script.js

// querySelectorAll returns a NodeList of every element matching '.panel'
// It behaves like an array — you can loop over it with forEach
const panels = document.querySelectorAll('.panel')

// Attach a click listener to every panel
panels.forEach(panel => {
  panel.addEventListener('click', () => {
    removeActiveClasses()           // 1. clear active state from all panels
    panel.classList.add('active')   // 2. set active state on the clicked panel
  })
})

// Strip the active class from every panel
function removeActiveClasses() {
  panels.forEach(panel => {
    panel.classList.remove('active')
  })
}
```

#### Why remove all active classes first?

This enforces **exclusive state**: exactly one panel is active at a time. If you only added the class without clearing it elsewhere, clicking quickly could leave multiple panels in the active state simultaneously. Clearing first guarantees correctness.

#### `querySelector` vs `querySelectorAll`

| Method | Returns | Use when |
|--------|---------|----------|
| `querySelector('.panel')` | The **first** matching element | You only need a single element |
| `querySelectorAll('.panel')` | **All** matching elements as a NodeList | You need to work with every match |

#### ✅ What You Should See
Clicking any panel expands it, collapses the others, and fades in the caption. The 700 ms transition plays smoothly.

#### ❓ Pause and Think
What happens if you comment out the `removeActiveClasses()` call and click several panels in quick succession?

#### 🧪 Try It Yourself
Add `console.log(panel)` inside the click handler. Open DevTools (F12 → Console tab). Click each panel and observe what gets logged.

---

### Stage 5 — Responsive Design

**Goal:** Ensure the layout works correctly on small screens.

#### What is a media query?

A media query is a CSS rule that only activates when a condition is true. The most common condition is screen width: rules inside `@media (max-width: 480px)` only apply when the viewport is 480 px wide or less.

```css
/* style.css — add at the bottom */

@media (max-width: 480px) {
  .container {
    width: 100vw; /* use the full screen width — no 10% margin */
  }

  /* Hide the fourth and fifth panels on very small screens.
     Three panels side-by-side is still usable; five is too cramped. */
  .panel:nth-of-type(4),
  .panel:nth-of-type(5) {
    display: none;
  }
}
```

#### Why hide panels rather than stacking them?

This component is designed around horizontal interaction. Stacking five tall panels vertically on a phone would produce a very long page and completely change the interaction model. Hiding the last two panels is a pragmatic compromise — a production app would invest in a fully separate mobile design.

#### ✅ What You Should See
Open DevTools → Toggle device toolbar (Ctrl+Shift+M or Cmd+Shift+M). Set the width to 375 px. Panels 4 and 5 disappear; the remaining three panels share the full width.

#### ❓ Pause and Think
Why is the breakpoint at `480px` and not `768px`? What screens fall into each range?

#### 🧪 Try It Yourself
Change `display: none` to `opacity: 0`. The panels become invisible but still occupy space. What does this reveal about the difference between `display: none` and `opacity: 0`?

---

## 9. How It Works (Code Walkthrough)

<!-- PROJECT-SPECIFIC -->

The entire effect is driven by a **single CSS class swap**. Here is the complete sequence from click to expanded panel:

```text
User clicks a panel
       ↓
Event listener fires (script.js)
       ↓
removeActiveClasses() — removes .active from all panels
       ↓
panel.classList.add('active') — adds .active to the clicked panel
       ↓
CSS sees .panel.active { flex: 5 } — recalculates Flexbox proportions
       ↓
transition: all 700ms ease-in — animates flex from 0.5 → 5
       ↓
After a 400ms delay, .panel.active h3 { opacity: 1 } fades the caption in
```

**State management in plain terms:**
The `active` class *is* the state. No variable tracks which panel is open. At any moment you can open DevTools, inspect the DOM, and see exactly which panel is active — it is the one with the `active` class. This is a simple, powerful pattern: **CSS classes as state flags**. Tabs, accordions, dropdown menus, and modal dialogs all use a variation of this same idea.

---

## 10. Accessibility Notes

<!-- REUSABLE structure; PROJECT-SPECIFIC gaps -->

The current implementation works with a mouse but has gaps for other input methods:

- **No keyboard access** — `<div>` elements do not receive keyboard focus or respond to `Enter`/`Space` by default. A keyboard-only user cannot activate any panel.
- **No ARIA roles** — screen readers do not know these `<div>` elements are interactive.
- **No visible focus styles** — there is no visual indicator of which element is focused.

**Minimal improvements to add:**
1. `tabindex="0"` on each panel — makes it focusable via Tab key
2. `role="button"` on each panel — tells screen readers it is interactive
3. A `keydown` listener for `Enter` and `Space` alongside the existing `click` listener
4. A CSS `:focus` rule (e.g. `outline: 2px solid white`) for visible keyboard focus

These are left as exercises in Section 12.

---

## 11. Common Mistakes & Debugging

<!-- REUSABLE structure; PROJECT-SPECIFIC symptoms -->

<details>
<summary>Click to expand — common mistakes, symptoms, and fixes</summary>

### 1. Clicking does nothing

**Symptom:** No panel expands on click.
**Cause:** The JS selector does not match the HTML class name, or the script ran before the DOM was ready.
**Fix:** Open DevTools Console (F12). Type `document.querySelectorAll('.panel')`. If it returns `NodeList(0)`, the selector is wrong — double-check that your HTML uses exactly `class="panel"`.

---

### 2. Multiple panels expand at once

**Symptom:** Clicking accumulates active panels.
**Cause:** `removeActiveClasses()` was not called, or is being called on a different collection.
**Fix:** Add `console.log('removing')` inside `removeActiveClasses()`. If it never logs, the function is not being called.

---

### 3. Caption never appears

**Symptom:** Panel expands but the `<h3>` text stays invisible.
**Cause:** The `.panel.active h3` rule is missing, or a more specific rule is overriding it.
**Fix:** In DevTools, click the active panel, select the `<h3>` element. In the Styles panel, check whether `opacity: 1` appears. If the rule is present but crossed out, a specificity conflict is overriding it.

---

### 4. Animation snaps — no smooth transition

**Symptom:** Panels jump instantly instead of sliding.
**Cause:** The `transition` rule is missing from `.panel`, or it was accidentally placed on `.panel.active` only.
**Fix:** Confirm `transition: all 700ms ease-in` is on `.panel` (the default state), not only on `.panel.active`. The transition must exist on the element *before* the change occurs for it to animate in both directions.

---

### 5. Images not showing

**Symptom:** Panels show a background colour but no image.
**Cause:** The `background-image` URL is broken or blocked.
**Fix:** Open DevTools → Network tab → reload the page. Look for any image requests with a red status. If the URL returns a 404, the image address is wrong.

---

### 6. Responsive breakpoint not working

**Symptom:** Panels 4 and 5 still appear at narrow widths.
**Cause:** Media query syntax error, or the viewport meta tag is missing.
**Fix:** Check that `<meta name="viewport" ...>` is in `<head>`. Validate the `@media` syntax. Use DevTools device toolbar — resizing the browser window alone can be unreliable for testing breakpoints.

</details>

---

## 12. Challenges & Extensions

<!-- PROJECT-SPECIFIC -->

Work through these in order — each builds on the skills from the previous one:

1. **Keyboard support** — Add `tabindex="0"` and `role="button"` to each panel. Add a `keydown` listener that triggers expansion when `Enter` or `Space` is pressed.

2. **Auto-rotate** — Use `setInterval` to cycle through panels automatically every 3 seconds. Pause rotation when the user hovers over the `.container`.

3. **Data-driven panels** — Define a JavaScript array of objects, each with `image` and `caption` properties. Write a function that creates and inserts panels from this array, so the HTML no longer hard-codes any panel content.

4. **Richer captions** — Add a `<p>` sub-description below each `<h3>`. Animate it in with a slightly longer delay than the title so it appears second.

5. **`localStorage` memory** — Save the index of the last-clicked panel to `localStorage`. When the page loads, read this value and open the corresponding panel automatically.

6. **Vertical layout** — Add a toggle button that switches the container from `flex-direction: row` to `flex-direction: column`. Rethink how the expansion works on the vertical axis.

7. **`@keyframes` caption animation** — Replace the opacity transition on the `<h3>` with a `@keyframes` animation that slides the text up from below and fades it in simultaneously.

8. **Web Component** — Wrap the whole component in a Custom Element (`class ExpandingCards extends HTMLElement`) so it can be reused anywhere with a single `<expanding-cards>` tag.

---

## 13. Self-Check Questions

<!-- REUSABLE structure; PROJECT-SPECIFIC questions -->

Answer these without looking at the code first:

1. Why does swapping a CSS class change the visual appearance without JavaScript directly touching any style property?
2. The `transition` rule is on `.panel`, not on `.panel.active`. Why does the animation play in *both* directions — expanding and collapsing?
3. Could you achieve the same expanding effect without Flexbox? What CSS approach might you use instead, and what would be harder about it?
4. If you added a sixth panel in HTML without changing `script.js` at all, would it work automatically? Why?
5. Why is the caption fade-in delayed by 0.4 seconds? What would the user experience if the delay were 0?

---

## 14. Further Reading

<!-- REUSABLE -->

| Topic | Resource |
|-------|----------|
| Flexbox — complete guide | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox |
| CSS `transition` | https://developer.mozilla.org/en-US/docs/Web/CSS/transition |
| `addEventListener` | https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener |
| `querySelectorAll` | https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll |
| `classList` API | https://developer.mozilla.org/en-US/docs/Web/API/Element/classList |
| Accessibility basics | https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/What_is_accessibility |

---

## 15. Key Takeaways

<!-- REUSABLE — rephrase per project -->

- **CSS animates; JS manages state.** JavaScript only adds and removes a class. CSS transitions handle every frame of the animation. This split keeps both files small and each one focused.
- **`flex` is proportional, not absolute.** A panel with `flex: 5` is ten times wider than one at `flex: 0.5` because Flexbox distributes space by ratio, not pixels.
- **Transitions belong on the default state.** The animation plays in both directions because `transition` is on `.panel`. If it were only on `.panel.active`, the collapse would snap.
- **Exclusive state is a universal UI pattern.** Tabs, accordions, carousels, and menus all follow the same shape: clear everything, then activate one. Learn it here; recognise it everywhere.
- **Separation of concerns scales.** A project where CSS owns appearance and JS owns logic is far easier to debug and extend than one where JS writes inline styles.

---

## 16. Recommended Next Projects

<!-- REUSABLE structure; PROJECT-SPECIFIC suggestions -->

| Project | New concepts introduced |
|---------|------------------------|
| **Progress Steps** (02) | Multiple active classes, sequential logic, button state |
| **FAQ Collapse** (12) | Toggle behaviour — open and close the same element; sibling targeting |
| **Image Carousel** (35) | Index tracking, wrap-around logic, `transform: translateX` |
| **Drag N Drop** (21) | Mouse events (`dragstart`, `dragover`, `drop`), data transfer API |
| **Animated Navigation** (14) | `transform: rotate`, combined multi-property transitions, overlay patterns |

---

## 17. Appendix — Reference Solution

<!-- PROJECT-SPECIFIC -->

> **Attempt the project yourself before reading this section.**
> Looking at a complete solution before building removes most of the learning. Use this only to verify your finished work or to become unstuck after a genuine effort.

<details>
<summary>Click to reveal — complete reference files</summary>

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Muli&display=swap" />
  <link rel="stylesheet" href="style.css" />
  <title>Expanding Cards</title>
</head>
<body>
  <div class="container">
    <div class="panel active"
         style="background-image: url('https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')">
      <h3>Explore The World</h3>
    </div>
    <div class="panel"
         style="background-image: url('https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')">
      <h3>Wild Forest</h3>
    </div>
    <div class="panel"
         style="background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1353&q=80')">
      <h3>Sunny Beach</h3>
    </div>
    <div class="panel"
         style="background-image: url('https://images.unsplash.com/photo-1551009175-8a68da93d5f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80')">
      <h3>City on Winter</h3>
    </div>
    <div class="panel"
         style="background-image: url('https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')">
      <h3>Mountains - Clouds</h3>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>
```

### style.css

```css
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

* {
  box-sizing: border-box;
}

body {
  font-family: 'Muli', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.container {
  display: flex;
  width: 90vw;
}

.panel {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 80vh;
  border-radius: 50px;
  color: #fff;
  cursor: pointer;
  flex: 0.5;
  margin: 10px;
  position: relative;
  transition: all 700ms ease-in;
}

.panel h3 {
  font-size: 24px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  margin: 0;
  opacity: 0;
  transition: opacity 0.3s ease-in 0.4s;
}

.panel.active {
  flex: 5;
}

.panel.active h3 {
  opacity: 1;
}

@media (max-width: 480px) {
  .container {
    width: 100vw;
  }

  .panel:nth-of-type(4),
  .panel:nth-of-type(5) {
    display: none;
  }
}
```

### script.js

```js
const panels = document.querySelectorAll('.panel')

panels.forEach(panel => {
  panel.addEventListener('click', () => {
    removeActiveClasses()
    panel.classList.add('active')
  })
})

function removeActiveClasses() {
  panels.forEach(panel => {
    panel.classList.remove('active')
  })
}
```

</details>
