# Quiz App

## 1. Project Overview

The **Quiz App** presents multiple-choice questions one at a time. The user picks an answer and submits; the app tracks the score, advances to the next question, and finally shows how many were answered correctly with an option to restart.

**Key concepts involved:**

- Storing content as **data** (an array of question objects) separate from the UI
- Managing **state** with variables (`currentQuiz`, `score`)
- Working with radio buttons: grouping, selecting, and reading the choice
- Updating the DOM from data (`innerText`)
- Rendering a results screen and reloading the page

**HTML skills you'll gain:**

- Building a radio-button group with `name`, `id`, and matching `<label for="...">`
- Structuring a card with a header, a list of options, and a button

**CSS skills you'll gain:**

- Centering a fixed-width card on a gradient background
- Styling a full-width button with `:hover` and `:focus` states
- Making labels clickable with `cursor: pointer`

**JavaScript skills you'll gain:**

- Modeling data as an array of objects
- Reading/looping a NodeList with `forEach`
- Detecting the checked radio and clearing selections
- Advancing through data with an index and conditionally ending
- Replacing the UI with `innerHTML` and using `location.reload()`

---

## 2. Final Project Preview

**The UI:** A white, rounded card (600px wide) centered on a soft blue-grey gradient. Inside, a centered question heading sits above four answer options, each a radio button next to a clickable label. A full-width purple "Submit" button spans the bottom of the card.

**The behavior:**

- The first question and its four options load automatically.
- The user selects one option and clicks **Submit**.
- If an option was selected, the app checks it against the correct answer (silently updating the score), then loads the next question with a fresh, unselected set of options.
- After the last question, the card is replaced with a results message — "You answered X/4 questions correctly" — and a **Reload** button to start over.
- Clicking Submit with **nothing selected does nothing** (it waits for a choice).

**What you can interact with:**

- The **four radio options** (select one).
- The **Submit button** (check the answer and advance).
- The **Reload button** on the results screen (restart the quiz).

---

## 3. Prerequisites

**Basic knowledge required:** Basic HTML/CSS and JavaScript fundamentals — variables, functions, arrays, objects, and `if` statements.

**Tools needed:**

- A modern web browser
- A text editor (VS Code recommended)
- An internet connection (the font loads from Google Fonts)
- Optional: the **Live Server** VS Code extension

**Files to create:**

```
quiz-app/
├── index.html
├── style.css
└── script.js
```

---

## 4. Build the Project Step-by-Step

### Step 1: HTML Skeleton

**🎯 Goal**
Create the base document linking the stylesheet and script.

**💡 Concept**
Standard boilerplate: CSS in the head, script at the end of the body.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Quiz App</title>
  </head>
  <body>
    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**

- `<link rel="stylesheet" href="style.css" />` connects our CSS.
- `<script src="script.js"></script>` runs after the HTML is parsed.

**✅ Checkpoint**
Open `index.html`: a blank page titled "Quiz App", no errors.

---

### Step 2: Add the Quiz Card and Question

**🎯 Goal**
Add the card container and the question heading.

**💡 Concept**
The outer `<div>` has both `class="quiz-container"` (styling) and `id="quiz"` (the JS hook we'll later overwrite to show results). The `<h2 id="question">` will receive each question's text.

**📝 Code**

```html
<!-- goes in index.html — inside <body>, above the <script> -->
<div class="quiz-container" id="quiz">
  <div class="quiz-header">
    <h2 id="question">Question text</h2>
  </div>
</div>
```

**🔍 Explanation**

- `id="quiz"` — JavaScript replaces this element's contents with the final score screen.
- `.quiz-header` groups the question and (soon) the answers with padding.
- `<h2 id="question">` holds placeholder text now; JS will fill in the real question.

**✅ Checkpoint**
Refresh. You'll see the placeholder "Question text" (unstyled).

---

### Step 3: Add the Answer Options

**🎯 Goal**
Add the four radio-button options with their labels.

**💡 Concept**
Radio buttons that share the **same `name`** ("answer") form a group where only one can be selected at a time. Each has a unique `id` (`a`–`d`), and each `<label>`'s `for` attribute matches that `id`, so clicking the label selects its radio. The shared `class="answer"` lets JavaScript grab all four at once.

**📝 Code**

```html
<!-- goes in index.html — inside <div class="quiz-header">, after the <h2> -->
<ul>
  <li>
    <input type="radio" name="answer" id="a" class="answer">
    <label for="a" id="a_text">Question</label>
  </li>

  <li>
    <input type="radio" name="answer" id="b" class="answer">
    <label for="b" id="b_text">Question</label>
  </li>

  <li>
    <input type="radio" name="answer" id="c" class="answer">
    <label for="c" id="c_text">Question</label>
  </li>

  <li>
    <input type="radio" name="answer" id="d" class="answer">
    <label for="d" id="d_text">Question</label>
  </li>
</ul>
```

**🔍 Explanation**

- All four `<input type="radio" name="answer">` belong to one group — selecting one deselects the others.
- The `id`s `a`, `b`, `c`, `d` uniquely identify each option; JS reads the checked one's `id` to know the user's choice.
- `class="answer"` on each lets JS select all four together.
- Each `<label>` has a matching `for` and its own `id` (`a_text`…`d_text`) so JS can fill in the answer text.

**✅ Checkpoint**
Refresh. Four radio buttons appear, each labeled "Question". Clicking a label selects its radio; only one can be active at a time.

---

### Step 4: Add the Submit Button

**🎯 Goal**
Add the button that checks the answer and advances the quiz.

**💡 Concept**
`id="submit"` is the JavaScript hook. Note the button sits **inside** `#quiz`, so it too gets replaced when we render the results screen.

**📝 Code**

```html
<!-- goes in index.html — inside <div class="quiz-container">, after the .quiz-header -->
<button id="submit">Submit</button>
```

**🔍 Explanation**

- `<button id="submit">` — JS attaches the click handler here.
- Placed after `.quiz-header` but still within `#quiz`.

**✅ Checkpoint**
Refresh. A plain "Submit" button appears below the options.

---

### Step 5: Reset and Center the Page

**🎯 Goal**
Import the font, fix box-sizing, and center the card on a gradient background.

**💡 Concept**
The familiar full-height Flexbox `body` centers the quiz card both horizontally and vertically.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #b8c6db;
  background-image: linear-gradient(315deg, #b8c6db 0%, #f5f7fa 100%);
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}
```

**🔍 Explanation**

- `@import` loads the **Poppins** font in two weights (keep it first).
- `background-color` is a fallback; `linear-gradient(315deg, ...)` paints the diagonal gradient.
- The `body` is a full-viewport flex container centering the card.

**✅ Checkpoint**
Refresh. The background becomes a soft gradient, the font is Poppins, and content is centered.

---

### Step 6: Style the Card and Header

**🎯 Goal**
Turn the plain container into a white, rounded, fixed-width card.

**💡 Concept**
`overflow: hidden` on the rounded card clips the full-width button's corners so they follow the card's curve. Generous header padding gives the quiz room to breathe.

**📝 Code**

```css
/* goes in style.css */
.quiz-container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px 2px rgba(100, 100, 100, 0.1);
  width: 600px;
  overflow: hidden;
}

.quiz-header {
  padding: 4rem;
}
```

**🔍 Explanation**

- `.quiz-container`: white background, rounded corners, soft shadow, fixed `600px` width. `overflow: hidden` keeps inner corners tidy against the rounded edge.
- `.quiz-header { padding: 4rem }` adds space around the question and options.

**✅ Checkpoint**
Refresh. The quiz now sits in a clean white card with a subtle shadow.

---

### Step 7: Style the Question and Options

**🎯 Goal**
Center the question and lay out the answer list cleanly.

**💡 Concept**
Removing the default list bullets and padding gives full control over spacing. `cursor: pointer` on labels hints they're clickable (and clicking them selects the radio).

**📝 Code**

```css
/* goes in style.css */
h2 {
  padding: 1rem;
  text-align: center;
  margin: 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  font-size: 1.2rem;
  margin: 1rem 0;
}

ul li label {
  cursor: pointer;
}
```

**🔍 Explanation**

- `h2` is centered with padding and no default margin.
- `ul { list-style-type: none; padding: 0 }` strips bullets and indentation.
- `ul li` sets a comfortable size and vertical spacing between options.
- `ul li label { cursor: pointer }` shows a hand cursor over labels.

**✅ Checkpoint**
Refresh. The question is centered and the four options are evenly spaced and readable.

---

### Step 8: Style the Submit Button

**🎯 Goal**
Make the button a full-width purple bar with hover and focus feedback.

**💡 Concept**
`display: block` + `width: 100%` makes the button span the whole card. `font-family: inherit` keeps it in Poppins rather than the browser default. `:hover` and `:focus` darken it for interactive feedback.

**📝 Code**

```css
/* goes in style.css */
button {
  background-color: #8e44ad;
  color: #fff;
  border: none;
  display: block;
  width: 100%;
  cursor: pointer;
  font-size: 1.1rem;
  font-family: inherit;
  padding: 1.3rem;
}

button:hover {
  background-color: #732d91;
}

button:focus {
  outline: none;
  background-color: #5e3370;
}
```

**🔍 Explanation**

- `button`: purple background, white text, no border, block-level and full width, with a pointer cursor and comfortable padding. `font-family: inherit` matches the page font.
- `button:hover` deepens the purple on hover.
- `button:focus` removes the default outline and goes darker still when focused.

**✅ Checkpoint**
Refresh. The full-width purple Submit button now stretches across the bottom of the card and reacts to hover/focus. The UI is done — now the logic.

---

### Step 9: Define the Quiz Data

**🎯 Goal**
Create the array of questions that drives the entire app.

**💡 Concept**
Separating **data** from the UI is a core pattern. Each question is an object with the question text, four options (`a`–`d`), and a `correct` key naming the right option. Adding questions later means editing this array — no HTML/logic changes needed.

**📝 Code**

```js
// goes in script.js
const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
];
```

**🔍 Explanation**

- `quizData` is an **array of objects**. Each object is one question.
- Keys `a`–`d` hold the four answer texts; `correct` stores the letter of the right one (matching an option's `id`).
- We'll step through this array one index at a time.

**✅ Checkpoint**
No visual change. Console clean.

---

### Step 10: Grab Elements and Set Up State

**🎯 Goal**
Reference all the DOM elements and create the state variables.

**💡 Concept**
**State** is data that changes over time. `currentQuiz` tracks which question we're on (an index into `quizData`), and `score` counts correct answers. They're `let` because they change.

**📝 Code**

```js
// goes in script.js — after the quizData array
const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')

let currentQuiz = 0
let score = 0
```

**🔍 Explanation**

- `quiz` — the whole card (overwritten at the end for results).
- `answerEls` — all four radio inputs (via `.answer`).
- `questionEl` and `a_text`–`d_text` — the heading and the four labels we'll fill in.
- `submitBtn` — the Submit button.
- `currentQuiz = 0` starts at the first question; `score = 0` starts the tally.

**✅ Checkpoint**
No visual change. Console clean.

---

### Step 11: Load a Question onto the Page

**🎯 Goal**
Write `loadQuiz()` to display the current question and its options, and a helper to clear any previous selection.

**💡 Concept**
`loadQuiz()` reads the current question object from `quizData` and pushes its text into the DOM with `innerText`. First it calls `deselectAnswers()` so radios from the previous question don't stay checked.

**📝 Code**

```js
// goes in script.js — call it once, then define both functions
loadQuiz()

function loadQuiz() {
    deselectAnswers()

    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}
```

**🔍 Explanation**

- `loadQuiz()` runs immediately so the first question appears on load.
- `deselectAnswers()` loops over the radios and sets each `checked = false`, clearing any selection.
- `const currentQuizData = quizData[currentQuiz]` grabs the current question object.
- The `innerText` assignments fill the heading and the four labels with that object's values.

**✅ Checkpoint**
Refresh. The **real first question** ("Which language runs in a web browser?") and its four options now appear. Selecting and submitting doesn't do anything yet.

---

### Step 12: Read the Selected Answer

**🎯 Goal**
Write `getSelected()` to find which radio (if any) is checked.

**💡 Concept**
We loop through the radios; whichever one is `checked`, we remember its `id` (`"a"`–`"d"`). If none is checked, the function returns `undefined` — which we'll treat as "no answer."

**📝 Code**

```js
// goes in script.js — after deselectAnswers()
function getSelected() {
    let answer

    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })

    return answer
}
```

**🔍 Explanation**

- `let answer` starts `undefined`.
- The `forEach` checks each radio; if one is `checked`, `answer` becomes its `id`.
- `return answer` gives back the selected letter, or `undefined` if nothing was picked.

**✅ Checkpoint**
No visible change (nothing calls it yet). Console clean.

---

### Step 13: Handle Submit — Score, Advance, and Finish

**🎯 Goal**
Wire up Submit to score the answer, move to the next question, and show results at the end.

**💡 Concept**
On submit we read the selection; if there is one, we compare it to the `correct` key (bumping `score` on a match), advance `currentQuiz`, and either load the next question or — if we've run out — replace the card with a results screen. `location.reload()` on the Reload button restarts the quiz by refreshing the page.

**📝 Code**

```js
// goes in script.js — at the bottom of the file
submitBtn.addEventListener('click', () => {
    const answer = getSelected()

    if(answer) {
        if(answer === quizData[currentQuiz].correct) {
            score++
        }

        currentQuiz++

        if(currentQuiz < quizData.length) {
            loadQuiz()
        } else {
            quiz.innerHTML = `
                <h2>You answered ${score}/${quizData.length} questions correctly</h2>

                <button onclick="location.reload()">Reload</button>
            `
        }
    }
})
```

**🔍 Explanation**

- `const answer = getSelected()` reads the current choice.
- `if(answer)` guards the whole block — if nothing is selected, clicking Submit does nothing.
- `if(answer === quizData[currentQuiz].correct) score++` compares the picked letter to the correct one and increments the score on a match.
- `currentQuiz++` moves to the next question.
- `if(currentQuiz < quizData.length)` — more questions remain, so `loadQuiz()` shows the next one (and clears selections). Otherwise, we're done: `quiz.innerHTML = ...` replaces the entire card with the score and a **Reload** button.
- `onclick="location.reload()"` refreshes the page, resetting `currentQuiz` and `score` back to 0.

**✅ Checkpoint**
Refresh and play through all four questions. Each Submit advances to the next; at the end you see "You answered X/4 questions correctly" and a Reload button that restarts the quiz. Project complete!

---

## 5. Final Full Code (Reference)

**`index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Quiz App</title>
  </head>
  <body>
    <div class="quiz-container" id="quiz">
      <div class="quiz-header">
        <h2 id="question">Question text</h2>
        <ul>
          <li>
            <input type="radio" name="answer" id="a" class="answer">
            <label for="a" id="a_text">Question</label>
          </li>

          <li>
            <input type="radio" name="answer" id="b" class="answer">
            <label for="b" id="b_text">Question</label>
          </li>

          <li>
            <input type="radio" name="answer" id="c" class="answer">
            <label for="c" id="c_text">Question</label>
          </li>

          <li>
            <input type="radio" name="answer" id="d" class="answer">
            <label for="d" id="d_text">Question</label>
          </li>
        </ul>
      </div>
      <button id="submit">Submit</button>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

**`style.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #b8c6db;
  background-image: linear-gradient(315deg, #b8c6db 0%, #f5f7fa 100%);
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.quiz-container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px 2px rgba(100, 100, 100, 0.1);
  width: 600px;
  overflow: hidden;
}

.quiz-header {
  padding: 4rem;
}

h2 {
  padding: 1rem;
  text-align: center;
  margin: 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  font-size: 1.2rem;
  margin: 1rem 0;
}

ul li label {
  cursor: pointer;
}

button {
  background-color: #8e44ad;
  color: #fff;
  border: none;
  display: block;
  width: 100%;
  cursor: pointer;
  font-size: 1.1rem;
  font-family: inherit;
  padding: 1.3rem;
}

button:hover {
  background-color: #732d91;
}

button:focus {
  outline: none;
  background-color: #5e3370;
}
```

**`script.js`**

```js
const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
];

const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')

let currentQuiz = 0
let score = 0

loadQuiz()

function loadQuiz() {
    deselectAnswers()

    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer

    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })

    return answer
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected()

    if(answer) {
        if(answer === quizData[currentQuiz].correct) {
            score++
        }

        currentQuiz++

        if(currentQuiz < quizData.length) {
            loadQuiz()
        } else {
            quiz.innerHTML = `
                <h2>You answered ${score}/${quizData.length} questions correctly</h2>

                <button onclick="location.reload()">Reload</button>
            `
        }
    }
})
```

---

## 6. Recap & Next Steps

**What you learned:**

- Separating **data** (the `quizData` array of objects) from the UI that displays it.
- Tracking **state** with `currentQuiz` and `score`.
- Building and reading a radio-button group, and clearing selections.
- Filling elements with `innerText` and swapping the whole UI with `innerHTML`.
- Stepping through data by index and detecting the end of the list.
- Restarting via `location.reload()`.

**Enhancement challenges:**

1. **Show a progress indicator.** Display "Question 2 of 4" above the question.
2. **Require an answer prompt.** Instead of silently ignoring an empty submit, show an alert or message asking the user to pick an option.
3. **Highlight right/wrong.** After submitting, briefly color the chosen answer green (correct) or red (wrong) before advancing.
4. **Add a timer.** Give each question a countdown that auto-advances when it hits zero.
5. **Load questions from an API.** Replace the hard-coded `quizData` with questions fetched from the [Open Trivia DB](https://opentdb.com/) using `fetch` and `async`/`await`.
