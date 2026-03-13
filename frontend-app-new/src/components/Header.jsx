import "./Header.css";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import { useContext } from "react";

import { FaHome, FaShoppingCart, FaBox, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

function Header() {
  const { user } = useContext(AppContext);

  return (
    <div className="App-Header">
      
      {/* Logo / Brand */}
<h1 className="logo">Cup & Co.</h1>
      {/* Navigation */}
      <ul className="nav-links">

        <li>
          <Link to="/">
            <FaHome className="icon"/> Home
          </Link>
        </li>

        <li>
          <Link to="/cart">
            <FaShoppingCart className="icon"/> Cart
          </Link>
        </li>

        {user?.email ? (
          <>
            <li>
              <Link to="/orders">
                <FaBox className="icon"/> Orders
              </Link>
            </li>

            <li>
              <Link to="/logout">
                <FaSignOutAlt className="icon"/> Logout
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">
              <FaSignInAlt className="icon"/> Login
            </Link>
          </li>
        )}

      </ul>
    </div>
  );
}

export default Header;