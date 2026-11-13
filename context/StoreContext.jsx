import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import defaultLaptops from '../data/laptops.js';

const StoreContext = createContext(null);

const readStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const toSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const EMPTY_OPS = { custom: [], edited: {}, deleted: [] };

export const StoreProvider = ({ children }) => {
  const [catalogOps, setCatalogOps] = useState(() => readStorage('tl_catalog_ops_v1', EMPTY_OPS));
  const [cart, setCart] = useState(() => readStorage('tl_cart_v1', []));
  const [wishlist, setWishlist] = useState(() => readStorage('tl_wishlist_v1', []));
  const [cartOpen, setCartOpen] = useState(false);

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  useEffect(() => {
    try {
      localStorage.setItem('tl_catalog_ops_v1', JSON.stringify(catalogOps));
    } catch {
      // ignore storage errors
    }
  }, [catalogOps]);

  useEffect(() => {
    try {
      localStorage.setItem('tl_cart_v1', JSON.stringify(cart));
    } catch {
      // ignore storage errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('tl_wishlist_v1', JSON.stringify(wishlist));
    } catch {
      // ignore storage errors
    }
  }, [wishlist]);

  const products = useMemo(() => {
    const base = defaultLaptops
      .filter((item) => !catalogOps.deleted.includes(item.id))
      .map((item) => (catalogOps.edited[item.id] ? { ...item, ...catalogOps.edited[item.id] } : item));
    return [...catalogOps.custom, ...base];
  }, [catalogOps]);

  const addProduct = (data) => {
    const nextId = products.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
    const baseSlug = toSlug(`${data.brand} ${data.name}`) || `product-${nextId}`;
    const slugExists = products.some((item) => item.slug === baseSlug);
    const slug = slugExists ? `${baseSlug}-${nextId}` : baseSlug;

    const newProduct = {
      id: nextId,
      slug,
      year: Number(data.year) || new Date().getFullYear(),
      brand: data.brand.trim(),
      name: data.name.trim(),
      image: data.image.trim(),
      price: Number(data.price) || 0,
      compatibleWith:
        Array.isArray(data.compatibleWith) && data.compatibleWith.length > 0
          ? data.compatibleWith
          : ['iPhone', 'Samsung', 'Xiaomi'],
      description: data.description.trim(),
      type: data.type,
      specs: {
        processor: data.specs.processor.trim(),
        memory: data.specs.memory.trim(),
        storage: data.specs.storage.trim(),
        display: data.specs.display.trim(),
        graphics: data.specs.graphics.trim(),
        battery: data.specs.battery.trim(),
      },
    };

    setCatalogOps((prev) => ({
      ...prev,
      custom: [newProduct, ...prev.custom],
    }));
    return newProduct;
  };

  const updateProduct = (id, data) => {
    const patch = {
      year: Number(data.year) || new Date().getFullYear(),
      brand: data.brand.trim(),
      name: data.name.trim(),
      image: data.image.trim(),
      price: Number(data.price) || 0,
      description: data.description.trim(),
      type: data.type,
      specs: {
        processor: data.specs.processor.trim(),
        memory: data.specs.memory.trim(),
        storage: data.specs.storage.trim(),
        display: data.specs.display.trim(),
        graphics: data.specs.graphics.trim(),
        battery: data.specs.battery.trim(),
      },
    };

    setCatalogOps((prev) => {
      const isCustom = prev.custom.some((item) => item.id === id);
      if (isCustom) {
        return {
          ...prev,
          custom: prev.custom.map((item) => (item.id === id ? { ...item, ...patch } : item)),
        };
      }
      return {
        ...prev,
        edited: { ...prev.edited, [id]: patch },
      };
    });
  };

  const deleteProduct = (id) => {
    setCatalogOps((prev) => {
      const isCustom = prev.custom.some((item) => item.id === id);
      if (isCustom) {
        return {
          ...prev,
          custom: prev.custom.filter((item) => item.id !== id),
        };
      }
      return {
        ...prev,
        deleted: prev.deleted.includes(id) ? prev.deleted : [...prev.deleted, id],
      };
    });
    setCart((prev) => prev.filter((item) => item.id !== id));
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const resetProducts = () => {
    setCatalogOps(EMPTY_OPS);
  };

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
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProducts,
        cart,
        wishlist,
        cartCount,
        cartSubtotal,
        cartOpen,
        openCart,
        closeCart,
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
