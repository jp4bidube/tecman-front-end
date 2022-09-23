export type Client = {
  id: number;
  name: string;
  cpf: string;
  phoneNumber: string;
  email: string;
  address: Array<ClientAddress>;
};

export type ClientList = {
  id: number;
  name: string;
  cpf: string;
  phoneNumber: string;
  email: string;
};

export type ClientCreatePayload = {
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

export type ClientUpdatePayload = {
  name: string;
  cpf: string;
  phoneNumber: string;
  email: string;
};

export type ClientAddressPayload = {
  street: string;
  cep: string;
  number: string;
  district: string;
  complement: string;
  defaultAddress: boolean;
};

export type ClientsFilter = {
  page: number;
  order: string;
  sort: string;
  search: string;
};

export type ClientAddress = {
  id: string;
  clientId: string;
  address: {
    id: string;
    street: string;
    cep: string;
    number: string;
    district: string;
    complement: string;
  };
  defaultAddress: boolean;
};
