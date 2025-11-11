import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import Restaurants from "./pages/Restaurants";
import RestaurantMenu from "./pages/RestaurantMenu";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";

// ✅ Import the modal
import LoginModal from "./components/LoginModal";
import { useState } from "react";

export default function App() {
  const [isLoginOpen, setLoginOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          {/* Always visible */}
          <Navbar />

          {/* ✅ Login Modal lives here */}
          <LoginModal
            isOpen={isLoginOpen}
            onClose={() => setLoginOpen(false)}
          />

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/restaurants"
              element={<Restaurants setLoginOpen={setLoginOpen} />}
            />
            <Route
              path="/restaurants/:id"
              element={<RestaurantMenu setLoginOpen={setLoginOpen} />}
            />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>

          {/* <footer className="site-footer">
            Forkit © 2025 — Made with <span className="love">❤️</span>
          </footer> */}
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
