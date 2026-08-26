# Todo List

## 1. Project Overview

A classic to-do app: type a task and press Enter to add it, left-click a task to mark it complete, right-click to delete it — and everything **persists across page reloads** using the browser's `localStorage`.

**Key concepts involved**

- **Form handling** and preventing the default page reload
- **DOM manipulation** — creating, toggling, and removing list items
- Two kinds of clicks: normal (`click`) and right-click (`contextmenu`)
- **`localStorage`** — saving data in the browser so it survives refreshes
- Serializing data with **`JSON.stringify`** / **`JSON.parse`**

**HTML skills you'll gain**

- Building a simple `<form>` with a text `<input>`
- Using an empty `<ul>` as a container for dynamically-added items
- Small usability touches like `autocomplete="off"` and placeholder text

**CSS skills you'll gain**

- Centering a card with Flexbox
- Styling form inputs (removing borders, custom focus outline, placeholder color)
- Using a state class (`.completed`) with `text-decoration: line-through`

**JavaScript skills you'll gain**

- Selecting elements by ID with `getElementById`
- Handling `submit`, `click`, and `contextmenu` events
- Creating elements, toggling classes, and removing nodes
- Reading and writing **`localStorage`**
- Converting between JS arrays/objects and strings with **JSON**
- Reusing one function for two jobs (new todos *and* restored todos)

---

## 2. Final Project Preview

**Layout & colors**
A light-grey page, centered. A huge, faded purple heading reads "todos". Below it sits a white card with a soft shadow: a large text input on top, and a list of tasks stacked beneath it, each separated by a thin line. Under the card, small grey helper text explains the controls.

**Behavior & interactions**

- Type a task and press **Enter** → it's added to the list and the input clears.
- **Left-click** a task → toggles a "completed" look (greyed out with a line through it).
- **Right-click** a task → deletes it (the browser's usual right-click menu is suppressed).
- **Reload the page** → your list is exactly as you left it, including which items were completed.

**What you can interact with**

- The text input (type + Enter to add)
- Each list item (left-click to complete, right-click to delete)

---

## 3. Prerequisites

**Basic knowledge required**

- HTML forms and inputs
- CSS selectors, Flexbox, and pseudo-classes
- JavaScript functions, arrays, objects, and events

**Tools needed**

- A modern web browser (with dev tools — we'll peek at stored data)
- A text editor (VS Code recommended)
- Optional: the **Live Server** VS Code extension

**Files to create**

```
todo-list/
├── index.html
├── style.css
└── script.js
```

Create these three **empty** files to begin.

---

## 4. Build the Project Step-by-Step

### Step 1: Set up the HTML document

**🎯 Goal**
Create the page skeleton and link the stylesheet and script.

**💡 Concept**
The usual HTML5 boilerplate: stylesheet in the `<head>`, script at the end of `<body>`.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Todo List</title>
  </head>
  <body>
    <!-- app goes here -->
    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**
Nothing new here — but note the `<script>` at the bottom, so all our elements exist before JS tries to find them.

**✅ Checkpoint**
Blank page titled "Todo List".

---

### Step 2: Add the heading and the form

**🎯 Goal**
Add the "todos" title and the form that holds the input and the (empty) list.

**💡 Concept**
Wrapping the input in a `<form>` gives us the **`submit`** event for free — pressing **Enter** in the input submits the form. That's how we'll add todos without any button.

**📝 Code**

```html
<!-- goes in index.html, inside <body> -->
<h1>todos</h1>
<form id="form">
  <input type="text" class="input" id="input" placeholder="Enter your todo" autocomplete="off">

  <ul class="todos" id="todos"></ul>
</form>
```

**🔍 Explanation**

- `<h1>todos</h1>` — the big title.
- `<form id="form">` — the `id` lets JavaScript grab it easily.
- `<input>` with a `placeholder` (grey hint text) and `autocomplete="off"` (so the browser doesn't pop up past entries).
- `<ul class="todos" id="todos">` — an **empty** list; JavaScript will add `<li>` items into it.

**✅ Checkpoint**
You'll see "todos" and a plain text box. The list is empty.

---

### Step 3: Add the instructions

**🎯 Goal**
Tell the user how to complete and delete todos.

**💡 Concept**
Because the interactions (left-click / right-click) aren't obvious, a small hint improves usability.

**📝 Code**

```html
<!-- goes in index.html, after the </form> -->
<small>Left click to toggle completed. <br> Right click to delete todo</small>
```

**🔍 Explanation**
A `<small>` element with a `<br>` line break. Purely informational.

**✅ Checkpoint**
The helper text appears below the form. HTML structure is complete.

---

### Step 4: Base page styling

**🎯 Goal**
Load the font, reset the box model, and center the app.

**💡 Concept**
Same reliable pattern as before: `box-sizing: border-box` for predictable sizing, Flexbox column to center everything.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #f5f5f5;
  color: #444;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
}
```

**🔍 Explanation**
Imports the Poppins font, sets a light background and dark-grey text, and centers all content vertically and horizontally in a full-height column.

**✅ Checkpoint**
Everything is centered on a light-grey background in Poppins.

---

### Step 5: Style the giant heading

**🎯 Goal**
Make the "todos" title big and faded.

**💡 Concept**
A very large `font-size` with reduced `opacity` creates a soft, watermark-like heading — a nice modern touch.

**📝 Code**

```css
/* goes in style.css */
h1 {
  color: rgb(179, 131, 226);
  font-size: 10rem;
  text-align: center;
  opacity: 0.4;
}
```

**🔍 Explanation**
Purple color, an enormous `10rem` size, centered, at 40% opacity so it feels like a soft background label rather than a shouting title.

**✅ Checkpoint**
"todos" is now huge and faintly purple.

---

### Step 6: Style the form and input

**🎯 Goal**
Turn the form into a clean white card and the input into a borderless field.

**💡 Concept**
Removing the input's default border and giving the *form* a shadow makes the input and list feel like one seamless card.

**📝 Code**

```css
/* goes in style.css */
form {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  width: 400px;
}

.input {
  border: none;
  color: #444;
  font-size: 2rem;
  padding: 1rem 2rem;
  display: block;
  width: 100%;
}
```

**🔍 Explanation**

- The `form` gets a soft drop shadow and a fixed 400px width (but `max-width: 100%` keeps it from overflowing small screens).
- `.input`: no border, large text, generous padding, and `width: 100%` so it fills the card.

**✅ Checkpoint**
The input now looks like a large, clean field inside a subtly shadowed card.

---

### Step 7: Polish the input's placeholder and focus

**🎯 Goal**
Lighten the placeholder text and give a branded focus outline.

**💡 Concept**
Pseudo-elements/classes like `::placeholder` and `:focus` let you style specific states of an element.

**📝 Code**

```css
/* goes in style.css */
.input::placeholder {
  color: #d5d5d5;
}

.input:focus {
  outline-color: rgb(179, 131, 226);
}
```

**🔍 Explanation**

- `::placeholder` styles the hint text (a light grey).
- `:focus` applies only while the input is active (clicked/tabbed into), matching the outline color to the purple theme.

**✅ Checkpoint**
Click into the input — the outline turns purple, and the placeholder is a soft grey.

---

### Step 8: Style the todo list and the "completed" state

**🎯 Goal**
Style the list items and define how a completed todo looks.

**💡 Concept**
A **state class** (`.completed`) lets us flip an item's appearance just by adding/removing one class in JavaScript — the styling lives in CSS, the logic in JS.

**📝 Code**

```css
/* goes in style.css */
.todos {
  background-color: #fff;
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.todos li {
  border-top: 1px solid #e5e5e5;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 1rem 2rem;
}

.todos li.completed {
  color: #b6b6b6;
  text-decoration: line-through;
}
```

**🔍 Explanation**

- `.todos`: white background, no bullets (`list-style-type: none`), no default padding/margin.
- `.todos li`: a divider line on top, a pointer cursor (hints it's clickable), roomy padding.
- `.todos li.completed`: this rule only applies to `<li>` elements that *also* have the `completed` class — greyed out with a strike-through. We'll add/remove that class in JS.

**✅ Checkpoint**
No items exist yet, so nothing shows — but the styling is ready for them.

---

### Step 9: Style the helper text

**🎯 Goal**
Make the instructions subtle.

**💡 Concept**
Muted color and spacing keep secondary text from competing with the main UI.

**📝 Code**

```css
/* goes in style.css */
small {
  color: #b5b5b5;
  margin-top: 3rem;
  text-align: center;
}
```

**🔍 Explanation**
Light grey, centered, pushed down from the card. CSS is now complete — on to the logic.

**✅ Checkpoint**
The instruction text is now a muted grey below the card.

---

### Step 10: Select the elements

**🎯 Goal**
Grab the form, the input, and the list so JavaScript can work with them.

**💡 Concept**
`document.getElementById('x')` fetches the element whose `id` is `x`. It's a fast, direct way to select unique elements.

**📝 Code**

```js
// goes in script.js
const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')
```

**🔍 Explanation**
Three references: the `form` (for the submit event), the `input` (to read what's typed), and `todosUL` (the `<ul>` we append items into).

**✅ Checkpoint**
Console shows no errors.

---

### Step 11: Understand and load from localStorage

**🎯 Goal**
On page load, read any previously-saved todos and restore them.

**💡 Concept — this is the heart of the project:**
**`localStorage`** is a small key-value store built into every browser. Important facts:

- It **only stores strings** — not arrays or objects.
- To store structured data, we convert it to a string with **`JSON.stringify`** when saving, and back with **`JSON.parse`** when reading.
- Data **persists across reloads and even after closing the browser** — it isn't cleared until code (or the user) removes it.
- It's scoped **per origin** (per site) and **per browser** — your todos won't appear on another site, in another browser, or in a private window.

**📝 Code**

```js
// goes in script.js
const todos = JSON.parse(localStorage.getItem('todos'))

if(todos) {
    todos.forEach(todo => addTodo(todo))
}
```

**🔍 Explanation**

- `localStorage.getItem('todos')` returns the string we saved under the key `'todos'` — or `null` if nothing's there yet.
- `JSON.parse(...)` turns that string back into a real JavaScript array of objects. (`JSON.parse(null)` conveniently returns `null`, so no crash on first visit.)
- `if(todos)` guards against the first visit (when it's `null`).
- `todos.forEach(todo => addTodo(todo))` loops the saved items and rebuilds each one — using the same `addTodo` function we'll also use for brand-new todos. We'll write that function in the next steps.

**✅ Checkpoint**
No errors (we haven't saved anything yet, so nothing is restored). We'll circle back once saving works.

---

### Step 12: Handle form submission

**🎯 Goal**
Add a new todo when the user presses Enter.

**💡 Concept**
By default, submitting a form **reloads the page** (a leftover from the early web). `e.preventDefault()` stops that so our JavaScript can handle it instead.

**📝 Code**

```js
// goes in script.js
form.addEventListener('submit', (e) => {
    e.preventDefault()

    addTodo()
})
```

**🔍 Explanation**

- `form.addEventListener('submit', ...)` runs our function whenever the form is submitted (Enter in the input).
- `e.preventDefault()` cancels the default page reload.
- `addTodo()` is called **with no argument** — that's the signal that this is a *new* todo from the input (contrast with Step 11, which called `addTodo(todo)` *with* a saved object). We'll write `addTodo` to handle both.

**✅ Checkpoint**
Pressing Enter won't do anything visible yet (and would error because `addTodo` isn't defined) — define it next before testing.

---

### Step 13: Write the addTodo function (create the list item)

**🎯 Goal**
Create one `<li>` for a todo — whether typed by the user or restored from storage.

**💡 Concept**
One function, **two jobs**, controlled by whether an argument was passed. This avoids duplicating logic for "new" vs "restored" todos.

**📝 Code**

```js
// goes in script.js
function addTodo(todo) {
    let todoText = input.value

    if(todo) {
        todoText = todo.text
    }

    if(todoText) {
        const todoEl = document.createElement('li')
        if(todo && todo.completed) {
            todoEl.classList.add('completed')
        }

        todoEl.innerText = todoText

        // event listeners will go here (next step)

        todosUL.appendChild(todoEl)

        input.value = ''

        updateLS()
    }
}
```

**🔍 Explanation**

- `let todoText = input.value` — assume the text comes from the input (the "new todo" case).
- `if(todo) { todoText = todo.text }` — but if a saved `todo` object was passed in, use *its* text instead. This is the dual-purpose switch.
- `if(todoText)` — only proceed if there's actual text (ignore empty submissions).
- `document.createElement('li')` builds the list item.
- `if(todo && todo.completed)` — restored todos remember whether they were completed, so re-apply the `completed` class.
- `todoEl.innerText = todoText` sets the visible text.
- `todosUL.appendChild(todoEl)` adds it to the page.
- `input.value = ''` clears the input for the next entry.
- `updateLS()` saves the current list to `localStorage` (function coming in Step 15).

**✅ Checkpoint**
Hold off testing — `updateLS` isn't defined yet, and we still need the click handlers. Two steps to go.

---

### Step 14: Add click and right-click handlers

**🎯 Goal**
Make each todo toggle "completed" on left-click and delete on right-click.

**💡 Concept**
The `click` event fires on a normal left-click. The **`contextmenu`** event fires on a right-click — and calling `e.preventDefault()` on it stops the browser's right-click menu from appearing.

**📝 Code**

```js
// goes in script.js — place this inside addTodo, where the
// "event listeners will go here" comment is (after setting innerText)
todoEl.addEventListener('click', () => {
    todoEl.classList.toggle('completed')
    updateLS()
})

todoEl.addEventListener('contextmenu', (e) => {
    e.preventDefault()

    todoEl.remove()
    updateLS()
})
```

**🔍 Explanation**

- **Left-click:** `classList.toggle('completed')` adds the class if absent, removes it if present — flipping the strike-through look. Then `updateLS()` saves the change.
- **Right-click:** `e.preventDefault()` suppresses the browser menu, `todoEl.remove()` deletes the item from the page, and `updateLS()` saves the shorter list.

**✅ Checkpoint**
Almost there — one more function (`updateLS`) and it all comes alive.

---

### Step 15: Save to localStorage with updateLS

**🎯 Goal**
Snapshot the entire current list and store it, so it survives reloads.

**💡 Concept**
Rather than tracking changes one by one, we take the simple, robust approach: **read every `<li>` currently on the page, rebuild a fresh array, and overwrite storage.** Since `localStorage` only holds strings, we `JSON.stringify` the array first.

**📝 Code**

```js
// goes in script.js
function updateLS() {
    todosEl = document.querySelectorAll('li')

    const todos = []

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}
```

**🔍 Explanation**

- `document.querySelectorAll('li')` grabs **all** todo `<li>` elements currently on the page.
- We build a fresh `todos` array, pushing an object `{ text, completed }` for each — reading the text from `innerText` and the completed state from whether the `completed` class is present (`classList.contains`).
- `localStorage.setItem('todos', JSON.stringify(todos))` converts the array to a JSON string and stores it under the key `'todos'`. Next page load, Step 11 reads it back.

**⚠️ Gotcha:** `todosEl = ...` is written **without** `let`/`const`, which makes it an accidental **global variable**. It works, but it's sloppy — in your own code, always declare with `const todosEl = ...`. We keep it as-is to match the source faithfully.

**✅ Checkpoint**
Reload and test everything:
1. Type a task, press Enter → it appears, input clears.
2. Left-click it → strike-through toggles.
3. Right-click it → it's deleted (no browser menu).
4. Add a few, complete one, then **reload the page** → your list returns exactly as you left it.

To *see* the stored data: open dev tools → **Application** tab → **Local Storage** → your site → the `todos` key holds a JSON string. 🎉

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
    <title>Todo List</title>
  </head>
  <body>
    <h1>todos</h1>
    <form id="form">
      <input type="text" class="input" id="input" placeholder="Enter your todo" autocomplete="off">

      <ul class="todos" id="todos"></ul>
    </form>
    <small>Left click to toggle completed. <br> Right click to delete todo</small>

    <script src="script.js"></script>
  </body>
</html>
```

```css
/* style.css */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #f5f5f5;
  color: #444;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
}

h1 {
  color: rgb(179, 131, 226);
  font-size: 10rem;
  text-align: center;
  opacity: 0.4;
}

form {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  width: 400px;
}

.input {
  border: none;
  color: #444;
  font-size: 2rem;
  padding: 1rem 2rem;
  display: block;
  width: 100%;
}

.input::placeholder {
  color: #d5d5d5;
}

.input:focus {
  outline-color: rgb(179, 131, 226);
}

.todos {
  background-color: #fff;
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.todos li {
  border-top: 1px solid #e5e5e5;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 1rem 2rem;
}

.todos li.completed {
  color: #b6b6b6;
  text-decoration: line-through;
}

small {
  color: #b5b5b5;
  margin-top: 3rem;
  text-align: center;
}
```

```js
// script.js
const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')

const todos = JSON.parse(localStorage.getItem('todos'))

if(todos) {
    todos.forEach(todo => addTodo(todo))
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    addTodo()
})

function addTodo(todo) {
    let todoText = input.value

    if(todo) {
        todoText = todo.text
    }

    if(todoText) {
        const todoEl = document.createElement('li')
        if(todo && todo.completed) {
            todoEl.classList.add('completed')
        }

        todoEl.innerText = todoText

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')
            updateLS()
        }) 

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault()

            todoEl.remove()
            updateLS()
        }) 

        todosUL.appendChild(todoEl)

        input.value = ''

        updateLS()
    }
}

function updateLS() {
    todosEl = document.querySelectorAll('li')

    const todos = []

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}
```

---

## 6. Recap & Next Steps

**What you learned**

- Handling form `submit` and stopping the default reload with `preventDefault`
- Responding to both `click` and right-click (`contextmenu`) events
- Creating, toggling classes on, and removing DOM elements
- The full **`localStorage`** workflow: strings only, `JSON.stringify` to save, `JSON.parse` to load, persistent per-origin
- Writing one function that serves two callers (new vs restored todos)
- A code-quality lesson: always declare variables (`todosEl` should have been `const`)

**Enhancement challenges**

1. **Add an edit feature:** double-click a todo to make its text editable, then save on blur.
2. **Add a delete-all button:** clear the list *and* remove the `todos` key from `localStorage`.
3. **Show a counter:** display how many todos remain incomplete, updating live.
4. **Add filters:** buttons for "All / Active / Completed" that show only matching todos.
5. **Prevent duplicates or blanks:** trim whitespace and reject a todo that already exists.
