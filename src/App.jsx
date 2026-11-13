import { Navigate, Route, Routes } from 'react-router-dom';
import { StoreProvider } from '../context/StoreContext';
import { LanguageProvider } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero.jsx';
import LaptopDetailPage from './pages/LaptopDetailPage';
import CatalogPage from './pages/CatalogPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import AccountPage from './pages/AccountPage';

const Home = () => (
  <main>
    <Hero />
  </main>
);

const App = () => {
  return (
    <LanguageProvider>
      <StoreProvider>
        <div className="app-shell">
          <Navbar />
          <div className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/laptop/:slug" element={<LaptopDetailPage />} />
              <Route
                path="/Gaming"
                element={<CatalogPage key="gaming" pageKey="gaming" defaultType="gaming" />}
              />
              <Route
                path="/Business"
                element={<CatalogPage key="business" pageKey="business" defaultType="business" />}
              />
              <Route
                path="/Education"
                element={<CatalogPage key="ultrabook" pageKey="education" defaultType="ultrabook" />}
              />
              <Route
                path="/Accessories"
                element={<CatalogPage key="2-in-1" pageKey="accessories" defaultType="2-in-1" />}
              />
              <Route
                path="/Deals"
                element={<CatalogPage key="all" pageKey="deals" defaultType="all" />}
              />
              <Route path="/Cart" element={<CartPage />} />
              <Route path="/Wishlist" element={<WishlistPage />} />
              <Route path="/Whishlist" element={<Navigate to="/Wishlist" replace />} />
              <Route path="/Account" element={<AccountPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </StoreProvider>
    </LanguageProvider>
  );
};

export default App;
