document.addEventListener("DOMContentLoaded", () => {
  const logoTitle = document.querySelector("header h1");
  if (logoTitle) {
    logoTitle.style.cursor = "pointer"; // Make it look like a link
    logoTitle.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = contactForm.querySelector('input[name="nume"]').value;
      const email = contactForm.querySelector('input[name="email"]').value;
      const message = contactForm.querySelector('textarea[name="mesaj"]').value;

      if (name && email && message) {
        alert("Mesajul a fost trimis cu succes!");
        contactForm.reset();
      } else {
        alert("Vă rugăm să completați toate câmpurile.");
      }
    });
  }

  // --- Mobile Menu Toggle ---
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("nav-menu-active");
  });

  // --- Slideshow Logic ---
  let currentSlide = 0;
  const slides = document.querySelectorAll(".recenzie");
  const nextBtn = document.getElementById("next-slide");
  const prevBtn = document.getElementById("prev-slide");

  function showSlide(index) {
    // Remove active class from all slides
    slides.forEach((slide) => slide.classList.remove("active"));

    // Handle wrap-around
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;

    // Add active class to current slide
    slides[currentSlide].classList.add("active");
  }

  nextBtn.addEventListener("click", () => {
    currentSlide++;
    showSlide(currentSlide);
  });

  prevBtn.addEventListener("click", () => {
    currentSlide--;
    showSlide(currentSlide);
  });

  // Optional: Auto-play every 5 seconds
  setInterval(() => {
    currentSlide++;
    showSlide(currentSlide);
  }, 5000);
});
