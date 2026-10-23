import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);

const CART_KEY = "shopnestCartV2";

// 18% GST used for the estimate shown on the cart page.
export const TAX_RATE = 0.18;

// ---------- reducer ----------
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { product, quantity } = action.payload;
      const exists = state.some((item) => item.id === product.id);

      if (exists) {
        return state.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }

      // Store a snapshot so the cart works without re-fetching products.
      const { id, name, price, originalPrice, imageUrl, category } = product;
      return [...state, { id, name, price, originalPrice, imageUrl, category, quantity }];
    }

    case "INCREASE":
      return state.map((item) =>
        item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item,
      );

    case "DECREASE":
      return state
        .map((item) => (item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0);

    case "REMOVE":
      return state.filter((item) => item.id !== action.id);

    case "CLEAR":
      return [];

    default:
      return state;
  }
}

// Load the saved cart from localStorage (safely).
function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

// ---------- provider ----------
export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], loadCart);

  // Persist on every change.
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Could not save cart:", error);
    }
  }, [cart]);

  const value = useMemo(() => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = Math.round(subtotal * TAX_RATE);

    return {
      cart,
      totalItems,
      subtotal,
      tax,
      total: subtotal + tax,
      addToCart: (product, quantity = 1) =>
        dispatch({ type: "ADD", payload: { product, quantity } }),
      increaseQuantity: (id) => dispatch({ type: "INCREASE", id }),
      decreaseQuantity: (id) => dispatch({ type: "DECREASE", id }),
      removeFromCart: (id) => dispatch({ type: "REMOVE", id }),
      clearCart: () => dispatch({ type: "CLEAR" }),
    };
  }, [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ---------- hook ----------
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return context;
}
