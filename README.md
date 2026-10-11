# CCMG website: moving from Squarespace to GitHub Pages

This folder is the complete website for the Coalition of CSOs on Migration in Ghana (CCMG). It is plain HTML, CSS and JavaScript, so GitHub Pages can host it for free with no build step.

```
index.html          Home (goals, highlights, member map, newsletter)
information.html    Projects, safety tips, myths vs facts, community, upcoming dates
members.html        Member profiles (pop-ups), full list, services chart, collaborate form
contact.html        Inquiry form and emergency helplines
404.html            "Page not found" page
css/site.css        All the styling (colours are at the top)
js/config.js        Email address + Formspree form IDs   <- you edit this
js/members.js       The member profiles                  <- you edit this
js/map.js           The organisations on the map         <- you edit this
js/main.js          Menu, forms and profile pop-ups (no need to edit)
images/             Logo, backgrounds, member logos and director photos
```

---

## STEP 0 (do this today): save the photos from Squarespace

Your Squarespace trial ends **Monday 12 October 2026 at 11:12 GMT**. After that, the photos stored on Squarespace may disappear. Until you save them into the `images/` folder, the site loads them from Squarespace automatically, so it works for now but will break later.

For each row below: open your Squarespace site, right-click the photo → **Save Image As…**, and save it into `images/` with **exactly** this file name.

| Save as | Which photo it is |
|---|---|
| `hero.jpg` | Home page, big photo at the top (group of organisations) |
| `principles.jpg` | Home page, photo next to Vision / Mission / Guiding principles |
| `who-we-are.jpg` | Home page, photo above "Who are we?" |
| `migrants-day-2024.jpg` | Home page, photo for International Migrants Day 2024 |
| `coalition-event.jpg` | Home page, third highlight photo |
| `tot-1.png` and `tot-2.png` | Information page, the two photos for the Training of Trainers project |
| `dialogue-1.png` and `dialogue-2.png` | Information page, the two photos for the National Dialogue |
| `omo-1.png` and `omo-2.png` | Information page, the two photos for the public screening |
| `football-gala.png` | Information page, photo in "Upcoming dates" |
| `contact.png` | Contact page, photo next to the form |

Tip: if "Save Image As" gives you a `.webp` file, rename it to the name above anyway (browsers will still show it), or open it and export as .jpg/.png.

You can also open these links directly and save each picture:
- coalition-event.jpg: https://images.squarespace-cdn.com/content/v1/6aba4ab2b291d326a58e9cbd/919b5780-a2e4-475d-aa47-6a28634a1079/6K4A9349.JPG
- contact.png: https://images.squarespace-cdn.com/content/v1/6aba4ab2b291d326a58e9cbd/e32eb5b6-7863-4b68-afc7-2589dec363aa/Screenshot+2026-09-29+at+11.25.57.png
- dialogue-1.png: https://images.squarespace-cdn.com/content/v1/6aba4ab2b291d326a58e9cbd/64252363-91be-45ef-8e5d-b4711e87a77e/Screenshot+2026-09-29+at+12.00.29.png
- dialogue-2.png: https://images.squarespace-cdn.com/content/v1/6aba4ab2b291d326a58e9cbd/bf51ec5c-f067-4a8f-a8fa-05b9c57f04d6/Screenshot+2026-09-29+at+12.01.16.png
- football-gala.png: https://images.squarespace-cdn.com/content/v1/6aba4ab2b291d326a58e9cbd/183ab780-1efe-46e3-9459-3a70441bdecd/Screenshot+2026-09-29+at+16.00.22.png
- hero.jpg: https://images.squarespace-cdn.com/content/v1/6aba4ab2b291d326a58e9cbd/e0c6b346-65f7-4fb8-b0a0-baff91eba209/ccmg+organisations.jpg
- migrants-day-2024.jpg: https://images.squarespace-cdn.com/content/v1/6aba4ab2b291d326a58e9cbd/079c2897-fcfa-441d-a58c-fb394107ed2f/WhatsApp+Image+2026-04-15+at+10.01.40+AM.jpeg
- omo-1.png: https://images.squarespace-cdn.com/content/v1/6aba4ab2b291d326a58e9cbd/3f739203-a28a-41cf-b6b9-602d6ce133dc/Screenshot+2026-09-29+at+12.02.04.png
- omo-2.png: https://images.squarespace-cdn.com/content/v1/6aba4ab2b291d326a58e9cbd/15a3b70f-f1f0-4718-95aa-91ecdcaa351a/Screenshot+2026-09-29+at+12.02.14.png
- principles.jpg: https://images.squarespace-cdn.com/content/v1/6aba4ab2b291d326a58e9cbd/201f6472-fe65-46b7-8871-c79f824d6bd4/WhatsApp+Image+2026-04-15+at+10.01.38+AM%281%29.jpeg
- tot-1.png: https://images.squarespace-cdn.com/content/v1/6aba4ab2b291d326a58e9cbd/c7d7286d-c54f-4974-90fe-afdb614a819f/Screenshot+2026-09-29+at+11.52.34.png
- tot-2.png: https://images.squarespace-cdn.com/content/v1/6aba4ab2b291d326a58e9cbd/64681dc1-a773-4439-9265-20b7ed6013dc/Screenshot+2026-09-29+at+11.59.24.png
- who-we-are.jpg: https://images.squarespace-cdn.com/content/v1/6aba4ab2b291d326a58e9cbd/92d61575-4118-488c-8e53-730516655e2c/WhatsApp+Image+2026-04-13+at+12.45.49+PM.jpeg

(The full address of every photo is also written in the HTML files, in the `data-cdn="…"` part next to each image.)

---

## STEP 1: Put the site on GitHub

1. Sign in at https://github.com (or create a free account).
2. Click **+** (top right) → **New repository**.
   - Name: `ccmg` (or anything you like). If you want the address to be `yourname.github.io` with nothing after it, name it exactly `yourname.github.io`.
   - Set it to **Public**, then click **Create repository**.
3. On the new repository page, click **uploading an existing file**.
4. Open this `ccmg-site` folder on your computer, select **everything inside it** (the HTML files plus the `css`, `js` and `images` folders) and drag it all into the browser window.
   - Drag the *contents*, not the `ccmg-site` folder itself, so that `index.html` sits at the top level.
5. Click **Commit changes**.

## STEP 2: Turn on GitHub Pages

1. In the repository, go to **Settings** → **Pages** (left menu).
2. Under **Build and deployment** → **Source**, choose **Deploy from a branch**.
3. Branch: **main**, folder: **/ (root)** → **Save**.
4. Wait 1–2 minutes and refresh. The address appears at the top, e.g. `https://yourname.github.io/ccmg/`.

## STEP 3: Make the forms send emails (Formspree, free)

GitHub Pages cannot receive form submissions by itself. Until you finish this step, pressing **Submit** opens the visitor's own email app with the message ready to send to ghanacsoscoalitiononmigration@gmail.com, so nothing is lost in the meantime.

1. Go to https://formspree.io and sign up with **ghanacsoscoalitiononmigration@gmail.com**.
2. Create three forms: **Contact**, **Collaborate**, **Newsletter**.
3. Each form has an ID like `xyzabcde` (the end of `https://formspree.io/f/xyzabcde`).
4. On GitHub, open `js/config.js`, click the ✏️ pencil, paste the IDs between the quotes:
   ```js
   FORMSPREE_CONTACT: "xyzabcde",
   FORMSPREE_COLLABORATE: "abcd1234",
   FORMSPREE_NEWSLETTER: "qwer5678",
   ```
5. **Commit changes**. Send yourself a test from each form (Formspree asks you to confirm the first one).

## STEP 4 (optional): Use your own domain

If you own a domain (e.g. `ccmg-ghana.org`): **Settings → Pages → Custom domain**, type it, save, and follow GitHub's instructions for the DNS records at your domain provider. Tick **Enforce HTTPS** once it becomes available.

---

## How to edit things later

Open any file on GitHub, click the ✏️ pencil, change it, then **Commit changes**. The site updates within a minute or two.

**Add or change a member profile:** edit `js/members.js`. Each organisation is one block:
```js
{
  name: "Organisation name",
  founded: "2012",
  base: "Accra",
  logo: "images/members/short-name-logo.jpg",
  summary: "One or two sentences shown on the small card.",
  about: "Longer description shown in the pop-up.",
  director: "Director's name",
  directorPhoto: "images/members/short-name-director.jpg",   // or "" for initials
  directorBio: "Short background of the director.",
  achievements: "Main achievements."
},
```
Upload the logo (and director photo, square is best) into `images/members/` with the same file names.

**Add someone to the full member list:** edit the `<ul class="member-list">` in `members.html` (one `<li>…</li>` per organisation).

**Add or move a pin on the map:** edit `js/map.js`. To get coordinates, right-click the office on Google Maps and click the numbers at the top of the menu to copy them, then paste into `lat` and `lng`.

**Change colours:** the top of `css/site.css` has `--red`, `--gold`, `--green`, `--black`.

**Change the upcoming dates or projects:** edit `information.html` (sections `id="dates"` and `id="projects"`).

## Preview on your own computer (optional)

Double-click `index.html` to open it in your browser. Everything works, except the forms only send once the site is online.
