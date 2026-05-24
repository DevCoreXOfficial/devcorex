import { useThemeStore, type Theme } from "@/store";

export function useTheme() {
  const { theme, setTheme } = useThemeStore();

  const themes: Theme[] = ["light", "dark", "system"];

  return { theme, setTheme, themes };
}

