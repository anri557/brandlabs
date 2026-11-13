import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrashCan, FaArrowLeft } from 'react-icons/fa6';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';

const CartPage = () => {
  const { cart, cartSubtotal, updateCartQuantity, removeFromCart, clearCart } = useStore();
  const { t } = useLanguage();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCheckout = () => {
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <main className="container page-section empty-state">
        <h1>{t.cartPage.confirmedTitle}</h1>
        <p>{t.cartPage.confirmedText}</p>
        <Link to="/" className="btn-primary">
          {t.cartPage.continueShopping}
        </Link>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="container page-section empty-state">
        <h1>{t.cartPage.emptyTitle}</h1>
        <p>{t.cartPage.emptyText}</p>
        <Link to="/" className="btn-primary">
          <FaArrowLeft aria-hidden="true" /> {t.cartPage.browsePhones}
        </Link>
      </main>
    );
  }

  return (
    <main className="container page-section">
      <div className="section-header">
        <h1 className="catalog-header__title">{t.cartPage.title}</h1>
        <button type="button" className="section-action-btn" onClick={clearCart}>
          {t.cartPage.clearCart}
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <article key={item.id} className="cart-item">
              <Link to={`/laptop/${item.slug}`} className="cart-item__media">
                <img src={item.image} alt={item.name} className="cart-item__img" />
              </Link>

              <div className="cart-item__details">
                <span className="cart-item__brand">{item.brand}</span>
                <h2 className="cart-item__title">
                  <Link to={`/laptop/${item.slug}`}>{item.name}</Link>
                </h2>
                <p className="cart-item__specs">
                  {item.specs.processor} · {item.specs.memory} · {item.specs.storage}
                </p>
              </div>

              <div className="cart-item__controls">
                <div className="qty-control" aria-label={`Quantity for ${item.name}`}>
                  <button
                    type="button"
                    className="qty-control__btn"
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="qty-control__value">{item.quantity}</span>
                  <button
                    type="button"
                    className="qty-control__btn"
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <span className="cart-item__price">
                  {(item.price * item.quantity).toLocaleString()} ₾
                </span>

                <button
                  type="button"
                  className="cart-item__remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <FaTrashCan aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="cart-summary" aria-label="Order summary">
          <h2 className="cart-summary__title">{t.cartPage.summaryTitle}</h2>
          <div className="cart-summary__row">
            <span>{t.cartPage.subtotal}</span>
            <span>{cartSubtotal.toLocaleString()} ₾</span>
          </div>
          <div className="cart-summary__row">
            <span>{t.cartPage.shipping}</span>
            <span>{t.cartPage.free}</span>
          </div>
          <div className="cart-summary__total">
            <span>{t.cartPage.total}</span>
            <span>{cartSubtotal.toLocaleString()} ₾</span>
          </div>
          <button type="button" className="btn-primary cart-summary__btn" onClick={handleCheckout}>
            {t.cartPage.completeOrder}
          </button>
        </aside>
      </div>
    </main>
  );
};

export default CartPage;
