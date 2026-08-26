# Double Click Heart

## 1. Project Overview

This project recreates **Instagram's "double-tap to like"** interaction: double-click an image and an animated heart bursts out of the exact spot you clicked, while a counter tracks how many times you've liked it.

**Key concepts involved:** detecting a double-click manually with timestamps, creating elements at the mouse position, CSS `@keyframes` animation, Font Awesome icons, and updating a live counter.

You will gain these skills:

- **HTML skills**
  - Loading an icon library (Font Awesome) from a CDN
  - Using an `<i>` element as an icon
  - Marking a dynamic value with a `<span>` and `id`
- **CSS skills**
  - Setting a `background-image` that covers a box
  - `position: relative` as an anchor for absolutely positioned children
  - `overflow: hidden` to clip content to its container
  - Building a pop-and-fade animation with `@keyframes`, `transform: scale()`, and `opacity`
- **JavaScript skills**
  - Detecting a double-click using `Date` timestamps
  - Reading mouse coordinates (`clientX`/`clientY`) and element offsets (`offsetLeft`/`offsetTop`)
  - Positioning a created element precisely where the user clicked
  - Creating, appending, and auto-removing elements
  - Updating the DOM with a running count (pre-increment `++`)

## 2. Final Project Preview

**Layout & colors:** A clean white page with centered text. A heading reads "Double click on the image to ♥ it" (with a red heart icon), and below it a small line "You liked it 0 times". Under that sits a tall photo (300×440) with a soft drop shadow.

**Behavior & interactions:**
- **Double-click** anywhere on the image and a red heart appears right where you clicked.
- The heart **grows large and fades out** over about half a second, then is removed.
- The **counter** ("You liked it N times") increases by one on every double-click.
- Hearts are **clipped to the image** — they never spill outside it.

**What you can interact with:** the image (double-click it).

## 3. Prerequisites

- **Basic knowledge:** HTML tags, CSS rules, and JavaScript functions/variables. Double-click detection and cursor math are explained as we go.
- **Tools needed:**
  - A modern browser and a text editor (VS Code recommended)
  - An internet connection (Font Awesome, the background image, and the font all load from the web)
  - *Optional:* the VS Code **Live Server** extension
- **Files to create:**

```
double-click-heart/
├── index.html
├── style.css
└── script.js
```

Create these three empty files to begin.

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML skeleton and load Font Awesome

**🎯 Goal**
Set up the HTML document and load **Font Awesome**, the icon library that provides our heart icon.

**💡 Concept**
Font Awesome gives you scalable icons by applying classes (like `fas fa-heart`) to an `<i>` element. We load its stylesheet from a **CDN** so those classes work.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog==" crossorigin="anonymous" />
    <link rel="stylesheet" href="style.css" />
    <title>Double Click Heart</title>
  </head>
  <body>
    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**
- The first `<link>` loads Font Awesome's CSS from cdnjs; without it, the heart classes render nothing.
- Our own `style.css` is linked *after* Font Awesome so we can override or add styles.
- `script.js` sits at the bottom of `<body>` so the page's elements exist before it runs.

**✅ Checkpoint**
Open `index.html`. Blank page, but the tab title reads "Double Click Heart".

---

### Step 2: Add the heading, counter, and image

**🎯 Goal**
Add the instruction heading (with an inline heart icon), the "times liked" counter, and the image the user will double-click.

**💡 Concept**
The `<i class="fas fa-heart">` element is an empty tag that Font Awesome turns into a heart icon. The `<span id="times">` isolates the number so JavaScript can update just that value. The image is a `<div>` whose picture we'll set in CSS.

**📝 Code**

```html
<!-- goes in index.html, inside <body> above the <script> tag -->
<h3>Double click on the image to <i class="fas fa-heart"></i> it</h3>
<small>You liked it <span id="times">0</span> times</small>

<div class="loveMe"></div>
```

**🔍 Explanation**
- `<i class="fas fa-heart"></i>` shows a heart icon inline in the heading (`fas` = the solid style, `fa-heart` = the heart glyph).
- `<span id="times">0</span>` starts at `0`; JavaScript will replace this number.
- `<div class="loveMe"></div>` is empty — we'll give it a background photo in CSS, and JavaScript will drop hearts inside it.

**✅ Checkpoint**
Refresh. You'll see the heading with a small heart icon, the "You liked it 0 times" text, but no image yet (the `<div>` has no size or background).

---

### Step 3: Import the font and reset the box model

**🎯 Goal**
Load the Oswald font and make sizing predictable.

**💡 Concept**
`box-sizing: border-box` keeps padding and borders inside an element's declared size — a reliable reset applied to all elements.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css?family=Oswald');

* {
  box-sizing: border-box;
}
```

**🔍 Explanation**
- `@import` (first line of the file) loads the **Oswald** font from Google Fonts.
- `*` applies `border-box` sizing everywhere.

**✅ Checkpoint**
No visible change yet; the font is now available.

---

### Step 4: Style the page text

**🎯 Goal**
Center the text, apply the font, and space out the heading and counter.

**💡 Concept**
`overflow: hidden` on the body prevents scrollbars from appearing when large hearts animate near the edges of the screen.

**📝 Code**

```css
/* goes in style.css */
body {
  font-family: 'Oswald', sans-serif;
  text-align: center;
  overflow: hidden;
  margin: 0;
}

h3 {
  margin-bottom: 0;
  text-align: center;
}

small {
  display: block;
  margin-bottom: 20px;
  text-align: center;
}
```

**🔍 Explanation**
- The body uses Oswald, centers all text, hides overflow, and removes the default margin.
- `h3` drops its bottom margin so the counter sits close beneath it.
- `small` is normally inline; `display: block` puts it on its own line, and `margin-bottom: 20px` adds space before the image.

**✅ Checkpoint**
Refresh. The heading and counter are centered near the top with the Oswald font applied.

---

### Step 5: Style the heart color and the image box

**🎯 Goal**
Make heart icons red and turn the empty `<div>` into the photo the user interacts with.

**💡 Concept**
Two properties are critical here for later: `position: relative` makes the box an **anchor** so hearts (positioned absolutely) are placed relative to *it*, and `overflow: hidden` **clips** any hearts that grow beyond the image edges.

**📝 Code**

```css
/* goes in style.css */
.fa-heart {
  color: red;
}

.loveMe {
  height: 440px;
  width: 300px;
  background: url('https://images.unsplash.com/photo-1504215680853-026ed2a45def?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80')
    no-repeat center center/cover;
  margin: auto;
  cursor: pointer;
  max-width: 100%;
  position: relative;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  overflow: hidden;
}
```

**🔍 Explanation**
- `.fa-heart { color: red }` colors *every* heart icon red — both the one in the heading and the animated ones we'll create.
- `background: url(...) no-repeat center center/cover` fills the box with a photo, centered and scaled to cover it.
- `margin: auto` centers the fixed-width box; `cursor: pointer` hints it's interactive.
- `position: relative` + `overflow: hidden` are the key pair: they anchor and clip the hearts we'll add.

**✅ Checkpoint**
Refresh. A tall photo with a soft shadow now appears, centered below the text. The heading's heart icon is red.

---

### Step 6: Animate the burst heart

**🎯 Goal**
Define how a heart placed on the image looks and animates — growing large while fading away.

**💡 Concept**
`@keyframes` defines an animation timeline. Here the heart starts tiny (`scale(0)`) and the animation grows it to `scale(10)` while fading `opacity` to `0`. `translate(-50%, -50%)` centers the heart on the exact click point.

**📝 Code**

```css
/* goes in style.css */
.loveMe .fa-heart {
  position: absolute;
  animation: grow 0.6s linear;
  transform: translate(-50%, -50%) scale(0);
}

@keyframes grow {
  to {
    transform: translate(-50%, -50%) scale(10);
    opacity: 0;
  }
}
```

**🔍 Explanation**
- `.loveMe .fa-heart` targets only hearts *inside* the image. `position: absolute` lets us place each one at a specific point (relative to the `position: relative` box from Step 5).
- `transform: translate(-50%, -50%)` shifts the heart up and left by half its own size, so the point we set becomes its **center**, not its top-left corner.
- `scale(0)` makes it invisible to start; `animation: grow 0.6s linear` runs the `grow` timeline over 0.6 seconds.
- `@keyframes grow { to { ... } }` defines the end state: scaled up 10× and fully transparent — a satisfying pop-and-fade.

**✅ Checkpoint**
No visible change yet (no hearts exist until JavaScript creates them). All styling is done — time for the logic!

---

### Step 7: Select elements and set up state

**🎯 Goal**
Grab the image and counter elements, and create the variables that track clicks.

**💡 Concept**
We keep two pieces of **state**: `clickTime` (when the last click happened, used to detect a double-click) and `timesClicked` (the running like count).

**📝 Code**

```js
// goes in script.js
const loveMe = document.querySelector('.loveMe')
const times = document.querySelector('#times')

let clickTime = 0
let timesClicked = 0
```

**🔍 Explanation**
- `querySelector('.loveMe')` selects by class; `querySelector('#times')` selects by id (the `#` and `.` prefixes mirror CSS selectors).
- `clickTime` starts at `0`, meaning "no click recorded yet".
- `timesClicked` starts at `0` and will increase with each like. Both are `let` because they change.

**✅ Checkpoint**
Open the console — no errors. Type `loveMe` to confirm it logs the image `<div>`.

---

### Step 8: Start the createHeart function — build the icon

**🎯 Goal**
Begin the function that creates a heart element, starting with the element itself.

**💡 Concept**
`document.createElement('i')` builds a fresh `<i>` element. Adding the `fas` and `fa-heart` classes turns it into a Font Awesome heart — the same classes make it red (Step 5) and animatable (Step 6).

**📝 Code**

```js
// goes in script.js
const createHeart = (e) => {
    const heart = document.createElement('i')
    heart.classList.add('fas')
    heart.classList.add('fa-heart')

    // positioning and appending come next...
}
```

**🔍 Explanation**
- `createHeart` is an arrow function that receives `e`, the **click event** (we'll use its coordinates next).
- We create an `<i>`, then add both classes so it becomes a styled, animatable heart icon.

**✅ Checkpoint**
Save. Nothing to see yet — we finish this function over the next two steps before wiring it up.

---

### Step 9: Position the heart at the click point

**🎯 Goal**
Calculate where inside the image the user clicked, and place the heart there.

**💡 Concept**
`e.clientX`/`e.clientY` are the mouse coordinates relative to the whole **viewport**. But our heart is positioned relative to the **image box**. So we subtract the image's offset (`offsetLeft`/`offsetTop`) to convert page coordinates into coordinates *inside the image*.

**📝 Code**

```js
// goes in script.js, add inside createHeart after the classList lines
    const x = e.clientX
    const y = e.clientY

    const leftOffset = e.target.offsetLeft
    const topOffset = e.target.offsetTop

    const xInside = x - leftOffset
    const yInside = y - topOffset

    heart.style.top = `${yInside}px`
    heart.style.left = `${xInside}px`
```

**🔍 Explanation**
- `x`/`y` capture where the click landed on the page.
- `e.target` is the image (`.loveMe`); `offsetLeft`/`offsetTop` are its distance from the page's top-left.
- Subtracting gives `xInside`/`yInside` — the click position *within* the image.
- Setting `heart.style.top`/`left` (in `px`) places the heart there. Combined with the `translate(-50%, -50%)` from Step 6, the heart is centered on the click.

**✅ Checkpoint**
Save. Still no visual test yet — we append the heart in the next step.

---

### Step 10: Append the heart, count the like, and auto-remove

**🎯 Goal**
Finish `createHeart`: put the heart on the image, bump the counter, and clean the heart up after its animation.

**💡 Concept**
`++timesClicked` is **pre-increment**: it adds 1 *then* returns the new value, so the counter shows the updated number immediately. `setTimeout` removes the heart after 1 second so the DOM doesn't fill with dead elements.

**📝 Code**

```js
// goes in script.js, add inside createHeart after the positioning lines
    loveMe.appendChild(heart)

    times.innerHTML = ++timesClicked

    setTimeout(() => heart.remove(), 1000)
}
```

**🔍 Explanation**
- `loveMe.appendChild(heart)` adds the heart into the image, which kicks off the CSS `grow` animation instantly.
- `times.innerHTML = ++timesClicked` increments the count and writes the new number into the `<span id="times">`.
- `setTimeout(() => heart.remove(), 1000)` deletes the heart after 1 second (the animation itself lasts 0.6s).

Your complete function now reads:

```js
// goes in script.js
const createHeart = (e) => {
    const heart = document.createElement('i')
    heart.classList.add('fas')
    heart.classList.add('fa-heart')

    const x = e.clientX
    const y = e.clientY

    const leftOffset = e.target.offsetLeft
    const topOffset = e.target.offsetTop

    const xInside = x - leftOffset
    const yInside = y - topOffset

    heart.style.top = `${yInside}px`
    heart.style.left = `${xInside}px`

    loveMe.appendChild(heart)

    times.innerHTML = ++timesClicked

    setTimeout(() => heart.remove(), 1000)
}
```

**✅ Checkpoint**
The function is complete but nothing calls it yet. One more step wires it to double-clicks.

---

### Step 11: Detect a double-click and fire the heart

**🎯 Goal**
Listen for clicks on the image and only create a heart when two clicks happen quickly in a row.

**💡 Concept**
Rather than the built-in `dblclick` event, this project detects a double-click manually: it records the time of the first click, and if a second click arrives **within 800 milliseconds**, it counts as a double-click. Comparing `Date` timestamps (in milliseconds) is how we measure that gap.

**📝 Code**

```js
// goes in script.js, place this after the state variables (before createHeart is fine too)
loveMe.addEventListener('click', (e) => {
    if(clickTime === 0) {
        clickTime = new Date().getTime()
    } else {
        if((new Date().getTime() - clickTime) < 800) {
            createHeart(e)
            clickTime = 0
        } else {
            clickTime = new Date().getTime()
        }
    }
})
```

**🔍 Explanation**
- `new Date().getTime()` returns the current time in milliseconds.
- **First click:** `clickTime` is `0`, so we just record "now" and wait.
- **Second click:** if it arrived less than `800`ms after the first, it's a double-click → we call `createHeart(e)` and reset `clickTime` to `0`.
- If the second click was too slow, we treat it as a fresh first click by storing its time instead.

**✅ Checkpoint**
Refresh and **double-click** the image. A red heart bursts from where you clicked, grows and fades, and the counter increases by one each time. The project is complete! 🎉

---

## 5. Final Full Code (Reference)

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog==" crossorigin="anonymous" />
    <link rel="stylesheet" href="style.css" />
    <title>Double Click Heart</title>
  </head>
  <body>
    <h3>Double click on the image to <i class="fas fa-heart"></i> it</h3>
    <small>You liked it <span id="times">0</span> times</small>

    <div class="loveMe"></div>

    <script src="script.js"></script>
  </body>
</html>
```

### style.css

```css
@import url('https://fonts.googleapis.com/css?family=Oswald');

* {
  box-sizing: border-box;
}

body {
  font-family: 'Oswald', sans-serif;
  text-align: center;
  overflow: hidden;
  margin: 0;
}

h3 {
  margin-bottom: 0;
  text-align: center;
}

small {
  display: block;
  margin-bottom: 20px;
  text-align: center;
}

.fa-heart {
  color: red;
}

.loveMe {
  height: 440px;
  width: 300px;
  background: url('https://images.unsplash.com/photo-1504215680853-026ed2a45def?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80')
    no-repeat center center/cover;
  margin: auto;
  cursor: pointer;
  max-width: 100%;
  position: relative;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  overflow: hidden;
}

.loveMe .fa-heart {
  position: absolute;
  animation: grow 0.6s linear;
  transform: translate(-50%, -50%) scale(0);
}

@keyframes grow {
  to {
    transform: translate(-50%, -50%) scale(10);
    opacity: 0;
  }
}
```

### script.js

```js
const loveMe = document.querySelector('.loveMe')
const times = document.querySelector('#times')

let clickTime = 0
let timesClicked = 0

loveMe.addEventListener('click', (e) => {
    if(clickTime === 0) {
        clickTime = new Date().getTime()
    } else {
        if((new Date().getTime() - clickTime) < 800) {
            createHeart(e)
            clickTime = 0
        } else {
            clickTime = new Date().getTime()
        }
    }
})

const createHeart = (e) => {
    const heart = document.createElement('i')
    heart.classList.add('fas')
    heart.classList.add('fa-heart')

    const x = e.clientX
    const y = e.clientY

    const leftOffset = e.target.offsetLeft
    const topOffset = e.target.offsetTop

    const xInside = x - leftOffset
    const yInside = y - topOffset

    heart.style.top = `${yInside}px`
    heart.style.left = `${xInside}px`

    loveMe.appendChild(heart)

    times.innerHTML = ++timesClicked

    setTimeout(() => heart.remove(), 1000)
}
```

> **Ordering note:** in the final file the click listener appears *before* `createHeart`. That works because the listener only *calls* `createHeart` when you actually double-click — which happens after the whole script has finished loading and `createHeart` exists.

## 6. Recap & Next Steps

**What you learned:**
- Detecting a double-click manually by comparing `Date` timestamps
- Converting viewport mouse coordinates into positions inside an element using offsets
- Anchoring absolutely positioned children with `position: relative` and clipping them with `overflow: hidden`
- A pop-and-fade CSS animation with `@keyframes`, `transform: scale()`, and `opacity`
- Creating, positioning, appending, and auto-removing elements
- Updating a live counter with pre-increment (`++`)

**Enhancement challenges:**
1. **Randomize the hearts:** give each heart a slightly random size or rotation for variety.
2. **Use the native event:** try rebuilding the detection with the browser's built-in `dblclick` event and compare.
3. **Persist the count:** save `timesClicked` to `localStorage` so it survives a page refresh.
4. **Different icons:** cycle through a few Font Awesome icons (star, thumbs-up) instead of only hearts.
5. **Sound effect:** play a short "pop" sound each time a heart appears.
