export interface ServiceOrdersCreate {
  clientId: number;
  tecnicId: number;
  street: string;
  cep: string;
  number: string;
  district: string;
  complement: string;
  observacao: string;
  defect: string;
  devices: Device[];
}

export interface ServiceOrder {
  id: number;
  clientId: number;
  tecnicId: number;
  street: string;
  cep: string;
  number: string;
  district: string;
  complement: string;
  observacao: string;
  defect: string;
  devices: Device[];
}

export interface Device {
  type: string;
  brand: string;
  model: string;
}

export interface ServiceOrders {
  client: Client;
  createdBy: CreatedBy;
  tecnic: CreatedBy;
  orderServiceStatus: EStatus;
  lazyLoader: LazyLoader;
  id: number;
  dateCreated: Date;
  street: string;
  cep: string;
  number: string;
  district: string;
  complement: string;
  observacao: string;
  device_qtd: string;
  pieceSold: null;
  defect: string;
  clientPiece: null;
  budget: null;
  amountReceived: null;
  datePayment: null;
  absence1: null;
  absence2: null;
  serviceExecuted: null;
}

export interface Client {
  id: number;
  name: string;
  cpf: string;
  phoneNumber: string;
  email: string;
}

export interface CreatedBy {
  id: number;
  name: string;
  phoneNumber: string;
  cpf: string;
  email: string;
  birthDate: Date;
  registrationDate: Date;
  deactivationDate: null;
  role: Role;
  address: null;
  employeeStatus: EStatus;
  avatarUrl: null;
}

export interface EStatus {
  id: number;
  status: string;
}

export interface Role {
  id: number;
  role: string;
}

export interface LazyLoader {}
