import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCartShopping, FaHeart, FaRegHeart, FaCheck } from 'react-icons/fa6';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';

const LaptopCard = ({ laptop }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const { lang, t } = useLanguage();
  const [added, setAdded] = useState(false);
  const wishlisted = isInWishlist(laptop.id);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(laptop, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(laptop);
  };

  const handleImgError = (e) => {
    e.currentTarget.src = '/technolab_georgia.jpg';
  };

  const devices =
    Array.isArray(laptop.compatibleWith) && laptop.compatibleWith.length > 0
      ? laptop.compatibleWith
      : ['iPhone', 'Samsung', 'Xiaomi'];

  return (
    <article className="product-card">
      <div className="product-card__media-wrap">
        <Link to={`/laptop/${laptop.slug}`} className="product-card__media-link" aria-label={laptop.name}>
          <div className="product-card__img-stage">
            <img
              src={laptop.image}
              alt={laptop.name}
              loading="lazy"
              onError={handleImgError}
              className="product-card__img"
            />
          </div>
        </Link>
        <button
          type="button"
          className={`product-card__wish-btn${wishlisted ? ' is-active' : ''}`}
          onClick={handleWishlist}
          aria-label={wishlisted ? `Remove ${laptop.name} from wishlist` : `Add ${laptop.name} to wishlist`}
          aria-pressed={wishlisted}
        >
          {wishlisted ? <FaHeart aria-hidden="true" /> : <FaRegHeart aria-hidden="true" />}
        </button>
      </div>

      <div className="product-card__body">
        <div className="product-card__meta">
          <span className="product-card__brand">{laptop.brand}</span>
          <span className="product-card__stock">
            {lang === 'en' ? 'In Stock' : 'მარაგშია'}
          </span>
        </div>

        <h3 className="product-card__title">
          <Link to={`/laptop/${laptop.slug}`}>{laptop.name}</Link>
        </h3>

        <div className="product-card__compat" aria-label="Compatible devices">
          {devices.map((device) => (
            <span key={device} className="product-card__compat-pill">
              {device}
            </span>
          ))}
        </div>

        <p className="product-card__specs">
          {laptop.specs.processor} · {laptop.specs.memory}
        </p>

        <div className="product-card__footer">
          <span className="product-card__price">{laptop.price.toLocaleString()} ₾</span>
          <button
            type="button"
            className={`product-card__cart-btn${added ? ' is-added' : ''}`}
            onClick={handleAdd}
            aria-label={`${t.card.add} — ${laptop.name}`}
          >
            {added ? <FaCheck aria-hidden="true" /> : <FaCartShopping aria-hidden="true" />}
            <span>{added ? t.card.added : t.card.add}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default LaptopCard;
