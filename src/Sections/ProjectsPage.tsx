import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { projects } from "../utils/constants";
import TitleHeader from "../Components/TitleHeader";

export default function ProjectsPage() {
    return (
        <section id="projects" className="projects-page">
            <div className="padding-x-lg mx-auto w-full max-w-7xl">
                <a href="#hero" className="back-link group">
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1"
                    />
                    <span>Back to Portfolio</span>
                </a>

                <div className="mt-10">
                    <TitleHeader
                        title="All Projects"
                        sub="A closer look at what I've built"
                    />
                </div>

                <div className="projects-grid">
                    {projects.map(
                        ({
                            title,
                            description,
                            image,
                            tags,
                            demoLink,
                            icon,
                        }) => (
                            <div key={title} className="project-tile">
                                <div className="tile-image">
                                    <img src={image} alt={title} />
                                </div>
                                <div className="tile-body">
                                    <h3>{title}</h3>
                                    <p className="text-white-50">
                                        {description}
                                    </p>
                                    <div className="tile-tags">
                                        {tags.map((tag) => (
                                            <span key={tag}>{tag}</span>
                                        ))}
                                    </div>
                                    <a
                                        href={demoLink}
                                        target={
                                            demoLink.startsWith("http")
                                                ? "_blank"
                                                : undefined
                                        }
                                        rel="noreferrer"
                                        className="tile-link group"
                                    >
                                        <span>View Project</span>
                                        <FontAwesomeIcon
                                            icon={icon}
                                            className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                        />
                                    </a>
                                </div>
                            </div>
                        ),
                    )}
                </div>
            </div>
        </section>
    );
}
