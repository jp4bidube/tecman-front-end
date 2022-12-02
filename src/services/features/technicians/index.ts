import { api } from "@/services/api";
import { Filter } from "@/types/common";
import { TechniciansSelect } from "@/types/thechnicians";
import { User } from "@/types/user";

class TechniciansService {
  async fetchTechniciansSelect(): Promise<TechniciansSelect[]> {
    const { data } = await api.get("/Tecnic/ListTenicSelect");

    return data.result.map((t: { id: string; name: string }) => ({
      value: t.id.toString(),
      label: t.name,
    }));
  }

  async fetchTechnicians({ order, page, search, sort }: Filter): Promise<{
    technicians: User[];
    total: number;
  }> {
    const { data, headers } = await api.get("/Tecnic", {
      params: {
        limit: "10",
        offset: page - 1,
        order,
        sort,
        search,
      },
    });

    return {
      technicians: data.result,
      total: Number(headers["x-total-count"]),
    };
  }
}

export const techniciansService = new TechniciansService();
