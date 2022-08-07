import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Header({ refreshPage, setRefreshPage }) {
  const user = useAuth();

  return (
    <header className="header--main">
      <Link to={"/"} onClick={() => setRefreshPage(!refreshPage)}>
        <div className="header--logo">
          <img src="./images/logo-meal-station.png" alt="company logo" />

          <h1>MEAL STATION</h1>
        </div>
      </Link>
      <nav className="header--navigation">
        {/* Need to make search engine here */}
        {/* <div>SEARCH</div> */}
        <Link to={"/register-user"}>
          <h3>REGISTER</h3>
        </Link>
        <Link to={"/auth"}>
          <h3>SIGN IN</h3>
        </Link>
        <Link to="/profile">
          <h3>{user.auth.user ? user.auth.user : "PROFILE"}</h3>
        </Link>

        <Link to="/cart">
          <h3>CART</h3>
        </Link>
      </nav>
    </header>
  );
}
