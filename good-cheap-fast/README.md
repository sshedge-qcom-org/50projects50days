# Good Cheap Fast

## 1. Project Overview

This project builds the classic **"Good, Cheap, Fast — pick two"** toggle widget: three custom on/off switches where, the moment all three are turned on, one of them automatically flips back off so you can never have all three at once.

**Key concepts involved:**

- Building a custom toggle switch from a hidden checkbox + a styled `<label>` (no images, no JavaScript needed for the look).
- The CSS **adjacent sibling selector** (`+`) to react to a checkbox's state.
- **CSS keyframe animations** to slide the toggle "ball" on and off.
- DOM selection, **event listeners**, and reading/writing the `.checked` property in JavaScript.

**HTML skills you'll gain:**

- Associating a `<label>` with an `<input>` using the `for`/`id` pair.
- Structuring a repeatable component (three identical toggle blocks).

**CSS skills you'll gain:**

- Centering a page with Flexbox.
- Hiding a real form control while keeping it functional.
- Styling based on state with `:checked` and the `+` sibling combinator.
- Writing `@keyframes` and using `animation-fill-mode: forwards`.

**JavaScript skills you'll gain:**

- Selecting many elements with `querySelectorAll` and looping with `forEach`.
- Listening for the `change` event on checkboxes.
- Using `e.target` to know *which* element fired the event.
- Reading and setting the boolean `.checked` property to enforce rules.

---

## 2. Final Project Preview

**Layout & colors:** A clean white page with the heading *"How do you want your project to be?"* centered near the top. Below it sit three rows, each with a pill-shaped toggle switch on the left and a label (**Good**, **Cheap**, **Fast**) to its right. An "off" toggle is grey with a white ball on the left; an "on" toggle is purple (`#8e44ad`) with the ball slid to the right. Everything is centered vertically and horizontally.

**Behavior & interactions:**

- Clicking a toggle switches it on or off, and the white ball smoothly slides across with a slight "grow" bounce in the middle.
- You can freely have zero, one, or two toggles on.
- The rule: **you can never have all three on at once.** The instant you turn on the third one, one of the other two silently turns itself off.

**What you can interact with:**

- The three toggle switches (Good, Cheap, Fast). That's it — the interaction is entirely about the relationship between them.

---

## 3. Prerequisites

**Basic knowledge required:**

- HTML tags and attributes.
- CSS selectors and properties.
- JavaScript variables, functions, and `if` statements.

**Tools needed:**

- A modern web browser (Chrome, Firefox, Edge…).
- A text editor (VS Code recommended).
- *Optional:* the **Live Server** VS Code extension for auto-reload.

**Files to create:**

```
good-cheap-fast/
├── index.html
├── style.css
└── script.js
```

Create these three empty files, then follow along.

---

## 4. Build the Project Step-by-Step

### Step 1: Set Up the HTML Document

**🎯 Goal**
Create the page skeleton and connect our (currently empty) stylesheet and script so the browser knows about all three files from the start.

**💡 Concept**
Every HTML page needs a `<!DOCTYPE>`, a `<head>` for metadata, and a `<body>` for visible content. We link the CSS in the `<head>` and the JS just before the closing `</body>` so the HTML exists before the script runs.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Good, Cheap, Fast</title>
  </head>
  <body>
    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**

- `<meta charset>` and `<meta name="viewport">` are standard tags for text encoding and mobile scaling.
- `<link rel="stylesheet" href="style.css" />` pulls in our styles.
- `<script src="script.js">` sits at the **bottom** of the body so that when it runs, all the HTML elements it needs already exist.

**✅ Checkpoint**
Open `index.html` in your browser. You'll see a blank page with the tab titled "Good, Cheap, Fast". No errors — perfect.

---

### Step 2: Add the Heading

**🎯 Goal**
Give the user the question the whole widget answers.

**💡 Concept**
A single heading element provides context. We use `<h2>` to match the source (it's a sub-heading style, slightly smaller than `<h1>`).

**📝 Code**

```html
<!-- goes in index.html, inside <body>, above the <script> -->
<h2>How do you want your project to be?</h2>
```

**🔍 Explanation**
Plain heading text. Placed as the first child of `<body>` so it appears at the top of our centered column.

**✅ Checkpoint**
Reload — you should see the bold question on the page.

---

### Step 3: Build One Toggle Switch

**🎯 Goal**
Create the reusable building block: a single toggle made of a checkbox, a label, a "ball", and a text caption.

**💡 Concept**
This is the key trick of the whole project. A native checkbox is hard to style, so we **hide it** (later, in CSS) and style its `<label>` instead. Because the label's `for` attribute matches the checkbox's `id`, clicking the label toggles the hidden checkbox. The `.ball` div is the sliding knob.

**📝 Code**

```html
<!-- goes in index.html, right after the <h2> -->
<div class="toggle-container">
  <input type="checkbox" id="good" class="toggle">
  <label for="good" class="label">
    <div class="ball"></div>
  </label>
  <span>Good</span>
</div>
```

**🔍 Explanation**

- `<input type="checkbox" id="good" class="toggle">` — the real control. Its `id="good"` is the link target.
- `<label for="good">` — clicking anywhere on this label toggles the `#good` checkbox. This is why we can hide the checkbox itself and still have a working switch.
- `<div class="ball">` — the knob that will slide left/right.
- `<span>Good</span>` — the caption.

**✅ Checkpoint**
You'll see a default checkbox, an empty label box, and the word "Good". It looks rough now — styling comes later. Clicking the "Good" text should tick/untick the checkbox (proof the `for`/`id` link works).

---

### Step 4: Add the Other Two Toggles

**🎯 Goal**
Duplicate the toggle for **Cheap** and **Fast** so we have all three switches.

**💡 Concept**
The widget needs three identical components that differ only in their `id`, `for`, and caption text. Reusing the same structure keeps the CSS and JS simple.

**📝 Code**

```html
<!-- goes in index.html, right after the "Good" toggle-container -->
<div class="toggle-container">
  <input type="checkbox" id="cheap" class="toggle">
  <label for="cheap" class="label">
    <div class="ball"></div>
  </label>
  <span>Cheap</span>
</div>

<div class="toggle-container">
  <input type="checkbox" id="fast" class="toggle">
  <label for="fast" class="label">
    <div class="ball"></div>
  </label>
  <span>Fast</span>
</div>
```

**🔍 Explanation**
Same pattern as Step 3. Note how each `id` (`cheap`, `fast`) is unique and each `<label for="...">` points to its own checkbox. Unique IDs are essential — the `for`/`id` link would break if two elements shared an id.

**✅ Checkpoint**
Three rows now appear: Good, Cheap, Fast. Your HTML is complete. Time to make it look like real toggle switches.

---

### Step 5: Import a Font and Reset Box-Sizing

**🎯 Goal**
Load a nice font and make width/height math predictable across every element.

**💡 Concept**
`box-sizing: border-box` makes an element's declared `width`/`height` *include* its padding and border, so sizes behave the way you'd intuitively expect. The `*` selector applies it to everything.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}
```

**🔍 Explanation**

- `@import url(...)` fetches the Roboto font from Google Fonts. It must be the very first line of the CSS file.
- `* { box-sizing: border-box; }` — the universal reset that keeps our 80px-wide toggle exactly 80px wide even after we add borders/padding.

**✅ Checkpoint**
Nothing visually dramatic yet, but the page font will change once we apply Roboto to the body in the next step.

---

### Step 6: Center Everything on the Page

**🎯 Goal**
Stack the heading and toggles in a centered column that fills the screen.

**💡 Concept**
Flexbox makes centering easy. `flex-direction: column` stacks children vertically; `align-items` + `justify-content` center them on both axes. `height: 100vh` makes the body as tall as the viewport so "center" means the middle of the screen.

**📝 Code**

```css
/* goes in style.css */
body {
  font-family: 'Roboto', sans-serif;
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

- `display: flex` + `flex-direction: column` — children (heading, three toggles) stack top-to-bottom.
- `align-items: center` centers them horizontally; `justify-content: center` centers the whole stack vertically.
- `height: 100vh` — `vh` = viewport height, so `100vh` is the full window height.
- `overflow: hidden` prevents scrollbars from the sliding animation.
- `margin: 0` removes the browser's default body margin.

**✅ Checkpoint**
The heading and three toggle rows are now centered in the middle of the screen and use the Roboto font.

---

### Step 7: Lay Out Each Toggle Row

**🎯 Goal**
Put the switch and its caption side by side, neatly aligned.

**💡 Concept**
Each `.toggle-container` is itself a flex row. A fixed `width` keeps all three rows the same length so the captions line up.

**📝 Code**

```css
/* goes in style.css */
.toggle-container {
  display: flex;
  align-items: center;
  margin: 10px 0;
  width: 200px;
}
```

**🔍 Explanation**

- `display: flex` + `align-items: center` vertically centers the switch with its caption.
- `margin: 10px 0` adds breathing room above and below each row.
- `width: 200px` gives every row the same width.

**✅ Checkpoint**
The checkbox, label, and caption now sit on one tidy horizontal line with consistent spacing.

---

### Step 8: Hide the Real Checkbox

**🎯 Goal**
Make the default checkbox disappear so only our custom switch shows.

**💡 Concept**
We use `visibility: hidden` rather than `display: none`. With `visibility: hidden`, the checkbox is invisible but **still occupies its space and stays functional** — clicking its label still toggles it, and CSS can still react to `:checked`.

**📝 Code**

```css
/* goes in style.css */
.toggle {
  visibility: hidden;
}
```

**🔍 Explanation**
The ugly native checkbox vanishes. Because it still exists in the layout and DOM, our upcoming `.toggle:checked + .label` rule will keep working.

**✅ Checkpoint**
The little square checkbox is gone. You should now see the empty label box, the ball, and the caption.

---

### Step 9: Style the Switch Track

**🎯 Goal**
Turn the plain `<label>` into a grey, pill-shaped switch track.

**💡 Concept**
`position: relative` on the label creates a *positioning context* so the ball (which we'll position `absolute`ly) is placed relative to this track. A large `border-radius` makes the pill shape.

**📝 Code**

```css
/* goes in style.css */
.label {
  position: relative;
  background-color: #d0d0d0;
  border-radius: 50px;
  cursor: pointer;
  display: inline-block;
  margin: 0 15px 0;
  width: 80px;
  height: 40px;
}
```

**🔍 Explanation**

- `position: relative` — anchors the absolutely-positioned ball inside this label.
- `background-color: #d0d0d0` — the grey "off" color.
- `border-radius: 50px` — rounds the ends into a pill.
- `cursor: pointer` — hints it's clickable.
- `width: 80px; height: 40px` — the track size.
- `margin: 0 15px 0` — horizontal gap from the caption.

**✅ Checkpoint**
Each switch is now a grey rounded pill. It doesn't change color when clicked yet — next step.

---

### Step 10: Color the Track When Checked

**🎯 Goal**
Turn the track purple when its toggle is on.

**💡 Concept**
This introduces the **adjacent sibling selector** `+`. `.toggle:checked + .label` means: "select the `.label` that comes *immediately after* a `.toggle` that is checked." Since our HTML places the label right after the checkbox, CSS alone can restyle the switch based on its state — no JavaScript needed for the color change.

**📝 Code**

```css
/* goes in style.css */
.toggle:checked + .label {
  background-color: #8e44ad;
}
```

**🔍 Explanation**

- `:checked` is a pseudo-class that matches only when the checkbox is ticked.
- `+ .label` walks to the very next sibling element and styles it.
- Result: checking the box paints its track purple.

**✅ Checkpoint**
Click a switch (or its caption): the pill turns purple. Click again: back to grey.

---

### Step 11: Add the Sliding Ball

**🎯 Goal**
Place the white knob at the left edge of the track.

**💡 Concept**
`position: absolute` with `top`/`left` pins the ball precisely inside the (relatively positioned) track. We also attach a default animation so the ball has a defined "resting off" position.

**📝 Code**

```css
/* goes in style.css */
.ball {
  background: #fff;
  height: 34px;
  width: 34px;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
  align-items: center;
  justify-content: center;
  animation: slideOff 0.3s linear forwards;
}
```

**🔍 Explanation**

- `border-radius: 50%` makes the 34×34 square a circle.
- `position: absolute; top: 3px; left: 3px` places it 3px in from the track's top-left corner, so it sits centered within the 40px-tall track.
- `animation: slideOff 0.3s linear forwards` — runs a `slideOff` animation (defined in Step 13). `forwards` means the element **keeps the animation's final state** after it ends, so the ball stays put instead of snapping back.

**✅ Checkpoint**
A white circle now sits at the left of each track. (You may see a console-free page; the animation names aren't defined yet, so the ball just sits still — we add the keyframes shortly.)

---

### Step 12: Animate the Ball When Checked

**🎯 Goal**
Slide the ball to the right side when the toggle is on.

**💡 Concept**
We combine the sibling selector with a descendant selector: `.toggle:checked + .label .ball` targets the ball *inside* the label of a checked toggle, and swaps its animation to `slideOn`.

**📝 Code**

```css
/* goes in style.css */
.toggle:checked + .label .ball {
  animation: slideOn 0.3s linear forwards;
}
```

**🔍 Explanation**
When the checkbox is checked, this more specific rule wins over the default `slideOff`, so the ball plays the `slideOn` animation (moving right). When unchecked, it reverts to `slideOff` (moving left).

**✅ Checkpoint**
Still no movement — we haven't written the keyframes. Let's fix that next.

---

### Step 13: Define the Slide Animations

**🎯 Goal**
Describe *how* the ball moves for both `slideOn` (off→on) and `slideOff` (on→off).

**💡 Concept**
`@keyframes` define the steps of an animation. We move the ball horizontally with `translateX` and add a subtle `scale(1.2)` bump at the midpoint so the knob "grows" as it crosses — a small touch that makes it feel physical.

**📝 Code**

```css
/* goes in style.css */
@keyframes slideOn {
  0% {
    transform: translateX(0) scale(1);
  }
  50% {
    transform: translateX(20px) scale(1.2);
  }
  100% {
    transform: translateX(40px) scale(1);
  }
}

@keyframes slideOff {
  0% {
    transform: translateX(40px) scale(1);
  }
  50% {
    transform: translateX(20px) scale(1.2);
  }
  100% {
    transform: translateX(0) scale(1);
  }
}
```

**🔍 Explanation**

- `slideOn`: starts at the left (`translateX(0)`), grows and passes the middle at `20px`, and lands `40px` to the right.
- `slideOff`: the exact reverse — from `40px` back to `0`.
- The `scale(1.2)` at `50%` is the mid-slide "pop". Because both animations use `forwards`, the ball holds its final position.

**✅ Checkpoint**
Now click a toggle: the pill turns purple **and** the ball smoothly slides right with a little grow. Toggle off: it slides back. The switches are fully functional visually. Now for the "pick two" rule.

---

### Step 14: Grab the Toggles in JavaScript

**🎯 Goal**
Get references to all the switches so we can watch and control them.

**💡 Concept**
`querySelectorAll` returns *all* matching elements (a NodeList); `querySelector` returns the *first* match. We grab the whole group by class, plus each individual switch by its unique `id`.

**📝 Code**

```javascript
// goes in script.js
const toggles = document.querySelectorAll('.toggle')
const good = document.querySelector('#good')
const cheap = document.querySelector('#cheap')
const fast = document.querySelector('#fast')
```

**🔍 Explanation**

- `toggles` — a NodeList of all three checkboxes; we'll loop over this to attach listeners.
- `good`, `cheap`, `fast` — direct handles to each specific checkbox so our rule can check and change them by name. (`#` selects by `id`.)

**✅ Checkpoint**
No visible change. Open the browser console (F12) and type `good.checked` — it prints `true`/`false` depending on the switch state. That confirms the references work.

---

### Step 15: Listen for Changes

**🎯 Goal**
Run our rule every time any switch is flipped.

**💡 Concept**
The `change` event fires when a checkbox's checked state changes. We loop over every toggle with `forEach` and attach a listener. Inside, `e.target` is the exact element the user just toggled — we pass it to a helper function.

**📝 Code**

```javascript
// goes in script.js
toggles.forEach(toggle => toggle.addEventListener('change', (e) => doTheTrick(e.target)))
```

**🔍 Explanation**

- `toggles.forEach(...)` runs the arrow function once per checkbox.
- `toggle.addEventListener('change', ...)` wires each one up.
- `(e) => doTheTrick(e.target)` — when a change happens, call `doTheTrick`, handing it `e.target` (the switch that changed). We'll define `doTheTrick` next.

**✅ Checkpoint**
The page won't work yet (the function doesn't exist, so flipping a switch logs a `ReferenceError` in the console). That's expected — we build the function in Step 16.

---

### Step 16: Enforce the "Pick Two" Rule

**🎯 Goal**
When all three are on, turn one off automatically so only two can ever be active.

**💡 Concept**
We only act when *all three* are checked. At that point, whichever switch the user just clicked stays on, and we switch off a specific *other* one in a fixed cycle. Setting `.checked = false` in JavaScript both unchecks the box and (thanks to our CSS) slides its ball back.

**📝 Code**

```javascript
// goes in script.js
function doTheTrick(theClickedOne) {
    if(good.checked && cheap.checked && fast.checked) {
        if(good === theClickedOne) {
            fast.checked = false
        }

        if(cheap === theClickedOne) {
            good.checked = false
        }

        if(fast === theClickedOne) {
            cheap.checked = false
        }
    }
}
```

**🔍 Explanation**

- The outer `if` guard means the logic *only* triggers at the moment the third switch turns on. Turning switches off, or having one/two on, does nothing special.
- `good === theClickedOne` compares element references — it's true only if the user just clicked the **Good** switch.
- The cycle: click **Good** → turn off **Fast**; click **Cheap** → turn off **Good**; click **Fast** → turn off **Cheap**. Each choice removes a different partner, so you're always left with exactly two on.
- `fast.checked = false` (etc.) updates the checkbox; the CSS `:checked` rules do the rest, sliding the ball back and greying the track.

**✅ Checkpoint**
Turn on all three switches one by one. The moment the third flips on, one of the others slides off automatically. Try clicking them in different orders to see the cycle in action. The project is complete!

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
    <title>Good, Cheap, Fast</title>
  </head>
  <body>
    <h2>How do you want your project to be?</h2>
    <div class="toggle-container">
      <input type="checkbox" id="good" class="toggle">
      <label for="good" class="label">
        <div class="ball"></div>
      </label>
      <span>Good</span>
    </div>

    <div class="toggle-container">
      <input type="checkbox" id="cheap" class="toggle">
      <label for="cheap" class="label">
        <div class="ball"></div>
      </label>
      <span>Cheap</span>
    </div>

    <div class="toggle-container">
      <input type="checkbox" id="fast" class="toggle">
      <label for="fast" class="label">
        <div class="ball"></div>
      </label>
      <span>Fast</span>
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
}

.toggle-container {
  display: flex;
  align-items: center;
  margin: 10px 0;
  width: 200px;
}

.toggle {
  visibility: hidden;
}

.label {
  position: relative;
  background-color: #d0d0d0;
  border-radius: 50px;
  cursor: pointer;
  display: inline-block;
  margin: 0 15px 0;
  width: 80px;
  height: 40px;
}

.toggle:checked + .label {
  background-color: #8e44ad;
}

.ball {
  background: #fff;
  height: 34px;
  width: 34px;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
  align-items: center;
  justify-content: center;
  animation: slideOff 0.3s linear forwards;
}

.toggle:checked + .label .ball {
  animation: slideOn 0.3s linear forwards;
}

@keyframes slideOn {
  0% {
    transform: translateX(0) scale(1);
  }
  50% {
    transform: translateX(20px) scale(1.2);
  }
  100% {
    transform: translateX(40px) scale(1);
  }
}

@keyframes slideOff {
  0% {
    transform: translateX(40px) scale(1);
  }
  50% {
    transform: translateX(20px) scale(1.2);
  }
  100% {
    transform: translateX(0) scale(1);
  }
}
```

### `script.js`

```javascript
const toggles = document.querySelectorAll('.toggle')
const good = document.querySelector('#good')
const cheap = document.querySelector('#cheap')
const fast = document.querySelector('#fast')

toggles.forEach(toggle => toggle.addEventListener('change', (e) => doTheTrick(e.target)))

function doTheTrick(theClickedOne) {
    if(good.checked && cheap.checked && fast.checked) {
        if(good === theClickedOne) {
            fast.checked = false
        }

        if(cheap === theClickedOne) {
            good.checked = false
        }

        if(fast === theClickedOne) {
            cheap.checked = false
        }
    }
}
```

---

## 6. Recap & Next Steps

**What you learned:**

- The hidden-checkbox + styled-label pattern for building custom toggle switches with no images.
- The CSS adjacent sibling selector (`+`) and `:checked` pseudo-class to style based on state — pure CSS reactivity.
- Writing `@keyframes` and using `animation-fill-mode: forwards` so an element holds its end state.
- Selecting elements, looping with `forEach`, listening for `change`, using `e.target`, and driving CSS by setting `.checked` from JavaScript.

**Enhancement challenges:**

1. **Add a status line** that reads "You chose: Good & Cheap" and updates whenever the selection changes.
2. **Disable instead of uncheck** — grey out and lock the third option before it can be turned on, rather than silently unchecking a partner.
3. **Make it keyboard-friendly** by ensuring the toggles are focusable and show a visible focus outline.
4. **Persist the choice** with `localStorage` so the selected two are restored on reload.
5. **Generalize the widget** into an N-of-M picker (e.g., "pick any 2 of 5 features") driven by a small config array.
