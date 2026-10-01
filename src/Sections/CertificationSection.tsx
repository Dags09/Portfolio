import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import TitleHeader from "../Components/TitleHeader";
import { certifications } from "../utils/constants";

export default function CertificationSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const [preview, setPreview] = useState<{ src: string; alt: string } | null>(
        null,
    );

    // Close on Escape and lock page scroll while the preview is open
    useEffect(() => {
        if (!preview) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setPreview(null);
        };
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [preview]);

    const toggleCard = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        <section id="certification" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="Certifications"
                    sub="Credentials That Back Up the Work"
                />

                <div className="mx-auto grid-3-cols mt-12 items-start">
                    {certifications.map((cert, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={cert.title}
                                className="card-border rounded-xl overflow-hidden"
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleCard(index)}
                                    aria-expanded={isOpen}
                                    className="w-full flex items-center justify-between gap-4 p-6 cursor-pointer text-left"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="size-14 flex-none flex items-center justify-center rounded-full">
                                            <FontAwesomeIcon
                                                icon={cert.icon}
                                                className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded text-black bg-white"
                                            />
                                        </div>
                                        <div>
                                            <h3>{cert.title}</h3>
                                            {cert.issuer && (
                                                <p className="text-white-50 text-sm mt-1">
                                                    {cert.issuer}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <FontAwesomeIcon
                                        icon={faChevronDown}
                                        className={`text-white-50 flex-none transition-transform duration-300 ${
                                            isOpen ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>

                                <div
                                    className={`grid transition-all duration-500 ease-in-out ${
                                        isOpen
                                            ? "grid-rows-[1fr]"
                                            : "grid-rows-[0fr]"
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="px-6 pb-6">
                                            <img
                                                src={cert.image}
                                                alt={cert.title}
                                                onClick={() =>
                                                    setPreview({
                                                        src: cert.image,
                                                        alt: cert.title,
                                                    })
                                                }
                                                title="Click to view full size"
                                                className="w-full rounded-lg border border-black-50 cursor-zoom-in"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {preview &&
                createPortal(
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label={preview.alt}
                        onClick={() => setPreview(null)}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10 bg-black/60 backdrop-blur-md cursor-zoom-out"
                    >
                        <button
                            type="button"
                            aria-label="Close preview"
                            onClick={() => setPreview(null)}
                            className="absolute top-4 right-4 md:top-6 md:right-6 size-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white text-xl cursor-pointer transition-colors"
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <img
                            src={preview.src}
                            alt={preview.alt}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl cursor-default"
                        />
                    </div>,
                    document.body,
                )}
        </section>
    );
}
