import React, { useState } from "react";
import "./navbar.css";

import { GiHamburgerMenu } from "react-icons/gi";

import { NavLink, useNavigate } from "react-router-dom";



const Nav = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const auth = localStorage.getItem("user");

  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <>
    {auth?
      <nav className="main-nav">
       
        <div className="logo">
          <h2>
            <span>GYP</span>
          </h2>
        </div>

        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>
            <li>
              <NavLink to="/">All Product</NavLink>
            </li>
            <li>
              <NavLink to="/add">Add Product</NavLink>
            </li>
            <li>
              <NavLink to="/select">Update Product</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
                <NavLink to="/signup" onClick={logout}>
                  Logout({JSON.parse(auth).name})
                </NavLink>
              </li>
          </ul>
        </div>

   
        <div className="social-media">

     
          <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu style={{ color: 'white' }}/>
            </a>
          </div>
        </div>
      </nav>
      :
      <nav className="main-nav">

      <div className="logo">
        <h2>
          <span>E</span>xclusive
          <span>S</span>tore
        </h2>
      </div>


      <div
        className={
          showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
        }>
        <ul>
          <li>
              <NavLink to="/signup">
                SignUp
              </NavLink>
            </li>
            <li>
            <NavLink to="/login">Login</NavLink>
            </li>
        </ul>
      </div>

 
      <div className="social-media">

        <div className="hamburger-menu">
          <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
            <GiHamburgerMenu style={{ color: 'white' }} />
          </a>
        </div>
      </div>
    </nav>
      }
      
    </>
  );
};

export default Nav;
