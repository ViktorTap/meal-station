import RestaurantCard from "../main/Card/RestaurantCard";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";

import OrderCard from "../main/Card/OrderCard";

const UserProfile = ({
  profileRestaurants,
  setProfileRestaurants,
  cartItems,
  setCartItems,
}) => {
  const navigate = useNavigate();
  const { remove } = useContext(AuthContext);

  const [ordersHistory, setOrdersHistory] = useState([]);
  const [wholeOrders, setWholeOrders] = useState("");

  const user = useAuth();
  const GET_RESTAURANTS_BY_OWNER_ID = `/profile/${user.auth.id}/restaurants`;

  const getOwnersRestaurants = async () => {
    try {
      const response = await axios.get(GET_RESTAURANTS_BY_OWNER_ID);
      const restaurants = response.data;
      const OwnersRestaurants = restaurants.map((restaurant) => {
        return <RestaurantCard key={restaurant._id} restaurant={restaurant} />;
      });
      setProfileRestaurants(OwnersRestaurants);
    } catch (err) {
      console.error(err);
    }
  };

  const getAllUserInfo = async () => {
    try {
      const response = await axios.get(`/profile/${user.auth.id}`);
      const userDataOrders = response.data.orders;

      // console.log(userDataOrders);
      // console.log(userDataOrders[0][0].order.items);

      function getOrdersFromOrders() {
        let orderArr = [];
        let orderItemsArrs = [];
        let orderObjectArr = [];

        if (userDataOrders.length) {
          for (let i = 0; i < userDataOrders.length; i++) {
            for (let x = 0; x < userDataOrders[i].length; x++) {
              orderArr.push(userDataOrders[i][x].order);
              orderItemsArrs.push(userDataOrders[i][x].order.items);
            }
          }

          for (let y = 0; y < orderItemsArrs.length; y++) {
            for (let z = 0; z < orderItemsArrs[y].length; z++) {
              orderObjectArr.push(orderItemsArrs[y][z]);
            }
          }
        }

        const ordersReadyForCard = orderArr.reverse().map((order) => {
          return <OrderCard order={order} items={orderObjectArr} />;
        });
        // const toimiiko = orderObjectArr.map((items) => {
        //   return <OrderCard items={items} order={orderArr} />;
        // });

        setOrdersHistory(ordersReadyForCard);
      }
      getOrdersFromOrders();
      // const wholeOrdersArr = wholeOrders.map((array) =>
      //   array.map((order, index) => {
      //     return <OrderCard order={order} key={index} />;
      //   })
      // );
      // const orderItems = wholeOrders.order.items.map((item) => {
      //   return <OrderCard order={item} key={item.id} />;
      // });
      // const getItemsFromOrders = wholeOrders.order.items.map((order) => {
      //   return <OrderCard order={order.items} key={order.id} />;
      // });
      // const mappedOrders = userDataOrders.map((arr) =>
      //   arr.map((element) =>
      //     element.items.map((item) => {
      //       return console.log(item);
      //     })
      //   )
      // );

      // const oikeastikko = toimiiko.map((element, index) =>
      //   element.map((orderi) => {
      //     return orderi.map((item) => {
      //       return <OrderCard order={item} key={item.id} />;
      //     });
      //   })
      // );
      // setOrdersHistory(oikeastikko);

      // setOrdersHistory(wholeOrdersArr);
      // console.log("mapped : ", mappedOrders);
      // console.log(userDataOrders.length);
    } catch (error) {
      console.log(error);
    }
  };

  async function logout() {
    if (cartItems.length > 0) {
      if (
        window.confirm(
          "Your cart is not empty\nItems will be deleted after logout"
        )
      ) {
        try {
          await axios.get("/logout");
        } catch (err) {
          console.error(err);
        }
        setCartItems([]);
        remove();
        navigate("/");
      }
    } else {
      try {
        await axios.get("/logout");
      } catch (err) {
        console.error(err);
      }
      setCartItems([]);
      remove();
      navigate("/");
    }
  }

  const [active, setActive] = useState(false);

  const handleClick = () => {
    navigate("/restaurant/register-restaurant");
  };
  const buttonStyle = {
    width: "100%",
    height: "5vh",
    borderRadius: "15px",
    fontSize: "large",
    boxShadow: "1.5px 3px",
    backgroundColor: "#fffcf4",
  };

  const activeButtonStyle = {
    width: "100%",
    height: "5vh",
    borderRadius: "15px",
    fontSize: "large",
    backgroundColor: "#fff",
    boxShadow: "0px 0.5px",
  };

  useEffect(() => {
    getOwnersRestaurants();
    getAllUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="profile--main">
      <section className="profile--container">
        <div className="profile--info">
          <h4>PROFILE</h4>

          <p>username: {user.auth.user}</p>
          <p>firstname: {user.auth.firstname}</p>
          <p>lastname: {user.auth.lastname}</p>
          <p>address: {user.auth.address}</p>
          <p>{`${
            user.auth.roles[0] === 1984
              ? "You have owner's rights"
              : "You have user's rights"
          }`}</p>
        </div>
        <div className="profile--buttons">
          <button onClick={logout}>LOGOUT</button>
          <div
            style={{
              width: "100%",
            }}
          >
            {user.auth.roles[0] === 1984 ? (
              // <Link to={"/restaurant/register-restaurant"}>
              <button
                type="button"
                onMouseDown={() => setActive(true)}
                onMouseLeave={() => setActive(false)}
                onClick={handleClick}
                id="linkButton"
                style={!active ? buttonStyle : activeButtonStyle}
              >
                Register new restaurant
              </button>
            ) : (
              // </Link>
              ""
            )}
          </div>
        </div>
        <div className="profile--orders">
          <h4>ORDERS HISTORY</h4>
          {ordersHistory}
          {/* {user.auth.orders && orders.length > 1 ? orders : "No orders yet"} */}
        </div>
      </section>
      <section className="profile--my-restaurants">
        <div>{profileRestaurants}</div>
      </section>
    </main>
  );
};

export default UserProfile;
