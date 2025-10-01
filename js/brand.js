const brandlist = document.querySelector(".brandlist");

fetch("https://kea-alt-del.dk/t7/api/brands")
    .then((response) => response.json())
    .then((brands) => showCategories(brands));

function showCategories(brands) {
    brands.forEach((brand) => {
        brandlist.innerHTML += `<a href="productlist.html?brand=${brand.brandname}">${brand.brandname}</a>`;
    });
}
