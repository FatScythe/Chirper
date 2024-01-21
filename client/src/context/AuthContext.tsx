// AuthContext
import { createContext, useContext, useState, useEffect } from "react";
import { IUser, UserContextType } from "../model/user";
import { useNavigate } from "react-router-dom";

// Create a context to manage authentication-related data and functions
const AuthContext = createContext<UserContextType>({
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
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/v1/user/showMe");
      const data = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      setUser(data);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const register = async (formData: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const { name, email, password } = formData;
      setIsLoading(true);

      if (!name || !email || !password) {
        setIsLoading(false);
        alert("Please fill all fields");
        return;
      }

      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        alert(data ? data.msg : "Something went wrong");
        return;
      }

      setIsLoading(false);

      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const login = async (formData: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        alert(data ? data.msg : "Something went wrong");
        return;
      }

      setUser(data);
      setIsLoading(false);
      navigate("/chats");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("/api/v1/auth/logout");
      const data = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        alert(data ? data.msg : "Something went wrong");
        return;
      }

      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoading, user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, useAuth };
