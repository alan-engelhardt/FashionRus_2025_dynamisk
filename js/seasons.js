const seasonslist = document.querySelector(".seasonslist");

fetch("https://kea-alt-del.dk/t7/api/seasons")
    .then((response) => response.json())
    .then((seasons) => showCategories(seasons));

function showCategories(seasons) {
    seasons.forEach((season) => {
        seasonslist.innerHTML += `<a href="productlist.html?season=${season.season}">${season.season}</a>`;
    });
}
