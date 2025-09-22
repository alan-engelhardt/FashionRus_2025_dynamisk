const url = "https://kea-alt-del.dk/t7/api/products";

fetch(url).then(response => response.json()).then(show);

function show(data) {
    console.log(data);
    const main = document.querySelector("main");
    const markup = data.map(product => `
        <article class="${product.discount ? "onSale smallProduct" : "smallProduct"}">
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="product image" />
            <h3>${product.productdisplayname}</h3>
            <p class="subtle">Tshirts | Nike</p>
            <p class="price">DKK <span>${product.price}</span>,-</p>
            <div class="discounted">
                <p>Now DKK <span>${Math.round(product.price - product.price * product.discount / 100)}</span>,-</p>
                <p><span>${product.discount}</span>%</p>
            </div>
            <a href="product.html?id=${product.id}">Read More</a>
        </article>
    `).join('');
    main.innerHTML = markup;
}