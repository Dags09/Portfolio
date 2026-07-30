(() => {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');

  let width, height, stars;
  let shootingStars = [];
  const STAR_COUNT = 220;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
      const twinkle = reduceMotion ? 0 : Math.sin(time * s.twinkleSpeed + s.phase) * 0.35;
      const alpha = Math.min(1, Math.max(0.15, s.baseAlpha + twinkle));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232, 230, 240, ${alpha})`;
      ctx.fill();
    }

    // Draw and advance any active shooting stars, dropping finished ones
    shootingStars = shootingStars.filter((s) => s.life <= s.maxLife);
    for (const s of shootingStars) {
      drawShootingStar(s);
    }
  }

  // Spawns one shooting star with randomized position, angle, and length
  function fireShootingStar() {
    if (reduceMotion) return;
    shootingStars.push({
      x: width * (0.05 + Math.random() * 0.7),
      y: height * (0.05 + Math.random() * 0.35),
      length: 100 + Math.random() * 70,
      angle: Math.PI / 6 + Math.random() * (Math.PI / 10), // gentle downward-right streak
      speed: 9 + Math.random() * 5,
      life: 0,
      maxLife: 55,
    });
  }

  function drawShootingStar(s) {
    const dx = Math.cos(s.angle) * s.length;
    const dy = Math.sin(s.angle) * s.length;

    // Fade the streak in for the first few frames and out for the last few,
    // so it doesn't pop abruptly in and out of existence
    const fadeIn = Math.min(1, s.life / 8);
    const fadeOut = Math.min(1, (s.maxLife - s.life) / 12);
    const opacity = Math.max(0, Math.min(fadeIn, fadeOut));

    const gradient = ctx.createLinearGradient(s.x, s.y, s.x - dx, s.y - dy);
    gradient.addColorStop(0, `rgba(244, 201, 93, ${0.95 * opacity})`);
    gradient.addColorStop(1, 'rgba(244, 201, 93, 0)');

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - dx, s.y - dy);
    ctx.stroke();

    s.x += Math.cos(s.angle) * s.speed;
    s.y += Math.sin(s.angle) * s.speed;
    s.life++;
  }

  // Keeps scheduling the next shooting star (or occasional burst) at a
  // random interval, forever
  function scheduleNextShootingStar() {
    if (reduceMotion) return;
    const delay = 4000 + Math.random() * 6000; // every 4-10 seconds
    setTimeout(() => {
      // Most of the time a single star fires, but sometimes a small
      // cluster of 2-5 streak across close together for variety
      const isBurst = Math.random() > 0.75;
      const count = isBurst ? 2 + Math.floor(Math.random() * 4) : 1;

      for (let i = 0; i < count; i++) {
        // Slight stagger so a burst cascades in rather than firing at once
        setTimeout(fireShootingStar, i * (80 + Math.random() * 150));
      }

      scheduleNextShootingStar();
    }, delay);
  }

  function loop(time) {
    drawStars(time);
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => {
    resize();
    createStars();
  });

  resize();
  createStars();
  requestAnimationFrame(loop);

  window.addEventListener('DOMContentLoaded', () => {
    // Signature moment: one shooting star timed to the intro name fading in
    setTimeout(fireShootingStar, 1300);
    // Then keep more coming at random intervals for the rest of the visit
    setTimeout(scheduleNextShootingStar, 4000);
  });
})();
