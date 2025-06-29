import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import { getUser } from "../service/auth.service";
import Cookies from "js-cookie";
import type { LoginResponse, UserResponse } from "../types/auth";
import { useNavigate } from "react-router-dom";
import { APP_PATHS } from "../routes/path";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  isLoading: false,
  login: async () => {},
  logout: () => {},
});

interface AuthContextType {
  user: UserResponse | undefined;
  isLoading: boolean;
  login: (data: LoginResponse) => Promise<void>;
  logout: () => void;
}

const ACCESS_COOKIE_NAME = "access-token";
const REFRESH_COOKIE_NAME = "refresh-token";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | undefined>(
    Cookies.get(ACCESS_COOKIE_NAME) || undefined
  );

  const navigate = useNavigate();

  useEffect(() => {
    setToken(Cookies.get(ACCESS_COOKIE_NAME));
  }, []);

  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
    enabled: !!token,
    retry: 2,
    retryDelay: 1000,
  });

  useEffect(() => {
    if (!token) {
      navigate(APP_PATHS.login);
    }
    if (
      isError &&
      error instanceof AxiosError &&
      error.response?.status === 401
    ) {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, navigate, isError, error]);

  const login = async (data: LoginResponse) => {
    try {
      Cookies.set(ACCESS_COOKIE_NAME, data.access_token);
      Cookies.set(REFRESH_COOKIE_NAME, data.refresh_token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setToken(data.access_token);
      setTimeout(() => {
        navigate(APP_PATHS.home);
      }, 500);
    } catch (error) {
      console.error(error);
      toast.error("Login failed");
    }
  };

  const logout = () => {
    Cookies.remove(ACCESS_COOKIE_NAME);
    Cookies.remove(REFRESH_COOKIE_NAME);
    queryClient.invalidateQueries({ queryKey: ["user"] });
    setToken(undefined);
    setTimeout(() => {
      navigate(APP_PATHS.login);
    }, 1000);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

export default AuthProvider;
