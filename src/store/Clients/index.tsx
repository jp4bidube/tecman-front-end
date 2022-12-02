import { ClientsFilter } from "@/types/clients";
import { StateCreator } from "zustand";

export type ClientsSlice = {
  clientsFilter: ClientsFilter;
  setClientsPage: (page: number) => void;
  setClientsFilter: (filter: ClientsFilter) => void;
};

export const createClientsSlice: StateCreator<ClientsSlice> = (set) => ({
  clientsFilter: {
    page: 1,
    order: "asc",
    search: "",
    sort: "name",
  },
  setClientsPage(page) {
    set((state) => ({
      ...state,
      clientsFilter: { ...state.clientsFilter, page: page },
    }));
  },
  setClientsFilter(filter) {
    set((state) => ({
      ...state,
      clientsFilter: filter,
    }));
  },
});
