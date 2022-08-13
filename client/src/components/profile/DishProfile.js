import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const DishProfile = ({
  quantity,
  setQuantity,
  cartItems,
  setCartItems,
  restaurantName,
  restaurantData,
}) => {
  const user = useAuth();
  const navigate = useNavigate();
  const { id, dishId } = useParams();
  const API_URL_FOR_DISH = `/restaurant/${id}/menu/${dishId}`;

  const [order, setOrder] = useState({});
  const [addOrder, setAddOrder] = useState(false);
  const [deleted, setDeleted] = useState(false);

  async function getDishById() {
    try {
      const response = await axios.get(API_URL_FOR_DISH);
      const dish = response.data;
      setOrder(dish);
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddClick = () => {
    setQuantity(quantity + 1);
  };

  const handleSubClick = () => {
    if (quantity > 1 && quantity < 100) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddtoCart = (event) => {
    event.preventDefault();

    const isDublicate = cartItems.some((item) => item.id === order._id);

    const cartItemsMapped = cartItems.map((item) => {
      if (item.id === order._id) {
        return {
          ...item,
          quantity: quantity + item.quantity,
          price: parseFloat(order.price * (quantity + item.quantity)).toFixed(
            2
          ),
        };
      }
      return item;
    });

    console.log(cartItems.length);

    if (cartItems.length) {
      const isSameRestaurant = cartItems.some(
        (item) => item.restaurantId === order.restaurantId
      );
      if (!isSameRestaurant) {
        if (
          window.confirm(
            "Your previous order is from different restaurant.\nDo you want to replace order?"
          )
        ) {
          setCartItems([
            {
              id: order._id,
              userId: user.auth.id,
              restaurantId: order.restaurantId,
              restaurantName: restaurantName,
              dishPicture: order.dishPicture,
              name: order.name,
              price: parseFloat(order.price * quantity).toFixed(2),
              quantity: quantity,
            },
          ]);
          setQuantity(1);
          setAddOrder(true);
        }

        return;
      }
      isDublicate
        ? setCartItems(cartItemsMapped)
        : setCartItems([
            ...cartItemsMapped,
            {
              id: order._id,
              userId: user.auth.id,
              restaurantId: order.restaurantId,
              restaurantName: restaurantName,
              dishPicture: order.dishPicture,
              name: order.name,
              price: parseFloat(order.price * quantity).toFixed(2),
              quantity: quantity,
            },
          ]);
      setQuantity(1);
      setAddOrder(true);
    }

    isDublicate
      ? setCartItems(cartItemsMapped)
      : setCartItems([
          ...cartItemsMapped,
          {
            id: order._id,
            userId: user.auth.id,
            restaurantId: order.restaurantId,
            restaurantName: restaurantName,
            dishPicture: order.dishPicture,
            name: order.name,
            price: parseFloat(order.price * quantity).toFixed(2),
            quantity: quantity,
          },
        ]);
    setQuantity(1);
    setAddOrder(true);
  };

  const handleDishDelete = () => {
    const token = user.auth.accessToken;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const data = { orderId: order._id };

    axios
      .delete(`/restaurant/menu/${order._id}/delete`, {
        headers,
        data,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    // try {
    //   const response = await axios.delete(`${API_URL_FOR_DISH}/delete`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //     withCredentials: true,
    //   });
    //   console.log(response);
    // } catch (error) {
    //   console.log(error);
    // }

    // headers: {
    //   authorization: `Bearer ${token}`,
    // },
    // withCredentials: true,

    setDeleted(true);
  };

  useEffect(() => {
    getDishById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dishProfile--main-container">
      <div className="dishProfile--main">
        <section key={order._id} className="dishProfile--dish-profile">
          <h3>{order.name}</h3>
          {!deleted ? (
            <img
              style={{
                width: "100px",
                height: "100px",
              }}
              src={order.dishPicture}
              alt="dish"
            />
          ) : (
            <img
              style={{
                width: "100px",
                height: "100px",
                filter: "grayscale(100%)",
              }}
              src={order.dishPicture}
              alt="dish"
            />
          )}

          <p>{order.description}</p>
          <p>Price: {parseFloat(order.price * quantity).toFixed(2)} €</p>
        </section>

        {user.auth.user && !addOrder && !deleted && (
          <div className="dishProfile--buttons">
            <button
              className="dishProfile-buttons--buttons"
              onClick={handleSubClick}
            >
              {" "}
              -{" "}
            </button>
            {quantity}
            <button
              className="dishProfile-buttons--buttons"
              onClick={handleAddClick}
            >
              {" "}
              +{" "}
            </button>
            <br />
            <button className="addButton" onClick={handleAddtoCart}>
              ADD
            </button>
            {user.auth.id === restaurantData.ownerId && (
              <button className="deleteButton" onClick={handleDishDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            )}
          </div>
        )}
        {user.auth.user && deleted && (
          <div>
            <p>{order.name} is deleted.</p>
            <button onClick={() => navigate(-1)}>GO BACK</button>
          </div>
        )}
        {!user.auth.user && (
          <div>
            <Link to={"/auth"}>
              <p>Sign in to make orders</p>
            </Link>
          </div>
        )}
        {addOrder && (
          <div>
            <p>Thank you for your order</p>
            <button onClick={() => navigate(-1)}>Continue shopping</button>
            <Link to={"/cart"}>
              <button>Open Cart</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
