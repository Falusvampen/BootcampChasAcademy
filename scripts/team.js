const axel = document.querySelector(".profilecomp.axel");
const fabian = document.querySelector(".profilecomp.fabian");
const contentWrapper = document.querySelector(".content-wrapper-team");
const contentwrapperStyle = window.getComputedStyle(contentWrapper);

if (
  contentwrapperStyle.display == "block" &&
  !fabian.classList.contains("animate")
) {
  window.addEventListener("scroll", mobileAnimation);
}

function mobileAnimation() {
  let axelPosition = axel.getBoundingClientRect();
  let fabianPosition = fabian.getBoundingClientRect();

  if (axelPosition.bottom < 1050) {
    axel.classList.add("animate");
  }

  if (fabianPosition.bottom < 1050) {
    fabian.classList.add("animate");
    window.removeEventListener("scroll", mobileAnimation);
  }
}
