# Animated Countdown

## 1. Project Overview

This project builds an **animated 3-2-1-0 countdown** that swings each number into view, then out, and finally reveals a big **"GO"** screen with a Replay button.

**Key concepts involved:**

- **CSS keyframe animations** with rotation and scaling for a physical "swing" feel.
- Driving a sequence with the JavaScript **`animationend` event** — each number's animation triggers the next.
- **`classList`** manipulation to add/remove animation states.
- DOM traversal with **`nextElementSibling`**.

**HTML skills you'll gain:**

- Structuring layered UI (a countdown layer and a final "GO" layer stacked in the same spot).

**CSS skills you'll gain:**

- Absolute/fixed centering with the `top/left: 50%` + `translate(-50%, -50%)` trick.
- Writing multi-step `@keyframes` for rotation, scale, and show/hide.
- Using `transform-origin` to pivot rotation around a chosen point.
- Building a hover effect with a `::after` pseudo-element (the sliding `»`).

**JavaScript skills you'll gain:**

- Listening for the `animationend` event and reading `e.animationName`.
- Chaining animations by adding/removing classes in response to events.
- Traversing siblings with `nextElementSibling`.
- Resetting state to replay an animation from scratch.

---

## 2. Final Project Preview

**Layout & colors:** A clean white page. Dead center, a blue (`#3498db`) number counts down — **3, 2, 1, 0** — with a small uppercase "GET READY" caption beneath it. When the count ends, the whole counter shrinks away and a large **"GO"** heading pops in with a blue **Replay** button below it.

**Behavior & interactions:**

- On page load the countdown runs automatically. Each number swings in from an angle, settles, then swings out — handing off to the next number.
- After **0** swings in, the counter scales down to nothing and the "GO" screen scales up with a slight overshoot bounce.
- The **Replay** button resets everything and runs the whole countdown again. Hovering it slides a small `»` arrow out to the right.

**What you can interact with:**

- The **Replay** button (restarts the countdown).

---

## 3. Prerequisites

**Basic knowledge required:**

- HTML structure.
- CSS selectors, `transform`, and a first look at `@keyframes`.
- JavaScript functions, `forEach`, and event listeners.

**Tools needed:**

- A modern web browser.
- A text editor (VS Code recommended).
- *Optional:* the **Live Server** extension.

**Files to create:**

```
animated-countdown/
├── index.html
├── style.css
└── script.js
```

Create these three empty files and follow along.

---

## 4. Build the Project Step-by-Step

### Step 1: Set Up the HTML Document

**🎯 Goal**
Create the page skeleton and link the stylesheet and script.

**💡 Concept**
Standard boilerplate: CSS in the `<head>`, script just before `</body>` so the elements exist before the script runs.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Animated Countdown</title>
  </head>
  <body>
    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**
The `<link>` loads our styles; the `<script>` at the bottom loads our JS after the HTML is parsed.

**✅ Checkpoint**
A blank page titled "Animated Countdown". No errors.

---

### Step 2: Add the Countdown Numbers

**🎯 Goal**
Add the number stack (3, 2, 1, 0) and a "Get Ready" caption.

**💡 Concept**
All four numbers live in the same `.nums` box, stacked on top of each other. Only one shows at a time. We mark the first number (`3`) with class `in` so it's the one visible when the page loads.

**📝 Code**

```html
<!-- goes in index.html, inside <body>, above the <script> -->
<div class="counter">
  <div class="nums">
    <span class="in">3</span>
    <span>2</span>
    <span>1</span>
    <span>0</span>
  </div>
  <h4>Get Ready</h4>
</div>
```

**🔍 Explanation**

- `.counter` wraps the whole countdown so we can hide it all at once later.
- `.nums` is the fixed-size window that holds the four `<span>` numbers.
- `class="in"` on the `3` marks it as the active/visible number initially.
- `<h4>Get Ready</h4>` is the caption below the number.

**✅ Checkpoint**
You'll see the numbers 3, 2, 1, 0 (probably overlapping/stacked) and "Get Ready". It looks messy — CSS will position them properly.

---

### Step 3: Add the Final "GO" Screen

**🎯 Goal**
Add the "GO" message and a Replay button that appear after the countdown.

**💡 Concept**
This is a second layer that starts hidden (we'll scale it to `0` in CSS) and pops in when the countdown finishes.

**📝 Code**

```html
<!-- goes in index.html, right after the .counter div -->
<div class="final">
  <h1>GO</h1>
  <button id="replay">
    <span>Replay</span>
  </button>
</div>
```

**🔍 Explanation**

- `.final` is the "GO" layer, positioned in the same center spot as the counter.
- `<button id="replay">` — the `id` is our JavaScript hook. Its inner `<span>` lets us animate a hover arrow next to the text.

**✅ Checkpoint**
Now "GO" and a "Replay" button also appear. Everything is still unstyled and stacked. Time for CSS.

---

### Step 4: Add the Base Styles

**🎯 Goal**
Load the font, reset box-sizing, and prep the body.

**💡 Concept**
`overflow: hidden` on the body hides anything that animates outside the viewport (numbers swing off-screen), preventing scrollbars.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  height: 100vh;
  overflow: hidden;
}

h4 {
  font-size: 20px;
  margin: 5px;
  text-transform: uppercase;
}
```

**🔍 Explanation**

- `@import` loads Roboto.
- `body` fills the viewport (`height: 100vh`), drops default margins, and hides overflow.
- `h4` styles the "Get Ready" caption: uppercase and modestly sized.

**✅ Checkpoint**
The font changes and "GET READY" becomes uppercase. Elements are still stacked at the top-left — centering is next.

---

### Step 5: Center and Hide the Counter

**🎯 Goal**
Center the counter on screen and define how it disappears when the count ends.

**💡 Concept**
`position: fixed` + `top/left: 50%` + `transform: translate(-50%, -50%)` is the go-to trick for perfect centering: the top-left corner moves to the middle, then `translate` pulls the element back by half its own size. A `.hide` class scales it to `0` to make it vanish.

**📝 Code**

```css
/* goes in style.css */
.counter {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.counter.hide {
  transform: translate(-50%, -50%) scale(0);
  animation: hide 0.2s ease-out;
}

@keyframes hide {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }

  100% {
    transform: translate(-50%, -50%) scale(0);
  }
}
```

**🔍 Explanation**

- `.counter` is pinned to the exact center of the screen.
- `.counter.hide` (both classes on the same element) scales it to `0` and plays the `hide` animation to shrink smoothly. Note we keep the `translate(-50%, -50%)` so it stays centered while shrinking.
- `@keyframes hide` animates from full size to nothing.

**✅ Checkpoint**
The counter (numbers + caption) is now centered on the page. It won't hide yet — JavaScript adds the `.hide` class later.

---

### Step 6: Center and Reveal the Final Screen

**🎯 Goal**
Center the "GO" layer, keep it hidden by default, and define its pop-in reveal.

**💡 Concept**
`.final` starts at `scale(0)` (invisible). A `.show` class scales it back to `1`, and its keyframes overshoot to `1.4` partway through for a lively "pop".

**📝 Code**

```css
/* goes in style.css */
.final {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  text-align: center;
}

.final.show {
  transform: translate(-50%, -50%) scale(1);
  animation: show 0.2s ease-out;
}

@keyframes show {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }

  30% {
    transform: translate(-50%, -50%) scale(1.4);
  }

  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
```

**🔍 Explanation**

- `.final` is centered but scaled to `0`, so "GO" is invisible on load.
- `.final.show` scales it to `1` and plays `show`.
- `@keyframes show` grows past full size (`1.4` at `30%`) then settles at `1` — the bounce that makes "GO" feel energetic.

**✅ Checkpoint**
"GO" and the Replay button vanish (they're scaled to 0). Only the centered counter is visible now. Good — that's the correct starting state.

---

### Step 7: Create the Numbers Window

**🎯 Goal**
Give `.nums` a fixed size and clip anything outside it.

**💡 Concept**
`overflow: hidden` turns `.nums` into a small window; numbers swinging outside its bounds are clipped, so only the "in position" number is visible. `position: relative` anchors the absolutely-positioned numbers inside it.

**📝 Code**

```css
/* goes in style.css */
.nums {
  color: #3498db;
  font-size: 50px;
  position: relative;
  overflow: hidden;
  width: 250px;
  height: 50px;
}
```

**🔍 Explanation**

- `color: #3498db; font-size: 50px` — big blue numbers.
- `position: relative` — the numbers position themselves against this box.
- `overflow: hidden` + fixed `width/height` — the clipping window.

**✅ Checkpoint**
The numbers are now blue and large, but likely still overlapping inside the box. The next step positions and rotates them.

---

### Step 8: Position and Rotate Each Number

**🎯 Goal**
Stack all numbers in the same spot and rotate them out of view by default.

**💡 Concept**
Every `<span>` is absolutely centered in the same place. `transform-origin: bottom center` sets the pivot at the bottom, so `rotate(120deg)` swings the number down and out of the window — like a pendulum hanging off-screen.

**📝 Code**

```css
/* goes in style.css */
.nums span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(120deg);
  transform-origin: bottom center;
}
```

**🔍 Explanation**

- `position: absolute` + centered `top/left` + `translate(-50%, -50%)` stacks every number in the exact center of the window.
- `transform-origin: bottom center` moves the rotation pivot to the bottom of the number.
- `rotate(120deg)` swings each number down and out of the visible window — so by default, no number shows.

**✅ Checkpoint**
The numbers disappear (they're rotated out of the clipped window). This is expected — only the number with class `in` should show, which we style next.

---

### Step 9: Animate Numbers In and Out

**🎯 Goal**
Define the swing-in (`in`) and swing-out (`out`) animations.

**💡 Concept**
A number with class `in` swings up to `0deg` (upright, visible) with a bouncy overshoot. A number with class `out` swings from upright to `-120deg` (up and off the other side). These two classes are what JavaScript will add and remove to drive the sequence.

**📝 Code**

```css
/* goes in style.css */
.nums span.in {
  transform: translate(-50%, -50%) rotate(0deg);
  animation: goIn 0.5s ease-in-out;
}

.nums span.out {
  animation: goOut 0.5s ease-in-out;
}

@keyframes goIn {
  0% {
    transform: translate(-50%, -50%) rotate(120deg);
  }

  30% {
    transform: translate(-50%, -50%) rotate(-20deg);
  }

  60% {
    transform: translate(-50%, -50%) rotate(10deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
}

@keyframes goOut {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  60% {
    transform: translate(-50%, -50%) rotate(20deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(-120deg);
  }
}
```

**🔍 Explanation**

- `.nums span.in` ends at `rotate(0deg)` (upright and visible) and plays `goIn`. `goIn` swings from `120deg` up past vertical (overshooting to `-20deg` and `10deg`) before settling at `0` — a pendulum bounce.
- `.nums span.out` plays `goOut`, swinging from `0deg` up to `-120deg` (off the top-other-side and out of view).
- Because our HTML gave `3` the class `in`, it swings into view on page load. The rest we'll orchestrate in JavaScript.

**✅ Checkpoint**
Reload the page: the **3** now swings into view with a bounce. It just sits there afterward — we need JavaScript to advance to 2, 1, 0.

---

### Step 10: Style the Replay Button

**🎯 Goal**
Style the Replay button and add a sliding `»` arrow on hover.

**💡 Concept**
A `::after` pseudo-element inserts extra content (the `»` character, Unicode `\00bb`) without adding HTML. It starts invisible and off to the side, then slides in and fades up when the button is hovered.

**📝 Code**

```css
/* goes in style.css */
#replay{
  background-color: #3498db;
  border-radius: 3px;
  border: none;
  color: aliceblue;
  padding: 5px;
  text-align: center;
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s;
}

#replay span{
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.3s;
}

#replay span:after{
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

#replay:hover span{
  padding-right: 25px;
}

#replay:hover span:after{
  opacity: 1;
  right: 0;
}
```

**🔍 Explanation**

- `#replay` — the blue button base, with `transition: all 0.3s` for smooth changes.
- `#replay span:after` — inserts the `»` glyph, positioned absolutely, invisible (`opacity: 0`) and 20px to the right.
- On hover: the span gains right padding (making room) and the arrow fades in (`opacity: 1`) and slides to `right: 0`. The result is a `»` that "grows" out of the word Replay.

**✅ Checkpoint**
The Replay button is styled blue — but you can only see it once the countdown finishes. Now let's write the JavaScript to run the whole sequence.

---

### Step 11: Select the Elements

**🎯 Goal**
Grab the numbers, the counter, the final screen, and the replay button.

**💡 Concept**
`querySelectorAll('.nums span')` returns all four number spans as a list we can loop over; the others are single elements grabbed with `querySelector`.

**📝 Code**

```javascript
// goes in script.js
const nums = document.querySelectorAll('.nums span')
const counter = document.querySelector('.counter')
const finalMessage = document.querySelector('.final')
const replay = document.querySelector('#replay')
```

**🔍 Explanation**

- `nums` — the list `[3, 2, 1, 0]` spans.
- `counter` and `finalMessage` — the two layers we'll hide/show.
- `replay` — the button we'll wire up to restart.

**✅ Checkpoint**
No visible change. In the console, type `nums.length` — it should print `4`, confirming the selection works.

---

### Step 12: Chain the Number Animations

**🎯 Goal**
Make each number, after it finishes animating, trigger the next step — the heart of the countdown.

**💡 Concept**
The **`animationend`** event fires when a CSS animation completes. Its `e.animationName` tells us *which* animation just ended (`goIn` or `goOut`). We use that to decide what happens next: after a number swings **in**, send it **out**; after it swings **out**, bring the **next** number in; and when the last number finishes, reveal "GO".

**📝 Code**

```javascript
// goes in script.js
function runAnimation() {
  nums.forEach((num, idx) => {
    const nextToLast = nums.length - 1

    num.addEventListener('animationend', (e) => {
      if (e.animationName === 'goIn' && idx !== nextToLast) {
        num.classList.remove('in')
        num.classList.add('out')
      } else if (e.animationName === 'goOut' && num.nextElementSibling) {
        num.nextElementSibling.classList.add('in')
      } else {
        counter.classList.add('hide')
        finalMessage.classList.add('show')
      }
    })
  })
}
```

**🔍 Explanation**

- We loop over each number span with its index `idx`. `nextToLast = nums.length - 1` is the index of the **last** number (`0`, at index 3).
- We attach an `animationend` listener to each number. When one fires:
  - **`goIn` finished and it's not the last number** → remove `in`, add `out` so it swings away.
  - **`goOut` finished and there's a next sibling** → add `in` to `num.nextElementSibling`, bringing the next number in.
  - **Otherwise** (the last number's `goIn` finished) → add `hide` to the counter and `show` to the final screen, revealing "GO".
- This creates the chain: **3 in → 3 out → 2 in → 2 out → 1 in → 1 out → 0 in → GO**.

**✅ Checkpoint**
Nothing runs yet — we've only *defined* the function. We call it next.

---

### Step 13: Kick Off the Countdown on Load

**🎯 Goal**
Start the animation chain automatically when the page loads.

**💡 Concept**
The CSS already made `3` swing in on load (it has class `in`). Attaching the listeners lets that first `animationend` cascade through the rest. We just need to call `runAnimation()` once.

**📝 Code**

```javascript
// goes in script.js, ABOVE the runAnimation function definition
runAnimation()
```

**🔍 Explanation**
Calling `runAnimation()` attaches all the `animationend` listeners. Because `3` is already animating in (from the CSS `in` class), its listener fires when it lands, kicking off the whole chain. (This call sits above the function in the file; that's fine because function declarations are hoisted.)

**✅ Checkpoint**
Reload the page: the full countdown plays — 3, 2, 1, 0 each swing in and out, then the counter shrinks away and "GO" pops in with the Replay button. The Replay button doesn't work yet.

---

### Step 14: Reset Everything for Replay

**🎯 Goal**
Write a function that returns the page to its starting state.

**💡 Concept**
To replay, we undo everything: remove `hide`/`show` so the counter shows and "GO" hides, clear every number's classes, then put `in` back on the first number so it can swing in again. `classList.value = ''` wipes all classes off an element at once.

**📝 Code**

```javascript
// goes in script.js
function resetDOM() {
  counter.classList.remove('hide')
  finalMessage.classList.remove('show')

  nums.forEach((num) => {
    num.classList.value = ''
  })

  nums[0].classList.add('in')
}
```

**🔍 Explanation**

- `counter.classList.remove('hide')` brings the counter back; `finalMessage.classList.remove('show')` hides "GO" again.
- The `forEach` clears **all** classes from every number (removing leftover `in`/`out`), so each starts fresh and rotated out of view.
- `nums[0].classList.add('in')` re-marks the first number (`3`) as active, so it will swing in when the animation restarts.

**✅ Checkpoint**
No change yet — `resetDOM` isn't called until we wire up the button next.

---

### Step 15: Wire Up the Replay Button

**🎯 Goal**
Make Replay reset the DOM and run the countdown again.

**💡 Concept**
On click we reset to the starting state, then call `runAnimation()` to re-attach listeners and let the freshly-added `in` class on `3` restart the cascade.

**📝 Code**

```javascript
// goes in script.js, at the bottom
replay.addEventListener('click', () => {
  resetDOM()
  runAnimation()
})
```

**🔍 Explanation**

- `resetDOM()` puts everything back to the start (counter visible, "GO" hidden, `3` marked `in`).
- `runAnimation()` re-registers the `animationend` listeners so the chain plays through again.

**✅ Checkpoint**
Let the countdown finish, then click **Replay** — the counter reappears and the whole 3-2-1-0-GO sequence plays again. Hover the button to see the `»` arrow slide out. The project is complete!

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
    <title>Animated Countdown</title>
  </head>
  <body>
    <div class="counter">
      <div class="nums">
        <span class="in">3</span>
        <span>2</span>
        <span>1</span>
        <span>0</span>
      </div>
      <h4>Get Ready</h4>
    </div>

    <div class="final">
      <h1>GO</h1>
      <button id="replay">
        <span>Replay</span>
      </button>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

### `style.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  height: 100vh;
  overflow: hidden;
}

h4 {
  font-size: 20px;
  margin: 5px;
  text-transform: uppercase;
}

.counter {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.counter.hide {
  transform: translate(-50%, -50%) scale(0);
  animation: hide 0.2s ease-out;
}

@keyframes hide {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }

  100% {
    transform: translate(-50%, -50%) scale(0);
  }
}

.final {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  text-align: center;
}

.final.show {
  transform: translate(-50%, -50%) scale(1);
  animation: show 0.2s ease-out;
}

@keyframes show {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }

  30% {
    transform: translate(-50%, -50%) scale(1.4);
  }

  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}

.nums {
  color: #3498db;
  font-size: 50px;
  position: relative;
  overflow: hidden;
  width: 250px;
  height: 50px;
}

.nums span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(120deg);
  transform-origin: bottom center;
}

.nums span.in {
  transform: translate(-50%, -50%) rotate(0deg);
  animation: goIn 0.5s ease-in-out;
}

.nums span.out {
  animation: goOut 0.5s ease-in-out;
}

@keyframes goIn {
  0% {
    transform: translate(-50%, -50%) rotate(120deg);
  }

  30% {
    transform: translate(-50%, -50%) rotate(-20deg);
  }

  60% {
    transform: translate(-50%, -50%) rotate(10deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
}

@keyframes goOut {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  60% {
    transform: translate(-50%, -50%) rotate(20deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(-120deg);
  }
}

#replay{
  background-color: #3498db;
  border-radius: 3px;
  border: none;
  color: aliceblue;
  padding: 5px;
  text-align: center;
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s;
}

#replay span{
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.3s;
}

#replay span:after{
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

#replay:hover span{
  padding-right: 25px;
}

#replay:hover span:after{
  opacity: 1;
  right: 0;
}
```

### `script.js`

```javascript
const nums = document.querySelectorAll('.nums span')
const counter = document.querySelector('.counter')
const finalMessage = document.querySelector('.final')
const replay = document.querySelector('#replay')

runAnimation()

function resetDOM() {
  counter.classList.remove('hide')
  finalMessage.classList.remove('show')

  nums.forEach((num) => {
    num.classList.value = ''
  })

  nums[0].classList.add('in')
}

function runAnimation() {
  nums.forEach((num, idx) => {
    const nextToLast = nums.length - 1

    num.addEventListener('animationend', (e) => {
      if (e.animationName === 'goIn' && idx !== nextToLast) {
        num.classList.remove('in')
        num.classList.add('out')
      } else if (e.animationName === 'goOut' && num.nextElementSibling) {
        num.nextElementSibling.classList.add('in')
      } else {
        counter.classList.add('hide')
        finalMessage.classList.add('show')
      }
    })
  })
}

replay.addEventListener('click', () => {
  resetDOM()
  runAnimation()
})
```

---

## 6. Recap & Next Steps

**What you learned:**

- Centering with `position: fixed/absolute` + `translate(-50%, -50%)`.
- Writing multi-step `@keyframes` for rotation and scale, and using `transform-origin` to control the pivot.
- Driving a UI sequence with the `animationend` event and `e.animationName`.
- Chaining steps by adding/removing classes and traversing with `nextElementSibling`.
- Resetting DOM state (`classList.value = ''`) to replay from the beginning.

**Enhancement challenges:**

1. **Custom start number** — add an input so the user can count down from any number (dynamically generate the spans).
2. **Sound effects** — play a tick on each number and a whoosh on "GO".
3. **Pause/resume** — add a button that freezes and continues the countdown.
4. **Auto-restart loop** — after "GO", wait a few seconds and replay automatically.
5. **Remove duplicate listeners** — note that clicking Replay calls `runAnimation()`, which adds *another* `animationend` listener each time. Refactor so listeners are attached only once (or removed on reset) to keep it efficient.
