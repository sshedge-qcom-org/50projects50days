# Form Wave

## 1. Project Overview

A stylish login form where each input's label sits *inside* the field like a placeholder. When you click into a field (or it contains text), the label's letters float upward one-by-one — creating an animated "wave" effect — and turn light blue.

**Key concepts involved:**

- CSS transitions with a `transition-delay` to stagger animations
- The `:focus` and `:valid` pseudo-classes to react to user input
- The general sibling combinator (`~`) to style one element based on another
- Using JavaScript to wrap each label letter in its own `<span>` so it can animate independently

**HTML skills you'll gain**

- Building an accessible-ish form with `<input>`, `<label>`, and a submit `<button>`
- Using the `required` attribute (which powers the `:valid` trick)

**CSS skills you'll gain**

- Centering a card on the page with Flexbox
- Styling inputs to look like minimal "underline only" fields
- Reacting to `:focus` and `:valid` states
- Chaining state to a sibling with the `~` combinator
- Staggering an animation across elements with per-element `transition-delay`

**JavaScript skills you'll gain**

- Selecting multiple elements with `querySelectorAll`
- Looping with `forEach`
- Turning a string into an array with `split('')`, transforming it with `map()`, and rejoining with `join('')`
- Building HTML strings with template literals and injecting them via `innerHTML`

---

## 2. Final Project Preview

**Layout & colors**

- A steel-blue page with a centered, semi-transparent dark card.
- The card has a "Please Login" heading, an **Email** field, a **Password** field, a full-width light-blue **Login** button, and a "Don't have an account? Register" line at the bottom.
- Inputs are borderless except for a white underline.

**Behavior & interactions**

- Click (focus) an input → its underline turns light blue, and the label letters lift up above the field one after another (a left-to-right wave), turning light blue.
- Type something and click away → because the field is now "valid" (non-empty + `required`), the label stays lifted instead of dropping back down.
- Empty the field and click away → the label letters wave back down into place.
- The Login button dips slightly when pressed.

**What you can interact with**

- The Email and Password inputs (focus / type)
- The Login button (press)
- The Register link (goes to `#`)

---

## 3. Prerequisites

**You should know:** basic HTML form tags, basic CSS, and basic JS functions/loops.

**Tools needed:**

- A modern browser
- A text editor (VS Code recommended)
- Optional: VS Code "Live Server" for auto-reload

**Files to create:**

```
form-input-wave/
├── index.html
├── style.css
└── script.js
```

Start with all three files **empty**.

---

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML skeleton

**🎯 Goal**
Set up a valid document and link the stylesheet and script.

**💡 Concept**
The stylesheet goes in the `<head>`; the script goes at the end of `<body>` so the form elements exist before the JS runs.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Form Input Wave</title>
  </head>
  <body>

    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**

- Standard boilerplate: character set, mobile viewport, a stylesheet link, and the deferred script tag at the bottom.

**✅ Checkpoint**
Open `index.html`. Blank page, tab titled "Form Input Wave", no errors.

---

### Step 2: Build the login form structure

**🎯 Goal**
Add the card, heading, two labeled fields, the button, and the register link.

**💡 Concept**
Each field is wrapped in a `.form-control` div containing an `<input>` and a `<label>`. Crucially, the `<input>` comes **before** the `<label>` in the markup — that ordering is what lets us use the `~` sibling combinator later. The `required` attribute will let CSS know when a field is "valid" (filled in).

**📝 Code**

```html
<!-- goes in index.html, inside <body> above the <script> -->
<div class="container">
  <h1>Please Login</h1>
  <form>
    <div class="form-control">
      <input type="text" required>
      <label>Email</label>
    </div>

    <div class="form-control">
      <input type="password" required>
      <label>Password</label>
    </div>

    <button class="btn">Login</button>

    <p class="text">Don't have an account? <a href="#">Register</a> </p>
  </form>
</div>
```

**🔍 Explanation**

- `.container` is the card; `<h1>` is the title.
- Each `.form-control` pairs an input with its label. `input` first, `label` second — remember this order.
- `required` on both inputs is what makes the `:valid` pseudo-class trigger only when they contain text.
- The `.btn` submits the form (visually), and `.text` holds the register link.

**✅ Checkpoint**
Refresh. You'll see the heading, two input boxes, the word "Email"/"Password" beside/below them, a Login button, and the register line — all unstyled and stacked.

---

### Step 3: Import the font, reset the box model, and center the page

**🎯 Goal**
Load the Muli font and center everything vertically and horizontally on a steel-blue background.

**💡 Concept**
Turning `body` into a Flexbox container with `align-items: center` and `justify-content: center` centers its children both ways.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: steelblue;
  color: #fff;
  font-family: 'Muli', sans-serif;
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

- `@import` loads the Muli font (must be the first line).
- `box-sizing: border-box` on `*` makes widths include padding/border.
- `body` becomes a full-height (`100vh`) flex column with white text on steel blue, centering its content. `overflow: hidden` and `margin: 0` remove scrollbars and default spacing.

**✅ Checkpoint**
Refresh. The form is now centered on a steel-blue page with white Muli text.

---

### Step 4: Style the card, heading, and link

**🎯 Goal**
Give the form a translucent dark card with rounded corners and style the heading and register link.

**💡 Concept**
An `rgba()` background lets the steel blue show through slightly, giving a frosted look.

**📝 Code**

```css
/* goes in style.css */
.container {
  background-color: rgba(0, 0, 0, 0.4);
  padding: 20px 40px;
  border-radius: 5px;
}

.container h1 {
  text-align: center;
  margin-bottom: 30px;
}

.container a {
  text-decoration: none;
  color: lightblue;
}
```

**🔍 Explanation**

- `.container` gets a 40%-opaque black background (translucent), padding, and rounded corners.
- The heading is centered with breathing room below it.
- Links inside the card lose their underline and turn light blue.

**✅ Checkpoint**
Refresh. The form now sits inside a dark, rounded, semi-transparent card; the "Register" link is light blue.

---

### Step 5: Style the button and register text

**🎯 Goal**
Make the Login button a full-width light-blue block with subtle press feedback.

**💡 Concept**
`:active` styles apply while the element is being clicked; a tiny `transform: scale()` gives a satisfying "press" feel.

**📝 Code**

```css
/* goes in style.css */
.btn {
  cursor: pointer;
  display: inline-block;
  width: 100%;
  background: lightblue;
  padding: 15px;
  font-family: inherit;
  font-size: 16px;
  border: 0;
  border-radius: 5px;
}

.btn:focus {
  outline: 0;
}

.btn:active {
  transform: scale(0.98);
}

.text {
  margin-top: 30px;
}
```

**🔍 Explanation**

- `.btn` spans the full width, uses light blue, inherits the Muli font (`font-family: inherit`), and drops its default border.
- `:focus { outline: 0 }` removes the browser's focus ring.
- `:active { transform: scale(0.98) }` shrinks the button to 98% while pressed.
- `.text` adds space above the register line.

**✅ Checkpoint**
Refresh. The Login button is now a full-width light-blue bar; press it and it dips slightly.

---

### Step 6: Style the fields and their focus state

**🎯 Goal**
Turn the inputs into minimalist underline-only fields that highlight when focused or filled.

**💡 Concept**
We strip the input's borders except the bottom one, then use `:focus` **and** `:valid` together so the highlight persists once the field has valid content.

**📝 Code**

```css
/* goes in style.css */
.form-control {
  position: relative;
  margin: 20px 0 40px;
  width: 300px;
}

.form-control input {
  background-color: transparent;
  border: 0;
  border-bottom: 2px #fff solid;
  display: block;
  width: 100%;
  padding: 15px 0;
  font-size: 18px;
  color: #fff;
  position: relative;
  z-index: 100;
}

.form-control input:focus,
.form-control input:valid {
  outline: 0;
  border-bottom-color: lightblue;
}
```

**🔍 Explanation**

- `.form-control` is `position: relative` so the label (positioned absolutely next) is placed relative to *it*. It's `300px` wide with vertical spacing.
- The input is transparent with only a white bottom border — a clean underline. `z-index: 100` keeps it stacked above the label so the text you type is never hidden.
- `input:focus, input:valid` turns the underline light blue. Because the inputs are `required`, `:valid` only matches when they contain text — so the highlight sticks after you type something and click away.

**✅ Checkpoint**
Refresh. The fields are now underline-only. Click one — its underline turns light blue. Type text and click away — it stays blue.

---

### Step 7: Position the label and prepare the letters for animation

**🎯 Goal**
Place the label on top of the input (like a placeholder) and set up each letter to animate.

**💡 Concept**
The label sits absolutely at the input's start. We also style `label span` — individual letter wrappers that don't exist yet (JavaScript will create them). Giving each `span` a `transition` prepares it to animate smoothly.

**📝 Code**

```css
/* goes in style.css */
.form-control label {
  position: absolute;
  top: 15px;
  left: 0;
  pointer-events: none;
}

.form-control label span {
  display: inline-block;
  font-size: 18px;
  min-width: 5px;
  transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

**🔍 Explanation**

- The label is absolutely positioned at `top: 15px; left: 0`, so it overlaps the input like placeholder text. `pointer-events: none` lets clicks pass *through* the label to the input beneath it.
- `label span` targets each letter (once JS wraps them). `display: inline-block` is required so each letter can be moved with `transform`. `min-width: 5px` keeps spaces from collapsing. The `cubic-bezier` transition gives a springy, slightly-overshooting motion over 0.3s.

**✅ Checkpoint**
Refresh. The "Email"/"Password" text now sits inside each field like a placeholder. Focusing the field doesn't move the label *yet* — because there are no `<span>`s inside it to animate. We'll fix that with the lift rule and the JavaScript next.

---

### Step 8: Add the "lift the letters" rule

**🎯 Goal**
Define what the label letters do when the field is focused or filled: rise up and turn light blue.

**💡 Concept**
The general sibling combinator `~` lets a focused/valid input style the `span`s inside the *label that follows it*. This only works because in the HTML the `input` comes before the `label`.

**📝 Code**

```css
/* goes in style.css */
.form-control input:focus ~ label span,
.form-control input:valid ~ label span {
  color: lightblue;
  transform: translateY(-30px);
}
```

**🔍 Explanation**

- `input:focus ~ label span` reads: "every `span` inside a `label` that is a later sibling of a focused input." It moves each letter up 30px (`translateY(-30px)`) and colors it light blue.
- `input:valid ~ label span` does the same once the field has valid (non-empty) content, so the label stays up after you've typed.
- The per-letter movement + the `transition` from Step 7 is what produces the animation — but they'll all move *together* until we stagger them in the next step.

**✅ Checkpoint**
The label still won't move on focus, because the label text isn't split into `<span>`s yet. One more step.

---

### Step 9: Split each label into animated letters with JavaScript

**🎯 Goal**
Wrap every label letter in its own `<span>` and give each a slightly larger `transition-delay`, so they lift in sequence — the wave.

**💡 Concept**
`transition-delay` postpones when a transition starts. By giving letter 0 a 0ms delay, letter 1 a 50ms delay, letter 2 a 100ms delay, and so on, the letters animate one after another instead of all at once.

**📝 Code**

```js
// goes in script.js
const labels = document.querySelectorAll('.form-control label')

labels.forEach(label => {
    label.innerHTML = label.innerText
        .split('')
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
        .join('')
})
```

**🔍 Explanation**

- `querySelectorAll('.form-control label')` grabs both labels as a list.
- For each label: `label.innerText` is its text (e.g. `"Email"`). `.split('')` turns it into an array of characters `['E','m','a','i','l']`.
- `.map((letter, idx) => ...)` transforms each character into a `<span>` whose `transition-delay` is `idx * 50` milliseconds — 0ms, 50ms, 100ms, 150ms, 200ms. The `idx` (index) is the letter's position.
- `.join('')` glues those span strings back into one HTML string, and `label.innerHTML = ...` replaces the plain text with the spans.
- Now, when the CSS from Step 8 lifts the spans, each waits for its own delay first — producing the staggered wave.

**✅ Checkpoint**
Refresh and click into a field. The label letters float upward in a left-to-right wave and turn light blue. Type text and click away — they stay up. Empty it and click away — they wave back down. Done!

---

## 5. Final Full Code (Reference)

> Note: `index.html` below includes a commented-out block. It's an inert illustration in the original project showing the manual, hand-written version of the `<span>`s that `script.js` generates automatically for the Email label. You don't need it, but it's kept here to match the source file exactly.

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Form Input Wave</title>
  </head>
  <body>
    <div class="container">
      <h1>Please Login</h1>
      <form>
        <div class="form-control">
          <input type="text" required>
          <label>Email</label>
          <!-- <label>
            <span style="transition-delay: 0ms">E</span>
              <span style="transition-delay: 50ms">m</span>
              <span style="transition-delay: 100ms">a</span>
              <span style="transition-delay: 150ms">i</span>
              <span style="transition-delay: 200ms">l</span>
        </label> -->
        </div>

        <div class="form-control">
          <input type="password" required>
          <label>Password</label>
        </div>

        <button class="btn">Login</button>

        <p class="text">Don't have an account? <a href="#">Register</a> </p>
      </form>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

```css
/* style.css */
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: steelblue;
  color: #fff;
  font-family: 'Muli', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.container {
  background-color: rgba(0, 0, 0, 0.4);
  padding: 20px 40px;
  border-radius: 5px;
}

.container h1 {
  text-align: center;
  margin-bottom: 30px;
}

.container a {
  text-decoration: none;
  color: lightblue;
}

.btn {
  cursor: pointer;
  display: inline-block;
  width: 100%;
  background: lightblue;
  padding: 15px;
  font-family: inherit;
  font-size: 16px;
  border: 0;
  border-radius: 5px;
}

.btn:focus {
  outline: 0;
}

.btn:active {
  transform: scale(0.98);
}

.text {
  margin-top: 30px;
}

.form-control {
  position: relative;
  margin: 20px 0 40px;
  width: 300px;
}

.form-control input {
  background-color: transparent;
  border: 0;
  border-bottom: 2px #fff solid;
  display: block;
  width: 100%;
  padding: 15px 0;
  font-size: 18px;
  color: #fff;
  position: relative;
  z-index: 100;
}

.form-control input:focus,
.form-control input:valid {
  outline: 0;
  border-bottom-color: lightblue;
}

.form-control label {
  position: absolute;
  top: 15px;
  left: 0;
  pointer-events: none;
}

.form-control label span {
  display: inline-block;
  font-size: 18px;
  min-width: 5px;
  transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.form-control input:focus ~ label span,
.form-control input:valid ~ label span {
  color: lightblue;
  transform: translateY(-30px);
}
```

```js
// script.js
const labels = document.querySelectorAll('.form-control label')

labels.forEach(label => {
    label.innerHTML = label.innerText
        .split('')
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
        .join('')
})
```

---

## 6. Recap & Next Steps

**What you learned**

- Centering a card with Flexbox and building a translucent panel with `rgba()`
- Creating underline-only inputs and highlighting them with `:focus` / `:valid`
- Using the `required` attribute to make `:valid` meaningful
- Linking an input's state to a sibling label via the `~` combinator
- Splitting text into per-letter `<span>`s and staggering their animation with `transition-delay`

**Enhancement challenges**

1. **Add more fields** (e.g. "Username", "Confirm Password") — the JS already handles any label automatically.
2. **Validate on submit** — prevent the form from submitting empty and show an error message.
3. **Add a show/hide password toggle** next to the password field.
4. **Change the wave direction** — try making the last letter lift first (reverse the delay).
5. **Theme it** — swap steel blue and light blue for your own color scheme using CSS variables.
