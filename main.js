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
}
handleMediaQuery(mediaQuery);
mediaQuery.addEventListener("change", handleMediaQuery);

//intersection observer animation function

function observer(id, classList) {
  const element = document.getElementById(id);

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(classList);
      } else {
        entry.target.classList.remove(classList);
      }
    });
  }, options);

  elementObserver.observe(element);
}

//intersection observer animation

observer("aboutMe", "visible");
observer("aboutMeGreetings", "visible");
observer("aboutMeIntroduce", "visible");
observer("pic", "visiblePic");

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
