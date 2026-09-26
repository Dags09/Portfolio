import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import AnimatedCounter from "../Components/AnimatedCounter";
gsap.registerPlugin(ScrollTrigger);

export default function ShowcaseSection() {
    const sectionRef = useRef(null);
    const project1Ref = useRef(null);
    const project2Ref = useRef(null);
    const moreProjectRef = useRef(null);
    // const project3Ref = useRef(null);

    useGSAP(() => {
        const projects = [
            project1Ref.current,
            project2Ref.current,
            moreProjectRef.current,
            // project3Ref.current,
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
        <div>
            <div className="relative z-10">
                <AnimatedCounter />
            </div>
            <section id="work" ref={sectionRef} className="app-showcase">
                <div className="w-full">
                    <div className="showcaselayout">
                        <div
                            ref={project1Ref}
                            className="first-project-wrapper"
                        >
                            <div className="image-wrapper">
                                <img
                                    src="/images/bym_project.png"
                                    alt="Order"
                                />
                            </div>
                            <div className="text-content">
                                <div className="badges">
                                    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/40">
                                        <span className="relative flex size-1.5">
                                            <span className="absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75 animate-ping" />
                                            <span className="relative inline-flex rounded-full size-1.5 bg-[#d4af37]" />
                                        </span>
                                        Ongoing Build
                                    </span>
                                </div>
                                <h2>BYM Order Pro Digital Platform</h2>
                                <p className="text-white-50 md:text-xl">
                                    A comprehensive e-commerce and order
                                    management tool built to help store owners
                                    streamline restocking, and manage supplier
                                    transactions digitally in one unified
                                    dashboard
                                </p>
                                <a
                                    href="https://bym-order-pro-digital-platform.vercel.app"
                                    className="group relative inline-block text-white-50 font-semibold hover:text-white transition-colors duration-300 whitespace-nowrap"
                                >
                                    <span>Demo Project</span>
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </div>
                        </div>
                        <div className="project-list-wrapper overflow-hidden">
                            <div ref={project2Ref} className="project">
                                <div className="image-wrapper bg-[#000000]">
                                    <img
                                        src="/images/cms_project.png"
                                        alt="Project preview"
                                    />
                                </div>
                                <div className="project-info">
                                    <div className="project-copy">
                                        <h2>Cockpit Management System</h2>
                                        <p className="text-white-50">
                                            A web-based system that streamlines
                                            cockpit operations, including
                                            registration, scheduling, betting,
                                            rentals, and income management.
                                        </p>
                                    </div>
                                    <a
                                        href="https://sabonghub.vercel.app/"
                                        className="demo-link group relative inline-block text-white-50 font-semibold hover:text-white transition-colors duration-300 whitespace-nowrap"
                                    >
                                        <span>Demo Project</span>
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                                    </a>
                                </div>
                            </div>

                            <div
                                ref={moreProjectRef}
                                className="more-project-wrapper"
                            >
                                <a
                                    href="#projects"
                                    className="more-project-btn group"
                                >
                                    <span className="label">More Projects</span>
                                    <span className="icon-circle">
                                        <FontAwesomeIcon
                                            icon={faArrowRight}
                                            className="size-4"
                                        />
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
