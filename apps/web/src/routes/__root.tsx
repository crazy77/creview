import { TanstackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getThemeServerFn } from "@/lib/theme";
import appCss from "@/styles.css?url";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Creview",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	loader: () => getThemeServerFn(),
	notFoundComponent: () => <div>Not Found</div>,
	shellComponent: RootComponent,
});

function RootComponent() {
	const data = Route.useLoaderData();
	return (
		<ThemeProvider theme={data}>
			<RootDocument>
				<Outlet />
			</RootDocument>
		</ThemeProvider>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	const theme = Route.useLoaderData();

	return (
		<html lang="ko" className={theme} suppressHydrationWarning>
			<head>
				<HeadContent />
				<script src="/theme-snippet.js" />
			</head>
			<body>
				<Header />
				{children}
				<TanstackDevtools
					config={{
						position: "bottom-left",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
