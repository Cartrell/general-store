// ================================================================================================
// typedefs
// ================================================================================================

/**
 * @typedef {import('./products.js').Product} Product
 * @typedef {import('./products.js').ProductType} Product
 */

/**
 * @typedef {'EUR'|'USD'|'YEN'} ExchangeRateId
 */

// ================================================================================================
// global variables
// ================================================================================================

const ExchangeRateIds = Object.freeze({
  EUR: 'EUR',
  USD: 'USD',
  YEN: 'YEN',
});

/**
 * Exchange rates, converting from USD, as of May 7, 2024
 * 
 * Rates taken from https://www.forbes.com/advisor/money-transfer/currency-converter/
 */
const ExchangeRates = Object.freeze({
  [ExchangeRateIds.EUR]: 0.930021,
  [ExchangeRateIds.USD]: 1.0,
  [ExchangeRateIds.YEN]: 154.9235,
});

/** minimum number of products than can be available */
const MIN_PRODUCTS_AVAILABLE = 3;

/** maximum number of products than can be available */
const MAX_PRODUCTS_AVAILABLE = 7;

/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */
/** @type {Product[]} */
const products = [];

/*
const cherry = {
  name: 'Cherry',
  basePrice: 3.20,
  price: 0,
  quantity: 0,
  productId: 1,
  image: 'images/cherry.jpg',
};

const orange = {
  name: 'Orange',
  basePrice: 1.15,
  price: 0,
  quantity: 0,
  productId: 2,
  image: 'images/orange.jpg',
};

const strawberry = {
  name: 'Strawberry',
  basePrice: 1.85,
  price: 0,
  quantity: 0,
  productId: 3,
  image: 'images/strawberry.jpg',
};
*/

/* Declare an empty array named cart to hold the items in the cart */
/** @type {Product[]} */
const cart = [];

/** @type {ExchangeRateId} */
let SelectedExctangeRateId = ExchangeRateIds.USD;

let totalPaid = 0;

/* Images provided in /images folder. All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/

// ================================================================================================
// functions
// ================================================================================================

// ------------------------------------------------------------------------------------------------
/**
 * Finds a product based on the product id. Returns the product or `undefined` if it's not found.
 * @param {number} productId The id of the product to search for.
 */
function findProduct(productId) {
  const product = products.find(function (targetProduct) {
    return (targetProduct.productId === productId);
  });

  return (product);
}

// ------------------------------------------------------------------------------------------------
/**
 * Rounds a number to two decimal places.
 * @param {number} value 
 */
function round(value) {
  return (Math.round(value * 100) / 100);
}

// ------------------------------------------------------------------------------------------------
/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/
/**
 * @param {number} productId 
 */
function addProductToCart(productId) {
  const product = findProduct(productId);
  if (!product) {
    return;
  }

  if (cart.indexOf(product) === -1) {
    cart.push(product);
  }

  product.quantity += 1;
}

// ------------------------------------------------------------------------------------------------
/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/
/**
 * @param {number} productId
 */
function increaseQuantity(productId) {
  const product = findProduct(productId);
  if (product) {
    product.quantity += 1;
  }
}

// ------------------------------------------------------------------------------------------------
/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/
/**
 * @param {number} productId
 */
function decreaseQuantity(productId) {
  const product = findProduct(productId);
  if (!product || product.quantity <= 0) {
    return;
  }

  product.quantity -= 1;
  if (product.quantity === 0) {
    removeProductFromCart(productId);
  }
}

// ------------------------------------------------------------------------------------------------
/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/
/**
 * @param {number} productId
 */
function removeProductFromCart(productId) {
  const product = findProduct(productId);
  if (!product) {
    return;
  }

  product.quantity = 0;

  const productIndex = cart.indexOf(product);
  if (productIndex > -1) {
    cart.splice(productIndex, 1);
  }
}

// ------------------------------------------------------------------------------------------------
/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total cost of all products
  - cartTotal should return the total cost of the products in the cart
  Hint: price and quantity can be used to determine total cost
*/
/**
 * @returns {number}
 */
function cartTotal() {
  /**
   * @param {number} currentCost
   * @param {Product} product
   */
  function addProductsCost(currentCost, product) {
    const productsCost = product.price * product.quantity;
    return (currentCost + productsCost);
  }

  const total = cart.reduce(addProductsCost, 0);
  return (round(total));
}

// ------------------------------------------------------------------------------------------------
/* Create a function called emptyCart that empties the products from the cart */
function emptyCart() {
  for (let index = cart.length - 1; index >= 0; index -= 1) {
    const product = cart[index];
    removeProductFromCart(product.productId);
  }
}

// ------------------------------------------------------------------------------------------------
/* Create a function named pay that takes in an amount as an argument
  - amount is the money paid by customer
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
  Hint: cartTotal function gives us cost of all the products in the cart  
*/
/**
 * @param {number} amount 
 */
function pay(amount) {
  totalPaid += amount;
  const totalCost = cartTotal();
  const balance = totalPaid - totalCost;
  return (round(balance));
}


/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/

// ------------------------------------------------------------------------------------------------
function updateProductPrices() {
  products.forEach(function(product) {
    product.price = convertCurrency(product.basePrice);
  });
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {ExchangeRateId} currencyId
 */
function currency(currencyId) {
  const ids = Object.values(ExchangeRateIds);
  SelectedExctangeRateId = ids.includes(currencyId) ? currencyId : ExchangeRateIds.USD;
  updateProductPrices();
}

// ------------------------------------------------------------------------------------------------
/**
 * @param {number} usdValue 
 */
function convertCurrency(usdValue) {
  const exchangeRate = ExchangeRates[SelectedExctangeRateId];
  const rawValue = usdValue * exchangeRate;
  const roundedValue = round(rawValue);
  return (roundedValue);
}

function selectRandomProducts() {
  const range = MAX_PRODUCTS_AVAILABLE - MIN_PRODUCTS_AVAILABLE;
  let numProducts = MIN_PRODUCTS_AVAILABLE + Math.floor(Math.random() * range);

  // sanity checks for min and max
  numProducts = Math.min(numProducts, ProductsDb.length - 1);
  numProducts = Math.max(0, numProducts);

  const productsPool = ProductsDb.concat();
  /** @type {Product[]} */
  const productsSelected = [];

  for (let index = 0; index < numProducts; index += 1) {
    const randomProductIndex = Math.floor(Math.random() * productsPool.length);
    const product = productsPool[randomProductIndex];
    if (product) {
      productsSelected.push(product);
      productsPool.splice(randomProductIndex, 1);
    }
  }

  return (productsSelected);
}

// ================================================================================================
// global execution
// ================================================================================================
products.push(...selectRandomProducts());

updateProductPrices();

/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

module.exports = {
   products,
   cart,
   addProductToCart,
   increaseQuantity,
   decreaseQuantity,
   removeProductFromCart,
   cartTotal,
   pay,
   emptyCart,
   /* Uncomment the following line if completing the currency converter bonus */
   currency,
}
