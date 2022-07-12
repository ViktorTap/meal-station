import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header--main">
      <Link to={"/"}>
        <div className="header--logo">
          <img src="./images/logo-meal-station.png" alt="company logo" />

          <h1>MEAL STATION</h1>
        </div>
      </Link>
      <nav className="header--navigation">
        <div>SEARCH</div>
        <Link to={"/register-user"}>
          <h3>REGISTER</h3>
        </Link>
        <Link to={"/auth"}>
          <h3>SIGN IN</h3>
        </Link>
        <h3>PROFILE</h3>
      </nav>
    </header>
  );
}
