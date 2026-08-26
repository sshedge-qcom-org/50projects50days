# Notes App

## 1. Project Overview

This project builds a **Markdown notes app**: click a button to add note cards, type Markdown in each card, and toggle between an editable text area and a live-rendered preview. Every note is saved automatically so it survives a page refresh.

**Key concepts involved:**

- **Creating DOM elements dynamically** and injecting HTML with template literals.
- **`localStorage`** to persist data in the browser across reloads.
- Using a **third-party library from a CDN** (`marked.js`) to convert Markdown to HTML.
- Toggling UI state (edit vs. preview) with `classList`.

**HTML skills you'll gain:**

- Loading external CSS/JS libraries via `<link>` and `<script>` CDN tags.
- Using icon fonts (Font Awesome) with `<i class="fas ...">`.

**CSS skills you'll gain:**

- Positioning a fixed action button.
- Building a card layout with a header toolbar, a scrollable body, and a hidden/visible state via a `.hidden` utility class.

**JavaScript skills you'll gain:**

- `document.createElement`, `element.innerHTML`, and `appendChild`.
- Conditional classes inside template literals (the ternary operator).
- Wiring up `click` and `input` event listeners on freshly-created elements.
- Reading and writing `localStorage`, and why you need `JSON.stringify` / `JSON.parse`.
- Calling a library function (`marked()`) to transform text.
- Default parameters and (bonus) function **hoisting**.

---

## 2. Final Project Preview

**Layout & colors:** A light-blue page (`#7bdaf3`). Fixed in the top-right corner is a green **"+ Add note"** button. Each note is a white 400×400 card with a green toolbar across the top holding two icon buttons — an **edit** (pencil) button and a **delete** (trash) button. Cards wrap left-to-right and flow onto new rows as you add more.

**Behavior & interactions:**

- Clicking **+ Add note** creates a new, empty card already in *edit mode* (showing a big text area).
- Typing in the text area renders your text as **Markdown** live — but you only see the rendered result after switching to preview.
- The **edit** (pencil) button toggles a card between edit mode (text area) and preview mode (rendered Markdown).
- The **delete** (trash) button removes that card.
- All notes are saved to `localStorage` as you type, so refreshing the page brings them all back.

**What you can interact with:**

- The **+ Add note** button (creates cards).
- Each card's **edit** and **delete** buttons.
- Each card's **text area** (type Markdown here).

---

## 3. Prerequisites

**Basic knowledge required:**

- HTML structure and attributes.
- CSS classes and layout basics.
- JavaScript functions, arrays, `forEach`, and template literals.

**Tools needed:**

- A modern web browser.
- A text editor (VS Code recommended).
- *Optional:* the **Live Server** extension.
- An **internet connection** — this project loads Font Awesome and marked.js from a CDN.

**Files to create:**

```
notes-app/
├── index.html
├── style.css
└── script.js
```

Create these three empty files and follow along.

---

## 4. Build the Project Step-by-Step

### Step 1: Set Up the HTML Document

**🎯 Goal**
Create the page skeleton and load the Font Awesome icon library (so we can use pencil/trash icons) plus our own stylesheet.

**💡 Concept**
A **CDN** (Content Delivery Network) lets us pull in someone else's CSS/JS by URL instead of downloading files. Font Awesome is an icon font: after loading it, an `<i>` with the right classes renders as an icon.

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
    <title>Notes App</title>
  </head>
  <body>
  </body>
</html>
```

**🔍 Explanation**

- The first `<link>` loads Font Awesome from a CDN. The `integrity` and `crossorigin` attributes are a security feature (Subresource Integrity) that verifies the file hasn't been tampered with.
- The second `<link>` loads our own `style.css`.

**✅ Checkpoint**
Open `index.html`. A blank light page with the tab title "Notes App". No errors.

---

### Step 2: Add the "Add note" Button

**🎯 Goal**
Give the user a button to create new notes, complete with a plus icon.

**💡 Concept**
We give the button an `id` so JavaScript can find it easily, and drop a Font Awesome `<i>` inside it for the icon.

**📝 Code**

```html
<!-- goes in index.html, inside <body> -->
<button class="add" id="add">
  <i class="fas fa-plus"></i> Add note
</button>
```

**🔍 Explanation**

- `id="add"` — our JavaScript hook.
- `<i class="fas fa-plus"></i>` — Font Awesome renders this as a **+** icon (`fas` = the solid style, `fa-plus` = the specific icon).
- The text "Add note" sits right after the icon.

**✅ Checkpoint**
Reload — you should see a plain button reading "**+** Add note" (the plus is a real icon). It's unstyled for now.

---

### Step 3: Load marked.js and Our Script

**🎯 Goal**
Load the `marked` library (which converts Markdown text into HTML) and our own script, both at the end of the body.

**💡 Concept**
`marked` is another CDN library. Loading it **before** `script.js` means the global `marked()` function exists by the time our code calls it. Scripts run top-to-bottom, so order matters.

**📝 Code**

```html
<!-- goes in index.html, at the end of <body>, after the button -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/marked/1.2.2/marked.min.js"></script>
<script src="script.js"></script>
```

**🔍 Explanation**

- The first `<script>` defines a global `marked()` function we'll use later to turn Markdown strings into HTML.
- Our `script.js` comes **after** it, so `marked` is ready when we need it.

**✅ Checkpoint**
Still just the button on screen. In the browser console (F12), type `marked` and press Enter — it should report a function, confirming the library loaded.

---

### Step 4: Import a Font and Reset Defaults

**🎯 Goal**
Load the Poppins font and normalize box sizing and focus outlines.

**💡 Concept**
`box-sizing: border-box` makes sizing predictable. `outline: none` removes the default focus ring (the source does this globally for a cleaner look).

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap');

* {
  box-sizing: border-box;
  outline: none;
}
```

**🔍 Explanation**

- `@import` must be the first line; it fetches Poppins from Google Fonts.
- The `*` rule applies border-box sizing and removes outlines from every element.

> **Accessibility note:** removing focus outlines globally can hurt keyboard users. It matches the source here, but consider restoring a visible focus style in a real product.

**✅ Checkpoint**
No visible change yet — the font applies once we style the body next.

---

### Step 5: Style the Page Body

**🎯 Goal**
Set the light-blue background and lay notes out in a wrapping row.

**💡 Concept**
`display: flex` with `flex-wrap: wrap` lets note cards sit side by side and automatically flow onto new lines when they run out of horizontal space.

**📝 Code**

```css
/* goes in style.css */
body {
  background-color: #7bdaf3;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding-top: 3rem;
}
```

**🔍 Explanation**

- `background-color: #7bdaf3` — the signature light blue.
- `display: flex; flex-wrap: wrap` — cards line up and wrap to new rows.
- `margin: 0` removes default body margin; `padding-top: 3rem` leaves room at the top (so cards don't hide under the fixed button).

**✅ Checkpoint**
The page turns light blue and uses Poppins. The button is still unstyled.

---

### Step 6: Style the Add Button

**🎯 Goal**
Pin the button to the top-right corner and give it the green look with a click "press" effect.

**💡 Concept**
`position: fixed` locks the button to the viewport corner so it stays put as notes scroll. `:active` styles the moment it's pressed.

**📝 Code**

```css
/* goes in style.css */
.add {
  position: fixed;
  top: 1rem;
  right: 1rem;
  background-color: #9ec862;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.add:active {
  transform: scale(0.98);
}
```

**🔍 Explanation**

- `position: fixed; top/right: 1rem` — anchors the button to the top-right of the window.
- `background-color: #9ec862; color: #fff` — green button, white text.
- `.add:active { transform: scale(0.98) }` — briefly shrinks the button while it's held down, a tactile press effect.

**✅ Checkpoint**
The "+ Add note" button now sits green in the top-right corner and dips slightly when clicked.

---

### Step 7: Style the Note Card

**🎯 Goal**
Define the white 400×400 note card with a shadow and its own scrollbar.

**💡 Concept**
A fixed-size card with `overflow-y: scroll` keeps long notes contained within the card instead of stretching the page.

**📝 Code**

```css
/* goes in style.css */
.note {
  background-color: #fff;
  box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.1);
  margin: 30px 20px;
  height: 400px;
  width: 400px;
  overflow-y: scroll;
}
```

**🔍 Explanation**

- `box-shadow` gives the card a soft floating look.
- `height/width: 400px` fixes its size.
- `overflow-y: scroll` adds a vertical scrollbar so tall content scrolls inside the card.

**✅ Checkpoint**
Nothing new on screen yet — we have no note cards until the JavaScript creates them. The styles are ready and waiting.

---

### Step 8: Style the Card Toolbar and Its Buttons

**🎯 Goal**
Create the green toolbar strip at the top of each card holding the edit and delete icons.

**💡 Concept**
`justify-content: flex-end` pushes the toolbar buttons to the right edge. We use descendant selectors (`.note .tools button`) to style only the buttons inside a note's toolbar.

**📝 Code**

```css
/* goes in style.css */
.note .tools {
  background-color: #9ec862;
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
}

.note .tools button {
  background-color: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 0.5rem;
}
```

**🔍 Explanation**

- `.note .tools` — the green header bar; `display: flex; justify-content: flex-end` aligns its buttons to the right.
- `.note .tools button` — transparent, borderless, white icon buttons with a small gap between them.

**✅ Checkpoint**
Still no cards on screen (JS builds them), but these rules will apply automatically once cards exist.

---

### Step 9: Style the Text Area

**🎯 Goal**
Make the note's editing text area fill the card and inherit the page font.

**💡 Concept**
`font-family: inherit` makes the text area use Poppins like the rest of the page (text areas default to a monospace font otherwise).

**📝 Code**

```css
/* goes in style.css */
.note textarea {
  outline: none;
  font-family: inherit;
  font-size: 1.2rem;
  border: none;
  height: 400px;
  width: 100%;
  padding: 20px;
}
```

**🔍 Explanation**

- `font-family: inherit; font-size: 1.2rem` — comfortable, consistent typing.
- `border: none; outline: none` — removes the default box for a flush look.
- `height: 400px; width: 100%` — fills the card.

**✅ Checkpoint**
No visible change yet (no cards). Almost done with CSS.

---

### Step 10: Add the Preview and Hidden Utility Styles

**🎯 Goal**
Pad the rendered-Markdown area and create a reusable `.hidden` class to show/hide parts of a card.

**💡 Concept**
A single-purpose **utility class** like `.hidden { display: none }` is a clean way to toggle visibility from JavaScript: add the class to hide, remove it to show.

**📝 Code**

```css
/* goes in style.css */
.main {
  padding: 20px;
}

.hidden {
  display: none;
}
```

**🔍 Explanation**

- `.main` — the container that will hold the *rendered* Markdown, with comfortable padding.
- `.hidden` — whatever has this class disappears completely. We'll toggle it to switch between edit and preview modes.

**✅ Checkpoint**
CSS is complete. The page still shows only the button. Now we bring it to life with JavaScript.

---

### Step 11: Find the Add Button and Handle Clicks

**🎯 Goal**
Grab the "+ Add note" button and run a function each time it's clicked.

**💡 Concept**
We'll build a function called `addNewNote()` that creates a card. Even though we call it here before defining it, JavaScript **hoists** function declarations — the whole `function addNewNote() {...}` is available throughout the file — so this works.

**📝 Code**

```javascript
// goes in script.js
const addBtn = document.getElementById('add')

addBtn.addEventListener('click', () => addNewNote())
```

**🔍 Explanation**

- `getElementById('add')` grabs our button.
- On `click`, we call `addNewNote()` with no argument (a brand-new, empty note).

**✅ Checkpoint**
Clicking the button throws a `ReferenceError` in the console because `addNewNote` doesn't exist yet. That's expected — we write it next.

---

### Step 12: Build the Note Card in JavaScript

**🎯 Goal**
Create a note `<div>` and fill it with a toolbar, a preview area, and a text area.

**💡 Concept**
`document.createElement` makes a new element in memory; setting its `.innerHTML` fills it with markup via a **template literal** (backtick string). Inside that string, `${...}` runs JavaScript — we use a **ternary** (`condition ? a : b`) to decide which parts start hidden.

**📝 Code**

```javascript
// goes in script.js
function addNewNote(text = '') {
    const note = document.createElement('div')
    note.classList.add('note')

    note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `

    document.body.appendChild(note)
}
```

**🔍 Explanation**

- `function addNewNote(text = '')` — `text = ''` is a **default parameter**: if we call `addNewNote()` with nothing, `text` is an empty string.
- `createElement('div')` + `classList.add('note')` — a new card element.
- The template literal builds the toolbar (edit + delete icon buttons), a `.main` preview div, and a `<textarea>`.
- The clever bit: `class="main ${text ? "" : "hidden"}"` — if there's `text`, the preview is visible; if empty, it starts `hidden`. The text area is the opposite. So a **new** (empty) note opens in edit mode, while a **saved** note (with text) opens in preview mode.
- `document.body.appendChild(note)` — adds the finished card to the page.

**✅ Checkpoint**
Click "+ Add note": an empty white card appears with a green toolbar (pencil + trash icons) and a large text area ready for typing. The buttons don't *do* anything yet.

---

### Step 13: Wire Up the Card's Inner Elements

**🎯 Goal**
Get references to the pieces inside the new card, and render any starting text as Markdown.

**💡 Concept**
`note.querySelector(...)` searches **only inside this card**, so each note manages its own buttons and fields. We call the library's `marked(text)` to convert Markdown into HTML for the preview area.

**📝 Code**

```javascript
// goes in script.js, INSIDE addNewNote(), right after setting note.innerHTML
    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    textArea.value = text
    main.innerHTML = marked(text)
```

**🔍 Explanation**

- The four `querySelector` calls grab this card's edit button, delete button, preview area, and text area.
- `textArea.value = text` fills the editor with the starting text (empty for a new note).
- `main.innerHTML = marked(text)` converts that text from Markdown to HTML and drops it into the preview. For example, `# Hello` becomes an `<h1>Hello</h1>`.

> Place these lines **after** `note.innerHTML = ...` and **before** `appendChild` — the elements must exist in the card before we can select them.

**✅ Checkpoint**
No behavior change you can see yet, but no errors either. The card's parts are now referenced and ready to get event listeners.

---

### Step 14: Toggle Between Edit and Preview

**🎯 Goal**
Make the pencil button flip the card between the text area (edit) and the rendered preview.

**💡 Concept**
`classList.toggle('hidden')` adds the class if it's absent and removes it if present. Toggling `hidden` on *both* the preview and the text area swaps which one is showing.

**📝 Code**

```javascript
// goes in script.js, INSIDE addNewNote(), after the references from Step 13
    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
    })
```

**🔍 Explanation**
Each click flips both elements' `hidden` state. If the text area was showing, it hides and the preview appears — and vice versa. Because exactly one of them starts hidden, they always stay opposite.

**✅ Checkpoint**
Add a note, type some text, then click the **pencil** icon. The text area hides and the (currently empty) preview shows. Click again to return to editing. We'll make the preview show your text next.

---

### Step 15: Render Markdown Live As You Type

**🎯 Goal**
Update the preview every time the user types in the text area.

**💡 Concept**
The `input` event fires on every keystroke. We read the current value, run it through `marked()`, and update the preview so it's always in sync — even while hidden.

**📝 Code**

```javascript
// goes in script.js, INSIDE addNewNote(), after the edit listener
    textArea.addEventListener('input', (e) => {
        const { value } = e.target

        main.innerHTML = marked(value)
    })
```

**🔍 Explanation**

- `'input'` fires on every change to the field (typing, pasting, deleting).
- `const { value } = e.target` is **object destructuring** — a shorthand for `const value = e.target.value`. `e.target` is the text area.
- `main.innerHTML = marked(value)` re-renders the preview from the latest text.

**✅ Checkpoint**
Type Markdown like `# Title` and `**bold**` in a note, then click the pencil to preview. You'll see a big heading and bold text. Toggle back and keep editing — the preview stays current.

---

### Step 16: Delete a Note

**🎯 Goal**
Let the trash button remove its card.

**💡 Concept**
`element.remove()` deletes an element from the page entirely. Because each listener is created inside `addNewNote`, it "remembers" its own `note` via closure.

**📝 Code**

```javascript
// goes in script.js, INSIDE addNewNote(), after the references (before or after the edit listener)
    deleteBtn.addEventListener('click', () => {
        note.remove()
    })
```

**🔍 Explanation**
Clicking the trash icon calls `note.remove()`, which yanks that specific card out of the DOM. Other notes are untouched.

**✅ Checkpoint**
Add a couple of notes and click the trash icon on one — it disappears, the others remain.

---

### Step 17: Understand and Add localStorage Saving

**🎯 Goal**
Persist all notes so they come back after a page refresh.

**💡 Concept — meet `localStorage`:**
`localStorage` is a small key/value store built into the browser that **keeps data even after the page reloads or the browser closes**. A few essentials:

- It stores **strings only** — no arrays or objects directly. To save an array of note texts, we convert it to a string with `JSON.stringify(...)`, and later turn it back with `JSON.parse(...)`.
- It's **per-origin**: data saved by this site isn't visible to other sites, and it lives in *this* browser only (it doesn't sync to other devices or browsers).
- Core methods: `localStorage.setItem(key, value)` to save, and `localStorage.getItem(key)` to read.

Our save function gathers the text of *every* note's text area into an array and writes it under the key `'notes'`.

**📝 Code**

```javascript
// goes in script.js, as a new function at the bottom of the file
function updateLS() {
    const notesText = document.querySelectorAll('textarea')

    const notes = []

    notesText.forEach(note => notes.push(note.value))

    localStorage.setItem('notes', JSON.stringify(notes))
}
```

**🔍 Explanation**

- `querySelectorAll('textarea')` grabs every note's text area on the page.
- We loop over them and `push` each `.value` into a plain array `notes`.
- `JSON.stringify(notes)` turns that array into a string like `["first note","second note"]`.
- `localStorage.setItem('notes', ...)` saves that string under the key `notes`.

**✅ Checkpoint**
Nothing happens automatically yet because we haven't *called* `updateLS()`. Let's do that next.

---

### Step 18: Call updateLS on Every Change

**🎯 Goal**
Actually save whenever the user types or deletes a note.

**💡 Concept**
Saving is only useful if it runs at the right moments: after each edit and after a deletion. We add `updateLS()` to the two listeners we already wrote.

**📝 Code**

```javascript
// goes in script.js — update the delete and input listeners INSIDE addNewNote()
    deleteBtn.addEventListener('click', () => {
        note.remove()

        updateLS()
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target

        main.innerHTML = marked(value)

        updateLS()
    })
```

**🔍 Explanation**
These replace the simpler versions from Steps 15–16. Now every keystroke saves the latest text, and every deletion updates the stored list so the removed note doesn't reappear on reload.

> New notes are saved as soon as you type in them. (An empty note you never type in won't be saved — there's nothing yet to store.)

**✅ Checkpoint**
Type in a note, then open your browser's DevTools → Application → Local Storage. You'll see a `notes` key holding a JSON array of your text. It updates as you type.

---

### Step 19: Load Saved Notes on Page Load

**🎯 Goal**
Rebuild all saved notes automatically when the page opens.

**💡 Concept**
On startup we read the `notes` string, parse it back into an array, and recreate each note by passing its text to `addNewNote(note)`. Passing text means those notes open in **preview mode** (remember the ternary from Step 12).

**📝 Code**

```javascript
// goes in script.js, near the top — right after `const addBtn = ...`
const notes = JSON.parse(localStorage.getItem('notes'))

if(notes) {
    notes.forEach(note => addNewNote(note))
}
```

**🔍 Explanation**

- `localStorage.getItem('notes')` returns the saved string (or `null` if nothing was ever saved).
- `JSON.parse(...)` turns the string back into a real JavaScript array. (`JSON.parse(null)` is `null`, which is safely falsy.)
- The `if(notes)` guard skips everything on a first visit when there's nothing stored.
- `notes.forEach(note => addNewNote(note))` recreates each saved note. Because we pass `text`, each restored card opens showing its rendered Markdown.

> This works even though it's placed *above* `addNewNote`'s definition, thanks to function hoisting (mentioned in Step 11).

**✅ Checkpoint**
Type some notes, refresh the page — they all come back exactly as you left them, in preview mode. The app is complete!

---

## 5. Final Full Code (Reference)

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog==" crossorigin="anonymous" />
    <link rel="stylesheet" href="style.css" />
    <title>Notes App</title>
  </head>
  <body>
    <button class="add" id="add">
      <i class="fas fa-plus"></i> Add note
    </button>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/1.2.2/marked.min.js"></script>
    <script src="script.js"></script>
  </body>
</html>
```

### `style.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap');

* {
  box-sizing: border-box;
  outline: none;
}

body {
  background-color: #7bdaf3;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding-top: 3rem;
}

.add {
  position: fixed;
  top: 1rem;
  right: 1rem;
  background-color: #9ec862;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.add:active {
  transform: scale(0.98);
}

.note {
  background-color: #fff;
  box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.1);
  margin: 30px 20px;
  height: 400px;
  width: 400px;
  overflow-y: scroll;
}

.note .tools {
  background-color: #9ec862;
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
}

.note .tools button {
  background-color: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 0.5rem;
}

.note textarea {
  outline: none;
  font-family: inherit;
  font-size: 1.2rem;
  border: none;
  height: 400px;
  width: 100%;
  padding: 20px;
}

.main {
  padding: 20px;
}

.hidden {
  display: none;
}
```

### `script.js`

```javascript
const addBtn = document.getElementById('add')

const notes = JSON.parse(localStorage.getItem('notes'))

if(notes) {
    notes.forEach(note => addNewNote(note))
}

addBtn.addEventListener('click', () => addNewNote())

function addNewNote(text = '') {
    const note = document.createElement('div')
    note.classList.add('note')

    note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `

    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    textArea.value = text
    main.innerHTML = marked(text)

    deleteBtn.addEventListener('click', () => {
        note.remove()

        updateLS()
    })

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target

        main.innerHTML = marked(value)

        updateLS()
    })

    document.body.appendChild(note)
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea')

    const notes = []

    notesText.forEach(note => notes.push(note.value))

    localStorage.setItem('notes', JSON.stringify(notes))
}
```

---

## 6. Recap & Next Steps

**What you learned:**

- Loading third-party libraries (Font Awesome, marked.js) from a CDN and calling a library function (`marked()`).
- Creating elements with `createElement`, filling them via `innerHTML` template literals, and using ternaries for conditional classes.
- Scoping queries to a specific element with `note.querySelector`, and handling `click` and `input` events.
- Persisting data with `localStorage`: strings only, `JSON.stringify` to save and `JSON.parse` to restore, and its per-origin, per-browser nature.
- The role of function **hoisting** and **default parameters**.

**Enhancement challenges:**

1. **Empty-note cleanup** — automatically delete a note that's left blank when you switch away from it.
2. **Timestamps** — show a "last edited" time on each card and keep it updated.
3. **Sanitize the Markdown** — `innerHTML` with user input can be an XSS risk; render with a safe option or sanitizer so pasted `<script>` can't run.
4. **Add a title field** per note and use it as the card header.
5. **Export/Import** — add buttons to download all notes as a `.json` file and load them back, so notes aren't trapped in one browser.
