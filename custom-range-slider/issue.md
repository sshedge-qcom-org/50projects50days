# Issue: Label position isn't set until the first drag

**Where:** `script.js` (`input` event handler) and `style.css:42`

**Problem:**
The value label's position is only calculated and applied inside the slider's `input` event handler — it never runs until the user actually drags the slider:
```js
range.addEventListener('input', (e) => {
    // ...calculates `left` from the slider value...
    label.style.left = `${left}px`
    label.innerHTML = value
})
```
On page load, the label sits at whatever `style.css` hardcodes — `left: 110px;` — which only looks correct because the slider's default value happens to be `50`. If the default `value`/`min`/`max` ever changed, the label would render in the wrong spot until the first interaction.

**Solution:**
Extract the positioning logic into a named function and call it once on load, in addition to on every `input` event:
```js
function updateLabel(target) {
    // ...same calculation as before...
    label.style.left = `${left}px`
    label.innerHTML = value
}

range.addEventListener('input', (e) => updateLabel(e.target))
updateLabel(range)
```
