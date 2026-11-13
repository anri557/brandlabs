import { Navigate, Route, Routes } from 'react-router-dom';
import { StoreProvider } from '../context/StoreContext';
import { LanguageProvider } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
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
                path="/Chargers"
                element={<CatalogPage key="chargers" pageKey="chargers" defaultType="chargers" />}
              />
              <Route
                path="/Cases"
                element={<CatalogPage key="cases" pageKey="cases" defaultType="cases" />}
              />
              <Route
                path="/PowerBanks"
                element={<CatalogPage key="powerbanks" pageKey="powerbanks" defaultType="powerbanks" />}
              />
              <Route
                path="/ScreenProtectors"
                element={
                  <CatalogPage
                    key="screen-protectors"
                    pageKey="screenProtectors"
                    defaultType="screen-protectors"
                  />
                }
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
          <CartDrawer />
        </div>
      </StoreProvider>
    </LanguageProvider>
  );
};

export default App;
