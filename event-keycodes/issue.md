# Issue: `index.html` links a `style.css` that doesn't exist

**Where:** `index.html:6`

**Problem:**
```html
<link rel="stylesheet" href="style.css" />
```
The folder only contains `dark-style.css` — there is no `style.css` file anywhere in the project. The browser 404s on this request and the page loads with zero styling.

**Solution:**
Point the `<link>` at the file that actually exists:
```html
<link rel="stylesheet" href="dark-style.css" />
```
(Alternatively, rename `dark-style.css` to `style.css` — nothing else in the project references the "dark" name specifically.)
