//scroll-smoothing

const body = document.body;
const main = document.getElementById("main");

let sx = 0;
let sy = 0;

let dx = 0;
let dy = 0;

body.style.height = main.clientHeight + "px";
document.getElementById("bg").style.height = main.clientHeight + "px";

window.addEventListener("scroll", scroll);

function scroll() {
  sx = scrollX;
  sy = scrollY;
}

requestAnimationFrame(render);
function render() {
  dx = lerp(dx, sx, 0.07);
  dy = lerp(dy, sy, 0.07);

  dx = Math.floor(dx * 100) / 100;
  dy = Math.floor(dy * 100) / 100;

  main.style.transform = `translate(-${dx}px, -${dy}px)`;

  requestAnimationFrame(render);
}

function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}

//intersection observer animation

const aboutMe = document.getElementById("about-me");
const bg = document.getElementById("bg");
const aboutMeGreetings = document.getElementById("about-me-greetings");
const aboutMeIntroduce = document.getElementById("about-me-introduce");

let options = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
};

function callbackFunction(entries) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    aboutMe.classList.add("visible");
    // bg.classList.add("bgtoLeft");
    // bg.style.transform = `translateX(-70%)`;
  } else {
    aboutMe.classList.remove("visible");
    // bg.style.transform = `translateX(25%)`;
  }
}

const observer = new IntersectionObserver(callbackFunction, options);

observer.observe(aboutMe);
