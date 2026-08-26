# Blurry Loading

A code-along tutorial that rebuilds this project from three empty files. Follow it top to bottom to reproduce the exact app in this folder.

## 1. Project Overview

A loading screen where a **blurred background photo gradually sharpens** as a percentage counter climbs from 0% to 100%, while the percentage text simultaneously fades out.

**Key concepts involved**

- Running code repeatedly with `setInterval` and stopping it with `clearInterval`
- The CSS `filter: blur()` effect, driven from JavaScript
- Mapping a number from one range to another (linear interpolation)
- Updating text and inline styles on each tick

**HTML skills you'll gain**

- A minimal page: one background `<section>` and one text `<div>`
- Understanding that an empty element can be purely visual (the background)

**CSS skills you'll gain**

- `background: url(...) no-repeat center center/cover` shorthand
- `filter: blur()` for a frosted effect
- Oversizing an element with `calc()` so blurred edges don't show gaps
- Stacking behind content with `z-index`

**JavaScript skills you'll gain**

- `setInterval` / `clearInterval` for timed, repeating work
- Reading and updating an element's `.innerText`
- Setting inline styles (`element.style.opacity`, `element.style.filter`)
- Writing and reusing a small utility function (range mapping)
- Template literals (backtick strings) to build CSS values

## 2. Final Project Preview

**Layout & colors**

- A full-screen photo fills the background, heavily **blurred** at first.
- Centered on top: large white text showing the loading percentage, starting at `0%`.

**Behavior & interactions**

- On page load, a timer starts automatically. Every 30 milliseconds the counter increases by 1.
- As the number rises, the background photo's blur **decreases** (30px → 0px) so it sharpens into focus.
- At the same time the percentage text's **opacity fades** (fully visible → fully transparent).
- When it reaches 100%, the timer stops: the image is crisp and the text has faded away.

**What you can interact with**

- Nothing — this is an automatic animation. (Reload the page to watch it again.)

## 3. Prerequisites

**You should know**

- Basic HTML and CSS
- Basic JavaScript: variables, functions, and arithmetic

**Tools**

- A modern web browser
- A text editor (VS Code recommended)
- Optional: the **Live Server** VS Code extension
- An internet connection (the background photo and font load from the web)

**Files to create**

```
blurry-loading/
├── index.html
├── style.css
└── script.js
```

## 4. Build the Project Step-by-Step

### Step 1: HTML Boilerplate

**🎯 Goal**
Create the page skeleton and link the CSS and JS.

**💡 Concept**
Standard HTML setup — stylesheet in the `<head>`, script at the end of the `<body>`.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Blurry Loading</title>
  </head>
  <body>
    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**

- `<link>` connects `style.css`.
- `<script src="script.js">` at the bottom guarantees the elements exist before the JS runs.

**✅ Checkpoint**
A blank page titled "Blurry Loading".

---

### Step 2: Add the Background and the Loading Text

**🎯 Goal**
Add the two elements we'll animate: the background layer and the percentage text.

**💡 Concept**
The background is an empty `<section>` styled purely with CSS (no content needed). The `.loading-text` starts at `0%` and JS will update it.

**📝 Code**

```html
<!-- goes in index.html — inside <body>, above the <script> -->
<section class="bg"></section>
<div class="loading-text">0%</div>
```

**🔍 Explanation**

- `.bg` is intentionally empty — it exists only to hold the background image and its blur.
- `.loading-text` shows the starting value `0%`; JavaScript will change this number every tick.

**✅ Checkpoint**
You'll see the text `0%` in the top-left (unstyled). No background image yet.

---

### Step 3: Import the Font and Reset the Box Model

**🎯 Goal**
Load the "Ubuntu" font and normalize sizing.

**💡 Concept**
`@import` pulls in a Google Font; `box-sizing: border-box` keeps sizes predictable.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css?family=Ubuntu');

* {
  box-sizing: border-box;
}
```

**🔍 Explanation**

- `@import` must be the first line.
- The `*` reset applies `border-box` everywhere.

**✅ Checkpoint**
No visible change yet.

---

### Step 4: Center Everything on the Page

**🎯 Goal**
Center the loading text and give the page a full-height stage.

**💡 Concept**
Flexbox centering on a full-viewport-height body, with overflow hidden because our background will be *bigger* than the screen.

**📝 Code**

```css
/* goes in style.css */
body {
  font-family: 'Ubuntu', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}
```

**🔍 Explanation**

- `display: flex` + `align-items`/`justify-content: center` center the percentage text.
- `height: 100vh` fills the screen height.
- `overflow: hidden` clips the oversized background (next step) so its extra edges never cause scrollbars.
- `margin: 0` removes the default body margin.

**✅ Checkpoint**
The `0%` text is now centered on the page.

---

### Step 5: Style the Blurred Background

**🎯 Goal**
Fill the screen with the photo, place it behind everything, and set up the blur.

**💡 Concept**
We make `.bg` slightly **larger than the viewport** and offset it by `-30px`. Why? A blur softens (and effectively shrinks) the edges of an element — oversizing hides those soft edges so no gap shows around the screen.

**📝 Code**

```css
/* goes in style.css */
.bg {
  background: url('https://images.unsplash.com/photo-1576161787924-01bb08dad4a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2104&q=80')
    no-repeat center center/cover;
  position: absolute;
  top: -30px;
  left: -30px;
  width: calc(100vw + 60px);
  height: calc(100vh + 60px);
  z-index: -1;
  filter: blur(0px);
}
```

**🔍 Explanation**

- `background: url(...) no-repeat center center/cover` loads the photo once, centers it, and scales it to `cover` the whole element.
- `position: absolute` with `top/left: -30px` shifts it up and left; `width: calc(100vw + 60px)` / `height: calc(100vh + 60px)` make it 60px bigger than the viewport in each dimension — so the `-30px` offset on each side keeps it fully covering the screen even when blurred.
- `z-index: -1` places it **behind** the loading text.
- `filter: blur(0px)` sets a starting blur of 0 — JavaScript will raise this at load time and animate it down. (The visual blur is driven entirely from JS; this line just declares the property.)

**✅ Checkpoint**
The photo now fills the background behind the centered text.

---

### Step 6: Style the Loading Text

**🎯 Goal**
Make the percentage large and white so it reads clearly over the photo.

**💡 Concept**
Simple typography styling — size and color.

**📝 Code**

```css
/* goes in style.css */
.loading-text {
  font-size: 50px;
  color: #fff;
}
```

**🔍 Explanation**

- `font-size: 50px` makes the number prominent.
- `color: #fff` keeps it readable over the darker areas of the photo.

**✅ Checkpoint**
A large white `0%` sits centered over the background. Styling is complete — now the animation.

---

### Step 7: Select the Elements and Set Up State

**🎯 Goal**
Grab the two elements we'll animate and create the counter.

**💡 Concept**
We need references to the text and background, plus a `load` variable that counts from 0 upward — our single piece of state.

**📝 Code**

```js
// goes in script.js
const loadText = document.querySelector('.loading-text')
const bg = document.querySelector('.bg')

let load = 0
```

**🔍 Explanation**

- `loadText` is the percentage `<div>`; `bg` is the background `<section>`.
- `let load = 0` is the counter. It's `let` (not `const`) because it changes every tick.

**✅ Checkpoint**
No visible change. In the DevTools Console, type `load` — it should be `0`.

---

### Step 8: Write the Range-Mapping Helper

**🎯 Goal**
Create a `scale()` function that converts one number range into another.

**💡 Concept**
Our counter runs 0-100, but we need an **opacity** (1 → 0) and a **blur** (30px → 0px). `scale()` is a reusable linear-interpolation helper that maps a value from an input range onto an output range.

**📝 Code**

```js
// goes in script.js
// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}
```

**🔍 Explanation**

- Given `num` within `[in_min, in_max]`, it returns the matching value within `[out_min, out_max]`.
- Example: `scale(50, 0, 100, 1, 0)` → `0.5` (halfway through 0-100 maps to halfway between 1 and 0).
- Note the output range can run *backwards* (`out_min` bigger than `out_max`), which is exactly how we make opacity and blur *decrease* as the counter *increases*.

**✅ Checkpoint**
In the Console, run `scale(50, 0, 100, 30, 0)` — it should return `15` (the midpoint of a 30 → 0 range).

---

### Step 9: Write the `blurring` Function

**🎯 Goal**
Create the function that runs on every tick: bump the counter, update the text, and adjust opacity and blur.

**💡 Concept**
This is the heart of the animation. Each call advances `load` by one and re-renders the text, the text's opacity, and the background's blur based on the new value.

**📝 Code**

```js
// goes in script.js — place this ABOVE the scale() helper from Step 8
function blurring() {
  load++

  if (load > 99) {
    clearInterval(int)
  }

  loadText.innerText = `${load}%`
  loadText.style.opacity = scale(load, 0, 100, 1, 0)
  bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`
}
```

**🔍 Explanation**

- `load++` increases the counter by 1 each call.
- `if (load > 99) clearInterval(int)` stops the timer once we reach 100 (`int` is the timer we create next step).
- `loadText.innerText = \`${load}%\`` updates the visible number using a **template literal** (backtick string with `${...}` interpolation).
- `loadText.style.opacity = scale(load, 0, 100, 1, 0)` maps 0-100 to opacity 1 → 0, so the text fades out as loading progresses.
- `bg.style.filter = \`blur(${scale(load, 0, 100, 30, 0)}px)\`` maps 0-100 to a blur of 30px → 0px, so the photo sharpens. Note we build the full CSS string like `blur(15px)`.

**✅ Checkpoint**
No change yet — nothing calls `blurring()` until the next step. (`clearInterval(int)` referencing `int` is fine because the function only *runs* after we create `int`.)

---

### Step 10: Start the Timer

**🎯 Goal**
Kick off the animation by running `blurring()` repeatedly.

**💡 Concept**
`setInterval(fn, ms)` calls `fn` every `ms` milliseconds and returns an ID we store so we can stop it later with `clearInterval`.

**📝 Code**

```js
// goes in script.js — place this ABOVE the blurring() function, right after `let load = 0`
let int = setInterval(blurring, 30)
```

**🔍 Explanation**

- `setInterval(blurring, 30)` runs `blurring` every 30ms — about 33 times per second.
- The returned timer ID is saved in `int`, which `blurring` uses to `clearInterval(int)` and stop itself at 100%.
- This works even though `int` appears *above* the `blurring` definition: `blurring` is a hoisted function declaration, and it doesn't actually run until 30ms later, by which point the whole script (including `scale`) has loaded.

> **Ordering note:** For clear teaching we introduced `scale` → `blurring` → `setInterval`. The source file lists them as `setInterval` → `blurring` → `scale`. Both run identically thanks to function-declaration hoisting; the [Final Full Code](#5-final-full-code-reference) below shows the original order.

**✅ Checkpoint**
Done! Reload the page: the counter races from 0% to 100%, the background sharpens from blurry to crisp, and the text fades away as it finishes. 🎉

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
    <title>Blurry Loading</title>
  </head>
  <body>
    <section class="bg"></section>
    <div class="loading-text">0%</div>

    <script src="script.js"></script>
  </body>
</html>
```

### `style.css`

```css
@import url('https://fonts.googleapis.com/css?family=Ubuntu');

* {
  box-sizing: border-box;
}

body {
  font-family: 'Ubuntu', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.bg {
  background: url('https://images.unsplash.com/photo-1576161787924-01bb08dad4a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2104&q=80')
    no-repeat center center/cover;
  position: absolute;
  top: -30px;
  left: -30px;
  width: calc(100vw + 60px);
  height: calc(100vh + 60px);
  z-index: -1;
  filter: blur(0px);
}

.loading-text {
  font-size: 50px;
  color: #fff;
}
```

### `script.js`

```js
const loadText = document.querySelector('.loading-text')
const bg = document.querySelector('.bg')

let load = 0

let int = setInterval(blurring, 30)

function blurring() {
  load++

  if (load > 99) {
    clearInterval(int)
  }

  loadText.innerText = `${load}%`
  loadText.style.opacity = scale(load, 0, 100, 1, 0)
  bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`
}

// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}
```

## 6. Recap & Next Steps

**What you learned**

- Driving an animation with `setInterval` and cleanly stopping it with `clearInterval`.
- Manipulating CSS `filter: blur()` and `opacity` from JavaScript.
- Writing a reusable range-mapping (`scale`) helper — a genuinely useful tool for many effects.
- Building CSS value strings with template literals.
- How function-declaration hoisting lets you reference a function before its definition.

**Enhancement challenges**

1. **Slow it down / speed it up:** change the `30` in `setInterval` and observe the pace.
2. **Reveal content when done:** after `clearInterval`, fade in a hidden "Welcome" message.
3. **Randomize the image:** swap the Unsplash URL for `https://source.unsplash.com/random` on each load.
4. **Refactor to `requestAnimationFrame`** instead of `setInterval` for smoother, frame-synced animation.
5. **Add a second blur direction:** make the image start sharp and blur *out* as an "exit" animation.
