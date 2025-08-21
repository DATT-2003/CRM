export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  customerType: "LEAD" | "PROSPECT" | "CLIENT";
  status: "ACTIVE" | "INACTIVE";
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface CustomerFormValues {
  name: string;
  email: string;
  phone: string;
  address?: string;
  customerType: "LEAD" | "PROSPECT" | "CLIENT";
  status: "ACTIVE" | "INACTIVE";
  assignedTo?: string;
}
