"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import CartDrawer from '../components/CartDrawer';
import OptionsModal from '../components/OptionsModal';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('cake_cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('cake_cart', JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  const quickAddToCart = (cake) => {
    setCart((prev) => {
      const newCart = [...prev, { ...cake, uid: Date.now(), quantity: 1, options: { size: "Standard (6\")", message: "" } }];
      if (prev.length === 0) {
        setTimeout(() => setIsCartOpen(true), 50);
      }
      return newCart;
    });
  };

  const saveItemOptions = (itemData) => {
    if (itemData.uid) { // Editing existing
      setCart(prev => prev.map(i => i.uid === itemData.uid ? itemData : i));
    } else { // New item from modal
      setCart(prev => {
        const newCart = [...prev, { ...itemData, uid: Date.now() }];
        if (prev.length === 0) setTimeout(() => setIsCartOpen(true), 50);
        return newCart;
      });
    }
    setEditingItem(null);
  };

  return (
    <CartContext.Provider value={{ cart, setCart, isCartOpen, setIsCartOpen, editingItem, setEditingItem, quickAddToCart, saveItemOptions }}>
      {children}
      {isMounted && <CartDrawer />}
      {isMounted && <OptionsModal />}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
