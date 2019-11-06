const form = document.querySelector("form");

document.querySelector("#close-btn").addEventListener("click", () => {
  document.querySelector("#light-box").style.display = "none";
});

let searchfunction = e => {
  e.preventDefault();

  if (e.keyCode !== 13) return;

  let keyword = document.querySelector("input").value;

  let tag = keyword;

  removeContent();

  fetchData(tag);
};

let fetchData = tag => {
  let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=28984d098e9946c2c42b87eac57a678b&tags=${tag}&format=json&nojsoncallback=1`;

  https: document.querySelector("#loader").style.display = "block";

  fetch(url)
    .then(res => res.json())

    .then(data => {
      document.querySelector("#loader").style.display = "none";

      data.photos.photo.forEach(item => {
        let url = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`;
        let output = `
        <img src = "${url}">
      `;

        document.getElementById("output").innerHTML += output;

        let imgArr = document.querySelectorAll("#output img");
        imgArr.forEach(img =>
          img.addEventListener("click", e => {
            let lightboxImage = document.querySelector("#light-box img");

            let newSrc = e.target.getAttribute("src");
            lightboxImage.setAttribute("src", newSrc);
            document.querySelector("#light-box").style.display = "flex";
          })
        );
      });
    });
};

let removeContent = () => {
  document.getElementById("output").innerHTML = "";
};

form.addEventListener("keyup", searchfunction);
