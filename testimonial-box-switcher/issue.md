# Issue: `testimonialsContainer` selector doesn't match the HTML

**Where:** `script.js:1`

**Problem:**
```js
const testimonialsContainer = document.querySelector('.testimonials-container')
```
The HTML element is singular — `class="testimonial-container"` (`index.html:16`) — so this selector always returns `null`. It's currently harmless only because `testimonialsContainer` is never used anywhere else in the file, but it's dead, broken code waiting to throw a null-reference error the moment someone tries to use it.

**Solution:**
Either fix the selector to match the HTML:
```js
const testimonialsContainer = document.querySelector('.testimonial-container')
```
or delete the unused line entirely if nothing needs it.
