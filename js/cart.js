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
                                                        <input type="number" value="${cartItem.quantity}" min="1" max="5">
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