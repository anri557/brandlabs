import { createContext, useContext, useEffect, useState } from 'react';
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

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState(() => readStorage('ilab_products_v1', defaultLaptops));
  const [cart, setCart] = useState(() => readStorage('ilab_cart_v1', []));
  const [wishlist, setWishlist] = useState(() => readStorage('ilab_wishlist_v1', []));

  useEffect(() => {
    try {
      localStorage.setItem('ilab_products_v1', JSON.stringify(products));
    } catch {
      // ignore storage errors
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('ilab_cart_v1', JSON.stringify(cart));
    } catch {
      // ignore storage errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('ilab_wishlist_v1', JSON.stringify(wishlist));
    } catch {
      // ignore storage errors
    }
  }, [wishlist]);

  const addProduct = (data) => {
    const nextId = products.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
    const baseSlug = toSlug(`${data.brand} ${data.name}`) || `laptop-${nextId}`;
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

    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id, data) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          year: Number(data.year) || item.year,
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
      })
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    setCart((prev) => prev.filter((item) => item.id !== id));
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const resetProducts = () => {
    setProducts(defaultLaptops);
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
