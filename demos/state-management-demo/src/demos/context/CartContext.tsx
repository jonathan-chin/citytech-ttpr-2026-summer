import { createContext, useContext, useState, type ReactNode } from 'react';

interface CartContextValue {
  cartItems: number;
  addItem: () => void;
  reset: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState(0);

  const addItem = () => setCartItems((count) => count + 1);
  const reset = () => setCartItems(0);

  return (
    <CartContext.Provider value={{ cartItems, addItem, reset }}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
