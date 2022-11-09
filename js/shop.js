const cardContainer = document.querySelector("#cardContainer");
function addProducts(){
    products.forEach((individualCard) => {
        cardContainer.innerHTML += `<div id="${individualCard.id}" class="card">
    <img src="${individualCard.image}" alt="${individualCard.description}">
    <div class="cardText">
        <h4>${individualCard.name}</h4>
        <p>${individualCard.description}</p>
        <p>&dollar; ${individualCard.price}</p>
        <button id="${individualCard.id}" class="cartButton">Add to Cart</button>
    </div>
</div>`
    });
}
addProducts();