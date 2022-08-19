import RestaurantCard from "../main/Card/RestaurantCard";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

import OrderCard from "../main/Card/OrderCard";

const UserProfile = ({
  profileRestaurants,
  setProfileRestaurants,
  cartItems,
  setCartItems,
}) => {
  const navigate = useNavigate();
  const { auth, setAuth, remove } = useContext(AuthContext);

  const [ordersHistory, setOrdersHistory] = useState([]);

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
          return (
            <OrderCard
              key={orderObjectArr.id}
              order={order}
              items={orderObjectArr}
            />
          );
        });

        setOrdersHistory(ordersReadyForCard);
      }
      getOrdersFromOrders();
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

  // UPDATING USER
  const [updateActive, setUpdateActive] = useState(false);
  const [updateProfile, setUpdateProfile] = useState({
    firstname: user.auth.firstname,
    lastname: user.auth.lastname,
    address: user.auth.address,
    phoneNumber: user.auth.phoneNumber ? user.auth.phoneNumber : "",
  });

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

  const handleInfoChange = (event) => {
    const { name, value } = event.target;

    setUpdateProfile((prevProfile) => {
      return {
        ...prevProfile,
        [name]: value,
      };
    });
  };

  const handleInfoUpdate = async (event) => {
    event.preventDefault();

    const firstname = updateProfile.firstname;
    const lastname = updateProfile.lastname;
    const address = updateProfile.address;
    const phoneNumber = updateProfile.phoneNumber
      ? updateProfile.phoneNumber
      : "";

    try {
      const response = await axios.patch(
        `/profile/${user.auth.id}`,
        JSON.stringify({
          firstname,
          lastname,
          address,
          phoneNumber,
        }),

        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setAuth({
        ...auth,
        firstname: firstname,
        lastname: lastname,
        address: address,
        phoneNumber: phoneNumber,
      });

      setUpdateActive(false);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOwnersRestaurants();
    getAllUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="profile--main">
      <section className="profile--container">
        {updateActive ? (
          <div className="profile--info">
            <form onSubmit={handleInfoUpdate}>
              <label htmlFor="firstname">Firstname: </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                autoComplete="off"
                required
                value={updateProfile.firstname}
                onChange={handleInfoChange}
              />
              <label htmlFor="lastname">Lastname: </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                required
                value={updateProfile.lastname}
                onChange={handleInfoChange}
              />
              <label htmlFor="address">Address: </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                value={updateProfile.address}
                onChange={handleInfoChange}
              />
              {user.auth.phoneNumber && (
                <>
                  <label htmlFor="phoneNumber">Phone: </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    value={updateProfile.phoneNumber}
                    onChange={handleInfoChange}
                  />
                </>
              )}
              <button>SUBMIT</button>
            </form>
            <button onClick={() => setUpdateActive(false)}>CANCEL</button>
          </div>
        ) : (
          <div className="profile--info">
            <h4>PROFILE</h4>
            <p>Username: {user.auth.user}</p>
            <p>Firstname: {user.auth.firstname}</p>
            <p>Lastname: {user.auth.lastname}</p>
            <p>Address: {user.auth.address}</p>
            {user.auth.phoneNumber && <p>Phone: {user.auth.phoneNumber}</p>}
            <p>{`${
              user.auth.roles[0] === 1984
                ? "You have owner's rights"
                : "You have user's rights"
            }`}</p>
            <button onClick={() => setUpdateActive(true)}>UPDATE</button>
          </div>
        )}

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
        </div>
      </section>
      <section className="profile--my-restaurants">
        <div className="profile--my-restaurants-cards">
          {profileRestaurants}
        </div>
      </section>
    </main>
  );
};

export default UserProfile;
