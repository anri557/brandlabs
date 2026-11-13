const laptops = [
  {
    id: 1,
    slug: 'apple-macbook-air-m1',
    year: 2021,
    brand: 'Apple',
    name: 'MacBook Air M1',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0-yTo6B22UWDl0yywBupEUqSUU7nhsvTOnWCVh7DELA&s=10',
    price: 1500,
    description: 'A slim and quiet laptop for school, office work, browsing, and everyday creative tasks.',
    specs: {
      processor: 'Apple M1',
      memory: '8GB unified memory',
      storage: '256GB SSD',
      display: '13.3-inch Retina',
      graphics: 'Integrated 7-core GPU',
      battery: 'Up to 18 hours'
    },
    type: 'ultrabook'
  },
  {
    id: 2,
    slug: 'apple-macbook-pro-14-m1-pro',
    year: 2021,
    brand: 'Apple',
    name: 'MacBook Pro 14 M1 Pro',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmVN678EJZ_i5o3oCGmJfPcfrwCqSR68lA_OnxkIh2Zw&s=10',
    price: 2200,
    description: 'A powerful professional laptop for software development, photography, video editing, and design.',
    specs: {
      processor: 'Apple M1 Pro',
      memory: '16GB unified memory',
      storage: '512GB SSD',
      display: '14.2-inch Liquid Retina XDR',
      graphics: '14-core GPU',
      battery: 'Up to 17 hours'
    },
    type: 'business'
  },
  {
    id: 3,
    slug: 'apple-macbook-air-m2',
    year: 2022,
    brand: 'Apple',
    name: 'MacBook Air M2',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-G2vj-IZCWKPP1EXzadExoEatgpauPMj2OraKDEZIng&s=10',
    price: 1099,
    description: 'A redesigned everyday laptop with strong performance, a bright display, and a lightweight build.',
    specs: {
      processor: 'Apple M2',
      memory: '8GB unified memory',
      storage: '256GB SSD',
      display: '13.6-inch Liquid Retina',
      graphics: 'Integrated 8-core GPU',
      battery: 'Up to 18 hours'
    },
    type: 'ultrabook'
  },
  {
    id: 4,
    slug: 'apple-macbook-pro-16-m2-pro',
    year: 2022,
    brand: 'Apple',
    name: 'MacBook Pro 16 M2 Pro',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1kKoDiEaCKruZJY2NFYNoq-NMrwQm7iF3FfaFvpgWxA&s=10',
    price: 2599,
    description: 'A large-screen workstation built for demanding development, production, and professional workflows.',
    specs: {
      processor: 'Apple M2 Pro',
      memory: '16GB unified memory',
      storage: '512GB SSD',
      display: '16.2-inch Liquid Retina XDR',
      graphics: '19-core GPU',
      battery: 'Up to 22 hours'
    },
    type: 'business'
  },
  {
    id: 5,
    slug: 'apple-macbook-air-15-m2',
    year: 2023,
    brand: 'Apple',
    name: 'MacBook Air 15 M2',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4UX2H_PfaKbkaFjqM4xBgVoDekf-K_G26LEKaXWwCSA&s',
    price: 1299,
    description: 'A spacious, silent laptop for multitasking, presentations, media, and mobile office work.',
    specs: {
      processor: 'Apple M2',
      memory: '8GB unified memory',
      storage: '256GB SSD',
      display: '15.3-inch Liquid Retina',
      graphics: 'Integrated 10-core GPU',
      battery: 'Up to 18 hours'
    },
    type: 'ultrabook'
  },
  {
    id: 6,
    slug: 'apple-macbook-pro-14-m3-pro',
    year: 2023,
    brand: 'Apple',
    name: 'MacBook Pro 14 M3 Pro',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh2OcxKzX4fkDanymFcjLKtRlz_qb-E_zAf3wsePbSew&s=10',
    price: 1799,
    description: 'A fast professional laptop with excellent battery life for creators, developers, and business users.',
    specs: {
      processor: 'Apple M3 Pro',
      memory: '18GB unified memory',
      storage: '512GB SSD',
      display: '14.2-inch Liquid Retina XDR',
      graphics: '18-core GPU',
      battery: 'Up to 18 hours'
    },
    type: 'business'
  },
  {
    id: 7,
    slug: 'apple-macbook-air-13-m3',
    year: 2024,
    brand: 'Apple',
    name: 'MacBook Air 13 M3',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGlf8nicTyU7Y12xFALSLlNt4ZsO7JHhiW_BDAcLmboQ&s',
    price: 999,
    description: 'A compact and efficient laptop for students, remote work, and everyday productivity.',
    specs: {
      processor: 'Apple M3',
      memory: '8GB unified memory',
      storage: '256GB SSD',
      display: '13.6-inch Liquid Retina',
      graphics: 'Integrated 8-core GPU',
      battery: 'Up to 18 hours'
    },
    type: 'ultrabook'
  },
  {
    id: 8,
    slug: 'apple-macbook-pro-16-m4-pro',
    year: 2024,
    brand: 'Apple',
    name: 'MacBook Pro 16 M4 Pro',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3vtmMWr77qBAu4KPtr2fKyDsB6vEMHQ7HGUKOpQXLMw&s=10',
    price: 2499,
    description: 'A high-performance professional laptop for large projects, editing, programming, and production.',
    specs: {
      processor: 'Apple M4 Pro',
      memory: '24GB unified memory',
      storage: '512GB SSD',
      display: '16.2-inch Liquid Retina XDR',
      graphics: '20-core GPU',
      battery: 'Up to 24 hours'
    },
    type: 'business'
  },
  {
    id: 9,
    slug: 'apple-macbook-air-15-m4',
    year: 2025,
    brand: 'Apple',
    name: 'MacBook Air 15 M4',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZd-PDdsmXpzWHIPwIQl1rHlElaWG80Xl4hg6LfW_kJw&s=10',
    price: 1199,
    description: 'A modern large-screen laptop that balances portability, battery life, and everyday performance.',
    specs: {
      processor: 'Apple M4',
      memory: '16GB unified memory',
      storage: '256GB SSD',
      display: '15.3-inch Liquid Retina',
      graphics: 'Integrated 10-core GPU',
      battery: 'Up to 18 hours'
    },
    type: 'ultrabook'
  },
  {
    id: 10,
    slug: 'msi-stealth-15m',
    year: 2021,
    brand: 'MSI',
    name: 'MSI Stealth 15M',
    image: 'https://www.pcworld.com/wp-content/uploads/2025/04/msi-tiger-lake-100856588-orig.jpg?quality=50&strip=all',
    price: 1199,
    description: 'A slim gaming laptop for competitive play, streaming, and demanding daily workloads.',
    specs: {
      processor: 'Intel Core i7-11375H',
      memory: '16GB RAM',
      storage: '512GB SSD',
      display: '15.6-inch Full HD 144Hz',
      graphics: 'NVIDIA GeForce RTX 3060 6GB',
      battery: 'Up to 7 hours'
    },
    type: 'gaming'
  },
  {
    id: 11,
    slug: 'msi-katana-gf66',
    year: 2022,
    brand: 'MSI',
    name: 'MSI Katana GF66',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkhzlEWIgnrk290ZVEflFKWbXSVeeUB-jmHh6-n3S6nw&s=10',
    price: 999,
    description: 'An affordable gaming laptop with strong 1080p performance and upgrade-friendly hardware.',
    specs: {
      processor: 'Intel Core i7-12700H',
      memory: '16GB RAM',
      storage: '512GB SSD',
      display: '15.6-inch Full HD 144Hz',
      graphics: 'NVIDIA GeForce RTX 3060 6GB',
      battery: 'Up to 6 hours'
    },
    type: 'gaming'
  },
  {
    id: 12,
    slug: 'msi-raider-ge78-hx',
    year: 2023,
    brand: 'MSI',
    name: 'MSI Raider GE78 HX',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAWd7oMQEeCrAMMH3DS3IK3f76N7zV2G6EXFYCQtNSHA&s=10',
    price: 2799,
    description: 'A premium gaming machine designed for high-refresh gaming, streaming, and heavy multitasking.',
    specs: {
      processor: 'Intel Core i9-13980HX',
      memory: '32GB RAM',
      storage: '1TB SSD',
      display: '17-inch QHD+ 240Hz',
      graphics: 'NVIDIA GeForce RTX 4080 12GB',
      battery: 'Up to 6 hours'
    },
    type: 'gaming'
  },
  {
    id: 13,
    slug: 'msi-cyborg-15-ai',
    year: 2024,
    brand: 'MSI',
    name: 'MSI Cyborg 15 AI',
    image: 'https://asset.msi.com/resize/image/global/product/product_175617656686eaaf7dab6de051e69db280b5d92f32.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png',
    price: 1299,
    description: 'A lightweight gaming laptop with modern AI-ready performance for play, study, and creation.',
    specs: {
      processor: 'Intel Core Ultra 7 155H',
      memory: '16GB RAM',
      storage: '1TB SSD',
      display: '15.6-inch Full HD 144Hz',
      graphics: 'NVIDIA GeForce RTX 4060 8GB',
      battery: 'Up to 8 hours'
    },
    type: 'gaming'
  },
  {
    id: 14,
    slug: 'msi-vector-16-hx',
    year: 2025,
    brand: 'MSI',
    name: 'MSI Vector 16 HX',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUYOLs7SzmNj8Xk94j4FYKOiHuQaA4IORFUS99lkUboA&s=10',
    price: 1999,
    description: 'A powerful gaming and engineering laptop for demanding games, 3D work, and technical applications.',
    specs: {
      processor: 'Intel Core Ultra 9 275HX',
      memory: '32GB RAM',
      storage: '1TB SSD',
      display: '16-inch QHD+ 240Hz',
      graphics: 'NVIDIA GeForce RTX 5070 Ti 12GB',
      battery: 'Up to 7 hours'
    },
    type: 'gaming'
  },
  {
    id: 15,
    slug: 'asus-rog-zephyrus-g14',
    year: 2025,
    brand: 'ASUS',
    name: 'ROG Zephyrus G14',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIgTpox5TxigxQh0178aYUy13YLLX7y2b3WR8dUMwcnA&s=10',
    price: 1999,
    description: 'A compact premium gaming laptop that combines portability with excellent gaming and creative performance.',
    specs: {
      processor: 'AMD Ryzen AI 9 HX 370',
      memory: '32GB RAM',
      storage: '1TB SSD',
      display: '14-inch 3K OLED 120Hz',
      graphics: 'NVIDIA GeForce RTX 5070 8GB',
      battery: 'Up to 10 hours'
    },
    type: 'gaming'
  },
  {
    id: 16,
    slug: 'lenovo-thinkpad-t14-gen-5',
    year: 2024,
    brand: 'Lenovo',
    name: 'ThinkPad T14 Gen 5',
    image: 'https://mustafacomputers.pk/cdn/shop/files/T14-4.jpg?v=1738440681',
    price: 1399,
    description: 'A durable business laptop with a comfortable keyboard and dependable performance for office work.',
    specs: {
      processor: 'Intel Core Ultra 7 155U',
      memory: '16GB RAM',
      storage: '512GB SSD',
      display: '14-inch WUXGA',
      graphics: 'Intel integrated graphics',
      battery: 'Up to 15 hours'
    },
    type: 'business'
  },
  {
    id: 17,
    slug: 'lenovo-yoga-7i-2-in-1',
    year: 2024,
    brand: 'Lenovo',
    name: 'Yoga 7i 2-in-1 14',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGlf8nicTyU7Y12xFALSLlNt4ZsO7JHhiW_BDAcLmboQ&s',
    price: 899,
    description: 'A versatile 360-degree convertible laptop with touchscreen support for note-taking, presentations, and travel.',
    specs: {
      processor: 'Intel Core Ultra 5 125U',
      memory: '16GB RAM',
      storage: '512GB SSD',
      display: '14-inch WUXGA Touch',
      graphics: 'Intel Graphics',
      battery: 'Up to 14 hours'
    },
    type: '2-in-1'
  },
  {
    id: 18,
    slug: 'asus-vivobook-go-15',
    year: 2024,
    brand: 'ASUS',
    name: 'VivoBook Go 15',
    image: 'https://mustafacomputers.pk/cdn/shop/files/T14-4.jpg?v=1738440681',
    price: 549,
    description: 'An affordable, reliable everyday laptop built for students, web browsing, and document editing.',
    specs: {
      processor: 'AMD Ryzen 5 7520U',
      memory: '8GB RAM',
      storage: '512GB SSD',
      display: '15.6-inch Full HD',
      graphics: 'AMD Radeon Graphics',
      battery: 'Up to 10 hours'
    },
    type: 'budget'
  }
];

export default laptops;
export { laptops };
