# Toast Notification

## 1. Project Overview

This project builds a **toast notification** system: click a button and a small message ("toast") slides into the bottom-right corner, then automatically disappears after 3 seconds. Each toast gets a random message and a random color-coded type (info, success, or error).

**Key concepts involved:** DOM manipulation (creating and removing elements on the fly), event listeners, timers (`setTimeout`), arrays, and generating random values.

You will gain these skills:

- **HTML skills**
  - Structuring a page with a container element that JavaScript will fill dynamically
  - Using `id` attributes as JavaScript "hooks"
  - Linking an external stylesheet and script
- **CSS skills**
  - Centering content with Flexbox
  - Fixed positioning to pin an element to a corner of the viewport
  - Stacking elements in a column and aligning them
  - Using a compound class selector (`.toast.error`) for style variants
  - Button states with `:focus` and `:active`
- **JavaScript skills**
  - Selecting elements with `getElementById`
  - Creating elements with `document.createElement` and adding classes
  - Appending and removing nodes from the DOM
  - Auto-dismissing elements with `setTimeout`
  - Picking a random item from an array with `Math.random()`
  - Default function parameters

## 2. Final Project Preview

**Layout & colors:** A deep purple (`rebeccapurple`) page with everything centered. In the middle sits a single white button labeled **"Show Notification"**. Toasts are white cards with rounded corners that stack in the **bottom-right** corner of the screen.

**Behavior & interactions:**
- Clicking the button spawns a new toast in the bottom-right corner.
- Each toast shows a **random message** ("Message One" through "Message Four").
- Each toast is one of three **random types**, which only changes its text color: info (purple), success (green), or error (red).
- Every toast **removes itself automatically after 3 seconds**.
- Click repeatedly and toasts **stack** on top of each other, newest at the bottom.

**What you can interact with:** just one thing — the "Show Notification" button.

## 3. Prerequisites

- **Basic knowledge:** You should recognize basic HTML tags, CSS rules, and JavaScript variables/functions. Everything specific to this pattern is explained as we go.
- **Tools needed:**
  - A modern web browser (Chrome, Firefox, Edge…)
  - A text editor (VS Code recommended)
  - *Optional:* the VS Code **Live Server** extension for auto-refresh
- **Files to create:**

```
toast-notification/
├── index.html
├── style.css
└── script.js
```

Create these three empty files now. We'll fill them step by step.

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML skeleton

**🎯 Goal**
Set up a valid HTML document that loads our stylesheet and script. Every project needs this foundation before anything can display.

**💡 Concept**
The `<!DOCTYPE html>` declaration plus the `<html>`, `<head>`, and `<body>` structure is the standard HTML5 boilerplate. The `<head>` holds metadata and links; the `<body>` holds visible content.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Toast Notification</title>
  </head>
  <body>
    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**
- `<meta charset="UTF-8" />` lets the page display any character correctly.
- `<meta name="viewport" ...>` makes the page scale properly on mobile devices.
- `<link rel="stylesheet" href="style.css" />` connects our CSS file.
- `<script src="script.js"></script>` sits at the **bottom of `<body>`** so the HTML elements exist before the script runs.

**✅ Checkpoint**
Open `index.html` in your browser. You'll see a blank page, but the tab title should read "Toast Notification".

---

### Step 2: Add the toast container and the button

**🎯 Goal**
Add the two elements the app needs: an empty container where toasts will appear, and the button that triggers them.

**💡 Concept**
The container starts **empty** — JavaScript will create toasts and drop them inside it later. We give both elements `id`s so JavaScript can grab them easily.

**📝 Code**

```html
<!-- goes in index.html, inside <body> above the <script> tag -->
<div id="toasts"></div>

<button class="btn" id="button">Show Notification</button>
```

**🔍 Explanation**
- `<div id="toasts"></div>` is the **stack** that will hold all toasts. It's empty on purpose.
- `<button class="btn" id="button">` is our trigger. The `class="btn"` is for styling; the `id="button"` is for JavaScript.

**✅ Checkpoint**
Refresh the browser. You should now see an unstyled "Show Notification" button. Clicking it does nothing yet — that's expected.

---

### Step 3: Import a font and reset the box model

**🎯 Goal**
Load a nice font and make sizing predictable across every element.

**💡 Concept**
`box-sizing: border-box` makes an element's declared width/height *include* its padding and border, so layouts behave the way you expect. Applying it to `*` (all elements) is a common, reliable reset.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap');

* {
  box-sizing: border-box;
}
```

**🔍 Explanation**
- `@import url(...)` pulls the **Poppins** font from Google Fonts. `@import` must be the very first line of the CSS file.
- The `*` selector targets **every** element; `box-sizing: border-box` prevents padding from unexpectedly making boxes wider than you set them.

**✅ Checkpoint**
Nothing visibly changes yet, but the font is now available for use.

---

### Step 4: Center everything on a purple page

**🎯 Goal**
Turn the whole `<body>` into a centered layout with the signature purple background.

**💡 Concept**
Flexbox is the easiest way to center content. Setting the body to `height: 100vh` (100% of the viewport height) plus `justify-content` and `align-items: center` puts content dead-center vertically and horizontally.

**📝 Code**

```css
/* goes in style.css */
body {
  background-color: rebeccapurple;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}
```

**🔍 Explanation**
- `display: flex` + `flex-direction: column` stacks children vertically.
- `align-items: center` centers them horizontally; `justify-content: center` centers them vertically.
- `height: 100vh` makes the body fill the screen so centering has room to work.
- `overflow: hidden` hides any scrollbars (toasts sliding in shouldn't cause scrolling).
- `margin: 0` removes the browser's default body margin.

**✅ Checkpoint**
Refresh. The page is now purple and the button sits centered on screen.

---

### Step 5: Style the button

**🎯 Goal**
Make the button look like a clickable, polished control with a little press animation.

**💡 Concept**
`:focus` and `:active` are **pseudo-classes** — they target an element in a particular state (focused, or being clicked). We use them to remove the default focus outline and to add a subtle "press" effect.

**📝 Code**

```css
/* goes in style.css */
.btn {
  background-color: #ffffff;
  color: rebeccapurple;
  font-family: inherit;
  font-weight: bold;
  padding: 1rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}
```

**🔍 Explanation**
- `font-family: inherit` makes the button use the page's Poppins font (buttons don't inherit fonts by default).
- `cursor: pointer` shows the hand cursor on hover, signaling "clickable".
- `.btn:active { transform: scale(0.98); }` shrinks the button slightly *while* it's being pressed — a satisfying micro-interaction.

**✅ Checkpoint**
Refresh. The button is now white with bold purple text and rounded corners. Press and hold it — it shrinks a touch.

---

### Step 6: Position the toast stack in the corner

**🎯 Goal**
Pin the toast container to the bottom-right of the screen and make new toasts stack upward.

**💡 Concept**
`position: fixed` locks an element to a spot in the **viewport**, ignoring scroll and other content. Combined with `bottom` and `right`, it anchors our stack to a corner.

**📝 Code**

```css
/* goes in style.css */
#toasts {
  position: fixed;
  bottom: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
```

**🔍 Explanation**
- `position: fixed` + `bottom: 10px` + `right: 10px` glues the container 10px from the bottom-right corner.
- `flex-direction: column` stacks toasts vertically.
- `align-items: flex-end` right-aligns them, so toasts of different widths line up along their right edge.

**✅ Checkpoint**
No visible change yet — the container is empty. We'll fill it with JavaScript soon.

---

### Step 7: Style the toast and its color variants

**🎯 Goal**
Define what a single toast looks like, plus three color variations for info, success, and error.

**💡 Concept**
A **compound selector** like `.toast.info` (no space between the class names) targets an element that has *both* classes at once. This lets us keep shared toast styles in `.toast` and layer on just the text color per type.

**📝 Code**

```css
/* goes in style.css */
.toast {
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem 2rem;
  margin: 0.5rem;
}

.toast.info {
  color: rebeccapurple;
}

.toast.success {
  color: green;
}

.toast.error {
  color: red;
}
```

**🔍 Explanation**
- `.toast` gives every toast a white rounded card with breathing room (`padding`) and spacing between stacked toasts (`margin`).
- `.toast.info`, `.toast.success`, `.toast.error` each only set the **text color**. An element with `class="toast success"` gets both the white card *and* green text.

**✅ Checkpoint**
Still nothing visible (no toasts exist yet). The styling is ready and waiting. Time for JavaScript!

---

### Step 8: Select the elements JavaScript needs

**🎯 Goal**
Grab references to the button and the toast container so JavaScript can work with them.

**💡 Concept**
`document.getElementById('...')` finds an element by its `id` and returns it so we can store it in a variable and act on it later.

**📝 Code**

```js
// goes in script.js
const button = document.getElementById('button')
const toasts = document.getElementById('toasts')
```

**🔍 Explanation**
- `button` now points to our trigger button.
- `toasts` now points to the empty container. We'll append new toasts into it.

**✅ Checkpoint**
Open the browser console (F12). No errors should appear. You can type `button` and press Enter to confirm it logs the button element.

---

### Step 9: Define the message and type data

**🎯 Goal**
Create the pool of possible messages and the list of toast types to pick from randomly.

**💡 Concept**
Storing options in **arrays** lets us later pick a random entry. Keeping data separate from logic makes it easy to add more messages later.

**📝 Code**

```js
// goes in script.js
const messages = [
    'Message One',
    'Message Two',
    'Message Three',
    'Message Four',
]

const types = ['info', 'success', 'error']
```

**🔍 Explanation**
- `messages` holds the four possible texts a toast can show.
- `types` holds the three style variants — note these strings **exactly match** the CSS classes `.info`, `.success`, `.error` from Step 7. That's how the color gets applied.

**✅ Checkpoint**
No visible change. In the console, type `types` — it should log `['info', 'success', 'error']`.

---

### Step 10: Add helper functions for random choices

**🎯 Goal**
Write two small functions that each return a random item — one from `messages`, one from `types`.

**💡 Concept**
`Math.random()` returns a decimal between 0 and 1. Multiplying it by an array's `length` and flooring the result gives a valid random **index** into that array.

**📝 Code**

```js
// goes in script.js
function getRandomMessage() {
    return messages[Math.floor(Math.random() * messages.length)]
}

function getRandomType() {
    return types[Math.floor(Math.random() * types.length)]
}
```

**🔍 Explanation**
- `Math.random() * messages.length` gives a number from `0` up to (but not including) `4`.
- `Math.floor(...)` rounds it down to a whole number: `0`, `1`, `2`, or `3` — a valid index.
- We then return the array item at that index.

**✅ Checkpoint**
In the console, run `getRandomType()` a few times. You should get different values from `info`, `success`, `error`.

---

### Step 11: Create and show a toast

**🎯 Goal**
Write the core function that builds a toast element, gives it a random type and message, and drops it into the container.

**💡 Concept**
`document.createElement('div')` builds a brand-new element in memory. We configure it (classes, text) and then `appendChild` it into the page. The function also accepts optional arguments with **default parameters** (`= null`) so it can show a *specific* message/type, or fall back to random ones.

**📝 Code**

```js
// goes in script.js
function createNotification(message = null, type = null) {
    const notif = document.createElement('div')
    notif.classList.add('toast')
    notif.classList.add(type ? type : getRandomType())

    notif.innerText = message ? message : getRandomMessage()

    toasts.appendChild(notif)
}
```

**🔍 Explanation**
- `message = null, type = null` are **default parameters**: if you call `createNotification()` with no arguments, both are `null`.
- `notif.classList.add('toast')` gives it the base card style.
- `type ? type : getRandomType()` is a **ternary**: if `type` was provided, use it; otherwise pick a random one. Same idea for the message.
- `notif.innerText = ...` sets the visible text.
- `toasts.appendChild(notif)` inserts the finished toast into the container.

**✅ Checkpoint**
In the console, run `createNotification()`. A colored toast should pop into the bottom-right corner and **stay** there (we haven't added auto-dismiss yet). Run it again — they stack.

---

### Step 12: Auto-dismiss the toast after 3 seconds

**🎯 Goal**
Make each toast remove itself automatically so the screen doesn't fill up forever.

**💡 Concept**
`setTimeout(callback, delay)` runs a function once after `delay` milliseconds. We use it to schedule the toast's removal.

**📝 Code**

```js
// goes in script.js, add these lines inside createNotification, after toasts.appendChild(notif)
    setTimeout(() => {
        notif.remove()
    }, 3000)
```

**🔍 Explanation**
- `setTimeout(() => { ... }, 3000)` waits **3000 milliseconds (3 seconds)**, then runs the arrow function.
- `notif.remove()` deletes *this specific* toast from the page. Because each call to `createNotification` has its own `notif` variable, each toast tracks and removes itself independently.

Your full function now looks like:

```js
// goes in script.js
function createNotification(message = null, type = null) {
    const notif = document.createElement('div')
    notif.classList.add('toast')
    notif.classList.add(type ? type : getRandomType())

    notif.innerText = message ? message : getRandomMessage()

    toasts.appendChild(notif)

    setTimeout(() => {
        notif.remove()
    }, 3000)
}
```

**✅ Checkpoint**
Run `createNotification()` in the console again. The toast appears, then vanishes after 3 seconds. 🎉

---

### Step 13: Trigger a toast on button click

**🎯 Goal**
Wire the button so that clicking it creates a notification — no console needed.

**💡 Concept**
`addEventListener('click', callback)` runs your callback every time the element is clicked. This is how we connect user actions to code.

**📝 Code**

```js
// goes in script.js, place this after the element selections (near the top)
button.addEventListener('click', () => createNotification())
```

**🔍 Explanation**
- Every click calls `createNotification()` with no arguments, so it uses a random message and random type each time.
- We wrap it in an arrow function `() => createNotification()` so the click event doesn't get passed in as the `message` argument.

**✅ Checkpoint**
Refresh the page and click **"Show Notification"** repeatedly. Random colored toasts appear in the corner and disappear after 3 seconds. The project is complete!

---

## 5. Final Full Code (Reference)

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Toast Notification</title>
  </head>
  <body>
    <div id="toasts"></div>

    <button class="btn" id="button">Show Notification</button>

    <script src="script.js"></script>
  </body>
</html>
```

### style.css

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: rebeccapurple;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.btn {
  background-color: #ffffff;
  color: rebeccapurple;
  font-family: inherit;
  font-weight: bold;
  padding: 1rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

#toasts {
  position: fixed;
  bottom: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.toast {
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem 2rem;
  margin: 0.5rem;
}

.toast.info {
  color: rebeccapurple;
}

.toast.success {
  color: green;
}

.toast.error {
  color: red;
}
```

### script.js

```js
const button = document.getElementById('button')
const toasts = document.getElementById('toasts')

const messages = [
    'Message One',
    'Message Two',
    'Message Three',
    'Message Four',
]

const types = ['info', 'success', 'error']

button.addEventListener('click', () => createNotification())

function createNotification(message = null, type = null) {
    const notif = document.createElement('div')
    notif.classList.add('toast')
    notif.classList.add(type ? type : getRandomType())

    notif.innerText = message ? message : getRandomMessage()

    toasts.appendChild(notif)

    setTimeout(() => {
        notif.remove()
    }, 3000)
}

function getRandomMessage() {
    return messages[Math.floor(Math.random() * messages.length)]
}

function getRandomType() {
    return types[Math.floor(Math.random() * types.length)]
}
```

## 6. Recap & Next Steps

**What you learned:**
- Building HTML elements on the fly with `document.createElement`, `classList.add`, and `appendChild`
- Removing elements and scheduling that removal with `setTimeout` + `element.remove()`
- Picking random array items with `Math.random()` and `Math.floor()`
- Default parameters and ternary expressions for flexible functions
- Centering with Flexbox and pinning a stack to a corner with `position: fixed`
- Compound CSS selectors (`.toast.success`) for style variants

**Enhancement challenges:**
1. **Add a close button** to each toast so users can dismiss it early.
2. **Slide-in animation:** add a CSS `@keyframes` animation so toasts glide in instead of popping.
3. **Custom messages:** wire up a text input and call `createNotification(yourText, 'success')` with real content.
4. **Progress bar:** show a shrinking bar on each toast that visually counts down the 3 seconds.
5. **Limit the stack:** cap the number of visible toasts (e.g. remove the oldest once there are more than 5).
