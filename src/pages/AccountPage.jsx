import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';

const AccountPage = () => {
  const { cartCount, wishlist } = useStore();
  const { t } = useLanguage();

  return (
    <main className="container page-section">
      <div className="catalog-header">
        <div>
          <h1 className="catalog-header__title">{t.accountPage.title}</h1>
          <p className="catalog-header__subtitle">{t.accountPage.subtitle}</p>
        </div>
      </div>

      <div className="trust-grid">
        <div className="trust-card">
          <h2 className="trust-card__title">{t.accountPage.savedWishlist}</h2>
          <p className="trust-card__text">
            {t.accountPage.savedCountPrefix} {wishlist.length} {t.accountPage.savedCountSuffix}
          </p>
          <Link to="/Wishlist" className="section-link">
            {t.accountPage.viewWishlist}
          </Link>
        </div>

        <div className="trust-card">
          <h2 className="trust-card__title">{t.accountPage.shoppingCart}</h2>
          <p className="trust-card__text">
            {t.accountPage.cartCountPrefix} {cartCount} {t.accountPage.cartCountSuffix}
          </p>
          <Link to="/Cart" className="section-link">
            {t.accountPage.goToCart}
          </Link>
        </div>

        <div className="trust-card">
          <h2 className="trust-card__title">{t.accountPage.warrantySupport}</h2>
          <p className="trust-card__text">{t.accountPage.warrantyText}</p>
          <a href="tel:+995555910817" className="section-link">
            {t.accountPage.emailSupport}
          </a>
        </div>
      </div>
    </main>
  );
};

export default AccountPage;
