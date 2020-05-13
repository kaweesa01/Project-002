///////////////slider js
function Slider(slider) {
  if (!(slider instanceof Element)) {
    throw new Error("No slider passed in");
  }
  // create some variables for working iwth the slider
  let prev;
  let current;
  let next;
  // select the elements needed for the slider
  const slides = slider.querySelector(".slides");
  const prevButton = slider.querySelector(".goToPrev");
  const nextButton = slider.querySelector(".goToNext");

  function startSlider() {
    current = slider.querySelector(".current") || slides.firstElementChild;
    prev = current.previousElementSibling || slides.lastElementChild;
    next = current.nextElementSibling || slides.firstElementChild;
    console.log({ current, prev, next });
  }

  function applyClasses() {
    current.classList.add("current");
    prev.classList.add("prev");
    next.classList.add("next");
  }

  function move(direction) {
    // first strip all the classes off the current slides
    const classesToRemove = ["prev", "current", "next"];
    prev.classList.remove(...classesToRemove);
    current.classList.remove(...classesToRemove);
    next.classList.remove(...classesToRemove);
    if (direction === "back") {
      // make an new array of the new values, and destructure them over and into the prev, current and next variables
      [prev, current, next] = [
        // get the prev slide, if there is none, get the last slide from the entire slider for wrapping
        prev.previousElementSibling || slides.lastElementChild,
        prev,
        current,
      ];
    } else {
      [prev, current, next] = [
        current,
        next,
        // get the next slide, or if it's at the end, loop around and grab the first slide
        next.nextElementSibling || slides.firstElementChild,
      ];
    }

    applyClasses();
  }

  // when this slider is created, run the start slider function
  startSlider();
  applyClasses();

  // Event listeners
  prevButton.addEventListener("click", () => move("back"));
  nextButton.addEventListener("click", move);
  setInterval(move, 5000);
}

const mySlider = Slider(document.querySelector(".slider"));

///////////sliding menu

const menu = document.querySelector(".menu");
const navigatorRemover = document.querySelector(".navigators");
menu.addEventListener("click", function () {
  navigatorRemover.classList.toggle("nav-controller");
});

///////////////removing slider

const items = document.querySelectorAll(".items");
items.forEach(function (e) {
  e.addEventListener("click", function () {
    navigatorRemover.classList.toggle("nav-controller");
  });
});

////////////////smooth page slide with Jquery

$(document).ready(function () {
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();

    var target = this.hash,
      $target = $(target);

    $("html,body")
      .stop()
      .animate(
        {
          scrollTop: $target.offset().top,
        },
        600,
        "swing",
        function () {
          window.location.hash = target;
        }
      );
  });
});

/////////////image view back drop

/////removing back drop
const imgIcon = document.querySelector(".img-icon");
const imgBackDrop = document.querySelector(".image-view-backdrop");
const backDropCaption = document.querySelector(".image-view img");
const viewCaption = document.querySelector(".back-drop-caption h1");

imgIcon.addEventListener("click", function () {
  imgBackDrop.setAttribute("style", `--Y: ${-100}%`);
});

///////////selecting all images

const images = document.querySelectorAll(".gallary");

images.forEach(function (e) {
  e.addEventListener("click", function (ev) {
    const ImgDiv = ev.currentTarget.lastElementChild.src;
    backDropCaption.src = ImgDiv;

    const caption = ev.currentTarget.firstElementChild.textContent;

    viewCaption.textContent = caption

    imgBackDrop.setAttribute("style", `--Y: ${0}%`);
  });
});

