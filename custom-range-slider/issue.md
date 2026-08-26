# Issue: Label position isn't set until the first drag

**Status:** Fixed in commit `6547f84`.

**Where:** `script.js` (`input` event handler) and `style.css:42`

**Problem:**
The value label's position was only calculated and applied inside the slider's `input` event handler — it never ran until the user actually dragged the slider:
```js
range.addEventListener('input', (e) => {
    // ...calculates `left` from the slider value...
    label.style.left = `${left}px`
    label.innerHTML = value
})
```
On page load, the label sat at whatever `style.css` hardcodes — `left: 110px;` — which only looked correct because the slider's default value happens to be `50`. If the default `value`/`min`/`max` ever changed, the label would render in the wrong spot until the first interaction.

**Solution:**
Extracted the positioning logic into a named `updateLabel()` function and called it once on load, in addition to on every `input` event:
```js
range.addEventListener('input', (e) => updateLabel(e.target))

function updateLabel(target) {
    // ...same calculation as before...
    label.style.left = `${left}px`
    label.innerHTML = value
}

const scale = (num, in_min, in_max, out_min, out_max) => { /* ... */ }

updateLabel(range)
```
Note: the initial `updateLabel(range)` call has to come *after* `scale` is defined — `scale` is a `const`, and calling `updateLabel` before that line executes would hit it while still in the temporal dead zone and throw.
