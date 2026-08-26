# Testimonial Box Switcher

## 1. Project Overview

A single "testimonial card" that automatically rotates through a list of customer reviews, swapping the quote, name, role, and photo every 10 seconds while a progress bar sweeps across the top.

**Key concepts involved**

- Storing structured data in a JavaScript **array of objects**
- **DOM manipulation** — updating text and image `src` from JS
- **Timers** with `setInterval`
- Keeping the UI in sync with a moving **index** into an array (a tiny bit of "state")
- A pure-CSS **`@keyframes` animation** timed to match the JS timer

**HTML skills you'll gain**

- Structuring a self-contained "card" component
- Loading an icon font (Font Awesome) from a CDN via `<link>`
- Using semantic elements like `<p>`, `<h4>`, and `<img>` with `alt` text

**CSS skills you'll gain**

- Centering a card on the page with Flexbox
- Absolute positioning of decorative icons relative to a positioned parent
- Making circular avatars with `border-radius: 50%` + `object-fit: cover`
- Writing a `@keyframes` animation and using `transform-origin`
- A basic responsive `@media` query

**JavaScript skills you'll gain**

- Selecting elements with `document.querySelector`
- Modeling data as an array of objects
- **Destructuring** properties out of an object
- Updating the DOM (`innerHTML`, `.src`)
- Looping an index back to the start (wrap-around logic)
- Running code on a repeating schedule with `setInterval`

---

## 2. Final Project Preview

**Layout & colors**
A soft grey page with one rounded, royal-blue card centered both vertically and horizontally. Inside the card, from top to bottom: a thin white progress bar pinned to the top edge, two faint quotation-mark icons in the upper corners, a block of justified white review text, and — at the bottom — a circular user photo next to the person's name and job title.

**Behavior & interactions**

- The white progress bar continuously grows from left to right over 10 seconds, then instantly resets and grows again — a visual countdown to the next testimonial.
- Every 10 seconds the card's **text, name, role, and photo** all change to the next person in the list.
- After the last testimonial, it loops back to the beginning.

**What you can interact with**
Nothing is clickable — this project is fully automatic. The "interaction" is watching it cycle. (This makes it a great first look at timers without the distraction of event handling.)

---

## 3. Prerequisites

**Basic knowledge required**

- HTML tags and attributes
- CSS selectors and the box model
- JavaScript variables, functions, and arrays

**Tools needed**

- A modern web browser (Chrome, Firefox, Edge…)
- A text editor (VS Code recommended)
- Optional but recommended: the **Live Server** VS Code extension for auto-reload
- An internet connection (the icon font and the photos load from the web)

**Files to create**

```
testimonial-box-switcher/
├── index.html
├── style.css
└── script.js
```

Create these three **empty** files now. We'll fill them in step by step.

---

## 4. Build the Project Step-by-Step

### Step 1: Set up the HTML document and load our stylesheets

**🎯 Goal**
Create the page skeleton and connect the icon font and our own stylesheet before we write any content.

**💡 Concept**
Icon fonts like **Font Awesome** let you drop in scalable vector icons using only CSS classes. We load it from a **CDN** (Content Delivery Network) — a URL that serves the file for us, so we don't have to download anything.

**📝 Code**

```html
<!-- goes in index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
      integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=="
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="style.css" />
    <title>Testimonial Box</title>
  </head>
  <body>
    <!-- our card will go here -->
    <script src="script.js"></script>
  </body>
</html>
```

**🔍 Explanation**

- The first `<link>` pulls in Font Awesome's CSS from the CDN. The `integrity` and `crossorigin` attributes are a security feature (**Subresource Integrity**) that lets the browser verify the file wasn't tampered with.
- The second `<link>` loads our own `style.css`.
- `<script src="script.js">` is placed at the **end of `<body>`** so the HTML exists before our JavaScript runs.

**✅ Checkpoint**
Open `index.html` in the browser. You'll see a blank page with the tab titled "Testimonial Box". No errors — good.

---

### Step 2: Add the testimonial card container and progress bar

**🎯 Goal**
Create the card and the progress bar that sits at its very top.

**💡 Concept**
We build the card as a `<div>` that acts as a **positioning context** for everything inside it. The progress bar is its own empty `<div>` — an element can be purely decorative.

**📝 Code**

```html
<!-- goes in index.html, inside <body>, replacing the comment -->
<div class="testimonial-container">
  <div class="progress-bar"></div>
</div>
```

**🔍 Explanation**

- `.testimonial-container` is the blue card.
- `.progress-bar` is an empty div — it has no text; its job is purely visual. We'll animate it later.

**✅ Checkpoint**
Still unstyled, so you'll only see a bit of nothing. That's fine — structure first, styling later.

---

### Step 3: Add the decorative quote icons

**🎯 Goal**
Drop two quotation-mark icons into the top corners of the card.

**💡 Concept**
Font Awesome icons are just `<div>`s (or `<i>`s) with special classes: `fas` means "Font Awesome Solid", and `fa-quote-right` / `fa-quote-left` pick the specific icon.

**📝 Code**

```html
<!-- goes in index.html, inside .testimonial-container, after .progress-bar -->
<div class="fas fa-quote-right fa-quote"></div>
<div class="fas fa-quote-left fa-quote"></div>
```

**🔍 Explanation**

- `fas` + `fa-quote-right` tells Font Awesome *which* icon to render.
- `fa-quote` is **our own** class (not Font Awesome's) — we'll use it in CSS to position and color both icons at once.

**✅ Checkpoint**
You should now see two small quotation-mark icons appear (top-left area) once the CDN font loads. They're not positioned yet.

---

### Step 4: Add the testimonial text

**🎯 Goal**
Add the review paragraph. This is the first person's testimonial, hard-coded so the card isn't empty before JavaScript runs.

**💡 Concept**
Providing sensible **default content** in the HTML means the page looks complete even for the split second before (or if) JavaScript loads.

**📝 Code**

```html
<!-- goes in index.html, after the two quote icons -->
<p class="testimonial">
  I've worked with literally hundreds of HTML/CSS developers and I have to
  say the top spot goes to this guy. This guy is an amazing developer. He
  stresses on good, clean code and pays heed to the details. I love
  developers who respect each and every aspect of a throughly thought out
  design and do their best to put it in code. He goes over and beyond and
  transforms ART into PIXELS - without a glitch, every time.
</p>
```

**🔍 Explanation**
A single `<p>` with the class `testimonial`. JavaScript will later overwrite this text — but having it here means the card never looks broken.

**✅ Checkpoint**
The review text appears on the page. Still unstyled black text on white.

---

### Step 5: Add the user block (photo, name, role)

**🎯 Goal**
Show who gave the testimonial: a circular avatar plus their name and role.

**💡 Concept**
Grouping related pieces (image + text) inside a wrapper `<div>` lets us lay them out together with Flexbox later.

**📝 Code**

```html
<!-- goes in index.html, after the .testimonial paragraph -->
<div class="user">
  <img
    src="https://randomuser.me/api/portraits/women/46.jpg"
    alt="user"
    class="user-image"
  />
  <div class="user-details">
    <h4 class="username">Miyah Myles</h4>
    <p class="role">Marketing</p>
  </div>
</div>
```

**🔍 Explanation**

- `.user` wraps the whole footer of the card.
- `.user-image` is the avatar (from the free randomuser.me service).
- `.user-details` groups the `.username` (`<h4>`) and `.role` (`<p>`). We give each the exact class JavaScript will target later.

**✅ Checkpoint**
Your full card content is now present: quotes, review, photo, name, and role — just not yet styled. Your `<body>` should contain `.testimonial-container` (with everything inside) followed by the `<script>` tag from Step 1.

---

### Step 6: Base page styling — font, reset, and centering

**🎯 Goal**
Import the font, apply a sensible box model, and center the card in the middle of the screen.

**💡 Concept**
`box-sizing: border-box` makes `width`/`height` include padding and border (far more predictable). A Flexbox `body` is the simplest way to perfectly center one thing on the page.

**📝 Code**

```css
/* goes in style.css */
@import url('https://fonts.googleapis.com/css?family=Montserrat');

* {
  box-sizing: border-box;
}

body {
  background-color: #f4f4f4;
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 10px;
}
```

**🔍 Explanation**

- `@import` loads the Montserrat font from Google Fonts.
- `*` selects **every** element for the box-sizing reset.
- On `body`: `display: flex` + `align-items: center` + `justify-content: center` center children both ways; `height: 100vh` makes the body fill the viewport so there's room to center within; `overflow: hidden` hides the progress bar animation when it briefly overflows; `margin: 0` removes the default body margin.

**✅ Checkpoint**
The content is now centered on a light-grey page in the Montserrat font.

---

### Step 7: Style the card container

**🎯 Goal**
Turn the plain div into the rounded blue card.

**💡 Concept**
`position: relative` on the container is the crucial line — it makes the container the **reference point** for the absolutely-positioned quote icons and progress bar we'll place next.

**📝 Code**

```css
/* goes in style.css */
.testimonial-container {
  background-color: #476ce4;
  color: #fff;
  border-radius: 15px;
  margin: 20px auto;
  padding: 50px 80px;
  max-width: 768px;
  position: relative;
}
```

**🔍 Explanation**

- Blue background, white text, rounded corners.
- `padding: 50px 80px` gives breathing room (50px top/bottom, 80px left/right).
- `max-width: 768px` stops the card from getting too wide on big screens.
- `position: relative` establishes the positioning context — remember this for the next step.

**✅ Checkpoint**
You now have a proper blue rounded card with white text, centered on the page.

---

### Step 8: Position the quote icons

**🎯 Goal**
Pin the two quotation marks into the top corners as faint decorations.

**💡 Concept**
`position: absolute` takes an element out of normal flow and positions it relative to the nearest **positioned ancestor** — which is our `.testimonial-container` from Step 7.

**📝 Code**

```css
/* goes in style.css */
.fa-quote {
  color: rgba(255, 255, 255, 0.3);
  font-size: 28px;
  position: absolute;
  top: 70px;
}

.fa-quote-right {
  left: 40px;
}

.fa-quote-left {
  right: 40px;
}
```

**🔍 Explanation**

- `.fa-quote` (our shared class) makes both icons semi-transparent white (`rgba` with `0.3` alpha), 28px, and absolutely positioned 70px from the top.
- We then nudge each individually: the *right*-facing quote to the left corner, the *left*-facing quote to the right corner (they visually "open" toward the text).

**✅ Checkpoint**
The two quote marks now sit faintly in the upper-left and upper-right corners of the card.

---

### Step 9: Style the testimonial text and user block

**🎯 Goal**
Make the review readable and lay out the avatar next to the name/role.

**💡 Concept**
Flexbox again — this time to place the photo and the text side by side and vertically centered.

**📝 Code**

```css
/* goes in style.css */
.testimonial {
  line-height: 28px;
  text-align: justify;
}

.user {
  display: flex;
  align-items: center;
  justify-content: center;
}

.user .user-image {
  border-radius: 50%;
  height: 75px;
  width: 75px;
  object-fit: cover;
}

.user .user-details {
  margin-left: 10px;
}

.user .username {
  margin: 0;
}

.user .role {
  font-weight: normal;
  margin: 10px 0;
}
```

**🔍 Explanation**

- `.testimonial`: taller line spacing and justified edges for a clean paragraph.
- `.user`: a centered flex row.
- `.user-image`: `border-radius: 50%` makes the square image a circle; `object-fit: cover` prevents the photo from stretching by cropping it to fill the 75×75 box.
- The `.user .user-details` (descendant selector) and the margin tweaks tidy up spacing around the name and role.

**✅ Checkpoint**
The avatar is now a neat circle beside the name and role, and the paragraph reads cleanly.

---

### Step 10: Animate the progress bar

**🎯 Goal**
Make the top bar sweep across over 10 seconds, forever.

**💡 Concept**
A `@keyframes` rule defines an animation. `transform-origin: left` combined with `scaleX` makes the bar *grow from the left edge* rather than from the center.

**📝 Code**

```css
/* goes in style.css */
.progress-bar {
  background-color: #fff;
  height: 4px;
  width: 100%;
  animation: grow 10s linear infinite;
  transform-origin: left;
}

@keyframes grow {
  0% {
    transform: scaleX(0);
  }
}
```

**🔍 Explanation**

- The bar is a full-width, 4px white line.
- `animation: grow 10s linear infinite` runs the `grow` animation over **10 seconds**, at a constant speed (`linear`), repeating forever.
- The `@keyframes grow` only defines the **start** (`0%`) as `scaleX(0)` (invisible). With no `100%` defined, the browser animates back to the element's natural state — `scaleX(1)` (full width). `transform-origin: left` anchors that growth to the left edge.

**⚠️ Gotcha — the timing is intentional:** the `10s` here is *not* a coincidence. It matches the `10000` milliseconds we'll pass to `setInterval` in JavaScript, so the bar finishes exactly as the testimonial switches.

**✅ Checkpoint**
The white bar now grows from left to right across the top of the card over 10 seconds, then snaps back and repeats.

---

### Step 11: Add the responsive tweak

**🎯 Goal**
Make the card comfortable on small screens.

**💡 Concept**
A `@media` query applies CSS only when a condition (here, a max screen width) is true.

**📝 Code**

```css
/* goes in style.css */
@media (max-width: 768px) {
  .testimonial-container {
    padding: 20px 30px;
  }

  .fa-quote {
    display: none;
  }
}
```

**🔍 Explanation**
On screens 768px wide or narrower, we shrink the card's padding and **hide the quote icons** (`display: none`) since there's less room. This is a small, practical taste of responsive design.

**✅ Checkpoint**
Resize your browser narrow (or use dev-tools device mode). The card padding tightens and the quote marks disappear. The CSS is now complete.

---

### Step 12: Select the elements JavaScript will update

**🎯 Goal**
Grab references to the DOM elements whose content we'll swap every 10 seconds.

**💡 Concept**
`document.querySelector('.someClass')` returns the first element matching a CSS selector. We store the ones we plan to change in variables so we don't re-query them repeatedly.

**📝 Code**

```js
// goes in script.js
const testimonialsContainer = document.querySelector('.testimonials-container')
const testimonial = document.querySelector('.testimonial')
const userImage = document.querySelector('.user-image')
const username = document.querySelector('.username')
const role = document.querySelector('.role')
```

**🔍 Explanation**
We select the paragraph, the avatar image, the name, and the role — the four things that change.

**⚠️ Gotcha worth noticing:** the first line queries `.testimonials-container` (plural "testimonials"), but our HTML class is `.testimonial-container` (singular). So `testimonialsContainer` is actually `null`! This is a real quirk in the original project — but it works fine because **that variable is never used anywhere**. Lesson: a mismatched selector fails *silently* (you get `null`, not an error) — and unused variables cause no harm but are worth cleaning up. We keep it here to faithfully match the source.

**✅ Checkpoint**
Open the browser console (F12). No errors. Nothing visibly changed yet.

---

### Step 13: Create the testimonials data array

**🎯 Goal**
Store all the testimonials as data, separate from the display logic.

**💡 Concept**
An **array of objects** is the standard way to hold a list of records. Each object has the same shape (`name`, `position`, `photo`, `text`), like rows in a table.

**📝 Code**

```js
// goes in script.js
const testimonials = [
  {
    name: 'Miyah Myles',
    position: 'Marketing',
    photo:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6',
    text:
      "I've worked with literally hundreds of HTML/CSS developers and I have to say the top spot goes to this guy. This guy is an amazing developer. He stresses on good, clean code and pays heed to the details. I love developers who respect each and every aspect of a throughly thought out design and do their best to put it in code. He goes over and beyond and transforms ART into PIXELS - without a glitch, every time.",
  },
  {
    name: 'June Cha',
    position: 'Software Engineer',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    text:
      'This guy is an amazing frontend developer that delivered the task exactly how we need it, do your self a favor and hire him, you will not be disappointed by the work delivered. He will go the extra mile to make sure that you are happy with your project. I will surely work again with him!',
  },
  {
    name: 'Iida Niskanen',
    position: 'Data Entry',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    text:
      "This guy is a hard worker. Communication was also very good with him and he was very responsive all the time, something not easy to find in many freelancers. We'll definitely repeat with him.",
  },
  {
    name: 'Renee Sims',
    position: 'Receptionist',
    photo: 'https://randomuser.me/api/portraits/women/65.jpg',
    text:
      "This guy does everything he can to get the job done and done right. This is the second time I've hired him, and I'll hire him again in the future.",
  },
  {
    name: 'Jonathan Nunfiez',
    position: 'Graphic Designer',
    photo: 'https://randomuser.me/api/portraits/men/43.jpg',
    text:
      "I had my concerns that due to a tight deadline this project can't be done. But this guy proved me wrong not only he delivered an outstanding work but he managed to deliver 1 day prior to the deadline. And when I asked for some revisions he made them in MINUTES. I'm looking forward to work with him again and I totally recommend him. Thanks again!",
  },
  {
    name: 'Sasha Ho',
    position: 'Accountant',
    photo:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb',
    text:
      'This guy is a top notch designer and front end developer. He communicates well, works fast and produces quality work. We have been lucky to work with him!',
  },
  {
    name: 'Veeti Seppanen',
    position: 'Director',
    photo: 'https://randomuser.me/api/portraits/men/97.jpg',
    text:
      'This guy is a young and talented IT professional, proactive and responsible, with a strong work ethic. He is very strong in PSD2HTML conversions and HTML/CSS technology. He is a quick learner, eager to learn new technologies. He is focused and has the good dynamics to achieve due dates and outstanding results.',
  },
]
```

**🔍 Explanation**
Seven objects, each a complete testimonial. Separating **data** (this array) from **behavior** (the function next) is a core programming habit — you can add, remove, or edit testimonials without touching any display logic.

**✅ Checkpoint**
Still no visible change (we haven't used the data yet), and still no console errors.

---

### Step 14: Write the update function

**🎯 Goal**
Create a function that puts one testimonial onto the card, then advances to the next.

**💡 Concept**
**Destructuring** pulls named properties out of an object into variables in one line. We also manage a wrap-around **index** so the list loops forever.

**📝 Code**

```js
// goes in script.js
let idx = 1

function updateTestimonial() {
  const { name, position, photo, text } = testimonials[idx]

  testimonial.innerHTML = text
  userImage.src = photo
  username.innerHTML = name
  role.innerHTML = position

  idx++

  if (idx > testimonials.length - 1) {
    idx = 0
  }
}
```

**🔍 Explanation**

- `let idx = 1` — the current position in the array. **Why start at 1, not 0?** The HTML already shows testimonial `[0]` (Miyah Myles). Starting the *first update* at `[1]` avoids showing the same person twice in a row.
- `const { name, position, photo, text } = testimonials[idx]` grabs those four properties from the current object in one line.
- The four assignments push the data into the DOM: text via `innerHTML`, the photo via the image's `.src`, etc.
- `idx++` moves to the next testimonial.
- The `if` check resets `idx` back to `0` once it passes the last item (`testimonials.length - 1` is the last valid index) — this is the wrap-around that makes it loop.

**✅ Checkpoint**
Call `updateTestimonial()` once from the console — the card should change to June Cha (index 1). It won't change on its own yet; that's the final step.

---

### Step 15: Start the automatic rotation

**🎯 Goal**
Run `updateTestimonial` automatically every 10 seconds.

**💡 Concept**
`setInterval(fn, ms)` runs `fn` repeatedly, every `ms` milliseconds, until the page closes.

**📝 Code**

```js
// goes in script.js
setInterval(updateTestimonial, 10000)
```

**🔍 Explanation**
`10000` milliseconds = 10 seconds — **the same duration as the CSS progress-bar animation** from Step 10. That's why the bar reaching the far edge lines up perfectly with the testimonial switching. Note we pass `updateTestimonial` **without** parentheses — we're handing `setInterval` the function to call later, not calling it now.

**✅ Checkpoint**
Reload the page. Watch: the progress bar sweeps across, and exactly when it completes (10s), the whole testimonial changes. It cycles through all seven and loops back. Done! 🎉

---

## 5. Final Full Code (Reference)

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
      integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=="
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="style.css" />
    <title>Testimonial Box</title>
  </head>
  <body>
    <div class="testimonial-container">
      <div class="progress-bar"></div>
      <div class="fas fa-quote-right fa-quote"></div>
      <div class="fas fa-quote-left fa-quote"></div>
      <p class="testimonial">
        I've worked with literally hundreds of HTML/CSS developers and I have to
        say the top spot goes to this guy. This guy is an amazing developer. He
        stresses on good, clean code and pays heed to the details. I love
        developers who respect each and every aspect of a throughly thought out
        design and do their best to put it in code. He goes over and beyond and
        transforms ART into PIXELS - without a glitch, every time.
      </p>
      <div class="user">
        <img
          src="https://randomuser.me/api/portraits/women/46.jpg"
          alt="user"
          class="user-image"
        />
        <div class="user-details">
          <h4 class="username">Miyah Myles</h4>
          <p class="role">Marketing</p>
        </div>
      </div>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

```css
/* style.css */
@import url('https://fonts.googleapis.com/css?family=Montserrat');

* {
  box-sizing: border-box;
}

body {
  background-color: #f4f4f4;
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 10px;
}

.testimonial-container {
  background-color: #476ce4;
  color: #fff;
  border-radius: 15px;
  margin: 20px auto;
  padding: 50px 80px;
  max-width: 768px;
  position: relative;
}

.fa-quote {
  color: rgba(255, 255, 255, 0.3);
  font-size: 28px;
  position: absolute;
  top: 70px;
}

.fa-quote-right {
  left: 40px;
}

.fa-quote-left {
  right: 40px;
}

.testimonial {
  line-height: 28px;
  text-align: justify;
}

.user {
  display: flex;
  align-items: center;
  justify-content: center;
}

.user .user-image {
  border-radius: 50%;
  height: 75px;
  width: 75px;
  object-fit: cover;
}

.user .user-details {
  margin-left: 10px;
}

.user .username {
  margin: 0;
}

.user .role {
  font-weight: normal;
  margin: 10px 0;
}

.progress-bar {
  background-color: #fff;
  height: 4px;
  width: 100%;
  animation: grow 10s linear infinite;
  transform-origin: left;
}

@keyframes grow {
  0% {
    transform: scaleX(0);
  }
}

@media (max-width: 768px) {
  .testimonial-container {
    padding: 20px 30px;
  }

  .fa-quote {
    display: none;
  }
}
```

```js
// script.js
const testimonialsContainer = document.querySelector('.testimonials-container')
const testimonial = document.querySelector('.testimonial')
const userImage = document.querySelector('.user-image')
const username = document.querySelector('.username')
const role = document.querySelector('.role')

const testimonials = [
  {
    name: 'Miyah Myles',
    position: 'Marketing',
    photo:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6',
    text:
      "I've worked with literally hundreds of HTML/CSS developers and I have to say the top spot goes to this guy. This guy is an amazing developer. He stresses on good, clean code and pays heed to the details. I love developers who respect each and every aspect of a throughly thought out design and do their best to put it in code. He goes over and beyond and transforms ART into PIXELS - without a glitch, every time.",
  },
  {
    name: 'June Cha',
    position: 'Software Engineer',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    text:
      'This guy is an amazing frontend developer that delivered the task exactly how we need it, do your self a favor and hire him, you will not be disappointed by the work delivered. He will go the extra mile to make sure that you are happy with your project. I will surely work again with him!',
  },
  {
    name: 'Iida Niskanen',
    position: 'Data Entry',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    text:
      "This guy is a hard worker. Communication was also very good with him and he was very responsive all the time, something not easy to find in many freelancers. We'll definitely repeat with him.",
  },
  {
    name: 'Renee Sims',
    position: 'Receptionist',
    photo: 'https://randomuser.me/api/portraits/women/65.jpg',
    text:
      "This guy does everything he can to get the job done and done right. This is the second time I've hired him, and I'll hire him again in the future.",
  },
  {
    name: 'Jonathan Nunfiez',
    position: 'Graphic Designer',
    photo: 'https://randomuser.me/api/portraits/men/43.jpg',
    text:
      "I had my concerns that due to a tight deadline this project can't be done. But this guy proved me wrong not only he delivered an outstanding work but he managed to deliver 1 day prior to the deadline. And when I asked for some revisions he made them in MINUTES. I'm looking forward to work with him again and I totally recommend him. Thanks again!",
  },
  {
    name: 'Sasha Ho',
    position: 'Accountant',
    photo:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb',
    text:
      'This guy is a top notch designer and front end developer. He communicates well, works fast and produces quality work. We have been lucky to work with him!',
  },
  {
    name: 'Veeti Seppanen',
    position: 'Director',
    photo: 'https://randomuser.me/api/portraits/men/97.jpg',
    text:
      'This guy is a young and talented IT professional, proactive and responsible, with a strong work ethic. He is very strong in PSD2HTML conversions and HTML/CSS technology. He is a quick learner, eager to learn new technologies. He is focused and has the good dynamics to achieve due dates and outstanding results.',
  },
]

let idx = 1

function updateTestimonial() {
  const { name, position, photo, text } = testimonials[idx]

  testimonial.innerHTML = text
  userImage.src = photo
  username.innerHTML = name
  role.innerHTML = position

  idx++

  if (idx > testimonials.length - 1) {
    idx = 0
  }
}

setInterval(updateTestimonial, 10000)
```

---

## 6. Recap & Next Steps

**What you learned**

- Building a self-contained card component and loading an icon font from a CDN
- Centering with Flexbox and positioning decorations with `position: absolute` inside a `position: relative` parent
- Writing a looping `@keyframes` animation and syncing its duration to a JS timer
- Modeling a list as an **array of objects**, and **destructuring** to read from it
- Updating the DOM and looping an index with wrap-around logic
- Driving automatic UI updates with `setInterval`
- A real debugging lesson: a mistyped selector returns `null` *silently*

**Enhancement challenges**

1. **Manual controls:** add "Next" and "Previous" buttons that call the update logic on click (and reset the progress bar).
2. **Pause on hover:** use `clearInterval` when the mouse is over the card and restart it on mouse-out.
3. **Fix the quirk:** correct the `.testimonials-container` selector (or remove the unused variable) and give the container a subtle fade transition between testimonials.
4. **Restart the bar on switch:** make the progress bar visibly reset each time the testimonial changes (hint: briefly remove and re-add the element or its animation).
5. **Load from an API:** replace the hard-coded array by fetching testimonials from a JSON file or a public API with `fetch`.
