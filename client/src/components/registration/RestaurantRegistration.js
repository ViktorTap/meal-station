import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RESTAURANT_REGEX = /^[a-zA-Z][a-zA-Z0-9-_ ]{3,23}$/; //start with a-zA-Z must be followed by next array and must be 3 - 23 char long
const REGISTER_URL = "/restaurant/register-restaurant";

export default function RestaurantRegistration() {
  const restaurantRef = useRef();
  const errRef = useRef();

  const user = useAuth();
  const id = user.auth.id;
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState({
    ownerId: id,
    name: "",
    description: "",
    address: "",
    category: [],
    phoneNumber: "",
    priceClass: 3,
    openHours: "",
    restaurantPicture: "",
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
    // console.log(restaurant);
    setErrMsg("");
  }, [restaurant]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setRestaurant((prevRestaurant) => {
      return {
        ...prevRestaurant,
        [name]: value,
        category:
          type === "checkbox" && checked
            ? [...prevRestaurant.category, value]
            : [...prevRestaurant.category.filter((event) => event !== value)],
      };
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if button enabled with JS hack
    const v1 = RESTAURANT_REGEX.test(restaurant.name);

    const ownerId = restaurant.ownerId;
    const name = restaurant.name;
    const description = restaurant.description;
    const address = restaurant.address;
    const category = restaurant.category;
    const phoneNumber = restaurant.phoneNumber;
    const priceClass = restaurant.priceClass;
    const openHours = restaurant.openHours;
    const restaurantPicture = restaurant.restaurantPicture;

    if (!v1) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          ownerId,
          name,
          description,
          address,
          category,
          phoneNumber,
          priceClass,
          openHours,
          restaurantPicture,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
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

  function checkBoxLimit() {
    const checkBoxGroup = document.forms["restaurant-registration"]["category"];
    const limit = 3;

    for (let i = 0; i < checkBoxGroup.length; i++) {
      checkBoxGroup[i].onclick = function () {
        let checkedCount = 0;
        for (let i = 0; i < checkBoxGroup.length; i++) {
          checkedCount += checkBoxGroup[i].checked ? 1 : 0;
        }
        if (checkedCount > limit) {
          alert(`You can select maximum of ${limit} checkboxes.`);
          this.checked = false;
        }
      };
    }
  }

  return (
    <>
      {success ? (
        <section>
          <h1>
            Success! New restaurant {restaurant.name} has been registered!
          </h1>
          <p>
            <Link to={"/"}>
              <h4>Home Page</h4>
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
            <form
              name="restaurant-registration"
              onSubmit={handleSubmit}
              className="restaurant-registration--form"
            >
              <label htmlFor="name">
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
                Letters, numbers, underscores, spaces, hyphens allowed.
              </p>

              <label htmlFor="description">Description:</label>
              <textarea
                type="text"
                id="description"
                name="description"
                rows="5"
                cols="33"
                value={restaurant.description}
                ref={restaurantRef}
                onChange={handleChange}
                required
                placeholder="Tell about your restaurant"
                onFocus={() => setRestaurantFocus(true)}
                onBlur={() => setRestaurantFocus(false)}
              />

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

              <section className="restaurant-registration--categories">
                <h4>Category</h4>

                <li>
                  <label htmlFor="cafe">Cafe </label>
                  <input
                    type="checkbox"
                    id="cafe"
                    name="category"
                    value="Cafe"
                    ref={restaurantRef}
                    onChange={handleChange}
                    onClick={checkBoxLimit}
                    onFocus={() => setRestaurantFocus(true)}
                    onBlur={() => setRestaurantFocus(false)}
                  />
                </li>
                <li>
                  <label htmlFor="pizzeria">Pizzeria </label>
                  <input
                    type="checkbox"
                    id="pizzeria"
                    name="category"
                    value="Pizzeria"
                    ref={restaurantRef}
                    onChange={handleChange}
                    onClick={checkBoxLimit}
                    onFocus={() => setRestaurantFocus(true)}
                    onBlur={() => setRestaurantFocus(false)}
                  />
                </li>
                <li>
                  <label htmlFor="burgers">Burgers </label>
                  <input
                    type="checkbox"
                    id="burgers"
                    name="category"
                    value="Burgers"
                    ref={restaurantRef}
                    onChange={handleChange}
                    onClick={checkBoxLimit}
                    onFocus={() => setRestaurantFocus(true)}
                    onBlur={() => setRestaurantFocus(false)}
                  />
                </li>
                <li>
                  <label htmlFor="buffet">Buffet </label>
                  <input
                    type="checkbox"
                    id="buffet"
                    name="category"
                    value="Buffet"
                    ref={restaurantRef}
                    onChange={handleChange}
                    onClick={checkBoxLimit}
                    onFocus={() => setRestaurantFocus(true)}
                    onBlur={() => setRestaurantFocus(false)}
                  />
                </li>
                <li>
                  <label htmlFor="fine-dining">Fine Dining </label>
                  <input
                    type="checkbox"
                    id="fine-dining"
                    name="category"
                    value="Fine Dining"
                    ref={restaurantRef}
                    onChange={handleChange}
                    onClick={checkBoxLimit}
                    onFocus={() => setRestaurantFocus(true)}
                    onBlur={() => setRestaurantFocus(false)}
                  />
                </li>
                <li>
                  <label htmlFor="fast-food">Fast Food </label>
                  <input
                    type="checkbox"
                    id="fast-food"
                    name="category"
                    value="Fast Food"
                    ref={restaurantRef}
                    onChange={handleChange}
                    onClick={checkBoxLimit}
                    onFocus={() => setRestaurantFocus(true)}
                    onBlur={() => setRestaurantFocus(false)}
                  />
                </li>
                <li>
                  <label htmlFor="family-style">Family Style </label>
                  <input
                    type="checkbox"
                    id="family-style"
                    name="category"
                    value="Family Style"
                    ref={restaurantRef}
                    onChange={handleChange}
                    onClick={checkBoxLimit}
                    onFocus={() => setRestaurantFocus(true)}
                    onBlur={() => setRestaurantFocus(false)}
                  />
                </li>
                <li>
                  <label htmlFor="asian">Asian </label>
                  <input
                    type="checkbox"
                    id="asian"
                    name="category"
                    value="Asian"
                    ref={restaurantRef}
                    onChange={handleChange}
                    onClick={checkBoxLimit}
                    onFocus={() => setRestaurantFocus(true)}
                    onBlur={() => setRestaurantFocus(false)}
                  />
                </li>
                <li>
                  <label htmlFor="mediterranean">Mediterranean </label>
                  <input
                    type="checkbox"
                    id="mediterranean"
                    name="category"
                    value="Mediterranean"
                    ref={restaurantRef}
                    onChange={handleChange}
                    onClick={checkBoxLimit}
                    onFocus={() => setRestaurantFocus(true)}
                    onBlur={() => setRestaurantFocus(false)}
                  />
                </li>
                <li>
                  <label htmlFor="pastries">Pastries </label>
                  <input
                    type="checkbox"
                    id="pastries"
                    name="category"
                    value="Pastries"
                    ref={restaurantRef}
                    onChange={handleChange}
                    onClick={checkBoxLimit}
                    onFocus={() => setRestaurantFocus(true)}
                    onBlur={() => setRestaurantFocus(false)}
                  />
                </li>
              </section>

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

              <label htmlFor="priceClass">Price Class:</label>
              <div className="restaurant-registration--form-price-div">
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
              </div>
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
              <label htmlFor="restaurantPicture">Restaurant picture url:</label>

              <input
                type="text"
                id="restaurantPicture"
                name="restaurantPicture"
                placeholder="optional - please insert full url"
                onChange={handleChange}
                value={restaurant.restaurantPicture}
                onFocus={() => setRestaurantFocus(true)}
                onBlur={() => setRestaurantFocus(false)}
              />

              <button
                disabled={!validName ? true : false}
              >{`Register ${restaurant.name} as a new one`}</button>
              <button onClick={() => navigate(-1)}>Go Back</button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}
