import { api } from "@/services/api";
import { ResponseOK } from "@/types/responseOk";
import { ServiceOrders, ServiceOrdersCreate } from "@/types/serviceOrders";

class ServiceOrdersService {
  async createServiceOrder(payload: ServiceOrdersCreate): Promise<ResponseOK> {
    const { data } = await api.post<ResponseOK>("/OrderService", payload);

    return data;
  }

  async fetchServiceOrderById(id: string): Promise<ServiceOrders> {
    const { data } = await api.get<ResponseOK>(`/OrderService/${id}`);

    return data.result;
  }
}

export const serviceOrdersService = new ServiceOrdersService();
