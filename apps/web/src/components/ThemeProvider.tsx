import { useRouter } from "@tanstack/react-router";
import { createContext, type PropsWithChildren, use, useEffect } from "react";
import { setThemeServerFn } from "@/lib/theme";

export type Theme = "light" | "dark" | "system";

type ThemeContextVal = { theme: Theme; setTheme: (val: Theme) => void };
type Props = PropsWithChildren<{ theme: Theme }>;

const ThemeContext = createContext<ThemeContextVal | null>(null);

export function ThemeProvider({ children, theme }: Props) {
	const router = useRouter();

	async function setTheme(val: Theme) {
		await setThemeServerFn({ data: val });
		router.invalidate();
	}
	useEffect(() => {
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		if (theme === "system") {
			document.documentElement.classList.toggle("dark", mq.matches);
		}
		const handler = (e: MediaQueryListEvent) => {
			if (theme === "system") {
				document.documentElement.classList.toggle("dark", e.matches);
			}
		};
		mq.addEventListener("change", handler);
		return () => {
			mq.removeEventListener("change", handler);
		};
	}, [theme]);

	return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
}

export function useTheme() {
	const val = use(ThemeContext);
	if (!val) throw new Error("useTheme called outside of ThemeProvider!");
	return val;
}
