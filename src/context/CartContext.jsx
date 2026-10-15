import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const loadSaved = (key) => {
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable (private mode, blocked cookies); the bag still works for this visit.
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => loadSaved('medifeet-cart'));
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedItemModal, setAddedItemModal] = useState(null); // for Figma "Added to cart" bottom sheet
  const [wishlist, setWishlist] = useState(() => loadSaved('medifeet-wishlist'));

  // Keep the bag and wishlist across page reloads and visits.
  useEffect(() => saveToStorage('medifeet-cart', cartItems), [cartItems]);
  useEffect(() => saveToStorage('medifeet-wishlist', wishlist), [wishlist]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === product.size);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.size === product.size)
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });

    // Trigger Figma "Added to cart" modal
    setAddedItemModal(product);
  };

  const removeFromCart = (id, size) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id, size, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id && item.size === size) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      cartSubtotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      isCartOpen,
      setIsCartOpen,
      addedItemModal,
      setAddedItemModal,
      wishlist,
      toggleWishlist
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
