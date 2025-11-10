import "../styling/LandingPage.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landing-shell">
      <div className="intro-block">
        <h1 className="intro-title">Food that arrives before your hunger gets dramatic.</h1>
        <p className="intro-text">
          Forkit connects customers, restaurants, and delivery partners so food moves fast and smooth.
        </p>

        <Link to="/restaurants" className="primary-action">
          Browse Restaurants
        </Link>
      </div>

      <footer className="site-footer">
        Forkit © 2025 — Made with <span className="love">❤️</span>
      </footer>
    </div>
  );
}
