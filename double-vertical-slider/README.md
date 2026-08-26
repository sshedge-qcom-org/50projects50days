# Double Vertical Slider

A code-along tutorial. You'll build this project from three empty files, one small step at a time. Read the **why** before each snippet, type the code yourself, and test at every checkpoint.

## 1. Project Overview

The Double Vertical Slider is a split-screen slideshow: a narrow **text panel** on the left and a wide **image panel** on the right slide vertically in **opposite directions** when you click the up/down arrows, creating a striking dual-motion effect.

**Key concepts involved**

- **Absolute positioning + `transform: translateY`** to slide stacked panels up and down.
- **`overflow: hidden`** as a viewport that reveals one slide at a time.
- **State + index wrapping** in JavaScript to cycle through slides endlessly, driving two panels in opposite directions.

**HTML skills you'll gain**

- Structuring two parallel slide stacks plus a control cluster.
- Loading an icon library (Font Awesome) via CDN and using `<i>` icons.
- Setting per-slide colors/images with inline `style`.

**CSS skills you'll gain**

- Overlaying and positioning panels with `position: absolute`.
- Animating movement smoothly with `transition: transform`.
- Positioning buttons precisely with `transform: translateX/Y(-100%)`.

**JavaScript skills you'll gain**

- Selecting elements and counting them with `querySelectorAll(...).length`.
- Tracking an active index and **wrapping** it around the ends.
- Setting inline styles (`element.style.transform`) from JS to move elements.

## 2. Final Project Preview

- **Layout:** The screen is split into a left panel (35% wide, colored backgrounds with a title + subtitle) and a right panel (65% wide, full-bleed photos). Two round-cornered arrow buttons (up and down) sit clustered at the boundary between the panels.
- **Behavior:**
  - Click the **down arrow** or **up arrow** to advance the slideshow.
  - The right image panel slides one way while the left text panel slides the **opposite** way — the two halves move against each other.
  - When you reach either end, it **wraps around** to the other end (endless loop).
  - Transitions are smooth (half-second ease).
- **You can interact with:** the up button and the down button.

## 3. Prerequisites

- **Knowledge:** basic HTML, CSS positioning, and JavaScript variables/functions.
- **Tools:** a modern web browser and a text editor. Optionally VS Code **Live Server** for auto-reload.
- **Files to create:**

```
double-vertical-slider/
├── index.html
├── style.css
└── script.js
```

Create all three now, empty.

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML skeleton (with Font Awesome)

**🎯 Goal**
Set up the document, load our CSS/JS, and pull in the Font Awesome icon library for the arrow icons.

**💡 Concept**
Font Awesome is loaded from a CDN (a `<link>` to a hosted stylesheet) so we can use its arrow icons without downloading anything.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" />
    <link rel="stylesheet" href="style.css" />
    <title>Vertical Slider</title>
  </head>
  <body>

    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**

- The first `<link>` loads Font Awesome 5.15.1 from a CDN — this gives us the `fa-arrow-up` / `fa-arrow-down` icons later.
- The second `<link>` is our own stylesheet; `script.js` loads at the bottom.
- (The page `<title>` is "Vertical Slider" — kept exactly as in the source.)

**✅ Checkpoint**
Open `index.html`. Blank page, no console errors.

---

### Step 2: Add the slider container and the left (text) panel

**🎯 Goal**
Create the outer container and the left panel with four colored text slides.

**💡 Concept**
Each left slide sets its own `background-color` with an inline `style` and holds a title + subtitle. Stacking four of them creates a tall column we'll slide vertically.

**📝 Code**

```html
<!-- goes in index.html, inside <body>, above the <script> tag -->
<div class="slider-container">
  <div class="left-slide">
    <div style="background-color: #FD3555">
      <h1>Nature flower</h1>
      <p>all in pink</p>
    </div>
    <div style="background-color: #2A86BA">
      <h1>Bluuue Sky</h1>
      <p>with it's mountains</p>
    </div>
    <div style="background-color: #252E33">
      <h1>Lonely castle</h1>
      <p>in the wilderness</p>
    </div>
    <div style="background-color: #FFB866">
      <h1>Flying eagle</h1>
      <p>in the sunset</p>
    </div>
  </div>
</div>
```

**🔍 Explanation**

- `.slider-container` is the outer frame that will clip everything to the screen.
- `.left-slide` is the text column. Its four child `<div>`s each carry an inline background color and a heading/subtitle.
- Inline `style="background-color: ..."` is used here because each slide needs a unique color — quick and readable for a small fixed set.

**✅ Checkpoint**
Reload. You'll see four colored blocks stacked with their titles (unstyled). Colors are visible even before CSS.

---

### Step 3: Add the right (image) panel

**🎯 Goal**
Add the right panel with four full-bleed background images.

**💡 Concept**
Mirroring the left column, the right column has four slides — but each uses an inline `background-image` (photos from Unsplash) instead of a solid color.

**📝 Code**

```html
<!-- goes in index.html, inside .slider-container, below the .left-slide div -->
<div class="right-slide">
  <div style="background-image: url('https://images.unsplash.com/photo-1508768787810-6adc1f613514?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e27f6661df21ed17ab5355b28af8df4e&auto=format&fit=crop&w=1350&q=80')"></div>
  <div style="background-image: url('https://images.unsplash.com/photo-1519981593452-666cf05569a9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=90ed8055f06493290dad8da9584a13f7&auto=format&fit=crop&w=715&q=80')"></div>
  <div style="background-image: url('https://images.unsplash.com/photo-1486899430790-61dbf6f6d98b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8ecdee5d1b3ed78ff16053b0227874a2&auto=format&fit=crop&w=1002&q=80')"></div>
  <div style="background-image: url('https://images.unsplash.com/photo-1510942201312-84e7962f6dbb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=da4ca7a78004349f1b63f257e50e4360&auto=format&fit=crop&w=1050&q=80')"></div>
</div>
```

**🔍 Explanation**

- `.right-slide` is the image column, again with four stacked slides.
- Each slide's inline `background-image` points to a hosted photo; we'll make these cover their slide in the CSS step.

**✅ Checkpoint**
Reload. Below the colored blocks you may see the images at their natural size (not yet sized to fill). That's expected — styling comes next.

---

### Step 4: Add the navigation buttons

**🎯 Goal**
Add the up and down arrow buttons that drive the slider.

**💡 Concept**
Two `<button>`s each contain a Font Awesome icon (`<i class="fas fa-arrow-...">`). Their classes (`up-button`, `down-button`) let CSS position them and JS attach click handlers.

**📝 Code**

```html
<!-- goes in index.html, inside .slider-container, below the .right-slide div -->
<div class="action-buttons">
  <button class="down-button">
    <i class="fas fa-arrow-down"></i>
  </button>
  <button class="up-button">
    <i class="fas fa-arrow-up"></i>
  </button>
</div>
```

**🔍 Explanation**

- `.action-buttons` groups the two controls.
- `.down-button` and `.up-button` each hold a Font Awesome arrow icon (`fa-arrow-down` / `fa-arrow-up`).
- These class names are the hooks CSS and JavaScript will use.

**✅ Checkpoint**
Reload. Two arrow buttons appear (down and up). All the pieces exist now — time to style.

---

### Step 5: Add the reset and base body

**🎯 Goal**
Apply a reset and make the body fill the screen height.

**💡 Concept**
Zeroing margins/padding and setting `height: 100vh` on the body gives us a clean, full-height canvas for a full-screen slider.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css?family=Open+Sans');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Open Sans', sans-serif;
  height: 100vh;
}
```

**🔍 Explanation**

- `@import` loads Open Sans.
- The `*` reset applies `border-box` and removes default margins/padding.
- `body { height: 100vh }` makes the body exactly one viewport tall.

**✅ Checkpoint**
Reload. Default spacing is gone and the font changes, though the layout is still stacked. No errors.

---

### Step 6: Create the slider viewport

**🎯 Goal**
Make the container a full-screen box that clips whatever overflows it.

**💡 Concept**
`position: relative` makes the container the anchor for the absolutely-positioned panels inside it. `overflow: hidden` is the key trick — it hides the extra stacked slides, so only the current slide shows through this "window."

**📝 Code**

```css
/* goes in style.css */
.slider-container {
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}
```

**🔍 Explanation**

- `position: relative` establishes the positioning context for the panels.
- `overflow: hidden` clips the tall panels to the container, revealing one slide's worth at a time.
- `width: 100vw; height: 100vh` make the container fill the whole screen.

**✅ Checkpoint**
Reload. The content is now confined to the viewport (no page scrollbars). The panels still need positioning.

---

### Step 7: Position and style the left (text) panel

**🎯 Goal**
Pin the left panel to the left 35%, stack its slides, and center the text.

**💡 Concept**
Absolute positioning takes the panel out of normal flow and lets us place it exactly. `transition: transform 0.5s` means any future `translateY` we set from JS will glide smoothly.

**📝 Code**

```css
/* goes in style.css */
.left-slide {
  height: 100%;
  width: 35%;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.5s ease-in-out;
}

.left-slide > div {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.left-slide h1 {
  font-size: 40px;
  margin-bottom: 10px;
  margin-top: -30px;
}
```

**🔍 Explanation**

- `.left-slide`: full height, 35% wide, absolutely pinned to the top-left. `transition: transform 0.5s` makes slides glide when JS moves them.
- `.left-slide > div`: each slide fills the panel and uses Flexbox to center its title/subtitle; white text (`color: #fff`) reads on the colored backgrounds.
- `.left-slide h1`: large 40px title, nudged up with a negative top margin.

**✅ Checkpoint**
Reload. The left 35% shows a single colored slide with centered white text. (Because the slides are stacked and clipped, you see only one — likely the last color.)

---

### Step 8: Position and style the right (image) panel

**🎯 Goal**
Pin the right panel to the remaining 65% and make each image cover its slide.

**💡 Concept**
The right panel starts at `left: 35%` (right after the left panel) and takes the remaining 65%. `background-size: cover` scales each photo to fill its slide without distortion.

**📝 Code**

```css
/* goes in style.css */
.right-slide {
  height: 100%;
  position: absolute;
  top: 0;
  left: 35%;
  width: 65%;
  transition: transform 0.5s ease-in-out;
}

.right-slide > div {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 100%;
  width: 100%;
}
```

**🔍 Explanation**

- `.right-slide`: full height, positioned at `left: 35%` with `width: 65%` so it sits beside the left panel. It also has the 0.5s transform transition.
- `.right-slide > div`: each image slide fills the panel; `background-size: cover` + `center center` make the photo fill nicely with no repeating or stretching.

**✅ Checkpoint**
Reload. The screen is now split: colored text on the left 35%, a full-bleed photo on the right 65%. The buttons are still unstyled.

---

### Step 9: Style the buttons

**🎯 Goal**
Give the arrow buttons a clean look and hover feedback.

**💡 Concept**
Base button styling (white, borderless, pointer cursor) plus a hover color change and removing the focus outline for a cleaner press.

**📝 Code**

```css
/* goes in style.css */
button {
  background-color: #fff;
  border: none;
  color: #aaa;
  cursor: pointer;
  font-size: 16px;
  padding: 15px;
}

button:hover {
  color: #222;
}

button:focus {
  outline: none;
}
```

**🔍 Explanation**

- `button`: white background, no border, grey (`#aaa`) icon, pointer cursor, and comfortable padding.
- `button:hover`: darkens the icon to near-black for feedback.
- `button:focus { outline: none }` removes the default focus ring for a cleaner look. (Note: keeping some focus indicator is better for accessibility — a good enhancement later.)

**✅ Checkpoint**
Reload. The arrow buttons are now white with grey arrows that darken on hover — but they're still sitting in the default position (we place them next).

---

### Step 10: Position the buttons at the panel boundary

**🎯 Goal**
Cluster the two arrow buttons at the seam between the left and right panels.

**💡 Concept**
Both buttons are absolutely positioned at the 35% seam, vertically centered. `transform: translateX(-100%)` / `translateY(-100%)` nudge each by its own width/height so they tuck neatly against that point from opposite sides. A high `z-index` keeps them above the slides.

**📝 Code**

```css
/* goes in style.css */
.slider-container .action-buttons button {
  position: absolute;
  left: 35%;
  top: 50%;
  z-index: 100;
}

.slider-container .action-buttons .down-button {
  transform: translateX(-100%);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.slider-container .action-buttons .up-button {
  transform: translateY(-100%);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
```

**🔍 Explanation**

- The shared rule pins both buttons to the seam (`left: 35%`, `top: 50%`) and puts them on top with `z-index: 100`.
- `.down-button` uses `translateX(-100%)` to shift left by its own width — so it sits on the **left** side of the seam — with its left corners rounded.
- `.up-button` uses `translateY(-100%)` to shift up by its own height — so it sits **above** the center point on the right side of the seam — with its right corners rounded.
- Together they form a compact two-button control right at the boundary between the panels.

**✅ Checkpoint**
Reload. The up and down buttons now sit clustered at the boundary between the text and image panels. The layout is finished — now we make it move.

---

### Step 11: Grab elements and set up state

**🎯 Goal**
Reference the panels and buttons, count the slides, and track which slide is active.

**💡 Concept**
`querySelectorAll('div').length` counts the slides so the logic adapts to any number of them. `activeSlideIndex` is our **state** — the current position in the slideshow.

**📝 Code**

```js
// goes in script.js
const sliderContainer = document.querySelector('.slider-container')
const slideRight = document.querySelector('.right-slide')
const slideLeft = document.querySelector('.left-slide')
const upButton = document.querySelector('.up-button')
const downButton = document.querySelector('.down-button')
const slidesLength = slideRight.querySelectorAll('div').length

let activeSlideIndex = 0
```

**🔍 Explanation**

- We grab the container, both panels, and both buttons.
- `slidesLength` counts the slide `<div>`s inside the right panel (4 here) so our math isn't hard-coded.
- `activeSlideIndex = 0` starts us on the first slide.

**✅ Checkpoint**
Reload. No visual change, no errors. You could `console.log(slidesLength)` to confirm it logs `4`.

---

### Step 12: Offset the left panel so it moves in reverse

**🎯 Goal**
Shift the left panel up by all-but-one slide, so it travels **opposite** to the right panel.

**💡 Concept**
This is the heart of the "double" effect. We pre-shift the left column upward by `(slidesLength - 1) * 100vh`. As the right panel later slides downward through its images, the left panel slides upward through its text — the two move against each other.

**📝 Code**

```js
// goes in script.js
slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`
```

**🔍 Explanation**

- With 4 slides, this sets `top: -300vh`, lifting the left column so its **last** slide is the one initially visible.
- Because the left panel starts "at the bottom" of its stack and the right starts "at the top" of its stack, advancing the slideshow pushes them in opposite vertical directions — producing the signature contrast.

**✅ Checkpoint**
Reload. The left panel may now show a different slide than before (its last one). Nothing animates yet — the buttons aren't wired up.

---

### Step 13: Wire up the buttons

**🎯 Goal**
Make the up and down buttons call a slide-changing function with a direction.

**💡 Concept**
Each button passes a direction string (`'up'` or `'down'`) to a shared `changeSlide` function (defined next), keeping the click handlers tiny.

**📝 Code**

```js
// goes in script.js
upButton.addEventListener('click', () => changeSlide('up'))
downButton.addEventListener('click', () => changeSlide('down'))
```

**🔍 Explanation**

- Clicking the up button calls `changeSlide('up')`; the down button calls `changeSlide('down')`.
- Passing the direction as an argument lets one function handle both cases.

**✅ Checkpoint**
Reload. Clicking the buttons currently throws a `changeSlide is not defined` error in the console — expected, because we define it in the final step.

---

### Step 14: Write the changeSlide function

**🎯 Goal**
Update the active index (with wrap-around) and move both panels in opposite directions.

**💡 Concept**
We adjust `activeSlideIndex` based on direction, **wrap** it when it goes past either end (so the loop is endless), then apply `translateY` transforms: the right panel moves negative (up) while the left panel moves positive (down) by the same amount.

**📝 Code**

```js
// goes in script.js
const changeSlide = (direction) => {
    const sliderHeight = sliderContainer.clientHeight
    if(direction === 'up') {
        activeSlideIndex++
        if(activeSlideIndex > slidesLength - 1) {
            activeSlideIndex = 0
        }
    } else if(direction === 'down') {
        activeSlideIndex--
        if(activeSlideIndex < 0) {
            activeSlideIndex = slidesLength - 1
        }
    }

    slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`
    slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`
}
```

**🔍 Explanation**

- `sliderHeight = sliderContainer.clientHeight` is one viewport's height in pixels — the distance to move per slide.
- **Up:** increment the index; if it passes the last slide, wrap back to `0`.
- **Down:** decrement the index; if it drops below `0`, wrap to the last slide (`slidesLength - 1`).
- `slideRight` moves by `-index * sliderHeight` (upward), while `slideLeft` moves by `+index * sliderHeight` (downward) — the **opposite directions** that create the effect.
- Because both panels have `transition: transform 0.5s` in CSS, each move glides smoothly.

**✅ Checkpoint**
Reload. Click the up/down arrows: the image panel slides one way and the text panel slides the other, wrapping endlessly at the ends. The Double Vertical Slider is complete!

---

## 5. Final Full Code (Reference)

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" />
    <link rel="stylesheet" href="style.css" />
    <title>Vertical Slider</title>
  </head>
  <body>
    <div class="slider-container">
      <div class="left-slide">
        <div style="background-color: #FD3555">
          <h1>Nature flower</h1>
          <p>all in pink</p>
        </div>
        <div style="background-color: #2A86BA">
          <h1>Bluuue Sky</h1>
          <p>with it's mountains</p>
        </div>
        <div style="background-color: #252E33">
          <h1>Lonely castle</h1>
          <p>in the wilderness</p>
        </div>
        <div style="background-color: #FFB866">
          <h1>Flying eagle</h1>
          <p>in the sunset</p>
        </div>
      </div>
      <div class="right-slide">
        <div style="background-image: url('https://images.unsplash.com/photo-1508768787810-6adc1f613514?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e27f6661df21ed17ab5355b28af8df4e&auto=format&fit=crop&w=1350&q=80')"></div>
        <div style="background-image: url('https://images.unsplash.com/photo-1519981593452-666cf05569a9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=90ed8055f06493290dad8da9584a13f7&auto=format&fit=crop&w=715&q=80')"></div>
        <div style="background-image: url('https://images.unsplash.com/photo-1486899430790-61dbf6f6d98b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8ecdee5d1b3ed78ff16053b0227874a2&auto=format&fit=crop&w=1002&q=80')"></div>
        <div style="background-image: url('https://images.unsplash.com/photo-1510942201312-84e7962f6dbb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=da4ca7a78004349f1b63f257e50e4360&auto=format&fit=crop&w=1050&q=80')"></div>
      </div>
      <div class="action-buttons">
        <button class="down-button">
          <i class="fas fa-arrow-down"></i>
        </button>
        <button class="up-button">
          <i class="fas fa-arrow-up"></i>
        </button>
      </div>
    </div>

    <script src="script.js"></script>
  </body>
</html>
```

### `style.css`

```css
@import url('https://fonts.googleapis.com/css?family=Open+Sans');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Open Sans', sans-serif;
  height: 100vh;
}

.slider-container {
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}

.left-slide {
  height: 100%;
  width: 35%;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.5s ease-in-out;
}

.left-slide > div {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.left-slide h1 {
  font-size: 40px;
  margin-bottom: 10px;
  margin-top: -30px;
}

.right-slide {
  height: 100%;
  position: absolute;
  top: 0;
  left: 35%;
  width: 65%;
  transition: transform 0.5s ease-in-out;
}

.right-slide > div {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 100%;
  width: 100%;
}

button {
  background-color: #fff;
  border: none;
  color: #aaa;
  cursor: pointer;
  font-size: 16px;
  padding: 15px;
}

button:hover {
  color: #222;
}

button:focus {
  outline: none;
}

.slider-container .action-buttons button {
  position: absolute;
  left: 35%;
  top: 50%;
  z-index: 100;
}

.slider-container .action-buttons .down-button {
  transform: translateX(-100%);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.slider-container .action-buttons .up-button {
  transform: translateY(-100%);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
```

### `script.js`

```js
const sliderContainer = document.querySelector('.slider-container')
const slideRight = document.querySelector('.right-slide')
const slideLeft = document.querySelector('.left-slide')
const upButton = document.querySelector('.up-button')
const downButton = document.querySelector('.down-button')
const slidesLength = slideRight.querySelectorAll('div').length

let activeSlideIndex = 0

slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`

upButton.addEventListener('click', () => changeSlide('up'))
downButton.addEventListener('click', () => changeSlide('down'))

const changeSlide = (direction) => {
    const sliderHeight = sliderContainer.clientHeight
    if(direction === 'up') {
        activeSlideIndex++
        if(activeSlideIndex > slidesLength - 1) {
            activeSlideIndex = 0
        }
    } else if(direction === 'down') {
        activeSlideIndex--
        if(activeSlideIndex < 0) {
            activeSlideIndex = slidesLength - 1
        }
    }

    slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`
    slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`
}
```

## 6. Recap & Next Steps

**What you learned**

- Using `position: absolute` stacks inside an `overflow: hidden` container as a slide viewport.
- Sliding elements with `transform: translateY` and animating it via `transition`.
- Driving two panels in **opposite directions** by pre-offsetting one and inverting the transform sign.
- Tracking an active index and wrapping it for an endless loop, then applying inline styles from JS.

**Enhancement challenges**

1. **Keyboard controls** — advance the slider with the Arrow Up / Arrow Down keys.
2. **Autoplay** — use `setInterval` to advance automatically, pausing on hover.
3. **Slide indicators** — add dots showing the current slide and let users click a dot to jump to it.
4. **Restore focus styles** — replace `outline: none` with a visible, attractive focus indicator for accessibility.
5. **Pair the content** — adjust the initial offset so each text panel lines up with its matching image, then compare the effect.
