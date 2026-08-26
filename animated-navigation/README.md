# Animated Navigation

## 1. Project Overview

A compact navigation bar that **expands and collapses** when you click a hamburger button. The button spins into an "X", the bar widens, and the menu links flip into view.

**Key concepts involved:**

- The **active-class** toggle pattern (JS flips a class, CSS animates everything)
- CSS `transition`s and `transform`s (`rotate`, `rotateY`, `translateY`)
- Building a hamburger-to-X icon from two `<div>` lines

**HTML skills you'll gain:**

- Semantic navigation markup with `<nav>`, `<ul>`, `<li>`, `<a>`
- Constructing an icon from plain elements (no image needed)

**CSS skills you'll gain:**

- Layered `linear-gradient` backgrounds (a two-tone split screen)
- Animating `width`, `opacity`, and `transform` with `transition`
- Full-screen centering with Flexbox
- Morphing shapes using `rotate()` + `translateY()`

**JavaScript skills you'll gain:**

- `getElementById`
- `addEventListener('click', ...)` with a concise arrow function
- `classList.toggle()`

---

## 2. Final Project Preview

**Layout & colors:** The screen is split horizontally — light blue on the top half, darker blue on the bottom — with a white navigation bar floating dead-center. Inside the bar are four links (Home, Works, About, Contact) and a small button with two blue lines (a hamburger icon).

**Behavior & interactions:**

- The bar starts **expanded**, showing all links.
- Clicking the icon **collapses** the bar: it narrows to a small square, the links flip out and fade away, and the two lines return to a hamburger shape.
- Clicking again **expands** it: the bar widens, the links flip in with a 360° spin and fade in, and the two lines rotate into an "X".
- All changes animate smoothly over ~0.6 seconds.

**What you can interact with:** the hamburger/X toggle button.

---

## 3. Prerequisites

**You should know:** basic HTML, CSS (including selectors and transitions at a beginner level), and a little JavaScript.

**Tools needed:**

- A modern web browser
- A text editor (VS Code, etc.)
- Optional: the **Live Server** extension

**Files to create:**

```
animated-navigation/
├── index.html
├── style.css
└── script.js
```

---

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
    <title>Animated Navigation</title>
  </head>
  <body>
  </body>
</html>
```

**🔍 Explanation**
Encoding and viewport meta tags, a stylesheet link, and the page title.

**✅ Checkpoint**
A blank page titled "Animated Navigation".

---

### Step 2: Add the navigation and links

**🎯 Goal**
Create the nav bar with its menu links.

**💡 Concept**
`<nav>` is the semantic container for site navigation. We give it `id="nav"` (for JavaScript) and start it with `class="active"` so it opens expanded.

**📝 Code**

```html
<!-- goes in index.html, inside <body> -->
<nav class="active" id="nav">
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">Works</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
```

**🔍 Explanation**

- `<nav id="nav" class="active">` — the `id` is our JS hook; `active` marks it expanded.
- A `<ul>` list holds four links. `href="#"` is a placeholder link (goes nowhere).

**✅ Checkpoint**
Four links appear as a bulleted list (unstyled).

---

### Step 3: Add the hamburger icon button

**🎯 Goal**
Add the button that will toggle the menu.

**💡 Concept**
Instead of an image, the hamburger icon is just **two `<div>` lines** we'll style and animate with CSS. Each line has a shared class (`line`) plus a unique one (`line1`, `line2`).

**📝 Code**

```html
<!-- goes in index.html, inside <nav>, after the </ul> -->
<button class="icon" id="toggle">
  <div class="line line1"></div>
  <div class="line line2"></div>
</button>
```

**🔍 Explanation**

- `<button id="toggle">` is our clickable trigger (JS hook).
- The two `<div class="line">` elements become the horizontal bars of the icon; `line1`/`line2` let us animate each independently.

**✅ Checkpoint**
An empty-looking button appears next to the links (the lines have no size yet).

---

### Step 4: Base styles — the split-screen background

**🎯 Goal**
Center the nav on a two-tone background.

**💡 Concept**
A `linear-gradient` with **hard color stops at 50%** produces a crisp split instead of a fade. Flexbox centering places the nav in the middle of the viewport.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #eafbff;
  background-image: linear-gradient(
    to bottom,
    #eafbff 0%,
    #eafbff 50%,
    #5290f9 50%,
    #5290f9 100%
  );
  font-family: 'Muli', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
}
```

**🔍 Explanation**

- The gradient stays light blue from 0–50%, then jumps to darker blue from 50–100% — a clean horizontal split.
- `display: flex` + `align-items`/`justify-content: center` + `height: 100vh` center the nav on screen.

**✅ Checkpoint**
The page splits into light blue (top) and darker blue (bottom); the links sit centered.

---

### Step 5: Style the nav bar and its expanded width

**🎯 Goal**
Make the bar a white rounded box that animates its width.

**💡 Concept**
We define a small default width and a larger `.active` width, then let `transition: width` animate between them. `overflow-x: hidden` hides links while the bar is narrow.

**📝 Code**

```css
/* goes in style.css */
nav {
  background-color: #fff;
  padding: 20px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: width 0.6s linear;
  overflow-x: hidden;
}

nav.active {
  width: 350px;
}
```

**🔍 Explanation**

- The bar is white with padding, rounded corners, and a soft shadow.
- Default `width: 80px` (collapsed); `nav.active` bumps it to `350px` (expanded).
- `transition: width 0.6s linear` animates the width change over 0.6s.
- `overflow-x: hidden` clips content that doesn't fit when narrow.

**✅ Checkpoint**
Because the nav has `active` in the HTML, it's a wide white bar. The links may look cramped — we style them next.

---

### Step 6: Animate the link list width

**🎯 Goal**
Collapse the list to zero width when closed and full width when open.

**💡 Concept**
Animating the `<ul>`'s width (0 → 100%) in sync with the nav makes the links slide in/out smoothly rather than popping.

**📝 Code**

```css
/* goes in style.css */
nav ul {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 0;
  transition: width 0.6s linear;
}

nav.active ul {
  width: 100%;
}
```

**🔍 Explanation**

- `display: flex` lays the links out in a row; `list-style-type: none` removes bullets; `padding`/`margin: 0` strips default list spacing.
- `width: 0` hides the list by default; `nav.active ul` expands it to `100%`, animated over 0.6s.

**✅ Checkpoint**
The links now sit in a horizontal row inside the (currently open) bar.

---

### Step 7: Flip the links in and out

**🎯 Goal**
Fade and rotate each link when the menu opens/closes.

**💡 Concept**
`rotateY` spins an element around its vertical axis (a 3D flip). Pairing it with `opacity` gives a "flip in and appear" effect. Both are animated with `transition`.

**📝 Code**

```css
/* goes in style.css */
nav ul li {
  transform: rotateY(0deg);
  opacity: 0;
  transition: transform 0.6s linear, opacity 0.6s linear;
}

nav.active ul li {
  opacity: 1;
  transform: rotateY(360deg);
}
```

**🔍 Explanation**

- By default each `<li>` is invisible (`opacity: 0`) and unrotated.
- When the nav is active, links become visible and spin a full `360deg` as they appear.
- The `transition` list animates both `transform` and `opacity` together.

**✅ Checkpoint**
The links are now fully visible in the open bar. (You'll see them flip once you wire up toggling later.)

---

### Step 8: Style the link text

**🎯 Goal**
Make the links look like plain menu items.

**💡 Concept**
`position: relative` sets up the links for any future decorative positioning; removing the underline and adding margins cleans them up.

**📝 Code**

```css
/* goes in style.css */
nav ul a {
  position: relative;
  color: #000;
  text-decoration: none;
  margin: 0 10px;
}
```

**🔍 Explanation**
Black text, no underline, and 10px of horizontal spacing between links.

**✅ Checkpoint**
The four links are black, underline-free, and evenly spaced.

---

### Step 9: Style the icon button

**🎯 Goal**
Turn the button into a small square canvas for the two lines.

**💡 Concept**
`position: relative` on the button lets us absolutely position the two lines inside it precisely.

**📝 Code**

```css
/* goes in style.css */
.icon {
  background-color: #fff;
  border: 0;
  cursor: pointer;
  padding: 0;
  position: relative;
  height: 30px;
  width: 30px;
}

.icon:focus {
  outline: 0;
}
```

**🔍 Explanation**

- A borderless 30×30 white button with a pointer cursor.
- `position: relative` anchors the absolutely-positioned lines we add next.
- `:focus { outline: 0 }` removes the default focus ring.

**✅ Checkpoint**
The toggle is now a small white square (lines still invisible — coming next).

---

### Step 10: Draw the two hamburger lines

**🎯 Goal**
Render two short horizontal blue bars, one above the other.

**💡 Concept**
Absolute positioning inside the button lets us place `line1` near the top and `line2` near the bottom. A `transition` on `transform` prepares them to animate later.

**📝 Code**

```css
/* goes in style.css */
.icon .line {
  background-color: #5290f9;
  height: 2px;
  width: 20px;
  position: absolute;
  top: 10px;
  left: 5px;
  transition: transform 0.6s linear;
}

.icon .line2 {
  top: auto;
  bottom: 10px;
}
```

**🔍 Explanation**

- Each `.line` is a 20×2px blue bar, absolutely positioned 10px from the top and 5px from the left.
- `.line2` overrides the vertical position to sit 10px from the **bottom** instead, creating the gap between the two bars.

**✅ Checkpoint**
The button now clearly shows a hamburger icon (two stacked blue lines).

---

### Step 11: Morph the lines into an X

**🎯 Goal**
Rotate the two lines into a cross when the nav is active.

**💡 Concept**
Rotating one line +45° and the other -45° (then nudging with `translateY`) forms an X. Using `765deg` (720 + 45) adds two full spins for a fun twirl during the transition.

**📝 Code**

```css
/* goes in style.css */
nav.active .icon .line1 {
  transform: rotate(-765deg) translateY(5.5px);
}

nav.active .icon .line2 {
  transform: rotate(765deg) translateY(-5.5px);
}
```

**🔍 Explanation**

- `765deg` is `720deg` (two full rotations, visually identical to 0) plus `45deg` — so the bar ends at 45° but spins twice getting there.
- `line1` rotates one way and `line2` the opposite way; the `translateY` nudges bring their centers together into a clean X.

**✅ Checkpoint**
Since the nav starts `active`, the icon now shows an **X**. Time to make it toggle.

---

### Step 12: Toggle the menu with JavaScript

**🎯 Goal**
Open/close the nav (and animate everything) on click.

**💡 Concept**
One click listener flips the `active` class on the nav; every `nav.active` CSS rule we wrote then animates automatically. This is the core "state in a class" pattern.

**📝 Code**

```js
// goes in script.js
const toggle = document.getElementById('toggle')
const nav = document.getElementById('nav')

toggle.addEventListener('click', () => nav.classList.toggle('active'))
```

**🔍 Explanation**

- `toggle` and `nav` reference the button and the nav bar.
- On click, `nav.classList.toggle('active')` adds `active` if absent or removes it if present.
- The concise arrow function `() => nav.classList.toggle('active')` is a one-line body with an implicit action.

**✅ Checkpoint**
Click the icon: the bar narrows, the links flip out and fade, and the X returns to a hamburger. Click again to reverse it — all smoothly animated. 🎉

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
    <title>Animated Navigation</title>
  </head>
  <body>
    <nav class="active" id="nav">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Works</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      <button class="icon" id="toggle">
        <div class="line line1"></div>
        <div class="line line2"></div>
      </button>
    </nav>
    <script src="script.js"></script>

    <!-- Dribbble link: https://dribbble.com/shots/2427219-Header-Navigation-Day-053-dailyui -->
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
  background-color: #eafbff;
  background-image: linear-gradient(
    to bottom,
    #eafbff 0%,
    #eafbff 50%,
    #5290f9 50%,
    #5290f9 100%
  );
  font-family: 'Muli', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
}

nav {
  background-color: #fff;
  padding: 20px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: width 0.6s linear;
  overflow-x: hidden;
}

nav.active {
  width: 350px;
}

nav ul {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 0;
  transition: width 0.6s linear;
}

nav.active ul {
  width: 100%;
}

nav ul li {
  transform: rotateY(0deg);
  opacity: 0;
  transition: transform 0.6s linear, opacity 0.6s linear;
}

nav.active ul li {
  opacity: 1;
  transform: rotateY(360deg);
}

nav ul a {
  position: relative;
  color: #000;
  text-decoration: none;
  margin: 0 10px;
}

.icon {
  background-color: #fff;
  border: 0;
  cursor: pointer;
  padding: 0;
  position: relative;
  height: 30px;
  width: 30px;
}

.icon:focus {
  outline: 0;
}

.icon .line {
  background-color: #5290f9;
  height: 2px;
  width: 20px;
  position: absolute;
  top: 10px;
  left: 5px;
  transition: transform 0.6s linear;
}

.icon .line2 {
  top: auto;
  bottom: 10px;
}

nav.active .icon .line1 {
  transform: rotate(-765deg) translateY(5.5px);
}

nav.active .icon .line2 {
  transform: rotate(765deg) translateY(-5.5px);
}
```

**script.js**

```js
const toggle = document.getElementById('toggle')
const nav = document.getElementById('nav')

toggle.addEventListener('click', () => nav.classList.toggle('active'))
```

---

## 6. Recap & Next Steps

**What you learned:**

- The active-class pattern where a single JS class toggle drives many CSS animations.
- Animating `width`, `opacity`, and `transform` with `transition`.
- Building an icon out of plain `<div>`s and morphing it with `rotate()` + `translateY()`.
- Creating a hard split-screen with a `linear-gradient` and hard color stops.
- Writing a concise one-line arrow-function event handler.

**Enhancement challenges:**

1. **Start collapsed:** remove `active` from the HTML so the menu begins closed, and confirm the toggle still works.
2. **Vertical menu:** make the bar drop down instead of widening (animate `height` and stack the links).
3. **Active link:** highlight the currently selected link with a colored underline using the `<a>`'s `::after`.
4. **Close on outside click:** add a listener on `document` that collapses the nav when the user clicks anywhere outside it.
5. **Stagger the links:** give each `<li>` a slightly different `transition-delay` so they flip in one after another.
