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
    const backToTopLink = document.querySelector(".back-to-top");
    let dismissed = false;

    function dismissIntro() {
        if (dismissed) return;
        dismissed = true;

        intro.classList.add("intro-exit");
        document.body.style.overflow = ""; // release scroll lock
        document.body.classList.remove("intro-active"); // reveal main content

        // Bring the hero in just before the intro finishes fading out,
        // so the two overlap slightly instead of leaving a blank gap
        setTimeout(() => {
            heroInner.classList.add("hero-visible");
        }, 400);

        // Remove intro from tab order / DOM flow after the fade-out finishes
        setTimeout(() => {
            intro.style.display = "none";
        }, 900);
    }

    // Lock scroll while intro is showing (main content is already hidden
    // via the .intro-active class set directly in the HTML)
    document.body.style.overflow = "hidden";

    if (backToTopLink) {
        backToTopLink.addEventListener("click", (event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

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

    const imageModal = document.getElementById("image-modal");
    const modalBackdrop = imageModal?.querySelector(".image-modal-backdrop");
    const modalClose = imageModal?.querySelector(".image-modal-close");
    const modalImage = imageModal?.querySelector(".image-modal-img");
    const modalCaption = imageModal?.querySelector(".image-modal-caption");

    function closeImageModal() {
        if (!imageModal) return;
        imageModal.classList.remove("open");
        imageModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        modalImage.src = "";
        modalImage.alt = "";
        modalCaption.textContent = "";
    }

    function openImageModal(src, title) {
        if (!imageModal) return;
        modalImage.src = src;
        modalImage.alt = title || "Certificate preview";
        modalCaption.textContent = title || "Certificate preview";
        imageModal.classList.add("open");
        imageModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    document.querySelectorAll(".cert-card").forEach((card) => {
        card.addEventListener("click", (event) => {
            const imageSrc = card.dataset.image || card.getAttribute("href");
            const imageTitle =
                card.dataset.title ||
                card.querySelector(".cert-name")?.textContent?.trim();
            if (!imageSrc) return;
            event.preventDefault();
            openImageModal(imageSrc, imageTitle);
        });
    });

    modalClose?.addEventListener("click", closeImageModal);
    modalBackdrop?.addEventListener("click", closeImageModal);

    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && imageModal?.classList.contains("open")) {
            closeImageModal();
        }
    });
});
