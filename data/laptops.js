const laptops = [
  {
    id: 1,
    slug: 'baseus-20w-pd-usb-c-charger',
    year: 2025,
    brand: 'Baseus',
    name: 'Baseus 20W PD სწრაფი დამტენი (USB-C)',
    image: 'https://img.joomcdn.net/7fd8468ab64e1b52a6ba631beceb59dfccea838a_original.jpeg',
    price: 35,
    compatibleWith: ['iPhone', 'Samsung', 'Xiaomi'],
    description: 'კომპაქტური 20W Power Delivery სწრაფი დამტენი გადახურებისა და ძაბვის ცვალებადობისგან დაცვით.',
    specs: {
      processor: '20W Power Delivery 3.0',
      memory: 'USB-C პორტი',
      storage: 'iPhone / Samsung / Xiaomi',
      display: 'დაცვა გადახურებისგან',
      graphics: '100-240V გლობალური ძაბვა',
      battery: '1 წლიანი გარანტია'
    },
    type: 'chargers'
  },
  {
    id: 2,
    slug: 'hoco-100w-type-c-fast-cable',
    year: 2025,
    brand: 'Hoco',
    name: 'Hoco 100W სწრაფი კაბელი (Type-C to Type-C)',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPX-GCUeDYnG2P_OnrPhDspnGHnMf8joovU4dwOgzbOtvG6HlyF5nDiZn9&s=10',
    price: 18,
    compatibleWith: ['iPhone', 'Samsung', 'Xiaomi'],
    description: 'გამძლე ნეილონის გარსაცმის მქონე 1.2მ სიგრძის კაბელი სწრაფი დატენვისა და მონაცემთა გადაცემისთვის.',
    specs: {
      processor: '100W / 5A სწრაფი დატენვა',
      memory: 'Type-C to Type-C (1.2მ)',
      storage: 'iPhone 15/16 · Samsung · Xiaomi',
      display: 'ნეილონის გამძლე გარსი',
      graphics: '480Mbps მონაცემთა გადაცემა',
      battery: '1 წლიანი გარანტია'
    },
    type: 'chargers'
  },
  {
    id: 3,
    slug: 'borofone-30w-gan-dual-charger',
    year: 2025,
    brand: 'Borofone',
    name: 'Borofone 30W GaN ორპორტიანი დამტენი',
    image: 'https://kalo.ge/wp-content/uploads/2026/05/00c7a56810878c79ed6610899a176f75.webp',
    price: 45,
    compatibleWith: ['iPhone', 'Samsung', 'Xiaomi'],
    description: 'GaN ტექნოლოგიის მძლავრი დამტენი USB-C და USB-A პორტებით ორი მოწყობილობის ერთდროულად დასატენად.',
    specs: {
      processor: '30W GaN PD + QC 3.0',
      memory: 'USB-C + USB-A',
      storage: 'iPhone / Samsung / Xiaomi',
      display: 'კომპაქტური კორპუსი',
      graphics: 'ჭკვიანი სიმძლავრის განაწილება',
      battery: '1 წლიანი გარანტია'
    },
    type: 'chargers'
  },
  {
    id: 4,
    slug: 'magsafe-silicone-case-iphone',
    year: 2025,
    brand: 'Baseus',
    name: 'MagSafe სილიკონის ქეისი (ხავერდის შიდა ფენით)',
    image: 'data:image/webp;base64,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',
    price: 29,
    compatibleWith: ['iPhone'],
    description: 'რბილი სენსორული ზედაპირი, ძლიერი MagSafe მაგნიტი და კამერის ჩარჩოს დამატებითი დაცვა.',
    specs: {
      processor: 'ჩაშენებული MagSafe მაგნიტი',
      memory: 'თხევადი სილიკონი + მიკროფიბრა',
      storage: 'iPhone 13 / 14 / 15 / 16 სერია',
      display: 'კამერის და ეკრანის ამაღლებული კიდე',
      graphics: 'არ იტოვებს თითის ანაბეჭდებს',
      battery: 'უსადენო დატენვასთან თავსებადი'
    },
    type: 'cases'
  },
  {
    id: 5,
    slug: 'clear-shockproof-case-samsung-xiaomi',
    year: 2025,
    brand: 'Hoco',
    name: 'გამჭვირვალე დარტყმაგამძლე ქეისი (Anti-Yellow)',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfzKeUqBPaGt1fQcB5cNvWxujmr6zKqXkTVyPdTicB2Q&s=10',
    price: 22,
    compatibleWith: ['iPhone', 'Samsung', 'Xiaomi'],
    description: 'კრისტალურად გამჭვირვალე ქეისი გამაგრებული კუთხეებით, რომელიც არ ყვითლდება დროთა განმავლობაში.',
    specs: {
      processor: 'გამაგრებული Air-Guard კუთხეები',
      memory: 'TPU + პოლიკარბონატი',
      storage: 'iPhone / Samsung / Xiaomi',
      display: 'არ ყვითლდება (Anti-Yellow)',
      graphics: 'თხელი 1.5მმ პროფილი',
      battery: 'დაცვა ვარდნისგან'
    },
    type: 'cases'
  },
  {
    id: 6,
    slug: 'remax-matte-armor-case',
    year: 2025,
    brand: 'Remax',
    name: 'Remax მატე დამცავი ქეისი',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWSnCh3gftiJEb3aAK_kgq78hSQvzlJGsjMsJVTqPLDndyjEtU20OEcsF1&s=10',
    price: 25,
    compatibleWith: ['Samsung', 'Xiaomi'],
    description: 'მატე ტექსტურის ქეისი მოცურების საწინააღმდეგო ზედაპირითა და ზუსტი ღილაკების მორგებით.',
    specs: {
      processor: 'დარტყმაგამძლე კონსტრუქცია',
      memory: 'მატე პოლიკარბონატი',
      storage: 'Samsung S/A · Xiaomi Redmi/Pro',
      display: 'ზუსტი კამერის ჭრილები',
      graphics: 'მსუბუქი და კომფორტული',
      battery: 'უსადენო დატენვასთან თავსებადი'
    },
    type: 'cases'
  },
  {
    id: 7,
    slug: 'baseus-10000mah-20w-power-bank',
    year: 2025,
    brand: 'Baseus',
    name: 'Baseus 10,000mAh 20W სწრაფი პაუერბანკი',
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRdODWLcRTAUIa_IdTP8Mqub1yfh9Opw9qSrx1IyqZs4gswIbj3yCIhabCaPIEUK2w4-MTQkFc9Vg8YulWz7ak5ldBElp_ZQIQadtC3GCrJ0j5iltmB0AP8L8TIzRboIT21eDkBG3g&usqp=CAc',
    price: 59,
    compatibleWith: ['iPhone', 'Samsung', 'Xiaomi'],
    description: 'ჯიბის ზომის პაუერბანკი ციფრული ეკრანით და 20W PD სწრაფი დატენვით ყოველდღიური მოხმარებისთვის.',
    specs: {
      processor: '20W PD + 22.5W QC',
      memory: '10,000mAh მოცულობა',
      storage: 'iPhone / Samsung / Xiaomi',
      display: 'LED ციფრული ინდიკატორი',
      graphics: '2x USB-A + 1x Type-C',
      battery: '1 წლიანი გარანტია'
    },
    type: 'powerbanks'
  },
  {
    id: 8,
    slug: 'baseus-20000mah-22-5w-power-bank',
    year: 2025,
    brand: 'Baseus',
    name: 'Baseus 20,000mAh 22.5W პაუერბანკი (ჩაშენებული კაბელით)',
    image: 'https://cdn.salla.sa/wYZaX/TIfncVXieKlqGTGIX35HMsbcsuPBe43piCsPo6yK.png',
    price: 85,
    compatibleWith: ['iPhone', 'Samsung', 'Xiaomi'],
    description: 'მაღალი ტევადობის პაუერბანკი მგზავრობისთვის, რომელიც ტელეფონს 4-ჯერ სრულად ტენის.',
    specs: {
      processor: '22.5W SuperCharge + 20W PD',
      memory: '20,000mAh მოცულობა',
      storage: 'iPhone / Samsung / Xiaomi',
      display: 'ციფრული პროცენტის ჩვენება',
      graphics: 'ჩაშენებული Type-C კაბელი',
      battery: '1 წლიანი გარანტია'
    },
    type: 'powerbanks'
  },
  {
    id: 9,
    slug: 'hoco-10000mah-magsafe-power-bank',
    year: 2025,
    brand: 'Hoco',
    name: 'Hoco 10,000mAh MagSafe უსადენო პაუერბანკი',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIPaDh6B2YPGFGWPkhaVe4mRfMLh1KY85NgDPXHYO3sw&s',
    price: 75,
    compatibleWith: ['iPhone', 'Samsung', 'Xiaomi'],
    description: 'მაგნიტური უსადენო დამუხტვა 15W სიმძლავრით და 20W Type-C პორტით კაბელით დასატენადაც.',
    specs: {
      processor: '15W MagSafe + 20W PD კაბელით',
      memory: '10,000mAh Li-Polymer',
      storage: 'iPhone / Samsung / Xiaomi',
      display: 'ძლიერი მაგნიტური ფიქსაცია',
      graphics: 'თხელი და მსუბუქი დიზაინი',
      battery: '1 წლიანი გარანტია'
    },
    type: 'powerbanks'
  },
  {
    id: 10,
    slug: 'privacy-anti-spy-tempered-glass',
    year: 2025,
    brand: 'Baseus',
    name: 'Privacy (ანტი-ჯაშუში) დამცავი ბრონი 9H',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREFX1qKuy3CPo1tsmAV4ktnFgnhkQVpsLaddMEPKlezOQLFFY-Bnh2kUOF&s=10',
    price: 20,
    compatibleWith: ['iPhone', 'Samsung', 'Xiaomi'],
    description: 'ეკრანის დამცავი მინა 28° დახრის კუთხით დაბნელებით — გვერდიდან ეკრანი არ იკითხება.',
    specs: {
      processor: '9H სიმაგრის ნაწრთობი მინა',
      memory: '28° Privacy ფილტრი',
      storage: 'iPhone / Samsung / Xiaomi',
      display: 'Full Glue სრული დაკვრა',
      graphics: 'ოლეოფობიური საფარი',
      battery: 'მარტივი დაკვრა ბუშტების გარეშე'
    },
    type: 'screen-protectors'
  },
  {
    id: 11,
    slug: 'anti-static-full-glue-glass',
    year: 2025,
    brand: 'Hoco',
    name: 'Anti-Static Full Glue სრული დაკვრის ბრონი',
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRaWehepCWDxdUoFrPathi2AzfXln3ASqU-8-_NJ2G4x2mtL_d__VZcZyI1Jc9mbVNsyZCnLO4P3WO-_bBq0kmflx4ZY4XwDq2FJQ1FBTIzivI_GcR2LJgkh4mPIiFiaX4bSyQM_0M&usqp=CAc',
    price: 15,
    compatibleWith: ['iPhone', 'Samsung', 'Xiaomi'],
    description: 'ანტისტატიკური ეკრანის დამცავი მინა, რომელიც არ იზიდავს მტვერს დაკვრისას და სრულად ფარავს ეკრანს.',
    specs: {
      processor: '9H დარტყმაგამძლე მინა',
      memory: '0.33მმ ულტრა-თხელი',
      storage: 'iPhone / Samsung / Xiaomi',
      display: '99.9% გამჭვირვალობა',
      graphics: 'ანტისტატიკური ESD ფენა',
      battery: 'Face ID & სენსორთან თავსებადი'
    },
    type: 'screen-protectors'
  },
  {
    id: 12,
    slug: 'vidvie-ceramic-matte-screen-protector',
    year: 2025,
    brand: 'Vidvie',
    name: 'Vidvie კერამიკული მატე დამცავი (არ ტყდება)',
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSAw9if20MBpDaB73pdO_bd1emjjoCWE4S42i3HGivdSMED-8GVyO_ImGfEt4mW82f6J8XrEAwgzBPnZO2bXk0SSk7qAby5sO8jDmMblB61k_5FvM20RutO7f6qBKhUZYXUgXfxk7RUlw&usqp=CAc',
    price: 12,
    compatibleWith: ['iPhone', 'Samsung', 'Xiaomi'],
    description: 'დრეკადი კერამიკული დამცავი მატე ზედაპირით — იდეალურია თამაშებისთვის და მზეზე კითხვისთვის.',
    specs: {
      processor: 'დრეკადი PMMA კერამიკა',
      memory: 'მატე Anti-Glare ზედაპირი',
      storage: 'iPhone / Samsung / Xiaomi',
      display: 'არ იბზარება კიდეებზე',
      graphics: 'არ ტოვებს ანაბეჭდებს',
      battery: 'მარტივი მონტაჟი'
    },
    type: 'screen-protectors'
  }
];

export default laptops;
export { laptops };
