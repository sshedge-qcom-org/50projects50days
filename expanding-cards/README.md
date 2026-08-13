# Expanding Cards

## 1. Project Information
<!-- REUSABLE: keep this section consistent across projects -->

| Item | Value |
|------|-------|
| Project | Expanding Cards — 01 |
| Difficulty | Beginner |
| Estimated Time | 45–60 minutes |
| Technologies | HTML5, CSS3, Vanilla JavaScript (ES6) |
| Core Concepts | CSS Flexbox, CSS transitions, DOM events, classList API |
| Secondary Concepts | Semantic HTML, media queries, CSS class-based state, `position: absolute` |
| Browser APIs | None |
| Async | No |
| Accessibility Level | Needs Improvement |
| Mobile Friendly | Partial (3 panels shown below 480px) |

---

## 2. Project Overview
<!-- PROJECT-SPECIFIC -->

Five full-height image panels sit side by side in a row. Clicking any panel smoothly expands it to take up most of the row while the others shrink back. A caption fades in at the bottom of the expanded panel.

![Five landscape image panels in a row; the leftmost panel is wide and shows a caption reading "Explore The World", the other four panels are narrow strips](./assets/screenshot.png)

**What problem does this pattern solve?**
Designers often need to show multiple items in a fixed horizontal space without hiding any. Expanding cards let users explore each item while keeping all options visible — no scroll, no modal, no extra page.

**Real-world applications:**
- Travel destination galleries
- E-commerce product spotlights
- Portfolio showcases
- Marketing hero sections
- Film or music feature cards

---

## 3. Mental Model
<!-- PROJECT-SPECIFIC -->

Every web page is built from three layers. Here is what each layer does in *this* project:

| Layer | Technology | Job in this project |
|-------|-----------|---------------------|
| **Structure** | HTML | Defines the panel row, each panel `<div>`, and the caption `<h3>` inside it |
| **Appearance** | CSS | Sizes the panels with Flexbox, sets the background photos, and animates the expansion with `transition` |
| **Behaviour** | JavaScript | Detects which panel was clicked and swaps the `active` CSS class |

Think of it like a theatre production: HTML is the **stage and props** (what exists), CSS is the **lighting and costumes** (how it looks at any moment), JavaScript is the **stage manager** (listens for cues and changes the scene).

JavaScript does almost nothing visual by itself in this project — it adds and removes a single CSS class. CSS handles every frame of the animation. This is **separation of concerns**: each layer does what it is best at. It keeps each file small, focused, and easy to debug.

---

## 4. Learning Objectives
<!-- PROJECT-SPECIFIC -->

### Core concepts
These are the ideas this project is *built around*:

- **Flexbox** — distributing proportional space between elements in a row
- **CSS transitions** — animating property changes smoothly without any JavaScript
- **DOM events** — detecting user actions (clicks) and running code in response
- **`classList` API** — adding and removing CSS classes from JavaScript to drive state

### Secondary concepts
These support the core mechanics:

- `position: absolute` — pinning the caption precisely inside a panel
- **CSS class-based state** — a CSS class as a flag representing "which panel is active"
- **Media queries** — adjusting the layout on small screens
- **Separation of concerns** — HTML owns structure, CSS owns appearance, JS owns behaviour

---

## 5. Prerequisites
<!-- REUSABLE structure; PROJECT-SPECIFIC concept list -->

<details>
<summary>Click to expand — Prerequisites with definitions and examples</summary>

### HTML

| Concept | Definition | Why it is needed here |
|---------|-----------|----------------------|
| `<div>` | A generic container element | Wraps the panel row and each individual panel |
| `<h3>` | A third-level heading | The caption text inside each panel |
| `class` attribute | A label on an element used by CSS and JS | `class="panel"` targets all panels; `class="panel active"` marks the expanded one |
| Inline `style` | A style attribute directly on a tag | Each panel sets its own `background-image` this way |

### CSS

| Concept | Definition | Why it is needed here |
|---------|-----------|----------------------|
| `display: flex` | Activates Flexbox on a container | Makes the panels line up in a row |
| `flex` property | Sets how much space a flex item claims relative to its siblings | Controls how wide each panel is |
| `transition` | Smoothly animates a CSS property change over time | Creates the expanding slide animation |
| `opacity` | 0 = invisible, 1 = fully visible | Hides and reveals the caption |
| `position: absolute` | Places an element at exact coordinates outside normal document flow | Pins the caption to the panel's bottom-left corner |

#### Tiny Flexbox example
```css
.container {
  display: flex;   /* children line up in a row */
}
.item {
  flex: 1;         /* each child claims an equal share of space */
}
.item.wide {
  flex: 3;         /* this child claims 3× more space than the others */
}
```

### JavaScript

| Concept | Definition | Why it is needed here |
|---------|-----------|----------------------|
| `querySelectorAll` | Returns all elements matching a CSS selector as a NodeList | Gets every `.panel` at once |
| `forEach` | Runs a function once per item in a list | Attaches a click listener to each panel |
| Arrow function `() => {}` | A concise way to write a function | Used inside `forEach` and `addEventListener` |
| `addEventListener` | Runs code when an event fires on an element | Detects panel clicks |
| `classList.add` / `.remove` | Adds or removes a single CSS class on an element | Toggles the `active` state without touching other classes |

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
├── index.html    ← the panels, captions, and background image URLs
├── style.css     ← all visual styling and the expansion animation
├── script.js     ← click handler that swaps the active class
├── assets/       ← README screenshot
│   └── screenshot.png
└── README.md     ← this guide
```

Each file has exactly **one responsibility**. If it looks wrong, open `style.css`. If it does not respond to clicks, open `script.js`.

---

## 7. How to Run
<!-- REUSABLE -->

**Option 1 — Open directly:**
1. Navigate to `expanding-cards/` in your file explorer
2. Double-click `index.html`

**Option 2 — VS Code Live Server (recommended):**
1. Open the `expanding-cards/` folder in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. The browser auto-refreshes whenever you save a file

> **Why no backend?** HTML, CSS, and JavaScript all execute inside the browser. Nothing needs to be compiled and there is no server to start. The browser is both the runtime and the renderer.

---

## 8. Step-by-Step Build Guide
<!-- PROJECT-SPECIFIC -->

> **Before you start:** Create three empty files — `index.html`, `style.css`, `script.js` — inside a new folder called `expanding-cards`.

---

### Stage 1 — HTML Structure

**Goal:** Build the page skeleton with five panels and captions.

**Why start with structure?**
CSS and JavaScript can only work on elements that already exist in the HTML. Build the skeleton first, style it second, wire up behaviour last.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="style.css" />
  <title>Expanding Cards</title>
</head>
<body>
  <div class="container">
    <div class="panel active">
      <h3>Explore The World</h3>
    </div>
    <div class="panel">
      <h3>Wild Forest</h3>
    </div>
    <div class="panel">
      <h3>Sunny Beach</h3>
    </div>
    <div class="panel">
      <h3>City on Winter</h3>
    </div>
    <div class="panel">
      <h3>Mountains - Clouds</h3>
    </div>
  </div>

  <!-- Script at the bottom so all panels exist before JS tries to find them -->
  <script src="script.js"></script>
</body>
</html>
```

The first panel has `active` so the page loads with a default expanded state. Background photos are added via inline `style` attributes once the structure is confirmed — see the Appendix for the full URLs.

### ✅ What You Should See
Five unstyled text blocks stacked vertically. No images, no layout. That is correct.

### ❓ Pause and Think
Why is `<script>` at the bottom of `<body>` and not inside `<head>`?

### 🧪 Try It Yourself
Move `<script>` to `<head>`, open the Console (F12), and add `console.log(document.querySelectorAll('.panel'))` to `script.js`. What does it log? Move `<script>` back to the bottom and check again.

---

### Stage 2 — Flexbox Layout

**Goal:** Place the panels side by side and divide space between them proportionally.

#### What is Flexbox?
Flexbox is a CSS layout system. Think of it as **a row of adjustable-width seats on a bus**. The `.container` is the bus. Each `.panel` is a seat. Adding `display: flex` to the container tells the bus to arrange its seats side by side. The `flex` property on each seat controls how much width it claims.

#### Why do we need it here?
Without Flexbox, panels stack vertically — that is the browser's default block layout. We need a horizontal row where one panel can claim far more space than the others.

#### Tiny Example
```css
.row   { display: flex; }
.item  { flex: 1; }   /* equal share */
.item.big { flex: 5; } /* 5× more space */
```

#### How it helps this project
Inactive panels get `flex: 0.5`. The active panel gets `flex: 5` — ten times the space of a collapsed neighbour. CSS calculates every pixel automatically.

```css
/* style.css */
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

* { box-sizing: border-box; }

body {
  font-family: 'Muli', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  overflow: hidden;
}

.container {
  display: flex;   /* panels go in a row */
  width: 90vw;
}

.panel {
  height: 80vh;
  border-radius: 50px;
  cursor: pointer;
  flex: 0.5;        /* default: narrow */
  margin: 10px;
  transition: all 700ms ease-in;  /* smooth size change in both directions */
}

.panel.active {
  flex: 5;          /* expanded: 10× wider than a collapsed panel */
}
```

### ✅ What You Should See
Five grey panels side by side. The first panel (with `active`) is visibly wider than the rest.

### ❓ Pause and Think
What would happen to the layout if you removed `display: flex` from `.container`?

### 🧪 Try It Yourself
Change `flex: 5` to `flex: 2`, then `flex: 10`. How does this ratio change the visual drama of the expansion?

---

### Stage 3 — Background Images and the Caption

**Goal:** Add the photos and make the caption visible only on the active panel.

Add `background-image` inline `style` attributes to each panel in `index.html` (Unsplash URLs are in the Appendix). Then extend `style.css`:

```css
.panel {
  /* add to the existing .panel rule */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;   /* so the caption can be positioned inside it */
  color: #fff;
}

.panel h3 {
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-size: 24px;
  margin: 0;
  opacity: 0;                       /* invisible by default */
}

.panel.active h3 {
  opacity: 1;
  transition: opacity 0.3s ease-in 0.4s;  /* fade in, but wait 0.4s first */
}
```

**Why the 0.4s delay?**
The panel takes 700ms to expand. If the caption fades in at the same time, it appears while the panel is still very narrow and the text is clipped. The delay lets the panel open most of the way first. Two animations sequenced with pure CSS — no JavaScript timer needed.

### ✅ What You Should See
Five photo panels. The first is wide with its caption visible. The other four are narrow and captionless.

### ❓ Pause and Think
The `transition` for panel width is on `.panel`, but the `transition` for caption opacity is on `.panel.active h3`. Why are they on different selectors?

### 🧪 Try It Yourself
Remove the `0.4s` delay from the caption transition. Click a different panel and watch the caption appear while the panel is still mid-expansion.

---

### Stage 4 — JavaScript: Event-Driven Programming

**Goal:** Detect which panel was clicked and respond to it.

#### What is event-driven programming?
Traditional code runs top-to-bottom: step A, then B, then C. UI code is different — you write **handlers** that sit idle until something happens. This is called **event-driven programming**. The reason: users can click anything at any time, in any order. There is no single sequence you can predict.

#### What is the DOM?
The DOM (Document Object Model) is **JavaScript's live map of the page**. When the browser parses your HTML, it builds a tree of objects — one per element. When you write `document.querySelectorAll('.panel')`, JavaScript searches that tree and returns every matching element.

#### `querySelector` vs `querySelectorAll`

| Method | Returns | Use when |
|--------|---------|----------|
| `querySelector('.panel')` | The **first** matching element only | You need exactly one element |
| `querySelectorAll('.panel')` | **All** matching elements as a NodeList | You need to work with every match |

```js
// script.js

const panels = document.querySelectorAll('.panel')  // all 5 panels

panels.forEach(panel => {
  panel.addEventListener('click', () => {
    console.log('clicked:', panel.querySelector('h3').innerText)
  })
})
```

### ✅ What You Should See
No visual change yet. Open DevTools → Console tab (F12). Click each panel — its caption text prints each time.

### ❓ Pause and Think
`querySelectorAll` returns a NodeList. Is a NodeList the same as an Array? Type `Array.isArray(document.querySelectorAll('.panel'))` in the Console to find out.

### 🧪 Try It Yourself
Try `panels.map(p => p)` in the Console. What error do you get? Now try `Array.from(panels).map(p => p)`. Why does this work?

---

### Stage 5 — JavaScript: State and the Toggle Pattern

**Goal:** Expand the clicked panel and collapse all others.

#### What is "state"?
State is the program's memory of what is currently happening. Here, the state is: *which panel is expanded right now?* We represent state as a CSS class — whichever panel has `active` is the expanded one. JavaScript updates it; CSS reacts to it automatically.

#### The "remove all, add one" pattern
This is one of the most reusable patterns in UI development. Tabs, accordions, dropdown menus, carousels, and navigation menus all use a version of it:

1. Remove the active state from **every** item (no exceptions)
2. Add the active state to **only** the one that was selected

Why remove all first? It guarantees exactly one item is active at a time, no matter how quickly the user clicks. It also scales: adding a sixth panel requires no logic change.

```js
const panels = document.querySelectorAll('.panel')

panels.forEach(panel => {
  panel.addEventListener('click', () => {
    removeActiveClasses()           // step 1: clear all
    panel.classList.add('active')   // step 2: mark only this one
  })
})

function removeActiveClasses() {
  panels.forEach(panel => {
    panel.classList.remove('active')
  })
}
```

#### Why This Approach?

**Why `classList.add` and not `panel.className = 'active'`?**

| Method | What it does | Problem |
|--------|-------------|---------|
| `panel.className = 'active'` | Replaces the **entire** class attribute | Destroys the `panel` class — all base styles are lost |
| `panel.classList.add('active')` | Adds `active` alongside existing classes | Safe — `panel` class is preserved |

**Why not track the active panel in a JavaScript variable?**
You could write `let activePanel = panels[0]` and update it on each click. But the DOM already stores this information — the panel with `active` is the active one. There is no need to duplicate that state in a variable. One source of truth is always better than two.

### ✅ What You Should See
Clicking any panel expands it smoothly and collapses the rest. Caption fades in after 0.4s.

### ❓ Pause and Think
What happens if you comment out `removeActiveClasses()` and click several panels in a row? How many panels end up expanded?

### 🧪 Try It Yourself
Add a check: if the clicked panel is *already* active, collapse all panels instead of re-expanding. Hint: `panel.classList.contains('active')` returns `true` or `false`.

---

### Stage 6 — Responsive Design

**Goal:** Improve usability on small screens.

Five panels in a row on a phone screen (≤480px) is too cramped. The fix: hide the 4th and 5th panels and use the full screen width.

```css
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

### ✅ What You Should See
In DevTools → device toolbar (Ctrl+Shift+M) → set width to 375px. Three panels fill the full screen width; panels 4 and 5 are gone.

### ❓ Pause and Think
Why `display: none` rather than `opacity: 0`? What is the difference in how each affects layout space?

### 🧪 Try It Yourself
Add a tablet breakpoint at `768px` that hides only the 5th panel, leaving four panels visible on tablets.

---

## 9. How It Works (Code Walkthrough)
<!-- PROJECT-SPECIFIC -->

The entire effect is driven by a single CSS class swap:

```
User clicks a panel
       │
       ▼
click event fires (script.js)
       │
       ▼
removeActiveClasses()
  → loops all 5 panels, removes 'active' from each
       │
       ▼
panel.classList.add('active')
  → only the clicked panel has 'active' now
       │
       ▼
CSS re-evaluates:
  .panel        → flex: 0.5  (base — all panels)
  .panel.active → flex: 5    (override — only active panel)
       │
       ▼
transition: all 700ms ease-in on .panel
  → smooth width animation plays for all panels simultaneously
       │
       ▼
After 0.4s delay:
  .panel.active h3 { opacity: 1 }
  transition: opacity 0.3s ease-in
  → caption fades in
```

**The key insight:** JavaScript never touches a single style property directly. It only sets a class. CSS reads that class and applies rules. This is why the code is so short — the browser's CSS engine does all the visual heavy lifting.

---

## 10. Accessibility Notes
<!-- PROJECT-SPECIFIC -->

| Area | Rating | Notes |
|------|--------|-------|
| Keyboard support | Needs Improvement | `<div>` panels are not keyboard-focusable. No `tabindex`, no `keydown` handler. |
| Focus visibility | Needs Improvement | No `:focus` style. A keyboard user has no visual indicator. |
| Semantic HTML | Partial | `<h3>` captions are meaningful, but `<div class="panel">` has no ARIA role — screen readers do not know it is interactive. |
| Image alt text | Needs Improvement | Background images are set via CSS — invisible to screen readers. No `aria-label` on panels. |
| Colour contrast | Good | White text on dark photographic backgrounds generally passes WCAG AA. |
| Motion sensitivity | Needs Improvement | No `prefers-reduced-motion` query. Transitions play for all users unconditionally. |
| Touch target size | Good | Panels are tall and wide — easy to tap. |

**Quick wins:**
- Add `tabindex="0"` to each `.panel` — makes it keyboard-focusable
- Add `role="button"` — tells screen readers the panel is interactive
- Add a `keydown` listener for `Enter` and `Space` alongside the click listener

**Intermediate:**
```css
@media (prefers-reduced-motion: reduce) {
  .panel,
  .panel.active h3 {
    transition: none;
  }
}
```

**Advanced:**
Set `aria-expanded="true"` on the active panel and `aria-expanded="false"` on all others, updated in JavaScript on every click — so screen reader users know which panel is expanded.

---

## 11. Common Mistakes & Debugging
<!-- PROJECT-SPECIFIC -->

<details>
<summary>Click to expand — common mistakes, symptoms, and fixes</summary>

### 1. Clicking does nothing

**Symptom:** No panel expands.
**Likely cause:** The JS selector doesn't match the HTML class, or the script ran before the DOM was ready.
**Fix:** Open Console (F12). Type `document.querySelectorAll('.panel')`. If it returns `NodeList(0)`, check the class name in your HTML exactly matches `'.panel'`.

---

### 2. Only the first panel responds to clicks

**Symptom:** Panel 1 works; panels 2–5 ignore clicks.
**Likely cause:** Used `querySelector` instead of `querySelectorAll` — gets only the first match.
**Fix:** Change to `querySelectorAll`. Confirm with `document.querySelectorAll('.panel').length` in the Console — should be 5.

---

### 3. Multiple panels expand simultaneously

**Symptom:** Clicking accumulates expanded panels.
**Likely cause:** `removeActiveClasses()` was not called, or called on a different variable.
**Fix:** Add `console.log('removing')` inside `removeActiveClasses`. If it never logs, the function isn't being called. Check the spelling and call site.

---

### 4. Caption never appears

**Symptom:** Panel expands but the `<h3>` stays invisible.
**Likely cause:** The `.panel.active h3` rule is missing, or a specificity conflict is overriding it.
**Fix:** DevTools → Elements → select the active panel → select `<h3>` → Styles tab. Check if `opacity: 1` is present but struck through (overridden). If missing entirely, the CSS rule wasn't added.

---

### 5. Animation snaps — no smooth transition

**Symptom:** Panels jump instantly instead of sliding.
**Likely cause:** `transition` is on `.panel.active` instead of `.panel`. The transition rule must exist *before* the change occurs to animate the expansion.
**Fix:** Move `transition: all 700ms ease-in` to the `.panel` base rule. If it's only on `.panel.active`, the expansion snaps open (no rule when `active` is added) but the collapse animates (rule present while `active` is removed).

---

### 6. Clicking a panel removes all its styles

**Symptom:** The clicked panel loses its background image, rounded corners — it looks completely unstyled.
**Likely cause:** Used `panel.className = 'active'` — this replaces the entire `class` attribute, destroying the `panel` class.
**Fix:** Always use `panel.classList.add('active')`. Check in Elements panel: bug state shows `class="active"`, correct state shows `class="panel active"`.

</details>

---

## 12. Challenges & Extensions
<!-- PROJECT-SPECIFIC -->

Work through these in order — each builds on the previous:

1. **Keyboard support** — add `tabindex="0"` and `role="button"` to each panel. Add a `keydown` listener that triggers the same expansion logic when `Enter` or `Space` is pressed.
2. **Deactivate on re-click** — if the user clicks the already-active panel, collapse all panels so none is expanded.
3. **Auto-rotate** — use `setInterval` to cycle through panels every 3 seconds. Pause on `.container` hover.
4. **Data-driven panels** — define an array of objects `{ image, caption }` in JavaScript. Write a function that creates and inserts all panel elements from this array, so the HTML contains no hard-coded panel content.
5. **Richer captions** — add a `<p>` sub-description below each `<h3>`. Animate it in with a slightly longer delay so title appears first, then description.
6. **`prefers-reduced-motion`** — add the media query that disables transitions for users who have enabled reduced motion in their OS settings.
7. **Vertical layout** — switch `flex-direction` to `column`. Rethink how expansion works on the vertical axis.
8. **Web Component** — wrap the whole component in a Custom Element (`class ExpandingCards extends HTMLElement`) so it can be reused anywhere with a single `<expanding-cards>` tag.

---

## 13. Self-Check Questions
<!-- PROJECT-SPECIFIC -->

Answer without looking at the code first:

1. Why does swapping a CSS class change the visual appearance without JavaScript directly setting any `style` property?
2. The `transition` rule is on `.panel`, not `.panel.active`. What would break if you moved it to `.panel.active`? Which direction would still animate — expanding or collapsing?
3. Could you track the active panel with a JavaScript variable (`let active = 0`) instead of a CSS class? What are the trade-offs?
4. If you added a sixth panel in HTML without changing `script.js` at all, would clicking it work? Why?
5. Name three other common UI components that use the same "remove all, add one" state pattern.

---

## 14. Further Reading
<!-- REUSABLE -->

| Topic | Resource |
|-------|----------|
| Flexbox — basic concepts | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox |
| CSS `transition` | https://developer.mozilla.org/en-US/docs/Web/CSS/transition |
| `addEventListener` | https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener |
| `querySelectorAll` | https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll |
| `classList` API | https://developer.mozilla.org/en-US/docs/Web/API/Element/classList |
| `prefers-reduced-motion` | https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion |
| Accessibility basics | https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/What_is_accessibility |

---

## 15. Key Takeaways
<!-- PROJECT-SPECIFIC -->

- **CSS classes are the simplest form of UI state.** No variable needed — the class on the DOM element is the state. JavaScript sets it; CSS reacts. Tabs, menus, modals, and accordions all use this exact pattern.
- **"Remove all, add one" is a universal toggle pattern.** It guarantees exclusive state (exactly one item active) regardless of how fast the user clicks. Memorise this pattern — you will use it in dozens of future projects.
- **Flexbox distributes space proportionally, not in pixels.** A panel at `flex: 5` is ten times wider than one at `flex: 0.5` — the browser calculates every pixel automatically.
- **Transitions belong on the default state.** A `transition` on `.panel` (not `.panel.active`) animates in both directions. Moving it to `.panel.active` only would make the expansion snap.
- **Event-driven programming is how all UI works.** Your code does nothing until a user acts. You write handlers, attach them to elements, and trust the browser to call them at the right moment.
- **Separation of concerns scales.** When CSS owns appearance and JS owns logic, each file stays small and each bug has an obvious home.

---

## 16. Recommended Next Projects
<!-- PROJECT-SPECIFIC -->

| Project | New concepts introduced |
|---------|------------------------|
| [Progress Steps](../progress-steps/) | Integer state (a counter), multiple active classes, sequential Next/Prev logic |
| [FAQ Collapse](../faq-collapse/) | Toggle one item open and closed; `max-height` transitions; open-one-at-a-time variant |
| [Rotating Navigation Animation](../rotating-nav-animation/) | `transform: rotate()`; combined multi-property transitions; overlay/reveal pattern |
| [Image Carousel](../image-carousel/) | Index tracking; wrap-around logic; `transform: translateX` instead of `flex` |
| [Drag N Drop](../drag-n-drop/) | Mouse drag events (`dragstart`, `dragover`, `drop`); data transfer between elements |

---

## 17. Appendix — Reference Solution

> **Attempt the project yourself before reading this section.**

<details>
<summary>index.html</summary>

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="style.css" />
  <title>Expanding Cards</title>
</head>
<body>
  <div class="container">
    <div class="panel active"
         style="background-image: url('https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')">
      <h3>Explore The World</h3>
    </div>
    <div class="panel"
         style="background-image: url('https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')">
      <h3>Wild Forest</h3>
    </div>
    <div class="panel"
         style="background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80')">
      <h3>Sunny Beach</h3>
    </div>
    <div class="panel"
         style="background-image: url('https://images.unsplash.com/photo-1551009175-8a68da93d5f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80')">
      <h3>City on Winter</h3>
    </div>
    <div class="panel"
         style="background-image: url('https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')">
      <h3>Mountains - Clouds</h3>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>
```

</details>

<details>
<summary>style.css</summary>

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
  -webkit-transition: all 700ms ease-in;
}

.panel h3 {
  font-size: 24px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  margin: 0;
  opacity: 0;
}

.panel.active {
  flex: 5;
}

.panel.active h3 {
  opacity: 1;
  transition: opacity 0.3s ease-in 0.4s;
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

</details>

<details>
<summary>script.js</summary>

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
