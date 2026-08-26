# Simple Timer

## 1. Project Overview

A 60-second countdown timer with a play/pause and reset button, wrapped in a circular "pie" indicator that fills up as time runs out — driven by a CSS **conic gradient** and a rotating hand that JavaScript controls through a single CSS custom property.

**A note on styling — this project is different:** most of these 50 projects hand-write all their CSS in `style.css`. This one loads **Tailwind CSS from a CDN** instead, so nearly all the visual styling lives in **utility classes written directly in the HTML** (`class="bg-gray-900 p-16 rounded-2xl ..."`). The `style.css` file is tiny — it only holds the two things Tailwind can't express: the dynamic conic gradient and the rotating hand. You'll learn both approaches side by side.

**Key concepts involved**

- **Tailwind CSS** utility classes (styling in the HTML) vs. hand-written CSS
- **CSS custom properties** (variables) as a bridge between JavaScript and CSS
- **`conic-gradient`** to draw a pie/progress ring
- **Timers** with `setInterval`, and a `playing` flag to pause/resume
- Toggling classes and icons to reflect play/pause state

**HTML skills you'll gain**

- Loading Tailwind and Font Awesome from CDNs
- Composing layout, spacing, color, and shape entirely with Tailwind utility classes
- Tailwind **arbitrary values** like `w-[calc(100%-4px)]` and `inset-[2px]`

**CSS skills you'll gain**

- Declaring a custom property on `:root` and reading it with `var()`
- Building a `conic-gradient` that responds to a variable
- Using `transform-origin` + `rotate(var(--degrees))` to swing a hand

**JavaScript skills you'll gain**

- Selecting elements (including `:root`) with `querySelector`
- Managing boolean state and toggling classes/icons
- Formatting time with `padStart`
- Writing a value into CSS with `element.style.setProperty`
- Doing the math to map elapsed time onto degrees of a circle

---

## 2. Final Project Preview

**Layout & colors**
Centered on a grey page sits a dark, rounded card. At the top, the white title "Timer". Below it, a large circle showing "00:00" in light blue. The circle is a ring: as the countdown runs, a white wedge fills it (via a conic gradient) and a small white dot rides around the edge like a clock hand. At the bottom, two round light-blue buttons: a reset (refresh) icon and a play icon.

**Behavior & interactions**

- Click **play** → the countdown starts from 01:00 (60 seconds) and ticks down. The icon switches to pause and the button turns green.
- Click again (**pause**) → the countdown freezes; the icon switches back to play and the green clears.
- As time elapses, the **white wedge grows** and the **dot rotates** around the circle.
- Reach 00:00 → everything resets automatically.
- Click **reset** at any time → back to 01:00, paused, wedge and hand cleared.

**What you can interact with**

- The play/pause button
- The reset button

---

## 3. Prerequisites

**Basic knowledge required**

- HTML structure and classes
- Basic CSS (we'll explain the fancy bits)
- JavaScript variables, functions, and events

**Tools needed**

- A modern web browser
- A text editor (VS Code recommended)
- Optional: the **Live Server** VS Code extension
- An internet connection (Tailwind and Font Awesome load from CDNs)

**Files to create**

```
simple-timer/
├── index.html
├── style.css
└── script.js
```

Create these three **empty** files to begin.

---

## 4. Build the Project Step-by-Step

### Step 1: Set up the document and load Tailwind + Font Awesome

**🎯 Goal**
Create the page head and pull in the two CDN libraries plus our tiny stylesheet.

**💡 Concept**
**Tailwind CSS** is a "utility-first" framework: instead of writing CSS rules, you compose designs from tiny single-purpose classes right in your HTML (e.g. `p-16` = padding, `rounded-2xl` = big rounded corners). Loading `https://cdn.tailwindcss.com` makes all those classes available instantly — great for learning and prototypes. **Font Awesome** gives us the play/pause/refresh icons.

**📝 Code**

```html
<!-- goes in index.html -->
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <script src="https://cdn.tailwindcss.com"></script>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <link rel="stylesheet" href="style.css" />
    <title>Simple Timer</title>
  </head>
  <body>
    <!-- timer UI goes here -->
    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**

- `<script src="https://cdn.tailwindcss.com"></script>` loads Tailwind. From here on, utility classes like `flex`, `bg-gray-700`, and `rounded-full` "just work".
- The Font Awesome `<link>` (with integrity/crossorigin for security) provides the icons.
- `style.css` loads *last* so our few custom rules can build on top.

**⚠️ Note:** this file matches the original exactly, which omits `<!DOCTYPE html>` and `<html lang="en">`. In production you'd include both; we keep it faithful to the source here.

**✅ Checkpoint**
Blank page titled "Simple Timer". No errors.

---

### Step 2: Build the card and title with Tailwind classes

**🎯 Goal**
Center a dark card on the page and add the "Timer" heading — using only Tailwind utilities.

**💡 Concept**
This is the utility-first approach in action. Notice we set the background, padding, corners, width, and even the page-centering **without writing a single line of CSS** — each class does one small thing.

**📝 Code**

```html
<!-- goes in index.html, replacing the comment; also set the body class -->
<body class="bg-gray-700 flex justify-center items-center min-h-screen">
  <div class="bg-gray-900 p-16 rounded-2xl shadow w-full max-w-sm">
    <h1 class="text-4xl text-center text-white">Timer</h1>
  </div>
  <script src="script.js"></script>
</body>
```

**🔍 Explanation**

- On `<body>`: `bg-gray-700` (grey background), `flex justify-center items-center` (center children both ways), `min-h-screen` (at least full viewport tall — so centering has room).
- On the card `<div>`: `bg-gray-900` (darker), `p-16` (large padding), `rounded-2xl` (big rounded corners), `shadow` (drop shadow), `w-full max-w-sm` (full width but capped at a small max).
- `<h1>`: `text-4xl` (large), `text-center`, `text-white`.

Compare this to earlier projects where centering the page took a whole `body { display:flex; ... }` block in a CSS file. Here it's a handful of class names.

**✅ Checkpoint**
A dark, rounded, centered card with "Timer" at the top in white.

---

### Step 3: Add the circle and the timer text

**🎯 Goal**
Add the big round timer face showing "00:00".

**💡 Concept**
The circle uses Tailwind for its shape and layout, but its *fill* comes from a custom class, `bg-conic`, which we'll define in `style.css` (Tailwind can't do a dynamic conic gradient). This is the hand-off point between the two styling approaches.

**📝 Code**

```html
<!-- goes in index.html, inside the card, after the <h1> -->
<div
  id="conic"
  class="bg-conic flex items-center justify-center w-60 h-60 mx-auto my-10 rounded-full relative"
>
  <p id="timer" class="text-blue-200 relative text-5xl z-10">00:00</p>
</div>
```

**🔍 Explanation**

- The `#conic` div: `bg-conic` is **our** custom class (defined later); the rest are Tailwind — `flex items-center justify-center` (center the text), `w-60 h-60` (240×240px), `mx-auto` (horizontally centered), `my-10` (vertical margin), `rounded-full` (a circle), `relative` (positioning context for the pieces we add next).
- `#timer`: the countdown text, light blue, large (`text-5xl`), with `z-10` so it sits above the wedge and inner circle.

**✅ Checkpoint**
A large circle appears with "00:00" centered in light blue. It has no visible ring fill yet (that needs `style.css`).

---

### Step 4: Add the inner circle and the rotating hand

**🎯 Goal**
Layer an inner dark circle (to create a *ring*) and a hand with a dot marker.

**💡 Concept**
The trick for a ring is: a full conic-gradient circle, then a slightly smaller solid circle on top that covers the middle — leaving only a thin colored rim. The hand is a half-height bar pinned to the center that we'll rotate.

**📝 Code**

```html
<!-- goes in index.html, inside #conic, after the #timer paragraph -->
<!-- Create the inner cirlce and line -->
<div
  class="w-[calc(100%-4px)] aspect-square bg-gray-800 rounded-full absolute inset-[2px]"
></div>
<!-- Create the hand/marker -->
<div class="hand h-1/2 absolute top-0">
  <span
    class="w-2 h-2 bg-white rounded-full absolute -top-1 -left-1"
  ></span>
</div>
```

**🔍 Explanation**

- The inner circle uses Tailwind **arbitrary values** — the square-bracket syntax lets you drop in any exact value: `w-[calc(100%-4px)]` (4px narrower than its parent) and `inset-[2px]` (offset 2px on all sides). `bg-gray-800` matches the card so it "hides" the gradient's center, and `aspect-square` keeps it circular.
- The `.hand` div (`hand` is our custom class) is `h-1/2` (half the circle's height) and pinned to the top-center; the `<span>` inside is the small white dot (`w-2 h-2 rounded-full`), nudged with negative offsets so it sits right at the tip.

**✅ Checkpoint**
The circle now looks like a ring (dark center). The dot sits at the top. Nothing rotates yet — that's the custom CSS + JS.

---

### Step 5: Add the control buttons

**🎯 Goal**
Add the reset and play buttons with their icons, and wire up the script.

**💡 Concept**
Two round buttons laid out with Tailwind flex utilities, each holding a Font Awesome `<i>` icon. The `id`s let JavaScript find them.

**📝 Code**

```html
<!-- goes in index.html, inside the card, after the #conic div -->
<div class="flex justify-center gap-6">
  <button
    id="reset"
    class="flex justify-center items-center w-10 h-10 bg-blue-300 rounded-full"
  >
    <i class="fas fa-refresh"></i>
  </button>

  <button
    id="play"
    class="flex justify-center items-center w-10 h-10 bg-blue-300 rounded-full group"
  >
    <i class="fas fa-play"></i>
  </button>
</div>
```

**🔍 Explanation**

- A `flex justify-center gap-6` row holds the two buttons with a gap between them.
- Each button is a 40×40 light-blue circle centering its icon.
- `#reset` shows `fa-refresh`; `#play` shows `fa-play`. JavaScript will swap the play icon for a pause icon later.

**✅ Checkpoint**
Two round blue buttons (refresh and play) sit below the circle. The full UI is now in place — time for the custom CSS.

---

### Step 6: Define the conic gradient in style.css

**🎯 Goal**
Create the pie-fill effect that Tailwind can't express, controlled by a variable.

**💡 Concept**
A **CSS custom property** (`--degrees`) is a variable you can read with `var()`. Declaring it on `:root` (the whole document) means both our CSS *and* our JavaScript can access and change it — it's the bridge between the two. A `conic-gradient` sweeps color around a center point, perfect for a pie chart.

**📝 Code**

```css
/* goes in style.css */
:root {
  --degrees: 0deg;
}

.bg-conic {
  background: conic-gradient(
    transparent 0deg,
    transparent var(--degrees),
    white var(--degrees),
    white 360deg
  );
}
```

**🔍 Explanation**

- `:root { --degrees: 0deg; }` declares the variable, starting at 0.
- `.bg-conic` (the class on our `#conic` div) paints a conic gradient: **transparent** from 0° up to `--degrees`, then **white** from `--degrees` to 360°. So when `--degrees` is `0deg`, the whole ring is white; as `--degrees` grows toward `360deg`, the white shrinks. JavaScript will raise `--degrees` as time counts down, making the wedge appear to fill.

**✅ Checkpoint**
The ring is now fully white (since `--degrees` is 0). We'll animate it with JS.

---

### Step 7: Make the hand rotate with the variable

**🎯 Goal**
Rotate the hand/dot by the same `--degrees` value.

**💡 Concept**
By rotating the hand using the *same* variable that drives the gradient, the dot and the wedge stay perfectly in sync — one variable, two visual effects.

**📝 Code**

```css
/* goes in style.css */
.hand {
  transform-origin: bottom center;
  transform: rotate(var(--degrees));
}
```

**🔍 Explanation**

- `transform-origin: bottom center` sets the pivot to the hand's *bottom* (the center of the circle), so it swings like a clock hand.
- `transform: rotate(var(--degrees))` rotates it by the current variable value. Change `--degrees` and the hand turns. That's all the custom CSS this project needs — everything else is Tailwind.

**✅ Checkpoint**
No motion yet (`--degrees` is still 0), but both the wedge and hand are now wired to the same variable. On to JavaScript.

---

### Step 8: Select elements and set the initial state

**🎯 Goal**
Grab the controls, the timer text, and `:root`, then define the timer's starting values.

**💡 Concept**
We select `:root` so JS can write to the `--degrees` custom property later. State here is: how long total, whether we're `playing`, and how many seconds remain.

**📝 Code**

```js
// goes in script.js
const resetBtn = document.querySelector('#reset');
const playBtn = document.querySelector('#play');
const timerEl = document.querySelector('#timer');
const root = document.querySelector(':root');

// Initial setup
const totalSeconds = 60;
let playing = false;
let currentSeconds = totalSeconds;
timerEl.innerText = formatTime(totalSeconds);
```

**🔍 Explanation**

- We select the two buttons, the timer text, and `root` (the `:root`/`<html>` element that holds `--degrees`).
- `totalSeconds = 60` — a one-minute timer.
- `playing = false` — paused to start.
- `currentSeconds = totalSeconds` — the live countdown value.
- `timerEl.innerText = formatTime(totalSeconds)` immediately shows the starting time (we'll write `formatTime` shortly — function declarations are hoisted, so calling it here is fine).

**✅ Checkpoint**
The timer will read "01:00" once `formatTime` exists (a couple steps away). No errors after that.

---

### Step 9: Start the ticking interval

**🎯 Goal**
Create the heartbeat that fires every second.

**💡 Concept**
`setInterval` runs a function on a fixed schedule. We start it immediately, but the function itself will only *do* something when `playing` is true — that's how pause works without stopping the interval.

**📝 Code**

```js
// goes in script.js
const timerInterval = setInterval(run, 1000);
```

**🔍 Explanation**
Every 1000ms it calls `run` (defined soon). We store the interval's ID in `timerInterval` so we can stop it later with `clearInterval` when the countdown hits zero.

**✅ Checkpoint**
`run` isn't defined yet, so hold off. Define the handlers and functions next.

---

### Step 10: Toggle play/pause

**🎯 Goal**
Flip the `playing` flag and update the button's look and icon on click.

**💡 Concept**
Booleans toggle cleanly with `!` (not). We mirror that state visually by toggling CSS classes and swapping the Font Awesome icon.

**📝 Code**

```js
// goes in script.js
playBtn.addEventListener('click', () => {
  playing = !playing;
  playBtn.classList.toggle('play');
  playBtn.classList.toggle('bg-green-500'); // Toggle the color class
  const playIcon = playBtn.querySelector('i');
  playIcon.classList.toggle('fa-play'); // Toggle the play icon
  playIcon.classList.toggle('fa-pause'); // Toggle the pause icon
});
resetBtn.addEventListener('click', resetAll);
```

**🔍 Explanation**

- `playing = !playing` flips between play and pause on each click.
- `classList.toggle('bg-green-500')` adds/removes Tailwind's green background so the button turns green while running.
- We grab the `<i>` icon and toggle `fa-play` off and `fa-pause` on (and vice-versa) so the icon always matches the state.
- `resetBtn` simply calls `resetAll` (defined last).

**⚠️ Small quirk:** the code also toggles a `play` class, but nothing styles `.play` (it's not in our CSS or a Tailwind class), so that toggle has no visual effect. It's harmless leftover — we keep it to match the source.

**✅ Checkpoint**
Clicking play toggles the icon (play↔pause) and the green background. The countdown doesn't move yet — `run` is next.

---

### Step 11: Write the run function (the countdown tick)

**🎯 Goal**
On each tick, if we're playing, decrement the time, update the display, and advance the gradient/hand.

**💡 Concept**
This function ties everything together: it gates on `playing`, stops at zero, refreshes the text, and pushes the new angle into the CSS variable.

**📝 Code**

```js
// goes in script.js
// Run the timer
function run() {
  if (playing) {
    currentSeconds -= 1;
    if (currentSeconds <= 0) {
      clearInterval(timerInterval);
      resetAll();
    }

    timerEl.innerText = formatTime(currentSeconds);
    root.style.setProperty('--degrees', calcDeg());
  }
}
```

**🔍 Explanation**

- `if (playing)` — do nothing while paused (the interval keeps firing but skips the body).
- `currentSeconds -= 1` counts down one second.
- If we hit zero, `clearInterval(timerInterval)` stops the heartbeat and `resetAll()` restores defaults.
- `timerEl.innerText = formatTime(currentSeconds)` updates the visible time.
- `root.style.setProperty('--degrees', calcDeg())` writes a new value into the `--degrees` CSS variable — instantly updating **both** the conic wedge and the hand rotation. This one line is the JS→CSS bridge in action.

**✅ Checkpoint**
Still need `formatTime` and `calcDeg`. Two steps to go.

---

### Step 12: Format the time as MM:SS

**🎯 Goal**
Turn a raw seconds count into a clean `MM:SS` string.

**💡 Concept**
`String.prototype.padStart(2, '0')` pads a string to a minimum length by prepending characters — the easy way to zero-pad clock digits.

**📝 Code**

```js
// goes in script.js
// Format the time
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const newSeconds = seconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${newSeconds
    .toString()
    .padStart(2, '0')}`;
}
```

**🔍 Explanation**

- `Math.floor(seconds / 60)` = whole minutes; `seconds % 60` = leftover seconds.
- Each is converted to a string and `padStart(2, '0')` ensures two digits (`5` → `"05"`).
- The template literal joins them as `MM:SS`. So 60 seconds → `"01:00"`, and 9 → `"00:09"`.

**✅ Checkpoint**
Reload — the timer now displays "01:00" on load.

---

### Step 13: Calculate the wedge angle

**🎯 Goal**
Map how much time has elapsed onto a value in degrees (0–360).

**💡 Concept**
A full circle is 360°. If a fraction of time has passed, the filled wedge should cover that same fraction of the circle.

**📝 Code**

```js
// goes in script.js
// Calculate the degrees
function calcDeg() {
  return `${360 - (currentSeconds / totalSeconds) * 360}deg`;
}
```

**🔍 Explanation**

- `currentSeconds / totalSeconds` is the fraction of time **remaining** (1 at the start, 0 at the end).
- `* 360` turns that into degrees remaining; subtracting from `360` gives degrees **elapsed**.
- So at the start (`currentSeconds == totalSeconds`) it returns `0deg` (no white wedge shown beyond full), and as time runs out it climbs toward `360deg`. The result is a string like `"120deg"` ready for the CSS variable.

**✅ Checkpoint**
Almost there — `resetAll` is the final piece.

---

### Step 14: Reset everything

**🎯 Goal**
Return the timer to its starting state — used by the reset button and when the countdown finishes.

**💡 Concept**
A single "restore defaults" function keeps reset logic in one place, called from multiple spots (the reset button *and* the end-of-countdown in `run`).

**📝 Code**

```js
// goes in script.js
// Reset all the values
function resetAll() {
  playing = false;
  playBtn.classList.remove('play');
  playBtn.classList.remove('bg-green-500'); // Remove the color class
  const playIcon = playBtn.querySelector('i');
  playIcon.classList.remove('fa-pause'); // Remove the pause icon
  playIcon.classList.add('fa-play'); // Add the play icon
  currentSeconds = totalSeconds;
  timerEl.innerText = formatTime(totalSeconds);
  root.style.setProperty('--degrees', '0deg');
}
```

**🔍 Explanation**

- `playing = false` — pause.
- Remove the green background and the `play` class; force the icon back to `fa-play` (remove pause, add play).
- `currentSeconds = totalSeconds` — refill the countdown.
- Reset the displayed time to `01:00`.
- Set `--degrees` back to `0deg` — clearing the wedge and returning the hand to the top.

**✅ Checkpoint**
Full test: click **play** → it counts down from 01:00, the icon becomes pause, the button turns green, the white wedge grows and the dot rotates. Click again to **pause**. Click **reset** → back to 01:00, paused, cleared. Let it run to 00:00 → it auto-resets. Done! 🎉

---

## 5. Final Full Code (Reference)

```html
<!-- index.html -->
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <script src="https://cdn.tailwindcss.com"></script>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <link rel="stylesheet" href="style.css" />
    <title>Simple Timer</title>
  </head>

  <body class="bg-gray-700 flex justify-center items-center min-h-screen">
    <div class="bg-gray-900 p-16 rounded-2xl shadow w-full max-w-sm">
      <h1 class="text-4xl text-center text-white">Timer</h1>

      <!-- Create the circle -->
      <div
        id="conic"
        class="bg-conic flex items-center justify-center w-60 h-60 mx-auto my-10 rounded-full relative"
      >
        <p id="timer" class="text-blue-200 relative text-5xl z-10">00:00</p>

        <!-- Create the inner cirlce and line -->
        <div
          class="w-[calc(100%-4px)] aspect-square bg-gray-800 rounded-full absolute inset-[2px]"
        ></div>
        <!-- Create the hand/marker -->
        <div class="hand h-1/2 absolute top-0">
          <span
            class="w-2 h-2 bg-white rounded-full absolute -top-1 -left-1"
          ></span>
        </div>
      </div>

      <div class="flex justify-center gap-6">
        <button
          id="reset"
          class="flex justify-center items-center w-10 h-10 bg-blue-300 rounded-full"
        >
          <i class="fas fa-refresh"></i>
        </button>

        <button
          id="play"
          class="flex justify-center items-center w-10 h-10 bg-blue-300 rounded-full group"
        >
          <i class="fas fa-play"></i>
        </button>
      </div>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

```css
/* style.css */
:root {
  --degrees: 0deg;
}

.bg-conic {
  background: conic-gradient(
    transparent 0deg,
    transparent var(--degrees),
    white var(--degrees),
    white 360deg
  );
}

.hand {
  transform-origin: bottom center;
  transform: rotate(var(--degrees));
}
```

```js
// script.js
const resetBtn = document.querySelector('#reset');
const playBtn = document.querySelector('#play');
const timerEl = document.querySelector('#timer');
const root = document.querySelector(':root');

// Initial setup
const totalSeconds = 60;
let playing = false;
let currentSeconds = totalSeconds;
timerEl.innerText = formatTime(totalSeconds);

const timerInterval = setInterval(run, 1000);

playBtn.addEventListener('click', () => {
  playing = !playing;
  playBtn.classList.toggle('play');
  playBtn.classList.toggle('bg-green-500'); // Toggle the color class
  const playIcon = playBtn.querySelector('i');
  playIcon.classList.toggle('fa-play'); // Toggle the play icon
  playIcon.classList.toggle('fa-pause'); // Toggle the pause icon
});
resetBtn.addEventListener('click', resetAll);

// Run the timer
function run() {
  if (playing) {
    currentSeconds -= 1;
    if (currentSeconds <= 0) {
      clearInterval(timerInterval);
      resetAll();
    }

    timerEl.innerText = formatTime(currentSeconds);
    root.style.setProperty('--degrees', calcDeg());
  }
}

// Format the time
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const newSeconds = seconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${newSeconds
    .toString()
    .padStart(2, '0')}`;
}

// Calculate the degrees
function calcDeg() {
  return `${360 - (currentSeconds / totalSeconds) * 360}deg`;
}

// Reset all the values
function resetAll() {
  playing = false;
  playBtn.classList.remove('play');
  playBtn.classList.remove('bg-green-500'); // Remove the color class
  const playIcon = playBtn.querySelector('i');
  playIcon.classList.remove('fa-pause'); // Remove the pause icon
  playIcon.classList.add('fa-play'); // Add the play icon
  currentSeconds = totalSeconds;
  timerEl.innerText = formatTime(totalSeconds);
  root.style.setProperty('--degrees', '0deg');
}
```

---

## 6. Recap & Next Steps

**What you learned**

- **Tailwind CSS** utility-first styling — laying out, coloring, and shaping UI with classes in the HTML instead of CSS rules — and Tailwind **arbitrary values** (`w-[calc(100%-4px)]`, `inset-[2px]`)
- When you still need hand-written CSS (dynamic `conic-gradient`, custom `transform-origin`)
- **CSS custom properties** as the bridge between JS and CSS: declare on `:root`, read with `var()`, write with `element.style.setProperty`
- Building a countdown with `setInterval`, a `playing` flag to pause, and `clearInterval` to stop
- Toggling classes and Font Awesome icons to reflect state
- Formatting time with `padStart` and mapping elapsed time onto degrees

**Enhancement challenges**

1. **Custom durations:** add input buttons (1, 5, 10 min) that set `totalSeconds` and reset.
2. **Restart the interval:** currently, once the timer completes and `clearInterval` runs, play won't restart it — fix `resetAll` (or the play handler) to recreate the interval.
3. **Alarm:** play a sound or flash the card when the countdown reaches zero.
4. **Count up mode:** add a toggle to count *up* as a stopwatch instead of down.
5. **Clean up the dead code:** remove the no-op `.play` class toggles and the unused `group` class for a tidier implementation.
