# Expanding Cards — Step-by-Step Tutorial

## 1. Project Overview

Expanding Cards is a row of five full-height image panels that sit side by side; clicking any panel makes it grow to fill most of the row while the others shrink back down, and the clicked panel's caption fades into view.

**Key concepts involved:** Flexbox layout (growing/shrinking siblings), CSS transitions triggered by toggling a class, event-driven DOM manipulation, and the "remove active from all, add it to one" state pattern that also powers tabs, accordions, and menus.

By the end, you'll have practiced:

**HTML skills**
- Structuring a set of repeated, near-identical components
- Using inline `style` attributes for per-element data (like a unique background image) instead of a CSS class

**CSS skills**
- Laying out children in a row with Flexbox, and controlling how they grow relative to each other (`flex`)
- Sizing and cropping background images with `background-size`/`background-position`/`background-repeat`
- Positioning an element relative to its parent with `position: relative` + `position: absolute`
- Hiding/showing content with `opacity` instead of `display`, so it can transition smoothly
- Sequencing an animation with `transition-delay`
- Writing a compound selector (`.panel.active`) versus a descendant selector
- Adapting layout for small screens with a media query

**JavaScript skills**
- Selecting multiple elements with `querySelectorAll`
- Looping over a `NodeList` with `forEach`
- Listening for clicks with `addEventListener` (event-driven programming)
- Reading and writing an element's classes safely with `classList`
- Using a function before its definition appears in the file (function hoisting)

## 2. Final Project Preview

**Layout:** Five tall, rounded-rectangle panels are arranged in a single horizontal row, centered on the page, together spanning about 90% of the viewport's width and 80% of its height.

**Colors:** Each panel is filled edge-to-edge with a cropped photograph (mountains, forest, beach, winter city, and more mountains/clouds). Caption text is white. The page background is the browser's default white — no color is set on `body` itself. Headings use the "Muli" font loaded from Google Fonts.

**Behavior:**
- On page load, the first panel ("Explore The World") is already expanded.
- Clicking any panel expands it (it grows to take up roughly 5x the space of a resting panel) while every other panel shrinks back to its resting width.
- The expanded panel's caption fades in shortly *after* the width finishes animating — the two effects are deliberately staggered.
- Only one panel can be expanded at a time.
- Below 480px viewport width, the 4th and 5th panels are hidden entirely and the row stretches to the full width of the screen.

**What you can interact with:** the five panels themselves — there are no buttons, forms, or other inputs. Clicking/tapping a panel is the entire interaction.

## 3. Prerequisites

- **Basic knowledge:** HTML elements/attributes, CSS selectors and the box model, and JS fundamentals (variables, functions, arrays). You don't need to already know Flexbox, CSS transitions, or DOM event listeners — those are exactly what this project teaches.
- **Tools:** a text editor and a modern browser. Optional: the VS Code "Live Server" extension so the page auto-reloads when you save (not required — you can just open the HTML file directly).
- **Files to create**, all empty to start:

```text
expanding-cards/
├── index.html
├── style.css
└── script.js
```

## 4. Build the Project Step-by-Step

### Step 1: Lay the HTML Skeleton

**🎯 Goal**
Get a valid, empty HTML page on screen that's already wired up to our CSS and JS files, so every later step just fills in content.

**💡 Concept**
`<link rel="stylesheet">` in `<head>` loads our CSS before the page renders. The `<script>` tag goes at the very end of `<body>`, right before `</body>` closes — that way the browser has already created all the HTML elements by the time script.js runs and tries to select them.

**📝 Code**

```html
<!-- goes in index.html -->
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

    </div>

    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**
- The `viewport` meta tag tells mobile browsers to render the page at the device's actual width instead of zoomed-out desktop width.
- `.container` is the empty box that will hold all five panels — we're building the wrapper before the things it wraps.
- Nothing is inside `.container` yet on purpose; that's the next step.

**✅ Checkpoint**
Open `index.html` in a browser. You should see a completely blank white page — that's expected, since there's no content and no CSS yet.

---

### Step 2: Add the Panels

**🎯 Goal**
Put the five image panels into the page.

**💡 Concept**
Each panel needs a *unique* background image, so instead of writing five nearly-identical CSS classes (`.panel-1`, `.panel-2`, ...), we set `background-image` directly with an inline `style` attribute. The shared look (size, shape, spacing) will come from one `.panel` class in CSS — inline styles and class-based styles both apply to the same element without conflicting, as long as they don't set the same property.

**📝 Code**

```html
<!-- goes in index.html, inside .container -->
<div class="panel active" style="background-image: url('https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')">
  <h3>Explore The World</h3>
</div>
<div class="panel" style="background-image: url('https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')">
  <h3>Wild Forest</h3>
</div>
<div class="panel" style="background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80')">
  <h3>Sunny Beach</h3>
</div>
<div class="panel" style="background-image: url('https://images.unsplash.com/photo-1551009175-8a68da93d5f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80')">
  <h3>City on Winter</h3>
</div>
<div class="panel" style="background-image: url('https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')">
  <h3>Mountains - Clouds</h3>
</div>
```

**🔍 Explanation**
- All five `<div>`s share the class `panel` — that's the hook CSS and JS will both use.
- The **first** panel has a second class, `active` (`class="panel active"`). An element can have as many classes as you give it, space-separated. We haven't defined what `.active` *does* yet — that's coming in Step 7 — but we're deciding now, in the markup, which panel starts out expanded.
- Every other panel is structurally identical — only the image URL and the caption text change.
- Each `<h3>` is the caption that will eventually appear at the bottom-left of its panel.

**✅ Checkpoint**
Refresh the browser. You'll see five plain photo slivers stacked *vertically* with plain black heading text on top — it looks nothing like the final version yet. That's expected: block-level `<div>`s stack top-to-bottom by default, and without `background-size`, the images render at their natural size instead of filling the panel. CSS fixes all of this starting next step.

---

### Step 3: Global Reset & Web Font

**🎯 Goal**
Start style.css with two tiny rules that every other rule in this project will build on top of.

**💡 Concept**
`@import` pulls in an external stylesheet — here, the "Muli" font from Google Fonts — and it must be the very first thing in the CSS file, or browsers ignore it. The universal selector `*` targets *every* element; setting `box-sizing: border-box` on all of them means any padding or border you add later is included *inside* the element's declared width/height, instead of adding to it. This project doesn't happen to mix padding and fixed sizing anywhere, but it's a reset worth having by default so it never surprises you later.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

* {
  box-sizing: border-box;
}
```

**🔍 Explanation**
- `@import url(...)` fetches the font's CSS from Google's servers, which in turn loads the actual font file.
- `* { box-sizing: border-box; }` is a near-universal reset — you'll see it (or something like it) at the top of almost every real-world stylesheet.

**✅ Checkpoint**
Refresh. Visually almost nothing changes yet (the box-sizing reset has no visible effect until an element has both padding and a fixed size), but if you inspect an `<h3>` in DevTools you should see its computed `font-family` is no longer the browser default.

---

### Step 4: Center the Page and Lay Out the Row

**🎯 Goal**
Turn the vertical stack of panels into a horizontal row, centered on the page.

**💡 Concept**
Flexbox turns an element's direct children into flexible items you can lay out in a row or column. Setting `display: flex` on `body` and centering with `align-items`/`justify-content` centers `.container` as a whole; setting `display: flex` on `.container` itself then lays *its* children — the five panels — out in a row (the default `flex-direction`).

**📝 Code**

```css
/* goes in style.css */
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
```

**🔍 Explanation**
- `height: 100vh` makes `body` exactly as tall as the browser viewport, which gives `align-items: center` (vertical) and `justify-content: center` (horizontal) something to center *within*.
- `overflow: hidden` stops scrollbars from appearing while panels are animating.
- `margin: 0` removes the browser's default spacing around `body`.
- `width: 90vw` means the container — and therefore the whole row of panels — takes up 90% of the viewport's width, however wide that is.

**✅ Checkpoint**
Refresh. The five panels now sit side by side in a single row, roughly centered on the page — but they're still short and thin, since we haven't given `.panel` a height yet.

---

### Step 5: Style the Panels

**🎯 Goal**
Make each panel a tall, rounded card that shows its full photo cropped to fit.

**💡 Concept**
`background-size: cover` scales a background image up or down so it completely fills its element (cropping the overflow) without distorting its aspect ratio — `background-position: center` then chooses which part of the (now-larger) image stays visible. The `flex` shorthand controls how a flex item grows or shrinks relative to its siblings: `flex: 0.5` here means "at rest, take a modest, equal share of the row" (all five panels share it equally) — Step 7 will introduce a much larger value for the *expanded* panel, and the ratio between them is what drives the animation.

**📝 Code**

```css
/* goes in style.css */
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
```

**🔍 Explanation**
- `background-repeat: no-repeat` stops the image from tiling if it's ever smaller than the panel.
- `height: 80vh` gives every panel a tall, fixed height (80% of the viewport height).
- `border-radius: 50px` rounds the corners; `cursor: pointer` tells users the panel is clickable before they even click.
- `position: relative` doesn't visibly change anything by itself — but it's what lets the caption inside each panel be positioned *relative to the panel* in the next step, instead of relative to the whole page.
- `-webkit-transition` is a **vendor-prefixed** property, a Chrome/Safari-specific way of writing `transition` that predates the standard property becoming reliable. ⚠️ Notice there's no plain, unprefixed `transition` alongside it — that's a real gap in this project (it happens to still work because every evergreen browser today understands the `-webkit-` prefix too, but it's not best practice). We're matching the project exactly as written; Recap & Next Steps suggests fixing this as a challenge.

**✅ Checkpoint**
Refresh. Now you should see five tall, rounded panels, each filled with a cropped photo, evenly spaced with small gaps between them. Captions currently sit as plain white-on-photo text near the top of each panel (white text may be hard to read against a bright photo right now) — that's expected, we reposition them next.

---

### Step 6: Position and Hide the Captions

**🎯 Goal**
Move each caption to the bottom-left of its panel, and hide it until that panel is expanded.

**💡 Concept**
An element with `position: absolute` is removed from normal layout flow and positioned relative to its nearest ancestor that has `position: relative` (that's exactly why Step 5 set `position: relative` on `.panel`). Separately, `opacity: 0` makes an element fully transparent *without* removing it from layout the way `display: none` would — which matters because you can smoothly transition an `opacity` change, but you can't transition to/from `display: none`.

**📝 Code**

```css
/* goes in style.css */
.panel h3 {
  font-size: 24px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  margin: 0;
  opacity: 0;
}
```

**🔍 Explanation**
- `bottom: 20px; left: 20px;` anchors the caption 20px from the bottom-left corner *of its panel*, thanks to the positioning context set up in Step 5.
- `margin: 0` cancels the browser's default top/bottom margin on `<h3>` elements, which would otherwise throw off that positioning.
- `opacity: 0` hides the caption completely for now.

**✅ Checkpoint**
Refresh. All five captions disappear. That's correct — we intentionally hid them. (If you're ever unsure whether an element exists vs. is just invisible, right-click → Inspect in DevTools; you'll see the `<h3>` elements are still there in the Elements panel, just rendered at `opacity: 0`.)

---

### Step 7: Define the "Active" State

**🎯 Goal**
Decide what "expanded" actually looks like in CSS — before writing a single line of JavaScript.

**💡 Concept**
`.panel.active` (no space) is a **compound selector**: it matches an element that has *both* classes, `panel` *and* `active`, at once. Compare that to `.panel .active` (with a space), a **descendant selector**, which would instead match any `.active` element *nested inside* a `.panel` — a completely different, much more common beginner mix-up. Since Step 2's HTML already gave the first panel `class="panel active"`, this rule takes effect immediately, with zero JavaScript.

**📝 Code**

```css
/* goes in style.css */
.panel.active {
  flex: 5;
}

.panel.active h3 {
  opacity: 1;
  transition: opacity 0.3s ease-in 0.4s;
}
```

**🔍 Explanation**
- `flex: 5` vs. the resting `flex: 0.5` from Step 5 — flex-grow values are compared as *ratios* between siblings, so the active panel ends up roughly 10x wider than any single resting one, which reads as "roughly 5x the row" once you account for four shrinking panels sharing the rest.
- `.panel.active h3 { opacity: 1; }` overrides Step 6's `opacity: 0`, revealing the caption — but only for a caption inside an *active* panel.
- `transition: opacity 0.3s ease-in 0.4s` has three parts: animate `opacity`, over `0.3s`, but wait `0.4s` before starting. That delay is what makes the caption fade in *after* the panel has mostly finished widening, instead of both animating at once.

**✅ Checkpoint**
Refresh. Even with no JavaScript at all, the first panel ("Explore The World") should now appear expanded, and after a brief pause its caption should fade into view. This confirms the CSS side of the interaction works — JavaScript's only job from here is to move the `active` class to whichever panel gets clicked.

---

### Step 8: Make It Responsive

**🎯 Goal**
Adapt the layout for small screens.

**💡 Concept**
A **media query** wraps CSS rules in a condition based on the viewport — `@media (max-width: 480px)` means "only apply this on screens 480px wide or narrower." `:nth-of-type(4)` selects an element based on its position among siblings of the same tag, letting us target specific panels without adding new classes.

**📝 Code**

```css
/* goes in style.css */
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

**🔍 Explanation**
- On narrow screens, five panels would be too cramped to be usable, so the 4th and 5th are hidden with `display: none` entirely.
- `.container`'s width switches from `90vw` to the full `100vw`, since there's no longer extra screen space to leave as breathing room.

**✅ Checkpoint**
Refresh, then shrink your browser window (or open DevTools' device toolbar) below 480px wide. You should see only three panels, filling the entire width of the screen.

That's the last rule in `style.css` — every visual behavior now exists. From here on, JavaScript's entire job is just: *move the `active` class to whichever panel the user clicks.*

---

### Step 9: Select the Panels in JavaScript

**🎯 Goal**
Get a reference to all five panel elements so we can work with them.

**💡 Concept**
`document.querySelectorAll(selector)` returns a **NodeList** — a list-like collection of *every* matching element — whereas `document.querySelector(selector)` returns only the *first* match (or `null` if there isn't one). We need all five panels, so `querySelectorAll` is the right tool here.

| Method | Returns | Use when |
|---|---|---|
| `querySelector('.panel')` | The first matching element, or `null` | You want exactly one element |
| `querySelectorAll('.panel')` | A NodeList of *all* matching elements | You want to act on every match |

**📝 Code**

```js
// goes in script.js
const panels = document.querySelectorAll('.panel')
```

**🔍 Explanation**
- `panels` now holds all five `.panel` divs, in the same order they appear in the HTML.
- This line runs once, when the page loads — it's a snapshot, not something that magically stays in sync if panels were added or removed later.

**✅ Checkpoint**
Refresh, open DevTools' Console tab, and type `panels`. You should see a `NodeList(5)` containing your five `<div>` elements.

---

### Step 10: Listen for Clicks

**🎯 Goal**
Detect when the user clicks any panel.

**💡 Concept**
This is **event-driven programming**: instead of running top-to-bottom and finishing, the script sets up listeners and then waits — the browser calls your function only when a specific event (like a `click`) actually happens, whenever that may be. `NodeList`s have a `forEach` method just like arrays, so we can loop over all five panels and attach the *same* listener logic to each one individually.

**📝 Code**

```js
// goes in script.js
panels.forEach(panel => {
    panel.addEventListener('click', () => {
        console.log('panel clicked')
    })
})
```

**🔍 Explanation**
- `panels.forEach(panel => { ... })` runs the callback once per panel, with `panel` bound to that specific element each time.
- `panel.addEventListener('click', callback)` tells the browser "run this callback whenever *this exact element* is clicked."
- Using `forEach` with an arrow function (instead of a classic `for` loop with `var i`) means each callback gets its *own* `panel` variable — avoiding a classic bug where every listener would otherwise end up sharing one leftover value after the loop finishes.
- `console.log(...)` here is a temporary stand-in, just to prove the wiring works, before Step 11 replaces it with the real behavior.

**✅ Checkpoint**
Refresh, open the Console, and click each panel. You should see `"panel clicked"` logged once per click — five separate listeners, each firing independently.

---

### Step 11: Build the "Remove All, Add One" Toggle

**🎯 Goal**
Make a clicked panel actually expand — and every other panel shrink back down.

**💡 Concept**
This is the single most reusable pattern in the whole project: **to show that exactly one item is "active," remove the active state from *everything*, then add it back to *just the one* the user picked.** The exact same idea drives tabs, accordions, dropdown menus, and image carousels. In code, that means: loop over every panel and call `classList.remove('active')` on each one, then call `classList.add('active')` on the one that was actually clicked.

**📝 Code**

```js
// goes in script.js, replacing the console.log from Step 10
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

**🔍 Explanation**
- `removeActiveClasses()` is defined as a **function declaration** (`function name() {}`) *below* where it's called. This works because of **hoisting** — function declarations (unlike `const`/arrow functions) are fully available anywhere in their scope, even before the line they're written on.
- Inside the click handler: first strip `active` off of *every* panel by calling `removeActiveClasses()`, then add it back to just the one that was clicked — `panel` here still refers to whichever specific element this listener belongs to.
- `classList.add`/`classList.remove` only touch the one class you name, leaving `panel` and any other classes untouched. Compare that to setting `panel.className = 'active'` directly, which would *overwrite the entire class list* — silently deleting the `panel` class itself and breaking every CSS rule that depends on it. `classList` is almost always the safer choice.

**✅ Checkpoint**
Refresh the page. Click any panel — it should expand while all the others shrink back down, and its caption should fade in shortly after. Click a different panel, and the previous one should shrink back. This is the finished project.

## 5. Final Full Code (Reference)

> Try building it yourself first — use this only to check your work.

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
      <div class="panel active" style="background-image: url('https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')">
        <h3>Explore The World</h3>
      </div>
      <div class="panel" style="background-image: url('https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')">
        <h3>Wild Forest</h3>
      </div>
      <div class="panel" style="background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80')">
        <h3>Sunny Beach</h3>
      </div>
      <div class="panel" style="background-image: url('https://images.unsplash.com/photo-1551009175-8a68da93d5f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80')">
        <h3>City on Winter</h3>
      </div>
      <div class="panel" style="background-image: url('https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')">
        <h3>Mountains - Clouds</h3>
      </div>

    </div>

    <script src="script.js"></script>
  </body>
</html>
```

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

## 6. Recap & Next Steps

You built a five-panel layout using Flexbox growth ratios to animate width, used `position: relative`/`absolute` plus `opacity` to place and reveal a caption, sequenced two animations with `transition-delay`, and wired up click behavior with `addEventListener` and the reusable "remove active from all, add it to one" pattern — the same pattern behind tabs, accordions, and carousels.

Try extending it yourself:

1. **Keyboard accessibility** — currently only a mouse/touch click works. Add a `tabindex` to each panel and listen for `keydown` (Enter/Space) so keyboard users can expand a focused panel too.
2. **Data-driven panels** — instead of hardcoding five `<div>`s, put the image URLs and captions in a JavaScript array of objects, and generate the panel elements with a loop. Add a sixth panel by adding one array entry instead of editing HTML.
3. **Auto-play** — use `setInterval` to automatically move the `active` class to the next panel every few seconds, pausing when the user hovers or clicks manually.
4. **Remember the last choice** — save the index of the active panel to `localStorage` on click, and read it back on page load so the same panel stays expanded across refreshes.
5. **Fix the transition** — Step 5 pointed out that `.panel` only has a `-webkit-` prefixed transition with no standard fallback. Add a plain `transition: all 700ms ease-in;` alongside it so the widening animation is guaranteed to run smoothly in every modern browser, not just ones that still honor the old prefix.
