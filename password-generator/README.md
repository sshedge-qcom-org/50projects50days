# Password Generator

## 1. Project Overview

This project builds a **random password generator**: pick a length and which character types to include (uppercase, lowercase, numbers, symbols), click a button, and get a strong random password you can copy to your clipboard with one click.

**Key concepts involved:** reading form controls (number input + checkboxes), generating random characters from ASCII codes, mapping type names to functions with a lookup object, array methods (`filter`, `forEach`), and the browser Clipboard API.

You will gain these skills:

- **HTML skills**
  - Building a settings panel with checkboxes and a number input
  - Using an icon button (Font Awesome) and a full-width action button
  - Structuring a component with clear containers
- **CSS skills**
  - Building a card/panel with Flexbox and shadows
  - Absolutely positioning a button inside a relative container
  - Laying out label/control rows with `justify-content: space-between`
  - A scrollable result area with `overflow-y` and a custom scrollbar
- **JavaScript skills**
  - Reading checkbox `.checked` state and coercing input values to numbers
  - Generating characters with `String.fromCharCode` and ASCII ranges
  - Using an object as a **function lookup table**
  - `filter` + object shorthand to track which options are active
  - Copying text with `navigator.clipboard.writeText`

## 2. Final Project Preview

**Layout & colors:** A blue-purple (`#3b3b98`) page with a centered dark navy card. The card has a "Password Generator" heading, a dark result box (with a clipboard icon button in its top-right corner), a list of settings rows (length + four checkboxes), and a full-width "Generate Password" button.

**Behavior & interactions:**
- Set the **length** (4–20) and tick which character types to include.
- Click **Generate Password** to fill the result box with a random password built only from the selected types.
- Click the **clipboard icon** to copy the password; an alert confirms "Password copied to clipboard!".
- If **no** character types are selected, the result stays empty.

**What you can interact with:** the length number input, four checkboxes, the "Generate Password" button, and the clipboard copy button.

## 3. Prerequisites

- **Basic knowledge:** HTML forms, CSS selectors, and JavaScript functions/arrays. The random-character logic and lookup-object pattern are explained as we go.
- **Tools needed:**
  - A modern browser and a text editor (VS Code recommended)
  - An internet connection (Font Awesome and the font load from the web)
  - *Optional:* the VS Code **Live Server** extension — also handy because the Clipboard API needs a secure context (`localhost` counts)
- **Files to create:**

```
password-generator/
├── index.html
├── style.css
└── script.js
```

Create these three empty files to start.

## 4. Build the Project Step-by-Step

### Step 1: Create the HTML skeleton and load Font Awesome

**🎯 Goal**
Set up the document and load **Font Awesome** for the clipboard icon.

**💡 Concept**
Font Awesome provides icons via classes on an `<i>` element. We load its CSS from a **CDN** so classes like `far fa-clipboard` render an icon.

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
    <title>Password Generator</title>
  </head>
  <body>
    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**
- The first `<link>` loads Font Awesome; the second loads our own styles (after it, so we can override).
- `script.js` loads at the bottom of `<body>` so all elements exist first.

**✅ Checkpoint**
Open `index.html`. Blank page, tab title "Password Generator".

---

### Step 2: Add the card, heading, and result box

**🎯 Goal**
Add the main card, its title, and the result area with a copy button.

**💡 Concept**
The result `<span>` is empty and will be filled by JavaScript. The clipboard `<button>` holds a Font Awesome icon and will copy the result when clicked.

**📝 Code**

```html
<!-- goes in index.html, inside <body> above the <script> tag -->
<div class="container">
  <h2>Password Generator</h2>
  <div class="result-container">
    <span id="result"></span>
    <button class="btn" id="clipboard">
      <i class="far fa-clipboard"></i>
    </button>
  </div>
</div>
```

**🔍 Explanation**
- `.container` is the card wrapping everything.
- `.result-container` holds the generated password (`<span id="result">`) and the copy button.
- `<i class="far fa-clipboard">` renders a clipboard icon (`far` = the "regular" outline style).

**✅ Checkpoint**
Refresh. You'll see "Password Generator" and an empty area with a small clipboard icon — unstyled for now.

---

### Step 3: Add the settings and generate button

**🎯 Goal**
Add the length input, the four type checkboxes, and the main action button.

**💡 Concept**
Each setting is a row with a `<label>` and a control. Checkboxes use the `checked` attribute to start ticked; the number input restricts length to 4–20.

**📝 Code**

```html
<!-- goes in index.html, inside .container after .result-container -->
<div class="settings">
  <div class="setting">
    <label>Password Length</label>
    <input type="number" id="length" min="4" max="20" value="20">
  </div>
  <div class="setting">
    <label>Include uppercase letters</label>
    <input type="checkbox" id="uppercase" checked>
  </div>
  <div class="setting">
    <label>Include lowercase letters</label>
    <input type="checkbox" id="lowercase" checked>
  </div>
  <div class="setting">
    <label>Include numbers</label>
    <input type="checkbox" id="numbers" checked>
  </div>
  <div class="setting">
    <label>Include symbols</label>
    <input type="checkbox" id="symbols" checked>
  </div>
</div>

<button class="btn btn-large" id="generate">
  Generate Password
</button>
```

**🔍 Explanation**
- The number input (`id="length"`) defaults to `20` and is capped between `4` and `20`.
- Four checkboxes (`uppercase`, `lowercase`, `numbers`, `symbols`) each start `checked`. Their `id`s will be read by JavaScript.
- `<button class="btn btn-large" id="generate">` is the full-width action button (the `btn-large` class makes it span the card).

**✅ Checkpoint**
Refresh. All settings rows and both buttons are visible (unstyled). Everything is in place for styling.

---

### Step 4: Import the font and reset the box model

**🎯 Goal**
Load the Muli font and normalize sizing.

**💡 Concept**
`box-sizing: border-box` keeps padding/borders inside declared widths — essential for the fixed-width card to behave.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

* {
  box-sizing: border-box;
}
```

**🔍 Explanation**
- `@import` (first line) loads the **Muli** font from Google Fonts.
- `*` applies border-box sizing everywhere.

**✅ Checkpoint**
No visible change yet; the font is loaded.

---

### Step 5: Style the page and heading

**🎯 Goal**
Give the page its background and center the card.

**💡 Concept**
A full-height Flexbox column centers the card; a small body `padding` keeps the card off the screen edges on mobile.

**📝 Code**

```css
/* goes in style.css */
body {
  background-color: #3b3b98;
  color: #fff;
  font-family: 'Muli', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  padding: 10px;
  margin: 0;
}

h2 {
  margin: 10px 0 20px;
  text-align: center;
}
```

**🔍 Explanation**
- `background-color: #3b3b98` + `color: #fff` set the blue-purple theme with white text.
- The Flexbox trio plus `height: 100vh` centers the card; `padding: 10px` gives edge breathing room.
- `h2` is centered with tuned margins.

**✅ Checkpoint**
Refresh. The page is blue-purple with the heading centered near the middle.

---

### Step 6: Style the card container

**🎯 Goal**
Turn `.container` into a fixed-width navy card with a shadow.

**💡 Concept**
A fixed `width` with `max-width: 100%` keeps the card a consistent size on desktop but lets it shrink on small screens.

**📝 Code**

```css
/* goes in style.css */
.container {
  background-color: #23235b;
  box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.2);
  padding: 20px;
  width: 350px;
  max-width: 100%;
}
```

**🔍 Explanation**
- `background-color: #23235b` makes the card darker than the page for contrast.
- The subtle white `box-shadow` lifts the card off the background.
- `width: 350px` + `max-width: 100%` = fixed on desktop, responsive on mobile.

**✅ Checkpoint**
Refresh. The content now sits inside a dark navy card.

---

### Step 7: Style the result box and copy button

**🎯 Goal**
Style the dark result area, make long passwords scrollable, and pin the copy button to its corner.

**💡 Concept**
`position: relative` on the result container lets us `position: absolute` the copy button *inside* it (top-right). `overflow-y: scroll` keeps very long passwords contained.

**📝 Code**

```css
/* goes in style.css */
.result-container {
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  font-size: 18px;
  letter-spacing: 1px;
  padding: 12px 10px;
  height: 50px;
  width: 100%;
}

.result-container #result {
  word-wrap: break-word;
  max-width: calc(100% - 40px);
  overflow-y: scroll;
  height: 100%;
}

#result::-webkit-scrollbar {
  width: 1rem;
}

.result-container .btn {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 40px;
  height: 40px;
  font-size: 20px;
}
```

**🔍 Explanation**
- `.result-container` is a dark, relatively-positioned bar that holds the password text.
- `#result` uses `max-width: calc(100% - 40px)` to leave room for the button and `overflow-y: scroll` so long passwords scroll instead of overflowing.
- `#result::-webkit-scrollbar { width: 1rem }` styles the scrollbar width in WebKit browsers.
- `.result-container .btn` is absolutely positioned in the top-right corner of the result bar.

**✅ Checkpoint**
Refresh. The result area is now a dark bar with the clipboard button tucked into its top-right corner.

---

### Step 8: Style the buttons and setting rows

**🎯 Goal**
Style the buttons and lay out each setting as a clean label/control row.

**💡 Concept**
`justify-content: space-between` on a flex row pushes the label to the left and the control to the right — a tidy settings layout with no extra markup.

**📝 Code**

```css
/* goes in style.css */
.btn {
  border: none;
  background-color: #3b3b98;
  color: #fff;
  font-size: 16px;
  padding: 8px 12px;
  cursor: pointer;
}

.btn-large {
  display: block;
  width: 100%;
}

.setting {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
}
```

**🔍 Explanation**
- `.btn` gives both buttons the shared look (borderless, page-colored, white text, pointer cursor).
- `.btn-large` makes the Generate button a full-width block.
- `.setting` lays each row out with the label on the left and the input on the right, vertically centered.

**✅ Checkpoint**
Refresh. The full UI now looks polished — a navy card with neat setting rows and a full-width Generate button. Time for the logic!

---

### Step 9: Select all the elements

**🎯 Goal**
Grab every control the script needs to read or update.

**💡 Concept**
Storing each element in a clearly named constant up front keeps the rest of the code readable.

**📝 Code**

```js
// goes in script.js
const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')
```

**🔍 Explanation**
- `resultEl` is where we'll show the password; `lengthEl` and the four checkbox elements hold the user's choices.
- `generateEl` and `clipboardEl` are the two buttons we'll attach click handlers to.

**✅ Checkpoint**
Open the console — no errors. Type `lengthEl.value` to confirm it logs `"20"`.

---

### Step 10: Write the random-character generators

**🎯 Goal**
Create four small functions that each return one random character of a given type.

**💡 Concept**
Every character has a numeric **ASCII code**. `String.fromCharCode(n)` turns a code back into its character. By picking a random number within a type's code range, we get a random character of that type.

**📝 Code**

```js
// goes in script.js
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}
```

**🔍 Explanation**
- Lowercase letters `a`–`z` are ASCII codes **97–122**: `Math.random() * 26` gives 0–25, plus 97 lands in range.
- Uppercase `A`–`Z` are **65–90** (add 65); digits `0`–`9` are **48–57** (add 48, and `* 10` for the 10 digits).
- `getRandomSymbol` skips ASCII and just picks a random character from a handpicked `symbols` string.

**✅ Checkpoint**
In the console, run `getRandomUpper()` a few times — you should get random capital letters. Try `getRandomSymbol()` too.

---

### Step 11: Build a function lookup table

**🎯 Goal**
Create an object that maps a type name to its generator function.

**💡 Concept**
An object can store **functions as values**. This "lookup table" lets us later fetch the right generator by a string name (e.g. `randomFunc['upper']()`), avoiding a big `if`/`else` chain.

**📝 Code**

```js
// goes in script.js, place this near the top after the element selections
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}
```

**🔍 Explanation**
- Each key (`lower`, `upper`, …) points to the matching function *without* calling it (no parentheses).
- Later we'll do `randomFunc[name]()` to call whichever generator we need. (This works even though it sits above the function definitions, because `function` declarations are **hoisted**.)

**✅ Checkpoint**
In the console, run `randomFunc.number()` — it should return a random digit character.

---

### Step 12: Start generatePassword — figure out active types

**🎯 Goal**
Begin the core function: count how many types are selected and collect just those, bailing out if none are.

**💡 Concept**
Two neat tricks: booleans act like `1`/`0` when added (so summing them counts the `true`s), and **object shorthand** `{lower}` creates `{ lower: <value> }`, cleverly storing both the type *name* (key) and whether it's *selected* (value) together.

**📝 Code**

```js
// goes in script.js
function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = ''
    const typesCount = lower + upper + number + symbol
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])

    if(typesCount === 0) {
        return ''
    }

    // building loop comes next...
}
```

**🔍 Explanation**
- `generatedPassword` starts empty and will be built up.
- `typesCount = lower + upper + number + symbol` — each argument is `true`/`false`; adding them counts how many are `true`.
- `[{lower}, {upper}, {number}, {symbol}]` builds objects like `{ lower: true }`. `.filter(item => Object.values(item)[0])` keeps only the ones whose single value is truthy — i.e. the **selected** types, each still labeled with its name.
- `if(typesCount === 0) return ''` guards against generating from nothing.

**✅ Checkpoint**
Save. The function isn't complete yet, so no test — the loop comes next.

---

### Step 13: Finish generatePassword — build and trim

**🎯 Goal**
Loop to build the password from the active types, then trim it to the exact requested length.

**💡 Concept**
The loop steps forward by `typesCount` each pass and adds one character of *each* active type per pass — guaranteeing every chosen type appears. That may overshoot the length, so a final `slice` trims it exactly.

**📝 Code**

```js
// goes in script.js, add inside generatePassword, replacing the "// building loop comes next..." comment
    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]()
        })
    }

    const finalPassword = generatedPassword.slice(0, length)

    return finalPassword
}
```

**🔍 Explanation**
- The loop advances by `typesCount` because each pass adds that many characters (one per active type).
- Inside, `Object.keys(type)[0]` reads the type's name (e.g. `"upper"`), and `randomFunc[funcName]()` calls the matching generator from our lookup table — appending one random character.
- Because the loop can produce a few extra characters, `generatedPassword.slice(0, length)` trims to the exact requested length before returning.

**✅ Checkpoint**
In the console, run `generatePassword(true, true, false, false, 10)`. You should get a 10-character string of mixed-case letters. 🎉

---

### Step 14: Wire up the Generate button

**🎯 Goal**
Read the user's settings when the button is clicked and display the generated password.

**💡 Concept**
Checkboxes expose a boolean `.checked`; number inputs give a string `.value`, which we convert to a number with the unary `+` operator.

**📝 Code**

```js
// goes in script.js
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
})
```

**🔍 Explanation**
- `+lengthEl.value` converts the input's string (e.g. `"20"`) into the number `20`.
- `.checked` reads each checkbox as `true`/`false`.
- We pass those into `generatePassword(...)` **in the order the function expects** (lower, upper, number, symbol, length) and drop the result into the result box.

**✅ Checkpoint**
Refresh and click **Generate Password**. A random password fills the result box. Toggle checkboxes and change the length, then regenerate to see it respond.

---

### Step 15: Wire up the clipboard copy button

**🎯 Goal**
Copy the generated password to the clipboard and confirm with an alert.

**💡 Concept**
`navigator.clipboard.writeText()` is the browser Clipboard API for copying text programmatically. It requires a **secure context** (HTTPS or `localhost`), which is why Live Server is handy.

**📝 Code**

```js
// goes in script.js
clipboardEl.addEventListener('click', () => {
    const password = resultEl.innerText;
  if (!password) {
    return;
  }
  navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!')
})
```

**🔍 Explanation**
- We read the current password from `resultEl.innerText`.
- `if (!password) return` bails out early if the box is empty — nothing to copy.
- `navigator.clipboard.writeText(password)` copies it, and `alert(...)` confirms the action.

**✅ Checkpoint**
Refresh, generate a password, then click the clipboard icon. You'll get the "Password copied to clipboard!" alert, and you can paste the password anywhere. The project is complete! 🎉

---

## 5. Final Full Code (Reference)

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog==" crossorigin="anonymous" />
    <link rel="stylesheet" href="style.css" />
    <title>Password Generator</title>
  </head>
  <body>
    <div class="container">
      <h2>Password Generator</h2>
      <div class="result-container">
        <span id="result"></span>
        <button class="btn" id="clipboard">
          <i class="far fa-clipboard"></i>
        </button>
      </div>
      <div class="settings">
        <div class="setting">
          <label>Password Length</label>
          <input type="number" id="length" min="4" max="20" value="20">
        </div>
        <div class="setting">
          <label>Include uppercase letters</label>
          <input type="checkbox" id="uppercase" checked>
        </div>
        <div class="setting">
          <label>Include lowercase letters</label>
          <input type="checkbox" id="lowercase" checked>
        </div>
        <div class="setting">
          <label>Include numbers</label>
          <input type="checkbox" id="numbers" checked>
        </div>
        <div class="setting">
          <label>Include symbols</label>
          <input type="checkbox" id="symbols" checked>
        </div>
      </div>

      <button class="btn btn-large" id="generate">
        Generate Password
      </button>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

### style.css

```css
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #3b3b98;
  color: #fff;
  font-family: 'Muli', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  padding: 10px;
  margin: 0;
}

h2 {
  margin: 10px 0 20px;
  text-align: center;
}

.container {
  background-color: #23235b;
  box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.2);
  padding: 20px;
  width: 350px;
  max-width: 100%;
}

.result-container {
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  font-size: 18px;
  letter-spacing: 1px;
  padding: 12px 10px;
  height: 50px;
  width: 100%;
}

.result-container #result {
  word-wrap: break-word;
  max-width: calc(100% - 40px);
  overflow-y: scroll;
  height: 100%;
}

#result::-webkit-scrollbar {
  width: 1rem;
}

.result-container .btn {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 40px;
  height: 40px;
  font-size: 20px;
}

.btn {
  border: none;
  background-color: #3b3b98;
  color: #fff;
  font-size: 16px;
  padding: 8px 12px;
  cursor: pointer;
}

.btn-large {
  display: block;
  width: 100%;
}

.setting {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
}
```

### script.js

```js
const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardEl.addEventListener('click', () => {
    const password = resultEl.innerText;
  if (!password) {
    return;
  }
  navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!')
})

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
})

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = ''
    const typesCount = lower + upper + number + symbol
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])
    
    if(typesCount === 0) {
        return ''
    }

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]()
        })
    }

    const finalPassword = generatedPassword.slice(0, length)

    return finalPassword
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}
```

## 6. Recap & Next Steps

**What you learned:**
- Reading checkbox `.checked` state and coercing input `.value` to a number with `+`
- Generating random characters from ASCII code ranges via `String.fromCharCode`
- Using an object as a function lookup table to avoid `if`/`else` chains
- Object shorthand + `filter` to track which options are active while keeping their names
- Building a string in a loop and trimming it with `slice`
- Copying text with the Clipboard API (and why it needs a secure context)

**Enhancement challenges:**
1. **Guarantee every type:** shuffle the final password so the character types aren't in a repeating order.
2. **Strength meter:** show a colored bar rating the password's strength based on length and variety.
3. **Copy feedback in the UI:** replace the `alert` with a temporary "Copied!" tooltip.
4. **Exclude look-alikes:** add an option to skip ambiguous characters like `l`, `1`, `O`, `0`.
5. **Regenerate on setting change:** auto-generate a new password whenever a checkbox or the length changes.
