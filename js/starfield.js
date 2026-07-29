(() => {
    const canvas = document.getElementById("starfield");
    const ctx = canvas.getContext("2d");

    let width, height, stars, shootingStar;
    const STAR_COUNT = 220;
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function createStars() {
        stars = Array.from({ length: STAR_COUNT }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.3 + 0.3,
            baseAlpha: Math.random() * 0.6 + 0.3,
            twinkleSpeed: Math.random() * 0.02 + 0.005,
            phase: Math.random() * Math.PI * 2,
        }));
    }

    function drawStars(time) {
        ctx.clearRect(0, 0, width, height);

        for (const s of stars) {
            const twinkle = reduceMotion
                ? 0
                : Math.sin(time * s.twinkleSpeed + s.phase) * 0.35;
            const alpha = Math.min(1, Math.max(0.15, s.baseAlpha + twinkle));
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(232, 230, 240, ${alpha})`;
            ctx.fill();
        }

        if (shootingStar && shootingStar.active) {
            drawShootingStar();
        }
    }

    // Signature moment: one shooting star streaks across during the intro text reveal
    function fireShootingStar() {
        if (reduceMotion) return;
        shootingStar = {
            x: width * (0.15 + Math.random() * 0.2),
            y: height * (0.1 + Math.random() * 0.15),
            length: 140,
            angle: Math.PI / 5, // downward-right streak
            speed: 11,
            life: 0,
            maxLife: 60,
            active: true,
        };
    }

    function drawShootingStar() {
        const s = shootingStar;
        const dx = Math.cos(s.angle) * s.length;
        const dy = Math.sin(s.angle) * s.length;

        const gradient = ctx.createLinearGradient(s.x, s.y, s.x - dx, s.y - dy);
        gradient.addColorStop(0, "rgba(244, 201, 93, 0.95)");
        gradient.addColorStop(1, "rgba(244, 201, 93, 0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - dx, s.y - dy);
        ctx.stroke();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.life++;

        if (s.life > s.maxLife) {
            shootingStar.active = false;
        }
    }

    function loop(time) {
        drawStars(time);
        requestAnimationFrame(loop);
    }

    window.addEventListener("resize", () => {
        resize();
        createStars();
    });

    resize();
    createStars();
    requestAnimationFrame(loop);

    // Fire the shooting star once, timed to land right as the name fades in (~1.15s delay in CSS)
    window.addEventListener("DOMContentLoaded", () => {
        setTimeout(fireShootingStar, 1300);
    });
})();
