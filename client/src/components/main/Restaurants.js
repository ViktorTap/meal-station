import { useEffect } from "react";
import RestaurantCard from "./Card/RestaurantCard";
import axios from "../../api/axios";

export default function Restaurants({ restaurants, setRestaurants }) {
  const API_URL = "/restaurant/all";
  async function getAllRestaurants() {
    try {
      const response = await axios.get(API_URL);

      const allRestaurants = response.data.map((restaurant) => {
        return <RestaurantCard key={restaurant._id} restaurant={restaurant} />;
      });
      setRestaurants(allRestaurants);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getAllRestaurants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <main className="restaurants--main">{restaurants}</main>;
}
