import api from "../../utils/axios";
import CustomerEndpoint from "./customerEndpoint";
import type { Customer, CustomerFormValues } from "./customerTypes";

const customersApi = {
  async getList(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    customerType?: string;
    status?: string;
  }): Promise<{ data: Customer[]; total: number }> {
    const res = await api.get(CustomerEndpoint.list, { params });
    return res.data;
  },

  async getDetail(id: string): Promise<Customer> {
    const res = await api.get(CustomerEndpoint.detail(id));
    return res.data;
  },

  async create(data: CustomerFormValues): Promise<Customer> {
    const res = await api.post(CustomerEndpoint.create, data);
    return res.data;
  },

  async update(id: string, data: CustomerFormValues): Promise<Customer> {
    const res = await api.put(CustomerEndpoint.update(id), data);
    return res.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(CustomerEndpoint.delete(id));
  },
};

export default customersApi;
