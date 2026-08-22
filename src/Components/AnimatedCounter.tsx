import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { counterItems } from "../utils/constants";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedCounter() {
    const counterRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".counter-card");

        cards.forEach((card, i) => {
            const numberEl = card.querySelector<HTMLElement>(".counter-number");
            if (!numberEl) return;

            const target = counterItems[i].value;
            const counter = { val: 0 };

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    once: true,
                },
            });

            tl.fromTo(
                card,
                { y: 40, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    ease: "power3.out",
                    delay: i * 0.12,
                },
            )
                .to(
                    counter,
                    {
                        val: target,
                        duration: 1,
                        ease: "power2.out",
                        onUpdate: () => {
                            numberEl.textContent = `${Math.floor(counter.val)}${counterItems[i].suffix}`;
                        },
                    },
                    "-=0.3",
                )
                .to(numberEl, {
                    scale: 1.15,
                    duration: 0.15,
                    ease: "power1.out",
                    yoyo: true,
                    repeat: 1,
                });
        });
    }, []);

    return (
        <div
            id="counter"
            className="padding-x-lg xl:mt-0 mt-32"
            ref={counterRef}
        >
            <div className="flex flex-col md:grid md:mx-auto gap-4 md:grid-cols-4 px-4 md:px-0">
                {counterItems.map((item) => (
                    <div
                        key={item.label}
                        className="counter-card bg-zinc-900 rounded-lg p-10 flex flex-col justify-center w-full md:w-auto"
                    >
                        <div className="counter-number text-white text-5xl font-bold mb-2 inline-block">
                            0{item.suffix}
                        </div>
                        <p className="text-white-50">{item.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
