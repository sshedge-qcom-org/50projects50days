# Incrementing Counter

## 1. Project Overview

Three social-media stat counters that **animate upward from 0** to their target numbers when the page loads, giving a satisfying "counting" effect.

**Key concepts involved:**

- Storing data in HTML with `data-*` attributes
- Selecting multiple elements and looping over them
- A self-scheduling animation loop with `setTimeout`
- Converting strings to numbers and rounding

**HTML skills you'll gain:**

- Using custom `data-target` attributes to hold values
- Loading icons from the Font Awesome CDN (`fab`, `fa-3x`)

**CSS skills you'll gain:**

- Full-screen Flexbox centering
- Stacking items in a column with `flex-direction`
- A responsive `@media` query to switch layout on small screens

**JavaScript skills you'll gain:**

- `document.querySelectorAll` + `forEach`
- Reading attributes with `getAttribute`
- The unary `+` operator to convert strings to numbers
- `Math.ceil()` for rounding up
- Recursive `setTimeout` to animate a value over time
- Template literals

---

## 2. Final Project Preview

**Layout & colors:** A purple full-screen page with three stat blocks side by side (they stack vertically on narrow screens). Each block shows a large brand icon (Twitter, YouTube, Facebook), a big number, and a white label beneath it, all in a monospace font.

**Behavior & interactions:**

- On page load, each number starts at 0 and **rapidly counts up** to its target (12,000 / 5,000 / 7,500), landing exactly on the target.
- This is a pure display animation — there are no buttons or inputs to click.

**What you can interact with:** nothing directly; the animation runs automatically on load. (Resize the window below ~580px to see the layout switch to a vertical stack.)

---

## 3. Prerequisites

**You should know:** basic HTML, CSS, and JavaScript (variables, functions, arrow functions).

**Tools needed:**

- A modern web browser
- A text editor (VS Code, etc.)
- Optional: the **Live Server** extension

**Files to create:**

```
incrementing-counter/
├── index.html
├── style.css
└── script.js
```

---

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML skeleton with icons and stylesheet

**🎯 Goal**
Set up the document and load the Font Awesome icon library plus our stylesheet.

**💡 Concept**
A **CDN** link makes Font Awesome's icons available by class name. We also link our own `style.css`.

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
    <title>Increment Counter</title>
  </head>
  <body>
  </body>
</html>
```

**🔍 Explanation**

- The first `<link>` loads Font Awesome 5 (with `integrity`/`crossorigin` for security verification).
- The second `<link>` loads our local `style.css`.
- The tab title is "Increment Counter".

**✅ Checkpoint**
A blank page titled "Increment Counter" with no console errors.

---

### Step 2: Add the first counter block

**🎯 Goal**
Build one stat block: an icon, a counter, and a label.

**💡 Concept**
The target number lives in a **`data-target`** attribute — a custom attribute for storing data on an element. The counter `<div>` is intentionally empty; JavaScript will fill it.

**📝 Code**

```html
<!-- goes in index.html, inside <body> -->
<div class="counter-container">
  <i class="fab fa-twitter fa-3x"></i>
  <div class="counter" data-target="12000"></div>
  <span>Twitter Followers</span>
</div>
```

**🔍 Explanation**

- `.counter-container` groups one stat's parts.
- `<i class="fab fa-twitter fa-3x">` shows the Twitter brand icon (`fab` = brand style) at triple size (`fa-3x`).
- `<div class="counter" data-target="12000">` is empty for now; `data-target` stores the goal number.
- `<span>` is the descriptive label.

**✅ Checkpoint**
You see the Twitter icon and the label "Twitter Followers" (the number is blank until we add JS).

---

### Step 3: Add the other two counter blocks

**🎯 Goal**
Add the YouTube and Facebook stats.

**💡 Concept**
Same structure, different icon, target, and label — so the one script we write later handles all three automatically.

**📝 Code**

```html
<!-- goes in index.html, after the first .counter-container -->
<div class="counter-container">
  <i class="fab fa-youtube fa-3x"></i>
  <div class="counter" data-target="5000"></div>
  <span>YouTube Subscribers</span>
</div>

<div class="counter-container">
  <i class="fab fa-facebook fa-3x"></i>
  <div class="counter" data-target="7500"></div>
  <span>Facebook Fans</span>
</div>
```

**🔍 Explanation**
Two more blocks with YouTube (target 5000) and Facebook (target 7500) icons and labels.

**✅ Checkpoint**
Three icons with their labels appear in a row (numbers still blank, layout unstyled).

---

### Step 4: Base styles — font, colors, and centering

**🎯 Goal**
Set the monospace font, purple background, white text, and center everything.

**💡 Concept**
The Flexbox centering recipe (`display: flex` + centered items + `height: 100vh`) fills the screen and centers the content block.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #8e44ad;
  color: #fff;
  font-family: 'Roboto Mono', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}
```

**🔍 Explanation**

- `@import` loads the "Roboto Mono" monospace font (first line of the file).
- `body` gets a purple background, white text, and is centered via Flexbox.
- `height: 100vh` fills the viewport; `overflow: hidden` and `margin: 0` remove scrollbars and default spacing.

**✅ Checkpoint**
The page is purple, text is white and monospaced, and the three blocks are centered in a row.

---

### Step 5: Style each counter block

**🎯 Goal**
Stack each block's icon, number, and label vertically with spacing.

**💡 Concept**
Making each `.counter-container` a **vertical flex column** centers its three parts and lets us space the blocks apart with margin.

**📝 Code**

```css
/* goes in style.css */
.counter-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 30px 50px;
}

.counter {
  font-size: 60px;
  margin-top: 10px;
}
```

**🔍 Explanation**

- `flex-direction: column` stacks icon → number → label vertically; `text-align: center` centers them.
- `margin: 30px 50px` adds vertical and generous horizontal spacing between blocks.
- `.counter` makes the number large (60px) with a little space above it.

**✅ Checkpoint**
Each block is now neatly centered, with room between the three columns. The big number area is reserved (still empty).

---

### Step 6: Make it responsive

**🎯 Goal**
Stack the blocks vertically on small screens.

**💡 Concept**
A `@media` query applies styles only when a condition (here, screen width ≤ 580px) is true — the foundation of responsive design.

**📝 Code**

```css
/* goes in style.css */
@media (max-width: 580px) {
  body {
    flex-direction: column;
  }
}
```

**🔍 Explanation**
When the viewport is 580px wide or less, the body switches from a row to a column, stacking the three blocks on top of each other.

**✅ Checkpoint**
Resize the browser narrow (≤580px): the three blocks stack vertically. Widen it: they return to a row.

---

### Step 7: Select the counters and reset them to zero

**🎯 Goal**
Grab all counter elements and start each display at 0.

**💡 Concept**
`querySelectorAll('.counter')` returns all three counters; `forEach` lets us set up each one identically.

**📝 Code**
First, load the script (add just before `</body>`):

```html
<!-- goes in index.html, just before </body> -->
<script src="script.js"></script>
```

Then:

```js
// goes in script.js
const counters = document.querySelectorAll('.counter')

counters.forEach(counter => {
    counter.innerText = '0'
})
```

**🔍 Explanation**

- `counters` is a NodeList of all three `.counter` divs.
- For each one, we set `innerText = '0'` so it visibly starts at zero before animating.

**✅ Checkpoint**
All three numbers now display **0**.

---

### Step 8: Write the counting animation

**🎯 Goal**
Increase each counter a little at a time until it reaches its target.

**💡 Concept**
We define an `updateCounter` function that reads the current value and the target, adds a small increment, then **schedules itself again** with `setTimeout` until it reaches the target. The unary `+` converts text like `"12000"` into the number `12000`.

**📝 Code**
Update the `forEach` from Step 7 to add the animation:

```js
// goes in script.js — replaces the forEach body from Step 7
counters.forEach(counter => {
    counter.innerText = '0'

    const updateCounter = () => {
        const target = +counter.getAttribute('data-target')
        const c = +counter.innerText

        const increment = target / 200

        if(c < target) {
            counter.innerText = `${Math.ceil(c + increment)}`
            setTimeout(updateCounter, 1)
        } else {
            counter.innerText = target
        }
    }

    updateCounter()
})
```

**🔍 Explanation**

- `+counter.getAttribute('data-target')` reads the `data-target` string and converts it to a number (`target`).
- `+counter.innerText` converts the currently displayed text to a number (`c`).
- `increment = target / 200` means it takes roughly 200 steps to finish, so bigger targets add bigger chunks and all counters finish around the same time.
- If we're below the target, we set the text to `c + increment` rounded up with `Math.ceil` (wrapped in a template literal), then call `setTimeout(updateCounter, 1)` to run again in ~1ms.
- Once we reach or pass the target, the `else` branch sets the exact target value so it lands cleanly (no overshoot).
- The final `updateCounter()` kicks off the loop for each counter.

**✅ Checkpoint**
Reload the page: all three numbers rapidly count up from 0 and settle exactly on 12000, 5000, and 7500. 🎉

---

## 5. Final Full Code (Reference)

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog==" crossorigin="anonymous" />
    <link rel="stylesheet" href="style.css" />
    <title>Increment Counter</title>
  </head>
  <body>
    <div class="counter-container">
      <i class="fab fa-twitter fa-3x"></i>
      <div class="counter" data-target="12000"></div>
      <span>Twitter Followers</span>
    </div>

    <div class="counter-container">
      <i class="fab fa-youtube fa-3x"></i>
      <div class="counter" data-target="5000"></div>
      <span>YouTube Subscribers</span>
    </div>

    <div class="counter-container">
      <i class="fab fa-facebook fa-3x"></i>
      <div class="counter" data-target="7500"></div>
      <span>Facebook Fans</span>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

**style.css**

```css
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #8e44ad;
  color: #fff;
  font-family: 'Roboto Mono', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.counter-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 30px 50px;
}

.counter {
  font-size: 60px;
  margin-top: 10px;
}

@media (max-width: 580px) {
  body {
    flex-direction: column;
  }
}
```

**script.js**

```js
const counters = document.querySelectorAll('.counter')

counters.forEach(counter => {
    counter.innerText = '0'

    const updateCounter = () => {
        const target = +counter.getAttribute('data-target')
        const c = +counter.innerText

        const increment = target / 200

        if(c < target) {
            counter.innerText = `${Math.ceil(c + increment)}`
            setTimeout(updateCounter, 1)
        } else {
            counter.innerText = target
        }
    }

    updateCounter()
})
```

---

## 6. Recap & Next Steps

**What you learned:**

- Storing values on elements with `data-*` attributes and reading them via `getAttribute`.
- Converting strings to numbers with the unary `+` operator.
- Animating a value with a self-scheduling `setTimeout` loop.
- Scaling the increment by `target / 200` so all counters finish together.
- Using `Math.ceil` to avoid fractional displays and snapping to the exact target at the end.
- Basic responsive design with an `@media` query.

**Enhancement challenges:**

1. **Format big numbers:** show `12,000` with thousands separators using `toLocaleString()`.
2. **Control the speed:** replace the fixed `setTimeout(…, 1)` with a duration-based calculation so the count always takes exactly, say, 2 seconds.
3. **Trigger on scroll:** start each counter only when it scrolls into view using an `IntersectionObserver`.
4. **Add a fourth stat:** insert another `.counter-container` (e.g. Instagram) and confirm the script handles it with no changes.
5. **Add a suffix:** display `12000+` or `12K` by appending text once the target is reached.
