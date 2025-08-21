const CustomerBase = "/customers";

const CustomerEndpoint = {
  list: `${CustomerBase}`, // GET với query param
  detail: (id: string) => `${CustomerBase}/${id}`,
  create: `${CustomerBase}`,
  update: (id: string) => `${CustomerBase}/${id}`,
  delete: (id: string) => `${CustomerBase}/${id}`,
};

export default CustomerEndpoint;
