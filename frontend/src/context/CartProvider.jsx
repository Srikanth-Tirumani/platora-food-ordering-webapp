import React, { useState, useEffect } from 'react';
import { CartContext } from './CartContext';


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems')) || []
  );

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const exist = cartItems.find((x) => x.name === product.name);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.name === product.name ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (name) => {
    setCartItems(cartItems.filter((x) => x.name !== name));
  };

  const updateQty = (name, qty) => {
    setCartItems(
      cartItems.map((x) => (x.name === name ? { ...x, qty } : x))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, updateQty, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
