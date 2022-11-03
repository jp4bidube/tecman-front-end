import { api } from "@/services/api";
import { Filter } from "@/types/common";
import { ResponseOK } from "@/types/responseOk";
import {
  ServiceOrderFinish,
  ServiceOrders,
  ServiceOrdersCreate,
} from "@/types/serviceOrders";

class ServiceOrdersService {
  async createServiceOrder(payload: ServiceOrdersCreate): Promise<ResponseOK> {
    const { data } = await api.post<ResponseOK>("/OrderService", payload);

    return data;
  }

  async fetchServiceOrderById(id: string): Promise<ServiceOrders> {
    const { data } = await api.get<ResponseOK>(`/OrderService/${id}`);

    return data.result;
  }

  async fetchServiceOrder({ order, page, search, sort }: Filter): Promise<{
    serviceOrders: ServiceOrders[];
    total: number;
  }> {
    const { data, headers } = await api.get("/OrderService", {
      params: {
        limit: "10",
        offset: page - 1,
        order,
        sort,
        search,
      },
    });

    return {
      serviceOrders: data.result,
      total: Number(headers["x-total-count"]),
    };
  }

  async fetchServiceOrderByClientId(
    clientId: number,
    { order, page, search, sort }: Filter
  ): Promise<{
    serviceOrders: ServiceOrders[];
    total: number;
  }> {
    const { data, headers } = await api.get(
      `/OrderService/cliente/${clientId}`,
      {
        params: {
          limit: "10",
          offset: page - 1,
          order,
          sort,
          search,
        },
      }
    );

    return {
      serviceOrders: data.result,
      total: Number(headers["x-total-count"]),
    };
  }

  async finishServiceOrder(
    payload: Omit<ServiceOrderFinish, "id">,
    id: number
  ): Promise<ResponseOK> {
    const { data } = await api.patch<ResponseOK>(`/OrderService/${id}`, {
      ...payload,
      equipments: payload.equipments.map((eq) => ({
        ...eq,
        mounthsWarranty: eq?.mounthsWarranty
          ? eq?.mounthsWarranty?.toString()
          : null,
      })),
    });

    return data;
  }
}

export const serviceOrdersService = new ServiceOrdersService();
