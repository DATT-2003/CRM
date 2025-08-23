import api from "../../utils/axios";
import OpportunityEndpoint from "./opportunityEndpoint";
import type { Opportunity, OpportunityFormValues } from "./opportunityTypes";

const opportunitiesApi = {
  async getList(params?: { page?: number; pageSize?: number; search?: string }): Promise<{ data: Opportunity[]; total: number }> {
    const res = await api.get(OpportunityEndpoint.list, { params });
    return res.data;
  },

  async getDetail(id: string): Promise<Opportunity> {
    const res = await api.get(OpportunityEndpoint.detail(id));
    return res.data;
  },

  async create(data: OpportunityFormValues): Promise<Opportunity> {
    const res = await api.post(OpportunityEndpoint.create, data);
    return res.data;
  },

  async update(id: string, data: OpportunityFormValues): Promise<Opportunity> {
    const res = await api.put(OpportunityEndpoint.update(id), data);
    return res.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(OpportunityEndpoint.delete(id));
  },
};

export default opportunitiesApi;
