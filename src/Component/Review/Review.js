import React, { useState, useContext, useEffect } from "react";
import "./Review.css";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { fakeData } from "../Data/Data";
import { CartContext } from "../CartContext/Cart";
import { ItemsContext } from "../Context/AllItems";
const Review = () => {
  const { productkey } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [cart, setCart] = useContext(CartContext);
  const [allItems, setAllItems] = useContext(ItemsContext);
  const [reviewItem, setReviewItem] = useState([]);

  //console.log(reviewItem);

  useEffect(() => {
    const review = allItems.find((x) => x._id === productkey);
    setReviewItem(review);
  }, [allItems, productkey]);
  const addToCart = (quantity, productkey) => {
    if (cart.length === 0) {
      const newCart = [
        ...cart,
        {
          key: productkey,
          quantity: quantity,
        },
      ];
      setCart(newCart);
    } else {
      const checK = cart.find((pd) => pd.key === productkey);
      if (!checK) {
        setCart([
          ...cart,
          {
            key: productkey,
            quantity: quantity,
          },
        ]);
      }
    }
    setAdded(true);
    setInterval(() => {
      setAdded(false);
    }, 1500);
  };
  return (
    <div className="jumbotron">
      <div className="row">
        <div className="col-md-6 text-justify px-md-5 p-4">
          <div className="review-container px-md-5">
            <h2>{reviewItem?.name}</h2>
            <p>{reviewItem?.details}</p>
            <div className="reviewQtity">
              <h3>${reviewItem?.price}</h3>
              <span>
                <button
                  onClick={() => quantity !== 1 && setQuantity(quantity - 1)}
                >
                  -
                </button>{" "}
                {quantity}{" "}
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </span>
            </div>
            <button
              className="btn btn-danger mt-3 px-5"
              onClick={() => {
                addToCart(quantity, productkey);
              }}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              Add
            </button>
            {added && (
              <span className="ml-3 text-success">Item added to cart</span>
            )}
          </div>
        </div>
        <div className="col-md-6 px-md-5 p-4">
          <div className="px-md-5">
            <img src={reviewItem?.img} alt="" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
