import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { words } from "../utils/constants";
import Button from "../Components/button";
import ShapedPinBadge from "../Components/Models/PinBadge/ShapedPinBadge";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedCounter from "../Components/AnimatedCounter";
export default function Hero() {
    useGSAP(() => {
        gsap.fromTo(
            ".hero-text h1",
            {
                y: 50,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                stagger: 0.2,
                duration: 1,
                ease: "power2.inOut",
            },
        );
    });
    return (
        <section id="hero" className="relative overflow-hidden">
            <div className="absolute top-0 left-0 z-10">
                <img src="/images/bg.jpg" alt="background" />
            </div>
            <div className="hero-layout">
                <header className="flex flex-col justify-center md:w-full w-full md:px-20 px-5">
                    <div className="flex flex-col gap-7">
                        <div className="hero-text">
                            <h1>
                                Shipping{" "}
                                <span className="slide">
                                    <span className="wrapper">
                                        {words.map((word) => (
                                            <span
                                                key={word.text}
                                                className="flex items-center md:gap-3 gap-1 pb-2"
                                            >
                                                <FontAwesomeIcon
                                                    icon={word.icon}
                                                    className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded text-black bg-white "
                                                />
                                                <span>{word.text}</span>
                                            </span>
                                        ))}
                                    </span>
                                </span>
                            </h1>
                            <h1>into Real Projects</h1>
                            <h1>that Deliver Results</h1>
                        </div>
                        <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
                            Hi, I'm Jewelle, a developer based in pasig with a
                            passion for code.
                        </p>
                        <Button
                            className="md:w-80 md:h-16 w-60 h-12"
                            id="button"
                            href="#work"
                        />
                    </div>
                </header>
                <figure>
                    <div className="absolute xl:right-[6%] right-[20%] xl:top-[40%] top-[80%] -translate-y-1/2 xl:w-2xl w-[min(60vw,42rem)] aspect-square">
                        <ShapedPinBadge
                            imageUrl="/images/pin-photo.png"
                            size={2.5}
                            cameraDistance={5}
                        />
                    </div>
                </figure>
            </div>
            <AnimatedCounter />
        </section>
    );
}
