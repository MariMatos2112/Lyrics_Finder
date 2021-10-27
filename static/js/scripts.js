const btnChangeBg = document.getElementById("changeBg");
const divMainBox = document.getElementById("mainBox");
const btnSubmit = document.querySelector("input[type=submit]");
const divModalBox = document.getElementById("modal");
const arrayClassAppear01 = document.querySelectorAll(".appear01");
const arrayClassAppear02 = document.querySelectorAll(".appear02");

const backgrounds = [
  "/static/images/undraw_mello.svg",
  "/static/images/undraw_Contemplating.svg",
  "/static/images/undraw_happy_music.svg",
  "/static/images/undraw_Music.svg",
];
let counter = 0;

btnChangeBg.addEventListener("click", () => {
  if (counter < backgrounds.length - 1) counter++;
  else counter = 0;
  divMainBox.style.backgroundImage = `url(${backgrounds[counter]})`;
});

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
