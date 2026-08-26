# Sound Board

## 1. Project Overview

A soundboard of buttons — click one and it plays a short sound effect (applause, boo, gasp, tada, victory, wrong). If a sound is already playing, it stops and restarts cleanly so effects never overlap. The buttons are generated dynamically from a JavaScript array rather than hand-written in HTML.

**Key concepts involved:**

- The HTML5 `<audio>` element and controlling it from JavaScript (`play()`, `pause()`, `currentTime`)
- Creating DOM elements on the fly and appending them to the page
- Keeping code DRY (Don't Repeat Yourself) by driving the UI from a data array
- Event listeners on dynamically created elements

**HTML skills you'll gain**

- Using `<audio>` elements as (invisible) sound sources
- Providing an empty container for JavaScript to fill

**CSS skills you'll gain**

- Centering and wrapping items with Flexbox (`flex-wrap`)
- Styling buttons and adding `:hover` / `:focus` polish

**JavaScript skills you'll gain**

- Looping over an array with `forEach`
- Creating elements with `document.createElement` and inserting them with `appendChild`
- Adding classes and text to created elements
- Attaching click handlers inside a loop
- Selecting elements by id with `getElementById`
- Controlling audio playback (play, pause, rewind) and writing a reusable "stop everything" helper

---

## 2. Final Project Preview

**Layout & colors**

- A solid purple page.
- Six rounded, darker-purple buttons centered on the screen, each labeled with a sound name: `applause`, `boo`, `gasp`, `tada`, `victory`, `wrong`.
- Buttons wrap onto multiple lines if the window is narrow.

**Behavior & interactions**

- Click a button → the matching sound plays.
- Click another button (or the same one) while a sound is playing → the current sound stops and restarts from the beginning, so only one plays at a time.
- Buttons fade slightly on hover.

**What you can interact with**

- The six sound buttons (click to play)

---

## 3. Prerequisites

**You should know:** basic HTML, basic CSS, and basic JS (variables, functions, loops).

**Tools needed:**

- A modern browser
- A text editor (VS Code recommended)
- Optional: VS Code "Live Server" for auto-reload
- **Six MP3 sound files** inside a `sounds/` subfolder, named to match the ids below.

**Files to create:**

```
sound-board/
├── index.html
├── style.css
├── script.js
└── sounds/
    ├── applause.mp3
    ├── boo.mp3
    ├── gasp.mp3
    ├── tada.mp3
    ├── victory.mp3
    └── wrong.mp3
```

Start with `index.html`, `style.css`, and `script.js` **empty**. You'll need real `.mp3` files in `sounds/` for the audio to play (any short clips will do, as long as the filenames match).

---

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML skeleton

**🎯 Goal**
Set up the document and link the stylesheet and script.

**💡 Concept**
Standard boilerplate; the script loads at the end of `<body>` so the page structure exists first.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Sound Board</title>
  </head>
  <body>

    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**

- The usual head tags plus a link to `style.css` and a deferred `script.js` at the bottom.

**✅ Checkpoint**
Open `index.html`. Blank page, tab titled "Sound Board", no errors.

---

### Step 2: Add the audio elements and a button container

**🎯 Goal**
Load the six sounds and provide an empty box for JavaScript to fill with buttons.

**💡 Concept**
An `<audio>` element without a `controls` attribute is invisible — it's just a handle we can `play()` from JavaScript. Each gets an `id` matching its sound name so we can find it easily. The empty `<div id="buttons">` is a placeholder the script will populate.

**📝 Code**

```html
<!-- goes in index.html, inside <body> above the <script> -->
<audio id="applause" src="sounds/applause.mp3"></audio>
<audio id="boo" src="sounds/boo.mp3"></audio>
<audio id="gasp" src="sounds/gasp.mp3"></audio>
<audio id="tada" src="sounds/tada.mp3"></audio>
<audio id="victory" src="sounds/victory.mp3"></audio>
<audio id="wrong" src="sounds/wrong.mp3"></audio>

<div id="buttons"></div>
```

**🔍 Explanation**

- Each `<audio>` points at a file in the `sounds/` folder. No `controls`, so nothing shows on screen — these are purely programmatic sound sources.
- The `id` on each (`applause`, `boo`, …) matches the sound name; we'll reuse those exact names in the JS array so `getElementById(sound)` finds the right one.
- `<div id="buttons">` is empty for now; the script will create and drop buttons inside it.

**✅ Checkpoint**
Refresh. Still a blank page (audio elements and an empty div are invisible), but no errors.

---

### Step 3: Import the font, reset the box model, and center the page

**🎯 Goal**
Set the purple background and center the (soon-to-exist) buttons, allowing them to wrap.

**💡 Concept**
`display: flex` with `flex-wrap: wrap` centers items and lets them flow onto new lines when there isn't enough horizontal room.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: rgb(161, 100, 223);
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}
```

**🔍 Explanation**

- `@import` loads the Poppins font (first line of the file).
- `body` fills the viewport (`100vh`), uses a purple background, and becomes a centered flex container. `flex-wrap: wrap` means buttons wrap to the next row on narrow screens.

**✅ Checkpoint**
Refresh. The page is now solid purple. Nothing else yet — buttons come from JavaScript.

---

### Step 4: Style the buttons

**🎯 Goal**
Define how each generated button looks, including hover and focus states.

**💡 Concept**
We style a `.btn` class now, even though no buttons exist yet — the JS will add this class to each button it creates, so they'll pick up these styles instantly.

**📝 Code**

```css
/* goes in style.css */
.btn {
  background-color: rebeccapurple;
  border-radius: 5px;
  border: none;
  color: #fff;
  margin: 1rem;
  padding: 1.5rem 3rem;
  font-size: 1.2rem;
  font-family: inherit;
  cursor: pointer;
}

.btn:hover {
  opacity: 0.9;
}

.btn:focus {
  outline: none;
}
```

**🔍 Explanation**

- `.btn` gives a darker purple (`rebeccapurple`) rounded button with white text, generous padding, and the inherited Poppins font. `cursor: pointer` shows a hand on hover.
- `:hover { opacity: 0.9 }` fades the button slightly when hovered.
- `:focus { outline: none }` removes the default focus ring.

**✅ Checkpoint**
Still just a purple page — the buttons don't exist yet, but their styling is ready and waiting.

---

### Step 5: Define the list of sounds

**🎯 Goal**
Create a single array of sound names that drives everything.

**💡 Concept**
Storing the names in one array means we build all six buttons (and later stop all six sounds) with a loop, instead of copy-pasting code six times. These strings must match the `<audio>` element `id`s exactly.

**📝 Code**

```js
// goes in script.js
const sounds = ['applause', 'boo', 'gasp', 'tada', 'victory', 'wrong']
```

**🔍 Explanation**

- Each string is both the button's label **and** the id of its `<audio>` element — that dual purpose is what keeps the code so short.

**✅ Checkpoint**
No visible change. In the browser console, type `sounds` — you should see the array of six names.

---

### Step 6: Generate a button for each sound

**🎯 Goal**
Loop over the array and create a labeled button for every sound, adding each to the page.

**💡 Concept**
`document.createElement` builds an element in memory; you configure it (class, text), then `appendChild` inserts it into the visible DOM.

**📝 Code**

```js
// goes in script.js
sounds.forEach(sound => {
    const btn = document.createElement('button')
    btn.classList.add('btn')

    btn.innerText = sound

    document.getElementById('buttons').appendChild(btn)
})
```

**🔍 Explanation**

- `sounds.forEach(sound => { ... })` runs the block once per name, with `sound` holding the current name.
- `document.createElement('button')` makes a new `<button>`; `btn.classList.add('btn')` gives it our styled class.
- `btn.innerText = sound` labels it (e.g. "applause").
- `document.getElementById('buttons').appendChild(btn)` drops it into the `#buttons` container.

**✅ Checkpoint**
Refresh. Six purple buttons appear, centered and labeled with the sound names. Clicking them does nothing yet.

---

### Step 7: Play the sound when a button is clicked

**🎯 Goal**
Make each button play its matching audio on click.

**💡 Concept**
Because the button label equals the audio element's id, we can pass `sound` straight into `getElementById(sound)` to grab the right `<audio>` and call `.play()` on it.

**📝 Code**

```js
// goes in script.js, INSIDE the forEach, after `btn.innerText = sound`
    btn.addEventListener('click', () => {
        document.getElementById(sound).play()
    })
```

> Place this between `btn.innerText = sound` and the `appendChild` line from Step 6.

**🔍 Explanation**

- We attach a `click` listener to each button as it's created. The arrow function captures that iteration's `sound` value.
- `document.getElementById(sound)` finds the `<audio>` whose id matches, and `.play()` starts playback.

**✅ Checkpoint**
Refresh and click a button. You should hear the sound. But click several quickly and they overlap/pile up — we'll fix that next. (Note: browsers only allow audio after a user interaction like a click, which is exactly what we have here.)

---

### Step 8: Stop any playing sound before starting a new one

**🎯 Goal**
Ensure only one sound plays at a time by resetting all sounds before playing the clicked one.

**💡 Concept**
The audio API has no `stop()` method — the idiom is `pause()` then set `currentTime = 0` to rewind to the start. We wrap that in a reusable `stopSongs()` helper and call it at the top of every click.

**📝 Code**

```js
// goes in script.js — add the stopSongs() call inside the click handler:
    btn.addEventListener('click', () => {
        stopSongs()

        document.getElementById(sound).play()
    })
```

```js
// goes in script.js, AFTER the forEach loop (at the bottom of the file)
function stopSongs() {
    sounds.forEach(sound => {
        const song = document.getElementById(sound)

        song.pause()
        song.currentTime = 0;
    })
}
```

**🔍 Explanation**

- `stopSongs()` loops through every sound, grabs its `<audio>` element, `pause()`s it, and rewinds it with `currentTime = 0`. Together those two lines act as a "stop and reset."
- Calling `stopSongs()` first in the click handler guarantees a clean slate, so the newly clicked sound always starts fresh and nothing overlaps.

**✅ Checkpoint**
Refresh. Click one sound, then quickly click another — the first cuts off and the new one starts from the beginning. Only one sound plays at a time. Done!

---

## 5. Final Full Code (Reference)

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Sound Board</title>
  </head>
  <body>
    <audio id="applause" src="sounds/applause.mp3"></audio>
    <audio id="boo" src="sounds/boo.mp3"></audio>
    <audio id="gasp" src="sounds/gasp.mp3"></audio>
    <audio id="tada" src="sounds/tada.mp3"></audio>
    <audio id="victory" src="sounds/victory.mp3"></audio>
    <audio id="wrong" src="sounds/wrong.mp3"></audio>

    <div id="buttons"></div>

    <script src="script.js"></script>
  </body>
</html>
```

```css
/* style.css */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: rgb(161, 100, 223);
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.btn {
  background-color: rebeccapurple;
  border-radius: 5px;
  border: none;
  color: #fff;
  margin: 1rem;
  padding: 1.5rem 3rem;
  font-size: 1.2rem;
  font-family: inherit;
  cursor: pointer;
}

.btn:hover {
  opacity: 0.9;
}

.btn:focus {
  outline: none;
}
```

```js
// script.js
const sounds = ['applause', 'boo', 'gasp', 'tada', 'victory', 'wrong']

sounds.forEach(sound => {
    const btn = document.createElement('button')
    btn.classList.add('btn')

    btn.innerText = sound

    btn.addEventListener('click', () => {
        stopSongs()

        document.getElementById(sound).play()
    })

    document.getElementById('buttons').appendChild(btn)
})

function stopSongs() {
    sounds.forEach(sound => {
        const song = document.getElementById(sound)

        song.pause()
        song.currentTime = 0;
    })
}
```

---

## 6. Recap & Next Steps

**What you learned**

- Using invisible `<audio>` elements as programmatic sound sources
- Generating UI from a data array instead of hardcoding it
- Creating, configuring, and appending elements with `createElement` / `appendChild`
- Attaching click handlers inside a loop
- Controlling audio with `play()`, `pause()`, and `currentTime`, and why "stop" = pause + rewind

**Enhancement challenges**

1. **Add more sounds** — drop new `.mp3`s in `sounds/`, add matching `<audio>` tags, and add their names to the array. The buttons build themselves.
2. **Show a "now playing" label** that updates to the current sound's name.
3. **Add a global Stop button** that calls `stopSongs()` without playing anything.
4. **Give each button its own color** based on its index.
5. **Add keyboard shortcuts** — play sounds with number keys (1–6) using a `keydown` listener.
