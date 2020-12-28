import React, { useEffect } from "react";
import map from "../../image/map.PNG";
import "./PlaceOrder.css";
import rider from "../../image/rider.png";
const PlaceOrder = ({ order }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-7 mt-5">
          <div className="p-md-5">
            <img src={map} alt="map" className="img-fluid" />
          </div>
        </div>
        <div className="col-md-5 text-justify p-md-5 my-5">
          <div className="px-2 py-3 oreder-container">
            <div className="w-50">
              <img src={rider} alt="rider" className="img-fluid w-50" />
            </div>
            <div className="bg-light px-2">
              <h5 className="text-danger">Your Location</h5>
              <p>{order.address}</p>
              <h5>Shop Address</h5>
              <p>Zinda bazar Point Sylhet</p>
            </div>
            <div>
              <h4 className="text-danger">{order.time}</h4>
              <p>Order Time</p>
            </div>
            <div>
              <h4 className="text-danger">30 mins</h4>
              <p>Estimated Delivery Time</p>
            </div>
            <div className="bg-light px-2">
              <h5 className="text-danger">Hamim</h5>
              <p>Your Rider</p>
            </div>
            <div>
              <p>Thanks For Your Order</p>
              <button className="btn btn-danger w-100">Contact</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
