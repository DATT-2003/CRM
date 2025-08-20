// authTypes.ts

// Dữ liệu khi login (form nhập từ FE)
export interface LoginFormValues {
  email: string;
  password: string;
}

// API trả về khi login
export interface LoginResponse {
  token: string; // access token
  refreshToken: string; // refresh token
  role: "ADMIN" | "MANAGER" | "SALES";
  permissions: string[];
}

// API trả về khi refresh
export interface RefreshResponse {
  token: string;        // access token mới
  refreshToken: string; // refresh token mới (nếu backend có xoay vòng refresh)
}

// Thông tin user
export interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: "ADMIN" | "MANAGER" | "SALES";
  permissions: string[];
}
