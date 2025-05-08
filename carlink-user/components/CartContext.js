import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  const [user, setUser] = useState(null); // Store logged-in user info

  // Load user info when component mounts
  useEffect(() => {
    if (ls) {
      const storedUser = JSON.parse(ls.getItem("currentUser"));
      if (storedUser) {
        setUser(storedUser);
      }
    }
  }, []);

  // Load the cart when the user is available
  useEffect(() => {
    if (user && ls) {
      const userCart = ls.getItem(`cart_${user.email}`);
      if (userCart) {
        setCartProducts(JSON.parse(userCart));
      }
    }
  }, [user]);

  // Save the cart to localStorage whenever it changes
  useEffect(() => {
    if (user && cartProducts.length > 0 && ls) {
      ls.setItem(`cart_${user.email}`, JSON.stringify(cartProducts));
    }
  }, [cartProducts, user]);

  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }

  function removeProduct(productId) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((_, index) => index !== pos);
      }
      return prev;
    });
  }

  function clearCart() {
    setCartProducts([]);
    if (user && ls) {
      ls.removeItem(`cart_${user.email}`);
    }
  }

  function logoutUser() {
    if (ls) {
      ls.removeItem("currentUser"); // Remove stored user info
      ls.removeItem(`cart_${user.email}`); // Remove cart
    }
    setUser(null);
    setCartProducts([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
        setUser,
        user,
        logoutUser,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
