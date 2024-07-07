import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light navbar-light sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="Images/3.png" alt="logo" className="img3" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 ">
              <li className=" nav-item mx-2 ">
                <Link
                  className="nav-link nav "
                  aria-current="page"
                  to={"/dashboard"}
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link to={"/profile"} className="nav-link nav ">
                  My Profile
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link nav " to={"/myOrder"}>
                  My Orders
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link nav " to={"/products"}>
                  All Products
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link nav " to={"/cart"}>
                  Cart
                </Link>
              </li>
            </ul>
            <Link to={"/logout"} className="btn btn-outline-danger mx-2">
              LogOut
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
