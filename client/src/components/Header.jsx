import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/">Fleet Manager</Link>

      <nav>
        <Link to="/" role="button">
          Fleet
        </Link>
        <Link to="/browse">Browse</Link>
        <Link to="/news">News</Link>
      </nav>
    </header>
  );
};

export default Header;
