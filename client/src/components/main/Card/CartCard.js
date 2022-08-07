import React from "react";

const CartCard = ({ item }) => {
  return (
    <div key={item.id} className="cart-card--main-container">
      <h4>{item.restaurantName}</h4>
      <img
        style={{
          height: "100px",
          width: "100px",
        }}
        src={item.dishPicture}
        alt="dish"
      />
      <p>{item.name}</p>
      <p>{item.quantity}</p>
      <p>{item.price} €</p>
    </div>
  );
};

export default CartCard;
