# Theme Clock

A code-along tutorial that rebuilds this project from three empty files, one small step at a time.

## 1. Project Overview

The Theme Clock is a live analog + digital clock. Its three hands rotate to the current time, a digital readout and date sit below, and a button toggles the whole page between light and dark mode.

**Key concepts involved**

- Working with the JavaScript `Date` object
- Rotating elements with CSS `transform: rotate()` driven from JS
- Mapping a number from one range to another (e.g. seconds → degrees)
- Re-running code on a timer with `setInterval`
- Theming with CSS custom properties and a toggled class

**HTML skills you'll gain**

- Structuring a component from nested `<div>`s (clock face, hands, center point)
- Adding a toggle `<button>`

**CSS skills you'll gain**

- Defining and overriding CSS custom properties for light/dark themes
- Positioning and rotating clock hands with `transform-origin`
- Using the `::after` pseudo-element for a decorative dot
- Smooth theme changes with `transition`

**JavaScript skills you'll gain**

- Reading hours, minutes, seconds, and the date from a `Date`
- Converting 24-hour time to 12-hour format and computing AM/PM
- Building a reusable range-mapping (`scale`) helper
- Updating element `style.transform` and `innerHTML` dynamically
- Toggling a class and swapping button text
- Running a function every second with `setInterval`

## 2. Final Project Preview

**Layout & colors**

- A centered analog clock face (200×200px) with hour, minute, and second hands. The second hand and the center dot are red; the other hands follow the theme color.
- Below the clock: a large digital time (e.g. `10:09 PM`) and an uppercase date line (e.g. `Tuesday, Aug` with the day-of-month in a small filled circle).
- A "Dark mode" button sits near the top of the page.
- Light theme by default: black hands on white. Dark theme: white hands on a near-black (`#111`) background.

**Behavior & interactions**

- The clock updates every second — the hands rotate, and the digital time/date stay current.
- Clicking the button toggles dark mode across the whole page and swaps its label between "Dark mode" and "Light mode".

**What you can interact with**

- The dark/light mode toggle button.

## 3. Prerequisites

**Basic knowledge required**

- Basic HTML, CSS, and JavaScript syntax.
- A little comfort with functions and arrays.

**Tools needed**

- A modern web browser.
- A text editor (VS Code recommended).
- An internet connection (loads the Heebo font).
- Optional: the **Live Server** extension.

**Files to create**

```
theme-clock/
├── index.html
├── style.css
└── script.js
```

Create all three now, empty.

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML skeleton

**🎯 Goal**
Set up the base document and link the stylesheet.

**💡 Concept**
Standard HTML5 boilerplate with a `<link>` to our CSS.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Theme Clock</title>
  </head>
  <body>
  </body>
</html>
```

**🔍 Explanation**

- The usual boilerplate: charset, responsive viewport, stylesheet link, and page title.

**✅ Checkpoint**
Open `index.html` — a blank page titled "Theme Clock".

---

### Step 2: Add the toggle button

**🎯 Goal**
Add the button that will flip between light and dark mode.

**💡 Concept**
A single `<button>` whose text we'll change from JavaScript.

**📝 Code**

```html
<!-- goes in index.html (inside <body>) -->
<!-- Inspired by this dribbble shot https://dribbble.com/shots/5958443-Alarm-clock -->

<button class="toggle">Dark mode</button>
```

**🔍 Explanation**

- The comment credits the design inspiration (kept from the original project).
- `<button class="toggle">` starts with the label "Dark mode"; JS will swap it to "Light mode" when active.

**✅ Checkpoint**
Reload. A plain "Dark mode" button appears.

---

### Step 3: Build the clock face and hands

**🎯 Goal**
Create the clock structure: the face, its three hands, and a center point.

**💡 Concept**
Each hand is a separate `<div>` with a shared `needle` class plus a specific one (`hour`/`minute`/`second`). We'll rotate them individually later.

**📝 Code**

```html
<!-- goes in index.html (after the toggle button) -->
<div class="clock-container">
  <div class="clock">
    <div class="needle hour"></div>
    <div class="needle minute"></div>
    <div class="needle second"></div>
    <div class="center-point"></div>
  </div>
</div>
```

**🔍 Explanation**

- `.clock-container` will stack the clock and the text below it.
- `.clock` is the square face; each `.needle` is a hand, and `.center-point` is the pivot dot at the middle.

**✅ Checkpoint**
Reload. Nothing visible yet — these are empty, unstyled divs.

---

### Step 4: Add the digital time, date, and script

**🎯 Goal**
Add the two text areas below the clock and load the JavaScript.

**💡 Concept**
These divs start empty; JavaScript fills them each second with the current time and date.

**📝 Code**

```html
<!-- goes in index.html (inside .clock-container, after .clock) -->
  <div class="time"></div>
  <div class="date"></div>
```

```html
<!-- goes in index.html (before </body>) -->
<script src="script.js"></script>
```

**🔍 Explanation**

- `.time` will show the digital time; `.date` will show the day and date.
- The `<script>` loads last so all elements exist when it runs.

**✅ Checkpoint**
Reload. Still blank text areas — CSS and JS are next.

---

### Step 5: Import the font, reset, and define theme variables

**🎯 Goal**
Set the font and declare the two theme colors as variables.

**💡 Concept**
Declaring `--primary-color` and `--secondary-color` on `:root` lets every rule reference them. Swapping their values later (via a class) re-themes the whole page.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css?family=Heebo:300&display=swap');

* {
  box-sizing: border-box;
}

:root {
  --primary-color: #000;
  --secondary-color: #fff;
}
```

**🔍 Explanation**

- `@import` loads the Heebo font (first line).
- In the default (light) theme, primary is black and secondary is white.

**✅ Checkpoint**
No visible change yet, but the theme variables now exist.

---

### Step 6: Add the dark theme

**🎯 Goal**
Define what changes when dark mode is on, and animate the switch.

**💡 Concept**
Adding a `dark` class to `<html>` swaps the variable values and background. Because rules reference the variables, everything updates at once. A `transition` on `<html>` makes the change fade.

**📝 Code**

```css
/* goes in style.css */
html {
  transition: all 0.5s ease-in;
}

html.dark {
  --primary-color: #fff;
  --secondary-color: #333;
}

html.dark {
  background-color: #111;
  color: var(--primary-color);
}
```

**🔍 Explanation**

- `html { transition: all 0.5s ease-in }` smoothly animates color/background changes.
- `html.dark` redefines the variables (primary becomes white) and sets a near-black page background with white text.

**✅ Checkpoint**
Nothing changes yet (the `dark` class isn't applied until JS adds it), but the dark theme is ready.

---

### Step 7: Center everything on the page

**🎯 Goal**
Turn the body into a full-screen centered stage.

**💡 Concept**
A flex `<body>` with `height: 100vh` centers its content vertically and horizontally.

**📝 Code**

```css
/* goes in style.css */
body {
  font-family: 'Heebo', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}
```

**🔍 Explanation**

- `display: flex` + `align-items` + `justify-content: center` centers the clock.
- `height: 100vh` fills the viewport; `overflow: hidden` and `margin: 0` remove scrollbars and default gaps.

**✅ Checkpoint**
Reload. The button and (empty) clock area are centered on the page.

---

### Step 8: Style the toggle button

**🎯 Goal**
Give the button theme-aware colors and pin it near the top.

**💡 Concept**
Using the theme variables means the button automatically inverts in dark mode. `position: absolute` lifts it out of the centered flow to the top.

**📝 Code**

```css
/* goes in style.css */
.toggle {
  cursor: pointer;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  border: 0;
  border-radius: 4px;
  padding: 8px 12px;
  position: absolute;
  top: 100px;
}

.toggle:focus {
  outline: none;
}
```

**🔍 Explanation**

- The button uses `--primary-color` for its background and `--secondary-color` for its text, so it flips with the theme.
- `position: absolute; top: 100px` places it near the top instead of dead-center with the clock.
- `:focus { outline: none }` removes the default focus ring.

**✅ Checkpoint**
Reload. The button is now a black rounded pill near the top of the page.

---

### Step 9: Lay out the clock container and face

**🎯 Goal**
Stack the clock and text vertically, and size the clock face.

**💡 Concept**
`position: relative` on `.clock` is essential — the hands inside it are positioned absolutely relative to this face.

**📝 Code**

```css
/* goes in style.css */
.clock-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.clock {
  position: relative;
  width: 200px;
  height: 200px;
}
```

**🔍 Explanation**

- `.clock-container` is a vertical flex column, centering the clock and the text below it.
- `.clock` is a 200×200 square; `position: relative` makes it the anchor for the absolutely-positioned hands.

**✅ Checkpoint**
No visible change yet (the hands have no styling), but the layout is in place.

---

### Step 10: Style and size the clock hands

**🎯 Goal**
Draw the three hands and set their lengths and pivot point.

**💡 Concept**
`transform-origin: bottom center` makes each hand rotate around its **bottom** end (the clock's center) instead of its middle — exactly how a real clock hand pivots.

**📝 Code**

```css
/* goes in style.css */
.needle {
  background-color: var(--primary-color);
  position: absolute;
  top: 50%;
  left: 50%;
  height: 65px;
  width: 3px;
  transform-origin: bottom center;
  transition: all 0.5s ease-in linear;
}

.needle.hour {
  transform: translate(-50%, -100%) rotate(0deg);
}

.needle.minute {
  transform: translate(-50%, -100%) rotate(0deg);
  height: 100px;
}

.needle.second {
  transform: translate(-50%, -100%) rotate(0deg);
  height: 100px;
  background-color: #e74c3c;
}
```

**🔍 Explanation**

- `.needle` places each hand at the center (`top: 50%; left: 50%`), gives it a thin bar shape, and pivots it at `bottom center`. The `transition` smooths rotation.
- `translate(-50%, -100%)` shifts each hand so it sits *above* the center point, pinned by its base.
- The hour hand is shortest (65px), minute and second are longer (100px), and the second hand is red (`#e74c3c`). All start at `rotate(0deg)`; JS will set real angles.

**✅ Checkpoint**
Reload. Three hands appear pointing straight up from the center.

---

### Step 11: Add the center pivot dot

**🎯 Goal**
Draw the red dot (with a tiny inner dot) where the hands meet.

**💡 Concept**
The `::after` pseudo-element adds a decorative inner dot without extra HTML.

**📝 Code**

```css
/* goes in style.css */
.center-point {
  background-color: #e74c3c;
  width: 10px;
  height: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}

.center-point::after {
  content: '';
  background-color: var(--primary-color);
  width: 5px;
  height: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
```

**🔍 Explanation**

- `.center-point` is a red 10px circle centered on the clock (`translate(-50%, -50%)` centers it on its own point).
- `::after` adds a 5px inner dot in the theme's primary color, layered on top.

**✅ Checkpoint**
Reload. A small red dot with a darker center sits where the hands cross.

---

### Step 12: Style the digital time and date

**🎯 Goal**
Style the large time readout and the uppercase date line (including the date circle).

**💡 Concept**
The `.circle` class styles the small badge around the day number — JS will wrap the date in a `<span class="circle">`.

**📝 Code**

```css
/* goes in style.css */
.time {
  font-size: 60px;
}

.date {
  color: #aaa;
  font-size: 14px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

.date .circle {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  border-radius: 50%;
  height: 18px;
  width: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 18px;
  transition: all 0.5s ease-in;
  font-size: 12px;
}
```

**🔍 Explanation**

- `.time` is large (60px). `.date` is small, gray, uppercase, with slight letter spacing.
- `.date .circle` is an 18px round badge using theme colors; `display: inline-flex` centers the number inside it.

**✅ Checkpoint**
Reload. Styling is complete, but the time/date are still empty. Time for JavaScript.

---

### Step 13: Grab the DOM elements

**🎯 Goal**
Get references to every element the script needs to update.

**💡 Concept**
`querySelector` returns the first element matching a CSS selector — handy for grabbing by class.

**📝 Code**

```js
// goes in script.js
const hourEl = document.querySelector('.hour')
const minuteEl = document.querySelector('.minute')
const secondEl = document.querySelector('.second')
const timeEl = document.querySelector('.time')
const dateEl = document.querySelector('.date')
const toggle = document.querySelector('.toggle')
```

**🔍 Explanation**

- We grab the three hands, the digital time and date containers, and the toggle button — each by its class.

**✅ Checkpoint**
Reload, open the console. No errors means all six elements were found.

---

### Step 14: Add the day and month name arrays

**🎯 Goal**
Provide human-readable names for days and months.

**💡 Concept**
The `Date` object gives day/month as **numbers** (0–6, 0–11). We index into these arrays to get names.

**📝 Code**

```js
// goes in script.js
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
```

**🔍 Explanation**

- `days[0]` is "Sunday", `months[0]` is "Jan", matching what `Date` returns (Sunday = 0, January = 0).

**✅ Checkpoint**
No visible change; these arrays are lookups for later.

---

### Step 15: Wire up the dark mode toggle

**🎯 Goal**
Flip the theme and swap the button label on click.

**💡 Concept**
Toggling the `dark` class on `<html>` triggers the CSS variable overrides from Step 6. We also update the button text to reflect the *next* action.

**📝 Code**

```js
// goes in script.js
toggle.addEventListener('click', (e) => {
    const html = document.querySelector('html')
    if (html.classList.contains('dark')) {
        html.classList.remove('dark')
        e.target.innerHTML = 'Dark mode'
    } else {
        html.classList.add('dark')
        e.target.innerHTML = 'Light mode'
    }
})
```

**🔍 Explanation**

- We check whether `<html>` already has the `dark` class.
- If yes, remove it (back to light) and set the button to "Dark mode".
- If no, add it (go dark) and set the button to "Light mode".
- `e.target` is the clicked button itself.

**✅ Checkpoint**
Reload. Click the button — the whole page fades to dark mode and back, and the label updates each time.

---

### Step 16: Compute and display the time

**🎯 Goal**
Read the current time, rotate the hands, and fill in the digital readout.

**💡 Concept**
`new Date()` captures the current moment. We convert 24-hour hours to 12-hour, work out AM/PM, and turn each unit into a rotation angle. (The `scale` helper used here is defined in the next step — hoisting isn't involved since it's a `const` arrow function, so it must appear before `setTime` runs, which it will once we add Steps 17–18.)

**📝 Code**

```js
// goes in script.js
function setTime() {
    const time = new Date();
    const month = time.getMonth()
    const day = time.getDay()
    const date = time.getDate()
    const hours = time.getHours()
    const hoursForClock = hours >= 13 ? hours % 12 : hours;
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()
    const ampm = hours >= 12 ? 'PM' : 'AM'

    hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(hoursForClock, 0, 12, 0, 360)}deg)`
    minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 60, 0, 360)}deg)`
    secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 60, 0, 360)}deg)`

    timeEl.innerHTML = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`
    dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`
}
```

**🔍 Explanation**

- `new Date()` gives the current time; `getMonth`/`getDay`/`getDate`/`getHours`/`getMinutes`/`getSeconds` extract each part.
- `hoursForClock = hours >= 13 ? hours % 12 : hours` converts afternoon hours to 12-hour form (e.g. 15 → 3), leaving 12 (noon) as 12.
- `ampm` is "PM" from noon onward, else "AM".
- Each hand's `style.transform` reuses the base `translate(-50%, -100%)` plus a `rotate(...)`. The `scale(...)` call maps the time unit onto 0–360 degrees.
- `timeEl` shows `H:MM AM/PM`, padding minutes with a leading zero when under 10.
- `dateEl` shows the day name, month, and the date number wrapped in the styled `.circle` span.

**✅ Checkpoint**
Nothing runs yet — `setTime` isn't called and `scale` isn't defined. Two more steps.

---

### Step 17: Add the scale (range-mapping) helper

**🎯 Goal**
Convert a value from one numeric range into another — e.g. 30 seconds → 180 degrees.

**💡 Concept**
Clocks think in 60 minutes/seconds and 12 hours, but CSS rotation thinks in 360 degrees. This tiny formula maps between ranges.

**📝 Code**

```js
// goes in script.js
// StackOverflow https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
```

**🔍 Explanation**

- Given a number and its input range (`in_min`/`in_max`), it returns the equivalent position in the output range (`out_min`/`out_max`).
- Example: `scale(30, 0, 60, 0, 360)` → 180. Halfway through a minute is halfway around the circle.

**✅ Checkpoint**
Still nothing on screen — we haven't started the clock. Final step next.

---

### Step 18: Start the clock

**🎯 Goal**
Draw the time immediately, then keep it updating every second.

**💡 Concept**
`setInterval(fn, 1000)` runs `fn` once per second. Calling `setTime()` once first avoids a one-second blank on load.

**📝 Code**

```js
// goes in script.js
setTime()

setInterval(setTime, 1000)
```

**🔍 Explanation**

- `setTime()` runs once right away so the clock shows the correct time immediately.
- `setInterval(setTime, 1000)` re-runs it every 1000ms (1 second), keeping the hands and digital readout live.

**✅ Checkpoint**
Reload. The clock hands point to the real time and the second hand ticks each second. The digital time and date are correct, and dark mode still toggles. Complete!

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
    <title>Theme Clock</title>
  </head>
  <body>
    <!-- Inspired by this dribbble shot https://dribbble.com/shots/5958443-Alarm-clock -->

    <button class="toggle">Dark mode</button>

    <div class="clock-container">
      <div class="clock">
        <div class="needle hour"></div>
        <div class="needle minute"></div>
        <div class="needle second"></div>
        <div class="center-point"></div>
      </div>

      <div class="time"></div>
      <div class="date"></div>
    </div>

    <script src="script.js"></script>
  </body>
</html>
```

### `style.css`

```css
@import url('https://fonts.googleapis.com/css?family=Heebo:300&display=swap');

* {
  box-sizing: border-box;
}

:root {
  --primary-color: #000;
  --secondary-color: #fff;
}

html {
  transition: all 0.5s ease-in;
}

html.dark {
  --primary-color: #fff;
  --secondary-color: #333;
}

html.dark {
  background-color: #111;
  color: var(--primary-color);
}

body {
  font-family: 'Heebo', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.toggle {
  cursor: pointer;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  border: 0;
  border-radius: 4px;
  padding: 8px 12px;
  position: absolute;
  top: 100px;
}

.toggle:focus {
  outline: none;
}

.clock-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.clock {
  position: relative;
  width: 200px;
  height: 200px;
}

.needle {
  background-color: var(--primary-color);
  position: absolute;
  top: 50%;
  left: 50%;
  height: 65px;
  width: 3px;
  transform-origin: bottom center;
  transition: all 0.5s ease-in linear;
}

.needle.hour {
  transform: translate(-50%, -100%) rotate(0deg);
}

.needle.minute {
  transform: translate(-50%, -100%) rotate(0deg);
  height: 100px;
}

.needle.second {
  transform: translate(-50%, -100%) rotate(0deg);
  height: 100px;
  background-color: #e74c3c;
}

.center-point {
  background-color: #e74c3c;
  width: 10px;
  height: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}

.center-point::after {
  content: '';
  background-color: var(--primary-color);
  width: 5px;
  height: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}

.time {
  font-size: 60px;
}

.date {
  color: #aaa;
  font-size: 14px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

.date .circle {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  border-radius: 50%;
  height: 18px;
  width: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 18px;
  transition: all 0.5s ease-in;
  font-size: 12px;
}
```

### `script.js`

```js
const hourEl = document.querySelector('.hour')
const minuteEl = document.querySelector('.minute')
const secondEl = document.querySelector('.second')
const timeEl = document.querySelector('.time')
const dateEl = document.querySelector('.date')
const toggle = document.querySelector('.toggle')

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

toggle.addEventListener('click', (e) => {
    const html = document.querySelector('html')
    if (html.classList.contains('dark')) {
        html.classList.remove('dark')
        e.target.innerHTML = 'Dark mode'
    } else {
        html.classList.add('dark')
        e.target.innerHTML = 'Light mode'
    }
})

function setTime() {
    const time = new Date();
    const month = time.getMonth()
    const day = time.getDay()
    const date = time.getDate()
    const hours = time.getHours()
    const hoursForClock = hours >= 13 ? hours % 12 : hours;
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()
    const ampm = hours >= 12 ? 'PM' : 'AM'

    hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(hoursForClock, 0, 12, 0, 360)}deg)`
    minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 60, 0, 360)}deg)`
    secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 60, 0, 360)}deg)`

    timeEl.innerHTML = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`
    dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`
}

// StackOverflow https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

setTime()

setInterval(setTime, 1000)
```

## 6. Recap & Next Steps

**What you learned**

- Reading time parts from the `Date` object and converting to 12-hour format with AM/PM.
- Mapping numbers between ranges (seconds/minutes/hours → degrees) with a reusable helper.
- Rotating elements with `transform: rotate()` and `transform-origin`.
- Re-running logic every second with `setInterval`.
- Theming with CSS custom properties and toggling a class from JavaScript.

**Enhancement challenges**

1. **Persist the theme:** remember the user's dark/light choice with `localStorage` so it survives a refresh.
2. **Respect system preference:** default to dark mode when `prefers-color-scheme: dark` is set.
3. **Clock ticks/numbers:** add hour markers or the numbers 1–12 around the face.
4. **Smooth second hand:** update more often (e.g. requestAnimationFrame) for a sweeping second hand instead of ticking.
5. **Fix the "0 hours" edge case:** at midnight the hour reads `0` — display `12` instead, like a real clock.
