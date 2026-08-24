import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { socialLinks } from "../utils/constants";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <p className="md:!text-right">Terms & Conditions</p>

                <div className="socials">
                    {socialLinks.map(({ name, href, icons }) => (
                        <a
                            key={name}
                            href={href}
                            target={name === "Email" ? undefined : "_blank"}
                            rel={
                                name === "Email"
                                    ? undefined
                                    : "noopener noreferrer"
                            }
                            aria-label={name}
                            className="icon"
                        >
                            <FontAwesomeIcon
                                icon={icons}
                                className="size-5 text-white"
                            />
                        </a>
                    ))}
                </div>
                <p className="md:!text-left">
                    © {new Date().getFullYear()} Jewelle Vincent D. Atienza.
                    <br />
                    All rights reserved.
                </p>
            </div>
        </footer>
    );
}
