import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import LaptopCard from '../../components/LaptopCard';

const WishlistPage = () => {
  const { wishlist } = useStore();
  const { t } = useLanguage();

  return (
    <main className="container page-section">
      <div className="section-header">
        <h1 className="catalog-header__title">
          {t.wishlistPage.title} ({wishlist.length})
        </h1>
        <Link to="/Deals" className="section-link">
          {t.wishlistPage.browseAll}
        </Link>
      </div>

      {wishlist.length > 0 ? (
        <div className="product-grid">
          {wishlist.map((laptop) => (
            <LaptopCard key={laptop.id} laptop={laptop} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>{t.wishlistPage.emptyTitle}</h2>
          <p>{t.wishlistPage.emptyText}</p>
          <Link to="/" className="btn-primary">
            <FaArrowLeft aria-hidden="true" /> {t.wishlistPage.backHome}
          </Link>
        </div>
      )}
    </main>
  );
};

export default WishlistPage;
