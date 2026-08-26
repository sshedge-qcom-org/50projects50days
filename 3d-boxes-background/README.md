# 3d Background Boxes

## 1. Project Overview

This project builds a grid of **16 "3D" boxes** that together display a single animated GIF, like a video wall. A **Magic** button toggles a class that spins every box a full turn and spreads the grid apart — then back together — with a smooth transition.

**Key concepts involved**
- Generating repeated DOM elements with nested loops
- Slicing one image across many tiles using `background-position`
- Faking 3D depth with CSS pseudo-elements (`::before` / `::after`) and `transform: skew`
- Animating state changes by toggling a class + CSS `transition`
- A single click handler using `classList.toggle`

**HTML skills you'll gain**
- A minimal structure: one button, one empty container
- Starting an element with multiple classes (`class="boxes big"`)

**CSS skills you'll gain**
- Importing multiple Google Fonts
- Styling a button with `:focus` and `:active` states and a "press down" effect
- Building a flex grid and animating size/rotation with `transition`
- Creating a 3D-looking box using skewed pseudo-elements

**JavaScript skills you'll gain**
- Selecting elements with `getElementById`
- Toggling a class on click with `classList.toggle`
- Creating elements in nested loops and positioning a shared background with math
- Appending generated elements to the DOM

---

## 2. Final Project Preview

**Layout & colors**
- A near-white page with a yellow **Magic 🎩** button fixed near the top.
- Centered on screen, a grid of 16 square tiles. Each tile shows a slice of one animated GIF, so together they look like a single moving image — with a subtle 3D "extruded" edge on the right and bottom of every tile.

**Behavior & interactions**
- The page **starts** in the "big" state.
- Clicking **Magic** toggles the `big` class: the whole grid grows/shrinks and every tile does a full 360° spin thanks to a CSS transition. In the tight (non-big) state the slices line up into one seamless image; in the big state the tiles spread apart.
- The button visibly "presses down" when clicked.

**What the user can interact with**
- The **Magic** button. Each click animates the grid between its two states.

---

## 3. Prerequisites

**Basic knowledge required**
- HTML structure.
- CSS positioning, pseudo-elements, and transforms (we explain the tricky parts).
- JavaScript basics: variables, loops, functions, and events.

**Tools needed**
- A modern browser.
- A text editor (VS Code recommended).
- An internet connection (fonts and the GIF load from the web).
- Optional: the **Live Server** extension.

**Files to create**

```
3d-boxes-background/
├── index.html
├── style.css
└── script.js
```

Create the three empty files now.

---

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML skeleton

**🎯 Goal**
Start with a valid, empty HTML5 page titled "3D Boxes Background".

**💡 Concept**
The standard boilerplate configures encoding and responsive scaling.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>3D Boxes Background</title>
  </head>
  <body></body>
</html>
```

**🔍 Explanation**
- Standard HTML5 document setup with the correct tab title.

**✅ Checkpoint**
Blank page, correct tab title, no errors.

---

### Step 2: Link the icon library, stylesheet, and script

**🎯 Goal**
Wire up the CSS and JS (and the Font Awesome CDN the original includes).

**💡 Concept**
The source loads Font Awesome, though the only decoration we use is the 🎩 **emoji** (a plain Unicode character, not an icon font). We keep the link to match the original; you could remove it without changing anything.

**📝 Code**

```html
<!-- goes in index.html: inside <head>, before your own stylesheet -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
  integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=="
  crossorigin="anonymous"
/>
<link rel="stylesheet" href="style.css" />
```

```html
<!-- goes in index.html: just before the closing </body> tag -->
<script src="script.js"></script>
```

**🔍 Explanation**
- The Font Awesome `<link>` is included to mirror the source (it isn't strictly required here).
- `style.css` loads after it; the `<script>` goes at the bottom so the DOM exists first.

**✅ Checkpoint**
Blank page, no 404s in DevTools → Network.

---

### Step 3: Add the button and the boxes container

**🎯 Goal**
Add the Magic button and the empty container JavaScript will fill with tiles.

**💡 Concept**
An element can start with **multiple classes**. Here the container has both `boxes` (base styles) and `big` (the "grown/spun" state) — so the page loads in the big state, and clicking will toggle `big` off and on.

**📝 Code**

```html
<!-- goes in index.html: inside <body> -->
<button id="btn" class="magic">Magic 🎩</button>
<div id="boxes" class="boxes big"></div>
```

**🔍 Explanation**
- `<button id="btn" class="magic">` — `id` is the JS hook; `magic` is for styling. 🎩 is just an emoji in the label.
- `<div id="boxes" class="boxes big">` — starts empty; `boxes` holds the grid layout and `big` is the toggled state. JavaScript will inject 16 tiles here.

**✅ Checkpoint**
You'll see an unstyled "Magic 🎩" button. The container is empty and invisible.

---

### Step 4: Import the fonts and reset box sizing

**🎯 Goal**
Load the Roboto and Poppins fonts and normalize box sizing.

**💡 Concept**
You can `@import` several fonts. Roboto is used for the page, Poppins for the button.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
  box-sizing: border-box;
}
```

**🔍 Explanation**
- The two `@import` lines (which must come first) download Roboto and Poppins.
- `*` applies `border-box` sizing everywhere.

**✅ Checkpoint**
No visible change yet. No errors.

---

### Step 5: Style and center the page

**🎯 Goal**
Set the page background/font and center the grid, hiding overflow.

**💡 Concept**
A full-height flex column centers the grid. `overflow: hidden` keeps the spinning/spreading tiles from creating scrollbars.

**📝 Code**

```css
/* goes in style.css */
body {
  background-color: #fafafa;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
}
```

**🔍 Explanation**
- `background-color: #fafafa` is a soft off-white; `font-family: 'Roboto'` sets the page font.
- The flex column with centered items centers content on both axes; `height: 100vh` fills the viewport.
- `overflow: hidden` clips any tiles that move beyond the edges during animation.

**✅ Checkpoint**
The button moves toward the center (we'll pin it to the top next). Background is off-white.

---

### Step 6: Style the Magic button

**🎯 Goal**
Give the button its yellow look and fix it near the top of the screen.

**💡 Concept**
`position: fixed` keeps the button pinned relative to the viewport (not the grid), and a high `z-index` keeps it above the tiles. The `box-shadow` creates a subtle raised, tactile look.

**📝 Code**

```css
/* goes in style.css */
.magic {
  background-color: #f9ca24;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  border: 0;
  border-radius: 3px;
  font-size: 16px;
  padding: 12px 20px;
  cursor: pointer;
  position: fixed;
  top: 20px;
  letter-spacing: 1px;
  box-shadow: 0 3px rgba(249, 202, 36, 0.5);
  z-index: 100;
}
```

**🔍 Explanation**
- Yellow background, white text, Poppins font, no border, slightly rounded.
- `position: fixed; top: 20px` pins it near the top; `z-index: 100` keeps it above the grid.
- `box-shadow: 0 3px ...` puts a shadow directly *below* the button, making it look raised.

**✅ Checkpoint**
A yellow "Magic 🎩" button sits fixed at the top-center of the page.

---

### Step 7: Add the button's focus and pressed states

**🎯 Goal**
Remove the default focus outline and make the button "press down" when clicked.

**💡 Concept**
`:active` applies while the mouse is held down. Removing the shadow and nudging the button down with `translateY` simulates a physical press.

**📝 Code**

```css
/* goes in style.css */
.magic:focus {
  outline: none;
}

.magic:active {
  box-shadow: none;
  transform: translateY(2px);
}
```

**🔍 Explanation**
- `:focus { outline: none }` hides the browser's default focus ring.
- `:active` removes the shadow and shifts the button down 2px — matching the 3px shadow, so it looks like it presses into the page. (Note: removing focus outlines hurts keyboard accessibility; the source does it, but consider a custom focus style in real projects.)

**✅ Checkpoint**
Click and hold the button: it dips down and its shadow disappears, popping back on release.

---

### Step 8: Lay out the grid container

**🎯 Goal**
Make `.boxes` a flexible square that can grow, and define the `big` state.

**💡 Concept**
`position: relative` lets the tiles (and their pseudo-elements) position against this box. A `transition` on the container makes size changes animate smoothly.

**📝 Code**

```css
/* goes in style.css */
.boxes {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 500px;
  width: 500px;
  position: relative;
  transition: 0.4s ease;
}

.boxes.big {
  width: 600px;
  height: 600px;
}
```

**🔍 Explanation**
- `display: flex; flex-wrap: wrap` lets the 16 tiles flow into rows; `justify-content: space-around` distributes them.
- Default size is `500×500`; the `big` variant grows it to `600×600`.
- `transition: 0.4s ease` animates the size change when `big` toggles.

**✅ Checkpoint**
No visible change yet (the container is empty). We'll see it once tiles exist.

---

### Step 9: Style the tiles and their spin

**🎯 Goal**
Give each tile the shared GIF background and define the 360° spin used in the `big` state.

**💡 Concept**
Every tile paints the **same** 500×500 GIF, but (in the next step) each one shifts the image to show a different slice. `rotateZ(360deg)` combined with the tile's `transition` produces a full spin whenever `big` toggles.

**📝 Code**

```css
/* goes in style.css */
.boxes.big .box {
  transform: rotateZ(360deg);
}

.box {
  background-image: url('https://media.giphy.com/media/EZqwsBSPlvSda/giphy.gif');
  background-repeat: no-repeat;
  background-size: 500px 500px;
  position: relative;
  height: 125px;
  width: 125px;
  transition: 0.4s ease;
}
```

**🔍 Explanation**
- `.box` is 125×125 (four of them = 500px, matching the tight grid). It shows the GIF at a fixed `500px 500px` size and doesn't repeat.
- `transition: 0.4s ease` animates any transform change.
- `.boxes.big .box { transform: rotateZ(360deg) }`: when the container has `big`, every tile is rotated a full turn. Toggling `big` animates a complete spin (0° ↔ 360°) even though the start and end look identical.

**✅ Checkpoint**
Still empty — the tiles don't exist until the JavaScript step. Hang tight.

---

### Step 10: Add the 3D edges with pseudo-elements

**🎯 Goal**
Give each tile a right-side and bottom "face" so it looks like a 3D block.

**💡 Concept**
`::after` and `::before` are generated elements you can style. Positioning thin strips just outside the tile and **skewing** them makes them read as the extruded side and bottom of a 3D box.

**📝 Code**

```css
/* goes in style.css */
.box::after {
  content: '';
  background-color: #f6e58d;
  position: absolute;
  top: 8px;
  right: -15px;
  height: 100%;
  width: 15px;
  transform: skewY(45deg);
}

.box::before {
  content: '';
  background-color: #f9ca24;
  position: absolute;
  bottom: -15px;
  left: 8px;
  height: 15px;
  width: 100%;
  transform: skewX(45deg);
}
```

**🔍 Explanation**
- Both need `content: ''` to render at all.
- `::after` is a 15px-wide strip placed just off the right edge (`right: -15px`) and skewed vertically (`skewY(45deg)`) — the right "side" face.
- `::before` is a 15px-tall strip placed just below the tile (`bottom: -15px`) and skewed horizontally (`skewX(45deg)`) — the bottom face.
- The slightly different yellows give the faces a shaded, dimensional feel.

**✅ Checkpoint**
Still nothing on screen (no tiles yet). CSS is complete — time for JavaScript to build the grid.

---

### Step 11: Grab the elements and wire up the toggle

**🎯 Goal**
Get the container and button, and toggle the `big` class on each click.

**💡 Concept**
`classList.toggle('big')` adds `big` if it's absent and removes it if present — a one-liner for switching between two states. Because both the container and tiles have transitions, the switch animates.

**📝 Code**

```js
// goes in script.js
const boxesContainer = document.getElementById('boxes')
const btn = document.getElementById('btn')

btn.addEventListener('click', () => boxesContainer.classList.toggle('big'))
```

**🔍 Explanation**
- `boxesContainer` and `btn` reference the container and the button.
- On `click`, `classList.toggle('big')` flips the state. Since the page starts with `big` present, the first click removes it (grid shrinks to 500 and spins), and the next adds it back.

**✅ Checkpoint**
Clicking the button works logically, but the grid is still empty so there's nothing to see yet. One more step.

---

### Step 12: Generate the 16 tiles and slice the image

**🎯 Goal**
Create the 4×4 grid of tiles, offsetting each tile's background so together they form one image, then render them.

**💡 Concept**
This is the core trick. Every tile shows the same 500×500 GIF, but we shift each tile's `background-position` so it reveals a different 125px slice. A nested loop over rows (`i`) and columns (`j`) computes the offset for each of the 16 tiles.

**📝 Code**

```js
// goes in script.js
function createBoxes() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const box = document.createElement('div')
      box.classList.add('box')
      box.style.backgroundPosition = `${-j * 125}px ${-i * 125}px`
      boxesContainer.appendChild(box)
    }
  }
}

createBoxes()
```

**🔍 Explanation**
- The outer loop `i` is the **row** (0–3); the inner loop `j` is the **column** (0–3) — 16 tiles total.
- Each tile gets the `box` class (all the styling from Steps 9–10).
- `backgroundPosition = `${-j * 125}px ${-i * 125}px``: shifting the background *left* by `j × 125px` and *up* by `i × 125px` reveals that tile's slice of the 500×500 image. Tile (0,0) shows the top-left slice; tile (3,3) shows the bottom-right — so the 16 tiles reassemble the full GIF.
- `appendChild(box)` adds each finished tile to the container.
- `createBoxes()` runs it once on load.

**✅ Checkpoint**
Reload the page. You'll see the 16 tiles forming one animated image with 3D edges, starting in the spread-out `big` state. Click **Magic 🎩**: the grid spins a full turn and snaps the tiles tightly together into a seamless image — click again to spread and spin back. 🎉

---

## 5. Final Full Code (Reference)

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
      integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=="
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="style.css" />
    <title>3D Boxes Background</title>
  </head>
  <body>
    <button id="btn" class="magic">Magic 🎩</button>
    <div id="boxes" class="boxes big"></div>
    <script src="script.js"></script>
  </body>
</html>
```

### `style.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #fafafa;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
}

.magic {
  background-color: #f9ca24;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  border: 0;
  border-radius: 3px;
  font-size: 16px;
  padding: 12px 20px;
  cursor: pointer;
  position: fixed;
  top: 20px;
  letter-spacing: 1px;
  box-shadow: 0 3px rgba(249, 202, 36, 0.5);
  z-index: 100;
}

.magic:focus {
  outline: none;
}

.magic:active {
  box-shadow: none;
  transform: translateY(2px);
}

.boxes {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 500px;
  width: 500px;
  position: relative;
  transition: 0.4s ease;
}

.boxes.big {
  width: 600px;
  height: 600px;
}

.boxes.big .box {
  transform: rotateZ(360deg);
}

.box {
  background-image: url('https://media.giphy.com/media/EZqwsBSPlvSda/giphy.gif');
  background-repeat: no-repeat;
  background-size: 500px 500px;
  position: relative;
  height: 125px;
  width: 125px;
  transition: 0.4s ease;
}

.box::after {
  content: '';
  background-color: #f6e58d;
  position: absolute;
  top: 8px;
  right: -15px;
  height: 100%;
  width: 15px;
  transform: skewY(45deg);
}

.box::before {
  content: '';
  background-color: #f9ca24;
  position: absolute;
  bottom: -15px;
  left: 8px;
  height: 15px;
  width: 100%;
  transform: skewX(45deg);
}
```

### `script.js`

```js
const boxesContainer = document.getElementById('boxes')
const btn = document.getElementById('btn')

btn.addEventListener('click', () => boxesContainer.classList.toggle('big'))

function createBoxes() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const box = document.createElement('div')
      box.classList.add('box')
      box.style.backgroundPosition = `${-j * 125}px ${-i * 125}px`
      boxesContainer.appendChild(box)
    }
  }
}

createBoxes()
```

---

## 6. Recap & Next Steps

**What you learned**
- Generating a grid of elements with nested loops and appending them to the DOM.
- Slicing one image across many tiles by offsetting `background-position` — the "video wall" technique.
- Faking 3D with skewed `::before` / `::after` pseudo-elements.
- Animating between two states by toggling a class with `classList.toggle` plus CSS `transition`.
- Button polish with `:focus` and `:active` (and why removing focus outlines is an accessibility trade-off).

**Enhancement challenges**
1. **Make it configurable:** Replace the hard-coded `4` with a `size` variable and compute tile dimensions so you can render a 5×5 or 8×8 wall.
2. **Swap the image:** Point the background at your own image or GIF and adjust `background-size` to match.
3. **Random spins:** Give each tile a random rotation in the big state instead of a uniform 360°.
4. **Stagger the animation:** Add a small `transition-delay` per tile so they spin in a wave.
5. **Hover interaction:** Make an individual tile pop or rotate on hover, independent of the Magic button.
