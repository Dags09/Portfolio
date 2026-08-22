import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

export interface ExperienceItem {
    review: string;
    reviewerImg: string;
    reviewer: string;
    position: string;
    contact: string;
    company: string;
    logoPath: string;
    title: string;
    date: string;
    responsibilities: string[];
}

interface GlowCardProps {
    exp: ExperienceItem;
    children: React.ReactNode;
    index: number;
}

export const GlowCard = ({ exp, children, index }: GlowCardProps) => {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleMouseMove =
        (i: number) => (e: React.MouseEvent<HTMLDivElement>) => {
            const card = cardRefs.current[i];
            if (!card) return;

            const rect = card.getBoundingClientRect();
            const mouseX = e.clientX - rect.left - rect.width / 2;
            const mouseY = e.clientY - rect.top - rect.height / 2;

            let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
            angle = (angle + 360) % 360;

            card.style.setProperty("--start", String(angle + 60));
        };

    return (
        <div
            ref={(el) => {
                cardRefs.current[index] = el;
            }}
            onMouseMove={handleMouseMove(index)}
            className="card card-border timeline-card rounded-xl p-10"
        >
            <div className="glow" />
            <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: 5 }, (_, i) => (
                    <FontAwesomeIcon icon={faStar} key={i} className="size-5" />
                ))}
            </div>
            <div className="mb-5">
                <p className="text-white-50 text-lg">{exp.review}</p>
            </div>
            {children}
        </div>
    );
};
