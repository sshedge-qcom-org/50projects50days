# Split Landing Page

## 1. Project Overview

A full-screen landing page split into two vertical halves (PlayStation 5 on the left, Xbox Series X on the right). When you hover over either half, it smoothly grows to take over most of the screen while the other half shrinks out of the way.

**Key concepts involved:**

- CSS custom properties (variables) for theming and easy tweaking
- Absolute positioning to build a two-panel layout
- CSS `transition`s for smooth, animated resizing
- The `::before` pseudo-element for color overlays on top of images
- Toggling CSS classes from JavaScript in response to mouse events

**HTML skills you'll gain**

- Structuring a page with semantic containers and nested `<div>`s
- Linking a stylesheet and a script correctly
- Building repeated, mirrored blocks (left/right) with shared and unique classes

**CSS skills you'll gain**

- Declaring and reusing variables with `:root` and `var()`
- Positioning elements with `position: absolute` / `relative`
- Layering a semi-transparent color over a background image
- Animating width changes with `transition`
- Writing a basic responsive `@media` query

**JavaScript skills you'll gain**

- Selecting elements with `document.querySelector`
- Listening for `mouseenter` and `mouseleave` events
- Adding and removing classes with `classList.add()` / `classList.remove()`

---

## 2. Final Project Preview

**Layout & colors**

- The page fills the entire browser window (no scrollbars).
- Two equal halves sit side by side. The left half shows a PlayStation 5 image tinted purple; the right half shows an Xbox Series X image tinted dark gray/black.
- Each half has a large white heading near the top and an outlined white "Buy Now" button below it, both centered horizontally within that half.

**Behavior & interactions**

- Hover the **left** half → it expands to 75% of the width, the right half shrinks to 25%. The change is animated (a smooth 1-second slide).
- Hover the **right** half → the mirror image happens.
- Move your mouse out → both halves return to a 50/50 split.
- Hover a **button** → the left button fills solid purple, the right button fills solid green.

**What you can interact with**

- The two panels (hover to expand/shrink)
- The two "Buy Now" buttons (hover to change color; they link to `#` so they don't navigate anywhere)

---

## 3. Prerequisites

**You should know:** basic HTML tags, basic CSS properties, and what a JavaScript function and event are (we'll explain the rest).

**Tools needed:**

- A modern web browser (Chrome, Firefox, Edge, etc.)
- A text editor (VS Code recommended)
- Optional: the VS Code "Live Server" extension for auto-reload
- **Two images** named `ps.jpg` and `xbox.jpg` (any PlayStation / Xbox image will do). The project references these two local files.

**Files to create:**

```
split-landing-page/
├── index.html
├── style.css
├── script.js
├── ps.jpg      (a PlayStation image)
└── xbox.jpg    (an Xbox image)
```

Start with `index.html`, `style.css`, and `script.js` completely **empty**. We'll fill them in step by step.

---

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML skeleton

**🎯 Goal**
Set up a valid HTML document and connect our stylesheet and script so everything is wired together from the start.

**💡 Concept**
Every HTML page needs a `<!DOCTYPE>`, a `<head>` for metadata, and a `<body>` for visible content. We link CSS in the `<head>` and put the `<script>` at the very end of the `<body>` so the HTML exists before JavaScript runs.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Split Landing Page
    </title>
  </head>
  <body>

    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**

- `<meta charset>` and `<meta name="viewport">` are standard tags for correct character encoding and mobile scaling.
- `<link rel="stylesheet" href="style.css" />` connects our (currently empty) CSS file.
- `<script src="script.js"></script>` sits at the bottom of `<body>` so the DOM is fully loaded before the script tries to find elements.

**✅ Checkpoint**
Open `index.html` in your browser. You'll see a blank page with the tab titled "Split Landing Page". No errors — good foundation.

---

### Step 2: Add the split-screen structure

**🎯 Goal**
Build the two halves, each with a heading and a button.

**💡 Concept**
We use one outer `.container` holding two `.split` panels. Each panel gets a second class (`left` or `right`) so we can share styles via `.split` and target sides individually via `.left` / `.right`.

**📝 Code**

```html
<!-- goes in index.html, inside <body> above the <script> -->
<div class="container">
  <div class="split left">
    <h1>Playstation 5</h1>
    <a href="#" class="btn">Buy Now</a>
  </div>
  <div class="split right">
    <h1>XBox Series X</h1>
    <a href="#" class="btn">Buy Now</a>
  </div>
</div>
```

**🔍 Explanation**

- `class="split left"` puts **two** classes on one element. `.split` will hold the shared layout; `.left`/`.right` hold side-specific styling (image, colors).
- Each panel has an `<h1>` label and an `<a class="btn">`. The button links to `#` (a placeholder that goes nowhere) because this is a demo.

**✅ Checkpoint**
Refresh. You'll see two headings and two "Buy Now" links stacked vertically as plain text. It's unstyled, but the structure is there.

---

### Step 3: Import the font, reset the box model, and fill the screen

**🎯 Goal**
Load a web font, make sizing predictable, and stretch the page to the full window height with no scrollbars.

**💡 Concept**
`@import` pulls in a Google Font. `box-sizing: border-box` on every element makes `width`/`height` include padding and borders (far easier to reason about). Setting `body` to `100vh` with `overflow: hidden` guarantees a full-screen canvas.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}
```

**🔍 Explanation**

- `@import ...` must be the first line of the CSS file; it fetches the Roboto font.
- `*` selects every element; `box-sizing: border-box` is a near-universal best practice.
- `height: 100vh` = 100% of the **v**iewport **h**eight. `overflow: hidden` hides any scrollbars. `margin: 0` removes the default gap around the body.

**✅ Checkpoint**
Refresh. The text now uses the Roboto font and hugs the top-left corner (no body margin). Still no layout — that's next.

---

### Step 4: Add color variables and lay out the two panels

**🎯 Goal**
Define reusable colors/sizes as variables, then position the two panels to each take half the screen.

**💡 Concept**
`:root` is the top-level element; variables declared there (`--name: value`) are global and used with `var(--name)`. `position: absolute` lets us place panels precisely; the `.container` gets `position: relative` so the panels are positioned *inside it*.

**📝 Code**

```css
/* goes in style.css */
:root {
  --left-bg-color: rgba(87, 84, 236, 0.7);
  --right-bg-color: rgba(43, 43, 43, 0.8);
  --left-btn-hover-color: rgba(87, 84, 236, 1);
  --right-btn-hover-color: rgba(28, 122, 28, 1);
  --hover-width: 75%;
  --other-width: 25%;
  --speed: 1000ms;
}

.container {
  position: relative;
  width: 100%;
  height: 100%;
  background: #333;
}

.split {
  position: absolute;
  width: 50%;
  height: 100%;
  overflow: hidden;
}

.split.left {
  left: 0;
}

.split.right {
  right: 0;
}
```

**🔍 Explanation**

- The variables define the two tint colors, the two button-hover colors, the expanded/shrunk widths (`75%` / `25%`), and the animation `--speed` (1000ms = 1 second). Declaring them once means you can retheme the whole page by editing these lines.
- `.container` is a full-size relative box with a dark `#333` fallback background.
- `.split` panels are absolutely positioned, each `50%` wide and full height. `.split.left { left: 0 }` pins one to the left edge; `.split.right { right: 0 }` pins the other to the right.

**✅ Checkpoint**
Refresh. The screen is now dark gray (the container background) and the headings/buttons are split across the two halves — though the text still looks plain. Layout achieved.

---

### Step 5: Add background images and color overlays

**🎯 Goal**
Show the console images and lay a semi-transparent color over each so text stays readable.

**💡 Concept**
The `::before` pseudo-element creates a "fake" child element purely from CSS. We stretch it over the whole panel and fill it with a semi-transparent color from our variables — that's the tint effect over the photo.

**📝 Code**

```css
/* goes in style.css */
.split.left {
  background: url('ps.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.split.left::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--left-bg-color);
}

.split.right {
  background: url('xbox.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.split.right::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--right-bg-color);
}
```

> **Note:** We're adding `background` rules to `.split.left` / `.split.right` here. In the final file these merge with the `left: 0` / `right: 0` rules from Step 4 — you can keep them as separate blocks or combine them; the result is identical.

**🔍 Explanation**

- `background-size: cover` scales each image to fill its panel without distortion.
- `::before` needs `content: ''` to appear at all. It's absolutely positioned to cover the panel (`width/height: 100%`) and filled with the tint color (`var(--left-bg-color)` is 70%-opaque purple, `var(--right-bg-color)` is 80%-opaque dark gray). Because the pseudo-element sits *on top of* the image, the photo shows through the transparency.

**✅ Checkpoint**
Refresh. You should now see your PS5 image tinted purple on the left and your Xbox image tinted dark on the right. (If a half is blank, check that `ps.jpg` / `xbox.jpg` exist in the folder.)

---

### Step 6: Position the headings and buttons

**🎯 Goal**
Center the heading and button horizontally within each half and place them near the top.

**💡 Concept**
`position: absolute; left: 50%` places an element's left edge at the panel's center. `transform: translateX(-50%)` then slides it back by half its own width — the classic "perfectly horizontally centered" trick.

**📝 Code**

```css
/* goes in style.css */
h1 {
  font-size: 4rem;
  color: #fff;
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translateX(-50%);
  white-space: nowrap;
}

.btn {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 50%;
  top: 40%;
  transform: translateX(-50%);
  text-decoration: none;
  color: #fff;
  border: #fff solid 0.2rem;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  width: 15rem;
  padding: 1.5rem;
}
```

**🔍 Explanation**

- Each `h1` is centered at `left: 50%` and pulled back by `translateX(-50%)`, placed `20%` down from the top. `white-space: nowrap` keeps "XBox Series X" on one line. Because each `.split` is `position: absolute`, `left: 50%` is measured against its own panel — so each heading centers on its own half.
- `.btn` uses the same centering trick, sits at `40%` from the top, and gets a white outline (`border`), uppercase bold text, and generous padding. `display: flex` with `align-items/justify-content: center` centers the label text inside the button.

**✅ Checkpoint**
Refresh. Each half now has a big white heading and a white outlined "Buy Now" button, both centered on their side.

---

### Step 7: Add button hover colors

**🎯 Goal**
Fill each button with its brand color when hovered.

**💡 Concept**
The `:hover` pseudo-class applies styles only while the mouse is over the element. We scope it per side so the left and right buttons get different colors.

**📝 Code**

```css
/* goes in style.css */
.split.left .btn:hover {
  background-color: var(--left-btn-hover-color);
  border-color: var(--left-btn-hover-color);
}

.split.right .btn:hover {
  background-color: var(--right-btn-hover-color);
  border-color: var(--right-btn-hover-color);
}
```

**🔍 Explanation**

- `.split.left .btn:hover` reads as: "a `.btn` inside `.split.left`, while hovered." It fills the button with solid purple (`--left-btn-hover-color`, the fully-opaque version of the left tint).
- The right button fills solid green (`--right-btn-hover-color`).

**✅ Checkpoint**
Refresh and hover each button. The left one turns solid purple, the right one solid green.

---

### Step 8: Add transitions and the expand/shrink classes

**🎯 Goal**
Make the panels animate smoothly, and define the "one side is hovered" states — even though we'll trigger them from JavaScript in the next steps.

**💡 Concept**
`transition` tells the browser to *animate* changes to a property over time instead of snapping instantly. We then create helper classes (`.hover-left`, `.hover-right`) that change the panel widths; JavaScript will add/remove these on the container.

**📝 Code**

```css
/* goes in style.css */
.split.right,
.split.left,
.split.right::before,
.split.left::before {
  transition: all var(--speed) ease-in-out;
}

.hover-left .left {
  width: var(--hover-width);
}

.hover-left .right {
  width: var(--other-width);
}

.hover-right .right {
  width: var(--hover-width);
}

.hover-right .left {
  width: var(--other-width);
}
```

**🔍 Explanation**

- The first rule says: whenever any listed element's properties change, animate them over `--speed` (1 second) with an `ease-in-out` curve. We include the panels *and* their `::before` overlays so the tint resizes in sync.
- `.hover-left .left { width: 75% }` and `.hover-left .right { width: 25% }` describe the layout *when the container has the class `hover-left`*. `.hover-right` mirrors it. These classes don't exist on any element yet — that's the JavaScript's job.

**✅ Checkpoint**
Nothing visibly changes on hover yet (the classes aren't applied). To preview it: open DevTools, select the `<div class="container">`, and manually add `hover-left`. You should see the left panel smoothly expand. Remove it afterward.

---

### Step 9: Add a responsive tweak

**🎯 Goal**
Shrink the heading and button on narrow screens so they still fit.

**💡 Concept**
A `@media` query applies its rules only when a condition is met — here, when the viewport is 800px wide or less.

**📝 Code**

```css
/* goes in style.css */
@media (max-width: 800px) {
  h1 {
    font-size: 2rem;
    top: 30%;
  }

  .btn {
    padding: 1.2rem;
    width: 12rem;
  }
}
```

**🔍 Explanation**

- On screens ≤ 800px, headings drop from `4rem` to `2rem` and move slightly lower, and buttons get smaller padding and width so nothing overflows the narrow panels.

**✅ Checkpoint**
Resize your browser narrow (or use DevTools device mode). The heading and button shrink to fit. Styling is now complete.

---

### Step 10: Select the elements in JavaScript

**🎯 Goal**
Grab references to the two panels and the container so we can react to mouse events.

**💡 Concept**
`document.querySelector('.class')` returns the first element matching a CSS selector. We store each in a `const` for reuse.

**📝 Code**

```js
// goes in script.js
const left = document.querySelector('.left')
const right = document.querySelector('.right')
const container = document.querySelector('.container')
```

**🔍 Explanation**

- `left` and `right` are the two panels we'll watch for hovering.
- `container` is the element we'll add/remove the `hover-left` / `hover-right` classes on (remember, those classes target `.container .left` / `.container .right`).

**✅ Checkpoint**
No visible change. Open the console — there should be no errors, meaning all three elements were found.

---

### Step 11: React to hovering with class toggles

**🎯 Goal**
Add the expand/shrink classes when the mouse enters a panel and remove them when it leaves.

**💡 Concept**
`mouseenter` fires when the pointer moves onto an element; `mouseleave` fires when it moves off. `classList.add()` / `classList.remove()` change an element's classes, which lets CSS (from Step 8) take over the animation.

**📝 Code**

```js
// goes in script.js
left.addEventListener('mouseenter', () => container.classList.add('hover-left'))
left.addEventListener('mouseleave', () => container.classList.remove('hover-left'))

right.addEventListener('mouseenter', () => container.classList.add('hover-right'))
right.addEventListener('mouseleave', () => container.classList.remove('hover-right'))
```

**🔍 Explanation**

- Hover the left panel → `container` gains `hover-left` → CSS makes `.left` 75% and `.right` 25%, animated. Leave → the class is removed → widths return to 50/50.
- The right panel works the same way with `hover-right`.
- Each listener uses an arrow function (`() => ...`) as a concise one-line callback.

**✅ Checkpoint**
Refresh and hover each half. The panel you hover smoothly grows to 75% while the other shrinks to 25%, snapping back to 50/50 when you move away. That's the finished project!

---

## 5. Final Full Code (Reference)

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Split Landing Page
    </title>
  </head>
  <body>
    <div class="container">
      <div class="split left">
        <h1>Playstation 5</h1>
        <a href="#" class="btn">Buy Now</a>
      </div>
      <div class="split right">
        <h1>XBox Series X</h1>
        <a href="#" class="btn">Buy Now</a>
      </div>
    </div>

    <script src="script.js"></script>
  </body>
</html>
```

```css
/* style.css */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

:root {
  --left-bg-color: rgba(87, 84, 236, 0.7);
  --right-bg-color: rgba(43, 43, 43, 0.8);
  --left-btn-hover-color: rgba(87, 84, 236, 1);
  --right-btn-hover-color: rgba(28, 122, 28, 1);
  --hover-width: 75%;
  --other-width: 25%;
  --speed: 1000ms;
}

* {
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

h1 {
  font-size: 4rem;
  color: #fff;
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translateX(-50%);
  white-space: nowrap;
}

.btn {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 50%;
  top: 40%;
  transform: translateX(-50%);
  text-decoration: none;
  color: #fff;
  border: #fff solid 0.2rem;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  width: 15rem;
  padding: 1.5rem;
}

.split.left .btn:hover {
  background-color: var(--left-btn-hover-color);
  border-color: var(--left-btn-hover-color);
}

.split.right .btn:hover {
  background-color: var(--right-btn-hover-color);
  border-color: var(--right-btn-hover-color);
}

.container {
  position: relative;
  width: 100%;
  height: 100%;
  background: #333;
}

.split {
  position: absolute;
  width: 50%;
  height: 100%;
  overflow: hidden;
}

.split.left {
  left: 0;
  background: url('ps.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.split.left::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--left-bg-color);
}

.split.right {
  right: 0;
  background: url('xbox.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.split.right::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--right-bg-color);
}

.split.right,
.split.left,
.split.right::before,
.split.left::before {
  transition: all var(--speed) ease-in-out;
}

.hover-left .left {
  width: var(--hover-width);
}

.hover-left .right {
  width: var(--other-width);
}

.hover-right .right {
  width: var(--hover-width);
}

.hover-right .left {
  width: var(--other-width);
}

@media (max-width: 800px) {
  h1 {
    font-size: 2rem;
    top: 30%;
  }

  .btn {
    padding: 1.2rem;
    width: 12rem;
  }
}
```

```js
// script.js
const left = document.querySelector('.left')
const right = document.querySelector('.right')
const container = document.querySelector('.container')

left.addEventListener('mouseenter', () => container.classList.add('hover-left'))
left.addEventListener('mouseleave', () => container.classList.remove('hover-left'))

right.addEventListener('mouseenter', () => container.classList.add('hover-right'))
right.addEventListener('mouseleave', () => container.classList.remove('hover-right'))
```

---

## 6. Recap & Next Steps

**What you learned**

- Defining and reusing CSS variables via `:root` and `var()`
- Building a two-panel layout with absolute positioning
- Layering a semi-transparent color over an image with `::before`
- Centering elements with the `left: 50%` + `translateX(-50%)` technique
- Animating layout changes with `transition`
- Driving CSS animations from JS by toggling classes on `mouseenter` / `mouseleave`

**Enhancement challenges**

1. **Add a third panel** (e.g. "Nintendo Switch") and adjust the widths/logic so hovering still works.
2. **Make the buttons functional** — link each to a real product page instead of `#`.
3. **Animate the text**, too — have the heading and button fade or slide in on the hovered side.
4. **Swap the mouse events for clicks** so the layout "locks" to a side on click (useful for touch devices, which don't hover).
5. **Retheme it** entirely by editing only the `:root` variables — try your own two products and colors.
