let icons = ["HTML", "CSS", "SCSS", "JavaScript", "Java", "GitHub", "Visual Studio Code", "IntelliJ IDEA"];
let length=icons.length;
function writer(input,lenght) {
    //get the element where all the content comes
    let box = document.getElementById("techBox");
    //box.innerHTML = "";
    for (let i = 0; i < lenght; i++) {
        // the content
        box.innerHTML += `    
        <div class="col-xxl-1 col-xl-1 col-lg-2 col-md-2 col-sm-3 col-3 iconBox "><img src="img/icons/${input[i]}.png" alt="${input[i]} icon"
        class="img-fluid " title="${input[i]}"></div> 
        `
    }
}
writer(icons,length);









