import React, { createContext, useEffect, useState } from "react";

export const ItemsContext = createContext();

export const AllItems = (props) => {
  const [allItems, setAllItems] = useState([]);
  useEffect(() => {
    fetch("https://peaceful-tor-39558.herokuapp.com/items")
      .then((response) => response.json())
      .then((json) => setAllItems(json));
  }, []);
  return (
    <ItemsContext.Provider value={[allItems, setAllItems]}>
      {props.children}
    </ItemsContext.Provider>
  );
};
