import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
	const { setTheme } = useTheme();
	return (
		<div className="flex items-center gap-2">
			<button type="button" onClick={() => setTheme("light")}>
				<Sun className="h-4 w-4" />
			</button>
			<button type="button" onClick={() => setTheme("dark")}>
				<Moon className="h-4 w-4" />
			</button>
			<button type="button" onClick={() => setTheme("system")}>
				<Monitor className="h-4 w-4" />
			</button>
		</div>
	);
}
