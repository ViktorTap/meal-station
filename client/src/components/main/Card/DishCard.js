import { Link } from "react-router-dom";

const DishCard = ({ dish, restaurantId }) => {
  return (
    <>
      <Link to={`/restaurant/${restaurantId}/menu/${dish._id}`}>
        <section className="dish-card--main">
          <div className="dish-card--info-container">
            <h4>{dish.name}</h4>
            <p>{dish.description}</p>
            <p>💰 {dish.price}</p>
          </div>
          <img src={dish.dishPicture} alt="dish" />
        </section>
      </Link>
    </>
  );
};

export default DishCard;
