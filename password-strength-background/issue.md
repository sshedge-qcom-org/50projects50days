# Issue: Typo'd title, and the Password label points at the Email field

**Status:** Fixed in commit `998d4aa`.

**Where:** `index.html:13` and `index.html:31`

**Problem:**
1. The page title is misspelled:
   ```html
   <title>Password Strength Backround</title>
   ```
2. The "Password:" label's `for` attribute references the wrong input — it points at `email` instead of `password`, so clicking the label focuses the Email field instead:
   ```html
   <label for="email" class="text-gray-900">Password:</label>
   ...
   <input type="password" ... id="password" placeholder="Enter Password" />
   ```

**Solution:**
```html
<title>Password Strength Background</title>
```
```html
<label for="password" class="text-gray-900">Password:</label>
```
