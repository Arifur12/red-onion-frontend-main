import React, { useState } from "react";
import "./Banner.css";
import bannerbackground from "../../image/bannerbackground.png";
import { useHistory } from "react-router-dom";
const Banner = () => {
  const [input, setInput] = useState(null);
  let history = useHistory();
  const handleSearch = () => {
    if (input) {
      history.push(`/search/${input}`);
    }
  };
  return (
    <div
      className="banner-container"
      style={{ backgroundImage: `url(${bannerbackground})` }}
    >
      <h1>Best Food Is Waiting For Your Belly</h1>
      <div className="search-container">
        <div className="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Search Food Item"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => setInput(e.target.value)}
          ></input>
          <div className="input-group-prepend">
            <button class="input-group-text btn-search" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
