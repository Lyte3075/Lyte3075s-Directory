# Lyte3075 // Directory

A personal homepage and hub for Lyte3075's websites, projects, experiments, and links.

**Live site:** https://Lyte3075.github.io/Lyte3075s-Directory/

## Project files

- `index.html` — page content and sections (hero, projects, bio, links, footer).
- `style.css` — all colors, layout, responsive rules, and animations.
- `script.js` — project list, project-card rendering, search, and small interactions.
- `assets/icons/favicon.svg` — browser tab icon.

## Add or edit a project

Open `script.js` and find the `PROJECTS` list near the top. Copy an item and edit its fields:

```js
{
  title: "My new project",
  description: "A short description of what it does.",
  url: "https://example.com/",
  icon: "✳",
  type: "WEB PROJECT",
  tags: ["Website", "Experiment"],
  featured: false
}
```

Add the new item inside the `PROJECTS` array. Separate items with commas. The search automatically includes the title, description, type, and tags.

## Customize the site

- **Bio and page text:** edit the matching sections in `index.html`.
- **Colors:** change the CSS variables at the top of `style.css`, especially `--bg`, `--green`, and `--text`.
- **Animations and layout:** edit the animation and responsive sections near the bottom of `style.css`.
- **Project cards:** edit the `PROJECTS` array in `script.js`; the HTML cards are generated automatically.

The site uses plain HTML, CSS, and JavaScript. No build tools or framework are required.
