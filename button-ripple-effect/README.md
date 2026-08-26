# Button Ripple Effect

A code-along tutorial that rebuilds this project from three empty files, one small step at a time.

## 1. Project Overview

This project makes a button produce a Material-Design-style **ripple**: a white circle that expands and fades out from the exact spot you click.

**Key concepts involved**

- Reading mouse-click coordinates from an event
- Converting page coordinates into positions **inside** an element
- Creating, positioning, and removing DOM elements on the fly
- Driving an animation with CSS `@keyframes`

**HTML skills you'll gain**

- Building a minimal single-button page

**CSS skills you'll gain**

- Centering content full-screen with Flexbox
- Clipping an overflowing child with `overflow: hidden`
- Animating scale + opacity with `@keyframes` and `transform`

**JavaScript skills you'll gain**

- Attaching click listeners with `querySelectorAll` + `forEach`
- Using event properties: `pageX`/`pageY` and `offsetTop`/`offsetLeft`
- Creating an element, setting inline styles, and appending it
- Cleaning up with `setTimeout` and `element.remove()`
- Understanding `this` inside a regular `function` event handler

## 2. Final Project Preview

**Layout & colors**

- A solid black page.
- A single purple, uppercase "Click Me" button centered on screen.

**Behavior & interactions**

- Clicking anywhere on the button spawns a white circle at that point.
- The circle scales up and fades to transparent over half a second, then is removed from the page.
- Rapid clicks create multiple ripples, each from its own click position.

**What you can interact with**

- The "Click Me" button.

## 3. Prerequisites

**Basic knowledge required**

- Basic HTML, CSS, and JavaScript syntax.
- Familiarity with functions and events helps.

**Tools needed**

- A modern web browser.
- A text editor (VS Code recommended).
- An internet connection (loads the Roboto font).
- Optional: the **Live Server** extension.

**Files to create**

```
button-ripple-effect/
├── index.html
├── style.css
└── script.js
```

Create all three now, empty.

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML with a button

**🎯 Goal**
Set up the document and add the single button we'll animate.

**💡 Concept**
This whole project centers on one `<button>` carrying the class `ripple`, which JavaScript will target.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Button Ripple Effect</title>
  </head>
  <body>
    <button class="ripple">Click Me</button>
    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**

- Standard HTML5 boilerplate with our stylesheet linked.
- `<button class="ripple">` is the target; the `ripple` class is how JS will find it.
- The `<script>` at the end ensures the button exists before the script runs.

**✅ Checkpoint**
Open `index.html`. You'll see an unstyled "Click Me" button in the top-left.

---

### Step 2: Import the font and center the page

**🎯 Goal**
Set the font and center the button on a black background.

**💡 Concept**
A flex `<body>` sized to `100vh` centers its child both horizontally and vertically.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #000;
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

- `@import` loads the Roboto font (must be first line).
- `box-sizing: border-box` on everything makes sizing predictable.
- The body becomes a full-height flex container centering its content on a black background; `overflow: hidden` and `margin: 0` remove scrollbars and default gaps.

**✅ Checkpoint**
Reload. The button is now centered on a black page, using Roboto.

---

### Step 3: Style the button

**🎯 Goal**
Give the button its purple, uppercase look — and, crucially, clip anything overflowing it.

**💡 Concept**
`position: relative` makes the button the anchor for the absolutely-positioned ripple. `overflow: hidden` clips the ripple to the button's shape so it never spills outside.

**📝 Code**

```css
/* goes in style.css */
button {
  background-color: purple;
  color: #fff;
  border: 1px purple solid;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 20px 30px;
  overflow: hidden;
  margin: 10px 0;
  position: relative;
}

button:focus {
  outline: none;
}
```

**🔍 Explanation**

- Purple fill, white uppercase text with letter spacing, and generous padding give the button its look.
- `position: relative` sets the reference frame for the ripple (which will be `position: absolute`).
- `overflow: hidden` is what keeps the expanding circle contained within the button.
- `:focus { outline: none }` removes the default focus ring.

**✅ Checkpoint**
Reload. A styled purple "CLICK ME" button is centered on the page. Clicking does nothing yet.

---

### Step 4: Style the ripple circle

**🎯 Goal**
Define the white circle that JavaScript will inject on each click.

**💡 Concept**
The circle starts invisible-sized (`scale(0)`); an animation (next step) grows and fades it. `translate(-50%, -50%)` centers the circle on the exact click point that JS sets via `top`/`left`.

**📝 Code**

```css
/* goes in style.css */
button .circle {
  position: absolute;
  background-color: #fff;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  animation: scale 0.5s ease-out;
}
```

**🔍 Explanation**

- `.circle` is a 100px white round element positioned absolutely within the button.
- `translate(-50%, -50%)` shifts it so its center — not its corner — lands on the click coordinates JS assigns.
- `scale(0)` makes it start with zero size; `animation: scale 0.5s ease-out` runs the keyframes we define next.

**✅ Checkpoint**
No change yet — `.circle` elements don't exist until JS creates them, and the animation isn't defined.

---

### Step 5: Define the expand-and-fade animation

**🎯 Goal**
Animate the circle growing outward while fading away.

**💡 Concept**
A `@keyframes` block describes the end state; the browser animates from the element's starting values (`scale(0)`, full opacity) to these.

**📝 Code**

```css
/* goes in style.css */
@keyframes scale {
  to {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
  }
}
```

**🔍 Explanation**

- `to` defines the animation's end: scaled up 3× and fully transparent.
- Combined with the `.circle` start values, the ripple grows from nothing to 3× while fading out over 0.5s.

**✅ Checkpoint**
CSS is complete. Still nothing happens on click — the JavaScript that creates the circles is next.

---

### Step 6: Select the button(s) and add a click listener

**🎯 Goal**
Listen for clicks on every `.ripple` button.

**💡 Concept**
`querySelectorAll` returns *all* matches, so this works even if you add more buttons later. Using a regular `function` (not an arrow) matters here: inside it, `this` refers to the clicked button.

**📝 Code**

```js
// goes in script.js
const buttons = document.querySelectorAll('.ripple')

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        // coordinate math and circle creation go here (next steps)
    })
})
```

**🔍 Explanation**

- `buttons` is a list of all `.ripple` elements.
- `forEach` attaches a click listener to each one.
- We use `function (e)` rather than an arrow so that `this` inside refers to the button that was clicked; `e` is the click event with position info.

**✅ Checkpoint**
Reload, open the console. No errors — the listener is attached (it just does nothing yet).

---

### Step 7: Calculate the click position inside the button

**🎯 Goal**
Figure out where, *within the button*, the click landed.

**💡 Concept**
`pageX`/`pageY` give the click's position on the whole page. The button's `offsetLeft`/`offsetTop` give its position on the page. Subtracting one from the other yields coordinates **relative to the button** — exactly where the ripple should appear.

**📝 Code**

```js
// goes in script.js (inside the click handler)
const x = e.pageX
const y = e.pageY

const buttonTop = e.target.offsetTop
const buttonLeft = e.target.offsetLeft

const xInside = x - buttonLeft
const yInside = y - buttonTop
```

**🔍 Explanation**

- `e.pageX` / `e.pageY`: click coordinates measured from the top-left of the page.
- `e.target.offsetLeft` / `offsetTop`: the button's own distance from the page's top-left.
- `xInside` / `yInside`: the click position translated into coordinates *inside* the button — the ripple's origin.

**✅ Checkpoint**
Still nothing visible; we've only computed numbers. Next we use them to place a circle.

---

### Step 8: Create, place, and clean up the ripple

**🎯 Goal**
Spawn the circle at the click point and remove it after it finishes animating.

**💡 Concept**
We build a `<span>`, give it the `circle` class (which carries the animation), position it with the coordinates from Step 7, and append it to the button. A `setTimeout` removes it after the 0.5s animation so ripples don't pile up in the DOM.

**📝 Code**

```js
// goes in script.js (inside the click handler, after the coordinate math)
const circle = document.createElement('span')
circle.classList.add('circle')
circle.style.top = yInside + 'px'
circle.style.left = xInside + 'px'

this.appendChild(circle)

setTimeout(() => circle.remove(), 500)
```

**🔍 Explanation**

- `document.createElement('span')` builds a new element; `classList.add('circle')` applies the ripple styles + animation.
- Setting `style.top` and `style.left` (in pixels) positions the circle at the click point inside the button.
- `this.appendChild(circle)` adds it to the clicked button (`this` is that button, thanks to the regular `function`).
- `setTimeout(() => circle.remove(), 500)` deletes the circle after 500ms — matching the animation length — to keep the DOM clean.

**✅ Checkpoint**
Reload and click the button anywhere. A white ripple expands and fades from your click point, then disappears. Click rapidly to spawn several. Done!

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
    <title>Button Ripple Effect</title>
  </head>
  <body>
    <button class="ripple">Click Me</button>
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
  background-color: #000;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

button {
  background-color: purple;
  color: #fff;
  border: 1px purple solid;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 20px 30px;
  overflow: hidden;
  margin: 10px 0;
  position: relative;
}

button:focus {
  outline: none;
}

button .circle {
  position: absolute;
  background-color: #fff;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  animation: scale 0.5s ease-out;
}

@keyframes scale {
  to {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
  }
}
```

### `script.js`

```js
const buttons = document.querySelectorAll('.ripple')

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const x = e.pageX
        const y = e.pageY

        const buttonTop = e.target.offsetTop
        const buttonLeft = e.target.offsetLeft

        const xInside = x - buttonLeft
        const yInside = y - buttonTop

        const circle = document.createElement('span')
        circle.classList.add('circle')
        circle.style.top = yInside + 'px'
        circle.style.left = xInside + 'px'

        this.appendChild(circle)

        setTimeout(() => circle.remove(), 500)
    })
})
```

## 6. Recap & Next Steps

**What you learned**

- Reading click coordinates (`pageX`/`pageY`) and converting them to positions inside an element using `offsetLeft`/`offsetTop`.
- Creating, styling, and appending DOM elements at runtime, then removing them with `setTimeout`.
- Why a regular `function` handler gives you `this` as the clicked element.
- Animating scale and opacity with CSS `@keyframes`, clipped by `overflow: hidden`.

**Enhancement challenges**

1. **Match the ripple color to the button:** make ripples adapt if you add buttons of different colors.
2. **More buttons:** add several `.ripple` buttons and confirm each ripples independently (the code already supports this).
3. **Use `getBoundingClientRect`:** switch from `offsetTop`/`offsetLeft` to `getBoundingClientRect()` so ripples stay accurate even when the page is scrolled.
4. **Size the ripple to the button:** compute the circle's size from the button's dimensions so the ripple always covers it fully.
5. **Remove on `animationend`:** replace the `setTimeout` with an `animationend` event listener so cleanup always matches the real animation duration.
