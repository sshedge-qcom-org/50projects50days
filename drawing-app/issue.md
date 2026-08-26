# Issue: `sizeEL` naming inconsistent with sibling variables

**Status:** Fixed in commit `1673440`.

**Where:** `script.js:4` and `script.js:61`

**Problem:**
```js
const sizeEL = document.getElementById('size');
```
Every other DOM reference in the file follows an `xEl` convention (`colorEl`, `clearEl`), but this one is `sizeEL` (capital `EL`). Purely cosmetic — the code runs fine since both the declaration and its one usage match — but it's an inconsistency worth cleaning up.

**Solution:**
```js
const sizeEl = document.getElementById('size');
...
sizeEl.innerText = size
```
