document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const note = document.getElementById('contact-form-note');
  const footerYear = document.getElementById('footer-year');

  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      note.textContent = 'Please fill in every field before sending.';
      return;
    }

    // No backend on a static site, so this opens the visitor's email client
    // pre-filled with their message. Swap for Formspree/EmailJS later if
    // you want submissions to land directly in an inbox without this step.
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:hello@jewelle.dev?subject=${subject}&body=${body}`;

    note.textContent = 'Opening your email client...';
    form.reset();
  });
});
