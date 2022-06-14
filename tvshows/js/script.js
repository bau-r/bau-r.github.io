//  request
let myRequest = new XMLHttpRequest();

// get request
myRequest.open("GET", "https://api.tvmaze.com/shows");

myRequest.onload = function () {

  //parse api's
  let data = JSON.parse(myRequest.responseText);
  console.log(data[0]);
  //running functions
  pageWriter(data, 0, 20);
  paginating(data);
  hidePagination();

  //sorting shows on click
  document.getElementById("lowest").addEventListener("click", () => {
    sortingWorst(data);
    hidePagination();
  })
  document.getElementById("highest").addEventListener("click", () => {
    sortingBest(data);
    hidePagination();
  })
  document.getElementById("az").addEventListener("click", () => {
    sortingAz(data);
    hidePagination();
  })
  document.getElementById("za").addEventListener("click", () => {
    sortingZa(data);
    hidePagination();
  })

  //end of load
}

myRequest.send();

// writes 1 page 
//inputs: 1.data, 2.starting index , 3.ending index
function pageWriter(input, start, end) {
  //get the element where all the content comes
  let box = document.getElementById("box");
  box.innerHTML = "";

  for (let i = start; i < end; i++) {
    // the content = cards
    box.innerHTML += `    
        <div id="show${input[i].id}" class="shows  col-xxl-2 col-xl-3  col-lg-3 col-md-5 col-9  pb-2  m-3" >         
          
          <div class="cardImageBox"> 
            <img  class="img-fluid cardImage  " src="${input[i].image.original}" alt="${input[i].name}+ poster" />
          </div>

          <div class="cardText p-1">
              <!--  title   -->
              <h5 class="title"> <b> ${input[i].name} </b> </h5>
              <!--  rating   -->
              <p><i class="fa fa-star"></i>${input[i].rating.average ? input[i].rating.average : 'not available'}</p>          
          </div>   
          
            <!--  btn(link) to details   -->
            <div class="w-50 m-auto ">
                <a id="more${input[i].id}" href="#showBox" class="btn btn-secondary bg-gradient more">More</a>     
            </div>

        </div>   
        `
  }
  //display TV show details and hide everything else
  for (let i = start; i < end; i++) {
    document.getElementById("more" + input[i].id).addEventListener("click", () => {
      box.style.display = "none";
      document.getElementById("hero").style.display = "none";
      document.getElementById("showBox").style.display = "flex";
      showWriter(input[i]);
      document.getElementById("back").addEventListener("click", () => {
        document.getElementById("box").style.display = "flex";
        document.getElementById("showBox").style.display = "none";
        document.getElementById("hero").style.display = "block";
      });

    });
  }

}


//writes single show
function showWriter(show) {

  let showBox = document.getElementById("showBox");
  showBox.innerHTML = "";

  showBox.innerHTML += ` 
    <div id="show" class=" row justify-content-between  p-3  " > 

      <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12  text-center d-flex align-items-center"> 
    
        <img  class=" img-fluid" src="${show.image.original}" alt="${show.name}+ poster" />         

      </div>

      <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 d-flex align-items-center  ">
        <div class=" showInfo p-1 m-1"> 
      
          <h2 class="name text-lg-start text-center"> <b> ${show.name} </b> </h2>

          <div class="d-md-flex  d-block justify-content-between align-items-baseline details">
            <div class="me-sm-1 me-0 "> 
                <p class=""><b>Genre:</b> ${show.genres[0] ? show.genres : 'not available'}</p>  
                <p class=""><b>Rating:</b> ${show.rating.average ? show.rating.average : 'not available'}</p>    
                <p class=""> <b>Language:</b> ${show.language ? show.language : 'not available'}</p>   
                <p class=""> <b>Country:</b> ${show.network.country.name ? show.network.country.name : 'not available'}</p>   
                <p class=""> <b>TV Network:</b> ${show.network.name ? show.network.name : 'not available'}</p>            
            </div> 

            <div class="ms-sm-1  ms-0">
                <p class=""><b>Premiered:</b> ${show.premiered ? show.premiered : 'not available'}</p>  
                <p class=""><b>Status:</b> ${show.status ? show.status : 'not available'}</p>    
                <p class=""><b>Average runtime:</b> ${show.averageRuntime ? show.averageRuntime : 'not available'} m</p>    
                <p class=""><b>Official site:</b>  <a class="link-primary text-decoration-none" href="${show.officialSite ? show.officialSite : 'not available'}" target="_blank"> visit </a>
                </p>
                <p class=""><b>IMDb code:</b> ${show.externals.imdb ? show.externals.imdb : 'not available'}</p> 
            </div>
          </div>   
          <div class="plot h6">
            <p class=""> ${show.summary ? show.summary : 'not available'} </p>
          </div>

          <div class="backBox ">
            <!-- first version --> 
            <!-- <a id="back" href="#show${show.id}" >Back</a> -->
            <!-- second better version -->
            <button id="back" onclick="history.back()" class="btn btn-secondary bg-gradient">Back</button>
          </div> 

        </div>

      </div>  
    </div>

          `
}


//sorts by best rating
function sortingBest(data) {
  let newData = data.sort((a, b) => b.rating.average - a.rating.average);
  pageWriter(newData, 0, 20);
  itemActive(`li0`, "list-inline-item");

}
//sorts by worst rating
function sortingWorst(data) {
  let newData = data.sort((a, b) => a.rating.average - b.rating.average);
  pageWriter(newData, 0, 20);
  itemActive("li0", "list-inline-item");

}
//sorts by name AZ
function sortingAz(data) {
  let newData = data.sort((a, b) => a.name.localeCompare(b.name))
  pageWriter(newData, 0, 20);
  itemActive("li0", "list-inline-item");
}
//sorts by name ZA
function sortingZa(data) {
  let newData = data.sort((a, b) => b.name.localeCompare(a.name))
  pageWriter(newData, 0, 20);
  itemActive("li0", "list-inline-item");

}

// pagination
function paginating(input) {
  let pages = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220]
  for (let index = 0; index < pages.length; index++) {
    document.getElementById(`li${index}`).addEventListener("click", () => {
      pageWriter(input, pages[index], pages[index] + 20);

    });
  }

}


for (let i = 0; i < 12; i++) {
  let item = document.getElementById(`li${i}`);
  item.addEventListener("click", () => {
    itemActive(`li${i}`, "list-inline-item");

  })
}

function itemActive(id, className) {
  let listItems = document.getElementsByClassName(className);
  for (let item of listItems) {
    item.style.color = "rgb(95, 95, 95)";
  }
  let active = document.getElementById(`${id}`)
  active.style.color = "rgb(2, 62, 153)";

}

let ratingItems = ["highest", "lowest", "az", "za"];
for (let i = 0; i < 4; i++) {
  let item = document.getElementById(`${ratingItems[i]}`);
  item.addEventListener("click", () => {
    itemActive(ratingItems[i], "sorting");

  })
}

//shows only list of 4 pages and hides rest of them
function hidePagination() {

  // IDs: list of all pages
  let ids = ["li0", "li1", "li2", "li3", "li4", "li5", "li6", "li7", "li8", "li9", "li10", "li11"];

  //getting prew/next btns
  let next = document.getElementById("next");
  let prev = document.getElementById("prev");

  //display 4 pages
  showFirstFour(ids);

  //click on next btn shows next group of pages 
  next.addEventListener("click", () => {
    ids.push(ids[0], ids[1], ids[2], ids[3]);
    for (let i = 0; i < 4; i++) {
      ids.shift();
    }
    showFirstFour(ids);
  });

  //click on prev btn shows previous group of pages
  prev.addEventListener("click", () => {
    ids.unshift(ids[8], ids[9], ids[10], ids[11]);
    for (let i = 0; i < 4; i++) {
      ids.pop(ids[i]);
    }
    showFirstFour(ids)
  });

}

// display 4 list items(pages) function
function showFirstFour(ids) {
  for (let i = 0; i < 4; i++) {
    document.getElementById(ids[i]).style.display = "inline";
  }
  for (let i = 4; i < 12; i++) {
    document.getElementById(ids[i]).style.display = "none";
  }
}
//change background on tv controler click
let controler = document.getElementById("controler");
let bg = document.getElementById("bg");

controler.addEventListener("click", function () {
  bg.style.background = ` linear-gradient(90deg, ${randomColor()} 0%,rgba(233, 235, 235, 0.867) 100%)`;
});

function random(number) {
  return Math.floor(Math.random() * number);;
}
function randomColor() {
  return 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ',0.5)';
}

//! validating data from API's
//ternary operator
//console.log(show.name ? show.name : 'not available')


