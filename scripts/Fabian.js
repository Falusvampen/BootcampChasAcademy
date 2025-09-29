var right = document.querySelector(".buttonright");
var left = document.querySelector(".buttonleft");
var commits = document.querySelector("#commits_fabian");
var bild = document.querySelector(".bild");

right.addEventListener("click", () => {
  if (commits.classList.contains("inactive") == false) {
    commits.classList.toggle("inactive");
    bild.classList.toggle("active");
    left.classList.toggle("active");
    right.classList.toggle("inactive");
  }
});

left.addEventListener("click", () => {
  if (commits.classList.contains("inactive") == true) {
    commits.classList.toggle("inactive");
    bild.classList.toggle("active");
    left.classList.toggle("active");
    right.classList.toggle("inactive");
  }
});