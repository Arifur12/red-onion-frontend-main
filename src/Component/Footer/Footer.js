import React from 'react';
import logo from "../../image/logo.png";
const Footer = () => {
  return (
    <div className="container-fluid text-light text-justify" style={{ background: "black" }}>
      <div className="row py-5">
        <div className="col-md-6 col-12 px-5">
          <div className="w-50">
            <img src={logo} alt="" className="img-fluid w-50" />
          </div>
        </div>
        <div className="col-md-3 col-6 mt-5 mt-md-0">
          <p>About Online Food</p>
          <p>Read Our Blog</p>
          <p>Sign Up To delivery</p>
          <p>Add Your Restaurent</p>
        </div>
        <div className="col-md-3 col-6 mt-5 mt-md-0">
          <p>Get Help</p>
          <p>Read FAQS</p>
          <p>View All cities</p>
          <p>Restaurants near me</p>
        </div>
      </div>
      <div className="row pb-3 px-5">
        <div className="col-md-8">
          <small>Copyright &copy 2020 online food by Shuhin</small>
        </div>
        <div className="col-md-4 d-flex flex-row">
          <span className="mr-3">Privacy police.</span>
          <span className="mr-3">Terms of use</span>
          <span>Pricing</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;