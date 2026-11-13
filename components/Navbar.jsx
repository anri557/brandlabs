import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CiUser, CiHeart, CiShoppingCart, CiSearch } from 'react-icons/ci';
import { HiOutlineBars3 } from 'react-icons/hi2';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const { products, cartCount, wishlist } = useStore();
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();
  const mobileMenuRef = useRef(null);
  const searchRef = useRef(null);

  const categoryLinks = [
    { to: '/', label: t.nav.home },
    { to: '/Foldables', label: t.nav.foldables },
    { to: '/Flagships', label: t.nav.flagships },
    { to: '/Camera', label: t.nav.camera },
    { to: '/Deals', label: t.nav.deals },
  ];

  const query = inputValue.trim().toLowerCase();
  const filteredLaptops = query
    ? products.filter(
        (laptop) =>
          laptop.name.toLowerCase().includes(query) ||
          laptop.brand.toLowerCase().includes(query) ||
          laptop.specs.processor.toLowerCase().includes(query)
      )
    : [];

  useEffect(() => {
    if (!Object.hasOwn(HTMLElement.prototype, 'popover')) {
      import(/* @vite-ignore */ 'https://unpkg.com/@oddbird/popover-polyfill@latest/dist/popover.min.js').catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handlePointerDown = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    if (filteredLaptops.length === 1) {
      navigate(`/laptop/${filteredLaptops[0].slug}`);
    } else {
      navigate(`/Deals?q=${encodeURIComponent(inputValue.trim())}`);
    }
    setInputValue('');
    setSearchFocused(false);
  };

  const closeMobileMenu = () => {
    const menu = mobileMenuRef.current;
    if (menu && typeof menu.hidePopover === 'function') {
      try {
        menu.hidePopover();
      } catch {
        // ignore if already closed
      }
    }
  };

  const renderLanguageSwitcher = (variant = 'bar') => (
    <div
      className={`lang-switcher lang-switcher--${variant}`}
      role="group"
      aria-label={t.languageLabel}
    >
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`lang-switcher__btn${lang === 'en' ? ' is-active' : ''}`}
        aria-pressed={lang === 'en'}
      >
        English
      </button>
      <span className="lang-switcher__sep" aria-hidden="true">
        |
      </span>
      <button
        type="button"
        onClick={() => setLang('ka')}
        className={`lang-switcher__btn${lang === 'ka' ? ' is-active' : ''}`}
        aria-pressed={lang === 'ka'}
      >
        Georgian
      </button>
    </div>
  );

  return (
    <header className="site-header">
      <div className="site-header__top">
        <div className="container site-header__row">
          <Link to="/" className="site-logo">
            <img
              src="/ilab-logo.jpg"
              alt={t.brandName}
              width="44"
              height="44"
              className="site-logo__img"
            />
            <span className="site-logo__text">{t.brandName}</span>
          </Link>

          <form ref={searchRef} className="site-search" onSubmit={handleSearchSubmit} role="search">
            <label htmlFor="site-search-input" className="visually-hidden">
              {t.searchPlaceholder}
            </label>
            <input
              id="site-search-input"
              type="search"
              placeholder={t.searchPlaceholder}
              value={inputValue}
              onFocus={() => setSearchFocused(true)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setSearchFocused(false);
              }}
              onChange={(e) => {
                setInputValue(e.target.value);
                setSearchFocused(true);
              }}
              className="site-search__input"
              autoComplete="off"
            />
            <button type="submit" className="site-search__btn" aria-label="Search">
              <CiSearch size={22} aria-hidden="true" />
            </button>

            {searchFocused && query && (
              <div className="site-search__results" role="listbox" aria-label="Search results">
                {filteredLaptops.length > 0 ? (
                  filteredLaptops.slice(0, 6).map((laptop) => (
                    <Link
                      key={laptop.id}
                      to={`/laptop/${laptop.slug}`}
                      className="site-search__item"
                      onClick={() => {
                        setInputValue('');
                        setSearchFocused(false);
                      }}
                    >
                      <img
                        src={laptop.image}
                        alt=""
                        width="40"
                        height="30"
                        className="site-search__thumb"
                      />
                      <span className="site-search__item-info">
                        <span className="site-search__item-name">{laptop.name}</span>
                        <span className="site-search__item-meta">
                          {laptop.specs.processor} · {laptop.price.toLocaleString()} ლ
                        </span>
                      </span>
                    </Link>
                  ))
                ) : (
                  <div className="site-search__empty">
                    {t.searchEmpty} &ldquo;{inputValue}&rdquo;
                  </div>
                )}
              </div>
            )}
          </form>

          <div className="site-actions">
            <NavLink to="/Account" className="site-action-link" aria-label={t.account}>
              <span className="site-action-icon">
                <CiUser size={22} aria-hidden="true" />
              </span>
              <span className="site-action-link__label">{t.account}</span>
            </NavLink>
            <NavLink to="/Wishlist" className="site-action-link" aria-label={t.wishlist}>
              <span className="site-action-icon">
                <CiHeart size={22} aria-hidden="true" />
                {wishlist.length > 0 && (
                  <span className="site-badge" aria-label={`${wishlist.length}`}>
                    {wishlist.length}
                  </span>
                )}
              </span>
              <span className="site-action-link__label">{t.wishlist}</span>
            </NavLink>
            <NavLink to="/Cart" className="site-action-link" aria-label={t.cart}>
              <span className="site-action-icon">
                <CiShoppingCart size={22} aria-hidden="true" />
                {cartCount > 0 && (
                  <span className="site-badge" aria-label={`${cartCount}`}>
                    {cartCount}
                  </span>
                )}
              </span>
              <span className="site-action-link__label">{t.cart}</span>
            </NavLink>

            <button
              type="button"
              className="menu-button"
              popovertarget="mobile-nav-menu"
              popovertargetaction="toggle"
              aria-controls="mobile-nav-menu"
              aria-label="Open navigation menu"
            >
              <HiOutlineBars3 size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <nav className="site-subnav" aria-label="Primary">
        <div className="container site-subnav__inner">
          <span className="site-subnav__label">{t.allCategories}</span>
          <div className="site-subnav__right">
            <ul id="site-menu" className="site-subnav__list">
              {categoryLinks.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `site-subnav__link${isActive ? ' is-active' : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            {renderLanguageSwitcher('bar')}
          </div>
        </div>
      </nav>

      <div
        id="mobile-nav-menu"
        ref={mobileMenuRef}
        popover="auto"
        className="mobile-menu-popover"
        aria-label="Mobile navigation"
      >
        <div className="mobile-menu-popover__section">
          <p className="mobile-menu-popover__heading">{t.categoriesHeading}</p>
          <ul className="mobile-menu-popover__list">
            {categoryLinks.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `mobile-menu-popover__link${isActive ? ' is-active' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="mobile-menu-popover__section">
          <p className="mobile-menu-popover__heading">{t.languageLabel}</p>
          {renderLanguageSwitcher('menu')}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
