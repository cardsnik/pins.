import { Outlet } from "react-router-dom";
import { Header } from "../../widgets/Header";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Layout;
