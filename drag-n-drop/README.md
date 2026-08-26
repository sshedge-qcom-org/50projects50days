# Drag N Drop

A code-along tutorial that rebuilds this project from three empty files, one small step at a time.

## 1. Project Overview

This project builds a row of empty boxes and one filled image tile you can **drag** from box to box using the browser's native HTML Drag-and-Drop API.

**Key concepts involved**

- The HTML5 Drag-and-Drop API and its event sequence
- Why you must `preventDefault()` to allow dropping
- Adding/removing classes to give visual feedback during a drag
- Moving an element in the DOM with `append`

**HTML skills you'll gain**

- Making an element draggable with the `draggable` attribute
- Structuring repeated "drop zone" containers

**CSS skills you'll gain**

- Full-screen centering with Flexbox
- Styling drag states (`.hold`, `.hovered`) for feedback
- A responsive tweak with a `@media` query

**JavaScript skills you'll gain**

- Handling the full drag lifecycle: `dragstart`, `dragend`, `dragover`, `dragenter`, `dragleave`, `drop`
- Event delegation on `document.body`
- Guarding a handler so only the intended element drags
- Using a `setTimeout(fn, 0)` trick to hide the source mid-drag
- Moving a DOM node with `this.append(...)`

## 2. Final Project Preview

**Layout & colors**

- A steel-blue page with five white, black-bordered square boxes centered in a row.
- The first box contains an image tile (a random Unsplash photo).
- On narrow screens (≤ 800px) the boxes stack in a column.

**Behavior & interactions**

- You can drag the image tile out of its box.
- While dragging, the original tile is temporarily hidden (via a class swap).
- Any box you drag *over* highlights with a dark, dashed border.
- Dropping the tile onto a box moves it into that box.

**What you can interact with**

- The draggable image tile (drag it between the five boxes).

## 3. Prerequisites

**Basic knowledge required**

- Basic HTML, CSS, and JavaScript syntax.
- Familiarity with functions and events.

**Tools needed**

- A modern desktop browser (native drag-and-drop is a mouse interaction).
- A text editor (VS Code recommended).
- An internet connection (the tile image loads from Unsplash).
- Optional: the **Live Server** extension.

**Files to create**

```
drag-n-drop/
├── index.html
├── style.css
└── script.js
```

Create all three now, empty.

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML skeleton

**🎯 Goal**
Set up the base document and link the stylesheet.

**💡 Concept**
Standard HTML5 boilerplate.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Drag N Drop</title>
  </head>
  <body>
  </body>
</html>
```

**🔍 Explanation**

- The usual boilerplate with our stylesheet linked and the page titled "Drag N Drop".

**✅ Checkpoint**
Open `index.html` — a blank page with the correct tab title.

---

### Step 2: Add the boxes, the draggable tile, and the script

**🎯 Goal**
Create five drop-zone boxes, put a draggable image tile in the first, and load the JavaScript.

**💡 Concept**
The `draggable="true"` attribute is what makes an element grabbable by the native Drag-and-Drop API. Each `.empty` box is a potential drop target.

**📝 Code**

```html
<!-- goes in index.html (inside <body>) -->
<div class="empty">
  <div class="fill" draggable="true"></div>
</div>
<div class="empty"></div>
<div class="empty"></div>
<div class="empty"></div>
<div class="empty"></div>

<script src="script.js"></script>
```

**🔍 Explanation**

- Five `.empty` boxes act as slots. The first holds a `.fill` tile.
- `draggable="true"` enables dragging on the tile (most elements aren't draggable by default).
- The `<script>` loads last so the elements exist before the script runs.

**✅ Checkpoint**
Reload. You'll see stacked, unstyled boxes — styling comes next.

---

### Step 3: Reset and center the page

**🎯 Goal**
Center the boxes in a row on a steel-blue background.

**💡 Concept**
A flex `<body>` sized to `100vh` centers its children. By default flex lays them out in a row.

**📝 Code**

```css
/* goes in style.css */
* {
  box-sizing: border-box;
}

body {
  background-color: steelblue;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}
```

**🔍 Explanation**

- `box-sizing: border-box` keeps sizing predictable when borders are added.
- The body becomes a full-height flex container centering the boxes on a steel-blue background; `overflow: hidden` and `margin: 0` remove scrollbars and gaps.

**✅ Checkpoint**
Reload. The (still unstyled) boxes are centered as a horizontal row.

---

### Step 4: Style the boxes and the image tile

**🎯 Goal**
Give the boxes their size/border and fill the tile with an image.

**💡 Concept**
The `.fill` tile is slightly smaller than the `.empty` box so it nests neatly inside, and `cursor: pointer` hints that it's grabbable.

**📝 Code**

```css
/* goes in style.css */
.empty {
  height: 150px;
  width: 150px;
  margin: 10px;
  border: solid 3px black;
  background: white;
}

.fill {
  background-image: url('https://source.unsplash.com/random/150x150');
  height: 145px;
  width: 145px;
  cursor: pointer;
}
```

**🔍 Explanation**

- `.empty` is a 150px white square with a black border and spacing between boxes.
- `.fill` loads a random 150×150 Unsplash image and is sized 145px to sit inside the box; `cursor: pointer` signals interactivity.

**✅ Checkpoint**
Reload. Five white bordered boxes appear, the first showing a random photo tile. You can already drag it (native behavior), but nothing reacts yet.

---

### Step 5: Add the drag-state styles and mobile layout

**🎯 Goal**
Define the visual feedback classes and stack the boxes on small screens.

**💡 Concept**
`.hold` and `.hovered` are classes JavaScript will add/remove during a drag to show what's happening. A `@media` query switches to a column layout on narrow screens.

**📝 Code**

```css
/* goes in style.css */
.hold {
  border: solid 5px #ccc;
}

.hovered {
  background-color: #333;
  border-color: white;
  border-style: dashed;
}

@media (max-width: 800px) {
  body {
    flex-direction: column;
  }
}
```

**🔍 Explanation**

- `.hold` gives the tile a gray border the instant a drag starts.
- `.hovered` gives a drop-target box a dark, dashed, white-bordered look while the tile is over it.
- The `@media` query stacks the boxes vertically at 800px wide or less.

> 💡 **Note for later:** you'll see the JS set the tile's class to `invisible`, but there is **no** `.invisible` rule in this CSS. That's intentional — removing the `.fill` class strips its size and image, so the tile visually collapses (appears hidden) during the drag. We'll revisit this in Step 9.

**✅ Checkpoint**
Reload. Looks the same at rest — these classes only show up during dragging, once the JS is wired up.

---

### Step 6: Grab the elements

**🎯 Goal**
Get references to the tile, all the boxes, and the body.

**💡 Concept**
`querySelector` grabs the single `.fill` tile; `querySelectorAll` grabs the list of `.empty` boxes.

**📝 Code**

```js
// goes in script.js
const fill = document.querySelector('.fill')
const empties = document.querySelectorAll('.empty')
const body = document.body
```

**🔍 Explanation**

- `fill` is the draggable image tile.
- `empties` is the list of all five drop-zone boxes.
- `body` is the whole page body — we'll listen for drag events here.

**✅ Checkpoint**
Reload, open the console. No errors means all elements were found.

---

### Step 7: Listen for drag start and end on the body

**🎯 Goal**
Detect when a drag begins and ends anywhere on the page.

**💡 Concept**
Instead of attaching `dragstart`/`dragend` to the tile directly, we listen on `body` — a form of **event delegation** where a parent handles events from its children.

**📝 Code**

```js
// goes in script.js
body.addEventListener('dragstart', dragStart)
body.addEventListener('dragend', dragEnd)
```

**🔍 Explanation**

- `dragstart` fires when the user begins dragging; `dragend` fires when they let go (anywhere).
- Both point to handler functions we'll define in Step 9. (These are `function` declarations, so they're **hoisted** and can be referenced before their definitions appear below.)

**✅ Checkpoint**
No visible change yet — the handlers don't exist until Step 9.

---

### Step 8: Listen for drop events on each box

**🎯 Goal**
Make every box respond to a tile being dragged over and dropped.

**💡 Concept**
Each drop target needs four events: `dragover`, `dragenter`, `dragleave`, and `drop`. We loop over the boxes with `for...of` to attach them.

**📝 Code**

```js
// goes in script.js
for(const empty of empties) {
    empty.addEventListener('dragover', dragOver)
    empty.addEventListener('dragenter', dragEnter)
    empty.addEventListener('dragleave', dragLeave)
    empty.addEventListener('drop', dragDrop)
}
```

**🔍 Explanation**

- `dragover`: fires repeatedly while the tile is over the box.
- `dragenter`: fires once when the tile enters the box.
- `dragleave`: fires when the tile leaves the box.
- `drop`: fires when the tile is released over the box.
- Each is bound to a handler we'll write next.

**✅ Checkpoint**
Still nothing visible — handlers are defined in the next steps.

---

### Step 9: Handle drag start and end

**🎯 Goal**
Mark the tile as "held", hide it during the drag, and restore it afterward.

**💡 Concept**
A guard ensures only the `.fill` tile can start a drag. The `setTimeout(..., 0)` trick lets the browser first capture the drag image, *then* hide the source on the next tick — so the drag preview still shows.

**📝 Code**

```js
// goes in script.js
function dragStart(e) {
    if(!e.target.classList.contains("fill")) {
        e.preventDefault()
        return
    }
    fill.className += ' hold'
    setTimeout(() => fill.className = 'invisible', 0)
}

function dragEnd() {
    fill.className = 'fill'
}
```

**🔍 Explanation**

- `dragStart` first checks the thing being dragged: if it's **not** the `.fill` tile, `e.preventDefault()` cancels the drag and we `return`.
- Otherwise it appends `hold` (adding the gray border) to the tile's classes.
- `setTimeout(() => fill.className = 'invisible', 0)` runs *after* the browser grabs the drag preview, replacing the tile's classes with just `invisible`. Since there's no `.invisible` CSS rule, the tile loses its `.fill` styling (image + size) and effectively disappears from its old spot while being dragged.
- `dragEnd` resets the tile's class back to `fill`, restoring its normal appearance once the drag finishes.

**✅ Checkpoint**
Reload. Start dragging the tile — it briefly gets a gray border and then visually vanishes from the source box while you drag. Release, and it reappears. You can't drop it into a box yet.

---

### Step 10: Handle dragging over the boxes

**🎯 Goal**
Allow drops and highlight the box currently under the tile.

**💡 Concept**
This is the key gotcha of the Drag-and-Drop API: elements reject drops by default. You **must** call `e.preventDefault()` in `dragover` (and here also `dragenter`) to make a box a valid drop target.

**📝 Code**

```js
// goes in script.js
function dragOver(e) {
    e.preventDefault()
}

function dragEnter(e) {
    e.preventDefault()
    this.className += ' hovered'
}

function dragLeave() {
    this.className = 'empty'
}
```

**🔍 Explanation**

- `dragOver` calls `e.preventDefault()` so the browser permits a drop on this box.
- `dragEnter` also prevents the default and appends `hovered`, giving the box its dark dashed highlight. `this` is the box the tile entered.
- `dragLeave` resets the box's class back to `empty`, removing the highlight when the tile moves away.

**✅ Checkpoint**
Reload. Drag the tile over the boxes — each box you hover highlights dark/dashed and clears when you leave. Dropping still doesn't move the tile (one more step).

---

### Step 11: Handle the drop

**🎯 Goal**
Move the tile into the box it's dropped on.

**💡 Concept**
`append` doesn't copy the element — it **moves** it. Appending the existing tile to a new box removes it from its old parent automatically.

**📝 Code**

```js
// goes in script.js
function dragDrop() {
    this.className = 'empty'
    this.append(fill)
}
```

**🔍 Explanation**

- `this.className = 'empty'` clears the `hovered` highlight from the drop target.
- `this.append(fill)` moves the tile into this box. Because `dragEnd` (Step 9) resets the tile's class to `fill`, it regains its image and size in its new home.

**✅ Checkpoint**
Reload. Now you can drag the image tile from box to box and drop it in place. The full drag-and-drop cycle works. Done!

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
    <title>Drag N Drop</title>
  </head>
  <body>
    <div class="empty">
      <div class="fill" draggable="true"></div>
    </div>
    <div class="empty"></div>
    <div class="empty"></div>
    <div class="empty"></div>
    <div class="empty"></div>

    <script src="script.js"></script>
  </body>
</html>
```

### `style.css`

```css
* {
  box-sizing: border-box;
}

body {
  background-color: steelblue;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.empty {
  height: 150px;
  width: 150px;
  margin: 10px;
  border: solid 3px black;
  background: white;
}

.fill {
  background-image: url('https://source.unsplash.com/random/150x150');
  height: 145px;
  width: 145px;
  cursor: pointer;
}

.hold {
  border: solid 5px #ccc;
}

.hovered {
  background-color: #333;
  border-color: white;
  border-style: dashed;
}

@media (max-width: 800px) {
  body {
    flex-direction: column;
  }
}
```

### `script.js`

```js
const fill = document.querySelector('.fill')
const empties = document.querySelectorAll('.empty')
const body = document.body

body.addEventListener('dragstart', dragStart)
body.addEventListener('dragend', dragEnd)

for(const empty of empties) {
    empty.addEventListener('dragover', dragOver)
    empty.addEventListener('dragenter', dragEnter)
    empty.addEventListener('dragleave', dragLeave)
    empty.addEventListener('drop', dragDrop)
}

function dragStart(e) {
    if(!e.target.classList.contains("fill")) {
        e.preventDefault()
        return
    }
    fill.className += ' hold' 
    setTimeout(() => fill.className = 'invisible', 0)
}

function dragEnd() {
    fill.className = 'fill'
}

function dragOver(e) {
    e.preventDefault()
}

function dragEnter(e) {
    e.preventDefault()
    this.className += ' hovered'
}

function dragLeave() {
    this.className = 'empty'
}

function dragDrop() {
    this.className = 'empty'
    this.append(fill)
}
```

## 6. Recap & Next Steps

**What you learned**

- The HTML5 Drag-and-Drop event lifecycle: `dragstart`, `dragend`, `dragover`, `dragenter`, `dragleave`, `drop`.
- Why `preventDefault()` in `dragover`/`dragenter` is required to allow a drop.
- Making an element draggable with the `draggable` attribute.
- Giving drag feedback by swapping classes, including the `.invisible` "collapse" trick.
- Moving a DOM node between parents with `append`.
- Event delegation by listening on `document.body`.

**Enhancement challenges**

1. **Multiple tiles:** add several `.fill` tiles and make each one independently draggable (hint: `dragStart` currently references the single `fill` variable).
2. **Swap instead of block:** if you drop onto an occupied box, swap the two tiles rather than nesting them.
3. **Clean visibility:** add a real `.invisible { opacity: 0 }` (or `visibility: hidden`) rule instead of relying on the missing class.
4. **Persist positions:** remember where each tile ended up using `localStorage`.
5. **Touch support:** the native API is mouse-only; research a pointer-events approach to make it work on touchscreens.
