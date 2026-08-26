# Event Keycodes

## 1. Project Overview

Press any key and this app instantly shows you three things about it: the key's `event.key`, its (legacy) `event.keyCode`, and its `event.code`. It's a tiny but genuinely useful developer tool for inspecting keyboard events.

> **Heads-up — a filename quirk in this project.** `index.html` links to a stylesheet called `style.css`, but there is **no `style.css`** in this folder. The real styles ship in a file named **`dark-style.css`**, which nothing references. So if you open the project exactly as it's stored in the repo, the page appears **unstyled** (the browser can't find `style.css`). This tutorial builds the styles into `dark-style.css` — where they actually live — and keeps `index.html`'s original `style.css` link intact so you learn the project as it really is. To *see* the styles applied, do one of these: rename `dark-style.css` to `style.css`, **or** change the link in `index.html` to `href="dark-style.css"`. We'll remind you at the relevant step.

**Key concepts involved:**

- Listening for keyboard events on the `window`
- Reading properties off the `event` object (`key`, `keyCode`, `code`)
- Rebuilding part of the page with a template literal
- The ternary operator for a small conditional

**HTML skills you'll gain**

- Setting up a container that JavaScript will repopulate
- Understanding how a `<link>` resolves to a CSS file (and what happens when it doesn't)

**CSS skills you'll gain**

- Centering content with Flexbox on a dark theme
- Building a "key cap" card and labeling it with an absolutely-positioned `<small>`

**JavaScript skills you'll gain**

- Attaching a `keydown` listener to `window`
- Inspecting the `event` object and the difference between `key`, `keyCode`, and `code`
- Writing multi-line HTML with template literals and `${}` interpolation
- Using a ternary to special-case the spacebar

---

## 2. Final Project Preview

**Layout & colors**

- A dark charcoal page with everything centered.
- Initially, a single dark "key cap" box reads **"Press any key to get the keyCode"**.
- After you press a key, three boxes appear side by side. Each shows a value in large white text with a small gray label floating above it: `event.key`, `event.keyCode`, and `event.code`.

**Behavior & interactions**

- Press any key → the three boxes update to describe that key.
- Press the spacebar → the first box shows the word "Space" instead of a blank.
- Keep pressing different keys → the display refreshes every time.

**What you can interact with**

- Your keyboard — press any key (no on-screen controls)

---

## 3. Prerequisites

**You should know:** basic HTML/CSS and basic JS (variables, functions, events).

**Tools needed:**

- A modern browser
- A text editor (VS Code recommended)
- Optional: VS Code "Live Server" for auto-reload

**Files to create:**

```
event-keycodes/
├── index.html
├── dark-style.css   (the stylesheet that actually holds the styles)
└── script.js
```

> As noted above, `index.html` references `style.css`, but the styles live in `dark-style.css`. Create `dark-style.css` as shown here; then either rename it to `style.css` or repoint the `<link>` so the browser can find it.

Start with all three files **empty**.

---

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML skeleton

**🎯 Goal**
Set up the document and link the stylesheet and script.

**💡 Concept**
Standard boilerplate. Note the `<link>` points at `style.css` — this is exactly what the original file contains, even though the actual styles are in `dark-style.css` (see the heads-up above).

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Event KeyCodes</title>
  </head>
  <body>

    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**

- The head tags plus a `<link>` to `style.css` and a deferred `script.js` at the bottom.
- Reminder: to make the styling actually load, either rename `dark-style.css` → `style.css`, or change this `href` to `dark-style.css`.

**✅ Checkpoint**
Open `index.html`. Blank page, tab titled "Event KeyCodes", no errors.

---

### Step 2: Add the container and prompt

**🎯 Goal**
Create the box JavaScript will refresh, with a starting message.

**💡 Concept**
`<div id="insert">` is the region we'll overwrite on each keypress. Inside it we put an initial `.key` box prompting the user to press a key.

**📝 Code**

```html
<!-- goes in index.html, inside <body> above the <script> -->
<div id="insert">
  <div class="key">
    Press any key to get the keyCode
  </div>
</div>
```

**🔍 Explanation**

- `#insert` is the JS hook — the script replaces everything inside it when a key is pressed.
- The nested `.key` div is the initial prompt, styled the same way the result boxes will be.

**✅ Checkpoint**
Refresh. You'll see the prompt text (unstyled for now — remember the CSS link issue).

---

### Step 3: Import the font, reset the box model, and center on a dark theme

**🎯 Goal**
Set the dark background and center everything.

**💡 Concept**
A Flexbox `body` centers its children; a dark background sets the developer-tool mood.

> **Reminder:** this and the next two CSS steps go in **`dark-style.css`**. For the browser to apply them, rename that file to `style.css` or point `index.html`'s link at `dark-style.css`.

**📝 Code**

```css
/* goes in dark-style.css */
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #383838;
  font-family: 'Muli', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}
```

**🔍 Explanation**

- `@import` loads the Muli font (first line).
- `body` fills the viewport (`100vh`) with a charcoal background and centers its content both ways using Flexbox.

**✅ Checkpoint**
Once the stylesheet is wired up (renamed/repointed) and you refresh, the page is dark charcoal with the prompt centered.

---

### Step 4: Style the "key cap" box

**🎯 Goal**
Turn each `.key` into a dark, bordered card.

**💡 Concept**
`position: relative` here matters — it sets the reference point for the `<small>` label we'll position absolutely in the next step.

**📝 Code**

```css
/* goes in dark-style.css */
.key {
  border: 1px solid #999999;
  background-color: #2B2B2B;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  display: inline-flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  padding: 20px;
  flex-direction: column;
  margin: 10px;
  min-width: 150px;
  color: white;
  position: relative;
}
```

**🔍 Explanation**

- `.key` is a dark card (`#2B2B2B`) with a gray border, subtle shadow, bold white 20px text, and a `min-width` so boxes stay a consistent size.
- `display: inline-flex` + `flex-direction: column` stacks the value and its label vertically and lets multiple boxes sit in a row.
- `position: relative` establishes this box as the anchor for the absolutely-positioned label next.

**✅ Checkpoint**
Refresh (with the stylesheet wired up). The prompt now sits in a dark, bordered card.

---

### Step 5: Style the small floating label

**🎯 Goal**
Position the `<small>` label just above its box.

**💡 Concept**
Because `.key` is `position: relative`, an absolutely-positioned child is placed relative to it. A negative `top` lifts the label above the card's top edge.

**📝 Code**

```css
/* goes in dark-style.css */
.key small {
  position: absolute;
  top: -24px;
  left: 0;
  text-align: center;
  width: 100%;
  color: #c4c4c4;
  font-size: 14px;
}
```

**🔍 Explanation**

- `position: absolute; top: -24px` floats the label 24px above the box.
- `left: 0; width: 100%; text-align: center` spans the label across the box width and centers it.
- It's smaller (`14px`) and light gray (`#c4c4c4`) so it reads as a caption. (The labels only appear once JavaScript renders boxes that contain a `<small>`.)

**✅ Checkpoint**
No new visible change yet — the prompt box has no `<small>`. The labels show up once the JS runs. Styling is done.

---

### Step 6: Grab the container in JavaScript

**🎯 Goal**
Get a reference to the `#insert` div so we can update it.

**💡 Concept**
`getElementById` returns the element we'll repopulate on each keypress.

**📝 Code**

```js
// goes in script.js
const insert = document.getElementById('insert')
```

**🔍 Explanation**

- `insert` now points at the container whose contents we'll replace whenever a key is pressed.

**✅ Checkpoint**
No visible change; the console should be error-free.

---

### Step 7: React to keypresses and display the values

**🎯 Goal**
On any keydown, replace the container's contents with three boxes describing the key.

**💡 Concept**
`window.addEventListener('keydown', ...)` fires for every key press anywhere on the page. The handler receives an `event` object holding `key`, `keyCode`, and `code`. A template literal (backtick string) lets us build multi-line HTML and drop values in with `${}`.

**📝 Code**

```js
// goes in script.js
window.addEventListener('keydown', (event) => {
  insert.innerHTML = `
  <div class="key">
  ${event.key === ' ' ? 'Space' : event.key} 
  <small>event.key</small>
</div>

<div class="key">
  ${event.keyCode}
  <small>event.keyCode</small>
</div>

<div class="key">
  ${event.code}
  <small>event.code</small>
</div>
  `
})
```

**🔍 Explanation**

- `window.addEventListener('keydown', (event) => { ... })` runs the callback on every key press, passing the `event` describing what was pressed.
- `insert.innerHTML = \`...\`` replaces the prompt with three `.key` boxes built from a template literal.
- The three values illustrate the differences:
  - **`event.key`** — the character/name produced, e.g. `"a"`, `"A"`, `"Enter"`, or `" "` for space.
  - **`event.keyCode`** — an older numeric code (e.g. 65 for A). It's **deprecated**, which is exactly why this demo also shows the modern alternatives.
  - **`event.code`** — the physical key on the keyboard, e.g. `"KeyA"`, `"Space"` — unaffected by Shift or keyboard layout.
- `${event.key === ' ' ? 'Space' : event.key}` is a **ternary**: if the key is a literal space, display the word `"Space"` (otherwise a blank box); otherwise show the key itself.
- Each box has a `<small>` naming which property it shows — those are the floating labels we styled in Step 5.

**✅ Checkpoint**
Refresh (with the stylesheet wired up) and press keys. Each press shows three labeled boxes with that key's `event.key`, `event.keyCode`, and `event.code`. Press the spacebar and the first box reads "Space". Done!

---

## 5. Final Full Code (Reference)

> Reminder: `index.html` links `style.css`, but the styles below live in **`dark-style.css`** in the repo (there is no `style.css` on disk). Rename the file to `style.css` or repoint the `<link>` to `dark-style.css` to see the styling applied.

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Event KeyCodes</title>
  </head>
  <body>
    <div id="insert">
      <div class="key">
        Press any key to get the keyCode
      </div>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

```css
/* dark-style.css  (index.html references "style.css"; rename or repoint the link to apply these) */
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #383838;
  font-family: 'Muli', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.key {
  border: 1px solid #999999;
  background-color: #2B2B2B;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  display: inline-flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  padding: 20px;
  flex-direction: column;
  margin: 10px;
  min-width: 150px;
  color: white;
  position: relative;
}

.key small {
  position: absolute;
  top: -24px;
  left: 0;
  text-align: center;
  width: 100%;
  color: #c4c4c4;
  font-size: 14px;
}
```

```js
// script.js
const insert = document.getElementById('insert')

window.addEventListener('keydown', (event) => {
  insert.innerHTML = `
  <div class="key">
  ${event.key === ' ' ? 'Space' : event.key} 
  <small>event.key</small>
</div>

<div class="key">
  ${event.keyCode}
  <small>event.keyCode</small>
</div>

<div class="key">
  ${event.code}
  <small>event.code</small>
</div>
  `
})
```

---

## 6. Recap & Next Steps

**What you learned**

- Listening for `keydown` events on `window` and reading the `event` object
- The practical difference between `event.key`, `event.keyCode` (deprecated), and `event.code`
- Building and injecting multi-line HTML with template literals and `${}`
- Using a ternary to special-case the spacebar
- How a `<link>` resolves to a file — and how a filename mismatch (`style.css` vs `dark-style.css`) leaves a page unstyled

**Enhancement challenges**

1. **Fix the stylesheet link for good** — rename `dark-style.css` to `style.css` (or update the `<link>`) so the project works out of the box.
2. **Add a light/dark theme toggle** — this is the perfect project for it, since you already have a dark theme; add a `style.css` (light) and swap the linked file with a button.
3. **Show modifier keys** — display whether Shift, Ctrl, Alt, or Meta were held (`event.shiftKey`, etc.).
4. **Ignore repeats** — skip the update when a key is held down (`event.repeat`).
5. **Guard against blanks** — some keys produce empty `event.key` values; add labels for those the way the spacebar is handled.
