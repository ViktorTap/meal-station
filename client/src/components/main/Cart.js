import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import CartCard from "./Card/CartCard";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

const Cart = ({ cartItems, setCartItems }) => {
  const user = useAuth();
  const [success, setSuccess] = useState(false);
  const [sessionCart, setSessionCart] = useState([]);
  const [sessionTotalPrice, setSessionTotalPrice] = useState(0);

  const getAllCartItems = cartItems.map((item) => {
    return (
      <CartCard
        item={item}
        key={item.id}
        setCartItems={setCartItems}
        cartItems={cartItems}
      />
    );
  });

  let totalSum = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalSum += parseFloat(cartItems[i].price);
  }

  const today = format(new Date(), "dd.MM.yyyy HH:mm:ss");

  const restaurantIndex = cartItems[0]?.restaurantId;

  const handleSubmitCart = async (event) => {
    event.preventDefault();

    const firstname = user.auth.firstname;
    const lastname = user.auth.lastname;
    const address = user.auth.address;

    const response = await axios.put(
      `/${user.auth.id}/cart`,
      JSON.stringify({
        order: {
          items: cartItems,
          totalPrice: sessionTotalPrice,
          created: today,
        },
      }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log(response);
    const restaurantResponse = await axios.put(
      `restaurant/${restaurantIndex}/add-order`,
      JSON.stringify({
        order: {
          items: cartItems,
          firstname,
          lastname,
          address,
          totalPrice: sessionTotalPrice,
          created: today,
        },
      }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log(restaurantResponse);
    setSuccess(true);
    setSessionCart([]);
    setCartItems([]);
  };

  useEffect(() => {
    setSessionCart(getAllCartItems);
    setSessionTotalPrice(totalSum);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          margin: "5px 0 15px 0",
        }}
      >
        CART
      </h1>
      <main className="cart--main">
        {success ? (
          <section>
            <p>Thank You for purchase</p>
            <Link to={"/"}>
              <p>Go to Home page</p>
            </Link>
          </section>
        ) : (
          <section className="cart-section--container">
            <div className="cart-card--main">
              {user.auth.user
                ? sessionCart.length > 0
                  ? sessionCart
                  : "cart is empty"
                : "cart is empty"}
            </div>
          </section>
        )}
        {!success && sessionCart.length >= 1 ? (
          <div className="cart-section--order-price">
            <button
              onClick={handleSubmitCart}
              disabled={!sessionCart.length >= 1}
            >
              ORDER
            </button>
            <h2>TOTAL : {sessionTotalPrice} €</h2>
          </div>
        ) : (
          ""
        )}
      </main>
    </>
  );
};

export default Cart;
