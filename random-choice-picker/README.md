# Random Choice Picker

## 1. Project Overview

Type a list of options separated by commas, press **Enter**, and the app flashes through them like a slot machine before landing on one **randomly chosen** option.

**Key concepts involved:**

- Reading live input from a `<textarea>`
- Turning a string into an array (`split`, `filter`, `map`)
- Creating and injecting DOM elements from data
- Timers: `setInterval` and `setTimeout` to build a timed animation
- Randomness with `Math.random()`

**HTML skills you'll gain:**

- Using a `<textarea>` for multi-line input
- Placeholder text and element IDs as JavaScript hooks

**CSS skills you'll gain:**

- Full-screen centering with Flexbox
- Pill-shaped "tag" badges with `border-radius`
- A `.highlight` state class to spotlight the selected tag

**JavaScript skills you'll gain:**

- `getElementById` and programmatic `.focus()`
- The `keyup` event and reading `e.target.value` / `e.key`
- Array pipeline: `split(',')` → `filter()` → `map()`
- Building elements with `createElement`, `classList.add`, `innerText`, `appendChild`
- Orchestrating animation with `setInterval` + `clearInterval` + `setTimeout`
- Generating a random array index

---

## 2. Final Project Preview

**Layout & colors:** A blue full-screen page, content centered. At the top, white instructional text. Below it, a white multi-line text box. Under that, any options you type appear as **orange pill-shaped tags**.

**Behavior & interactions:**

- The text box is **auto-focused** on load, so you can type immediately.
- As you type, options separated by commas instantly appear as tags below (updating on every keystroke).
- Pressing **Enter** clears the text box and starts a selection animation: tags briefly flash **dark blue** one after another (about 3 seconds), then the animation stops and one final tag stays highlighted dark blue — that's the winner.

**What you can interact with:** the textarea (type options, press Enter).

---

## 3. Prerequisites

**You should know:** basic HTML, CSS selectors/properties, and JavaScript basics including arrays and arrow functions.

**Tools needed:**

- A modern web browser
- A text editor (VS Code, etc.)
- Optional: the **Live Server** extension for auto-reload

**Files to create:**

```
random-choice-picker/
├── index.html
├── style.css
└── script.js
```

---

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML skeleton

**🎯 Goal**
Lay down a valid HTML5 document and link the stylesheet.

**💡 Concept**
Standard boilerplate plus a `<link>` to our CSS file, which we'll fill in later.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Random Choice Picker</title>
  </head>
  <body>
  </body>
</html>
```

**🔍 Explanation**
The usual meta tags for encoding and mobile scaling, a link to `style.css`, and a page title.

**✅ Checkpoint**
A blank page titled "Random Choice Picker" in the browser tab.

---

### Step 2: Add the container and instructions

**🎯 Goal**
Give the user instructions on how to use the app.

**💡 Concept**
A wrapping `.container` lets us control the width of everything inside. `<br>` forces a line break inside the heading.

**📝 Code**

```html
<!-- goes in index.html, inside <body> -->
<div class="container">
  <h3>Enter all of the choices divided by a comma (','). <br> Press enter when you're done</h3>
</div>
```

**🔍 Explanation**
The `.container` div holds the whole widget. The `<h3>` explains the two-step usage, split across two lines with `<br>`.

**✅ Checkpoint**
You see the instruction text in the top-left (unstyled).

---

### Step 3: Add the textarea and the tags holder

**🎯 Goal**
Provide the input box and an empty container where tags will appear.

**💡 Concept**
The `id` attributes (`textarea`, `tags`) are the hooks JavaScript will use to find these elements. The tags `<div>` starts empty — we'll fill it dynamically.

**📝 Code**

```html
<!-- goes in index.html, inside .container, below the <h3> -->
<textarea placeholder="Enter choices here..." id="textarea"></textarea>

<div id="tags"></div>
```

**🔍 Explanation**

- `<textarea>` is a multi-line text input; `placeholder` shows hint text when empty.
- `id="textarea"` and `id="tags"` uniquely identify these elements for JavaScript.
- `#tags` is empty now; JS will insert tag `<span>`s into it.

**✅ Checkpoint**
An empty text box appears with the placeholder "Enter choices here...". Nothing happens yet when you type.

---

### Step 4: Base styles — font, centering, background

**🎯 Goal**
Center everything on a blue full-height page and set the font.

**💡 Concept**
Making `body` a **flex column** with centered items, plus `height: 100vh`, is the classic recipe for vertically + horizontally centering content on the whole screen. `overflow: hidden` prevents scrollbars if tags overflow.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #2b88f0;
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
- `box-sizing: border-box` on everything = predictable sizing.
- `display: flex; flex-direction: column` stacks children vertically; `align-items` + `justify-content: center` center them both ways.
- `height: 100vh` makes the body fill the viewport; `margin: 0` removes the default body gap.

**✅ Checkpoint**
The page is blue and the instructions + text box are centered on screen.

---

### Step 5: Style the heading, container, and textarea

**🎯 Goal**
Make the text white, fix the container width, and style the input box.

**💡 Concept**
`font-family: inherit` on the textarea makes it use the page font instead of the browser default. Removing the focus `outline` is a cosmetic choice.

**📝 Code**

```css
/* goes in style.css */
h3 {
  color: #fff;
  margin: 10px 0 20px;
  text-align: center;
}

.container {
  width: 500px;
}

textarea {
  border: none;
  display: block;
  width: 100%;
  height: 100px;
  font-family: inherit;
  padding: 10px;
  margin: 0 0 20px;
  font-size: 16px;
}

textarea:focus {
  outline: none;
}
```

**🔍 Explanation**

- White, centered heading.
- `.container` is fixed at 500px wide; the textarea's `width: 100%` fills that.
- The textarea loses its border, uses the inherited font, and gets comfortable padding.

**✅ Checkpoint**
The heading is white and centered; the text box is a clean 500px-wide white box.

---

### Step 6: Style the tags

**🎯 Goal**
Design the orange pill tags and the dark-blue highlighted state.

**💡 Concept**
`display: inline-block` lets tags sit side-by-side and wrap to the next line. The `.highlight` modifier class is what the JS animation will toggle to spotlight a tag.

**📝 Code**

```css
/* goes in style.css */
.tag {
  background-color: #f0932b;
  color: #fff;
  border-radius: 50px;
  padding: 10px 20px;
  margin: 0 5px 10px 0;
  font-size: 14px;
  display: inline-block;
}

.tag.highlight {
  background-color: #273c75;
}
```

**🔍 Explanation**

- `.tag` is an orange pill (`border-radius: 50px` rounds it fully) with white text.
- `.tag.highlight` overrides the background to dark blue — applied only when both classes are present.

**✅ Checkpoint**
No visual change yet (there are no tags in the HTML). These styles are ready for the JS to use.

---

### Step 7: Grab elements and auto-focus the textarea

**🎯 Goal**
Connect JavaScript to the page and put the cursor in the text box on load.

**💡 Concept**
Caching element references in variables avoids repeated DOM lookups. `.focus()` programmatically places the text cursor into an element.

**📝 Code**
First, load the script (add just before `</body>`):

```html
<!-- goes in index.html, just before </body> -->
<script src="script.js"></script>
```

Then:

```js
// goes in script.js
const tagsEl = document.getElementById('tags')
const textarea = document.getElementById('textarea')

textarea.focus()
```

**🔍 Explanation**

- `tagsEl` points to the empty `#tags` container; `textarea` points to the input.
- `textarea.focus()` runs immediately, so the box is ready for typing on page load.

**✅ Checkpoint**
Reload — the text cursor is already blinking inside the text box.

---

### Step 8: Build tags live as the user types

**🎯 Goal**
On every keystroke, read the textarea and (soon) turn its contents into tags.

**💡 Concept**
The `keyup` event fires each time a key is released. `e.target.value` is the textarea's current text. We pass it to a `createTags` helper (defined next).

**📝 Code**

```js
// goes in script.js
textarea.addEventListener('keyup', (e) => {
    createTags(e.target.value)
})
```

**🔍 Explanation**

- We listen for `keyup` on the textarea.
- `e` is the event object; `e.target` is the textarea; `e.target.value` is what's typed.
- We hand that text to `createTags`, which we'll write in the next step.

**✅ Checkpoint**
Typing does nothing visible yet and the console will show a `createTags is not defined` error — that's expected; we fix it next.

---

### Step 9: Write the createTags function

**🎯 Goal**
Convert the comma-separated text into clean tag elements on screen.

**💡 Concept**
A classic array pipeline: `split(',')` breaks the string into pieces, `filter` drops empty pieces, and `map` trims whitespace. Then we rebuild the tags container from scratch each time.

**📝 Code**

```js
// goes in script.js
function createTags(input) {
    const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim())
    
    tagsEl.innerHTML = ''

    tags.forEach(tag => {
        const tagEl = document.createElement('span')
        tagEl.classList.add('tag')
        tagEl.innerText = tag
        tagsEl.appendChild(tagEl)
    })
}
```

**🔍 Explanation**

- `input.split(',')` turns `"a, b,"` into `["a", " b", ""]`.
- `.filter(tag => tag.trim() !== '')` removes blank entries (like the trailing `""`).
- `.map(tag => tag.trim())` strips surrounding spaces from each.
- `tagsEl.innerHTML = ''` clears old tags so we don't get duplicates.
- For each cleaned option we create a `<span class="tag">`, set its text, and append it to `#tags`.

**✅ Checkpoint**
Type `apple, banana, cherry` — three orange tags appear instantly and update as you keep typing.

---

### Step 10: Add the random-picking helpers

**🎯 Goal**
Create small utilities to pick a random tag and toggle its highlight.

**💡 Concept**
`Math.random()` returns a number from 0 up to (but not including) 1. Multiplying by the count and flooring gives a valid random array index. Separating tiny helpers keeps the animation code readable.

**📝 Code**

```js
// goes in script.js
function pickRandomTag() {
    const tags = document.querySelectorAll('.tag')
    return tags[Math.floor(Math.random() * tags.length)]
}

function highlightTag(tag) {
    tag.classList.add('highlight')
}

function unHighlightTag(tag) {
    tag.classList.remove('highlight')
}
```

**🔍 Explanation**

- `pickRandomTag` re-queries all `.tag` elements and returns one at a random index.
- `highlightTag` / `unHighlightTag` simply add/remove the `highlight` class (turning a tag dark blue or back to orange).

**✅ Checkpoint**
No visible change yet — these are called by the animation we build next. Save and confirm there are no console errors.

---

### Step 11: Build the slot-machine animation

**🎯 Goal**
Flash random tags for a few seconds, then settle on a final winner.

**💡 Concept**
`setInterval` runs code repeatedly on a timer; `setTimeout` runs code once after a delay. We flash a random tag every 100ms, and after `times * 100`ms we `clearInterval` to stop, then highlight one last tag as the final pick.

**📝 Code**

```js
// goes in script.js
function randomSelect() {
    const times = 30

    const interval = setInterval(() => {
        const randomTag = pickRandomTag()

        if (randomTag !== undefined) {
            highlightTag(randomTag)

            setTimeout(() => {
                unHighlightTag(randomTag)
            }, 100)
        }
    }, 100)

    setTimeout(() => {
        clearInterval(interval)

        setTimeout(() => {
            const randomTag = pickRandomTag()

            highlightTag(randomTag)
        }, 100)
    }, times * 100)
}
```

**🔍 Explanation**

- `times = 30` and the 100ms interval mean the flashing lasts about 3 seconds.
- Every 100ms we pick a random tag, highlight it, and un-highlight it 100ms later — creating the flicker.
- The `if (randomTag !== undefined)` guard avoids errors if no tags exist.
- After `times * 100` (3000ms), `clearInterval(interval)` stops the flicker; a final `setTimeout` picks one more tag and leaves it highlighted as the winner.

**✅ Checkpoint**
Still nothing triggers it yet — we connect it to the Enter key next.

---

### Step 12: Trigger the pick on Enter

**🎯 Goal**
When the user presses Enter, clear the box and run the selection animation.

**💡 Concept**
`e.key === 'Enter'` detects the Enter key inside our existing `keyup` handler. A tiny `setTimeout` delays clearing the value so the newline character doesn't linger.

**📝 Code**
Update the `keyup` listener from Step 8 to include the Enter check:

```js
// goes in script.js — replaces the listener from Step 8
textarea.addEventListener('keyup', (e) => {
    createTags(e.target.value)

    if(e.key === 'Enter') {
        setTimeout(() => {
            e.target.value = ''
        }, 10)

        randomSelect()
    }
})
```

**🔍 Explanation**

- We still rebuild tags on every keystroke via `createTags`.
- When the released key is Enter, we clear the textarea after a 10ms delay (so the tags already built from the current text stay put) and call `randomSelect()` to start the animation.

**✅ Checkpoint**
Type several comma-separated options and press Enter: the box clears, tags flash dark blue in sequence for ~3 seconds, then one tag stays highlighted as the winner. 🎉

---

## 5. Final Full Code (Reference)

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Random Choice Picker</title>
  </head>
  <body>
    <div class="container">
      <h3>Enter all of the choices divided by a comma (','). <br> Press enter when you're done</h3>
      <textarea placeholder="Enter choices here..." id="textarea"></textarea>

      <div id="tags"></div>
    </div>

    <script src="script.js"></script>
  </body>
</html>
```

**style.css**

```css
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #2b88f0;
  font-family: 'Muli', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

h3 {
  color: #fff;
  margin: 10px 0 20px;
  text-align: center;
}

.container {
  width: 500px;
}

textarea {
  border: none;
  display: block;
  width: 100%;
  height: 100px;
  font-family: inherit;
  padding: 10px;
  margin: 0 0 20px;
  font-size: 16px;
}

textarea:focus {
  outline: none;
}

.tag {
  background-color: #f0932b;
  color: #fff;
  border-radius: 50px;
  padding: 10px 20px;
  margin: 0 5px 10px 0;
  font-size: 14px;
  display: inline-block;
}

.tag.highlight {
  background-color: #273c75;
}
```

**script.js**

```js
const tagsEl = document.getElementById('tags')
const textarea = document.getElementById('textarea')

textarea.focus()

textarea.addEventListener('keyup', (e) => {
    createTags(e.target.value)

    if(e.key === 'Enter') {
        setTimeout(() => {
            e.target.value = ''
        }, 10)

        randomSelect()
    }
})

function createTags(input) {
    const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim())
    
    tagsEl.innerHTML = ''

    tags.forEach(tag => {
        const tagEl = document.createElement('span')
        tagEl.classList.add('tag')
        tagEl.innerText = tag
        tagsEl.appendChild(tagEl)
    })
}

function randomSelect() {
    const times = 30

    const interval = setInterval(() => {
        const randomTag = pickRandomTag()

        if (randomTag !== undefined) {
            highlightTag(randomTag)

            setTimeout(() => {
                unHighlightTag(randomTag)
            }, 100)
        }
    }, 100)

    setTimeout(() => {
        clearInterval(interval)

        setTimeout(() => {
            const randomTag = pickRandomTag()

            highlightTag(randomTag)
        }, 100)
    }, times * 100)
}

function pickRandomTag() {
    const tags = document.querySelectorAll('.tag')
    return tags[Math.floor(Math.random() * tags.length)]
}

function highlightTag(tag) {
    tag.classList.add('highlight')
}

function unHighlightTag(tag) {
    tag.classList.remove('highlight')
}
```

---

## 6. Recap & Next Steps

**What you learned:**

- Reading live input with the `keyup` event and `e.target.value`.
- Detecting a specific key with `e.key`.
- The `split` → `filter` → `map` string-to-array pipeline for cleaning input.
- Building DOM elements with `createElement`, `classList.add`, `innerText`, and `appendChild`.
- Rebuilding a container from scratch (`innerHTML = ''`) to keep it in sync with data.
- Coordinating a timed animation with `setInterval`, `clearInterval`, and `setTimeout`.
- Picking a random array element with `Math.random()` and `Math.floor()`.

**Enhancement challenges:**

1. **Announce the winner:** display the chosen option in a big label above the tags when the animation ends.
2. **Ease the flicker:** gradually slow the interval near the end so it feels like a real slot machine.
3. **Persist choices:** save the last list to `localStorage` and restore it on reload.
4. **Prevent empty runs:** ignore Enter (or show a hint) if there are fewer than two tags.
5. **Add a Pick button:** let users trigger a new draw without retyping and re-pressing Enter.
