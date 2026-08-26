# Dad Jokes

## 1. Project Overview

A "Don't Laugh Challenge" card that fetches a random dad joke from a public API and displays it. Click the button to load another one. This is a gentle first taste of talking to a web API from the browser.

**Key concepts involved:**

- Fetching data from a remote API with `fetch`
- Promises and `async`/`await` (how JavaScript handles things that take time)
- Sending request headers to ask the API for JSON
- Updating the page with the response

**HTML skills you'll gain**

- Structuring a simple card with a heading, a text region, and a button
- Using `id`s as hooks for JavaScript

**CSS skills you'll gain**

- Centering a card with Flexbox
- Styling a card with `box-shadow` and rounded corners
- Adding button press feedback with `:active`

**JavaScript skills you'll gain**

- What a **Promise** is and why network requests return one
- Writing an `async` function and pausing on `await`
- Calling `fetch` with a config object (custom headers)
- Parsing a JSON response with `res.json()`
- Running code on page load and on a button click
- (Awareness) loading/error states and API-key visibility in front-end code

---

## 2. Final Project Preview

**Layout & colors**

- A periwinkle/indigo page with a wide white card centered on it.
- The card has a faint uppercase-ish subtitle ("Don't Laugh Challenge"), a large joke in the middle, and a purple "Get Another Joke" button below.

**Behavior & interactions**

- On page load, a joke is fetched automatically and shown.
- Click **Get Another Joke** → a new joke replaces the old one.
- The button dips slightly when pressed.

**What you can interact with**

- The "Get Another Joke" button (click to fetch a new joke)

---

## 3. Prerequisites

**You should know:** basic HTML/CSS and basic JS (variables, functions). No prior API experience needed — we'll explain it.

**Tools needed:**

- A modern browser with an internet connection (the jokes come from a live API)
- A text editor (VS Code recommended)
- Optional: VS Code "Live Server" for auto-reload

**Files to create:**

```
dad-jokes/
├── index.html
├── style.css
└── script.js
```

Start with all three files **empty**.

### A quick primer on async, Promises, and APIs

Before we write the JavaScript, three ideas to keep in mind:

- **API**: a service you send a request to and get data back from. We'll use `icanhazdadjoke.com`, which returns a random joke.
- **Promise**: fetching over the network isn't instant. `fetch` immediately returns a **Promise** — a placeholder object that will *eventually* hold the result (or an error). Think of it as a receipt you redeem once the food is ready.
- **`async` / `await`**: inside a function marked `async`, the keyword `await` pauses that function until a Promise settles, then gives you the value — letting asynchronous code read top-to-bottom like normal code.
- **Loading & error states**: real apps usually show a "Loading…" message and handle failures (no internet, API down). This minimal project doesn't — good to know, and a great enhancement later.
- **API keys are public in front-end code**: anything in your JavaScript is visible to anyone who opens DevTools. Never put a secret API key in client-side code. (Happily, the dad-joke API needs no key — it just wants a header asking for JSON.)

---

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML skeleton

**🎯 Goal**
Set up the document and link the stylesheet and script.

**💡 Concept**
Standard boilerplate; the script goes at the end of `<body>`.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Dad Jokes</title>
  </head>
  <body>

    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**

- Head tags, a link to `style.css`, and a deferred `script.js` at the bottom.

**✅ Checkpoint**
Open `index.html`. Blank page, tab titled "Dad Jokes", no errors.

---

### Step 2: Build the card structure

**🎯 Goal**
Add the subtitle, the joke area, and the button.

**💡 Concept**
The joke lives in a `<div id="joke">` so JavaScript can find it by id and replace its contents. The button also gets an id so we can attach a click handler.

**📝 Code**

```html
<!-- goes in index.html, inside <body> above the <script> -->
<div class="container">
  <h3>Don't Laugh Challenge</h3>
  <div id="joke" class="joke">// Joke goes here</div>
  <button id="jokeBtn" class="btn">Get Another Joke</button>
</div>
```

**🔍 Explanation**

- `.container` is the card. `<h3>` is the subtitle.
- `<div id="joke" class="joke">` holds placeholder text (`// Joke goes here`) that JavaScript will overwrite with a real joke. The `id="joke"` is our JS hook.
- `<button id="jokeBtn" class="btn">` is what the user clicks; `id="jokeBtn"` lets JS attach a click listener.

**✅ Checkpoint**
Refresh. You'll see "Don't Laugh Challenge", the placeholder "// Joke goes here", and a "Get Another Joke" button — all unstyled.

---

### Step 3: Import the font, reset the box model, and center the page

**🎯 Goal**
Set the indigo background and center the card.

**💡 Concept**
A flex column that centers its child both vertically and horizontally, with a little padding so the card never touches the screen edges.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #686de0;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 20px;
}
```

**🔍 Explanation**

- `@import` loads Roboto (first line).
- `body` fills the viewport, uses an indigo background, and centers the card with Flexbox. `padding: 20px` keeps the card off the edges on small screens.

**✅ Checkpoint**
Refresh. The content is centered on an indigo background.

---

### Step 4: Style the card and subtitle

**🎯 Goal**
Turn the container into a clean white card and soften the subtitle.

**💡 Concept**
A layered `box-shadow` gives a subtle floating effect; `opacity` fades the subtitle so the joke stands out.

**📝 Code**

```css
/* goes in style.css */
.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);
  padding: 50px 20px;
  text-align: center;
  max-width: 100%;
  width: 800px;
}

h3 {
  margin: 0;
  opacity: 0.5;
  letter-spacing: 2px;
}
```

**🔍 Explanation**

- `.container` becomes a centered white card, `800px` wide (but `max-width: 100%` so it shrinks on narrow screens), with rounded corners and a soft double shadow.
- `h3` loses its default margin, is faded to 50% opacity, and gets spaced-out letters.

**✅ Checkpoint**
Refresh. The content now sits in a white rounded card with a faint subtitle.

---

### Step 5: Style the joke text

**🎯 Goal**
Make the joke large and readable.

**💡 Concept**
Constraining the width and increasing line height keeps long jokes comfortable to read.

**📝 Code**

```css
/* goes in style.css */
.joke {
  font-size: 30px;
  letter-spacing: 1px;
  line-height: 40px;
  margin: 50px auto;
  max-width: 600px;
}
```

**🔍 Explanation**

- The joke is large (`30px`) with roomy line height. `margin: 50px auto` centers it horizontally and adds vertical space; `max-width: 600px` keeps lines from getting too wide.

**✅ Checkpoint**
Refresh. The placeholder joke text is now big and centered.

---

### Step 6: Style the button

**🎯 Goal**
Give the button a purple pill look with press feedback.

**💡 Concept**
`:active` fires while the button is held down; a small `scale` makes it feel clickable.

**📝 Code**

```css
/* goes in style.css */
.btn {
  background-color: #9f68e0;
  color: #fff;
  border: 0;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);
  padding: 14px 40px;
  font-size: 16px;
  cursor: pointer;
}

.btn:active {
  transform: scale(0.98);
}

.btn:focus {
  outline: 0;
}
```

**🔍 Explanation**

- `.btn` is a purple, rounded, shadowed button with white text and a pointer cursor.
- `:active { transform: scale(0.98) }` shrinks it slightly while pressed; `:focus { outline: 0 }` removes the default focus ring.

**✅ Checkpoint**
Refresh. The button is now a purple pill that dips when pressed. Styling is complete — on to the data.

---

### Step 7: Grab the joke element and the button

**🎯 Goal**
Get references to the two elements JavaScript needs.

**💡 Concept**
`getElementById` returns the element with the given id, which we store for reuse.

**📝 Code**

```js
// goes in script.js
const jokeEl = document.getElementById('joke')
const jokeBtn = document.getElementById('jokeBtn')
```

**🔍 Explanation**

- `jokeEl` is the `<div>` whose text we'll replace with each joke.
- `jokeBtn` is the button we'll listen to for clicks.

**✅ Checkpoint**
No visible change. The console should be error-free (both elements were found).

---

### Step 8: Write the async function that fetches a joke

**🎯 Goal**
Create a function that asks the API for a joke and drops it into the page.

**💡 Concept**
`fetch` returns a **Promise**. Marking the function `async` lets us `await` that Promise — pausing until the response arrives — so the code reads in a simple top-to-bottom way. We must send an `Accept: application/json` header because this API returns plain HTML by default; the header asks it for JSON instead.

**📝 Code**

```js
// goes in script.js
// USING ASYNC/AWAIT
async function generateJoke() {
  const config = {
    headers: {
      Accept: 'application/json',
    },
  }

  const res = await fetch('https://icanhazdadjoke.com', config)

  const data = await res.json()

  jokeEl.innerHTML = data.joke
}
```

**🔍 Explanation**

- `async function generateJoke()` — the `async` keyword is what allows `await` inside.
- `config` is an options object; its `headers` tell the API "please respond with JSON." Without this header, `icanhazdadjoke.com` sends back an HTML page instead of data.
- `await fetch(url, config)` sends the request and pauses until the server responds, storing the response in `res`.
- `await res.json()` reads the response body and parses it from JSON text into a JavaScript object (`data`). This is also asynchronous, so we `await` it too.
- The API returns an object shaped like `{ id, joke, status }`, so `data.joke` is the joke string. `jokeEl.innerHTML = data.joke` displays it.
- Note we don't `await`-guard against errors here (no `try/catch`, no "Loading…" text) — this project keeps it minimal. Real apps should add those; see the challenges.

**✅ Checkpoint**
Nothing happens yet — we defined the function but haven't called it. That's next.

---

### Step 9: Fetch on load and on button click

**🎯 Goal**
Show a joke immediately when the page opens, and fetch a new one each time the button is clicked.

**💡 Concept**
We pass `generateJoke` (no parentheses) to `addEventListener` so it runs *on each click*, and we also call `generateJoke()` once directly so a joke appears right away.

**📝 Code**

```js
// goes in script.js, ABOVE the generateJoke function definition
jokeBtn.addEventListener('click', generateJoke)

generateJoke()
```

**🔍 Explanation**

- `jokeBtn.addEventListener('click', generateJoke)` runs the function every time the button is clicked. We pass the function *reference* (`generateJoke`, not `generateJoke()`), so it's called on click rather than immediately.
- `generateJoke()` (with parentheses) calls it once on load for an initial joke.
- These lines sit **above** the function in the file, which works because JavaScript *hoists* function declarations — the whole `function generateJoke() {…}` is available throughout the file regardless of where it's written.

**✅ Checkpoint**
Refresh. A joke loads automatically, and clicking "Get Another Joke" swaps in a new one each time. Done!

---

## 5. Final Full Code (Reference)

> Note: `script.js` keeps a commented-out `.then()` version of the function at the bottom. It's an alternative way to consume the same Promise without `async`/`await` — kept here to match the source file and to show the two styles side by side.

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Dad Jokes</title>
  </head>
  <body>
    <div class="container">
      <h3>Don't Laugh Challenge</h3>
      <div id="joke" class="joke">// Joke goes here</div>
      <button id="jokeBtn" class="btn">Get Another Joke</button>
    </div>
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
  background-color: #686de0;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 20px;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);
  padding: 50px 20px;
  text-align: center;
  max-width: 100%;
  width: 800px;
}

h3 {
  margin: 0;
  opacity: 0.5;
  letter-spacing: 2px;
}

.joke {
  font-size: 30px;
  letter-spacing: 1px;
  line-height: 40px;
  margin: 50px auto;
  max-width: 600px;
}

.btn {
  background-color: #9f68e0;
  color: #fff;
  border: 0;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);
  padding: 14px 40px;
  font-size: 16px;
  cursor: pointer;
}

.btn:active {
  transform: scale(0.98);
}

.btn:focus {
  outline: 0;
}
```

```js
// script.js
const jokeEl = document.getElementById('joke')
const jokeBtn = document.getElementById('jokeBtn')

jokeBtn.addEventListener('click', generateJoke)

generateJoke()

// USING ASYNC/AWAIT
async function generateJoke() {
  const config = {
    headers: {
      Accept: 'application/json',
    },
  }

  const res = await fetch('https://icanhazdadjoke.com', config)

  const data = await res.json()

  jokeEl.innerHTML = data.joke
}

// USING .then()
// function generateJoke() {
//   const config = {
//     headers: {
//       Accept: 'application/json',
//     },
//   }

//   fetch('https://icanhazdadjoke.com', config)
//     .then((res) => res.json())
//     .then((data) => {
//       jokeEl.innerHTML = data.joke
//     })
// }
```

---

## 6. Recap & Next Steps

**What you learned**

- What a Promise is and why network calls return one
- Writing `async` functions and pausing with `await`
- Calling `fetch` with a config object to send an `Accept` header
- Parsing JSON with `res.json()` and displaying it
- Triggering code on load and on click, and how function hoisting lets you call before the definition
- Two ways to consume a Promise: `async/await` vs `.then()`

**Enhancement challenges**

1. **Add a loading state** — show "Loading…" in the joke area while the request is in flight.
2. **Handle errors** — wrap the fetch in `try/catch` and show a friendly message if it fails or you're offline.
3. **Prevent spam** — disable the button while a joke is loading, then re-enable it.
4. **Add a favorites list** — let the user save jokes they like to the page (or `localStorage`).
5. **Rewrite it with `.then()`** — swap in the commented version to practice the Promise-chaining style.
