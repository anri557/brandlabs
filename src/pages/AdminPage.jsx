import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPen, FaTrashCan, FaPlus, FaRotateLeft } from 'react-icons/fa6';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';

const EMPTY_FORM = {
  name: '',
  brand: 'Baseus',
  year: String(new Date().getFullYear()),
  price: '',
  type: 'chargers',
  image: '',
  description: '',
  processor: '',
  memory: '',
  storage: 'iPhone / Samsung / Xiaomi',
  display: '',
  graphics: '',
  battery: '1 წლიანი გარანტია',
};

const AdminPage = () => {
  const { products, addProduct, updateProduct, deleteProduct, resetProducts } = useStore();
  const { t } = useLanguage();
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [notice, setNotice] = useState('');

  const showNotice = (msg) => {
    setNotice(msg);
    window.setTimeout(() => setNotice(''), 2500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price) return;

    const payload = {
      name: form.name,
      brand: form.brand,
      year: form.year,
      price: form.price,
      type: form.type,
      image:
        form.image.trim() || '/technolab_georgia.jpg',
      description: form.description,
      specs: {
        processor: form.processor || '—',
        memory: form.memory || '—',
        storage: form.storage || '—',
        display: form.display || '—',
        graphics: form.graphics || '—',
        battery: form.battery || '—',
      },
    };

    if (editingId !== null) {
      updateProduct(editingId, payload);
      setEditingId(null);
    } else {
      addProduct(payload);
    }

    setForm(EMPTY_FORM);
    showNotice(t.admin.savedMsg);
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      brand: product.brand,
      year: String(product.year),
      price: String(product.price),
      type: product.type,
      image: product.image,
      description: product.description,
      processor: product.specs.processor,
      memory: product.specs.memory,
      storage: product.specs.storage,
      display: product.specs.display,
      graphics: product.specs.graphics,
      battery: product.specs.battery,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  return (
    <main className="container page-section">
      <div className="catalog-header">
        <div>
          <h1 className="catalog-header__title">{t.admin.title}</h1>
          <p className="catalog-header__subtitle">{t.admin.subtitle}</p>
        </div>
        <button type="button" className="btn-secondary" onClick={resetProducts}>
          <FaRotateLeft aria-hidden="true" /> {t.admin.reset}
        </button>
      </div>

      {notice && (
        <div className="admin-notice" role="status">
          {notice}
        </div>
      )}

      <div className="admin-layout">
        <section className="admin-panel" aria-labelledby="admin-form-heading">
          <h2 id="admin-form-heading" className="admin-panel__title">
            {editingId !== null ? t.admin.editHeading : t.admin.addHeading}
          </h2>

          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-form__grid">
              <label className="admin-field">
                <span>{t.admin.name} *</span>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="MacBook Air 15 M4"
                />
              </label>

              <label className="admin-field">
                <span>{t.admin.brand}</span>
                <select name="brand" value={form.brand} onChange={handleChange}>
                  <option value="Baseus">Baseus</option>
                  <option value="Hoco">Hoco</option>
                  <option value="Borofone">Borofone</option>
                  <option value="Remax">Remax</option>
                  <option value="Vidvie">Vidvie</option>
                </select>
              </label>

              <label className="admin-field">
                <span>{t.admin.price} *</span>
                <input
                  type="number"
                  name="price"
                  min="1"
                  required
                  value={form.price}
                  onChange={handleChange}
                  placeholder="1500"
                />
              </label>

              <label className="admin-field">
                <span>{t.admin.year}</span>
                <input
                  type="number"
                  name="year"
                  min="2018"
                  max="2030"
                  value={form.year}
                  onChange={handleChange}
                />
              </label>

              <label className="admin-field">
                <span>{t.admin.type}</span>
                <select name="type" value={form.type} onChange={handleChange}>
                  <option value="chargers">{t.home.categories.chargers}</option>
                  <option value="cases">{t.home.categories.cases}</option>
                  <option value="powerbanks">{t.home.categories.powerbanks}</option>
                  <option value="screen-protectors">{t.home.categories['screen-protectors']}</option>
                </select>
              </label>

              <label className="admin-field">
                <span>{t.admin.image}</span>
                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </label>

              <label className="admin-field">
                <span>{t.admin.processor}</span>
                <input
                  type="text"
                  name="processor"
                  value={form.processor}
                  onChange={handleChange}
                  placeholder="Apple M4 / Intel Core i7"
                />
              </label>

              <label className="admin-field">
                <span>{t.admin.memory}</span>
                <input
                  type="text"
                  name="memory"
                  value={form.memory}
                  onChange={handleChange}
                  placeholder="16GB RAM"
                />
              </label>

              <label className="admin-field">
                <span>{t.admin.storage}</span>
                <input
                  type="text"
                  name="storage"
                  value={form.storage}
                  onChange={handleChange}
                  placeholder="512GB SSD"
                />
              </label>

              <label className="admin-field">
                <span>{t.admin.display}</span>
                <input
                  type="text"
                  name="display"
                  value={form.display}
                  onChange={handleChange}
                  placeholder="14-inch Retina"
                />
              </label>

              <label className="admin-field">
                <span>{t.admin.graphics}</span>
                <input
                  type="text"
                  name="graphics"
                  value={form.graphics}
                  onChange={handleChange}
                  placeholder="RTX 4060 8GB"
                />
              </label>

              <label className="admin-field">
                <span>{t.admin.battery}</span>
                <input
                  type="text"
                  name="battery"
                  value={form.battery}
                  onChange={handleChange}
                  placeholder="Up to 15 hours"
                />
              </label>
            </div>

            <label className="admin-field">
              <span>{t.admin.description}</span>
              <textarea
                name="description"
                rows="3"
                value={form.description}
                onChange={handleChange}
              />
            </label>

            <div className="admin-form__actions">
              <button type="submit" className="btn-primary">
                <FaPlus aria-hidden="true" />
                <span>{editingId !== null ? t.admin.saveEdit : t.admin.saveAdd}</span>
              </button>
              {editingId !== null && (
                <button type="button" className="btn-secondary" onClick={cancelEdit}>
                  {t.admin.cancelEdit}
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="admin-inventory" aria-labelledby="admin-inventory-heading">
          <h2 id="admin-inventory-heading" className="admin-panel__title">
            {t.admin.inventory} ({products.length})
          </h2>

          <div className="admin-list">
            {products.map((product) => (
              <article key={product.id} className="admin-item">
                <img src={product.image} alt="" className="admin-item__img" />
                <div className="admin-item__info">
                  <Link to={`/laptop/${product.slug}`} className="admin-item__title">
                    {product.name}
                  </Link>
                  <span className="admin-item__meta">
                    {product.brand} · {product.year} · {product.price.toLocaleString()} ₾
                  </span>
                </div>
                <div className="admin-item__actions">
                  <button
                    type="button"
                    className="btn-secondary admin-icon-btn"
                    onClick={() => startEdit(product)}
                    aria-label={`${t.admin.edit} ${product.name}`}
                  >
                    <FaPen size={13} aria-hidden="true" />
                    <span>{t.admin.edit}</span>
                  </button>
                  <button
                    type="button"
                    className="admin-delete-btn"
                    onClick={() => deleteProduct(product.id)}
                    aria-label={`${t.admin.delete} ${product.name}`}
                  >
                    <FaTrashCan size={14} aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminPage;

