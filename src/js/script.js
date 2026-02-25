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
  const logoTitle = document.querySelector("header .site-logo");
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
      if (navMenu.classList.contains("nav-menu-active")) {
        navToggle.textContent = "✕";
      } else {
        navToggle.textContent = "☰";
      }
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
        const response = await fetch("https://formspree.io/f/xbdawjzr", {
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

      slides.forEach((slide) => {
        slide.style.display = "none";
        slide.style.order = "";
      });

      if (
        (containerId === ".slideshow-container-profesori" ||
          containerId === "#profesori-preview") &&
        window.innerWidth >= 769
      ) {
        for (let i = 0; i < 3; i++) {
          let actualIndex = (currentSlideIndex + i) % slides.length;
          slides[actualIndex].style.display = "flex";
          slides[actualIndex].style.order = i;
          slides[actualIndex].style.animation = "fadeEffect 0.5s ease-in-out";
        }
      } else {
        slides[currentSlideIndex].style.display = "flex";
        slides[currentSlideIndex].style.animation =
          "fadeEffect 0.5s ease-in-out";
      }
    }

    const getStep = () => {
      if (
        (containerId === ".slideshow-container-profesori" ||
          containerId === "#profesori-preview") &&
        window.innerWidth >= 769
      ) {
        return 3;
      }
      return 1;
    };

    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        let step = getStep();
        let nextIndex = currentSlideIndex + step;
        if (nextIndex >= slides.length) nextIndex = 0;
        showSlide(nextIndex);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        let step = getStep();
        let prevIndex = currentSlideIndex - step;
        if (prevIndex < 0)
          prevIndex = slides.length + (prevIndex % slides.length);
        if (prevIndex >= slides.length) prevIndex = 0;
        showSlide(prevIndex);
      });
    }

    if (autoRotate) {
      setInterval(() => {
        let step = getStep();
        let nextIndex = currentSlideIndex + step;
        if (nextIndex >= slides.length) nextIndex = 0;
        showSlide(nextIndex);
      }, interval);
    }

    // Recalculate slide visibility on window resize (e.g. switching between mobile/desktop view)
    window.addEventListener("resize", () => {
      showSlide(currentSlideIndex);
    });

    showSlide(currentSlideIndex);
  }

  setupSlideshow("#recenzii", ".recenzie", "next-slide", "prev-slide");
  setupSlideshow(
    "#profesori-preview",
    ".profesor-slide",
    "next-prof-slide",
    "prev-prof-slide",
  );

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

  const ctaProfesoriCursuri = document.getElementById("cta-profesori");
  if (ctaProfesoriCursuri) {
    ctaProfesoriCursuri.addEventListener("click", () => {
      window.location.href = "profesori.html";
    });
  }

  // --- LOGICĂ BACK TO TOP ---
  const backToTopBtn = document.getElementById("back-to-top");

  if (backToTopBtn) {
    const toggleBackToTop = () => {
      // Afișează butonul după ce am derulat 300px
      if (window.scrollY > 300) {
        backToTopBtn.style.display = "block";
      } else {
        backToTopBtn.style.display = "none";
      }
    };

    window.addEventListener("scroll", toggleBackToTop);
    toggleBackToTop();

    backToTopBtn.addEventListener("click", () => {
      // Scroll lin până la începutul paginii
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  const modal = document.getElementById("booking-modal");
  const closeBtn = document.querySelector(".close-modal");
  const targetProfSpan = document.getElementById("target-prof");
  const bookingForm = document.getElementById("booking-form");

  // Deschide modalul
  document.querySelectorAll(".open-modal").forEach((button) => {
    button.addEventListener("click", () => {
      const profName = button.getAttribute("data-prof");
      targetProfSpan.textContent = profName;

      const courseTypeSelect = document.getElementById("course_type");
      const groupOption = courseTypeSelect.querySelector(
        'option[value="Grup"]',
      );
      const individualOption = courseTypeSelect.querySelector(
        'option[value="Individual"]',
      );

      groupOption.disabled = false;
      individualOption.disabled = false;

      if (profName === "Matei Dumitru") {
        individualOption.disabled = true;
        courseTypeSelect.value = "Grup";
      } else {
        courseTypeSelect.value = "Individual";
      }

      modal.style.display = "block";
    });
  });

  // Închide modalul la click pe X
  closeBtn.onclick = () => {
    modal.style.display = "none";
  };

  // Închide modalul la click în afara ferestrei albe
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Trimiterea formularului către Formspree + WhatsApp
  bookingForm.onsubmit = function (e) {
    e.preventDefault();

    const nume = document.getElementById("student_name").value;
    const scop = document.getElementById("student_scope").value;
    const tip = document.getElementById("course_type").value;
    const prof = targetProfSpan.textContent;

    const phoneNumbers = {
      "Alessia Cruceru": "40734890699",
      "Teodor Alin": "40763927165",
      "Verdeș Iulia": "40744203645",
      "Ionescu Sorana": "40758845592",
      "Bianca Mihai": "40771059496",
      "Matei Dumitru": "40743175943",
    };

    // Pregătim datele pentru Formspree
    const formData = new FormData(this);
    formData.append("Profesor", prof); // Adăugăm manual și numele profesorului

    // Deschidem fereastra imediat pentru a evita popup blocker-ul
    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write("Se procesează cererea...");
    }

    // 1. Trimitem datele către Formspree
    fetch("https://formspree.io/f/mnjbwqgq", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // 2. Dacă trimiterea a reușit, deschidem WhatsApp
          const mesaj = `Bună ziua! Sunt ${nume}. Doresc să rezerv o ședință (${tip}) cu profesorul ${prof}. Scop: ${scop}`;
          const phoneNumber = phoneNumbers[prof] || "40771059496";
          const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mesaj)}`;

          if (newWindow) {
            newWindow.location.href = url;
          }

          // Resetăm și închidem
          modal.style.display = "none";
          bookingForm.reset();
        } else {
          if (newWindow) newWindow.close();
          alert(
            "A apărut o eroare la trimiterea datelor. Vă rugăm să încercați din nou.",
          );
        }
      })
      .catch((error) => {
        if (newWindow) newWindow.close();
        alert("Eroare de rețea. Verificați conexiunea și încercați din nou.");
      });
  };
});
