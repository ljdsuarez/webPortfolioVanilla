// Targets viewports at least 768px wide
const mediaQuery = window.matchMedia("(min-width: 768px)");

function handleMediaQuery(event) {
  if (event.matches) {
    //scroll-smoothing

    const body = document.body;
    const main = document.getElementById("main");

    let sx = 0;
    let sy = 0;

    let dx = 0;
    let dy = 0;

    body.style.height = main.clientHeight + "px";

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
  } else {
    requestAnimationFrame(render);
    function render() {
      document.getElementById("main").style.transform = null;

      requestAnimationFrame(render);
    }
  }

  //intersection observer for min-width 768px

  queryObserver(".hide-left", "reveal");
  queryObserver(".hide-right", "reveal");
}
handleMediaQuery(mediaQuery);
mediaQuery.addEventListener("change", handleMediaQuery);

//global function for intersection observer
function queryObserver(query, classToggle) {
  const observing = document.querySelectorAll(query);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle(classToggle, entry.isIntersecting);
      });
    },
    { threshold: 0.5 }
  );

  observing.forEach((observing) => {
    observer.observe(observing);
  });
}

queryObserver(".aboutMe", "visible");
queryObserver(".aboutMeGreetings", "visible");
queryObserver(".aboutMeIntroduce", "visible");
queryObserver(".pic", "visible");
queryObserver(".left-work-container", "visible");
queryObserver(".right-work-container", "visible");

//observer for BG animation only
const bg = document.getElementById("bg");
const bgAboutMe = document.getElementById("aboutMeGreetings");
let options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

const bgObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      bg.style.transform = `translateX(-70%)`;
    } else {
      bg.style.transform = `translateX(25%)`;
    }
  });
}, options);

bgObserver.observe(bgAboutMe);

//pic hover animation

function picMouseOver() {
  const bg = document.getElementById("bg");
  bg.style.transform = `translateX(-20%)`;
}

function picMouseOut() {
  const bg = document.getElementById("bg");
  bg.style.transform = `translateX(-70%)`;
}
