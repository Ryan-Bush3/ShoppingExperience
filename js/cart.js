let cartCardContainer = document.querySelector("#cartCardContainer");
 function displayCartProducts(){
    clearStorageAndCart();
    cartCardContainer.innerHTML = "";
    if(cart.length > 0){
        cart.forEach((cartItem) => {
            cartCardContainer.innerHTML += `<div class="cartCard">
                                                <div class="cartCardFlex">
                                                <img src="${cartItem.image}" alt="${cartItem.description}">
                                                    <p class="cartTitle">${cartItem.name}</p>
                                                    <p class="cartDescription">${cartItem.description}</p>
                                                    <div class="cartQuantity">
                                                        <input class="quantityNumberInput" id="${cartItem.id}" type="number" value="${cartItem.quantity}" min="1" max="5">
                                                    </div>
                                                    <p class="cartPrice">&dollar; ${cartItem.price}</p>
                                                </div>
                                                    <p class="textAlignRight removeMargins"><a id="${cartItem.id}" class="removeLink" href="#">Remove</a></p>
                                            </div>`;
            removeFromCart();
            }); 
    }  else{
        cartCardContainer.innerHTML = `<p id="emptyCart">The cart is empty</p>`;
    }
}
displayCartProducts();

let subtotal;
let shipping;
let tax;
let total;

function calculateOrderSummary(){
    subtotal = 0;
    shipping = 0;
    tax = 0;
    total = 0;
    clearStorageAndCart();
    cart.forEach((cartItem) => {
        subtotal += cartItem.price * cartItem.quantity;
        shipping += 1 * cartItem.quantity;
    });
    tax = (subtotal + shipping) * 0.061; 
    total = subtotal + shipping + tax;
}

function displayOrderSummary(){
    updateQuantity();
    calculateOrderSummary();
    sideBarContainer.innerHTML = `<div class="tableRow">
                                    <div class="tableCell">
                                        Subtotal
                                    </div>
                                    <div class="tableCell">
                                        &dollar; ${(subtotal.toFixed(2))}
                                    </div>
                                </div>
                                <div class="tableRow">
                                    <div class="tableCell">
                                        Shipping
                                    </div>
                                    <div class="tableCell">
                                        &dollar; ${(shipping.toFixed(2))}
                                    </div>
                                </div>
                                <div class="tableRow">
                                    <div class="tableCell borderBottom">
                                        Sales Tax
                                    </div>
                                    <div class="tableCell borderBottom">
                                        &dollar; ${(tax.toFixed(2))}
                                    </div>
                                </div>
                                <div class="tableRow">
                                    <div class="tableCell">
                                        Total
                                    </div>
                                    <div class="tableCell bold">
                                        &dollar; ${(total.toFixed(2))}
                                    </div>
                                </div>`;
}
displayOrderSummary();

$(document).ready(function(){
    $('#checkoutThankYou').hide();
    $('#checkoutButton').click(function(){
        if(subtotal == 0){
            $('#checkoutThankYou').html('The cart is currently empty.');
            $('#checkoutThankYou').slideDown();
        } else{
            $('#checkoutThankYou').slideDown();
        }
    });
});