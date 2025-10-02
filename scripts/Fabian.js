var right = document.querySelector(".buttonright");
var left = document.querySelector(".buttonleft");
var commits = document.querySelector("#commits_fabian");
var bild1 = document.querySelector(".bild1");
var bild2 = document.querySelector(".bild2");

right.addEventListener("click", () => {
  if (!commits.classList.contains("inactive")) {
    commits.classList.add("inactive");
    bild1.classList.add("active");
    left.classList.add("active");
  } else if (bild1.classList.contains("active")) {
    bild1.classList.remove("active");
    bild2.classList.add("active");
    right.classList.add("inactive");
  }
});

left.addEventListener("click", () => {
  if (bild2.classList.contains("active")) {
    bild1.classList.add("active");
    bild2.classList.remove("active");
    right.classList.remove("inactive");
  } else if (bild1.classList.contains("active")) {
    commits.classList.remove("inactive");
    bild1.classList.remove("active");
    left.classList.remove("active");
  }
});
