 
        document.addEventListener('DOMContentLoaded', function () {
            // 1. Staggered Entrance
            const reveals = document.querySelectorAll('.reveal');
            reveals.forEach((el, i) => {
                setTimeout(() => el.classList.add('active'), i * 200);
            });

            // 2. Dynamic Dropdown
            // 2. Dynamic Dropdown Logic
            const moduleSelect = document.getElementById('moduleSelect');

            // Create a map of values to their corresponding element IDs
            const moduleOptions = {
                'internship': document.getElementById('internshipOptions'),
                'training': document.getElementById('trainingOptions'),
                'job': document.getElementById('jobOptions')
            };

            moduleSelect.addEventListener('change', function () {
                // First, hide all extra option fields
                Object.values(moduleOptions).forEach(opt => {
                    if (opt) opt.classList.add('d-none');
                });

                // Then, show only the one that matches the selected value
                const selectedOpt = moduleOptions[this.value];
                if (selectedOpt) {
                    selectedOpt.classList.remove('d-none');
                    selectedOpt.classList.add('module-reveal');
                }
            });

            // 3. Form Feedback
            document.getElementById('careerForm').addEventListener('submit', function (e) {
                e.preventDefault();
                const btn = this.querySelector('.career-btn');
                btn.innerText = "Application Sent! ✓";
                btn.style.background = "#059669";
            });
        });
    