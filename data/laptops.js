const laptops = [
  {
    id: 1,
    slug: 'samsung-galaxy-z-fold8-ultra',
    year: 2026,
    brand: 'Samsung',
    name: 'Samsung Galaxy Z Fold8 Ultra',
    image: 'https://images.samsung.com/is/image/samsung/p6pim/uk/2407/gallery/uk-galaxy-z-fold6-f956-sm-f956bdbg-542396507?$650_519_PNG$',
    price: 4899,
    description: 'Ultra-thin flagship foldable with an expansive 8.0-inch Dynamic AMOLED 2X inner display, S Pen support, and pro-grade 200MP camera array.',
    specs: {
      processor: 'Snapdragon 8 Elite',
      memory: '16GB RAM',
      storage: '512GB UFS 4.0',
      display: '8.0-inch Foldable LTPO AMOLED 120Hz',
      graphics: 'Adreno 830 GPU',
      battery: '5000mAh · 45W Fast Charge'
    },
    type: 'foldable'
  },
  {
    id: 2,
    slug: 'samsung-galaxy-s25-ultra',
    year: 2025,
    brand: 'Samsung',
    name: 'Samsung Galaxy S25 Ultra',
    image: 'https://images.samsung.com/is/image/samsung/p6pim/uk/2501/gallery/uk-galaxy-s25-s938-sm-s938bztbeub-544669395?$650_519_PNG$',
    price: 3699,
    description: 'Titanium flagship engineered with Galaxy AI, built-in S Pen, anti-reflective Gorilla Armor 2 glass, and quad telephoto optics.',
    specs: {
      processor: 'Snapdragon 8 Elite for Galaxy',
      memory: '12GB RAM',
      storage: '256GB UFS 4.0',
      display: '6.9-inch QHD+ Dynamic AMOLED 2X',
      graphics: 'Adreno 830 GPU',
      battery: '5000mAh · 45W Fast Charge'
    },
    type: 'android'
  },
  {
    id: 3,
    slug: 'google-pixel-10-pro',
    year: 2025,
    brand: 'Google',
    name: 'Google Pixel 10 Pro',
    image: 'https://lh3.googleusercontent.com/d0q5E2vQ4mR2dQqk9uI5tF8W9h2g7n2vV3v1xQ7xY4hZ8L5c9P6w=w800',
    price: 3199,
    description: 'Clean Android flagship powered by Google Tensor G5 with studio-grade computational photography, Super Actua OLED display, and 7 years of updates.',
    specs: {
      processor: 'Google Tensor G5',
      memory: '16GB RAM',
      storage: '256GB UFS 4.0',
      display: '6.3-inch Super Actua LTPO OLED 120Hz',
      graphics: 'Custom Tensor GPU',
      battery: '4950mAh · 37W Fast Charge'
    },
    type: 'android'
  },
  {
    id: 4,
    slug: 'xiaomi-15-ultra',
    year: 2025,
    brand: 'Xiaomi',
    name: 'Xiaomi 15 Ultra',
    image: 'https://i02.appmifile.com/mi-com-product/fly-birds/xiaomi-15-ultra/pc/55d7c60f47b8c584e90218a62a017b09.png',
    price: 3399,
    description: 'Co-engineered with Leica Summilux optics, featuring a 1-inch main sensor, 200MP periscope telephoto, and 90W HyperCharge.',
    specs: {
      processor: 'Snapdragon 8 Elite',
      memory: '16GB RAM',
      storage: '512GB UFS 4.0',
      display: '6.73-inch WQHD+ LTPO AMOLED 120Hz',
      graphics: 'Adreno 830 GPU',
      battery: '5410mAh · 90W HyperCharge'
    },
    type: 'android'
  }
];

export default laptops;
export { laptops };
