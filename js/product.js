const productContainer = document.querySelector("#productContainer");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://dummyjson.com/products/${id}`)
  .then((response) => response.json())
  .then((data) => showProduct(data));

function showProduct(product) {
  console.log(product)
  productContainer.innerHTML = `
    <figure>
    <img
    src="${product.images[0]}"
    alt="Produktbillede"
    class="productImage"
    />
    <span class="saleLabel">Udsalg!</span>
    </figure>
    <section class="productDetails">
    <h2 class="productName">${product.brand}</h2>
    <div>
    <p class="articleType"><span class="bold">Type:</span> ${product.articletype}</p>
    <p class="productCategory"><span class="bold">Kategori:</span> ${product.category}</p>
    <p class="productPrice"><span class="bold">Pris:</span>${product.price}</p>
    </div>
    <button class="buyButton">Køb nu</button>
    </section>
    `;
}
