import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  //   const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);

    const safeUser = {
      id: userData._id,
      name: userData.name,
      role: userData.role,
      country: userData.country,
      email: userData.email,
    };

    localStorage.setItem("user", JSON.stringify(safeUser));
    setUser(safeUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    // navigate("/");
  };

  const isAuthed = !!user;
  const role = user?.role || null;

  return (
    <AuthContext.Provider value={{ user, role, isAuthed, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}