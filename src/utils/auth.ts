import {jwtDecode} from "jwt-decode";

export type TokenPayload = {
  role: "ADMIN" | "MANAGER" | "SALES";
  permissions: string[];
  exp: number; // thời gian hết hạn token
};

export function getAuth(): TokenPayload | null {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return jwtDecode<TokenPayload>(token);
  } catch {
    return null;
  }
}
