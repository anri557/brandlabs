import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  IoFlashOutline,
  IoShieldCheckmarkOutline,
  IoPhonePortraitOutline,
  IoBatteryChargingOutline,
} from 'react-icons/io5';
import { MdOutlineLocalShipping, MdOutlineSupportAgent, MdOutlineCable } from 'react-icons/md';
import { FaArrowRight } from 'react-icons/fa6';
import LaptopCard from './LaptopCard';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';

const COMPATIBILITY_BRANDS = ['iPhone', 'Samsung', 'Xiaomi'];

const VALUE_ICONS = [
  <IoShieldCheckmarkOutline key="shield" size={26} aria-hidden="true" />,
  <MdOutlineLocalShipping key="ship" size={26} aria-hidden="true" />,
  <IoFlashOutline key="flash" size={26} aria-hidden="true" />,
  <MdOutlineSupportAgent key="support" size={26} aria-hidden="true" />,
];

const Hero = () => {
  const { t } = useLanguage();
  const { products } = useStore();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const categories = [
    { id: 'chargers', name: t.home.categories.chargers, icon: <MdOutlineCable aria-hidden="true" />, route: '/Chargers' },
    { id: 'cases', name: t.home.categories.cases, icon: <IoPhonePortraitOutline aria-hidden="true" />, route: '/Cases' },
    { id: 'powerbanks', name: t.home.categories.powerbanks, icon: <IoBatteryChargingOutline aria-hidden="true" />, route: '/PowerBanks' },
    { id: 'screen-protectors', name: t.home.categories['screen-protectors'], icon: <IoShieldCheckmarkOutline aria-hidden="true" />, route: '/ScreenProtectors' },
  ];

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const matchesDevice = (item) => {
    if (selectedDevice === 'All') return true;
    return (
      (Array.isArray(item.compatibleWith) && item.compatibleWith.includes(selectedDevice)) ||
      item.specs.storage.toLowerCase().includes(selectedDevice.toLowerCase())
    );
  };

  const deviceFiltered = products.filter(matchesDevice);

  const filteredProducts = selectedCategory
    ? deviceFiltered.filter((item) => item.type === selectedCategory)
    : [];

  const chargers = deviceFiltered.filter((item) => item.type === 'chargers');
  const cases = deviceFiltered.filter((item) => item.type === 'cases');
  const powerbanks = deviceFiltered.filter((item) => item.type === 'powerbanks');
  const protectors = deviceFiltered.filter((item) => item.type === 'screen-protectors');

  // Pick 3 distinct category highlights for the hero collage
  const heroHighlights = [
    products.find((p) => p.type === 'chargers'),
    products.find((p) => p.type === 'cases'),
    products.find((p) => p.type === 'powerbanks'),
  ].filter(Boolean);

  const activeCategoryObj = categories.find((c) => c.id === selectedCategory);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <div className="home-page">
      <section className="hero-editorial container" aria-label="TechnoLab promotion">
        <div className="hero-editorial__card">
          <div className="hero-editorial__copy">
            <span className="hero-editorial__eyebrow">{t.home.heroEyebrow}</span>
            <h1 className="hero-editorial__title">{t.home.heroTitle}</h1>
            <p className="hero-editorial__text">{t.home.heroText}</p>
            <div className="hero-editorial__actions">
              <Link to="/Deals" className="btn-primary">
                {t.home.heroCta} <FaArrowRight size={13} aria-hidden="true" />
              </Link>
              <Link to="/Chargers" className="btn-secondary hero-editorial__alt">
                {t.home.categories.chargers}
              </Link>
            </div>
          </div>

          {heroHighlights.length > 0 && (
            <div className="hero-collage" aria-label="Featured accessories">
              {heroHighlights.map((item, idx) => (
                <Link
                  key={item.id}
                  to={`/laptop/${item.slug}`}
                  className={`hero-collage__tile${idx === 0 ? ' hero-collage__tile--lead' : ''}`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    fetchpriority={idx === 0 ? 'high' : undefined}
                    onError={(e) => {
                      e.currentTarget.src = '/technolab_georgia.jpg';
                    }}
                    className="hero-collage__img"
                  />
                  <span className="hero-collage__caption">
                    <span className="hero-collage__name">{item.name}</span>
                    <span className="hero-collage__price">{item.price} ₾</span>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="page-section container" aria-labelledby="categories-heading">
        <div className="section-header">
          <h2 id="categories-heading" className="section-title">
            {t.categoriesHeading}
          </h2>
          {selectedCategory ? (
            <button
              type="button"
              className="section-action-btn"
              onClick={() => setSelectedCategory(null)}
            >
              {t.home.showAllCategories}
            </button>
          ) : (
            <Link to="/Deals" className="section-link">
              {t.home.viewAllProducts} <FaArrowRight size={13} aria-hidden="true" />
            </Link>
          )}
        </div>

        <ul className="category-grid">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <li key={category.id}>
                <button
                  type="button"
                  onClick={() => handleCategoryClick(category.id)}
                  aria-pressed={isSelected}
                  className={`category-card${isSelected ? ' is-selected' : ''}`}
                >
                  <span className="category-card__icon">{category.icon}</span>
                  <span className="category-card__name">{category.name}</span>
                  <span className="category-card__arrow" aria-hidden="true">
                    <FaArrowRight size={13} />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="device-bar" role="group" aria-label={t.home.brandsHeading}>
          <span className="device-bar__label">{t.home.brandsHeading}:</span>
          <div className="device-bar__pills">
            {['All', ...COMPATIBILITY_BRANDS].map((device) => (
              <button
                key={device}
                type="button"
                onClick={() => setSelectedDevice(device)}
                aria-pressed={selectedDevice === device}
                className={`filter-pill${selectedDevice === device ? ' is-active' : ''}`}
              >
                {device === 'All' ? t.catalog.allBrands : device}
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedCategory && (
        <section className="page-section container" aria-labelledby="filtered-heading">
          <div className="section-header">
            <h2 id="filtered-heading" className="section-title">
              {activeCategoryObj?.name} ({filteredProducts.length})
            </h2>
            <Link to={activeCategoryObj?.route || '/Deals'} className="section-link">
              {t.home.openFullCatalog} <FaArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
          <div className="product-grid">
            {filteredProducts.map((item) => (
              <LaptopCard key={item.id} laptop={item} />
            ))}
          </div>
        </section>
      )}

      {chargers.length > 0 && (
        <section className="page-section container" aria-labelledby="chargers-heading">
          <div className="section-header">
            <h2 id="chargers-heading" className="section-title">
              {t.home.chargersHeading}
            </h2>
            <Link to="/Chargers" className="section-link">
              {t.home.seeAll} <FaArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
          <div className="product-grid">
            {chargers.map((item) => (
              <LaptopCard key={item.id} laptop={item} />
            ))}
          </div>
        </section>
      )}

      {cases.length > 0 && (
        <section className="page-section container" aria-labelledby="cases-heading">
          <div className="section-header">
            <h2 id="cases-heading" className="section-title">
              {t.home.casesHeading}
            </h2>
            <Link to="/Cases" className="section-link">
              {t.home.seeAll} <FaArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
          <div className="product-grid">
            {cases.map((item) => (
              <LaptopCard key={item.id} laptop={item} />
            ))}
          </div>
        </section>
      )}

      {powerbanks.length > 0 && (
        <section className="page-section container" aria-labelledby="powerbanks-heading">
          <div className="section-header">
            <h2 id="powerbanks-heading" className="section-title">
              {t.home.powerbanksHeading}
            </h2>
            <Link to="/PowerBanks" className="section-link">
              {t.home.seeAll} <FaArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
          <div className="product-grid">
            {powerbanks.map((item) => (
              <LaptopCard key={item.id} laptop={item} />
            ))}
          </div>
        </section>
      )}

      {protectors.length > 0 && (
        <section className="page-section container" aria-labelledby="protectors-heading">
          <div className="section-header">
            <h2 id="protectors-heading" className="section-title">
              {t.home.protectorsHeading}
            </h2>
            <Link to="/ScreenProtectors" className="section-link">
              {t.home.seeAll} <FaArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
          <div className="product-grid">
            {protectors.map((item) => (
              <LaptopCard key={item.id} laptop={item} />
            ))}
          </div>
        </section>
      )}

      <section className="page-section container" aria-labelledby="why-us-heading">
        <div className="section-header">
          <h2 id="why-us-heading" className="section-title">
            {t.home.whyUsHeading}
          </h2>
        </div>
        <div className="trust-grid">
          {t.home.valueProps.map((item, idx) => (
            <div key={item.title} className="trust-card">
              <div className="trust-card__icon">{VALUE_ICONS[idx]}</div>
              <h3 className="trust-card__title">{item.title}</h3>
              <p className="trust-card__text">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section container" aria-labelledby="newsletter-heading">
        <div className="newsletter-band">
          <div className="newsletter-band__copy">
            <h2 id="newsletter-heading" className="newsletter-band__title">
              {t.home.newsletterTitle}
            </h2>
            <p className="newsletter-band__text">{t.home.newsletterText}</p>
          </div>
          {subscribed ? (
            <p className="newsletter-band__confirmed">{t.home.subscribed}</p>
          ) : (
            <form className="newsletter-band__form" onSubmit={handleNewsletterSubmit}>
              <label htmlFor="newsletter-email" className="visually-hidden">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder={t.home.newsletterPlaceholder}
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="newsletter-band__input"
              />
              <button type="submit" className="btn-primary">
                {t.home.subscribe}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Hero;
