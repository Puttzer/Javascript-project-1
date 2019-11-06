// button element
const form = document.querySelector("form");

// make a function that allows us to close lightbox
document.querySelector("#close-btn").addEventListener("click", () => {
  document.querySelector("#light-box").style.display = "none";
});
//function that to be able to search for images through flickr api
let searchfunction = e => {
  e.preventDefault();

  // if (e.keyCode !== 13) return;

  //get the value from input element
  let keyword = document.querySelector("input").value;

  //store value in varaiable "tags"
  let tag = keyword;
  // for each click, remove content that is already displayed
  removeContent();
  // run function to display images from Flickr API
  fetchData(tag);
};

// a function that fetches data from the API.

let fetchData = tag => {
  const per_page = document.querySelector("#per_page").value;

  // linked url to said API, that is stored in the variable "url"
  //parameter "tags" is used in API as a defined area when keyword is added like say the word"space", the word itself is stored in the "tags" parameter and then placed in API which in return shows images related to that keyword
  let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=${per_page}&api_key=28984d098e9946c2c42b87eac57a678b&text=${tag}&format=json&nojsoncallback=1`;

  //show spinner
  https: document.querySelector("#loader").style.display = "block";

  // fetch api which takes the varable "url" as its parameter
  fetch(url)
    //returns a promise that converts  the data to json format
    .then(res => res.json())

    //the return promise then convert parameter "res" into an obejct called "data"
    .then(data => {
      document.querySelector("#loader").style.display = "none";

      //loop through the data object in the order below
      data.photos.photo.forEach(item => {
        console.log(item);
        // create a local variable "url" that fetches each image using the url-link below
        // each placeholder is used to build the image that is received from  the server
        let url = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`;
        // create a local variable called "output" which prints out an image tag.
        //in source attribute, we then use the local variable "url".
        let output = `
        <img src = "${url}">
      `;

        //print out each image in div
        document.getElementById("output").innerHTML += output;

        //Lightbox
        let imgArr = document.querySelectorAll("#output img");
        imgArr.forEach(img =>
          img.addEventListener("click", e => {
            //Click on image creates the lightbox
            let lightboxImage = document.querySelector("#light-box img");

            // Takes the image url and puts it in the empty img src in html
            let newSrc = e.target.getAttribute("src");
            lightboxImage.setAttribute("src", newSrc);
            document.querySelector("#light-box").style.display = "flex";
          })
        );
      });
    });
};

//function that removes content after each click
let removeContent = () => {
  document.getElementById("output").innerHTML = "";
};

//Run search function when user clicks on button or enter key

form.addEventListener("submit", searchfunction);
