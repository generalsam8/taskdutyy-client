import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface LoginRegisterData {
  email: string;
  password: string;
  name?: string;
}

interface UserContextType {
  user: User | null;
  token: string | null;
  register: (formData: LoginRegisterData) => Promise<User>;
  login: (formData: LoginRegisterData) => Promise<void>;
  logout: () => void;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
    }
  }, []);

  // Register
  const register = async (
    formData: LoginRegisterData
  ): Promise<User> => {
    try {
      const res = await axios.post<User>(
        `${import.meta.env.VITE_BASE_URL}/api/user/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      setUser(res.data);
      setToken(res.data.token);

      return res.data;
    } catch (error: any) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
      throw error.response?.data || error;
    }
  };

  // Login
  const login = async (
    formData: LoginRegisterData
  ): Promise<void> => {
    try {
      const res = await axios.post<User>(
        `${import.meta.env.VITE_BASE_URL}/api/user/auth/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      setUser(res.data);
      setToken(res.data.token);
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error.response?.data || error;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider
      value={{ user, register, login, logout, token }}
    >
      {children}
    </UserContext.Provider>
  );
}