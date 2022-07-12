import React from "react";
import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="restaurant-card--main">
      <Link to={`/restaurant/${restaurant._id}`}>
        <h1>{restaurant.name}</h1>
      </Link>
      <img src={restaurant.restaurantPicture} alt="restaurant" />
      <p className="restaurant-card--description">{restaurant.description}</p>
      <p>
        {restaurant.category[0] ? restaurant.category[0] : ""}
        <br />
        {restaurant.category[1] ? restaurant.category[1] : ""}
        <br />
        {restaurant.category[2] ? restaurant.category[2] : ""}
        <br />
        <p>{restaurant._id}</p>
      </p>
      <p className="restaurant-card--price-class">
        Price: {"$".repeat(restaurant.priceClass)}
      </p>
    </div>
  );
};

export default RestaurantCard;
