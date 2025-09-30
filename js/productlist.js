const params = new URLSearchParams(window.location.search);
const category = params.get("category");
document.querySelector("h2").textContent = category;

const productListContainer = document.querySelector("main");

document.querySelector("#filters").addEventListener("click", showFiltered);

function showFiltered(event) {
  const gender = event.target.dataset.gender;
  if (gender == "All") {
    showProducts(allData);
  } else {
    const udsnit = allData.filter((product) => product.gender == gender);
    showProducts(udsnit);
  }
}

let allData;

fetch(`https://kea-alt-del.dk/t7/api/products?limit=30&category=${category}`)
  .then((response) => response.json())
  .then((data) => {
    allData = data;
    showProducts(allData);
  });

function showProducts(products) {
  productListContainer.innerHTML = "";
  products.forEach((element) => {
    productListContainer.innerHTML += `<article class="smallProduct ${
      element.soldout && "soldOut"
    } ${element.discount && "onSale"}">
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${
              element.id
            }.webp" alt="product image" />
            <h3>${element.productdisplayname}</h3>
            <p class="subtle">Tshirts | Nike</p>
            <p class="price">DKK <span>${element.price}</span>,-</p>
            <div class="discounted">
                <p>Now DKK <span>${Math.round(
                  element.price - (element.price * element.discount) / 100
                )}</span>,-</p>
                <p><span>${element.discount}</span>%</p>
            </div>
            <a href="product.html?id=${element.id}">Read More</a>
        </article>`;
  });
}
