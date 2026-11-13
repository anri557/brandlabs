import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCartShopping, FaHeart, FaRegHeart, FaCheck } from 'react-icons/fa6';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';

const LaptopCard = ({ laptop }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const { t } = useLanguage();
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

  return (
    <article className="product-card">
      <div className="product-card__media-wrap">
        <Link to={`/laptop/${laptop.slug}`} className="product-card__media-link" aria-label={laptop.name}>
          <img
            src={laptop.image}
            alt={laptop.name}
            loading="lazy"
            className="product-card__img"
          />
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
          <span className="product-card__year">{laptop.year}</span>
        </div>

        <h3 className="product-card__title">
          <Link to={`/laptop/${laptop.slug}`}>{laptop.name}</Link>
        </h3>

        <p className="product-card__specs">
          {laptop.specs.processor} · {laptop.specs.memory} · {laptop.specs.storage} · {laptop.specs.graphics}
        </p>

        <div className="product-card__footer">
          <span className="product-card__price">{laptop.price.toLocaleString()} ლ</span>
          <button
            type="button"
            className={`product-card__cart-btn${added ? ' is-added' : ''}`}
            onClick={handleAdd}
            aria-label={`Add ${laptop.name} to cart`}
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
