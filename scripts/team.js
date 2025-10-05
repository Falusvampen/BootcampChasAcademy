const siri = document.querySelector(".profilecomp.siri");
const axel = document.querySelector(".profilecomp.axel");
const fabian = document.querySelector(".profilecomp.fabian");

window.addEventListener("scroll", mobileAnimation);

function mobileAnimation() {
  var siriPosition = siri.getBoundingClientRect();
  var axelPosition = axel.getBoundingClientRect();

  if (siriPosition.top < 30) {
    axel.classList.add("mobile");
  }
  if (axelPosition.top < 30) {
    fabian.classList.add("mobile");
		window.removeEventListener("scroll", mobileAnimation)
  }
}
