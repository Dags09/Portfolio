// js/imageModal.js — full file
document.addEventListener("DOMContentLoaded", () => {
    const preview = document.getElementById("cert-preview");
    if (!preview) return;

    const previewImg = preview.querySelector(".cert-preview-img");
    const previewCaption = preview.querySelector(".cert-preview-caption");
    const closeBtn = preview.querySelector(".cert-preview-close");
    const certCards = document.querySelectorAll(".cert-card[data-image]");

    let activeCard = null;

    function openPreview(card) {
        const src = card.getAttribute("data-image");
        const title = card.getAttribute("data-title") || "";
        if (!src) return;

        if (activeCard) activeCard.classList.remove("active");
        activeCard = card;
        card.classList.add("active");

        previewImg.src = src;
        previewImg.alt = title;
        previewCaption.textContent = title;
        previewImg.addEventListener("contextmenu", (e) => e.preventDefault());
        previewImg.addEventListener("dragstart", (e) => e.preventDefault());
        preview.classList.add("open");

        // Scroll the newly opened preview into view, since it can push
        // content below the fold depending on where the card sits
        requestAnimationFrame(() => {
            preview.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
    }

    function closePreview() {
        preview.classList.remove("open");
        if (activeCard) {
            activeCard.classList.remove("active");
            activeCard = null;
        }
        // Clear the image after the collapse transition finishes so it
        // doesn't flash the old image next time the panel opens
        setTimeout(() => {
            if (!preview.classList.contains("open")) {
                previewImg.src = "";
            }
        }, 450);
    }

    certCards.forEach((card) => {
        card.addEventListener("click", () => {
            // Clicking the already-open card's own preview close button handles
            // closing; clicking a different card just swaps the preview content;
            // clicking the same card again toggles it closed.
            if (card === activeCard) {
                closePreview();
            } else {
                openPreview(card);
            }
        });
    });

    closeBtn.addEventListener("click", closePreview);
});
