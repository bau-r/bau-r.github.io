// ------------NAVBAR-------------

//!  active link 
let box = document.getElementById("links");
let links = box.getElementsByClassName("link");
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function () {
    let currents = document.getElementsByClassName("activeLink");
    let current = currents[0];
    current.className = current.className.replace(" activeLink", "");
    this.classList.add("activeLink");
    //this.className += " activeLink";
  });
}

//!    show/hide navbar
document.getElementById("barBox").addEventListener("click", showHideFunction);

function showHideFunction() {
  let linksBox = document.getElementById("links");
  let navBox = document.getElementById("navBox");
  let bar1 = document.getElementById("bar1");
  let bar2 = document.getElementById("bar2");
  if (linksBox.style.display == "none" || linksBox.style.display == "") {
    linksBox.style.display = "flex";
    bar2.style.display = "none";
    bar1.style.display = "block";
    navBox.style.background =
      " linear-gradient(    to right,    #E2F2F4,    #F3ECF6  )";
  } else {
    linksBox.style.display = "none";
    bar2.style.display = "block";
    bar1.style.display = "none";
    navBox.style.background = " none";
  }
}

//! icons change color on hover
for (let i = 1; i < 3; i++) {
  document.getElementById("bar" + i).addEventListener("mouseenter", () => {
    document.getElementById("bar" + i).style.color = "rgb(231, 0, 143, 0.815)";
  });
  document.getElementById("bar" + i).addEventListener("mouseout", () => {
    document.getElementById("bar" + i).style.color = "rgb(3, 111, 184)";
  });
}

//! click on specific arrow changes the color of the navbar link

let arrows = ["arrowSkillsUp", "arrowHomeDown",  "arrowSkillsDown", "arrowContactUp"];

for (let id of arrows) {
  document.getElementById(id).addEventListener("click", () => {
    let currents = document.getElementsByClassName("activeLink");
    let current = currents[0];
    current.className = current.className.replace(" activeLink", "");
    if (id === "arrowSkillsUp") {
      document.getElementById("link1").classList.add("activeLink");
    }
    if (id === "arrowHomeDown" || id === "arrowContactUp") {
      document.getElementById("link2").classList.add("activeLink");
    }
    if (id === "arrowSkillsDown") {
      document.getElementById("link4").classList.add("activeLink");
    }
    
  });
}
