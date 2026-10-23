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
    icon: "assets/icons/hyperpop-icon.svg",
    image: "assets/images/image.png",
    imageAlt: "Hyper-Pop project preview",
    imageCaption: "A playground for the curious",
    type: "WEB PLAYGROUND",
    tags: ["Website", "Tools", "Games"],
    featured: true
  },
  {
    title: "SingulaX",
    description: "An evolving programming-language and IDE project exploring approachable syntax, creative coding, and 3D ideas.",
    url: "https://lyte3075.github.io/SingulaX/",
    icon: "assets/icons/singulax-icon.png",
    image: "assets/images/image.png",
    imageAlt: "SingulaX project preview",
    imageCaption: "Language and IDE experiments",
    type: "LANGUAGE / IDE",
    tags: ["JavaScript", "IDE", "Learning"],
    featured: true
  }
];

// Image cards are generated from PROJECTS, so each preview automatically uses
// the same title and URL as its matching project info card. Edit the image,
// imageAlt, and imageCaption fields inside PROJECTS to customize a preview.

const projectGrid = document.querySelector("#project-grid");
const imageCardGrid = document.querySelector("#image-card-grid");
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
  if (project.icon && /\.(svg|png|jpe?g|webp|gif)$/i.test(project.icon)) {
    const iconImage = document.createElement("img");
    iconImage.src = project.icon;
    iconImage.alt = "";
    iconImage.loading = "lazy";
    icon.append(iconImage);
  } else {
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = project.icon || "✳";
  }

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
// Build the image showcase separately from the searchable project list.
function renderImageCards() {
  const imageProjects = PROJECTS.filter((project) => project.image);

  imageCardGrid.replaceChildren(...imageProjects.map((project, index) => {
    // Use the exact same destination as the matching project info card.
    const card = document.createElement("a");
    card.className = "image-card";
    card.href = project.url;
    card.target = "_blank";
    card.rel = "noreferrer";
    card.setAttribute("aria-label", `Open ${project.title} project`);
    card.style.animationDelay = `${index * 80}ms`;

    const frame = document.createElement("div");
    frame.className = "image-card-frame";

    const placeholder = document.createElement("div");
    placeholder.className = "image-card-placeholder";
    placeholder.innerHTML = '<span class="placeholder-symbol">▧</span><span>PREVIEW UNAVAILABLE</span><small>Add a real image path in PROJECTS inside script.js</small>';

    const image = document.createElement("img");
    image.src = project.image;
    image.alt = project.imageAlt || `${project.title} preview`;
    image.loading = "lazy";
    image.addEventListener("error", () => {
      image.remove();
      frame.replaceChildren(placeholder);
    }, { once: true });
    frame.append(image);

    const details = document.createElement("div");
    details.className = "image-card-details";

    const title = document.createElement("strong");
    title.textContent = project.title;

    const caption = document.createElement("span");
    caption.textContent = project.imageCaption || project.description;

    const arrow = document.createElement("span");
    arrow.className = "image-card-arrow";
    arrow.textContent = "↗";

    details.append(title, caption, arrow);
    card.append(frame, details);
    return card;
  }));
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
renderImageCards();
renderProjects();
