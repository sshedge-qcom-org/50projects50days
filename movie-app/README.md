# Movie App

A code-along tutorial that rebuilds this project from three empty files, one small step at a time.

## 1. Project Overview

The Movie App fetches popular movies from a live online movie database (TMDB) and displays them as a responsive grid of poster cards. You can also type a search term to look up any movie by name.

**Key concepts involved**

- Talking to an external web **API** over the network
- **Asynchronous JavaScript**: Promises, `async`/`await`, and the `fetch` API
- Building DOM elements dynamically from data
- Handling form submission and events

**HTML skills you'll gain**

- Structuring a page with `<header>`, `<form>`, and a `<main>` content region
- Wiring an input into a form and giving elements `id`s for JavaScript to find

**CSS skills you'll gain**

- Using **CSS custom properties** (variables) for a consistent color theme
- Building a responsive card grid with Flexbox and `flex-wrap`
- Creating a slide-up "overview" panel with `position: absolute`, `transform`, and `transition`
- Styling inputs (placeholder color, removing the focus outline)

**JavaScript skills you'll gain**

- Fetching JSON data with `fetch` and `await`
- Writing and calling `async` functions
- **Destructuring** properties out of objects
- Generating HTML with **template literals** and injecting it with `innerHTML`
- Conditionally choosing a CSS class based on data
- Preventing a form's default submit/reload behavior

## 2. Final Project Preview

**Layout & colors**

- A dark navy page (`#22254b`) with a slightly lighter header bar (`#373b69`).
- A rounded, pill-shaped search box sits in the top-right of the header.
- Below the header, movie cards flow into a centered, wrapping grid. Each card shows a poster image, the title, and a rating badge.
- Rating badges are color-coded: green for great ratings (8+), orange for decent (5–7.9), red for low (under 5).

**Behavior & interactions**

- On page load, the app automatically fetches and shows the most popular movies.
- Hovering a movie card slides a white **Overview** panel up from the bottom, covering the poster with the movie's synopsis.
- Typing a title and pressing **Enter** searches for that movie and replaces the grid with the results.
- Submitting an empty search reloads the page (returning to the popular list).

**What you can interact with**

- The search input (type + press Enter to submit the form).
- Hovering any movie card to reveal its overview.

## 3. Prerequisites

**Basic knowledge required**

- Comfortable with basic HTML tags, CSS rules, and JavaScript syntax (variables, functions, `if`/`else`).
- You do **not** need prior experience with APIs or async code — we'll introduce those gently.

**Tools needed**

- A modern web browser (Chrome, Firefox, Edge…).
- A text editor (VS Code recommended).
- An internet connection (this app calls a live API and loads remote images).
- Optional but recommended: the **Live Server** VS Code extension, so the page reloads as you edit.

**Files to create**

```
movie-app/
├── index.html
├── style.css
└── script.js
```

Create all three now, empty. We'll fill them in order.

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML skeleton

**🎯 Goal**
Lay down a valid HTML5 document and link the (still empty) stylesheet so styling shows up the moment we write it.

**💡 Concept**
Every project starts with the standard HTML5 boilerplate: a doctype, a `<head>` for metadata/links, and a `<body>` for visible content.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Movie App</title>
  </head>
  <body>
  </body>
</html>
```

**🔍 Explanation**

- `<!DOCTYPE html>` tells the browser to use modern HTML rules.
- The `viewport` meta tag makes the page scale correctly on phones.
- `<link rel="stylesheet" href="style.css" />` connects our CSS file (relative to this HTML file).
- `<title>` sets the browser tab text.

**✅ Checkpoint**
Open `index.html` in your browser. You'll see a blank page with the tab titled "Movie App". No errors — good foundation.

---

### Step 2: Add the search header

**🎯 Goal**
Give users a place to type a movie name.

**💡 Concept**
A search box that submits on Enter belongs inside a `<form>`. Wrapping the input in a form means the browser fires a **submit** event we can later listen for.

**📝 Code**

```html
<!-- goes in index.html (inside <body>) -->
<header>
  <form id="form">
    <input type="text" id="search" class="search" placeholder="Search">
  </form>
</header>
```

**🔍 Explanation**

- The `<header>` is a semantic banner region for the top of the page.
- `id="form"` and `id="search"` give JavaScript precise handles to grab later.
- `placeholder="Search"` shows faint hint text until the user types.

**✅ Checkpoint**
Reload. You'll see an unstyled text box near the top of the page.

---

### Step 3: Add the movie container and script

**🎯 Goal**
Create the empty region where movie cards will be inserted, and load our JavaScript.

**💡 Concept**
We leave `<main>` **empty** on purpose — JavaScript will fill it with cards at runtime. The `<script>` goes at the end of `<body>` so the HTML above it already exists when the script runs.

**📝 Code**

```html
<!-- goes in index.html (after </header>) -->
<main id="main"></main>

<script src="script.js"></script>
```

**🔍 Explanation**

- `<main id="main">` is our injection point; `id="main"` lets JS find it.
- Placing `<script>` last is a classic pattern: it guarantees the elements exist before the script tries to access them.

**✅ Checkpoint**
Reload. Still mostly blank (the `<main>` is empty), but the HTML structure is now complete.

---

### Step 4: Import the font, set variables, and reset

**🎯 Goal**
Establish the app's font and its two theme colors as reusable variables.

**💡 Concept**
**CSS custom properties** (variables) declared on `:root` can be reused everywhere with `var(...)`. Change one value and the whole theme updates. `box-sizing: border-box` makes width/height include padding and border — far more predictable to size things.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap');

:root {
  --primary-color: #22254b;
  --secondary-color: #373b69;
}

* {
  box-sizing: border-box;
}

body {
  background-color: var(--primary-color);
  font-family: 'Poppins', sans-serif;
  margin: 0;
}
```

**🔍 Explanation**

- `@import url(...)` pulls in the Poppins font from Google Fonts (must be the first line in the file).
- `--primary-color` / `--secondary-color` are our two brand navies.
- `* { box-sizing: border-box; }` applies the friendlier box model to every element.
- `body` gets the dark background, the Poppins font, and `margin: 0` to remove the browser's default page gap.

**✅ Checkpoint**
Reload. The page background turns dark navy and the search text uses the Poppins font.

---

### Step 5: Style the header and search box

**🎯 Goal**
Turn the plain input into the rounded pill in the top-right corner.

**💡 Concept**
Flexbox with `justify-content: flex-end` pushes the search box to the right. We also override the browser's default input look (border, focus outline, placeholder color).

**📝 Code**

```css
/* goes in style.css */
header {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  background-color: var(--secondary-color);
}

.search {
  background-color: transparent;
  border: 2px solid var(--primary-color);
  border-radius: 50px;
  font-family: inherit;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
}

.search::placeholder {
  color: #7378c5;
}

.search:focus {
  outline: none;
  background-color: var(--primary-color);
}
```

**🔍 Explanation**

- `display: flex; justify-content: flex-end` right-aligns the form inside the header bar.
- `border-radius: 50px` gives the pill shape; `font-family: inherit` makes the input use Poppins too.
- `::placeholder` recolors the hint text; `:focus` removes the default glow outline and darkens the box when clicked into.

**✅ Checkpoint**
Reload. The header is a lighter navy bar with a rounded, white-text search box on the right that darkens when focused.

---

### Step 6: Lay out the movie grid

**🎯 Goal**
Make future movie cards flow into a centered grid that wraps to new rows.

**💡 Concept**
`display: flex` with `flex-wrap: wrap` lets items sit side by side and wrap onto the next line when they run out of room — a simple responsive grid.

**📝 Code**

```css
/* goes in style.css */
main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
```

**🔍 Explanation**

- `flex-wrap: wrap` allows cards to move to a new row instead of overflowing.
- `justify-content: center` centers the whole set of cards horizontally.

**✅ Checkpoint**
No visible change yet (there are no cards), but the layout container is ready.

---

### Step 7: Style the movie card

**🎯 Goal**
Design the card box that holds each poster.

**💡 Concept**
`position: relative` + `overflow: hidden` on the card is essential setup: it lets us later position the overview panel **inside** the card and hide it when it slides below the bottom edge.

**📝 Code**

```css
/* goes in style.css */
.movie {
  width: 300px;
  margin: 1rem;
  background-color: var(--secondary-color);
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  border-radius: 3px;
}

.movie img {
  width: 100%;
}
```

**🔍 Explanation**

- Fixed `width: 300px` keeps all cards uniform; `margin: 1rem` spaces them apart.
- `box-shadow` lifts the card off the background.
- `position: relative` makes this card the reference point for the absolutely-positioned overview later; `overflow: hidden` clips anything spilling outside.
- `.movie img { width: 100% }` makes the poster fill the card width.

**✅ Checkpoint**
Still no cards on screen — these rules will apply once JavaScript creates `.movie` elements.

---

### Step 8: Style the info row and rating badge

**🎯 Goal**
Style the strip under the poster that holds the title and the color-coded rating.

**💡 Concept**
Flexbox with `justify-content: space-between` pushes the title to the left and the rating to the right. Three helper classes (`green`, `orange`, `red`) will color the rating based on its value.

**📝 Code**

```css
/* goes in style.css */
.movie-info {
  color: #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap:0.2rem;
  padding: 0.5rem 1rem 1rem;
  letter-spacing: 0.5px;
}

.movie-info h3 {
  margin-top: 0;
}

.movie-info span {
  background-color: var(--primary-color);
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-weight: bold;
}

.movie-info span.green {
  color: lightgreen;
}

.movie-info span.orange {
  color: orange;
}

.movie-info span.red {
  color: red;
}
```

**🔍 Explanation**

- `.movie-info` is a flex row: title on the left, rating badge on the right.
- The `span` is the rating pill; the `.green` / `.orange` / `.red` modifier classes only change its text color. JavaScript will add exactly one of them per movie.

**✅ Checkpoint**
No change yet — these classes wait for JS-generated markup.

---

### Step 9: Build the slide-up overview panel

**🎯 Goal**
Create the hidden synopsis panel that reveals on hover.

**💡 Concept**
The panel is placed with `position: absolute` inside the card, then pushed just out of view with `transform: translateY(101%)`. On hover we translate it back to `0`, and a `transition` animates the slide.

**📝 Code**

```css
/* goes in style.css */
.overview {
  background-color: #fff;
  padding: 2rem;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  max-height: 100%;
  transform: translateY(101%);
  overflow-y: auto;
  transition: transform 0.3s ease-in;
}

.movie:hover .overview {
  transform: translateY(0);
}
```

**🔍 Explanation**

- `position: absolute` with `left/right/bottom: 0` pins the panel to the bottom of the card (its `position: relative` parent).
- `translateY(101%)` moves it fully below the card's bottom edge — hidden thanks to the card's `overflow: hidden`.
- `.movie:hover .overview` slides it back to `translateY(0)` on hover; `transition` makes that motion smooth over 0.3s.

**✅ Checkpoint**
The CSS is complete. There's still nothing on screen because no cards exist yet — time for JavaScript.

---

### Step 10: Set up API constants and grab DOM elements

**🎯 Goal**
Define the API URLs the app will call, and get references to the elements JS will control.

**💡 Concept**
An **API** (Application Programming Interface) is a URL you can request to get back data — here, JSON describing movies. We store the endpoints in constants so they're easy to reuse.

> ⚠️ **Security gotcha:** the API key below is written directly into front-end JavaScript, which means **anyone who opens your site can read it** in the browser's dev tools. That's fine for a learning project, but real apps keep secret keys on a server, never in client-side code.

**📝 Code**

```js
// goes in script.js
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
```

**🔍 Explanation**

- `API_URL` returns the most popular movies. `SEARCH_API` looks up movies by name (we'll append the search term to it).
- `IMG_PATH` is the base URL for poster images; each movie only gives us the file part, so we prefix it with this.
- `getElementById` grabs the three elements (`main`, `form`, `search`) by the `id`s we set in the HTML.

**✅ Checkpoint**
Reload and open the console (F12). No errors means the elements were found and the script loaded.

---

### Step 11: Fetch the initial movies

**🎯 Goal**
Kick off a request for popular movies as soon as the page loads.

**💡 Concept**
Function **declarations are hoisted** — the browser reads them before running the file — so we can call `getMovies` here even though we define it in the very next step.

**📝 Code**

```js
// goes in script.js
// Get initial movies
getMovies(API_URL)
```

**🔍 Explanation**

- This single line starts the whole app: request the popular-movies URL and (once defined) render whatever comes back.

**✅ Checkpoint**
The console will briefly show an error like "getMovies is not defined" — that's expected until we write the function in the next step. (If your file already includes Step 12's code, you'll see no error.)

---

### Step 12: Write the async fetch function

**🎯 Goal**
Request data from the API and hand the results off to be displayed.

**💡 Concept**
Network requests take time, and JavaScript must not freeze while waiting. A `fetch` call returns a **Promise** — a placeholder for a value that will arrive *later*. Marking a function `async` lets us use `await`, which pauses **only that function** until the Promise resolves, so the code reads top-to-bottom like normal.

**📝 Code**

```js
// goes in script.js
async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}
```

**🔍 Explanation**

- `await fetch(url)` sends the request and waits for the raw response (`res`).
- `await res.json()` waits again while the response body is parsed into a JavaScript object (`data`).
- TMDB returns an object whose `results` property is the array of movies, which we pass to `showMovies` (written next).

> 💡 **Real-world note:** this function has no *loading* indicator or *error handling*. In production you'd typically show a spinner while awaiting, and wrap the calls in `try/catch` to handle a failed network request. We're matching the original project, which keeps it minimal.

**✅ Checkpoint**
Still blank because `showMovies` doesn't exist yet — one more step.

---

### Step 13: Render the movie cards

**🎯 Goal**
Turn the array of movie data into `.movie` card elements on the page.

**💡 Concept**
**Destructuring** pulls fields straight out of each movie object. A **template literal** (backtick string) lets us build multi-line HTML with `${...}` placeholders, which we drop into the DOM via `innerHTML`.

**📝 Code**

```js
// goes in script.js
function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `
        main.appendChild(movieEl)
    })
}
```

**🔍 Explanation**

- `main.innerHTML = ''` clears any existing cards first (important when we re-run this after a search).
- `const { title, poster_path, vote_average, overview } = movie` grabs the four fields we need in one line.
- We create a `<div class="movie">`, fill it with a template literal that stitches together the poster, title, color-coded rating, and overview, then `appendChild` it into `<main>`.
- `${IMG_PATH + poster_path}` builds the full image URL; `getClassByRate(...)` (next step) decides the rating color.

**✅ Checkpoint**
Reload. A grid of popular movie posters appears. Hover a card and the white **Overview** panel slides up. The rating badges have no color yet.

---

### Step 14: Color the rating badge

**🎯 Goal**
Return the right class name (`green`/`orange`/`red`) for a given rating.

**💡 Concept**
A small helper function keeps the rendering code clean and puts the "which color?" decision in one place.

**📝 Code**

```js
// goes in script.js
function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}
```

**🔍 Explanation**

- Ratings of 8 and above → `green`, 5–7.9 → `orange`, anything lower → `red`.
- The returned string becomes the `span`'s class in Step 13, matching the CSS color rules from Step 8.

**✅ Checkpoint**
Reload. Rating badges are now colored by score: green for the best, orange for mid, red for low.

---

### Step 15: Handle search submissions

**🎯 Goal**
Let users search for a movie by typing and pressing Enter.

**💡 Concept**
Submitting a form normally reloads the page. We call `e.preventDefault()` to stop that, then run our own logic — a fetch when there's a term, or a deliberate reload when the box is empty.

**📝 Code**

```js
// goes in script.js
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})
```

**🔍 Explanation**

- `e.preventDefault()` blocks the browser's default form submit/reload.
- `search.value` is whatever the user typed.
- If there's a term, we fetch `SEARCH_API + searchTerm` and clear the box (`search.value = ''`).
- If the box is empty, `window.location.reload()` refreshes back to the popular list.

> 🐛 **Spot the quirk:** `SEARCH_API` ends with a stray `"` (`...&query="`). Appending "batman" produces `query="batman`, so the leading quote rides along with your search term. It usually still returns results, but removing that quote is a great first improvement (see the challenges below).

**✅ Checkpoint**
Reload. Type a movie name and press Enter — the grid updates with search results. Submit an empty box and the page reloads to the popular list. The app is complete!

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
    <title>Movie App</title>
  </head>
  <body>
    <header>
      <form id="form">
        <input type="text" id="search" class="search" placeholder="Search">
      </form>
    </header>

    <main id="main"></main>

    <script src="script.js"></script>
  </body>
</html>
```

### `style.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap');

:root {
  --primary-color: #22254b;
  --secondary-color: #373b69;
}

* {
  box-sizing: border-box;
}

body {
  background-color: var(--primary-color);
  font-family: 'Poppins', sans-serif;
  margin: 0;
}

header {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  background-color: var(--secondary-color);
}

.search {
  background-color: transparent;
  border: 2px solid var(--primary-color);
  border-radius: 50px;
  font-family: inherit;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
}

.search::placeholder {
  color: #7378c5;
}

.search:focus {
  outline: none;
  background-color: var(--primary-color);
}

main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.movie {
  width: 300px;
  margin: 1rem;
  background-color: var(--secondary-color);
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  border-radius: 3px;
}

.movie img {
  width: 100%;
}

.movie-info {
  color: #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap:0.2rem;
  padding: 0.5rem 1rem 1rem;
  letter-spacing: 0.5px;
}

.movie-info h3 {
  margin-top: 0;
}

.movie-info span {
  background-color: var(--primary-color);
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-weight: bold;
}

.movie-info span.green {
  color: lightgreen;
}

.movie-info span.orange {
  color: orange;
}

.movie-info span.red {
  color: red;
}

.overview {
  background-color: #fff;
  padding: 2rem;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  max-height: 100%;
  transform: translateY(101%);
  overflow-y: auto;
  transition: transform 0.3s ease-in;
}

.movie:hover .overview {
  transform: translateY(0);
}
```

### `script.js`

```js
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Get initial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `
        main.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})
```

## 6. Recap & Next Steps

**What you learned**

- How to call an external REST API with `fetch` and handle its Promise using `async`/`await`.
- Why secret keys don't belong in front-end code.
- Destructuring object properties and building HTML with template literals.
- Rendering a list of data into DOM cards and re-rendering after a search.
- Preventing a form's default submit behavior to run custom logic.
- Building a hover-reveal panel with `position: absolute` + `transform` + `transition`.

**Enhancement challenges**

1. **Fix the search quirk:** remove the trailing `"` from `SEARCH_API` and confirm searches still work (and are a little cleaner).
2. **Add loading & error states:** show a "Loading…" message while awaiting, and a friendly error if `fetch` fails (wrap it in `try/catch`).
3. **Handle missing posters:** some movies have `poster_path: null`, producing a broken image. Show a placeholder instead.
4. **Debounced live search:** search as the user types (with a short delay) instead of only on Enter.
5. **Pagination / "Load more":** use the API's `page` parameter to append more movies when the user scrolls or clicks a button.
