import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <Link to="/" className="site-footer__brand-wrap">
            <img
              src="/technolab_georgia.jpg"
              alt={t.brandName}
              width="44"
              height="44"
              className="site-footer__logo"
            />
            <h2 className="site-footer__brand">{t.brandName}</h2>
          </Link>
          <p className="site-footer__desc">{t.footer.desc}</p>
        </div>

        <div>
          <h3 className="site-footer__heading">{t.footer.explore}</h3>
          <ul className="site-footer__links">
            <li><Link to="/">{t.nav.home}</Link></li>
            <li><Link to="/Chargers">{t.nav.chargers}</Link></li>
            <li><Link to="/Cases">{t.nav.cases}</Link></li>
            <li><Link to="/PowerBanks">{t.nav.powerbanks}</Link></li>
            <li><Link to="/ScreenProtectors">{t.nav.screenProtectors}</Link></li>
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
            <li><span>{t.footer.address}</span></li>
            <li><span>{t.footer.warranty}</span></li>
            <li><span>iPhone · Samsung · Xiaomi</span></li>
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
