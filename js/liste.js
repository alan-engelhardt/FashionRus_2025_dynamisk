const url = "https://kea-alt-del.dk/t7/api/products";

fetch(url).then(response=>response.json()).then(show);

function show(data){
    console.log(data);
    const main = document.querySelector("main");
data.forEach(product => {
    const newH3 = document.createElement("h3");
    newH3.textContent=product.productdisplayname;
    const newImg = document.createElement("img");
    newImg.src=`https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`
    const newP = document.createElement("p");
    newP.textContent=product.articletype + " | " + product.brandname;
    const newArticle = document.createElement("article");
    newArticle.classList.add("smallProduct");
    newArticle.appendChild(newImg); 
    newArticle.appendChild(newH3); 
    newArticle.appendChild(newP); 
    main.appendChild(newArticle)
});
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