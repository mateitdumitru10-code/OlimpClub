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

  // --- Slideshow Logic (Generalizat pentru Recenzii și Profesori) ---
  function setupSlideshow(
    containerId,
    slideSelector,
    nextBtnId,
    prevBtnId,
    autoRotate = true,
    interval = 5000,
  ) {
    const slideshowContainer = document.querySelector(containerId);
    if (!slideshowContainer) return;

    const slides = slideshowContainer.querySelectorAll(slideSelector);
    const nextBtn = document.getElementById(nextBtnId);
    const prevBtn = document.getElementById(prevBtnId);
    let currentSlideIndex = 0;

    function showSlide(index) {
      if (slides.length === 0) return;

      // Adjust index for continuous looping
      if (index >= slides.length) currentSlideIndex = 0;
      else if (index < 0) currentSlideIndex = slides.length - 1;
      else currentSlideIndex = index;

      slides.forEach((slide) => (slide.style.display = "none")); // Hide all
      slides[currentSlideIndex].style.display = "flex"; // Show current
      slides[currentSlideIndex].style.animation = "fadeEffect 0.5s ease-in-out"; // Reaplică animația

      // Pentru slideshow-ul de profesori pe desktop, afișăm 3 odată
      if (
        containerId === ".slideshow-container-profesori" &&
        window.innerWidth >= 769
      ) {
        slides.forEach((slide) => (slide.style.display = "none")); // Ascunde toate inițial

        for (let i = 0; i < 3; i++) {
          let actualIndex = (currentSlideIndex + i) % slides.length;
          slides[actualIndex].style.display = "flex";
          slides[actualIndex].style.animation = "fadeEffect 0.5s ease-in-out";
        }
      }
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        showSlide(currentSlideIndex + 1);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        showSlide(currentSlideIndex - 1);
      });
    }

    if (autoRotate) {
      setInterval(() => {
        showSlide(currentSlideIndex + 1);
      }, interval);
    }

    // Initial display
    showSlide(currentSlideIndex);
  }

  // Configurează slideshow-ul pentru recenzii
  setupSlideshow("#recenzii", ".recenzie", "next-slide", "prev-slide");

  // Configurează slideshow-ul pentru profesori
  setupSlideshow(
    "#profesori-preview",
    ".profesor-slide",
    "next-prof-slide",
    "prev-prof-slide",
  );

  // Înlocuiește linia cu if (document.body.classList.contains("cursuri-page")) cu:
  const cursuriList = document.querySelectorAll(".curs-tip");

  if (cursuriList.length > 0) {
    cursuriList.forEach((curs) => {
      curs.addEventListener("click", () => {
        // Logica ta existentă pentru acordeon
        cursuriList.forEach((c) => {
          if (c !== curs) c.classList.remove("active");
        });
        curs.classList.toggle("active");
      });
    });
  }

  // --- Redirecționare Secțiune Cursuri ---
  const ctaCursuri = document.getElementById("cta-cursuri");
  if (ctaCursuri) {
    ctaCursuri.addEventListener("click", () => {
      window.location.href = "cursuri.html";
    });
  }

  // --- Redirecționare Secțiune Profesori (text link sub slideshow) ---
  const ctaProfesoriLink = document.querySelector(
    "#profesori-preview .cta-link",
  );
  if (ctaProfesoriLink) {
    ctaProfesoriLink.addEventListener("click", (event) => {
      event.stopPropagation(); // Previne declanșarea click-ului pe întreaga secțiune dacă ar fi fost 'clickable-section'
      window.location.href = "profesori.html";
    });
  }

  // --- Dropdown Cursuri (Accordion) (doar pe pagina cursuri.html) ---
  if (document.body.classList.contains("cursuri-page")) {
    // Adaugă o clasă body pe pagina de cursuri
    const cursuri = document.querySelectorAll(".curs-tip");
    cursuri.forEach((curs) => {
      curs.addEventListener("click", () => {
        cursuri.forEach((c) => {
          if (c !== curs) c.classList.remove("active");
        });
        curs.classList.toggle("active");
      });
    });
  }

  // --- Redirecționare Secțiune Profesori ---
  const ctaProfesori = document.getElementById("profesori-preview");
  if (ctaProfesori) {
    ctaProfesori.addEventListener("click", () => {
      window.location.href = "profesori.html";
    });
  }
});
