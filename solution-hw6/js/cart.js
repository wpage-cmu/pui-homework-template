let cart

window.onload = function() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
        cart = [];
    }

    console.log("Cart items on load:", cart);
    updateCartDisplay();
};

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
  }

function calcPrice(basePrice, glazingCost, packSizeCost){
    
    return ((basePrice + parseFloat(glazingCost)) * parseFloat(packSizeCost)).toFixed(2);
  }

function displayRoll(roll) {
    const template = document.getElementById("cart-item-template");
    const cartContainer = document.getElementById("shopping_cart");
    const rollItem = document.importNode(template.content, true);

    // Roll details for the temp clone
    const img = rollItem.querySelector("img");
    img.src = `../assets/products/${rolls[roll.type].imageFile}`;

    const rollType = rollItem.querySelector(".rollType");
    rollType.textContent = `${roll.type} cinnamon roll`;

    const glazing = rollItem.querySelector(".glazing");
    glazing.textContent = `${roll.glazing}`;

    const packSize = rollItem.querySelector(".pack-size");
    packSize.textContent = `Pack size: ${roll.size}`;

    const price = rollItem.querySelector(".prd_total");
    price.textContent = `$${roll.basePrice}`;

    // Remove button
    const removeButton = rollItem.querySelector(".remove");
    removeButton.onclick = function() {
        removeRollFromCart(roll.type);
    };
    cartContainer.appendChild(rollItem);
}

function removeRollFromCart(rollType) {
    const index = cart.findIndex(roll => roll.type === rollType);
    if (index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log("Updated cart in localStorage:", JSON.parse(localStorage.getItem("cart")));
        updateCartDisplay();
    }
}

// Update cart display
function updateCartDisplay() {
    const cartContainer = document.getElementById("shopping_cart");
    cartContainer.innerHTML = "";
    cart = JSON.parse(localStorage.getItem("cart"));
    cart.forEach(roll => displayRoll(roll));
    
    // total price
    const totalPrice = cart.reduce((total, roll) => total + parseFloat(roll.basePrice), 0);
    document.getElementById("total_price").textContent = `$${totalPrice.toFixed(2)}`;
}
