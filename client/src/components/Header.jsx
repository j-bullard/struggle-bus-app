import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Look to line with a <div className="navBar"> !!

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
            {/* Add your links to Components HERE */}
            <button>
              <Link to="/news">NEWS</Link>
            </button>
            <button>
              <Link to="/add-here1">My Current Fleet</Link>
            </button>
            <button>
              <Link to="/add-here2">Add Here</Link>
            </button>
          </>
        ) : (
          // This is for anyone not logged in
          <button>
            <Link to="/news">NEWS</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
