export type User = {
  id: number;
  name: string;
  phoneNumber: string;
  cpf: string;
  email: string;
  birthDate: Date | null;
  registrationDate: string;
  deactivationDate: string;
  role: {
    id: number;
    role: string;
  };
  address: {
    id?: number;
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
  user: {
    id: number;
    username: string;
  };
};

export type CreateUserPayload = {
  name: string;
  phoneNumber: string;
  cpf: string;
  email: string;
  avatarUrl: string;
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
export type EditUserPayload = {
  name: string;
  phoneNumber: string;
  cpf: string;
  email: string;
  avatarUrl: string;
  birthDate: Date | null;
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

export type UserCredentialsPayload = {
  username: string;
  password: string;
  employeeId: number;
  role: number;
};
