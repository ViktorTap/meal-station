import { useNavigate } from "react-router-dom";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CartCard = ({ item, cartItems, setCartItems }) => {
  const navigate = useNavigate();

  const deleteItemFromCart = (id) => {
    // console.log("CART ITEMS BEFORE FILTER: ", cartItems);
    const filteredCart = cartItems.filter((item) => item.id !== id);
    setCartItems(filteredCart);
  };

  return (
    <main key={item.id} className="cart-card--main-container">
      <h3>{item.restaurantName}</h3>

      <FontAwesomeIcon
        onClick={() => deleteItemFromCart(item.id)}
        className="cart-card--delete-item"
        type="button"
        icon={faMinusCircle}
        // style={{
        //   position: "relative",
        //   left: "45%",
        //   top: "-13%",
        //   color: "red",
        // }}
      />

      <img
        onClick={() => navigate(`/restaurant/${item.restaurantId}`)}
        style={{
          height: "100px",
          width: "100px",
          borderRadius: "15px",
          cursor: "pointer",
        }}
        src={item.dishPicture}
        alt="dish"
      />
      <p
        style={{
          margin: "10px 0 0 0",
        }}
      >
        {item.name}
      </p>

      <p
        style={{
          margin: "3px 0 3px 0",
        }}
      >
        {item.quantity}
      </p>

      <p
        style={{
          margin: "0px 0 10px 0",
        }}
      >
        {item.price} €
      </p>
    </main>
  );
};

export default CartCard;
