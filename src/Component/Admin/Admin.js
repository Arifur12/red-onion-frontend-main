import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as firebase from "firebase/app";
import "firebase/storage";
import "./Admin.css";
import { ItemsContext } from "../Context/AllItems";
import Loader from "react-loader-spinner";
const Admin = () => {
  const { register, handleSubmit, errors, reset } = useForm();
  const [step, setStep] = useState(1);
  const [allItems, setAllItems] = useContext(ItemsContext);
  const [image, setImage] = useState(null);
  const [spin, setSpin] = useState(false);
  const [order, setOrder] = useState([]);
  useEffect(() => {
    fetch("https://peaceful-tor-39558.herokuapp.com/get/order")
      .then((response) => response.json())
      .then((json) => setOrder(json));
  }, []);
  const onSubmit = (data) => {
    console.log(data);
    postOrder(data);
  };

  const postOrder = (data) => {
    setSpin(true);
    if (image) {
      const uploadImg = firebase
        .storage()
        .ref(`images/${image.name}`)
        .put(image);
      uploadImg.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          //complete function
          firebase
            .storage()
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              data.img = url;
              //post to database
              fetch("https://peaceful-tor-39558.herokuapp.com/addItem", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              })
                .then((response) => response.text())
                .then((json) => {
                  setSpin(false);
                  alert("Items Added To the menu");
                  setImage(null);
                  reset();
                  const newArr = [...allItems, data];
                  setAllItems(newArr);
                });
            });
        }
      );
    } else {
      alert("Something Wrong ! Try Again ");
    }
  };
  const handleFile = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const giveName = (id) => {
    const na = allItems.find((x) => x._id === id);
    return na?.name;
  };
  const handleDelete = (id) => {
    const arr = order?.filter((x) => x._id !== id);
    setOrder(arr);
    alert(id);
    fetch(`https://peaceful-tor-39558.herokuapp.com/delete/${id}`, {
      method: "DELETE",
    });
  };
  return (
    <div>
      <div className="admin_box">
        <button className="btn btn-info mr-5" onClick={() => setStep(1)}>
          View Recent Orders
        </button>
        <button className="btn btn-success ml-5" onClick={() => setStep(2)}>
          Add New Items In Menu
        </button>
      </div>
      {step === 1 && order.length === 0 && (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={4000} //3 secs
        />
      )}
      {step === 1 && order.length !== 0 && (
        <div className="adminOrder">
          <div className="orderBox">
            {order.length !== 0 &&
              order?.map((x) => (
                <div className="orderCard">
                  <div className="orderProduct">
                    <p>Customer Name:</p>
                    <p>{x.name}</p>
                  </div>
                  <div className="orderProduct">
                    <p>Location :</p>
                    <p>{x.address}</p>
                  </div>
                  <div className="orderProduct">
                    <p>Mobile:</p>
                    <p>{x.mobile}</p>
                  </div>
                  <div className="orderProduct">
                    <p>Order Time:</p>
                    <p>{x.time}</p>
                  </div>
                  <div className="orderProduct">
                    <h5 style={{ color: "green" }}>Items</h5>
                    <h5 style={{ color: "gold" }}>Quantity</h5>
                  </div>
                  <>
                    {x?.items?.map((y) => (
                      <div className="orderProduct">
                        <h5>{giveName(y.key)}</h5>
                        <h5>{y.quantity}</h5>
                      </div>
                    ))}
                  </>
                  <div>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(x._id)}
                    >
                      Order Deliver
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="addProduct">
          <form onSubmit={handleSubmit(onSubmit)} className="px-md-5 adminForm">
            <input
              name="name"
              ref={register({ required: true })}
              placeholder="Item Name"
            />
            {errors.name && <small>Item Name is required</small>}
            <input
              name="price"
              type="number"
              ref={register({ required: true })}
              placeholder="Price $"
            />
            <select name="catg" defaultValue="breakfast" ref={register}>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
            <textarea
              name="details"
              ref={register}
              placeholder="Item Details"
            />
            {errors.price && <small>Price is required</small>}
            <input type="file" name="img" required onChange={handleFile} />
            {!spin ? (
              <button type="submit" className="btn btn-danger mt-3">
                Add Item
              </button>
            ) : (
              <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={10000} //3 secs
              />
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;
