# Github Profiles

## 1. Project Overview

This project builds a **GitHub profile finder**: type a username, press Enter, and the app fetches that user's real GitHub data — avatar, bio, follower counts, and their five most recent repositories — then renders it as a card.

**Key concepts involved:** asynchronous JavaScript (`async`/`await`), calling a real REST API over the network (using the **axios** library loaded from a CDN), handling success *and* error states, building HTML from template literals, and DOM rendering.

You will gain these skills:

- **HTML skills**
  - Building a search form with an `<input>`
  - Using an empty `<main>` container as a render target
  - Loading a third-party library (axios) from a CDN via `<script>`
- **CSS skills**
  - Centering a layout with Flexbox
  - Styling form inputs, placeholders, and focus states
  - Creating a "card" component with shadows and rounded corners
  - Circular avatars with `border-radius: 50%`
  - A responsive layout with a `@media` query
- **JavaScript skills**
  - Making network requests with **axios** and `async`/`await`
  - Handling errors with `try`/`catch` (including a 404 "user not found")
  - Building markup with **template literals** and injecting it via `innerHTML`
  - Preventing the default form submit and reading input values
  - Array methods `slice` and `forEach`
  - Creating and appending elements dynamically

## 2. Final Project Preview

**Layout & colors:** A dark indigo (`#2a2a72`) page, centered. At the top is a wide purple search input reading "Search a Github User". When you search, a purple **card** (`#4c2885`) appears below it, containing a large circular avatar on the left and, on the right, the user's name, bio, a row of Followers / Following / Repos counts, and up to five small repository "badge" links. On narrow screens the card stacks vertically.

**Behavior & interactions:**
- Type a GitHub username and press **Enter** to search.
- On success, the card shows the avatar, name, optional bio, the three stat counts, and 5 repo badges.
- Each **repo badge** is a link that opens that repository in a new tab.
- If the username doesn't exist, an **error card** ("No profile with this username") appears instead.
- The input **clears itself** after each search.

**What you can interact with:** the search input (submit with Enter), and the repository badge links in the result card.

## 3. Prerequisites

- **Basic knowledge:** HTML forms, CSS selectors, and JavaScript functions/variables. We'll explain everything about async requests and axios as we go.
- **Tools needed:**
  - A modern browser and a text editor (VS Code recommended)
  - An internet connection (the app calls the live GitHub API and loads axios from a CDN)
  - *Optional:* the VS Code **Live Server** extension
- **Files to create:**

```
github-profiles/
├── index.html
├── style.css
└── script.js
```

Create these three empty files. We'll build them up step by step.

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML skeleton and load axios

**🎯 Goal**
Set up the HTML document, link our stylesheet and script, and load the **axios** library we'll use to talk to the GitHub API.

**💡 Concept**
**axios** is a small, popular library that makes network requests simpler than the browser's built-in tools. We load it from a **CDN** (Content Delivery Network) — a public URL that hosts the library — with a `<script>` tag. It must load *before* our own `script.js`, so our code can use it.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Github Profiles</title>
  </head>
  <body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.0/axios.min.js" integrity="sha512-DZqqY3PiOvTP9HkjIWgjO6ouCbq+dxqWoJZ/Q+zPYNHmlnI2dQnbJ5bxAHpAMw+LXRm4D72EIRXzvcHQtE8/VQ==" crossorigin="anonymous"></script>
    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**
- The first `<script>` loads axios from cdnjs. The `integrity` and `crossorigin` attributes let the browser verify the file hasn't been tampered with.
- Our `script.js` comes **after** axios, so `axios(...)` is defined by the time our code runs.
- Both scripts sit at the bottom of `<body>` so the page's elements exist first.

**✅ Checkpoint**
Open `index.html`. The page is blank but the tab title reads "Github Profiles". Open the console (F12) and type `axios` — it should log a function, confirming the library loaded.

---

### Step 2: Add the search form and result container

**🎯 Goal**
Add the search input and an empty `<main>` element where results will be rendered.

**💡 Concept**
Wrapping the input in a `<form>` gives us the "submit on Enter" behavior for free. The empty `<main>` is our **render target** — JavaScript will fill it with a card later.

**📝 Code**

```html
<!-- goes in index.html, inside <body> above the <script> tags -->
<form class="user-form" id="form">
  <input type="text" id="search" placeholder="Search a Github User">
</form>

<main id="main"></main>
```

**🔍 Explanation**
- `<form id="form">` will listen for the submit event.
- `<input id="search">` is where the user types; `placeholder` shows hint text.
- `<main id="main">` is empty for now — its contents will be generated by our script.

**✅ Checkpoint**
Refresh. You'll see an unstyled text box with the placeholder "Search a Github User". Typing and pressing Enter reloads the page (default form behavior) — we'll stop that with JavaScript later.

---

### Step 3: Import a font and reset the box model

**🎯 Goal**
Load the Poppins font and make element sizing predictable.

**💡 Concept**
`box-sizing: border-box` makes padding and borders count *inside* an element's width, so boxes never grow unexpectedly. Applying it to `*` is a standard reset.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap');

* {
  box-sizing: border-box;
}
```

**🔍 Explanation**
- `@import` (must be the first line) loads the **Poppins** font from Google Fonts.
- The universal selector `*` applies the border-box model everywhere.

**✅ Checkpoint**
No visible change yet, but the font is loaded and ready.

---

### Step 4: Style the page background and centering

**🎯 Goal**
Give the page its dark indigo background, white text, and a centered column layout.

**💡 Concept**
A full-height Flexbox column centers everything both ways and gives the form and card room to sit in the middle of the screen.

**📝 Code**

```css
/* goes in style.css */
body {
  background-color: #2a2a72;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}
```

**🔍 Explanation**
- `background-color: #2a2a72` + `color: #fff` set the dark theme with white text.
- The Flexbox trio (`display: flex`, `align-items: center`, `justify-content: center`) plus `height: 100vh` centers content on screen.
- `overflow: hidden` hides scrollbars; `margin: 0` removes the browser default.

**✅ Checkpoint**
Refresh. The page is now dark indigo and the search box sits centered near the middle.

---

### Step 5: Style the search form and input

**🎯 Goal**
Turn the plain input into a wide, rounded, purple search bar.

**💡 Concept**
Styling the `::placeholder` pseudo-element and the `:focus` state polishes the input so it looks intentional and removes the browser's default focus outline.

**📝 Code**

```css
/* goes in style.css */
.user-form {
  width: 100%;
  max-width: 700px;
}

.user-form input {
  width: 100%;
  display: block;
  background-color: #4c2885;
  border: none;
  border-radius: 10px;
  color: #fff;
  padding: 1rem;
  margin-bottom: 2rem;
  font-family: inherit;
  font-size: 1rem;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(0, 0, 0, 0.1);
}

.user-form input::placeholder {
  color: #bbb;
}

.user-form input:focus {
  outline: none;
}
```

**🔍 Explanation**
- `.user-form` stretches to full width but caps at `700px` so it doesn't get too wide.
- The input gets a purple background, rounded corners, white text, and a soft double `box-shadow` for depth.
- `::placeholder { color: #bbb }` makes the hint text light gray.
- `:focus { outline: none }` removes the default blue focus ring.

**✅ Checkpoint**
Refresh. The search bar is now a wide, rounded purple field with light gray placeholder text.

---

### Step 6: Style the profile card and avatar

**🎯 Goal**
Define the card container and the circular avatar image that will appear after a search.

**💡 Concept**
`border-radius: 50%` turns a square image into a perfect circle. `display: flex` on the card places the avatar and info side by side.

**📝 Code**

```css
/* goes in style.css */
.card {
  max-width: 800px;
  background-color: #4c2885;
  border-radius: 20px;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  padding: 3rem;
  margin: 0 1.5rem;
}

.avatar {
  border-radius: 50%;
  border: 10px solid #2a2a72;
  height: 150px;
  width: 150px;
}
```

**🔍 Explanation**
- `.card` is a purple, rounded, shadowed box laid out as a horizontal flex row (avatar on the left, info on the right).
- `.avatar` is a 150×150 image made circular with `border-radius: 50%` and framed with a thick indigo border.

**✅ Checkpoint**
Nothing shows yet — no card exists until JavaScript creates one. The styles are ready.

---

### Step 7: Style the user info and stats

**🎯 Goal**
Lay out the name, bio, and the Followers / Following / Repos stat row.

**💡 Concept**
Turning a `<ul>` into a Flexbox row with `justify-content: space-between` spreads the three stats evenly across a line — a clean way to build a stats bar without extra markup.

**📝 Code**

```css
/* goes in style.css */
.user-info {
  color: #eee;
  margin-left: 2rem;
}

.user-info h2 {
  margin-top: 0;
}

.user-info ul {
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  padding: 0;
  max-width: 400px;
}

.user-info ul li {
  display: flex;
  align-items: center;
}

.user-info ul li strong {
  font-size: 0.9rem;
  margin-left: 0.5rem;
}
```

**🔍 Explanation**
- `.user-info` sits to the right of the avatar (`margin-left: 2rem`).
- `.user-info ul` removes bullet points and lays the three stat items in a spaced-out row.
- Each `li` aligns its number and label on the same line; `strong` (the label) gets a little left margin.

**✅ Checkpoint**
Still nothing visible — these styles apply to card content we haven't generated yet.

---

### Step 8: Style the repository badges

**🎯 Goal**
Style the small repo links that appear at the bottom of the card.

**💡 Concept**
`display: inline-block` lets the repo links sit side by side *and* accept padding/margins, so they read like little "chips" or badges.

**📝 Code**

```css
/* goes in style.css */
.repo {
  text-decoration: none;
  color: #fff;
  background-color: #212a72;
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  display: inline-block;
}
```

**🔍 Explanation**
- `text-decoration: none` removes the default underline from links.
- The dark background, small font, padding, and margins make each repo look like a tidy badge.
- `display: inline-block` keeps them flowing on one line while still respecting spacing.

**✅ Checkpoint**
No change yet — badges appear once we render repos in JavaScript.

---

### Step 9: Make the card responsive

**🎯 Goal**
Stack the card vertically on small screens so it doesn't overflow.

**💡 Concept**
A `@media` query applies styles only when a condition (here, viewport width ≤ 500px) is true — the foundation of responsive design.

**📝 Code**

```css
/* goes in style.css */
@media (max-width: 500px) {
  .card {
    flex-direction: column;
    align-items: center;
  }

  .user-form {
    max-width: 400px;
  }
}
```

**🔍 Explanation**
- On screens 500px wide or narrower, the card switches from a row to a **column** (avatar on top, info below) and centers its contents.
- The search form's max width shrinks to fit small screens.

**✅ Checkpoint**
Resize your browser very narrow — the search bar shrinks. (The card change will be visible once we can render a card.) Now on to JavaScript!

---

### Step 10: Select elements and define the API URL

**🎯 Goal**
Grab the DOM elements our script needs and store the base GitHub API address.

**💡 Concept**
The **GitHub REST API** exposes user data at `https://api.github.com/users/<username>`. We store that base in a constant and will append usernames to it.

**📝 Code**

```js
// goes in script.js
const APIURL = 'https://api.github.com/users/'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
```

**🔍 Explanation**
- `APIURL` is the base endpoint; we'll do `APIURL + username` to build the full request URL.
- `main` is our render target, `form` is the search form, `search` is the input.

> **Note on public visibility:** because this runs in the browser, *anything* your JavaScript requests — including the URL and any API key — is fully visible to anyone via the Network tab or "View Source". The GitHub public user API needs **no key**, which is exactly why it's safe to call directly from front-end code. Never hard-code a secret key in client-side JS.

**✅ Checkpoint**
Open the console. No errors should appear. Type `APIURL` — it logs the URL string.

---

### Step 11: Render a user card from data

**🎯 Goal**
Write `createUserCard`, which takes a GitHub user object and builds the card HTML.

**💡 Concept**
A **template literal** (backtick string) lets us build multi-line HTML with `${...}` placeholders for dynamic data. We then set `main.innerHTML` to display it in one shot.

**📝 Code**

```js
// goes in script.js
function createUserCard(user) {
    const userID = user.name || user.login
    const userBio = user.bio ? `<p>${user.bio}</p>` : ''
    const cardHTML = `
    <div class="card">
    <div>
      <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
    </div>
    <div class="user-info">
      <h2>${userID}</h2>
      ${userBio}
      <ul>
        <li>${user.followers} <strong>Followers</strong></li>
        <li>${user.following} <strong>Following</strong></li>
        <li>${user.public_repos} <strong>Repos</strong></li>
      </ul>

      <div id="repos"></div>
    </div>
  </div>
    `
    main.innerHTML = cardHTML
}
```

**🔍 Explanation**
- `user.name || user.login` uses the display name if present, otherwise falls back to the username (`||` returns the first "truthy" value).
- `user.bio ? \`<p>...\`</p>` : ''` only adds a bio paragraph *if* the user has a bio (a ternary).
- The template literal interpolates the avatar URL, name, and the three stat counts.
- Note the empty `<div id="repos"></div>` inside — that's where repo badges will go later.
- `main.innerHTML = cardHTML` replaces the contents of `<main>` with our card.

**✅ Checkpoint**
Test it in the console with a fake object:
```js
createUserCard({ login: 'octocat', name: 'The Octocat', avatar_url: 'https://github.com/octocat.png', followers: 10, following: 5, public_repos: 8 })
```
A styled purple card should appear on the page. 🎉

---

### Step 12: Render an error card

**🎯 Goal**
Write `createErrorCard`, shown when something goes wrong (like a username that doesn't exist).

**💡 Concept**
Handling **error states** is as important as handling success — users need clear feedback when a search fails. We reuse the same `.card` styling for consistency.

**📝 Code**

```js
// goes in script.js
function createErrorCard(msg) {
    const cardHTML = `
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `

    main.innerHTML = cardHTML
}
```

**🔍 Explanation**
- Takes a message string and drops it into a simple card.
- Like `createUserCard`, it overwrites `main.innerHTML`, so an error replaces any previous result.

**✅ Checkpoint**
In the console, run `createErrorCard('Something went wrong')`. A card with that message appears.

---

### Step 13: Add repository badges to the card

**🎯 Goal**
Write `addReposToCard`, which takes a list of repos and appends up to five badge links into the card's `#repos` div.

**💡 Concept**
`slice(0, 5)` grabs just the first five items; `forEach` loops over them. For each repo we build an `<a>` element and append it — this is dynamic element creation, complementing the template-literal approach.

**📝 Code**

```js
// goes in script.js
function addReposToCard(repos) {
    const reposEl = document.getElementById('repos')

    repos
        .slice(0, 5)
        .forEach(repo => {
            const repoEl = document.createElement('a')
            repoEl.classList.add('repo')
            repoEl.href = repo.html_url
            repoEl.target = '_blank'
            repoEl.innerText = repo.name

            reposEl.appendChild(repoEl)
        })
}
```

**🔍 Explanation**
- `document.getElementById('repos')` finds the `#repos` div that `createUserCard` created.
- `.slice(0, 5)` keeps only the first five repos; `.forEach` runs the callback for each.
- For each repo we create an `<a>`, give it the `.repo` class, set its `href` to the repo URL, `target="_blank"` (open in a new tab), and its text to the repo name — then append it.

**✅ Checkpoint**
With a card already on the page (from Step 11's test), run in the console:
```js
addReposToCard([{ name: 'repo-one', html_url: '#' }, { name: 'repo-two', html_url: '#' }])
```
Two repo badges appear inside the card.

---

### Step 14: Fetch a user with axios and async/await

**🎯 Goal**
Write `getUser`, the heart of the app: it requests a user from GitHub, then renders their card and repos.

**💡 Concept**
Network requests take time, so they're **asynchronous** — the code doesn't wait around and freeze the page. An `async` function lets us use `await` to pause *within that function* until axios finishes, so the code reads top-to-bottom like normal. We wrap it in `try`/`catch` to handle failures gracefully.

**📝 Code**

```js
// goes in script.js
async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username)

        createUserCard(data)
        getRepos(username)
    } catch(err) {
        if(err.response.status == 404) {
            createErrorCard('No profile with this username')
        }
    }
}
```

**🔍 Explanation**
- `async function` marks this as asynchronous, enabling `await` inside.
- `await axios(APIURL + username)` sends the request and **pauses** until GitHub responds. axios returns a response object; `const { data } = ...` **destructures** just the `data` property (the actual user JSON).
- On success we call `createUserCard(data)` and then `getRepos(username)` (we'll write `getRepos` next).
- `catch(err)` runs if the request fails. If GitHub responds with **404** (`err.response.status == 404`), the username doesn't exist, so we show the error card.

> **Loading & error states:** real apps often show a spinner *while* awaiting the response and an error message if it fails. This project handles the error state (the 404 card) but has no loading spinner — a great enhancement to add later.

> `getUser` references `getRepos`, which we haven't written yet. That's fine: `getUser` isn't *called* until the final step, and by then `getRepos` will exist.

**✅ Checkpoint**
No errors on load. You can even test it now: run `getUser('octocat')` in the console. It'll fetch the real Octocat profile and render the card (repos come after the next step).

---

### Step 15: Fetch and display the user's repos

**🎯 Goal**
Write `getRepos`, which fetches a user's repositories (newest first) and hands them to `addReposToCard`.

**💡 Concept**
This is a second async request. The GitHub API accepts query parameters — here `?sort=created` asks for repos ordered by creation date, so the newest appear first.

**📝 Code**

```js
// goes in script.js
async function getRepos(username) {
    try {
        const { data } = await axios(APIURL + username + '/repos?sort=created')

        addReposToCard(data)
    } catch(err) {
        createErrorCard('Problem fetching repos')
    }
}
```

**🔍 Explanation**
- Same `async`/`await` + destructuring pattern as `getUser`.
- The URL adds `/repos?sort=created` to request that user's repositories sorted by creation date.
- On success, `addReposToCard(data)` renders up to five badges.
- On failure, it shows a "Problem fetching repos" error card.

**✅ Checkpoint**
Run `getUser('octocat')` in the console again. Now the card appears **and** five repo badges show up beneath the stats.

---

### Step 16: Handle the search form submission

**🎯 Goal**
Wire the form so submitting it triggers a search — the final connection that makes the app usable.

**💡 Concept**
By default a form submission reloads the page. `e.preventDefault()` stops that so we can handle the search with JavaScript instead.

**📝 Code**

```js
// goes in script.js
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = search.value

    if(user) {
        getUser(user)

        search.value = ''
    }
})
```

**🔍 Explanation**
- `addEventListener('submit', ...)` fires when the user presses Enter in the input.
- `e.preventDefault()` cancels the default page reload.
- `search.value` reads what was typed. The `if(user)` guard skips empty searches.
- `getUser(user)` kicks off the fetch; `search.value = ''` clears the input for the next search.

**✅ Checkpoint**
Refresh the page, type a real GitHub username (e.g. `traversymedia`), and press Enter. The profile card with stats and repo badges appears, and the input clears. Try a nonsense username to see the error card. The project is complete!

---

## 5. Final Full Code (Reference)

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Github Profiles</title>
  </head>
  <body>
    <form class="user-form" id="form">
      <input type="text" id="search" placeholder="Search a Github User">
    </form>

    <main id="main"></main>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.0/axios.min.js" integrity="sha512-DZqqY3PiOvTP9HkjIWgjO6ouCbq+dxqWoJZ/Q+zPYNHmlnI2dQnbJ5bxAHpAMw+LXRm4D72EIRXzvcHQtE8/VQ==" crossorigin="anonymous"></script>
    <script src="script.js"></script>
  </body>
</html>
```

### style.css

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #2a2a72;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.user-form {
  width: 100%;
  max-width: 700px;
}

.user-form input {
  width: 100%;
  display: block;
  background-color: #4c2885;
  border: none;
  border-radius: 10px;
  color: #fff;
  padding: 1rem;
  margin-bottom: 2rem;
  font-family: inherit;
  font-size: 1rem;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(0, 0, 0, 0.1);
}

.user-form input::placeholder {
  color: #bbb;
}

.user-form input:focus {
  outline: none;
}

.card {
  max-width: 800px;
  background-color: #4c2885;
  border-radius: 20px;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  padding: 3rem;
  margin: 0 1.5rem;
}

.avatar {
  border-radius: 50%;
  border: 10px solid #2a2a72;
  height: 150px;
  width: 150px;
}

.user-info {
  color: #eee;
  margin-left: 2rem;
}

.user-info h2 {
  margin-top: 0;
}

.user-info ul {
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  padding: 0;
  max-width: 400px;
}

.user-info ul li {
  display: flex;
  align-items: center;
}

.user-info ul li strong {
  font-size: 0.9rem;
  margin-left: 0.5rem;
}

.repo {
  text-decoration: none;
  color: #fff;
  background-color: #212a72;
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  display: inline-block;
}

@media (max-width: 500px) {
  .card {
    flex-direction: column;
    align-items: center;
  }

  .user-form {
    max-width: 400px;
  }
}
```

### script.js

```js
const APIURL = 'https://api.github.com/users/'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username)

        createUserCard(data)
        getRepos(username)
    } catch(err) {
        if(err.response.status == 404) {
            createErrorCard('No profile with this username')
        }
    }
}

async function getRepos(username) {
    try {
        const { data } = await axios(APIURL + username + '/repos?sort=created')

        addReposToCard(data)
    } catch(err) {
        createErrorCard('Problem fetching repos')
    }
}

function createUserCard(user) {
    const userID = user.name || user.login
    const userBio = user.bio ? `<p>${user.bio}</p>` : ''
    const cardHTML = `
    <div class="card">
    <div>
      <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
    </div>
    <div class="user-info">
      <h2>${userID}</h2>
      ${userBio}
      <ul>
        <li>${user.followers} <strong>Followers</strong></li>
        <li>${user.following} <strong>Following</strong></li>
        <li>${user.public_repos} <strong>Repos</strong></li>
      </ul>

      <div id="repos"></div>
    </div>
  </div>
    `
    main.innerHTML = cardHTML
    
}

function createErrorCard(msg) {
    const cardHTML = `
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `

    main.innerHTML = cardHTML
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos')

    repos
        .slice(0, 5)
        .forEach(repo => {
            const repoEl = document.createElement('a')
            repoEl.classList.add('repo')
            repoEl.href = repo.html_url
            repoEl.target = '_blank'
            repoEl.innerText = repo.name

            reposEl.appendChild(repoEl)
        })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = search.value

    if(user) {
        getUser(user)

        search.value = ''
    }
})
```

## 6. Recap & Next Steps

**What you learned:**
- Loading a third-party library (axios) from a CDN and why script order matters
- Making asynchronous API calls with `async`/`await` and destructuring the response
- Handling both success and error states with `try`/`catch`, including a 404
- Why front-end network requests are publicly visible (and why GitHub's keyless public API is safe to call directly)
- Building markup two ways: template literals + `innerHTML`, and `createElement` + `appendChild`
- Preventing default form behavior and reading input values
- A responsive card layout with a `@media` query

**Enhancement challenges:**
1. **Loading state:** show a "Loading…" message or spinner while `await` is in progress.
2. **Debounce as you type:** search live on input (with a delay) instead of only on submit.
3. **Show more info:** display the user's location, company, or blog link from the API response.
4. **Rate-limit awareness:** the unauthenticated GitHub API allows limited requests per hour — display a friendly message when you hit the limit.
5. **Repo details:** show each repo's star count or description on its badge.
