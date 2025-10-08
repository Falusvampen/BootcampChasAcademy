var right = document.querySelector(".buttonright");
var left = document.querySelector(".buttonleft");
var commits = document.querySelector("#commits_fabian");
var bild1 = document.querySelector(".bild1");
var bild2 = document.querySelector(".bild2");
var bild3 = document.querySelector(".bild3");

right.addEventListener("click", () => {
  if (!commits.classList.contains("inactive")) {
    setTimeout(() => {
      commits.classList.add("inactive");
      bild1.classList.add("active");
      left.classList.add("active");
    }, 100);
  } else if (bild1.classList.contains("active")) {
    setTimeout(() => {
      bild1.classList.remove("active");
      bild2.classList.add("active");
    }, 100);
  } else if (bild2.classList.contains("active")) {
    setTimeout(() => {
      bild2.classList.remove("active");
      bild3.classList.add("active");
      right.classList.add("inactive");
    }, 100);
  }
});

left.addEventListener("click", () => {
  if (bild3.classList.contains("active")) {
    setTimeout(() => {
      bild2.classList.add("active");
      bild3.classList.remove("active");
      right.classList.remove("inactive");
    }, 100);
  } else if (bild2.classList.contains("active")) {
    setTimeout(() => {
      bild1.classList.add("active");
      bild2.classList.remove("active");
    }, 100);
  } else if (bild1.classList.contains("active")) {
    setTimeout(() => {
      commits.classList.remove("inactive");
      bild1.classList.remove("active");
      left.classList.remove("active");
    }, 100);
  }
});
