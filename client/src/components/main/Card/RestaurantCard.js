import React from "react";
import { useNavigate } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  return (
    <div
      className="restaurant-card--main"
      onClick={() => navigate(`/restaurant/${restaurant._id}`)}
    >
      {/* <Link to={`/restaurant/${restaurant._id}`}> */}
      <h1
        style={{
          textAlign: "center",
          lineHeight: "90%",
        }}
      >
        {restaurant.name}
      </h1>
      {/* </Link> */}
      <img src={restaurant.restaurantPicture} alt="restaurant" />
      <p className="restaurant-card--description">{restaurant.description}</p>
      <div className="restaurant-card--categories">
        <p>{restaurant.category[0] ? restaurant.category[0] : ""}</p>
        <p>{restaurant.category[1] ? restaurant.category[1] : ""}</p>
        <p>{restaurant.category[2] ? restaurant.category[2] : ""}</p>
      </div>
      <p className="restaurant-card--price-class">
        Price class: {"$".repeat(restaurant.priceClass)}
      </p>
    </div>
  );
};

export default RestaurantCard;
