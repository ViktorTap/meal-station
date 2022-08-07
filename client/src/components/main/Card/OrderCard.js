import { Link } from "react-router-dom";

const OrderCard = ({ order, restaurantId, created }) => {
  return (
    <>
      {/* <Link to={`/restaurant/${restaurantId}/menu/${dish._id}`}> */}
      <section className="dish-card--main">
        <div className="dish-card--info-container">
          <h4>{order.items.name}</h4>

          {/* <p>{order.description}</p> */}
          <p>💰 {order.items.price}</p>
          <p>{created}</p>
        </div>
        <img src={order.dishPicture} alt="dish" />
      </section>
      {/* </Link> */}
    </>
  );
};

export default OrderCard;
