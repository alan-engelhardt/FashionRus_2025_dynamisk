const url = "https://kea-alt-del.dk/t7/api/products";

fetch(url).then(response=>response.json()).then(show);

function show(data){
console.log(data);
const main = document.querySelector("main");
const markup = data.map(product =>`
 <article class=${product.discount ? "onSale" : "class=smallProduct"} >
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="product image" />
            <h3>${product.productdisplayname}</h3>
            <p class="subtle">Tshirts | Nike</p>
            <p class="price">DKK <span>${product.price}</span>,-</p>
            <div class=discounted">
                <p>Now DKK <span></span>,-</p>
                <p><span>${product.discount}</span>%</p>
            </div>
            <a href="product.html?id=${product.id}">Read More</a>
        </article>
`).join('');
main.innerHTML=markup;
}

/*
 <article class="smallProduct">
            <img src="https://kea-alt-del.dk/t7/images/webp/640/1163.webp" alt="product image" />
            <h3>Sahara Team India Fanwear Round Neck Jersey</h3>
            <p class="subtle">Tshirts | Nike</p>
            <p class="price">DKK <span>1595</span>,-</p>
            <div class="discounted">
                <p>Now DKK <span></span>,-</p>
                <p><span></span>%</p>
            </div>
            <a href="product.html">Read More</a>
        </article>
*/