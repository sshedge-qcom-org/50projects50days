# Issue: `name` shadows the global `window.name`

**Status:** Fixed in commit `d08da8d`.

**Where:** `script.js:5`

**Problem:**
```js
const name = document.getElementById('name')
```
`window.name` is a real, pre-existing browser global (historically used for cross-frame communication). Declaring a top-level `const name` shadows it for the rest of the script — harmless today since nothing here reads `window.name`, but it's a latent footgun: any code added later that expects the real `window.name` would silently get this DOM element instead.

**Solution:**
Rename the variable to something that doesn't collide with a Web API global:
```js
const nameEl = document.getElementById('name')
...
nameEl.innerHTML = 'John Doe'
```
