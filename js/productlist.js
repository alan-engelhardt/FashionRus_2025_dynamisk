const params = new URLSearchParams(window.location.search);
const category = params.get("category");
const brand = params.get("brand");
const season = params.get("season");
let allData, currentDataSet;
let subhead = document.querySelector("h2");
let theme = "season";
let subject = "Summer"

if (category) {
    subhead.textContent = category;
    theme = "category";
    subject = category;
} else if (brand) {
    subhead.textContent = brand;
    theme = "brandname";
    subject = brand;
} else if (season) {
    subhead.textContent = season;
    theme = "season";
    subject = season;
} else {
    subhead.textContent = "Summer";
    theme = "season";
}

const productListContainer = document.querySelector("main");

document.querySelector("#filters").addEventListener("click", showFiltered);

function showFiltered(event) {
    const gender = event.target.dataset.gender;
    if (gender == "All") {
        showProducts(allData);
        currentDataSet = allData
    } else {
        const udsnit = allData.filter(product => product.gender == gender);
        currentDataSet = udsnit
    }
    showProducts(currentDataSet);
}

document.querySelector("#sorting").addEventListener("click", sortItems);

function sortItems(event) {
    console.log(currentDataSet);
    const direction = event.target.dataset.direction;
    if (direction == "lohi") {
        currentDataSet.sort((firstItem, secondItem) => firstItem.price - secondItem.price);
    } else {
        currentDataSet.sort((firstItem, secondItem) => secondItem.price - firstItem.price);
    }
    showProducts(currentDataSet);
}


fetch(`https://kea-alt-del.dk/t7/api/products?limit=30&${theme}=${subject}`)
    .then((response) => response.json())
    .then((data) => {
        allData = currentDataSet = data;
        showProducts(allData);
    });


function showProducts(products) {
    console.log(products);
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
