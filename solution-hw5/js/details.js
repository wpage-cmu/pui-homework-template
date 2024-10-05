//variables
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get("roll");
const selectedRoll = rolls[rollType];

//roll class
class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
      this.type = rollType;
      this.glazing =  rollGlazing;
      this.size = packSize;
      this.basePrice = basePrice;
  }
}

//details page image selection
const imageFile = selectedRoll.imageFile;
document.getElementById("detail_img").src = `../assets/products/${imageFile}`;

//details page header selection
document.getElementById("details_header_text").textContent = rollType + " Cinnamon Roll";

//price text update
const basePrice = selectedRoll.basePrice;
document.getElementById("details_cost").textContent = '$' + basePrice


// set glazing options list
let glazingOptions = {
  Keep_original: 0,
  Sugar_milk: 0,
  Vanilla_milk: 0.5,
  Double_chocolate: 1.5
}

function populateGlazingOptions() {
  let glazingOptionsList = document.getElementById("glazingOptions");
  for (let cost in glazingOptions) {
    if (glazingOptions.hasOwnProperty(cost)) {
        let option = document.createElement("option");
        option.value = glazingOptions[cost];  
        option.text = `${cost.replace("_", " ")}` //cost in option list: ($${glazingOptions[cost].toFixed(2)})`;
        glazingOptionsList.appendChild(option);
    }
  }
}

// set pack size options list
let packSizeOptions = {
  1: 1,
  3: 3,
  6: 5,
  12: 10
}

function populateSizeOptions() {
  let packSizeOptionsList = document.getElementById("size");
  for (let cost in packSizeOptions) {
    if (packSizeOptions.hasOwnProperty(cost)) {
        let option = document.createElement("option");
        option.value = packSizeOptions[cost];  
        option.text = `${cost.replace("_", " ")}` //cost in option list: ($${packSizeOptions[cost].toFixed(2)})`;
        packSizeOptionsList.appendChild(option);
    }
  }
}

//load both option lists on load
window.onload = function() {
  populateGlazingOptions();
  populateSizeOptions();
  };

//calculate total price
let glazingCost
let packSizeCost
let calculatedPrice = ((basePrice + parseFloat(glazingCost)) * parseFloat(packSizeCost)).toFixed(2)

function calcPrice(basePrice, glazingCost, packSizeCost){
  let totalPrice = document.getElementById("details_cost");
  console.log(totalPrice)
  totalPrice.innerText = '$' + ((basePrice + parseFloat(glazingCost)) * parseFloat(packSizeCost)).toFixed(2)
  return ((basePrice + parseFloat(glazingCost)) * parseFloat(packSizeCost)).toFixed(2);
}


//calc price upon changing options
function glazingChange(element) {
  const glazingCost = parseFloat(element.value);
  const packSizeCost = parseFloat(document.getElementById("size").value);
  calcPrice(basePrice, glazingCost, packSizeCost);
}
  
function sizeChange(element) {
  const packSizeCost = element.value;
  const glazingCost = document.getElementById("glazingOptions").value;
  calcPrice(basePrice, glazingCost, packSizeCost);
}

//add to cart
document.getElementById("add_cart").addEventListener("click", function() {
  const glazingOptionsSelect = document.getElementById("glazingOptions");
  const glazingChoice = glazingOptionsSelect.options[glazingOptionsSelect.selectedIndex].text;
  const packSizeSelect = document.getElementById("size");
  const packSize = packSizeSelect.options[packSizeSelect.selectedIndex].text;
  const newRoll = new Roll(rollType, glazingChoice, packSize, basePrice);
  cart.push(newRoll);
  console.log(cart);
  }
) 

//MDN, Class slides, Lab examples were used in this homework

