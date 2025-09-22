const id = new URLSearchParams(window.location.search).get("id");

const url = "https://kea-alt-del.dk/t7/api/products/" + id;

fetch(url).then(response => response.json()).then(show);

function show(data) {
    console.log(data);
    const productContainer = document.querySelector("#productContainer");
    const markup = `<figure>
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${data.id}.webp" alt="Produktbillede" class="productImage">
            ${data.discount && `<span class='saleLabel'>${data.discount}% off</span>`}
        </figure>
        <section class="productDetails">
            <h2 class="productName">${data.productdisplayname}</h2>
            <div>
                <p class="articleType"><span class="bold">Type:</span> ${data.articletype}</p>
                <p class="productCategory"><span class="bold">Kategori:</span> Accessories</p>
                <p class="productPrice"><span class="bold">Pris:</span> ${data.price},-</p>
            </div>
            <button class="buyButton">Køb nu</button>
        </section>`
    productContainer.innerHTML = markup;
}

/*
        <figure>
            <img src="https://kea-alt-del.dk/t7/images/webp/640/1535.webp" alt="Produktbillede" class="productImage">
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
*/