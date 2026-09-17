import { useRef } from "react";
import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ShowcaseSection() {
    const sectionRef = useRef(null);
    const project1Ref = useRef(null);
    const project2Ref = useRef(null);
    const project3Ref = useRef(null);

    useGSAP(() => {
        const projects = [
            project1Ref.current,
            project2Ref.current,
            project3Ref.current,
        ];
        projects.forEach((card, index) => {
            gsap.fromTo(
                card,
                {
                    y: 50,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.15 * index,
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom-=100",
                    },
                },
            );
        });
        gsap.fromTo(
            sectionRef.current,
            { opacity: 1 },
            { opacity: 1, duration: 1.5 },
        );
    }, []);
    return (
        <section id="work" ref={sectionRef} className="app-showcase">
            <div className="w-full">
                <div className="showcaselayout">
                    <div ref={project1Ref} className="first-project-wrapper">
                        <div className="image-wrapper">
                            <img src="/images/project1.png" alt="Order" />
                        </div>
                        <div className="text-content">
                            <h2>BYM Order Pro Digital Platform</h2>
                            <p className="text-white-50 md:text-xl">
                                A comprehensive e-commerce and order management
                                tool built to help store owners streamline
                                restocking, and manage supplier transactions
                                digitally in one unified dashboard
                            </p>
                            <a
                                href="#"
                                className="group relative inline-block text-white-50 font-semibold hover:text-white transition-colors duration-300 whitespace-nowrap"
                            >
                                <span>Demo Project</span>
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        </div>
                    </div>
                    <div className="project-list-wrapper overflow-hidden">
                        <div ref={project2Ref} className="project">
                            <div className="image-wrapper bg-[#ffefeb]">
                                <img
                                    src="/images/placeholder_image.jpg"
                                    alt="Project preview"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2>Project Title</h2>
                                    <p className="text-white-50">
                                        Project Details
                                    </p>
                                </div>
                                <a
                                    href="#"
                                    className="group relative inline-block text-white-50 font-semibold hover:text-white transition-colors duration-300 whitespace-nowrap"
                                >
                                    <span>Demo Project</span>
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </div>
                        </div>

                        <div ref={project3Ref} className="project">
                            <div className="image-wrapper bg-[#ffe7eb]">
                                <img
                                    src="/images/placeholder_image.jpg"
                                    alt="Project preview"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2>Project Title</h2>
                                    <p className="text-white-50">
                                        Project Details
                                    </p>
                                </div>
                                <a
                                    href="#"
                                    className="group relative inline-block text-white-50 font-semibold hover:text-white transition-colors duration-300 whitespace-nowrap"
                                >
                                    <span>Demo Project</span>
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
