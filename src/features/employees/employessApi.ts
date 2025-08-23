import api from "../../utils/axios";
import EmployeeEndpoint from "./employeesEndpoint";
import type { Employee, EmployeeFormValues } from "./employeesTypes";

const employeesApi = {
  async getList(params: { page: number; pageSize: number; search?: string }): Promise<{ data: Employee[]; total: number }> {
    const res = await api.get(EmployeeEndpoint.list, { params });
    return res.data;
  },

  async getDetail(id: string): Promise<Employee> {
    const res = await api.get(EmployeeEndpoint.detail(id));
    return res.data;
  },

  async create(values: EmployeeFormValues): Promise<Employee> {
    const res = await api.post(EmployeeEndpoint.list, values);
    return res.data;
  },

  async update(id: string, values: EmployeeFormValues): Promise<Employee> {
    const res = await api.put(EmployeeEndpoint.detail(id), values);
    return res.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(EmployeeEndpoint.detail(id));
  },
};

export default employeesApi;
