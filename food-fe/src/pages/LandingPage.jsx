import "../styling/LandingPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LandingPage() {
  const { isAuthed } = useAuth();
  const navigate = useNavigate();

  const handleBrowse = (e) => {
    if (!isAuthed) {
      e.preventDefault(); 
      navigate("/login");
    }
  };

  return (
    <div className="landing-shell">
      <div className="intro-block">
        <h1 className="intro-title">Food that arrives before your hunger gets dramatic.</h1>
        <p className="intro-text">
          Forkit connects customers, restaurants, and delivery partners so food moves fast and smooth.
        </p>

        <Link
          to="/restaurants"
          className="primary-action"
          onClick={handleBrowse}
        >
          Browse Restaurants
        </Link>
      </div>

      <footer className="site-footer">
        Forkit © 2025 — Made with <span className="love">❤️</span>
      </footer>
    </div>
  );
}
