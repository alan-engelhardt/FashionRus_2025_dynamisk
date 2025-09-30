const params = new URLSearchParams(window.location.search);
const category = params.get("category");
document.querySelector("h2").textContent = category;

const productListContainer = document.querySelector("main");
const lh_knap = document.querySelector("#lh-knap");
lh_knap.addEventListener("click", sorter);

let allData = []

function sorter() {
  //console.log(allData)
  allData.sort((firstItem, secondItem) => firstItem.price - secondItem.price);
  showProducts(allData);
}

fetch(`https://kea-alt-del.dk/t7/api/products?limit=5&category=${category}`)
  .then((response) => response.json())
  .then((data) => { allData = allData.concat(data); showProducts(allData) });

function showProducts(products) {
  console.log(products);
  productListContainer.innerHTML = ""
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
