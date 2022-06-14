let i = 0;
let text = "Renáta Bauerová";
let speed = 120;
function typewriter() {
  if (i < text.length) {
    document.getElementById("typing").innerHTML += text.charAt(i);
    i++;
    setTimeout(typewriter, speed);
  }
}
typewriter();
