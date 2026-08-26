# Sticky Navbar

A code-along tutorial. You'll build this project from three empty files, one small step at a time. Read the **why** before each snippet, type the code yourself, and test at every checkpoint.

## 1. Project Overview

The Sticky Navbar is a fixed navigation bar that **transforms as you scroll**: it starts transparent-dark over a full-screen hero image, then — once you scroll past the hero — shrinks slightly and flips to a solid white bar with a shadow.

**Key concepts involved**

- A **fixed-position** navbar that stays put while the page scrolls.
- Reacting to the **scroll event** and measuring scroll distance with `window.scrollY`.
- Toggling a CSS class to switch styles, with **CSS transitions** animating the change.

**HTML skills you'll gain**

- Structuring a page with a `<nav>`, a hero banner, and a content `<section>`.
- Using a shared `.container` wrapper to constrain content width.

**CSS skills you'll gain**

- Pinning an element with `position: fixed`.
- Building a full-screen hero with a background image and a dark overlay via `::before`.
- Understanding basic `z-index` layering.
- Animating style changes smoothly with `transition`.

**JavaScript skills you'll gain**

- Listening for the `scroll` event on `window`.
- Reading `window.scrollY` and an element's `offsetHeight`.
- Adding/removing a class conditionally with `classList`.

## 2. Final Project Preview

- **Layout:** A fixed top navbar ("My Website" logo on the left, Home/About/Services/Contact links on the right). Below it, a full-screen hero image with a dark tint and centered white welcome text. Below the hero, a normal article section with headings and paragraphs.
- **Behavior:**
  - At the top of the page, the navbar is a **dark, semi-transparent bar** with white links; the active "Home" link is red and bold.
  - As you **scroll down past the hero**, the navbar animates: it turns **solid white**, gains a drop shadow, its links turn dark, and the whole bar **shrinks** (less padding).
  - Scroll back up and it smoothly reverts.
  - Links turn red on hover.
- **You can interact with:** the page scroll (which drives the navbar transformation) and the nav links (hover states).

## 3. Prerequisites

- **Knowledge:** basic HTML, CSS, and JavaScript.
- **Tools:** a modern web browser and a text editor. Optionally VS Code **Live Server** for auto-reload.
- **Files to create:**

```
sticky-navigation/
├── index.html
├── style.css
└── script.js
```

Create all three now, empty.

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML skeleton

**🎯 Goal**
Set up the HTML document that loads our CSS and JS.

**💡 Concept**
Standard boilerplate: stylesheet in the `<head>`, script at the end of `<body>`.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Sticky Navigation</title>
  </head>
  <body>

    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**
The usual meta tags, linked stylesheet, page title, and `script.js` at the bottom so the markup loads first.

**✅ Checkpoint**
Open `index.html`. Blank page titled "Sticky Navigation", no console errors.

---

### Step 2: Add the navigation bar

**🎯 Goal**
Add the navbar with a logo and menu links.

**💡 Concept**
A `<nav>` holds a `.container` (to constrain width) with the site logo and an unordered list of links. The `current` class marks the active page link.

**📝 Code**

```html
<!-- goes in index.html, inside <body>, above the <script> tag -->
<nav class="nav">
  <div class="container">
    <h1 class="logo"><a href="/index.html">My Website</a></h1>
    <ul>
      <li><a href="#" class="current">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </div>
</nav>
```

**🔍 Explanation**

- `.nav` is the bar we'll fix to the top and later toggle to `.active`.
- `.container` will center and cap the width of the bar's contents.
- The `<h1 class="logo">` is the brand; the `<ul>` holds the menu, with `class="current"` on Home to highlight it.

**✅ Checkpoint**
Reload. You'll see the unstyled logo and a vertical list of links at the top of the page.

---

### Step 3: Add the hero banner

**🎯 Goal**
Add the full-screen intro banner with a welcome message.

**💡 Concept**
The hero is a large banner that will get a background image and a dark overlay. Its text sits centered on top.

**📝 Code**

```html
<!-- goes in index.html, directly below the </nav> -->
<div class="hero">
  <div class="container">
    <h1>Welcome To My Website</h1>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores, consequuntur?</p>
  </div>
</div>
```

**🔍 Explanation**

- `.hero` is the banner section; it'll be styled to fill the viewport with a background image.
- The inner `.container` centers the heading and paragraph.

**✅ Checkpoint**
Reload. The welcome heading and paragraph appear below the nav links (unstyled for now).

---

### Step 4: Add the content section

**🎯 Goal**
Add page content below the hero so there's enough height to actually scroll.

**💡 Concept**
The scroll effect needs real content to scroll through. A `<section>` with headings and long paragraphs gives the page height.

**📝 Code**

```html
<!-- goes in index.html, directly below the .hero div -->
<section class="container content">
  <h2>Content One</h2>
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione dolorem voluptates eveniet tempora ut cupiditate magnam, sapiente, hic quo in ipsum iste soluta eaque perferendis nihil recusandae dolore officia aperiam corporis similique. Facilis quos tempore labore totam! Consectetur molestiae iusto ducimus error reiciendis aspernatur dolor, modi dolorem sit architecto, voluptate magni sunt unde est quas? Voluptates a dolorum voluptatum quo perferendis aut sit. Aspernatur libero laboriosam ab eligendi omnis delectus earum labore, placeat officiis sint illum rem voluptas ipsum repellendus iste eius recusandae quae excepturi facere, iure rerum sequi? Illum velit delectus dicta et iste dolorum obcaecati minus odio eligendi!</p>

  <h3>Content Two</h3>
  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur provident nostrum possimus inventore nisi laboriosam consequatur modi nulla eos, commodi, omnis distinctio! Maxime distinctio impedit provident, voluptates illo odio nostrum minima beatae similique a sint sapiente voluptatum atque optio illum est! Tenetur tempora doloremque quae iste aperiam hic cumque repellat?</p>
</section>
```

**🔍 Explanation**

- The `<section>` carries both `.container` (width constraint) and `.content` (typography styles).
- Two headings and two long paragraphs provide scrollable height — essential for testing the sticky effect.

**✅ Checkpoint**
Reload. The page is now long enough to scroll, with the article text below the hero.

---

### Step 5: Add the reset, base body, and container

**🎯 Goal**
Apply a reset, set the page font, and create the reusable centered `.container`.

**💡 Concept**
Resetting `margin`/`padding` to 0 removes browser defaults. `.container` is a common pattern: cap the width and use `margin: 0 auto` to center it.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css?family=Open+Sans');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Open Sans', sans-serif;
  color: #222;
  padding-bottom: 50px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
```

**🔍 Explanation**

- `@import` loads the Open Sans font.
- The `*` reset applies `border-box` and zeroes out default margins/padding everywhere.
- `body` sets the font and text color, plus a little bottom padding.
- `.container` caps content at 1200px wide and centers it horizontally (`margin: 0 auto`).

**✅ Checkpoint**
Reload. The text now uses Open Sans and content is centered within a max width. The nav links still stack vertically (we style the nav next).

---

### Step 6: Fix the navbar to the top

**🎯 Goal**
Pin the navbar and lay out its logo and links in a row.

**💡 Concept**
`position: fixed` with `top/left/right: 0` locks the bar to the top of the viewport so it stays visible while scrolling. `transition: all 0.3s` prepares it to animate smoothly when we toggle `.active` later.

**📝 Code**

```css
/* goes in style.css */
.nav {
  position: fixed;
  background-color: #222;
  top: 0;
  left: 0;
  right: 0;
  transition: all 0.3s ease-in-out;
}

.nav .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  transition: all 0.3s ease-in-out;
}
```

**🔍 Explanation**

- `.nav`: `position: fixed` + `top/left/right: 0` stretch it across the top and keep it there during scroll; a dark `#222` background; `transition` so future changes animate over 0.3s.
- `.nav .container`: Flexbox with `space-between` pushes the logo to the left and menu to the right; `align-items: center` vertically centers them; `padding: 20px 0` gives the tall (initial) height, which we'll shrink on `.active`.

**✅ Checkpoint**
Reload. The navbar is now a dark bar fixed to the top, with the logo and (still-unstyled) link list on opposite ends.

---

### Step 7: Style the menu links

**🎯 Goal**
Turn the vertical list into a clean horizontal menu with white links.

**💡 Concept**
`display: flex` on the `<ul>` lays the items in a row; removing `list-style-type` drops the bullets. Each link gets padding and a transition for smooth hover/scroll color changes.

**📝 Code**

```css
/* goes in style.css */
.nav ul {
  display: flex;
  list-style-type: none;
  align-items: center;
  justify-content: center;
}

.nav a {
  color: #fff;
  text-decoration: none;
  padding: 7px 15px;
  transition: all 0.3s ease-in-out;
}
```

**🔍 Explanation**

- `.nav ul`: Flexbox row, no bullets, vertically centered items.
- `.nav a`: white text, no underline, comfortable padding, and a `transition` so color changes (hover, or the `.active` switch) animate smoothly.

**✅ Checkpoint**
Reload. The menu is now a horizontal row of white links on the dark bar, aligned opposite the logo.

---

### Step 8: Add the scrolled ("active") navbar styles

**🎯 Goal**
Define how the navbar looks **after** you scroll — solid white, shadowed, shrunk, with dark links.

**💡 Concept**
We write styles for a `.nav.active` state. JavaScript will add/remove the `active` class on scroll; because we set `transition` earlier, the switch animates instead of snapping.

**📝 Code**

```css
/* goes in style.css */
.nav.active {
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.nav.active a {
  color: #000;
}

.nav.active .container {
  padding: 10px 0;
}
```

**🔍 Explanation**

- `.nav.active`: white background plus a drop shadow — the "stuck to the top" look.
- `.nav.active a`: switches link text to black (readable on white).
- `.nav.active .container`: reduces vertical padding from 20px to 10px, so the bar **shrinks** when active.
- These only take effect once the `active` class is present, which JS handles in Step 12.

**✅ Checkpoint**
Reload. No change yet (nothing adds `.active`). To preview it, open DevTools, select the `<nav>`, and manually add `class="nav active"` — you'll see it turn white and shrink.

---

### Step 9: Highlight the current and hovered links

**🎯 Goal**
Make the active page link and any hovered link red and bold.

**💡 Concept**
Grouping two selectors lets one rule style both the always-highlighted `.current` link and the `:hover` state.

**📝 Code**

```css
/* goes in style.css */
.nav a.current,
.nav a:hover {
  color: #c0392b;
  font-weight: bold;
}
```

**🔍 Explanation**

- `.nav a.current` targets the link marked `current` (Home) so it's always highlighted.
- `.nav a:hover` applies the same red, bold styling on hover.
- The shared red (`#c0392b`) gives clear visual feedback for the active/hovered link.

**✅ Checkpoint**
Reload. "Home" is now red and bold; hovering any other link turns it red and bold too.

---

### Step 10: Build the hero with a dark overlay

**🎯 Goal**
Make the hero a full-screen background image with a dark tint over it.

**💡 Concept**
A background image fills the hero; a `::before` pseudo-element layered on top with a semi-transparent black adds a **dark overlay** so white text stays readable. `z-index` controls what sits in front of what.

**📝 Code**

```css
/* goes in style.css */
.hero {
  background-image: url('https://images.pexels.com/photos/450035/pexels-photo-450035.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom center;
  height: 100vh;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  margin-bottom: 20px;
  z-index: -2;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}
```

**🔍 Explanation**

- `.hero`: a full-viewport (`height: 100vh`) banner; `background-size: cover` makes the image fill it; Flexbox centers the text; `color: #fff` makes text white; `position: relative` + `z-index` set up layering.
- `.hero::before`: an absolutely-positioned layer covering the whole hero, filled with 50%-opacity black (`rgba(0,0,0,0.5)`) — the dark tint.
- The `z-index` values (`-1` on the overlay, `-2` on the hero) stack the overlay above the image but keep the hero's text (default layer) readable on top. This layering also lets the fixed navbar sit above the hero.

**✅ Checkpoint**
Reload. The hero now shows a full-screen photo with a dark tint. The white welcome text should be visible over it (we size the text next).

---

### Step 11: Style the hero text and article typography

**🎯 Goal**
Enlarge the hero heading/paragraph and style the article's headings and body text.

**💡 Concept**
Larger type and spacing give the hero impact, while readable line-height and letter-spacing make the article comfortable to read.

**📝 Code**

```css
/* goes in style.css */
.hero h1 {
  font-size: 46px;
  margin: -20px 0 20px;
}

.hero p {
  font-size: 20px;
  letter-spacing: 1px;
}

.content h2,
.content h3 {
  font-size: 150%;
  margin: 20px 0;
}

.content p {
  color: #555;
  line-height: 30px;
  letter-spacing: 1.2px;
}
```

**🔍 Explanation**

- `.hero h1`: large 46px heading, nudged up slightly with a negative top margin.
- `.hero p`: 20px with a little letter-spacing for elegance.
- `.content h2, .content h3`: 150% of the base size with vertical spacing.
- `.content p`: softer grey text with generous line-height and letter-spacing for readability.

**✅ Checkpoint**
Reload. The hero text is now large and centered, and the article below reads cleanly. The layout is complete — time to make the navbar react to scrolling.

---

### Step 12: Toggle the navbar on scroll

**🎯 Goal**
Add the JavaScript that adds `.active` to the navbar once you scroll past the hero, and removes it near the top.

**💡 Concept**
We listen for the window's `scroll` event. `window.scrollY` is how far the page has scrolled (in pixels); `nav.offsetHeight` is the navbar's height. When we've scrolled past the navbar height plus a buffer, we add `active`; otherwise we remove it.

**📝 Code**

```js
// goes in script.js
const nav = document.querySelector('.nav')
window.addEventListener('scroll', fixNav)

function fixNav() {
    if(window.scrollY > nav.offsetHeight + 150) {
        nav.classList.add('active')
    } else {
        nav.classList.remove('active')
    }
}
```

**🔍 Explanation**

- `const nav = document.querySelector('.nav')` grabs the navbar.
- `window.addEventListener('scroll', fixNav)` runs `fixNav` every time the page scrolls.
- Inside `fixNav`: if `window.scrollY` (pixels scrolled) exceeds `nav.offsetHeight + 150` (navbar height plus a 150px buffer), add the `active` class; otherwise remove it.
- Because the CSS `.nav.active` rules have `transition`, the bar smoothly morphs between the two looks.

**✅ Checkpoint**
Reload and scroll down. Once you pass the top region, the navbar smoothly turns white, shrinks, gains a shadow, and its links turn dark. Scroll back up and it reverts. Done!

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
    <title>Sticky Navigation</title>
  </head>
  <body>
    <nav class="nav">
      <div class="container">
        <h1 class="logo"><a href="/index.html">My Website</a></h1>
        <ul>
          <li><a href="#" class="current">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    </nav>

    <div class="hero">
      <div class="container">
        <h1>Welcome To My Website</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores, consequuntur?</p>
      </div>
    </div>

    <section class="container content">
      <h2>Content One</h2>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione dolorem voluptates eveniet tempora ut cupiditate magnam, sapiente, hic quo in ipsum iste soluta eaque perferendis nihil recusandae dolore officia aperiam corporis similique. Facilis quos tempore labore totam! Consectetur molestiae iusto ducimus error reiciendis aspernatur dolor, modi dolorem sit architecto, voluptate magni sunt unde est quas? Voluptates a dolorum voluptatum quo perferendis aut sit. Aspernatur libero laboriosam ab eligendi omnis delectus earum labore, placeat officiis sint illum rem voluptas ipsum repellendus iste eius recusandae quae excepturi facere, iure rerum sequi? Illum velit delectus dicta et iste dolorum obcaecati minus odio eligendi!</p>

      <h3>Content Two</h3>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur provident nostrum possimus inventore nisi laboriosam consequatur modi nulla eos, commodi, omnis distinctio! Maxime distinctio impedit provident, voluptates illo odio nostrum minima beatae similique a sint sapiente voluptatum atque optio illum est! Tenetur tempora doloremque quae iste aperiam hic cumque repellat?</p>
    </section>

    <script src="script.js"></script>
  </body>
</html>
```

### `style.css`

```css
@import url('https://fonts.googleapis.com/css?family=Open+Sans');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Open Sans', sans-serif;
  color: #222;
  padding-bottom: 50px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.nav {
  position: fixed;
  background-color: #222;
  top: 0;
  left: 0;
  right: 0;
  transition: all 0.3s ease-in-out;
}

.nav .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  transition: all 0.3s ease-in-out;
}

.nav ul {
  display: flex;
  list-style-type: none;
  align-items: center;
  justify-content: center;
}

.nav a {
  color: #fff;
  text-decoration: none;
  padding: 7px 15px;
  transition: all 0.3s ease-in-out;
}

.nav.active {
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.nav.active a {
  color: #000;
}

.nav.active .container {
  padding: 10px 0;
}

.nav a.current,
.nav a:hover {
  color: #c0392b;
  font-weight: bold;
}

.hero {
  background-image: url('https://images.pexels.com/photos/450035/pexels-photo-450035.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom center;
  height: 100vh;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  margin-bottom: 20px;
  z-index: -2;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

.hero h1 {
  font-size: 46px;
  margin: -20px 0 20px;
}

.hero p {
  font-size: 20px;
  letter-spacing: 1px;
}

.content h2,
.content h3 {
  font-size: 150%;
  margin: 20px 0;
}

.content p {
  color: #555;
  line-height: 30px;
  letter-spacing: 1.2px;
}
```

### `script.js`

```js
const nav = document.querySelector('.nav')
window.addEventListener('scroll', fixNav)

function fixNav() {
    if(window.scrollY > nav.offsetHeight + 150) {
        nav.classList.add('active')
    } else {
        nav.classList.remove('active')
    }
}
```

## 6. Recap & Next Steps

**What you learned**

- Pinning a navbar with `position: fixed` and animating style changes with `transition`.
- Building a full-screen hero with a background image and a `::before` dark overlay, plus basic `z-index` layering.
- Listening for the `scroll` event and reading `window.scrollY` and `offsetHeight`.
- Toggling a class conditionally with `classList.add` / `classList.remove` to drive a visual state change.

**Enhancement challenges**

1. **Smooth scrolling** — make the nav links scroll smoothly to page sections with `scroll-behavior: smooth` and matching `id`s.
2. **Scroll progress bar** — add a thin bar under the nav that fills based on how far down the page you are.
3. **Hide on scroll down, show on scroll up** — track the last scroll position and slide the navbar out of view when scrolling down.
4. **Highlight the current section** — update which link has `.current` based on which section is in view (scroll spy).
5. **Throttle the handler** — wrap `fixNav` in a throttle/`requestAnimationFrame` so it runs less often for better performance.
