const params = new URLSearchParams(window.location.search);
//const category = params.get("category");
const category = "smartphones";
document.querySelector("h2").textContent = category;

const productListContainer = document.querySelector("main");


fetch(`https://dummyjson.com/products/category/${category}`)
    .then((response) => response.json())
    .then((data) => showProducts(data));

function showProducts(data) {
    console.log(data);
    data.products.forEach((element) => {
        //console.log(element);
        productListContainer.innerHTML += `<article class="smallProduct ${element.soldout && "soldOut"
            } ${element.discountPercentage && "onSale"}">
            <img src="${element.thumbnail}" alt="product image" />
            <h3>${element.brand}</h3>
            <p class="price">DKK <span>${element.price}</span>,-</p>
            <div class="discounted">
                <p>Now DKK <span>${Math.round(
                element.price - (element.price * element.discountPercentage) / 100
            )}</span>,-</p>
                <p><span>${element.discountPercentage}</span>%</p>
            </div>
            <a href="product.html?id=${element.id}">Read More</a>
        </article>`;
    });
}
