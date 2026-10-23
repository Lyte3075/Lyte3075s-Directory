# Editing your directory

## Change project cards
Open `script.js` and edit the `PROJECTS` list at the top. Each project has:
- `title`: card heading
- `description`: card text
- `url`: destination when clicked
- `icon`: small icon path
- `image`: screenshot path
- `type`: small category label
- `tags`: the tag chips

To add a project, copy one object inside `PROJECTS`, paste it before the closing `]`, and change its values. Separate objects with commas. To remove a project, delete its whole object.

## Change the homepage text
Open `index.html`. Use Find in GitHub's editor to search for the exact sentence you want to change, replace only the words between the HTML tags, and commit the edit. Common places:
- Main headline and intro: search for `Welcome to my` or `hero-description`
- About section: search for `A little about` or `about-lead`
- Navigation links: search for `/projects`
- Footer: search for `Made with`

Keep the surrounding tags like `<p>`, `<h1>`, and `</p>` intact.

## Add real screenshots
Put a real PNG, JPG, or WebP screenshot in `assets/images/`, then change each project's `image` value in `script.js` to its filename, for example `assets/images/hyper-pop.png`. The current `assets/images/image.png` is an empty placeholder, not a usable screenshot, so the site now displays a designed fallback until you add real images.

## Change colors and style
Edit the CSS variables at the top of `style.css`. The main green is `--green`, background is `--bg`, and text is `--text`.
