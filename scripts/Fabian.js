var right = document.querySelector(".buttonright");
var left = document.querySelector(".buttonleft");
var bild = document.querySelector(".bild");
var bild2 = document.querySelector(".bild2");

right.addEventListener("click", buttonright);

function buttonright() {
  if (bild.classList.contains("inactive") == false) {
    bild.classList.toggle("inactive");
    bild2.classList.toggle("active");
    left.classList.toggle("active");
    right.classList.toggle("inactive");
  }
}

left.addEventListener("click", buttonleft);

function buttonleft() {
  if (bild.classList.contains("inactive") == true) {
    bild.classList.toggle("inactive");
    bild2.classList.toggle("active");
    left.classList.toggle("active");
    right.classList.toggle("inactive");
  }
}