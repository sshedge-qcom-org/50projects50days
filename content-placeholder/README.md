# Content Placeholder

A code-along tutorial. You'll build this project from three empty files, one small step at a time. Read the **why** before each snippet, type the code yourself, and test at every checkpoint.

## 1. Project Overview

The Content Placeholder is a **skeleton loading screen**: an article card shows shimmering grey blocks where content will go, then — after a short delay simulating a network request — swaps them for a real image, title, text, and author.

**Key concepts involved**

- **Skeleton / shimmer UI** — placeholder shapes that reassure users something is loading.
- A **CSS gradient animation** that sweeps a highlight across the placeholders.
- **Simulating an async fetch** with `setTimeout`, then injecting content and toggling off the shimmer.

**HTML skills you'll gain**

- Structuring a card (header image, title, excerpt, author) with semantic tags.
- Using `&nbsp;` and utility classes to reserve space for not-yet-loaded content.

**CSS skills you'll gain**

- Building a card with `box-shadow`, `border-radius`, and `overflow: hidden`.
- Creating a moving shimmer with `linear-gradient` + `background-size` + `@keyframes`.
- Making circular avatars and clamping images with `object-fit: cover`.

**JavaScript skills you'll gain**

- Selecting single elements (`getElementById`) and groups (`querySelectorAll`).
- Delaying work with `setTimeout` to fake a loading state.
- Injecting markup with `innerHTML` and removing classes with `classList.remove` via `forEach`.

## 2. Final Project Preview

- **Layout:** A light grey (`#ecf0f1`) page with a single 350px-wide white card centered on screen. The card has a tall header area on top and a padded content area below (title, a few lines of excerpt, and an author row with a circular avatar, name, and date).
- **Behavior:**
  - On load, every content slot is a **grey shimmer bar** — a highlight sweeps left-to-right across them, looping.
  - After **2.5 seconds**, the placeholders are replaced all at once with a real photo, a title, excerpt text, a circular profile photo, the name "John Doe", and a date. The shimmer stops.
- **You can interact with:** nothing directly — it's an automatic loading-to-loaded transition you watch happen.

## 3. Prerequisites

- **Knowledge:** basic HTML, CSS, and JavaScript variables/functions.
- **Tools:** a modern web browser and a text editor. Optionally VS Code **Live Server** for auto-reload.
- **Files to create:**

```
content-placeholder/
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
Standard boilerplate: stylesheet in the `<head>`, script at the end of `<body>` so the markup exists first.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Content Placeholder</title>
  </head>
  <body>

    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**
The usual encoding/viewport meta tags, the linked stylesheet, the title, and `script.js` loaded at the bottom.

**✅ Checkpoint**
Open `index.html`. Blank page titled "Content Placeholder", no console errors.

---

### Step 2: Add the card shell and header

**🎯 Goal**
Create the card container and its top image area.

**💡 Concept**
The `.card-header` gets two classes: `animated-bg` (the shimmer effect, styled later) and an `id` so JavaScript can fill it with a real image after loading. The `&nbsp;` (a non-breaking space) gives the empty element something inside it so it holds its height.

**📝 Code**

```html
<!-- goes in index.html, inside <body>, above the <script> tag -->
<div class="card">
  <div class="card-header animated-bg" id="header">&nbsp;</div>

</div>
```

**🔍 Explanation**

- `.card` is the outer container we'll size and shadow.
- `.card-header` is the tall image slot. The `animated-bg` class will later make it shimmer; `id="header"` lets JS target it.
- `&nbsp;` reserves content so the element doesn't collapse before real content arrives.

**✅ Checkpoint**
Reload. Nothing styled yet, but the header div exists (you can confirm in the inspector).

---

### Step 3: Add the title and excerpt

**🎯 Goal**
Add the article title and a few lines of excerpt inside a content area.

**💡 Concept**
Each placeholder slot carries `animated-bg` (shimmer) and, for the thin text bars, `animated-bg-text` (the small rounded bar shape). The excerpt uses three `<span>` bars to mimic multiple lines of text.

**📝 Code**

```html
<!-- goes in index.html, inside the .card div, below .card-header -->
<div class="card-content">
  <h3 class="card-title animated-bg animated-bg-text" id="title">
    &nbsp;
  </h3>
  <p class="card-excerpt" id="excerpt">
    &nbsp;
    <span class="animated-bg animated-bg-text">&nbsp;</span>
    <span class="animated-bg animated-bg-text">&nbsp;</span>
    <span class="animated-bg animated-bg-text">&nbsp;</span>
  </p>
</div>
```

**🔍 Explanation**

- `.card-content` wraps the text region (we'll pad it and give it a white background).
- The `<h3>` title has both `animated-bg` and `animated-bg-text` — so it shimmers **and** takes the thin-bar shape.
- The `<p>` excerpt holds three `<span>` bars, each a shimmering line, to look like a paragraph of loading text.
- Every slot has an `id` (title, excerpt) or is grouped by class so JS can update or de-shimmer it.

**✅ Checkpoint**
Reload. Still unstyled, but the title and three excerpt lines now exist in the DOM.

---

### Step 4: Add the author row

**🎯 Goal**
Add the avatar, name, and date at the bottom of the card.

**💡 Concept**
The author block is a flex row: a circular avatar placeholder on the left, and a name + date stacked on the right. Each piece is a shimmer slot with its own `id`.

**📝 Code**

```html
<!-- goes in index.html, inside .card-content, below the .card-excerpt paragraph -->
<div class="author">
  <div class="profile-img animated-bg" id="profile_img">&nbsp;</div>
  <div class="author-info">
    <strong class="animated-bg animated-bg-text" id="name"
      >&nbsp;</strong
    >
    <small class="animated-bg animated-bg-text" id="date">&nbsp;</small>
  </div>
</div>
```

**🔍 Explanation**

- `.author` is a flex container for the avatar + info.
- `.profile-img` (id `profile_img`) is the round avatar slot; it shimmers via `animated-bg`.
- `.author-info` stacks the `name` and `date` text bars, each shimmering.

**✅ Checkpoint**
Reload. The full card structure is now in the DOM (header, title, excerpt, author). It's unstyled — styling is next.

---

### Step 5: Add the reset, page layout, and image rule

**🎯 Goal**
Apply the box model, center the card on a light grey page, and keep images responsive.

**💡 Concept**
`box-sizing: border-box` for predictable sizing, a centered Flexbox `body`, and `img { max-width: 100% }` so injected images never overflow their container.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #ecf0f1;
  font-family: 'Roboto', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

img {
  max-width: 100%;
}
```

**🔍 Explanation**

- `@import` loads the Roboto font.
- `body` uses Flexbox centering, fills the viewport (`100vh`), hides overflow, and removes default margin — the card will sit dead-center on a light grey backdrop.
- `img { max-width: 100% }` ensures the photos we inject later scale down to fit.

**✅ Checkpoint**
Reload. The page turns light grey and the placeholder text/`&nbsp;` clusters center on screen (still unstyled shapes).

---

### Step 6: Style the card, header, and content area

**🎯 Goal**
Give the card its shape (rounded, shadowed, fixed width) and lay out its regions.

**💡 Concept**
`overflow: hidden` on the card clips the header image to the rounded corners. A fixed `width` keeps the card compact; the header gets a fixed height so it holds space before the image loads.

**📝 Code**

```css
/* goes in style.css */
.card {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  width: 350px;
}

.card-header {
  height: 200px;
}

.card-header img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.card-content {
  background-color: #fff;
  padding: 30px;
}
```

**🔍 Explanation**

- `.card`: a soft drop shadow, 10px rounded corners, `overflow: hidden` (so the header image respects those corners), and a fixed 350px width.
- `.card-header`: fixed 200px tall so it reserves the image's space even while empty.
- `.card-header img`: `object-fit: cover` makes the injected photo fill the header without distortion; `height/width: 100%` stretch it to the header box.
- `.card-content`: white background with generous 30px padding.

**✅ Checkpoint**
Reload. You now see a white, rounded, shadowed card with a tall (empty) header and a padded content area.

---

### Step 7: Style the title, excerpt, and author row

**🎯 Goal**
Shape the text slots and lay out the author section with a circular avatar.

**💡 Concept**
The title gets a fixed height so its shimmer bar is a consistent size. The author area is a flex row; `border-radius: 50%` + `overflow: hidden` turns the avatar into a circle that will clip its future image.

**📝 Code**

```css
/* goes in style.css */
.card-title {
  height: 20px;
  margin: 0;
}

.card-excerpt {
  color: #777;
  margin: 10px 0 20px;
}

.author {
  display: flex;
}

.profile-img {
  border-radius: 50%;
  overflow: hidden;
  height: 40px;
  width: 40px;
}

.author-info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 10px;
  width: 100px;
}

.author-info small {
  color: #aaa;
  margin-top: 5px;
}
```

**🔍 Explanation**

- `.card-title`: fixed 20px height and no margin, so its shimmer bar has a clean, consistent shape.
- `.card-excerpt`: muted grey text with vertical spacing.
- `.author`: a flex row placing avatar and info side by side.
- `.profile-img`: a 40×40 circle (`border-radius: 50%`) with `overflow: hidden` so the future avatar image is clipped round.
- `.author-info`: a vertical flex column for name/date, offset from the avatar by `margin-left`.
- `.author-info small`: lighter grey date text with a small top gap.

**✅ Checkpoint**
Reload. The card now looks structured: a title bar, three excerpt lines, and an author row with a round avatar slot and two text bars — all still solid grey (no shimmer motion yet).

---

### Step 8: Add the shimmer animation

**🎯 Goal**
Make every `.animated-bg` slot shimmer with a moving highlight.

**💡 Concept**
A `linear-gradient` with a bright band, stretched to twice the element's width (`background-size: 200% 100%`), then slid horizontally by animating `background-position`, creates a highlight that sweeps across — the classic skeleton shimmer.

**📝 Code**

```css
/* goes in style.css */
.animated-bg {
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 10%,
    #f6f7f8 20%,
    #f6f7f8 100%
  );
  background-size: 200% 100%;
  animation: bgPos 1s linear infinite;
}

@keyframes bgPos {
  0% {
    background-position: 50% 0;
  }

  100% {
    background-position: -150% 0;
  }
}
```

**🔍 Explanation**

- The gradient is mostly flat grey (`#f6f7f8`) with a slightly darker band (`#edeef1`) around the 10% mark — that band is the "highlight."
- `background-size: 200% 100%` makes the gradient twice as wide as its element, leaving room to slide.
- `animation: bgPos 1s linear infinite` runs the sweep every second, forever, at constant speed.
- `@keyframes bgPos` moves `background-position` from `50%` to `-150%`, dragging the highlight band across the element repeatedly.

**✅ Checkpoint**
Reload. Every grey slot (header, title, excerpt lines, avatar, name, date) now **shimmers** with a highlight sweeping across it.

---

### Step 9: Shape the thin text bars

**🎯 Goal**
Turn the text-line placeholders into short, rounded bars.

**💡 Concept**
Elements with `animated-bg-text` become thin (`height: 10px`), full-width, pill-shaped (`border-radius: 50px`) bars — so title/excerpt/name/date look like lines of text rather than solid blocks.

**📝 Code**

```css
/* goes in style.css */
.animated-bg-text {
  border-radius: 50px;
  display: inline-block;
  margin: 0;
  height: 10px;
  width: 100%;
}
```

**🔍 Explanation**

- `border-radius: 50px` rounds the ends into a pill shape.
- `display: inline-block` + `width: 100%` let the spans behave as full-width bars.
- `height: 10px` makes them thin like a line of text.

**✅ Checkpoint**
Reload. The title, excerpt lines, name, and date are now thin rounded shimmering bars. The loading state is visually complete — now we animate the swap to real content.

---

### Step 10: Grab the content elements

**🎯 Goal**
Get references to each slot JavaScript will fill with real content.

**💡 Concept**
`getElementById` returns a single element by its `id`. We'll store one reference per slot.

**📝 Code**

```js
// goes in script.js
const header = document.getElementById('header')
const title = document.getElementById('title')
const excerpt = document.getElementById('excerpt')
const profile_img = document.getElementById('profile_img')
const name = document.getElementById('name')
const date = document.getElementById('date')
```

**🔍 Explanation**
Each constant points at one placeholder slot (header, title, excerpt, avatar, name, date) so we can inject real content into it later.

> **Gotcha:** the variable `name` shadows the built-in global `window.name`. It works fine here because our own `const name` takes precedence in this script, but it's why some developers avoid `name` as a variable name.

**✅ Checkpoint**
Reload. No visible change (the shimmer keeps running), and no console errors.

---

### Step 11: Grab the animated element groups

**🎯 Goal**
Collect **all** shimmer elements so we can switch the effect off in one sweep later.

**💡 Concept**
`querySelectorAll` returns a **NodeList** of every element matching a selector — perfect for acting on a whole group at once.

**📝 Code**

```js
// goes in script.js
const animated_bgs = document.querySelectorAll('.animated-bg')
const animated_bg_texts = document.querySelectorAll('.animated-bg-text')
```

**🔍 Explanation**

- `animated_bgs` is every element with the shimmering-background class.
- `animated_bg_texts` is every element with the thin-text-bar class.
- Collecting them now lets us later loop over each group and strip the classes to reveal the loaded state.

**✅ Checkpoint**
Reload. Still shimmering, no errors. (You could `console.log(animated_bgs.length)` to see how many were found.)

---

### Step 12: Simulate loading, then inject real content

**🎯 Goal**
After a 2.5-second delay, fill every slot with real content.

**💡 Concept**
`setTimeout(fn, ms)` runs `fn` once after `ms` milliseconds — a simple way to fake a network delay. Inside, we set each element's `innerHTML` to real markup or text.

**📝 Code**

```js
// goes in script.js
setTimeout(getData, 2500)

function getData() {
  header.innerHTML =
    '<img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80" alt="" />'
  title.innerHTML = 'Lorem ipsum dolor sit amet'
  excerpt.innerHTML =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore perferendis'
  profile_img.innerHTML =
    '<img src="https://randomuser.me/api/portraits/men/45.jpg" alt="" />'
  name.innerHTML = 'John Doe'
  date.innerHTML = 'Oct 08, 2020'
}
```

**🔍 Explanation**

- `setTimeout(getData, 2500)` schedules `getData` to run once, 2.5 seconds after the script loads.
- Inside `getData`, we set `innerHTML` on each slot: an `<img>` for the header and avatar, and plain text for the title, excerpt, name, and date.
- This mimics what you'd normally do after real data arrives from an API.

**✅ Checkpoint**
Reload and wait 2.5s. Real content appears — **but the shimmer is still running underneath/around it** because we haven't removed the animation classes yet. That's the next step.

---

### Step 13: Turn off the shimmer

**🎯 Goal**
Remove the shimmer classes from every element so the card settles into its final, static look.

**💡 Concept**
`forEach` loops over each element in the NodeList; `classList.remove(...)` strips a class. Removing `animated-bg` and `animated-bg-text` kills the gradient animation and the bar shaping, revealing clean content.

**📝 Code**

```js
// goes in script.js, add these two lines at the end of the getData function
  animated_bgs.forEach((bg) => bg.classList.remove('animated-bg'))
  animated_bg_texts.forEach((bg) => bg.classList.remove('animated-bg-text'))
```

**🔍 Explanation**

- The first line loops over every shimmering element and removes `animated-bg`, stopping the moving gradient.
- The second removes `animated-bg-text`, dropping the thin-bar shaping so text displays normally.
- Because these run at the end of `getData`, the shimmer switches off at the exact moment the real content is injected.

**✅ Checkpoint**
Reload and wait 2.5s. The card shimmers, then cleanly transitions to the finished article — photo, title, text, avatar, name, and date, all static. Done!

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
    <title>Content Placeholder</title>
  </head>
  <body>
    <div class="card">
      <div class="card-header animated-bg" id="header">&nbsp;</div>

      <div class="card-content">
        <h3 class="card-title animated-bg animated-bg-text" id="title">
          &nbsp;
        </h3>
        <p class="card-excerpt" id="excerpt">
          &nbsp;
          <span class="animated-bg animated-bg-text">&nbsp;</span>
          <span class="animated-bg animated-bg-text">&nbsp;</span>
          <span class="animated-bg animated-bg-text">&nbsp;</span>
        </p>
        <div class="author">
          <div class="profile-img animated-bg" id="profile_img">&nbsp;</div>
          <div class="author-info">
            <strong class="animated-bg animated-bg-text" id="name"
              >&nbsp;</strong
            >
            <small class="animated-bg animated-bg-text" id="date">&nbsp;</small>
          </div>
        </div>
      </div>
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
  background-color: #ecf0f1;
  font-family: 'Roboto', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

img {
  max-width: 100%;
}

.card {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  width: 350px;
}

.card-header {
  height: 200px;
}

.card-header img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.card-content {
  background-color: #fff;
  padding: 30px;
}

.card-title {
  height: 20px;
  margin: 0;
}

.card-excerpt {
  color: #777;
  margin: 10px 0 20px;
}

.author {
  display: flex;
}

.profile-img {
  border-radius: 50%;
  overflow: hidden;
  height: 40px;
  width: 40px;
}

.author-info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 10px;
  width: 100px;
}

.author-info small {
  color: #aaa;
  margin-top: 5px;
}

.animated-bg {
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 10%,
    #f6f7f8 20%,
    #f6f7f8 100%
  );
  background-size: 200% 100%;
  animation: bgPos 1s linear infinite;
}

.animated-bg-text {
  border-radius: 50px;
  display: inline-block;
  margin: 0;
  height: 10px;
  width: 100%;
}

@keyframes bgPos {
  0% {
    background-position: 50% 0;
  }

  100% {
    background-position: -150% 0;
  }
}
```

### `script.js`

```js
const header = document.getElementById('header')
const title = document.getElementById('title')
const excerpt = document.getElementById('excerpt')
const profile_img = document.getElementById('profile_img')
const name = document.getElementById('name')
const date = document.getElementById('date')

const animated_bgs = document.querySelectorAll('.animated-bg')
const animated_bg_texts = document.querySelectorAll('.animated-bg-text')

setTimeout(getData, 2500)

function getData() {
  header.innerHTML =
    '<img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80" alt="" />'
  title.innerHTML = 'Lorem ipsum dolor sit amet'
  excerpt.innerHTML =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore perferendis'
  profile_img.innerHTML =
    '<img src="https://randomuser.me/api/portraits/men/45.jpg" alt="" />'
  name.innerHTML = 'John Doe'
  date.innerHTML = 'Oct 08, 2020'

  animated_bgs.forEach((bg) => bg.classList.remove('animated-bg'))
  animated_bg_texts.forEach((bg) => bg.classList.remove('animated-bg-text'))
}
```

## 6. Recap & Next Steps

**What you learned**

- How skeleton/shimmer loading screens are built with placeholder shapes.
- Creating a moving highlight with a `linear-gradient`, oversized `background-size`, and an animated `background-position`.
- Faking an async data load with `setTimeout`, then injecting content via `innerHTML`.
- Selecting element groups with `querySelectorAll` and toggling classes off with `forEach` + `classList.remove`.

**Enhancement challenges**

1. **Fetch real data** — replace the hard-coded values in `getData` with a real `fetch()` call to an API and render the response.
2. **Add a loading toggle** — add a button that resets the card to its shimmer state and "reloads" it.
3. **Randomize the delay** — vary the `setTimeout` duration to simulate different network speeds.
4. **Fade in the content** — add a CSS transition so real content fades in as the shimmer classes are removed.
5. **Make it a list** — duplicate the card several times and load them all, staggering each card's reveal.
