const categorylist = document.querySelector(".categorylist");

fetch("https://dummyjson.com/products/categories")
  .then((response) => response.json())
  .then((categories) => showCategories(categories));

function showCategories(categories) {
  console.log(categories);
  categories.forEach((category) => {
    categorylist.innerHTML += `<a href="productlist.html?category=${category.name}&slug=${category.slug}">${category.name}</a>`;
  });
}
