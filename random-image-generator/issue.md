# Issue: Relies on a retired Unsplash endpoint

**Status:** Fixed in commit `68f5777`.

**Where:** `script.js:2`

**Problem:**
```js
const unsplashURL = 'https://source.unsplash.com/random/'
```
`source.unsplash.com` ("Unsplash Source") has been discontinued, so requests to it are likely to fail or return broken images — the project may render broken image icons instead of random photos, through no fault of the surrounding code.

**Solution:**
Swapped in [Picsum Photos](https://picsum.photos/), which is still active:
```js
const picsumURL = 'https://picsum.photos/'

function getRandomSize() {
    return `${getRandomNr()}/${getRandomNr()}`
}
```
Picsum takes `width/height` in the path rather than `widthxheight`, so `getRandomSize()` uses a `/` separator instead of `x`.
