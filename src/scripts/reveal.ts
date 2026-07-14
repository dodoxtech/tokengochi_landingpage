const REVEALED_CLASS = "is-revealed";
const PENDING_CLASS = "reveal-pending";

export function initReveals() {
  const revealItems = Array.from(
    document.querySelectorAll<HTMLElement>("[data-reveal]"),
  );

  if (revealItems.length === 0) {
    return;
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add(REVEALED_CLASS));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.remove(PENDING_CLASS);
        entry.target.classList.add(REVEALED_CLASS);
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.2,
    },
  );

  revealItems.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top;

    if (itemTop < window.innerHeight * 0.95) {
      item.classList.add(REVEALED_CLASS);
      return;
    }

    item.classList.add(PENDING_CLASS);
    observer.observe(item);
  });
}
