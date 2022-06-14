// ANIMATION

//adding class name
function addClass(idName, className) {
  document.getElementById(idName).classList.add(className);
}
//removing class name
function removeClass(idName, className) {
  document.getElementById(idName).classList.remove(className);
}
// animate section on click
function getAnimated(idClick, idAnimation) {
  document.getElementById(idClick).addEventListener("click", () => {
    addClass(idAnimation, animation);
    setTimeout(() => { removeClass(idAnimation, animation); }, 2000);
  });
}

let animation = "animate__pulse";

getAnimated("link1", "home");
getAnimated("link2", "about");
//getAnimated("link3", "projects");
getAnimated("link4", "contact");
getAnimated("arrowHomeDown", "about");
getAnimated("arrowSkillsDown", "contact");
getAnimated("arrowSkillsUp", "home");
//getAnimated("arrowProjectsUp", "about");
//getAnimated("arrowProjectsDown", "contact");
getAnimated("arrowContactUp", "about");