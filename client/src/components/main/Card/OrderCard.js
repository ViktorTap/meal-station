import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {
  // Need to make this cleaner

  const mappedItems = order.items.map((item) => {
    return <p>{item.name}</p>;
  });

  const orders = (
    <div>
      <p>{order.created}</p>
      <p>{mappedItems}</p>
      <p>💰 {order.totalPrice}</p>
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
