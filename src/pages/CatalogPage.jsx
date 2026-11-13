import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LaptopCard from '../../components/LaptopCard';
import { useLanguage } from '../../context/LanguageContext';
import { useStore } from '../../context/StoreContext';

const BRANDS = ['All', 'Samsung', 'Google', 'Xiaomi'];

const CatalogPage = ({ pageKey = 'deals', defaultType = 'all' }) => {
  const { t } = useLanguage();
  const { products: laptops } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const brandParam = searchParams.get('brand');
  const selectedBrand = brandParam && BRANDS.includes(brandParam) ? brandParam : 'All';
  const queryParam = searchParams.get('q') || '';

  const [selectedType, setSelectedType] = useState(defaultType);
  const [sortBy, setSortBy] = useState('featured');

  const pageMeta = t.catalog.pages[pageKey] || t.catalog.pages.deals;

  const types = [
    { id: 'all', label: t.catalog.allTypes },
    { id: 'foldable', label: t.home.categories.foldable },
    { id: 'flagship', label: t.home.categories.flagship },
    { id: 'camera', label: t.home.categories.camera },
    { id: 'compact', label: t.home.categories.compact },
    { id: 'budget', label: t.home.categories.budget },
  ];

  const filtered = useMemo(() => {
    const q = queryParam.trim().toLowerCase();
    let list = laptops.filter((item) => {
      const matchesBrand = selectedBrand === 'All' || item.brand === selectedBrand;
      const matchesType = selectedType === 'all' || item.type === selectedType;
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.specs.processor.toLowerCase().includes(q);
      return matchesBrand && matchesType && matchesQuery;
    });

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      list = [...list].sort((a, b) => b.year - a.year);
    }
    return list;
  }, [laptops, selectedBrand, selectedType, sortBy, queryParam]);

  const handleBrandChange = (brand) => {
    const next = new URLSearchParams(searchParams);
    if (brand === 'All') {
      next.delete('brand');
    } else {
      next.set('brand', brand);
    }
    setSearchParams(next, { replace: true });
  };

  return (
    <main className="container page-section">
      <div className="catalog-header">
        <div>
          <h1 className="catalog-header__title">{pageMeta.title}</h1>
          <p className="catalog-header__subtitle">
            {queryParam ? `${t.catalog.showingResults} "${queryParam}"` : pageMeta.subtitle}
          </p>
        </div>

        <div className="catalog-sort">
          <label htmlFor="catalog-sort-select" className="catalog-sort__label">
            {t.catalog.sortBy}
          </label>
          <select
            id="catalog-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="catalog-sort__select"
          >
            <option value="featured">{t.catalog.sortFeatured}</option>
            <option value="price-asc">{t.catalog.sortPriceAsc}</option>
            <option value="price-desc">{t.catalog.sortPriceDesc}</option>
            <option value="newest">{t.catalog.sortNewest}</option>
          </select>
        </div>
      </div>

      <div className="catalog-filters" aria-label="Filter laptops">
        <div className="filter-group" role="group" aria-label="Filter by brand">
          {BRANDS.map((brand) => (
            <button
              key={brand}
              type="button"
              onClick={() => handleBrandChange(brand)}
              className={`filter-pill${selectedBrand === brand ? ' is-active' : ''}`}
              aria-pressed={selectedBrand === brand}
            >
              {brand === 'All' ? t.catalog.allBrands : brand}
            </button>
          ))}
        </div>

        <div className="filter-group" role="group" aria-label="Filter by category">
          {types.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setSelectedType(type.id)}
              className={`filter-pill${selectedType === type.id ? ' is-active' : ''}`}
              aria-pressed={selectedType === type.id}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="product-grid">
          {filtered.map((laptop) => (
            <LaptopCard key={laptop.id} laptop={laptop} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>{t.catalog.noMatchesTitle}</h2>
          <p>{t.catalog.noMatchesText}</p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              setSelectedType('all');
              setSearchParams({}, { replace: true });
            }}
          >
            {t.catalog.resetFilters}
          </button>
        </div>
      )}
    </main>
  );
};

export default CatalogPage;
