// Targets viewports at least 768px wide
const mediaQuery = window.matchMedia("(min-width: 768px)");

//scroll-smoothing

const body = document.body;
const main = document.getElementById("main");

let sx = 0;
let sy = 0;

let dx = 0;
let dy = 0;

body.style.height = main.clientHeight + "px";

function handleMediaQuery(event) {
  if (event.matches) {
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

      //navigation
      let scrollLine = document.getElementById("desktop-line-nav-fill");
      scrollLine.style.height =
        (dy / (main.clientHeight - window.innerHeight)) * 100 + "%";

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

//global function for intersection observer
function queryObserver(query, classToggle) {
  const observing = document.querySelectorAll(query);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle(classToggle, entry.isIntersecting);
      });
    },
    { threshold: 0 }
  );

  observing.forEach((observing) => {
    observer.observe(observing);
  });
}
queryObserver(".pic", "visible");
queryObserver(".hider", "reveal");
queryObserver(".work1", "work1bg");
queryObserver(".work-title", "visible");
queryObserver(".work-image", "visible");
queryObserver(".work2", "work2bg");
queryObserver(".comment-line", "comment-line-grow");
queryObserver(".comment-hider", "reveal");
queryObserver(".comment-text", "grow");
queryObserver(".comment-author", "grow");
queryObserver(".contact-line", "contact-line-grow");
queryObserver(".contact-title", "visible");
queryObserver(".contact", "visible");

//page 4 for repeating background

const bgCommentary = document.getElementById("bgCommentary");
const numberOfRepetition = 100;

for (let i = 0; i < numberOfRepetition; i++) {
  const bgText = document.createElement("div");
  const bgTextHider = document.createElement("div");
  bgText.innerHTML = "HAVE YOU HEARD?";
  bgText.setAttribute("class", "bgText");
  bgTextHider.setAttribute("class", "bgText-hider");
  bgCommentary.append(bgText);
  bgText.append(bgTextHider);
}

queryObserver(".bgText-hider", "reveal");

function clickToScroll(id) {
  const offsetTop = document.getElementById(id).offsetTop;
  window.scrollTo(0, offsetTop);
}

//mobile scroll hide-show

let lastScollTop = window.scrollY;

window.addEventListener("scroll", function handleScroll() {
  const scrollTopPosition = window.scrollY;

  if (scrollTopPosition > lastScollTop) {
    document
      .getElementById("mobile-nav-container")
      .classList.add("mobile-nav-hide");
  } else if (scrollTopPosition < lastScollTop) {
    document
      .getElementById("mobile-nav-container")
      .classList.remove("mobile-nav-hide");
  }
  lastScollTop = scrollTopPosition <= 0 ? 0 : scrollTopPosition;
});

function scrollToPage(idPage) {
  const offsetTop = document.getElementById(idPage).offsetTop;
  window.scrollTo(0, offsetTop);
}

//desktop nav
const navHomePage = document.getElementById("page1");
const navProjectsPage = document.getElementById("page3");
const navContactsPage = document.getElementById("page5");

const navHome = document.getElementById("desktop-home");
const navProjects = document.getElementById("desktop-projects");
const navContacts = document.getElementById("desktop-contacts");
