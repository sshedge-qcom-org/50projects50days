# Background Slider

A code-along tutorial that rebuilds this project from three empty files, one small step at a time.

## 1. Project Overview

The Background Slider shows a set of photos inside a framed box. Clicking the left/right arrows moves through the slides, and the **whole page background** changes to match the current slide (blurred behind a dark overlay).

**Key concepts involved**

- Tracking "which item is active" with a **state variable** and wrapping it around an array
- Toggling a CSS class to fade elements in and out
- Reading and writing inline `style` from JavaScript
- Using an icon font (Font Awesome) via a CDN

**HTML skills you'll gain**

- Linking a third-party CSS library from a **CDN**
- Setting a `background-image` with an inline `style` attribute
- Using `<button>` elements with icon `<i>` tags

**CSS skills you'll gain**

- Centering content full-screen with Flexbox and `100vh`
- Creating a full-page dark overlay with the `::before` pseudo-element and `z-index`
- Layering absolutely-positioned slides and fading them with `opacity` + `transition`
- Positioning arrow buttons with `position: fixed` and `calc()`

**JavaScript skills you'll gain**

- Selecting one vs. many elements (`getElementById` vs. `querySelectorAll`)
- Maintaining an index in a variable and **wrapping** it (last → first, first → last)
- Adding/removing classes with `classList`
- Copying one element's style onto another

## 2. Final Project Preview

**Layout & colors**

- A full-screen photo background sits behind a semi-transparent black overlay, so everything looks moody and dim.
- Centered on the page is a framed box (70% of the viewport) showing the current photo with a subtle shadow.
- Two orange-bordered arrow buttons float at the vertical middle of the screen, one on each side.

**Behavior & interactions**

- Clicking the **right** arrow advances to the next slide; past the last slide it wraps back to the first.
- Clicking the **left** arrow goes to the previous slide; before the first it wraps to the last.
- Each time the slide changes, the page's background image updates to match, and the active slide fades in while the others fade out.

**What you can interact with**

- The left arrow button.
- The right arrow button.

## 3. Prerequisites

**Basic knowledge required**

- Basic HTML, CSS, and JavaScript syntax.
- Familiarity with arrays and `if` statements helps.

**Tools needed**

- A modern web browser.
- A text editor (VS Code recommended).
- An internet connection (fonts, icons, and the photos load from the web).
- Optional: the **Live Server** extension for auto-reload.

**Files to create**

```
background-slider/
├── index.html
├── style.css
└── script.js
```

Create all three now, empty.

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML skeleton and load Font Awesome

**🎯 Goal**
Set up the HTML document and pull in the Font Awesome icon library so we can use arrow icons.

**💡 Concept**
A **CDN** (Content Delivery Network) lets you use a library by linking to a hosted file — no download needed. Font Awesome gives us scalable icons we place with `<i>` tags.

**📝 Code**

```html
<!-- goes in index.html -->
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
    <title>Background Slider</title>
  </head>
  <body>
  </body>
</html>
```

**🔍 Explanation**

- The first `<link>` loads Font Awesome from a CDN. `integrity` + `crossorigin` are a security feature ensuring the file wasn't tampered with.
- The second `<link>` loads our own `style.css` (listed after, so our styles can override library defaults).

**✅ Checkpoint**
Open `index.html`. A blank page titled "Background Slider" — no errors.

---

### Step 2: Add the slider container and first slide

**🎯 Goal**
Create the frame that holds the slides, plus the first (active) slide.

**💡 Concept**
Each slide is just a `<div>` with a `background-image` set inline. The one marked `active` is the one currently shown.

**📝 Code**

```html
<!-- goes in index.html (inside <body>) -->
<div class="slider-container">
  <div
    class="slide active"
    style="
      background-image: url('https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80');
    "
  ></div>
</div>
```

**🔍 Explanation**

- `.slider-container` is the visible frame; we'll size and clip it with CSS soon.
- The slide's photo is set with an inline `style="background-image: url(...)"`. JavaScript will later read this value to update the page background.
- The `active` class marks this as the visible slide.

**✅ Checkpoint**
Still blank (no styling yet), but the structure is taking shape.

---

### Step 3: Add the remaining four slides

**🎯 Goal**
Add the other slides so there's something to page through.

**💡 Concept**
More slides = more `<div class="slide">` elements. Only the first keeps the `active` class; the rest start hidden.

**📝 Code**

```html
<!-- goes in index.html (inside .slider-container, after the first slide) -->
<div
  class="slide"
  style="
    background-image: url('https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80');
  "
></div>

<div
  class="slide"
  style="
    background-image: url('https://images.unsplash.com/photo-1495467033336-2effd8753d51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80');
  "
></div>

<div
  class="slide"
  style="
    background-image: url('https://images.unsplash.com/photo-1522735338363-cc7313be0ae0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80');
  "
></div>

<div
  class="slide"
  style="
    background-image: url('https://images.unsplash.com/photo-1559087867-ce4c91325525?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80');
  "
></div>
```

**🔍 Explanation**

- Four more slides, each with its own photo URL, none marked `active` (so they'll be hidden once we add CSS).

**✅ Checkpoint**
No visible change yet — we still need CSS to size and show the slides.

---

### Step 4: Add the arrow buttons and script

**🎯 Goal**
Add the clickable navigation arrows and load the JavaScript.

**💡 Concept**
Buttons get unique `id`s so JS can attach click handlers. The Font Awesome `<i>` tags render the arrow glyphs.

**📝 Code**

```html
<!-- goes in index.html (inside .slider-container, after the slides) -->
<button class="arrow left-arrow" id="left">
  <i class="fas fa-arrow-left"></i>
</button>

<button class="arrow right-arrow" id="right">
  <i class="fas fa-arrow-right"></i>
</button>
```

```html
<!-- goes in index.html (after the closing </div> of .slider-container) -->
<script src="script.js"></script>
```

**🔍 Explanation**

- Each button has two classes: `arrow` (shared styling) and `left-arrow`/`right-arrow` (position), plus an `id` (`left`/`right`) for JS.
- `<i class="fas fa-arrow-left">` draws Font Awesome's left arrow; `fa-arrow-right` the right one.
- The `<script>` at the end ensures all elements exist before the script runs.

**✅ Checkpoint**
Reload. You'll see two arrow icons and a stack of unstyled boxes — styling comes next.

---

### Step 5: Import the font, reset, and center the page

**🎯 Goal**
Set the font and turn the `<body>` into a full-screen centered stage.

**💡 Concept**
A flex `<body>` with `height: 100vh` (100% of the viewport height) centers its child both ways. `background-size: cover` will make the page background photo fill the screen; `transition` will make background swaps fade smoothly.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  background-position: center center;
  background-size: cover;
  transition: 0.4s;
}
```

**🔍 Explanation**

- `@import` loads the Roboto font (must be first line).
- `display: flex` + `align-items: center` + `justify-content: center` centers the slider box in the middle of the screen.
- `height: 100vh` makes the body as tall as the window; `overflow: hidden` hides anything spilling off-screen.
- `background-size: cover` / `background-position: center` prepare the body for the photo JS will set; `transition: 0.4s` fades that change.

**✅ Checkpoint**
Reload. The page background is currently empty/white, but the boxes are now centered and using Roboto.

---

### Step 6: Add the dark overlay

**🎯 Goal**
Dim the page background so the framed slide stands out.

**💡 Concept**
The `::before` pseudo-element creates an extra layer we can color. Pushing it behind everything with `z-index: -1` turns it into a full-screen tint over the body's background image.

**📝 Code**

```css
/* goes in style.css */
body::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: -1;
}
```

**🔍 Explanation**

- `content: ''` is required for a pseudo-element to render.
- Positioned absolutely to fill the whole viewport (`width: 100%`, `height: 100vh`).
- `rgba(0, 0, 0, 0.7)` is black at 70% opacity — the dimming effect.
- `z-index: -1` places it behind the page content but in front of the body's background image.

**✅ Checkpoint**
Reload. The page now has a dark tint layer (most visible once a background photo appears later).

---

### Step 7: Style the slider frame

**🎯 Goal**
Give the container its visible size and shadow, and clip its overflow.

**💡 Concept**
`position: relative` makes the container the anchor for the absolutely-positioned slides inside it. `overflow: hidden` clips the oversized slides to the frame.

**📝 Code**

```css
/* goes in style.css */
.slider-container {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  height: 70vh;
  width: 70vw;
  position: relative;
  overflow: hidden;
}
```

**🔍 Explanation**

- `height: 70vh; width: 70vw` sizes the frame to 70% of the viewport.
- The double `box-shadow` creates a soft, layered drop shadow.
- `position: relative` + `overflow: hidden` set up the frame to contain and clip the slides.

**✅ Checkpoint**
Reload. A shadowed rectangle sits centered on screen (its content is still hidden).

---

### Step 8: Style and fade the slides

**🎯 Goal**
Layer the slides on top of each other and show only the active one.

**💡 Concept**
All slides are stacked with `position: absolute` and hidden with `opacity: 0`. The `.active` slide gets `opacity: 1`, and a `transition` cross-fades between them. The slides are intentionally larger than the frame and offset, so only a centered portion shows through.

**📝 Code**

```css
/* goes in style.css */
.slide {
  opacity: 0;
  height: 100vh;
  width: 100vw;
  background-position: center center;
  background-size: cover;
  position: absolute;
  top: -15vh;
  left: -15vw;
  transition: 0.4s ease;
  z-index: 1;
}

.slide.active {
  opacity: 1;
}
```

**🔍 Explanation**

- `opacity: 0` hides every slide by default; `.slide.active { opacity: 1 }` reveals the current one.
- `height: 100vh; width: 100vw` plus `top: -15vh; left: -15vw` make each slide bigger than the 70% frame and shift it, so the frame shows a centered crop of the photo.
- `background-size: cover` scales the photo to fill; `transition: 0.4s ease` animates the fade.

**✅ Checkpoint**
Reload. The first photo now shows inside the frame. The others are present but invisible.

---

### Step 9: Position the arrow buttons

**🎯 Goal**
Place the arrows at the vertical center, just outside the frame edges.

**💡 Concept**
`position: fixed` pins the buttons relative to the window. `top: 50%` + `transform: translateY(-50%)` is the classic vertical-centering trick. `calc()` positions them near the frame's edges.

**📝 Code**

```css
/* goes in style.css */
.arrow {
  position: fixed;
  background-color: transparent;
  color: #fff;
  padding: 20px;
  font-size: 30px;
  border: 2px solid orange;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.arrow:focus {
  outline: 0;
}

.left-arrow {
  left: calc(15vw - 65px);
}

.right-arrow {
  right: calc(15vw - 65px);
}
```

**🔍 Explanation**

- `.arrow` styles both buttons: transparent fill, white icon, orange border, larger icon size, and a pointer cursor.
- `top: 50%` + `translateY(-50%)` centers them vertically no matter their height.
- `.left-arrow` / `.right-arrow` use `calc(15vw - 65px)` to sit just outside the frame's left/right edges (the frame leaves a 15vw margin on each side).
- `:focus { outline: 0 }` removes the default focus ring.

**✅ Checkpoint**
Reload. The two orange arrow buttons are centered vertically at the left and right of the frame. The CSS is done — now make them work.

---

### Step 10: Grab the elements and set up state

**🎯 Goal**
Get references to the pieces JS will control, and track which slide is active.

**💡 Concept**
`querySelectorAll` returns **all** matching elements (our list of slides), while `getElementById` returns a **single** element. A plain variable, `activeSlide`, remembers the current index — this is our **state**.

**📝 Code**

```js
// goes in script.js
const body = document.body
const slides = document.querySelectorAll('.slide')
const leftBtn = document.getElementById('left')
const rightBtn = document.getElementById('right')

let activeSlide = 0
```

**🔍 Explanation**

- `document.body` is the whole page body (whose background we'll change).
- `slides` is a list of all five `.slide` divs; we can index into it like an array.
- `leftBtn` / `rightBtn` are the arrow buttons.
- `let activeSlide = 0` starts on the first slide (arrays are zero-indexed). It's `let` because it will change.

**✅ Checkpoint**
Reload, open the console (F12). No errors means all elements were found.

---

### Step 11: Wire up the right arrow

**🎯 Goal**
Advance to the next slide on right-click, wrapping to the start after the last.

**💡 Concept**
Incrementing an index eventually runs off the end of the array. We check for that and reset to `0` — a **wrap-around**.

**📝 Code**

```js
// goes in script.js
rightBtn.addEventListener('click', () => {
  activeSlide++

  if (activeSlide > slides.length - 1) {
    activeSlide = 0
  }

  setBgToBody()
  setActiveSlide()
})
```

**🔍 Explanation**

- `activeSlide++` moves to the next index.
- If it passes the last valid index (`slides.length - 1`), wrap back to `0`.
- We then call `setBgToBody()` and `setActiveSlide()` (defined in later steps) to apply the change. They work here thanks to function **hoisting**.

**✅ Checkpoint**
Clicking right does nothing visible yet — the helper functions aren't defined. That's expected until Steps 13–14.

---

### Step 12: Wire up the left arrow

**🎯 Goal**
Go to the previous slide on left-click, wrapping to the end before the first.

**💡 Concept**
Same wrap logic in reverse: if the index drops below `0`, jump to the last slide.

**📝 Code**

```js
// goes in script.js
leftBtn.addEventListener('click', () => {
  activeSlide--

  if (activeSlide < 0) {
    activeSlide = slides.length - 1
  }

  setBgToBody()
  setActiveSlide()
})
```

**🔍 Explanation**

- `activeSlide--` moves to the previous index.
- If it goes negative, wrap to `slides.length - 1` (the last slide).
- Again we call the two helpers to apply the change.

**✅ Checkpoint**
Still no visible effect until we add the helpers next.

---

### Step 13: Set the body background from the active slide

**🎯 Goal**
Copy the current slide's photo onto the page background, and do it once on load.

**💡 Concept**
Every element exposes its inline styles via `element.style`. We read the active slide's `backgroundImage` and assign it to the body's `backgroundImage`.

**📝 Code**

```js
// goes in script.js
setBgToBody()

function setBgToBody() {
  body.style.backgroundImage = slides[activeSlide].style.backgroundImage
}
```

**🔍 Explanation**

- `slides[activeSlide]` is the current slide element; `.style.backgroundImage` reads its inline photo URL.
- Assigning it to `body.style.backgroundImage` puts that photo behind the whole page (fading thanks to the body's `transition` from Step 5).
- We also call `setBgToBody()` right away so the page background matches slide 0 on first load.

**✅ Checkpoint**
Reload. The page background now shows the first photo (dimmed by the overlay). Clicking arrows changes the background — but the *framed* slide doesn't switch yet.

---

### Step 14: Switch the active slide

**🎯 Goal**
Move the `active` class to the current slide so the frame cross-fades.

**💡 Concept**
Only one slide should have `active` at a time. We clear it from all slides, then add it to the current one — the CSS from Step 8 handles the fade.

**📝 Code**

```js
// goes in script.js
function setActiveSlide() {
  slides.forEach((slide) => slide.classList.remove('active'))

  slides[activeSlide].classList.add('active')
}
```

**🔍 Explanation**

- `slides.forEach(... remove('active'))` strips the class from every slide.
- `slides[activeSlide].classList.add('active')` adds it back to just the current one, triggering the `opacity` transition.

**✅ Checkpoint**
Reload. Clicking the arrows now cross-fades the photo *inside the frame* and updates the page background to match. Wrapping works at both ends. Done!

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
    <title>Background Slider</title>
  </head>
  <body>
    <div class="slider-container">
      <div
        class="slide active"
        style="
          background-image: url('https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80');
        "
      ></div>
      <div
        class="slide"
        style="
          background-image: url('https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80');
        "
      ></div>

      <div
        class="slide"
        style="
          background-image: url('https://images.unsplash.com/photo-1495467033336-2effd8753d51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80');
        "
      ></div>

      <div
        class="slide"
        style="
          background-image: url('https://images.unsplash.com/photo-1522735338363-cc7313be0ae0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80');
        "
      ></div>

      <div
        class="slide"
        style="
          background-image: url('https://images.unsplash.com/photo-1559087867-ce4c91325525?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80');
        "
      ></div>

      <button class="arrow left-arrow" id="left">
        <i class="fas fa-arrow-left"></i>
      </button>

      <button class="arrow right-arrow" id="right">
        <i class="fas fa-arrow-right"></i>
      </button>
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
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  background-position: center center;
  background-size: cover;
  transition: 0.4s;
}

body::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: -1;
}

.slider-container {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  height: 70vh;
  width: 70vw;
  position: relative;
  overflow: hidden;
}

.slide {
  opacity: 0;
  height: 100vh;
  width: 100vw;
  background-position: center center;
  background-size: cover;
  position: absolute;
  top: -15vh;
  left: -15vw;
  transition: 0.4s ease;
  z-index: 1;
}

.slide.active {
  opacity: 1;
}

.arrow {
  position: fixed;
  background-color: transparent;
  color: #fff;
  padding: 20px;
  font-size: 30px;
  border: 2px solid orange;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.arrow:focus {
  outline: 0;
}

.left-arrow {
  left: calc(15vw - 65px);
}

.right-arrow {
  right: calc(15vw - 65px);
}
```

### `script.js`

```js
const body = document.body
const slides = document.querySelectorAll('.slide')
const leftBtn = document.getElementById('left')
const rightBtn = document.getElementById('right')

let activeSlide = 0

rightBtn.addEventListener('click', () => {
  activeSlide++

  if (activeSlide > slides.length - 1) {
    activeSlide = 0
  }

  setBgToBody()
  setActiveSlide()
})

leftBtn.addEventListener('click', () => {
  activeSlide--

  if (activeSlide < 0) {
    activeSlide = slides.length - 1
  }

  setBgToBody()
  setActiveSlide()
})

setBgToBody()

function setBgToBody() {
  body.style.backgroundImage = slides[activeSlide].style.backgroundImage
}

function setActiveSlide() {
  slides.forEach((slide) => slide.classList.remove('active'))

  slides[activeSlide].classList.add('active')
}
```

## 6. Recap & Next Steps

**What you learned**

- Selecting single vs. multiple elements with `getElementById` and `querySelectorAll`.
- Tracking a current index in a state variable and wrapping it around an array in both directions.
- Toggling a class with `classList` to drive CSS opacity transitions.
- Reading one element's inline style and writing it to another.
- Building a full-page dark overlay with `::before` and `z-index`, and centering with Flexbox + viewport units.

**Enhancement challenges**

1. **Auto-play:** use `setInterval` to advance slides automatically every few seconds.
2. **Pause on hover:** stop the auto-play while the mouse is over the slider, resume when it leaves.
3. **Dot indicators:** add a row of clickable dots showing which slide is active.
4. **Keyboard control:** move with the left/right arrow keys via a `keydown` listener.
5. **Data-driven slides:** store the image URLs in a JS array and generate the slide `<div>`s dynamically instead of hardcoding them.
