# Issue: Relies on a retired Unsplash endpoint

**Where:** `script.js:2`

**Problem:**
```js
const unsplashURL = 'https://source.unsplash.com/random/'
```
`source.unsplash.com` ("Unsplash Source") has been discontinued, so requests to it are likely to fail or return broken images — the project may currently render broken image icons instead of random photos, through no fault of the surrounding code.

**Solution:**
Swap in a still-active random-image service, e.g. [Picsum Photos](https://picsum.photos/):
```js
const unsplashURL = 'https://picsum.photos/'

function getRandomSize() {
    return `${getRandomNr()}/${getRandomNr()}`
}
```
Picsum takes `width/height` in the path rather than `widthxheight`, so `getRandomSize()` needs the `/` separator shown above.
