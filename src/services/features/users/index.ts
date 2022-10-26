import { api } from "@/services/api";
import { RecouverPasswordUser } from "@/types/auth";
import { ResponseOK } from "@/types/responseOk";
import {
  CreateUserPayload,
  EditUserPayload,
  LoggedUser,
  User,
  UserCredentialsPayload,
} from "@/types/user";
import { AxiosResponse } from "axios";

class UsersService {
  async getCurrentUser(): Promise<LoggedUser> {
    const { data } = await api.get("/User/Me");
    return data.result;
  }

  async getUsers(
    page: number,
    order: string,
    sort: string,
    search: string
  ): Promise<{
    users: User[];
    total: number;
  }> {
    const { data, headers } = await api.get("/Employee", {
      params: {
        limit: "5",
        offset: page - 1,
        order,
        sort,
        search,
      },
    });

    return {
      users: data.result,
      total: Number(headers["x-total-count"]),
    };
  }

  async getUserById(id: string): Promise<User> {
    const { data }: AxiosResponse<ResponseOK> = await api.get(
      `/Employee/${id}`
    );
    return {
      ...data.result,
      birthDate: data.result.birthDate ? new Date(data.result.birthDate) : null,
    };
  }

  async patchToggleDisableUser(id: number) {
    const { data } = await api.patch(`/Employee/${id}/disable-enable-employee`);

    return data.result;
  }

  async postCreateUser(payload: CreateUserPayload): Promise<{
    message: string;
    errorCode: number;
    success: boolean;
  }> {
    const { data } = await api.post(`/Employee`, payload);

    return data.result;
  }

  async putUpdateEmployee(
    id: number,
    payload: EditUserPayload
  ): Promise<{
    message: string;
    errorCode: number;
    success: boolean;
  }> {
    const { data }: AxiosResponse<ResponseOK> = await api.put(
      `/Employee/${id}`,
      payload
    );

    return data;
  }

  async postCreateUserCredentials(payload: UserCredentialsPayload): Promise<{
    message: string;
    errorCode: number;
    success: boolean;
  }> {
    const { data } = await api.post("/User", payload);

    return data.result;
  }

  async postRecouverPassword(cpf: string): Promise<RecouverPasswordUser> {
    const { data }: AxiosResponse<ResponseOK> = await api.post(
      "/User/Recovery",
      { cpf }
    );

    return data.result;
  }

  async putUpdateUser(
    id: number,
    payload: {
      username: string;
      password: string;
      employeeId: number;
    }
  ): Promise<{
    message: string;
    errorCode: number;
    success: boolean;
  }> {
    const { data }: AxiosResponse<ResponseOK> = await api.put(
      `/User/${id}`,
      payload
    );

    return data;
  }
}

export const usersService = new UsersService();
