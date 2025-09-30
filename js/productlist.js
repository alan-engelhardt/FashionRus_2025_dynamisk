
const productListContainer = document.querySelector("main");
let allProducts;

fetch(`https://kea-alt-del.dk/t7/api/products?limit=20&start=30`)
    .then((response) => response.json())
    .then(data => { allProducts = data; showProducts(data) })

const knapper = document.querySelectorAll("button")
knapper.forEach(knap => knap.addEventListener("click", filterData));

const numItems = document.querySelector("#items");

function filterData() {
    console.log(this.dataset.gender)
    knapper.forEach(knap => knap.classList.remove("aktivtFilter"));
    if (this.dataset.gender == "all") {
        showProducts(allProducts);
    } else {
        const udsnit = allProducts.filter(product => product.gender == this.dataset.gender);
        showProducts(udsnit);
        console.log(udsnit);
    }
    numItems.textContent += " (" + this.dataset.gender + ")";
    this.classList.add("aktivtFilter");
}

function showProducts(products) {
    numItems.textContent = products.length;
    productListContainer.innerHTML = "";
    products.forEach(element => {
        console.log(element);
        productListContainer.innerHTML += `<article class="smallProduct ${element.soldout && "soldOut"} ${element.discount && "onSale"}">
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp" alt="product image" />
            <h3>${element.productdisplayname}</h3>
            <p class="subtle">Tshirts | Nike</p>
            <p class="price">DKK <span>${element.price}</span>,-</p>
            <div class="discounted">
                <p>Now DKK <span>${Math.round(element.price - element.price * element.discount / 100)}</span>,-</p>
                <p><span>${element.discount}</span>%</p>
            </div>
            <a href="product.html?id=${element.id}">Read More</a>
        </article>`;
    })

}


