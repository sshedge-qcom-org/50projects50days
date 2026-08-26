# Issue: `index.html` loads a `script.js` that doesn't exist

**Status:** Fixed in commit `9d39d25`.

**Where:** `index.html:12`

**Problem:**
```html
<script src="script.js"></script>
```
This project is pure CSS — the animation runs entirely through `@keyframes` — and ships no `script.js` file. The tag causes a harmless but noisy 404 in the browser console on every load.

**Solution:**
Remove the tag, since there's nothing for it to load:
```html
  </body>
</html>
```
