import api from "../../utils/axios";    
import type { LoginFormValues, LoginResponse } from "./types";

// Hàm login (trả về promise chứa dữ liệu login)
export async function login(values: LoginFormValues) {
  const { data } = await api.post<LoginResponse>("/auth/login", values);
  return data;
}
