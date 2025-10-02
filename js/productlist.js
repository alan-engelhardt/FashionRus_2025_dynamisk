const params = new URLSearchParams(window.location.search);
const category = params.get("category");
document.querySelector("h2").textContent = category;

const productListContainer = document.querySelector("main");

document.querySelector("#filters").addEventListener("click", showFiltered);

document.querySelector("#sorting").addEventListener("click", showSorted);

function showSorted(event) {
    const direction = event.target.dataset.direction;
    if (direction == "lohi") {
        currentDataSet.sort((a, b) => a.price - b.price);
    } else {
        currentDataSet.sort((a, b) => b.price - a.price);
    }
    showProducts(currentDataSet);
}

function showFiltered(event) {
    //console.log(event.target);
    console.log(event.target.dataset.gender);
    const gender = event.target.dataset.gender;
    if (gender == "All") {
        currentDataSet = allData;
    } else {
        const udsnit = allData.filter(product => product.gender == gender);
        currentDataSet = udsnit;
    }
    showProducts(currentDataSet);
}

let allData, currentDataSet;

fetch(`https://kea-alt-del.dk/t7/api/products?limit=30&category=${category}`)
    .then((response) => response.json())
    .then((data) => {
        allData = currentDataSet = data;
        showProducts(allData);
    });


function showProducts(products) {
    //console.log(products);
    productListContainer.innerHTML = "";
    products.forEach((element) => {
        //console.log(element);
        productListContainer.innerHTML += `<article class="smallProduct ${element.soldout && "soldOut"
            } ${element.discount && "onSale"}">
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${element.id
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
