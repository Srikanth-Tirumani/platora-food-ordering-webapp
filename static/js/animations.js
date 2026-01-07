// ---------------- PAGE LOAD ANIMATIONS ----------------
document.addEventListener("DOMContentLoaded", () => {

  /* Navbar slide */
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.style.transform = "translateY(-100%)";
    navbar.style.transition = "0.6s ease";
    setTimeout(() => {
      navbar.style.transform = "translateY(0)";
    }, 200);
  }

  /* Banner animation */
  const bannerText = document.querySelector(".banner-section-bg-container .text-center");
  if (bannerText) {
    bannerText.style.opacity = "0";
    bannerText.style.transform = "scale(0.95)";
    setTimeout(() => {
      bannerText.style.transition = "0.8s ease";
      bannerText.style.opacity = "1";
      bannerText.style.transform = "scale(1)";
    }, 500);
  }

  /* Explore menu cards animation */
  const menuCards = document.querySelectorAll(".menu-item-card");
  menuCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    setTimeout(() => {
      card.style.transition = "all 0.6s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 120);
  });
});

// ---------------- SCROLL ANIMATIONS ----------------
window.addEventListener("scroll", () => {

  const revealElements = document.querySelectorAll(".wcu-card");

  revealElements.forEach(card => {
    const windowHeight = window.innerHeight;
    const elementTop = card.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      card.classList.add("reveal");
    }
  });
});
