export interface LoginRequest {
  email: string;
  password: string;
  signature: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface UserResponse {
  id: string;
  email: string;
  walletAddress: string;
  createdAt: string;
  updatedAt: string;
}
