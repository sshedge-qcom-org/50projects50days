# Live User Filter

## 1. Project Overview

The **Live User Filter** fetches 50 random people from a public API and shows them in a scrollable card. As you type in a search box, the list instantly narrows down to only the people whose name or location matches what you typed.

**Key concepts involved:**

- Fetching data from a remote API with `fetch`
- Asynchronous JavaScript: **Promises**, `async`/`await`
- Building DOM elements from data (looping + template literals)
- Live, keystroke-by-keystroke filtering with an `input` event
- Showing/hiding elements by toggling a CSS class

**HTML skills you'll gain:**

- Structuring a small "card" component with a header and a list
- Using semantic tags like `<header>`, `<small>`, and `<ul>`/`<li>`
- Wiring a text `<input>` up to JavaScript with an `id`

**CSS skills you'll gain:**

- Centering a card in the viewport with Flexbox
- Making a scrollable region with `max-height` + `overflow-y: auto`
- Styling circular avatars with `border-radius: 50%` and `object-fit`
- A reusable `.hide` utility class to toggle visibility from JS

**JavaScript skills you'll gain:**

- What a Promise is and how `async`/`await` reads network data
- Destructuring a value out of a JSON response
- Creating elements with `document.createElement` and filling them with template literals
- Case-insensitive substring matching with `.toLowerCase()` + `.includes()`
- Keeping references to created elements so filtering stays fast

---

## 2. Final Project Preview

**The UI:** A single 300px-wide card, centered on a soft off-white page. The top of the card is a blue header containing the title "Live User Filter", a lighter subtitle ("Search by name and/or location"), and a rounded, semi-transparent search input. Below the header is a white, scrollable list of users. Each row shows a circular profile photo on the left, with the person's full name and their "City, Country" beside it.

**The behavior:**

- On page load, the list shows a temporary **"Loading..."** message while 50 random users are downloaded from the internet.
- Once the data arrives, the loading text is replaced by 50 user rows.
- As you type in the search box, the list filters **live** (on every keystroke). Rows that don't match the text you've typed disappear; matching rows stay. Matching checks both the name and the location.
- Clearing the box brings everyone back.

**What you can interact with:**

- The **search input** — the only interactive element. Type to filter; delete to un-filter.

---

## 3. Prerequisites

**Basic knowledge required:** You should recognize basic HTML tags, CSS rules, and JavaScript variables/functions. You do **not** need prior experience with `fetch` or `async`/`await` — we'll build that understanding here.

**Tools needed:**

- A modern web browser (Chrome, Firefox, Edge…)
- A text editor (VS Code recommended)
- An **internet connection** (this project downloads live data from an API)
- Optional but recommended: the **Live Server** VS Code extension for auto-refresh

**Files to create:**

```
live-user-filter/
├── index.html
├── style.css
└── script.js
```

Create these three empty files and let's begin.

---

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML Skeleton

**🎯 Goal**
Set up a valid HTML document that links our stylesheet and script, so everything we add later has a home.

**💡 Concept**
Every web page starts with a boilerplate: a `<!DOCTYPE>`, a `<head>` for metadata/links, and a `<body>` for visible content. We link the CSS in the head (so styles are ready before content paints) and the JS at the end of the body (so the HTML exists before the script runs).

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Live User Filter</title>
  </head>
  <body>
    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**

- `<!DOCTYPE html>` tells the browser to use modern (HTML5) rendering.
- `<meta name="viewport" ...>` makes the page scale correctly on phones.
- `<link rel="stylesheet" href="style.css" />` connects our (currently empty) CSS file.
- `<script src="script.js"></script>` sits at the **bottom** of `<body>`. Placing it last means the browser has already built the page's HTML by the time the script runs — so our JS can find the elements it needs.

**✅ Checkpoint**
Open `index.html` in your browser. You'll see a blank page with the tab titled "Live User Filter". No errors — perfect.

---

### Step 2: Build the Card Header

**🎯 Goal**
Add the card wrapper and its blue header: a title, a subtitle, and the search box.

**💡 Concept**
We wrap everything in a `.container` so we can style the whole card as one unit. The search `<input>` gets an `id="filter"` — an `id` is a unique hook that JavaScript will use to "grab" this exact element later.

**📝 Code**

```html
<!-- goes in index.html — inside <body>, above the <script> tag -->
<div class="container">
  <header class="header">
    <h4 class="title">Live User Filter</h4>
    <small class="subtitle">Search by name and/or location</small>
    <input type="text" id="filter" placeholder="Search">
  </header>
</div>
```

**🔍 Explanation**

- `.container` is the outer card; `.header` is the colored top strip.
- `<h4 class="title">` is the heading. `<small class="subtitle">` is the muted helper text below it.
- The `<input>` has `type="text"` and a `placeholder` (the greyed-out "Search" hint). Its `id="filter"` is the important part — that's the name we'll reference in JavaScript.

**✅ Checkpoint**
Refresh. You'll see unstyled text ("Live User Filter", "Search by name and/or location") and a plain text box. It's ugly for now — styling comes soon.

---

### Step 3: Add the Results List

**🎯 Goal**
Add the list where users will appear, with a placeholder "Loading..." message.

**💡 Concept**
Data from the internet doesn't arrive instantly. A **loading state** — some placeholder shown while we wait — is good UX. We hard-code "Loading..." into the HTML so users see it immediately; JavaScript will replace it once real data arrives.

**📝 Code**

```html
<!-- goes in index.html — inside <div class="container">, right after </header> -->
<ul id="result" class="user-list">
  <li>
    <h3>Loading...</h3>
  </li>
</ul>
```

**🔍 Explanation**

- `<ul id="result">` is the container for user rows. The `id="result"` is our JavaScript hook for this list.
- The single `<li><h3>Loading...</h3></li>` is our temporary placeholder. Because it's baked into the HTML, it appears the instant the page loads — before any JavaScript runs.

**✅ Checkpoint**
Refresh. Below the header you now see "Loading...". This text will stay forever until we write the JS — that's expected for now.

---

### Step 4: Reset Box-Sizing and Center the Page

**🎯 Goal**
Import our font, apply a sane box model, and center the card in the middle of the screen.

**💡 Concept**
`box-sizing: border-box` makes an element's declared width *include* its padding and border — this makes sizing predictable. We then turn `<body>` into a Flexbox container to center its child both horizontally and vertically.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #f8f9fd;
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

- `@import url(...)` pulls in Google's **Roboto** font. Keep this as the very first line of the CSS.
- The `*` selector targets **every** element; `box-sizing: border-box` gives us predictable widths everywhere.
- On `body`: `display: flex` + `align-items: center` (vertical) + `justify-content: center` (horizontal) centers the card. `height: 100vh` makes the body fill the full viewport height so "center" means the middle of the screen. `overflow: hidden` prevents page scrollbars, and `margin: 0` removes the browser's default body margin.

**✅ Checkpoint**
Refresh. The font changes to Roboto, the background is a pale off-white, and the content is now centered on the screen.

---

### Step 5: Style the Card Container

**🎯 Goal**
Turn the plain `.container` into a rounded, shadowed card with a fixed width.

**💡 Concept**
`overflow: hidden` on a rounded container "clips" its children to the rounded corners — so the header's square corners won't poke out past the card's curve.

**📝 Code**

```css
/* goes in style.css */
.container {
  border-radius: 5px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 300px;
}
```

**🔍 Explanation**

- `border-radius: 5px` rounds the corners.
- `box-shadow: 3px 3px 10px rgba(0,0,0,0.2)` adds a soft drop shadow (offset 3px right/down, 10px blur, 20% black).
- `overflow: hidden` clips inner content to those rounded corners.
- `width: 300px` fixes the card's width.

**✅ Checkpoint**
Refresh. The content is now grouped into a 300px rounded card with a subtle shadow.

---

### Step 6: Style the Header and Search Input

**🎯 Goal**
Give the header its blue background and white text, and turn the plain text box into a rounded, translucent search field.

**💡 Concept**
A semi-transparent background (`rgba(0,0,0,0.3)`) on the input lets the blue header show through slightly, giving a "frosted" pill look. Removing the default focus outline is a stylistic choice (we'll note the accessibility trade-off later).

**📝 Code**

```css
/* goes in style.css */
.title {
  margin: 0;
}

.subtitle {
  display: inline-block;
  margin: 5px 0 20px;
  opacity: 0.8;
}

.header {
  background-color: #3e57db;
  color: #fff;
  padding: 30px 20px;
}

.header input {
  background-color: rgba(0, 0, 0, 0.3);
  border: 0;
  border-radius: 50px;
  color: #fff;
  font-size: 14px;
  padding: 10px 15px;
  width: 100%;
}

.header input:focus {
  outline: none;
}
```

**🔍 Explanation**

- `.title { margin: 0 }` removes the default heading margin so spacing is controlled.
- `.subtitle` uses `opacity: 0.8` to look slightly muted, with margin creating a gap before the input.
- `.header` sets the signature blue (`#3e57db`), white text, and roomy padding.
- `.header input`: `border-radius: 50px` makes the pill shape, `width: 100%` fills the header, and the translucent black background sits nicely on the blue.
- `.header input:focus { outline: none }` hides the browser's default focus ring.

**✅ Checkpoint**
Refresh. The header is now blue with white text, and the search box is a rounded translucent pill. Looking sharp.

---

### Step 7: Style the User List and Rows

**🎯 Goal**
Make the list scrollable and lay out each row with an avatar beside the user's info.

**💡 Concept**
`max-height` + `overflow-y: auto` creates a **scroll region**: the list grows only up to 400px tall, then scrolls internally instead of pushing the page. Each `<li>` uses `display: flex` to place the image and text side-by-side.

**📝 Code**

```css
/* goes in style.css */
.user-list {
  background-color: #fff;
  list-style-type: none;
  margin: 0;
  padding: 0;
  max-height: 400px;
  overflow-y: auto;
}

.user-list li {
  display: flex;
  padding: 20px;
}

.user-list img {
  border-radius: 50%;
  object-fit: cover;
  height: 50px;
  width: 50px;
}

.user-list .user-info {
  margin-left: 10px;
}

.user-list .user-info h4 {
  margin: 0 0 10px;
}

.user-list .user-info p {
  font-size: 12px;
}
```

**🔍 Explanation**

- `.user-list`: white background, no bullets (`list-style-type: none`), no default list margin/padding. `max-height: 400px` + `overflow-y: auto` make it scroll once there are lots of users.
- `.user-list li { display: flex }` lays out each row horizontally, with `padding: 20px` for breathing room.
- `.user-list img`: `border-radius: 50%` makes the avatar a circle; `object-fit: cover` stops the photo from stretching; fixed `50px` square keeps rows uniform.
- `.user-info` gets a left margin to separate it from the avatar; its `<h4>` (the name) and `<p>` (the location) get tuned spacing and a smaller font.

**✅ Checkpoint**
Refresh. Nothing visually changes *yet* (we still only have the "Loading..." row, which has no image), but these rules are ready for when JS injects real users.

---

### Step 8: Add Row Dividers and the `.hide` Utility

**🎯 Goal**
Add a thin divider between rows, and create the class JavaScript will use to hide filtered-out users.

**💡 Concept**
`:not(:last-of-type)` applies a bottom border to every `<li>` **except the last**, avoiding a dangling border at the bottom. The `.hide` class is a **utility class**: it does one job (`display: none`), and JS toggles it on/off to filter the list.

**📝 Code**

```css
/* goes in style.css */
.user-list li:not(:last-of-type) {
  border-bottom: 1px solid #eee;
}

.user-list li.hide {
  display: none;
}
```

**🔍 Explanation**

- `.user-list li:not(:last-of-type)` draws a light grey divider under every row but the final one.
- `.user-list li.hide` completely removes a row from layout (`display: none`) when it also carries the `hide` class. This is the switch our filter will flip. **The CSS defines the behavior once; the JS just adds or removes the class.**

**✅ Checkpoint**
Refresh. Still just "Loading...", but the styling is complete. Time for JavaScript to bring in real data.

---

### Step 9: Grab Elements and Prepare a Store

**🎯 Goal**
Get references to the list and the input, and create an array to remember every user row we build.

**💡 Concept**
`document.getElementById` finds an element by its `id`. We also declare `listItems` — an array where we'll stash each `<li>` we create. Keeping these references means filtering later won't need to re-query the DOM every keystroke.

**📝 Code**

```js
// goes in script.js
const result = document.getElementById('result')
const filter = document.getElementById('filter')
const listItems = []
```

**🔍 Explanation**

- `result` points to the `<ul id="result">` where users go.
- `filter` points to the `<input id="filter">` search box.
- `listItems` starts empty; we'll `push` each generated `<li>` into it so the filter function can loop over them quickly.

**✅ Checkpoint**
No visible change. Open the browser console (F12) — there should be no errors.

---

### Step 10: Understand `async`/`await`, Then Fetch the Data

**🎯 Goal**
Write the function that downloads 50 users from the API.

**💡 Concept**
Network requests take time, and JavaScript doesn't freeze while waiting. Instead, `fetch()` returns a **Promise** — an object that represents a value that isn't ready *yet* but will be *later* (either it succeeds/"resolves", or it fails/"rejects").

- Marking a function `async` lets us use the `await` keyword inside it.
- `await` **pauses** that function until a Promise resolves, then hands back the resolved value — letting us write asynchronous code that reads top-to-bottom like normal synchronous code.

`fetch(url)` resolves to a **Response** object. That response isn't the data itself yet — we need a second step (in the next code block) to read its body.

> **Loading & error states:** While we `await`, the "Loading..." row we added in Step 3 stays on screen — that's our loading state. Note that this project has no explicit *error* handling: if the network fails, the "Loading..." text would simply remain. That's fine for a demo; we'll flag adding error handling as a challenge at the end.

**📝 Code**

```js
// goes in script.js — call it once, then define it below
getData()

async function getData() {
    const res = await fetch('https://randomuser.me/api?results=50')
}
```

**🔍 Explanation**

- `getData()` **calls** the function immediately so data loads on page open. (In JavaScript, `function` declarations are "hoisted", so we can call it above where it's defined.)
- `async function getData()` declares an asynchronous function.
- `await fetch('https://randomuser.me/api?results=50')` asks the [Random User API](https://randomuser.me) for 50 users and waits for the response, storing it in `res`. The `?results=50` part is a query parameter requesting 50 people.

**✅ Checkpoint**
No visible change yet (we fetch but don't use the data). In the console, no errors should appear. Onward to reading the response.

---

### Step 11: Parse the JSON and Clear the Placeholder

**🎯 Goal**
Extract the array of users from the response, then wipe the "Loading..." message.

**💡 Concept**
The API sends data as **JSON** (text). `res.json()` parses that text into a JavaScript object — and it *also* returns a Promise, so we `await` it too. The response shape is `{ results: [...] }`, so we use **destructuring** (`const { results }`) to pull the `results` array out directly.

**📝 Code**

```js
// goes in script.js — inside getData(), after the fetch line
    const { results } = await res.json()

    // Clear result
    result.innerHTML = ''
```

**🔍 Explanation**

- `const { results } = await res.json()` does two things: `await res.json()` parses the response body into an object, and `const { results }` grabs its `results` property (an array of 50 user objects) into a variable named `results`.
- `result.innerHTML = ''` empties the `<ul>` — this deletes the "Loading..." `<li>`, clearing the way for real users.

**✅ Checkpoint**
Refresh. After a brief pause, "Loading..." **disappears** (leaving an empty list). We're deleting the placeholder but haven't added users back yet — that's the next step.

---

### Step 12: Build a Row for Each User

**🎯 Goal**
Loop over the 50 users and create a styled `<li>` for each one.

**💡 Concept**
`Array.forEach` runs a function once per item. For each user we `createElement('li')`, remember it in `listItems`, fill it with a **template literal** (backtick string with `${...}` placeholders), then append it to the list.

**📝 Code**

```js
// goes in script.js — inside getData(), right after result.innerHTML = ''
    results.forEach(user => {
        const li = document.createElement('li')

        listItems.push(li)

        li.innerHTML = `
            <img src="${user.picture.large}" alt="${user.name.first}">
            <div class="user-info">
                <h4>${user.name.first} ${user.name.last}</h4>
                <p>${user.location.city}, ${user.location.country}</p>
            </div>
        `

        result.appendChild(li)
    })
```

**🔍 Explanation**

- `results.forEach(user => { ... })` runs the block for each of the 50 users.
- `document.createElement('li')` makes a fresh empty `<li>` in memory.
- `listItems.push(li)` stores that `<li>` in our array so the filter can find it later.
- `li.innerHTML = \`...\`` fills the row. The `${...}` slots read fields from each `user` object: `user.picture.large` (photo URL), `user.name.first`/`user.name.last`, and `user.location.city`/`user.location.country`. The markup matches the classes we styled in Steps 7–8.
- `result.appendChild(li)` inserts the finished row into the page.

**✅ Checkpoint**
Refresh. After a short load, **50 real users appear** — circular photos, names, and locations, in a scrollable list. Scroll to confirm the internal scrollbar works.

---

### Step 13: Filter the List as You Type

**🎯 Goal**
Wire up the search box so typing narrows the list live.

**💡 Concept**
The `input` event fires on **every** change to the field (each keypress, paste, or delete) — perfect for "live" filtering. We read `e.target.value` (the current text) and pass it to a filter function.

**📝 Code**

```js
// goes in script.js — place this line near the top, after the const declarations
filter.addEventListener('input', (e) => filterData(e.target.value))
```

**🔍 Explanation**

- `filter.addEventListener('input', ...)` listens for changes to the search box.
- `e` is the **event object**; `e.target` is the input element, and `e.target.value` is whatever is currently typed.
- We forward that text into `filterData(...)`, which we'll define next.

**✅ Checkpoint**
Refresh, then type in the box. You'll get a `filterData is not defined` error in the console — expected, because we haven't written it yet. Next step fixes that.

---

### Step 14: Write the Filter Logic

**🎯 Goal**
Show rows that match the search term and hide the rest.

**💡 Concept**
For each stored row, we compare its text against the search term. To make the match **case-insensitive**, we lowercase both sides before comparing with `.includes()` (which checks if one string contains another). Matching toggles the `.hide` class we defined in CSS.

**📝 Code**

```js
// goes in script.js — at the bottom of the file
function filterData(searchTerm) {
    listItems.forEach(item => {
        if(item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
            item.classList.remove('hide')
        } else {
            item.classList.add('hide')
        }
    })
}
```

**🔍 Explanation**

- `listItems.forEach(item => ...)` loops over every row we saved in Step 12.
- `item.innerText` is the row's visible text (the name and location combined). Because the location is part of that text, searching by city or country works automatically — no extra code needed.
- `.toLowerCase()` on both the row text and the search term makes matching ignore case (so "JOHN" matches "john").
- `.includes(...)` returns `true` if the row text contains the search term.
- Match → `classList.remove('hide')` (show it). No match → `classList.add('hide')` (hide it). This is exactly why we defined `.hide { display: none }` in CSS.

**✅ Checkpoint**
Refresh and type a name or a country. The list filters live as you type, and clearing the box brings everyone back. The project is complete!

---

## 5. Final Full Code (Reference)

**`index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Live User Filter</title>
  </head>
  <body>
    <div class="container">
      <header class="header">
        <h4 class="title">Live User Filter</h4>
        <small class="subtitle">Search by name and/or location</small>
        <input type="text" id="filter" placeholder="Search">
      </header>

      <ul id="result" class="user-list">
        <li>
          <h3>Loading...</h3>
        </li>
      </ul>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

**`style.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #f8f9fd;
  font-family: 'Roboto', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.container {
  border-radius: 5px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 300px;
}

.title {
  margin: 0;
}

.subtitle {
  display: inline-block;
  margin: 5px 0 20px;
  opacity: 0.8;
}

.header {
  background-color: #3e57db;
  color: #fff;
  padding: 30px 20px;
}

.header input {
  background-color: rgba(0, 0, 0, 0.3);
  border: 0;
  border-radius: 50px;
  color: #fff;
  font-size: 14px;
  padding: 10px 15px;
  width: 100%;
}

.header input:focus {
  outline: none;
}

.user-list {
  background-color: #fff;
  list-style-type: none;
  margin: 0;
  padding: 0;
  max-height: 400px;
  overflow-y: auto;
}

.user-list li {
  display: flex;
  padding: 20px;
}

.user-list img {
  border-radius: 50%;
  object-fit: cover;
  height: 50px;
  width: 50px;
}

.user-list .user-info {
  margin-left: 10px;
}

.user-list .user-info h4 {
  margin: 0 0 10px;
}

.user-list .user-info p {
  font-size: 12px;
}

.user-list li:not(:last-of-type) {
  border-bottom: 1px solid #eee;
}

.user-list li.hide {
  display: none;
}
```

**`script.js`**

```js
const result = document.getElementById('result')
const filter = document.getElementById('filter')
const listItems = []

getData()

filter.addEventListener('input', (e) => filterData(e.target.value))

async function getData() {
    const res = await fetch('https://randomuser.me/api?results=50')

    const { results } = await res.json()

    // Clear result
    result.innerHTML = ''

    results.forEach(user => {
        const li = document.createElement('li')

        listItems.push(li)

        li.innerHTML = `
            <img src="${user.picture.large}" alt="${user.name.first}">
            <div class="user-info">
                <h4>${user.name.first} ${user.name.last}</h4>
                <p>${user.location.city}, ${user.location.country}</p>
            </div>
        `

        result.appendChild(li)
    })
}

function filterData(searchTerm) {
    listItems.forEach(item => {
        if(item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
            item.classList.remove('hide')
        } else {
            item.classList.add('hide')
        }
    })
}
```

---

## 6. Recap & Next Steps

**What you learned:**

- How to fetch remote data with `fetch` and read it using `async`/`await` and Promises.
- Destructuring a property (`results`) out of a JSON response.
- Generating DOM elements from an array with `createElement`, template literals, and `appendChild`.
- Live filtering with the `input` event and case-insensitive `.includes()` matching.
- Toggling a `.hide` CSS class to show/hide elements from JavaScript.
- Building a scrollable card with Flexbox, `max-height`, and `overflow-y: auto`.

**Enhancement challenges:**

1. **Add error handling.** Wrap the `fetch` in a `try/catch` and show a friendly "Couldn't load users" message if the request fails.
2. **Show a "no results" message.** When every row is hidden, display "No matches found" instead of an empty list.
3. **Debounce the search.** For large lists, delay filtering until the user stops typing for ~200ms (look up "debounce").
4. **Highlight the match.** Wrap the matched portion of the name/location in a `<mark>` tag so it stands out.
5. **Add a refresh button.** Add a button that calls `getData()` again to pull a fresh set of 50 random users.
