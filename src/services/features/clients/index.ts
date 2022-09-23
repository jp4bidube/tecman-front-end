import { api } from "@/services/api";
import { Client } from "@/types/clients";

class ClientsService {
  async postCreateClient(payload: Client): Promise<{
    message: string;
    errorCode: number;
    success: boolean;
  }> {
    const { data } = await api.post(`/Client`, payload);

    return data.result;
  }

  async getClients(
    page: number,
    order: string,
    sort: string,
    search: string
  ): Promise<{
    clients: Client[];
    total: number;
  }> {
    const { data, headers } = await api.get("/Client", {
      params: {
        limit: "10",
        offset: page - 1,
        order,
        sort,
        search,
      },
    });

    return {
      clients: data.result,
      total: Number(headers["x-total-count"]),
    };
  }
}

export const clientsService = new ClientsService();
