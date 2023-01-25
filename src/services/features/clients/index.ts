import { api } from "@/services/api";
import {
  Client,
  ClientAddressPayload,
  ClientCreatePayload,
  ClientList,
  ClientUpdatePayload,
} from "@/types/clients";
import { ResponseOK } from "@/types/responseOk";
import { AxiosResponse } from "axios";

class ClientsService {
  async postCreateClient(payload: ClientCreatePayload): Promise<ResponseOK> {
    const { data } = await api.post(`/Client`, payload);

    return data;
  }

  async getClients(
    page: number,
    order: string,
    sort: string,
    search: string
  ): Promise<{
    clients: ClientList[];
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

  async getClientByCPF(cpf: string): Promise<Client> {
    const { data }: AxiosResponse<ResponseOK> = await api.get(
      `/Client/cpf/${cpf}`
    );

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
    payload: ClientAddressPayload
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

  async postUpdateClientAddress(
    id: number,
    payload: ClientAddressPayload
  ): Promise<{
    message: string;
    errorCode: number;
    success: boolean;
  }> {
    const { data }: AxiosResponse<ResponseOK> = await api.post(
      `/Client/client-address/${id}`,
      payload
    );

    return data;
  }

  async patchUpdateClientAddress(
    id: number,
    payload: { addressId: number }
  ): Promise<{
    message: string;
    errorCode: number;
    success: boolean;
  }> {
    const { data }: AxiosResponse<ResponseOK> = await api.patch(
      `/Client/${id}/set-default-address`,
      payload
    );

    return data;
  }

  async putDeleteClientAddress(id: string): Promise<{
    message: string;
    errorCode: number;
    success: boolean;
  }> {
    const { data }: AxiosResponse<ResponseOK> = await api.delete(
      `/Client/client-address-delete/${id}`
    );

    return data;
  }
}

export const clientsService = new ClientsService();
