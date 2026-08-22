# Jewelle Vincent D. Atienza — Developer Portfolio

A personal developer portfolio built with React, TypeScript, and Tailwind CSS, featuring interactive 3D tech-stack icons, scroll-driven animations, and a working contact form.

## Tech Stack

- **React 19 + TypeScript** — component structure and typing
- **Vite** — dev server and build tooling
- **Tailwind CSS** — styling
- **GSAP** (`gsap`, `@gsap/react`, `ScrollTrigger`) — scroll-triggered and text animations
- **React Three Fiber** (`@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`) — 3D hero model and interactive tech-stack logos
- **FontAwesome** (`@fortawesome/react-fontawesome`, free-solid & free-brands icon sets) — UI and social icons
- **react-icons** — tech logo icons in the marquee/logo slider

## Getting Started

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# build for production
npm run build

# preview the production build
npm run preview
```

## Project Structure

```
src/
├── Components/
│   ├── HeroModel/          # 3D hero scene (lights, particles, hologram model)
│   ├── Models/TechLogos/   # Interactive 3D tech-stack icons
│   ├── AnimatedCounter.tsx # GSAP-driven stat counters
│   ├── Footer.tsx
│   ├── GlowCard.tsx        # Mouse-tracking glow effect for experience cards
│   ├── LogoSlider.tsx      # Infinite marquee of tech logos
│   ├── NavBar.tsx
│   ├── TitleHeader.tsx     # Shared section heading + eyebrow label
│   └── button.tsx          # Reusable CTA button (circle-reveal hover effect)
├── Sections/
│   ├── Hero.tsx
│   ├── ShowcaseSection.tsx     # Featured projects (#work)
│   ├── FeatureCardSection.tsx  # Core abilities/strengths grid
│   ├── ExperienceSection.tsx   # Work experience timeline (#experience)
│   ├── TechStack.tsx           # 3D tech stack grid (#skills)
│   ├── CertificationSection.tsx# Click-to-expand certification cards (#certification)
│   └── ContactSection.tsx      # Contact form (#contact)
├── utils/
│   └── constants.ts        # All editable site content lives here
├── index.css
├── App.tsx
└── main.tsx

public/
├── images/                 # Static images (certificates, reviewer photo, etc.)
└── models/                 # .glb 3D models for the hero and tech-stack icons
```

## Editing Content

Almost all editable content lives in **`src/utils/constants.ts`**:

| Constant         | Controls                                                                                                  |
| ---------------- | --------------------------------------------------------------------------------------------------------- |
| `navLinks`       | Navbar links                                                                                              |
| `words`          | Rotating word slider in the Hero                                                                          |
| `counterItems`   | Stat counters (projects, hours, hackathons, etc.)                                                         |
| `abilities`      | "What I bring" feature cards                                                                              |
| `logos`          | Tech logos in the marquee slider                                                                          |
| `experience`     | Work experience entries and reviewer info                                                                 |
| `techStackIcons` | 3D models shown in the Skills section — each has its own `scale`, `position`, and `rotation` to fine-tune |
| `certifications` | Certification cards — `title`, `issuer`, and `image` path                                                 |
| `CONTACT_EMAIL`  | Where the contact form's `mailto:` link is sent                                                           |
| `socialLinks`    | Footer social icons — `name`, `href`, and FontAwesome `icon`                                              |

### Adding a certification

1. Drop the certificate image into `public/images/`.
2. Add an entry to `certifications` in `constants.ts`:
    ```ts
    {
        icon: faCertificate,
        title: "Certificate Title",
        issuer: "Issuing Organization",
        image: "/images/your-file.jpg",
    },
    ```

### Adding a 3D tech-stack icon

1. Drop the `.glb` file into `public/models/`.
2. Add an entry to `techStackIcons` with a `modelPath`, and tune `scale`/`position`/`rotation` until it looks right in the viewport.
