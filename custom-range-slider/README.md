# Custom Range Slider

## 1. Project Overview

The **Custom Range Slider** restyles the plain HTML range input into a purple track with a round white handle, and floats a value "bubble" above the handle that follows it and updates as you drag.

**Key concepts involved:**

- Styling a native `<input type="range">` with vendor pseudo-elements
- Reading input values and converting strings to numbers
- Measuring real rendered sizes with `getComputedStyle`
- A little positioning math to keep the label centered over the thumb
- A reusable **range-mapping ("scale")** helper function

**HTML skills you'll gain:**

- Using `<input type="range">` with `min`/`max`
- Associating a `<label>` with an input via the `for` attribute

**CSS skills you'll gain:**

- Overriding default slider appearance with `-webkit-appearance: none`
- Styling the track and thumb across browsers (`::-webkit-slider-thumb`, `::-moz-range-thumb`, `::-ms-thumb`)
- Absolute positioning a floating label relative to a `position: relative` parent

**JavaScript skills you'll gain:**

- Handling the `input` event on a range slider
- The unary `+` operator to convert strings to numbers
- Reading computed pixel widths and stripping the `"px"` suffix
- Writing a linear **mapping function** to convert one number range to another
- Setting inline styles (`element.style.left`) from a calculation

---

## 2. Final Project Preview

**The UI:** A page with a light blue-grey gradient background. The heading "Custom Range Slider" is pinned near the top. Centered on the screen is a 300px-wide slider with a **purple** track and a **round white** handle (thumb) outlined in purple. Floating just above the slider is a small white, rounded "bubble" label showing the current number.

**The behavior:**

- Dragging the handle updates the number inside the floating label in real time.
- The floating label **moves horizontally** to stay centered above the handle as it travels from 0 to 100.

**What you can interact with:**

- The **range slider** — drag the handle (or click along the track) to change the value and watch the label follow.

---

## 3. Prerequisites

**Basic knowledge required:** Basic HTML/CSS, and JavaScript variables, functions, and arithmetic. No prior experience styling range inputs or using `getComputedStyle` is needed.

**Tools needed:**

- A modern web browser
- A text editor (VS Code recommended)
- An internet connection (the font loads from Google Fonts)
- Optional: the **Live Server** VS Code extension

**Files to create:**

```
custom-range-slider/
├── index.html
├── style.css
└── script.js
```

---

## 4. Build the Project Step-by-Step

### Step 1: HTML Skeleton

**🎯 Goal**
Set up the base document linking the stylesheet and script.

**💡 Concept**
Standard boilerplate: styles linked in the head, script at the end of the body so the DOM exists when it runs.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Custom Range Slider</title>
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
Open `index.html`: a blank page titled "Custom Range Slider", no errors.

---

### Step 2: Add the Heading, Slider, and Label

**🎯 Goal**
Add the title, the range input, and the floating value label.

**💡 Concept**
An `<input type="range">` is a native slider. Its `<label>` uses `for="range"` to associate with the input's `id`. We wrap the slider and label in a `.range-container` so we can position the label relative to it.

**📝 Code**

```html
<!-- goes in index.html — inside <body>, above the <script> -->
<h2>Custom Range Slider</h2>
<div class="range-container">
  <input type="range" id="range" min="0" max="100">
  <label for="range">50</label>
</div>
```

**🔍 Explanation**

- `<h2>` is the page title.
- `<input type="range" id="range" min="0" max="100">` is the slider. With no `value` set, the browser defaults it to the midpoint — **50** for a 0–100 range.
- `<label for="range">50</label>` is the bubble. It starts showing "50", matching the slider's default. It comes **right after** the input, which matters: our JS grabs it via `nextElementSibling`.

**✅ Checkpoint**
Refresh. You'll see the heading, a default (grey) slider, and the text "50" — all unstyled.

---

### Step 3: Reset and Center the Page

**🎯 Goal**
Import the font, fix box-sizing, and center everything with a gradient background.

**💡 Concept**
`flex-direction: column` stacks the (absolutely positioned) heading and the slider vertically and centers them.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css?family=Lato&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: 'Lato', sans-serif;
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

- `@import` loads the **Lato** font (keep it first).
- `linear-gradient(135deg, ...)` paints a diagonal light gradient background.
- The `body` is a full-height column flexbox centering its children.

**✅ Checkpoint**
Refresh. The background is now a soft diagonal gradient and the content is centered, using the Lato font.

---

### Step 4: Pin the Heading to the Top

**🎯 Goal**
Move the heading out of the centered flow and pin it near the top.

**💡 Concept**
`position: absolute` removes the heading from normal layout so the slider can be centered on its own, while the title stays fixed near the top.

**📝 Code**

```css
/* goes in style.css */
h2 {
  position: absolute;
  top: 10px;
}
```

**🔍 Explanation**

- `position: absolute` takes the `<h2>` out of the flex flow.
- `top: 10px` places it near the top of the page. Now the slider alone gets centered vertically.

**✅ Checkpoint**
Refresh. The heading jumps to the top; the slider (still default-looking) is centered on screen.

---

### Step 5: Prepare the Container and Base Slider

**🎯 Goal**
Make the container a positioning context and start customizing the slider.

**💡 Concept**
`position: relative` on the container makes it the reference point for the label's absolute positioning (coming in Step 8). `-webkit-appearance: none` strips the browser's built-in slider styling so we can draw our own.

**📝 Code**

```css
/* goes in style.css */
.range-container {
  position: relative;
}

input[type='range'] {
  width: 300px;
  margin: 18px 0;
  -webkit-appearance: none;
}

input[type='range']:focus {
  outline: none;
}
```

**🔍 Explanation**

- `.range-container { position: relative }` — the absolutely positioned label will be measured from this box.
- `width: 300px` fixes the slider's length; `margin: 18px 0` adds vertical space (room for the bubble above).
- `-webkit-appearance: none` removes the default look so our custom track/thumb rules take effect.
- `:focus { outline: none }` hides the default focus ring.

**✅ Checkpoint**
Refresh. The slider may look "broken" or invisible in some browsers — that's expected right after removing default styling. We rebuild it next.

---

### Step 6: Style the Track and Thumb (Chrome / Safari)

**🎯 Goal**
Draw the purple track and the round white handle for WebKit browsers.

**💡 Concept**
Browsers expose the slider's inner parts through **vendor pseudo-elements**. In Chrome/Safari they're `::-webkit-slider-runnable-track` (the bar) and `::-webkit-slider-thumb` (the handle).

**📝 Code**

```css
/* goes in style.css */
/* Chrome & Safari */
input[type='range']::-webkit-slider-runnable-track {
  background: purple;
  border-radius: 4px;
  width: 100%;
  height: 10px;
  cursor: pointer;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 24px;
  width: 24px;
  background: #fff;
  border-radius: 50%;
  border: 1px solid purple;
  margin-top: -7px;
  cursor: pointer;
}
```

**🔍 Explanation**

- The **track** rule paints a 10px-tall purple bar with rounded ends.
- The **thumb** rule draws a 24px white circle (`border-radius: 50%`) with a purple outline. `-webkit-appearance: none` is repeated here so our thumb styles apply.
- `margin-top: -7px` nudges the thumb up so it's vertically centered on the thinner track.

**✅ Checkpoint**
Refresh in Chrome/Edge. The slider now has a purple bar and a round white handle. 

---

### Step 7: Style the Track and Thumb (Firefox & IE)

**🎯 Goal**
Repeat the track/thumb styling for Firefox and legacy IE so the slider looks consistent everywhere.

**💡 Concept**
Each browser engine names these pseudo-elements differently, and you **can't** combine them in one selector list (an unknown one invalidates the whole rule). So we write parallel blocks: `-moz-` for Firefox, `-ms-` for IE.

**📝 Code**

```css
/* goes in style.css */
/* Firefox */
input[type='range']::-moz-range-track {
  background: purple;
  border-radius: 4px;
  width: 100%;
  height: 13px;
  cursor: pointer;
}

input[type='range']::-moz-range-thumb {
  -webkit-appearance: none;
  height: 24px;
  width: 24px;
  background: #fff;
  border-radius: 50%;
  border: 1px solid purple;
  margin-top: -7px;
  cursor: pointer;
}

/* IE */
input[type='range']::-ms-track {
  background: purple;
  border-radius: 4px;
  width: 100%;
  height: 13px;
  cursor: pointer;
}

input[type='range']::-ms-thumb {
  -webkit-appearance: none;
  height: 24px;
  width: 24px;
  background: #fff;
  border-radius: 50%;
  border: 1px solid purple;
  margin-top: -7px;
  cursor: pointer;
}
```

**🔍 Explanation**

- `::-moz-range-track` / `::-moz-range-thumb` style Firefox's slider (track is a touch taller at 13px).
- `::-ms-track` / `::-ms-thumb` cover old Internet Explorer.
- The thumb dimensions match Step 6 so the handle looks the same across browsers.

**✅ Checkpoint**
Refresh in Firefox — the purple track and white thumb now appear there too.

---

### Step 8: Create the Floating Value Label

**🎯 Goal**
Turn the plain "50" text into a floating bubble positioned above the slider.

**💡 Concept**
Using `input[type='range'] + label`, the adjacent-sibling selector targets the label right after the range. `position: absolute` lets us place it precisely; `top: -25px` floats it above, and `left: 110px` is its starting spot (which, as you'll see, is exactly where value 50 lands).

**📝 Code**

```css
/* goes in style.css */
input[type='range'] + label {
  background-color: #fff;
  position: absolute;
  top: -25px;
  left: 110px;
  width: 80px;
  padding: 5px 0;
  text-align: center;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
```

> Note: In the source CSS this rule sits just above the Chrome/Safari block, but CSS order doesn't affect the result here — placing it now keeps our build in a logical "structure, then behavior" order.

**🔍 Explanation**

- `input[type='range'] + label` selects the label immediately following the slider.
- `position: absolute` (relative to `.range-container`) plus `top: -25px` floats the bubble above the track.
- `width: 80px` and `text-align: center` shape a centered pill; `box-shadow` gives it depth.
- `left: 110px` is the initial horizontal position. Our JS will overwrite `left` on every input — but 110px happens to equal the computed position for value 50, so the starting bubble already sits correctly.

**✅ Checkpoint**
Refresh. A white, rounded "50" bubble now floats above the slider. Dragging doesn't move it yet — that's the JavaScript's job.

---

### Step 9: React to Slider Input

**🎯 Goal**
Update the bubble's number whenever the slider moves.

**💡 Concept**
The `input` event fires continuously as you drag. `e.target.value` is always a **string**, so we prefix it with a unary `+` to convert it to a number. `nextElementSibling` grabs the label sitting right after the slider.

**📝 Code**

```js
// goes in script.js
const range = document.getElementById('range')

range.addEventListener('input', (e) => {
    const value = +e.target.value
    const label = e.target.nextElementSibling

    label.innerHTML = value
})
```

**🔍 Explanation**

- `range` references the slider by its `id`.
- On `input`, `+e.target.value` converts the slider's string value (e.g. `"73"`) into the number `73`.
- `e.target.nextElementSibling` is the `<label>` bubble.
- `label.innerHTML = value` updates the displayed number.

**✅ Checkpoint**
Refresh and drag. The bubble's **number** updates live — but it doesn't move horizontally yet. Let's fix its position next.

---

### Step 10: Measure the Real Widths

**🎯 Goal**
Read the actual rendered pixel widths of the slider and the label, which we'll need for positioning.

**💡 Concept**
`getComputedStyle(el).getPropertyValue('width')` returns the width as a string like `"300px"`. To do math we chop off the last two characters (`"px"`) with `.substring(...)` and convert to a number with unary `+`.

**📝 Code**

```js
// goes in script.js — add these inside the input listener, after the label line
    const range_width = getComputedStyle(e.target).getPropertyValue('width')
    const label_width = getComputedStyle(label).getPropertyValue('width')

    const num_width = +range_width.substring(0, range_width.length - 2)
    const num_label_width = +label_width.substring(0, label_width.length - 2)

    const max = +e.target.max
    const min = +e.target.min
```

**🔍 Explanation**

- `range_width` / `label_width` are strings like `"300px"` and `"80px"`.
- `.substring(0, range_width.length - 2)` removes the final `"px"`, and the leading `+` turns the result into a number — so `num_width` is `300` and `num_label_width` is `80`.
- `+e.target.max` and `+e.target.min` read the slider's `max` (100) and `min` (0) as numbers.

**✅ Checkpoint**
No visual change yet — we've gathered measurements but haven't used them. No console errors.

---

### Step 11: Add the Range-Mapping Helper

**🎯 Goal**
Add a small function that maps a number from one range onto another.

**💡 Concept**
A **linear map** (or "scale") converts a value sitting between `in_min`/`in_max` to the equivalent point between `out_min`/`out_max`. We'll use it to nudge the label a few pixels left or right depending on the slider position, correcting for the fact that the thumb's center doesn't quite reach the very ends of the track.

**📝 Code**

```js
// goes in script.js — at the bottom of the file
// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }
```

**🔍 Explanation**

- `scale(num, in_min, in_max, out_min, out_max)` is the classic map-range formula.
- We'll call it as `scale(value, min, max, 10, -10)`: when `value` is at the low end it returns `+10` (push the label right), at the high end `-10` (pull it left), and `0` in the middle.
- This offset keeps the bubble visually centered over the thumb even though the thumb is inset by its own radius at each end.

**✅ Checkpoint**
No visual change — `scale` isn't called yet. We do that in the final step.

---

### Step 12: Position the Label Over the Thumb

**🎯 Goal**
Calculate and apply the label's horizontal position so it tracks the handle.

**💡 Concept**
The thumb's pixel position along the track is `value * (trackWidth / max)`. We subtract half the label's width to center the bubble on that point, then add the `scale(...)` correction. Setting `label.style.left` applies it.

**📝 Code**

```js
// goes in script.js — inside the input listener, between the min/max lines and label.innerHTML
    const left = value * (num_width / max) - num_label_width / 2 + scale(value, min, max, 10, -10)

    label.style.left = `${left}px`
```

**🔍 Explanation**

- `value * (num_width / max)` → how far along the 300px track the thumb sits. (At value 100 that's 300px; at 50 it's 150px.)
- `- num_label_width / 2` → shift left by half the 80px label (40px) so the bubble is *centered* on the thumb, not starting at it.
- `+ scale(value, min, max, 10, -10)` → the edge-correction offset.
- Worked example at value 50: `50 * (300/100) - 40 + scale(50, 0, 100, 10, -10)` = `150 - 40 + 0` = **110px** — exactly the `left: 110px` we hard-coded in CSS. That's why the starting bubble already sat in the right place!
- `label.style.left = \`${left}px\`` writes the computed number back as an inline style with a `px` unit.

**✅ Checkpoint**
Refresh and drag the slider from end to end. The bubble now **follows the handle** and stays centered above it, updating its number the whole way. Project complete!

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
    <title>Custom Range Slider</title>
  </head>
  <body>
    <h2>Custom Range Slider</h2>
    <div class="range-container">
      <input type="range" id="range" min="0" max="100">
      <label for="range">50</label>
    </div>

    <script src="script.js"></script>
  </body>
</html>
```

**`style.css`**

```css
@import url('https://fonts.googleapis.com/css?family=Lato&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: 'Lato', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

h2 {
  position: absolute;
  top: 10px;
}

.range-container {
  position: relative;
}

input[type='range'] {
  width: 300px;
  margin: 18px 0;
  -webkit-appearance: none;
}

input[type='range']:focus {
  outline: none;
}

input[type='range'] + label {
  background-color: #fff;
  position: absolute;
  top: -25px;
  left: 110px;
  width: 80px;
  padding: 5px 0;
  text-align: center;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

/* Chrome & Safari */
input[type='range']::-webkit-slider-runnable-track {
  background: purple;
  border-radius: 4px;
  width: 100%;
  height: 10px;
  cursor: pointer;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 24px;
  width: 24px;
  background: #fff;
  border-radius: 50%;
  border: 1px solid purple;
  margin-top: -7px;
  cursor: pointer;
}

/* Firefox */
input[type='range']::-moz-range-track {
  background: purple;
  border-radius: 4px;
  width: 100%;
  height: 13px;
  cursor: pointer;
}

input[type='range']::-moz-range-thumb {
  -webkit-appearance: none;
  height: 24px;
  width: 24px;
  background: #fff;
  border-radius: 50%;
  border: 1px solid purple;
  margin-top: -7px;
  cursor: pointer;
}

/* IE */
input[type='range']::-ms-track {
  background: purple;
  border-radius: 4px;
  width: 100%;
  height: 13px;
  cursor: pointer;
}

input[type='range']::-ms-thumb {
  -webkit-appearance: none;
  height: 24px;
  width: 24px;
  background: #fff;
  border-radius: 50%;
  border: 1px solid purple;
  margin-top: -7px;
  cursor: pointer;
}
```

**`script.js`**

```js
const range = document.getElementById('range')

range.addEventListener('input', (e) => {
    const value = +e.target.value
    const label = e.target.nextElementSibling

    const range_width = getComputedStyle(e.target).getPropertyValue('width')
    const label_width = getComputedStyle(label).getPropertyValue('width')

    const num_width = +range_width.substring(0, range_width.length - 2)
    const num_label_width = +label_width.substring(0, label_width.length - 2)

    const max = +e.target.max
    const min = +e.target.min

    const left = value * (num_width / max) - num_label_width / 2 + scale(value, min, max, 10, -10)

    label.style.left = `${left}px`


    label.innerHTML = value
})

// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }
```

---

## 6. Recap & Next Steps

**What you learned:**

- Stripping and rebuilding native slider styling with `-webkit-appearance: none` and vendor pseudo-elements across Chrome, Firefox, and IE.
- Handling the `input` event and converting string values to numbers with unary `+`.
- Reading rendered sizes via `getComputedStyle(...).getPropertyValue('width')` and trimming the `"px"`.
- Writing a linear range-mapping (`scale`) function and using it as a positioning correction.
- Setting inline styles from a computed value to make an element track another.

**Enhancement challenges:**

1. **Position on load.** The label position only updates after the first drag. Trigger the handler once on page load so the bubble is calculated correctly from the start.
2. **Change the range.** Set `min`, `max`, and even a `step` on the input and confirm the math still works without touching the JS.
3. **Color the filled portion.** Make the track show a filled color up to the thumb and grey after it.
4. **Add units.** Show a suffix in the bubble, like `73%` or `$73`.
5. **Refactor the "px" parsing.** Replace the `.substring(...)` trick with `parseInt(...)` or `parseFloat(...)` and compare readability.
