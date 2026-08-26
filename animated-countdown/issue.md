# Issue: Replay accumulates duplicate `animationend` listeners

**Status:** Fixed in commit `700165c`.

**Where:** `script.js` — `runAnimation()`, called a second time by the `replay` click handler

**Problem:**
`runAnimation()` attaches a fresh `animationend` listener to every number element, but nothing ever removes the old ones. The Replay button called both `resetDOM()` and `runAnimation()`:
```js
replay.addEventListener('click', () => {
  resetDOM()
  runAnimation()
})
```
Each replay added one more listener per element on top of the previous ones, so after *n* replays each number had *n* listeners all firing on the same `animationend` event.

Note: the listeners themselves don't need to change between replays — `idx`, `nextToLast`, and `num` are the same every time, and each element's `goIn`/`goOut` cycle needs its listener to fire *twice* per run to cascade to the next digit. So the fix isn't `{ once: true }` (that would break the cascade after the very first `goIn`) — it's simply not re-attaching listeners that are already there.

**Solution:**
Drop the redundant `runAnimation()` call from the replay handler. The listeners attached once at load are already permanent and correct; `resetDOM()` alone is enough to restart the animation:
```js
replay.addEventListener('click', () => {
  resetDOM()
})
```
