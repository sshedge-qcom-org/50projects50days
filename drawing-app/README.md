# Drawing App

A code-along tutorial. You'll build this project from three empty files, one small step at a time. Read the **why** before each snippet, type the code yourself, and test at every checkpoint.

## 1. Project Overview

The Drawing App is a browser-based paint canvas: you click and drag to draw with a colored brush, change the brush size and color, and clear the canvas with one button.

**Key concepts involved**

- The HTML `<canvas>` element and its **2D rendering context** (a JavaScript object you draw shapes onto).
- **Mouse events** (`mousedown`, `mousemove`, `mouseup`) to turn dragging into drawing.
- **State variables** that remember whether the mouse is pressed, the last cursor position, the brush size, and the color.

**HTML skills you'll gain**

- Placing a `<canvas>` with fixed `width`/`height` attributes.
- Building a small toolbar of `<button>` and `<input type="color">` controls with `id`s.

**CSS skills you'll gain**

- Centering a layout with Flexbox (`display: flex`, `flex-direction: column`).
- Styling a group of children at once with the child combinator (`.toolbox > *`).
- Using `:last-child` + `margin-left: auto` to push one item to the far edge.

**JavaScript skills you'll gain**

- Grabbing elements with `getElementById` and obtaining a canvas context with `getContext('2d')`.
- Drawing circles (`arc`) and connecting lines (`moveTo`/`lineTo`) on the canvas.
- Tracking drag state across `mousedown`/`mousemove`/`mouseup`.
- Reading `offsetX`/`offsetY` for cursor coordinates and clamping a number to a range.

## 2. Final Project Preview

- **Layout:** A light grey page, centered vertically and horizontally. A large white drawing surface (800×700) framed by a steel-blue border sits on top, with a steel-blue **toolbox** bar directly beneath it.
- **The toolbox (left to right):** a `-` button, a number showing the current brush size (starts at `10`), a `+` button, a color swatch, and — pushed to the far right — an `X` button.
- **Behavior:**
  - Press the mouse on the canvas and drag to paint a smooth colored stroke.
  - Release the mouse (anywhere on the page) to stop drawing.
  - Click `+` / `-` to grow/shrink the brush by 5 (clamped between 5 and 50); the number updates.
  - Pick a color from the swatch to change the stroke color.
  - Click `X` to wipe the canvas clean.
- **You can interact with:** the canvas (draw), the `+`/`-` buttons (size), the color input (color), and the `X` button (clear).

## 3. Prerequisites

- **Knowledge:** basic HTML tags, CSS rules, and JavaScript variables/functions. No canvas experience needed — we'll build that understanding here.
- **Tools:** a modern web browser and a text editor. Optionally the VS Code **Live Server** extension for auto-reload.
- **Files to create:**

```
drawing-app/
├── index.html
├── style.css
└── script.js
```

Create all three now, empty. We'll fill them in order.

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML skeleton

**🎯 Goal**
Get a valid HTML document that loads our stylesheet and script, so everything we add later has a home.

**💡 Concept**
Every project starts with the standard HTML5 boilerplate. Linking `style.css` in the `<head>` and `script.js` at the **end of `<body>`** ensures the page's HTML exists before the script runs.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Drawing App</title>
  </head>
  <body>
    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**

- `<!DOCTYPE html>` and `lang="en"` declare a modern, English HTML page.
- The two `<meta>` tags set text encoding and make the page scale correctly on mobile.
- `<link rel="stylesheet" ...>` pulls in our CSS; `<script src="script.js">` at the bottom loads our JS **after** the markup.

**✅ Checkpoint**
Open `index.html` in the browser. You'll see a blank page with the tab titled "Drawing App". No errors in the console.

---

### Step 2: Add the drawing canvas

**🎯 Goal**
Add the surface we'll actually paint on.

**💡 Concept**
`<canvas>` is a blank rectangle you draw onto with JavaScript. Its `width` and `height` **attributes** (not CSS) define the drawing resolution — how many pixels exist to paint on. We give it an `id` so JS can find it.

**📝 Code**

```html
<!-- goes in index.html, inside <body>, above the <script> tag -->
<canvas id="canvas" width="800" height="700"></canvas>
```

**🔍 Explanation**

- `id="canvas"` is the hook our script uses to grab this element.
- `width="800" height="700"` sets the canvas to 800×700 drawing pixels. Setting these as attributes (rather than in CSS) keeps the drawing coordinates crisp and 1:1 with the cursor.

**✅ Checkpoint**
Reload. The page is still mostly blank because the canvas has no border yet — but it's there. (You can confirm it in the browser's element inspector.)

---

### Step 3: Add the toolbox controls

**🎯 Goal**
Add the toolbar: brush-size buttons, a size readout, a color picker, and a clear button.

**💡 Concept**
Each control gets a unique `id` so JavaScript can attach behavior later. `<input type="color">` renders a native color-swatch picker for free.

**📝 Code**

```html
<!-- goes in index.html, directly below the <canvas>, above <script> -->
<div class="toolbox">
  <button id="decrease">-</button>
  <span id="size">10</span>
  <button id="increase">+</button>
  <input type="color" id="color">
  <button id="clear">X</button>
</div>
```

**🔍 Explanation**

- `#decrease` / `#increase` will shrink/grow the brush; `#size` displays the current size, starting at `10`.
- `#color` is the color picker; `#clear` wipes the canvas.
- Wrapping them in `.toolbox` lets us style and lay them out as a single bar.

**✅ Checkpoint**
Reload. You'll see unstyled buttons, the number `10`, a color box, and an `X` stacked below the (still invisible) canvas.

---

### Step 4: Add base styles — font, reset, and page layout

**🎯 Goal**
Load a nice font, apply a sane box model, and center everything on the page.

**💡 Concept**
`box-sizing: border-box` makes width/height include padding and border (far more predictable). A Flexbox `body` with `flex-direction: column` stacks the canvas and toolbox vertically and centers them.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #f5f5f5;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
}
```

**🔍 Explanation**

- `@import` loads the Roboto font from Google Fonts.
- `* { box-sizing: border-box }` applies the friendlier box model to every element.
- On `body`: a light grey background; Flexbox with `column` direction; `align-items`/`justify-content: center` center content both ways; `height: 100vh` makes the body fill the viewport so centering is visible; `margin: 0` removes the default body gap.

**✅ Checkpoint**
Reload. The buttons and controls are now centered on a light grey page using the Roboto font.

---

### Step 5: Style the canvas

**🎯 Goal**
Make the drawing area visible with a border.

**💡 Concept**
A single border turns the invisible canvas into an obvious white "paper" you can aim at.

**📝 Code**

```css
/* goes in style.css */
canvas {
  border: 2px solid steelblue;
}
```

**🔍 Explanation**
A 2px steel-blue border outlines the 800×700 canvas so you can see exactly where the drawable area starts and ends.

**✅ Checkpoint**
Reload. A large white rectangle with a steel-blue outline now appears, centered above the controls.

---

### Step 6: Style the toolbox bar

**🎯 Goal**
Turn the stacked controls into a horizontal steel-blue toolbar that lines up with the canvas.

**💡 Concept**
`display: flex` on the container arranges its children in a row. Matching the width to the canvas (`804px` = 800 + the 2px border on each side) makes the bar align perfectly beneath it.

**📝 Code**

```css
/* goes in style.css */
.toolbox {
  background-color: steelblue;
  border: 1px solid slateblue;
  display: flex;
  width: 804px;
  padding: 1rem;
}
```

**🔍 Explanation**

- `background-color: steelblue` + `border: 1px solid slateblue` give the bar its look.
- `display: flex` lays the controls out in a row.
- `width: 804px` matches the canvas plus its 2px borders so the edges line up; `padding: 1rem` adds breathing room inside.

**✅ Checkpoint**
Reload. The controls now sit in a horizontal steel-blue bar the same width as the canvas.

---

### Step 7: Style the controls and push Clear to the right

**🎯 Goal**
Make every control a uniform white square, and shove the `X` (clear) button to the far right.

**💡 Concept**
`.toolbox > *` is the **child combinator** — it styles every direct child of `.toolbox` identically. Then `:last-child { margin-left: auto }` uses an auto margin to absorb all leftover space, pushing the final item (Clear) to the right edge.

**📝 Code**

```css
/* goes in style.css */
.toolbox > * {
  background-color: #fff;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  height: 50px;
  width: 50px;
  margin: 0.25rem;
  padding: 0.25rem;
  cursor: pointer;
}

.toolbox > *:last-child {
  margin-left: auto;
}
```

**🔍 Explanation**

- `.toolbox > *` gives each control a white background, no border, a fixed 50×50 size, centered 2rem content, small margins/padding, and a pointer cursor.
- `inline-flex` + centering keeps each label (`-`, `+`, `X`, the number) perfectly centered in its square.
- `.toolbox > *:last-child { margin-left: auto }` pushes the last child (the `X` button) to the far right, separating it from the size/color controls.

**✅ Checkpoint**
Reload. The toolbar shows four neat white squares on the left (`-`, `10`, `+`, color) with the `X` sitting alone at the right. The layout is now complete — time for interactivity.

---

### Step 8: Grab the elements and the 2D drawing context

**🎯 Goal**
Connect JavaScript to the canvas and every control, and get the object we actually draw with.

**💡 Concept**
`canvas.getContext('2d')` returns the **2D rendering context** — the toolkit of methods (`arc`, `moveTo`, `fill`, `stroke`, ...) you call to paint pixels. You never draw on the `<canvas>` directly; you draw through its context.

**📝 Code**

```js
// goes in script.js
const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEL = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');

const ctx = canvas.getContext('2d');
```

**🔍 Explanation**

- Each `getElementById` stores a reference to a control so we can listen for clicks later.
- `ctx` (short for "context") is the 2D drawing interface for the canvas. Every drawing command from here on goes through `ctx`.
- Note the variable name `sizeEL` (capital `E`, capital `L`) — we keep it exactly as in the source so later references match.

**✅ Checkpoint**
Reload. Nothing visibly changes, but the console shows no errors. If you type `ctx` in the console you'll see a `CanvasRenderingContext2D` object.

---

### Step 9: Set up the state variables

**🎯 Goal**
Create the variables that remember the brush size, whether we're drawing, the color, and the last cursor position.

**💡 Concept**
Interactive apps need **state** — plain variables that hold "what's true right now." We'll read and update these as the user drags and clicks.

**📝 Code**

```js
// goes in script.js
let size = 10
let isPressed = false
colorEl.value = 'black'
let color = colorEl.value
let x
let y
```

**🔍 Explanation**

- `size` is the current brush radius (starts at 10, matching the HTML readout).
- `isPressed` tracks whether the mouse button is currently held down — the on/off switch for drawing.
- `colorEl.value = 'black'` sets the color picker's default, and `color` caches that value for drawing.
- `x` and `y` (undefined for now) will store the **previous** cursor position between mouse-move events.

**✅ Checkpoint**
Reload. The color swatch now defaults to black. No console errors.

---

### Step 10: Track when the mouse is pressed

**🎯 Goal**
Flip `isPressed` on when the user presses down on the canvas, and off when they release.

**💡 Concept**
Drawing should only happen while the button is held. We listen for `mousedown` on the canvas to start, and `mouseup` on the **whole document** to stop — so releasing outside the canvas still ends the stroke. `e.offsetX`/`e.offsetY` give the cursor position **relative to the canvas**.

**📝 Code**

```js
// goes in script.js
canvas.addEventListener('mousedown', (e) => {
    isPressed = true

    x = e.offsetX
    y = e.offsetY
})

document.addEventListener('mouseup', (e) => {
    isPressed = false

    x = undefined
    y = undefined
})
```

**🔍 Explanation**

- On `mousedown`: set `isPressed = true` and record the starting point in `x`/`y`.
- On `mouseup` (listened on `document`, not the canvas): set `isPressed = false` and reset `x`/`y` to `undefined` so the next stroke starts fresh.
- Listening for `mouseup` on `document` is a deliberate choice — it catches the release even if the cursor has drifted off the canvas.

**✅ Checkpoint**
Reload. Still nothing draws yet (we haven't written the draw logic), but you can add `console.log(isPressed)` inside the handlers to confirm it toggles true/false as you press and release.

---

### Step 11: Write the drawCircle helper

**🎯 Goal**
Create a function that stamps a filled circle at a given point.

**💡 Concept**
The canvas draws shapes as **paths**. `ctx.arc(x, y, radius, startAngle, endAngle)` traces a circle; `ctx.fill()` fills it. Stamping a circle at each mouse position gives strokes rounded ends and thickness.

**📝 Code**

```js
// goes in script.js
function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
}
```

**🔍 Explanation**

- `ctx.beginPath()` starts a fresh shape (so it isn't connected to previous drawings).
- `ctx.arc(x, y, size, 0, Math.PI * 2)` defines a full circle (0 to 2π radians) of radius `size` centered at `(x, y)`.
- `ctx.fillStyle = color` sets the fill color; `ctx.fill()` paints the circle solid.

**✅ Checkpoint**
Reload. No visual change yet — this is a helper we'll call in Step 13. No errors in the console.

---

### Step 12: Write the drawLine helper

**🎯 Goal**
Create a function that draws a thick line between two points.

**💡 Concept**
Circles alone leave gaps when the mouse moves fast. Connecting the previous point to the current one with a line fills those gaps, producing one smooth stroke.

**📝 Code**

```js
// goes in script.js
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.lineWidth = size * 2
    ctx.stroke()
}
```

**🔍 Explanation**

- `ctx.moveTo(x1, y1)` lifts the "pen" to the starting point without drawing.
- `ctx.lineTo(x2, y2)` traces a line to the end point.
- `ctx.strokeStyle` sets the line color; `ctx.lineWidth = size * 2` makes the line's thickness equal the circle's diameter (radius × 2) so line and circles blend seamlessly.
- `ctx.stroke()` actually renders the line.

**✅ Checkpoint**
Reload. Still no visual change — this helper is wired up next. No errors.

---

### Step 13: Draw while dragging

**🎯 Goal**
Connect movement to drawing: while the mouse is pressed, stamp a circle and connect it to the previous point.

**💡 Concept**
On every `mousemove`, if we're pressed, we draw a circle at the new position, draw a line from the old position to the new one, then remember the new position as the "old" one for next time.

**📝 Code**

```js
// goes in script.js
canvas.addEventListener('mousemove', (e) => {
    if(isPressed) {
        const x2 = e.offsetX
        const y2 = e.offsetY

        drawCircle(x2, y2)
        drawLine(x, y, x2, y2)

        x = x2
        y = y2
    }
})
```

**🔍 Explanation**

- The `if(isPressed)` guard means we only draw while the button is held.
- `x2`/`y2` are the current cursor coordinates.
- `drawCircle(x2, y2)` stamps a dot; `drawLine(x, y, x2, y2)` connects the **previous** point (`x`, `y`) to the new one.
- `x = x2; y = y2` updates the "previous point" so the next move connects from here — this chaining is what makes a continuous line.

**✅ Checkpoint**
Reload. Press and drag on the canvas — you're drawing! It's black, and about 20px thick (size 10 × 2). Release to stop.

---

### Step 14: Wire up the brush-size buttons

**🎯 Goal**
Make `+` and `-` change the brush size within safe limits and update the on-screen number.

**💡 Concept**
We adjust `size` by 5 per click, then **clamp** it so it never exceeds 50 or drops below 5. A small helper keeps the displayed number in sync with the real value.

**📝 Code**

```js
// goes in script.js
function updateSizeOnScreen() {
    sizeEL.innerText = size
}

increaseBtn.addEventListener('click', () => {
    size += 5

    if(size > 50) {
        size = 50
    }

    updateSizeOnScreen()
})

decreaseBtn.addEventListener('click', () => {
    size -= 5

    if(size < 5) {
        size = 5
    }

    updateSizeOnScreen()
})
```

**🔍 Explanation**

- `updateSizeOnScreen()` writes the current `size` into the `#size` span via `innerText`.
- The `increase` handler adds 5 and caps at 50; the `decrease` handler subtracts 5 and floors at 5. This clamping prevents an unusably huge or invisible brush.
- Both call `updateSizeOnScreen()` so the readout always matches the brush.

**✅ Checkpoint**
Reload. Click `+` and `-`: the number changes by 5 (between 5 and 50), and your next stroke is visibly thicker or thinner.

---

### Step 15: Wire up the color picker

**🎯 Goal**
Change the drawing color when the user picks a new one.

**💡 Concept**
The color `<input>` fires a `change` event when a new color is chosen. `e.target.value` holds the selected color, which we store in our `color` state variable.

**📝 Code**

```js
// goes in script.js
colorEl.addEventListener('change', (e) => color = e.target.value)
```

**🔍 Explanation**
When the user picks a color, `change` fires and `e.target.value` (a hex string like `#ff0000`) is assigned to `color`. Both `drawCircle` and `drawLine` read `color`, so every new stroke uses the chosen color.

**✅ Checkpoint**
Reload. Pick a color from the swatch, then draw — your stroke appears in that color.

---

### Step 16: Wire up the Clear button

**🎯 Goal**
Let the `X` button wipe the entire canvas.

**💡 Concept**
`ctx.clearRect(x, y, width, height)` erases a rectangular region back to transparent. Passing the full canvas dimensions clears everything.

**📝 Code**

```js
// goes in script.js
clearEl.addEventListener('click', () => ctx.clearRect(0,0, canvas.width, canvas.height))
```

**🔍 Explanation**
`clearRect(0, 0, canvas.width, canvas.height)` erases from the top-left corner across the full width and height of the canvas — a clean slate. Using `canvas.width`/`canvas.height` means it always matches the canvas size.

**✅ Checkpoint**
Reload. Draw something, then click `X` — the canvas wipes clean. The app is complete!

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
    <title>Drawing App</title>
  </head>
  <body>
    <canvas id="canvas" width="800" height="700"></canvas>
    <div class="toolbox">
      <button id="decrease">-</button>
      <span id="size">10</span>
      <button id="increase">+</button>
      <input type="color" id="color">
      <button id="clear">X</button>
    </div>

    <script src="script.js"></script>
  </body>
</html>
```

### `style.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #f5f5f5;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
}

canvas {
  border: 2px solid steelblue;
}

.toolbox {
  background-color: steelblue;
  border: 1px solid slateblue;
  display: flex;
  width: 804px;
  padding: 1rem;
}

.toolbox > * {
  background-color: #fff;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  height: 50px;
  width: 50px;
  margin: 0.25rem;
  padding: 0.25rem;
  cursor: pointer;
}

.toolbox > *:last-child {
  margin-left: auto;
}
```

### `script.js`

```js
const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEL = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');

const ctx = canvas.getContext('2d');

let size = 10
let isPressed = false
colorEl.value = 'black'
let color = colorEl.value
let x
let y

canvas.addEventListener('mousedown', (e) => {
    isPressed = true

    x = e.offsetX
    y = e.offsetY
})

document.addEventListener('mouseup', (e) => {
    isPressed = false

    x = undefined
    y = undefined
})

canvas.addEventListener('mousemove', (e) => {
    if(isPressed) {
        const x2 = e.offsetX
        const y2 = e.offsetY

        drawCircle(x2, y2)
        drawLine(x, y, x2, y2)

        x = x2
        y = y2
    }
})

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.lineWidth = size * 2
    ctx.stroke()
}

function updateSizeOnScreen() {
    sizeEL.innerText = size
}

increaseBtn.addEventListener('click', () => {
    size += 5

    if(size > 50) {
        size = 50
    }

    updateSizeOnScreen()
})

decreaseBtn.addEventListener('click', () => {
    size -= 5

    if(size < 5) {
        size = 5
    }

    updateSizeOnScreen()
})

colorEl.addEventListener('change', (e) => color = e.target.value)

clearEl.addEventListener('click', () => ctx.clearRect(0,0, canvas.width, canvas.height))
```

## 6. Recap & Next Steps

**What you learned**

- How to obtain and use a canvas **2D rendering context**.
- Drawing filled circles (`arc` + `fill`) and thick lines (`moveTo`/`lineTo` + `stroke`), and combining them for smooth strokes.
- Managing drag state with `mousedown`/`mousemove`/`mouseup` and remembering the previous point between events.
- Reading `offsetX`/`offsetY`, clamping a value to a range, and syncing UI text to state.

**Enhancement challenges**

1. **Add a "Save" button** that exports the drawing as a PNG using `canvas.toDataURL()`.
2. **Support touch devices** by adding `touchstart`/`touchmove`/`touchend` listeners alongside the mouse events.
3. **Add an eraser** that draws in the background color (or use `ctx.globalCompositeOperation = 'destination-out'`).
4. **Show a live brush preview** — a small circle that follows the cursor at the current size and color.
5. **Add undo** by saving canvas snapshots (`ctx.getImageData`) before each stroke and restoring the last one on Ctrl+Z.
