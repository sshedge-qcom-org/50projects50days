# Issue: Malformed sprite `<img>` tag (stray extra quote)

**Where:** `script.js:50`

**Problem:**
```js
<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt="${name}">
```
There's an extra `"` right after `.png`, before the space and `alt=`. Browsers are lenient enough to still render the image, but the markup is invalid and could break under a stricter parser or HTML validator.

**Solution:**
Remove the extra quote:
```js
<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${name}">
```
