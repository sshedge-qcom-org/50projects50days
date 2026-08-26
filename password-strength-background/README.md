# Password Strength Background

## 1. Project Overview

This project builds a login-style card sitting on top of a **blurred background photo**. As you type into the password field, the background image gets progressively **sharper** — a fun, visual way to represent "password strength" (longer = clearer).

**Key concepts involved**
- Listening to the `input` event on a text field (fires on every keystroke)
- Reading a field's value and length live
- Turning a number into a dynamic CSS value with a template literal
- The CSS `filter: blur()` effect and how to keep its edges clean
- Rapid UI styling with a utility-first CSS framework (Tailwind, from a CDN)

**HTML skills you'll gain**
- Loading a CSS framework from a CDN
- Building a form card using utility classes for spacing, color, and layout
- Associating `<label>`s with inputs via `id`

**CSS skills you'll gain**
- Full-viewport centering with a flex column
- Creating a fixed background layer with `position: absolute` and `z-index`
- Applying `filter: blur()` and using negative offsets so blurred edges don't show gaps

**JavaScript skills you'll gain**
- Selecting elements with `getElementById`
- Handling the `input` event and using `e.target.value`
- Computing a value from input length and applying it as an inline style

---

## 2. Final Project Preview

**Layout & colors**
- A photo fills the entire screen as a background, heavily **blurred** at first.
- Centered on top is a clean **white card** with rounded corners and a soft shadow.
- The card contains a heading ("Image Password Strength"), a hint line, an **Email** field, a **Password** field, and a black full-width **Submit** button.

**Behavior & interactions**
- Typing in the **Password** field reduces the background blur by 2px per character. At ~10 characters the image is fully sharp; an empty field is very blurry (20px).
- The email field and submit button are visual only — they don't do anything.

**What the user can interact with**
- The password input. Every keystroke updates the background's blur in real time.

---

## 3. Prerequisites

**Basic knowledge required**
- HTML forms, labels, and inputs.
- Basic CSS (positioning and `z-index` help).
- JavaScript basics: selecting elements and handling events.

**Tools needed**
- A modern browser.
- A text editor (VS Code recommended).
- An internet connection (Tailwind and the background image load from the web).
- Optional: the **Live Server** extension.

**Files to create**

```
password-strength-background/
├── index.html
├── style.css
└── script.js
```

Create the three empty files now.

---

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML skeleton

**🎯 Goal**
Begin with a valid, empty HTML5 document.

**💡 Concept**
The usual boilerplate sets encoding and responsive scaling before any content loads.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Strength Backround</title>
  </head>
  <body></body>
</html>
```

**🔍 Explanation**
- Standard HTML5 setup. (The title text `Backround` is copied exactly from the original — it's just a typo in the source, harmless to keep or fix.)

**✅ Checkpoint**
Blank page, correct tab title, no errors.

---

### Step 2: Load Tailwind, the stylesheet, and the script

**🎯 Goal**
Bring in the Tailwind CSS framework plus our own CSS and JS.

**💡 Concept**
**Tailwind** is a *utility-first* CSS framework: instead of writing custom classes, you compose many tiny single-purpose classes (like `p-10` for padding or `text-center` for centered text) right in your HTML. Loading it from a CDN makes all those classes available instantly.

**📝 Code**

```html
<!-- goes in index.html: inside <head>, before your own stylesheet -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.8.11/tailwind.min.css"
  integrity="sha512-KO1h5ynYuqsFuEicc7DmOQc+S9m2xiCKYlC3zcZCSEw0RGDsxcMnppRaMZnb0DdzTDPaW22ID/gAGCZ9i+RT/w=="
  crossorigin="anonymous"
/>
<link rel="stylesheet" href="style.css" />
```

```html
<!-- goes in index.html: just before the closing </body> tag -->
<script src="script.js"></script>
```

**🔍 Explanation**
- The Tailwind `<link>` loads the framework's utility classes from a CDN; `integrity`/`crossorigin` verify the file.
- Our own `style.css` loads **after** Tailwind so our rules (like the background) take precedence.
- The `<script>` sits at the bottom so the DOM exists before JS runs.

**✅ Checkpoint**
Still blank, but no 404s in DevTools → Network. Tailwind is ready.

---

### Step 3: Add the blurred background layer

**🎯 Goal**
Add the empty `<div>` that will hold the full-screen background image.

**💡 Concept**
We use a **dedicated layer** for the background (rather than putting the image on `body`) so we can blur *only* the photo and slide the card in front of it via `z-index`.

**📝 Code**

```html
<!-- goes in index.html: first thing inside <body> -->
<div class="background" id="background"></div>
```

**🔍 Explanation**
- `class="background"` will receive the image and blur via our CSS.
- `id="background"` is the hook JavaScript uses to change the blur amount later.

**✅ Checkpoint**
Nothing visible yet — the div is empty and unstyled. No errors.

---

### Step 4: Add the card shell, heading, and hint

**🎯 Goal**
Create the white card and its title/subtitle using Tailwind classes.

**💡 Concept**
Each Tailwind class does one thing. Read them like a sentence: `bg-white rounded p-10 text-center shadow-md` = white background, rounded corners, large padding, centered text, medium shadow.

**📝 Code**

```html
<!-- goes in index.html: after the background div -->
<div class="bg-white rounded p-10 text-center shadow-md">
  <h1 class="text-3xl">Image Password Strength</h1>
  <p class="text-sm text-gray-700">Change the password to see the effect</p>
</div>
```

**🔍 Explanation**
- The outer `<div>` is the card: white, rounded, padded, centered text, with a shadow — all via Tailwind utilities.
- `text-3xl` makes the heading large; `text-sm text-gray-700` makes the hint small and muted gray.

**✅ Checkpoint**
A white card with a heading and hint text appears in the top-left of the page. We'll center it with CSS soon.

---

### Step 5: Add the email field

**🎯 Goal**
Add a labeled email input inside the card.

**💡 Concept**
Wrapping each field in a spacing `<div>` (`my-4 text-left`) gives vertical rhythm and left-aligns the label against the card's centered text.

**📝 Code**

```html
<!-- goes in index.html: inside the card, after the hint paragraph -->
<div class="my-4 text-left">
  <label for="email" class="text-gray-900">Email:</label>
  <input
    type="text"
    class="border block w-full p-2 mt-2 rounded"
    id="email"
    placeholder="Enter Email"
  />
</div>
```

**🔍 Explanation**
- `my-4` adds vertical margin; `text-left` overrides the card's centered text for this group.
- The `<label for="email">` is tied to the input's `id="email"`.
- The input's classes give it a border, full width (`w-full`), padding, top margin, and rounded corners. `block` makes it sit on its own line under the label.

**✅ Checkpoint**
A labeled "Email" text box appears in the card.

---

### Step 6: Add the password field

**🎯 Goal**
Add the password input — the one that will drive the blur.

**💡 Concept**
`type="password"` masks the characters. Its `id="password"` is the critical hook our JavaScript will listen to.

**📝 Code**

```html
<!-- goes in index.html: inside the card, after the email group -->
<div class="my-4 text-left">
  <label for="email" class="text-gray-900">Password:</label>
  <input
    type="password"
    class="border block w-full p-2 mt-2 rounded"
    id="password"
    placeholder="Enter Password"
  />
</div>
```

**🔍 Explanation**
- Same layout as the email group.
- `type="password"` hides typed characters.
- `id="password"` is what `getElementById('password')` will grab in JS.
- (The `for="email"` on the label is a copy from the source; ideally it would be `for="password"` — a nice tiny fix challenge for later.)

**✅ Checkpoint**
A masked "Password" field appears below the email field.

---

### Step 7: Add the submit button

**🎯 Goal**
Finish the card markup with a full-width submit button.

**💡 Concept**
The button is purely decorative here (there's no form submission logic), but it completes the familiar login-card look.

**📝 Code**

```html
<!-- goes in index.html: inside the card, after the password group -->
<button
  class="bg-black text-white py-2 mt-4 inline-block w-full rounded"
  type="submit"
>
  Submit
</button>
```

**🔍 Explanation**
- `bg-black text-white` gives a black button with white text.
- `py-2 mt-4 w-full rounded` add vertical padding, top margin, full width, and rounded corners.

**✅ Checkpoint**
The card now has a black "Submit" button spanning its width. The whole card is still top-left — CSS centering is next.

---

### Step 8: Reset box sizing and center the page

**🎯 Goal**
Center the card in the viewport and hide overflow.

**💡 Concept**
A full-height flex column centers the card. `overflow: hidden` is important here: our background layer will extend *beyond* the screen edges (next step), and this stops scrollbars from appearing.

**📝 Code**

```css
/* goes in style.css */
* {
  box-sizing: border-box;
}

body {
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
- `* { box-sizing: border-box }` makes sizing predictable.
- `display: flex; flex-direction: column` with both `align-items` and `justify-content: center` centers the card on both axes.
- `height: 100vh` fills the viewport so vertical centering works.
- `overflow: hidden` clips the oversized background layer; `margin: 0` removes default spacing.

**✅ Checkpoint**
The white card jumps to the **center** of the screen.

---

### Step 9: Add the blurred background image

**🎯 Goal**
Fill the screen with the photo, blur it, and push it behind the card.

**💡 Concept**
Two tricks work together: `z-index: -1` sends the layer behind everything, and negative offsets (`top/bottom/left/right: -20px`) make the image **larger than the viewport**. That matters because `blur()` softens (and effectively shrinks) the edges — overflowing by 20px hides the blurry, semi-transparent border that blur would otherwise reveal.

**📝 Code**

```css
/* goes in style.css */
.background {
  background: url('https://images.unsplash.com/photo-1556745757-8d76bdb6984b')
    no-repeat center center/cover;
  position: absolute;
  top: -20px;
  bottom: -20px;
  left: -20px;
  right: -20px;
  z-index: -1;
  filter: blur(20px);
}
```

**🔍 Explanation**
- `background: url(...) no-repeat center center/cover` loads the photo, centers it, and scales it to cover the whole area without repeating.
- `position: absolute` with all four offsets at `-20px` stretches the layer 20px past every edge.
- `z-index: -1` places it behind the card.
- `filter: blur(20px)` blurs it heavily by default — JavaScript will lower this number as you type.

**✅ Checkpoint**
The photo now fills the background, heavily blurred, with the card floating crisply in front. Notice there are no soft/blank edges thanks to the negative offsets.

---

### Step 10: Grab the password field and background in JS

**🎯 Goal**
Get references to the two elements we need: the input to listen to, and the background to restyle.

**💡 Concept**
`getElementById` returns the single element with that `id`. We need the password input (the trigger) and the background layer (the thing we change).

**📝 Code**

```js
// goes in script.js
const password = document.getElementById('password')
const background = document.getElementById('background')
```

**🔍 Explanation**
- `password` is the `<input type="password">` from Step 6.
- `background` is the `<div class="background">` from Step 3.

**✅ Checkpoint**
In DevTools Console, type `password` and `background`; each should print the matching element. No errors.

---

### Step 11: Update the blur as the user types

**🎯 Goal**
Recompute the blur on every keystroke so the background sharpens as the password grows.

**💡 Concept**
The `input` event fires on **every** change to the field (typing, pasting, deleting). We read the current length, convert it into a blur amount, and write it back as an inline CSS `filter` using a template literal.

**📝 Code**

```js
// goes in script.js
password.addEventListener('input', (e) => {
  const input = e.target.value
  const length = input.length
  const blurValue = 20 - length * 2
  background.style.filter = `blur(${blurValue}px)`
})
```

**🔍 Explanation**
- `addEventListener('input', ...)` runs the handler on every keystroke.
- `e.target.value` is the current text; `input.length` is how many characters it has.
- `blurValue = 20 - length * 2`: with 0 characters the blur is 20px (very blurry); each character removes 2px; at 10 characters it reaches 0 (fully sharp). (Beyond 10, the value goes negative — browsers treat a negative blur as 0, so it just stays sharp.)
- ``background.style.filter = `blur(${blurValue}px)` `` writes the new blur inline, overriding the CSS default.

**✅ Checkpoint**
Reload and type into the **Password** field. The background image sharpens as you add characters and blurs again as you delete them. 🎉

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
      href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.8.11/tailwind.min.css"
      integrity="sha512-KO1h5ynYuqsFuEicc7DmOQc+S9m2xiCKYlC3zcZCSEw0RGDsxcMnppRaMZnb0DdzTDPaW22ID/gAGCZ9i+RT/w=="
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="style.css" />
    <title>Password Strength Backround</title>
  </head>
  <body>
    <div class="background" id="background"></div>
    <div class="bg-white rounded p-10 text-center shadow-md">
      <h1 class="text-3xl">Image Password Strength</h1>
      <p class="text-sm text-gray-700">Change the password to see the effect</p>
      <div class="my-4 text-left">
        <label for="email" class="text-gray-900">Email:</label>
        <input
          type="text"
          class="border block w-full p-2 mt-2 rounded"
          id="email"
          placeholder="Enter Email"
        />
      </div>

      <div class="my-4 text-left">
        <label for="email" class="text-gray-900">Password:</label>
        <input
          type="password"
          class="border block w-full p-2 mt-2 rounded"
          id="password"
          placeholder="Enter Password"
        />
      </div>

      <button
        class="bg-black text-white py-2 mt-4 inline-block w-full rounded"
        type="submit"
      >
        Submit
      </button>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

### `style.css`

```css
* {
  box-sizing: border-box;
}

body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.background {
  background: url('https://images.unsplash.com/photo-1556745757-8d76bdb6984b')
    no-repeat center center/cover;
  position: absolute;
  top: -20px;
  bottom: -20px;
  left: -20px;
  right: -20px;
  z-index: -1;
  filter: blur(20px);
}
```

### `script.js`

```js
const password = document.getElementById('password')
const background = document.getElementById('background')

password.addEventListener('input', (e) => {
  const input = e.target.value
  const length = input.length
  const blurValue = 20 - length * 2
  background.style.filter = `blur(${blurValue}px)`
})
```

---

## 6. Recap & Next Steps

**What you learned**
- The `input` event and reading a field's live value/length with `e.target.value`.
- Turning a computed number into a dynamic CSS value via a template literal.
- The `filter: blur()` effect and the negative-offset trick that hides blurred edges.
- Layering with `position: absolute` + `z-index`.
- The basics of utility-first styling with Tailwind classes.

**Enhancement challenges**
1. **Clamp the blur:** Use `Math.max(0, 20 - length * 2)` so the value never goes negative (cleaner than relying on the browser).
2. **Strength meter:** Add a colored bar under the field (red → yellow → green) based on length or complexity.
3. **Real strength rules:** Factor in uppercase letters, numbers, and symbols — not just length — when computing "strength".
4. **Fix the label:** Change the password label's `for` to `password` and confirm clicking it focuses the field.
5. **Show/hide password:** Add a toggle button that flips the input between `password` and `text`.
