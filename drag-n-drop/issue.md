# Issue: Missing `.invisible` CSS rule, and a retired Unsplash endpoint

**Status:** Fixed in commit `63737dc`.

**Where:** `script.js:21` and `style.css:24`

**Problem:**
1. While dragging, the fill element's class is set to `invisible` to hide it during the drag:
   ```js
   setTimeout(() => fill.className = 'invisible', 0)
   ```
   But `style.css` never defines an `.invisible` rule. The element only *looks* hidden because removing the `.fill` class also strips its `width`/`height`/`background-image`, collapsing it to a zero-height default `<div>` — an accidental side effect, not an intentional "hidden" state. If `.empty`/`.fill` sizing ever changes, this would silently stop working.
2. `style.css` also points at the retired Unsplash Source endpoint:
   ```css
   .fill {
     background-image: url('https://source.unsplash.com/random/150x150');
   }
   ```

**Solution:**
Add an explicit rule so hiding the element is intentional rather than incidental:
```css
.invisible {
  display: none;
}
```
And swap the image source to a still-active service:
```css
.fill {
  background-image: url('https://picsum.photos/150/150');
}
```
