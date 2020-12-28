import React from 'react';
import "./Service.css";
import waiter from "../../image/waiter.png";
import chef from "../../image/chef.png";
import fastDelivery from "../../image/fastDelivery.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faBell, faTruck, faArrowRight } from '@fortawesome/free-solid-svg-icons';
const Service = () => {
  return (
    <div className="container py-5 text-justify">
      <div className="w-md-50 text-justify pr-md-5 mr-5 py-4">
        <h2>Why you Choose Us</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi eaque quaerat quas, nesciunt numquam dignissimos ab nostrum consequuntur .</p>
      </div>
      <div className="row">
        <div className="col-md-4 my-4 my-md-0">
          <div>
            <img src={waiter} alt="" className="img-fluid w-100" />
          </div>
          <div className="py-3 d-flex flex-row">
            <span className="icon-container">
              <div className="bg-danger d-flex justify-content-center icon-container2 mx-2">
                <FontAwesomeIcon icon={faBus} className="icon" />
              </div>
            </span>
            <div className="text-container">
              <h5>Fast Delivery</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique praesentium excepturi enim suscipit sapiente</p>
              <a href="/">See More <FontAwesomeIcon icon={faArrowRight} className="arrow" /></a>
            </div>
          </div>
        </div>
        <div className="col-md-4 my-4 my-md-0">
          <div>
            <img src={chef} alt="" className="img-fluid w-100" />
          </div>
          <div className="py-3 d-flex flex-row">
            <span className="icon-container">
              <div className="bg-danger d-flex justify-content-center icon-container2 mx-2">
                <FontAwesomeIcon icon={faBus} className="icon" />
              </div>
            </span>
            <div className="text-container">
              <h5>Fast Delivery</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique praesentium excepturi enim suscipit sapiente</p>
              <a href="/">See More <FontAwesomeIcon icon={faArrowRight} className="arrow" /></a>
            </div>
          </div>
        </div>
        <div className="col-md-4 my-2 my-md-0">
          <div>
            <img src={fastDelivery} alt="" className="img-fluid w-100" />
          </div>
          <div className="py-3 d-flex flex-row">
            <span className="icon-container">
              <div className="bg-danger d-flex justify-content-center icon-container2 mx-2">
                <FontAwesomeIcon icon={faBus} className="icon" />
              </div>
            </span>
            <div className="text-container">
              <h5>Fast Delivery</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique praesentium excepturi enim suscipit sapiente</p>
              <a href="/">See More <FontAwesomeIcon icon={faArrowRight} className="arrow" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;