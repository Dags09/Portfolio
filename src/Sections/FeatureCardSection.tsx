import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { abilities } from "../utils/constants";

export default function FeatureCardSection() {
    return (
        <div
            id="abilities"
            className="w-full padding-x-lg mt-16 md:mt-24 mb-16 md:mb-24"
        >
            <div className="mx-auto grid-3-cols">
                {abilities.map(({ icon, title, desc }) => (
                    <div
                        key={title}
                        className="card-border rounded-xl p-8 flex flex-col gap-4"
                    >
                        <div className="size-14 flex items-center justify-center rounded-full">
                            <FontAwesomeIcon
                                icon={icon}
                                className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded text-black bg-white"
                            />
                        </div>
                        <h3>{title}</h3>
                        <p className="text-white-50">{desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
