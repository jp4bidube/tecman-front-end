import { RecouverPasswordUser } from "@/types/auth";
import { StateCreator } from "zustand";

export type AuthSlice = {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
  recouverPassword: RecouverPasswordUser;
  setRecouverPassword: (value: RecouverPasswordUser) => void;
};

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  isAuth: false,
  setIsAuth(value) {
    set((state) => ({
      ...state,
      isAuth: value,
    }));
  },
  recouverPassword: { employeeId: 0, userId: 0, username: "" },
  setRecouverPassword(value) {
    set((state) => ({
      ...state,
      recouverPassword: value,
    }));
  },
});
