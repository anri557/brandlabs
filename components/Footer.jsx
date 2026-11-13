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
            <li><Link to="/">{t.nav.home}</Link></li>
            <li><Link to="/iPhones">{t.nav.iphones}</Link></li>
            <li><Link to="/Android">{t.nav.android}</Link></li>
            <li><Link to="/Watches">{t.nav.watches}</Link></li>
            <li><Link to="/Vision">{t.nav.vision}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="site-footer__heading">{t.footer.customerCare}</h3>
          <ul className="site-footer__links">
            <li><Link to="/Account">{t.footer.myAccount}</Link></li>
            <li><Link to="/Wishlist">{t.footer.wishlist}</Link></li>
            <li><Link to="/Cart">{t.footer.shoppingCart}</Link></li>
            <li><Link to="/admin">{t.footer.adminPanel}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="site-footer__heading">{t.footer.support}</h3>
          <ul className="site-footer__links">
            <li><a href="tel:+995555910817">+995 555 91 08 17</a></li>
            <li><span>{t.footer.address}</span></li>
            <li><span>{t.footer.warranty}</span></li>
            <li>
              <a
                href="https://www.instagram.com/brandlaptops7/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram: {t.footer.instagram}
              </a>
            </li>
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
