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

export interface Device {
  type: string;
  brand: string;
  model: string;
}
