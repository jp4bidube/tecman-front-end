import { api } from "@/services/api";
import { TechniciansSelect } from "@/types/thechnicians";

class TechniciansService {
  async fetchTechniciansSelect(): Promise<TechniciansSelect[]> {
    const { data } = await api.get("/Tecnic/ListTenicSelect");

    return data.result.map((t: { id: string; name: string }) => ({
      value: t.id,
      label: t.name,
    }));
  }
}

export const techniciansService = new TechniciansService();
