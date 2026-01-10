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

      // Close other open dropdowns
      document.querySelectorAll(".dropdown").forEach(d => {
        if (d !== parent) d.classList.remove("active");
      });

      // Toggle the current one
      parent.classList.toggle("active");
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
var kickstartModal = new bootstrap.Modal(document.getElementById('kickstartModal'));

document.getElementById('kickstartBtn').addEventListener('click', function () {
  kickstartModal.show();
});
// Toggle contact section on click
