   
        document.addEventListener("DOMContentLoaded", () => {
            // Select the container
            const heroContent = document.querySelector('.about-hero-content');

            // Function to process each text element
            function animateTextElement(el, baseDelay = 0) {
                if (!el) return;
                const text = el.innerText;
                el.innerText = ""; // Clear existing text
                el.style.opacity = "1"; // Ensure the container is visible

                text.split("").forEach((char, i) => {
                    const span = document.createElement("span");
                    span.innerText = char === " " ? "\u00A0" : char;
                    span.className = "char";

                    // i * 0.02s is the gap between letters
                    // baseDelay allows the <p> to start after the <h1> finishes
                    span.style.transitionDelay = `${baseDelay + (i * 0.04)}s`;

                    el.appendChild(span);
                    // Trigger the animation
                    setTimeout(() => span.classList.add('visible'), 50);
                });
            }

            const title = document.querySelector("#about-title");
            const description = document.querySelector("#about-p");

            // Animate Title immediately
            animateTextElement(title, 0);

            // Animate Description with a 0.5s delay so it follows the title
            animateTextElement(description, 0.2);
        });
        document.addEventListener("DOMContentLoaded", () => {
            const storySection = document.querySelector('.our-story-container');
            const storyDesc = document.querySelector('.story-description');

            function splitText(el) {
                if (!el) return;
                const text = el.innerText;
                el.innerText = "";
                // Use Array.from or spread to handle the string
                [...text].forEach((char, i) => {
                    const span = document.createElement("span");
                    span.innerText = char === " " ? "\u00A0" : char;
                    span.className = "char";
                    // Fast, professional speed for Logic-Motive site
                    span.style.transitionDelay = `${i * 0.015}s`;
                    el.appendChild(span);
                });
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // 1. Reveal the container
                        entry.target.classList.add('is-visible');

                        // 2. Run the split logic
                        splitText(storyDesc);

                        // 3. Force a reflow and add the visible class to each span
                        const chars = storyDesc.querySelectorAll('.char');
                        setTimeout(() => {
                            chars.forEach(c => c.classList.add('visible'));
                        }, 50);

                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            if (storySection) observer.observe(storySection);
        });
        const storySection = document.querySelector('.our-story-container');
        const storyDesc = document.querySelector('.story-description');

        // Reuse your existing splitText function
        function splitText(el) {
            if (!el) return;
            const text = el.innerText;
            el.innerText = "";
            [...text].forEach((char, i) => {
                const span = document.createElement("span");
                span.innerText = char === " " ? "\u00A0" : char;
                span.className = "char";
                span.style.transitionDelay = `${i * 0.02}s`; // Fast, professional speed
                el.appendChild(span);
            });
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger Image Reveal
                    entry.target.classList.add('is-visible');

                    // Trigger Text Animation
                    splitText(storyDesc);
                    const chars = storyDesc.querySelectorAll('.char');
                    setTimeout(() => {
                        chars.forEach(c => c.classList.add('visible'));
                    }, 100);

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        if (storySection) observer.observe(storySection);



        document.addEventListener("DOMContentLoaded", () => {
            const features = document.querySelectorAll('.vm-feature');

            const vmObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const imgBox = entry.target.querySelector('.vm-image-box');
                        const textBox = entry.target.querySelector('.vm-text-box');

                        // Image slides in
                        imgBox.style.opacity = "1";
                        imgBox.style.transform = "translateX(0)";

                        // Text box floats in with delay
                        setTimeout(() => {
                            textBox.style.opacity = "1";
                            textBox.style.transform = "translateY(0)";
                        }, 400);

                        vmObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            features.forEach(feature => {
                const img = feature.querySelector('.vm-image-box');
                const text = feature.querySelector('.vm-text-box');

                // Initial hidden states
                img.style.opacity = "0";
                img.style.transform = "translateX(-50px)";
                img.style.transition = "all 1.5s cubic-bezier(0.19, 1, 0.22, 1)";

                text.style.opacity = "0";
                text.style.transform = "translateY(50px)";
                text.style.transition = "all 1.2s cubic-bezier(0.19, 1, 0.22, 1)";

                vmObserver.observe(feature);
            });
        });

        document.addEventListener("DOMContentLoaded", () => {
            const features = document.querySelectorAll('.vm-feature');

            const vmObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const imgBox = entry.target.querySelector('.vm-image-box');
                        const textBox = entry.target.querySelector('.vm-text-box');

                        // 1. Image slides in (keeping your existing style)
                        imgBox.style.opacity = "1";
                        imgBox.style.transform = "translateX(0)";

                        // 2. Trigger the staggered text reveal
                        // We add a class instead of manual styles for cleaner staggering
                        setTimeout(() => {
                            textBox.classList.add('revealed');
                        }, 300);

                        vmObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            features.forEach(feature => {
                const img = feature.querySelector('.vm-image-box');

                // Initial state for images (keeping your current logic)
                img.style.opacity = "0";
                img.style.transform = feature.classList.contains('vision-feature')
                    ? "translateX(-80px)"
                    : "translateX(80px)"; // Vision slides from left, Mission from right
                img.style.transition = "all 1.2s cubic-bezier(0.19, 1, 0.22, 1)";

                vmObserver.observe(feature);
            });
        });
  