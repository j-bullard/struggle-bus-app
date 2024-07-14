import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="container">
      <Header />
      <Outlet />
    </div>
  );
};

export { Layout };
export default Layout;
