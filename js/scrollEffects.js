// js/scrollEffects.js
document.addEventListener("DOMContentLoaded", () => {
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;
    const targets = document.querySelectorAll(".reveal-on-scroll");

    if (reduceMotion) {
        targets.forEach((el) => el.classList.add("visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                entry.target.classList.toggle("visible", entry.isIntersecting);
            });
        },
        { threshold: 0.2 },
    );

    targets.forEach((el) => observer.observe(el));
});
