import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { Toaster } from "react-hot-toast";
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const createRouter = () => {
	const CONVEX_URL = import.meta.env.VITE_CONVEX_URL;
	if (!CONVEX_URL) {
		console.error("missing envar VITE_CONVEX_URL");
	}
	const convexQueryClient = new ConvexQueryClient(CONVEX_URL);

	const queryClient: QueryClient = new QueryClient({
		defaultOptions: {
			queries: {
				queryKeyHashFn: convexQueryClient.hashFn(),
				queryFn: convexQueryClient.queryFn(),
			},
		},
	});
	convexQueryClient.connect(queryClient);
	const router = routerWithQueryClient(
		createTanStackRouter({
			routeTree,
			scrollRestoration: true,
			defaultPreloadStaleTime: 0,
			defaultPreload: "intent",
			context: { queryClient },
			Wrap: ({ children }) => (
				<ConvexAuthProvider client={convexQueryClient.convexClient}>
					{children}
					<Toaster />
				</ConvexAuthProvider>
			),
		}),
		queryClient,
	);
	return router;
};

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}
