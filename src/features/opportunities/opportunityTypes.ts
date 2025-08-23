export interface Opportunity {
  id: string;
  title: string;
  customerId: string;
  stage: "Lead" | "Negotiation" | "Closed Won" | "Closed Lost";
  value: number;
  ownerId: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface OpportunityFormValues {
  title: string;
  customerId: string;
  stage: "Lead" | "Negotiation" | "Closed Won" | "Closed Lost";
  value: number;
  notes?: string;
}
