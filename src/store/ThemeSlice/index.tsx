import { ColorScheme } from "@mantine/core";
import { StateCreator } from "zustand";

export type ThemeSlice = {
  colorScheme: ColorScheme;
  setColorScheme: (value: ColorScheme) => void;
};

export const createThemeSlice: StateCreator<ThemeSlice> = (set) => ({
  colorScheme: (localStorage.getItem("color-mode") as ColorScheme) || "light",
  setColorScheme: (colorScheme) => {
    localStorage.setItem("color-mode", colorScheme);
    set((state) => ({ ...state, colorScheme }));
  },
});
