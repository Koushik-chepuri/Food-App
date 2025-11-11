import { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [activeRestaurant, setActiveRestaurant] = useState(null);

  const addToCart = (item, restaurantId) => {
    // Reset cart when switching restaurants
    if (activeRestaurant && activeRestaurant !== restaurantId) {
      setCart([]);
    }

    setActiveRestaurant(restaurantId);

    setCart((prev) => {
      const exists = prev.find((i) => i._id === item._id);
      if (exists) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, qty: i.qty + 1 } : i
        );
      }

      // ✅ Add restaurantId here
      return [...prev, { ...item, qty: 1, restaurantId }];
    });
  };


  const increaseQty = (id) =>
    setCart((prev) =>
      prev.map((i) => (i._id === id ? { ...i, qty: i.qty + 1 } : i))
    );

  const decreaseQty = (id) =>
    setCart((prev) =>
      prev
        .map((i) => (i._id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );

  const removeItem = (id) =>
    setCart((prev) => prev.filter((i) => i._id !== id));

  const clearCart = () => {
    setCart([]);
    setActiveRestaurant(null);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart,
        totalItems,
        activeRestaurant,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
