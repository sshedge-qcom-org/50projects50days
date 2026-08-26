# Scroll Animation

A code-along tutorial that rebuilds this project from three empty files. Follow it top to bottom to reproduce the exact app in this folder.

## 1. Project Overview

A vertical list of boxes that **slide into view from alternating sides** as you scroll down the page — odd boxes fly in from the right, even boxes from the left. Scroll back up and they slide away again.

**Key concepts involved**

- Listening for the window `scroll` event
- Measuring an element's position with `getBoundingClientRect()`
- Comparing that position to a "trigger" line to decide visibility
- Toggling a class to animate elements on and off screen

**HTML skills you'll gain**

- Repeating a simple block (the `.box`) to build a scrollable list
- Semantic headings inside content blocks

**CSS skills you'll gain**

- Vertical layout with `flex-direction: column`
- Hiding elements off-screen with `transform: translateX()`
- The `:nth-of-type(even)` selector to alternate styling
- Smooth reveals with `transition`
- `box-shadow` and `border-radius` for card styling

**JavaScript skills you'll gain**

- Selecting many elements with `querySelectorAll`
- Handling the `scroll` event
- `getBoundingClientRect()` and `window.innerHeight`
- Running a check both on scroll and once on load

## 2. Final Project Preview

**Layout & colors**

- A soft cream (`#efedd6`) page with a heading, "Scroll to see the animation", at the top.
- A single centered column of 13 steel-blue cards, each 400x200px with rounded corners, a drop shadow, and the white word "Content" centered inside.

**Behavior & interactions**

- Boxes begin **off-screen horizontally**: odd-numbered boxes wait far to the right, even-numbered boxes far to the left.
- As you scroll and a box crosses into the lower part of the viewport (about 80% down), it **slides to its center position** — alternating sides create a zig-zag reveal.
- Scroll a box back out of that zone and it slides back off-screen (the animation is reversible).

**What you can interact with**

- Scrolling the page (that's the whole interaction — the effect is scroll-driven).

## 3. Prerequisites

**You should know**

- Basic HTML and CSS
- Basic JavaScript: variables, functions, and array iteration

**Tools**

- A modern web browser
- A text editor (VS Code recommended)
- Optional: the **Live Server** VS Code extension

**Files to create**

```
scroll-animation/
├── index.html
├── style.css
└── script.js
```

## 4. Build the Project Step-by-Step

### Step 1: HTML Boilerplate

**🎯 Goal**
Create the page skeleton and link the CSS and JS.

**💡 Concept**
The usual setup: stylesheet in the `<head>`, script at the end of the `<body>`.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Scroll Animation</title>
  </head>
  <body>
    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**

- `<link>` connects `style.css`.
- The bottom `<script>` ensures the boxes exist in the DOM before the JS selects them.

**✅ Checkpoint**
A blank page titled "Scroll Animation".

---

### Step 2: Add the Heading and the Boxes

**🎯 Goal**
Add the intro heading and the 13 content boxes we'll animate.

**💡 Concept**
We need enough boxes to make the page scroll. Each is a `.box` with an `<h2>` inside. The repetition is intentional — they're identical in markup and get their alternating behavior purely from CSS.

**📝 Code**

```html
<!-- goes in index.html — inside <body>, above the <script> -->
<h1>Scroll to see the animation</h1>
<div class="box"><h2>Content</h2></div>
<div class="box"><h2>Content</h2></div>
<div class="box"><h2>Content</h2></div>
<div class="box"><h2>Content</h2></div>
<div class="box"><h2>Content</h2></div>
<div class="box"><h2>Content</h2></div>
<div class="box"><h2>Content</h2></div>
<div class="box"><h2>Content</h2></div>
<div class="box"><h2>Content</h2></div>
<div class="box"><h2>Content</h2></div>
<div class="box"><h2>Content</h2></div>
<div class="box"><h2>Content</h2></div>
<div class="box"><h2>Content</h2></div>
```

**🔍 Explanation**

- The `<h1>` tells the user what to do.
- There are **13** `.box` divs — enough content to require scrolling, which is what drives the effect.
- Every box is identical; CSS (via `:nth-of-type`) will make the even ones behave differently.

**✅ Checkpoint**
You'll see the heading followed by 13 stacked "Content" lines (unstyled).

---

### Step 3: Import the Font and Reset the Box Model

**🎯 Goal**
Load the "Roboto" font and normalize sizing.

**💡 Concept**
`@import` pulls in the Google Font; `box-sizing: border-box` keeps element sizes predictable.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}
```

**🔍 Explanation**

- `@import` must be the first line.
- The `*` reset applies `border-box` to every element.

**✅ Checkpoint**
No visible change yet.

---

### Step 4: Lay Out the Page as a Centered Column

**🎯 Goal**
Stack the heading and boxes vertically, centered, and hide horizontal overflow.

**💡 Concept**
`flex-direction: column` stacks children top-to-bottom. Crucially, `overflow-x: hidden` clips the boxes while they sit **off-screen to the sides**, so they don't create a horizontal scrollbar.

**📝 Code**

```css
/* goes in style.css */
body {
  background-color: #efedd6;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  overflow-x: hidden;
}
```

**🔍 Explanation**

- `display: flex; flex-direction: column` stacks the heading and boxes in a vertical column.
- `align-items: center` centers them horizontally.
- `overflow-x: hidden` is essential: boxes start far to the left/right, and this hides that horizontal overflow so only the vertical scroll remains.
- `margin: 0` removes the default body margin.

**✅ Checkpoint**
The heading and "Content" items are now centered in a column on a cream background.

---

### Step 5: Style the Heading

**🎯 Goal**
Give the heading a little breathing room.

**💡 Concept**
A small margin so the heading isn't cramped against the first box.

**📝 Code**

```css
/* goes in style.css */
h1 {
  margin: 10px;
}
```

**🔍 Explanation**

- `margin: 10px` adds even spacing around the heading.

**✅ Checkpoint**
Slightly more space around the heading. Subtle but intentional.

---

### Step 6: Style the Boxes and Hide Them Off-Screen

**🎯 Goal**
Turn the plain divs into styled cards that start **off-screen to the right**, ready to slide in.

**💡 Concept**
`transform: translateX(400%)` shifts each box far to the right (400% of its own width), hiding it beyond the screen edge. A `transition` on `transform` means any later move animates smoothly.

**📝 Code**

```css
/* goes in style.css */
.box {
  background-color: steelblue;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 200px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.3);
  transform: translateX(400%);
  transition: transform 0.4s ease;
}
```

**🔍 Explanation**

- `background-color: steelblue` + `color: #fff` give the card its look; `border-radius: 10px` rounds it and `box-shadow` lifts it off the page.
- `display: flex` with centering centers the "Content" text inside.
- `transform: translateX(400%)` pushes the box far to the right — off-screen and hidden (thanks to `overflow-x: hidden`).
- `transition: transform 0.4s ease` animates the slide whenever the transform changes.

**✅ Checkpoint**
The boxes vanish to the right — the column looks mostly empty now (just the heading). That's correct: they're waiting off-screen.

---

### Step 7: Send Even Boxes to the Opposite Side

**🎯 Goal**
Make even-numbered boxes start off-screen to the **left** instead of the right.

**💡 Concept**
`:nth-of-type(even)` selects every other box. Flipping their starting `translateX` to a negative value sets up the alternating left/right reveal.

**📝 Code**

```css
/* goes in style.css */
.box:nth-of-type(even) {
  transform: translateX(-400%);
}
```

**🔍 Explanation**

- `:nth-of-type(even)` matches the 2nd, 4th, 6th... box.
- `translateX(-400%)` starts them far to the **left**, mirroring the odd boxes on the right. This is what produces the zig-zag entrance.

**✅ Checkpoint**
Still nothing visible (all boxes remain off-screen), but odd and even boxes are now hidden on opposite sides.

---

### Step 8: Define the "Shown" Position

**🎯 Goal**
Describe where a box lands when revealed: its natural centered position.

**💡 Concept**
The `.show` class resets the transform to `translateX(0)`. Because both starting positions transition to this same spot, JS just needs to add/remove `.show`.

**📝 Code**

```css
/* goes in style.css */
.box.show {
  transform: translateX(0);
}
```

**🔍 Explanation**

- `.box.show` targets a box that also has the `show` class.
- `transform: translateX(0)` moves it to its default position (no horizontal offset), sliding it in from whichever side it started on.

**✅ Checkpoint**
To preview, temporarily add `show` to one box's class in the HTML (e.g. `<div class="box show">`) — it should slide into view. Remove it again before continuing.

---

### Step 9: Enlarge the Box Text

**🎯 Goal**
Make the "Content" label big and bold.

**💡 Concept**
Simple typographic sizing for the inner heading.

**📝 Code**

```css
/* goes in style.css */
.box h2 {
  font-size: 45px;
}
```

**🔍 Explanation**

- `font-size: 45px` makes the "Content" text large and prominent inside each card.

**✅ Checkpoint**
Any box you reveal shows large "Content" text. Styling is complete — now the scroll logic.

---

### Step 10: Select the Boxes and Listen for Scrolling

**🎯 Goal**
Grab all the boxes and run a check whenever the user scrolls (and once immediately).

**💡 Concept**
`querySelectorAll` returns all boxes. We attach `checkBoxes` to the `scroll` event, then also call it once so boxes already in view on load get revealed right away.

**📝 Code**

```js
// goes in script.js
const boxes = document.querySelectorAll('.box')

window.addEventListener('scroll', checkBoxes)

checkBoxes()
```

**🔍 Explanation**

- `boxes` is a `NodeList` of all 13 `.box` elements.
- `window.addEventListener('scroll', checkBoxes)` runs `checkBoxes` every time the page scrolls.
- The bare `checkBoxes()` call runs it once on load — without it, boxes already visible at the top wouldn't animate until the first scroll.
- `checkBoxes` is a hoisted function declaration, so referencing it here (before its definition below) is fine.

**✅ Checkpoint**
Scrolling throws a "checkBoxes is not defined" error for now — expected until the next step defines it.

---

### Step 11: Write `checkBoxes` to Reveal/Hide Each Box

**🎯 Goal**
Decide, for every box, whether it's far enough up the viewport to be shown.

**💡 Concept**
We set a **trigger line** at 80% of the viewport height. For each box, we read its distance from the top of the viewport with `getBoundingClientRect().top`; if it's above the trigger line, we show it, otherwise we hide it.

**📝 Code**

```js
// goes in script.js
function checkBoxes() {
    const triggerBottom = window.innerHeight / 5 * 4

    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top

        if(boxTop < triggerBottom) {
            box.classList.add('show')
        } else {
            box.classList.remove('show')
        }
    })
}
```

**🔍 Explanation**

- `window.innerHeight / 5 * 4` is 80% of the viewport's height — the imaginary line a box must cross to appear.
- `boxes.forEach(box => ...)` loops over every box.
- `box.getBoundingClientRect().top` is the box's current distance (in pixels) from the **top of the viewport**. As you scroll down, this number shrinks.
- `if (boxTop < triggerBottom)` — when the box's top rises above the 80% line, add `show` (it slides in). Otherwise remove `show` (it slides back out), which makes the effect reversible as you scroll up.

**✅ Checkpoint**
Done! Scroll down: each box slides in from alternating sides as it reaches the lower fifth of the screen, and slides back out when you scroll away. 🎉

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
    <title>Scroll Animation</title>
  </head>
  <body>
    <h1>Scroll to see the animation</h1>
    <div class="box"><h2>Content</h2></div>
    <div class="box"><h2>Content</h2></div>
    <div class="box"><h2>Content</h2></div>
    <div class="box"><h2>Content</h2></div>
    <div class="box"><h2>Content</h2></div>
    <div class="box"><h2>Content</h2></div>
    <div class="box"><h2>Content</h2></div>
    <div class="box"><h2>Content</h2></div>
    <div class="box"><h2>Content</h2></div>
    <div class="box"><h2>Content</h2></div>
    <div class="box"><h2>Content</h2></div>
    <div class="box"><h2>Content</h2></div>
    <div class="box"><h2>Content</h2></div>
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
  background-color: #efedd6;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  overflow-x: hidden;
}

h1 {
  margin: 10px;
}

.box {
  background-color: steelblue;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 200px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.3);
  transform: translateX(400%);
  transition: transform 0.4s ease;
}

.box:nth-of-type(even) {
  transform: translateX(-400%);
}

.box.show {
  transform: translateX(0);
}

.box h2 {
  font-size: 45px;
}
```

### `script.js`

```js
const boxes = document.querySelectorAll('.box')

window.addEventListener('scroll', checkBoxes)

checkBoxes()

function checkBoxes() {
    const triggerBottom = window.innerHeight / 5 * 4

    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top

        if(boxTop < triggerBottom) {
            box.classList.add('show')
        } else {
            box.classList.remove('show')
        }
    })
}
```

## 6. Recap & Next Steps

**What you learned**

- Reacting to the `scroll` event and running the same check on load.
- Measuring an element's viewport position with `getBoundingClientRect().top`.
- Comparing against a trigger line derived from `window.innerHeight`.
- Alternating styles with `:nth-of-type(even)` and animating with `transform` + `transition`.
- Toggling a `.show` class to make a reveal reversible.

**Enhancement challenges**

1. **One-way reveal:** stop removing `show`, so boxes stay put once they've appeared.
2. **Fade in too:** animate `opacity` alongside the slide for a softer entrance.
3. **Upgrade to `IntersectionObserver`**, the modern, more efficient API for "is this element visible?" — no scroll listener needed.
4. **Vary the timing:** give each box a slightly different `transition-duration` for a looser, staggered feel.
5. **Throttle the scroll handler** so `checkBoxes` runs less often on rapid scrolling (a performance best practice).
