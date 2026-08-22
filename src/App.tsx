import Hero from "./Sections/Hero";
import ShowcaseSection from "./Sections/ShowcaseSection";
import NavBar from "./Components/NavBar";
import FeatureCardSection from "./Sections/FeatureCardSection";
import LogoSlider from "./Components/LogoSlider";
import ExperienceSection from "./Sections/ExperienceSection";
import TechStack from "./Sections/TechStack";
import CertificationSection from "./Sections/CertificationSection";
import ContactSection from "./Sections/Contactsection";
import Footer from "./Sections/Footer";
function App() {
    return (
        <>
            <NavBar />
            <Hero />
            <ShowcaseSection />
            <LogoSlider />
            <FeatureCardSection />
            <ExperienceSection />
            <TechStack />
            <CertificationSection />
            <ContactSection />
            <Footer />
        </>
    );
}

export default App;
