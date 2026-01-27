    
        document.addEventListener("DOMContentLoaded", () => {

            // 1. Text Splitter for Hero
            function splitText(selector) {
                const el = document.querySelector(selector);
                if (!el) return;
                const text = el.innerText;
                el.innerText = "";
                el.style.opacity = "1";

                text.split("").forEach((char, i) => {
                    const span = document.createElement("span");
                    span.innerText = char === " " ? "\u00A0" : char;
                    span.className = "char";
                    span.style.transitionDelay = `${i * 0.02}s`;
                    el.appendChild(span);
                    setTimeout(() => span.classList.add('visible'), 100);
                });
            }

            // Run Hero Text Animations
            splitText("#hero-accent");
            setTimeout(() => splitText("#hero-title"), 500);
            setTimeout(() => splitText("#hero-p"), 1100);

            // 2. Intersection Observer for Reveal Effects
            const observerOptions = { threshold: 0.25 };
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.service-row').forEach(row => {
                observer.observe(row);
            });

            // 3. Smooth Parallax Logic
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;

                document.querySelectorAll('.service-row.is-visible').forEach(row => {
                    const img = row.querySelector('.service-visual img');
                    if (img) {
                        // Maintain the base scale while moving
                        img.style.transform = `scale(1.1) translateY(${move}px)`;
                    }
                });
            });

        });
        document.querySelectorAll('.service-visual').forEach(visual => {
            const img = visual.querySelector('img');

            visual.addEventListener('mousemove', (e) => {
                // Calculate mouse position relative to the image container
                const rect = visual.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Calculate offset (moves image in opposite direction of mouse)
                const moveX = (x / rect.width - 0.5) * 30; // 30px max movement
                const moveY = (y / rect.height - 0.5) * 30;

                // Apply movement + the hover zoom scale
                img.style.transform = `scale(1.25) translate(${-moveX}px, ${-moveY}px)`;
            });

            // Reset image position when mouse leaves
            visual.addEventListener('mouseleave', () => {
                img.style.transform = `scale(1.1) translate(0, 0)`;
            });
        });
    