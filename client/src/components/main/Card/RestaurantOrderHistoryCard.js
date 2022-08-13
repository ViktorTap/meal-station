import React from "react";

const RestaurantOrderHistoryCard = ({ order }) => {
  const mappedItems = order.items.map((item) => {
    return (
      <div key={item.id}>
        <p>{item.name}</p>
        <p>
          {item.quantity} {`pc${item.quantity > 1 ? "s" : ""}`}
        </p>
        <p>{item.price} €</p>
      </div>
    );
  });
  return (
    <main className="RestaurantOrderHistory--main">
      <section>
        <h3>Order made: {order.created}</h3>
        <h4>ITEMS:</h4>
        {mappedItems}
        <h4>
          Ordered by: {order.firstname} {order.lastname}
        </h4>
        <h4>Delivered to: {order.address}</h4>
        <h3>TOTAL: {order.totalPrice} €</h3>
      </section>
    </main>
  );
};

export default RestaurantOrderHistoryCard;
