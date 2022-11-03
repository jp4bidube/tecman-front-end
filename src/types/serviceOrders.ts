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
  client: Client;
  createdBy: string;
  tecnic: Tecnic;
  equipments: Equipment[];
  orderServiceStatus: OrderServiceStatus;
  dateCreated: Date;
  street: string;
  cep: string;
  number: string;
  district: string;
  complement: string;
  observacao: string;
  device_qtd: string;
  pieceSold: boolean | null;
  defect: string;
  clientPiece: boolean | null;
  budget: number | null;
  amountReceived: number | null;
  datePayment: Date | null;
  absence1: Date | null;
  absence2: Date | null;
  serviceExecuted: null;
}

export interface Device {
  type: string;
  brand: string;
  model: string;
}

export interface ServiceOrderFinish {
  id: number;
  tecnicId: string;
  serviceExecuted: string;
  pieceSold: boolean;
  clientPiece: boolean;
  budget: number;
  amountReceived: number;
  datePayment: Date;
  equipments: Equipment[];
}

export interface ServiceOrders {
  id: number;
  client: Client;
  createdBy: string;
  tecnic: Tecnic;
  equipments: Equipment[];
  orderServiceStatus: OrderServiceStatus;
  dateCreated: Date;
  street: string;
  cep: string;
  number: string;
  district: string;
  complement: string;
  observacao: string;
  device_qtd: string;
  pieceSold: boolean | null;
  defect: string;
  clientPiece: boolean | null;
  budget: number | null;
  amountReceived: number | null;
  datePayment: Date | null;
  absence1: Date | null;
  absence2: Date | null;
  serviceExecuted: string | null;
}

export interface Client {
  id: number;
  name: string;
  cpf: string;
  phoneNumber: string;
  email: string;
}

export interface Equipment {
  id: number;
  type: string;
  brand: string;
  model: string;
  mounthsWarranty: number;
  warrantyPeriod: Date | null;
}

export interface OrderServiceStatus {
  id: number;
  status: string;
}

export interface Tecnic {
  id: number;
  name: string;
}
