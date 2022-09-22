export type User = {
  id: 0;
  name: string;
  phoneNumber: string;
  cpf: string;
  email: string;
  birthDate: Date | null;
  registrationDate: string;
  deactivationDate: string;
  role: {
    id: 0;
    role: string;
  };
  address: {
    id: 0;
    street: string;
    cep: string;
    number: string;
    district: string;
    complement: string;
  };
  employeeStatus: {
    id: number;
    status: string;
  };
  avatarUrl: string;
};

export type CreateUserPayload = {
  name: string;
  phoneNumber: string;
  cpf: string;
  email: string;
  avatar_url: string;
  birthDate: string | null;
  role: number;
  address: {
    street: string;
    cep: string;
    number: string;
    district: string;
    complement: string;
  };
  employeeUser: {
    login: boolean;
    username: string;
    password: string;
  };
};

export type UserFilter = {
  page: number;
  order: string;
  sort: string;
  search: string;
};

export type LoggedUser = {
  username: string;
  name: string;
  role: string;
  avatarUrl: string;
  email: string;
};
