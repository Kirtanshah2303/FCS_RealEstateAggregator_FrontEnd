
import React, { useState } from "react";
import {Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Box from "./Box";
import Footer from "./Footer";

export default function Navbar() {
  const title = "Real Estate";
  const aboutText = "eKyc";
  const aboutText1 = "LOGIN-SIGNUP";

  // Initialize user and isLoggedIn state
  // const [user, setUser] = useState(null);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const location = useLocation();
  // const userFromLocation = location.state?.user; // Get the user name from the location state
  // if (userFromLocation) {
  //   console.log("Insidde if "+userFromLocation);
  //   setUser(userFromLocation);
  //   setIsLoggedIn(true);
  // }

  // const handleLogout = () => {
  //   // Clear user data and update the login status
  //   setUser(null);
  //   setIsLoggedIn(false);
  // };



  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            {title}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              {/* <li className="nav-item active">
                <a className="nav-link text-light" href="/">
                  BUY<span className="sr-only">(current)</span>
                </a>
              </li> */}
              <li className="nav-item">
                <Link to="/ekyc" className="nav-link text-light">
                  {aboutText}
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to="/login" className="nav-link text-light">
                  {aboutText1}
                </Link>
              </li> */}
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit">
                Search
              </button>
            </form>



            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            {/* {isLoggedIn ? (
              Display user name and a logout button when logged in
              <>
                <li className="nav-item">
                  <span className="nav-link text-light">{user}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link text-light" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : ( */}
              {/* Display the login link when not logged in */}
              <li className="nav-item">
                <Link to="/login" className="nav-link text-light">
                  {aboutText1}
                </Link>
              </li>
            {/* )} */}
          </ul>


          </div>
        </nav>
      </div>

      <Box />
      <Footer/>
    </>
  );
}

