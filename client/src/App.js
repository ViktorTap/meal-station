import "./App.css";
// STUFF
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

// COMPONENTS MAIN
import Header from "./components/main/Header";
import Category from "./components/main/Category";
import Restaurants from "./components/main/Restaurants";
import Footer from "./components/main/Footer";
import Login from "./components/main/Login";
import RequireAuth from "./components/main/RequireAuth";
import Unauthorized from "./components/main/Unauthorized";
import Missing from "./components/main/Missing";

// COMPONENTS REGISTRATION
import UserRegistration from "./components/registration/UserRegistration";
import OwnerRegistration from "./components/registration/OwnerRegistration";
import RestaurantRegistration from "./components/registration/RestaurantRegistration";

// COMPONENTS PROFILE
import RestaurantProfile from "./components/profile/RestaurantProfile";
import UserProfile from "./components/profile/UserProfile";

function App() {
  const [restaurants, setRestaurants] = useState("");
  const [restaurantProfile, setRestaurantProfile] = useState("");
  const [menu, setMenu] = useState("");

  return (
    <main className="app--main">
      <Header />
      <Category />

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
            />
          }
        />
        {/* profile CRUD only for authenticated */}
        <Route element={<RequireAuth allowedRoles={[2001, 1984]} />}>
          <Route path="/profile" element={<UserProfile />} />
        </Route>

        {/* restaurant CRUD only for owner*/}
        <Route element={<RequireAuth allowedRoles={[1984]} />}>
          <Route
            path="/restaurant/register-restaurant"
            element={<RestaurantRegistration />}
          />
        </Route>
        {/* dish CRUD only for owner*/}

        {/* missing for everybody */}
        <Route path="*" element={<Missing />} />
      </Routes>

      <Footer />
    </main>
  );
}

export default App;
