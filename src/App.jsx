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
import AdminPage from './pages/AdminPage';

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
                path="/Foldables"
                element={<CatalogPage key="foldable" pageKey="foldables" defaultType="foldable" />}
              />
              <Route
                path="/Flagships"
                element={<CatalogPage key="flagship" pageKey="flagships" defaultType="flagship" />}
              />
              <Route
                path="/Camera"
                element={<CatalogPage key="camera" pageKey="camera" defaultType="camera" />}
              />
              <Route
                path="/Deals"
                element={<CatalogPage key="all" pageKey="deals" defaultType="all" />}
              />
              <Route path="/Cart" element={<CartPage />} />
              <Route path="/Wishlist" element={<WishlistPage />} />
              <Route path="/Whishlist" element={<Navigate to="/Wishlist" replace />} />
              <Route path="/Account" element={<AccountPage />} />
              <Route path="/admin" element={<AdminPage />} />
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
