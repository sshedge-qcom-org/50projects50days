# Auto Text Effect

## 1. Project Overview

This project builds an **auto-typing (typewriter) effect**: a headline types itself out one character at a time, loops forever, and includes a control that lets you speed it up or slow it down in real time.

**Key concepts involved:** string slicing, a self-scheduling `setTimeout` loop, reading a number input, and updating a variable live from user input.

You will gain these skills:

- **HTML skills**
  - Using a number `<input>` with `min`, `max`, `step`, and a default `value`
  - Pairing a `<label>` with an input via `for`
  - Marking a text element with an `id` for scripting
- **CSS skills**
  - Centering content with Flexbox
  - Pinning a control to the bottom of the screen with `position: absolute`
  - Styling a minimal, borderless number input
- **JavaScript skills**
  - Extracting part of a string with `slice`
  - Building an animation loop with a self-calling `setTimeout`
  - Controlling loop speed with a variable
  - Reacting to the `input` event to update behavior instantly

## 2. Final Project Preview

**Layout & colors:** A warm salmon (`darksalmon`) page with a large centered headline. Pinned to the bottom is a small translucent control box containing a "Speed:" label and a tiny number input.

**Behavior & interactions:**
- On load, the headline immediately begins **typing out** the text "We Love Programming!" one letter at a time.
- When the full sentence is reached, it **resets and starts over**, looping endlessly.
- Changing the **Speed** number (1–10) makes typing faster (higher number) or slower (lower number), and the change takes effect immediately.

**What you can interact with:** the Speed number input (type a value or use the up/down arrows).

## 3. Prerequisites

- **Basic knowledge:** HTML tags, CSS rules, and JavaScript variables/functions. The typing loop and string slicing are explained as we go.
- **Tools needed:**
  - A modern browser and a text editor (VS Code recommended)
  - *Optional:* the VS Code **Live Server** extension
- **Files to create:**

```
auto-text-effect/
├── index.html
├── style.css
└── script.js
```

Create these three empty files to start.

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML skeleton

**🎯 Goal**
Set up a valid HTML document that loads the stylesheet and script.

**💡 Concept**
The standard HTML5 boilerplate with the script linked at the bottom of `<body>` ensures our elements exist before the script runs.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Auto Text Effect</title>
  </head>
  <body>
    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**
- The two `<meta>` tags handle character encoding and mobile scaling.
- `<link>` connects `style.css`; `<script>` at the bottom loads our JavaScript after the DOM is built.

**✅ Checkpoint**
Open `index.html`. Blank page, but the tab title reads "Auto Text Effect".

---

### Step 2: Add the headline and speed control

**🎯 Goal**
Add the headline that will be typed into, plus the number input that controls typing speed.

**💡 Concept**
The `<h1 id="text">` starts with placeholder text; JavaScript will overwrite it. A number `<input>` with `min`/`max`/`step` restricts what the user can enter and gives arrow-button stepping.

**📝 Code**

```html
<!-- goes in index.html, inside <body> above the <script> tag -->
<h1 id="text">Starting...</h1>

<div>
  <label for="speed">Speed:</label>
  <input type="number" name="speed" id="speed" value="1" min="1" max="10" step="1">
</div>
```

**🔍 Explanation**
- `<h1 id="text">Starting...</h1>` — "Starting..." is just a placeholder; the script replaces it the moment it runs.
- `<label for="speed">` is tied to the input via matching `for`/`id`, so clicking the label focuses the input.
- `type="number"` with `value="1"` (default), `min="1"`, `max="10"`, and `step="1"` gives a whole-number spinner from 1 to 10.

**✅ Checkpoint**
Refresh. You'll see "Starting..." and a small "Speed:" input showing `1`. No animation yet.

---

### Step 3: Import the font and reset the box model

**🎯 Goal**
Load the Roboto font and normalize element sizing.

**💡 Concept**
`box-sizing: border-box` on all elements keeps padding/borders inside declared sizes — a standard reset.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}
```

**🔍 Explanation**
- `@import` (first line) loads the **Roboto** font from Google Fonts.
- `*` applies the border-box model everywhere.

**✅ Checkpoint**
No visible change yet; the font is now available.

---

### Step 4: Style and center the page

**🎯 Goal**
Give the page its salmon background and center the headline.

**💡 Concept**
A full-height Flexbox column centers the headline, while `overflow: hidden` avoids scrollbars.

**📝 Code**

```css
/* goes in style.css */
body {
  background-color: darksalmon;
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
- `background-color: darksalmon` sets the warm background (a CSS named color).
- The Flexbox trio plus `height: 100vh` centers the headline on screen.
- `overflow: hidden` and `margin: 0` keep the layout clean and edge-to-edge.

**✅ Checkpoint**
Refresh. The page is salmon-colored with "Starting..." centered.

---

### Step 5: Style the speed control box and input

**🎯 Goal**
Pin the speed control to the bottom of the screen and style the input to blend in.

**💡 Concept**
`position: absolute` with `bottom: 20px` lifts the control out of the centered flow and anchors it near the bottom edge. Styling the input with the same background as the page makes it look minimal.

**📝 Code**

```css
/* goes in style.css */
div {
  position: absolute;
  bottom: 20px;
  background: rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  font-size: 18px;
}

input {
  width: 50px;
  padding: 5px;
  font-size: 18px;
  background-color: darksalmon;
  border: none;
  text-align: center;
}

input:focus {
  outline: none;
}
```

**🔍 Explanation**
- The `div` selector styles our control box: `position: absolute` + `bottom: 20px` pins it near the bottom; the semi-transparent black background (`rgba(0,0,0,0.1)`) gives a subtle tint. (There's only one `<div>` on the page, so styling the bare `div` tag is fine here.)
- The `input` matches the page background, drops its border, and centers its digits.
- `input:focus { outline: none }` removes the default focus ring.

**✅ Checkpoint**
Refresh. The "Speed:" control now sits in a faint box at the bottom, with the input blended into the background.

---

### Step 6: Select elements and set up state

**🎯 Goal**
Grab the headline and input, and define the text to type plus the loop's starting values.

**💡 Concept**
`idx` (index) tracks *how many characters* to show so far. `speed` is the delay between characters — computed from the input's value so a bigger number means a shorter delay (faster typing).

**📝 Code**

```js
// goes in script.js
const textEl = document.getElementById('text')
const speedEl = document.getElementById('speed')
const text = 'We Love Programming!'
let idx = 1
let speed = 300 / speedEl.value
```

**🔍 Explanation**
- `textEl` is the headline; `speedEl` is the number input.
- `text` holds the full sentence to type out.
- `idx = 1` means we'll start by showing the first character.
- `speed = 300 / speedEl.value` — with the default value `1`, that's `300`ms per character. A value of `10` gives `30`ms (much faster). Dividing by the value is what makes a *higher* number type *faster*.

**✅ Checkpoint**
Open the console — no errors. Type `speed` and press Enter; it should log `300`.

---

### Step 7: Write the typing function

**🎯 Goal**
Create `writeText`, which shows a growing slice of the sentence and loops the index back to the start when finished.

**💡 Concept**
`text.slice(0, idx)` returns the first `idx` characters of the string. By increasing `idx` over time, the visible text grows one letter at a time. When `idx` passes the end, we reset it to loop.

**📝 Code**

```js
// goes in script.js
function writeText() {
    textEl.innerText = text.slice(0, idx)

    idx++

    if(idx > text.length) {
        idx = 1
    }
}
```

**🔍 Explanation**
- `text.slice(0, idx)` grabs characters from position `0` up to (but not including) `idx` — e.g. with `idx = 3`, "We ".
- `textEl.innerText = ...` displays that slice, replacing the "Starting..." placeholder.
- `idx++` grows the slice for next time.
- `if(idx > text.length) { idx = 1 }` resets once the whole sentence has shown, so it can start over.

**✅ Checkpoint**
In the console, run `writeText()` a few times. Each call adds one more character to the headline ("W", then "We", then "We "...). It doesn't loop on its own yet — that's next.

---

### Step 8: Make it loop automatically

**🎯 Goal**
Turn the one-shot function into a continuous animation that types on its own.

**💡 Concept**
A function that schedules *itself* with `setTimeout` creates a repeating loop. Because we re-read the `speed` variable on every tick, the loop's pace can change on the fly.

**📝 Code**

```js
// goes in script.js, add this line at the END of writeText (after the if block)
    setTimeout(writeText, speed)
```

Then, kick off the loop by calling it once. Add this **above** the function definition:

```js
// goes in script.js, place this before the writeText function
writeText()
```

**🔍 Explanation**
- `setTimeout(writeText, speed)` schedules the next run after `speed` milliseconds, so `writeText` calls itself again and again — an endless typing loop.
- The initial `writeText()` call starts the whole thing. (It can sit above the function because `function` declarations are **hoisted** — available before their line in the file.)

**✅ Checkpoint**
Refresh. The headline now types out "We Love Programming!" character by character, then restarts and loops forever. 🎉

---

### Step 9: Let the user change the speed live

**🎯 Goal**
Update the typing speed instantly whenever the user changes the number input.

**💡 Concept**
The `input` event fires on **every** change to the field (typing or clicking the arrows). Updating the `speed` variable there means the next scheduled tick uses the new pace — no restart needed.

**📝 Code**

```js
// goes in script.js
speedEl.addEventListener('input', (e) => speed = 300 / e.target.value)
```

**🔍 Explanation**
- `addEventListener('input', ...)` reacts immediately as the value changes.
- `e.target.value` is the new number; `300 / e.target.value` recomputes the delay.
- Because `writeText` reads `speed` fresh on each `setTimeout`, the new speed takes effect on the very next character.

**✅ Checkpoint**
Refresh and change the Speed input to `10` — typing speeds up dramatically. Set it to `1` — it slows down. The project is complete!

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
    <title>Auto Text Effect</title>
  </head>
  <body>
    <h1 id="text">Starting...</h1>

    <div>
      <label for="speed">Speed:</label>
      <input type="number" name="speed" id="speed" value="1" min="1" max="10" step="1">
    </div>

    <script src="script.js"></script>
  </body>
</html>
```

### style.css

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: darksalmon;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

div {
  position: absolute;
  bottom: 20px;
  background: rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  font-size: 18px;
}

input {
  width: 50px;
  padding: 5px;
  font-size: 18px;
  background-color: darksalmon;
  border: none;
  text-align: center;
}

input:focus {
  outline: none;
}
```

### script.js

```js
const textEl = document.getElementById('text')
const speedEl = document.getElementById('speed')
const text = 'We Love Programming!'
let idx = 1
let speed = 300 / speedEl.value

writeText()

function writeText() {
    textEl.innerText = text.slice(0, idx)

    idx++

    if(idx > text.length) {
        idx = 1
    }

    setTimeout(writeText, speed)
}


speedEl.addEventListener('input', (e) => speed = 300 / e.target.value)
```

## 6. Recap & Next Steps

**What you learned:**
- Building a growing-text effect with `String.slice(0, idx)`
- Creating an animation loop with a self-scheduling `setTimeout`
- Controlling loop speed through a variable and inverting the input value (higher = faster)
- Reacting to the `input` event to update behavior instantly
- Pinning a control with `position: absolute` and centering with Flexbox

**Enhancement challenges:**
1. **Blinking cursor:** append a "|" that blinks with a CSS animation while typing.
2. **Type then delete:** after finishing, delete the text character by character before retyping.
3. **Multiple phrases:** cycle through an array of sentences instead of one fixed string.
4. **Pause/resume:** add a button that stops and restarts the loop.
5. **Speed readout:** show the current characters-per-second next to the input.
