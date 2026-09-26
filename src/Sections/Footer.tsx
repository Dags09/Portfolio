import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { socialLinks, CONTACT_EMAIL } from "../utils/constants";

export default function Footer() {
    const [copied, setCopied] = useState(false);

    // The mailto: link only does something visible if the visitor's browser
    // has a default mail client configured — for everyone else, clicking it
    // silently does nothing. Copying the address to the clipboard (and
    // showing a brief confirmation) guarantees the click always does
    // *something*, while the mailto: link still fires normally for anyone
    // who does have a mail app set up.
    const handleEmailClick = async () => {
        try {
            await navigator.clipboard.writeText(CONTACT_EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard API unavailable (e.g. insecure context) — the
            // mailto: link below is still the fallback, so let it proceed.
        }
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="socials">
                    {socialLinks.map(({ name, href, icons }) => (
                        <div key={name} className="relative">
                            <a
                                href={href}
                                target={name === "Email" ? undefined : "_blank"}
                                rel={
                                    name === "Email"
                                        ? undefined
                                        : "noopener noreferrer"
                                }
                                aria-label={
                                    name === "Email" && copied
                                        ? "Email copied to clipboard"
                                        : name
                                }
                                className="icon"
                                onClick={
                                    name === "Email"
                                        ? handleEmailClick
                                        : undefined
                                }
                            >
                                <FontAwesomeIcon
                                    icon={
                                        name === "Email" && copied
                                            ? faCheck
                                            : icons
                                    }
                                    className="size-5 text-white"
                                />
                            </a>
                            {name === "Email" && copied && (
                                <span className="absolute -top-9 left-1/2 -translate-x-1/2 text-xs text-white-50 bg-black-100 border border-black-50 rounded px-2 py-1 whitespace-nowrap">
                                    Copied!
                                </span>
                            )}
                        </div>
                    ))}
                </div>
                <p>
                    © {new Date().getFullYear()} Jewelle Vincent D. Atienza.
                    <br />
                    All rights reserved.
                </p>
            </div>
        </footer>
    );
}
