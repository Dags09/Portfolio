document.addEventListener("DOMContentLoaded", () => {
    // Prevent the browser from restoring the previous scroll position on
    // refresh — the intro should always start fresh at the top of the page.
    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const intro = document.getElementById("intro");
    const enterBtn = document.getElementById("enter-btn");
    const heroInner = document.querySelector(".hero-inner");
    let dismissed = false;

    function dismissIntro() {
        if (dismissed) return;
        dismissed = true;

        intro.classList.add("intro-exit");
        document.body.style.overflow = "";
        document.body.classList.remove("intro-active");

        setTimeout(() => {
            heroInner.classList.add("hero-visible");
        }, 400);

        setTimeout(() => {
            intro.style.display = "none";
        }, 900);
    }

    document.body.style.overflow = "hidden";

    enterBtn.addEventListener("click", dismissIntro);

    window.addEventListener("keydown", (e) => {
        if (
            (e.key === "Enter" || e.key === " ") &&
            intro.style.display !== "none"
        ) {
            dismissIntro();
        }
    });

    window.addEventListener(
        "wheel",
        () => {
            if (intro.style.display !== "none") dismissIntro();
        },
        { passive: true, once: true },
    );
});
