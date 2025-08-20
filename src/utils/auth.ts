import {jwtDecode} from "jwt-decode";

const ACCESS_TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_ROLE_KEY = "role";
const PERMISSIONS_KEY = "permissions";

export interface DecodedToken {
  exp: number;
  iat: number;
  sub: string;
  role: "ADMIN" | "MANAGER" | "SALES";
  permissions: string[];
}
export interface AuthData {
  token: string;
  refreshToken: string;
  role: "ADMIN" | "MANAGER" | "SALES";
  permissions: string[];
}
// 👉 Lấy access token
export function getToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

// 👉 Lấy refresh token
export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}
export const setAuth = (data: AuthData): void => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("refreshToken", data.refreshToken);
  localStorage.setItem("role", data.role);
  localStorage.setItem("permissions", JSON.stringify(data.permissions));
};
// 👉 Lưu token + role + permission
export function setTokens(token: string, refreshToken: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    localStorage.setItem(USER_ROLE_KEY, decoded.role);
    localStorage.setItem(PERMISSIONS_KEY, JSON.stringify(decoded.permissions));
  } catch (error) {
    console.error("JWT decode failed:", error);
  }
}

// 👉 Xoá token (khi logout)
export function clearAuth(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_ROLE_KEY);
  localStorage.removeItem(PERMISSIONS_KEY);
}

// 👉 Logout: xoá token và redirect
export function logout(): void {
  clearAuth();
  window.location.href = "/login";
}

// 👉 Lấy thông tin user hiện tại từ token
export function getAuth() {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

// 👉 Lấy role
export function getRole(): string | null {
  return localStorage.getItem(USER_ROLE_KEY);
}

// 👉 Lấy permissions
export function getPermissions(): string[] {
  const data = localStorage.getItem(PERMISSIONS_KEY);
  return data ? JSON.parse(data) : [];
}
