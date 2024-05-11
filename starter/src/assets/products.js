/**
 * @typedef {'arms'|'consumeable'|'food'|'magic'|'utility'} ProductType
 */

/**
 * @type {Object.<string, ProductType>}
 */
const ProductTypes = Object.freeze({
  ARMS: 'arms',
  CONSUMEABLE: 'consumeable',
  FOOD: 'food',
  MAGIC: 'magic',
  UTILITY: 'utility',
});

/**
 * @typedef Product
 * @type {object}
 * @property {string} name: name of product
 * @property {number} basePrice: base price of product
 * @property {number} price: price of product with exchange rate applied
 * @property {number} quantity: quantity in cart should start at zero
 * @property {number} productId: unique id for the product
 * @property {string} image: picture of product
 * @property {ProductType} type: type of product
 */

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
    basePrice: 0.5,
    price: 0,
    quantity: 0,
    productId: 100,
    image: buildProductImagePath('apple'),
    type: ProductTypes.FOOD,
  },
  
  {
    name: 'Axe',
    basePrice: 35.65,
    price: 0,
    quantity: 0,
    productId: 200,
    image: buildProductImagePath('axe'),
    type: ProductTypes.ARMS,
  },

  {
    name: 'Book Of Dark Magic',
    basePrice: 80.15,
    price: 0,
    quantity: 0,
    productId: 300,
    image: buildProductImagePath('book-of-dark-magic'),
    type: ProductTypes.MAGIC,
  },

  {
    name: 'Book Of Light Magic',
    basePrice: 80.15,
    price: 0,
    quantity: 0,
    productId: 400,
    image: buildProductImagePath('book-of-light-magic'),
    type: ProductTypes.MAGIC,
  },

  {
    name: 'Book Of The Danged',
    basePrice: 80.15,
    price: 0,
    quantity: 0,
    productId: 500,
    image: buildProductImagePath('book-of-the-danged'),
    type: ProductTypes.MAGIC,
  },

  {
    name: 'Burger',
    basePrice: 4.25,
    price: 0,
    quantity: 0,
    productId: 600,
    image: buildProductImagePath('burger'),
    type: ProductTypes.FOOD,
  },

  {
    name: 'Cake',
    basePrice: 6.35,
    price: 0,
    quantity: 0,
    productId: 700,
    image: buildProductImagePath('cake'),
    type: ProductTypes.FOOD,
  },

  {
    name: 'Cheese',
    basePrice: 3.45,
    price: 0,
    quantity: 0,
    productId: 800,
    image: buildProductImagePath('cheese'),
    type: ProductTypes.FOOD,
  },

  {
    name: 'Chocolate Chip Cookie',
    basePrice: 1.1,
    price: 0,
    quantity: 0,
    productId: 900,
    image: buildProductImagePath('chocolate-chip-cookie'),
    type: ProductTypes.FOOD,
  },

  {
    name: 'Crossbow',
    basePrice: 25.75,
    price: 0,
    quantity: 0,
    productId: 1000,
    image: buildProductImagePath('crossbow'),
    type: ProductTypes.ARMS,
  },

  {
    name: 'Elixir',
    basePrice: 4.75,
    price: 0,
    quantity: 0,
    productId: 1100,
    image: buildProductImagePath('elixir'),
    type: ProductTypes.CONSUMEABLE,
  },

  {
    name: 'Flask Of Water',
    basePrice: 0.9,
    price: 0,
    quantity: 0,
    productId: 1200,
    image: buildProductImagePath('flask-of-water'),
    type: ProductTypes.CONSUMEABLE,
  },

  {
    name: 'Fried Egg',
    basePrice: 2.27,
    price: 0,
    quantity: 0,
    productId: 1300,
    image: buildProductImagePath('fried-egg'),
    type: ProductTypes.FOOD,
  },

  {
    name: 'Gauntlets',
    basePrice: 22.22,
    price: 0,
    quantity: 0,
    productId: 1400,
    image: buildProductImagePath('gauntlets'),
    type: ProductTypes.ARMS,
  },

  {
    name: 'Health Potion',
    basePrice: 0.5,
    price: 0,
    quantity: 0,
    productId: 1500,
    image: buildProductImagePath('health-potion'),
    type: ProductTypes.CONSUMEABLE,
  },

  {
    name: 'Heavy Armor',
    basePrice: 70.7,
    price: 0,
    quantity: 0,
    productId: 1600,
    image: buildProductImagePath('heavy-armor'),
    type: ProductTypes.ARMS,
  },

  {
    name: 'Hoodlum\'s Cap',
    basePrice: 4.7,
    price: 0,
    quantity: 0,
    productId: 1700,
    image: buildProductImagePath('hoodlums-cap'),
    type: ProductTypes.ARMS,
  },

  {
    name: 'Knight\'s Boots',
    basePrice: 33.33,
    price: 0,
    quantity: 0,
    productId: 1800,
    image: buildProductImagePath('knights-boots'),
    type: ProductTypes.ARMS,
  },

  {
    name: 'Knight\'s Helm',
    basePrice: 56.78,
    price: 0,
    quantity: 0,
    productId: 1900,
    image: buildProductImagePath('knights-helm'),
    type: ProductTypes.ARMS,
  },

  {
    name: 'lantern',
    basePrice: 12.34,
    price: 0,
    quantity: 0,
    productId: 2000,
    image: buildProductImagePath('lantern'),
    type: ProductTypes.CONSUMEABLE,
  },

  {
    name: 'light-armor',
    basePrice: 42.42,
    price: 0,
    quantity: 0,
    productId: 2100,
    image: buildProductImagePath('light-armor'),
    type: ProductTypes.ARMS,
  },

  {
    name: 'long-sword',
    basePrice: 49,
    price: 0,
    quantity: 0,
    productId: 2200,
    image: buildProductImagePath('Long Sword'),
    type: ProductTypes.ARMS,
  },

  {
    name: 'magic-amulet',
    basePrice: 120,
    price: 0,
    quantity: 0,
    productId: 2300,
    image: buildProductImagePath('magic-amulet'),
    type: ProductTypes.MAGIC,
  },

  {
    name: 'magic-boots',
    basePrice: 60.95,
    price: 0,
    quantity: 0,
    productId: 2400,
    image: buildProductImagePath('magic-boots'),
    type: ProductTypes.MAGIC,
  },

  {
    name: 'Magic Powder',
    basePrice: 23.78,
    price: 0,
    quantity: 0,
    productId: 2500,
    image: buildProductImagePath('magic-powder'),
    type: ProductTypes.UTILITY,
  },

  {
    name: 'Magic Ring',
    basePrice: 250,
    price: 0,
    quantity: 0,
    productId: 2600,
    image: buildProductImagePath('magic-ring'),
    type: ProductTypes.UTILITY,
  },

  {
    name: 'Mana Potion',
    basePrice: 0.75,
    price: 0,
    quantity: 0,
    productId: 2700,
    image: buildProductImagePath('mana-potion'),
    type: ProductTypes.CONSUMEABLE,
  },

  {
    name: 'Minerva Armor',
    basePrice: 200.15,
    price: 0,
    quantity: 0,
    productId: 2800,
    image: buildProductImagePath('minerva-armor'),
    type: ProductTypes.MAGIC,
  },

  {
    name: 'paladin-shield',
    basePrice: 152.63,
    price: 0,
    quantity: 0,
    productId: 2900,
    image: buildProductImagePath('paladin-shield'),
    type: ProductTypes.ARMS,
  },

  {
    name: 'shield',
    basePrice: 62.97,
    price: 0,
    quantity: 0,
    productId: 3000,
    image: buildProductImagePath('shield'),
    type: ProductTypes.ARMS,
  },

  {
    name: 'short-sword',
    basePrice: 19.99,
    price: 0,
    quantity: 0,
    productId: 3100,
    image: buildProductImagePath('short-sword'),
    type: ProductTypes.ARMS,
  },

  {
    name: 'slice-of-red-velvet-pie',
    basePrice: 2.25,
    price: 0,
    quantity: 0,
    productId: 3200,
    image: buildProductImagePath('slice-of-red-velvet-pie'),
    type: ProductTypes.FOOD,
  },

  {
    name: 'socks',
    basePrice: 1.99,
    price: 0,
    quantity: 0,
    productId: 3300,
    image: buildProductImagePath('socks'),
    type: ProductTypes.UTILITY,
  },

  {
    name: 'spear',
    basePrice: 82.8,
    price: 0,
    quantity: 0,
    productId: 3400,
    image: buildProductImagePath('spear'),
    type: ProductTypes.ARMS,
  },

  {
    name: 'Staff Of Flames',
    basePrice: 178.45,
    price: 0,
    quantity: 0,
    productId: 3500,
    image: buildProductImagePath('staff-of-flames'),
    type: ProductTypes.MAGIC,
  },

  {
    name: 'Staff Of Ice',
    basePrice: 192.45,
    price: 0,
    quantity: 0,
    productId: 3600,
    image: buildProductImagePath('staff-of-ice'),
    type: ProductTypes.MAGIC,
  },

  {
    name: 'Staff Of Thunder',
    basePrice: 220.45,
    price: 0,
    quantity: 0,
    productId: 3700,
    image: buildProductImagePath('staff-of-thunder'),
    type: ProductTypes.MAGIC,
  },

  {
    name: 'T-Bone Steak',
    basePrice: 15.6,
    price: 0,
    quantity: 0,
    productId: 3800,
    image: buildProductImagePath('t-bone-steak'),
    type: ProductTypes.FOOD,
  },

  {
    name: 'Tiara',
    basePrice: 37.29,
    price: 0,
    quantity: 0,
    productId: 3900,
    image: buildProductImagePath('tiara'),
    type: ProductTypes.MAGIC,
  },

  {
    name: 'torch',
    basePrice: 0.25,
    price: 0,
    quantity: 0,
    productId: 4000,
    image: buildProductImagePath('torch'),
    type: ProductTypes.CONSUMEABLE,
  },

  {
    name: 'underwear',
    basePrice: 4.78,
    price: 0,
    quantity: 0,
    productId: 4100,
    image: buildProductImagePath('underwear'),
    type: ProductTypes.UTILITY,
  },

  {
    name: 'wizards-cape',
    basePrice: 99.99,
    price: 0,
    quantity: 0,
    productId: 4200,
    image: buildProductImagePath('wizards-cape'),
    type: ProductTypes.MAGIC,
  },

  {
    name: 'wizards-hat',
    basePrice: 78.36,
    price: 0,
    quantity: 0,
    productId: 4300,
    image: buildProductImagePath('wizards-hat'),
    type: ProductTypes.MAGIC,
  },
];

module.exports = {
  ProductsDb,
  ProductTypes,
};
