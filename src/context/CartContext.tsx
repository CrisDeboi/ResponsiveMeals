import React, { createContext, useState, useContext, ReactNode } from "react";

export interface CartItem {
  id: string;
  cardName: string;
  cardImg: string;
  cardDescription?: string;
  cardPrice: number;
  count: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void; 
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
  initialValue?: CartContextType; // Agregado para permitir valores iniciales
}

export const CartProvider: React.FC<CartProviderProps> = ({
  children,
  initialValue,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    initialValue?.cartItems || []
  );

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex((i) => i.id === item.id);
      if (existingItemIndex >= 0) {
        const newItems = [...prev];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          count: newItems[existingItemIndex].count + item.count
        };
        return newItems;
      }
      return [...prev, item];
    });
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};
