import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "../../api/axios";
import RestaurantCard from "./Card/RestaurantCard";

export default function Category({ setRestaurants }) {
  const [cafe, setCafe] = useState(0);
  const [pizzeria, setPizzeria] = useState(0);
  const [burgers, setBurgers] = useState(0);
  const [fineDining, setFineDining] = useState(0);
  const [fastFood, setFastFood] = useState(0);
  const [familyStyle, setFamilyStyle] = useState(0);
  const [asian, setAsian] = useState(0);
  const [mediterranean, setMediterranean] = useState(0);
  const [pastries, setPastries] = useState(0);

  const categories = [
    {
      cover:
        "https://images.unsplash.com/photo-1561395049-69684aacf8de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      name: "Cafe",
      places: cafe,
      searchName: "cafe",
    },
    {
      cover:
        "https://images.unsplash.com/photo-1571066811602-716837d681de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=536&q=80",
      name: "Pizzeria",
      places: pizzeria,
      searchName: "pizzeria",
    },
    {
      cover:
        "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1630&q=80",
      name: "Burgers",
      places: burgers,
      searchName: "burgers",
    },
    {
      cover:
        "https://images.unsplash.com/photo-1623073284788-0d846f75e329?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      name: "Fine Dining",
      places: fineDining,
      searchName: "fine-dining",
    },
    {
      cover:
        "https://images.unsplash.com/photo-1576379392044-6d933410d374?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      name: "Fast Food",
      places: fastFood,
      searchName: "fast-food",
    },
    {
      cover:
        "https://images.unsplash.com/photo-1602097944182-c43423a8056d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80",
      name: "Family Style",
      places: familyStyle,
      searchName: "family-style",
    },
    {
      cover:
        "https://images.unsplash.com/photo-1512003867696-6d5ce6835040?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      name: "Asian",
      places: asian,
      searchName: "asian",
    },
    {
      cover:
        "https://images.unsplash.com/photo-1523986371872-9d3ba2e2a389?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80",
      name: "Mediterranean",
      places: mediterranean,
      searchName: "mediterranean",
    },
    {
      cover:
        "https://images.unsplash.com/photo-1603532648955-039310d9ed75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      name: "Pastries",
      places: pastries,
      searchName: "pastries",
    },
  ];

  const getAllByCategory = async (searchName) => {
    try {
      const response = await axios.get(`/category/${searchName}`);
      const allCafe = response.data.map((restaurant) => {
        return <RestaurantCard key={restaurant._id} restaurant={restaurant} />;
      });
      console.log(`/category/${searchName}`);
      setRestaurants(allCafe);
    } catch (err) {
      console.error(err);
    }
  };

  async function getCategoryLength(searchName, setter) {
    try {
      const response = await axios.get(`/category/${searchName}`);
      const categoryLength = await response.data.length;
      setter(categoryLength);
    } catch (error) {
      console.log(error);
    }
  }

  const category = categories.map((item) => {
    return (
      <div
        className="category--main-div"
        onClick={() => getAllByCategory(item.searchName)}
      >
        <section className="category--main-item" key={item.id}>
          <img src={item.cover} alt="category logo" />
          <h4>{item.name}</h4>
          <p>{item.places}</p>
        </section>
      </div>
    );
  });

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  useEffect(() => {
    getCategoryLength("cafe", setCafe);
    getCategoryLength("pizzeria", setPizzeria);
    getCategoryLength("burgers", setBurgers);
    getCategoryLength("fine-dining", setFineDining);
    getCategoryLength("fast-food", setFastFood);
    getCategoryLength("family-style", setFamilyStyle);
    getCategoryLength("asian", setAsian);
    getCategoryLength("mediterranean", setMediterranean);
    getCategoryLength("pastries", setPastries);
  }, [
    cafe,
    pizzeria,
    burgers,
    fineDining,
    fastFood,
    familyStyle,
    asian,
    mediterranean,
    pastries,
  ]);
  return (
    <div className="category--main">
      <Carousel infinite focusOnSelect="true" responsive={responsive}>
        {category}
      </Carousel>
    </div>
  );
}
