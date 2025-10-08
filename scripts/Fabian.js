var right = document.querySelector(".buttonright");
var left = document.querySelector(".buttonleft");
var commits = document.querySelector("#commits_fabian");
var img1 = document.querySelector(".img1");
var img2 = document.querySelector(".img2");
var img3 = document.querySelector(".img3");

right.addEventListener("click", () => {
  if (!commits.classList.contains("inactive")) {
    setTimeout(() => {
      commits.classList.add("inactive");
      img1.classList.add("active");
      left.classList.add("active");
    }, 100);
  } else if (img1.classList.contains("active")) {
    setTimeout(() => {
      img1.classList.remove("active");
      img2.classList.add("active");
    }, 100);
  } else if (img2.classList.contains("active")) {
    setTimeout(() => {
      img2.classList.remove("active");
      img3.classList.add("active");
      right.classList.add("inactive");
    }, 100);
  }
});

left.addEventListener("click", () => {
  if (img3.classList.contains("active")) {
    setTimeout(() => {
      img2.classList.add("active");
      img3.classList.remove("active");
      right.classList.remove("inactive");
    }, 100);
  } else if (img2.classList.contains("active")) {
    setTimeout(() => {
      img1.classList.add("active");
      img2.classList.remove("active");
    }, 100);
  } else if (img1.classList.contains("active")) {
    setTimeout(() => {
      commits.classList.remove("inactive");
      img1.classList.remove("active");
      left.classList.remove("active");
    }, 100);
  }
});
