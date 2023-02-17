let cart = [
    
];

let sideBarContainer = document.querySelector("#sideBarContainer");

function clearStorageAndCart(){
    cart = [];
    let currentStorage = JSON.parse(localStorage.getItem('CART'));
    if(currentStorage){
        cart = currentStorage;
    }
}

function removeFromCart(){
    let removeLink = document.getElementsByClassName("removeLink");
    for(let i = 0; i < removeLink.length; i++){
        removeLink[i].addEventListener("click", (event) => {
            clearStorageAndCart();
            let selectedProduct = cart.find( (cartItem) => cartItem.id == event.target.id);
            let itemIndex;
            for(let j = 0; j < cart.length; j++){
                if(cart[j].id == selectedProduct.id){
                    itemIndex = cart.indexOf(cart[j]);
                }
            }
            cart.splice(itemIndex, 1);
            localStorage.setItem('CART', JSON.stringify(cart));
            if(typeof displayCart === "function"){
                displayCart();
            }
            if(typeof displayCartProducts === "function"){
                displayCartProducts();
                displayOrderSummary();
            }
            if(cart.length == 0){
                localStorage.clear();
            }
        }, false);
    }
}

function clearCart(){
    const clearCartButton = document.getElementById("clearCartButton");
    clearCartButton.addEventListener("click", () => {
        cart = []
        localStorage.clear();
        if(typeof displayCart === "function"){
            displayCart();
        }
        if(typeof displayCartProducts === "function"){
            displayCartProducts();
            displayOrderSummary();
        }
    }, false);
}
clearCart();

function updateQuantity(){
    let quantityNumberInput = document.getElementsByClassName("quantityNumberInput");
    for(let i = 0; i < quantityNumberInput.length; i++){
        quantityNumberInput[i].addEventListener("change", (event) =>{
            let quantityChanged = quantityNumberInput[i].value;
            if(quantityChanged > 5){
                quantityChanged = 5;
            }
            let itemToChange = cart.find((item) => item.id == event.target.id);
            itemToChange.quantity = +quantityChanged;
            localStorage.setItem('CART', JSON.stringify(cart));
            if(typeof displayOrderSummary == "function"){
                displayOrderSummary();
            }
        }, false);
    }
}

$(document).ready(function(){
    let sidebarOrigin = $('aside').offset();
    $(window).scroll(function(){
        let scrollPosition = $('html').scrollTop();
        if(sidebarOrigin.top < scrollPosition){
            $('aside').css('width', '17.9%');
            $('aside').addClass('sticky');
        } else{
            $('aside').css('width', '20%');
            $('aside').removeClass('sticky');
        }
    });
});