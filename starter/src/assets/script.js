// ================================================================================================
// typedefs
// ================================================================================================

/**
 * @typedef {'arms'|'consumeable'|'food'|'magic'|'utility'} ProductType
 * @typedef {'EUR'|'USD'|'YEN'} ExchangeRateId
 */

/**
 * @typedef Product
 * @type {object}
 * @property {string} name: name of product
 * @property {number} basePrice: base price of product
 * @property {number} price: price of product with exchange rate applied
 * @property {number} quantity: quantity in cart should start at zero
 * @property {number} productId: unique id for the product
 * @property {string} image: picture of product
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

const StoreNames = [
  'Ah, a customer! Welcome!',
  'Welcome to the emporium!',
  'Welcome to my shop!',
  'Greetings! How can I help you today?',
];

/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */
/** @type {Product[]} */
const products = [];



const BaseFolder = '/images/products/';
const DefaultExt = 'webp';

/**
 * @param {string} filenamePart 
 * @param {string} [ext='webm']
 */
function buildProductImagePath(filenamePart, ext) {
  if (ext === undefined) {
    ext = DefaultExt;
  }

  return (`${BaseFolder}${filenamePart}.${ext}`);
}

/** @type {Product[]} */
const ProductsDb = [
  {
    name: 'Apple',
    basePrice: 1.1,
    price: 0,
    quantity: 0,
    productId: 100,
    image: buildProductImagePath('apple'),
  },

  {
    name: 'Axe',
    basePrice: 35.65,
    price: 0,
    quantity: 0,
    productId: 200,
    image: buildProductImagePath('axe'),
  },

  {
    name: 'Book Of Dark Magic',
    basePrice: 80.15,
    price: 0,
    quantity: 0,
    productId: 300,
    image: buildProductImagePath('book-of-dark-magic'),
  },

  /*
  {
    name: 'Book Of Light Magic',
    basePrice: 80.15,
    price: 0,
    quantity: 0,
    productId: 400,
    image: buildProductImagePath('book-of-light-magic'),
  },

  {
    name: 'Book Of The Danged',
    basePrice: 80.15,
    price: 0,
    quantity: 0,
    productId: 500,
    image: buildProductImagePath('book-of-the-danged'),
  },

  {
    name: 'Burger',
    basePrice: 4.25,
    price: 0,
    quantity: 0,
    productId: 600,
    image: buildProductImagePath('burger'),
  },

  {
    name: 'Cake',
    basePrice: 6.35,
    price: 0,
    quantity: 0,
    productId: 700,
    image: buildProductImagePath('cake'),
  },

  {
    name: 'Cheese',
    basePrice: 3.45,
    price: 0,
    quantity: 0,
    productId: 800,
    image: buildProductImagePath('cheese'),
  },

  {
    name: 'Chocolate Chip Cookie',
    basePrice: 1.25,
    price: 0,
    quantity: 0,
    productId: 900,
    image: buildProductImagePath('chocolate-chip-cookie'),
  },

  {
    name: 'Crossbow',
    basePrice: 25.75,
    price: 0,
    quantity: 0,
    productId: 1000,
    image: buildProductImagePath('crossbow'),
  },

  {
    name: 'Elixir',
    basePrice: 4.75,
    price: 0,
    quantity: 0,
    productId: 1100,
    image: buildProductImagePath('elixir'),
  },

  {
    name: 'Flask Of Water',
    basePrice: 1.3,
    price: 0,
    quantity: 0,
    productId: 1200,
    image: buildProductImagePath('flask-of-water'),
  },

  {
    name: 'Fried Egg',
    basePrice: 2.27,
    price: 0,
    quantity: 0,
    productId: 1300,
    image: buildProductImagePath('fried-egg'),
  },

  {
    name: 'Gauntlets',
    basePrice: 22.22,
    price: 0,
    quantity: 0,
    productId: 1400,
    image: buildProductImagePath('gauntlets'),
  },

  {
    name: 'Health Potion',
    basePrice: 1.25,
    price: 0,
    quantity: 0,
    productId: 1500,
    image: buildProductImagePath('health-potion'),
  },

  {
    name: 'Heavy Armor',
    basePrice: 70.7,
    price: 0,
    quantity: 0,
    productId: 1600,
    image: buildProductImagePath('heavy-armor'),
  },

  {
    name: 'Hoodlum\'s Cap',
    basePrice: 4.7,
    price: 0,
    quantity: 0,
    productId: 1700,
    image: buildProductImagePath('hoodlums-cap'),
  },

  {
    name: 'Knight\'s Boots',
    basePrice: 33.33,
    price: 0,
    quantity: 0,
    productId: 1800,
    image: buildProductImagePath('knights-boots'),
  },

  {
    name: 'Knight\'s Helm',
    basePrice: 56.78,
    price: 0,
    quantity: 0,
    productId: 1900,
    image: buildProductImagePath('knights-helm'),
  },

  {
    name: 'lantern',
    basePrice: 12.34,
    price: 0,
    quantity: 0,
    productId: 2000,
    image: buildProductImagePath('lantern'),
  },

  {
    name: 'light-armor',
    basePrice: 42.42,
    price: 0,
    quantity: 0,
    productId: 2100,
    image: buildProductImagePath('light-armor'),
  },

  {
    name: 'Long Sword',
    basePrice: 49,
    price: 0,
    quantity: 0,
    productId: 2200,
    image: buildProductImagePath('long-sword'),
  },

  {
    name: 'magic-amulet',
    basePrice: 120,
    price: 0,
    quantity: 0,
    productId: 2300,
    image: buildProductImagePath('magic-amulet'),
  },

  {
    name: 'magic-boots',
    basePrice: 60.95,
    price: 0,
    quantity: 0,
    productId: 2400,
    image: buildProductImagePath('magic-boots'),
  },

  {
    name: 'Magic Powder',
    basePrice: 23.78,
    price: 0,
    quantity: 0,
    productId: 2500,
    image: buildProductImagePath('magic-powder'),
  },

  {
    name: 'Magic Ring',
    basePrice: 250,
    price: 0,
    quantity: 0,
    productId: 2600,
    image: buildProductImagePath('magic-ring'),
  },

  {
    name: 'Mana Potion',
    basePrice: 0.75,
    price: 0,
    quantity: 0,
    productId: 2700,
    image: buildProductImagePath('mana-potion'),
  },

  {
    name: 'Minerva Armor',
    basePrice: 200.15,
    price: 0,
    quantity: 0,
    productId: 2800,
    image: buildProductImagePath('minerva-armor'),
  },

  {
    name: 'paladin-shield',
    basePrice: 152.63,
    price: 0,
    quantity: 0,
    productId: 2900,
    image: buildProductImagePath('paladin-shield'),
  },

  {
    name: 'shield',
    basePrice: 62.97,
    price: 0,
    quantity: 0,
    productId: 3000,
    image: buildProductImagePath('shield'),
  },

  {
    name: 'short-sword',
    basePrice: 19.99,
    price: 0,
    quantity: 0,
    productId: 3100,
    image: buildProductImagePath('short-sword'),
  },

  {
    name: 'slice-of-red-velvet-pie',
    basePrice: 2.25,
    price: 0,
    quantity: 0,
    productId: 3200,
    image: buildProductImagePath('slice-of-red-velvet-pie'),
  },

  {
    name: 'socks',
    basePrice: 1.99,
    price: 0,
    quantity: 0,
    productId: 3300,
    image: buildProductImagePath('socks'),
  },

  {
    name: 'spear',
    basePrice: 82.8,
    price: 0,
    quantity: 0,
    productId: 3400,
    image: buildProductImagePath('spear'),
  },

  {
    name: 'Staff Of Flames',
    basePrice: 178.45,
    price: 0,
    quantity: 0,
    productId: 3500,
    image: buildProductImagePath('staff-of-flames'),
  },

  {
    name: 'Staff Of Ice',
    basePrice: 192.45,
    price: 0,
    quantity: 0,
    productId: 3600,
    image: buildProductImagePath('staff-of-ice'),
  },

  {
    name: 'Staff Of Thunder',
    basePrice: 220.45,
    price: 0,
    quantity: 0,
    productId: 3700,
    image: buildProductImagePath('staff-of-thunder'),
  },

  {
    name: 'T-Bone Steak',
    basePrice: 15.6,
    price: 0,
    quantity: 0,
    productId: 3800,
    image: buildProductImagePath('t-bone-steak'),
  },

  {
    name: 'Tiara',
    basePrice: 37.29,
    price: 0,
    quantity: 0,
    productId: 3900,
    image: buildProductImagePath('tiara'),
  },

  {
    name: 'torch',
    basePrice: 1.05,
    price: 0,
    quantity: 0,
    productId: 4000,
    image: buildProductImagePath('torch'),
  },

  {
    name: 'underwear',
    basePrice: 4.78,
    price: 0,
    quantity: 0,
    productId: 4100,
    image: buildProductImagePath('underwear'),
  },

  {
    name: 'wizards-cape',
    basePrice: 99.99,
    price: 0,
    quantity: 0,
    productId: 4200,
    image: buildProductImagePath('wizards-cape'),
  },

  {
    name: 'wizards-hat',
    basePrice: 78.36,
    price: 0,
    quantity: 0,
    productId: 4300,
    image: buildProductImagePath('wizards-hat'),
  },
  */
];

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
  const product = products.find((targetProduct) => {
    return (targetProduct.productId === productId);
  });

  return (product);
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
  return (total);
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
  return (balance);
}


/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/

// ------------------------------------------------------------------------------------------------
function updateProductPrices() {
  products.forEach((product) => {
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
  return (usdValue * exchangeRate);
}

// ------------------------------------------------------------------------------------------------
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

// ------------------------------------------------------------------------------------------------
function getStoreHeader() {
  const randomIndex = Math.floor(Math.random() * StoreNames.length);
  const header = StoreNames[randomIndex];
  return (header ?? 'Welcome To My Shop!');
}

// ================================================================================================
// global execution
// ================================================================================================
// products.push(...selectRandomProducts());
products.push(...ProductsDb);

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
   getStoreHeader,
   /* Uncomment the following line if completing the currency converter bonus */
   currency,
}
