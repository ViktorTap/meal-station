import React from "react";

const DishCard = ({ dish }) => {
  return (
    <section className="dish-card--main">
      <div className="dish-card--info-container">
        <h4>{dish.name}</h4>
        <p>{dish.description}</p>
        <p>💰 {dish.price}</p>
      </div>
      <img src={dish.dishPicture} alt="dish" />
    </section>
  );
};

export default DishCard;
