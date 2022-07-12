import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="app--main">
      <Outlet />
    </main>
  );
};

export default Layout;
