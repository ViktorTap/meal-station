const OrderCard = ({ order }) => {
  // Need to make this cleaner

  const mappedItems = order.items.map((item) => {
    return (
      <p
        key={item.id}
        style={{
          margin: "0 0 3px 0",
        }}
      >
        {item.name}
      </p>
    );
  });

  const orders = (
    <div>
      <p>
        <strong>Ordered:</strong> {order.created}
      </p>
      <h4>Items:</h4>
      {mappedItems}
      <p
        style={{
          margin: "3px 0 3px 0",
        }}
      >
        💰 {order.totalPrice} €
      </p>
    </div>
  );

  return (
    <>
      {/* <Link to={`/restaurant/${restaurantId}/menu/${dish._id}`}> */}
      <section className="dish-card--main">
        <div className="dish-card--info-container">{orders}</div>
      </section>
      {/* </Link> */}
    </>
  );
};

export default OrderCard;
