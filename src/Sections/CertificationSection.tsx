import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import TitleHeader from "../Components/TitleHeader";
import { certifications } from "../utils/constants";

export default function CertificationSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

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
                                                className="w-full rounded-lg border border-black-50"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
