/* =========================================================
   LYTE3075 DIRECTORY
   Edit PROJECTS below to add, remove, or update project cards.
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
    url: "https://lyte3075.github.io/SingulaX/",
    icon: "assets/icons/singulax-icon.png",
    image: "assets/images/singulax-thumbnail.png",
    imageAlt: "SingulaX project preview",
    type: "LANGUAGE / IDE",
    tags: ["JavaScript", "IDE", "Learning"]
  }
];


/* =========================================================
   GITHUB PROFILE LINKS
   Public GitHub profile API fields available here: blog and
   Twitter username. The cards update when those profile
   fields change. GitHub itself is always included.
   ========================================================= */
async function loadProfileLinks() {
  const container = document.querySelector("#profile-links");
  if (!container) return;

  const links = [{
    title: "GitHub",
    description: "Code, commits & experiments",
    url: "https://github.com/Lyte3075",
    icon: "⌘"
  }];

  try {
    const response = await fetch("https://api.github.com/users/Lyte3075", {
      headers: { "Accept": "application/vnd.github+json" }
    });
    if (!response.ok) throw new Error("GitHub profile request failed");
    const profile = await response.json();

    if (profile.blog && profile.blog.trim()) {
      let website = profile.blog.trim();
      if (!/^https?:\/\//i.test(website)) website = "https://" + website;
      try {
        const parsed = new URL(website);
        if (parsed.protocol === "https:" || parsed.protocol === "http:") {
          links.push({
            title: parsed.hostname.replace(/^www\./, ""),
            description: "Website from GitHub profile",
            url: parsed.href,
            icon: "↗"
          });
        }
      } catch (_) {}
    }

    if (profile.twitter_username) {
      links.push({
        title: "X / Twitter",
        description: "Social profile linked on GitHub",
        url: "https://twitter.com/" + encodeURIComponent(profile.twitter_username),
        icon: "𝕏"
      });
    }

    container.replaceChildren();
    links.forEach(function (link) {
      const card = document.createElement("a");
      card.className = "link-card panel";
      card.href = link.url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";

      const icon = document.createElement("span");
      icon.className = "link-icon";
      icon.textContent = link.icon;

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
  } catch (error) {
    // Keep the GitHub card available if the API is temporarily unavailable.
    container.querySelectorAll(".profile-links-status").forEach(function (node) {
      node.textContent = "Could not load profile links right now.";
    });
  }
}

function initDirectory() {
  const projectGrid = document.querySelector("#project-grid");
  const searchInput = document.querySelector("#project-search");
  const projectCount = document.querySelector("#project-count");
  const emptyState = document.querySelector("#empty-state");
  const year = document.querySelector("#year");

  // Fail safely instead of stopping the whole script if markup is changed.
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
        placeholder.innerHTML = '<span class="placeholder-symbol">✳</span><span class="placeholder-title">' + (project.title || "PROJECT") + '</span><small>Project preview</small>';
        frame.replaceChildren(placeholder);
      }, { once: true });
      frame.append(preview);
      card.append(frame);
    }

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
    description.textContent = project.description;

    const bottom = document.createElement("div");
    bottom.className = "project-bottom";

    const tags = document.createElement("div");
    tags.className = "project-tags";
    (project.tags || []).forEach(function (tag) {
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

  function renderProjects(query) {
    const normalizedQuery = (query || "").trim().toLowerCase();
    const matches = PROJECTS.filter(function (project) {
      const searchableText = [
        project.title,
        project.description,
        project.type,
        ...(project.tags || [])
      ].join(" ").toLowerCase();
      return searchableText.includes(normalizedQuery);
    });

    projectGrid.replaceChildren();
    matches.forEach(function (project, index) {
      projectGrid.append(createProjectCard(project, index));
    });

    projectCount.textContent = String(matches.length).padStart(2, "0") + " ENTRIES";
    emptyState.hidden = matches.length > 0;
  }

  searchInput.addEventListener("input", function () {
    renderProjects(searchInput.value);
  });

  document.addEventListener("keydown", function (event) {
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
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDirectory);
} else {
  initDirectory();
}
