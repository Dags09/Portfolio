import { logos } from "../utils/constants";

// A single pass through `logos` is only ~8 items — not wide enough to fill a
// large screen before the loop wraps, which leaves a visible blank gap
// rather than a continuous stream. Repeating the set several times inside
// each of the two marquee halves guarantees it always overflows the
// viewport, however wide, while keeping the CSS's "two matching 100%-wide
// halves" loop trick intact.
const REPEATS = 4;
const repeatedLogos = Array.from({ length: REPEATS }, () => logos).flat();

export default function LogoSlider() {
    return (
        <div className="md:my-20 my-10 relative">
            <div className="gradient-edge"></div>
            <div className="gradient-edge"></div>
            <div className="marquee h-52">
                <div className="marquee-box md:gap-12 gap-5">
                    {" "}
                    {repeatedLogos.map(({ icon: Icon, text }, i) => (
                        <div
                            key={`a-${text}-${i}`}
                            className="flex items-center gap-2
                        "
                        >
                            <Icon className="size-8 text-white" />
                            <span>{text}</span>
                        </div>
                    ))}
                    {repeatedLogos.map(({ icon: Icon, text }, i) => (
                        <div
                            key={`b-${text}-${i}`}
                            className="flex items-center gap-2 
                        "
                        >
                            <Icon className="size-8 text-white" />
                            <span>{text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
