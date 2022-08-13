import "./App.css";
// STUFF
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useLocalStorage } from "./hooks/useStorage";

// COMPONENTS MAIN
import Header from "./components/main/Header";
import Category from "./components/main/Category";
import Restaurants from "./components/main/Restaurants";
import Footer from "./components/main/Footer";
import Login from "./components/main/Login";
import RequireAuth from "./components/main/RequireAuth";
import Unauthorized from "./components/main/Unauthorized";
import Missing from "./components/main/Missing";
import Cart from "./components/main/Cart";

// COMPONENTS REGISTRATION
import UserRegistration from "./components/registration/UserRegistration";
import OwnerRegistration from "./components/registration/OwnerRegistration";
import RestaurantRegistration from "./components/registration/RestaurantRegistration";
import DishAddNew from "./components/registration/DishAddNew";

// COMPONENTS PROFILE
import RestaurantProfile from "./components/profile/RestaurantProfile";
import UserProfile from "./components/profile/UserProfile";
import { DishProfile } from "./components/profile/DishProfile";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantProfile, setRestaurantProfile] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantOwnerId, setRestaurantOwnerId] = useState("");
  const [profileRestaurants, setProfileRestaurants] = useState("");
  const [restaurantData, setRestaurantData] = useState("");
  const [menu, setMenu] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [refreshPage, setRefreshPage] = useState(false);

  const [cartItems, setCartItems] = useLocalStorage("cart", []);

  return (
    <main className="app--main">
      <Header refreshPage={refreshPage} setRefreshPage={setRefreshPage} />

      <Category restaurants={restaurants} setRestaurants={setRestaurants} />

      <Routes>
        {/* login and registration form | open for everyone */}

        <Route path="auth" element={<Login />} />
        <Route path="register-user" element={<UserRegistration />} />
        <Route path="register-owner" element={<OwnerRegistration />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* restaurant for everybody */}
        <Route
          path="/"
          element={
            <Restaurants
              restaurants={restaurants}
              setRestaurants={setRestaurants}
              refreshPage={refreshPage}
            />
          }
        />

        <Route
          path="/restaurant/:id"
          element={
            <RestaurantProfile
              menu={menu}
              setMenu={setMenu}
              restaurantProfile={restaurantProfile}
              setRestaurantProfile={setRestaurantProfile}
              restaurantName={restaurantName}
              setRestaurantName={setRestaurantName}
              restaurantOwnerId={restaurantOwnerId}
              setRestaurantOwnerId={setRestaurantOwnerId}
              quantity={quantity}
              setQuantity={setQuantity}
              setRestaurantData={setRestaurantData}
            />
          }
        />
        {/* profile CRUD only for authenticated */}
        <Route element={<RequireAuth allowedRoles={[2001, 1984]} />}>
          <Route
            path="/profile"
            element={
              <UserProfile
                profileRestaurants={profileRestaurants}
                setProfileRestaurants={setProfileRestaurants}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            }
          />
          <Route
            path="/cart"
            element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
          />
        </Route>

        {/* restaurant CRUD only for owner*/}
        <Route element={<RequireAuth allowedRoles={[1984]} />}>
          <Route
            path="/restaurant/register-restaurant"
            element={<RestaurantRegistration />}
          />
          <Route
            path="/restaurant/:id/menu/create"
            element={<DishAddNew restaurantName={restaurantName} />}
          />
        </Route>
        {/* dish CRUD only for owner*/}
        <Route
          path="/restaurant/:id/menu/:dishId"
          element={
            <DishProfile
              quantity={quantity}
              setQuantity={setQuantity}
              cartItems={cartItems}
              setCartItems={setCartItems}
              restaurantName={restaurantName}
              restaurantData={restaurantData}
            />
          }
        />
        {/* missing for everybody */}
        <Route path="*" element={<Missing />} />
      </Routes>

      <Footer />
    </main>
  );
}

export default App;
