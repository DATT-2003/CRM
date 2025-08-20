// authApi.ts
import api from "../../utils/axios";
import AuthEndpoint from "./authEndpoints";
import type { LoginFormValues, LoginResponse, UserProfile, RefreshResponse } from "./authTypes";

const authApi = {
  // Gọi API login → trả về accessToken + refreshToken
  async login(values: LoginFormValues): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(AuthEndpoint.login, values);
    return response.data;
  },

  // Gọi API logout → clear refresh token ở server
  async logout(): Promise<void> {
    await api.post(AuthEndpoint.logout);
  },

  // Gọi API refresh → lấy accessToken mới
  async refresh(refreshToken: string): Promise<RefreshResponse> {
    const response = await api.post<RefreshResponse>(AuthEndpoint.refresh, { refreshToken });
    return response.data;
  },

  // Lấy thông tin user hiện tại (dùng accessToken)
  async getProfile(): Promise<UserProfile> {
    const response = await api.get<UserProfile>(AuthEndpoint.me);
    return response.data;
  },
};

export default authApi;
