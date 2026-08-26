# Netflix Mobile Navigation

## 1. Project Overview

The **Netflix Mobile Navigation** recreates Netflix's slide-in mobile menu. Clicking a hamburger button slides in a layered panel (black → red → white) with a staggered animation; clicking the close button slides it back out in reverse.

**Key concepts involved:**

- Off-canvas navigation (a panel hidden off-screen, slid into view)
- CSS `transform: translateX()` for sliding, plus `transition` for smooth motion
- **Staggered animation** using different `transition-delay` values
- Toggling a `.visible` class from JavaScript
- Applying a class to many elements at once with `querySelectorAll` + `forEach`

**HTML skills you'll gain:**

- Building an icon button with Font Awesome
- Structuring nested containers to create a layered visual frame
- Nesting a sub-list inside a navigation list

**CSS skills you'll gain:**

- Fixed positioning and hiding elements off-screen with `translateX(-100%)`
- Smooth transitions and coordinated `transition-delay` for cascade effects
- How a `transform` on a parent affects sizing of fixed-position children

**JavaScript skills you'll gain:**

- Selecting one vs. many elements (`querySelector` vs `querySelectorAll`)
- Looping a NodeList with `forEach`
- Adding/removing a class to toggle UI state

---

## 2. Final Project Preview

**The UI:** A plain page with a hamburger (☰) button pinned top-left, the Netflix logo centered, and the text "MOBILE NAVIGATION" beneath it. Hidden off the left edge of the screen is a navigation panel built from three nested colored layers — a black outer frame, a red middle frame, and a white inner panel — creating a bordered "card" look. The white panel holds a close (✕) button, the Netflix logo, and a list of links (Teams, Locations, Life at Netflix) plus a nested sub-list (Netflix culture memo, Work life balance, Inclusion & diversity, Blog).

**The behavior:**

- Clicking the **hamburger** button slides the panel in from the left. The three layers arrive in a **cascade** — black first, then red, then white — thanks to staggered timing.
- Clicking the **close (✕)** button slides everything back out, this time cascading in reverse (white leaves first, black last).

**What you can interact with:**

- The **hamburger button** (opens the menu).
- The **close button** (closes the menu).
- The **nav links** (they're `#` placeholders, but clickable).

---

## 3. Prerequisites

**Basic knowledge required:** Basic HTML/CSS and beginner JavaScript (selecting elements, event listeners). No animation experience needed.

**Tools needed:**

- A modern web browser
- A text editor (VS Code recommended)
- An internet connection (Font Awesome icons, the Netflix logo, and the font load from the web)
- Optional: the **Live Server** VS Code extension

**Files to create:**

```
netflix-mobile-navigation/
├── index.html
├── style.css
└── script.js
```

---

## 4. Build the Project Step-by-Step

### Step 1: HTML Skeleton with Font Awesome

**🎯 Goal**
Create the base document and load Font Awesome for the hamburger and close icons.

**💡 Concept**
Font Awesome (via CDN) provides the `fa-bars` (hamburger) and `fa-times` (✕) icons as simple `<i>` elements.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
    integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=="
    crossorigin="anonymous" />
  <link rel="stylesheet" href="style.css" />
  <title>Netflix Mobile Navigation</title>
</head>

<body>
  <script src="script.js"></script>
</body>

</html>
```

**🔍 Explanation**

- The first `<link>` loads Font Awesome 5.14 (the `integrity`/`crossorigin` attributes verify the file's authenticity).
- The second `<link>` is our stylesheet; the `<script>` runs after the body's HTML.

**✅ Checkpoint**
Open `index.html`: blank page titled "Netflix Mobile Navigation", no errors.

---

### Step 2: Add the Landing Content

**🎯 Goal**
Add the hamburger button, the Netflix logo, and the intro text — the things visible before opening the menu.

**💡 Concept**
The hamburger is a `<button>` (not just an icon) so it's naturally clickable and keyboard-accessible. It has two classes: `nav-btn` (shared button styling) and `open-btn` (its unique JS/positioning hook).

**📝 Code**

```html
<!-- goes in index.html — inside <body>, above the <script> -->
<button class="nav-btn open-btn">
  <i class="fas fa-bars"></i>
</button>

<img
  src="https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69be546879952/Netflix-Brand-Logo.png?w=684&h=456"
  alt="Logo" class="logo">

<p class="text">Mobile Navigation</p>
```

**🔍 Explanation**

- `<button class="nav-btn open-btn">` with `<i class="fas fa-bars">` renders the ☰ icon; `open-btn` is what JavaScript will listen to.
- The `<img class="logo">` shows the Netflix wordmark.
- `<p class="text">` is the label under the logo.

**✅ Checkpoint**
Refresh. You'll see the hamburger icon, the Netflix logo, and "Mobile Navigation" — all unstyled and stacked at the top-left.

---

### Step 3: Build the Nested Nav Panels

**🎯 Goal**
Add the three nested panels that form the layered slide-in menu, with a close button and logo inside.

**💡 Concept**
The menu is three `<div>`s nested inside each other — `nav-black` > `nav-red` > `nav-white`. Each carries the shared `nav` class (the JS target) plus a color class. Nesting them is what produces the black/red/white framed look.

**📝 Code**

```html
<!-- goes in index.html — after the <p class="text"> line -->
<div class="nav nav-black">
  <div class="nav nav-red">
    <div class="nav nav-white">
      <button class="nav-btn close-btn">
        <i class="fas fa-times"></i>
      </button>

      <img
        src="https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69be546879952/Netflix-Brand-Logo.png?w=684&h=456"
        alt="Logo" class="logo">
    </div>
  </div>
</div>
```

**🔍 Explanation**

- Each `<div class="nav ...">` shares the `nav` class — this is the class JavaScript will toggle and CSS will animate.
- The color classes (`nav-black`, `nav-red`, `nav-white`) will get different widths and colors so the panels sit inside one another like frames.
- Inside the innermost white panel: the close button (`close-btn` + `fa-times` ✕) and the logo.

**✅ Checkpoint**
Refresh. You'll see a second logo and a ✕ icon appear (unstyled), because the panel isn't hidden yet. That's temporary — CSS will tuck it off-screen soon.

---

### Step 4: Add the Navigation Links

**🎯 Goal**
Add the menu's link list, including a nested sub-list.

**💡 Concept**
A `<ul>` of links, where one `<li>` contains **another** `<ul>` — a common pattern for grouped/sub-navigation.

**📝 Code**

```html
<!-- goes in index.html — inside <div class="nav nav-white">, after the logo <img> -->
<ul class="list">
  <li><a href="#">Teams</a></li>
  <li><a href="#">Locations</a></li>
  <li><a href="#">Life at Netflix</a></li>
  <li>
    <ul>
      <li><a href="#">Netflix culture memo</a></li>
      <li><a href="#">Work life balance</a></li>
      <li><a href="#">Inclusion & diversity</a></li>
      <li><a href="#">Blog</a></li>
    </ul>
  </li>
</ul>
```

**🔍 Explanation**

- `<ul class="list">` is the main menu.
- The first three `<li>`s are top-level links (`href="#"` placeholders).
- The fourth `<li>` holds a nested `<ul>` — a sub-group that we'll indent slightly with CSS.

**✅ Checkpoint**
Refresh. The links now appear as a bulleted list. Everything is still unstyled and on-screen — let's fix that with CSS.

---

### Step 5: Reset, Center, and Base Styles

**🎯 Goal**
Import the font, center the landing content, and style the logo and intro text.

**💡 Concept**
A column Flexbox `body` centers the logo/text. The nav panels won't be affected by this centering because they'll be `position: fixed` (next steps).

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

* {
  box-sizing: border-box;
}

body {
  font-family: 'Muli', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.text {
  text-transform: uppercase;
}

.logo {
  width: 200px;
}
```

**🔍 Explanation**

- `@import` loads the **Muli** font (keep it first).
- The `body` is a full-height column flexbox centering its children.
- `.text { text-transform: uppercase }` shouts "MOBILE NAVIGATION".
- `.logo { width: 200px }` sizes both logos consistently.

**✅ Checkpoint**
Refresh. The logo and text are now centered and using the Muli font. The nav panel content is still visible and in the way — next we position and style the buttons and panels.

---

### Step 6: Style the Buttons

**🎯 Goal**
Style the icon buttons and pin the hamburger to the top-left.

**💡 Concept**
`position: fixed` locks the hamburger to a spot in the viewport so it stays put regardless of scrolling. The buttons are made transparent and borderless so only the icon shows.

**📝 Code**

```css
/* goes in style.css */
.nav-btn {
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 20px;
}

.open-btn {
  position: fixed;
  top: 10px;
  left: 10px;
}
```

**🔍 Explanation**

- `.nav-btn` strips the default button chrome (border/background) and enlarges the icon; `cursor: pointer` signals it's clickable. Both the open and close buttons share this.
- `.open-btn { position: fixed; top: 10px; left: 10px }` pins the hamburger to the top-left corner.

**✅ Checkpoint**
Refresh. The hamburger is now a clean icon in the top-left corner.

---

### Step 7: Hide the Panels Off-Screen

**🎯 Goal**
Make every `.nav` panel a full-height, fixed panel that starts hidden off the left edge, ready to slide in.

**💡 Concept**
`transform: translateX(-100%)` shifts an element left by its own full width — pushing it just off-screen. A `transition` on `transform` means any later change animates smoothly. The `.visible` class (added by JS) sets `translateX(0)` to bring it back on-screen.

**📝 Code**

```css
/* goes in style.css */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
}

.nav.visible {
  transform: translateX(0);
}
```

**🔍 Explanation**

- `position: fixed; top: 0; left: 0; height: 100vh` anchors each panel to the left edge, full height.
- `transform: translateX(-100%)` hides it just off the left side.
- `transition: transform 0.3s ease-in-out` makes movement smooth over 0.3s.
- `.nav.visible { transform: translateX(0) }` is the "shown" position. JavaScript toggles the `visible` class to trigger the slide.

**✅ Checkpoint**
Refresh. The menu panels vanish off-screen — you're back to just the hamburger, logo, and text. 

---

### Step 8: Color the Layers and Stagger the Animation

**🎯 Goal**
Give each panel its color and width, and use `transition-delay` to make the layers slide in (and out) in a cascade.

**💡 Concept**
`transition-delay` postpones the start of a transition. By giving each layer a different delay — and *different delays for the open vs. closed states* — the panels animate one after another, and reverse order on the way out.

Also note a subtle CSS rule: because each `.nav` has a `transform`, it becomes the **containing block** for the fixed-position `.nav` nested inside it. That's why the inner panels' percentage widths are measured against their parent, producing the nested frame look.

**📝 Code**

```css
/* goes in style.css */
.nav-black {
  background-color: rgb(34, 31, 31);
  width: 60%;
  max-width: 480px;
  min-width: 320px;
  transition-delay: 0.4s;
}

.nav-black.visible {
  transition-delay: 0s;
}

.nav-red {
  background-color: rgb(229, 9, 20);
  width: 95%;
  transition-delay: 0.2s;
}

.nav-red.visible {
  transition-delay: 0.2s;
}

.nav-white {
  background-color: #fff;
  width: 95%;
  padding: 40px;
  position: relative;
  transition-delay: 0s;
}

.nav-white.visible {
  transition-delay: 0.4s;
}
```

**🔍 Explanation**

- **Colors & widths:** black outer (60% of viewport, clamped 320–480px), red middle (95% of the black panel), white inner (95% of the red panel). The nested widths create the layered frame.
- **Opening (adding `.visible`):** black delay `0s`, red `0.2s`, white `0.4s` → they cascade in: black, then red, then white.
- **Closing (removing `.visible`, back to base rules):** black delay `0.4s`, red `0.2s`, white `0s` → they cascade out in reverse: white first, black last.
- `.nav-white` also gets `padding: 40px` (inner spacing) and `position: relative` so the close button can be absolutely positioned inside it.

**✅ Checkpoint**
Still hidden (we haven't wired the JS), but the colors/widths are set. We'll see the cascade once the buttons work. Hang tight.

---

### Step 9: Style the Close Button and the List

**🎯 Goal**
Position the close button inside the white panel and style the navigation links.

**💡 Concept**
Because `.nav-white` is `position: relative`, the close button can use `position: absolute` to sit in the panel's top-right corner. The links are un-bulleted, uppercased, and dark.

**📝 Code**

```css
/* goes in style.css */
.close-btn {
  opacity: 0.3;
  position: absolute;
  top: 40px;
  right: 30px;
}

.list {
  list-style-type: none;
  padding: 0;
}

.list li {
  margin: 20px 0;
}

.list li a {
  color: rgb(34, 31, 31);
  font-size: 14px;
  text-decoration: none;
  text-transform: uppercase;
}

.list ul {
  list-style-type: none;
  padding-left: 20px;
}
```

**🔍 Explanation**

- `.close-btn` is faded (`opacity: 0.3`) and pinned to the top-right of the white panel.
- `.list` removes bullets and default padding; `.list li` spaces the items out.
- `.list li a` styles links: dark color, small, no underline, uppercase.
- `.list ul` (the nested sub-list) removes its bullets and indents with `padding-left: 20px`.

**✅ Checkpoint**
Still off-screen, but fully styled. Time to bring it to life with JavaScript.

---

### Step 10: Grab the Buttons and All Panels

**🎯 Goal**
Reference the two buttons and collect all three nav panels.

**💡 Concept**
`querySelector` returns the **first** match (perfect for the single open/close buttons). `querySelectorAll` returns **all** matches as a NodeList — we grab every `.nav` so we can toggle all three layers together.

**📝 Code**

```js
// goes in script.js
const open_btn = document.querySelector('.open-btn')
const close_btn = document.querySelector('.close-btn')
const nav = document.querySelectorAll('.nav')
```

**🔍 Explanation**

- `open_btn` / `close_btn` reference the hamburger and ✕ buttons.
- `nav` is a NodeList of all three `.nav` panels (black, red, white).

**✅ Checkpoint**
No visible change. Console should be clean.

---

### Step 11: Open the Menu

**🎯 Goal**
Slide the menu in when the hamburger is clicked.

**💡 Concept**
We add the `.visible` class to *every* panel with `forEach`. Each panel then transitions to `translateX(0)` — and because of the delays from Step 8, they arrive in a cascade.

**📝 Code**

```js
// goes in script.js
open_btn.addEventListener('click', () => {
    nav.forEach(nav_el => nav_el.classList.add('visible'))
})
```

**🔍 Explanation**

- On clicking the hamburger, `nav.forEach(...)` loops over all three panels.
- `nav_el.classList.add('visible')` adds the `visible` class to each, triggering the slide-in transition (staggered by the CSS delays).

**✅ Checkpoint**
Refresh and click the hamburger. The layered menu slides in from the left — black, then red, then white. (The close button won't work yet.)

---

### Step 12: Close the Menu

**🎯 Goal**
Slide the menu back out when the ✕ button is clicked.

**💡 Concept**
Removing `.visible` reverts each panel to its base rule — `translateX(-100%)` — sliding them back off-screen. Because the base rules carry the *reversed* delays, they cascade out in the opposite order.

**📝 Code**

```js
// goes in script.js
close_btn.addEventListener('click', () => {
    nav.forEach(nav_el => nav_el.classList.remove('visible'))
})
```

**🔍 Explanation**

- On clicking ✕, we loop over all panels again.
- `nav_el.classList.remove('visible')` drops the `visible` class, so each panel returns to `translateX(-100%)` and slides away — white first, black last.

**✅ Checkpoint**
Refresh. Open with the hamburger, then close with the ✕. The menu slides in and out with the layered cascade in both directions. Project complete!

---

## 5. Final Full Code (Reference)

**`index.html`**

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
    integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=="
    crossorigin="anonymous" />
  <link rel="stylesheet" href="style.css" />
  <title>Netflix Mobile Navigation</title>
</head>

<body>
  <button class="nav-btn open-btn">
    <i class="fas fa-bars"></i>
  </button>

  <img
    src="https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69be546879952/Netflix-Brand-Logo.png?w=684&h=456"
    alt="Logo" class="logo">

  <p class="text">Mobile Navigation</p>

  <div class="nav nav-black">
    <div class="nav nav-red">
      <div class="nav nav-white">
        <button class="nav-btn close-btn">
          <i class="fas fa-times"></i>
        </button>

        <img
          src="https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69be546879952/Netflix-Brand-Logo.png?w=684&h=456"
          alt="Logo" class="logo">

        <ul class="list">
          <li><a href="#">Teams</a></li>
          <li><a href="#">Locations</a></li>
          <li><a href="#">Life at Netflix</a></li>
          <li>
            <ul>
              <li><a href="#">Netflix culture memo</a></li>
              <li><a href="#">Work life balance</a></li>
              <li><a href="#">Inclusion & diversity</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <script src="script.js"></script>
</body>

</html>
```

**`style.css`**

```css
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

* {
  box-sizing: border-box;
}

body {
  font-family: 'Muli', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.text {
  text-transform: uppercase;
}

.logo {
  width: 200px;
}

.nav-btn {
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 20px;
}

.open-btn {
  position: fixed;
  top: 10px;
  left: 10px;
}

.nav {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
}

.nav.visible {
  transform: translateX(0);
}

.nav-black {
  background-color: rgb(34, 31, 31);
  width: 60%;
  max-width: 480px;
  min-width: 320px;
  transition-delay: 0.4s;
}

.nav-black.visible {
  transition-delay: 0s;
}

.nav-red {
  background-color: rgb(229, 9, 20);
  width: 95%;
  transition-delay: 0.2s;
}

.nav-red.visible {
  transition-delay: 0.2s;
}

.nav-white {
  background-color: #fff;
  width: 95%;
  padding: 40px;
  position: relative;
  transition-delay: 0s;
}

.nav-white.visible {
  transition-delay: 0.4s;
}

.close-btn {
  opacity: 0.3;
  position: absolute;
  top: 40px;
  right: 30px;
}

.list {
  list-style-type: none;
  padding: 0;
}

.list li {
  margin: 20px 0;
}

.list li a {
  color: rgb(34, 31, 31);
  font-size: 14px;
  text-decoration: none;
  text-transform: uppercase;
}

.list ul {
  list-style-type: none;
  padding-left: 20px;
}
```

**`script.js`**

```js
const open_btn = document.querySelector('.open-btn')
const close_btn = document.querySelector('.close-btn')
const nav = document.querySelectorAll('.nav')

open_btn.addEventListener('click', () => {
    nav.forEach(nav_el => nav_el.classList.add('visible'))
})

close_btn.addEventListener('click', () => {
    nav.forEach(nav_el => nav_el.classList.remove('visible'))
})
```

---

## 6. Recap & Next Steps

**What you learned:**

- Hiding a panel off-screen with `transform: translateX(-100%)` and revealing it with `translateX(0)`.
- Animating smoothly with `transition`, and orchestrating a **cascade** with `transition-delay` (different delays for open vs. close).
- How a `transform` on a parent makes it the containing block for fixed-position children (the nested-frame trick).
- Selecting many elements with `querySelectorAll` and looping with `forEach`.
- Toggling UI state by adding/removing a single class.

**Enhancement challenges:**

1. **Close on outside click.** Close the menu if the user clicks anywhere outside the white panel.
2. **Close with the Escape key.** Add a `keydown` listener for the `Escape` key.
3. **Toggle with one button.** Replace the two buttons with a single button that opens *and* closes.
4. **Real links.** Swap the `#` hrefs for real sections and highlight the active link.
5. **Tune the cascade.** Experiment with the `transition-delay` values (and the 0.3s duration) to speed up or reshape the animation.
