import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoPhonePortraitOutline, IoShieldCheckmarkOutline, IoFlashOutline, IoCameraOutline } from 'react-icons/io5';
import { MdOutlineLocalOffer, MdOutlineLocalShipping, MdOutlineSupportAgent, MdOutlineDevices } from 'react-icons/md';
import { FaArrowRight } from 'react-icons/fa6';
import LaptopCard from './LaptopCard';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';

const BRANDS = ['Samsung', 'Google', 'Xiaomi'];

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
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const categories = [
    { id: 'foldable', name: t.home.categories.foldable, icon: <MdOutlineDevices aria-hidden="true" />, route: '/Foldables' },
    { id: 'flagship', name: t.home.categories.flagship, icon: <IoPhonePortraitOutline aria-hidden="true" />, route: '/Flagships' },
    { id: 'camera', name: t.home.categories.camera, icon: <IoCameraOutline aria-hidden="true" />, route: '/Camera' },
    { id: 'compact', name: t.home.categories.compact, icon: <IoPhonePortraitOutline aria-hidden="true" />, route: '/Deals' },
    { id: 'budget', name: t.home.categories.budget, icon: <MdOutlineLocalOffer aria-hidden="true" />, route: '/Deals' },
  ];

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const filteredProducts = selectedCategory
    ? products.filter((item) => item.type === selectedCategory)
    : [];

  const samsungPhones = products.filter((item) => item.brand === 'Samsung');
  const otherPhones = products.filter((item) => item.brand !== 'Samsung');
  const featuredFold = products[0];

  const activeCategoryObj = categories.find((c) => c.id === selectedCategory);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <div className="home-page">
      <section className="hero-editorial container" aria-label="Featured promotion">
        <div className="hero-editorial__card">
          <div className="hero-editorial__copy">
            <span className="hero-editorial__eyebrow">{t.home.heroEyebrow}</span>
            <h1 className="hero-editorial__title">{t.home.heroTitle}</h1>
            <p className="hero-editorial__text">{t.home.heroText}</p>
            <div className="hero-editorial__actions">
              <Link to="/Deals" className="btn-primary">
                {t.home.heroCta} <FaArrowRight size={13} aria-hidden="true" />
              </Link>
              {featuredFold && (
                <Link to={`/laptop/${featuredFold.slug}`} className="btn-secondary hero-editorial__alt">
                  {featuredFold.name}
                </Link>
              )}
            </div>
          </div>

          {featuredFold && (
            <Link to={`/laptop/${featuredFold.slug}`} className="hero-editorial__media">
              <img
                src={featuredFold.image}
                alt={featuredFold.name}
                fetchpriority="high"
                width="650"
                height="519"
                className="hero-editorial__img"
              />
            </Link>
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
              {t.home.viewAllPhones} <FaArrowRight size={13} aria-hidden="true" />
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

      <section className="page-section container" aria-labelledby="featured-heading">
        <div className="section-header">
          <h2 id="featured-heading" className="section-title">
            {t.home.featuredHeading}
          </h2>
          <Link to="/Deals" className="section-link">
            {t.home.seeAllPhones} <FaArrowRight size={13} aria-hidden="true" />
          </Link>
        </div>
        <div className="product-grid">
          {products.map((item) => (
            <LaptopCard key={item.id} laptop={item} />
          ))}
        </div>
      </section>

      {samsungPhones.length > 0 && (
        <section className="page-section container" aria-labelledby="samsung-heading">
          <div className="section-header">
            <h2 id="samsung-heading" className="section-title">
              {t.home.samsungHeading}
            </h2>
            <Link to="/Deals?brand=Samsung" className="section-link">
              {t.home.seeAllSamsung} <FaArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
          <div className="product-grid">
            {samsungPhones.map((item) => (
              <LaptopCard key={item.id} laptop={item} />
            ))}
          </div>
        </section>
      )}

      {otherPhones.length > 0 && (
        <section className="page-section container" aria-labelledby="more-brands-heading">
          <div className="section-header">
            <h2 id="more-brands-heading" className="section-title">
              {t.home.pixelXiaomiHeading}
            </h2>
            <Link to="/Flagships" className="section-link">
              {t.home.seeAllFlagships} <FaArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
          <div className="product-grid">
            {otherPhones.map((item) => (
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

      <section className="page-section container" aria-labelledby="brands-heading">
        <div className="section-header">
          <h2 id="brands-heading" className="section-title">
            {t.home.brandsHeading}
          </h2>
        </div>
        <div className="brand-strip">
          {BRANDS.map((brand) => (
            <Link key={brand} to={`/Deals?brand=${brand}`} className="brand-pill">
              <span>{brand}</span>
              <FaArrowRight size={13} aria-hidden="true" />
            </Link>
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
