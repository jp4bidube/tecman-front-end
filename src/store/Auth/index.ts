import { StateCreator } from "zustand";

export type AuthSlice = {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
};

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  isAuth: false,
  setIsAuth(value) {
    set((state) => ({
      ...state,
      isAuth: value,
    }));
  },
});
