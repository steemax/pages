const progress = document.querySelector(".reading-progress span");
const article = document.querySelector(".article-body");
const tocLinks = [...document.querySelectorAll("[data-section]")];
const headings = [...document.querySelectorAll(".article-body h2[id], .article-body h3[id]")];

function updateProgress() {
  if (!progress || !article) return;
  const start = article.offsetTop;
  const end = start + article.offsetHeight - window.innerHeight;
  const ratio = end <= start ? 1 : (window.scrollY - start) / (end - start);
  progress.style.width = `${Math.max(0, Math.min(1, ratio)) * 100}%`;
}

function setActiveSection(id) {
  for (const link of tocLinks) {
    const active = link.dataset.section === id;
    link.classList.toggle("is-active", active);
    if (active) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  }
}

function updateActiveSection() {
  if (headings.length === 0) return;
  const marker = 92;
  let active = headings[0];
  for (const heading of headings) {
    if (heading.getBoundingClientRect().top > marker) break;
    active = heading;
  }
  setActiveSection(active.id);
}

for (const link of document.querySelectorAll(".mobile-toc a")) {
  link.addEventListener("click", () => {
    const details = link.closest("details");
    if (details) details.open = false;
  });
}

function updateReadingState() {
  updateProgress();
  updateActiveSection();
}

window.addEventListener("scroll", updateReadingState, { passive: true });
window.addEventListener("resize", updateReadingState);
updateReadingState();
