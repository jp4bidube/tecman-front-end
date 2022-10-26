import { api } from "@/services/api";
import { ResponseOK } from "@/types/responseOk";
import { ServiceOrdersCreate } from "@/types/serviceOrders";

class ServiceOrdersService {
  async createServiceOrder(payload: ServiceOrdersCreate): Promise<ResponseOK> {
    const { data } = await api.post<ResponseOK>("/OrderService", payload);

    return data;
  }
}

export const serviceOrdersService = new ServiceOrdersService();
