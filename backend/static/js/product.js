
        window.addEventListener('DOMContentLoaded', () => {
            // Helper to wrap text in spans
            const prepareText = (elementId, className) => {
                const el = document.getElementById(elementId);
                if (!el) return;
                const text = el.innerText;
                el.innerHTML = '';
                text.split('').forEach((char) => {
                    const span = document.createElement('span');
                    span.innerHTML = char === ' ' ? '&nbsp;' : char;
                    span.classList.add(className);
                    el.appendChild(span);
                });
            };

            // 1. Prepare Hero
            prepareText('hero-title', 'hero-char');
            prepareText('hero-desc', 'hero-char');

            document.querySelectorAll('#hero-title .hero-char').forEach((s, i) => s.style.animationDelay = `${0.5 + (i * 0.04)}s`);
            document.querySelectorAll('#hero-desc .hero-char').forEach((s, i) => s.style.animationDelay = `${1.5 + (i * 0.02)}s`);

            // 2. Intersection Observer for Typewriter
            const descSection = document.getElementById('typewriter-text');
            const descContent = descSection.innerText;
            descSection.innerHTML = '';

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        descSection.classList.add('start-anim');
                        descContent.split('').forEach((char, index) => {
                            const span = document.createElement('span');
                            span.innerHTML = char === ' ' ? '&nbsp;' : char;
                            span.classList.add('char');
                            span.style.animationDelay = `${index * 0.01}s`;
                            descSection.appendChild(span);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(descSection);
        });
        // --- Scroll Reveal Observer ---
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Optional: unobserve if you only want the animation once
                    // revealObserver.unobserve(entry.target); 
                } else {
                    // Optional: remove 'active' to re-animate when scrolling back up
                    entry.target.classList.remove('active');
                }
            });
        }, {
            threshold: 0.15 // Trigger when 15% of the element is visible
        });

        // Target all elements with the 'reveal' class
        document.querySelectorAll('.reveal').forEach(el => {
            revealObserver.observe(el);
        });
   