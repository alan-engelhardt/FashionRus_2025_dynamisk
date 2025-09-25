const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// fetch(`https://kea-alt-del.dk/t7/api/products/${id}`)
//   .then((res) => res.json())
//   .then(showProduct);

async function myFetch(id) {
  const response = await fetch(`https://kea-alt-del.dk/t7/api/products/${id}`);
  const product = await response.json();
  showProduct(product);
}

function showProduct(product) {
  document.querySelector("#productContainer").innerHTML = `
    <figure>
    <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="Produktbillede" class="productImage">
    <span class="saleLabel">Udsalg!</span>
    </figure>
    <section class="productDetails">
    <h2 class="productName">Produktnavn</h2>
    <div>
    <p class="articleType"><span class="bold">Type:</span> Caps</p>
    <p class="productCategory"><span class="bold">Kategori:</span> Accessories</p>
    <p class="productPrice"><span class="bold">Pris:</span> 699,-</p>
    </div>
    <button class="buyButton">Køb nu</button>
    </section>
    `;
}

myFetch(id);
