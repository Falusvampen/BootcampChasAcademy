const axel = document.querySelector(".profilecomp.axel");
const fabian = document.querySelector(".profilecomp.fabian");
const contentWrapper = document.querySelector(".content-wrapper-team");
const contentWrapperStyle = window.getComputedStyle(contentWrapper);

// Event listener för scroll som sedan kör animationerna läggs bara till på mobilversionen av sidan
if (contentWrapperStyle.display == "block") {
  window.addEventListener("scroll", mobileAnimation);
}

function mobileAnimation() {
  // Lägger positionerna av profilkorten i variabler
  let axelPosition = axel.getBoundingClientRect();
  let fabianPosition = fabian.getBoundingClientRect();

  // Om profilkortet har en specifik position på sidan
  if (axelPosition.bottom < 1050) {
    // Lägger till en klass i elementet som visar profilkortet via en animation
    axel.classList.add("animate");
  }

  if (fabianPosition.bottom < 1050) {
    fabian.classList.add("animate");
    // Så att programmet inte försöker lägga till klasser som elementen redan har
    window.removeEventListener("scroll", mobileAnimation);
  }
}
