import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaCartShopping, FaCheck, FaHeart, FaRegHeart, FaArrowLeft } from 'react-icons/fa6';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';
import { MdOutlineLocalShipping } from 'react-icons/md';
import laptops from '../../data/laptops.js';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import LaptopCard from '../../components/LaptopCard';

const LaptopDetailPage = () => {
  const { slug } = useParams();
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const { t } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const laptop = laptops.find(
    (item) => item.slug === slug || String(item.id) === String(slug)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!laptop) {
    return (
      <main className="container page-section empty-state">
        <h1>{t.detail.notFoundTitle}</h1>
        <p>{t.detail.notFoundText}</p>
        <Link to="/" className="btn-primary">
          <FaArrowLeft aria-hidden="true" /> {t.detail.backHome}
        </Link>
      </main>
    );
  }

  const wishlisted = isInWishlist(laptop.id);
  const related = laptops
    .filter((item) => item.id !== laptop.id && (item.brand === laptop.brand || item.type === laptop.type))
    .slice(0, 4);

  const handleAdd = () => {
    addToCart(laptop, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  const specRows = [
    { label: t.detail.brand, value: laptop.brand },
    { label: t.detail.modelYear, value: laptop.year },
    { label: t.detail.category, value: laptop.type },
    { label: t.detail.processor, value: laptop.specs.processor },
    { label: t.detail.memory, value: laptop.specs.memory },
    { label: t.detail.storage, value: laptop.specs.storage },
    { label: t.detail.display, value: laptop.specs.display },
    { label: t.detail.graphics, value: laptop.specs.graphics },
    { label: t.detail.battery, value: laptop.specs.battery },
  ];

  return (
    <main className="container page-section">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">{t.nav.home}</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/Deals?brand=${encodeURIComponent(laptop.brand)}`}>{laptop.brand}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{laptop.name}</span>
      </nav>

      <div className="detail-layout">
        <div className="detail-media">
          <img
            src={laptop.image}
            alt={laptop.name}
            fetchpriority="high"
            className="detail-media__img"
          />
        </div>

        <div className="detail-info">
          <div className="detail-info__eyebrow">
            <span>{laptop.brand}</span>
            <span>·</span>
            <span>{laptop.year} {t.detail.modelYearSuffix}</span>
            <span>·</span>
            <span className="detail-stock">{t.detail.inStock}</span>
          </div>

          <h1 className="detail-info__title">{laptop.name}</h1>
          <p className="detail-info__price">{laptop.price.toLocaleString()} ლ</p>
          <p className="detail-info__desc">{laptop.description}</p>

          <div className="detail-highlights">
            <div className="detail-highlight-item">
              <span className="detail-highlight-item__label">{t.detail.processor}</span>
              <span className="detail-highlight-item__val">{laptop.specs.processor}</span>
            </div>
            <div className="detail-highlight-item">
              <span className="detail-highlight-item__label">{t.detail.memory}</span>
              <span className="detail-highlight-item__val">{laptop.specs.memory}</span>
            </div>
            <div className="detail-highlight-item">
              <span className="detail-highlight-item__label">{t.detail.storage}</span>
              <span className="detail-highlight-item__val">{laptop.specs.storage}</span>
            </div>
            <div className="detail-highlight-item">
              <span className="detail-highlight-item__label">{t.detail.display}</span>
              <span className="detail-highlight-item__val">{laptop.specs.display}</span>
            </div>
          </div>

          <div className="detail-purchase">
            <div className="qty-control" aria-label="Quantity selector">
              <button
                type="button"
                className="qty-control__btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="qty-control__value" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                className="qty-control__btn"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button type="button" className="btn-primary detail-add-btn" onClick={handleAdd}>
              {added ? <FaCheck aria-hidden="true" /> : <FaCartShopping aria-hidden="true" />}
              <span>{added ? t.detail.addedToCart : t.detail.addToCart}</span>
            </button>

            <button
              type="button"
              className={`btn-secondary detail-wish-btn${wishlisted ? ' is-active' : ''}`}
              onClick={() => toggleWishlist(laptop)}
              aria-pressed={wishlisted}
            >
              {wishlisted ? <FaHeart aria-hidden="true" /> : <FaRegHeart aria-hidden="true" />}
              <span>{wishlisted ? t.detail.saved : t.wishlist}</span>
            </button>
          </div>

          <div className="detail-perks">
            <div className="detail-perk">
              <IoShieldCheckmarkOutline size={20} aria-hidden="true" />
              <span>{t.detail.warrantyPerk}</span>
            </div>
            <div className="detail-perk">
              <MdOutlineLocalShipping size={20} aria-hidden="true" />
              <span>{t.detail.deliveryPerk}</span>
            </div>
          </div>
        </div>
      </div>

      <section className="detail-specs-section" aria-labelledby="specs-heading">
        <h2 id="specs-heading" className="section-title">
          {t.detail.specsHeading}
        </h2>
        <dl className="spec-list">
          {specRows.map((row) => (
            <div key={row.label} className="spec-list__row">
              <dt className="spec-list__term">{row.label}</dt>
              <dd className="spec-list__val">{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {related.length > 0 && (
        <section className="detail-related" aria-labelledby="related-heading">
          <div className="section-header">
            <h2 id="related-heading" className="section-title">
              {t.detail.similarHeading}
            </h2>
            <Link to="/Deals" className="section-link">
              {t.detail.viewAll}
            </Link>
          </div>
          <div className="product-grid">
            {related.map((item) => (
              <LaptopCard key={item.id} laptop={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default LaptopDetailPage;
