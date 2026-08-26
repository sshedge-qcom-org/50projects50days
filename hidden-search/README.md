# Hidden Search Widget

A code-along tutorial that rebuilds this project from three empty files. Follow it top to bottom to reproduce the exact app in this folder.

## 1. Project Overview

A search box that hides as a single icon button. Click the magnifying glass and the input field **slides open** to the right; click again and it collapses back into the icon.

**Key concepts involved**

- Layering two elements with absolute positioning
- Animating `width` and `transform` with CSS `transition`
- Toggling a state class with `classList.toggle`
- Programmatically focusing an input so the user can type immediately

**HTML skills you'll gain**

- A minimal, focused component: one `<input>` and one `<button>`
- Using an icon font (Font Awesome) from a CDN
- The `placeholder` attribute

**CSS skills you'll gain**

- `linear-gradient` backgrounds
- Centering with Flexbox
- `position: relative` / `absolute` to stack the button over the input
- Animating `width` vs. animating `transform: translateX`
- A `.active` state class that expands the widget

**JavaScript skills you'll gain**

- Selecting elements with `querySelector`
- Handling a `click` event
- `classList.toggle` for on/off state
- The `.focus()` method on an input element

## 2. Final Project Preview

**Layout & colors**

- A full-screen purple **gradient** background.
- Dead-center: a white square button showing a magnifying-glass icon. A white text input hides directly beneath it, collapsed to the same square size so only the button is visible at first.

**Behavior & interactions**

- Clicking the search button toggles the widget open: the input **expands** from a square to a 200px-wide field (animated), and the button **slides right** to sit at the end of the input.
- The input is auto-focused on click, so the cursor is ready and you can type right away.
- Clicking the button again collapses everything back to the single icon.

**What you can interact with**

- The **search button** (toggles open/closed)
- The **text input** (type your search once it's open)

## 3. Prerequisites

**You should know**

- Basic HTML tags and attributes
- Basic CSS: selectors, positioning, and transitions
- Basic JavaScript: variables and event listeners

**Tools**

- A modern web browser
- A text editor (VS Code recommended)
- Optional: the **Live Server** VS Code extension
- An internet connection (Font Awesome loads from a CDN)

**Files to create**

```
hidden-search/
├── index.html
├── style.css
└── script.js
```

## 4. Build the Project Step-by-Step

### Step 1: HTML Boilerplate + Font Awesome

**🎯 Goal**
Set up the page and load Font Awesome so the search icon will render.

**💡 Concept**
Font Awesome is an **icon font** loaded from a CDN. We link its stylesheet in the `<head>`, then display icons with `<i class="fas fa-...">`.

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
    <title>Hidden Search</title>
  </head>
  <body>
    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**

- The first `<link>` loads Font Awesome 5.14 from `cdnjs.cloudflare.com`; `integrity`/`crossorigin` verify the file is authentic.
- The second `<link>` loads our own `style.css` afterward.
- `<script>` sits at the bottom so the DOM is ready when it runs.

**✅ Checkpoint**
A blank page titled "Hidden Search".

---

### Step 2: Add the Search Widget Markup

**🎯 Goal**
Add the input field and the button that holds the search icon.

**💡 Concept**
We wrap both in a `.search` container. That wrapper becomes the positioning context and the element we'll add the `active` class to.

**📝 Code**

```html
<!-- goes in index.html — inside <body>, above the <script> -->
<div class="search">
  <input type="text" class="input" placeholder="Search...">
  <button class="btn">
    <i class="fas fa-search"></i>
  </button>
</div>
```

**🔍 Explanation**

- `.search` is the wrapper; toggling a class on it will drive the whole animation.
- `.input` is a text field with grey `placeholder` text ("Search...").
- `.btn` contains `<i class="fas fa-search">` — the Font Awesome magnifying-glass icon (`fas` = Font Awesome Solid).

**✅ Checkpoint**
You'll see an unstyled text box with a search-icon button next to it. If the icon is missing, recheck the Font Awesome `<link>`.

---

### Step 3: Import the Font and Reset the Box Model

**🎯 Goal**
Load the "Roboto" font and make sizing predictable.

**💡 Concept**
`@import` loads a Google Font. `box-sizing: border-box` makes an element's `width`/`height` include its padding and border — important here since the input has `padding` but must stay exactly 50px.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}
```

**🔍 Explanation**

- `@import` must be the first line of the CSS.
- The border-box reset means the input's `15px` padding won't push its total width past `50px`.

**✅ Checkpoint**
No visible change yet — the font is loaded.

---

### Step 4: Style the Body with a Gradient and Centering

**🎯 Goal**
Add the purple gradient background and center the widget on screen.

**💡 Concept**
`linear-gradient` creates a smooth color blend for the background. Flexbox centers the widget both ways in one place.

**📝 Code**

```css
/* goes in style.css */
body {
  background-image: linear-gradient(90deg, #7d5fff, #7158e2);
  font-family: 'Roboto', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}
```

**🔍 Explanation**

- `linear-gradient(90deg, #7d5fff, #7158e2)` blends two purples left-to-right (`90deg`).
- `display: flex` + `align-items: center` + `justify-content: center` center the `.search` widget vertically and horizontally.
- `height: 100vh` gives the body full screen height so vertical centering works; `overflow: hidden` prevents scrollbars from the sliding animation; `margin: 0` removes the default body margin.

**✅ Checkpoint**
A purple gradient fills the screen with the search widget centered.

---

### Step 5: Set Up the Search Container

**🎯 Goal**
Give the wrapper a fixed height and make it the positioning anchor.

**💡 Concept**
`position: relative` turns `.search` into the reference frame for the absolutely-positioned button we add next. Everything positioned `absolute` inside will be measured from this box.

**📝 Code**

```css
/* goes in style.css */
.search {
  position: relative;
  height: 50px;
}
```

**🔍 Explanation**

- `height: 50px` matches the input/button height so the layout is a tidy square.
- `position: relative` doesn't move the element, but it makes it the anchor for the button's `absolute` positioning in Step 7.

**✅ Checkpoint**
No dramatic change, but the container is now ready to layer its children.

---

### Step 6: Style the Collapsed Input

**🎯 Goal**
Make the input a small 50x50 square that will later expand — and animate the width change.

**💡 Concept**
The input starts as a square the same size as the button. We put a `transition` on `width` so that when it later grows to 200px, it slides open smoothly.

**📝 Code**

```css
/* goes in style.css */
.search .input {
  background-color: #fff;
  border: 0;
  font-size: 18px;
  padding: 15px;
  height: 50px;
  width: 50px;
  transition: width 0.3s ease;
}
```

**🔍 Explanation**

- `width: 50px; height: 50px` make it a square, matching the button.
- `border: 0` removes the default input border; `padding: 15px` gives typed text some breathing room.
- `transition: width 0.3s ease` animates **only** the width — so opening/closing glides over 0.3s.

**✅ Checkpoint**
The input is now a small white square (the button still sits beside it — we fix that next).

---

### Step 7: Layer the Button on Top of the Input

**🎯 Goal**
Position the button over the collapsed input so only the icon shows at first, and prepare it to slide.

**💡 Concept**
With `position: absolute; top: 0; left: 0`, the button stacks on top of the input's square. A `transition` on `transform` lets us slide it aside later without affecting layout.

**📝 Code**

```css
/* goes in style.css */
.btn {
  background-color: #fff;
  border: 0;
  cursor: pointer;
  font-size: 24px;
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;
  width: 50px;
  transition: transform 0.3s ease;
}
```

**🔍 Explanation**

- `position: absolute; top: 0; left: 0` places the 50x50 button exactly over the 50x50 input, hiding it — so only the button (icon) is visible.
- `cursor: pointer` signals it's clickable.
- `transition: transform 0.3s ease` will smoothly animate the slide (`translateX`) we add in Step 9.

**✅ Checkpoint**
You now see just a single white square button with the search icon, centered on the gradient. The input is hidden underneath.

---

### Step 8: Remove the Focus Outlines

**🎯 Goal**
Hide the default focus ring on the input and button for a cleaner look.

**💡 Concept**
Browsers draw an outline on focused form elements. We remove it here for aesthetics (see the recap for an accessibility note).

**📝 Code**

```css
/* goes in style.css */
.btn:focus,
.input:focus {
  outline: none;
}
```

**🔍 Explanation**

- The grouped selector applies `outline: none` to both the button and input when focused.

**✅ Checkpoint**
Clicking the button or input no longer shows a blue/black outline.

---

### Step 9: Define the "Active" (Expanded) State

**🎯 Goal**
Describe what "open" looks like: a wide input with the button pushed to its end.

**💡 Concept**
These rules only apply when `.search` also has the `active` class. Because we already added transitions to `width` and `transform`, toggling this class animates the widget open and closed.

**📝 Code**

```css
/* goes in style.css */
.search.active .input {
  width: 200px;
}

.search.active .btn {
  transform: translateX(198px);
}
```

**🔍 Explanation**

- `.search.active .input { width: 200px }` grows the input from 50px to 200px.
- `.search.active .btn { transform: translateX(198px) }` slides the button 198px to the right so it lands at the end of the now-expanded input (instead of covering it).
- Neither rule takes effect until JS adds the `active` class.

**✅ Checkpoint**
To preview, temporarily add `active` to the `.search` div's class in the HTML — the input should be open with the button at its right end. Remove `active` again before the next step.

---

### Step 10: Select the Elements in JavaScript

**🎯 Goal**
Grab the three elements the script needs.

**💡 Concept**
`querySelector` returns the first element matching a CSS selector — perfect when there's only one of each.

**📝 Code**

```js
// goes in script.js
const search = document.querySelector('.search')
const btn = document.querySelector('.btn')
const input = document.querySelector('.input')
```

**🔍 Explanation**

- `search` is the wrapper we toggle `active` on.
- `btn` is the button we listen to for clicks.
- `input` is the field we'll focus so the user can type immediately.

**✅ Checkpoint**
No visible change. In the DevTools Console, type `search` to confirm it returns the `.search` div.

---

### Step 11: Toggle Open/Closed on Click

**🎯 Goal**
Expand or collapse the widget when the button is clicked, and focus the input.

**💡 Concept**
`classList.toggle` adds the class if it's missing and removes it if it's present — perfect for an open/closed switch. `input.focus()` puts the text cursor in the field.

**📝 Code**

```js
// goes in script.js
btn.addEventListener('click', () => {
    search.classList.toggle('active')
    input.focus()
})
```

**🔍 Explanation**

- `search.classList.toggle('active')` flips the widget between collapsed and expanded, triggering the CSS transitions.
- `input.focus()` moves the cursor into the input so you can start typing right after clicking — a small but nice UX touch.

**✅ Checkpoint**
Done! Click the search button: the input slides open, the button moves to its end, and the cursor is ready in the field. Click again to collapse it. 🎉

---

## 5. Final Full Code (Reference)

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog==" crossorigin="anonymous" />
    <link rel="stylesheet" href="style.css" />
    <title>Hidden Search</title>
  </head>
  <body>
    <div class="search">
      <input type="text" class="input" placeholder="Search...">
      <button class="btn">
        <i class="fas fa-search"></i>
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
  background-image: linear-gradient(90deg, #7d5fff, #7158e2);
  font-family: 'Roboto', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.search {
  position: relative;
  height: 50px;
}

.search .input {
  background-color: #fff;
  border: 0;
  font-size: 18px;
  padding: 15px;
  height: 50px;
  width: 50px;
  transition: width 0.3s ease;
}

.btn {
  background-color: #fff;
  border: 0;
  cursor: pointer;
  font-size: 24px;
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;
  width: 50px;
  transition: transform 0.3s ease;
}

.btn:focus,
.input:focus {
  outline: none;
}

.search.active .input {
  width: 200px;
}

.search.active .btn {
  transform: translateX(198px);
}
```

### `script.js`

```js
const search = document.querySelector('.search')
const btn = document.querySelector('.btn')
const input = document.querySelector('.input')

btn.addEventListener('click', () => {
    search.classList.toggle('active')
    input.focus()
})
```

## 6. Recap & Next Steps

**What you learned**

- Stacking one element over another with `position: relative` + `absolute`.
- Animating `width` and `transform: translateX` with `transition` for a smooth open/close.
- Using a `.active` state class and flipping it with `classList.toggle`.
- Programmatically focusing an input with `.focus()` for better UX.

**Enhancement challenges**

1. **Close on outside click:** add a `document` click listener that removes `active` when the user clicks anywhere outside the widget.
2. **Accessibility:** replace `outline: none` with a custom `:focus-visible` style so keyboard users still see a focus indicator.
3. **Submit the search:** log the input's value to the console when the user presses Enter.
4. **Only toggle when empty:** keep the box open if it already contains text, so a stray click doesn't hide a typed query.
5. **Add a clear (X) button** inside the input that appears once text is entered.
