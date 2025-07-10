import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { FaShoppingCart } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
  };

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          🛒 SHOP-TOP
        </Link>

        <nav className="nav-links">
          <div className="search-container">
            <SearchInput />
          </div>

          <NavLink to="/" className="nav-link">
            Home
          </NavLink>

          <div className="nav-dropdown">
            <span className="nav-link">Categories</span>
            <div className="dropdown-content">
              <Link to="/categories" className="dropdown-item">All Categories</Link>
              {categories?.map((c) => (
                <Link
                  key={c._id}
                  to={`/category/${c.slug}`}
                  className="dropdown-item"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          {!auth?.user ? (
            <>
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </>
          ) : (
            <div className="nav-dropdown">
              <span className="nav-link">{auth.user.name}</span>
              <div className="dropdown-content">
                <Link
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                  className="dropdown-item"
                >
                  Dashboard
                </Link>
                <Link
                  onClick={handleLogout}
                  to="/login"
                  className="dropdown-item"
                >
                  Logout
                </Link>
              </div>
            </div>
          )}

          <NavLink to="/cart" className="nav-link cart-icon">
            <Badge count={cart?.length} showZero offset={[10, -5]}>
              <FaShoppingCart size={18} />
            </Badge>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
