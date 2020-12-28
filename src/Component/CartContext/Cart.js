import React, { createContext, useState, useEffect } from "react";
export const CartContext = createContext();
export const Cart = (props) => {
  const [cart, setCart] = useState(() => {
    const db = localStorage.getItem("cart");
    return db ? JSON.parse(db) : [];
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  console.log(cart, "cart");
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  );
};
