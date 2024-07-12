import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const HomeButton = () => {
  let location = useLocation();

  return location.pathname !== "/" ? (
    <Link to="/">
      <header className="homeTitle">Car Jazz</header>
    </Link>
  ) : (
    <header className="homeTitle">Car Jazz</header>
  );
};

const Header = () => {
  const [userLogin, setUserLogin] = useState(false);

  const handleLoginToggle = () => {
    setUserLogin((prevLogin) => !prevLogin);
  };

  return (
    <div>
      {/* Home Button */}
      <HomeButton />

      {/* Login & Logout Button */}
      <div className="loginDisplay">
        <button className="loginButton" onClick={handleLoginToggle}>
          {userLogin ? "Logout" : "Login"}
        </button>
        <div>Fleet Manager is {userLogin ? "Logged in" : "Logged Out"}</div>
      </div>
      {/* NAV Bar based on User */}
      <div className="navBar">
        {userLogin ? (
          <>
            <button>
              <Link to="/news">NEWS</Link>
            </button>
            <button>
              <Link to="/my-cars">My Cars</Link>
            </button>
            <button>
              <Link to="/finance">Finance</Link>
            </button>
          </>
        ) : (
          <button>
            <Link to="/news">NEWS</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
