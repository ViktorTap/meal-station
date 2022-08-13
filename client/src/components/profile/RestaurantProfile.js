import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import Menu from "../main/Menu";
import useAuth from "../../hooks/useAuth";
import RestaurantOrderHistoryCard from "../main/Card/RestaurantOrderHistoryCard";

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
  setRestaurantData,
}) {
  const { id } = useParams();
  const API_URL_BY_ID = `/restaurant/${id}`;
  const user = useAuth();
  const userId = user.auth.id;

  const [orderHistory, setOrderHistory] = useState([]);

  async function getRestaurantById() {
    try {
      const response = await axios.get(API_URL_BY_ID);
      const restaurant = response.data;
      console.log(restaurant);
      setRestaurantData(restaurant);
      const RestaurantById = () => {
        return (
          <div key={restaurant._id} className="restaurant-profile--main">
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
            {user.auth.user && userId === restaurantOwnerId ? (
              <Link
                to={`/restaurant/${id}/menu/create`}
                style={{
                  textDecoration: "none",
                  color: "green",
                  fontWeight: "bolder",
                }}
              >{`Create new dish for ${restaurantName}`}</Link>
            ) : (
              ""
            )}
          </div>
        );
      };

      function getOrdersFromRestaurant() {
        const restaurantOrders = restaurant.orders;

        let orderArr = [];
        let orderItemsArr = [];
        let orderItemsObjectArr = [];

        if (restaurantOrders.length) {
          for (let i = 0; i < restaurantOrders.length; i++) {
            for (let x = 0; x < restaurantOrders[i].length; x++) {
              orderArr.push(restaurantOrders[i][x].order);
              orderItemsArr.push(restaurantOrders[i][x].order.items);
            }
          }

          for (let y = 0; y < orderItemsArr.length; y++) {
            for (let z = 0; z < orderItemsArr[y].length; z++) {
              orderItemsObjectArr.push(orderItemsArr[y][z]);
            }
          }
        }

        const ordersReadyForCard = orderArr.reverse().map((order) => {
          return (
            <RestaurantOrderHistoryCard
              key={order.items.id}
              order={order}
              items={orderItemsObjectArr}
            />
          );
        });

        setOrderHistory(ordersReadyForCard);
      }

      getOrdersFromRestaurant();

      setRestaurantOwnerId(restaurant.ownerId);
      setRestaurantName(restaurant.name);
      setRestaurantProfile(RestaurantById);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getRestaurantById();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <section className="restaurant-profile--container-main">
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

        <div>{restaurantProfile}</div>
      </section>
      {user.auth.user && userId === restaurantOwnerId ? (
        <section className="restaurant-profile--order-history-main">
          <h1>RESTAURANT ORDER HISTORY</h1>
          {orderHistory}
        </section>
      ) : (
        ""
      )}
    </main>
  );
}
