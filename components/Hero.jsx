import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsController } from 'react-icons/bs';
import { IoLaptopOutline, IoShieldCheckmarkOutline, IoFlashOutline } from 'react-icons/io5';
import { RiTentLine } from 'react-icons/ri';
import { MdOutlineLocalOffer, MdOutlineLocalShipping, MdOutlineSupportAgent } from 'react-icons/md';
import { FaArrowRight } from 'react-icons/fa6';
import laptops from '../data/laptops.js';
import LaptopCard from './LaptopCard';
import { useLanguage } from '../context/LanguageContext';

const BRANDS = ['Apple', 'MSI', 'ASUS', 'Lenovo'];

const VALUE_ICONS = [
  <IoShieldCheckmarkOutline key="shield" size={26} aria-hidden="true" />,
  <MdOutlineLocalShipping key="ship" size={26} aria-hidden="true" />,
  <IoFlashOutline key="flash" size={26} aria-hidden="true" />,
  <MdOutlineSupportAgent key="support" size={26} aria-hidden="true" />,
];

const Hero = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const categories = [
    { id: 'gaming', name: t.home.categories.gaming, icon: <BsController aria-hidden="true" />, route: '/Gaming' },
    { id: 'business', name: t.home.categories.business, icon: <IoLaptopOutline aria-hidden="true" />, route: '/Business' },
    { id: 'ultrabook', name: t.home.categories.ultrabook, icon: <IoLaptopOutline aria-hidden="true" />, route: '/Education' },
    { id: '2-in-1', name: t.home.categories['2-in-1'], icon: <RiTentLine aria-hidden="true" />, route: '/Business' },
    { id: 'budget', name: t.home.categories.budget, icon: <MdOutlineLocalOffer aria-hidden="true" />, route: '/Deals' },
  ];

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const filteredLaptops = selectedCategory
    ? laptops.filter((laptop) => laptop.type === selectedCategory)
    : [];

  const appleLaptops = laptops.filter((laptop) => laptop.brand === 'Apple');
  const msiLaptops = laptops.filter((laptop) => laptop.brand === 'MSI');
  const otherLaptops = laptops.filter(
    (laptop) => laptop.brand !== 'Apple' && laptop.brand !== 'MSI'
  );

  const activeCategoryObj = categories.find((c) => c.id === selectedCategory);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <div className="home-page">
      <section className="hero-banner" aria-label="Featured promotion">
        <Link to="/Deals" className="hero-banner__link" aria-label={t.home.viewAllLaptops}>
          <picture>
            <source media="(max-width: 479px)" srcSet="/heromobile.png" />
            <img
              src="/heroImg.jpeg"
              alt="Precision for Productivity. Power for Play. Shop gaming rigs, workstations, and premium laptop brands."
              fetchpriority="high"
              width="1600"
              height="560"
              className="hero-banner__img"
            />
          </picture>
        </Link>
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
              {t.home.viewAllLaptops} <FaArrowRight size={13} aria-hidden="true" />
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
              {activeCategoryObj?.name} ({filteredLaptops.length})
            </h2>
            <Link to={activeCategoryObj?.route || '/Deals'} className="section-link">
              {t.home.openFullCatalog} <FaArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
          <div className="product-grid">
            {filteredLaptops.map((laptop) => (
              <LaptopCard key={laptop.id} laptop={laptop} />
            ))}
          </div>
        </section>
      )}

      <section className="page-section container" aria-labelledby="apple-heading">
        <div className="section-header">
          <h2 id="apple-heading" className="section-title">
            {t.home.appleHeading}
          </h2>
          <Link to="/Deals?brand=Apple" className="section-link">
            {t.home.seeAllApple} <FaArrowRight size={13} aria-hidden="true" />
          </Link>
        </div>
        <div className="product-grid">
          {appleLaptops.map((laptop) => (
            <LaptopCard key={laptop.id} laptop={laptop} />
          ))}
        </div>
      </section>

      <section className="page-section container" aria-labelledby="msi-heading">
        <div className="section-header">
          <h2 id="msi-heading" className="section-title">
            {t.home.msiHeading}
          </h2>
          <Link to="/Gaming" className="section-link">
            {t.home.seeAllGaming} <FaArrowRight size={13} aria-hidden="true" />
          </Link>
        </div>
        <div className="product-grid">
          {msiLaptops.map((laptop) => (
            <LaptopCard key={laptop.id} laptop={laptop} />
          ))}
        </div>
      </section>

      <section className="page-section container" aria-labelledby="more-brands-heading">
        <div className="section-header">
          <h2 id="more-brands-heading" className="section-title">
            {t.home.moreBrandsHeading}
          </h2>
          <Link to="/Business" className="section-link">
            {t.home.exploreBusiness} <FaArrowRight size={13} aria-hidden="true" />
          </Link>
        </div>
        <div className="product-grid">
          {otherLaptops.map((laptop) => (
            <LaptopCard key={laptop.id} laptop={laptop} />
          ))}
        </div>
      </section>

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
