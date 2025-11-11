import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useState, useRef, useEffect } from "react";
import "../styling/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, role, isAuthed, logout } = useAuth();
  const { totalItems } = useCart();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const menuRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Forkit
      </Link>

      {isAuthed ? (
        <div className="nav-main">
          {pathname !== "/" && pathname !== "/restaurants" && (
            <Link
              to="/restaurants"
              className={`nav-link ${
                pathname === "/restaurants" ? "active" : ""
              }`}
            >
              Restaurants
            </Link>
          )}

          <Link to="/checkout" className="cart-link">
            Cart ({totalItems})
          </Link>

          <div className="user-menu" ref={menuRef}>
            <div className="user-badge" onClick={() => setOpen(!open)}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
              >
                <circle cx="12" cy="8" r="4"></circle>
                <path d="M6 20c0-4 12-4 12 0"></path>
              </svg>
            </div>

            {open && (
              <div className="dropdown">
                <div className="dropdown-header">
                  <span className="user-name-display">{user?.name}</span>
                  <span className="role-tag">{role}</span>
                </div>

                <hr className="dropdown-divider" />

                <Link to="/orders" className="dropdown-item">
                  My Orders
                </Link>

                {role === "Admin" && (
                  <Link to="/manage-orders" className="dropdown-item">
                    Manage Orders
                  </Link>
                )}

                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="dropdown-item logout"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/signup" className="signup-btn">
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
}
