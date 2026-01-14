
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  // 1. Mobile Hamburger Toggle
  toggle.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevents document click from closing it immediately
    navLinks.classList.toggle("active");
  });

  // 2. Dropdown Click Logic (Works for Desktop & Mobile)
  document.querySelectorAll(".dropdown > a").forEach(link => {
    link.addEventListener("click", (e) => {
      // Always prevent default to stop page jumping
      e.preventDefault();
      e.stopPropagation(); 

      const parent = link.parentElement;
      const menu = parent.querySelector(".dropdown-menu");
      const isOpen = parent.classList.contains("active");
      // Close other open dropdowns
      document.querySelectorAll(".dropdown").forEach(d => {
       d.classList.remove("active");
       const m = d.querySelector(".dropdown-menu");
       if (m) m.style.display = "none";
      });
       if (!isOpen) {
        parent.classList.add("active");
        menu.style.display = "block";
       }
    
    });
  });

  // 3. Close menus if you click anywhere else on the page
  document.addEventListener("click", () => {
    // Close dropdowns
    document.querySelectorAll(".dropdown").forEach(d => {
      d.classList.remove("active");
    });
    // Close mobile menu
    navLinks.classList.remove("active");
  });
});
// Make sure Bootstrap JS is included


// Module Selection Logic

document.addEventListener("DOMContentLoaded", function () {
  const moduleSelect = document.getElementById("moduleSelect");

  // Module sections: each contains options + file upload
  const sections = {
    internship: document.getElementById("internshipOptions"),
    training: document.getElementById("trainingOptions"),
    job: document.getElementById("jobOptions")
  };

  moduleSelect.addEventListener("change", function () {
    const selected = this.value;

    // Hide all sections first
    Object.values(sections).forEach(sec => sec.classList.add("d-none"));

    // Show the selected module's section
    if (sections[selected]) sections[selected].classList.remove("d-none");

    console.log("Selected module:", selected);
  });
});


