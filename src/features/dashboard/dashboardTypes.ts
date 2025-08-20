export interface CustomerStats {
  type: string;
  count: number;
}

export interface OpportunityStats {
  stage: string;
  count: number;
}

export interface SalesData {
  month: string;
  revenue: number;
}

export interface TaskItem {
  title: string;
  status: "Pending" | "Completed";
}

export interface ActivityItem {
  description: string;
  time: string;
}
export interface TooltipItem {
  name: string;
  value: string | number;
  color: string;
}
export interface CustomerStats {
  type: string;
  count: number;
}

export interface OpportunityStats {
  stage: string;
  count: number;
}

export interface SalesData {
  month: string;
  revenue: number;
}

export interface TaskItem {
  title: string;
  status: "Pending" | "Completed";
}

export interface ActivityItem {
  description: string;
  time: string;
}

export interface DashboardData {

  customers: CustomerStats[];
  opportunities: OpportunityStats[];
  sales: SalesData[];
  tasks: TaskItem[];
  activities: ActivityItem[];
}

