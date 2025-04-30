const url = "https://kea-alt-del.dk/t7/api/products";

fetch(url).then(response=>response.json()).then(show);

function show(data){
    console.log(data);
    const main = document.querySelector("main");
data.forEach(product => {
    const newArticle = document.createElement("article");
    const newH3 = document.createElement("h3");
    newH3.textContent=product.productdisplayname;
    newArticle.appendChild(newH3); 
    const newImg = document.createElement("img");
    newImg.src=`https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`
    newArticle.appendChild(newImg); 
    main.appendChild(newArticle)
});
}