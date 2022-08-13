import React from "react";

const CartCard = ({ item }) => {
  return (
    <div key={item.id} className="cart-card--main-container">
      <h4>RESTAURANT NAME: </h4>
      <h3>{item.restaurantName}</h3>
      <img
        style={{
          height: "100px",
          width: "100px",
          borderRadius: "15px",
        }}
        src={item.dishPicture}
        alt="dish"
      />
      <p
        style={{
          margin: "10px 0 0 0",
        }}
      >
        Dish: {item.name}
      </p>
      <p
        style={{
          margin: "3px 0 3px 0",
        }}
      >
        Quantity: {item.quantity}
      </p>
      <p
        style={{
          margin: "0px 0 10px 0",
        }}
      >
        {item.price} €
      </p>
    </div>
  );
};

export default CartCard;
