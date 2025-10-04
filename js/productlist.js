const params = new URLSearchParams(window.location.search); // læs og gem url patametre
const category = params.get("category"); // læs værdien af category
const brand = params.get("brand"); // læs værdien af brand
const season = params.get("season"); // læs værdien af season
let theme = "season"; // sæt deafault theme
let subject = "Summer"; // sæt default subject

const productListContainer = document.querySelector("main");
const subhead = document.querySelector("h2");
const numItems = document.querySelector("#numItems");

// referencer til elementerne i vores max pris slider
const myRange = document.querySelector("#myRange");
const maxDisp = document.querySelector("#max");
const minDisp = document.querySelector("#min");

// sæt eventlistenere på max pris slider (input ændrer tallet i DOM realtime)
myRange.addEventListener("input", (event) => maxDisp.textContent = event.target.value);
myRange.addEventListener("change", showFiltered);

// sæt eventlistener på sorteringsknapperne
document.querySelector("#sorting").addEventListener("click", sortItems);

// sæt eventlistener på elementet der indeholder filterknapperne
document.querySelector("#filters").addEventListener("click", showFiltered);

// definer to globale virabler til de to forskellige dataset
let allData, currentDataSet;

// tjek hvilken kategori-side der linkes fra
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

// hent json fra API'et
fetch(`https://kea-alt-del.dk/t7/api/products?limit=30&${theme}=${subject}`)
    .then((response) => response.json())
    .then((data) => {
        allData = currentDataSet = data;
        highestPrice(currentDataSet);
        showProducts(currentDataSet);
    });

// funktion der finder højeste og laveste pris i det aktuelle dataset og indstiller max pris slider derefter
function highestPrice(data) {
    data.sort((firstItem, secondItem) => firstItem.price - secondItem.price);
    const highest = data[data.length - 1].price;
    myRange.max = highest;
    myRange.value = highest;
    maxDisp.textContent = highest;
    myRange.min = data[0].price;
    minDisp.textContent = data[0].price;
}

// funktion der enten viser alle data eller et filtreret udsnit
function showFiltered(event) {
    console.log(event.target)
    // tjek om der er en gender data-attribut
    if (event.target.dataset.gender) {
        document.querySelector("#filters .aktiv").classList.remove("aktiv");
        event.target.classList.add("aktiv");
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
        highestPrice(currentDataSet);
        // fitrer efter max pris hvis slider/range er ændret
    } else if (event.target.id == "myRange") {
        const max = event.target.value;
        const udsnit = currentDataSet.filter(product => product.price <= max);
        showProducts(udsnit);
    }
}

// funktion der sorterer arrayet currentDataSet baseret på hvilken sorteringsknap der er trykket på
function sortItems(event) {
    if (event.target.dataset.direction) {
        document.querySelector("#sorting .aktiv") && document.querySelector("#sorting .aktiv").classList.remove("aktiv");
        event.target.classList.add("aktiv");
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
}

// funktion der viser det aktuelle dataset og antallet af produkter i dette i DOM
function showProducts(products) {
    numItems.textContent = products.length;
    productListContainer.innerHTML = "";
    products.forEach((element) => {
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
