let currencySymbol = '$';

/** @type {Set.<HTMLImageElement>} */
let errorImages = new Set();

const rgbOptionColorNames = ['blue', 'green', 'red'];

// Draws product list
function drawProducts() {
    let productList = document.querySelector('.products');
    let productItems = '';
    products.forEach((element) => {
      const price = Number(element.price).toFixed(2);
        productItems += `
            <div class="product panel-back panel-back-blue" data-productId='${element.productId}'>
                <img src='${element.image}'>
                <h3>${element.name}</h3>
                <p>price: ${currencySymbol}${price}</p>
                <button class="add-to-cart btn-confirm">Add to Cart</button>
            </div>
        `;
    });
    // use innerHTML so that products only drawn once
    productList.innerHTML = productItems;
}

// Draws cart
function drawCart() {
    let cartList = document.querySelector('.cart');
    // clear cart before drawing
    let cartItems = '';
    cart.forEach((element) => {
        let itemTotal = Number(element.price * element.quantity).toFixed(2);

        cartItems += `
            <div class="panel-header" data-productId='${element.productId}'>
                <h3>${element.name}</h3>
                <p>price: ${currencySymbol}${element.price}</p>
                <p>quantity: ${element.quantity}</p>
                <p>total: ${currencySymbol}${itemTotal}</p>
                <button class="qup btn-confirm">+</button>
                <button class="qdown btn-confirm">-</button>
                <button class="remove btn-confirm">remove</button>
            </div>
        `;
    });
    // use innerHTML so that cart products only drawn once
    cart.length
        ? (cartList.innerHTML = cartItems)
        : (cartList.innerHTML = 'Cart Empty');
}

// Draws checkout
function drawCheckout() {
    let checkout = document.querySelector('.cart-total');
    checkout.innerHTML = '';

    // run cartTotal() from script.js
    let cartSum = cartTotal().toFixed(2);

    let div = document.createElement('div');
    div.innerHTML = `<p>Cart Total: ${currencySymbol}${cartSum}`;
    checkout.append(div);
}

// listen for `error` events when attempting to set the img attribute of image elements
document.querySelector('.products').addEventListener('error', function(event) {
  let productId = event.target.parentNode.getAttribute('data-productId');
  if (!productId || event.target.tagName !== 'IMG') {
    return;
  }

  /** @type {HTMLImageElement} */
  const imgElement = event.target;

  if (errorImages.has(imgElement)) {
    // this image already has errored out. don't try to set its image again, to avoid
    // a (async) loop of setting the image's src
    return;
  }

  errorImages.add(imgElement);
  imgElement.src = '/images/ui/error.webp';
}, true); // Capture phase

// Initialize store with products, cart, and checkout
drawProducts();
drawCart();
drawCheckout();

document.querySelector('.products').addEventListener('click', (e) => {
    let productId = e.target.parentNode.getAttribute('data-productId');
    productId *= 1;
    addProductToCart(productId);
    drawCart();
    drawCheckout();
});

// Event delegation used to support dynamically added cart items
document.querySelector('.cart').addEventListener('click', (e) => {
    // Helper nested higher order function to use below
    // Must be nested to have access to the event target
    // Takes in a cart function as an agrument
    function runCartFunction(fn) {
        let productId = e.target.parentNode.getAttribute('data-productId');
        productId *= 1;
        for (let i = cart.length - 1; i > -1; i--) {
            if (cart[i].productId === productId) {
                let productId = cart[i].productId;
                fn(productId);
            }
        }
        // force cart and checkout redraw after cart function completes
        drawCart();
        drawCheckout();
    }

    // check the target's class and run function based on class
    if (e.target.classList.contains('remove')) {
        // run removeProductFromCart() from script.js
        runCartFunction(removeProductFromCart);
    } else if (e.target.classList.contains('qup')) {
        // run increaseQuantity() from script.js
        runCartFunction(increaseQuantity);
    } else if (e.target.classList.contains('qdown')) {
        // run decreaseQuantity() from script.js
        runCartFunction(decreaseQuantity);
    }
});

document.querySelector('.pay').addEventListener('click', (e) => {
    e.preventDefault();

    // Get input cash received field value, set to number
    let amount = document.querySelector('.received').value;
    amount *= 1;

    // Set cashReturn to return value of pay()
    let cashReturn = pay(amount).toFixed(2);
    let amountStr = amount.toFixed(2);

    let paymentSummary = document.querySelector('.pay-summary');
    let div = document.createElement('div');

    // If total cash received is greater than cart total thank customer
    // Else request additional funds
    if (cashReturn >= 0) {
        div.innerHTML = `
            <p>Cash Received: ${currencySymbol}${amountStr}</p>
            <p>Cash Returned: ${currencySymbol}${cashReturn}</p>
            <p>Thank you!</p>
        `;
    } else {
        // reset cash field for next entry
        document.querySelector('.received').value = '';
        div.innerHTML = `
            <p>Cash Received: ${currencySymbol}${amountStr}</p>
            <p>Remaining Balance: ${cashReturn}$</p>
            <p>Please pay additional amount.</p>
            <hr/>
        `;
    }

    paymentSummary.append(div);
});

/* Standout suggestions */
/* Begin remove all items from cart */
function dropCart(){
    let shoppingCart = document.querySelector('.empty-btn');
    let emptyButton = document.createElement("button");
    emptyButton.classList.add("empty", "btn-confirm");
    emptyButton.innerHTML =`Empty Cart`;
    shoppingCart.append(emptyButton);
}
dropCart();

document.querySelector('.empty-btn').addEventListener('click', (e) => {
    if (e.target.classList.contains('empty')){
        emptyCart();
        drawCart();
        drawCheckout();
    }
});
/* End all items from cart */

/* Begin currency converter */
function currencyBuilder(){
    let currencyPicker = document.querySelector('.currency-selector');
    let select = document.createElement("select");
    select.classList.add("currency-select", "panel-back", "panel-back-blue");
    select.innerHTML = `<option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="YEN">YEN</option>`;
    currencyPicker.append(select);
}
currencyBuilder();

document.querySelector('.currency-select').addEventListener('change', function handleChange(event) {
    switch(event.target.value){
        case 'EUR':
            currencySymbol = '€';
            break;
        case 'YEN':
            currencySymbol = '¥';
            break;
        default:
            currencySymbol = '$';
            break;
     }

    currency(event.target.value);
    drawProducts();
    drawCart();
    drawCheckout();
});

/* End currency converter */

/* begin - add new product */
function presentAddNewProductMessage(message) {
  /** @type {HTMLParagraphElement | null} */
  const element = document.querySelector('#add-new-product-result');
  if (!element) {
    // sanity check
    return;
  }

  // display result message for a short while
  element.textContent = message;
  setTimeout(() => {
    element.textContent = '';
  }, 4000);
}

document.getElementById('add-button').addEventListener('click', () => {
  /** @type {HTMLInputElement} */
  const newProductIdInput = document.getElementById('new-product-id-input');
  const newProductId = newProductIdInput.valueAsNumber;
  if (isProductIdUnique(newProductId)) {
    newProductIdInput.setCustomValidity('');
  } else {
    newProductIdInput.setCustomValidity('The specified product ID must be unique.');
  }

  /** @type {HTMLFormElement} */
  const form = document.getElementById('add-product-form');
  if (!form.reportValidity()) {
    return;
  }

  /** @type {HTMLInputElement} */
  const newProductPriceInput = document.getElementById('new-product-price-input');
  const formData = new FormData(form);
  const productData = {
    id: newProductId,
    image: formData.get('new-product-image-input'),
    name: formData.get('new-product-name-input'),
    price: newProductPriceInput.valueAsNumber,
  };

  if (addProductToDb(productData)) {
    presentAddNewProductMessage('New product added successfully!');
    drawProducts();
  } else {
    presentAddNewProductMessage('Unable to add the new product...');
  }
});

/* end - add new product */

// initialize rgb selector
/**
 * @param {string} colorName 
 */
function changeUiColor(colorName) {
  if (!rgbOptionColorNames.includes(colorName)) {
    return;
  }

  /**
   * removes existing css classes that start with `panel-back-` from the element
   * @param {HTMLElement} element 
   */
  function removeOptionColorClass(element) {
    rgbOptionColorNames.forEach((rgbOptionColorName) => {
      const optionClassName = `panel-back-${rgbOptionColorName}`;
      element.classList.remove(optionClassName);
    });
  }

  const newOptionClassName = `panel-back-${colorName}`;
  const elements = document.querySelectorAll('.panel-back');
  elements.forEach((element) => {
    removeOptionColorClass(element);
    element.classList.add(newOptionClassName);
  });
}

// immediately invoked function expression (IIFE) used for initialization to prevent
// temporary variables from polluting the global namespace
(() => {
  // assign the next available prouct id to the new-product id input
  const newProductIdInput = document.getElementById('new-product-id-input');
  newProductIdInput.value = getNextAvailableProductId();

  // set a custom store header message
  /** @type {HTMLHeadingElement} */
  const header = document.getElementById('storeName');
  header.innerText = getStoreHeader();

  // initialize the rgb color-changer options
  /** @type {HTMLSelectElement} */
  const rgbSelect = document.querySelector('.rgb-select');
  rgbSelect.addEventListener('change', (event) => {
    changeUiColor(event.target.value);
  });

  // reset selected rgb option
  rgbSelect.selectedIndex = 0;
})();

/* End standout suggestions */
