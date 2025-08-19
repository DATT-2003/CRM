export interface LoginFormValues {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: "ADMIN" | "MANAGER" | "SALES";
  permissions: string[];
}
