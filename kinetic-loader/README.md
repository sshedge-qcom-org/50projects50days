# Kinetic Loader

A code-along tutorial. You'll build this project from empty files, one small step at a time. Read the **why** before each snippet, type the code yourself, and test at every checkpoint.

> **Note:** This is a **pure HTML + CSS** project — there is **no JavaScript**. The whole animation is done with CSS pseudo-elements and keyframes, so this tutorial has no JS steps.

## 1. Project Overview

The Kinetic Loader is an animated "loading" spinner made entirely of CSS — two triangles rotating out of sync on a dark background to create a hypnotic, kinetic motion.

**Key concepts involved**

- **CSS pseudo-elements** (`::before`, `::after`) to create shapes without extra HTML.
- The **CSS border triangle trick** — turning transparent borders into a solid triangle.
- **`@keyframes` animations** and `transform: rotate()` to spin the shapes.

**HTML skills you'll gain**

- Building a minimal page whose entire visual is generated from a single empty element.

**CSS skills you'll gain**

- Centering an element on the full viewport with Flexbox.
- Generating content with `::before` / `::after` and the `content` property.
- Drawing a triangle using zero width/height plus transparent borders.
- Writing `@keyframes` and controlling animation `duration`, `timing-function`, `iteration-count`, and `delay`.
- Offsetting two animations so shapes move in a coordinated, staggered rhythm.

## 2. Final Project Preview

- **Layout:** A dark slate-blue (`#2c3e50`) full-screen background with a single small animation locked dead-center.
- **The visual:** Two white triangles share the same center. One is rotated 90° from the other. Both continuously rotate, but on **staggered timing**, so they chase each other — appearing to fold, flip, and spin in a smooth, kinetic loop that never stops.
- **Behavior:** Fully automatic. There's nothing to click — it's a decorative loading indicator that loops forever.
- **You can interact with:** nothing — it's a pure visual animation.

## 3. Prerequisites

- **Knowledge:** basic HTML structure and CSS rules. No animation experience needed — we'll build it here.
- **Tools:** a modern web browser and a text editor. Optionally the VS Code **Live Server** extension for auto-reload.
- **Files to create:**

```
kinetic-loader/
├── index.html
└── style.css
```

Only **two** files — this project has no `script.js`. Create both now, empty.

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML skeleton

**🎯 Goal**
Get a valid HTML document that loads our stylesheet.

**💡 Concept**
Standard HTML5 boilerplate with the stylesheet linked in the `<head>`.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Kinetic Loader</title>
  </head>
  <body>

    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**

- The usual boilerplate: encoding, responsive viewport, linked stylesheet, page title.
- You'll notice `<script src="script.js"></script>` at the bottom. This is a **leftover from the project template** — this project has **no** `script.js` file and needs none. The browser will quietly skip the missing file (a harmless 404); we keep the tag to match the original source exactly. Everything visual comes from CSS.

**✅ Checkpoint**
Open `index.html`. A blank page titled "Kinetic Loader". The console may note that `script.js` wasn't found — that's expected and harmless.

---

### Step 2: Add the loader element

**🎯 Goal**
Add the single element that will become the entire animation.

**💡 Concept**
We don't need shapes in the HTML. One empty `<div>` is enough — CSS pseudo-elements will draw everything.

**📝 Code**

```html
<!-- goes in index.html, inside <body>, above the <script> tag -->
<div class="kinetic"></div>
```

**🔍 Explanation**
`.kinetic` is an empty container. On its own it shows nothing, but it gives CSS an anchor to attach the `::before` and `::after` shapes to.

**✅ Checkpoint**
Reload. Still a blank page — the div has no size or content yet. That's correct.

---

### Step 3: Add the reset and center the stage

**🎯 Goal**
Set a predictable box model and put a dark, full-screen background with the loader centered.

**💡 Concept**
`box-sizing: border-box` makes sizing predictable. A Flexbox `body` set to `100vh` centers its child both horizontally and vertically. `overflow: hidden` hides anything that peeks past the edges during rotation.

**📝 Code**

```css
/* goes in style.css */
* {
  box-sizing: border-box;
}

body {
  background-color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}
```

**🔍 Explanation**

- `* { box-sizing: border-box }` includes padding/border inside declared widths.
- `background-color: #2c3e50` is the dark slate background.
- `display: flex` + `align-items: center` + `justify-content: center` center the `.kinetic` div; `height: 100vh` makes the body fill the screen so centering is visible.
- `overflow: hidden` prevents scrollbars if the spinning shapes reach past the viewport; `margin: 0` removes the default body gap.

**✅ Checkpoint**
Reload. The whole page is now dark slate-blue. Still nothing in the center — we haven't drawn the shapes yet.

---

### Step 4: Size the loader box

**🎯 Goal**
Give `.kinetic` a fixed size and make it a positioning anchor.

**💡 Concept**
`position: relative` turns `.kinetic` into the reference point for its absolutely-positioned pseudo-elements (coming next). The width/height define the space the animation occupies.

**📝 Code**

```css
/* goes in style.css */
.kinetic {
  position: relative;
  height: 80px;
  width: 80px;
}
```

**🔍 Explanation**

- `position: relative` means any child positioned with `position: absolute` (our triangles) will be placed relative to this box.
- `height`/`width: 80px` set the loader's footprint.

**✅ Checkpoint**
Reload. Still visually blank (an empty 80×80 box has nothing to show), but the stage is set. No errors.

---

### Step 5: Draw the triangles with pseudo-elements

**🎯 Goal**
Create two white triangles using `::before` and `::after` — no extra HTML.

**💡 Concept**
The **border triangle trick**: give an element `width: 0; height: 0` and thick borders. Each border renders as a slanted trapezoid; if three borders are `transparent` and only one is colored, you're left with a single triangle. A pseudo-element needs the `content` property to appear at all.

**📝 Code**

```css
/* goes in style.css */
.kinetic::after,
.kinetic::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border: 50px solid transparent;
  border-bottom-color: #fff;
  animation: rotateA 2s linear infinite 0.5s;
}
```

**🔍 Explanation**

- `content: ''` makes each pseudo-element render (pseudo-elements are invisible without it).
- `position: absolute; top: 0; left: 0` stacks both at the top-left of `.kinetic`.
- `width: 0; height: 0` + `border: 50px solid transparent` collapse the box to nothing but four 50px borders.
- `border-bottom-color: #fff` colors only the bottom border white, leaving a single upward-pointing white triangle.
- `animation: rotateA 2s linear infinite 0.5s` says "run the `rotateA` animation over 2s, at a constant speed (`linear`), forever (`infinite`), starting after a `0.5s` delay." We haven't **defined** `rotateA` yet, so for now nothing moves — an animation pointing at an undefined name is simply ignored.

**✅ Checkpoint**
Reload. A single white triangle appears near the center (both pseudo-elements overlap perfectly, so they look like one). It's static for now.

---

### Step 6: Rotate one triangle to form the shape

**🎯 Goal**
Offset the `::before` triangle by 90° so the two triangles form the loader's signature shape, and give it its own animation.

**💡 Concept**
The shared rule above styled both pseudo-elements identically. Now we target **only** `::before` to rotate it and assign it a *different* animation (`rotateB`) so the two halves will eventually move out of sync.

**📝 Code**

```css
/* goes in style.css */
.kinetic::before {
  transform: rotate(90deg);
  animation: rotateB 2s linear infinite;
}
```

**🔍 Explanation**

- `transform: rotate(90deg)` spins the `::before` triangle a quarter-turn, so instead of overlapping the `::after` triangle it points a different way — together they read as a two-part kinetic figure.
- `animation: rotateB 2s linear infinite` assigns `::before` a separate animation (`rotateB`) with **no delay**, while `::after` uses `rotateA` with a `0.5s` delay. That mismatch is what makes them chase each other. Both `rotateA` and `rotateB` are still undefined, so nothing moves yet.

**✅ Checkpoint**
Reload. You now see **two** white triangles at different angles forming a single shape. Still static — keyframes come next.

---

### Step 7: Define the first animation (`rotateA`)

**🎯 Goal**
Bring the `::after` triangle to life with a stepped rotation loop.

**💡 Concept**
`@keyframes` defines the waypoints of an animation. Grouping percentages (e.g. `0%, 25%`) makes the shape **pause** at an angle, then snap to the next — that hold-and-turn rhythm is what gives the loader its "kinetic" feel rather than a smooth spin.

**📝 Code**

```css
/* goes in style.css */
@keyframes rotateA {
  0%,
  25% {
    transform: rotate(0deg);
  }

  50%,
  75% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
```

**🔍 Explanation**

- From `0%` to `25%` the triangle holds at `0deg`, then turns to `180deg` and holds from `50%` to `75%`, then completes a full `360deg` by `100%`.
- The paired percentages create deliberate pauses; because `.kinetic::after` referenced `rotateA` in Step 5, defining it here activates that triangle's motion.

**✅ Checkpoint**
Reload. One of the two triangles now rotates in a pause-turn-pause rhythm. The other is still frozen (its `rotateB` isn't defined yet).

---

### Step 8: Define the second animation (`rotateB`)

**🎯 Goal**
Animate the `::before` triangle so both halves move together in staggered harmony — completing the effect.

**💡 Concept**
`rotateB` mirrors `rotateA` but is offset by 90° (it starts where the rotated `::before` sits). Combined with `rotateA`'s `0.5s` delay, the two triangles are always slightly out of phase, producing the continuous kinetic motion.

**📝 Code**

```css
/* goes in style.css */
@keyframes rotateB {
  0%,
  25% {
    transform: rotate(90deg);
  }

  50%,
  75% {
    transform: rotate(270deg);
  }

  100% {
    transform: rotate(450deg);
  }
}
```

**🔍 Explanation**

- The angles (`90 → 270 → 450`) are `rotateA`'s angles plus the initial 90° offset, so `::before` keeps its quarter-turn head start throughout the loop.
- With `::before` (no delay) and `::after` (`0.5s` delay) both looping every 2s but starting at different times and angles, the triangles perpetually chase one another — the finished kinetic loader.

**✅ Checkpoint**
Reload. Both triangles now rotate on staggered timing, folding and flipping around the center in a smooth infinite loop. Done!

---

## 5. Final Full Code (Reference)

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Kinetic Loader</title>
  </head>
  <body>
    <div class="kinetic"></div>
    
    <script src="script.js"></script>
  </body>
</html>
```

### `style.css`

```css
* {
  box-sizing: border-box;
}

body {
  background-color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.kinetic {
  position: relative;
  height: 80px;
  width: 80px;
}

.kinetic::after,
.kinetic::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border: 50px solid transparent;
  border-bottom-color: #fff;
  animation: rotateA 2s linear infinite 0.5s;
}

.kinetic::before {
  transform: rotate(90deg);
  animation: rotateB 2s linear infinite;
}

@keyframes rotateA {
  0%,
  25% {
    transform: rotate(0deg);
  }

  50%,
  75% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes rotateB {
  0%,
  25% {
    transform: rotate(90deg);
  }

  50%,
  75% {
    transform: rotate(270deg);
  }

  100% {
    transform: rotate(450deg);
  }
}
```

### `script.js`

There is **no `script.js`** for this project. The Kinetic Loader is a pure HTML + CSS animation — all motion comes from the `@keyframes` rules above. (The `<script src="script.js">` tag in the HTML is a harmless leftover from the project template.)

## 6. Recap & Next Steps

**What you learned**

- Generating shapes from nothing using `::before` / `::after` and the `content` property.
- The border triangle trick: `width/height: 0` + transparent borders + one colored border.
- Writing `@keyframes` with grouped percentages to create pause-and-turn motion.
- Coordinating two animations with different names, delays, and starting angles for a staggered effect.

**Enhancement challenges**

1. **Recolor it** — change `border-bottom-color` and the background to match your own theme, or give each triangle a different color.
2. **Resize it** — scale the loader by adjusting the `border` width and the `.kinetic` dimensions together.
3. **Change the tempo** — experiment with the `2s` duration and the `0.5s` delay to speed up or further stagger the motion.
4. **Swap the easing** — try `ease-in-out` instead of `linear` and observe how the rhythm changes.
5. **Add a caption** — place a pulsing "Loading..." text under the loader using a third `@keyframes` animation on opacity.
