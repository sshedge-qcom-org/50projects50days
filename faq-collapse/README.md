# Faq Collapse

## 1. Project Overview

A **FAQ accordion**: a list of questions where clicking a button on any card expands it to reveal the answer (and collapses it again on a second click).

**Key concepts involved:**

- DOM selection of multiple elements (`querySelectorAll`)
- Looping over a NodeList to attach event listeners
- Toggling a CSS class to drive UI state (the "active" pattern)
- Walking the DOM tree with `parentNode`
- Showing/hiding content and swapping icons purely with CSS

**HTML skills you'll gain:**

- Structuring repeated "card" components with consistent class names
- Loading an icon font (Font Awesome) from a CDN
- Placing icons inside a `<button>` with `<i>` tags

**CSS skills you'll gain:**

- The **active-class** pattern: styling an element differently when it has an extra class
- `::before` / `::after` pseudo-elements to draw decorative icon "watermarks"
- Toggling visibility with `display: none` / `display: block` via a parent class
- Absolute positioning of a button inside a `position: relative` card
- Smooth `transition`s

**JavaScript skills you'll gain:**

- Selecting many elements at once with `document.querySelectorAll`
- Iterating with `forEach`
- `addEventListener('click', ...)`
- Reaching a clicked element's parent with `.parentNode`
- `classList.toggle()`

---

## 2. Final Project Preview

**Layout & colors:** A centered column (max 600px wide) on a light grey page. A heading reads "Frequently Asked Questions". Below it sit five rounded, grey-bordered cards. Each card shows a question in bold and a round toggle button in the top-right corner.

**Behavior & interactions:**

- Every card has a circular button showing a **chevron-down** icon (▼).
- Clicking that button **expands** the card: it turns white, gains a soft shadow, reveals the answer text, shows two faint quote-mark icons as a background watermark, and the button swaps to an **X** icon on a grey background.
- Clicking the button again **collapses** the card back to its original look.
- The first card starts already expanded.

**What you can interact with:** the round toggle button on each of the five cards.

---

## 3. Prerequisites

**You should know:** basic HTML tags, basic CSS selectors/properties, and basic JavaScript (variables, functions, arrow functions).

**Tools needed:**

- A modern web browser (Chrome, Firefox, Edge…)
- A text editor (VS Code, etc.)
- Optional but recommended: the **Live Server** VS Code extension for auto-reload

**Files to create:**

```
faq-collapse/
├── index.html
├── style.css
└── script.js
```

Create these three files empty, then follow along.

---

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML skeleton

**🎯 Goal**
Start every web page with a valid HTML5 document so the browser knows how to render it.

**💡 Concept**
The boilerplate (`<!DOCTYPE html>`, `<head>`, `<body>`) is the required scaffold of any page. `<meta>` tags set character encoding and mobile scaling.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FAQ</title>
  </head>
  <body>
  </body>
</html>
```

**🔍 Explanation**

- `<!DOCTYPE html>` tells the browser to use modern (HTML5) rendering.
- `lang="en"` declares the page language for accessibility/search engines.
- `charset="UTF-8"` supports all common characters.
- The `viewport` meta makes the page scale correctly on phones.
- `<title>` sets the browser-tab text.

**✅ Checkpoint**
Open `index.html` in your browser. You'll see a blank page with "FAQ" in the tab title.

---

### Step 2: Link the icon font and stylesheet

**🎯 Goal**
Pull in the Font Awesome icon library and our own stylesheet so we can use icons and custom styles.

**💡 Concept**
A **CDN** (Content Delivery Network) lets us load a library from an external URL instead of installing it. Font Awesome gives us scalable vector icons we reference by class name (e.g. `fa-chevron-down`).

**📝 Code**

```html
<!-- goes in index.html, inside <head> above the <title> -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog==" crossorigin="anonymous" />
<link rel="stylesheet" href="style.css" />
```

**🔍 Explanation**

- The first `<link>` loads Font Awesome 5. The `integrity` + `crossorigin` attributes let the browser verify the file hasn't been tampered with (Subresource Integrity).
- The second `<link>` loads our local `style.css`. Order matters: our file comes **after** Font Awesome so we can override it if needed.

**✅ Checkpoint**
Still a blank page (we haven't added content), but the libraries are now available. No errors should appear in the browser console (press F12 → Console).

---

### Step 3: Add the page heading

**🎯 Goal**
Give the page a visible title.

**💡 Concept**
`<h1>` is the top-level heading — one per page, describing its main purpose.

**📝 Code**

```html
<!-- goes in index.html, inside <body> -->
<h1>Frequently Asked Questions</h1>
```

**🔍 Explanation**
A single heading element. We'll center and space it with CSS later.

**✅ Checkpoint**
Refresh — you should see the large text "Frequently Asked Questions" in the top-left.

---

### Step 4: Build the first FAQ card

**🎯 Goal**
Create the repeatable structure of one FAQ item: question, answer, and a toggle button.

**💡 Concept**
Each card is a `<div class="faq">`. We give the **first** one an extra `active` class so it starts open — this is the class our CSS and JS will switch on and off. The button holds **two** icons; CSS will show only the correct one based on the card's state.

**📝 Code**

```html
<!-- goes in index.html, below the <h1> -->
<div class="faq-container">
  <div class="faq active">
    <h3 class="faq-title">
      Why shouldn't we trust atoms?
    </h3>

    <p class="faq-text">
      They make up everything
    </p>

    <button class="faq-toggle">
      <i class="fas fa-chevron-down"></i>
      <i class="fas fa-times"></i>
    </button>
  </div>
</div>
```

**🔍 Explanation**

- `.faq-container` wraps and centers all cards.
- `.faq` is one card; `active` marks it as currently open.
- `.faq-title` is the question, `.faq-text` is the answer.
- `.faq-toggle` is the button. It contains **both** the down-chevron (`fa-chevron-down`) and the times/X (`fa-times`) icon. `fas` is the "solid" Font Awesome style.

**✅ Checkpoint**
You'll see the question, the answer, and two icons stacked (unstyled for now). Everything is visible because we haven't added CSS yet.

---

### Step 5: Add the remaining FAQ cards

**🎯 Goal**
Fill out the accordion with the other four questions.

**💡 Concept**
Reusing the exact same structure keeps our CSS and JS working for every card with zero extra code. Note these cards do **not** get the `active` class, so they'll start closed.

**📝 Code**

```html
<!-- goes in index.html, inside .faq-container, after the first .faq -->
<div class="faq">
  <h3 class="faq-title">
    What do you call someone with no body and no nose?
  </h3>
  <p class="faq-text">
    Nobody knows.
  </p>
  <button class="faq-toggle">
    <i class="fas fa-chevron-down"></i>
    <i class="fas fa-times"></i>
  </button>
</div>

<div class="faq">
  <h3 class="faq-title">
    What's the object-oriented way to become wealthy?
  </h3>
  <p class="faq-text">
    Inheritance.
  </p>
  <button class="faq-toggle">
    <i class="fas fa-chevron-down"></i>
    <i class="fas fa-times"></i>
  </button>
</div>

<div class="faq">
  <h3 class="faq-title">
    How many tickles does it take to tickle an octopus?
  </h3>
  <p class="faq-text">
    Ten-tickles!
  </p>
  <button class="faq-toggle">
    <i class="fas fa-chevron-down"></i>
    <i class="fas fa-times"></i>
  </button>
</div>

<div class="faq">
  <h3 class="faq-title">
    What is: 1 + 1?
  </h3>
  <p class="faq-text">
    Depends on who are you asking.
  </p>
  <button class="faq-toggle">
    <i class="fas fa-chevron-down"></i>
    <i class="fas fa-times"></i>
  </button>
</div>
```

**🔍 Explanation**
Four more identical cards, only the text differs. They lack `active`, so once we add CSS they'll appear collapsed.

**✅ Checkpoint**
Five questions and their answers now appear one after another (still unstyled).

---

### Step 6: Base styles — font, box model, and background

**🎯 Goal**
Set the page font, a sane box model, and the light-grey background.

**💡 Concept**
`@import` pulls a Google Font into CSS. `box-sizing: border-box` on `*` makes width/height include padding and borders — the single most useful CSS reset for predictable layouts.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

* {
  box-sizing: border-box;
}

body {
  font-family: 'Muli', sans-serif;
  background-color: #f0f0f0;
}
```

**🔍 Explanation**

- `@import` must be the very first line of the stylesheet; it loads the "Muli" font.
- The `*` (universal) selector applies `border-box` everywhere.
- `body` sets the font and a soft grey page background.

**✅ Checkpoint**
Refresh — the text now uses the Muli font and the page background turns light grey.

---

### Step 7: Center the heading and the container

**🎯 Goal**
Space out the title and center the FAQ column on the page.

**💡 Concept**
`margin: 0 auto` centers a block element that has a fixed/max width. `max-width` keeps the column readable on wide screens.

**📝 Code**

```css
/* goes in style.css */
h1 {
  margin: 50px 0 30px;
  text-align: center;
}

.faq-container {
  max-width: 600px;
  margin: 0 auto;
}
```

**🔍 Explanation**

- `h1` gets top/bottom breathing room and is centered.
- `.faq-container` never grows past 600px wide, and `margin: 0 auto` centers it horizontally.

**✅ Checkpoint**
The heading is centered and the cards form a neat centered column.

---

### Step 8: Style the FAQ card

**🎯 Goal**
Turn each `.faq` into a rounded, bordered card.

**💡 Concept**
`position: relative` on the card creates a **positioning context** — later we'll absolutely position the toggle button relative to this card. `overflow: hidden` clips the decorative watermark we'll add. `transition` animates changes smoothly.

**📝 Code**

```css
/* goes in style.css */
.faq {
  background-color: transparent;
  border: 1px solid #9fa4a8;
  border-radius: 10px;
  margin: 20px 0;
  padding: 30px;
  position: relative;
  overflow: hidden;
  transition: 0.3s ease;
}
```

**🔍 Explanation**

- Transparent background + grey border + rounded corners = a subtle card.
- `padding: 30px` gives interior space.
- `position: relative` anchors absolutely-positioned children.
- `overflow: hidden` hides anything spilling outside the rounded box.
- `transition: 0.3s ease` smooths any style change (like turning white).

**✅ Checkpoint**
Each question now sits in its own rounded, outlined box.

---

### Step 9: Style the active (open) card

**🎯 Goal**
Make an open card visually stand out.

**💡 Concept**
This is the **active-class pattern**: `.faq.active` matches an element that has *both* classes. Only cards currently open get this treatment.

**📝 Code**

```css
/* goes in style.css */
.faq.active {
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
}
```

**🔍 Explanation**
When a card has the `active` class, it turns white and gains a soft drop shadow (two stacked shadows for a slightly deeper effect).

**✅ Checkpoint**
The first card (the one with `active` in the HTML) is now white with a shadow; the others stay transparent.

---

### Step 10: Add decorative quote-mark watermarks

**🎯 Goal**
Draw two large, faint quote icons in the background of an open card.

**💡 Concept**
`::before` and `::after` are **pseudo-elements** — extra elements CSS generates without adding HTML. We set their `content` to a Font Awesome icon's Unicode value (`\f075` is the "comment" glyph) and pick the icon font by name.

**📝 Code**

```css
/* goes in style.css */
.faq.active::before,
.faq.active::after {
  content: '\f075';
  font-family: 'Font Awesome 5 Free';
  color: #2ecc71;
  font-size: 7rem;
  position: absolute;
  opacity: 0.2;
  top: 20px;
  left: 20px;
  z-index: 0;
}

.faq.active::before {
  color: #3498db;
  top: -10px;
  left: -30px;
  transform: rotateY(180deg);
}
```

**🔍 Explanation**

- Both pseudo-elements render a big, 20%-opacity quote glyph, absolutely positioned inside the card (which is why `overflow: hidden` earlier clips them).
- The `::before` one is recolored blue, nudged to a different spot, and flipped horizontally with `rotateY(180deg)` so the two marks mirror each other.

**✅ Checkpoint**
The open (first) card now shows two faint quote-bubble icons behind its text.

---

### Step 11: Style the question and answer

**🎯 Goal**
Space the question and hide the answer until the card is open.

**💡 Concept**
Hiding the answer with `display: none` and revealing it only under `.faq.active` is what makes the accordion collapse/expand. The parent's class controls the child's visibility.

**📝 Code**

```css
/* goes in style.css */
.faq-title {
  margin: 0 35px 0 0;
}

.faq-text {
  display: none;
  margin: 30px 0 0;
}

.faq.active .faq-text {
  display: block;
}
```

**🔍 Explanation**

- `.faq-title` gets right margin so it never overlaps the toggle button.
- `.faq-text` is hidden by default (`display: none`).
- `.faq.active .faq-text` reveals the answer **only** when the card is active.

**✅ Checkpoint**
Only the first card shows its answer; the other four now hide their answers.

---

### Step 12: Position and style the toggle button

**🎯 Goal**
Pin the round button to the top-right corner of each card.

**💡 Concept**
`position: absolute` with `top`/`right` places the button relative to its nearest positioned ancestor — the `.faq` card (which we made `relative` in Step 8).

**📝 Code**

```css
/* goes in style.css */
.faq-toggle {
  background-color: transparent;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  padding: 0;
  position: absolute;
  top: 30px;
  right: 30px;
  height: 30px;
  width: 30px;
}

.faq-toggle:focus {
  outline: 0;
}
```

**🔍 Explanation**

- The button is a 30×30 circle (`border-radius: 50%`), transparent with no border.
- `display: flex` + centering keeps its icon dead-center.
- `position: absolute; top: 30px; right: 30px` parks it in the card's corner.
- `:focus { outline: 0 }` removes the default focus ring (a stylistic choice).

**✅ Checkpoint**
Each card now has a small round button in the top-right corner (showing both icons stacked for now).

---

### Step 13: Swap the button icons based on state

**🎯 Goal**
Show the chevron when closed and the X when open, and shade the open button.

**💡 Concept**
We keep both icons in the HTML and use CSS to reveal only the right one, again driven by the parent's `active` class. This avoids any JavaScript for the icon swap.

**📝 Code**

```css
/* goes in style.css */
.faq-toggle .fa-times {
  display: none;
}

.faq.active .faq-toggle .fa-times {
  color: #fff;
  display: block;
}

.faq.active .faq-toggle .fa-chevron-down {
  display: none;
}

.faq.active .faq-toggle {
  background-color: #9fa4a8;
}
```

**🔍 Explanation**

- By default the X (`fa-times`) is hidden, so only the chevron shows.
- When the card is `active`: the X appears (white), the chevron hides, and the button gets a grey background.

**✅ Checkpoint**
The first (open) card's button shows a white **X** on grey; the other four show a **chevron-down**. The visual accordion is complete — now we make it clickable.

---

### Step 14: Wire up the toggle in JavaScript

**🎯 Goal**
Make clicking a button open or close its card.

**💡 Concept**
`querySelectorAll` returns **all** matching buttons. We loop with `forEach` and attach a click listener to each. Inside, `toggle.parentNode` is the `.faq` card that contains the button, and `classList.toggle('active')` adds the class if missing or removes it if present.

**📝 Code**
First, load the script (add just before the closing `</body>` tag):

```html
<!-- goes in index.html, just before </body> -->
<script src="script.js"></script>
```

Then the logic:

```js
// goes in script.js
const toggles = document.querySelectorAll('.faq-toggle')

toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        toggle.parentNode.classList.toggle('active')
    })
})
```

**🔍 Explanation**

- Placing `<script>` at the end of the body ensures the elements exist before the script runs.
- `document.querySelectorAll('.faq-toggle')` grabs all five buttons.
- `.forEach` runs the callback once per button.
- On click, `toggle.parentNode` walks up to the `<div class="faq">`, and `classList.toggle('active')` flips it open/closed — which triggers every `.faq.active` CSS rule we wrote.

**✅ Checkpoint**
Click any button: its card expands (turns white, shows the answer and watermark, button becomes an X). Click again to collapse. The first card can be toggled shut too. 🎉

---

## 5. Final Full Code (Reference)

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog==" crossorigin="anonymous" />
    <link rel="stylesheet" href="style.css" />
    <title>FAQ</title>
  </head>
  <body>
    <h1>Frequently Asked Questions</h1>
    <div class="faq-container">
      <div class="faq active">
        <h3 class="faq-title">
          Why shouldn't we trust atoms?
        </h3>

        <p class="faq-text">
          They make up everything
        </p>

        <button class="faq-toggle">
          <i class="fas fa-chevron-down"></i>
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="faq">
        <h3 class="faq-title">
          What do you call someone with no body and no nose?
        </h3>
        <p class="faq-text">
          Nobody knows.
        </p>
        <button class="faq-toggle">
          <i class="fas fa-chevron-down"></i>
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <div class="faq">
        <h3 class="faq-title">
          What's the object-oriented way to become wealthy?
        </h3>
        <p class="faq-text">
          Inheritance.
        </p>
        <button class="faq-toggle">
          <i class="fas fa-chevron-down"></i>
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <div class="faq">
        <h3 class="faq-title">
          How many tickles does it take to tickle an octopus?
        </h3>
        <p class="faq-text">
          Ten-tickles!
        </p>
        <button class="faq-toggle">
          <i class="fas fa-chevron-down"></i>
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <div class="faq">
        <h3 class="faq-title">
          What is: 1 + 1?
        </h3>
        <p class="faq-text">
          Depends on who are you asking.
        </p>
        <button class="faq-toggle">
          <i class="fas fa-chevron-down"></i>
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

**style.css**

```css
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

* {
  box-sizing: border-box;
}

body {
  font-family: 'Muli', sans-serif;
  background-color: #f0f0f0;
}

h1 {
  margin: 50px 0 30px;
  text-align: center;
}

.faq-container {
  max-width: 600px;
  margin: 0 auto;
}

.faq {
  background-color: transparent;
  border: 1px solid #9fa4a8;
  border-radius: 10px;
  margin: 20px 0;
  padding: 30px;
  position: relative;
  overflow: hidden;
  transition: 0.3s ease;
}

.faq.active {
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
}

.faq.active::before,
.faq.active::after {
  content: '\f075';
  font-family: 'Font Awesome 5 Free';
  color: #2ecc71;
  font-size: 7rem;
  position: absolute;
  opacity: 0.2;
  top: 20px;
  left: 20px;
  z-index: 0;
}

.faq.active::before {
  color: #3498db;
  top: -10px;
  left: -30px;
  transform: rotateY(180deg);
}

.faq-title {
  margin: 0 35px 0 0;
}

.faq-text {
  display: none;
  margin: 30px 0 0;
}

.faq.active .faq-text {
  display: block;
}

.faq-toggle {
  background-color: transparent;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  padding: 0;
  position: absolute;
  top: 30px;
  right: 30px;
  height: 30px;
  width: 30px;
}

.faq-toggle:focus {
  outline: 0;
}

.faq-toggle .fa-times {
  display: none;
}

.faq.active .faq-toggle .fa-times {
  color: #fff;
  display: block;
}

.faq.active .faq-toggle .fa-chevron-down {
  display: none;
}

.faq.active .faq-toggle {
  background-color: #9fa4a8;
}
```

**script.js**

```js
const toggles = document.querySelectorAll('.faq-toggle')

toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        toggle.parentNode.classList.toggle('active')
    })
})
```

---

## 6. Recap & Next Steps

**What you learned:**

- The **active-class pattern**: JavaScript flips one class, and CSS does all the visual heavy lifting.
- Selecting many elements with `querySelectorAll` and looping with `forEach`.
- Reaching a clicked element's container with `.parentNode` and flipping state with `classList.toggle()`.
- Using `::before`/`::after` pseudo-elements and Font Awesome Unicode glyphs for decoration.
- Showing/hiding content and swapping icons entirely through CSS descendant selectors.

**Enhancement challenges:**

1. **Accordion mode:** make opening one card automatically close all others (loop the cards, remove `active` from each, then add it back to the clicked one).
2. **Keyboard access:** ensure the toggle works with Enter/Space and add a visible focus style for accessibility.
3. **Animate the height:** replace `display: none/block` with a `max-height` transition so answers slide open smoothly.
4. **Data-driven cards:** store the questions/answers in a JavaScript array and generate the cards dynamically instead of hard-coding them.
5. **Rotate the chevron:** instead of swapping to an X, rotate the chevron 180° when open using a CSS `transform` transition.
