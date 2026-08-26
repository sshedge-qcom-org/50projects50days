# Issue: Midnight displays as `0` instead of `12`

**Where:** `script.js:28`

**Problem:**
```js
const hoursForClock = hours >= 13 ? hours % 12 : hours;
```
This only converts the 13–23 range down to 1–11. At midnight, `hours` (from `Date().getHours()`) is `0`, which doesn't satisfy `>= 13`, so `hoursForClock` stays `0` — the digital readout shows "0:00 AM" instead of "12:00 AM".

**Solution:**
Handle `0` explicitly:
```js
const hoursForClock = hours === 0 ? 12 : hours > 12 ? hours % 12 : hours;
```
