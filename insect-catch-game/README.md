# Insect Catch Game

## 1. Project Overview

A playful "impossible" game: pick your least-favorite insect, then chase and click the bugs as they pop up at random spots on screen. A timer counts up, your score climbs — and because every bug you catch spawns *two more*, you can never win. That's the joke.

**Key concepts involved**

- A **multi-screen** UI built by sliding panels in and out with CSS transitions
- **State** in plain variables (`seconds`, `score`, `selected_insect`)
- **Timers** (`setInterval`, `setTimeout`) for the clock and bug spawning
- **Dynamically creating** and positioning elements at random coordinates
- Event handling, including the `this` keyword inside a handler

**HTML skills you'll gain**

- Structuring several full-screen "screens" that stack vertically
- Building a list of image buttons

**CSS skills you'll gain**

- Full-viewport panels (`100vh` / `100vw`) and sliding them with `margin` + `transition`
- Absolute positioning for a HUD (time/score) and free-floating insects
- Animating scale with `transform` and a `transition` (the "caught" pop)
- Centering an off-screen message and sliding it into view with a state class

**JavaScript skills you'll gain**

- Selecting single and multiple elements (`getElementById`, `querySelectorAll`)
- Reading attributes with `getAttribute`
- Managing simple game state in variables
- `setInterval` vs `setTimeout` and when to use each
- Creating elements, setting inline styles, and positioning them randomly
- Understanding `this` inside a regular-function event handler

---

## 2. Final Project Preview

**Layout & colors**
A bold blue background with a retro pixel font ("Press Start 2P") and white text throughout. The game is three stacked full-screen panels:

1. **Start screen:** the title "Catch The Insect" and a white "Play Game" button.
2. **Choose screen:** "What is your 'favorite' insect?" with four bordered image buttons — Fly, Mosquito, Spider, Roach.
3. **Game screen:** a live "Time: 00:00" clock in the top-left, "Score: 0" in the top-right, and insects that appear at random positions for you to click.

**Behavior & interactions**

- Click **Play Game** → the start screen slides up out of view, revealing the choose screen.
- Click an **insect** → that screen slides up, the timer starts, and bugs begin appearing.
- Click a **bug** → it pops (scales to zero) and disappears, your score goes up by one, and **two more bugs spawn** shortly after (so they multiply).
- Reach a score above 19 → a taunting message slides down: "Are you annoyed yet? You are playing an impossible game!!"

**What you can interact with**

- The "Play Game" button
- The four insect-choice buttons
- Every insect that appears during play

---

## 3. Prerequisites

**Basic knowledge required**

- HTML structure and lists
- CSS positioning, transforms, and transitions
- JavaScript functions, variables, events, and timers

**Tools needed**

- A modern web browser
- A text editor (VS Code recommended)
- Optional: the **Live Server** VS Code extension
- An internet connection (the insect images and font load from the web)

**Files to create**

```
insect-catch-game/
├── index.html
├── style.css
└── script.js
```

Create these three **empty** files to begin.

---

## 4. Build the Project Step-by-Step

### Step 1: Set up the HTML document

**🎯 Goal**
Create the page skeleton and link the stylesheet and script.

**💡 Concept**
The standard HTML5 boilerplate we start every project with.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Catch The Insect</title>
  </head>
  <body>
    <!-- screens go here -->
    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**
Boilerplate with our stylesheet and script wired up. Script at the bottom so the screens exist before JS runs.

**✅ Checkpoint**
Blank page titled "Catch The Insect".

---

### Step 2: Build the start screen

**🎯 Goal**
Add the first full-screen panel with the title and a play button.

**💡 Concept**
Each "page" of the game is a `<div class="screen">`. They're stacked in the HTML; CSS will make each fill the whole viewport, and JS will slide them away one at a time.

**📝 Code**

```html
<!-- goes in index.html, inside <body> -->
<div class="screen">
  <h1>Catch The Insect</h1>
  <button class="btn" id="start-btn">Play Game</button>
</div>
```

**🔍 Explanation**
The first `.screen` holds the title and a button with `id="start-btn"` (the `id` lets JS target it). This is the first thing the player sees.

**✅ Checkpoint**
An unstyled title and a "Play Game" button appear.

---

### Step 3: Build the insect-choice screen

**🎯 Goal**
Add the second panel: a question and four image buttons.

**💡 Concept**
A `<ul>` of buttons, each containing a label and an image, is a clean way to present a set of choices.

**📝 Code**

```html
<!-- goes in index.html, after the first .screen -->
<div class="screen">
  <h1>What is your "favorite" insect?</h1>
  <ul class="insects-list">
    <li>
      <button class="choose-insect-btn">
        <p>Fly</p>
        <img src="http://pngimg.com/uploads/fly/fly_PNG3946.png" alt="fly">
      </button>
    </li>
    <li>
      <button class="choose-insect-btn">
        <p>Mosquito</p>
        <img
           src="http://pngimg.com/uploads/mosquito/mosquito_PNG18175.png"
           alt="mosquito"
           />
      </button>
    </li>
    <li>
      <button class="choose-insect-btn">
        <p>Spider</p>
        <img
           src="http://pngimg.com/uploads/spider/spider_PNG12.png"
           alt="spider"
           />
      </button>
    </li>
    <li>
      <button class="choose-insect-btn">
        <p>Roach</p>
        <img
           src="http://pngimg.com/uploads/roach/roach_PNG12163.png"
           alt="roach"
           />
      </button>
    </li>
  </ul>
</div>
```

**🔍 Explanation**
Four `<li>`s, each with a `.choose-insect-btn` containing a `<p>` label and an `<img>`. The image's `src` and `alt` matter — JS will read them later to know which insect to spawn.

**✅ Checkpoint**
Below the start screen you now see the question and four insect buttons (images load from pngimg.com).

---

### Step 4: Build the game screen

**🎯 Goal**
Add the third panel: the time/score HUD and a hidden taunt message. Then wire up the script.

**💡 Concept**
This screen doubles as the **play area** — insects will be added into it. It also holds the heads-up display (HUD) and a message that stays hidden until you've scored enough.

**📝 Code**

```html
<!-- goes in index.html, after the second .screen -->
<div class="screen game-container" id="game-container">
  <h3 id="time" class="time">Time: 00:00</h3>
  <h3 id="score" class="score">Score: 0</h3>
  <h5 id="message" class="message">
    Are you annoyed yet? <br>
    You are playing an impossible game!!
  </h5>
</div>
```

**🔍 Explanation**

- It's a `.screen` **and** a `.game-container` (two classes) with `id="game-container"` so JS can append insects into it.
- `#time` and `#score` are the HUD readouts.
- `#message` is the taunt — present in the DOM but hidden by CSS until we reveal it.

**✅ Checkpoint**
All three screens' content is now on the page (stacked, unstyled). Confirm your `<script src="script.js">` tag from Step 1 is still the last thing in `<body>`.

---

### Step 5: Base styling — font, body, and buttons

**🎯 Goal**
Set the retro theme and style the "Play Game" button.

**💡 Concept**
`overflow: hidden` on the body is important here — screens live *off-screen* (above and below the viewport), and we don't want scrollbars exposing them.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #516dff;
  color: #fff;
  font-family: 'Press Start 2P', sans-serif;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  text-align: center;
}

a {
  color: #fff;
}

h1 {
  line-height: 1.4;
}

.btn {
  border: 0;
  background-color: #fff;
  color: #516dff;
  padding: 15px 20px;
  font-family: inherit;
  cursor: pointer;
}

.btn:hover {
  opacity: 0.9;
}

.btn:focus {
  outline: 0;
}
```

**🔍 Explanation**

- The pixel font `'Press Start 2P'` sets the arcade tone; blue background, white text.
- `overflow: hidden` hides everything outside the viewport (crucial for the slide effect).
- `.btn` is a white button; `font-family: inherit` makes it use the pixel font too. Hover/focus tweaks add polish.

**✅ Checkpoint**
Blue page, pixel font, a styled white "Play Game" button. Everything is centered text-wise.

---

### Step 6: Make the screens full-viewport and slidable

**🎯 Goal**
Turn each panel into a full-screen box that can slide up out of view.

**💡 Concept**
This is the core trick: each `.screen` is exactly one viewport tall (`100vh`). Adding the class `.up` sets `margin-top: -100vh`, pulling it up by a full screen — and a `transition` animates that move. Since screens are stacked, sliding one up reveals the next.

**📝 Code**

```css
/* goes in style.css */
.screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  transition: margin 0.5s ease-out;
}

.screen.up {
  margin-top: -100vh;
}
```

**🔍 Explanation**

- `.screen`: a centered flex column, exactly `100vh` tall and `100vw` wide. `transition: margin 0.5s ease-out` animates any margin change over half a second.
- `.screen.up`: when JS adds the `up` class to a screen, its `margin-top` becomes `-100vh`, sliding it (and the whole stack below it) up by one screen height — revealing the next panel.

**✅ Checkpoint**
Now only the start screen fills the view; the others are pushed below the fold. (Nothing slides yet — that's JavaScript's job.)

---

### Step 7: Style the insect-choice buttons

**🎯 Goal**
Lay out the four choice buttons and style them.

**💡 Concept**
A flex row that wraps keeps the four buttons tidy on any screen size.

**📝 Code**

```css
/* goes in style.css */
.insects-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style-type: none;
  padding: 0;
}

.insects-list li {
  margin: 10px;
}

.choose-insect-btn {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
  cursor: pointer;
  font-family: inherit;
  width: 150px;
  height: 150px;
}

.choose-insect-btn:hover {
  background-color: #fff;
  color: #516dff;
}

.choose-insect-btn:active {
  background-color: rgba(255, 255, 255, 0.7);
}

.choose-insect-btn img {
  width: 100px;
  height: 100px;
  object-fit: contain;
}
```

**🔍 Explanation**

- `.insects-list` is a centered, wrapping flex row with no bullets.
- `.choose-insect-btn` is a transparent 150×150 box with a white border that **inverts** colors on hover and dims on click (`:active`).
- The image inside is capped at 100×100 with `object-fit: contain` (fits the whole image without cropping).

**✅ Checkpoint**
If you temporarily scroll (or comment out `overflow: hidden`), the choose screen shows four neat insect buttons that invert on hover.

---

### Step 8: Style the HUD (time and score)

**🎯 Goal**
Pin the timer to the top-left and the score to the top-right.

**💡 Concept**
`position: absolute` inside a `position: relative` container lets us place the HUD in fixed corners of the game area, independent of the flex centering.

**📝 Code**

```css
/* goes in style.css */
.game-container {
  position: relative;
}

.time,
.score {
  position: absolute;
  top: 20px;
}

.time {
  left: 20px;
}

.score {
  right: 20px;
}
```

**🔍 Explanation**

- `.game-container` gets `position: relative` so its absolutely-positioned children anchor to *it*.
- `.time` and `.score` are pinned 20px from the top; time to the left, score to the right.

**✅ Checkpoint**
On the game screen, "Time: 00:00" sits top-left and "Score: 0" top-right.

---

### Step 9: Style the taunt message

**🎯 Goal**
Prepare the message so it's hidden by default and slides into view when revealed.

**💡 Concept**
Same reveal pattern as the screens: the element is positioned off-screen with a `transform` and made invisible; a state class (`.visible`) moves it in and fades it up, animated by a `transition`.

**📝 Code**

```css
/* goes in style.css */
.message {
  line-height: 1.7;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  padding: 20px;
  z-index: 100;
  text-align: center;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -150%);
  transition: transform 0.4s ease-in;
}

.message.visible {
  transform: translate(-50%, 150%);
  opacity: 1;
}
```

**🔍 Explanation**

- The message is a semi-transparent black bar, full width, on top of everything (`z-index: 100`).
- `left: 50%` + `translate(-50%, ...)` is the classic horizontal-centering trick. The `-150%` on the Y axis parks it *above* the screen; `opacity: 0` hides it.
- `.message.visible` changes the Y translate to `150%` (down into view) and `opacity: 1`, animated by the `transition`.

**✅ Checkpoint**
The message stays hidden. We'll trigger `.visible` from JS once the score climbs.

---

### Step 10: Style the insects

**🎯 Goal**
Style the free-floating bugs and their "pop when caught" effect.

**💡 Concept**
Insects are absolutely positioned so JS can drop them anywhere. Combining `scale(1)` → `scale(0)` with a `transition` makes a caught bug shrink away smoothly.

**📝 Code**

```css
/* goes in style.css */
.insect {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  position: absolute;
  transform: translate(-50%, -50%) scale(1);
  transition: transform 0.3s ease-in-out;
}

.insect.caught {
  transform: translate(-50%, -50%) scale(0);
}

.insect img {
  width: 100px;
  height: 100px;
}
```

**🔍 Explanation**

- `.insect`: absolutely positioned, 100×100, pointer cursor. `translate(-50%, -50%)` centers the bug on its coordinates (so the point we generate is its *center*, not its top-left). It starts at `scale(1)` (full size).
- `.insect.caught`: keeps the centering but sets `scale(0)` — the bug shrinks to nothing. The `transition` on `.insect` animates that shrink over 0.3s.

**✅ Checkpoint**
No insects exist yet (JS creates them), but the styling is ready. CSS is complete — on to the game logic.

---

### Step 11: Select elements and set up state

**🎯 Goal**
Grab all the elements JS needs and declare the game's state variables.

**💡 Concept**
"State" is just the data that changes as the game runs. Here it's three variables: elapsed `seconds`, the `score`, and which insect the player picked (`selected_insect`).

**📝 Code**

```js
// goes in script.js
const screens = document.querySelectorAll('.screen');
const choose_insect_btns = document.querySelectorAll('.choose-insect-btn');
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')
let seconds = 0
let score = 0
let selected_insect = {}
```

**🔍 Explanation**

- `querySelectorAll('.screen')` returns a **NodeList** of all three screens — we'll access them by index (`screens[0]`, `screens[1]`).
- `choose_insect_btns` is the NodeList of the four choice buttons.
- The rest are single elements grabbed by `id`.
- `seconds`, `score` start at 0; `selected_insect` is an empty object we'll fill when the player picks.

**✅ Checkpoint**
Console: no errors.

---

### Step 12: Start the game on button click

**🎯 Goal**
Slide the start screen away when "Play Game" is clicked.

**💡 Concept**
Adding the `up` class (from Step 6) triggers the CSS slide animation. This is how JS and CSS cooperate: JS flips a class, CSS handles the motion.

**📝 Code**

```js
// goes in script.js
start_btn.addEventListener('click', () => screens[0].classList.add('up'))
```

**🔍 Explanation**
On click, we add `up` to `screens[0]` (the start screen). Its `margin-top` animates to `-100vh`, sliding it up and revealing the choose screen beneath.

**✅ Checkpoint**
Click "Play Game" — the start screen slides up and the insect-choice screen appears. 🎉

---

### Step 13: Handle insect selection

**🎯 Goal**
When the player picks an insect, remember it, reveal the game screen, and kick things off.

**💡 Concept**
We read the chosen image's `src` and `alt` so we can recreate that exact bug later. `setTimeout` delays the first spawn slightly so it appears *after* the screen finishes sliding.

**📝 Code**

```js
// goes in script.js
choose_insect_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selected_insect = { src, alt }
        screens[1].classList.add('up')
        setTimeout(createInsect, 1000)
        startGame()
    })
})
```

**🔍 Explanation**

- `forEach` attaches a click handler to **each** of the four buttons.
- Inside, we find the button's `<img>` and read its `src` and `alt` with `getAttribute`.
- `selected_insect = { src, alt }` stores them (shorthand for `{ src: src, alt: alt }`).
- `screens[1].classList.add('up')` slides the choose screen up, revealing the game area.
- `setTimeout(createInsect, 1000)` spawns the first bug after 1 second (once the slide finishes).
- `startGame()` starts the clock (next step).

**✅ Checkpoint**
Hold on testing until the next steps define `createInsect` and `startGame`.

---

### Step 14: Start and update the timer

**🎯 Goal**
Run a clock that ticks up every second and displays as MM:SS.

**💡 Concept**
`setInterval(fn, 1000)` runs `fn` every second, forever. We convert total seconds into minutes and seconds, zero-padding single digits for a proper clock look.

**📝 Code**

```js
// goes in script.js
function startGame() {
    setInterval(increaseTime, 1000)
}

function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++
}
```

**🔍 Explanation**

- `startGame` starts a 1-second interval calling `increaseTime`.
- `Math.floor(seconds / 60)` is whole minutes; `seconds % 60` is the leftover seconds (the remainder operator `%`).
- The two ternary lines add a leading `0` to single digits (so `9` shows as `09`).
- We write `Time: MM:SS` into the HUD, then `seconds++` for the next tick.

**⚠️ Note:** this interval is **never stopped** — the clock keeps running for the life of the page. (An improvement idea for later.)

**✅ Checkpoint**
Still can't fully test — `createInsect` is next.

---

### Step 15: Create an insect at a random spot

**🎯 Goal**
Spawn a clickable bug at a random location using the chosen insect's image.

**💡 Concept**
`document.createElement` builds the bug, inline styles place it, and a template literal injects the image with a random rotation for variety.

**📝 Code**

```js
// goes in script.js
function createInsect() {
    const insect = document.createElement('div')
    insect.classList.add('insect')
    const { x, y } = getRandomLocation()
    insect.style.top = `${y}px`
    insect.style.left = `${x}px`
    insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`

    insect.addEventListener('click', catchInsect)

    game_container.appendChild(insect)
}

function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}
```

**🔍 Explanation**

- `createInsect` makes a `<div class="insect">`, gets a random `{ x, y }`, and sets its `top`/`left` inline styles to position it.
- The `innerHTML` inserts the selected insect's image, rotated a random amount (`Math.random() * 360` degrees) so no two bugs look identical.
- `insect.addEventListener('click', catchInsect)` makes clicking it call `catchInsect` (next step).
- `getRandomLocation` picks coordinates within the window but keeps a 100px margin from each edge (`* (dimension - 200) + 100`) so bugs don't spawn half-off-screen.

**✅ Checkpoint**
Now test: click "Play Game", pick an insect — after ~1 second a rotated bug appears somewhere on the blue field, and the timer is ticking. It's not yet catchable in a satisfying way until the next step.

---

### Step 16: Catch insects and spawn more

**🎯 Goal**
When a bug is clicked: score it, pop it, remove it, and spawn two replacements.

**💡 Concept**
Inside a **regular function** used as an event handler, `this` refers to the element that was clicked — here, the specific insect. This is why the source uses a normal `function`, not an arrow function (arrows don't bind their own `this`).

**📝 Code**

```js
// goes in script.js
function catchInsect() {
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addInsects()
}

function addInsects() {
    setTimeout(createInsect, 1000)
    setTimeout(createInsect, 1500)
}
```

**🔍 Explanation**

- `increaseScore()` bumps the score (next step).
- `this.classList.add('caught')` adds the `caught` class to the clicked insect, triggering the CSS shrink-to-zero animation.
- `setTimeout(() => this.remove(), 2000)` removes the element 2 seconds later (after the pop finishes). Note the **arrow** function here deliberately keeps the outer `this` (the insect).
- `addInsects()` schedules **two** new bugs (at 1s and 1.5s) — this is why the game is "impossible": each catch spawns two, so bugs multiply endlessly.

**✅ Checkpoint**
Click a bug — it shrinks away and, a moment later, two more appear. The population grows fast!

---

### Step 17: Track the score and reveal the taunt

**🎯 Goal**
Increase the score on each catch and pop the taunt message once it passes 19.

**💡 Concept**
Updating state (`score`) and reflecting it in the DOM go hand in hand. A simple threshold check drives the reveal of the hidden message.

**📝 Code**

```js
// goes in script.js
function increaseScore() {
    score++
    if(score > 19) {
        message.classList.add('visible')
    }
    scoreEl.innerHTML = `Score: ${score}`
}
```

**🔍 Explanation**

- `score++` adds one.
- `if(score > 19)` — once you've caught 20+ bugs, add the `visible` class to the message, which (via Step 9's CSS) slides it into view.
- Finally, update the score readout in the HUD.

**✅ Checkpoint**
Play through: catch bugs, watch the score climb and the timer tick. Pass a score of 19 and the taunting message slides down. The game is complete (and gleefully unwinnable). 🎉

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
    <title>Catch The Insect</title>
  </head>
  <body>
    <div class="screen">
      <h1>Catch The Insect</h1>
      <button class="btn" id="start-btn">Play Game</button>
    </div>

    <div class="screen">
      <h1>What is your "favorite" insect?</h1>
      <ul class="insects-list">
        <li>
          <button class="choose-insect-btn">
            <p>Fly</p>
            <img src="http://pngimg.com/uploads/fly/fly_PNG3946.png" alt="fly">
          </button>
        </li>
        <li>
          <button class="choose-insect-btn">
            <p>Mosquito</p>
            <img
               src="http://pngimg.com/uploads/mosquito/mosquito_PNG18175.png"
               alt="mosquito"
               />
          </button>
        </li>
        <li>
          <button class="choose-insect-btn">
            <p>Spider</p>
            <img
               src="http://pngimg.com/uploads/spider/spider_PNG12.png"
               alt="spider"
               />
          </button>
        </li>
        <li>
          <button class="choose-insect-btn">
            <p>Roach</p>
            <img
               src="http://pngimg.com/uploads/roach/roach_PNG12163.png"
               alt="roach"
               />
          </button>
        </li>
      </ul>
    </div>

    <div class="screen game-container" id="game-container">
      <h3 id="time" class="time">Time: 00:00</h3>
      <h3 id="score" class="score">Score: 0</h3>
      <h5 id="message" class="message">
        Are you annoyed yet? <br>
        You are playing an impossible game!!
      </h5>
    </div>

    <script src="script.js"></script>
  </body>
</html>
```

```css
/* style.css */
@import url('https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #516dff;
  color: #fff;
  font-family: 'Press Start 2P', sans-serif;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  text-align: center;
}

a {
  color: #fff;
}

h1 {
  line-height: 1.4;
}

.btn {
  border: 0;
  background-color: #fff;
  color: #516dff;
  padding: 15px 20px;
  font-family: inherit;
  cursor: pointer;
}

.btn:hover {
  opacity: 0.9;
}

.btn:focus {
  outline: 0;
}

.screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  transition: margin 0.5s ease-out;
}

.screen.up {
  margin-top: -100vh;
}

.insects-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style-type: none;
  padding: 0;
}

.insects-list li {
  margin: 10px;
}

.choose-insect-btn {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
  cursor: pointer;
  font-family: inherit;
  width: 150px;
  height: 150px;
}

.choose-insect-btn:hover {
  background-color: #fff;
  color: #516dff;
}

.choose-insect-btn:active {
  background-color: rgba(255, 255, 255, 0.7);
}

.choose-insect-btn img {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.game-container {
  position: relative;
}

.time,
.score {
  position: absolute;
  top: 20px;
}

.time {
  left: 20px;
}

.score {
  right: 20px;
}

.message {
  line-height: 1.7;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  padding: 20px;
  z-index: 100;
  text-align: center;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -150%);
  transition: transform 0.4s ease-in;
}

.message.visible {
  transform: translate(-50%, 150%);
  opacity: 1;
}

.insect {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  position: absolute;
  transform: translate(-50%, -50%) scale(1);
  transition: transform 0.3s ease-in-out;
}

.insect.caught {
  transform: translate(-50%, -50%) scale(0);
}

.insect img {
  width: 100px;
  height: 100px;
}
```

```js
// script.js
const screens = document.querySelectorAll('.screen');
const choose_insect_btns = document.querySelectorAll('.choose-insect-btn');
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')
let seconds = 0
let score = 0
let selected_insect = {}

start_btn.addEventListener('click', () => screens[0].classList.add('up'))

choose_insect_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selected_insect = { src, alt }
        screens[1].classList.add('up')
        setTimeout(createInsect, 1000)
        startGame()
    })
})

function startGame() {
    setInterval(increaseTime, 1000)
}

function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++
}

function createInsect() {
    const insect = document.createElement('div')
    insect.classList.add('insect')
    const { x, y } = getRandomLocation()
    insect.style.top = `${y}px`
    insect.style.left = `${x}px`
    insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`

    insect.addEventListener('click', catchInsect)

    game_container.appendChild(insect)
}

function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}

function catchInsect() {
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addInsects()
}

function addInsects() {
    setTimeout(createInsect, 1000)
    setTimeout(createInsect, 1500)
}

function increaseScore() {
    score++
    if(score > 19) {
        message.classList.add('visible')
    }
    scoreEl.innerHTML = `Score: ${score}`
}
```

---

## 6. Recap & Next Steps

**What you learned**

- Building a **multi-screen** flow by sliding full-viewport panels with a `.up` state class and CSS transitions
- Managing **game state** in plain variables
- The difference between `setInterval` (repeat forever) and `setTimeout` (once, later)
- Creating, positioning, and removing DOM elements at random coordinates
- Reading attributes with `getAttribute` and building HTML with template literals
- Why `this` inside a regular-function handler is the clicked element (and why arrow functions differ)
- The classic centering trick: `left: 50%` + `translate(-50%, …)`

**Enhancement challenges**

1. **Add a "Game Over":** stop the timer with `clearInterval` (save the interval's ID) after a time limit or a max score.
2. **Cap the swarm:** spawn only one replacement instead of two, or limit the total number of insects on screen.
3. **Add sound:** play a short "squish" sound when an insect is caught.
4. **Show a high score:** persist the best score with `localStorage` and display it on the start screen.
5. **Difficulty ramp:** make insects shrink or move as the score rises to increase the challenge.
