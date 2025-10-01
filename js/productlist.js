const params = new URLSearchParams(window.location.search);
const category = params.get("category");
const brand = params.get("brand");
const season = params.get("season");
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
    subject = "Summer";
}

const productListContainer = document.querySelector("main");

// definer to globale virabler til de forskellige dataset
let allData, currentDataSet;

// sæt eventlistener på elementet der indeholder filterknapperne
document.querySelector("#filters").addEventListener("click", showFiltered);

// funktion der enten viser alle data eller det filtrerede udsnit
function showFiltered(event) {
    const gender = event.target.dataset.gender;
    if (gender == "All") {
        showProducts(allData);
        currentDataSet = allData
    } else {
        // her filtreres det valgte udsnit (den værdi der står i gender) fra alle data
        const udsnit = allData.filter(product => product.gender == gender);
        currentDataSet = udsnit;
    }
    // currentDataSet indehodler enten alle produkter eller et udsnit
    showProducts(currentDataSet);
}

// sæt eventlistener på elementet der indeholder sorteringsknapperne
document.querySelector("#sorting").addEventListener("click", sortItems);

// funktion der sorterer arrayet currentDataSet baseret på hvilken sorteringsknap der er trykket på
function sortItems(event) {
    const direction = event.target.dataset.direction;
    if (direction == "lohi") {
        // her soteres arrayet ifht. egenskaben price fra lav til høj
        currentDataSet.sort((firstItem, secondItem) => firstItem.price - secondItem.price);
    } else {
        // her soteres arrayet ifht. egenskaben price fra høj til lav
        currentDataSet.sort((firstItem, secondItem) => secondItem.price - firstItem.price);
    }
    showProducts(currentDataSet);
    // showProducts kaldes med det sorterede array som argument
}


fetch(`https://kea-alt-del.dk/t7/api/products?limit=30&${theme}=${subject}`)
    .then((response) => response.json())
    .then((data) => {
        allData = currentDataSet = data;
        showProducts(allData);
    });


function showProducts(products) {
    productListContainer.innerHTML = "";
    products.forEach((element) => {
        console.log(element.price);
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
