import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";

const DishAddNew = ({ restaurantName }) => {
  const { id } = useParams();
  const CREATE_NEW_DISH_URL = `/restaurant/${id}/menu/create`;
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const dishRef = useRef();

  const [dish, setDish] = useState({
    restaurantId: id,
    name: "",
    description: "",
    price: "",
    dishPicture: "",
  });

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    dishRef.current.focus();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setDish((prevDish) => {
      return {
        ...prevDish,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const restaurantId = dish.restaurantId;
    const name = dish.name;
    const description = dish.description;
    const price = dish.price;
    const dishPicture = dish.dishPicture
      ? dish.dishPicture
      : "https://images.unsplash.com/photo-1561758033-7e924f619b47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80";

    try {
      const response = await axios.post(
        CREATE_NEW_DISH_URL,
        JSON.stringify({
          restaurantId,
          name,
          description,
          price,
          dishPicture,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);
      setSuccess(true);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <>
      {success ? (
        <section>
          <h1>Success! New dish {dish.name} has been registered!</h1>
          <p>
            <button onClick={goBack}>To restaurant</button>
          </p>
        </section>
      ) : (
        <main className="create-new-dish--main">
          <h1>Create new dish for your restaurant {restaurantName}</h1>
          <form className="create-new-dish--form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              value={dish.name}
              ref={dishRef}
              autoComplete="off"
              onChange={handleChange}
              required
            />

            <label htmlFor="description">Description:</label>

            <textarea
              type="text"
              id="description"
              name="description"
              value={dish.description}
              onChange={handleChange}
              placeholder="Tell about this delicious dish"
            />

            <label htmlFor="price">Price: </label>
            <input
              type="text"
              id="price"
              name="price"
              value={dish.price}
              onChange={handleChange}
              required
              placeholder="Example: 19.95"
            />

            <label htmlFor="dishPicture">
              <span
                style={{
                  fontStyle: "italic",
                  fontSize: "10px",
                  marginRight: "3px",
                }}
              >
                optional
              </span>
              Picture:
            </label>

            <input
              type="text"
              id="dishPicture"
              name="dishPicture"
              value={dish.dishPicture}
              onChange={handleChange}
              placeholder="https://your-dish-image.com"
            />

            <button
              type="submit"
              style={{
                margin: "10px 3px 10px 3px",
              }}
            >{`Add ${dish.name} to ${restaurantName} menu!`}</button>
            <button
              onClick={() => navigate(-1)}
              style={{
                margin: "0 3px 0 3px",
              }}
            >
              CANCEL
            </button>
          </form>
        </main>
      )}
    </>
  );
};

// restaurantId, name, description, price, dishPicture

export default DishAddNew;
