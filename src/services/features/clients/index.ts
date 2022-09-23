import { api } from "@/services/api";
import {
  Client,
  ClientAddressUpdatePayload,
  ClientCreatePayload,
  ClientUpdatePayload,
} from "@/types/clients";
import { ResponseOK } from "@/types/responseOk";
import { AxiosResponse } from "axios";

class ClientsService {
  async postCreateClient(payload: ClientCreatePayload): Promise<{
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
    clients: ClientCreatePayload[];
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

  async getClientById(id: string): Promise<Client> {
    const { data }: AxiosResponse<ResponseOK> = await api.get(`/Client/${id}`);

    return data.result;
  }

  async putUpdateClient(
    id: number,
    payload: ClientUpdatePayload
  ): Promise<{
    message: string;
    errorCode: number;
    success: boolean;
  }> {
    const { data }: AxiosResponse<ResponseOK> = await api.put(
      `/Client/${id}`,
      payload
    );

    return data;
  }
  async putUpdateClientAddress(
    id: string,
    payload: ClientAddressUpdatePayload
  ): Promise<{
    message: string;
    errorCode: number;
    success: boolean;
  }> {
    const { data }: AxiosResponse<ResponseOK> = await api.put(
      `/Client/client-address/${id}`,
      payload
    );

    return data;
  }
}

export const clientsService = new ClientsService();
