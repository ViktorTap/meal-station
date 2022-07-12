import React from "react";
import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

const RESTAURANT_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/; //start with a-zA-Z must be followed by next array and must be 3 - 23 char long
const REGISTER_URL = "/restaurant/register-restaurant";

export default function RestaurantRegistration() {
  const restaurantRef = useRef();
  const errRef = useRef();

  const [restaurant, setRestaurant] = useState({
    name: "",
    description: "",
    address: "",
    category: [],
    //   {
    //     name: "Cafe",
    //     checked: false,
    //   },
    //   {
    //     name: "Pizzeria",
    //     checked: false,
    //   },
    //   {
    //     name: "Burgers",
    //     checked: false,
    //   },
    //   {
    //     name: "Buffet",
    //     checked: false,
    //   },
    //   {
    //     name: "Fine Dining",
    //     checked: false,
    //   },
    //   {
    //     name: "Fast Food",
    //     checked: false,
    //   },
    //   {
    //     name: "Family Style",
    //     checked: false,
    //   },
    //   {
    //     name: "Asian",
    //     checked: false,
    //   },
    //   {
    //     name: "Mediterranean",
    //     checked: false,
    //   },
    //   {
    //     name: "Pastries",
    //     checked: false,
    //   },
    phoneNumber: "",
    priceClass: "",
    openHours: "",
  });
  const [validName, setValidName] = useState(false);
  const [restaurantFocus, setRestaurantFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    restaurantRef.current.focus();
  }, []);

  useEffect(() => {
    const name = restaurant.name;
    const result = RESTAURANT_REGEX.test(name);
    setValidName(result);
  }, [restaurant]);

  useEffect(() => {
    console.log(restaurant);
    setErrMsg("");
  }, [restaurant]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setRestaurant((prevRestaurant) => {
      return {
        ...prevRestaurant,
        [name]: value,
        category:
          type === "checkbox"
            ? [...prevRestaurant.category, value]
            : [...prevRestaurant.category],
      };
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if button enabled with JS hack
    const v1 = RESTAURANT_REGEX.test(restaurant.name);

    const name = restaurant.name;
    const description = restaurant.description;
    const address = restaurant.address;
    const category = restaurant.category;
    const phoneNumber = restaurant.phoneNumber;
    const priceClass = restaurant.priceClass;
    const openHours = restaurant.openHours;

    if (!v1) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          name,
          description,
          address,
          category,
          phoneNumber,
          priceClass,
          openHours,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);
      setSuccess(true);
      // clear input fields set states back to empty strings
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Restaurant Name Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to={"/"}>
              <h4>Sign In</h4>
            </Link>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={
              errMsg
                ? ".user-registration--errmsg"
                : "user-registration--offscreen"
            }
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <div className="user-registration--main">
            <h1>Restaurant Registration</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">
                Name:
                <span
                  className={
                    validName
                      ? "user-registration--valid"
                      : "user-registration--hide"
                  }
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    validName || !restaurant.name
                      ? "user-registration--hide"
                      : "user-registration--invalid"
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={restaurant.name}
                ref={restaurantRef}
                autoComplete="off"
                onChange={handleChange}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="user-registration--uidnote"
                onFocus={() => setRestaurantFocus(true)}
                onBlur={() => setRestaurantFocus(false)}
              />
              <p
                id="user-registration--uidnote"
                className={
                  restaurantFocus && restaurant.name && !validName
                    ? "user-registration--instructions"
                    : "user-registration--offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
              <br />
              <label htmlFor="description">Description:</label>
              <textarea
                type="text"
                id="description"
                name="description"
                value={restaurant.description}
                ref={restaurantRef}
                onChange={handleChange}
                required
                placeholder="Tell about your restaurant"
                onFocus={() => setRestaurantFocus(true)}
                onBlur={() => setRestaurantFocus(false)}
              />
              <br />
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={restaurant.address}
                ref={restaurantRef}
                onChange={handleChange}
                onFocus={() => setRestaurantFocus(true)}
                onBlur={() => setRestaurantFocus(false)}
              />
              <br />
              <section className="user-registration--categories">
                <h4>Category</h4>
                <label htmlFor="cafe">Cafe: </label>
                <input
                  type="checkbox"
                  id="cafe"
                  name="category"
                  value="Cafe"
                  ref={restaurantRef}
                  onChange={handleChange}
                  onFocus={() => setRestaurantFocus(true)}
                  onBlur={() => setRestaurantFocus(false)}
                />
                <label htmlFor="pizzeria">Pizzeria: </label>
                <input
                  type="checkbox"
                  id="pizzeria"
                  name="category"
                  value="Pizzeria"
                  ref={restaurantRef}
                  onChange={handleChange}
                  onFocus={() => setRestaurantFocus(true)}
                  onBlur={() => setRestaurantFocus(false)}
                />
                {/* 
                <label htmlFor="burgers">Burgers: </label>
                <input
                  type="checkbox"
                  id="burgers"
                  name={restaurant.category[2].name}
                  value={restaurant.category[2].name}
                  ref={restaurantRef}
                  onChange={(e) => e.target.checked}
                  onFocus={() => setRestaurantFocus(true)}
                  onBlur={() => setRestaurantFocus(false)}
                />
                <label htmlFor="buffet">Buffet: </label>
                <input
                  type="checkbox"
                  id="buffet"
                  name={restaurant.category[3].name}
                  value={restaurant.category[3].name}
                  ref={restaurantRef}
                  onChange={(e) => e.target.checked}
                  onFocus={() => setRestaurantFocus(true)}
                  onBlur={() => setRestaurantFocus(false)}
                />
                <label htmlFor="fine-dining">Fine Dining: </label>
                <input
                  type="checkbox"
                  id="fine-dining"
                  name={restaurant.category[4].name}
                  value={restaurant.category[4].name}
                  ref={restaurantRef}
                  onChange={(e) => e.target.checked}
                  onFocus={() => setRestaurantFocus(true)}
                  onBlur={() => setRestaurantFocus(false)}
                />
                <label htmlFor="fast-food">Fast Food: </label>
                <input
                  type="checkbox"
                  id="fast-food"
                  name={restaurant.category[5].name}
                  value={restaurant.category[5].name}
                  ref={restaurantRef}
                  onChange={(e) => e.target.checked}
                  onFocus={() => setRestaurantFocus(true)}
                  onBlur={() => setRestaurantFocus(false)}
                />
                <label htmlFor="family-style">Family Style: </label>
                <input
                  type="checkbox"
                  id="family-style"
                  name={restaurant.category[6].name}
                  value={restaurant.category[6].name}
                  ref={restaurantRef}
                  onChange={(e) => e.target.checked}
                  onFocus={() => setRestaurantFocus(true)}
                  onBlur={() => setRestaurantFocus(false)}
                />
                <label htmlFor="asian">Asian: </label>
                <input
                  type="checkbox"
                  id="asian"
                  name={restaurant.category[7].name}
                  value={restaurant.category[7].name}
                  ref={restaurantRef}
                  onChange={(e) => e.target.checked}
                  onFocus={() => setRestaurantFocus(true)}
                  onBlur={() => setRestaurantFocus(false)}
                />

                <label htmlFor="mediterranean">Mediterranean: </label>
                <input
                  type="checkbox"
                  id="mediterranean"
                  name={restaurant.category[8].name}
                  value={restaurant.category[8].name}
                  ref={restaurantRef}
                  onChange={(e) => e.target.checked}
                  onFocus={() => setRestaurantFocus(true)}
                  onBlur={() => setRestaurantFocus(false)}
                />

                <label htmlFor="pastries">Pastries: </label>
                <input
                  type="checkbox"
                  id="pastries"
                  name={restaurant.category[8].name}
                  value={restaurant.category[8].name}
                  ref={restaurantRef}
                  onChange={(e) => e.target.checked}
                  onFocus={() => setRestaurantFocus(true)}
                  onBlur={() => setRestaurantFocus(false)}
                /> */}
              </section>
              <br />
              <label htmlFor="phoneNumber">Phone:</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={restaurant.phoneNumber}
                onChange={handleChange}
                required
                onFocus={() => setRestaurantFocus(true)}
                onBlur={() => setRestaurantFocus(false)}
              />
              <br />
              <label htmlFor="priceClass">Price Class:</label>
              <input
                type="range"
                id="priceClass"
                min="1"
                max="5"
                name="priceClass"
                onChange={handleChange}
                value={restaurant.priceClass}
                required
                onFocus={() => setRestaurantFocus(true)}
                onBlur={() => setRestaurantFocus(false)}
              />
              {restaurant.priceClass}
              <br />
              <label htmlFor="openHours">We are open:</label>

              <input
                type="text"
                id="openHours"
                name="openHours"
                onChange={handleChange}
                value={restaurant.openHours}
                required
                aria-describedby="user-registration--uidnote"
                onFocus={() => setRestaurantFocus(true)}
                onBlur={() => setRestaurantFocus(false)}
              />
              <p
                id="user-registration--uidnote"
                className={
                  restaurantFocus && restaurant.openHours
                    ? "user-registration--instructions"
                    : "user-registration--offscreen"
                }
              >
                Example: 10:00 - 19:00
              </p>
              <br />
              <button
                disabled={!validName ? true : false}
              >{`Register ${restaurant.name} as a new one`}</button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}
