import {
    faLightbulb,
    faComments,
    faCode,
    faPalette,
    faBullseye,
    faRocket,
    faUsers,
    faGraduationCap,
    faShieldHalved,
    faLayerGroup,
    faCertificate,
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
    faGithub,
    faLinkedin,
    faFacebook,
} from "@fortawesome/free-brands-svg-icons";

import {
    SiTypescript,
    SiJavascript,
    SiReact,
    SiNodedotjs,
    SiTailwindcss,
    SiThreedotjs,
    SiGit,
    SiHtml5,
} from "react-icons/si";
import type { TechModel } from "../Components/Models/TechLogos/TechIcon";

const serviceId = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

export const words = [
    { text: "Ideas", icon: faLightbulb },
    { text: "Concepts", icon: faComments },
    { text: "Code", icon: faCode },
    { text: "Design", icon: faPalette },
];

export const counterItems = [
    { value: 2, suffix: "", label: "Completed Projects" },
    { value: 6, suffix: "+", label: "Technologies Used" },
    { value: 500, suffix: "+", label: "Hours of Coding" },
    { value: 1, suffix: "", label: "Hackathons Joined" },
];

export const navLinks = [
    {
        name: "Work",
        link: "#work",
    },
    {
        name: "Experience",
        link: "#experience",
    },
    {
        name: "Skills",
        link: "#skills",
    },
    {
        name: "Certification",
        link: "#certification",
    },
];

export const abilities = [
    {
        icon: faBullseye,
        title: "Quality Focus",
        desc: "Delivering clean, well-tested code that meets high standards and stands up to real-world use.",
    },
    {
        icon: faRocket,
        title: "Fast Delivery",
        desc: "Shipping projects efficiently without cutting corners, so ideas turn into working products quickly.",
    },
    {
        icon: faUsers,
        title: "Team Collaboration",
        desc: "Working closely with teams and clients to align on goals and keep communication clear throughout.",
    },
    {
        icon: faGraduationCap,
        title: "Continuous Learning",
        desc: "Constantly picking up new tools and techniques to stay sharp and bring fresh solutions to problems.",
    },
    {
        icon: faShieldHalved,
        title: "Reliable Code",
        desc: "Writing dependable, maintainable code that holds up over time and is easy for others to build on.",
    },
    {
        icon: faLayerGroup,
        title: "Full-Stack Versatility",
        desc: "Comfortable moving across the stack, from frontend interfaces to backend logic and everything in between.",
    },
];

export const logos = [
    { icon: SiTypescript, text: "TypeScript" },
    { icon: SiJavascript, text: "JavaScript" },
    { icon: SiReact, text: "React" },
    { icon: SiNodedotjs, text: "Node.js" },
    { icon: SiTailwindcss, text: "Tailwind CSS" },
    { icon: SiThreedotjs, text: "Three.js" },
    { icon: SiGit, text: "Git" },
    { icon: SiHtml5, text: "HTML5" },
];
export const experience = [
    {
        review: "His work validating REST APIs with Postman, verifying database integrity, and designing thorough edge-case tests proves he has truly applied his technical foundation to real-world systems. Going a step further to build automated test scripts in Playwright and working effectively alongside developers shows outstanding dedication and readiness for the industry. He has represented our program exceptionally well!",
        reviewerImg: "/images/reviewer1.png",
        reviewer: "Aldrin Requiz, MSIT",
        position: "Instructor 1",
        contact: "09603228853",
        company: "DOST-MIMAROPA",
        logoPath: "/images/DOST-Mimaropa.png",
        title: "QA Intern Tester",
        date: "January 2026 - April 2026",
        responsibilities: [
            "Performed manual testing on backend systems and APIs to verify functionality, data accuracy, and business logic",
            "Tested REST API endpoints using tools like Postman to validate response status codes, payloads, headers, and error handling",
            "Verified database records against expected outcomes after API calls to ensure data was correctly created, updated, or deleted",
            "Conducted boundary and negative testing on API inputs (invalid data, missing fields, unauthorized requests) to check system error handling",
            "Wrote and executed test cases covering backend workflows, edge cases, and integration points between services",
            "Collaborated with developers to clarify requirements, reproduce bugs, and verify fixes",
            "Practiced test automation using Playwright, writing scripts to automate UI-driven test flows and reduce repetitive manual testing",
        ],
    },
];

export const techStackIcons: TechModel[] = [
    {
        name: "TypeScript",
        modelPath: "/models/ts-logo.glb",
        scale: 40,
        position: [0, 0, 0],
        rotation: [0, 0, 0],
    },
    {
        name: "JavaScript",
        modelPath: "/models/js-logo.glb",
        scale: 40,
        position: [0, -2, 0],
        rotation: [0, 0, 0],
    },
    {
        name: "React",
        modelPath: "/models/react_logo-transformed.glb",
        scale: 1,
        position: [0, 0, 0],
        rotation: [0, 0, 0],
    },
    {
        name: "Node.js",
        modelPath: "/models/node-js-logo.glb",
        scale: 40,
        position: [0, 0, 0],
        rotation: [0, 0, 0],
    },
    {
        name: "Tailwind",
        modelPath: "/models/tailwindcss-logo.glb",
        scale: 40,
        position: [0, 0, 0],
        rotation: [0, 0, 0],
    },
    {
        name: "Git",
        modelPath: "/models/git-svg-transformed.glb",
        scale: 0.05,
        position: [0, 0, 0],
        rotation: [0, 5.5, 0],
    },
];

export const certifications = [
    {
        icon: faCertificate,
        title: "DOST-MIMAROPA Certificate",
        issuer: "Department of Science and Technology",
        image: "/images/DOST-CertificateOfCompletion.jpg",
    },
    {
        icon: faCertificate,
        title: "BasePH - Hackaton",
        issuer: "Base Build MIMAROPA - MarSu",
        image: "/images/BasePH-CertificateOfParticipation.png",
    },
];

export const CONTACT_EMAIL = "jewellevincentatienza09@gmail.com";

export const WEB3FORMS_ACCESS_KEY = serviceId;

export const socialLinks = [
    {
        name: "GitHub",
        href: "https://github.com/yourusername",
        icons: faGithub,
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com/in/yourusername",
        icons: faLinkedin,
    },
    { name: "Email", href: `mailto:${CONTACT_EMAIL}`, icons: faEnvelope },
    {
        name: "Facebook",
        href: "https://www.facebook.com/profile.php?id=61577330247389",
        icons: faFacebook,
    },
];
