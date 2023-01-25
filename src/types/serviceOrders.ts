import { User } from "./user";

export interface ServiceOrdersCreate {
  clientId: number;
  tecnicId: number;
  street: string;
  cep: string;
  number: string;
  district: string;
  complement: string;
  periodAttendance: string;
  observacao: string;
  defect: string;
  devices: Array<Device>;
}

export interface ServiceOrdersEdit {
  id: number;
  tecnicId: number | string;
  serviceExecuted: string;
  pieceSold: boolean;
  clientPiece: boolean;
  budget: number;
  amountReceived: number;
  datePayment: Date | null;
  clientId: number;
  street: string;
  periodAttendance: string;
  cep: string;
  number: string;
  district: string;
  complement: string;
  observacao: string;
  defect: string;
  device: Device;
  absence1?: Date | null;
  absence1Hour?: Date | null;
  obsAbsence: string | null;
  hasWarranty?: string;
  status?: number;
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
  obsAbsence: string | null;
  serviceExecuted: null;
}

export interface Device {
  id?: number;
  type: string;
  brand: string;
  model: string;
  mounthsWarranty?: number | null;
  warrantyPeriod?: Date | null;
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
  hasWarranty?: string;
  device?: Device;
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
  periodAttendance: string;
  defect: string;
  clientPiece: boolean | null;
  budget: number | null;
  amountReceived: number | null;
  datePayment: Date | null;
  absence1: Date | null;
  obsAbsence: string | null;
  serviceExecuted: string | null;
  scheduledAttendance: Date | null;
}

export interface Client {
  id: number;
  name: string;
  cpf: string;
  phoneNumber: string;
  email: string;
  documentIdenfication: string;
  stateRegistration: string;
  municipalRegistration: string;
  typePerson: "PF" | "PJ";
}

export interface Equipment {
  id: number;
  type: string;
  brand: string;
  model: string;
  mounthsWarranty: number | null;
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

export interface WarrantyVisit {
  clientePiece: boolean;
  dateVisit: Date;
  serviceExecuted: string;
  equipmentId: number;
  employeeId: number;
}

export interface WarrantyVisitItem {
  id: number;
  clientePiece: boolean;
  dateVisit: Date;
  serviceExecuted: string;
  equipment: Equipment;
  employee: User;
}
