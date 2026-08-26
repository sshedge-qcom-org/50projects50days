# Feedback Ui Design

## 1. Project Overview

The **Feedback UI** is a compact review card that asks how satisfied a user is with customer support. The user picks one of three emoji ratings (Unhappy / Neutral / Satisfied) and clicks a button; the whole card then swaps to a "Thank You" message showing the chosen rating.

**Key concepts involved:**

- **Event delegation** (one listener on a parent handles clicks on many children)
- DOM traversal with `parentNode`, `nextElementSibling`, `previousElementSibling`
- Tracking a piece of **state** (`selectedRating`) in a variable
- Replacing a whole section of the page with `innerHTML`
- Toggling an `active` class to show the current selection

**HTML skills you'll gain:**

- Loading an icon library (Font Awesome) from a CDN
- Structuring a repeated "option" component (image + label)
- Marking a default-selected option in the markup

**CSS skills you'll gain:**

- Centering a card with Flexbox
- Building an evenly-spaced row of options with `flex: 1`
- Using the **same styles for `:hover` and `.active`** so the selected item looks "hovered"
- Subtle press feedback with `transform: scale()` on `:active`

**JavaScript skills you'll gain:**

- Why event delegation beats attaching a listener to every option
- Figuring out *what was clicked* and walking to its sibling/parent
- Guarding logic with `nodeName` and sibling checks
- Storing and later reading a selection to build a dynamic message

---

## 2. Final Project Preview

**The UI:** A white, rounded, shadowed card centered on a warm off-white page. At the top is a bold two-line question: "How satisfied are you with our customer support performance?". Below it sits a row of three equally sized options, each an emoji image above a label: **Unhappy**, **Neutral**, and **Satisfied**. By default, "Satisfied" is highlighted with a soft shadow. A dark "Send Review" button sits at the bottom.

**The behavior:**

- Hovering over any rating gives it a soft shadow (a "raised" look).
- Clicking a rating (either its emoji or its label) selects it — the shadow now stays on that option, and it becomes the remembered choice.
- Clicking **Send Review** replaces the entire card with a red heart icon, a "Thank You!" message, the feedback you chose (e.g. "Feedback: Satisfied"), and a short thank-you paragraph.

**What you can interact with:**

- The **three rating options** (click to select).
- The **Send Review button** (click to submit and see the thank-you screen).

---

## 3. Prerequisites

**Basic knowledge required:** Comfortable reading HTML/CSS and basic JavaScript (variables, functions, `if`). No experience with event delegation needed — that's the star of this build.

**Tools needed:**

- A modern web browser
- A text editor (VS Code recommended)
- An **internet connection** (icons and the emoji images load from the web)
- Optional: the **Live Server** VS Code extension

**Files to create:**

```
feedback-ui-design/
├── index.html
├── style.css
└── script.js
```

---

## 4. Build the Project Step-by-Step

### Step 1: HTML Skeleton with Font Awesome

**🎯 Goal**
Create the base document and load the Font Awesome icon library we'll need for the heart icon on the thank-you screen.

**💡 Concept**
A **CDN** (Content Delivery Network) link lets us use a library hosted elsewhere without downloading it. Font Awesome gives us scalable icons via simple `<i>` tags.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog==" crossorigin="anonymous" />
    <link rel="stylesheet" href="style.css" />
    <title>Let Us Know Your Feedback</title>
  </head>
  <body>
    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**

- The first `<link>` pulls in Font Awesome 5.14 from a CDN. The `integrity` and `crossorigin` attributes are a security feature ensuring the file wasn't tampered with.
- The second `<link>` is our own stylesheet.
- The `<script>` sits at the end of the body so the HTML exists before our JS runs.

**✅ Checkpoint**
Open `index.html`. Blank page, tab titled "Let Us Know Your Feedback", no console errors.

---

### Step 2: Add the Panel and the Question

**🎯 Goal**
Create the card container and the satisfaction question.

**💡 Concept**
We give the outer `<div>` both an `id` (`panel`, a unique JS hook) and a `class` (`panel-container`, for styling). Using `<strong>` marks the question as important text.

**📝 Code**

```html
<!-- goes in index.html — inside <body>, above the <script> -->
<div id="panel" class="panel-container">
  <strong>How satisfied are you with our <br /> customer support performance?</strong>
</div>
```

**🔍 Explanation**

- `id="panel"` — JavaScript will later replace everything inside this element with the thank-you message.
- `class="panel-container"` — the styling hook for the card.
- The `<br />` forces the question onto two lines.

**✅ Checkpoint**
Refresh. You'll see the bold question text (unstyled) in the top-left of the page.

---

### Step 3: Add the Three Rating Options

**🎯 Goal**
Build the row of three emoji ratings, with "Satisfied" pre-selected.

**💡 Concept**
Each rating is the **same little component**: an emoji `<img>` above a `<small>` label. We add the `active` class to the third one so the app starts with a default selection ("Satisfied").

**📝 Code**

```html
<!-- goes in index.html — inside the .panel-container, after the <strong> -->
<div class="ratings-container">
  <div class="rating">
    <img src="https://img.icons8.com/external-neu-royyan-wijaya/64/000000/external-emoji-neumojis-smiley-neu-royyan-wijaya-17.png" alt="">
    <small>Unhappy</small>
  </div>

  <div class="rating">
    <img src="https://img.icons8.com/external-neu-royyan-wijaya/64/000000/external-emoji-neumojis-smiley-neu-royyan-wijaya-3.png" alt=""/>
    <small>Neutral</small>
  </div>

  <div class="rating active">
    <img src="https://img.icons8.com/external-neu-royyan-wijaya/64/000000/external-emoji-neumojis-smiley-neu-royyan-wijaya-30.png" alt=""/>
    <small>Satisfied</small>
  </div>
</div>
```

**🔍 Explanation**

- `.ratings-container` wraps all three options (we'll make it a flex row later).
- Each `.rating` holds an `<img>` (the emoji) and a `<small>` (the label). **This exact order — image then label — is what our JavaScript relies on.**
- The third rating has `class="rating active"` — a default selection, matching the `selectedRating = 'Satisfied'` we'll set in JS.

**✅ Checkpoint**
Refresh. Three emoji faces appear in a stack with their labels, still unstyled.

---

### Step 4: Add the Send Button

**🎯 Goal**
Add the submit button that triggers the thank-you screen.

**💡 Concept**
The button gets `id="send"` so JavaScript can attach a click handler to this exact element.

**📝 Code**

```html
<!-- goes in index.html — inside the .panel-container, after the .ratings-container -->
<button class="btn" id="send">Send Review</button>
```

**🔍 Explanation**

- `class="btn"` for styling, `id="send"` as the JavaScript hook.
- It lives *inside* `#panel`, which matters: when we later overwrite `#panel`'s contents, this button gets replaced too.

**✅ Checkpoint**
Refresh. A plain "Send Review" button appears below the emojis.

---

### Step 5: Reset and Center the Page

**🎯 Goal**
Import the font, fix the box model, and center the card on screen.

**💡 Concept**
Same centering recipe as many small apps: `box-sizing: border-box` for predictable sizing, and a full-height Flexbox `body` to center its child.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #fef9f2;
  font-family: 'Montserrat', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}
```

**🔍 Explanation**

- `@import` loads the **Montserrat** font — keep it as the first CSS line.
- `* { box-sizing: border-box }` makes widths include padding/border.
- The `body` becomes a full-viewport (`height: 100vh`) flex container that centers content both ways. `overflow: hidden` and `margin: 0` clean up scrollbars and default spacing.

**✅ Checkpoint**
Refresh. The font changes to Montserrat, the background is a warm cream, and the content centers on the page.

---

### Step 6: Style the Card

**🎯 Goal**
Turn the plain `<div>` into a white, rounded, centered card.

**💡 Concept**
Making the card itself a **column** flexbox lets us center the question, ratings, and button vertically and horizontally within the card.

**📝 Code**

```css
/* goes in style.css */
.panel-container {
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  font-size: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 30px;
  max-width: 400px;
}

.panel-container strong {
  line-height: 20px;
}
```

**🔍 Explanation**

- White background, soft shadow all around (`0 0 10px`), and rounded corners create the card look.
- `display: flex; flex-direction: column` stacks the children vertically; `justify-content`/`align-items: center` + `text-align: center` center everything.
- `max-width: 400px` stops the card from getting too wide; `padding: 30px` gives inner space.
- `line-height: 20px` tightens the spacing of the two-line question.

**✅ Checkpoint**
Refresh. Everything is now inside a neat, centered white card.

---

### Step 7: Lay Out the Rating Options

**🎯 Goal**
Put the three ratings in an even horizontal row and size the emojis.

**💡 Concept**
`flex: 1` on each `.rating` makes all three share the row width **equally**. `cursor: pointer` signals they're clickable.

**📝 Code**

```css
/* goes in style.css */
.ratings-container {
  display: flex;
  margin: 20px 0;
}

.rating {
  flex: 1;
  cursor: pointer;
  padding: 20px;
  margin: 10px 5px;
}

.rating img {
  width: 40px;
}

.rating small {
  color: #555;
  display: inline-block;
  margin: 10px 0 0;
}
```

**🔍 Explanation**

- `.ratings-container { display: flex }` places the ratings side by side.
- `.rating { flex: 1 }` gives each option an equal slice of the row. `cursor: pointer` shows a hand cursor. `padding`/`margin` space them out.
- `.rating img { width: 40px }` sizes the emoji.
- `.rating small` styles the label (muted grey, spaced below the emoji).

**✅ Checkpoint**
Refresh. The three ratings now sit in a tidy, evenly-spaced row with their labels beneath.

---

### Step 8: Highlight Hovered and Active Ratings

**🎯 Goal**
Make a rating look "raised" both when hovered and when selected.

**💡 Concept**
By listing `:hover` and `.active` together in one rule, hovering and selecting produce the **identical** look. That's how the pre-selected "Satisfied" appears highlighted from the start, and how a click "sticks."

**📝 Code**

```css
/* goes in style.css */
.rating:hover,
.rating.active {
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.rating:hover small,
.rating.active small {
  color: #111;
}
```

**🔍 Explanation**

- The first rule gives a rounded, softly-shadowed box to any rating that is either hovered **or** has the `active` class.
- The second rule darkens the label text in those same states, making the selected/hovered option pop.
- This is the visual payoff of the `active` class our JavaScript will move around.

**✅ Checkpoint**
Refresh. "Satisfied" starts highlighted. Hover the others — they highlight too, then drop back when you move away.

---

### Step 9: Style the Button and Heart Icon

**🎯 Goal**
Style the dark submit button and pre-style the heart icon that will appear after submitting.

**💡 Concept**
Even though the heart isn't on the page yet, we can define `.fa-heart` now so it's ready the moment JavaScript injects it. `transform: scale(0.98)` on `:active` gives a satisfying "press" effect.

**📝 Code**

```css
/* goes in style.css */
.btn {
  background-color: #302d2b;
  color: #fff;
  border: 0;
  border-radius: 4px;
  padding: 12px 30px;
  cursor: pointer;
}

.btn:focus {
  outline: 0;
}

.btn:active {
  transform: scale(0.98);
}

.fa-heart {
  color: red;
  font-size: 30px;
  margin-bottom: 10px;
}
```

**🔍 Explanation**

- `.btn` is a dark, rounded, padded button with a pointer cursor.
- `.btn:focus { outline: 0 }` removes the default focus ring; `.btn:active { transform: scale(0.98) }` shrinks it slightly while pressed.
- `.fa-heart` styles the Font Awesome heart (red, large, with spacing) for the thank-you screen we'll build in JS.

**✅ Checkpoint**
Refresh. The button is now dark and styled; press it to feel the subtle shrink. The UI is visually complete — time for interactivity.

---

### Step 10: Grab Elements and Set the Default State

**🎯 Goal**
Reference the DOM elements we need and store the starting selection.

**💡 Concept**
`querySelectorAll('.rating')` returns **all** matching elements (a NodeList); `querySelector` returns just the first match. We also create `selectedRating` — a variable holding the current choice, our piece of **state**.

**📝 Code**

```js
// goes in script.js
const ratings = document.querySelectorAll('.rating')
const ratingsContainer = document.querySelector('.ratings-container')
const sendBtn = document.querySelector('#send')
const panel = document.querySelector('#panel')
let selectedRating = 'Satisfied'
```

**🔍 Explanation**

- `ratings` — all three `.rating` divs (used later to clear the `active` class from all of them).
- `ratingsContainer` — the parent of the ratings; we'll attach **one** click listener here.
- `sendBtn` and `panel` — the button and the whole card.
- `selectedRating = 'Satisfied'` starts as `let` (it will change) and matches the `active` rating we hard-coded in the HTML.

**✅ Checkpoint**
No visual change. Console should be error-free.

---

### Step 11: Listen on the Container (Event Delegation)

**🎯 Goal**
Attach a single click listener to the container and handle a click on a rating's **emoji**.

**💡 Concept**
**Event delegation** means putting one listener on a parent instead of one on each child. When you click, the event "bubbles up" to the parent, and `e.target` tells us exactly which inner element was clicked. We then inspect `e.target` to decide what to do. Here we handle the case where the emoji `<img>` was clicked: its parent is a `.rating`, and its `nextElementSibling` is the `<small>` label.

**📝 Code**

```js
// goes in script.js
ratingsContainer.addEventListener('click', (e) => {
    if(e.target.parentNode.classList.contains('rating') && e.target.nextElementSibling) {
        removeActive()
        e.target.parentNode.classList.add('active')
        selectedRating = e.target.nextElementSibling.innerHTML
    }
})
```

**🔍 Explanation**

- `ratingsContainer.addEventListener('click', ...)` — one listener covers all ratings.
- `e.target` is the exact element clicked. If it's the emoji `<img>`, then:
  - `e.target.parentNode.classList.contains('rating')` confirms the click landed inside a `.rating`.
  - `e.target.nextElementSibling` is truthy because the `<img>` is followed by a `<small>`.
- `removeActive()` (defined soon) clears any existing highlight, then we add `active` to the clicked rating and read the label text via `nextElementSibling.innerHTML` into `selectedRating`.

**✅ Checkpoint**
Refresh, then click an emoji **face**. Console shows `removeActive is not defined` — expected; we write it in Step 13. Clicking the label (text) does nothing yet — that's the next step.

---

### Step 12: Also Handle Clicks on the Label

**🎯 Goal**
Let clicking the text label (not just the emoji) select a rating too.

**💡 Concept**
If the user clicks the `<small>` label, the checks differ: its `previousElementSibling` is the `<img>`. We confirm this by checking `nodeName === 'IMG'`. This second branch makes the whole option clickable, not just the picture.

**📝 Code**

```js
// goes in script.js — replace the single-branch if with this if/else if
ratingsContainer.addEventListener('click', (e) => {
    if(e.target.parentNode.classList.contains('rating') && e.target.nextElementSibling) {
        removeActive()
        e.target.parentNode.classList.add('active')
        selectedRating = e.target.nextElementSibling.innerHTML
    } else if(
        e.target.parentNode.classList.contains('rating') &&
        e.target.previousSibling &&
        e.target.previousElementSibling.nodeName === 'IMG'
    ) {
        removeActive()
        e.target.parentNode.classList.add('active')
        selectedRating = e.target.innerHTML
    }

})
```

**🔍 Explanation**

- The **first branch** (unchanged) handles clicking the emoji `<img>`.
- The **`else if` branch** handles clicking the `<small>` label:
  - `e.target.parentNode.classList.contains('rating')` — still inside a rating.
  - `e.target.previousSibling` — there's *something* before it.
  - `e.target.previousElementSibling.nodeName === 'IMG'` — and that previous **element** is the emoji, confirming we clicked the label.
- In this case the clicked element itself *is* the label, so `selectedRating = e.target.innerHTML`.
- **Gotcha:** clicking the empty padding around the image/label sets `e.target` to the `.rating` div itself — whose parent is the *container*, not a `.rating` — so neither branch runs and nothing changes. That's intentional.

**✅ Checkpoint**
Refresh. Still an error about `removeActive` — but note both the emoji and its label are now wired. Let's define `removeActive`.

---

### Step 13: Clear the Previous Selection

**🎯 Goal**
Write the helper that removes `active` from every rating before we highlight the newly clicked one.

**💡 Concept**
Because only **one** rating should be highlighted at a time, we first strip `active` off all of them, then add it back to just the clicked one (which our click handler already does).

**📝 Code**

```js
// goes in script.js — at the bottom of the file
function removeActive() {
    for(let i = 0; i < ratings.length; i++) {
        ratings[i].classList.remove('active')
    }
}
```

**🔍 Explanation**

- We loop through all `ratings` and remove the `active` class from each.
- The click handler calls this *first*, then adds `active` to the one you clicked — guaranteeing exactly one highlighted option.

**✅ Checkpoint**
Refresh. Click different ratings (emoji **or** label). The highlight now moves to whichever you click, and only one is highlighted at a time. 

---

### Step 14: Submit and Show the Thank-You Screen

**🎯 Goal**
When "Send Review" is clicked, replace the whole card with a thank-you message that includes the chosen rating.

**💡 Concept**
Setting `panel.innerHTML` to new markup **wipes out** the current contents (question, ratings, button) and replaces them in one shot. We inject the remembered `selectedRating` using a template literal.

**📝 Code**

```js
// goes in script.js — after the ratingsContainer listener
sendBtn.addEventListener('click', (e) => {
    panel.innerHTML = `
        <i class="fas fa-heart"></i>
        <strong>Thank You!</strong>
        <br>
        <strong>Feedback: ${selectedRating}</strong>
        <p>We'll use your feedback to improve our customer support</p>
    `
})
```

**🔍 Explanation**

- On click, we overwrite `panel.innerHTML` with new content.
- `<i class="fas fa-heart"></i>` is the Font Awesome heart — styled red by the `.fa-heart` rule from Step 9.
- `${selectedRating}` drops in whatever the user selected (e.g. "Satisfied"), so the message reflects their real choice.
- Because the ratings and button lived *inside* `#panel`, they vanish — leaving just the thank-you screen.

**✅ Checkpoint**
Refresh. Pick a rating, then click **Send Review**. The card transforms into a red heart, "Thank You!", "Feedback: [your choice]", and a closing message. Project complete!

---

## 5. Final Full Code (Reference)

**`index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog==" crossorigin="anonymous" />
    <link rel="stylesheet" href="style.css" />
    <title>Let Us Know Your Feedback</title>
  </head>
  <body>
    <div id="panel" class="panel-container">
      <strong>How satisfied are you with our <br /> customer support performance?</strong>
      <div class="ratings-container">
        <div class="rating">
          <img src="https://img.icons8.com/external-neu-royyan-wijaya/64/000000/external-emoji-neumojis-smiley-neu-royyan-wijaya-17.png" alt="">
          <small>Unhappy</small>
        </div>

        <div class="rating">
          <img src="https://img.icons8.com/external-neu-royyan-wijaya/64/000000/external-emoji-neumojis-smiley-neu-royyan-wijaya-3.png" alt=""/>
          <small>Neutral</small>
        </div>

        <div class="rating active">
          <img src="https://img.icons8.com/external-neu-royyan-wijaya/64/000000/external-emoji-neumojis-smiley-neu-royyan-wijaya-30.png" alt=""/>
          <small>Satisfied</small>
        </div>
      </div>
      <button class="btn" id="send">Send Review</button>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

**`style.css`**

```css
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #fef9f2;
  font-family: 'Montserrat', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.panel-container {
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  font-size: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 30px;
  max-width: 400px;
}

.panel-container strong {
  line-height: 20px;
}

.ratings-container {
  display: flex;
  margin: 20px 0;
}

.rating {
  flex: 1;
  cursor: pointer;
  padding: 20px;
  margin: 10px 5px;
}

.rating:hover,
.rating.active {
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.rating img {
  width: 40px;
}

.rating small {
  color: #555;
  display: inline-block;
  margin: 10px 0 0;
}

.rating:hover small,
.rating.active small {
  color: #111;
}

.btn {
  background-color: #302d2b;
  color: #fff;
  border: 0;
  border-radius: 4px;
  padding: 12px 30px;
  cursor: pointer;
}

.btn:focus {
  outline: 0;
}

.btn:active {
  transform: scale(0.98);
}

.fa-heart {
  color: red;
  font-size: 30px;
  margin-bottom: 10px;
}
```

**`script.js`**

```js
const ratings = document.querySelectorAll('.rating')
const ratingsContainer = document.querySelector('.ratings-container')
const sendBtn = document.querySelector('#send')
const panel = document.querySelector('#panel')
let selectedRating = 'Satisfied'

ratingsContainer.addEventListener('click', (e) => {
    if(e.target.parentNode.classList.contains('rating') && e.target.nextElementSibling) {
        removeActive()
        e.target.parentNode.classList.add('active')
        selectedRating = e.target.nextElementSibling.innerHTML
    } else if(
        e.target.parentNode.classList.contains('rating') &&
        e.target.previousSibling &&
        e.target.previousElementSibling.nodeName === 'IMG'
    ) {
        removeActive()
        e.target.parentNode.classList.add('active')
        selectedRating = e.target.innerHTML
    }

})

sendBtn.addEventListener('click', (e) => {
    panel.innerHTML = `
        <i class="fas fa-heart"></i>
        <strong>Thank You!</strong>
        <br>
        <strong>Feedback: ${selectedRating}</strong>
        <p>We'll use your feedback to improve our customer support</p>
    `
})

function removeActive() {
    for(let i = 0; i < ratings.length; i++) {
        ratings[i].classList.remove('active')
    }
}
```

---

## 6. Recap & Next Steps

**What you learned:**

- **Event delegation** — one listener on a parent, using `e.target` to know what was clicked.
- DOM traversal with `parentNode`, `nextElementSibling`, and `previousElementSibling`, plus checking `nodeName`.
- Tracking a selection in a state variable (`selectedRating`) and reading it later.
- Swapping an entire section of the page with `innerHTML` + a template literal.
- Sharing styles between `:hover` and `.active` so selection "sticks."

**Enhancement challenges:**

1. **Prevent empty submits.** Only build the thank-you screen if a rating is truly selected (guard against edge cases).
2. **Add more ratings.** Insert two more emoji options (e.g. "Very Unhappy", "Very Satisfied") — notice the JS needs *no* changes thanks to delegation.
3. **Add a "Go back" link** on the thank-you screen that restores the original panel (hint: save the original `innerHTML` first).
4. **Persist the choice.** Save `selectedRating` to `localStorage` and pre-select it on reload.
5. **Keyboard accessibility.** Make ratings focusable (`tabindex`) and selectable with the Enter key.
