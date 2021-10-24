const btnChangeBg = document.getElementById("changeBg");
const divMainBox = document.getElementById("mainBox");

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
  divMainBox.style.backgroundImage = `url(${backgrounds[counter]})`
});
