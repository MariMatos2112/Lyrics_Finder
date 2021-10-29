const btnChangeBg = document.getElementById("changeBg");
const btnSubmit = document.querySelector("input[type=submit]");
const btnPreviousPic = document.getElementById("leftArrow");
const btnNextPic = document.getElementById("rightArrow");
const divMainBox = document.getElementById("mainBox");
const divModalBox = document.getElementById("modal");
const arrayClassAppear01 = document.querySelectorAll(".appear01");
const arrayClassAppear02 = document.querySelectorAll(".appear02");
const imgSlider = document.querySelector(".sliderImg");

const backgrounds = [
  "/static/images/undraw_mello.svg",
  "/static/images/undraw_Contemplating.svg",
  "/static/images/undraw_happy_music.svg",
  "/static/images/undraw_Music.svg",
];
const sliderImages = [
  {
    imgSource: "/static/images/undraw_file_analysis.svg",
    alt: "File analysis icon",
  },
  {
    imgSource: "/static/images/undraw_website_setup.svg",
    alt: "Website setup icon",
  },
  {
    imgSource: "/static/images/undraw_futuristic_interface.svg",
    alt: "Futuristic interface icon",
  },
  {
    imgSource: "/static/images/undraw_file_searching.svg",
    alt: "File searching icon",
  },
  {
    imgSource: "/static/images/undraw_web_development.svg",
    alt: "Web development icon",
  },
  {
    imgSource: "/static/images/undraw_functions.svg",
    alt: "Functions icon",
  },
];
let counter = 0;
let slideCounter = 0;

if (btnChangeBg) {
  btnChangeBg.addEventListener("click", () => {
    if (counter < backgrounds.length - 1) counter++;
    else counter = 0;
    divMainBox.style.backgroundImage = `url(${backgrounds[counter]})`;
  });
}

if (btnSubmit) {
  btnSubmit.addEventListener("click", () => {
    divModalBox.style.display = "flex";

    setTimeout(() => {
      arrayClassAppear01.forEach((element) => {
        element.style.display = "none";
      });
      arrayClassAppear02.forEach((element) => {
        element.style.display = "flex";
      });
    }, 4000);
  });
}

const nextSlide = () => {
  if (slideCounter < sliderImages.length - 1) slideCounter++;
  else slideCounter = 0;
  imgSlider.src = sliderImages[slideCounter].imgSource;
};

const intervalID = setInterval(() => {
  nextSlide();
}, 5000);

if (btnPreviousPic) {
  btnPreviousPic.addEventListener("click", () => {
    if (slideCounter > 0) slideCounter--;
    else slideCounter = sliderImages.length - 1;
    imgSlider.src = sliderImages[slideCounter].imgSource;
    clearInterval(intervalID);
  });
}

if (btnNextPic) {
  btnNextPic.addEventListener("click", () => {
    nextSlide();
    clearInterval(intervalID);
  });
}
