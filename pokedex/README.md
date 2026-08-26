# Pokedex

## 1. Project Overview

This project builds a **Pokedex**: a grid of cards showing the first 150 Pokémon, each with its number, name, and sprite, color-coded by the Pokémon's primary type. All the data is pulled live from a free public API — you write **zero** Pokémon data by hand.

**Key concepts involved**
- Fetching data from a remote API over the network (`fetch`)
- Asynchronous JavaScript: **Promises**, `async`/`await`, and why order matters
- Building DOM elements dynamically from data (data-driven UI)
- Template literals for HTML strings
- A little string and array manipulation to format the data nicely

**HTML skills you'll gain**
- Setting up a minimal, valid HTML5 document
- Creating an empty "mount point" container that JavaScript fills in later

**CSS skills you'll gain**
- Importing a Google Font with `@import`
- Centering a page with Flexbox
- Building a responsive card grid with `flex-wrap`
- Styling cards with `border-radius`, `box-shadow`, and circular image frames

**JavaScript skills you'll gain**
- Calling a REST API with the `fetch` API
- Understanding `async`/`await` and awaiting a network response
- Converting a response to JSON
- Creating elements with `document.createElement` and filling them with `innerHTML`
- Formatting strings (capitalizing, zero-padding) and picking values from an object/array

---

## 2. Final Project Preview

**Layout & colors**
- A soft diagonal gradient background (light lilac fading to pale yellow).
- A centered heading that reads **Pokedex** with wide letter spacing.
- Below it, a centered, wrapping grid of rounded cards — as many per row as fit, then wrapping to the next line.
- Each card has a pastel background whose color is chosen from the Pokémon's type (fire = pink, grass = green, water = blue, and so on).
- Inside every card: a white circular frame holding the Pokémon sprite, a small pill showing the padded number (e.g. `#001`), the capitalized name, and the type.

**Behavior & interactions**
- When the page loads, the app automatically requests Pokémon **1 through 150** from the API and adds a card for each as its data arrives.
- Because the requests run one after another, cards appear in numerical order, streaming in top-to-bottom.

**What the user can interact with**
- Nothing clickable — this is a **display/read-only** project. The "interaction" is with the network: the page fetches and renders data on load. (See the challenges at the end for adding search or clicks.)

---

## 3. Prerequisites

**Basic knowledge required**
- HTML tags and attributes.
- CSS selectors and the basics of Flexbox.
- JavaScript variables, functions, arrays, objects, and loops. Async code is **taught here**, so no prior experience with it is needed.

**Tools needed**
- A modern web browser (Chrome, Firefox, Edge).
- A text editor (VS Code recommended).
- **An internet connection** — this project talks to a live API and loads images from the web.
- Optional but recommended: the **Live Server** VS Code extension. Opening the file over `http://` (rather than `file://`) avoids occasional browser restrictions on network requests.

**Files to create**

```
pokedex/
├── index.html
├── style.css
└── script.js
```

Create all three now, empty. We'll fill them in step by step.

---

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML skeleton

**🎯 Goal**
Get a valid, empty HTML page that the browser can load, with the correct title and character settings.

**💡 Concept**
Every project starts from the standard HTML5 boilerplate. The `<meta charset>` and `<meta viewport>` tags make text and mobile scaling behave correctly.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pokedex</title>
  </head>
  <body></body>
</html>
```

**🔍 Explanation**
- `<!DOCTYPE html>` tells the browser to use modern HTML rules.
- `lang="en"` declares the page language (good for accessibility).
- The `<meta>` tags set text encoding and make the layout scale on phones.
- `<title>` is the text shown on the browser tab.

**✅ Checkpoint**
Open `index.html` in your browser. You'll see a blank page with **Pokedex** on the tab. No errors.

---

### Step 2: Link the stylesheet and the script

**🎯 Goal**
Connect our (still empty) CSS and JS files so we can build on them.

**💡 Concept**
CSS is linked in the `<head>` so styles are ready before content paints. The script goes at the **end of `<body>`** so the HTML exists before JavaScript runs.

**📝 Code**

```html
<!-- goes in index.html: add inside <head>, after the viewport meta -->
<link rel="stylesheet" href="style.css" />
```

```html
<!-- goes in index.html: add just before the closing </body> tag -->
<script src="script.js"></script>
```

**🔍 Explanation**
- `<link rel="stylesheet" href="style.css" />` loads our styles.
- Placing `<script src="script.js">` at the bottom means all the HTML above it already exists in the DOM when the script executes — so `document.getElementById(...)` will find our elements.

**✅ Checkpoint**
Still a blank page, but the files are now wired together. No 404 errors in the browser's DevTools **Console** or **Network** tab.

---

### Step 3: Add the heading and the container

**🎯 Goal**
Add the visible title and the empty box that JavaScript will fill with cards.

**💡 Concept**
A **mount point** is an empty element (here a `<div>` with an `id`) that starts out blank; your script grabs it by `id` and injects content into it. This keeps HTML clean and lets data drive the UI.

**📝 Code**

```html
<!-- goes in index.html: inside <body>, above the <script> tag -->
<h1>Pokedex</h1>
<div class="poke-container" id="poke-container"></div>
```

**🔍 Explanation**
- `<h1>Pokedex</h1>` is the page heading.
- `<div class="poke-container" id="poke-container">` is intentionally empty. The `class` is for styling; the `id` is the unique hook JavaScript will use to find and fill it.

**✅ Checkpoint**
You should now see the word **Pokedex** in the top-left of the page. The container below it is invisible because it's empty and has no styles yet.

---

### Step 4: Import the font and add a base reset

**🎯 Goal**
Load the Lato font and make box sizing predictable across all elements.

**💡 Concept**
`@import` pulls in a hosted Google Font. `box-sizing: border-box` makes an element's declared width/height *include* its padding and border — far more intuitive when sizing boxes.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css?family=Lato:300,400&display=swap');

* {
  box-sizing: border-box;
}
```

**🔍 Explanation**
- `@import url(...)` must be the **first** rule in the file; it downloads the Lato font.
- The `*` selector targets every element and applies `box-sizing: border-box` globally.

**✅ Checkpoint**
Nothing visibly changes yet (we haven't applied the font). No errors — that's the goal for this step.

---

### Step 5: Style the body and center everything

**🎯 Goal**
Give the page its gradient background, apply the font, and center the content.

**💡 Concept**
Making `body` a **flex container** with a `column` direction lets us stack the heading and grid vertically and center them horizontally in one place.

**📝 Code**

```css
/* goes in style.css */
body {
  background: #efefbb;
  background: linear-gradient(to right, #d4d3dd, #efefbb);
  font-family: 'Lato', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
}

h1 {
  letter-spacing: 3px;
}
```

**🔍 Explanation**
- The first `background` is a solid fallback; the second overrides it with a left-to-right gradient (used if gradients are supported).
- `font-family: 'Lato'` applies the imported font, falling back to any `sans-serif`.
- `display: flex` + `flex-direction: column` stacks children top-to-bottom; `align-items: center` centers them horizontally.
- `margin: 0` removes the browser's default body margin so the gradient reaches the edges.
- `letter-spacing: 3px` spreads out the heading letters for a cleaner look.

**✅ Checkpoint**
The page now has a gradient background and the **Pokedex** heading is centered near the top, in the Lato font.

---

### Step 6: Style the card container as a wrapping grid

**🎯 Goal**
Turn the empty container into a centered row that wraps cards onto new lines as needed.

**💡 Concept**
`display: flex` + `flex-wrap: wrap` is the classic recipe for a responsive card grid: items sit side by side and automatically flow to the next row when they run out of space.

**📝 Code**

```css
/* goes in style.css */
.poke-container {
  display: flex;
  flex-wrap: wrap;
  align-items: space-between;
  justify-content: center;
  margin: 0 auto;
  max-width: 1200px;
}
```

**🔍 Explanation**
- `flex-wrap: wrap` lets cards drop to the next line instead of overflowing.
- `justify-content: center` centers the cards within each row.
- `max-width: 1200px` with `margin: 0 auto` keeps the grid from stretching too wide and centers it.
- (`align-items: space-between` isn't a valid value for `align-items`, so the browser ignores it — this is copied faithfully from the source and simply has no effect.)

**✅ Checkpoint**
No visible change yet — the container is still empty. We're pre-styling it so cards look right the moment JavaScript adds them.

---

### Step 7: Style a single Pokémon card

**🎯 Goal**
Design the card shell: rounded corners, padding, a shadow, and centered text.

**💡 Concept**
We style a `.pokemon` class now even though no `.pokemon` elements exist yet. When our script later creates `<div class="pokemon">` elements, they'll instantly pick up these styles.

**📝 Code**

```css
/* goes in style.css */
.pokemon {
  background-color: #eee;
  border-radius: 10px;
  box-shadow: 0 3px 15px rgba(100, 100, 100, 0.5);
  margin: 10px;
  padding: 20px;
  text-align: center;
}
```

**🔍 Explanation**
- `background-color: #eee` is a default; JavaScript will later override it with a type color.
- `border-radius` rounds the corners; `box-shadow` lifts the card off the page.
- `margin: 10px` spaces cards apart; `padding: 20px` gives breathing room inside; `text-align: center` centers the card's content.

**✅ Checkpoint**
Still nothing on screen (no cards exist yet). Save and continue — we'll see it all come together after the JS.

---

### Step 8: Style the image circle and info text

**🎯 Goal**
Create the circular white frame for the sprite and style the number pill and name.

**💡 Concept**
A perfect circle is just a square (equal width/height) with `border-radius: 50%`. Descendant selectors like `.pokemon .info .number` style elements nested inside a card.

**📝 Code**

```css
/* goes in style.css */
.pokemon .img-container {
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  width: 120px;
  height: 120px;
  text-align: center;
}

.pokemon .img-container img {
  max-width: 90%;
  margin-top: 20px;
}

.pokemon .info {
  margin-top: 20px;
}

.pokemon .info .number {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 0.8em;
}

.pokemon .info .name {
  margin: 15px 0 7px;
  letter-spacing: 1px;
}
```

**🔍 Explanation**
- `.img-container` is a 120×120 semi-transparent white square turned into a circle with `border-radius: 50%`.
- The sprite inside is capped at `90%` width and nudged down with `margin-top` so it sits nicely in the circle.
- `.number` becomes a small rounded "pill" with a faint dark background.
- `.name` gets vertical spacing and slight letter spacing.

**✅ Checkpoint**
Your `style.css` is complete. The page still shows only the heading — time to bring in the data with JavaScript.

---

### Step 9: Grab the container and set up constants

**🎯 Goal**
Get a reference to the container element and define the data we'll need: how many Pokémon to load and the type-to-color map.

**💡 Concept**
Store values you reuse in named constants at the top. The `colors` object maps a Pokémon **type** (like `fire`) to a pastel hex color; `Object.keys(colors)` gives us an array of just the type names.

**📝 Code**

```js
// goes in script.js
const poke_container = document.getElementById('poke-container')
const pokemon_count = 150
const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
}

const main_types = Object.keys(colors)
```

**🔍 Explanation**
- `document.getElementById('poke-container')` finds our empty `<div>` so we can append cards to it later.
- `pokemon_count = 150` is how many Pokémon we'll request.
- `colors` is a lookup table: given a type name, we get its background color.
- `Object.keys(colors)` returns `['fire', 'grass', 'electric', ...]` — the list of types we recognize. We'll use it to pick a card's color.

**✅ Checkpoint**
Open DevTools → Console. Type `main_types` and press Enter; you should see the array of type names. No errors.

---

### Step 10: Understand async, then write the fetch loop

**🎯 Goal**
Create the function that requests Pokémon 1 through 150, one after another.

**💡 Concept — this is the heart of the project, so read carefully**
- A network request takes time, and JavaScript doesn't wait around by default. A **Promise** is an object representing a value that will exist *later* (once the request finishes).
- Marking a function `async` lets us use `await` inside it. `await` **pauses that function** until the Promise settles, then gives us the result — letting us write asynchronous code that reads top-to-bottom like normal code.
- Here we `await getPokemon(i)` inside a loop, so each Pokémon is fully fetched and rendered **before** the next request starts. That's why cards appear in order (it's also why the full list takes a moment to finish loading — this is the "loading" behavior of the app).

> **API note:** This app uses the free [PokeAPI](https://pokeapi.co), which needs **no API key**. But remember: any API key you put in front-end JavaScript is downloaded to the user's browser and is **publicly visible**. Never embed secret keys in client-side code — use APIs that are safe to call publicly, or route secret calls through your own backend.

**📝 Code**

```js
// goes in script.js
const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i)
  }
}
```

**🔍 Explanation**
- `async () => { ... }` defines an asynchronous arrow function.
- The `for` loop counts `i` from 1 to 150 (Pokémon IDs start at 1).
- `await getPokemon(i)` waits for each Pokémon to finish loading before continuing to the next number. (`getPokemon` doesn't exist yet — we write it next.)

**✅ Checkpoint**
No visible change yet, and calling it now would error because `getPokemon` is undefined. Save and move to the next step.

---

### Step 11: Fetch one Pokémon from the API

**🎯 Goal**
Write `getPokemon`, which downloads a single Pokémon's data and hands it off to be rendered.

**💡 Concept**
`fetch(url)` returns a Promise for a **Response** object. The response body isn't JSON yet — calling `res.json()` (which also returns a Promise) parses it into a usable JavaScript object.

**📝 Code**

```js
// goes in script.js
const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const res = await fetch(url)
  const data = await res.json()
  createPokemonCard(data)
}
```

**🔍 Explanation**
- The `url` is built with a **template literal** so the `${id}` is inserted into the API endpoint.
- `await fetch(url)` waits for the server to respond.
- `await res.json()` waits for the response body to be parsed into an object (`data`).
- `createPokemonCard(data)` (written next) turns that data into a card on the page.

**✅ Checkpoint**
Still no cards, since `createPokemonCard` doesn't exist yet. If you're curious, temporarily add `console.log(data)` before the `createPokemonCard` line and call `getPokemon(1)` from the console — you'll see Bulbasaur's raw data object. Remove the log before continuing.

---

### Step 12: Start building the card and format name & number

**🎯 Goal**
Create the card element and prepare a nicely formatted name and ID.

**💡 Concept**
`document.createElement` builds a new element in memory (not yet on the page). We also clean up the raw data: capitalize the name and zero-pad the number so `1` becomes `001`.

**📝 Code**

```js
// goes in script.js
const createPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement('div')
  pokemonEl.classList.add('pokemon')

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
  const id = pokemon.id.toString().padStart(3, '0')
}
```

**🔍 Explanation**
- `document.createElement('div')` creates a fresh `<div>`; `classList.add('pokemon')` gives it the class we styled earlier.
- `pokemon.name[0].toUpperCase() + pokemon.name.slice(1)` capitalizes the first letter (`bulbasaur` → `Bulbasaur`).
- `pokemon.id.toString().padStart(3, '0')` turns the number into a 3-character string, padding with zeros (`1` → `"001"`).

**✅ Checkpoint**
No visible change — we're building the card in memory. We'll attach it to the page in Step 14.

---

### Step 13: Pick the type and matching color

**🎯 Goal**
Determine the Pokémon's primary type and set the card's background color from our `colors` map.

**💡 Concept**
A Pokémon can have several types. We map its types to a simple array of names, then use `Array.find` to grab the **first** type that exists in our known `main_types` list, and look up its color.

**📝 Code**

```js
// goes in script.js: add inside createPokemonCard, below the id line
  const poke_types = pokemon.types.map(type => type.type.name)
  const type = main_types.find(type => poke_types.indexOf(type) > -1)
  const color = colors[type]

  pokemonEl.style.backgroundColor = color
```

**🔍 Explanation**
- `pokemon.types` is an array of objects; `.map(type => type.type.name)` flattens it to just the names, e.g. `['grass', 'poison']`.
- `main_types.find(...)` returns the first type from our ordered list that the Pokémon actually has (`indexOf(type) > -1` means "this type is present").
- `colors[type]` looks up the pastel color for that type.
- `pokemonEl.style.backgroundColor = color` applies it inline, overriding the default `#eee` from our CSS.

**✅ Checkpoint**
Still nothing on screen — one more step to insert content and attach the card.

---

### Step 14: Fill the card with HTML and add it to the page

**🎯 Goal**
Build the card's inner markup from the data and append the finished card to the container.

**💡 Concept**
A template literal (backticks) lets us write a multi-line HTML string with `${}` placeholders. Setting `innerHTML` renders it inside the card, and `appendChild` puts the card into the live page.

**📝 Code**

```js
// goes in script.js: add inside createPokemonCard, below the backgroundColor line
  const pokemonInnerHTML = `
  <div class="img-container">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt="${name}">
  </div>
  <div class="info">
      <span class="number">#${id}</span>
      <h3 class="name">${name}</h3>
      <small class="type">Type: <span>${type}</span> </small>
  </div>
  `

  pokemonEl.innerHTML = pokemonInnerHTML

  poke_container.appendChild(pokemonEl)
}
```

**🔍 Explanation**
- The sprite image URL is built from `${pokemon.id}` — the PokeAPI sprites repo hosts a PNG per Pokémon ID.
- The `.number`, `.name`, and `.type` elements match the CSS classes we styled in Step 8.
- `pokemonEl.innerHTML = pokemonInnerHTML` renders the string as real elements inside the card.
- `poke_container.appendChild(pokemonEl)` attaches the completed card to our container in the DOM — this is the moment it becomes visible.
- *(Small note: the source has a stray double-quote right after `.png"` — `...${pokemon.id}.png""`. Browsers ignore the extra empty attribute, so it's harmless; you can leave it to match the original or delete one quote.)*

**✅ Checkpoint**
Nothing renders **yet** because we never call `fetchPokemons()`. That's the final step.

---

### Step 15: Kick off the app

**🎯 Goal**
Actually start fetching and rendering the Pokémon when the script runs.

**💡 Concept**
Defining functions doesn't run them. We call `fetchPokemons()` once at the bottom so everything happens automatically on page load.

**📝 Code**

```js
// goes in script.js: the very last line
fetchPokemons()
```

**🔍 Explanation**
- This single call starts the loop, which awaits each `getPokemon`, which fetches data and builds a card. Cards stream in from #001 upward.

**✅ Checkpoint**
Reload the page (ideally via Live Server). Within a moment you'll see a grid of 150 color-coded Pokémon cards fill in, each with its number, name, sprite, and type. 🎉 Check the Console for any red errors and the Network tab to watch the requests fire.

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
    <title>Pokedex</title>
  </head>
  <body>
    <h1>Pokedex</h1>
    <div class="poke-container" id="poke-container"></div>

    <!-- Design inspired by this Dribbble shot: https://dribbble.com/shots/5611109--Pokemon -->
    <script src="script.js"></script>
  </body>
</html>
```

### `style.css`

```css
@import url('https://fonts.googleapis.com/css?family=Lato:300,400&display=swap');

* {
  box-sizing: border-box;
}

body {
  background: #efefbb;
  background: linear-gradient(to right, #d4d3dd, #efefbb);
  font-family: 'Lato', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
}

h1 {
  letter-spacing: 3px;
}

.poke-container {
  display: flex;
  flex-wrap: wrap;
  align-items: space-between;
  justify-content: center;
  margin: 0 auto;
  max-width: 1200px;
}

.pokemon {
  background-color: #eee;
  border-radius: 10px;
  box-shadow: 0 3px 15px rgba(100, 100, 100, 0.5);
  margin: 10px;
  padding: 20px;
  text-align: center;
}

.pokemon .img-container {
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  width: 120px;
  height: 120px;
  text-align: center;
}

.pokemon .img-container img {
  max-width: 90%;
  margin-top: 20px;
}

.pokemon .info {
  margin-top: 20px;
}

.pokemon .info .number {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 0.8em;
}

.pokemon .info .name {
  margin: 15px 0 7px;
  letter-spacing: 1px;
}
```

### `script.js`

```js
const poke_container = document.getElementById('poke-container')
const pokemon_count = 150
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

const main_types = Object.keys(colors)

const fetchPokemons = async () => {
    for(let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i)
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    createPokemonCard(data)
}

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    const id = pokemon.id.toString().padStart(3, '0')

    const poke_types = pokemon.types.map(type => type.type.name)
    const type = main_types.find(type => poke_types.indexOf(type) > -1)
    const color = colors[type]

    pokemonEl.style.backgroundColor = color

    const pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt="${name}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span> </small>
    </div>
    `

    pokemonEl.innerHTML = pokemonInnerHTML

    poke_container.appendChild(pokemonEl)
}

fetchPokemons()
```

---

## 6. Recap & Next Steps

**What you learned**
- How to call a live REST API with `fetch` and parse the response with `res.json()`.
- The core of asynchronous JavaScript: **Promises**, `async`/`await`, and how `await` inside a loop sequences your requests.
- Why API keys must never live in front-end code (they're publicly visible).
- Building UI from data: `createElement`, `classList`, template literals, `innerHTML`, and `appendChild`.
- Handy formatting tricks: capitalizing a string and zero-padding with `padStart`.

**Enhancement challenges**
1. **Speed it up:** Replace the sequential loop with `Promise.all(...)` so all 150 requests run in parallel. Notice how much faster (and how the order can change).
2. **Loading & error states:** Show a "Loading…" message while fetching, and wrap `fetch` in `try/catch` to display a friendly error if the network fails.
3. **Search / filter:** Add an input box that filters the visible cards by name as you type.
4. **Click for details:** Make each card clickable to fetch and show more data (height, weight, abilities) in a modal.
5. **Configurable count:** Let the user choose how many Pokémon to load (e.g. 50, 150, 386) via a dropdown, and re-render.
