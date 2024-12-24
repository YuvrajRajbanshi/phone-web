import React, { useContext, useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(" ");

  const { setFilteredData, products, logout, isAuthenticated, cart } =
    useContext(AppContext);
  console.log("user cart", cart);

  const filterbyCategory = (cat) => {
    console.log("Helllo I am working fine ");
    setFilteredData(
      products.filter(
        (data) => data.category.toLowerCase() === cat.toLowerCase()
      )
    );
    // console.log(products);
  };
  const filterbyPrice = (price) => {
    console.log("Helllo I am working fine ");
    setFilteredData(products.filter((data) => data.price >= price));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`product/search/${searchTerm}`);

    setSearchTerm(" ");
  };

  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar">
          <Link to={"/"} className="left" style={{ textDecoration: "none" }}>
            <h3 style={{ color: "white" }}>MERN E - Commerce</h3>
          </Link>
          <form className="search_bar" onSubmit={handleSubmit}>
            <span className="material-symbols-outlined">search</span>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search Products"
            />
          </form>
          <div className="right">
            {isAuthenticated && (
              <>
                <Link
                  to="/cart"
                  type="button"
                  className="btn btn-primary position-relative mx-3"
                >
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart?.items?.length}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </Link>
                <Link to={"/profile"} className="btn btn-warning mx-3">
                  Profile
                </Link>
                <button
                  className="btn btn-danger mx-3"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link to="/login" className="btn  btn-primary mx-3">
                  Login
                </Link>
                <Link to="/register" className="btn btn-info mx-3">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {location.pathname == "/" && (
          <div className="sub_bar">
            <div className="items " onClick={() => setFilteredData(products)}>
              No Filter
            </div>
            <div className="items " onClick={() => filterbyCategory("mobiles")}>
              Mobiles
            </div>
            <div className="items " onClick={() => filterbyCategory("laptops")}>
              Laptops
            </div>
            <div className="items " onClick={() => filterbyCategory("cameras")}>
              Camera's
            </div>
            <div
              className="items "
              onClick={() => filterbyCategory("headphones")}
            >
              Headphone
            </div>
            <div className="items" onClick={() => filterbyPrice(15999)}>
              15999
            </div>
            <div className="items" onClick={() => filterbyPrice(25999)}>
              25999
            </div>
            <div className="items" onClick={() => filterbyPrice(49999)}>
              49999
            </div>
            <div className="items" onClick={() => filterbyPrice(69999)}>
              69999
            </div>
            <div className="items" onClick={() => filterbyPrice(89999)}>
              89999
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
