import { useEffect } from "react";
import DishCard from "./Card/DishCard";
import axios from "../../api/axios";

const Menu = ({
  restaurantId,
  menu,
  setMenu,
  setCart,
  restaurantName,
  quantity,
  setQuantity,
  order,
  setOrder,
}) => {
  const API_URL_GET_MENU_BY_ID = `/restaurant/${restaurantId}/menu`;

  async function getMenu() {
    try {
      const response = await axios.get(API_URL_GET_MENU_BY_ID);
      const menuById = response.data.map((dish) => {
        return (
          <DishCard
            key={dish._id}
            dish={dish}
            setCart={setCart}
            restaurantName={restaurantName}
            quantity={quantity}
            setQuantity={setQuantity}
            order={order}
            setOrder={setOrder}
            restaurantId={restaurantId}
          />
        );
      });
      setMenu(menuById);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="menu--main">
      <div>
        <h3>MENU</h3>
      </div>
      {menu}
    </main>
  );
};

export default Menu;
