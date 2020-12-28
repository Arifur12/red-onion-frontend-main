import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ItemsContext } from "../Context/AllItems";
const Search = () => {
  const { id } = useParams();
  const [allItems, setAllItems] = useContext(ItemsContext);
  const [filter, setFilter] = useState([]);
  const [input, setInput] = useState(null);
  useEffect(() => {
    const newArr = allItems?.filter((x) => {
      let na = x.name.toLowerCase();
      let inp = id.toLowerCase();
      if (na.search(inp) !== -1) {
        return x;
      }
    });
    setFilter(newArr);
  }, [allItems]);

  const handelSearch = () => {
    if (input) {
      const newArr = allItems?.filter((x) => {
        let na = x.name.toLowerCase();
        let inp = input.toLowerCase();
        if (na.search(inp) !== -1) {
          return x;
        }
      });
      setFilter(newArr);
    }
  };
  return (
    <div>
      <div className="search-container">
        <h1 className="mb-5">Best Food Is Waiting For Your Belly</h1>
        <div className="search-container-box">
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
              <button
                class="input-group-text btn-search"
                onClick={handelSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div>
          <p>Search Result : {filter.length}</p>
          <div className="row">
            {filter.length !== 0 &&
              filter?.map((x) => (
                <div className="col-md-4 px-5 my-3 cart-container">
                  <Link
                    to={"/review/" + x._id}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="cart-item">
                      <img src={x.img} alt="img" className="img-fluid w-50" />
                      <h5>{x.name}</h5>
                      <h3>${x.price}</h3>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
