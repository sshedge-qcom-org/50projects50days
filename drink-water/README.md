# Drink Water

## 1. Project Overview

A water-intake tracker: click the small cups to mark how many 250ml glasses you've drunk, and a big cup fills up to show your progress toward a 2-liter goal, along with the percentage done and liters remaining.

**Key concepts involved:**

- Toggling a state class (`full`) across a group of elements
- Reading an element's index during iteration
- Driving CSS from JavaScript by setting inline styles
- Simple math to convert cups → percentage and liters

**HTML skills you'll gain:**

- Structuring a component with a "big cup" (progress display) and a row of "small cups"
- Using IDs as JavaScript hooks

**CSS skills you'll gain:**

- **CSS custom properties** (variables) via `:root` and `var()`
- Flexbox layouts, including `flex-wrap` for a grid of cups
- Smooth `transition`s on height and background
- A `.full` modifier class for the filled state

**JavaScript skills you'll gain:**

- `querySelectorAll` + `forEach` with the **index** parameter
- `classList.add` / `remove` / `contains`
- Navigating siblings with `nextElementSibling`
- Setting inline styles (`style.height`, `style.visibility`) and text from JS
- Template literals and basic arithmetic

---

## 2. Final Project Preview

**Layout & colors:** A blue page with white text. At the top: the title "Drink Water" and a subtitle "Goal: 2 Liters". Below sits a large cup outline. Under it, an instruction line and a centered, wrapping row of eight small cups, each labeled "250 ml".

**Behavior & interactions:**

- Clicking a small cup fills it **and every cup before it** with blue; the rest empty out.
- The big cup reflects your progress: a blue fill rises from the bottom showing the **percentage** complete, while the top shows the **liters remaining** toward 2L.
- Clicking the highest currently-filled cup **un-fills** it (letting you decrease your count).
- When all eight cups are full, the "Remained" area disappears (goal reached); when none are full, the percentage fill disappears.

**What you can interact with:** the eight small "250 ml" cups.

---

## 3. Prerequisites

**You should know:** basic HTML, CSS, and JavaScript (arrays, functions, arrow functions, conditionals).

**Tools needed:**

- A modern web browser
- A text editor (VS Code, etc.)
- Optional: the **Live Server** extension

**Files to create:**

```
drink-water/
├── index.html
├── style.css
└── script.js
```

---

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML skeleton

**🎯 Goal**
Set up the base document and link the stylesheet.

**💡 Concept**
Standard HTML5 boilerplate with a `<link>` to `style.css`.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Drink Water</title>
  </head>
  <body>
  </body>
</html>
```

**🔍 Explanation**
Encoding and viewport meta tags, a stylesheet link, and the page title.

**✅ Checkpoint**
A blank page titled "Drink Water".

---

### Step 2: Add the headings

**🎯 Goal**
Show the app title and the daily goal.

**💡 Concept**
Plain headings give the app its title and context.

**📝 Code**

```html
<!-- goes in index.html, inside <body> -->
<h1>Drink Water</h1>
<h3>Goal: 2 Liters</h3>
```

**🔍 Explanation**
`<h1>` is the main title; `<h3>` states the 2-liter goal.

**✅ Checkpoint**
"Drink Water" and "Goal: 2 Liters" appear at the top-left (unstyled).

---

### Step 3: Build the big cup

**🎯 Goal**
Create the large progress cup with its "remained" and "percentage" areas.

**💡 Concept**
The big cup has two stacked parts: a **remained** section (showing liters left) and a **percentage** fill that will grow from the bottom. Both have IDs so JavaScript can update them.

**📝 Code**

```html
<!-- goes in index.html, below the headings -->
<div class="cup">
  <div class="remained" id="remained">
    <span id="liters"></span>
    <small>Remained</small>
  </div>

  <div class="percentage" id="percentage"></div>
</div>
```

**🔍 Explanation**

- `.cup` is the large cup outline.
- `.remained` (id `remained`) holds an empty `<span id="liters">` (JS fills in the liters left) and the label "Remained".
- `.percentage` (id `percentage`) is the fill bar; JS will set its height and text.

**✅ Checkpoint**
The word "Remained" appears (everything is still unstyled and stacked).

---

### Step 4: Add the instruction and the small cups

**🎯 Goal**
Provide the clickable row of eight 250ml cups.

**💡 Concept**
Eight cups of 250ml equal the 2-liter goal. Each cup shares the classes `cup cup-small` so CSS styles them all and JS can select them together.

**📝 Code**

```html
<!-- goes in index.html, below the big cup -->
<p class="text">Select how many glasses of water that you have drank</p>

<div class="cups">
  <div class="cup cup-small">250 ml</div>
  <div class="cup cup-small">250 ml</div>
  <div class="cup cup-small">250 ml</div>
  <div class="cup cup-small">250 ml</div>
  <div class="cup cup-small">250 ml</div>
  <div class="cup cup-small">250 ml</div>
  <div class="cup cup-small">250 ml</div>
  <div class="cup cup-small">250 ml</div>
</div>
```

**🔍 Explanation**

- `.text` is the instruction line.
- `.cups` is the flex container; inside are **eight** `.cup.cup-small` divs labeled "250 ml" (8 × 250ml = 2000ml = 2L).

**✅ Checkpoint**
You see the instruction and eight "250 ml" labels (unstyled). All content is now in place.

---

### Step 5: Base styles — variables, font, and layout

**🎯 Goal**
Define reusable colors, set the font, and center the page content.

**💡 Concept**
**CSS custom properties** (variables) declared in `:root` can be reused anywhere with `var(...)`, so changing a color in one place updates everything.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,600&display=swap');

:root {
  --border-color: #144fc6;
  --fill-color: #6ab3f8;
}

* {
  box-sizing: border-box;
}

body {
  background-color: #3494e4;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}
```

**🔍 Explanation**

- `@import` loads Montserrat in two weights (400 and 600).
- `:root` defines two variables: a dark blue `--border-color` and a lighter `--fill-color`.
- `body` is a centered flex **column** on a blue background with white text.

**✅ Checkpoint**
The page turns blue with centered white text in the Montserrat font.

---

### Step 6: Space out the headings

**🎯 Goal**
Tidy the spacing and weight of the two headings.

**💡 Concept**
`font-weight: 400` makes the subtitle lighter than the bold default `<h3>`.

**📝 Code**

```css
/* goes in style.css */
h1 {
  margin: 10px 0 0;
}

h3 {
  font-weight: 400;
  margin: 10px 0;
}
```

**🔍 Explanation**
Small consistent margins around both headings; the subtitle uses a normal (non-bold) weight.

**✅ Checkpoint**
The title and goal are neatly spaced near the top.

---

### Step 7: Style the big cup

**🎯 Goal**
Draw the large cup as a bordered container that its contents can't overflow.

**💡 Concept**
`flex-direction: column` stacks the "remained" area above the "percentage" fill. `overflow: hidden` keeps the growing fill inside the rounded cup. Notice we reuse our variables with `var()`.

**📝 Code**

```css
/* goes in style.css */
.cup {
  background-color: #fff;
  border: 4px solid var(--border-color);
  color: var(--border-color);
  border-radius: 0 0 40px 40px;
  height: 330px;
  width: 150px;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
```

**🔍 Explanation**

- A white, 150×330px cup with a thick blue border (`var(--border-color)`).
- `border-radius: 0 0 40px 40px` rounds only the bottom corners (like a real cup).
- `flex-direction: column` stacks the inner sections; `overflow: hidden` clips the fill to the cup shape.

**✅ Checkpoint**
A tall white cup with rounded bottom corners and a blue outline appears.

---

### Step 8: Style the small cups and their filled state

**🎯 Goal**
Style the clickable mini cups and define how a "full" cup looks.

**💡 Concept**
The `.full` modifier class (added later by JS) switches a cup's background to the fill color. A `transition` animates that change.

**📝 Code**

```css
/* goes in style.css */
.cup.cup-small {
  height: 95px;
  width: 50px;
  border-radius: 0 0 15px 15px;
  background-color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 5px;
  transition: 0.3s ease;
}

.cup.cup-small.full {
  background-color: var(--fill-color);
  color: #fff;
}
```

**🔍 Explanation**

- `.cup.cup-small` overrides the big-cup size to a small 50×95px cup with a pointer cursor (it's clickable) and centered text.
- `transition: 0.3s ease` smooths any change (like filling).
- `.cup.cup-small.full` (all three classes) turns the cup blue with white text — this is the "filled" look.

**✅ Checkpoint**
The eight small cups are now small, rounded, and show a pointer cursor on hover (not yet clickable in logic).

---

### Step 9: Lay out the row of small cups

**🎯 Goal**
Arrange the small cups in a centered, wrapping row.

**💡 Concept**
`flex-wrap: wrap` lets cups flow onto a second line if they don't all fit, while a fixed container width controls how many sit per row.

**📝 Code**

```css
/* goes in style.css */
.cups {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 280px;
}
```

**🔍 Explanation**
A 280px-wide flex container that centers the cups and wraps them onto multiple rows.

**✅ Checkpoint**
The eight cups are now arranged in a tidy centered grid (roughly two rows).

---

### Step 10: Style the "remained" area

**🎯 Goal**
Center the liters-remaining text inside the top of the big cup.

**💡 Concept**
`flex: 1` makes this section grow to fill the space above the percentage fill, so it stays centered as the fill height changes.

**📝 Code**

```css
/* goes in style.css */
.remained {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 1;
  transition: 0.3s ease;
}

.remained span {
  font-size: 20px;
  font-weight: bold;
}

.remained small {
  font-size: 12px;
}
```

**🔍 Explanation**

- `.remained` centers its content vertically and horizontally and expands to fill available space (`flex: 1`).
- The `<span>` (liters) is large and bold; the `<small>` ("Remained") is tiny.

**✅ Checkpoint**
"Remained" is centered inside the big cup (the liters number is still empty — JS adds it).

---

### Step 11: Style the percentage fill and instruction text

**🎯 Goal**
Prepare the fill bar (starting at zero height) and the instruction line.

**💡 Concept**
The fill starts at `height: 0` and grows when JavaScript sets a pixel height; the `transition` animates that rise. This is how the water "fills up".

**📝 Code**

```css
/* goes in style.css */
.percentage {
  background-color: var(--fill-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 30px;
  height: 0;
  transition: 0.3s ease;
}

.text {
  text-align: center;
  margin: 0 0 5px;
}
```

**🔍 Explanation**

- `.percentage` is the blue fill; it centers its text, starts at `height: 0`, and animates height changes over 0.3s.
- `.text` centers the instruction line.

**✅ Checkpoint**
The big cup looks empty (fill height is 0) and the instruction line is centered. The UI is complete — now we add behavior.

---

### Step 12: Select elements and set up clicks

**🎯 Goal**
Grab the elements JS needs and make each small cup respond to clicks.

**💡 Concept**
`forEach` gives us both the element **and its index** (`idx`). We pass that index to `highlightCups` so the function knows which cup was clicked. We also call `updateBigCup()` once at startup to set the initial display.

**📝 Code**
First, load the script (add just before `</body>`):

```html
<!-- goes in index.html, just before </body> -->
<script src="script.js"></script>
```

Then:

```js
// goes in script.js
const smallCups = document.querySelectorAll('.cup-small')
const liters = document.getElementById('liters')
const percentage = document.getElementById('percentage')
const remained = document.getElementById('remained')

updateBigCup()

smallCups.forEach((cup, idx) => {
    cup.addEventListener('click', () => highlightCups(idx))
})
```

**🔍 Explanation**

- We cache the eight small cups and the three big-cup elements (`liters`, `percentage`, `remained`).
- `updateBigCup()` runs immediately to set the starting state (we define it soon).
- For each cup, `forEach` provides `idx` (0–7); clicking a cup calls `highlightCups(idx)`.

**✅ Checkpoint**
Clicking does nothing yet and the console shows `highlightCups is not defined` / `updateBigCup is not defined` — expected; we define them next.

---

### Step 13: Fill cups up to the clicked one

**🎯 Goal**
Fill every cup up to and including the clicked one — and allow un-filling the topmost full cup.

**💡 Concept**
We loop all cups and add `full` to those at or below the clicked index, removing it from the rest. The two conditions at the top handle **clicking an already-full cup to empty it**, and a special edge case for the last cup (which has no next sibling).

**📝 Code**

```js
// goes in script.js
function highlightCups(idx) {
    if (idx===7 && smallCups[idx].classList.contains("full")) idx--;
    else if(smallCups[idx].classList.contains('full') && !smallCups[idx].nextElementSibling.classList.contains('full')) {
        idx--
    }

    smallCups.forEach((cup, idx2) => {
        if(idx2 <= idx) {
            cup.classList.add('full')
        } else {
            cup.classList.remove('full')
        }
    })

    updateBigCup()
}
```

**🔍 Explanation**

- **First condition:** if you click the **last** cup (`idx === 7`) and it's already full, decrement `idx`. The last cup has no `nextElementSibling`, so this special case avoids an error and lets you un-fill it.
- **Second condition (`else if`):** for any other cup, if it's full **and** the cup right after it is *not* full (meaning you clicked the highest filled cup), decrement `idx` — this un-fills that top cup so your count goes down by one.
- The `forEach` then fills (`add('full')`) every cup at index `≤ idx` and empties (`remove('full')`) the rest.
- Finally `updateBigCup()` refreshes the big-cup display.

**✅ Checkpoint**
Click the 4th cup: cups 1–4 fill blue, 5–8 stay empty. Click the 4th again: it empties back to 3. (The big cup won't react until the next step.)

---

### Step 14: Update the big cup

**🎯 Goal**
Reflect progress in the big cup: fill height, percentage text, and liters remaining.

**💡 Concept**
We count how many cups are `full`, then compute the fill height (as a fraction of the cup's 330px), the percentage, and the liters left, writing them directly to element styles/text. Edge cases (0 full, or all full) hide the relevant section.

**📝 Code**

```js
// goes in script.js
function updateBigCup() {
    const fullCups = document.querySelectorAll('.cup-small.full').length
    const totalCups = smallCups.length

    if(fullCups === 0) {
        percentage.style.visibility = 'hidden'
        percentage.style.height = 0
    } else {
        percentage.style.visibility = 'visible'
        percentage.style.height = `${fullCups / totalCups * 330}px`
        percentage.innerText = `${fullCups / totalCups * 100}%`
    }

    if(fullCups === totalCups) {
        remained.style.visibility = 'hidden'
        remained.style.height = 0
    } else {
        remained.style.visibility = 'visible'
        liters.innerText = `${2 - (250 * fullCups / 1000)}L`
    }
}
```

**🔍 Explanation**

- `fullCups` counts filled cups; `totalCups` is 8.
- **Percentage fill:** if no cups are full, hide the fill; otherwise show it, set its height to `fullCups / totalCups * 330` px (proportion of the 330px cup) and its text to the percentage.
- **Remaining:** if all cups are full, hide the "Remained" area (goal met); otherwise show it and set the liters left with `2 - (250 * fullCups / 1000)` (each cup is 250ml, converted to liters).
- Because `.percentage` and `.remained` have CSS `transition`s, these height changes animate smoothly.

**✅ Checkpoint**
Click cups now: the big cup's blue fill rises to match, shows the percentage, and the "Remained" liters count down. Fill all eight and "Remained" disappears; empty them all and the fill disappears. 🎉

---

## 5. Final Full Code (Reference)

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Drink Water</title>
  </head>
  <body>
    <h1>Drink Water</h1>
    <h3>Goal: 2 Liters</h3>

    <div class="cup">
      <div class="remained" id="remained">
        <span id="liters"></span>
        <small>Remained</small>
      </div>

      <div class="percentage" id="percentage"></div>
    </div>

    <p class="text">Select how many glasses of water that you have drank</p>

    <div class="cups">
      <div class="cup cup-small">250 ml</div>
      <div class="cup cup-small">250 ml</div>
      <div class="cup cup-small">250 ml</div>
      <div class="cup cup-small">250 ml</div>
      <div class="cup cup-small">250 ml</div>
      <div class="cup cup-small">250 ml</div>
      <div class="cup cup-small">250 ml</div>
      <div class="cup cup-small">250 ml</div>
    </div>

    <script src="script.js"></script>
  </body>
</html>
```

**style.css**

```css
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,600&display=swap');

:root {
  --border-color: #144fc6;
  --fill-color: #6ab3f8;
}

* {
  box-sizing: border-box;
}

body {
  background-color: #3494e4;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

h1 {
  margin: 10px 0 0;
}

h3 {
  font-weight: 400;
  margin: 10px 0;
}

.cup {
  background-color: #fff;
  border: 4px solid var(--border-color);
  color: var(--border-color);
  border-radius: 0 0 40px 40px;
  height: 330px;
  width: 150px;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cup.cup-small {
  height: 95px;
  width: 50px;
  border-radius: 0 0 15px 15px;
  background-color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 5px;
  transition: 0.3s ease;
}

.cup.cup-small.full {
  background-color: var(--fill-color);
  color: #fff;
}

.cups {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 280px;
}

.remained {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 1;
  transition: 0.3s ease;
}

.remained span {
  font-size: 20px;
  font-weight: bold;
}

.remained small {
  font-size: 12px;
}

.percentage {
  background-color: var(--fill-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 30px;
  height: 0;
  transition: 0.3s ease;
}

.text {
  text-align: center;
  margin: 0 0 5px;
}
```

**script.js**

```js
const smallCups = document.querySelectorAll('.cup-small')
const liters = document.getElementById('liters')
const percentage = document.getElementById('percentage')
const remained = document.getElementById('remained')

updateBigCup()

smallCups.forEach((cup, idx) => {
    cup.addEventListener('click', () => highlightCups(idx))
})

function highlightCups(idx) {
    if (idx===7 && smallCups[idx].classList.contains("full")) idx--;
    else if(smallCups[idx].classList.contains('full') && !smallCups[idx].nextElementSibling.classList.contains('full')) {
        idx--
    }

    smallCups.forEach((cup, idx2) => {
        if(idx2 <= idx) {
            cup.classList.add('full')
        } else {
            cup.classList.remove('full')
        }
    })

    updateBigCup()
}

function updateBigCup() {
    const fullCups = document.querySelectorAll('.cup-small.full').length
    const totalCups = smallCups.length

    if(fullCups === 0) {
        percentage.style.visibility = 'hidden'
        percentage.style.height = 0
    } else {
        percentage.style.visibility = 'visible'
        percentage.style.height = `${fullCups / totalCups * 330}px`
        percentage.innerText = `${fullCups / totalCups * 100}%`
    }

    if(fullCups === totalCups) {
        remained.style.visibility = 'hidden'
        remained.style.height = 0
    } else {
        remained.style.visibility = 'visible'
        liters.innerText = `${2 - (250 * fullCups / 1000)}L`
    }
}
```

---

## 6. Recap & Next Steps

**What you learned:**

- Defining and reusing colors with CSS custom properties (`:root` + `var()`).
- Using the index from `forEach` to know which element was clicked.
- Filling a range of elements by comparing indexes and toggling a `full` class.
- Navigating to a neighboring element with `nextElementSibling` (and guarding the last item, which has none).
- Driving CSS from JavaScript by setting `style.height` / `style.visibility` and letting CSS `transition`s animate the result.
- Converting cups to a percentage and to liters with simple arithmetic and template literals.

**Enhancement challenges:**

1. **Persist progress:** save the number of full cups to `localStorage` and restore it on reload.
2. **Round the percentage:** the display can show long decimals (e.g. `37.5%`) — round it with `Math.round()` or `toFixed()`.
3. **Configurable goal:** let the user set the goal and number of cups, then generate the small cups dynamically.
4. **Add a reset button:** clear all cups and reset the big cup in one click.
5. **Celebrate the goal:** show a congratulatory message or animation when all eight cups are full.
