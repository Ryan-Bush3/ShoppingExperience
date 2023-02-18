const cardContainer = document.querySelector("#cardContainer");
// function addProducts(){
//     products.forEach((individualCard) => {
//         cardContainer.innerHTML += `<div id="cardNumber${individualCard.id}" class="card">
//     <img src="${individualCard.image}" alt="${individualCard.description}">
//     <div class="cardText">
//         <h4>${individualCard.name}</h4>
//         <p>${individualCard.description}</p>
//         <p>&dollar; ${individualCard.price}</p>
//         <button id="${individualCard.id}" class="cartButton">Add to Cart</button>
//     </div>
// </div>`;
//     });
// }
// addProducts();

let productsPerPage = 6,
    currentPage = 1,
    pagedResults = [],
    totalProducts = products.length;

function paginate(){
    let end = currentPage * productsPerPage,
        start = productsPerPage - end;
    pagedResults = products.slice(start, end);
    $('#cardContainer').empty();
    $(pagedResults).each(function(index, individualCard){
        $('#cardContainer').append(`<div id="cardNumber${individualCard.id}" class="card">
        <img src="${individualCard.image}" alt="${individualCard.description}">
        <div class="cardText">
            <h4>${individualCard.name}</h4>
            <p>${individualCard.description}</p>
            <p>&dollar; ${individualCard.price}</p>
            <button id="${individualCard.id}" class="cartButton">Add to Cart</button>
        </div>
    </div>`);
    });
    if(currentPage <= 1){
        $('.previous').attr('disabled', true);
    } else{
        $('.previous').attr('disabled', false);
    }
    if((currentPage * productsPerPage) >= totalProducts){
        $('.next').attr('disabled', true);
    } else{
        $('.next').attr('disabled', false);
    }
}
paginate();

$('.next').click(function(){
    if((currentPage * productsPerPage) <= totalProducts){
        currentPage++;
    }
    paginate();
    saveToLocalStorage();
});

$('.previous').click(function(){
    if (currentPage > 1) {
        currentPage--;
    }
    paginate();
    saveToLocalStorage();
});

function saveToLocalStorage(){
    var cartButton = document.getElementsByClassName("cartButton");
    for (let i = 0; i < cartButton.length; i++){
        cartButton[i].onclick = () => {
            let selectedProduct = products.find((product) => product.id == cartButton[i].id);
            let cartItemSearch = cart.find((cartItem) => cartItem.id == selectedProduct.id);
            if(cartItemSearch){
                cartItemSearch.quantity++;
            } else{
                cart.push(selectedProduct);
            }
             localStorage.setItem("CART", JSON.stringify(cart) );
             displayCart();
        }
    }
}
saveToLocalStorage();

function displayCart(){
    clearStorageAndCart();
    sideBarContainer.innerHTML = "";
    cart.forEach((cartItem) => {
        sideBarContainer.innerHTML += `
    <div class="tableRow">
        <div class="tableCell">
            ${cartItem.name}
        </div>
        <div class="tableCell">
            &dollar; ${cartItem.price}
        </div>
    </div>
    <div class="tableRow">
        <div class="tableCell borderBottom">
            <input class="quantityNumberInput" id="${cartItem.id}" type="number" value="${cartItem.quantity}" min="1" max="5">
        </div>
        <a class="tableCell removeLink borderBottom" id="${cartItem.id}" href="#">Remove</a>
    </div>`
    });
    removeFromCart();
    updateQuantity();
}
displayCart();

const checkoutButton = document.getElementById("checkoutButton");
checkoutButton.addEventListener("click", () => {
    window.location = "cart.html";
}, false);