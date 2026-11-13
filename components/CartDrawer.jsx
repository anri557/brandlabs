import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrashCan, FaXmark } from 'react-icons/fa6';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';

const CartDrawer = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    cartOpen,
    closeCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
  } = useStore();
  const { t } = useLanguage();
  const dialogRef = useRef(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (cartOpen && !dialog.open) {
      dialog.showModal();
    } else if (!cartOpen && dialog.open) {
      dialog.close();
    }
  }, [cartOpen]);

  const handleClose = () => {
    setOrderPlaced(false);
    closeCart();
  };

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      handleClose();
    }
  };

  const handleCheckout = () => {
    clearCart();
    setOrderPlaced(true);
  };

  return (
    <dialog
      ref={dialogRef}
      className="cart-drawer"
      aria-labelledby="cart-drawer-title"
      onCancel={(e) => {
        e.preventDefault();
        handleClose();
      }}
      onClick={handleBackdropClick}
    >
      <div className="cart-drawer__panel">
        <header className="cart-drawer__header">
          <h2 id="cart-drawer-title" className="cart-drawer__title">
            {t.cartPage.title} ({cartCount})
          </h2>
          <button
            type="button"
            className="cart-drawer__close"
            onClick={handleClose}
            aria-label="Close cart"
          >
            <FaXmark size={18} aria-hidden="true" />
          </button>
        </header>

        <div className="cart-drawer__body">
          {orderPlaced ? (
            <div className="cart-drawer__empty">
              <h3>{t.cartPage.confirmedTitle}</h3>
              <p>{t.cartPage.confirmedText}</p>
              <button type="button" className="btn-primary" onClick={handleClose}>
                {t.cartPage.continueShopping}
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="cart-drawer__empty">
              <h3>{t.cartPage.emptyTitle}</h3>
              <p>{t.cartPage.emptyText}</p>
              <Link to="/Deals" className="btn-primary" onClick={handleClose}>
                {t.cartPage.browsePhones}
              </Link>
            </div>
          ) : (
            <ul className="cart-drawer__list">
              {cart.map((item) => (
                <li key={item.id} className="cart-drawer__item">
                  <Link
                    to={`/laptop/${item.slug}`}
                    className="cart-drawer__thumb-wrap"
                    onClick={handleClose}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(e) => {
                        e.currentTarget.src = '/technolab_georgia.jpg';
                      }}
                      className="cart-drawer__thumb"
                    />
                  </Link>

                  <div className="cart-drawer__info">
                    <Link
                      to={`/laptop/${item.slug}`}
                      className="cart-drawer__name"
                      onClick={handleClose}
                    >
                      {item.name}
                    </Link>
                    <span className="cart-drawer__price">
                      {(item.price * item.quantity).toLocaleString()} ₾
                    </span>

                    <div className="cart-drawer__controls">
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

                      <button
                        type="button"
                        className="cart-item__remove"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <FaTrashCan size={14} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && !orderPlaced && (
          <footer className="cart-drawer__footer">
            <div className="cart-drawer__subtotal">
              <span>{t.cartPage.subtotal}</span>
              <strong>{cartSubtotal.toLocaleString()} ₾</strong>
            </div>
            <div className="cart-drawer__actions">
              <button type="button" className="btn-primary" onClick={handleCheckout}>
                {t.cartPage.completeOrder}
              </button>
              <Link to="/Cart" className="btn-secondary" onClick={handleClose}>
                {t.cartPage.title}
              </Link>
            </div>
          </footer>
        )}
      </div>
    </dialog>
  );
};

export default CartDrawer;

