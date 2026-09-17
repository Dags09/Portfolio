import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TitleHeader from "../Components/TitleHeader";
import { techStackIcons } from "../utils/constants";
import TechIcon from "../Components/Models/TechLogos/TechIcon";
export default function TechStack() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                sectionRef.current,
                { y: 36, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
            );
        },
        { scope: sectionRef },
    );

    return (
        <div ref={sectionRef} className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title=" My Preferred Tech Stack"
                    sub="What Skills I Bring to the Team"
                />

                <div id="skills" className="tech-grid">
                    {techStackIcons.map((tech) => (
                        <div
                            key={tech.name}
                            className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg"
                        >
                            <div className="tech-card-content">
                                <div className="tech-icon-wrapper">
                                    <TechIcon model={tech} />
                                </div>
                                <div className="padding-x w-full">
                                    <p>{tech.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
