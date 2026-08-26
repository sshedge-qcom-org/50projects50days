# Issue: Boundary crashes and Spacebar accepted as a digit

**Where:** `script.js:5-13`

**Problem:**
```js
codes.forEach((code, idx) => {
    code.addEventListener('keydown', (e) => {
        if(e.key >= 0 && e.key <=9) {
            codes[idx].value = ''
            setTimeout(() => codes[idx + 1].focus(), 10)
        } else if(e.key === 'Backspace') {
            setTimeout(() => codes[idx - 1].focus(), 10)
        }
    })
})
```
Two problems:
1. `e.key` is a string, and `>= 0` / `<= 9` coerce it to a number. `" " >= 0 && " " <= 9` evaluates to `true` (JS coerces `" "` to `0`), so pressing **Spacebar** is treated as a valid digit.
2. There's no bounds check. Entering a digit in the last box calls `codes[idx + 1].focus()`, and pressing Backspace in the first box calls `codes[idx - 1].focus()`. Both `codes[6]` (out of range) and `codes[-1]` are `undefined`, so `.focus()` throws inside the `setTimeout` callback.

**Solution:**
Check the actual character with a digit regex and guard the array bounds:
```js
codes.forEach((code, idx) => {
    code.addEventListener('keydown', (e) => {
        if (/^[0-9]$/.test(e.key)) {
            codes[idx].value = ''
            if (codes[idx + 1]) setTimeout(() => codes[idx + 1].focus(), 10)
        } else if (e.key === 'Backspace') {
            if (codes[idx - 1]) setTimeout(() => codes[idx - 1].focus(), 10)
        }
    })
})
```
