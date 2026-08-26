# Mobile Tab Navigation

## 1. Project Overview

This project builds a **mobile-style tab bar** inside a phone-shaped frame. Four tabs sit at the bottom; tapping one fades in the matching full-screen image and highlights the active tab — just like the bottom navigation in many phone apps.

**Key concepts involved**
- DOM selection of multiple elements with `querySelectorAll`
- Attaching event listeners in a loop and using the item's **index** to link a tab to its content
- Toggling CSS classes (`add` / `remove`) to drive visual state
- Creating smooth show/hide transitions with CSS `opacity`
- Layering elements with `position: absolute` and stacking

**HTML skills you'll gain**
- Loading an icon library (Font Awesome) from a CDN
- Structuring a component with a media area plus a `<nav>` list
- Using icon `<i>` tags and semantic list markup

**CSS skills you'll gain**
- Building a fixed-size "device" frame with `overflow: hidden` and `border-radius`
- Absolutely positioning stacked images that fill their container
- Fading elements in/out with `opacity` + `transition`
- A flexible, equal-width nav bar using `flex: 1`

**JavaScript skills you'll gain**
- Selecting node lists with `querySelectorAll`
- Looping with `forEach` and using the loop **index**
- Adding click listeners and updating classes to reflect state
- Extracting repeated logic into small helper functions

---

## 2. Final Project Preview

**Layout & colors**
- A purple-tinted page background, centered both ways.
- A single **phone frame** (340×600) with a light gray border and rounded corners.
- A large image fills the frame above a white bottom **navigation bar**.
- The nav bar has four equal tabs — **Home, Work, Blog, About Us** — each with an icon above a small label. The active tab's icon and label are purple.

**Behavior & interactions**
- On load, the **Home** tab is active and its image is shown.
- Clicking any tab fades out the current image, fades in that tab's image, and moves the purple highlight to the clicked tab.
- Hovering a tab also turns it purple.

**What the user can interact with**
- The four bottom tabs. Each click swaps the displayed image and updates the active highlight.

---

## 3. Prerequisites

**Basic knowledge required**
- HTML structure and attributes.
- CSS selectors, Flexbox, and `position`.
- JavaScript basics: variables, functions, arrays/node lists, and events.

**Tools needed**
- A modern browser.
- A text editor (VS Code recommended).
- An internet connection (icons and images load from the web).
- Optional: the **Live Server** extension for auto-reloading.

**Files to create**

```
mobile-tab-navigation/
├── index.html
├── style.css
└── script.js
```

Create the three empty files now.

---

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML skeleton

**🎯 Goal**
Start with a valid, empty HTML5 page titled "Mobile Tab Navigation".

**💡 Concept**
The standard boilerplate gives the browser the settings it needs (encoding, mobile scaling) before we add anything.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mobile Tab Navigation</title>
  </head>
  <body></body>
</html>
```

**🔍 Explanation**
- `<!DOCTYPE html>` selects modern HTML rules.
- The `<meta>` tags handle text encoding and responsive scaling.
- `<title>` names the browser tab.

**✅ Checkpoint**
A blank page with the correct tab title. No errors.

---

### Step 2: Load Font Awesome, the stylesheet, and the script

**🎯 Goal**
Bring in the icon library plus our own CSS and JS.

**💡 Concept**
A **CDN** (Content Delivery Network) hosts libraries so you can use them with a single `<link>` — no downloads. Font Awesome gives us scalable icon fonts referenced by class name.

**📝 Code**

```html
<!-- goes in index.html: inside <head>, before your own stylesheet -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog==" crossorigin="anonymous" />
<link rel="stylesheet" href="style.css" />
```

```html
<!-- goes in index.html: just before the closing </body> tag -->
<script src="script.js"></script>
```

**🔍 Explanation**
- The first `<link>` loads Font Awesome 5.14.0 from a CDN. `integrity` + `crossorigin` let the browser verify the file hasn't been tampered with.
- The second `<link>` loads our own `style.css` **after** Font Awesome, so our styles can override the library if needed.
- `<script>` at the bottom ensures the HTML exists before JavaScript runs.

**✅ Checkpoint**
Still blank, but no 404s in DevTools → Network. Font Awesome is now available.

---

### Step 3: Add the phone frame and its content images

**🎯 Goal**
Create the device frame and stack the four images that each tab will reveal.

**💡 Concept**
All four images live in the DOM at once, stacked on top of each other. Only the one with the `show` class will be visible; the rest are transparent. The first image is marked `show` so it's visible by default.

**📝 Code**

```html
<!-- goes in index.html: inside <body> -->
<div class="phone">
  <img src="https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80" alt="home" class="content show">
  <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="work" class="content">
  <img src="https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1266&q=80" alt="blog" class="content">
  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="about" class="content">
</div>
```

**🔍 Explanation**
- `.phone` is the outer frame that will clip everything inside it.
- Each `<img class="content">` is one tab's picture. The order matters — image #1 pairs with tab #1, and so on.
- Only the first image also has `show`, making it the default visible one.

**✅ Checkpoint**
Unstyled, the four images will stack vertically and look huge. That's expected — CSS will constrain them next. Confirm all four images load.

---

### Step 4: Add the bottom navigation bar

**🎯 Goal**
Add the four tabs, each with an icon and a label, inside the phone frame.

**💡 Concept**
A `<nav>` containing a `<ul>` of `<li>` items is semantic, accessible markup for navigation. Each `<li>` holds a Font Awesome icon (`<i>`) and a `<p>` label. The first tab is `active` to match the visible image.

**📝 Code**

```html
<!-- goes in index.html: inside .phone, right after the last image -->
<nav>
  <ul>
    <li class="active">
      <i class="fas fa-home"></i>
      <p>Home</p>
    </li>
    <li>
      <i class="fas fa-box"></i>
      <p>Work</p>
    </li>
    <li>
      <i class="fas fa-book-open"></i>
      <p>Blog</p>
    </li>
    <li>
      <i class="fas fa-users"></i>
      <p>About Us</p>
    </li>
  </ul>
</nav>
```

**🔍 Explanation**
- Each `<li>` is one tab; its order matches the images from Step 3.
- `<i class="fas fa-home">` renders the Font Awesome "home" icon (`fas` = the solid style).
- `class="active"` on the first `<li>` marks it as the current tab (we'll color it later).

**✅ Checkpoint**
You'll see the four icons and labels appear (probably below the images, unstyled). The icons prove Font Awesome loaded correctly.

---

### Step 5: Import the font and reset box sizing

**🎯 Goal**
Load the Open Sans font and switch to predictable box sizing.

**💡 Concept**
`@import` fetches a Google Font; `box-sizing: border-box` makes width/height include padding and border.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');

* {
  box-sizing: border-box;
}
```

**🔍 Explanation**
- The `@import` line (must be first) downloads Open Sans.
- `*` applies `border-box` to every element.

**✅ Checkpoint**
No visible change yet. No errors.

---

### Step 6: Style and center the page

**🎯 Goal**
Give the page its purple background and center the phone frame on screen.

**💡 Concept**
Making `body` a full-height flex container centered on both axes is the simplest way to pin a single component to the middle of the viewport.

**📝 Code**

```css
/* goes in style.css */
body {
  background-color: rgba(155, 89, 182, 0.7);
  font-family: 'Open Sans', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
}
```

**🔍 Explanation**
- `background-color: rgba(155, 89, 182, 0.7)` is a semi-transparent purple.
- `display: flex` with `align-items: center` (vertical) and `justify-content: center` (horizontal) centers the child.
- `height: 100vh` makes the body fill the viewport height so centering is truly vertical.
- `margin: 0` removes the default body margin.

**✅ Checkpoint**
The background turns purple. The (still unstyled) content sits in the center of the screen.

---

### Step 7: Build the phone frame

**🎯 Goal**
Give the frame its fixed size, border, rounded corners, and — crucially — clip its overflow.

**💡 Concept**
`position: relative` turns the frame into the **positioning context** for the absolutely-positioned images inside it. `overflow: hidden` clips anything (like oversized images) to the frame's rounded shape.

**📝 Code**

```css
/* goes in style.css */
.phone {
  position: relative;
  overflow: hidden;
  border: 3px solid #eee;
  border-radius: 15px;
  height: 600px;
  width: 340px;
}
```

**🔍 Explanation**
- `position: relative` anchors the absolutely-positioned `.content` images to this box.
- `overflow: hidden` hides image overflow and keeps the rounded corners crisp.
- The border, radius, and fixed `600×340` size create the phone look.

**✅ Checkpoint**
A tall, rounded, bordered rectangle appears in the center. The images inside are still oversized/overflowing — the next step fixes them.

---

### Step 8: Stack the images and set up the fade

**🎯 Goal**
Make every image fill the frame, hide them by default, and reveal only the one with `show` — with a smooth fade.

**💡 Concept**
Stacking all images with `position: absolute` at the same spot and controlling visibility with `opacity` (plus a `transition`) gives a clean cross-fade. `opacity: 0` hides an element while keeping its layout, so the switch has nothing to jump.

**📝 Code**

```css
/* goes in style.css */
.phone .content {
  opacity: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  height: calc(100% - 60px);
  width: 100%;
  transition: opacity 0.4s ease;
}

.phone .content.show {
  opacity: 1;
}
```

**🔍 Explanation**
- `opacity: 0` hides all images by default; `transition: opacity 0.4s ease` animates any change over 0.4s.
- `object-fit: cover` makes each image fill its box without distortion (cropping as needed).
- `position: absolute; top: 0; left: 0` stacks every image in the same top-left spot inside the frame.
- `height: calc(100% - 60px)` leaves exactly 60px at the bottom for the nav bar; `width: 100%` fills the frame's width.
- `.content.show { opacity: 1 }` reveals only the image that currently has the `show` class.

**✅ Checkpoint**
Now only the **Home** image is visible, filling the frame above a 60px gap at the bottom. The other images are hidden.

---

### Step 9: Position the navigation bar

**🎯 Goal**
Pin the nav to the bottom of the phone frame.

**💡 Concept**
Because `.phone` is `position: relative`, setting the nav to `position: absolute; bottom: 0` anchors it to the bottom edge of the frame.

**📝 Code**

```css
/* goes in style.css */
nav {
  position: absolute;
  bottom: 0;
  left: 0;
  margin-top: -5px;
  width: 100%;
}
```

**🔍 Explanation**
- `position: absolute; bottom: 0; left: 0` sticks the nav to the bottom-left of the frame.
- `width: 100%` makes it span the full frame width.
- `margin-top: -5px` is a small nudge (has little effect on an absolutely positioned element, kept to match the source).

**✅ Checkpoint**
The icons/labels move to the bottom of the frame, overlapping the reserved 60px strip. They're still unstyled as a plain list.

---

### Step 10: Style the tabs (and their active/hover color)

**🎯 Goal**
Turn the list into a clean, equal-width tab bar and add the purple highlight.

**💡 Concept**
`flex: 1` on each `<li>` makes all tabs share the width equally. A combined selector styles both the hovered tab and the currently active tab the same way.

**📝 Code**

```css
/* goes in style.css */
nav ul {
  background-color: #fff;
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
  height: 60px;
}

nav li {
  color: #777;
  cursor: pointer;
  flex: 1;
  padding: 10px;
  text-align: center;
}

nav ul li p {
  font-size: 12px;
  margin: 2px 0;
}

nav ul li:hover,
nav ul li.active {
  color: #8e44ad;
}
```

**🔍 Explanation**
- `nav ul` is a white flex row, 60px tall, with default list bullets/spacing removed.
- `nav li` gets `flex: 1` (equal widths), a gray default color, a pointer cursor, and centered content.
- `nav ul li p` shrinks the labels to 12px.
- The final rule turns a tab purple (`#8e44ad`) when hovered **or** when it has the `active` class.

**✅ Checkpoint**
The bottom bar now looks like a real tab bar: white background, four equal tabs, gray icons/labels, with **Home** highlighted purple. Hovering a tab turns it purple too. The UI is visually complete — now make it interactive.

---

### Step 11: Select the images and the tabs in JavaScript

**🎯 Goal**
Grab all content images and all tab list items so we can work with them.

**💡 Concept**
`querySelectorAll` returns a **NodeList** (an array-like collection) of every element matching a CSS selector. The two lists line up by index: `contents[0]` belongs to `listItems[0]`.

**📝 Code**

```js
// goes in script.js
const contents = document.querySelectorAll('.content')
const listItems = document.querySelectorAll('nav ul li')
```

**🔍 Explanation**
- `contents` is the list of the four `<img class="content">` elements, in document order.
- `listItems` is the list of the four `<li>` tabs, in the same order — so index 2 in one matches index 2 in the other.

**✅ Checkpoint**
In DevTools Console, type `contents.length` and `listItems.length`; both should print `4`.

---

### Step 12: Make the tabs switch content on click

**🎯 Goal**
When a tab is clicked, show its matching image and mark it active.

**💡 Concept**
Loop over the tabs with `forEach`, capturing each tab's **index** (`idx`). Inside the click handler, first clear all active/shown states, then set them only on the clicked tab and its matching image at `idx`. Clearing-then-setting guarantees exactly one active tab and one visible image.

**📝 Code**

```js
// goes in script.js
listItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
        hideAllContents()
        hideAllItems()

        item.classList.add('active')
        contents[idx].classList.add('show')
    })
})
```

**🔍 Explanation**
- `forEach((item, idx) => ...)` runs once per tab, giving us the tab (`item`) and its position (`idx`).
- On `click`, `hideAllContents()` and `hideAllItems()` reset everything (functions written next).
- `item.classList.add('active')` highlights the clicked tab.
- `contents[idx].classList.add('show')` reveals the image at the **same index** — this is how a tab is linked to its picture.

**✅ Checkpoint**
Clicking won't fully work yet — `hideAllContents` and `hideAllItems` don't exist, so the Console will show a `ReferenceError`. That's expected; we add them next.

---

### Step 13: Write the reset helper functions

**🎯 Goal**
Add the two functions that remove `show` from every image and `active` from every tab.

**💡 Concept**
Extracting repeated "clear everything" logic into named helper functions keeps the click handler short and readable.

**📝 Code**

```js
// goes in script.js
function hideAllContents() {
    contents.forEach(content => content.classList.remove('show'))
}


function hideAllItems() {
    listItems.forEach(item => item.classList.remove('active'))
}
```

**🔍 Explanation**
- `hideAllContents` loops through every image and removes `show`, hiding them all (they fade out via the CSS transition).
- `hideAllItems` loops through every tab and removes `active`, clearing the purple highlight.
- The click handler calls these first, then re-applies `show`/`active` to just the chosen index — so only one of each is ever set.

**✅ Checkpoint**
Reload the page. Click **Work**, **Blog**, and **About Us**: each fades in the correct image and highlights the correct tab. Click **Home** to return. Done! 🎉

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
    <title>Mobile Tab Navigation</title>
  </head>
  <body>
    <div class="phone">
      <img src="https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80" alt="home" class="content show">
      <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="work" class="content">
      <img src="https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1266&q=80" alt="blog" class="content">
      <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="about" class="content">
      <nav>
        <ul>
          <li class="active">
            <i class="fas fa-home"></i>
            <p>Home</p>
          </li>
          <li>
            <i class="fas fa-box"></i>
            <p>Work</p>
          </li>
          <li>
            <i class="fas fa-book-open"></i>
            <p>Blog</p>
          </li>
          <li>
            <i class="fas fa-users"></i>
            <p>About Us</p>
          </li>
        </ul>
      </nav>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

### `style.css`

```css
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: rgba(155, 89, 182, 0.7);
  font-family: 'Open Sans', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
}

.phone {
  position: relative;
  overflow: hidden;
  border: 3px solid #eee;
  border-radius: 15px;
  height: 600px;
  width: 340px;
}

.phone .content {
  opacity: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  height: calc(100% - 60px);
  width: 100%;
  transition: opacity 0.4s ease;
}

.phone .content.show {
  opacity: 1;
}

nav {
  position: absolute;
  bottom: 0;
  left: 0;
  margin-top: -5px;
  width: 100%;
}

nav ul {
  background-color: #fff;
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
  height: 60px;
}

nav li {
  color: #777;
  cursor: pointer;
  flex: 1;
  padding: 10px;
  text-align: center;
}

nav ul li p {
  font-size: 12px;
  margin: 2px 0;
}

nav ul li:hover,
nav ul li.active {
  color: #8e44ad;
}
```

### `script.js`

```js
const contents = document.querySelectorAll('.content')
const listItems = document.querySelectorAll('nav ul li')

listItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
        hideAllContents()
        hideAllItems()

        item.classList.add('active')
        contents[idx].classList.add('show')
    })
})

function hideAllContents() {
    contents.forEach(content => content.classList.remove('show'))
}


function hideAllItems() {
    listItems.forEach(item => item.classList.remove('active'))
}
```

---

## 6. Recap & Next Steps

**What you learned**
- Selecting multiple elements with `querySelectorAll` and pairing two lists **by index**.
- Looping with `forEach` and using the index to connect a control to its content.
- Driving UI state by toggling classes (`add`/`remove`) instead of manipulating styles directly.
- A clean cross-fade using stacked absolute images + `opacity` + `transition`.
- The "clear all, then set one" pattern for single-selection UIs (tabs, accordions, galleries).

**Enhancement challenges**
1. **Keyboard support:** Let arrow keys move between tabs and update the content.
2. **Auto-advance:** Add a timer that cycles through tabs every few seconds, pausing on hover.
3. **Slide transition:** Instead of a fade, animate images sliding in from the side using `transform`.
4. **Data-driven tabs:** Store the tabs/images in an array and generate the markup with JavaScript.
5. **Deep-linking:** Reflect the active tab in the URL hash (e.g. `#blog`) so it can be reopened directly.
