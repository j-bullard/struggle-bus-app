import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header>
        <h1>Fleet Manager</h1>
      </header>

      <Outlet />
    </div>
  );
};

export { Layout };
export default Layout;
