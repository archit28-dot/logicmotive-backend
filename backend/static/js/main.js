// --- ALL ANIMATIONS WRAPPED IN ONE DOM CONTENT LOADED ---
document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const dotToggle = document.getElementById('dot-toggle');
    const contactSection = document.getElementById('contactSection');
    const closeContact = document.querySelector('.close-contact');
    const allDropdowns = document.querySelectorAll('.dropdown');

    // Helper function to reset the dot menu and sidebar
    const closeSidebar = () => {
        contactSection.classList.remove('active');
        dotToggle.classList.remove('is-rotated');
    };

    // 1. Mobile Menu Toggle
    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('is-active');
    });

    // 2. Contact Sidebar Toggle (Corrected)
    dotToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        contactSection.classList.add('active');
        dotToggle.classList.add('is-rotated'); // Injects rotation
    });

    closeContact.addEventListener('click', closeSidebar);

    // 3. Mobile Dropdown (Corrected)
    allDropdowns.forEach(dropdown => {
        // Find the specific link inside this dropdown
        const toggleLink = dropdown.querySelector('.dropdown-toggle');

        dropdown.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                e.stopPropagation();

                // Optional: Close other dropdowns when one is opened
                allDropdowns.forEach(other => {
                    if (other !== dropdown) other.classList.remove('active');
                });

                // Toggle the current one
                dropdown.classList.toggle('active');
            }
        });
    });
    // 4. Global Click to Close
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('is-active');
        }
        if (!contactSection.contains(e.target) && !dotToggle.contains(e.target)) {
            closeSidebar();
        }
    });
});

/*****************      HERO SECTION  **********************/
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function initParticles() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * 0.3 + 0.1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            p.y -= p.speed;
            if (p.y < 0) p.y = canvas.height;
        });
        requestAnimationFrame(animateParticles);
    }

    // 2. Count-Up Animation
    function animateNumbers() {
        const activeNum = document.querySelector('.stat-card.active .num');
        if (!activeNum) return;

        const target = +activeNum.getAttribute('data-target');
        const current = +activeNum.innerText;
        const increment = Math.max(1, target / 50);

        if (current < target) {
            activeNum.innerText = Math.ceil(current + increment);
            setTimeout(animateNumbers, 10);
        } else {
            activeNum.innerText = target;
        }
    }

    // 3. Slider Logic
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.stat-card');
    const container = document.querySelector('.carousel-container');
    const displayDuration = 4000;
    let currentIndex = 0;

    function updateSlider() {
        const slideWidth = container.offsetWidth;
        track.style.transition = 'transform 0.2s cubic-bezier(0.45, 0, 0.55, 1)'
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

        cards.forEach((card, index) => {
            card.classList.remove('active', 'exit');
            const numSpan = card.querySelector('.num');
            if (numSpan) numSpan.innerText = "0";

            if (index === currentIndex) {
                card.classList.add('active');
                // Trigger text reveal for the header
                revealText(card.querySelector('.stat-header'), 30);
                setTimeout(animateNumbers, 600);
            } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
                card.classList.add('exit');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateSlider();
        revealText(document.querySelector('.subtitle'), 5);
    }

    // 4. Text Reveal Utility
    function revealText(element, speed) {
        if (!element) return;
        const text = element.getAttribute('data-text') || element.innerText;
        if (!element.getAttribute('data-text')) element.setAttribute('data-text', text);
        element.innerHTML = '';
        const chars = text.split('').map(char => {
            const span = document.createElement('span');
            span.innerText = char === ' ' ? '\u00A0' : char;
            span.className = 'char';
            element.appendChild(span);
            return span;
        });
        chars.forEach((span, i) => setTimeout(() => span.classList.add('active'), i * speed));
    }

    window.addEventListener('resize', () => {
        initParticles();
        updateSlider();
    });

    setInterval(nextSlide, displayDuration);

    window.onload = () => {
        initParticles();
        animateParticles();
        revealText(document.querySelector('.main-title'), 40);
        updateSlider();
    };
    /* 1. INTRO TEXT ANIMATION (Word-by-Word Reveal) */
    const introContainer = document.querySelector('.intro-text');
    if (introContainer) {
        const introPara = introContainer.querySelector('p');
        const words = introPara.textContent.trim().split(/\s+/);
        introPara.textContent = "";

        words.forEach((word, index) => {
            const mask = document.createElement("span");
            mask.className = "word-mask";
            const node = document.createElement("span");
            node.className = "word-node";
            node.textContent = word + "\u00A0";
            node.style.transitionDelay = `${index * 0.03}s`;
            mask.appendChild(node);
            introPara.appendChild(mask);
        });

        const introObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                introContainer.classList.add('active');
                introObserver.unobserve(introContainer);
            }
        }, { threshold: 0.4 });
        introObserver.observe(introContainer);
    }

    /* 2. STATS COUNTER ANIMATION */
    const statsWrapper = document.querySelector('.stats-wrapper-intro');
    const statCards = document.querySelectorAll('.stat-card-intro');

    function animateStats() {
        if (!statsWrapper || statsWrapper.classList.contains('active')) return;

        const sectionTop = statsWrapper.getBoundingClientRect().top;
        const triggerBottom = window.innerHeight * 0.85;

        if (sectionTop < triggerBottom) {
            statsWrapper.classList.add('active');
            statCards.forEach((card) => {
                card.classList.add('reveal');
                const number = card.querySelector('h3');
                if (!number) return;

                const target = parseInt(number.innerText.replace(/\D/g, ''));
                const duration = 3000;
                const startTime = performance.now();

                function updateNumber(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const currentCount = Math.floor(easeOut * target);

                    number.textContent = currentCount.toLocaleString() + "+";
                    if (progress < 1) requestAnimationFrame(updateNumber);
                    else number.textContent = target.toLocaleString() + "+";
                }
                requestAnimationFrame(updateNumber);
            });
        }
    }
    window.addEventListener('scroll', animateStats);
    animateStats(); // Run once on load

    /* 3. PRODUCT CARDS & SECTION TITLE ANIMATION */
 /* 3. PRODUCT CARDS & SECTION TITLE ANIMATION - FIXED */
const productSectionTitle = document.querySelector(".services-overview .section-title");

if (productSectionTitle) {
    const textContent = productSectionTitle.innerText;
    productSectionTitle.innerText = ""; // Clear the title

    // Create spans for each character
    [...textContent].forEach((char, index) => {
        const span = document.createElement("span");
        span.innerHTML = char === " " ? "&nbsp;" : char;
        span.className = "char";
        // Staggered delay for each letter
        span.style.transitionDelay = `${index * 0.05}s`;
        productSectionTitle.appendChild(span);
    });

    const productObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Select only chars inside this specific title
                const chars = entry.target.querySelectorAll(".char");
                chars.forEach(c => c.classList.add("visible"));
                productObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    productObserver.observe(productSectionTitle);
}

// Keep your existing Product Cards Scroll Logic below
const productsSection = document.querySelector('.services-overview');
if (productsSection) {
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });
    scrollObserver.observe(productsSection);
}

    /* 4. WHY LOGIC MOTIVE ANIMATION */
    const whySection = document.querySelector('.why-logic-motive');
    const whyHeading = document.querySelector('.animate-text');
    const whyPara = document.querySelector('.animate-text-slow');
    const whyItems = document.querySelectorAll('.why-item');
    const whyBtn = document.querySelector('.why-btn');

    function prepareChars(element) {
        if (!element) return;
        const text = element.innerText;
        element.innerHTML = '';
        [...text].forEach((char) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.className = 'char';
            element.appendChild(span);
        });
    }

    prepareChars(whyHeading);
    prepareChars(whyPara);

    const whyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (whyHeading) {
                    whyHeading.querySelectorAll('.char').forEach((char, i) => {
                        setTimeout(() => char.classList.add('active'), i * 30);
                    });
                }

                setTimeout(() => {
                    if (whyPara) {
                        whyPara.querySelectorAll('.char').forEach((char, i) => {
                            setTimeout(() => char.classList.add('active'), i * 15);
                        });
                    }
                }, 600);

                const isMobile = window.innerWidth <= 992;
                whyItems.forEach((item, index) => {
                    const delay = isMobile ? index * 250 : index * 450;
                    setTimeout(() => {
                        item.classList.add('active');
                    }, delay + 1000);
                });

                setTimeout(() => {
                    if (whyBtn) whyBtn.classList.add('active');
                }, isMobile ? (whyItems.length * 250) + 1200 : (whyItems.length * 450) + 1500);

                whyObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    if (whySection) whyObserver.observe(whySection);
});
