# Issue: No error handling around the `fetch` call

**Where:** `script.js` — `getData()`

**Problem:**
```js
async function getData() {
    const res = await fetch('https://randomuser.me/api?results=50')
    const { results } = await res.json()
    ...
}
```
There's no `try/catch` and no check of `res.ok`. `index.html` ships a hardcoded placeholder while data loads:
```html
<ul id="result" class="user-list">
  <li><h3>Loading...</h3></li>
</ul>
```
If the network request fails or the API returns an error, the `await` rejects, `getData()` throws, and that placeholder is never replaced — the page is stuck showing "Loading..." forever with no indication anything went wrong.

**Solution:**
```js
async function getData() {
    try {
        const res = await fetch('https://randomuser.me/api?results=50')
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const { results } = await res.json()
        ...
    } catch (err) {
        result.innerHTML = '<li><h3>Failed to load users. Please try again later.</h3></li>'
    }
}
```
