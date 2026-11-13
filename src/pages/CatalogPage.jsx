import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LaptopCard from '../../components/LaptopCard';
import { useLanguage } from '../../context/LanguageContext';
import { useStore } from '../../context/StoreContext';

const DEVICES = ['All', 'iPhone', 'Samsung', 'Xiaomi'];

const CatalogPage = ({ pageKey = 'deals', defaultType = 'all' }) => {
  const { t } = useLanguage();
  const { products } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const deviceParam = searchParams.get('device');
  const selectedDevice = deviceParam && DEVICES.includes(deviceParam) ? deviceParam : 'All';
  const queryParam = searchParams.get('q') || '';

  const [selectedType, setSelectedType] = useState(defaultType);
  const [sortBy, setSortBy] = useState('featured');

  const pageMeta = t.catalog.pages[pageKey] || t.catalog.pages.deals;

  const types = [
    { id: 'all', label: t.catalog.allTypes },
    { id: 'chargers', label: t.home.categories.chargers },
    { id: 'cases', label: t.home.categories.cases },
    { id: 'powerbanks', label: t.home.categories.powerbanks },
    { id: 'screen-protectors', label: t.home.categories['screen-protectors'] },
  ];

  const filtered = useMemo(() => {
    const q = queryParam.trim().toLowerCase();
    let list = products.filter((item) => {
      const matchesDevice =
        selectedDevice === 'All' ||
        (Array.isArray(item.compatibleWith) && item.compatibleWith.includes(selectedDevice)) ||
        item.specs.storage.toLowerCase().includes(selectedDevice.toLowerCase());
      const matchesType = selectedType === 'all' || item.type === selectedType;
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.specs.storage.toLowerCase().includes(q) ||
        item.specs.processor.toLowerCase().includes(q);
      return matchesDevice && matchesType && matchesQuery;
    });

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      list = [...list].sort((a, b) => b.year - a.year);
    }
    return list;
  }, [products, selectedDevice, selectedType, sortBy, queryParam]);

  const handleDeviceChange = (device) => {
    const next = new URLSearchParams(searchParams);
    if (device === 'All') {
      next.delete('device');
    } else {
      next.set('device', device);
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

      <div className="catalog-filters" aria-label="Filter accessories">
        <div className="filter-group" role="group" aria-label="Filter by compatible device">
          {DEVICES.map((device) => (
            <button
              key={device}
              type="button"
              onClick={() => handleDeviceChange(device)}
              className={`filter-pill${selectedDevice === device ? ' is-active' : ''}`}
              aria-pressed={selectedDevice === device}
            >
              {device === 'All' ? t.catalog.allBrands : device}
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
          {filtered.map((item) => (
            <LaptopCard key={item.id} laptop={item} />
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
