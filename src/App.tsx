import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Hero from "./Sections/Hero";
import ShowcaseSection from "./Sections/ShowcaseSection";
import NavBar from "./Components/NavBar";
import FeatureCardSection from "./Sections/FeatureCardSection";
import LogoSlider from "./Components/LogoSlider";
import ExperienceSection from "./Sections/ExperienceSection";
import CertificationSection from "./Sections/CertificationSection";
import ContactSection from "./Sections/Contactsection";
import Footer from "./Sections/Footer";

const TechStack = lazy(() => import("./Sections/TechStack"));

function LazyTechStack() {
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
        <div ref={ref} style={{ minHeight: 400 }}>
            {visible && (
                <Suspense fallback={null}>
                    <TechStack />
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
        <div className={`app-shell ${isReady ? "is-ready" : ""}`}>
            <NavBar />
            <Hero />
            <ShowcaseSection />
            <LogoSlider />
            <FeatureCardSection />
            <ExperienceSection />
            <LazyTechStack />
            <CertificationSection />
            <ContactSection />
            <Footer />
        </div>
    );
}

export default App;
