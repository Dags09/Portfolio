import { logos } from "../utils/constants";
export default function LogoSlider() {
    return (
        <div className="md:my-20 my-10 relative">
            <div className="gradient-edge"></div>
            <div className="gradient-edge"></div>
            <div className="marquee h-52">
                <div className="marquee-box md:gap-12 gap-5">
                    {" "}
                    {logos.map(({ icon: Icon, text }) => (
                        <div
                            key={text}
                            className="flex items-center gap-2
                        "
                        >
                            <Icon className="size-8 text-white" />
                            <span>{text}</span>
                        </div>
                    ))}
                    {logos.map(({ icon: Icon, text }) => (
                        <div
                            key={text}
                            className="flex items-center gap-2 
                        "
                        >
                            <Icon className="size-8 text-white" />
                            <span>{text}</span>
                        </div>
                    ))}
                    {logos.map(({ icon: Icon, text }) => (
                        <div
                            key={text}
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
