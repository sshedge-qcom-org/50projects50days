# Image Carousel

## 1. Project Overview

This project builds an **auto-playing image carousel** (slideshow): four images sit in a row inside a fixed window, and the carousel slides between them automatically every two seconds, with **Prev**/**Next** buttons for manual control.

**Key concepts involved:**

- Sliding a strip of images with **CSS `transform: translateX`** and a `transition`.
- A **viewport** created with `overflow: hidden` so only one image shows at a time.
- Timers with **`setInterval`** / **`clearInterval`** for auto-advance.
- Wrap-around index logic so the slideshow loops endlessly.

**HTML skills you'll gain:**

- Structuring a carousel: an outer frame, an inner sliding track of images, and a button bar.

**CSS skills you'll gain:**

- Using `overflow: hidden` to clip content into a window.
- `object-fit: cover` to crop images cleanly to a fixed size.
- Animating movement with `transition: transform`.

**JavaScript skills you'll gain:**

- `setInterval` and `clearInterval` for repeating timers.
- Setting an element's `style.transform` from JavaScript.
- Managing an index variable and wrapping it around the ends of a list.
- Resetting a timer so manual clicks don't fight the auto-play.

---

## 2. Final Project Preview

**Layout & colors:** A single 500px-wide framed card centered on the page, with a subtle drop shadow. It shows one photo at a time (500×500, cropped to fit). Beneath the photo is a button bar with two purple (`rebeccapurple`) buttons: **Prev** on the left and **Next** on the right.

**Behavior & interactions:**

- Every 2 seconds the carousel automatically slides to the next image.
- After the last image, it wraps back to the first (and before the first, back to the last).
- Clicking **Next** advances one image; clicking **Prev** goes back one. Each click also **restarts** the 2-second timer, so it won't jump again immediately after you click.
- The slide movement is smooth thanks to a CSS transition.

**What you can interact with:**

- The **Prev** and **Next** buttons.

---

## 3. Prerequisites

**Basic knowledge required:**

- HTML structure.
- CSS layout and `transform` basics.
- JavaScript variables, functions, and `if/else`.

**Tools needed:**

- A modern web browser.
- A text editor (VS Code recommended).
- *Optional:* the **Live Server** extension.
- An internet connection (the images are loaded from Unsplash URLs).

**Files to create:**

```
image-carousel/
├── index.html
├── style.css
└── script.js
```

Create these three empty files and follow along.

---

## 4. Build the Project Step-by-Step

### Step 1: Set Up the HTML Document

**🎯 Goal**
Create the page skeleton and link the stylesheet and script.

**💡 Concept**
Standard boilerplate: CSS in the `<head>`, script before `</body>`.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Image Carousel</title>
  </head>
  <body>
    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**
The `<link>` loads styles; the bottom `<script>` loads our JS after the HTML exists.

**✅ Checkpoint**
A blank page titled "Image Carousel". No errors.

---

### Step 2: Add the Carousel Frame and Images

**🎯 Goal**
Create the carousel container and the row of four images that will slide.

**💡 Concept**
The structure is two nested boxes: `.carousel` is the fixed **frame** (the window you see through), and `.image-container` (id `imgs`) is the **track** — a wide row holding all images side by side. Sliding the track left reveals different images through the frame.

**📝 Code**

```html
<!-- goes in index.html, inside <body>, above the <script> -->
<div class="carousel">
  <div class="image-container" id="imgs">
    <img src="https://images.unsplash.com/photo-1599394022918-6c2776530abb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1458&q=80"
   alt="first-image"
   />
    <img
   src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
   alt="second-image"
   />
    <img
   src="https://images.unsplash.com/photo-1599423300746-b62533397364?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
   alt="third-image"
   />
    <img
   src="https://images.unsplash.com/photo-1599561046251-bfb9465b4c44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1492&q=80"
   alt="fourth-image"
   />
  </div>
</div>
```

**🔍 Explanation**

- `.carousel` — the outer frame we'll clip and size.
- `.image-container` with `id="imgs"` — the track we'll slide left/right. The `id` is our JavaScript hook.
- Four `<img>` tags with Unsplash URLs. Each `alt` describes the image for accessibility.

**✅ Checkpoint**
Reload — you'll see all four images stacked vertically at full size (no styling yet). That's fine; CSS will line them up and clip them.

---

### Step 3: Add the Prev/Next Buttons

**🎯 Goal**
Add the control bar with Previous and Next buttons.

**💡 Concept**
Each button gets a unique `id` so JavaScript can attach click handlers, plus a shared `btn` class for styling.

**📝 Code**

```html
<!-- goes in index.html, inside .carousel, right after the .image-container div -->
<div class="buttons-container">
  <button id="left" class="btn">Prev</button>
  <button id="right" class="btn">Next</button>
</div>
```

**🔍 Explanation**

- `.buttons-container` holds the two buttons in a row.
- `id="left"` / `id="right"` are the JS hooks for Prev and Next.

**✅ Checkpoint**
Two buttons, "Prev" and "Next", now appear below the images. Time to style everything into a real carousel.

---

### Step 4: Add Base Styles

**🎯 Goal**
Load the font, reset box-sizing, and center the carousel on the page.

**💡 Concept**
Flexbox on the body centers the single carousel card both horizontally and vertically.

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
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
}
```

**🔍 Explanation**

- `@import` loads Roboto.
- `body` uses Flexbox with both `align-items` and `justify-content` set to `center`, and `height: 100vh` so the carousel sits in the middle of the screen.

**✅ Checkpoint**
The content shifts toward the center of the page. Images are still full-size — next we constrain them.

---

### Step 5: Size the Images

**🎯 Goal**
Force every image to the same 500×500 size without distortion.

**💡 Concept**
Photos have different dimensions. `object-fit: cover` scales an image to fill the 500×500 box and crops the overflow, so nothing looks stretched.

**📝 Code**

```css
/* goes in style.css */
img {
  width: 500px;
  height: 500px;
  object-fit: cover;
}
```

**🔍 Explanation**

- `width/height: 500px` fixes every image to a square.
- `object-fit: cover` crops rather than squashes, keeping the photos looking natural.

**✅ Checkpoint**
Each image is now a uniform 500×500 square. They're still stacked vertically — the next step lines them up in a row.

---

### Step 6: Build the Carousel Window

**🎯 Goal**
Give the carousel a fixed size and clip everything outside it, so only one image shows.

**💡 Concept**
`overflow: hidden` is what makes a carousel work: the track is much wider than the frame, but the frame hides everything except the current image. The height is 530px — 500px for the image plus room for the buttons.

**📝 Code**

```css
/* goes in style.css */
.carousel {
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  height: 530px;
  width: 500px;
  overflow: hidden;
}
```

**🔍 Explanation**

- `width: 500px` — matches one image, so exactly one shows through.
- `height: 530px` — image (500) plus the button bar (~30).
- `overflow: hidden` — clips the rest of the wide track out of view.
- `box-shadow` gives the card a subtle lift.

**✅ Checkpoint**
The images are still stacked (we haven't laid the track out as a row yet), but the frame is now clipped to 500px wide. Next we turn the track into a horizontal row.

---

### Step 7: Lay Out and Prepare the Sliding Track

**🎯 Goal**
Put the images in a horizontal row and make movement animate smoothly.

**💡 Concept**
`display: flex` lines the four images up side by side in one wide row. `transition: transform 0.5s ease-in-out` means any change to the track's `transform` (which we'll set from JS) animates over half a second instead of jumping.

**📝 Code**

```css
/* goes in style.css */
.image-container {
  display: flex;
  transform: translateX(0);
  transition: transform 0.5s ease-in-out;
}
```

**🔍 Explanation**

- `display: flex` — the images become a single horizontal row 2000px wide (4 × 500), most of it hidden by the frame.
- `transform: translateX(0)` — the starting position (first image showing).
- `transition: transform 0.5s ease-in-out` — smoothly animates when we slide the track by changing `translateX`.

**✅ Checkpoint**
Now you see just the **first** image inside the framed window; the rest are hidden off to the right. The buttons sit below. The visual carousel is ready — now for the buttons' styling and then the sliding logic.

---

### Step 8: Style the Buttons

**🎯 Goal**
Make the Prev/Next buttons fill the bar as a matched pair.

**💡 Concept**
`justify-content: space-between` in the button container pushes the two buttons to opposite ends; each is `49.5%` wide so together they span the frame with a small gap between.

**📝 Code**

```css
/* goes in style.css */
.buttons-container {
  display: flex;
  justify-content: space-between;
}

.btn {
  background-color: rebeccapurple;
  color: #fff;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  width: 49.5%;
}

.btn:hover {
  opacity: 0.9;
}

.btn:focus {
  outline: none;
}
```

**🔍 Explanation**

- `.buttons-container` is a flex row with `space-between` so Prev sits left, Next sits right.
- `.btn` — purple buttons, each `49.5%` wide so the pair fills the bar.
- `:hover` dims slightly for feedback; `:focus { outline: none }` removes the default focus ring.

**✅ Checkpoint**
The two purple buttons now sit side by side, filling the width beneath the image. The carousel *looks* finished — but it's still static. On to JavaScript.

---

### Step 9: Select Elements and Set Up State

**🎯 Goal**
Grab the track, the buttons, and the images, and create the index that tracks which image is showing.

**💡 Concept**
We need the track (`imgs`) to move it, the buttons to listen for clicks, and the image list to know how many there are. `let idx = 0` is our **state** — the index of the current image.

**📝 Code**

```javascript
// goes in script.js
const imgs = document.getElementById('imgs')
const leftBtn = document.getElementById('left')
const rightBtn = document.getElementById('right')

const img = document.querySelectorAll('#imgs img')

let idx = 0
```

**🔍 Explanation**

- `imgs` — the sliding track (we'll change its `style.transform`).
- `leftBtn` / `rightBtn` — the Prev/Next buttons.
- `img` — a list of all four images; `img.length` tells us the count (4).
- `let idx = 0` — starts on the first image. It's `let` (not `const`) because it changes as we navigate.

**✅ Checkpoint**
No visible change. In the console, type `img.length` — it should print `4`.

---

### Step 10: Write the Slide Logic

**🎯 Goal**
Move the track to show the image at the current index, wrapping around at the ends.

**💡 Concept**
Each image is 500px wide, so to show image `idx` we shift the track left by `idx * 500` pixels. Before moving, we **wrap** the index: if it went past the last image, jump to the first; if it went before the first, jump to the last. This makes the carousel loop endlessly.

**📝 Code**

```javascript
// goes in script.js
function changeImage() {
    if(idx > img.length - 1) {
        idx = 0
    } else if(idx < 0) {
        idx = img.length - 1
    }

    imgs.style.transform = `translateX(${-idx * 500}px)`
}
```

**🔍 Explanation**

- `if(idx > img.length - 1) idx = 0` — went past the last image (index 3)? Loop back to the first.
- `else if(idx < 0) idx = img.length - 1` — went before the first? Loop to the last.
- `imgs.style.transform = translateX(${-idx * 500}px)` — shifts the track left by `idx` full image-widths. The negative value moves it leftward, bringing image `idx` into the frame. Because of the CSS transition, this slides smoothly.

**✅ Checkpoint**
Still nothing moves — we haven't called `changeImage` yet. Next we hook it to a timer and the buttons.

---

### Step 11: Auto-Advance with a Timer

**🎯 Goal**
Automatically move to the next image every 2 seconds.

**💡 Concept**
`setInterval(fn, ms)` runs a function repeatedly on a fixed delay. We store its return value in `interval` so we can cancel and restart it later. Each tick bumps `idx` and re-positions the track.

**📝 Code**

```javascript
// goes in script.js, right after `let idx = 0`
let interval = setInterval(run, 2000)

function run() {
    idx++
    changeImage()
}
```

**🔍 Explanation**

- `setInterval(run, 2000)` calls `run` every 2000ms (2 seconds). We save the timer id in `interval` so we can `clearInterval` it later.
- `run()` increments `idx` and calls `changeImage()` to slide to the next image (wrapping when needed).

> Place `let interval = ...` above the `run` definition; function declarations are hoisted, so `run` is known when `setInterval` references it.

**✅ Checkpoint**
Reload the page: every 2 seconds it smoothly slides to the next image, looping back to the first after the fourth. Now let's add manual controls.

---

### Step 12: Reset the Timer on Manual Navigation

**🎯 Goal**
Write a helper that restarts the auto-play timer.

**💡 Concept**
If you click Next and the auto-timer fires a moment later, the carousel would lurch again immediately. Clearing and restarting the interval on each click gives you a fresh full 2 seconds after interacting.

**📝 Code**

```javascript
// goes in script.js
function resetInterval() {
    clearInterval(interval)
    interval = setInterval(run, 2000)
}
```

**🔍 Explanation**

- `clearInterval(interval)` stops the existing timer.
- `interval = setInterval(run, 2000)` starts a brand-new 2-second timer and stores its id.

**✅ Checkpoint**
No change yet — `resetInterval` is called from the button handlers we add next.

---

### Step 13: Wire Up the Prev and Next Buttons

**🎯 Goal**
Make the buttons move the carousel one image at a time and reset the timer.

**💡 Concept**
**Next** increases `idx`; **Prev** decreases it. Both then call `changeImage()` (which handles wrap-around and the slide) and `resetInterval()` (so the auto-timer restarts cleanly).

**📝 Code**

```javascript
// goes in script.js, at the bottom
rightBtn.addEventListener('click', () => {
    idx++
    changeImage()
    resetInterval()
})

leftBtn.addEventListener('click', () => {
    idx--
    changeImage()
    resetInterval()
})
```

**🔍 Explanation**

- **Next** (`rightBtn`): `idx++` then `changeImage()` slides forward; `resetInterval()` restarts the timer.
- **Prev** (`leftBtn`): `idx--` then `changeImage()` slides backward (wrapping to the last image if you go before the first); `resetInterval()` restarts the timer.

**✅ Checkpoint**
Click **Next** and **Prev** — the carousel slides one image per click and wraps around at both ends. After a click, the auto-advance waits a full 2 seconds before resuming. The project is complete!

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
    <title>Image Carousel</title>
  </head>
  <body>
    <div class="carousel">
      <div class="image-container" id="imgs">
        <img src="https://images.unsplash.com/photo-1599394022918-6c2776530abb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1458&q=80"
       alt="first-image"
       />
    <img
       src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
       alt="second-image"
       />
    <img
       src="https://images.unsplash.com/photo-1599423300746-b62533397364?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
       alt="third-image"
       />
    <img
       src="https://images.unsplash.com/photo-1599561046251-bfb9465b4c44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1492&q=80"
       alt="fourth-image"
       />
      </div>

      <div class="buttons-container">
        <button id="left" class="btn">Prev</button>
        <button id="right" class="btn">Next</button>
      </div>
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
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
}

img {
  width: 500px;
  height: 500px;
  object-fit: cover;
}

.carousel {
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  height: 530px;
  width: 500px;
  overflow: hidden;
}

.image-container {
  display: flex;
  transform: translateX(0);
  transition: transform 0.5s ease-in-out;
}

.buttons-container {
  display: flex;
  justify-content: space-between;
}

.btn {
  background-color: rebeccapurple;
  color: #fff;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  width: 49.5%;
}

.btn:hover {
  opacity: 0.9;
}

.btn:focus {
  outline: none;
}
```

### `script.js`

```javascript
const imgs = document.getElementById('imgs')
const leftBtn = document.getElementById('left')
const rightBtn = document.getElementById('right')

const img = document.querySelectorAll('#imgs img')

let idx = 0

let interval = setInterval(run, 2000)

function run() {
    idx++
    changeImage()
}

function changeImage() {
    if(idx > img.length - 1) {
        idx = 0
    } else if(idx < 0) {
        idx = img.length - 1
    }

    imgs.style.transform = `translateX(${-idx * 500}px)`
}

function resetInterval() {
    clearInterval(interval)
    interval = setInterval(run, 2000)
}

rightBtn.addEventListener('click', () => {
    idx++
    changeImage()
    resetInterval()
})

leftBtn.addEventListener('click', () => {
    idx--
    changeImage()
    resetInterval()
})
```

---

## 6. Recap & Next Steps

**What you learned:**

- The frame-and-track pattern: a wide flex row of images clipped by an `overflow: hidden` window.
- Sliding with `transform: translateX` plus a CSS `transition` for smooth motion.
- `object-fit: cover` to normalize image sizes without distortion.
- Repeating timers with `setInterval`, cancelling with `clearInterval`, and resetting a timer after user interaction.
- Managing an index and wrapping it around the ends of a list.

**Enhancement challenges:**

1. **Dots indicator** — add a row of dots showing which slide is active, clickable to jump directly.
2. **Pause on hover** — stop the auto-advance while the mouse is over the carousel.
3. **Responsive width** — make the 500px measurements dynamic so the carousel fits any screen size (compute the slide distance from the image's actual width).
4. **Keyboard arrows** — let the left/right arrow keys navigate.
5. **Infinite/clone effect** — clone the first and last slides so wrap-around doesn't visibly rewind across all images.
