import http from "./httpRequest";
import type { LoginRequest, LoginResponse, UserResponse } from "../types/auth";

export const loginService = async (data: LoginRequest) => {
  const response = await http.post<LoginResponse>("/auth/login", data);
  return response.data;
};

export const getUser = async () => {
  const response = await http.get<UserResponse>("/auth/user-info");
  return response.data;
};
