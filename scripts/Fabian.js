var right = document.querySelector(".buttonright");
var left = document.querySelector(".buttonleft");
var commits = document.querySelector("#commits_fabian");
var bild2 = document.querySelector(".bild2");

right.addEventListener("click", buttonright);

function buttonright() {
  if (commits.classList.contains("inactive") == false) {
    commits.classList.toggle("inactive");
    bild2.classList.toggle("active");
    left.classList.toggle("active");
    right.classList.toggle("inactive");
  }
}

left.addEventListener("click", buttonleft);

function buttonleft() {
  if (commits.classList.contains("inactive") == true) {
    commits.classList.toggle("inactive");
    bild2.classList.toggle("active");
    left.classList.toggle("active");
    right.classList.toggle("inactive");
  }
}