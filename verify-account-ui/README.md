# Verify Account Ui

## 1. Project Overview

This project builds a **six-digit verification code UI** — the kind of screen apps show after emailing you a confirmation code. Six large single-digit boxes auto-advance as you type and step backward when you delete, and each filled box turns blue.

**Key concepts involved**
- Selecting a group of elements and working with them by index
- Handling the `keydown` keyboard event and inspecting `e.key`
- Programmatically moving focus between inputs
- Styling number inputs (hiding spinners and the caret) and using the CSS `:valid` state
- A subtle timing trick with `setTimeout`

**HTML skills you'll gain**
- Building a labeled UI with a row of constrained number inputs
- Using input attributes: `type="number"`, `min`, `max`, `placeholder`, `required`

**CSS skills you'll gain**
- Centering a card in the viewport with Flexbox
- Removing native number-input spinner arrows (WebKit + Firefox)
- Hiding the text caret and styling the `:valid` state
- A simple responsive tweak with a media query

**JavaScript skills you'll gain**
- Selecting a NodeList with `querySelectorAll` and iterating with `forEach` + index
- Handling `keydown` and branching on `e.key`
- Setting `.value` and calling `.focus()` to control the form
- Using `setTimeout` to defer focus until after the keystroke is processed

---

## 2. Final Project Preview

**Layout & colors**
- A near-white page, centered, holding a **white card with a bold black border** and rounded corners.
- Inside: a heading ("Verify Your Account"), a short explanatory paragraph, a row of **six large square inputs**, and a small gray info note at the bottom.
- Each input shows a big, light "0" placeholder. When a box holds a valid digit, its border turns **blue** with a soft shadow.

**Behavior & interactions**
- On load, the **first** box is focused, ready for input.
- Typing a digit (0–9) places it in the current box and jumps focus to the **next** box.
- Pressing **Backspace** jumps focus to the **previous** box.
- The text caret is hidden and the number spinner arrows are removed for a clean, app-like feel.
- On narrow screens the boxes shrink and wrap to fit.

**What the user can interact with**
- The six code inputs, navigated automatically as you type digits or press Backspace.

---

## 3. Prerequisites

**Basic knowledge required**
- HTML forms and input attributes.
- Basic CSS (Flexbox and pseudo-classes help).
- JavaScript basics: variables, functions, arrays/node lists, and events.

**Tools needed**
- A modern browser.
- A text editor (VS Code recommended).
- An internet connection (for the web font).
- Optional: the **Live Server** extension.

**Files to create**

```
verify-account-ui/
├── index.html
├── style.css
└── script.js
```

Create the three empty files now.

---

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML skeleton

**🎯 Goal**
Start with a valid, empty HTML5 page titled "Verify Account".

**💡 Concept**
The usual boilerplate sets encoding and responsive scaling before content loads.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Account</title>
  </head>
  <body></body>
</html>
```

**🔍 Explanation**
- Standard HTML5 document setup with the correct tab title.

**✅ Checkpoint**
Blank page, correct tab title, no errors.

---

### Step 2: Link the stylesheet and script

**🎯 Goal**
Connect our (empty) CSS and JS files.

**💡 Concept**
CSS loads in the `<head>`; the script goes at the end of `<body>` so the inputs exist before JavaScript runs.

**📝 Code**

```html
<!-- goes in index.html: inside <head>, after the viewport meta -->
<link rel="stylesheet" href="style.css" />
```

```html
<!-- goes in index.html: just before the closing </body> tag -->
<script src="script.js"></script>
```

**🔍 Explanation**
- The `<link>` loads our styles.
- The bottom `<script>` guarantees the DOM (including all six inputs) exists when the script executes — so `querySelectorAll` finds them.

**✅ Checkpoint**
Still blank, no 404s in DevTools → Network.

---

### Step 3: Add the card, heading, and paragraph

**🎯 Goal**
Create the outer card with its title and instructions.

**💡 Concept**
A single `.container` element groups everything so we can style it as one card and center it.

**📝 Code**

```html
<!-- goes in index.html: inside <body> -->
<div class="container">
  <h2>Verify Your Account</h2>
  <p>We emailed you the six digit code to cool_guy@email.com <br/> Enter the code below to confirm your email address.</p>
</div>
```

**🔍 Explanation**
- `.container` is the card wrapper.
- The `<h2>` is the title; the `<p>` explains the flow. The `<br/>` forces a line break in the middle of the sentence.

**✅ Checkpoint**
You'll see the heading and paragraph in the top-left, unstyled.

---

### Step 4: Add the six code inputs

**🎯 Goal**
Add the row of six single-digit number inputs.

**💡 Concept**
Using `type="number"` with `min="0" max="9"` and `required` means a box is only "valid" when it holds a single digit — which we'll style later with `:valid`. The shared `code` class lets JavaScript grab all six at once.

**📝 Code**

```html
<!-- goes in index.html: inside .container, after the paragraph -->
<div class="code-container">
  <input type="number" class="code" placeholder="0" min="0" max="9" required>
  <input type="number" class="code" placeholder="0" min="0" max="9" required>
  <input type="number" class="code" placeholder="0" min="0" max="9" required>
  <input type="number" class="code" placeholder="0" min="0" max="9" required>
  <input type="number" class="code" placeholder="0" min="0" max="9" required>
  <input type="number" class="code" placeholder="0" min="0" max="9" required>
</div>
```

**🔍 Explanation**
- `.code-container` is the flex row holding the boxes.
- Each `<input class="code">` is one digit box. `placeholder="0"` shows a faint 0; `min`/`max` constrain the value to 0–9; `required` makes an empty box count as invalid (used by `:valid`).

**✅ Checkpoint**
Six small number inputs appear in a row (with default browser styling and spinner arrows). We'll restyle them soon.

---

### Step 5: Add the info note

**🎯 Goal**
Add the small disclaimer beneath the inputs.

**💡 Concept**
A `<small>` with a class is a simple way to add secondary, styled text.

**📝 Code**

```html
<!-- goes in index.html: inside .container, after the code-container -->
<small class="info">
  This is design only. We didn't actually send you an email as we don't have your email, right?
</small>
```

**🔍 Explanation**
- The `.info` element is a friendly note clarifying this is a design demo.

**✅ Checkpoint**
The disclaimer text appears below the inputs. The HTML is complete — now we style it.

---

### Step 6: Import the font, reset, and center the page

**🎯 Goal**
Load the Muli font and center the card in the viewport.

**💡 Concept**
`@import` fetches the font; a full-height flex `body` centers the single card. `overflow: hidden` prevents scrollbars from the shadow/border effects.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css?family=Muli:300,700&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #fbfcfe;
  font-family: 'Muli', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}
```

**🔍 Explanation**
- The `@import` (first line) downloads Muli in weights 300 and 700.
- `*` sets `border-box` sizing.
- The `body` uses a soft off-white background, the Muli font, and Flexbox centering. `height: 100vh` fills the viewport for true vertical centering; `overflow: hidden` and `margin: 0` keep things clean.

**✅ Checkpoint**
The content is now centered on the page in the Muli font.

---

### Step 7: Style the card

**🎯 Goal**
Give the container its white background, bold black border, rounding, and padding.

**💡 Concept**
A thick contrasting border plus rounded corners creates the crisp, modern card look.

**📝 Code**

```css
/* goes in style.css */
.container {
  background-color: #fff;
  border: 3px #000 solid;
  border-radius: 10px;
  padding: 30px;
  max-width: 1000px;
  text-align: center;
}
```

**🔍 Explanation**
- White background with a `3px` solid black border and `10px` rounded corners.
- `padding: 30px` gives interior space; `max-width: 1000px` caps the width; `text-align: center` centers the heading, paragraph, and inputs.

**✅ Checkpoint**
The heading, paragraph, inputs, and note now sit inside a centered white card with a bold black outline.

---

### Step 8: Lay out and size the digit boxes

**🎯 Goal**
Turn the inputs into large, centered digit boxes and hide the text caret.

**💡 Concept**
Big font size plus fixed width/height makes each box feel like a "digit slot." `caret-color: transparent` hides the blinking cursor so focus feels like selecting a slot rather than editing text.

**📝 Code**

```css
/* goes in style.css */
.code-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0;
}

.code {
  caret-color: transparent;
  border-radius: 5px;
  font-size: 75px;
  height: 120px;
  width: 100px;
  border: 1px solid #eee;
  margin: 1%;
  text-align: center;
  font-weight: 300;
  -moz-appearance: textfield;
}
```

**🔍 Explanation**
- `.code-container` is a centered flex row with vertical margin.
- `.code` boxes are large (`120px` tall, `100px` wide) with a huge centered `75px` digit.
- `caret-color: transparent` hides the text cursor.
- `border: 1px solid #eee` is the default light border (we'll change it for valid boxes next).
- `-moz-appearance: textfield` starts removing Firefox's number spinner arrows.

**✅ Checkpoint**
The six boxes are now big, centered digit slots with light borders. Firefox no longer shows spinner arrows (Chrome/Edge still do — fixed next).

---

### Step 9: Remove spinners and style the valid state

**🎯 Goal**
Hide the remaining spinner arrows in WebKit browsers and turn valid boxes blue.

**💡 Concept**
`::-webkit-*-spin-button` targets the arrow controls Chrome/Safari/Edge add to number inputs. The `:valid` pseudo-class matches an input whose value satisfies its constraints (here, a single digit 0–9) — perfect for showing "this box is filled correctly."

**📝 Code**

```css
/* goes in style.css */
.code::-webkit-outer-spin-button,
.code::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.code:valid {
  border-color: #3498db;
  box-shadow: 0 10px 10px -5px rgba(0, 0, 0, 0.25);
}
```

**🔍 Explanation**
- The two `::-webkit-*-spin-button` rules with `-webkit-appearance: none` remove the up/down arrows in WebKit-based browsers.
- `.code:valid` fires when a box holds a valid digit: its border turns blue (`#3498db`) and it gains a soft drop shadow. Empty boxes are invalid (due to `required`), so they stay gray.

**✅ Checkpoint**
No arrows on any browser now. Type a digit into a box (click it first): its border turns blue with a shadow.

---

### Step 10: Style the info note and add responsiveness

**🎯 Goal**
Style the disclaimer and make the boxes adapt on small screens.

**💡 Concept**
A media query lets the layout respond to viewport width: below 600px the boxes wrap and shrink so six of them still fit.

**📝 Code**

```css
/* goes in style.css */
.info {
  background-color: #eaeaea;
  display: inline-block;
  padding: 10px;
  line-height: 20px;
  max-width: 400px;
  color: #777;
  border-radius: 5px;
}

@media (max-width: 600px) {
  .code-container {
    flex-wrap: wrap;
  }

  .code {
    font-size: 60px;
    height: 80px;
    max-width: 70px;
  }
}
```

**🔍 Explanation**
- `.info` becomes a gray, rounded, inline-block note with muted text and a capped width.
- The `@media (max-width: 600px)` block only applies on narrow screens: `flex-wrap: wrap` lets boxes flow onto multiple lines, and the smaller `.code` sizing keeps them from overflowing.

**✅ Checkpoint**
The disclaimer now looks like a gray pill. Resize the window narrow (or use DevTools device mode): the boxes shrink and wrap. The UI is visually complete — time to make it interactive.

---

### Step 11: Select the inputs and focus the first one

**🎯 Goal**
Grab all six boxes and put the cursor in the first one on load.

**💡 Concept**
`querySelectorAll('.code')` returns all six inputs as an indexed NodeList. Calling `.focus()` on the first one means the user can start typing immediately.

**📝 Code**

```js
// goes in script.js
const codes = document.querySelectorAll('.code')

codes[0].focus()
```

**🔍 Explanation**
- `codes` is the list of the six `.code` inputs, in order.
- `codes[0].focus()` focuses the first box as soon as the script runs.

**✅ Checkpoint**
Reload the page: the first box is focused (its outline/highlight shows). No errors.

---

### Step 12: Auto-advance on digits, step back on Backspace

**🎯 Goal**
Move focus forward when a digit is typed and backward when Backspace is pressed — one digit per box.

**💡 Concept**
`keydown` fires *before* the character is inserted. By clearing the box's value in the handler and letting the default keypress then insert the new digit, each box ends up holding exactly one digit. We move focus inside a `setTimeout` so it happens *after* the browser finishes inserting the character.

**📝 Code**

```js
// goes in script.js
codes.forEach((code, idx) => {
    code.addEventListener('keydown', (e) => {
        if(e.key >= 0 && e.key <=9) {
            codes[idx].value = ''
            setTimeout(() => codes[idx + 1].focus(), 10)
        } else if(e.key === 'Backspace') {
            setTimeout(() => codes[idx - 1].focus(), 10)
        }
    })
})
```

**🔍 Explanation**
- `forEach((code, idx) => ...)` attaches a `keydown` listener to each box, remembering its position `idx`.
- `e.key` is the pressed key as a string. `e.key >= 0 && e.key <= 9` coerces it to a number to check for a digit (`'5'` passes; `'Backspace'` becomes `NaN` and fails).
- On a digit: `codes[idx].value = ''` clears the box first, then the browser's default action inserts the typed digit — so the box holds just that one digit. `setTimeout(..., 10)` then moves focus to the next box (`idx + 1`) after the insert completes.
- On **Backspace**: focus jumps back to the previous box (`idx - 1`).
- **Gotcha to be aware of:** on the *last* box a digit tries to focus `codes[6]` (undefined), and Backspace on the *first* box tries `codes[-1]` — both throw a harmless error in the console because there's no next/previous box. See the challenges for a clean fix. (Also, because of the loose numeric check, the space bar coerces to `0` and is treated like a digit.)

**✅ Checkpoint**
Reload and type digits: each one fills a box and focus jumps to the next. Press Backspace to step back. Filled boxes turn blue. 🎉

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
    <title>Verify Account</title>
  </head>
  <body>
    <div class="container">
      <h2>Verify Your Account</h2>
      <p>We emailed you the six digit code to cool_guy@email.com <br/> Enter the code below to confirm your email address.</p>
      <div class="code-container">
        <input type="number" class="code" placeholder="0" min="0" max="9" required>
        <input type="number" class="code" placeholder="0" min="0" max="9" required>
        <input type="number" class="code" placeholder="0" min="0" max="9" required>
        <input type="number" class="code" placeholder="0" min="0" max="9" required>
        <input type="number" class="code" placeholder="0" min="0" max="9" required>
        <input type="number" class="code" placeholder="0" min="0" max="9" required>
      </div>
      <small class="info">
        This is design only. We didn't actually send you an email as we don't have your email, right?
      </small>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

### `style.css`

```css
@import url('https://fonts.googleapis.com/css?family=Muli:300,700&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #fbfcfe;
  font-family: 'Muli', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.container {
  background-color: #fff;
  border: 3px #000 solid;
  border-radius: 10px;
  padding: 30px;
  max-width: 1000px;
  text-align: center;
}

.code-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0;
}

.code {
  caret-color: transparent;
  border-radius: 5px;
  font-size: 75px;
  height: 120px;
  width: 100px;
  border: 1px solid #eee;
  margin: 1%;
  text-align: center;
  font-weight: 300;
  -moz-appearance: textfield;
}

.code::-webkit-outer-spin-button,
.code::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.code:valid {
  border-color: #3498db;
  box-shadow: 0 10px 10px -5px rgba(0, 0, 0, 0.25);
}

.info {
  background-color: #eaeaea;
  display: inline-block;
  padding: 10px;
  line-height: 20px;
  max-width: 400px;
  color: #777;
  border-radius: 5px;
}

@media (max-width: 600px) {
  .code-container {
    flex-wrap: wrap;
  }

  .code {
    font-size: 60px;
    height: 80px;
    max-width: 70px;
  }
}
```

### `script.js`

```js
const codes = document.querySelectorAll('.code')

codes[0].focus()

codes.forEach((code, idx) => {
    code.addEventListener('keydown', (e) => {
        if(e.key >= 0 && e.key <=9) {
            codes[idx].value = ''
            setTimeout(() => codes[idx + 1].focus(), 10)
        } else if(e.key === 'Backspace') {
            setTimeout(() => codes[idx - 1].focus(), 10)
        }
    })
})
```

---

## 6. Recap & Next Steps

**What you learned**
- Selecting a group of elements with `querySelectorAll` and driving them by index.
- The difference between `keydown` (fires before the value updates) and why clearing `.value` then letting the default insert enforces one digit per box.
- Moving focus programmatically with `.focus()`, deferred via `setTimeout` so it runs after the keystroke.
- Styling number inputs: hiding spinner arrows (WebKit + Firefox) and the caret, and reacting to the `:valid` state.
- A basic responsive media query.

**Enhancement challenges**
1. **Guard the edges:** Prevent the console errors by checking `if (codes[idx + 1])` / `if (codes[idx - 1])` before focusing.
2. **Tighten the digit check:** Use a stricter test (e.g. `/^[0-9]$/.test(e.key)`) so the space bar isn't treated as a digit.
3. **Paste support:** Handle pasting a full 6-digit code by splitting it across all boxes.
4. **Read the code:** Add a button that gathers all six values into one string and displays or "verifies" it.
5. **Auto-submit:** When the last box is filled, automatically trigger the verify action.
