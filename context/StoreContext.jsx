import { createContext, useContext, useEffect, useState } from 'react';

const StoreContext = createContext(null);

const readStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState(() => readStorage('bl_cart', []));
  const [wishlist, setWishlist] = useState(() => readStorage('bl_wishlist', []));

  useEffect(() => {
    try {
      localStorage.setItem('bl_cart', JSON.stringify(cart));
    } catch {
      // ignore storage errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('bl_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore storage errors
    }
  }, [wishlist]);

  const addToCart = (laptop, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === laptop.id);
      if (existing) {
        return prev.map((item) =>
          item.id === laptop.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...laptop, quantity }];
    });
  };

  const updateCartQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (laptop) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === laptop.id);
      return exists ? prev.filter((item) => item.id !== laptop.id) : [...prev, laptop];
    });
  };

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        cartCount,
        cartSubtotal,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used inside StoreProvider');
  }
  return ctx;
};
