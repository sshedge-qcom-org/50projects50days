# Issue: Replay accumulates duplicate `animationend` listeners

**Where:** `script.js` — `runAnimation()`, called again by the `replay` click handler

**Problem:**
`runAnimation()` attaches a fresh `animationend` listener to every number element, but nothing ever removes the old ones:
```js
replay.addEventListener('click', () => {
  resetDOM()
  runAnimation()
})
```
Each replay adds one more listener per element on top of the previous ones. After *n* replays, each number has *n* listeners all firing on the same `animationend` event, so the completion logic (advancing to the next number, showing the final message) runs redundantly more times with every replay.

**Solution:**
Register each listener with `{ once: true }` so it self-removes after firing instead of accumulating:
```js
num.addEventListener('animationend', (e) => {
  // ...same handler body...
}, { once: true })
```
