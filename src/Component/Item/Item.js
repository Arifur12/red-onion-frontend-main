import React, { useState, useContext, useEffect } from "react";
import "./Item.css";
import { CartContext } from "../CartContext/Cart";
import { Link } from "react-router-dom";
import { ItemsContext } from "../Context/AllItems";
const Item = () => {
  const [cart, setCart] = useContext(CartContext);
  const [allItems, setAllItems] = useContext(ItemsContext);
  const [item, setItem] = useState([]);
  const [active, setActive] = useState({
    lunch: true,
    breakfast: false,
    dinner: false,
  });

  useEffect(() => {
    if (allItems.length !== 0) {
      const newCart = allItems?.filter((pd) => pd.catag === "lunch");
      setItem(newCart);
    }
  }, [allItems]);

  const changeCart = (ki) => {
    const newCart = allItems?.filter((pd) => pd.catag === ki);
    setItem(newCart);
    if (ki === "breakfast") {
      const tmp = {
        lunch: false,
        breakfast: true,
        dinner: false,
      };
      setActive(tmp);
    } else if (ki === "lunch") {
      const tmp = {
        lunch: true,
        breakfast: false,
        dinner: false,
      };
      setActive(tmp);
    } else {
      const tmp = {
        lunch: false,
        breakfast: false,
        dinner: true,
      };
      setActive(tmp);
    }
  };

  return (
    <div className="container">
      <div className="my-3">
        {active.breakfast ? (
          <button
            className="btn active"
            onClick={() => changeCart("breakfast")}
          >
            BreakFast
          </button>
        ) : (
          <button className="btn" onClick={() => changeCart("breakfast")}>
            BreakFast
          </button>
        )}
        {active.lunch ? (
          <button className="btn active" onClick={() => changeCart("lunch")}>
            Lunch
          </button>
        ) : (
          <button className="btn" onClick={() => changeCart("lunch")}>
            Lunch
          </button>
        )}
        {active.dinner ? (
          <button className="btn active" onClick={() => changeCart("dinner")}>
            Dinner
          </button>
        ) : (
          <button className="btn" onClick={() => changeCart("dinner")}>
            Dinner
          </button>
        )}
      </div>
      <div className="row">
        {item.length === 0 ? (
          <p style={{ textAlign: "center" }}>Loading.....</p>
        ) : (
          item?.map((x) => (
            <div className="col-md-4 px-5 my-3 cart-container">
              <Link to={"/review/" + x._id} style={{ textDecoration: "none" }}>
                <div className="cart-item">
                  <img src={x.img} alt="img" className="img-fluid w-50" />
                  <h5>{x.name}</h5>
                  <h3>${x.price}</h3>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
      {cart.length !== 0 ? (
        <Link to="/delivery">
          <button className="btn btn-danger">Checkout Your Food</button>
        </Link>
      ) : (
        <button className="btn btn-danger" disabled>
          Checkout Your Food
        </button>
      )}
    </div>
  );
};

export default Item;
