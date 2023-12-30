// AuthContext
import { createContext, useContext, useState } from "react";
import { IUser, UserContextType } from "../model/user";
// import { useNavigate } from "react-router-dom";

// Create a context to manage authentication-related data and functions
const AuthContext = createContext <UserContextType>({
    isLoading: false,
    user: null,
    login: async () => {},
    register: async () => {},
    logout: async () => {},
  });
  

// Create a hook to access the AuthContext
const useAuth = () => useContext(AuthContext);

// Create a component that provides authentication-related data and functions
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
//   const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<IUser|null>(null);

  const register = async (formData: {
    name: string,
    email: string,
    password: string,
  }) => {
    setIsLoading(true);
    const response = await fetch("", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      alert(data ? data.msg : "Something went wrong");
    }

    setUser(data);
    setIsLoading(false);
    // navigate("/login");
  };

  const login = async (formData: { email: string, password: string }) => {
    setIsLoading(true);
    const response = await fetch("", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      alert(data ? data.msg : "Something went wrong");
    }

    setUser(data);
    setIsLoading(false);
    // navigate("/chat");
  };

  const logout = async () => {
    const response = await fetch("");
    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      alert(data ? data.msg : "Something went wrong");
    }

    setUser(null);
    // navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isLoading, user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, useAuth };


