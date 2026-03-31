const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const options = {
  root: null,
  threshold: 0.6, // Trigger when 60% of the section is visible
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");

      navLinks.forEach((link) => {
        link.classList.remove("bg-blue-600", "text-white", "shadow-sm");
        link.classList.add("text-gray-500");
      });

      const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
      if (activeLink) {
        activeLink.classList.add("bg-blue-600", "text-white", "shadow-sm");
        activeLink.classList.remove("text-gray-500");
      }
    }
  });
}, options);

sections.forEach((section) => observer.observe(section));