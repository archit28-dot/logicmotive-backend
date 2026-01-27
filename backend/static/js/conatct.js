
    // 1. Staggered Reveal Animation
    document.addEventListener('DOMContentLoaded', () => {
        const reveals = document.querySelectorAll('[data-reveal]');
        reveals.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('active');
            }, index * 100);
        });
    });

    // 2. Magnetic Button Glow Effect
    const btn = document.querySelector('.premium-btn');
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        btn.style.setProperty('--x', `${x}px`);
        btn.style.setProperty('--y', `${y}px`);
    });

    // 3. Form Submission Handling (Mockup)
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btnText = btn.querySelector('span');
        btnText.innerText = "Message Sent Successfully ✓";
        btn.style.background = "#059669"; // Success Green
        form.reset();
    });

