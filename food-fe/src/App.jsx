import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Restaurants from "./pages/Restaurants";
import RestaurantMenu from "./pages/RestaurantMenu";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

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
            <Route path="/restaurants" element={<Restaurants setLoginOpen={setLoginOpen} />} />
            <Route path="/restaurants/:id" element={<RestaurantMenu setLoginOpen={setLoginOpen} />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
