document.addEventListener("DOMContentLoaded", () => {
  // --- FUNCȚIE PENTRU NOTIFICĂRI PERSONALIZATE (TEMA OLIMPCLUB) ---
  function showNotification(message, type = "success") {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${message}</span>`;

    container.appendChild(toast);

    // Elimină notificarea după 4 secunde
    setTimeout(() => {
      toast.style.animation = "fadeOut 0.5s forwards";
      setTimeout(() => toast.remove(), 500);
    }, 4000);
  }

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

  // --- Contact Form Handling (CU NOTIFICĂRI CUSTOM) ---
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const submitButton = contactForm.querySelector('button[type="submit"]');
      const formData = new FormData(contactForm);

      submitButton.disabled = true;
      submitButton.textContent = "Se trimite...";

      try {
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          showNotification(
            "Mesajul a fost trimis! Te contactăm curând.",
            "success",
          );
          contactForm.reset();
        } else {
          const data = await response.json();
          showNotification(
            data.errors
              ? data.errors.map((e) => e.message).join(", ")
              : "Eroare la trimitere.",
            "error",
          );
        }
      } catch (error) {
        showNotification("Eroare de conexiune. Verifică internetul.", "error");
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Trimite";
      }
    });
  }

  // --- Slideshow Logic ---
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

      if (index >= slides.length) currentSlideIndex = 0;
      else if (index < 0) currentSlideIndex = slides.length - 1;
      else currentSlideIndex = index;

      slides.forEach((slide) => (slide.style.display = "none"));
      slides[currentSlideIndex].style.display = "flex";
      slides[currentSlideIndex].style.animation = "fadeEffect 0.5s ease-in-out";

      if (
        containerId === ".slideshow-container-profesori" &&
        window.innerWidth >= 769
      ) {
        slides.forEach((slide) => (slide.style.display = "none"));

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

    showSlide(currentSlideIndex);
  }

  setupSlideshow("#recenzii", ".recenzie", "next-slide", "prev-slide");
  setupSlideshow(
    "#profesori-preview",
    ".profesor-slide",
    "next-prof-slide",
    "prev-prof-slide",
  );

  // --- Accordion Logic ---
  const cursuriList = document.querySelectorAll(".curs-tip");
  if (cursuriList.length > 0) {
    cursuriList.forEach((curs) => {
      curs.addEventListener("click", () => {
        cursuriList.forEach((c) => {
          if (c !== curs) c.classList.remove("active");
        });
        curs.classList.toggle("active");
      });
    });
  }

  // --- Redirecționări ---
  const ctaCursuri = document.getElementById("cta-cursuri");
  if (ctaCursuri) {
    ctaCursuri.addEventListener("click", () => {
      window.location.href = "cursuri.html";
    });
  }

  const ctaProfesoriLink = document.querySelector(
    "#profesori-preview .cta-link",
  );
  if (ctaProfesoriLink) {
    ctaProfesoriLink.addEventListener("click", (event) => {
      event.stopPropagation();
      window.location.href = "profesori.html";
    });
  }

  const ctaProfesori = document.getElementById("profesori-preview");
  if (ctaProfesori) {
    ctaProfesori.addEventListener("click", () => {
      window.location.href = "profesori.html";
    });
  }

  // --- LOGICĂ BACK TO TOP ---
  const backToTopBtn = document.getElementById("back-to-top");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      // Afișează butonul după ce am derulat 300px
      if (window.scrollY > 300) {
        backToTopBtn.style.display = "block";
      } else {
        backToTopBtn.style.display = "none";
      }
    });

    backToTopBtn.addEventListener("click", () => {
      // Scroll lin până la începutul paginii
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
