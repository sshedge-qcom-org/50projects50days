# Rotating Navigation Animation

A code-along tutorial that rebuilds this project from three empty files. Follow it top to bottom to reproduce the exact app in this folder.

## 1. Project Overview

A page that reveals its navigation menu with a playful twist: clicking a hamburger icon **rotates the entire page content** off to one side, exposing a menu tucked behind it. Clicking the close icon rotates it back.

**Key concepts involved**

- Toggling a single state class (`show-nav`) that drives an entire animation
- CSS `transform: rotate()` with a custom `transform-origin`
- Off-screen positioning and sliding elements in with `translateX`
- The adjacent sibling combinator (`+`) and staggered `transition-delay`
- Using an icon font (Font Awesome) loaded from a CDN

**HTML skills you'll gain**

- Linking a third-party CSS library (Font Awesome) via a CDN `<link>`
- Structuring an article/content area and a `<nav>` menu
- Using `<i>` elements as icon placeholders

**CSS skills you'll gain**

- `transform-origin` and how it changes where a rotation pivots
- Combining transforms with `transition` for smooth animation
- `position: fixed` to pin elements to the viewport
- The adjacent sibling selector `A + B` and chained selectors (`li + li`)
- `transition-delay` to stagger multiple animations

**JavaScript skills you'll gain**

- Selecting elements by `id` and by class
- Adding/removing a class with `classList.add` / `classList.remove`
- Writing concise one-line arrow-function event handlers

## 2. Final Project Preview

**Layout & colors**

- A dark (`#333`) page background; the main content sits on an off-white (`#fafafa`) panel filling the viewport.
- A coral/red circle (`#ff7979`) is anchored partly off-screen in the **top-left corner**, showing only its lower-right quarter. Inside it are two white icon buttons: a hamburger (open) and an X (close).
- The content is a mock blog article: a heading, author name, paragraphs, and a photo.
- A vertical menu (Home / About / Contact, each with an icon) is pinned near the bottom-left, hidden off-screen until revealed.

**Behavior & interactions**

- Clicking the **hamburger** icon rotates the whole content panel `-20deg` around its top-left corner, sliding it aside. The corner circle spins too, swapping the hamburger icon out for the X. The menu items then slide in from the left, slightly staggered.
- Clicking the **X** icon rotates everything back to normal and the menu slides back out.

**What you can interact with**

- The **hamburger (open)** button
- The **X (close)** button
- The nav links (Home, About, Contact) — they change color on hover

## 3. Prerequisites

**You should know**

- Basic HTML structure and attributes
- Basic CSS: selectors, positioning, and the box model
- Basic JavaScript: variables, functions, and event listeners

**Tools**

- A modern web browser
- A text editor (VS Code recommended)
- Optional: the **Live Server** VS Code extension
- An internet connection (Font Awesome icons and the image load from the web)

**Files to create**

```
rotating-nav-animation/
├── index.html
├── style.css
└── script.js
```

## 4. Build the Project Step-by-Step

### Step 1: HTML Boilerplate + Font Awesome

**🎯 Goal**
Set up the page and load the Font Awesome icon library so our hamburger/close/menu icons will render.

**💡 Concept**
Font Awesome is an **icon font**: you load its stylesheet from a CDN (a public web server), then show icons with `<i class="fas fa-...">`. Without this `<link>`, the `<i>` icons show nothing.

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
    <title>Rotating Navigation</title>
  </head>
  <body>
    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**

- The **first** `<link>` pulls in Font Awesome 5.14 from `cdnjs.cloudflare.com`. `integrity` + `crossorigin` are a security check that the file wasn't tampered with.
- The **second** `<link>` loads our own `style.css` *after* Font Awesome, so our rules can override the library's if needed.
- The `<script>` is at the bottom so the DOM exists before our JS runs.

**✅ Checkpoint**
A blank page titled "Rotating Navigation". Nothing else yet.

---

### Step 2: The Circle and Its Buttons

**🎯 Goal**
Add the corner circle containing the open (hamburger) and close (X) buttons.

**💡 Concept**
We nest the circle inside two wrappers: `.container` (the page panel that rotates) and `.circle-container` (which pins the circle to the corner). Both buttons live inside now; CSS will later reveal one at a time.

**📝 Code**

```html
<!-- goes in index.html — inside <body>, above the <script> -->
<div class="container">
  <div class="circle-container">
    <div class="circle">
      <button id="close">
        <i class="fas fa-times"></i>
      </button>
      <button id="open">
        <i class="fas fa-bars"></i>
      </button>
    </div>
  </div>
</div>
```

**🔍 Explanation**

- `.container` will hold **all** page content and is the thing we rotate.
- `.circle-container` and `.circle` build the corner button area.
- `<i class="fas fa-times">` is the X icon; `fa-bars` is the hamburger. `fas` means "Font Awesome Solid".
- `id="close"` / `id="open"` are the hooks our JS will listen to.

**✅ Checkpoint**
You'll see two icon buttons stacked in the top-left (unstyled). If they're blank squares, double-check the Font Awesome `<link>` from Step 1.

---

### Step 3: Add the Article Content

**🎯 Goal**
Add the mock blog article that fills the page.

**💡 Concept**
This is plain content — a heading, byline, paragraphs, and an image — placed inside `.content` so we can constrain its width and center it later.

**📝 Code**

```html
<!-- goes in index.html — inside .container, after .circle-container -->
<div class="content">
  <h1>Amazing Article</h1>
  <small>Florin Pop</small>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. (full text in the final reference)</p>

  <h3>My Dog</h3>
  <img src="https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80" alt="doggy" />
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. (full text in the final reference)</p>
</div>
```

> The paragraphs use long "lorem ipsum" placeholder text. Copy the complete version from the [Final Full Code](#5-final-full-code-reference) section — it's shortened here just to keep this step readable.

**🔍 Explanation**

- `<small>` renders the author name in smaller, italic-styled text.
- The `<img>` pulls a photo from Unsplash; `alt="doggy"` is the accessible description.
- Wrapping everything in `.content` lets us cap its width and center it in one rule later.

**✅ Checkpoint**
The article text and image appear below the corner buttons. The image may be large for now — we'll constrain it with CSS.

---

### Step 4: Add the Navigation Menu

**🎯 Goal**
Add the menu that will slide in during the animation.

**💡 Concept**
The `<nav>` is a **sibling of** `.container` (not inside it) on purpose — that lets CSS react to the container's state and animate the nav using the adjacent sibling selector.

**📝 Code**

```html
<!-- goes in index.html — AFTER the closing </div> of .container, before <script> -->
<nav>
  <ul>
    <li><i class="fas fa-home"></i><a href="#"> Home</a></li>
    <li><i class="fas fa-user-alt"></i><a href="#"> About</a></li>
    <li><i class="fas fa-envelope"></i><a href="#"> Contact</a></li>
  </ul>
</nav>
```

**🔍 Explanation**

- Each `<li>` pairs an icon (`<i>`) with a link (`<a>`): home, user, and envelope icons.
- `href="#"` is a placeholder link that goes nowhere.
- Because `<nav>` comes *right after* `.container`, we can target it with `.container.show-nav + nav` later.

**✅ Checkpoint**
The three menu items appear stacked under the article. The HTML is now complete.

---

### Step 5: Import the Font and Reset the Box Model

**🎯 Goal**
Load the "Lato" font and normalize sizing.

**💡 Concept**
`@import` loads a Google Font; the `box-sizing: border-box` reset keeps padding/borders from inflating element sizes.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css?family=Lato&display=swap');

* {
  box-sizing: border-box;
}
```

**🔍 Explanation**

- `@import` must be the first line of the CSS file.
- `*` applies `border-box` to every element so widths behave predictably.

**✅ Checkpoint**
No visible change yet — the font is loaded and ready.

---

### Step 6: Style the Body

**🎯 Goal**
Set the dark page background and prevent a horizontal scrollbar.

**💡 Concept**
Because we'll rotate content off the left edge, we hide horizontal overflow so the rotation doesn't create an ugly sideways scrollbar.

**📝 Code**

```css
/* goes in style.css */
body {
  font-family: 'Lato', sans-serif;
  background-color: #333;
  color: #222;
  overflow-x: hidden;
  margin: 0;
}
```

**🔍 Explanation**

- `background-color: #333` is the dark backdrop that shows behind the rotated panel.
- `overflow-x: hidden` clips anything that spills past the left/right edges during the animation.
- `margin: 0` removes the default body margin.

**✅ Checkpoint**
The page background is now dark grey.

---

### Step 7: The Rotating Content Panel

**🎯 Goal**
Make the content sit on a white panel that can rotate around its top-left corner.

**💡 Concept**
`transform-origin: top left` moves the rotation **pivot point** to the panel's top-left corner (instead of its center). A `transition` makes the rotation animate. The `.show-nav` class holds the "rotated" state that JS will toggle.

**📝 Code**

```css
/* goes in style.css */
.container {
  background-color: #fafafa;
  transform-origin: top left;
  transition: transform 0.5s linear;
  width: 100vw;
  min-height: 100vh;
  padding: 50px;
}

.container.show-nav {
  transform: rotate(-20deg);
}
```

**🔍 Explanation**

- `width: 100vw` / `min-height: 100vh` make the panel fill the screen.
- `transform-origin: top left` — the panel will pivot from its top-left corner, swinging the bottom outward like a door.
- `transition: transform 0.5s linear` animates any `transform` change over half a second.
- `.container.show-nav { transform: rotate(-20deg) }` is the target state: tilted 20 degrees counter-clockwise. This rule only applies when the `show-nav` class is present.

**✅ Checkpoint**
The content now sits on a white panel. To preview the effect, temporarily add `show-nav` to the container's class in the HTML — the whole panel tilts. Remove it again before continuing.

---

### Step 8: Pin and Style the Corner Circle

**🎯 Goal**
Anchor the circle partly off-screen in the top-left and make it rotate with the panel.

**💡 Concept**
`position: fixed` with negative `top`/`left` pushes most of the circle off-screen, leaving only the visible quarter. When `.show-nav` is active, the circle spins so a different button faces into view.

**📝 Code**

```css
/* goes in style.css */
.circle-container {
  position: fixed;
  top: -100px;
  left: -100px;
}

.circle {
  background-color: #ff7979;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  position: relative;
  transition: transform 0.5s linear;
}

.container.show-nav .circle {
  transform: rotate(-70deg);
}
```

**🔍 Explanation**

- `.circle-container` is `fixed` at `top: -100px; left: -100px`, so half of the 200px circle hangs off each edge — only the bottom-right quarter shows.
- The `.circle` is a 200px red disc (`border-radius: 50%`). `position: relative` makes it the anchor for the absolutely-positioned buttons next.
- `.container.show-nav .circle { transform: rotate(-70deg) }` — when the nav is open, the circle rotates 70deg, which is what swaps which button is visible.

**✅ Checkpoint**
A red quarter-circle now sits in the top-left corner with the (still unstyled) buttons near it.

---

### Step 9: Position the Open/Close Buttons

**🎯 Goal**
Place the two buttons inside the circle so that rotating the circle reveals one and hides the other.

**💡 Concept**
Both buttons are absolutely positioned inside the circle. They're offset slightly differently so that at rest the hamburger shows, and after the circle rotates, the X rotates into the visible quarter.

**📝 Code**

```css
/* goes in style.css */
.circle button {
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 100px;
  background: transparent;
  border: 0;
  font-size: 26px;
  color: #fff;
}

.circle button:focus {
  outline: none;
}

.circle button#open {
  left: 60%;
}

.circle button#close {
  top: 60%;
  transform: rotate(90deg);
  transform-origin: top left;
}
```

**🔍 Explanation**

- `.circle button` — both buttons are transparent, borderless, white, and absolutely positioned starting from the circle's center (`top: 50%; left: 50%`).
- `#open` is nudged to `left: 60%` so the hamburger sits in the visible quarter at rest.
- `#close` is nudged to `top: 60%` and pre-rotated `90deg` (pivoting from its top-left) so that once the whole circle spins `-70deg`, the X lands in view.
- `:focus { outline: none }` removes the focus ring.

**✅ Checkpoint**
The hamburger icon is now positioned in the visible part of the circle. The X is tucked out of the way.

---

### Step 10: Base Styling for the Nav (Hidden Off-Screen)

**🎯 Goal**
Pin the menu to the bottom-left and slide each item off-screen so it's hidden by default.

**💡 Concept**
Each `<li>` starts pushed left with `translateX` so it's off-screen. We give **later** items a *bigger* offset so that when they slide back in, they arrive slightly staggered.

**📝 Code**

```css
/* goes in style.css */
nav {
  position: fixed;
  bottom: 40px;
  left: 0;
  z-index: 100;
}

nav ul {
  list-style-type: none;
  padding-left: 30px;
}

nav ul li {
  text-transform: uppercase;
  color: #fff;
  margin: 40px 0;
  transform: translateX(-100%);
  transition: transform 0.4s ease-in;
}

nav ul li i {
  font-size: 20px;
  margin-right: 10px;
}

nav ul li + li {
  margin-left: 15px;
  transform: translateX(-150%);
}

nav ul li + li + li {
  margin-left: 30px;
  transform: translateX(-200%);
}
```

**🔍 Explanation**

- `nav` is `fixed` at the bottom-left with a high `z-index: 100` so it sits above the dark background.
- `list-style-type: none` removes the bullet points.
- Every `li` is shifted `translateX(-100%)` — fully off the left edge — and has a `transition` ready.
- `nav ul li + li` (the 2nd item, via the adjacent sibling selector) is pushed further, `-150%`; `li + li + li` (the 3rd) further still, `-200%`. This extra distance is what creates the staggered "fan-in" look when they return.

**✅ Checkpoint**
The menu items disappear off the left edge — hidden, as intended.

---

### Step 11: Reveal the Nav When the Panel Rotates

**🎯 Goal**
Slide the menu items back into view whenever the container has `show-nav`.

**💡 Concept**
The adjacent sibling selector `.container.show-nav + nav li` reaches from the rotated container to the `<nav>` right after it, and resets each item's position to `translateX(0)`. A `transition-delay` waits for the panel rotation to progress first.

**📝 Code**

```css
/* goes in style.css */
.container.show-nav + nav li {
  transform: translateX(0);
  transition-delay: 0.3s;
}
```

**🔍 Explanation**

- `.container.show-nav + nav li` reads as: "an `li` inside the `nav` that immediately follows a `.container` which has `show-nav`."
- `transform: translateX(0)` slides every item back to its natural position (overriding the `-100%`/`-150%`/`-200%` offsets).
- `transition-delay: 0.3s` holds the slide-in until the panel has begun rotating, so the effects feel sequenced rather than simultaneous.

**✅ Checkpoint**
Add `show-nav` to the container's class in the HTML again to preview: the panel tilts and the menu slides in. Remove it before continuing — JS will handle it next.

---

### Step 12: Style the Nav Links and the Article Content

**🎯 Goal**
Make the links look good (with a hover effect) and tidy up the article layout.

**💡 Concept**
A `transition` on the links animates their color/weight change on hover. Constraining `.content` width and centering it makes the article readable.

**📝 Code**

```css
/* goes in style.css */
nav a {
  color: #fafafa;
  text-decoration: none;
  transition: all 0.5s;
}

nav a:hover {
  color: #FF7979;
  font-weight: bold;
}

.content img {
  max-width: 100%;
}

.content {
  max-width: 1000px;
  margin: 50px auto;
}

.content h1 {
  margin: 0;
}

.content small {
  color: #555;
  font-style: italic;
}

.content p {
  color: #333;
  line-height: 1.5;
}
```

**🔍 Explanation**

- `nav a` removes the underline and sets a light color; `:hover` turns links coral and bold, animated by `transition: all 0.5s`.
- `.content img { max-width: 100% }` keeps the photo from overflowing its container.
- `.content { max-width: 1000px; margin: 50px auto }` caps the article width and centers it horizontally (`auto` left/right margins).
- The remaining rules style the heading, italic byline, and readable paragraph line-height.

**✅ Checkpoint**
The article looks polished, the image fits, and hovering a menu item (reveal it manually if needed) turns it coral. All styling is done — now the interactivity.

---

### Step 13: Select the Elements in JavaScript

**🎯 Goal**
Grab the two buttons and the container so we can react to clicks.

**💡 Concept**
`getElementById` returns a single element by its `id`; `querySelector` returns the first match for a CSS selector.

**📝 Code**

```js
// goes in script.js
const open = document.getElementById('open')
const close = document.getElementById('close')
const container = document.querySelector('.container')
```

**🔍 Explanation**

- `open` and `close` are the hamburger and X buttons.
- `container` is the panel we'll add/remove `show-nav` on — the single class that triggers the whole animation.

**✅ Checkpoint**
No visible change. In DevTools Console, type `container` — you should see the `.container` div.

---

### Step 14: Toggle the Animation on Click

**🎯 Goal**
Open the nav when the hamburger is clicked and close it when the X is clicked.

**💡 Concept**
All the animation lives in CSS keyed off the `show-nav` class. JS just needs to add or remove that one class — the CSS transitions do the rest.

**📝 Code**

```js
// goes in script.js
open.addEventListener('click', () => container.classList.add('show-nav'))

close.addEventListener('click', () => container.classList.remove('show-nav'))
```

**🔍 Explanation**

- Clicking `open` adds `show-nav`, which activates every `.container.show-nav ...` CSS rule: the panel rotates, the circle spins to show the X, and the menu slides in.
- Clicking `close` removes `show-nav`, reversing all of it.
- These are one-line arrow functions — no braces or `return` needed for a single expression.

**✅ Checkpoint**
Done! Click the hamburger: the page tilts, the icon flips to an X, and the menu fans in from the left. Click the X to rotate everything back. 🎉

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
    <title>Rotating Navigation</title>
  </head>
  <body>
    <div class="container">
      <div class="circle-container">
        <div class="circle">
          <button id="close">
            <i class="fas fa-times"></i>
          </button>
          <button id="open">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>

      <div class="content">
        <h1>Amazing Article</h1>
        <small>Florin Pop</small>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium quia in ratione dolores cupiditate, maxime aliquid impedit dolorem nam dolor omnis atque fuga labore modi veritatis porro laborum minus, illo, maiores recusandae cumque ipsa quos. Tenetur, consequuntur mollitia labore pariatur sunt quia harum aut. Eum maxime dolorem provident natus veritatis molestiae cumque quod voluptates ab non, tempore cupiditate? Voluptatem, molestias culpa. Corrupti, laudantium iure aliquam rerum sint nam quas dolor dignissimos in error placeat quae temporibus minus optio eum soluta cupiditate! Cupiditate saepe voluptates laudantium. Ducimus consequuntur perferendis consequatur nobis exercitationem molestias fugiat commodi omnis. Asperiores quia tenetur nemo ipsa.</p>

        <h3>My Dog</h3>
        <img src="https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80" alt="doggy" />
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit libero deleniti rerum quo, incidunt vel consequatur culpa ullam. Magnam facere earum unde harum. Ea culpa veritatis magnam at aliquid. Perferendis totam placeat molestias illo laudantium? Minus id minima doloribus dolorum fugit deserunt qui vero voluptas, ut quia cum amet temporibus veniam ad ea ab perspiciatis, enim accusamus asperiores explicabo provident. Voluptates sint, neque fuga cum illum, tempore autem maxime similique laborum odio, magnam esse. Aperiam?</p>
      </div>
    </div>

    <nav>
      <ul>
        <li><i class="fas fa-home"></i><a href="#"> Home</a></li>
        <li><i class="fas fa-user-alt"></i><a href="#"> About</a></li>
        <li><i class="fas fa-envelope"></i><a href="#"> Contact</a></li>
      </ul>
    </nav>
    <script src="script.js"></script>
  </body>
</html>
```

### `style.css`

```css
@import url('https://fonts.googleapis.com/css?family=Lato&display=swap');

* {
  box-sizing: border-box;
}

body {
  font-family: 'Lato', sans-serif;
  background-color: #333;
  color: #222;
  overflow-x: hidden;
  margin: 0;
}

.container {
  background-color: #fafafa;
  transform-origin: top left;
  transition: transform 0.5s linear;
  width: 100vw;
  min-height: 100vh;
  padding: 50px;
}

.container.show-nav {
  transform: rotate(-20deg);
}

.circle-container {
  position: fixed;
  top: -100px;
  left: -100px;
}

.circle {
  background-color: #ff7979;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  position: relative;
  transition: transform 0.5s linear;
}

.container.show-nav .circle {
  transform: rotate(-70deg);
}

.circle button {
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 100px;
  background: transparent;
  border: 0;
  font-size: 26px;
  color: #fff;
}

.circle button:focus {
  outline: none;
}

.circle button#open {
  left: 60%;
}

.circle button#close {
  top: 60%;
  transform: rotate(90deg);
  transform-origin: top left;
}

.container.show-nav + nav li {
  transform: translateX(0);
  transition-delay: 0.3s;
}

nav {
  position: fixed;
  bottom: 40px;
  left: 0;
  z-index: 100;
}

nav ul {
  list-style-type: none;
  padding-left: 30px;
}

nav ul li {
  text-transform: uppercase;
  color: #fff;
  margin: 40px 0;
  transform: translateX(-100%);
  transition: transform 0.4s ease-in;
}

nav ul li i {
  font-size: 20px;
  margin-right: 10px;
}

nav ul li + li {
  margin-left: 15px;
  transform: translateX(-150%);
}

nav ul li + li + li {
  margin-left: 30px;
  transform: translateX(-200%);
}

nav a{
  color: #fafafa;
  text-decoration: none;
  transition: all 0.5s;
}

nav a:hover {
  color: #FF7979;
  font-weight: bold;
}

.content img {
  max-width: 100%;
}

.content {
  max-width: 1000px;
  margin: 50px auto;
}

.content h1 {
  margin: 0;
}

.content small {
  color: #555;
  font-style: italic;
}

.content p {
  color: #333;
  line-height: 1.5;
}
```

### `script.js`

```js
const open = document.getElementById('open')
const close = document.getElementById('close')
const container = document.querySelector('.container')

open.addEventListener('click', () => container.classList.add('show-nav'))

close.addEventListener('click', () => container.classList.remove('show-nav'))
```

## 6. Recap & Next Steps

**What you learned**

- Driving an entire, multi-part animation from a **single toggled class** (`show-nav`) — CSS does the heavy lifting, JS just flips the switch.
- `transform-origin` to control a rotation's pivot point, and combining `rotate()` with `transition`.
- Hiding elements off-screen with `translateX` and revealing them, with `transition-delay` for a staggered effect.
- The adjacent sibling selector (`+`) and chained selectors (`li + li + li`).
- Loading and using a CDN icon font (Font Awesome).

**Enhancement challenges**

1. **Use `classList.toggle`** in JS to open/close with a single button instead of two.
2. **Rotate the other way:** add a variant that tilts `+20deg` and slides the menu in from the right.
3. **Add a menu item** (e.g. a 4th link) and adjust the staggered `translateX` offsets to match.
4. **Add a subtle box-shadow** to `.container` so the tilted panel casts a shadow on the dark background.
5. **Respect motion preferences:** wrap the transitions in a `@media (prefers-reduced-motion: no-preference)` query so users who prefer less motion get an instant toggle.
