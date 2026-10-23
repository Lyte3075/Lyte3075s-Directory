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
    iconImage: "assets/icons/hyperpop-icon.svg",
    type: "WEB PLAYGROUND",
    tags: ["Website", "Tools", "Games"],
    featured: true
  },
  {
    title: "SingulaX",
    description: "An evolving programming-language and IDE project exploring approachable syntax, creative coding, and 3D ideas.",
    url: "https://lyte3075.github.io/SingulaX/",
    iconImage: "assets/icons/singulax-icon.png",
    type: "LANGUAGE / IDE",
    tags: ["JavaScript", "IDE", "Learning"],
    featured: true
  }
];

// Add, remove, or rearrange these visual cards. Use any image URL, or a path
// to an image in this repository (for example: "assets/images/my-screenshot.png").
// Leave image as an empty string to show a tidy editable placeholder.
const IMAGE_CARDS = [
  {
    title: "Hyper-Pop",
    caption: "A playground for the curious",
    image: "",
    alt: "Choose a screenshot or image for Hyper-Pop",
    url: "https://hyper-pop.pntr.dev/"
  },
  {
    title: "SingulaX",
    caption: "Language and IDE experiments",
    image: "",
    alt: "Choose a screenshot or image for SingulaX",
    url: "https://lyte3075.github.io/SingulaX/"
  }
];

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
  if (project.iconImage) {
    const iconImage = document.createElement("img");
    iconImage.src = project.iconImage;
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
  imageCardGrid.replaceChildren(...IMAGE_CARDS.map((item, index) => {
    const card = document.createElement("a");
    card.className = "image-card";
    card.href = item.url || "#projects";
    card.target = item.url ? "_blank" : "_self";
    card.rel = "noreferrer";
    card.style.animationDelay = `${index * 80}ms`;

    const frame = document.createElement("div");
    frame.className = "image-card-frame";
    if (item.image) {
      const image = document.createElement("img");
      image.src = item.image;
      image.alt = item.alt || item.title;
      image.loading = "lazy";
      frame.append(image);
    } else {
      const placeholder = document.createElement("div");
      placeholder.className = "image-card-placeholder";
      placeholder.innerHTML = '<span class="placeholder-symbol">▧</span><span>YOUR IMAGE GOES HERE</span><small>Set the image field in script.js</small>';
      frame.append(placeholder);
    }

    const details = document.createElement("div");
    details.className = "image-card-details";
    const title = document.createElement("strong");
    title.textContent = item.title;
    const caption = document.createElement("span");
    caption.textContent = item.caption || "Selected visual";
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
