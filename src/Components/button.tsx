import type { MouseEvent } from "react";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Button({
    text = "See my Work",
    className = "",
    id = "",
    href = "#",
}: {
    text?: string;
    className?: string;
    id?: string;
    href?: string;
}) {
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        if (href.startsWith("#counter")) {
            const target = document.querySelector(href);
            if (target) {
                const offset = window.innerHeight * 0.15;
                const top =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    offset;
                window.scrollTo({ top });
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <a
            id={id}
            href={href}
            onClick={handleClick}
            className={`${className ?? ""} cta-wrapper`}
        >
            <div className="cta-button group">
                <div className="bg-circle" />

                <p className="text">{text}</p>

                <div className="arrow-wrapper">
                    <FontAwesomeIcon
                        icon={faArrowDown}
                        className="size-5 text-black"
                    />
                </div>
            </div>
        </a>
    );
}
