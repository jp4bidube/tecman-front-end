export type Client = {
  id: number;
  name: string;
  cpf: string;
  phoneNumber: string;
  email: string;
  address: {
    street: string;
    cep: string;
    number: string;
    district: string;
    complement: string;
    defaultAddress: boolean;
  };
};

export type ClientsFilter = {
  page: number;
  order: string;
  sort: string;
  search: string;
};
