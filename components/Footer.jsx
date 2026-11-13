import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <h2 className="site-footer__brand">{t.brandName}</h2>
          <p className="site-footer__desc">{t.footer.desc}</p>
        </div>

        <div>
          <h3 className="site-footer__heading">{t.footer.explore}</h3>
          <ul className="site-footer__links">
            <li><Link to="/">{t.footer.home}</Link></li>
            <li><Link to="/Gaming">{t.footer.gaming}</Link></li>
            <li><Link to="/Business">{t.footer.business}</Link></li>
            <li><Link to="/Education">{t.footer.education}</Link></li>
            <li><Link to="/Deals">{t.footer.deals}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="site-footer__heading">{t.footer.customerCare}</h3>
          <ul className="site-footer__links">
            <li><Link to="/Account">{t.footer.myAccount}</Link></li>
            <li><Link to="/Wishlist">{t.footer.wishlist}</Link></li>
            <li><Link to="/Cart">{t.footer.shoppingCart}</Link></li>
            <li><Link to="/Accessories">{t.footer.accessories}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="site-footer__heading">{t.footer.support}</h3>
          <ul className="site-footer__links">
            <li><a href="mailto:support@brandlaptops.com">support@brandlaptops.com</a></li>
            <li><a href="tel:+18005550199">1-800-555-0199</a></li>
            <li><span>{t.footer.hours}</span></li>
          </ul>
        </div>
      </div>

      <div className="container site-footer__bottom">
        © {new Date().getFullYear()} {t.brandName}. {t.footer.rights}
      </div>
    </footer>
  );
};

export default Footer;
