document.addEventListener("DOMContentLoaded", () => {
    const intro = document.getElementById("intro");
    const enterBtn = document.getElementById("enter-btn");
    const mainContent = document.getElementById("main-content");

    function dismissIntro() {
        intro.classList.add("intro-exit");
        document.body.style.overflow = ""; // release scroll lock
        // Remove from tab order / DOM flow after the fade-out finishes
        setTimeout(() => {
            intro.style.display = "none";
        }, 900);
    }

    // Lock scroll while intro is showing
    document.body.style.overflow = "hidden";

    enterBtn.addEventListener("click", dismissIntro);

    // Also allow pressing Enter/Space to dismiss, and scrolling down
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
