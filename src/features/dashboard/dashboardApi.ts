import api from "../../utils/axios";
import DashboardEndpoint from "./dashboardEndpoints";
import type { DashboardData } from "./dashboardTypes";

//Dữ liệu ảo dùng khi server lỗi hoặc không có dữ liệu
const mockData: DashboardData = {
  customers: [
    { type: "VIP", count: 32 },
    { type: "Regular", count: 120 },
    { type: "Potential", count: 45 },
  ],
  opportunities: [
    { stage: "Mới", count: 18 },
    { stage: "Đang tiến hành", count: 27 },
    { stage: "Đã đóng", count: 12 },
  ],
  sales: [
    { month: "1", revenue: 100000 },
    { month: "2", revenue: 130000 },
    { month: "3", revenue: 120000 },
    { month: "4", revenue: 160000 },
    { month: "4", revenue: 130000 },
    { month: "5", revenue: 170000 },
    { month: "6", revenue: 180000 },
    { month: "7", revenue: 200000 },
    { month: "8", revenue: 210000 },
    { month: "9", revenue: 220000 },
    { month: "10", revenue: 230000 },
    { month: "11", revenue: 240000 },
    { month: "12", revenue: 250000 },
  ],
  tasks: [
    { title: "Gọi khách hàng VIP    ", status: "Pending" },
    { title: "Chuẩn bị báo giá", status: "Completed" },
  ],
  activities: [
    { description: "Đã thêm khách hàng mới", time: "2 giờ trước" },
    { description: "Đã cập nhật cơ hội", time: "Hôm qua" },
  ],
};


const dashboardApi = {
  async getOverview(): Promise<DashboardData> {
    try {
      const response = await api.get(DashboardEndpoint.overview);
      const result = response.data;

      // ✅ Nếu không có dữ liệu → dùng mock
      if (!result || Object.keys(result).length === 0) {
        console.warn("Không có dữ liệu từ server, dùng dữ liệu ảo");
        return mockData;
      }

      return result;
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        return mockData;
    }
  },
};

export default dashboardApi;
