export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "ADMIN" | "MANAGER" | "SALES";
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface EmployeeFormValues {
  name: string;
  email: string;
  phone: string;
  role: "ADMIN" | "MANAGER" | "SALES";
  status: "ACTIVE" | "INACTIVE";
}
