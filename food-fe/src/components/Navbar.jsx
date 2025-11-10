import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "../styling/navbar.css";

export default function Navbar() {
  const { isAuthed, logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Forkit</Link>

      <div className="nav-links">
        {isAuthed && (
          <>
            <Link to="/restaurants" className="nav-link">Restaurants</Link>
            <h4>Cart ({totalItems})</h4>
          </>
        )}

        {!isAuthed ? (
          <>
            <div className="nav-links">
            <Link to="/login">Login</Link>
            <Link to="/signup" className="signup-btn">Signup</Link>
            </div>

          </>
        ) : (
          <button onClick={logout} className="logout-btn">Logout</button>
        )}
      </div>
    </nav>
  );
}
