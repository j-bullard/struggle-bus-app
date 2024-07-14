import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/">Struggle Bus</Link>

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
