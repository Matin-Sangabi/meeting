import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useAuth() {
  const { user, isLoading, login, logout } = useContext(AuthContext);
  return { user, isLoading, login, logout };
}
