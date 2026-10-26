/* =========================================================
   LYTE3075 DIRECTORY
   SECTION 01: MY PICKS CARD MANAGEMENT
   Add, edit, copy, or remove objects in PROJECTS below.
   Each object creates one project card. Keep commas between objects.
   ========================================================= */

const PROJECTS = [
  {
    title: "Hyper-Pop",
    description: "A playful digital playground packed with web tools, games, experiments, and curious little discoveries.",
    url: "https://hyper-pop.pntr.dev/",
    icon: "assets/icons/hyperpop-icon.svg",
    image: "assets/images/hyperpop-thumbnail.png",
    imageAlt: "Hyper-Pop project preview",
    type: "WEB PLAYGROUND",
    tags: ["Website", "Tools", "Games"]
  },
  {
    title: "SingulaX",
    description: "An evolving programming-language and IDE project exploring approachable syntax, creative coding, and 3D ideas.",
    url: "https://singulax.pntr.dev/",
    icon: "assets/icons/singulax-icon.png",
    image: "assets/images/singulax-thumbnail.png",
    imageAlt: "SingulaX project preview",
    type: "LANGUAGE / IDE",
    tags: ["JavaScript", "IDE", "Learning"]
  },
  {
    title: "Con(Skill)ation",
    description: "A skill tree/map for anything with themes, organization, and file uploading..",
    url: "https://lyte3075.github.io/Con-Skill-ation/",
    icon: "assets/icons/conskillation-icon.png",
    image: "assets/images/conskillation-thumbnail.png",
    imageAlt: "Con(Skill)ation project preview",
    type: "TREE / MAP",
    tags: ["Skills", "Tree", "Mapping"]
  },
];

// Add, edit, or remove Section 04 cards here. Each object becomes one card.
// icon can be a local image path, an image URL, or a short text symbol.
const PROFILE_LINKS = [
  {
    title: "GitHub",
    description: "Code, commits & experiments",
    url: "https://github.com/Lyte3075",
    icon: "assets/icons/github-icon.png"
  },
  {
    title: "YouTube",
    description: "My YT Channel",
    url: "https://www.youtube.com/@Lyte3075",
    icon: "assets/icons/youtube-icon.png"
  },
  {
    title: "My Discord Server",
    description: "My Discord server",
    url: "https://discord.com/invite/Tkz5WX3SNR",
    icon: "assets/icons/discord-icon.png"
  },
];

const GITHUB_USER = "Lyte3075";
let ALL_REPOSITORIES = [];
let currentView = "selected";

/* Make cards for links from GitHub profile fields and the profile README. */
function getLocalIcon(hostname) {
  const host = String(hostname || "").toLowerCase();
  if (host.includes("github.com")) return "assets/icons/github-icon.png";
  if (host.includes("discord")) return "assets/icons/discord-icon.png";
  if (host.includes("tiktok")) return "assets/icons/tiktok-icon.png";
  if (host.includes("youtube") || host.includes("youtu.be")) return "assets/icons/youtube-icon.png";
  return "";
}

async function loadProfileLinks() {
  const container = document.querySelector("#profile-links");
  if (!container) return;
  const links = new Map();
  PROFILE_LINKS.forEach(link => {
    if (link && link.title && link.url) links.set(link.url, {
      title: link.title,
      description: link.description || "",
      url: link.url,
      iconUrl: link.icon || ""
    });
  });
  const addLink = (title, description, rawUrl) => {
    try {
      let value = String(rawUrl || "").trim().replace(/[),.;]+$/, "");
      if (!/^https?:\/\//i.test(value)) value = "https://" + value;
      const parsed = new URL(value);
      if (!["https:", "http:"].includes(parsed.protocol)) return;
      if (["github.com"].includes(parsed.hostname.toLowerCase()) &&
          parsed.pathname.replace(/\/$/, "").toLowerCase() === "/" + GITHUB_USER.toLowerCase()) return;
      if (!links.has(parsed.href)) links.set(parsed.href, {
        title: title || parsed.hostname.replace(/^www\./, ""),
        description: description || parsed.hostname.replace(/^www\./, ""),
        url: parsed.href,
        iconUrl: getLocalIcon(parsed.hostname) || ("https://www.google.com/s2/favicons?domain_url=" + encodeURIComponent(parsed.origin) + "&sz=64")
      });
    } catch (_) {}
  };
  if (!links.has("https://github.com/" + GITHUB_USER)) addLink("GitHub", "Code, commits & experiments", "https://github.com/" + GITHUB_USER);

  try {
    const response = await fetch("https://api.github.com/users/" + GITHUB_USER, {
      headers: { Accept: "application/vnd.github+json" }
    });
    if (!response.ok) throw new Error("Profile request failed");
    const profile = await response.json();
    if (profile.twitter_username) addLink("X / Twitter", "Social profile", "https://x.com/" + profile.twitter_username);

    // Public profile READMEs often contain extra social and project links.
    try {
      const readmeResponse = await fetch("https://raw.githubusercontent.com/" + GITHUB_USER + "/" + GITHUB_USER + "/HEAD/README.md");
      if (readmeResponse.ok) {
        const markdown = await readmeResponse.text();
        const urls = markdown.match(/https?:\/\/[^\s<>\]"')]+/g) || [];
        urls.forEach(url => addLink("", "Link from GitHub profile README", url));
        const markdownLinks = [...markdown.matchAll(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g)];
        markdownLinks.forEach(match => addLink(match[1], "Linked from GitHub profile", match[2]));
      }
    } catch (_) {}
  } catch (_) {
    // GitHub card remains available even if the API is temporarily unavailable.
  }

  container.replaceChildren();
  links.forEach(link => {
    const card = document.createElement("a");
    card.className = "link-card panel";
    card.href = link.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    const icon = document.createElement("span");
    icon.className = "link-icon";
    const img = document.createElement("img");
    img.src = link.iconUrl || "https://www.google.com/s2/favicons?domain_url=" + encodeURIComponent(new URL(link.url).origin) + "&sz=64";
    img.alt = "";
    img.loading = "lazy";
    img.onerror = () => { icon.textContent = "↗"; };
    icon.append(img);
    const details = document.createElement("span");
    const title = document.createElement("strong");
    title.textContent = link.title;
    const description = document.createElement("small");
    description.textContent = link.description;
    details.append(title, description);
    const arrow = document.createElement("span");
    arrow.className = "link-arrow";
    arrow.textContent = "↗";
    card.append(icon, details, arrow);
    container.append(card);
  });
}

function initDirectory() {
  const projectGrid = document.querySelector("#project-grid");
  const searchInput = document.querySelector("#project-search");
  const projectCount = document.querySelector("#project-count");
  const emptyState = document.querySelector("#empty-state");
  const repoStatus = document.querySelector("#repo-status");
  const year = document.querySelector("#year");
  if (!projectGrid || !searchInput || !projectCount || !emptyState) {
    console.error("Directory setup failed: a required projects element is missing.");
    return;
  }

  function createProjectCard(project, index) {
    const card = document.createElement("a");
    card.className = "project-card";
    card.href = project.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.style.animationDelay = (Math.min(index, 8) * 65) + "ms";
    if (project.image) {
      const frame = document.createElement("div");
      frame.className = "project-preview-frame";
      const preview = document.createElement("img");
      preview.src = project.image;
      preview.alt = project.imageAlt || (project.title + " preview");
      preview.loading = "lazy";
      preview.addEventListener("error", function () {
        const placeholder = document.createElement("div");
        placeholder.className = "image-card-placeholder";
        const symbol = document.createElement("span");
        symbol.className = "placeholder-symbol";
        symbol.textContent = "✳";
        const name = document.createElement("span");
        name.className = "placeholder-title";
        name.textContent = project.title || "PROJECT";
        const note = document.createElement("small");
        note.textContent = "Project preview";
        placeholder.append(symbol, name, note);
        frame.replaceChildren(placeholder);
      }, { once: true });
      frame.append(preview);
      card.append(frame);
    }
    const top = document.createElement("div");
    top.className = "project-card-top";
    const icon = document.createElement("span");
    icon.className = "project-symbol";
    if (project.icon && (/\.(svg|png|jpe?g|webp|gif)(\?.*)?$/i.test(project.icon) || /^https?:\/\//i.test(project.icon))) {
      const iconImage = document.createElement("img");
      iconImage.src = project.icon;
      iconImage.alt = "";
      iconImage.loading = "lazy";
      icon.append(iconImage);
    } else {
      icon.textContent = project.icon || "✳";
      icon.setAttribute("aria-hidden", "true");
    }
    const type = document.createElement("span");
    type.className = "project-type";
    type.textContent = project.type || "PROJECT";
    top.append(icon, type);
    const title = document.createElement("h3");
    title.className = "project-title";
    title.textContent = project.title;
    const description = document.createElement("p");
    description.className = "project-description";
    description.textContent = project.description || "A public GitHub repository.";
    const bottom = document.createElement("div");
    bottom.className = "project-bottom";
    const tags = document.createElement("div");
    tags.className = "project-tags";
    (project.tags || []).forEach(tag => {
      const tagElement = document.createElement("span");
      tagElement.textContent = tag;
      tags.append(tagElement);
    });
    const open = document.createElement("span");
    open.className = "project-open";
    open.innerHTML = 'Open project <span aria-hidden="true">↗</span>';
    bottom.append(tags, open);
    card.append(top, title, description, bottom);
    return card;
  }

  function repoToProject(repo) {
    return {
      title: repo.name,
      description: repo.description || "A public repository by " + GITHUB_USER + ".",
      url: repo.html_url,
      icon: "assets/icons/github-icon.png",
      type: (repo.language || "REPOSITORY").toUpperCase(),
      tags: [repo.language || "GitHub", "★ " + (repo.stargazers_count || 0) + " stars"]
    };
  }

  function activeProjects() {
    if (currentView === "selected") return PROJECTS;
    if (currentView === "top") return ALL_REPOSITORIES.slice().sort((a, b) =>
      (b.stargazers_count || 0) - (a.stargazers_count || 0) ||
      (b.forks_count || 0) - (a.forks_count || 0) ||
      new Date(b.pushed_at || 0) - new Date(a.pushed_at || 0)
    ).slice(0, 5).map(repoToProject);
    return ALL_REPOSITORIES.map(repoToProject);
  }

  function renderProjects(query) {
    const normalizedQuery = (query || "").trim().toLowerCase();
    const projects = activeProjects();
    const matches = projects.filter(project => [
      project.title, project.description, project.type, ...(project.tags || [])
    ].join(" ").toLowerCase().includes(normalizedQuery));
    projectGrid.replaceChildren();
    matches.forEach((project, index) => projectGrid.append(createProjectCard(project, index)));
    projectCount.textContent = String(matches.length).padStart(2, "0") + " ENTRIES";
    emptyState.hidden = matches.length > 0;
    if (repoStatus) {
      repoStatus.textContent = currentView === "selected"
        ? "Hand-picked cards. Edit PROJECTS in script.js to change these."
        : ALL_REPOSITORIES.length
          ? (currentView === "top" ? "Top 5 sorted by stars, then forks and recent activity." : "Showing all public repositories from GitHub.")
          : "Loading repositories from GitHub…";
    }
  }

  document.querySelectorAll(".project-tab").forEach(button => {
    button.addEventListener("click", () => {
      currentView = button.dataset.view;
      document.querySelectorAll(".project-tab").forEach(tab => {
        const active = tab === button;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", String(active));
      });
      renderProjects(searchInput.value);
    });
  });
  searchInput.addEventListener("input", () => renderProjects(searchInput.value));
  document.addEventListener("keydown", event => {
    const activeTag = document.activeElement ? document.activeElement.tagName : "";
    const typing = activeTag === "INPUT" || activeTag === "TEXTAREA";
    if (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey) {
      event.preventDefault();
      searchInput.focus();
    }
  });
  if (year) year.textContent = new Date().getFullYear();
  renderProjects("");
  loadProfileLinks();
  fetch("https://api.github.com/users/" + GITHUB_USER + "/repos?per_page=100&sort=updated&type=owner", {
    headers: { Accept: "application/vnd.github+json" }
  }).then(response => {
    if (!response.ok) throw new Error("Repository request failed");
    return response.json();
  }).then(repos => {
    ALL_REPOSITORIES = repos.filter(repo => !repo.fork && !repo.private);
    renderProjects(searchInput.value);
  }).catch(() => {
    if (repoStatus) repoStatus.textContent = "Couldn't load repositories right now. Your hand-picked cards still work.";
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDirectory);
} else {
  initDirectory();
}
