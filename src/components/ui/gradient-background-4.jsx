import { cn } from "@/lib/utils";
import { useTheme } from "../../ThemeContext";

export const GradientBackground = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!isDark) return null;

  return (
    <div className="fixed inset-0 h-full w-full -z-50 bg-[#030303] [background:radial-gradient(125%_125%_at_50%_-50%,#6366f136_40%,transparent_100%)]"></div>
  );
};
