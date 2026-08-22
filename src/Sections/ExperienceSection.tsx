import TitleHeader from "../Components/TitleHeader";
import { experience } from "../utils/constants";
import { GlowCard } from "../Components/GlowCard";
import type { ExperienceItem } from "../Components/GlowCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
    useGSAP(() => {
        // 1. Each card slides in from the left as it enters the viewport
        gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((exp) => {
            gsap.from(exp, {
                xPercent: -100,
                opacity: 0,
                transformOrigin: "left left",
                duration: 1,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: exp,
                    start: "top 80%",
                },
            });
        });

        // 2. Each logo pops in on scroll instead of being visible from the
        //    start — so it isn't the first thing the user sees.
        gsap.utils.toArray<HTMLElement>(".timeline-logo").forEach((logo) => {
            gsap.from(logo, {
                scale: 0,
                opacity: 0,
                duration: 0.6,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: logo,
                    start: "top 80%",
                },
            });
        });

        // 3. Mobile connector height: on mobile, flex-col-reverse stacks
        //    the review card BETWEEN this logo and the next one (unlike
        //    desktop, where the review card sits beside the logo column,
        //    not between rows). That card's height varies per testimonial,
        //    so a fixed rem offset can't reach the next logo — measure the
        //    real pixel gap between consecutive logos instead.
        const logos = gsap.utils.toArray<HTMLElement>(".timeline-logo");
        gsap.utils
            .toArray<HTMLElement>(".timeline-connector-mobile")
            .forEach((connector, i) => {
                const thisLogo = logos[i];
                const nextLogo = logos[i + 1];
                if (!thisLogo || !nextLogo) return;

                const connectorTop = connector.getBoundingClientRect().top;
                const targetY = nextLogo.getBoundingClientRect().top;
                connector.style.height = `${targetY - connectorTop}px`;
            });

        // Same idea for the final "end" line on mobile: the "On to the
        // next journey..." label sits below the review card (a separate
        // element placed there so flex-col-reverse pushes it to the very
        // bottom), not right after the logo, so measure the real distance
        // to it instead of guessing a fixed height.
        const endLabel = document.querySelector<HTMLElement>(
            ".timeline-end-label-mobile",
        );
        const endLineMobile = document.querySelector<HTMLElement>(
            ".timeline-end-line-mobile",
        );
        if (endLabel && endLineMobile) {
            const lineTop = endLineMobile.getBoundingClientRect().top;
            const labelTop = endLabel.getBoundingClientRect().top;
            endLineMobile.style.height = `${labelTop - lineTop}px`;
        }

        // 4. Each connector line — and the final "end" line — starts
        //    collapsed at its logo (top) and grows downward as you scroll.
        //    Scoped per-element so each one tracks its own scroll position
        //    instead of every card fighting over one global animation.
        gsap.utils
            .toArray<HTMLElement>(
                ".timeline-connector, .timeline-connector-mobile, .timeline-end-line, .timeline-end-line-mobile",
            )
            .forEach((line) => {
                gsap.set(line, { scaleY: 0, transformOrigin: "top center" });

                // Use the stable, unscaled parent node as the trigger — the
                // line's own bounding box shrinks to ~0 once scaleY: 0 is
                // applied (getBoundingClientRect includes transforms), which
                // would collapse the start/end scroll range to almost nothing.
                const triggerEl =
                    line.closest<HTMLElement>(".timeline-node") ?? line;

                gsap.to(line, {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: triggerEl,
                        start: "top center",
                        end: "bottom 90%",
                        scrub: true,
                    },
                });
            });

        // 4. Text content fades/slides in per card
        gsap.utils.toArray<HTMLElement>(".expText").forEach((text) => {
            gsap.from(text, {
                xPercent: 0,
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: text,
                    start: "top 60%",
                },
            });
        });

        gsap.utils
            .toArray<HTMLElement>(".timeline-end-label")
            .forEach((text) => {
                gsap.from(text, {
                    xPercent: 0,
                    opacity: 0,
                    duration: 1,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: text,
                        start: "top 60%",
                    },
                });
            });
    }, []);

    return (
        <section
            id="experience"
            className="w-full md:mt-40 mt-20 section-padding xl:px-0"
        >
            <div className="w-full h-full md:px-20 px-5 ">
                <TitleHeader
                    title="Work Experience"
                    sub="My Experience Overview"
                />
            </div>
            <div className="mt-32 relative md:px-20 px-5">
                <div className="relative z-50 xl:space-y-32 space-y-10">
                    {experience.map((exp: ExperienceItem, index: number) => (
                        <div key={exp.title} className="exp-card-wrapper">
                            {index === experience.length - 1 && (
                                <div className="timeline-end-label-mobile xl:hidden mt-3 text-xs text-white-50 italic whitespace-nowrap tracking-wide text-center">
                                    On to the next
                                    <br />
                                    journey...
                                </div>
                            )}
                            <div className="xl:w-2/6">
                                <GlowCard exp={exp} index={index}>
                                    <div className="flex flex-row gap-4">
                                        <div>
                                            <img
                                                src={exp.reviewerImg}
                                                alt={exp.reviewer}
                                                className="object-contain w-16 h-16 rounded-full shrink-0"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 min-w-0">
                                            <p className="text-lg font-bold truncate">
                                                {exp.reviewer}
                                            </p>
                                            <p className="truncate">
                                                {exp.position}
                                            </p>
                                            <p className="truncate">
                                                {exp.contact}
                                            </p>
                                        </div>
                                    </div>
                                </GlowCard>
                            </div>

                            <div className="xl:w-4/6">
                                <div className="flex items-start xl:gap-20 md:gap-10 gap-5">
                                    <div className="timeline-node">
                                        <div className="timeline-logo">
                                            <img
                                                src={exp.logoPath}
                                                alt={exp.company}
                                                className="size-10 rounded-full object-contain"
                                            />
                                        </div>

                                        {index < experience.length - 1 ? (
                                            <>
                                                <div className="timeline-connector" />
                                                <div className="timeline-connector-mobile" />
                                            </>
                                        ) : (
                                            <>
                                                <div className="timeline-end">
                                                    <div className="timeline-end-line" />
                                                    <div className="timeline-end-label">
                                                        On to the next
                                                        <br />
                                                        journey...
                                                    </div>
                                                </div>
                                                <div className="timeline-end-line-mobile" />
                                            </>
                                        )}
                                    </div>
                                    <div className="min-w-0 expText">
                                        <h1 className="font-semibold text-3xl">
                                            {exp.title}
                                        </h1>
                                        <p className="my-5 text-white-50">
                                            {exp.date}
                                        </p>
                                        <p className="text-white-50 italic">
                                            {exp.company}
                                        </p>
                                        <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
                                            {exp.responsibilities.map(
                                                (responsibility, i) => (
                                                    <li
                                                        key={i}
                                                        className="text-lg"
                                                    >
                                                        {responsibility}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
