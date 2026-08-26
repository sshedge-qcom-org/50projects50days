# Issue: Timer can't be restarted after it finishes

**Where:** `script.js:12` and the `run()` / `resetAll()` functions

**Problem:**
The interval is created exactly once, at script load:
```js
const timerInterval = setInterval(run, 1000);
```
When the countdown reaches zero, `run()` clears that interval and nothing ever recreates it:
```js
if (currentSeconds <= 0) {
  clearInterval(timerInterval);
  resetAll();
}
```
`resetAll()` puts the timer back to its starting value and toggles the play button's icon back to "play", but pressing Play again only flips the `playing` flag — since `timerInterval` was already cleared and nothing recreates it, `run()` is never invoked again, so the countdown silently does nothing. Only a full page reload restores functionality.

**Solution:**
Create a fresh interval each time the timer is (re)started instead of relying on the one created at load:
```js
let timerInterval;

playBtn.addEventListener('click', () => {
  playing = !playing;
  if (playing && !timerInterval) {
    timerInterval = setInterval(run, 1000);
  }
  // ...existing icon/DOM toggling...
});

function run() {
  if (playing) {
    currentSeconds -= 1;
    if (currentSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      resetAll();
    }
    // ...existing display update...
  }
}
```
