import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "../../api/axios";
import Menu from "../main/Menu";
import useAuth from "../../hooks/useAuth";

export default function RestaurantProfile({
  restaurantProfile,
  setRestaurantProfile,
  restaurantName,
  setRestaurantName,
  restaurantOwnerId,
  setRestaurantOwnerId,
  menu,
  setMenu,
  setCart,
  quantity,
  setQuantity,
  order,
  setOrder,
}) {
  const { id } = useParams();
  const API_URL_BY_ID = `/restaurant/${id}`;
  const user = useAuth();
  const userId = user.auth.id;

  async function getRestaurantById() {
    try {
      const response = await axios.get(API_URL_BY_ID);
      const restaurant = response.data;

      const RestaurantById = () => {
        return (
          <div key={restaurant.id} className="restaurant-profile--main">
            <h1>{restaurant.name}</h1>

            <img src={restaurant.restaurantPicture} alt="restaurant" />
            <h4 style={{ fontStyle: "italic" }}>"{restaurant.description}"</h4>
            <p>Come visit us: {restaurant.address}</p>
            <p>Price class: {"$".repeat(restaurant.priceClass)}</p>
            <div className="restaurant-profile--category-container">
              <h4>Category: </h4>
              <p>{restaurant.category[0]} </p>
              <p>{restaurant.category[1] ? restaurant.category[1] : ""} </p>
              <p>{restaurant.category[2] ? restaurant.category[2] : ""} </p>
            </div>
            <p>We are open: {restaurant.openHours}</p>
          </div>
        );
      };

      setRestaurantOwnerId(restaurant.ownerId);
      setRestaurantName(restaurant.name);
      setRestaurantProfile(RestaurantById);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    getRestaurantById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="restaurant-profile--container-main">
      <Menu
        restaurantId={id}
        menu={menu}
        setMenu={setMenu}
        setCart={setCart}
        restaurantName={restaurantName}
        quantity={quantity}
        setQuantity={setQuantity}
        order={order}
        setOrder={setOrder}
      />

      <div>
        {restaurantProfile}

        {user.auth.user && userId === restaurantOwnerId ? (
          <Link
            to={`/restaurant/${id}/menu/create`}
          >{`Create new dish for ${restaurantName}`}</Link>
        ) : (
          ""
        )}
      </div>
    </main>
  );
}
