import { ColorScheme } from "@mantine/core";
import { StateCreator } from "zustand";

export type ThemeSlice = {
  colorScheme: ColorScheme;
  setColorScheme: (value: ColorScheme) => void;
};

export const createThemeSlice: StateCreator<ThemeSlice> = (set) => ({
  colorScheme: "light",
  setColorScheme: (colorScheme) => {
    set((state) => ({ ...state, colorScheme }));
  },
});
