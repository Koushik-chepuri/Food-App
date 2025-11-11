import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [activeRestaurant, setActiveRestaurant] = useState(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedRestaurant = localStorage.getItem("activeRestaurant");

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedRestaurant) setActiveRestaurant(savedRestaurant);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem(
      "activeRestaurant",
      activeRestaurant ? activeRestaurant : ""
    );
  }, [cart, activeRestaurant]);

  const addToCart = (item, restaurantId) => {
    if (activeRestaurant && activeRestaurant !== restaurantId) {
      setCart([]);
    }

    setActiveRestaurant(restaurantId);

    // Add item to cart
    setCart((prev) => {
      const exists = prev.find((i) => i._id === item._id);

      if (exists) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, qty: i.qty + 1 } : i
        );
      }

      return [
        ...prev,
        { ...item, qty: 1, restaurantId, restaurantName: item.restaurantName },
      ];
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
    localStorage.removeItem("cart");
    localStorage.removeItem("activeRestaurant");
  };

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  const total = cart.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.qty),
    0
  );

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
        total,
        activeRestaurant,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
