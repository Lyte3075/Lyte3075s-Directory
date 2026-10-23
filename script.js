/* =========================================================
   LYTE3075 DIRECTORY
   Edit the PROJECTS list to add, remove, or update project cards.
   Keep each project's title, description, URL, icon, type and tags.
   ========================================================= */

const PROJECTS = [
  {
    title: "Hyper-Pop",
    description: "A playful digital playground packed with web tools, games, experiments, and curious little discoveries.",
    url: "https://hyper-pop.pntr.dev/",
    icon: "✳",
    type: "WEB PLAYGROUND",
    tags: ["Website", "Tools", "Games"],
    featured: true
  },
  {
    title: "SingulaX",
    description: "An evolving programming-language and IDE project exploring approachable syntax, creative coding, and 3D ideas.",
    url: "https://lyte3075.github.io/SingulaX/",
    icon: "λ",
    type: "LANGUAGE / IDE",
    tags: ["JavaScript", "IDE", "Learning"],
    featured: true
  },
  {
    title: "SkiOS",
    description: "A web-based desktop environment concept with windows, apps, themes, and a desktop-inspired interface.",
    url: "https://github.com/Lyte3075/SkiOS",
    icon: "▦",
    type: "WEB OS",
    tags: ["HTML", "UI", "Desktop"],
    featured: false
  },
  {
    title: "TypeX",
    description: "A custom keyboard-app concept focused on personalization, useful typing features, and a flexible design.",
    url: "https://github.com/Lyte3075",
    icon: "⌨",
    type: "APP CONCEPT",
    tags: ["Keyboard", "Mobile", "Design"],
    featured: false
  }
];

const projectGrid = document.querySelector("#project-grid");
const searchInput = document.querySelector("#project-search");
const projectCount = document.querySelector("#project-count");
const emptyState = document.querySelector("#empty-state");

// Build a project card from one item in PROJECTS.
function createProjectCard(project, index) {
  const card = document.createElement("a");
  card.className = "project-card";
  card.href = project.url;
  card.target = "_blank";
  card.rel = "noreferrer";
  card.style.animationDelay = `${Math.min(index, 8) * 65}ms`;

  const top = document.createElement("div");
  top.className = "project-card-top";

  const icon = document.createElement("span");
  icon.className = "project-symbol";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = project.icon;

  const type = document.createElement("span");
  type.className = "project-type";
  type.textContent = project.type;

  top.append(icon, type);

  const title = document.createElement("h3");
  title.className = "project-title";
  title.textContent = project.title;

  const description = document.createElement("p");
  description.className = "project-description";
  description.textContent = project.description;

  const bottom = document.createElement("div");
  bottom.className = "project-bottom";

  const tags = document.createElement("div");
  tags.className = "project-tags";
  project.tags.forEach((tag) => {
    const tagElement = document.createElement("span");
    tagElement.textContent = tag;
    tags.append(tagElement);
  });

  const open = document.createElement("span");
  open.className = "project-open";
  open.innerHTML = "Open project <span aria-hidden=\"true\">↗</span>";
  bottom.append(tags, open);
  card.append(top, title, description, bottom);
  return card;
}

// Draw only the projects that match the search box.
function renderProjects(query = "") {
  const normalizedQuery = query.trim().toLowerCase();
  const matches = PROJECTS.filter((project) => {
    const searchableText = [
      project.title,
      project.description,
      project.type,
      ...project.tags
    ].join(" ").toLowerCase();
    return searchableText.includes(normalizedQuery);
  });

  projectGrid.replaceChildren(...matches.map(createProjectCard));
  projectCount.textContent = `${String(matches.length).padStart(2, "0")} ENTRIES`;
  emptyState.hidden = matches.length !== 0;
}

searchInput.addEventListener("input", (event) => {
  renderProjects(event.target.value);
});

// Press "/" anywhere outside a form field to focus project search.
document.addEventListener("keydown", (event) => {
  const activeTag = document.activeElement?.tagName;
  const typing = activeTag === "INPUT" || activeTag === "TEXTAREA";
  if (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey) {
    event.preventDefault();
    searchInput.focus();
  }
});

// Set the footer year automatically.
document.querySelector("#year").textContent = new Date().getFullYear();

// Start the directory.
renderProjects();
