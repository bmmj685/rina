const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (toggle) toggle.hidden = false;

function closeMenu() {
  nav?.classList.remove("open");
  toggle?.setAttribute("aria-expanded", "false");
  if (toggle) {
    toggle.textContent = "☰";
    toggle.setAttribute("aria-label", "Open navigation");
  }
}

toggle?.addEventListener("click", () => {
  const open = nav?.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(Boolean(open)));
  toggle.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
  toggle.textContent = open ? "×" : "☰";
});

nav
  ?.querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav?.classList.contains("open")) {
    closeMenu();
    toggle?.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) closeMenu();
});
window.matchMedia("(min-width: 801px)").addEventListener("change", closeMenu);

document.querySelector("#year").textContent = new Date().getFullYear();

const lightbox = document.querySelector("#gallery-lightbox");
const lightboxImage = lightbox?.querySelector("img");
const lightboxCaption = lightbox?.querySelector("p");

document.querySelectorAll(".gallery-button").forEach((button) => {
  button.addEventListener("click", () => {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;
    lightboxImage.src = button.dataset.full;
    lightboxImage.alt = button.querySelector("img")?.alt || "";
    lightboxCaption.textContent = button.dataset.caption || "";
    lightbox.showModal();
  });
});

lightbox
  ?.querySelector(".lightbox-close")
  ?.addEventListener("click", () => lightbox.close());
lightbox?.addEventListener("click", (event) => {
  const bounds = lightbox.getBoundingClientRect();
  const outside =
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom;
  if (outside) lightbox.close();
});

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
if (reduceMotion || !("IntersectionObserver" in window)) {
  document
    .querySelectorAll(".reveal")
    .forEach((element) => element.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  document
    .querySelectorAll(".reveal")
    .forEach((element) => observer.observe(element));
}
