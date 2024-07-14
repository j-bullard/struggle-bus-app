import { cn } from "@/utils/cn";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex-row align-center space-between">
      <h1>Struggle Bus</h1>

      <nav className="flex-row align-center" style={{ gap: "20px" }}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            cn("button", !isActive && "muted-button")
          }
        >
          Fleet
        </NavLink>
        <NavLink
          to="/browse"
          className={({ isActive }) =>
            cn("button", !isActive && "muted-button")
          }
        >
          Browse
        </NavLink>
        <NavLink
          to="/news"
          className={({ isActive }) =>
            cn("button", !isActive && "muted-button")
          }
        >
          News
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
