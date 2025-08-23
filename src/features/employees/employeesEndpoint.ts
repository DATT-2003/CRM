const EmployeeBase = "/employees";

const EmployeeEndpoint = {
  list: `${EmployeeBase}`,
  detail: (id: string) => `${EmployeeBase}/${id}`,
};

export default EmployeeEndpoint;
