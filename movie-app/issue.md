# Issue: Search appends a stray `"` to every query

**Where:** `script.js:3`

**Problem:**
```js
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'
```
There's an extra `"` right before the string's closing quote. The search handler does `getMovies(SEARCH_API + searchTerm)` (line 59), so every search request sends `query="<searchTerm>` — a literal quote character glued onto the front of whatever the user typed, which throws off the API results.

**Solution:**
Drop the stray quote:
```js
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query='
```

Note: the TMDB API key is also hardcoded directly in this client-side file, so it's visible to anyone who views source. That's normal for a no-backend teaching project, but not something to reuse in a real app without a server-side proxy.
