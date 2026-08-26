# Random Image Feed

## 1. Project Overview

A page that automatically fills a responsive grid with a batch of random photos pulled from an online image service — generated entirely by a JavaScript loop, with zero `<img>` tags written by hand.

**Key concepts involved**

- **Creating elements dynamically** with `document.createElement`
- Building strings with **template literals**
- **`for` loops** to repeat work
- **Random number generation** with `Math.random` / `Math.floor`
- Responsive image grids with **Flexbox** and `flex-wrap`

**HTML skills you'll gain**

- Setting up a minimal page with a single empty container that JS will fill
- Understanding why an empty `<div>` is a common "mount point" for generated content

**CSS skills you'll gain**

- Centering content with Flexbox
- Wrapping a row of items into a grid with `flex-wrap`
- Constraining and cropping images with fixed dimensions + `object-fit: cover`

**JavaScript skills you'll gain**

- Selecting an element with `querySelector`
- Writing helper functions that return values
- Composing template literal strings for URLs
- Using `Math.random()` and `Math.floor()` to produce random integers
- Creating DOM nodes in a loop and appending them with `appendChild`

---

## 2. Final Project Preview

**Layout & colors**
A clean white page with a centered heading, "Random Image Feed", at the top. Below it, a centered grid of 15 square photos (300×300px each) that wraps responsively — as many per row as the window allows, up to a max grid width of 1000px.

**Behavior & interactions**

- On page load, JavaScript immediately requests 15 random images and drops them into the grid.
- Every reload produces a fresh set of random photos.

**What you can interact with**
There are no buttons or inputs — the "interaction" is refreshing the page to get a new feed. This project is about *generating* DOM content, not responding to clicks.

---

## 3. Prerequisites

**Basic knowledge required**

- HTML document structure
- CSS selectors and Flexbox basics
- JavaScript variables, functions, and `for` loops

**Tools needed**

- A modern web browser
- A text editor (VS Code recommended)
- Optional: the **Live Server** VS Code extension
- An internet connection (images load from a web service)

**Files to create**

```
random-image-generator/
├── index.html
├── style.css
└── script.js
```

Create these three **empty** files to begin.

---

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML document

**🎯 Goal**
Set up the page shell and link the stylesheet and script.

**💡 Concept**
Start every project with a valid HTML5 skeleton. Linking `style.css` in the `<head>` and `script.js` at the end of `<body>` is the standard, reliable pattern.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Random Image Feed</title>
  </head>
  <body>
    <!-- content coming next -->
    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**
Standard boilerplate. The `<script>` sits at the bottom so the HTML is fully parsed before our JavaScript runs — important, because our JS needs to find an element on the page.

**✅ Checkpoint**
A blank page titled "Random Image Feed" in the browser tab.

---

### Step 2: Add the heading and the image container

**🎯 Goal**
Add the title and — crucially — the **empty** container that JavaScript will fill with images.

**💡 Concept**
A common pattern: leave an empty element in the HTML as a "mount point," then generate its children in JavaScript. The HTML stays tiny; the content is built at runtime.

**📝 Code**

```html
<!-- goes in index.html, replacing the comment inside <body> -->
<h1 class="title">Random Image Feed</h1>
<div class="container"></div>
```

**🔍 Explanation**

- `<h1 class="title">` is the page heading.
- `<div class="container"></div>` is intentionally **empty**. Notice there are no `<img>` tags — every image will be created by JavaScript and inserted here.

**✅ Checkpoint**
You'll see the "Random Image Feed" heading. Below it, nothing yet — the container is empty on purpose.

---

### Step 3: Base page styling

**🎯 Goal**
Load the font, reset the box model, and center everything vertically.

**💡 Concept**
`box-sizing: border-box` makes sizing predictable. A Flexbox column on `body` stacks and centers the heading and grid.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
}
```

**🔍 Explanation**

- `@import` pulls in the Roboto font (weights 400 and 700).
- `flex-direction: column` stacks children vertically; `align-items: center` centers them horizontally.
- `min-height: 100vh` makes the body at least as tall as the screen (so `justify-content: center` has room to work) while still allowing the page to grow taller when there are many images.

**✅ Checkpoint**
The heading is now centered horizontally in the Roboto font.

---

### Step 4: Style the title and the grid container

**🎯 Goal**
Space out the heading and turn the container into a centered, wrapping grid.

**💡 Concept**
`flex-wrap: wrap` is the key line — it lets flex items flow onto multiple rows instead of squeezing into one, which is exactly what a photo grid needs.

**📝 Code**

```css
/* goes in style.css */
.title {
  margin: 10px 0 0;
  text-align: center;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1000px;
}
```

**🔍 Explanation**

- `.title` gets a little top margin and centered text.
- `.container` becomes a flex row that **wraps**: items fill a row, then continue on the next. `max-width: 1000px` caps how wide the grid gets, and `justify-content: center` centers the items within it.

**✅ Checkpoint**
No visual change yet (the container is still empty), but the layout rules are ready to arrange images once JS adds them.

---

### Step 5: Style the images

**🎯 Goal**
Give every generated image a consistent square size.

**💡 Concept**
Setting equal `width` and `height` plus `object-fit: cover` guarantees uniform squares — the browser crops each photo to fill the box instead of distorting it.

**📝 Code**

```css
/* goes in style.css */
.container img {
  object-fit: cover;
  margin: 10px;
  height: 300px;
  width: 300px;
  max-width: 100%;
}
```

**🔍 Explanation**

- `.container img` targets every `<img>` inside the container (they don't exist yet — JS makes them — but the rule is ready).
- `height`/`width: 300px` makes squares; `object-fit: cover` crops to fill without stretching.
- `margin: 10px` spaces them apart; `max-width: 100%` keeps a 300px image from overflowing a very narrow phone screen.

**✅ Checkpoint**
Still nothing visible — CSS is complete and waiting. Time for the JavaScript.

---

### Step 6: Select the container and set up constants

**🎯 Goal**
Grab the container element and define the values we'll build image URLs from.

**💡 Concept**
Naming fixed values as `const` up top makes the code readable and easy to tweak — change `rows` in one place to change how many images you generate.

**📝 Code**

```js
// goes in script.js
const container = document.querySelector('.container')
const unsplashURL = 'https://source.unsplash.com/random/'
const rows = 5
```

**🔍 Explanation**

- `container` is the empty `<div>` we'll append images into.
- `unsplashURL` is the base URL of an image service. Adding a size like `300x300` to the end returns a random photo at that size.
- `rows = 5` — we'll create `rows * 3` = **15** images.

**✅ Checkpoint**
Open the console (F12): no errors. Nothing on screen yet.

---

### Step 7: Write a helper for random numbers

**🎯 Goal**
Create a function that returns a random integer for the image dimensions.

**💡 Concept**
`Math.random()` returns a decimal from 0 up to (but not including) 1. Multiplying, flooring, and offsetting turns it into a random integer in a chosen range.

**📝 Code**

```js
// goes in script.js
function getRandomNr() {
  return Math.floor(Math.random() * 10) + 300
}
```

**🔍 Explanation**

- `Math.random() * 10` gives a decimal from 0 up to ~9.99.
- `Math.floor(...)` rounds *down* to a whole number: 0–9.
- `+ 300` shifts that to **300–309**.

**Why this range?** The images are displayed at a fixed 300px by our CSS, so the exact pixel size barely matters visually. The real purpose is to make each request URL slightly different — a unique URL helps ensure the service returns a *different* random photo rather than a cached duplicate.

**✅ Checkpoint**
In the console, run `getRandomNr()` a few times — you'll get numbers between 300 and 309.

---

### Step 8: Write a helper that builds a size string

**🎯 Goal**
Combine two random numbers into a `"WIDTHxHEIGHT"` string for the URL.

**💡 Concept**
**Template literals** (backtick strings) let you embed expressions with `${...}` — perfect for assembling strings from variables.

**📝 Code**

```js
// goes in script.js
function getRandomSize() {
  return `${getRandomNr()}x${getRandomNr()}`
}
```

**🔍 Explanation**
This calls `getRandomNr()` twice and joins the results with an `x`, producing something like `"304x301"`. Appended to the base URL, that becomes a request for a random image of that size.

**✅ Checkpoint**
In the console, run `getRandomSize()` — you'll get strings like `"307x302"`.

---

### Step 9: Generate the images in a loop

**🎯 Goal**
Create 15 `<img>` elements, point each at a random image URL, and add them to the page.

**💡 Concept**
A `for` loop repeats a block a set number of times. Inside, `document.createElement` builds a brand-new element in memory, and `appendChild` inserts it into the live page.

**📝 Code**

```js
// goes in script.js — place this ABOVE the two helper functions
for (let i = 0; i < rows * 3; i++) {
  const img = document.createElement('img')
  img.src = `${unsplashURL}${getRandomSize()}`
  container.appendChild(img)
}
```

**🔍 Explanation**

- `rows * 3` = 15, so the loop runs 15 times (`i` goes 0 → 14).
- `document.createElement('img')` makes a new `<img>` (not yet on the page).
- `img.src = \`${unsplashURL}${getRandomSize()}\`` builds the full URL, e.g. `https://source.unsplash.com/random/305x300`, and sets it as the image source.
- `container.appendChild(img)` inserts the finished image into our container, where CSS immediately styles it.

**Note on ordering:** in JavaScript, `function` declarations are **hoisted** — the whole function is available before the line where it's written. That's why this loop can call `getRandomSize()` even though the helper is defined *below* it. This matches the original file's layout.

**✅ Checkpoint**
Reload the page: a centered, wrapping grid of 15 square photos appears, and each refresh gives you a new set. 🎉

**⚠️ Heads-up:** the `source.unsplash.com/random/` endpoint has been unreliable/retired by Unsplash over time. If you see broken-image icons instead of photos, the *code* is correct — the service is the problem. See challenge #1 below for an easy swap to a working service.

---

## 5. Final Full Code (Reference)

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Random Image Feed</title>
  </head>
  <body>
    <h1 class="title">Random Image Feed</h1>
    <div class="container"></div>

    <script src="script.js"></script>
  </body>
</html>
```

```css
/* style.css */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
}

.title {
  margin: 10px 0 0;
  text-align: center;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1000px;
}

.container img {
  object-fit: cover;
  margin: 10px;
  height: 300px;
  width: 300px;
  max-width: 100%;
}
```

```js
// script.js
const container = document.querySelector('.container')
const unsplashURL = 'https://source.unsplash.com/random/'
const rows = 5

for(let i = 0; i < rows * 3; i++) {
    const img = document.createElement('img')
    img.src = `${unsplashURL}${getRandomSize()}`
    container.appendChild(img)
}

function getRandomSize() {
    return `${getRandomNr()}x${getRandomNr()}`
}

function getRandomNr() {
    return Math.floor(Math.random() * 10) + 300
}
```

---

## 6. Recap & Next Steps

**What you learned**

- Using an empty container as a "mount point" and generating its contents in JS
- Writing small **helper functions** that each do one job and return a value
- Producing random integers with `Math.floor(Math.random() * range) + offset`
- Assembling URLs with **template literals**
- Creating elements with `createElement` and inserting them with `appendChild`
- Building a responsive grid with `flex-wrap` and uniform, cropped images
- That function declarations are **hoisted**, so helpers can be called before they're defined

**Enhancement challenges**

1. **Use a working image service:** swap the base URL for `https://picsum.photos/` (e.g. `` `https://picsum.photos/${getRandomNr()}` ``) so images reliably load.
2. **Add a "Load More" button:** wrap the loop in a function and call it on button click to append another batch.
3. **Let the user choose the count:** add a number input for `rows` and regenerate the feed based on it.
4. **Add a loading state:** show a placeholder or spinner in each slot until its image finishes loading (`img.onload`).
5. **Add a lightbox:** on clicking a thumbnail, open a larger version in an overlay.
