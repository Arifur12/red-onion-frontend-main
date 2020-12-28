import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Delivery.css";
import { CartContext } from "../CartContext/Cart";

import { ItemsContext } from "../Context/AllItems";
import PlaceOrder from "../PlaceOrder/PlaceOrder";
const Delivery = () => {
  const [cart, setCart] = useContext(CartContext);
  const [allItems, setAllItems] = useContext(ItemsContext);
  const [final, setFinal] = useState([]);
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(0);
  const [place, setPlace] = useState(false);
  const [order, setOrder] = useState(null);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    setPlace(true);
    console.log(data);
    setOrder(data);
  };
  // const handlePlaceOrder = () => {
  //   alert(total);
  // };
  useEffect(() => {
    if (allItems.length !== 0) {
      const duplicate = cart.map((x) => {
        const newData = allItems.find((y) => y._id === x.key);
        newData.quantity = x.quantity;
        return newData;
      });
      setFinal(duplicate);
    }
  }, [cart, allItems]);
  useEffect(() => {
    let fake = [...final.map((pd) => pd.quantity)];
    let pri = [...final.map((pd) => pd.price)];
    let ham = 0;
    for (let i = 0; i < fake.length; i++) {
      ham = ham + fake[i] * pri[i];
    }

    setPrice(ham);
    let sum = fake.reduce(function (a, b) {
      return a + b;
    }, 0);

    setTotal(sum);
  }, [final]);
  //handle remove
  const handleRemove = () => {
    setSuccess(true);
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    order.bill = price + 1.5 + 2;
    order.items = cart;
    order.time = time;
    console.log(order);
    localStorage.removeItem("cart");
    setCart([]);
    fetch("https://peaceful-tor-39558.herokuapp.com/order", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.text())
      .then((json) => console.log(json));
  };
  const handlePlus = (key, quantity) => {
    const duplicate = final.map((pd) => {
      if (pd.key === key) {
        pd.quantity = quantity + 1;
      }
      return pd;
    });
    //console.log(duplicate);
    setFinal(duplicate);
    setCart(duplicate);
  };
  const handleMinus = (key, quantity) => {
    const duplicate = final.filter((pd) => {
      if (pd.key === key) {
        pd.quantity = quantity - 1;
      }
      return pd.quantity !== 0;
    });
    //console.log(duplicate);
    setFinal(duplicate);
    setCart(duplicate);
  };

  return (
    <div className="container mt-5">
      {success ? (
        <PlaceOrder order={order}></PlaceOrder>
      ) : (
        <div className="row">
          <div className="col-md-6 delivery-form px-md-5 px-5 mb-5">
            <h5>Edit Delivery Address</h5>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)} className="px-md-5">
              <input name="name" ref={register} placeholder="Name" />
              <input
                name="address"
                ref={register({ required: true })}
                placeholder="Location to deliver"
              />
              {errors.address && <small>Address is required</small>}
              <input
                name="flat"
                ref={register({ required: true })}
                placeholder="flat suit or floor"
              />
              {errors.flat && <small>flat suit or fllor is required</small>}
              <input
                name="business"
                ref={register}
                placeholder="Business Name"
              />
              <input
                name="mobile"
                type="number"
                ref={register({ required: true })}
                placeholder="Contact Number"
              />
              {errors.mobile && <small>Contact Number is required</small>}
              <button type="submit" className="btn btn-danger mt-3">
                Save and Continue
              </button>
            </form>
          </div>
          <div className="col-md-6 text-justify px-5">
            {
              <div className="mx-5">
                <h6>From ZindaBazar Point</h6>
                <small>Arriving in 20-30mins</small>
              </div>
            }
            {final.map((item) => (
              <div className="row bg-item-card d-flex align-items-center my-3 p-md-2 mx-md-5 mx-2">
                <div className="col-md-3 col-3">
                  <img src={item.img} alt="" className="img-fluid w-100" />
                </div>
                <div className="col-md-4 col-4 ">
                  <small>{item.name}</small>
                  <br />
                  <h3 className="text-danger">${item.price}</h3>
                </div>
                <div className="col-md-5 col-5 plus-minus">
                  <span>
                    <button
                      onClick={() => handleMinus(item.key, item.quantity)}
                    >
                      -
                    </button>{" "}
                    {item.quantity}{" "}
                    <button onClick={() => handlePlus(item.key, item.quantity)}>
                      +
                    </button>
                  </span>
                </div>
              </div>
            ))}
            {final.length !== 0 ? (
              <div>
                <div className="mx-5 price-container">
                  <p>Subtotal + {total} item :</p>
                  <p>${price}</p>
                </div>
                <div className="mx-5 price-container">
                  <p>Tax :</p>
                  <p>$1.5</p>
                </div>
                <div className="mx-5 price-container">
                  <p>Delivery Fee:</p>
                  <p>$2</p>
                </div>
                <div className="mx-5 price-container">
                  <h5>Total:</h5>
                  <h5>{price + 1.5 + 2}</h5>
                </div>
                <div className="mx-5">
                  {place ? (
                    <button
                      className="btn btn-danger w-100"
                      onClick={handleRemove}
                    >
                      Place Order
                    </button>
                  ) : (
                    <button className="btn btn-danger w-100 mb-3" disabled>
                      Place order
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div className="mx-5 price-container">
                  <p>Subtotal + {total} item :</p>
                  <p>${price}</p>
                </div>
                <div className="mx-5 price-container">
                  <p>Tax :</p>
                  <p>$0</p>
                </div>
                <div className="mx-5 price-container">
                  <p>Delivery Fee:</p>
                  <p>$0</p>
                </div>
                <div className="mx-5 price-container">
                  <h5>Total:</h5>
                  <h5>$0</h5>
                </div>
                <div className="mx-5">
                  <button className="btn btn-secondary w-100 mb-2" disabled>
                    No item to checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Delivery;
