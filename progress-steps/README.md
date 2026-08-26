# Progress Steps

A code-along tutorial that rebuilds this project from three empty files. Follow it top to bottom and you'll end up with the exact same app that lives in this folder.

## 1. Project Overview

A horizontal **progress stepper**: four numbered circles connected by a line, with **Prev** and **Next** buttons that move you forward and backward through the steps while a colored bar fills to show how far along you are.

**Key concepts involved**

- DOM selection and manipulation (`getElementById`, `querySelectorAll`)
- Tracking UI **state** in a JavaScript variable
- Toggling CSS classes to drive visual changes
- Deriving a percentage width from data and animating it with CSS transitions
- Enabling/disabling buttons at the boundaries

**HTML skills you'll gain**

- Structuring a small component with semantic `<div>`s and `<button>`s
- Using `id` (unique hooks) vs `class` (repeated/stylable hooks)
- The `disabled` attribute on buttons

**CSS skills you'll gain**

- CSS custom properties (variables) with `:root`
- Centering a layout with Flexbox
- Drawing a background line with the `::before` pseudo-element and `z-index`
- Smooth state changes with `transition`
- Styling interactive button states: `:active`, `:focus`, `:disabled`

**JavaScript skills you'll gain**

- Selecting single and multiple elements
- Attaching `click` event listeners
- Guarding a counter against going out of bounds
- Looping with `forEach` and using the element's index
- Reading a `NodeList`'s `.length` to compute progress

## 2. Final Project Preview

**Layout & colors**

- A light grey (`#f1f1f1`) page with everything centered vertically and horizontally.
- Four white circles (30x30px) with numbers 1-4, each with a grey border by default. "Active" circles get a blue (`#3498db`) border.
- Behind the circles runs a thin horizontal line: a dark grey "empty" track with a blue "fill" bar layered on top of it.
- Below the circles: two blue rounded buttons, **Prev** and **Next**.

**Behavior & interactions**

- On load, only circle 1 is active, the fill bar is at 0%, and **Prev** is disabled.
- Clicking **Next** activates the next circle and grows the blue fill bar toward it (smoothly, thanks to a CSS transition).
- Clicking **Prev** deactivates the current circle and shrinks the bar back.
- **Prev** is disabled at step 1; **Next** is disabled at step 4. You can never step past the ends.

**What you can interact with**

- The **Prev** button
- The **Next** button

## 3. Prerequisites

**You should know**

- Basic HTML tags and attributes
- Basic CSS selectors and properties
- Basic JavaScript: variables, functions, and arrays

**Tools**

- A modern web browser (Chrome, Firefox, Edge...)
- A text editor (VS Code recommended)
- Optional but handy: the **Live Server** VS Code extension for auto-reload

**Files to create**

```
progress-steps/
├── index.html
├── style.css
└── script.js
```

Create all three now, empty. We'll fill them in step by step.

## 4. Build the Project Step-by-Step

### Step 1: Set Up the HTML Boilerplate

**🎯 Goal**
Create a valid HTML page and link the CSS and JS files so everything is wired up before we write any features.

**💡 Concept**
Every project starts with an HTML "skeleton". The `<link>` in the `<head>` pulls in styles; the `<script>` at the *end of the body* runs our JS after the page's elements exist.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Progress Steps</title>
  </head>
  <body>
    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**

- `<!DOCTYPE html>` tells the browser to use modern HTML rules.
- The `viewport` meta tag makes the page scale correctly on mobile.
- `<link rel="stylesheet" href="style.css" />` connects our stylesheet.
- `<script src="script.js"></script>` sits at the bottom so the DOM is fully parsed before the script runs (otherwise our element lookups would find nothing).

**✅ Checkpoint**
Open `index.html` in the browser. You'll see a blank white page titled "Progress Steps" in the tab. That's expected.

---

### Step 2: Add the Container and the Progress Track

**🎯 Goal**
Build the outer container and the row that will hold our step circles.

**💡 Concept**
We wrap the whole widget in a `.container` for centering, and put the circles inside a `.progress-container` that we'll later turn into a Flexbox row.

**📝 Code**

```html
<!-- goes in index.html — inside <body>, above the <script> tag -->
<div class="container">
  <div class="progress-container">
    <div class="circle active">1</div>
    <div class="circle">2</div>
    <div class="circle">3</div>
    <div class="circle">4</div>
  </div>
</div>
```

**🔍 Explanation**

- Four `.circle` divs hold the step numbers 1-4.
- The first circle also has the `active` class — it's the step we start on.
- `class="circle active"` means an element can carry **two** classes at once: shared styling from `.circle` plus the "on" styling from `.active`.

**✅ Checkpoint**
You'll see the numbers 1, 2, 3, 4 stacked vertically (unstyled). We'll arrange them into a row soon.

---

### Step 3: Add the Progress Fill Bar and the Buttons

**🎯 Goal**
Add the blue fill bar and the Prev/Next buttons.

**💡 Concept**
The fill bar is a separate element (`#progress`) whose width we'll change with JavaScript. Buttons get unique `id`s so JS can grab each one, and Prev starts `disabled` because step 1 has nowhere to go back to.

**📝 Code**

```html
<!-- goes in index.html — add the #progress div as the FIRST child of .progress-container -->
<div class="progress" id="progress"></div>
```

```html
<!-- goes in index.html — after the closing </div> of .progress-container, still inside .container -->
<button class="btn" id="prev" disabled>Prev</button>
<button class="btn" id="next">Next</button>
```

Your `.container` should now look like this:

```html
<!-- goes in index.html -->
<div class="container">
  <div class="progress-container">
    <div class="progress" id="progress"></div>
    <div class="circle active">1</div>
    <div class="circle">2</div>
    <div class="circle">3</div>
    <div class="circle">4</div>
  </div>

  <button class="btn" id="prev" disabled>Prev</button>
  <button class="btn" id="next">Next</button>
</div>
```

**🔍 Explanation**

- `#progress` is empty on purpose — it's just a colored bar we resize later.
- `disabled` on the Prev button greys it out and blocks clicks until JS decides otherwise.
- `id="prev"` / `id="next"` are unique hooks for JavaScript.

**✅ Checkpoint**
You now see the numbers plus two buttons labeled Prev and Next. The HTML is complete — from here it's all CSS and JS.

---

### Step 4: Import a Font and Reset the Box Model

**🎯 Goal**
Load the "Muli" font and make sizing predictable across every element.

**💡 Concept**
`@import` pulls a Google Font into our CSS. `box-sizing: border-box` makes `width`/`height` *include* padding and borders, which prevents surprise overflow.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

:root {
  --line-border-fill: #3498db;
  --line-border-empty: #383838;
}

* {
  box-sizing: border-box;
}
```

**🔍 Explanation**

- `@import` must be the very first line of the stylesheet.
- `:root` holds **CSS variables**. `--line-border-fill` is the blue we use for "done", `--line-border-empty` is the dark grey for "not done yet". Defining colors once means we can reuse them with `var(...)` and change them in one place.
- `*` selects every element, applying the border-box reset globally.

**✅ Checkpoint**
Nothing visible changes yet, but the font is now loaded and ready.

---

### Step 5: Center Everything on the Page

**🎯 Goal**
Put the widget dead-center in the viewport.

**💡 Concept**
Making the `body` a Flexbox container and giving it the full viewport height lets us center its child both horizontally and vertically in two lines.

**📝 Code**

```css
/* goes in style.css */
body {
  background-color: #f1f1f1;
  font-family: 'Muli', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.container {
  text-align: center;
}
```

**🔍 Explanation**

- `display: flex` turns the body into a flex container; `align-items: center` centers vertically and `justify-content: center` centers horizontally.
- `height: 100vh` makes the body as tall as the screen so vertical centering has room to work.
- `overflow: hidden` hides any accidental scrollbars; `margin: 0` removes the browser's default body margin.
- `.container { text-align: center }` centers the buttons under the circles.

**✅ Checkpoint**
The circles-and-buttons block now sits in the middle of the page.

---

### Step 6: Arrange the Circles in a Row

**🎯 Goal**
Spread the four circles evenly across a fixed-width row.

**💡 Concept**
Flexbox with `justify-content: space-between` pushes the first and last items to the edges and distributes the space between them. `position: relative` prepares this box to hold absolutely-positioned children (the line and fill bar) later.

**📝 Code**

```css
/* goes in style.css */
.progress-container {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 30px;
  max-width: 100%;
  width: 350px;
}
```

**🔍 Explanation**

- `display: flex` + `justify-content: space-between` lays the circles out horizontally with equal gaps.
- `width: 350px` fixes the track length; `max-width: 100%` keeps it from overflowing on tiny screens.
- `position: relative` is the anchor for the line/fill bar we position `absolute`ly next.
- `margin-bottom: 30px` leaves breathing room above the buttons.

**✅ Checkpoint**
The numbers 1-4 now sit in a horizontal row with even spacing.

---

### Step 7: Draw the Background Line

**🎯 Goal**
Draw the dark grey "track" line that runs behind all the circles.

**💡 Concept**
The `::before` **pseudo-element** lets us add a decorative element via CSS alone — no extra HTML. We stretch it across the container and push it *behind* the circles with a negative `z-index`.

**📝 Code**

```css
/* goes in style.css */
.progress-container::before {
  content: '';
  background-color: var(--line-border-empty);
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 4px;
  width: 100%;
  z-index: -1;
}
```

**🔍 Explanation**

- `content: ''` is required for a pseudo-element to appear at all.
- `position: absolute` positions it relative to `.progress-container` (which we made `relative`).
- `top: 50%` + `transform: translateY(-50%)` vertically centers the 4px line perfectly regardless of its height.
- `var(--line-border-empty)` reuses our grey variable.
- `z-index: -1` tucks it behind the circles.

**✅ Checkpoint**
A thin dark line now runs horizontally through the middle of the circles.

---

### Step 8: Add the Blue Fill Bar

**🎯 Goal**
Place the blue progress bar on top of the grey track, starting at 0% width.

**💡 Concept**
This mirrors the track line but uses the blue "fill" color and starts at `width: 0%`. A `transition` makes future width changes animate smoothly instead of snapping.

**📝 Code**

```css
/* goes in style.css */
.progress {
  background-color: var(--line-border-fill);
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 4px;
  width: 0%;
  z-index: -1;
  transition: 0.4s ease;
}
```

**🔍 Explanation**

- Same centering trick as the track (`top: 50%` + `translateY(-50%)`).
- `width: 0%` means it's invisible on load — it'll grow as steps advance.
- `transition: 0.4s ease` animates any property that changes (here, `width`) over 0.4 seconds with an eased curve.

**✅ Checkpoint**
No visible change yet (width is 0%), but the fill bar exists and is ready to grow.

---

### Step 9: Style the Circles

**🎯 Goal**
Turn the plain numbers into proper round step markers.

**💡 Concept**
`border-radius: 50%` on an equal-width-and-height box makes a circle. We center the number inside with Flexbox and give it a smooth `transition` for the color change to come.

**📝 Code**

```css
/* goes in style.css */
.circle {
  background-color: #f1f1f1;
  color: #e2e2e2;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid var(--line-border-empty);
  transition: 0.4s ease;
}
```

**🔍 Explanation**

- Equal `height`/`width` (30px) + `border-radius: 50%` = a circle.
- `background-color: #f1f1f1` matches the page so the track line doesn't show *through* the circle.
- `display: flex` with both `align-items`/`justify-content` center the number.
- `border: 3px solid var(--line-border-empty)` gives the default grey ring.
- `transition: 0.4s ease` will smoothly animate the border color when a circle becomes active.

**✅ Checkpoint**
The numbers are now inside grey-ringed circles sitting on the line.

---

### Step 10: Highlight the Active Circles

**🎯 Goal**
Make circles with the `active` class stand out with a blue ring.

**💡 Concept**
A **compound selector** `.circle.active` targets elements that have *both* classes. Because `.circle` already has a transition, this color change animates automatically.

**📝 Code**

```css
/* goes in style.css */
.circle.active {
  border-color: var(--line-border-fill);
}
```

**🔍 Explanation**

- `.circle.active` (no space between the classes) matches an element carrying both `circle` and `active`.
- It only overrides `border-color`, swapping grey for blue.

**✅ Checkpoint**
Circle 1 (which has `active` in the HTML) now has a blue ring; circles 2-4 stay grey.

---

### Step 11: Style the Buttons

**🎯 Goal**
Style the Prev/Next buttons and give clear feedback for pressed, focused, and disabled states.

**💡 Concept**
Pseudo-classes let one selector cover multiple interaction states: `:active` (being clicked), `:focus` (keyboard/click focus), and `:disabled` (can't be used).

**📝 Code**

```css
/* goes in style.css */
.btn {
  background-color: var(--line-border-fill);
  color: #fff;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  padding: 8px 30px;
  margin: 5px;
  font-size: 14px;
}

.btn:active {
  transform: scale(0.98);
}

.btn:focus {
  outline: 0;
}

.btn:disabled {
  background-color: var(--line-border-empty);
  cursor: not-allowed;
}
```

**🔍 Explanation**

- `border: 0` removes the default button border; `border-radius: 6px` rounds the corners.
- `cursor: pointer` shows a hand on hover so it feels clickable.
- `font-family: inherit` makes the button use the Muli page font instead of the browser default.
- `:active { transform: scale(0.98) }` shrinks the button slightly while pressed — a subtle "click" feel.
- `:focus { outline: 0 }` removes the default focus ring.
- `:disabled` turns the button grey and shows a "not-allowed" cursor.

**✅ Checkpoint**
Both buttons are blue and rounded; **Prev** appears greyed out (it's `disabled`). Styling is now complete — the page looks finished but doesn't *do* anything yet.

---

### Step 12: Select the Elements in JavaScript

**🎯 Goal**
Grab the DOM elements the script needs to control.

**💡 Concept**
Before we can change something, we need a reference to it. `getElementById` returns one element; `querySelectorAll` returns a `NodeList` of *all* matches.

**📝 Code**

```js
// goes in script.js
const progress = document.getElementById('progress')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const circles = document.querySelectorAll('.circle')
```

**🔍 Explanation**

- `progress`, `prev`, `next` grab the fill bar and the two buttons by their `id`.
- `circles` collects all four `.circle` elements into a `NodeList` we can loop over.

**✅ Checkpoint**
No visible change. Open DevTools (F12) and type `circles` in the Console — you should see all four circle elements.

---

### Step 13: Track the Current Step and Wire Up "Next"

**🎯 Goal**
Store which step we're on and advance it when Next is clicked.

**💡 Concept**
A single variable, `currentActive`, is our **state** — the source of truth for how far along we are. We clamp it so it never exceeds the number of circles.

**📝 Code**

```js
// goes in script.js
let currentActive = 1

next.addEventListener('click', () => {
    currentActive++

    if(currentActive > circles.length) {
        currentActive = circles.length
    }

    update()
})
```

**🔍 Explanation**

- `let currentActive = 1` — we start on step 1. It's `let` (not `const`) because it changes.
- `addEventListener('click', ...)` runs the arrow function every time Next is clicked.
- `currentActive++` moves us forward one step.
- The `if` guard clamps the value to `circles.length` (4) so we can't go past the last step.
- `update()` re-renders the UI — we'll write it in Step 15.

**✅ Checkpoint**
Clicking Next will throw a "update is not defined" error for now — expected. We add `update()` in Step 15.

---

### Step 14: Wire Up the "Prev" Button

**🎯 Goal**
Step backward when Prev is clicked, without going below step 1.

**💡 Concept**
The mirror image of Next: decrement the counter and clamp it at the lower bound.

**📝 Code**

```js
// goes in script.js
prev.addEventListener('click', () => {
    currentActive--

    if(currentActive < 1) {
        currentActive = 1
    }

    update()
})
```

**🔍 Explanation**

- `currentActive--` moves us back one step.
- The `if` guard keeps `currentActive` from dropping below 1.
- `update()` re-renders after the change.

**✅ Checkpoint**
Still an error until we define `update()` next — but both buttons are now wired.

---

### Step 15: Render Active Circles and the Fill Bar

**🎯 Goal**
Write `update()` so it lights up the right circles and sizes the blue bar.

**💡 Concept**
`update()` reads our state (`currentActive`) and makes the DOM match it. We add `active` to every circle *before* the current position, then compute the bar's width from how many circles are active.

**📝 Code**

```js
// goes in script.js
function update() {
    circles.forEach((circle, idx) => {
        if(idx < currentActive) {
            circle.classList.add('active')
        } else {
            circle.classList.remove('active')
        }
    })

    const actives = document.querySelectorAll('.active')

    progress.style.width = (actives.length - 1) / (circles.length - 1) * 100 + '%'
}
```

**🔍 Explanation**

- `circles.forEach((circle, idx) => ...)` loops over each circle with its index (`idx` is 0-based).
- `if (idx < currentActive)` — since `idx` starts at 0, circles at index 0 up to `currentActive - 1` get `active`; the rest have it removed. So `currentActive = 2` activates circles at index 0 and 1 (steps 1 and 2).
- `classList.add/remove('active')` triggers our blue-border CSS (with the smooth transition).
- `actives` counts how many `.active` elements currently exist.
- The width formula: with 4 circles, the gaps *between* them number 3 (`circles.length - 1`). `(actives.length - 1)` is how many gaps should be filled. So 2 actives → `1/3 * 100 = 33.3%`. The `+ '%'` turns the number into a CSS width string.

**✅ Checkpoint**
Click Next: circles light up blue one by one and the fill bar grows smoothly to meet them. Click Prev: it reverses.

---

### Step 16: Disable Buttons at the Boundaries

**🎯 Goal**
Grey out Prev on the first step and Next on the last step.

**💡 Concept**
Setting an element's `.disabled` property to `true`/`false` toggles the same behavior as the HTML `disabled` attribute — and triggers our `:disabled` CSS.

**📝 Code**

```js
// goes in script.js — add inside update(), after the progress.style.width line
    if(currentActive === 1) {
        prev.disabled = true
    } else if(currentActive === circles.length) {
        next.disabled = true
    } else {
        prev.disabled = false
        next.disabled = false
    }
```

**🔍 Explanation**

- On step 1, disable **Prev** (nowhere to go back).
- On the last step (`circles.length`, i.e. 4), disable **Next**.
- Anywhere in between, both buttons are enabled.
- Because this runs every `update()`, the buttons re-enable themselves as soon as you move off an end.

**✅ Checkpoint**
The project is complete. On load Prev is disabled; step all the way to 4 and Next disables; step back and both re-enable. The fill bar animates the whole way. 🎉

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
    <title>Progress Steps</title>
  </head>
  <body>
    <div class="container">
      <div class="progress-container">
        <div class="progress" id="progress"></div>
        <div class="circle active">1</div>
        <div class="circle">2</div>
        <div class="circle">3</div>
        <div class="circle">4</div>
      </div>

      <button class="btn" id="prev" disabled>Prev</button>
      <button class="btn" id="next">Next</button>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

### `style.css`

```css
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

:root {
  --line-border-fill: #3498db;
  --line-border-empty: #383838;

}

* {
  box-sizing: border-box;
}

body {
  background-color: #f1f1f1;
  font-family: 'Muli', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.container {
  text-align: center;
}

.progress-container {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 30px;
  max-width: 100%;
  width: 350px;
}

.progress-container::before {
  content: '';
  background-color: var(--line-border-empty);
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 4px;
  width: 100%;
  z-index: -1;
}

.progress {
  background-color: var(--line-border-fill);
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 4px;
  width: 0%;
  z-index: -1;
  transition: 0.4s ease;
}

.circle {
  background-color: #f1f1f1;
  color:#e2e2e2;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid var(--line-border-empty);
  transition: 0.4s ease;
}

.circle.active {
  border-color: var(--line-border-fill);
}

.btn {
  background-color: var(--line-border-fill);
  color: #fff;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  padding: 8px 30px;
  margin: 5px;
  font-size: 14px;
}

.btn:active {
  transform: scale(0.98);
}

.btn:focus {
  outline: 0;
}

.btn:disabled {
  background-color: var(--line-border-empty);
  cursor: not-allowed;
}
```

### `script.js`

```js
const progress = document.getElementById('progress')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const circles = document.querySelectorAll('.circle')

let currentActive = 1

next.addEventListener('click', () => {
    currentActive++

    if(currentActive > circles.length) {
        currentActive = circles.length
    }

    update()
})

prev.addEventListener('click', () => {
    currentActive--

    if(currentActive < 1) {
        currentActive = 1
    }

    update()
})

function update() {
    circles.forEach((circle, idx) => {
        if(idx < currentActive) {
            circle.classList.add('active')
        } else {
            circle.classList.remove('active')
        }
    })

    const actives = document.querySelectorAll('.active')

    progress.style.width = (actives.length - 1) / (circles.length - 1) * 100 + '%'

    if(currentActive === 1) {
        prev.disabled = true
    } else if(currentActive === circles.length) {
        next.disabled = true
    } else {
        prev.disabled = false
        next.disabled = false
    }
}
```

## 6. Recap & Next Steps

**What you learned**

- Storing UI **state** in a single variable (`currentActive`) and clamping it to valid bounds.
- Rendering the UI from that state in one `update()` function — a mini version of how bigger frameworks work.
- Toggling classes with `classList` and letting CSS `transition`s handle the animation.
- Drawing decorative elements with `::before` and layering with `z-index`.
- Computing a percentage width from counts and syncing button `disabled` states.

**Enhancement challenges**

1. **Add more steps.** Add a 5th circle and confirm the width math still works with no JS changes (that's the payoff of the `circles.length` formula).
2. **Add a "Reset" button** that sets `currentActive = 1` and calls `update()`.
3. **Persist progress** with `localStorage` so the current step survives a page refresh.
4. **Add step labels** (e.g. "Cart", "Shipping", "Payment", "Confirm") under each circle.
5. **Keyboard support:** let the left/right arrow keys trigger Prev/Next.
