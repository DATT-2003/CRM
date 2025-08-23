const OpportunityBase = "/opportunities";

const OpportunityEndpoint = {
  list: `${OpportunityBase}`,
  detail: (id: string) => `${OpportunityBase}/${id}`,
  create: `${OpportunityBase}`,
  update: (id: string) => `${OpportunityBase}/${id}`,
  delete: (id: string) => `${OpportunityBase}/${id}`,
};

export default OpportunityEndpoint;
