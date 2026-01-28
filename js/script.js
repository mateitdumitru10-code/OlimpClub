document.addEventListener("DOMContentLoaded", () => {
  // --- Header Shrink Logic ---
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("shrunk");
    } else {
      header.classList.remove("shrunk");
    }
  });

  // --- H1 Logo Click ---
  const logoTitle = document.querySelector("header h1");
  if (logoTitle) {
    logoTitle.style.cursor = "pointer";
    logoTitle.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

  // --- Mobile Menu Toggle ---
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("nav-menu-active");
    });
  }

  // --- Contact Form Handling ---
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

  // --- Slideshow Logic ---
  let currentSlide = 0;
  const slides = document.querySelectorAll(".recenzie");
  const nextBtn = document.getElementById("next-slide");
  const prevBtn = document.getElementById("prev-slide");

  if (slides.length > 0) {
    function showSlide(index) {
      slides.forEach((slide) => slide.classList.remove("active"));
      if (index >= slides.length) currentSlide = 0;
      if (index < 0) currentSlide = slides.length - 1;
      slides[currentSlide].classList.add("active");
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentSlide++;
        showSlide(currentSlide);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentSlide--;
        showSlide(currentSlide);
      });
    }

    // Auto-rotate slides
    setInterval(() => {
      currentSlide++;
      showSlide(currentSlide);
    }, 5000);
  }
});
