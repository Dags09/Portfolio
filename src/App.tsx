import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import Hero from "./Sections/Hero";
import NavBar from "./Components/NavBar";
import HeroBackground from "./Components/HeroBackground";

const ShowcaseSection = lazy(() => import("./Sections/ShowcaseSection"));
const LogoSlider = lazy(() => import("./Components/LogoSlider"));
const FeatureCardSection = lazy(() => import("./Sections/FeatureCardSection"));
const ExperienceSection = lazy(() => import("./Sections/ExperienceSection"));
const TechStack = lazy(() => import("./Sections/TechStack"));
const CertificationSection = lazy(
    () => import("./Sections/CertificationSection"),
);
const ContactSection = lazy(() => import("./Sections/Contactsection"));
const Footer = lazy(() => import("./Sections/Footer"));

function LazySection({ component: Component }: { component: ComponentType }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "300px" },
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} style={{ minHeight: visible ? undefined : 200 }}>
            {visible && (
                <Suspense fallback={null}>
                    <Component />
                </Suspense>
            )}
        </div>
    );
}

function App() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const reveal = () => {
            requestAnimationFrame(() => {
                if (!cancelled) setIsReady(true);
            });
        };

        if (document.readyState === "complete") {
            reveal();
        } else {
            window.addEventListener("load", reveal, { once: true });
        }

        return () => {
            cancelled = true;
            window.removeEventListener("load", reveal);
        };
    }, []);

    return (
        <div
            className={`app-shell relative isolate ${isReady ? "is-ready" : ""}`}
        >
            <HeroBackground />
            <NavBar />
            <Hero />
            <LazySection component={ShowcaseSection} />
            <LazySection component={LogoSlider} />
            <LazySection component={FeatureCardSection} />
            <LazySection component={ExperienceSection} />
            <LazySection component={TechStack} />
            <LazySection component={CertificationSection} />
            <LazySection component={ContactSection} />
            <LazySection component={Footer} />
        </div>
    );
}

export default App;
